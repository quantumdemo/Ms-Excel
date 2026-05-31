
import FunctionRegistry from './function-registry.js';

/**
 * FormulaEvaluator parses and evaluates Excel-like formulas.
 * It supports functions, cell references, and basic operators.
 */
export class FormulaEvaluator {
  constructor(cellRegistry) {
    this.registry = cellRegistry;
  }

  evaluate(formula, context = { scope: {} }) {
    if (!formula.startsWith('=')) return formula;
    const expression = formula.substring(1);

    try {
      return this.parseAndEval(expression, context);
    } catch (e) {
      console.error("Evaluation Error:", e);
      return "#VALUE!";
    }
  }

  parseAndEval(expr, context) {
    expr = expr.trim();

    // 1. Handle Functions: NAME(args)
    // This regex matches function names followed by parentheses
    const funcMatch = expr.match(/^([A-Z][A-Z0-9.]+)\((.*)\)$/i);
    if (funcMatch) {
      const funcName = funcMatch[1].toUpperCase();
      const rawArgs = this.splitArgs(funcMatch[2]);

      // Handle Special Lazy Functions
      if (funcName === 'IF') {
        const test = this.parseAndEval(rawArgs[0], context);
        const branch = this.toBoolean(test) ? rawArgs[1] : (rawArgs[2] || 'FALSE');
        return this.parseAndEval(branch, context);
      }

      if (funcName === 'IFS') {
        for (let i = 0; i < rawArgs.length; i += 2) {
          const test = this.parseAndEval(rawArgs[i], context);
          if (this.toBoolean(test)) return this.parseAndEval(rawArgs[i + 1], context);
        }
        return "#N/A";
      }

      if (funcName === 'LET') {
        const newScope = { ...context.scope };
        for (let i = 0; i < rawArgs.length - 1; i += 2) {
          const name = rawArgs[i].trim();
          const val = this.parseAndEval(rawArgs[i+1], context);
          newScope[name] = val;
        }
        return this.parseAndEval(rawArgs[rawArgs.length - 1], { ...context, scope: newScope });
      }

      // Standard Function Evaluation
      const funcDef = this.findFunction(funcName);
      if (!funcDef) return "#NAME?";

      const evaluatedArgs = rawArgs.map(arg => this.parseAndEval(arg, context));

      if (funcDef.minArgs !== null && evaluatedArgs.length < funcDef.minArgs) return "#N/A";
      if (funcDef.maxArgs !== null && evaluatedArgs.length > funcDef.maxArgs) return "#N/A";

      return funcDef.fn(evaluatedArgs, context);
    }

    // 2. Handle Cell References (A1, $A$1, etc.)
    if (/^\$?[A-Z]+\$?[0-9]+$/i.test(expr)) {
      const cell = this.registry.getCell(expr);
      return cell.computed;
    }

    // 3. Handle Scoped Variables (from LET)
    if (context.scope && context.scope[expr]) {
      return context.scope[expr];
    }

    // 4. Handle Basic Math Expressions (Fallback to eval for foundation)
    // We replace references in the expression first
    const refRegex = /\$?[A-Z]+\$?[0-9]+/gi;
    let evalStr = expr.replace(refRegex, (match) => {
      const val = this.registry.getCell(match).computed;
      return typeof val === 'number' ? val : (isNaN(val) || val === "" ? 0 : Number(val));
    });

    // Replace scoped variables
    if (context.scope) {
        Object.keys(context.scope).forEach(key => {
            const regex = new RegExp(`\\b${key}\\b`, 'g');
            evalStr = evalStr.replace(regex, context.scope[key]);
        });
    }

    try {
      if (/^[0-9+\-*/().\s|&!><=]+$/.test(evalStr)) {
        // eslint-disable-next-line no-eval
        return eval(evalStr.replace(/TRUE/g, 'true').replace(/FALSE/g, 'false'));
      }
    } catch (e) {}

    // 5. Literal handling
    if (expr === 'TRUE') return true;
    if (expr === 'FALSE') return false;
    if (!isNaN(expr) && expr !== "") return Number(expr);
    if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1);

    return expr;
  }

  splitArgs(argsStr) {
    const args = [];
    let currentArg = "";
    let parenCount = 0;
    let inQuote = false;

    for (let i = 0; i < argsStr.length; i++) {
      const char = argsStr[i];
      if (char === '"') inQuote = !inQuote;
      if (!inQuote) {
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
        if (char === ',' && parenCount === 0) {
          args.push(currentArg.trim());
          currentArg = "";
          continue;
        }
      }
      currentArg += char;
    }
    args.push(currentArg.trim());
    return args.filter(a => a !== "");
  }

  findFunction(name) {
    for (const cat in FunctionRegistry) {
      if (FunctionRegistry[cat][name]) return FunctionRegistry[cat][name];
    }
    return null;
  }

  toBoolean(val) {
    if (val === true || val === "TRUE") return true;
    if (val === false || val === "FALSE" || val === "" || val === 0) return false;
    if (!isNaN(val)) return Number(val) !== 0;
    return true;
  }
}
