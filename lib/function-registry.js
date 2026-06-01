
/**
 * FunctionRegistry stores all available spreadsheet functions.
 */
const FunctionRegistry = {
  logical: {},
  text: {},
  math: {},
  stats: {},
  info: {},
  financial: {}
};

// --- HELPERS ---

const toBoolean = (val) => {
  if (val === true || val === "TRUE") return true;
  if (val === false || val === "FALSE" || val === "" || val === 0 || val === null || val === undefined) return false;
  if (!isNaN(val)) return Number(val) !== 0;
  return true;
};

const toString = (val) => {
  if (val === null || val === undefined || val === "") return "";
  if (val === true) return "TRUE";
  if (val === false) return "FALSE";
  return String(val);
};

const isNumber = (val) => typeof val === 'number' && !isNaN(val);
const isEmpty = (val) => val === null || val === undefined || val === "";
const isError = (val) => typeof val === 'string' && val.startsWith('#');
const isLogical = (val) => val === true || val === false || val === "TRUE" || val === "FALSE";

/**
 * Normalizes values for statistical functions.
 * Mode "Standard": ignore text/logical (returns null)
 * Mode "A": TRUE=1, FALSE=0, Text=0
 */
const normalizeStatValue = (val, mode = "Standard") => {
  if (isError(val)) return val;
  if (isEmpty(val)) return null;
  if (isNumber(val)) return val;

  if (mode === "A") {
    if (val === true || val === "TRUE") return 1;
    if (val === false || val === "FALSE") return 0;
    return 0; // Text is 0 in 'A' functions
  }

  // Standard mode ignores non-numeric
  return null;
};

const toNumber = (val) => {
  if (isNumber(val)) return val;
  if (isEmpty(val)) return null;
  if (val === true || val === "TRUE") return 1;
  if (val === false || val === "FALSE") return 0;
  const num = Number(val);
  return isNaN(num) ? "#VALUE!" : num;
};

/**
 * Validates that required financial arguments are numeric.
 * Returns the numeric values or an error string.
 */
const validateFinancialArgs = (args, requiredCount) => {
    const result = [];
    for (let i = 0; i < args.length; i++) {
        if (i < requiredCount && isEmpty(args[i])) return null; // Required arg missing
        const num = toNumber(args[i]);
        if (isError(num)) return num;
        result.push(num === null ? 0 : num);
    }
    return result;
};

// Flatten ranges/arrays for aggregation
const flattenArgs = (args) => {
  const result = [];
  args.forEach(arg => {
    if (Array.isArray(arg)) {
      arg.forEach(row => {
        if (Array.isArray(row)) {
          row.forEach(cell => result.push(cell));
        } else {
          result.push(row);
        }
      });
    } else {
      result.push(arg);
    }
  });
  return result;
};

// --- LOGICAL FUNCTIONS ---

FunctionRegistry.logical.AND = {
  fn: (args) => {
    const flat = flattenArgs(args);
    let hasLogical = false;
    for (const arg of flat) {
      if (arg === null || arg === "") continue;
      hasLogical = true;
      if (!toBoolean(arg)) return false;
    }
    return hasLogical ? true : "#VALUE!";
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.logical.OR = {
  fn: (args) => {
    const flat = flattenArgs(args);
    let hasLogical = false;
    for (const arg of flat) {
      if (arg === null || arg === "") continue;
      hasLogical = true;
      if (toBoolean(arg)) return true;
    }
    return hasLogical ? false : "#VALUE!";
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.logical.NOT = {
  fn: (args) => !toBoolean(args[0]),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.logical.TRUE = {
  fn: () => true,
  minArgs: 0,
  maxArgs: 0
};

FunctionRegistry.logical.FALSE = {
  fn: () => false,
  minArgs: 0,
  maxArgs: 0
};

FunctionRegistry.logical.XOR = {
  fn: (args) => {
    if (args.length === 0) return "#N/A";
    let trueCount = 0;
    for (const arg of args) {
      if (toBoolean(arg)) trueCount++;
    }
    return trueCount % 2 !== 0;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.logical.IF = {
  fn: (args) => {
    const [test, valueIfTrue, valueIfFalse] = args;
    if (test === null || test === "") return "";
    return toBoolean(test) ? valueIfTrue : (valueIfFalse !== undefined ? valueIfFalse : false);
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.logical.IFERROR = {
  fn: (args) => {
    const [val, valIfError] = args;
    const isErr = (v) => typeof v === 'string' && v.startsWith('#') && v !== '#N/A';
    return isErr(val) ? valIfError : val;
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.logical.IFNA = {
  fn: (args) => {
    const [val, valIfNa] = args;
    return val === '#N/A' ? valIfNa : val;
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.logical.IFS = {
  fn: (args) => {
    for (let i = 0; i < args.length; i += 2) {
      if (args[i] === null || args[i] === "") return "";
      if (toBoolean(args[i])) return args[i + 1];
    }
    return "#N/A";
  },
  minArgs: 2,
  maxArgs: null
};

FunctionRegistry.logical.SWITCH = {
  fn: (args) => {
    const expression = args[0];
    for (let i = 1; i < args.length - 1; i += 2) {
      if (expression === args[i]) return args[i + 1];
    }
    if (args.length % 2 === 0) return args[args.length - 1];
    return "#N/A";
  },
  minArgs: 3,
  maxArgs: null
};

FunctionRegistry.logical.LET = {
  fn: (args) => args[args.length - 1],
  minArgs: 3,
  maxArgs: null
};

FunctionRegistry.logical.LAMBDA = {
  fn: (args) => {
    return {
      type: 'LAMBDA',
      params: args.slice(0, -1),
      body: args[args.length - 1]
    };
  },
  minArgs: 2,
  maxArgs: null
};

// --- TEXT FUNCTIONS ---

FunctionRegistry.text.LEN = {
  fn: (args) => toString(args[0]).length,
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.LEFT = {
  fn: (args) => {
    const text = toString(args[0]);
    const num = args[1] !== undefined ? Number(args[1]) : 1;
    if (isNaN(num) || num < 0) return "#VALUE!";
    return text.substring(0, num);
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.text.RIGHT = {
  fn: (args) => {
    const text = toString(args[0]);
    const num = args[1] !== undefined ? Number(args[1]) : 1;
    if (isNaN(num) || num < 0) return "#VALUE!";
    return text.substring(Math.max(0, text.length - num));
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.text.MID = {
  fn: (args) => {
    const text = toString(args[0]);
    const start = Number(args[1]);
    const num = Number(args[2]);
    if (isNaN(start) || isNaN(num) || start < 1 || num < 0) return "#VALUE!";
    return text.substring(start - 1, start - 1 + num);
  },
  minArgs: 3,
  maxArgs: 3
};

FunctionRegistry.text.LOWER = {
  fn: (args) => toString(args[0]).toLowerCase(),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.UPPER = {
  fn: (args) => toString(args[0]).toUpperCase(),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.PROPER = {
  fn: (args) => {
    return toString(args[0]).replace(/\b\w/g, l => l.toUpperCase()).replace(/\B\w/g, l => l.toLowerCase());
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.TRIM = {
  fn: (args) => toString(args[0]).trim().replace(/\s+/g, ' '),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.CONCAT = {
  fn: (args) => flattenArgs(args).map(toString).join(''),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.text.CONCATENATE = {
  fn: (args) => flattenArgs(args).map(toString).join(''),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.text.TEXTJOIN = {
  fn: (args) => {
    const delimiter = toString(args[0]);
    const ignoreEmpty = toBoolean(args[1]);
    const parts = flattenArgs(args.slice(2)).map(toString);
    const filtered = ignoreEmpty ? parts.filter(p => p !== "") : parts;
    return filtered.join(delimiter);
  },
  minArgs: 3,
  maxArgs: null
};

FunctionRegistry.text.FIND = {
  fn: (args) => {
    const findText = toString(args[0]);
    const withinText = toString(args[1]);
    const start = args[2] !== undefined ? Number(args[2]) : 1;
    if (isNaN(start) || start < 1) return "#VALUE!";
    const pos = withinText.indexOf(findText, start - 1);
    return pos === -1 ? "#VALUE!" : pos + 1;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.text.SEARCH = {
  fn: (args) => {
    const findText = toString(args[0]).toLowerCase();
    const withinText = toString(args[1]).toLowerCase();
    const start = args[2] !== undefined ? Number(args[2]) : 1;
    if (isNaN(start) || start < 1) return "#VALUE!";
    const pos = withinText.indexOf(findText, start - 1);
    return pos === -1 ? "#VALUE!" : pos + 1;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.text.REPLACE = {
  fn: (args) => {
    const oldText = toString(args[0]);
    const start = Number(args[1]);
    const num = Number(args[2]);
    const newText = toString(args[3]);
    if (isNaN(start) || isNaN(num) || start < 1 || num < 0) return "#VALUE!";
    return oldText.substring(0, start - 1) + newText + oldText.substring(start - 1 + num);
  },
  minArgs: 4,
  maxArgs: 4
};

FunctionRegistry.text.SUBSTITUTE = {
  fn: (args) => {
    const text = toString(args[0]);
    const oldText = toString(args[1]);
    const newText = toString(args[2]);
    const instance = args[3] !== undefined ? Number(args[3]) : null;

    if (instance !== null) {
      if (isNaN(instance) || instance < 1) return "#VALUE!";
      let count = 0;
      return text.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), (match) => {
        count++;
        return count === instance ? newText : match;
      });
    }
    return text.split(oldText).join(newText);
  },
  minArgs: 3,
  maxArgs: 4
};

FunctionRegistry.text.CLEAN = {
  fn: (args) => toString(args[0]).replace(/[\x00-\x1F\x7F-\x9F]/g, ""),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.EXACT = {
  fn: (args) => toString(args[0]) === toString(args[1]),
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.text.VALUE = {
  fn: (args) => {
    const val = Number(toString(args[0]));
    return isNaN(val) ? "#VALUE!" : val;
  },
  minArgs: 1,
  maxArgs: 1
};

// --- MATH & TRIG FUNCTIONS ---

const mathUnary = (fn) => (args) => {
  const val = toNumber(args[0]);
  if (val === null) return null;
  if (isError(val)) return val;
  return fn(val);
};

FunctionRegistry.math.ABS = {
  fn: mathUnary(Math.abs),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.SQRT = {
  fn: (args) => {
    const val = toNumber(args[0]);
    if (val === null) return null;
    if (isError(val)) return val;
    if (val < 0) return "#NUM!";
    return Math.sqrt(val);
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.EXP = {
  fn: mathUnary(Math.exp),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.LN = {
  fn: (args) => {
    const val = toNumber(args[0]);
    if (val === null) return null;
    if (isError(val)) return val;
    if (val <= 0) return "#NUM!";
    return Math.log(val);
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.LOG10 = {
  fn: (args) => {
    const val = toNumber(args[0]);
    if (val === null) return null;
    if (isError(val)) return val;
    if (val <= 0) return "#NUM!";
    return Math.log10(val);
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.LOG = {
  fn: (args) => {
    const val = toNumber(args[0]);
    const base = args[1] !== undefined ? toNumber(args[1]) : 10;
    if (val === null) return null;
    if (isError(val)) return val;
    if (isError(base)) return base;
    if (val <= 0 || base <= 0 || base === 1) return "#NUM!";
    return Math.log(val) / Math.log(base);
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.SIGN = {
  fn: mathUnary(Math.sign),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.INT = {
  fn: mathUnary(Math.floor),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.SUM = {
  fn: (args) => {
    const flat = flattenArgs(args);
    let sum = 0;
    for (const val of flat) {
      if (isError(val)) return val;
      if (isNumber(val)) sum += val;
      else if (!isEmpty(val)) {
        const num = toNumber(val);
        if (isError(num)) return num;
        sum += num;
      }
    }
    return sum;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.math.PRODUCT = {
  fn: (args) => {
    const flat = flattenArgs(args);
    if (flat.length === 0) return 0;
    let prod = 1;
    let hasNumeric = false;
    for (const val of flat) {
      if (isError(val)) return val;
      if (isNumber(val)) {
        prod *= val;
        hasNumeric = true;
      } else if (!isEmpty(val)) {
        const num = toNumber(val);
        if (isError(num)) return num;
        prod *= num;
        hasNumeric = true;
      }
    }
    return hasNumeric ? prod : 0;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.math.MOD = {
  fn: (args) => {
    const n = toNumber(args[0]);
    const d = toNumber(args[1]);
    if (n === null || d === null) return null;
    if (isError(n)) return n;
    if (isError(d)) return d;
    if (d === 0) return "#DIV/0!";
    // Excel MOD formula: n - d * INT(n/d)
    return n - d * Math.floor(n / d);
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.math.POWER = {
  fn: (args) => {
    const b = toNumber(args[0]);
    const p = toNumber(args[1]);
    if (b === null || p === null) return null;
    if (isError(b)) return b;
    if (isError(p)) return p;
    const res = Math.pow(b, p);
    return isNaN(res) ? "#NUM!" : res;
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.math.QUOTIENT = {
  fn: (args) => {
    const n = toNumber(args[0]);
    const d = toNumber(args[1]);
    if (n === null || d === null) return null;
    if (isError(n)) return n;
    if (isError(d)) return d;
    if (d === 0) return "#DIV/0!";
    return Math.trunc(n / d);
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.math.PI = {
  fn: () => Math.PI,
  minArgs: 0,
  maxArgs: 0
};

// Rounding
FunctionRegistry.math.ROUND = {
  fn: (args) => {
    const val = toNumber(args[0]);
    const digits = args[1] !== undefined ? toNumber(args[1]) : 0;
    if (val === null) return null;
    if (isError(val)) return val;
    if (isError(digits)) return digits;
    const factor = Math.pow(10, digits);
    return Math.round(val * factor) / factor;
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.ROUNDUP = {
  fn: (args) => {
    const val = toNumber(args[0]);
    const digits = args[1] !== undefined ? toNumber(args[1]) : 0;
    if (val === null) return null;
    if (isError(val)) return val;
    if (isError(digits)) return digits;
    const factor = Math.pow(10, digits);
    return Math.ceil(Math.abs(val) * factor) / factor * Math.sign(val);
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.ROUNDDOWN = {
  fn: (args) => {
    const val = toNumber(args[0]);
    const digits = args[1] !== undefined ? toNumber(args[1]) : 0;
    if (val === null) return null;
    if (isError(val)) return val;
    if (isError(digits)) return digits;
    const factor = Math.pow(10, digits);
    return Math.floor(Math.abs(val) * factor) / factor * Math.sign(val);
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.CEILING = {
  fn: (args) => {
    const val = toNumber(args[0]);
    const sig = args[1] !== undefined ? toNumber(args[1]) : 1;
    if (val === null) return null;
    if (isError(val)) return val;
    if (isError(sig)) return sig;
    if (sig === 0) return 0;
    if (val > 0 && sig < 0) return "#NUM!";
    return Math.ceil(val / sig) * sig;
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.FLOOR = {
  fn: (args) => {
    const val = toNumber(args[0]);
    const sig = args[1] !== undefined ? toNumber(args[1]) : 1;
    if (val === null) return null;
    if (isError(val)) return val;
    if (isError(sig)) return sig;
    if (sig === 0) return 0;
    if (val > 0 && sig < 0) return "#NUM!";
    return Math.floor(val / sig) * sig;
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.RAND = {
  fn: () => Math.random(),
  minArgs: 0,
  maxArgs: 0
};

FunctionRegistry.math.RANDBETWEEN = {
  fn: (args) => {
    const bottom = toNumber(args[0]);
    const top = toNumber(args[1]);
    if (bottom === null || top === null) return null;
    if (isError(bottom)) return bottom;
    if (isError(top)) return top;
    return Math.floor(Math.random() * (top - bottom + 1)) + bottom;
  },
  minArgs: 2,
  maxArgs: 2
};

// Trigonometric
FunctionRegistry.math.SIN = { fn: mathUnary(Math.sin), minArgs: 1, maxArgs: 1 };
FunctionRegistry.math.COS = { fn: mathUnary(Math.cos), minArgs: 1, maxArgs: 1 };
FunctionRegistry.math.TAN = { fn: mathUnary(Math.tan), minArgs: 1, maxArgs: 1 };
FunctionRegistry.math.ASIN = {
  fn: (args) => {
    const val = toNumber(args[0]);
    if (val === null) return null;
    if (isError(val)) return val;
    if (val < -1 || val > 1) return "#NUM!";
    return Math.asin(val);
  },
  minArgs: 1, maxArgs: 1
};
FunctionRegistry.math.ACOS = {
  fn: (args) => {
    const val = toNumber(args[0]);
    if (val === null) return null;
    if (isError(val)) return val;
    if (val < -1 || val > 1) return "#NUM!";
    return Math.acos(val);
  },
  minArgs: 1, maxArgs: 1
};
FunctionRegistry.math.ATAN = { fn: mathUnary(Math.atan), minArgs: 1, maxArgs: 1 };
FunctionRegistry.math.ATAN2 = {
  fn: (args) => {
    const x = toNumber(args[0]);
    const y = toNumber(args[1]);
    if (x === null || y === null) return null;
    if (isError(x)) return x;
    if (isError(y)) return y;
    return Math.atan2(y, x);
  },
  minArgs: 2, maxArgs: 2
};
FunctionRegistry.math.DEGREES = {
  fn: (args) => {
    const val = toNumber(args[0]);
    if (val === null) return null;
    if (isError(val)) return val;
    return val * 180 / Math.PI;
  },
  minArgs: 1, maxArgs: 1
};
FunctionRegistry.math.RADIANS = {
  fn: (args) => {
    const val = toNumber(args[0]);
    if (val === null) return null;
    if (isError(val)) return val;
    return val * Math.PI / 180;
  },
  minArgs: 1, maxArgs: 1
};

// Conditional
const checkCriteria = (val, criteria) => {
    if (isError(val)) return false;
    const sCriteria = toString(criteria);
    const sVal = toString(val);

    if (sCriteria.startsWith(">=")) return toNumber(sVal) >= toNumber(sCriteria.substring(2));
    if (sCriteria.startsWith("<=")) return toNumber(sVal) <= toNumber(sCriteria.substring(2));
    if (sCriteria.startsWith(">")) return toNumber(sVal) > toNumber(sCriteria.substring(1));
    if (sCriteria.startsWith("<")) return toNumber(sVal) < toNumber(sCriteria.substring(1));
    if (sCriteria.startsWith("<>")) return sVal !== sCriteria.substring(2);
    if (sCriteria.startsWith("=")) return sVal === sCriteria.substring(1);

    return sVal === sCriteria;
};

FunctionRegistry.math.SUMIF = {
  fn: (args) => {
    const range = args[0];
    const criteria = args[1];
    const sumRange = args[2] || range;

    if (!Array.isArray(range)) return "#VALUE!";
    const flatRange = range.flat();
    const flatSumRange = sumRange.flat();

    let sum = 0;
    for (let i = 0; i < flatRange.length; i++) {
        if (checkCriteria(flatRange[i], criteria)) {
            const val = toNumber(flatSumRange[i]);
            if (!isError(val)) sum += val;
        }
    }
    return sum;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.math.SUMIFS = {
  fn: (args) => {
    const sumRange = args[0];
    if (!Array.isArray(sumRange)) return "#VALUE!";
    const flatSum = sumRange.flat();

    let sum = 0;
    for (let i = 0; i < flatSum.length; i++) {
        let match = true;
        for (let j = 1; j < args.length; j += 2) {
            const criteriaRange = args[j];
            const criteria = args[j+1];
            if (!Array.isArray(criteriaRange)) { match = false; break; }
            if (!checkCriteria(criteriaRange.flat()[i], criteria)) {
                match = false;
                break;
            }
        }
        if (match) {
            const val = toNumber(flatSum[i]);
            if (!isError(val)) sum += val;
        }
    }
    return sum;
  },
  minArgs: 3,
  maxArgs: null
};

FunctionRegistry.math.SUMPRODUCT = {
  fn: (args) => {
    if (args.length === 0) return 0;
    const arrays = args.map(a => Array.isArray(a) ? a.flat() : [a]);
    const len = arrays[0].length;
    if (arrays.some(a => a.length !== len)) return "#VALUE!";

    let total = 0;
    for (let i = 0; i < len; i++) {
        let product = 1;
        for (const arr of arrays) {
            const val = toNumber(arr[i]);
            if (isError(val)) return val;
            product *= val;
        }
        total += product;
    }
    return total;
  },
  minArgs: 1,
  maxArgs: null
};

// --- STATISTICAL FUNCTIONS ---

const statsAggregator = (mode) => (args) => {
  const flat = flattenArgs(args);
  const values = [];
  for (const arg of flat) {
    if (isError(arg)) return arg;
    const val = normalizeStatValue(arg, mode);
    if (val !== null) values.push(val);
  }
  return values;
};

FunctionRegistry.stats.AVERAGE = {
  fn: (args) => {
    const values = statsAggregator("Standard")(args);
    if (isError(values)) return values;
    if (values.length === 0) return "#DIV/0!";
    return values.reduce((a, b) => a + b, 0) / values.length;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.AVERAGEA = {
  fn: (args) => {
    const values = statsAggregator("A")(args);
    if (isError(values)) return values;
    if (values.length === 0) return "#DIV/0!";
    return values.reduce((a, b) => a + b, 0) / values.length;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.COUNT = {
  fn: (args) => {
    const flat = flattenArgs(args);
    let count = 0;
    for (const arg of flat) {
      if (isNumber(arg)) count++;
    }
    return count;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.COUNTA = {
  fn: (args) => {
    const flat = flattenArgs(args);
    let count = 0;
    for (const arg of flat) {
      if (!isEmpty(arg)) count++;
    }
    return count;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.COUNTBLANK = {
  fn: (args) => {
    const flat = flattenArgs(args);
    let count = 0;
    for (const arg of flat) {
      if (isEmpty(arg)) count++;
    }
    return count;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MAX = {
  fn: (args) => {
    const values = statsAggregator("Standard")(args);
    if (isError(values)) return values;
    if (values.length === 0) return 0;
    return Math.max(...values);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MAXA = {
  fn: (args) => {
    const values = statsAggregator("A")(args);
    if (isError(values)) return values;
    if (values.length === 0) return 0;
    return Math.max(...values);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MIN = {
  fn: (args) => {
    const values = statsAggregator("Standard")(args);
    if (isError(values)) return values;
    if (values.length === 0) return 0;
    return Math.min(...values);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MINA = {
  fn: (args) => {
    const values = statsAggregator("A")(args);
    if (isError(values)) return values;
    if (values.length === 0) return 0;
    return Math.min(...values);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MEDIAN = {
  fn: (args) => {
    const values = statsAggregator("Standard")(args).sort((a, b) => a - b);
    if (isError(values)) return values;
    if (values.length === 0) return "#NUM!";
    const mid = Math.floor(values.length / 2);
    return values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MODE = {
  fn: (args) => {
    const values = statsAggregator("Standard")(args);
    if (isError(values)) return values;
    if (values.length === 0) return "#N/A";
    const counts = new Map();
    let maxCount = 0;
    let mode = null;
    for (const v of values) {
      const c = (counts.get(v) || 0) + 1;
      counts.set(v, c);
      if (c > maxCount) { maxCount = c; mode = v; }
    }
    return maxCount > 1 ? mode : "#N/A";
  },
  minArgs: 1,
  maxArgs: null
};

const variance = (values, population = false) => {
  if (values.length < (population ? 1 : 2)) return "#DIV/0!";
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const sqDiffs = values.map(v => Math.pow(v - avg, 2));
  return sqDiffs.reduce((a, b) => a + b, 0) / (values.length - (population ? 0 : 1));
};

FunctionRegistry.stats['VAR.S'] = {
  fn: (args) => variance(statsAggregator("Standard")(args), false),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats['VAR.P'] = {
  fn: (args) => variance(statsAggregator("Standard")(args), true),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats['STDEV.S'] = {
  fn: (args) => {
    const v = variance(statsAggregator("Standard")(args), false);
    return isError(v) ? v : Math.sqrt(v);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats['STDEV.P'] = {
  fn: (args) => {
    const v = variance(statsAggregator("Standard")(args), true);
    return isError(v) ? v : Math.sqrt(v);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.LARGE = {
  fn: (args) => {
    const values = statsAggregator("Standard")([args[0]]).sort((a, b) => b - a);
    const k = toNumber(args[1]);
    if (isError(values)) return values;
    if (isError(k)) return k;
    if (k < 1 || k > values.length) return "#NUM!";
    return values[k - 1];
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.stats.SMALL = {
  fn: (args) => {
    const values = statsAggregator("Standard")([args[0]]).sort((a, b) => a - b);
    const k = toNumber(args[1]);
    if (isError(values)) return values;
    if (isError(k)) return k;
    if (k < 1 || k > values.length) return "#NUM!";
    return values[k - 1];
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.stats['RANK.EQ'] = {
  fn: (args) => {
    const number = toNumber(args[0]);
    const ref = statsAggregator("Standard")([args[1]]);
    const order = args[2] !== undefined ? toNumber(args[2]) : 0;
    if (isError(number)) return number;
    if (isError(ref)) return ref;

    const sorted = ref.sort((a, b) => order === 0 ? b - a : a - b);
    const idx = sorted.indexOf(number);
    return idx === -1 ? "#N/A" : idx + 1;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.stats['RANK.AVG'] = {
  fn: (args) => {
    const number = toNumber(args[0]);
    const ref = statsAggregator("Standard")([args[1]]);
    const order = args[2] !== undefined ? toNumber(args[2]) : 0;
    if (isError(number)) return number;
    if (isError(ref)) return ref;

    const sorted = ref.sort((a, b) => order === 0 ? b - a : a - b);
    const firstIdx = sorted.indexOf(number);
    if (firstIdx === -1) return "#N/A";
    const lastIdx = sorted.lastIndexOf(number);
    return (firstIdx + lastIdx + 2) / 2;
  },
  minArgs: 2,
  maxArgs: 3
};

const percentile = (values, k, inclusive = true) => {
    if (values.length === 0) return "#NUM!";
    const sorted = values.sort((a, b) => a - b);
    const n = sorted.length;
    let index;

    if (inclusive) {
        if (k < 0 || k > 1) return "#NUM!";
        index = k * (n - 1);
    } else {
        if (k <= 0 || k >= 1) return "#NUM!";
        index = k * (n + 1) - 1;
    }

    if (index < 0 || index >= n - 1) {
        if (index < 0) return sorted[0];
        if (index >= n - 1) return sorted[n - 1];
    }

    const i = Math.floor(index);
    const f = index - i;
    return sorted[i] + f * (sorted[i + 1] - sorted[i]);
};

FunctionRegistry.stats['PERCENTILE.INC'] = {
    fn: (args) => percentile(statsAggregator("Standard")([args[0]]), toNumber(args[1]), true),
    minArgs: 2, maxArgs: 2
};

FunctionRegistry.stats['PERCENTILE.EXC'] = {
    fn: (args) => percentile(statsAggregator("Standard")([args[0]]), toNumber(args[1]), false),
    minArgs: 2, maxArgs: 2
};

FunctionRegistry.stats['QUARTILE.INC'] = {
    fn: (args) => {
        const q = toNumber(args[1]);
        if (isError(q)) return q;
        if (q < 0 || q > 4) return "#NUM!";
        return percentile(statsAggregator("Standard")([args[0]]), q / 4, true);
    },
    minArgs: 2, maxArgs: 2
};

FunctionRegistry.stats['QUARTILE.EXC'] = {
    fn: (args) => {
        const q = toNumber(args[1]);
        if (isError(q)) return q;
        if (q < 1 || q > 3) return "#NUM!";
        return percentile(statsAggregator("Standard")([args[0]]), q / 4, false);
    },
    minArgs: 2, maxArgs: 2
};

FunctionRegistry.stats.COUNTIF = {
  fn: (args) => {
    const range = args[0];
    const criteria = args[1];
    if (!Array.isArray(range)) return checkCriteria(range, criteria) ? 1 : 0;

    const flatRange = range.flat();
    let count = 0;
    for (const val of flatRange) {
      if (checkCriteria(val, criteria)) count++;
    }
    return count;
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.stats.COUNTIFS = {
  fn: (args) => {
    const ranges = [];
    for (let i = 0; i < args.length; i += 2) {
      ranges.push({ range: Array.isArray(args[i]) ? args[i].flat() : [args[i]], crit: args[i+1] });
    }
    const len = ranges[0].range.length;
    if (ranges.some(r => r.range.length !== len)) return "#VALUE!";

    let count = 0;
    for (let i = 0; i < len; i++) {
      let match = true;
      for (const r of ranges) {
        if (!checkCriteria(r.range[i], r.crit)) { match = false; break; }
      }
      if (match) count++;
    }
    return count;
  },
  minArgs: 2,
  maxArgs: null
};

FunctionRegistry.stats.AVERAGEIF = {
  fn: (args) => {
    const range = args[0];
    const criteria = args[1];
    const avgRange = args[2] || range;
    if (!Array.isArray(range)) return checkCriteria(range, criteria) ? toNumber(avgRange) : "#DIV/0!";

    const flatRange = range.flat();
    const flatAvgRange = avgRange.flat();
    let sum = 0, count = 0;

    for (let i = 0; i < flatRange.length; i++) {
      if (checkCriteria(flatRange[i], criteria)) {
        const val = toNumber(flatAvgRange[i]);
        if (isNumber(val)) { sum += val; count++; }
      }
    }
    return count === 0 ? "#DIV/0!" : sum / count;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.stats.AVERAGEIFS = {
  fn: (args) => {
    const avgRange = Array.isArray(args[0]) ? args[0].flat() : [args[0]];
    const criteriaPairs = [];
    for (let i = 1; i < args.length; i += 2) {
      criteriaPairs.push({ range: Array.isArray(args[i]) ? args[i].flat() : [args[i]], crit: args[i+1] });
    }
    const len = avgRange.length;
    if (criteriaPairs.some(p => p.range.length !== len)) return "#VALUE!";

    let sum = 0, count = 0;
    for (let i = 0; i < len; i++) {
      let match = true;
      for (const p of criteriaPairs) {
        if (!checkCriteria(p.range[i], p.crit)) { match = false; break; }
      }
      if (match) {
        const val = toNumber(avgRange[i]);
        if (isNumber(val)) { sum += val; count++; }
      }
    }
    return count === 0 ? "#DIV/0!" : sum / count;
  },
  minArgs: 3,
  maxArgs: null
};

// --- INFORMATION FUNCTIONS ---

FunctionRegistry.info.ISBLANK = {
  fn: (args) => isEmpty(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISNUMBER = {
  fn: (args) => isNumber(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISTEXT = {
  fn: (args) => typeof args[0] === 'string' && !isError(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISNONTEXT = {
  fn: (args) => typeof args[0] !== 'string' || isError(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISERROR = {
  fn: (args) => isError(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISERR = {
  fn: (args) => isError(args[0]) && args[0] !== "#N/A",
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISNA = {
  fn: (args) => args[0] === "#N/A",
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISLOGICAL = {
  fn: (args) => typeof args[0] === 'boolean' || args[0] === "TRUE" || args[0] === "FALSE",
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISEVEN = {
  fn: (args) => {
    const val = toNumber(args[0]);
    if (isError(val)) return val;
    return Math.floor(Math.abs(val)) % 2 === 0;
  },
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISODD = {
  fn: (args) => {
    const val = toNumber(args[0]);
    if (isError(val)) return val;
    return Math.floor(Math.abs(val)) % 2 !== 0;
  },
  minArgs: 1, maxArgs: 1
};

// --- FINANCIAL FUNCTIONS ---

FunctionRegistry.financial.FV = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 3);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [rate, nper, pmt, pv = 0, type = 0] = valid;
    if (rate === 0) return -(pv + pmt * nper);
    const term = Math.pow(1 + rate, nper);
    return -(pv * term + pmt * (1 + rate * type) * (term - 1) / rate);
  },
  minArgs: 3, maxArgs: 5
};

FunctionRegistry.financial.PV = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 3);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [rate, nper, pmt, fv = 0, type = 0] = valid;
    if (rate === 0) return -(fv + pmt * nper);
    const term = Math.pow(1 + rate, nper);
    return -(fv + pmt * (1 + rate * type) * (term - 1) / rate) / term;
  },
  minArgs: 3, maxArgs: 5
};

FunctionRegistry.financial.PMT = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 3);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [rate, nper, pv, fv = 0, type = 0] = valid;
    if (rate === 0) return -(pv + fv) / nper;
    const term = Math.pow(1 + rate, nper);
    return -(pv * term + fv) * rate / ((1 + rate * type) * (term - 1));
  },
  minArgs: 3, maxArgs: 5
};

FunctionRegistry.financial.NPER = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 3);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [rate, pmt, pv, fv = 0, type = 0] = valid;
    if (rate === 0) return -(pv + fv) / pmt;
    const num = pmt * (1 + rate * type) - fv * rate;
    const den = rate * pv + pmt * (1 + rate * type);
    return Math.log(num / den) / Math.log(1 + rate);
  },
  minArgs: 3, maxArgs: 5
};

FunctionRegistry.financial.IPMT = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 4);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [rate, per, nper, pv, fv = 0, type = 0] = valid;
    if (per < 1 || per > nper) return "#NUM!";

    // Formula for balance at end of previous period (per-1)
    const prevBalance = FunctionRegistry.financial.FV.fn([rate, per - 1, FunctionRegistry.financial.PMT.fn([rate, nper, pv, fv, type]), pv, type]);
    return prevBalance * rate;
  },
  minArgs: 4, maxArgs: 6
};

FunctionRegistry.financial.PPMT = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 4);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [rate, per, nper, pv, fv = 0, type = 0] = valid;
    const pmt = FunctionRegistry.financial.PMT.fn([rate, nper, pv, fv, type]);
    const ipmt = FunctionRegistry.financial.IPMT.fn([rate, per, nper, pv, fv, type]);
    if (isError(ipmt)) return ipmt;
    return pmt - ipmt;
  },
  minArgs: 4, maxArgs: 6
};

FunctionRegistry.financial.CUMIPMT = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 6);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [rate, nper, pv, start, end, type] = valid;
    if (start < 1 || end < start || end > nper || rate <= 0) return "#NUM!";

    let total = 0;
    for (let p = start; p <= end; p++) {
      total += FunctionRegistry.financial.IPMT.fn([rate, p, nper, pv, 0, type]);
    }
    return total;
  },
  minArgs: 6, maxArgs: 6
};

FunctionRegistry.financial.CUMPRINC = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 6);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [rate, nper, pv, start, end, type] = valid;
    if (start < 1 || end < start || end > nper || rate <= 0) return "#NUM!";

    let total = 0;
    for (let p = start; p <= end; p++) {
      total += FunctionRegistry.financial.PPMT.fn([rate, p, nper, pv, 0, type]);
    }
    return total;
  },
  minArgs: 6, maxArgs: 6
};

// Depreciation
FunctionRegistry.financial.SLN = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 3);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [cost, salvage, life] = valid;
    if (life <= 0) return "#DIV/0!";
    return (cost - salvage) / life;
  },
  minArgs: 3, maxArgs: 3
};

FunctionRegistry.financial.SYD = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 4);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [cost, salvage, life, per] = valid;
    if (life <= 0 || per < 1 || per > life) return "#NUM!";
    return (cost - salvage) * (life - per + 1) * 2 / (life * (life + 1));
  },
  minArgs: 4, maxArgs: 4
};

FunctionRegistry.financial.DDB = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 4);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [cost, salvage, life, period, factor = 2] = valid;
    if (life <= 0 || period < 1 || period > life || factor <= 0) return "#NUM!";

    let totalDep = 0;
    let periodDep = 0;
    for (let i = 1; i <= period; i++) {
        periodDep = Math.min(
            (cost - totalDep) * (factor / life),
            Math.max(0, cost - salvage - totalDep)
        );
        totalDep += periodDep;
    }
    return periodDep;
  },
  minArgs: 4, maxArgs: 5
};

FunctionRegistry.financial.DB = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 4);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [cost, salvage, life, period, month = 12] = valid;
    if (life <= 0 || period < 1 || period > life + 1) return "#NUM!";

    const rate = Math.round((1 - Math.pow(salvage / cost, 1 / life)) * 1000) / 1000;
    let totalDep = 0;
    let periodDep = 0;

    for (let i = 1; i <= period; i++) {
        if (i === 1) {
            periodDep = cost * rate * month / 12;
        } else if (i === life + 1) {
            periodDep = (cost - totalDep) * rate * (12 - month) / 12;
        } else {
            periodDep = (cost - totalDep) * rate;
        }
        totalDep += periodDep;
    }
    return periodDep;
  },
  minArgs: 4, maxArgs: 5
};

FunctionRegistry.financial.NPV = {
  fn: (args) => {
    const rate = toNumber(args[0]);
    if (isError(rate)) return rate;
    if (rate === null) return null;

    const values = flattenArgs(args.slice(1)).filter(v => v !== null);
    let total = 0;
    for (let i = 0; i < values.length; i++) {
        const val = toNumber(values[i]);
        if (isError(val)) return val;
        total += val / Math.pow(1 + rate, i + 1);
    }
    return total;
  },
  minArgs: 2, maxArgs: null
};

const iterateNewton = (fn, dfn, guess = 0.1, maxIter = 100, tolerance = 1e-7) => {
    let x = guess;
    for (let i = 0; i < maxIter; i++) {
        const y = fn(x);
        const dy = dfn(x);
        if (Math.abs(dy) < 1e-10) break;
        const nextX = x - y / dy;
        if (Math.abs(nextX - x) < tolerance) return nextX;
        x = nextX;
    }
    return "#NUM!";
};

FunctionRegistry.financial.IRR = {
  fn: (args) => {
    const values = flattenArgs(args[0]).filter(v => v !== null).map(v => toNumber(v));
    const guess = args[1] !== undefined ? toNumber(args[1]) : 0.1;
    if (values.some(v => typeof v === 'string')) return "#VALUE!";

    const hasPos = values.some(v => v > 0);
    const hasNeg = values.some(v => v < 0);
    if (!hasPos || !hasNeg) return "#NUM!";

    const npv = (rate) => {
        let total = 0;
        for (let i = 0; i < values.length; i++) total += values[i] / Math.pow(1 + rate, i);
        return total;
    };
    const dnpv = (rate) => {
        let total = 0;
        for (let i = 1; i < values.length; i++) total -= i * values[i] / Math.pow(1 + rate, i + 1);
        return total;
    };

    return iterateNewton(npv, dnpv, guess);
  },
  minArgs: 1, maxArgs: 2
};

FunctionRegistry.financial.RATE = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 3);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [nper, pmt, pv, fv = 0, type = 0, guess = 0.1] = valid;

    const f = (rate) => {
        if (rate === 0) return pv + pmt * nper + fv;
        const term = Math.pow(1 + rate, nper);
        return pv * term + pmt * (1 + rate * type) * (term - 1) / rate + fv;
    };
    const df = (rate) => {
        if (rate === 0) return pv * nper + pmt * nper * (nper - 1) / 2;
        const term = Math.pow(1 + rate, nper);
        const dTerm = nper * Math.pow(1 + rate, nper - 1);
        return pv * dTerm + pmt * ( (type * (term - 1) + (1 + rate * type) * dTerm) * rate - (1 + rate * type) * (term - 1) ) / (rate * rate);
    };

    return iterateNewton(f, df, guess);
  },
  minArgs: 3, maxArgs: 6
};

FunctionRegistry.financial.MIRR = {
  fn: (args) => {
    const values = flattenArgs(args[0]).filter(v => v !== null).map(v => toNumber(v));
    const financeRate = toNumber(args[1]);
    const reinvestRate = toNumber(args[2]);
    if (isError(financeRate)) return financeRate;
    if (isError(reinvestRate)) return reinvestRate;

    const n = values.length - 1;
    let npvPos = 0;
    let npvNeg = 0;

    for (let i = 0; i < values.length; i++) {
        const v = values[i];
        if (v >= 0) npvPos += v / Math.pow(1 + reinvestRate, i);
        else npvNeg += v / Math.pow(1 + financeRate, i);
    }

    if (npvNeg === 0 || npvPos === 0) return "#DIV/0!";

    return Math.pow(-(npvPos * Math.pow(1 + reinvestRate, n)) / npvNeg, 1 / n) - 1;
  },
  minArgs: 3, maxArgs: 3
};

FunctionRegistry.financial.EFFECT = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 2);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [nominalRate, npery] = valid;
    if (nominalRate <= 0 || npery < 1) return "#NUM!";
    return Math.pow(1 + nominalRate / npery, npery) - 1;
  },
  minArgs: 2, maxArgs: 2
};

FunctionRegistry.financial.NOMINAL = {
  fn: (args) => {
    const valid = validateFinancialArgs(args, 2);
    if (!valid) return null; if (typeof valid === 'string') return valid;
    const [effectRate, npery] = valid;
    if (effectRate <= 0 || npery < 1) return "#NUM!";
    return (Math.pow(effectRate + 1, 1 / npery) - 1) * npery;
  },
  minArgs: 2, maxArgs: 2
};

export default FunctionRegistry;
