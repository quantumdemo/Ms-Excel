
import FunctionRegistry from './function-registry.js';
import { ReferenceResolver } from './reference-resolver.js';
import { EXECUTE_WITH_GUARDS, IS_ERROR, TO_LOGICAL, TO_NUMBER, IS_NUMBER } from './evaluation-pipeline.js';

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

      // Lazy evaluation for IF/IFS/LET - processed via pipeline-compliant logic
      if (funcName === 'IF') {
        const test = this.parseAndEval(rawArgs[0], context);
        if (test === null || test === "") return "";

        // Ensure test condition follows Logical category rules
        const logicalTest = TO_LOGICAL(test);
        if (IS_ERROR(logicalTest)) return logicalTest;

        const branch = logicalTest ? rawArgs[1] : (rawArgs[2] || 'FALSE');
        return this.parseAndEval(branch, context);
      }

      if (funcName === 'IFS') {
        for (let i = 0; i < rawArgs.length; i += 2) {
          const test = this.parseAndEval(rawArgs[i], context);
          if (test === null || test === "") return "";

          const logicalTest = TO_LOGICAL(test);
          if (IS_ERROR(logicalTest)) return logicalTest;

          if (logicalTest) return this.parseAndEval(rawArgs[i + 1], context);
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

      // Regular functions go through the universal pipeline
      const evaluatedArgs = rawArgs.map(arg => this.parseAndEval(arg, context));

      if (funcDef.minArgs !== null && evaluatedArgs.length < funcDef.minArgs) return "#N/A";
      if (funcDef.maxArgs !== null && evaluatedArgs.length > funcDef.maxArgs) return "#N/A";

      return EXECUTE_WITH_GUARDS(funcDef, evaluatedArgs, context);
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

    // 5. Basic Math Operators (Processed via pipeline logic)
    return this.evaluateExpression(expr, context);
  }

  evaluateExpression(expr, context) {
    const tokenized = this.tokenize(expr);
    if (tokenized.length === 1) return this.resolveToken(tokenized[0], context);

    try {
        let result;
        let startIndex = 0;

        // Handle leading unary minus/plus
        if (tokenized[0] === '-' || tokenized[0] === '+') {
            const op = tokenized[0];
            const nextVal = this.resolveToken(tokenized[1], context);
            const val = TO_NUMBER(nextVal);
            if (IS_ERROR(val)) return val;
            result = (op === '-') ? -(val || 0) : (val || 0);
            startIndex = 2;
        } else {
            result = this.resolveToken(tokenized[0], context);
            startIndex = 1;
        }

        for (let i = startIndex; i < tokenized.length; i += 2) {
            const op = tokenized[i];
            const nextRaw = tokenized[i+1];
            if (!nextRaw) break; // End of tokens

            const nextVal = this.resolveToken(nextRaw, context);

            if (IS_ERROR(result)) return result;
            if (IS_ERROR(nextVal)) return nextVal;

            // Use pseudo-function definitions to leverage global pipeline rules
            const opDef = this.getOperatorDef(op);
            result = EXECUTE_WITH_GUARDS(opDef, [result, nextVal], context);
        }
        return result;
    } catch (e) {
        return "#VALUE!";
    }
  }

  getOperatorDef(op) {
    const mathSchema = ['number', 'number'];
    const logicalSchema = ['any', 'any'];

    const ops = {
        '+': { category: 'Math', schema: mathSchema, fn: ([a, b]) => (a || 0) + (b || 0) },
        '-': { category: 'Math', schema: mathSchema, fn: ([a, b]) => (a || 0) - (b || 0) },
        '*': { category: 'Math', schema: mathSchema, fn: ([a, b]) => (a || 0) * (b || 0) },
        '/': { category: 'Math', schema: mathSchema, fn: ([a, b]) => b === 0 ? "#DIV/0!" : (a || 0) / b },
        '^': { category: 'Math', schema: mathSchema, fn: ([a, b]) => Math.pow((a || 0), (b || 0)) },
        '>': { category: 'Logical', schema: logicalSchema, fn: ([a, b]) => (a || 0) > (b || 0) },
        '<': { category: 'Logical', schema: logicalSchema, fn: ([a, b]) => (a || 0) < (b || 0) },
        '>=': { category: 'Logical', schema: logicalSchema, fn: ([a, b]) => (a || 0) >= (b || 0) },
        '<=': { category: 'Logical', schema: logicalSchema, fn: ([a, b]) => (a || 0) <= (b || 0) },
        '=': { category: 'Logical', schema: logicalSchema, fn: ([a, b]) => a === b },
        '<>': { category: 'Logical', schema: logicalSchema, fn: ([a, b]) => a !== b }
    };
    return ops[op] || { category: 'General', fn: () => "#VALUE!" };
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
            // Unary handling: if op is first or follows another op
            if (current.trim() === "" && (tokens.length === 0 || ops.includes(tokens[tokens.length-1]))) {
                if (current.trim()) tokens.push(current.trim());
                tokens.push(char);
                current = "";
            } else {
                if (current.trim()) tokens.push(current.trim());
                tokens.push(char);
                current = "";
            }
        } else {
            current += char;
        }
    }
    if (current.trim()) tokens.push(current.trim());
    return tokens;
  }

  resolveToken(token, context) {
    if (typeof token !== 'string') return token;
    token = token.trim();

    // Check if it's a literal or reference before recursive parseAndEval
    if (/^\$?[A-Z]+\$?[0-9]+$/i.test(token)) return this.registry.getCell(token).computed;
    if (ReferenceResolver.isRange(token)) return this.registry.getRangeValues(token);
    if (token.startsWith('"') && token.endsWith('"')) return token.slice(1, -1);
    if (!isNaN(token) && token !== "") return Number(token);
    if (token.toUpperCase() === 'TRUE') return true;
    if (token.toUpperCase() === 'FALSE') return false;

    // If it's a nested function call, let parseAndEval handle it
    if (token.includes('(')) {
        return this.parseAndEval(token, context);
    }

    return token;
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
    return args;
  }

  findFunction(name) {
    for (const cat in FunctionRegistry) {
      if (FunctionRegistry[cat][name]) return FunctionRegistry[cat][name];
    }
    return null;
  }

}
