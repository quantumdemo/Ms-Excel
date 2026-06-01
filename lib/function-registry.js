
/**
 * FunctionRegistry stores all available spreadsheet functions.
 */
const FunctionRegistry = {
  logical: {},
  text: {},
  math: {}
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

const toNumber = (val) => {
  if (isNumber(val)) return val;
  if (isEmpty(val)) return null;
  if (val === true || val === "TRUE") return 1;
  if (val === false || val === "FALSE") return 0;
  const num = Number(val);
  return isNaN(num) ? "#VALUE!" : num;
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

export default FunctionRegistry;
