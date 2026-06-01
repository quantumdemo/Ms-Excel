import {
  IS_EMPTY,
  IS_NUMBER,
  IS_ERROR,
  IS_LOGICAL,
  FLATTEN,
  IterativeEngine,
  TO_NUMBER,
  TO_LOGICAL
} from './evaluation-pipeline.js';

import {
  VALIDATE_CASHFLOW_SIGNS,
  SOLVE_ITERATIVELY,
  TVM_MODELS,
  VALIDATE_PERIODS,
  VALIDATE_DEPRECIATION
} from './financial-enforcement.js';

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

// --- INTERNAL HELPERS ---

const toString = (val) => {
  if (val === null || val === undefined || val === "") return "";
  if (val === true) return "TRUE";
  if (val === false) return "FALSE";
  return String(val);
};

/**
 * Normalizes values for statistical functions.
 * Mode "Standard": ignore text/logical (returns null)
 * Mode "A": TRUE=1, FALSE=0, Text=0
 */
const normalizeStatValue = (val, mode = "Standard") => {
  if (IS_ERROR(val)) return val;
  if (IS_EMPTY(val)) return null;
  if (IS_NUMBER(val)) return val;

  if (mode === "A") {
    if (val === true || val === "TRUE") return 1;
    if (val === false || val === "FALSE") return 0;
    return 0; // Text is 0 in 'A' functions
  }

  // Standard mode ignores non-numeric
  return null;
};

// --- LOGICAL FUNCTIONS ---

FunctionRegistry.logical.AND = {
  category: 'Logical',
  schema: ['logical'],
  autoFlatten: true,
  fn: (args) => {
    const flat = args[0];
    let hasLogical = false;
    for (const arg of flat) {
      if (IS_EMPTY(arg)) continue;
      hasLogical = true;
      if (!arg) return false;
    }
    return hasLogical ? true : "#VALUE!";
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.logical.OR = {
  category: 'Logical',
  schema: ['logical'],
  autoFlatten: true,
  fn: (args) => {
    const flat = args[0];
    let hasLogical = false;
    for (const arg of flat) {
      if (IS_EMPTY(arg)) continue;
      hasLogical = true;
      if (arg) return true;
    }
    return hasLogical ? false : "#VALUE!";
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.logical.NOT = {
  category: 'Logical',
  schema: ['logical'],
  fn: (args) => !args[0],
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.logical.TRUE = {
  category: 'Logical',
  fn: () => true,
  minArgs: 0,
  maxArgs: 0
};

FunctionRegistry.logical.FALSE = {
  category: 'Logical',
  fn: () => false,
  minArgs: 0,
  maxArgs: 0
};

FunctionRegistry.logical.XOR = {
  category: 'Logical',
  schema: ['logical'],
  autoFlatten: true,
  fn: (args) => {
    const flat = args[0];
    if (flat.length === 0) return "#N/A";
    let trueCount = 0;
    for (const arg of flat) {
      if (arg) trueCount++;
    }
    return trueCount % 2 !== 0;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.logical.IF = {
  category: 'Logical',
  schema: ['logical', 'any', 'any'],
  fn: (args) => {
    const [test, valueIfTrue, valueIfFalse] = args;
    if (IS_EMPTY(test)) return "";
    return test ? valueIfTrue : (valueIfFalse !== undefined ? valueIfFalse : false);
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.logical.IFERROR = {
  category: 'Logical',
  schema: ['any', 'any'],
  fn: (args) => {
    const [val, valIfError] = args;
    const isErr = (v) => typeof v === 'string' && v.startsWith('#') && v !== '#N/A';
    return isErr(val) ? valIfError : val;
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.logical.IFNA = {
  category: 'Logical',
  schema: ['any', 'any'],
  fn: (args) => {
    const [val, valIfNa] = args;
    return val === '#N/A' ? valIfNa : val;
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.logical.IFS = {
  category: 'Logical',
  schema: ['logical', 'any'],
  fn: (args) => {
    for (let i = 0; i < args.length; i += 2) {
      if (IS_EMPTY(args[i])) return "";
      if (args[i]) return args[i + 1];
    }
    return "#N/A";
  },
  minArgs: 2,
  maxArgs: null
};

FunctionRegistry.logical.SWITCH = {
  category: 'Logical',
  schema: ['any'],
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
  category: 'Logical',
  schema: ['any'],
  fn: (args) => args[args.length - 1],
  minArgs: 3,
  maxArgs: null
};

FunctionRegistry.logical.LAMBDA = {
  category: 'Logical',
  schema: ['any'],
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
  category: 'Text',
  schema: ['text'],
  fn: (args) => toString(args[0]).length,
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.LEFT = {
  category: 'Text',
  schema: ['text', 'number'],
  fn: (args) => {
    const text = toString(args[0]);
    const num = args[1] !== undefined ? args[1] : 1;
    if (num < 0) return "#VALUE!";
    return text.substring(0, num);
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.text.RIGHT = {
  category: 'Text',
  schema: ['text', 'number'],
  fn: (args) => {
    const text = toString(args[0]);
    const num = args[1] !== undefined ? args[1] : 1;
    if (num < 0) return "#VALUE!";
    return text.substring(Math.max(0, text.length - num));
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.text.MID = {
  category: 'Text',
  schema: ['text', 'number', 'number'],
  fn: (args) => {
    const text = toString(args[0]);
    const start = args[1];
    const num = args[2];
    if (start < 1 || num < 0) return "#VALUE!";
    return text.substring(start - 1, start - 1 + num);
  },
  minArgs: 3,
  maxArgs: 3
};

FunctionRegistry.text.LOWER = {
  category: 'Text',
  schema: ['text'],
  fn: (args) => toString(args[0]).toLowerCase(),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.UPPER = {
  category: 'Text',
  schema: ['text'],
  fn: (args) => toString(args[0]).toUpperCase(),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.PROPER = {
  category: 'Text',
  schema: ['text'],
  fn: (args) => {
    return toString(args[0]).replace(/\b\w/g, l => l.toUpperCase()).replace(/\B\w/g, l => l.toLowerCase());
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.TRIM = {
  category: 'Text',
  schema: ['text'],
  fn: (args) => toString(args[0]).trim().replace(/\s+/g, ' '),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.CONCAT = {
  category: 'Text',
  schema: ['text'],
  autoFlatten: true,
  fn: (args) => args[0].map(toString).join(''),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.text.CONCATENATE = {
  category: 'Text',
  schema: ['text'],
  autoFlatten: true,
  fn: (args) => args[0].map(toString).join(''),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.text.TEXTJOIN = {
  category: 'Text',
  schema: ['text', 'logical', 'text'],
  fn: (args) => {
    const delimiter = toString(args[0]);
    const ignoreEmpty = args[1];
    const parts = FLATTEN(args.slice(2)).map(toString);
    const filtered = ignoreEmpty ? parts.filter(p => p !== "") : parts;
    return filtered.join(delimiter);
  },
  minArgs: 3,
  maxArgs: null
};

FunctionRegistry.text.FIND = {
  category: 'Text',
  schema: ['text', 'text', 'number'],
  fn: (args) => {
    const findText = toString(args[0]);
    const withinText = toString(args[1]);
    const start = args[2] !== undefined ? args[2] : 1;
    if (start < 1) return "#VALUE!";
    const pos = withinText.indexOf(findText, start - 1);
    return pos === -1 ? "#VALUE!" : pos + 1;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.text.SEARCH = {
  category: 'Text',
  schema: ['text', 'text', 'number'],
  fn: (args) => {
    const findText = toString(args[0]).toLowerCase();
    const withinText = toString(args[1]).toLowerCase();
    const start = args[2] !== undefined ? args[2] : 1;
    if (start < 1) return "#VALUE!";
    const pos = withinText.indexOf(findText, start - 1);
    return pos === -1 ? "#VALUE!" : pos + 1;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.text.REPLACE = {
  category: 'Text',
  schema: ['text', 'number', 'number', 'text'],
  fn: (args) => {
    const oldText = toString(args[0]);
    const start = args[1];
    const num = args[2];
    const newText = toString(args[3]);
    if (start < 1 || num < 0) return "#VALUE!";
    return oldText.substring(0, start - 1) + newText + oldText.substring(start - 1 + num);
  },
  minArgs: 4,
  maxArgs: 4
};

FunctionRegistry.text.SUBSTITUTE = {
  category: 'Text',
  schema: ['text', 'text', 'text', 'number'],
  fn: (args) => {
    const text = toString(args[0]);
    const oldText = toString(args[1]);
    const newText = toString(args[2]);
    const instance = args[3] !== undefined ? args[3] : null;

    if (instance !== null) {
      if (instance < 1) return "#VALUE!";
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
  category: 'Text',
  schema: ['text'],
  fn: (args) => toString(args[0]).replace(/[\x00-\x1F\x7F-\x9F]/g, ""),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.EXACT = {
  category: 'Text',
  schema: ['text', 'text'],
  fn: (args) => toString(args[0]) === toString(args[1]),
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.text.VALUE = {
  category: 'Text',
  schema: ['text'],
  fn: (args) => {
    const val = Number(toString(args[0]));
    return isNaN(val) ? "#VALUE!" : val;
  },
  minArgs: 1,
  maxArgs: 1
};

// --- MATH & TRIG FUNCTIONS ---

const mathUnary = (fn) => (args) => {
  const val = args[0];
  if (val === null) return null;
  return fn(val);
};

FunctionRegistry.math.ABS = {
  category: 'Math',
  schema: ['number'],
  fn: mathUnary(Math.abs),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.SQRT = {
  category: 'Math',
  schema: ['number'],
  fn: (args) => {
    const val = args[0];
    if (val === null) return null;
    if (val < 0) return "#NUM!";
    return Math.sqrt(val);
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.EXP = {
  category: 'Math',
  schema: ['number'],
  fn: mathUnary(Math.exp),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.LN = {
  category: 'Math',
  schema: ['number'],
  fn: (args) => {
    const val = args[0];
    if (val === null) return null;
    if (val <= 0) return "#NUM!";
    return Math.log(val);
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.LOG10 = {
  category: 'Math',
  schema: ['number'],
  fn: (args) => {
    const val = args[0];
    if (val === null) return null;
    if (val <= 0) return "#NUM!";
    return Math.log10(val);
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.LOG = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const val = args[0];
    const base = args[1] !== undefined ? args[1] : 10;
    if (val === null) return null;
    if (val <= 0 || base <= 0 || base === 1) return "#NUM!";
    return Math.log(val) / Math.log(base);
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.SIGN = {
  category: 'Math',
  schema: ['number'],
  fn: mathUnary(Math.sign),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.INT = {
  category: 'Math',
  schema: ['number'],
  fn: mathUnary(Math.floor),
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.math.SUM = {
  category: 'Math',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const flat = args[0];
    let sum = 0;
    for (const val of flat) {
      if (IS_NUMBER(val)) sum += val;
    }
    return sum;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.math.PRODUCT = {
  category: 'Math',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const flat = args[0];
    if (flat.length === 0) return 0;
    let prod = 1;
    let hasNumeric = false;
    for (const val of flat) {
      if (IS_NUMBER(val)) {
        prod *= val;
        hasNumeric = true;
      }
    }
    return hasNumeric ? prod : 0;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.math.MOD = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const n = args[0];
    const d = args[1];
    if (n === null || d === null) return null;
    if (d === 0) return "#DIV/0!";
    return n - d * Math.floor(n / d);
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.math.POWER = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const b = args[0];
    const p = args[1];
    if (b === null || p === null) return null;
    const res = Math.pow(b, p);
    return isNaN(res) ? "#NUM!" : res;
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.math.QUOTIENT = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const n = args[0];
    const d = args[1];
    if (n === null || d === null) return null;
    if (d === 0) return "#DIV/0!";
    return Math.trunc(n / d);
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.math.PI = {
  category: 'Math',
  fn: () => Math.PI,
  minArgs: 0,
  maxArgs: 0
};

// Rounding
FunctionRegistry.math.ROUND = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const val = args[0];
    const digits = args[1] !== undefined ? args[1] : 0;
    if (val === null) return null;
    const factor = Math.pow(10, digits);
    return Math.round(val * factor) / factor;
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.ROUNDUP = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const val = args[0];
    const digits = args[1] !== undefined ? args[1] : 0;
    if (val === null) return null;
    const factor = Math.pow(10, digits);
    return Math.ceil(Math.abs(val) * factor) / factor * Math.sign(val);
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.ROUNDDOWN = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const val = args[0];
    const digits = args[1] !== undefined ? args[1] : 0;
    if (val === null) return null;
    const factor = Math.pow(10, digits);
    return Math.floor(Math.abs(val) * factor) / factor * Math.sign(val);
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.CEILING = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const val = args[0];
    const sig = args[1] !== undefined ? args[1] : 1;
    if (val === null) return null;
    if (sig === 0) return 0;
    if (val > 0 && sig < 0) return "#NUM!";
    return Math.ceil(val / sig) * sig;
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.FLOOR = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const val = args[0];
    const sig = args[1] !== undefined ? args[1] : 1;
    if (val === null) return null;
    if (sig === 0) return 0;
    if (val > 0 && sig < 0) return "#NUM!";
    return Math.floor(val / sig) * sig;
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.math.RAND = {
  category: 'Math',
  fn: () => Math.random(),
  minArgs: 0,
  maxArgs: 0
};

FunctionRegistry.math.RANDBETWEEN = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const bottom = args[0];
    const top = args[1];
    if (bottom === null || top === null) return null;
    return Math.floor(Math.random() * (top - bottom + 1)) + bottom;
  },
  minArgs: 2,
  maxArgs: 2
};

// Trigonometric
FunctionRegistry.math.SIN = { category: 'Math', schema: ['number'], fn: mathUnary(Math.sin), minArgs: 1, maxArgs: 1 };
FunctionRegistry.math.COS = { category: 'Math', schema: ['number'], fn: mathUnary(Math.cos), minArgs: 1, maxArgs: 1 };
FunctionRegistry.math.TAN = { category: 'Math', schema: ['number'], fn: mathUnary(Math.tan), minArgs: 1, maxArgs: 1 };
FunctionRegistry.math.ASIN = {
  category: 'Math',
  schema: ['number'],
  fn: (args) => {
    const val = args[0];
    if (val === null) return null;
    if (val < -1 || val > 1) return "#NUM!";
    return Math.asin(val);
  },
  minArgs: 1, maxArgs: 1
};
FunctionRegistry.math.ACOS = {
  category: 'Math',
  schema: ['number'],
  fn: (args) => {
    const val = args[0];
    if (val === null) return null;
    if (val < -1 || val > 1) return "#NUM!";
    return Math.acos(val);
  },
  minArgs: 1, maxArgs: 1
};
FunctionRegistry.math.ATAN = { category: 'Math', schema: ['number'], fn: mathUnary(Math.atan), minArgs: 1, maxArgs: 1 };
FunctionRegistry.math.ATAN2 = {
  category: 'Math',
  schema: ['number', 'number'],
  fn: (args) => {
    const x = args[0];
    const y = args[1];
    if (x === null || y === null) return null;
    return Math.atan2(y, x);
  },
  minArgs: 2, maxArgs: 2
};
FunctionRegistry.math.DEGREES = {
  category: 'Math',
  schema: ['number'],
  fn: (args) => {
    const val = args[0];
    if (val === null) return null;
    return val * 180 / Math.PI;
  },
  minArgs: 1, maxArgs: 1
};
FunctionRegistry.math.RADIANS = {
  category: 'Math',
  schema: ['number'],
  fn: (args) => {
    const val = args[0];
    if (val === null) return null;
    return val * Math.PI / 180;
  },
  minArgs: 1, maxArgs: 1
};

// Conditional
const checkCriteria = (val, criteria) => {
    if (IS_ERROR(val)) return false;
    const sCriteria = toString(criteria);
    const sVal = toString(val);

    if (sCriteria.startsWith(">=")) return Number(sVal) >= Number(sCriteria.substring(2));
    if (sCriteria.startsWith("<=")) return Number(sVal) <= Number(sCriteria.substring(2));
    if (sCriteria.startsWith(">")) return Number(sVal) > Number(sCriteria.substring(1));
    if (sCriteria.startsWith("<")) return Number(sVal) < Number(sCriteria.substring(1));
    if (sCriteria.startsWith("<>")) return sVal !== sCriteria.substring(2);
    if (sCriteria.startsWith("=")) return sVal === sCriteria.substring(1);

    return sVal === sCriteria;
};

FunctionRegistry.math.SUMIF = {
  category: 'Math',
  schema: ['any', 'any', 'any'],
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
            const val = TO_NUMBER(flatSumRange[i]);
            if (IS_NUMBER(val)) sum += val;
        }
    }
    return sum;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.math.SUMIFS = {
  category: 'Math',
  schema: ['any'],
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
            const val = TO_NUMBER(flatSum[i]);
            if (IS_NUMBER(val)) sum += val;
        }
    }
    return sum;
  },
  minArgs: 3,
  maxArgs: null
};

FunctionRegistry.math.SUMPRODUCT = {
  category: 'Math',
  schema: ['any'],
  fn: (args) => {
    if (args.length === 0) return 0;
    const arrays = args.map(a => Array.isArray(a) ? a.flat() : [a]);
    const len = arrays[0].length;
    if (arrays.some(a => a.length !== len)) return "#VALUE!";

    let total = 0;
    for (let i = 0; i < len; i++) {
        let product = 1;
        for (const arr of arrays) {
            const val = TO_NUMBER(arr[i]);
            if (!IS_NUMBER(val)) product = 0; // Excel treats non-numeric as 0 in SUMPRODUCT
            else product *= val;
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
  const flat = args[0];
  const values = [];
  for (const arg of flat) {
    const val = normalizeStatValue(arg, mode);
    if (val !== null) values.push(val);
  }
  return values;
};

FunctionRegistry.stats.AVERAGE = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const values = statsAggregator("Standard")(args);
    if (values.length === 0) return "#DIV/0!";
    return values.reduce((a, b) => a + b, 0) / values.length;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.AVERAGEA = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const values = statsAggregator("A")(args);
    if (values.length === 0) return "#DIV/0!";
    return values.reduce((a, b) => a + b, 0) / values.length;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.COUNT = {
  category: 'Statistical',
  schema: ['any'],
  autoFlatten: true,
  fn: (args) => {
    const flat = args[0];
    let count = 0;
    for (const arg of flat) {
      if (IS_NUMBER(arg)) count++;
    }
    return count;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.COUNTA = {
  category: 'Statistical',
  schema: ['any'],
  autoFlatten: true,
  fn: (args) => {
    const flat = args[0];
    let count = 0;
    for (const arg of flat) {
      if (!IS_EMPTY(arg)) count++;
    }
    return count;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.COUNTBLANK = {
  category: 'Statistical',
  schema: ['any'],
  autoFlatten: true,
  fn: (args) => {
    const flat = args[0];
    let count = 0;
    for (const arg of flat) {
      if (IS_EMPTY(arg)) count++;
    }
    return count;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MAX = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const values = statsAggregator("Standard")(args);
    if (values.length === 0) return 0;
    return Math.max(...values);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MAXA = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const values = statsAggregator("A")(args);
    if (values.length === 0) return 0;
    return Math.max(...values);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MIN = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const values = statsAggregator("Standard")(args);
    if (values.length === 0) return 0;
    return Math.min(...values);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MINA = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const values = statsAggregator("A")(args);
    if (values.length === 0) return 0;
    return Math.min(...values);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MEDIAN = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const values = statsAggregator("Standard")(args).sort((a, b) => a - b);
    if (values.length === 0) return "#NUM!";
    const mid = Math.floor(values.length / 2);
    return values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.MODE = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const values = statsAggregator("Standard")(args);
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
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => variance(statsAggregator("Standard")(args), false),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats['VAR.P'] = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => variance(statsAggregator("Standard")(args), true),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats['STDEV.S'] = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const v = variance(statsAggregator("Standard")(args), false);
    return typeof v === 'string' ? v : Math.sqrt(v);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats['STDEV.P'] = {
  category: 'Statistical',
  schema: ['number'],
  autoFlatten: true,
  fn: (args) => {
    const v = variance(statsAggregator("Standard")(args), true);
    return typeof v === 'string' ? v : Math.sqrt(v);
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.stats.LARGE = {
  category: 'Statistical',
  schema: ['number', 'number'],
  fn: (args) => {
    const values = statsAggregator("Standard")([args[0]]).sort((a, b) => b - a);
    const k = args[1];
    if (k < 1 || k > values.length) return "#NUM!";
    return values[k - 1];
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.stats.SMALL = {
  category: 'Statistical',
  schema: ['number', 'number'],
  fn: (args) => {
    const values = statsAggregator("Standard")([args[0]]).sort((a, b) => a - b);
    const k = args[1];
    if (k < 1 || k > values.length) return "#NUM!";
    return values[k - 1];
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.stats['RANK.EQ'] = {
  category: 'Statistical',
  schema: ['number', 'number', 'number'],
  fn: (args) => {
    const number = args[0];
    const ref = statsAggregator("Standard")([args[1]]);
    const order = args[2] !== undefined ? args[2] : 0;

    const sorted = ref.sort((a, b) => order === 0 ? b - a : a - b);
    const idx = sorted.indexOf(number);
    return idx === -1 ? "#N/A" : idx + 1;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.stats['RANK.AVG'] = {
  category: 'Statistical',
  schema: ['number', 'number', 'number'],
  fn: (args) => {
    const number = args[0];
    const ref = statsAggregator("Standard")([args[1]]);
    const order = args[2] !== undefined ? args[2] : 0;

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
    category: 'Statistical',
    schema: ['number', 'number'],
    fn: (args) => percentile(statsAggregator("Standard")([args[0]]), args[1], true),
    minArgs: 2, maxArgs: 2
};

FunctionRegistry.stats['PERCENTILE.EXC'] = {
    category: 'Statistical',
    schema: ['number', 'number'],
    fn: (args) => percentile(statsAggregator("Standard")([args[0]]), args[1], false),
    minArgs: 2, maxArgs: 2
};

FunctionRegistry.stats['QUARTILE.INC'] = {
    category: 'Statistical',
    schema: ['number', 'number'],
    fn: (args) => {
        const q = args[1];
        if (q < 0 || q > 4) return "#NUM!";
        return percentile(statsAggregator("Standard")([args[0]]), q / 4, true);
    },
    minArgs: 2, maxArgs: 2
};

FunctionRegistry.stats['QUARTILE.EXC'] = {
    category: 'Statistical',
    schema: ['number', 'number'],
    fn: (args) => {
        const q = args[1];
        if (q < 1 || q > 3) return "#NUM!";
        return percentile(statsAggregator("Standard")([args[0]]), q / 4, false);
    },
    minArgs: 2, maxArgs: 2
};

FunctionRegistry.stats.COUNTIF = {
  category: 'Statistical',
  schema: ['any', 'any'],
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
  category: 'Statistical',
  schema: ['any'],
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
  category: 'Statistical',
  schema: ['any', 'any', 'any'],
  fn: (args) => {
    const range = args[0];
    const criteria = args[1];
    const avgRange = args[2] || range;
    if (!Array.isArray(range)) return checkCriteria(range, criteria) ? TO_NUMBER(avgRange) : "#DIV/0!";

    const flatRange = range.flat();
    const flatAvgRange = avgRange.flat();
    let sum = 0, count = 0;

    for (let i = 0; i < flatRange.length; i++) {
      if (checkCriteria(flatRange[i], criteria)) {
        const val = TO_NUMBER(flatAvgRange[i]);
        if (IS_NUMBER(val)) { sum += val; count++; }
      }
    }
    return count === 0 ? "#DIV/0!" : sum / count;
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.stats.AVERAGEIFS = {
  category: 'Statistical',
  schema: ['any'],
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
        const val = TO_NUMBER(avgRange[i]);
        if (IS_NUMBER(val)) { sum += val; count++; }
      }
    }
    return count === 0 ? "#DIV/0!" : sum / count;
  },
  minArgs: 3,
  maxArgs: null
};

// --- INFORMATION FUNCTIONS ---

FunctionRegistry.info.ISBLANK = {
  category: 'Info',
  fn: (args) => IS_EMPTY(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISNUMBER = {
  category: 'Info',
  fn: (args) => IS_NUMBER(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISTEXT = {
  category: 'Info',
  fn: (args) => typeof args[0] === 'string' && !IS_ERROR(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISNONTEXT = {
  category: 'Info',
  fn: (args) => typeof args[0] !== 'string' || IS_ERROR(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISERROR = {
  category: 'Info',
  fn: (args) => IS_ERROR(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISERR = {
  category: 'Info',
  fn: (args) => IS_ERROR(args[0]) && args[0] !== "#N/A",
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISNA = {
  category: 'Info',
  fn: (args) => args[0] === "#N/A",
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISLOGICAL = {
  category: 'Info',
  fn: (args) => IS_LOGICAL(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISEVEN = {
  category: 'Info',
  schema: ['number'],
  fn: (args) => {
    const val = args[0];
    return Math.floor(Math.abs(val)) % 2 === 0;
  },
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.info.ISODD = {
  category: 'Info',
  schema: ['number'],
  fn: (args) => {
    const val = args[0];
    return Math.floor(Math.abs(val)) % 2 !== 0;
  },
  minArgs: 1, maxArgs: 1
};

// --- FINANCIAL FUNCTIONS ---

FunctionRegistry.financial.FV = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [rate, nper, pmt, pv = 0, type = 0] = args;
    const vNper = VALIDATE_PERIODS(nper);
    if (IS_ERROR(vNper)) return vNper;
    return TVM_MODELS.FV(rate, nper, pmt, pv, type);
  },
  minArgs: 3, maxArgs: 5
};

FunctionRegistry.financial.PV = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [rate, nper, pmt, fv = 0, type = 0] = args;
    const vNper = VALIDATE_PERIODS(nper);
    if (IS_ERROR(vNper)) return vNper;
    return TVM_MODELS.PV(rate, nper, pmt, fv, type);
  },
  minArgs: 3, maxArgs: 5
};

FunctionRegistry.financial.PMT = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [rate, nper, pv, fv = 0, type = 0] = args;
    const vNper = VALIDATE_PERIODS(nper);
    if (IS_ERROR(vNper)) return vNper;
    return TVM_MODELS.PMT(rate, nper, pv, fv, type);
  },
  minArgs: 3, maxArgs: 5
};

FunctionRegistry.financial.NPER = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [rate, pmt, pv, fv = 0, type = 0] = args;
    return TVM_MODELS.NPER(rate, pmt, pv, fv, type);
  },
  minArgs: 3, maxArgs: 5
};

FunctionRegistry.financial.IPMT = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [rate, per, nper, pv, fv = 0, type = 0] = args;
    const vPeriod = VALIDATE_PERIODS(nper, per);
    if (IS_ERROR(vPeriod)) return vPeriod;

    if (type === 1 && per === 1) return 0;

    const pmt = TVM_MODELS.PMT(rate, nper, pv, fv, type);
    const prevBalance = TVM_MODELS.FV(rate, per - 1, pmt, pv, type);

    if (type === 1) {
        return (prevBalance + pmt) * rate;
    }
    return prevBalance * rate;
  },
  minArgs: 4, maxArgs: 6
};

FunctionRegistry.financial.PPMT = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [rate, per, nper, pv, fv = 0, type = 0] = args;
    const pmt = FunctionRegistry.financial.PMT.fn([rate, nper, pv, fv, type]);
    const ipmt = FunctionRegistry.financial.IPMT.fn([rate, per, nper, pv, fv, type]);
    if (IS_ERROR(ipmt)) return ipmt;
    return pmt - ipmt;
  },
  minArgs: 4, maxArgs: 6
};

FunctionRegistry.financial.CUMIPMT = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [rate, nper, pv, start, end, type] = args;
    const vPeriods = VALIDATE_PERIODS(nper, null, start, end);
    if (IS_ERROR(vPeriods)) return vPeriods;
    if (rate <= 0) return "#NUM!";

    let total = 0;
    for (let p = start; p <= end; p++) {
      total += FunctionRegistry.financial.IPMT.fn([rate, p, nper, pv, 0, type]);
    }
    return total;
  },
  minArgs: 6, maxArgs: 6
};

FunctionRegistry.financial.CUMPRINC = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [rate, nper, pv, start, end, type] = args;
    const vPeriods = VALIDATE_PERIODS(nper, null, start, end);
    if (IS_ERROR(vPeriods)) return vPeriods;
    if (rate <= 0) return "#NUM!";

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
  category: 'Financial',
  schema: ['number', 'number', 'number'],
  fn: (args) => {
    const [cost, salvage, life] = args;
    const vDep = VALIDATE_DEPRECIATION(cost, salvage, life, 1);
    if (IS_ERROR(vDep)) return vDep;
    return (cost - salvage) / life;
  },
  minArgs: 3, maxArgs: 3
};

FunctionRegistry.financial.SYD = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number'],
  fn: (args) => {
    const [cost, salvage, life, per] = args;
    const vDep = VALIDATE_DEPRECIATION(cost, salvage, life, per);
    if (IS_ERROR(vDep)) return vDep;
    return (cost - salvage) * (life - per + 1) * 2 / (life * (life + 1));
  },
  minArgs: 4, maxArgs: 4
};

FunctionRegistry.financial.DDB = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [cost, salvage, life, period, factor = 2] = args;
    const vDep = VALIDATE_DEPRECIATION(cost, salvage, life, period);
    if (IS_ERROR(vDep)) return vDep;
    if (factor <= 0) return "#NUM!";

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
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [cost, salvage, life, period, month = 12] = args;
    const vDep = VALIDATE_DEPRECIATION(cost, salvage, life, period);
    if (IS_ERROR(vDep)) return vDep;

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
  category: 'Financial',
  schema: ['number'],
  fn: (args) => {
    const rate = args[0];
    const values = FLATTEN(args.slice(1)).filter(v => !IS_EMPTY(v));
    let total = 0;
    for (let i = 0; i < values.length; i++) {
        const val = TO_NUMBER(values[i]);
        if (!IS_NUMBER(val)) continue;
        total += val / Math.pow(1 + rate, i + 1);
    }
    return total;
  },
  minArgs: 2, maxArgs: null
};

FunctionRegistry.financial.IRR = {
  category: 'Financial',
  schema: ['number', 'number'],
  fn: (args) => {
    const values = FLATTEN([args[0]]).filter(v => !IS_EMPTY(v)).map(v => TO_NUMBER(v));
    if (values.some(v => IS_ERROR(v))) return "#VALUE!";
    if (!VALIDATE_CASHFLOW_SIGNS(values)) return "#NUM!";

    const guess = args[1] !== undefined ? args[1] : 0.1;

    const npv = (rate) => {
        let total = 0;
        for (let i = 0; i < values.length; i++) total += values[i] / Math.pow(1 + rate, i);
        return total;
    };

    return SOLVE_ITERATIVELY(npv, guess);
  },
  minArgs: 1, maxArgs: 2
};

FunctionRegistry.financial.RATE = {
  category: 'Financial',
  schema: ['number', 'number', 'number', 'number', 'number', 'number'],
  fn: (args) => {
    const [nper, pmt, pv, fv = 0, type = 0, guess = 0.1] = args;
    return TVM_MODELS.RATE(nper, pmt, pv, fv, type, guess);
  },
  minArgs: 3, maxArgs: 6
};

FunctionRegistry.financial.MIRR = {
  category: 'Financial',
  schema: ['number', 'number', 'number'],
  fn: (args) => {
    const values = FLATTEN([args[0]]).filter(v => !IS_EMPTY(v)).map(v => TO_NUMBER(v));
    if (values.some(v => IS_ERROR(v))) return "#VALUE!";
    const financeRate = args[1];
    const reinvestRate = args[2];

    if (!VALIDATE_CASHFLOW_SIGNS(values)) return "#DIV/0!";

    const n = values.length - 1;
    let npvPos = 0;
    let npvNeg = 0;

    for (let i = 0; i < values.length; i++) {
        const v = values[i];
        if (v >= 0) npvPos += v / Math.pow(1 + reinvestRate, i);
        else npvNeg += v / Math.pow(1 + financeRate, i);
    }

    if (npvNeg === 0) return "#DIV/0!";

    return Math.pow(-(npvPos * Math.pow(1 + reinvestRate, n)) / npvNeg, 1 / n) - 1;
  },
  minArgs: 3, maxArgs: 3
};

FunctionRegistry.financial.EFFECT = {
  category: 'Financial',
  schema: ['number', 'number'],
  fn: (args) => {
    const [nominalRate, npery] = args;
    const n = Math.trunc(npery);
    if (n < 1 || nominalRate < 0) return "#NUM!";
    if (nominalRate === 0) return 0;
    // Formula: (1 + nominal_rate / npery) ^ npery - 1
    return Math.pow(1 + nominalRate / n, n) - 1;
  },
  minArgs: 2, maxArgs: 2
};

FunctionRegistry.financial.NOMINAL = {
  category: 'Financial',
  schema: ['number', 'number'],
  fn: (args) => {
    const [effectRate, npery] = args;
    const n = Math.trunc(npery);
    if (n < 1 || effectRate < 0) return "#NUM!";
    if (effectRate === 0) return 0;
    // Formula: ( (1 + effect_rate) ^ (1 / npery) - 1 ) * npery
    return (Math.pow(1 + effectRate, 1 / n) - 1) * n;
  },
  minArgs: 2, maxArgs: 2
};

export default FunctionRegistry;
