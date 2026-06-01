
import FunctionRegistry from './function-registry.js';
import { ReferenceResolver } from './excel-core.js';

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
    const funcMatch = expr.match(/^([A-Z][A-Z0-9.]+)\((.*)\)$/i);
    if (funcMatch) {
      const funcName = funcMatch[1].toUpperCase();
      const rawArgs = this.splitArgs(funcMatch[2]);

      if (funcName === 'IF') {
        const test = this.parseAndEval(rawArgs[0], context);
        if (test === null || test === "") return "";
        const branch = this.toBoolean(test) ? rawArgs[1] : (rawArgs[2] || 'FALSE');
        return this.parseAndEval(branch, context);
      }

      if (funcName === 'IFS') {
        for (let i = 0; i < rawArgs.length; i += 2) {
          const test = this.parseAndEval(rawArgs[i], context);
          if (test === null || test === "") return "";
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

      const funcDef = this.findFunction(funcName);
      if (!funcDef) return "#NAME?";

      const evaluatedArgs = rawArgs.map(arg => this.parseAndEval(arg, context));

      if (funcDef.minArgs !== null && evaluatedArgs.length < funcDef.minArgs) return "#N/A";
      if (funcDef.maxArgs !== null && evaluatedArgs.length > funcDef.maxArgs) return "#N/A";

      return funcDef.fn(evaluatedArgs, context);
    }

    // 2. Handle Scoped Variables (from LET)
    if (context.scope && context.scope[expr] !== undefined) {
      return context.scope[expr];
    }

    // 3. Handle Cell References (A1, $A$1, etc.) or Ranges (A1:B2)
    if (/^\$?[A-Z]+\$?[0-9]+$/i.test(expr)) {
      const cell = this.registry.getCell(expr);
      return cell.computed;
    }

    if (ReferenceResolver.isRange(expr)) {
      return this.registry.getRangeValues(expr);
    }

    // 4. Handle Basic Expressions and Operators
    // We only try to eval if it looks like a math/logic expression
    if (/^[0-9A-Z$_.\s()+\-*/|&!><=,"]+$/i.test(expr)) {
        let evalStr = expr;

        // Scoped Variables
        if (context.scope) {
            Object.keys(context.scope).forEach(key => {
                const regex = new RegExp(`\\b${key}\\b`, 'g');
                const val = context.scope[key];
                evalStr = evalStr.replace(regex, typeof val === 'string' ? `"${val}"` : val);
            });
        }

        // Cell References
        const refRegex = /\$?[A-Z]+\$?[0-9]+/gi;
        evalStr = evalStr.replace(refRegex, (match) => {
            const val = this.registry.getCell(match).computed;
            if (val === null || val === "") return "null";
            if (typeof val === 'string' && isNaN(val)) {
                return `"${val.replace(/"/g, '\\"')}"`;
            }
            return typeof val === 'number' ? val : Number(val);
        });

        try {
            // Further sanitization for eval
            if (/^[0-9+\-*/().\s|&!><=,"a-z]+$/i.test(evalStr)) {
                // eslint-disable-next-line no-eval
                return eval(evalStr.replace(/TRUE/gi, 'true').replace(/FALSE/gi, 'false'));
            }
        } catch (e) {}
    }

    // 5. Literal handling
    if (expr === 'TRUE') return true;
    if (expr === 'FALSE') return false;
    if (expr === 'null') return null;
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
    if (val === false || val === "FALSE" || val === "" || val === 0 || val === null) return false;
    if (!isNaN(val)) return Number(val) !== 0;
    return true;
  }
}
