import FunctionRegistry from './function-registry.js';

/**
 * Extracts all functions from the registry into a flat list for UI use.
 */
const getAllFunctions = () => {
  const functions = [];
  for (const category in FunctionRegistry) {
    for (const name in FunctionRegistry[category]) {
      const def = FunctionRegistry[category][name];
      if (def && typeof def === 'object' && !Array.isArray(def)) {
        functions.push({
          name: name.toUpperCase(),
          args: def.args || []
        });
      }
    }
  }
  return functions;
};

const cachedFunctions = getAllFunctions();

/**
 * Returns top 10 function suggestions based on a query.
 * Ranks prefix matches first, then fuzzy matches.
 */
export const getFunctionSuggestions = (query) => {
  if (!query) return [];
  const q = query.toUpperCase();

  const prefixMatches = [];
  const fuzzyMatches = [];

  for (const func of cachedFunctions) {
    if (func.name.startsWith(q)) {
      prefixMatches.push(func);
    } else if (func.name.includes(q)) {
      fuzzyMatches.push(func);
    } else {
      // Very basic fuzzy: check if characters appear in order
      let i = 0;
      let j = 0;
      while (i < q.length && j < func.name.length) {
        if (q[i] === func.name[j]) i++;
        j++;
      }
      if (i === q.length) {
        fuzzyMatches.push(func);
      }
    }
  }

  // Sort prefix matches by length (shorter first)
  prefixMatches.sort((a, b) => a.name.length - b.name.length);

  // Popularity boosting (Excel common functions)
  const popular = ["SUM", "IF", "VLOOKUP", "COUNT", "AVERAGE", "XLOOKUP", "INDEX", "MATCH"];
  const boost = (a, b) => {
    const aPop = popular.indexOf(a.name);
    const bPop = popular.indexOf(b.name);
    if (aPop !== -1 && bPop === -1) return -1;
    if (aPop === -1 && bPop !== -1) return 1;
    if (aPop !== -1 && bPop !== -1) return aPop - bPop;
    return a.name.localeCompare(b.name);
  };

  prefixMatches.sort(boost);

  const results = [...prefixMatches, ...fuzzyMatches];
  const uniqueResults = [];
  const seen = new Set();
  for (const r of results) {
    if (!seen.has(r.name)) {
      uniqueResults.push(r);
      seen.add(r.name);
    }
    if (uniqueResults.length >= 10) break;
  }

  return uniqueResults;
};

/**
 * Extracts current function query or arg context from cursor position.
 * Example: "=SUM(A1, S" -> query "S"
 */
export const extractQuery = (formula, cursorPosition) => {
  if (!formula.startsWith('=') || cursorPosition <= 1) return null;

  const textBeforeCursor = formula.substring(1, cursorPosition);

  // Look for the last started function name
  // Match characters [A-Z0-9.] at the very end of the string before cursor
  const match = textBeforeCursor.match(/([A-Z][A-Z0-9.]*)$/i);

  if (match) {
    const query = match[1];
    // Ensure we are not inside a string literal or just finished a function
    const prevChar = textBeforeCursor[textBeforeCursor.length - query.length - 1];
    if (prevChar === '"') return null;
    return query;
  }

  return null;
};

/**
 * Parser to identify the active function and argument index at cursor position.
 * Supports nested functions.
 */
export const findActiveFunction = (formula, cursorPosition) => {
  if (!formula.startsWith('=') || cursorPosition <= 1) return null;

  const text = formula.substring(0, cursorPosition);
  let parenDepth = 0;
  let inQuote = false;
  let functions = []; // Stack of { name, argIndex, startPos }

  for (let i = 1; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      inQuote = !inQuote;
      continue;
    }

    if (inQuote) continue;

    if (char === '(') {
      // Find function name before this paren
      let j = i - 1;
      let name = "";
      while (j >= 0 && /[A-Z0-9.]/i.test(text[j])) {
        name = text[j] + name;
        j--;
      }
      if (name) {
        functions.push({ name: name.toUpperCase(), argIndex: 0, depth: parenDepth });
      }
      parenDepth++;
    } else if (char === ')') {
      parenDepth--;
      if (functions.length > 0 && functions[functions.length - 1].depth === parenDepth) {
        functions.pop();
      }
    } else if (char === ',' && functions.length > 0) {
      functions[functions.length - 1].argIndex++;
    }
  }

  if (functions.length === 0) return null;

  const active = functions[functions.length - 1];

  // Get full metadata for the active function
  const allFuncs = cachedFunctions;
  const def = allFuncs.find(f => f.name === active.name);

  return {
    name: active.name,
    argIndex: active.argIndex,
    args: def ? def.args : []
  };
};
