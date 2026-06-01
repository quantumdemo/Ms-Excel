
import FunctionRegistry from './function-registry.js';
import { ReferenceResolver } from './reference-resolver.js';

/**
 * FormulaEvaluator parses and evaluates Excel-like formulas.
 * It uses a simple recursive descent model and handles operators safely.
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
    if (!expr) return null;

    // 1. Handle Functions: NAME(args)
    const funcMatch = expr.match(/^([A-Z][A-Z0-9.]+)\((.*)\)$/i);
    if (funcMatch) {
      const funcName = funcMatch[1].toUpperCase();
      const rawArgs = this.splitArgs(funcMatch[2]);

      // Lazy evaluation for IF/IFS/LET
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

    // 2. Scoped Variables
    if (context.scope && context.scope[expr] !== undefined) {
      return context.scope[expr];
    }

    // 3. Cell Refs / Ranges
    if (/^\$?[A-Z]+\$?[0-9]+$/i.test(expr)) {
      return this.registry.getCell(expr).computed;
    }
    if (ReferenceResolver.isRange(expr)) {
      return this.registry.getRangeValues(expr);
    }

    // 4. Literals
    if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1);
    if (!isNaN(expr) && expr !== "") return Number(expr);
    if (expr.toUpperCase() === 'TRUE') return true;
    if (expr.toUpperCase() === 'FALSE') return false;

    // 5. Basic Math Operators (Safe Evaluation without eval)
    return this.evaluateExpression(expr, context);
  }

  evaluateExpression(expr, context) {
    // This is a simple placeholder for an operator parser.
    // For now, we support addition/subtraction/multiplication/division
    // using a basic split and reduce logic to avoid eval().

    // Protect strings and function calls during operator splitting
    // For a production engine, this would be a full Pratt parser or similar.

    // Fallback: If it's a simple number or reference, it's already handled.
    // If it has operators, we need to handle them.

    // Temporary safer evaluation for simple arithmetic:
    const tokenized = this.tokenize(expr);
    if (tokenized.length === 1) return tokenized[0];

    // Implement basic PEMDAS
    // For now, just handle left-to-right for the sandbox scope
    try {
        let result = this.resolveToken(tokenized[0], context);
        for (let i = 1; i < tokenized.length; i += 2) {
            const op = tokenized[i];
            const nextVal = this.resolveToken(tokenized[i+1], context);

            const a = Number(result);
            const b = Number(nextVal);

            if (op === '+') result = a + b;
            else if (op === '-') result = a - b;
            else if (op === '*') result = a * b;
            else if (op === '/') {
                if (b === 0) return "#DIV/0!";
                result = a / b;
            }
            else if (op === '^') result = Math.pow(a, b);
            else if (op === '>') result = a > b;
            else if (op === '<') result = a < b;
            else if (op === '>=') result = a >= b;
            else if (op === '<=') result = a <= b;
            else if (op === '=') result = a === b;
            else if (op === '<>') result = a !== b;
        }
        return result;
    } catch (e) {
        return "#VALUE!";
    }
  }

  tokenize(expr) {
    const tokens = [];
    let current = "";
    const ops = ['+', '-', '*', '/', '^', '>', '<', '=', '<>'];

    for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        const twoCharOp = expr.substring(i, i+2);

        if (['>=', '<=', '<>'].includes(twoCharOp)) {
            if (current.trim()) tokens.push(current.trim());
            tokens.push(twoCharOp);
            current = "";
            i++;
        } else if (ops.includes(char)) {
            if (current.trim()) tokens.push(current.trim());
            tokens.push(char);
            current = "";
        } else {
            current += char;
        }
    }
    if (current.trim()) tokens.push(current.trim());
    return tokens;
  }

  resolveToken(token, context) {
    if (typeof token !== 'string') return token;
    return this.parseAndEval(token, context);
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
