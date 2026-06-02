
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

  evaluate(formula, context = { scope: {}, sourceCell: null }) {
    if (!formula.startsWith('=')) return formula;
    const expression = formula.substring(1);

    const fullContext = {
        registry: this.registry,
        sourceCell: context.sourceCell,
        scope: context.scope || {}
    };

    try {
      return this.parseAndEval(expression, fullContext);
    } catch (e) {
      console.error("Evaluation Error:", e);
      return "#VALUE!";
    }
  }

  parseAndEval(expr, context) {
    expr = expr.trim();
    if (!expr) return null;

    // 1. Handle Functions: NAME(args)
    const funcMatch = expr.match(/^([A-Z][A-Z0-9.]*)\((.*)\)$/i);
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

      // Special Handling for Reference-dependent functions
      if (funcName === 'ROW' || funcName === 'COLUMN') {
          if (rawArgs.length === 1) {
              const ref = rawArgs[0].trim();
              const parsed = ReferenceResolver.parseReference(ref);
              if (parsed) {
                  return funcName === 'ROW' ? parsed.r + 1 : parsed.c + 1;
              }
          }
      }

      if (funcName === 'FORMULATEXT') {
          if (rawArgs.length === 1) {
              const ref = rawArgs[0].trim();
              const cell = this.registry.getCell(ref);
              if (cell && cell.type === 'formula') return '=' + cell.parsedFormula;
              return "#N/A";
          }
      }

      if (funcName === 'ISREF') {
          if (rawArgs.length === 1) {
              const ref = rawArgs[0].trim();
              return /^\$?[A-Z]+\$?[0-9]+$/i.test(ref) || ReferenceResolver.isRange(ref);
          }
      }

      if (funcName === 'ISFORMULA') {
          if (rawArgs.length === 1) {
              const ref = rawArgs[0].trim();
              const cell = this.registry.getCell(ref);
              return cell && cell.type === 'formula';
          }
      }

      if (funcName === 'SHEET' || funcName === 'SHEETS') {
          return 1; // Basic support for single sheet
      }

      if (funcName === 'CELL') {
          const type = this.parseAndEval(rawArgs[0], context).toLowerCase();
          const ref = rawArgs[1] ? rawArgs[1].trim() : context.sourceCell;
          if (!ref) return "#VALUE!";

          const parsed = ReferenceResolver.parseReference(ref);
          if (!parsed) return "#VALUE!";

          if (type === 'address') {
              return ReferenceResolver.formatReference(parsed.r, parsed.c, true, true);
          }
          if (type === 'row') {
              return parsed.r + 1;
          }
          if (type === 'col') {
              return parsed.c + 1;
          }
          if (type === 'type') {
              const cell = this.registry.getCell(ref);
              if (IS_EMPTY(cell.computed)) return "b";
              if (IS_NUMBER(cell.computed)) return "v";
              return "l";
          }
          if (type === 'contents') {
              const res = this.registry.getCell(ref).computed;
              return (res === null || res === undefined || res === "") ? 0 : res;
          }
          return "#VALUE!";
      }

      if (funcName === 'OFFSET') {
          if (rawArgs.length >= 3) {
              const baseRef = rawArgs[0].trim();
              const rOff = Number(this.parseAndEval(rawArgs[1], context));
              const cOff = Number(this.parseAndEval(rawArgs[2], context));
              const height = rawArgs[3] ? Number(this.parseAndEval(rawArgs[3], context)) : null;
              const width = rawArgs[4] ? Number(this.parseAndEval(rawArgs[4], context)) : null;

              if (isNaN(rOff) || isNaN(cOff)) return "#VALUE!";

              let startR, startC, endR, endC;

              if (ReferenceResolver.isRange(baseRef)) {
                  const coords = ReferenceResolver.getRangeCoords(baseRef);
                  startR = coords.startR + rOff;
                  startC = coords.startC + cOff;
                  endR = (height !== null) ? startR + height - 1 : coords.endR + rOff;
                  endC = (width !== null) ? startC + width - 1 : coords.endC + cOff;
              } else {
                  const parsed = ReferenceResolver.parseReference(baseRef);
                  if (!parsed) return "#VALUE!";
                  startR = parsed.r + rOff;
                  startC = parsed.c + cOff;
                  endR = (height !== null) ? startR + height - 1 : startR;
                  endC = (width !== null) ? startC + width - 1 : startC;
              }

              if (startR < 0 || startC < 0 || endR < 0 || endC < 0) return "#REF!";

              const newRef = (startR === endR && startC === endC)
                  ? ReferenceResolver.formatReference(startR, startC)
                  : `${ReferenceResolver.formatReference(startR, startC)}:${ReferenceResolver.formatReference(endR, endC)}`;

              return this.parseAndEval(newRef, context);
          }
      }

      const funcDef = this.findFunction(funcName);
      if (!funcDef) return "#NAME?";

      // Regular functions go through the universal pipeline
      const evaluatedArgs = rawArgs.map(arg => arg === "" ? undefined : this.parseAndEval(arg, context));

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
      // Rule 1: Resolved to single value
      const val = this.registry.getCell(expr).computed;
      return val === undefined ? null : val;
    }
    if (ReferenceResolver.isRange(expr)) {
      // Rule 1: Resolved to structured array
      return this.registry.getRangeValues(expr);
    }

    // 4. Literals
    if (expr.startsWith('{') && expr.endsWith('}')) {
      const inner = expr.slice(1, -1);
      const rows = this.splitArgsCustom(inner, ';').map(row =>
        this.splitArgsCustom(row, ',').map(cell => this.parseAndEval(cell, context))
      );
      return rows;
    }
    if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1);
    if (/^#(NULL!|DIV\/0!|VALUE!|REF!|NAME\?|NUM!|N\/A|GETTING_DATA|SPILL!|CALC!)$/i.test(expr)) return expr.toUpperCase();
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

            // Handle array operations (e.g. range > scalar)
            if (Array.isArray(result) || Array.isArray(nextVal)) {
                const resArr = Array.isArray(result) ? result : [result];
                const nextArr = Array.isArray(nextVal) ? nextVal : [nextVal];

                const rows = Math.max(resArr.length, nextArr.length);
                const cols = Math.max(
                    Array.isArray(resArr[0]) ? resArr[0].length : 1,
                    Array.isArray(nextArr[0]) ? nextArr[0].length : 1
                );

                const finalArr = [];
                for (let r = 0; r < rows; r++) {
                    const row = [];
                    for (let c = 0; c < cols; c++) {
                        const v1 = Array.isArray(resArr[r]) ? resArr[r][c] : (resArr[r] !== undefined ? resArr[r] : resArr[0]);
                        const v2 = Array.isArray(nextArr[r]) ? nextArr[r][c] : (nextArr[r] !== undefined ? nextArr[r] : nextArr[0]);
                        row.push(EXECUTE_WITH_GUARDS(opDef, [v1, v2], context));
                    }
                    finalArr.push(row);
                }
                result = finalArr;
            } else {
                result = EXECUTE_WITH_GUARDS(opDef, [result, nextVal], context);
            }
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
    return this.splitArgsCustom(argsStr, ',');
  }

  splitArgsCustom(argsStr, delimiter) {
    if (!argsStr.trim()) return [];
    const args = [];
    let currentArg = "";
    let parenCount = 0;
    let braceCount = 0;
    let inQuote = false;

    for (let i = 0; i < argsStr.length; i++) {
      const char = argsStr[i];
      if (char === '"') inQuote = !inQuote;
      if (!inQuote) {
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
        if (char === delimiter && parenCount === 0 && braceCount === 0) {
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
