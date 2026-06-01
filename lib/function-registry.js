
/**
 * FunctionRegistry stores all available spreadsheet functions.
 */
const FunctionRegistry = {
  logical: {},
  text: {}
};

// --- HELPERS ---

const toBoolean = (val) => {
  if (val === true || val === "TRUE") return true;
  if (val === false || val === "FALSE" || val === "" || val === 0 || val === null || val === undefined) return false;
  if (!isNaN(val)) return Number(val) !== 0;
  return true;
};

const toString = (val) => {
  if (val === null || val === undefined) return "";
  if (val === true) return "TRUE";
  if (val === false) return "FALSE";
  return String(val);
};

// --- PHASE 2: CORE LOGICAL FUNCTIONS ---

FunctionRegistry.logical.AND = {
  fn: (args) => {
    if (args.length === 0) return "#N/A";
    for (const arg of args) {
      if (!toBoolean(arg)) return false;
    }
    return true;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.logical.OR = {
  fn: (args) => {
    if (args.length === 0) return "#N/A";
    for (const arg of args) {
      if (toBoolean(arg)) return true;
    }
    return false;
  },
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.logical.NOT = {
  fn: (args) => {
    return !toBoolean(args[0]);
  },
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

// --- PHASE 3: CONDITIONAL FUNCTIONS ---

FunctionRegistry.logical.IF = {
  fn: (args) => {
    const [test, valueIfTrue, valueIfFalse] = args;
    return toBoolean(test) ? valueIfTrue : (valueIfFalse !== undefined ? valueIfFalse : false);
  },
  minArgs: 2,
  maxArgs: 3
};

FunctionRegistry.logical.IFERROR = {
  fn: (args) => {
    const [val, valIfError] = args;
    const isError = (v) => typeof v === 'string' && v.startsWith('#') && v !== '#N/A';
    return isError(val) ? valIfError : val;
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
      if (toBoolean(args[i])) return args[i + 1];
    }
    return "#N/A";
  },
  minArgs: 2,
  maxArgs: null
};

// --- PHASE 4: ADVANCED FUNCTIONS ---

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
  fn: (args) => args.map(toString).join(''),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.text.CONCATENATE = {
  fn: (args) => args.map(toString).join(''),
  minArgs: 1,
  maxArgs: null
};

FunctionRegistry.text.TEXTJOIN = {
  fn: (args) => {
    const delimiter = toString(args[0]);
    const ignoreEmpty = toBoolean(args[1]);
    const parts = args.slice(2).map(toString);
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
  fn: (args) => {
    // eslint-disable-next-line no-control-regex
    return toString(args[0]).replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  },
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

export default FunctionRegistry;
