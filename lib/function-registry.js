
/**
 * FunctionRegistry stores all available spreadsheet functions.
 */
const FunctionRegistry = {
  logical: {}
};

// Helper to cast values to boolean per Excel rules
const toBoolean = (val) => {
  if (val === true || val === "TRUE") return true;
  if (val === false || val === "FALSE" || val === "" || val === 0 || val === null || val === undefined) return false;
  if (!isNaN(val)) return Number(val) !== 0;
  return true; // Non-empty strings are true
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
// Note: For lazy evaluation, IF/IFS/LET/SWITCH should be handled by the evaluator directly
// if they need to avoid evaluating certain branches.
// However, here we provide the standard implementation.

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
    // If odd number of args, last one is default
    if (args.length % 2 === 0) return args[args.length - 1];
    return "#N/A";
  },
  minArgs: 3,
  maxArgs: null
};

// LET and LAMBDA require context/scope management which is better handled in the evaluator.
// We register them here as markers.
FunctionRegistry.logical.LET = {
  fn: (args) => args[args.length - 1], // Placeholder
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

export default FunctionRegistry;
