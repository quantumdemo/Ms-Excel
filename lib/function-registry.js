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

import * as LookupEnforcement from './lookup-enforcement.js';
import { ReferenceResolver } from './reference-resolver.js';

import {
  toSerial,
  fromSerial,
  parseDate,
  dateConstruct,
  timeConstruct,
  extractComponent,
  yearFrac,
  days360,
  weekday,
  weekNum,
  isoWeekNum,
  eDate,
  eoMonth,
  dateDif,
  netWorkDaysIntl,
  workDayIntl
} from './date-time-enforcement.js';

/**
 * FunctionRegistry stores all available spreadsheet functions.
 */
const FunctionRegistry = {
  logical: {},
  text: {},
  math: {},
  stats: {},
  info: {},
  financial: {},
  date: {},
  lookup: {}
};

// --- INTERNAL HELPERS ---

const toString = (val) => {
  if (val === null || val === undefined || val === "") return "";
  if (val === true) return "TRUE";
  if (val === false) return "FALSE";
  return String(val);
};

/**
 * Excel-compatible rounding (away from zero).
 */
const roundExcel = (num, decimals) => {
  const factor = Math.pow(10, decimals);
  const sign = Math.sign(num);
  return sign * (Math.round(Math.abs(num) * factor) / factor);
};

const FormatterCache = new Map();

const getFormatter = (locale, options) => {
  const key = `${locale}-${JSON.stringify(options)}`;
  if (!FormatterCache.has(key)) {
    FormatterCache.set(key, new Intl.NumberFormat(locale, options));
  }
  return FormatterCache.get(key);
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

FunctionRegistry.text.TEXTAFTER = {
  category: 'Text',
  schema: ['text', 'any', 'number', 'number', 'number', 'any'],
  fn: (args) => {
    const text = toString(args[0]);
    const instanceNum = args[2] !== undefined && args[2] !== null ? Math.floor(args[2]) : 1;
    const matchMode = args[3] !== undefined && args[3] !== null ? args[3] : 0;
    const matchEnd = args[4] !== undefined && args[4] !== null ? args[4] : 0;
    const ifNotFound = args[5] !== undefined && args[5] !== null ? args[5] : "#N/A";

    if (instanceNum === 0) return "#VALUE!";

    const delims = (Array.isArray(args[1]) ? args[1].flat() : [args[1]]).map(toString).filter(d => d !== "");
    if (delims.length === 0) return text;
    const matchCase = matchMode === 0;

    const findOccurrences = (str, ds) => {
      const occurrences = [];
      const s = matchCase ? str : str.toLowerCase();
      let currentPos = 0;
      while (currentPos < s.length) {
        let earliestMatch = null;
        for (const delim of ds) {
          const d = matchCase ? delim : delim.toLowerCase();
          const pos = s.indexOf(d, currentPos);
          if (pos !== -1) {
            if (!earliestMatch || pos < earliestMatch.pos || (pos === earliestMatch.pos && d.length > earliestMatch.len)) {
              earliestMatch = { pos, len: d.length };
            }
          }
        }
        if (earliestMatch) {
          occurrences.push(earliestMatch);
          currentPos = earliestMatch.pos + earliestMatch.len;
        } else {
          break;
        }
      }
      return occurrences;
    };

    const occurrences = findOccurrences(text, delims);
    const count = occurrences.length;

    let target = null;

    if (count > 0) {
      if (instanceNum > 0) {
        if (instanceNum <= count) {
          target = occurrences[instanceNum - 1];
        }
      } else {
        if (Math.abs(instanceNum) <= count) {
          target = occurrences[count + instanceNum];
        }
      }
    }

    if (target) {
      return text.substring(target.pos + target.len);
    }

    if (matchEnd === 1) {
      if (instanceNum > 0) return "";
      return text;
    }

    return ifNotFound;
  },
  minArgs: 2,
  maxArgs: 6
};

FunctionRegistry.text.TEXTSPLIT = {
  category: 'Text',
  schema: ['text', 'any', 'any', 'logical', 'number', 'any'],
  fn: (args) => {
    const text = toString(args[0]);
    const colDelim = args[1];
    const rowDelim = args[2];
    const ignoreEmpty = args[3] !== undefined ? args[3] : false;
    const matchMode = args[4] !== undefined ? args[4] : 0;
    const padWith = args[5] !== undefined ? args[5] : "#N/A";

    const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const splitByDelims = (str, delims) => {
      if (delims === undefined || delims === null || delims === "" || (Array.isArray(delims) && delims.length === 0)) return [str];
      const delimList = (Array.isArray(delims) ? delims.flat() : [delims]).map(toString).filter(d => d !== "");
      if (delimList.length === 0) return [str];
      const pattern = delimList.map(escapeRegex).join('|');
      const regex = new RegExp(pattern, matchMode === 1 ? 'gi' : 'g');
      return str.split(regex);
    };

    let rows = [text];
    if (rowDelim !== undefined && rowDelim !== null && rowDelim !== "" && !(Array.isArray(rowDelim) && rowDelim.length === 0)) {
      rows = splitByDelims(text, rowDelim);
    }

    let result = rows.map(row => splitByDelims(row, colDelim));

    if (ignoreEmpty) {
      result = result.map(row => row.filter(cell => cell !== ""));
      result = result.filter(row => row.length > 0);
    }

    if (result.length === 0) return "";

    const maxCols = Math.max(...result.map(row => row.length));
    if (maxCols === 0) return "";

    const padded = result.map(row => {
      const newRow = [...row];
      while (newRow.length < maxCols) newRow.push(padWith);
      return newRow;
    });

    return padded;
  },
  minArgs: 1,
  maxArgs: 6
};

FunctionRegistry.text.ARRAYTOTEXT = {
  category: 'Text',
  schema: ['any', 'number'],
  fn: (args) => {
    const array = args[0];
    const format = args[1] !== undefined ? Math.floor(args[1]) : 0;

    const flat = FLATTEN([array]).map(toString);

    if (format === 0) {
      return flat.join(', ');
    } else {
      // Strict format (format 1)
      const rows = Array.isArray(array) ? (Array.isArray(array[0]) ? array : [array]) : [[array]];
      const formattedRows = rows.map(row => {
        const rowCells = Array.isArray(row) ? row : [row];
        return rowCells.map(cell => {
          const s = toString(cell);
          if (typeof cell === 'string') return `"${s}"`;
          return s;
        }).join(',');
      });
      return "{" + formattedRows.join(';') + "}";
    }
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.text.TEXTBEFORE = {
  category: 'Text',
  schema: ['text', 'any', 'number', 'number', 'number', 'any'],
  fn: (args) => {
    const text = toString(args[0]);
    const instanceNum = args[2] !== undefined && args[2] !== null ? Math.floor(args[2]) : 1;
    const matchMode = args[3] !== undefined && args[3] !== null ? args[3] : 0;
    const matchEnd = args[4] !== undefined && args[4] !== null ? args[4] : 0;
    const ifNotFound = args[5] !== undefined && args[5] !== null ? args[5] : "#N/A";

    if (instanceNum === 0) return "#VALUE!";

    const delims = (Array.isArray(args[1]) ? args[1].flat() : [args[1]]).map(toString).filter(d => d !== "");
    if (delims.length === 0) return "";
    const matchCase = matchMode === 0;

    const findOccurrences = (str, ds) => {
      const occurrences = [];
      const s = matchCase ? str : str.toLowerCase();
      let currentPos = 0;
      while (currentPos < s.length) {
        let earliestMatch = null;
        for (const delim of ds) {
          const d = matchCase ? delim : delim.toLowerCase();
          const pos = s.indexOf(d, currentPos);
          if (pos !== -1) {
            if (!earliestMatch || pos < earliestMatch.pos || (pos === earliestMatch.pos && d.length > earliestMatch.len)) {
              earliestMatch = { pos, len: d.length };
            }
          }
        }
        if (earliestMatch) {
          occurrences.push(earliestMatch);
          currentPos = earliestMatch.pos + earliestMatch.len;
        } else {
          break;
        }
      }
      return occurrences;
    };

    const occurrences = findOccurrences(text, delims);
    const count = occurrences.length;

    let target = null;

    if (count > 0) {
      if (instanceNum > 0) {
        if (instanceNum <= count) {
          target = occurrences[instanceNum - 1];
        }
      } else {
        if (Math.abs(instanceNum) <= count) {
          target = occurrences[count + instanceNum];
        }
      }
    }

    if (target) {
      return text.substring(0, target.pos);
    }

    if (matchEnd === 1) {
      if (instanceNum > 0) return text;
      return "";
    }

    return ifNotFound;
  },
  minArgs: 2,
  maxArgs: 6
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
  skipErrorPropagation: true,
  fn: (args) => {
    const [val, valIfError] = args;
    const isErr = (v) => typeof v === 'string' && v.startsWith('#');
    return isErr(val) ? valIfError : val;
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.logical.IFNA = {
  category: 'Logical',
  schema: ['any', 'any'],
  skipErrorPropagation: true,
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

FunctionRegistry.text.CHAR = {
  category: 'Text',
  schema: ['number'],
  fn: (args) => {
    const num = Math.floor(args[0]);
    if (num < 1 || num > 255) return "#VALUE!";
    return String.fromCharCode(num);
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.CODE = {
  category: 'Text',
  schema: ['text'],
  fn: (args) => {
    const text = toString(args[0]);
    if (text.length === 0) return "#VALUE!";
    return text.charCodeAt(0);
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.UNICHAR = {
  category: 'Text',
  schema: ['number'],
  fn: (args) => {
    const num = Math.floor(args[0]);
    if (num < 1) return "#VALUE!";
    try {
      return String.fromCodePoint(num);
    } catch (e) {
      return "#VALUE!";
    }
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.UNICODE = {
  category: 'Text',
  schema: ['text'],
  fn: (args) => {
    const text = toString(args[0]);
    if (text.length === 0) return "#VALUE!";
    return text.codePointAt(0);
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.REPT = {
  category: 'Text',
  schema: ['text', 'number'],
  fn: (args) => {
    const text = toString(args[0]);
    const num = Math.floor(args[1]);
    if (num < 0) return "#VALUE!";
    if (num === 0) return "";
    try {
      const result = text.repeat(num);
      if (result.length > 32767) return "#VALUE!"; // Excel limit
      return result;
    } catch (e) {
      return "#VALUE!";
    }
  },
  minArgs: 2,
  maxArgs: 2
};

FunctionRegistry.text.T = {
  category: 'Text',
  schema: ['any'],
  skipErrorPropagation: true,
  fn: (args) => {
    const val = args[0];
    if (IS_ERROR(val)) return val;
    if (typeof val === 'string') return val;
    return "";
  },
  minArgs: 1,
  maxArgs: 1
};

FunctionRegistry.text.FIXED = {
  category: 'Text',
  schema: ['number', 'number', 'logical'],
  fn: (args) => {
    const num = TO_NUMBER(args[0]);
    if (IS_ERROR(num)) return num;

    const decimals = args[1] !== undefined ? Math.floor(args[1]) : 2;
    const noCommas = args[2] !== undefined ? args[2] : false;

    const val = num === null ? 0 : num;
    const rounded = roundExcel(val, decimals);

    const options = {
      minimumFractionDigits: Math.max(0, decimals),
      maximumFractionDigits: Math.max(0, decimals),
      useGrouping: !noCommas
    };

    return getFormatter('en-US', options).format(rounded);
  },
  minArgs: 1,
  maxArgs: 3
};

FunctionRegistry.text.DOLLAR = {
  category: 'Text',
  schema: ['number', 'number'],
  fn: (args) => {
    const num = TO_NUMBER(args[0]);
    if (IS_ERROR(num)) return num;

    const decimals = args[1] !== undefined ? Math.floor(args[1]) : 2;
    const val = num === null ? 0 : num;
    const rounded = roundExcel(val, decimals);

    const options = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: Math.max(0, decimals),
      maximumFractionDigits: Math.max(0, decimals)
    };

    return getFormatter('en-US', options).format(rounded);
  },
  minArgs: 1,
  maxArgs: 2
};

FunctionRegistry.text.TEXT = {
  category: 'Text',
  schema: ['any', 'text'],
  fn: (args) => {
    const rawVal = args[0];
    const format = toString(args[1]);

    if (IS_ERROR(rawVal)) return rawVal;

    // Excel treats blank/null as 0 in TEXT function for numeric formats
    let val = (IS_EMPTY(rawVal)) ? 0 : rawVal;

    // String coercion
    if (typeof val === 'string' && !isNaN(val) && val.trim() !== "") {
      val = Number(val);
    }

    if (!IS_NUMBER(val)) return toString(val);

    // Determine if it's a number format
    const isNumberFormat = /[0#\?%\.,]/.test(format);
    if (!isNumberFormat) return toString(val);

    const isPercent = format.includes('%');
    const hasGrouping = format.includes(',');

    // Determine precision and min digits
    let precision = 0;
    let minFractionDigits = 0;
    const decimalIndex = format.indexOf('.');
    if (decimalIndex !== -1) {
      let i = decimalIndex + 1;
      while (i < format.length && (format[i] === '0' || format[i] === '#' || format[i] === '?')) {
        precision++;
        if (format[i] === '0') minFractionDigits++;
        i++;
      }
    }

    let n = isPercent ? val * 100 : val;
    const rounded = roundExcel(n, precision);

    const options = {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: precision,
      useGrouping: hasGrouping
    };

    let result = getFormatter('en-US', options).format(rounded);
    if (isPercent) result += '%';

    return result;
  },
  minArgs: 2,
  maxArgs: 2
};

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

/**
 * ISBLANK(value) returns TRUE if the value is a reference to an empty cell.
 */
FunctionRegistry.info.ISBLANK = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => IS_EMPTY(args[0]),
  minArgs: 1, maxArgs: 1
};

/**
 * ISNUMBER(value) returns TRUE if the value is a number.
 */
FunctionRegistry.info.ISNUMBER = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => IS_NUMBER(args[0]),
  minArgs: 1, maxArgs: 1
};

/**
 * ISTEXT(value) returns TRUE if the value is text.
 */
FunctionRegistry.info.ISTEXT = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => typeof args[0] === 'string' && !IS_ERROR(args[0]),
  minArgs: 1, maxArgs: 1
};

/**
 * ISNONTEXT(value) returns TRUE if the value is not text.
 */
FunctionRegistry.info.ISNONTEXT = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => typeof args[0] !== 'string' || IS_ERROR(args[0]),
  minArgs: 1, maxArgs: 1
};

/**
 * ISERROR(value) returns TRUE if the value is any error value.
 */
FunctionRegistry.info.ISERROR = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => IS_ERROR(args[0]),
  minArgs: 1, maxArgs: 1
};

/**
 * ISERR(value) returns TRUE if the value is any error value except #N/A.
 */
FunctionRegistry.info.ISERR = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => IS_ERROR(args[0]) && args[0] !== "#N/A",
  minArgs: 1, maxArgs: 1
};

/**
 * ISNA(value) returns TRUE if the value is the #N/A error value.
 */
FunctionRegistry.info.ISNA = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => args[0] === "#N/A",
  minArgs: 1, maxArgs: 1
};

/**
 * ISLOGICAL(value) returns TRUE if the value is a logical value.
 */
FunctionRegistry.info.ISLOGICAL = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => IS_LOGICAL(args[0]),
  minArgs: 1, maxArgs: 1
};

/**
 * ISEVEN(value) returns TRUE if the number is even.
 */
FunctionRegistry.info.ISEVEN = {
  category: 'Info',
  schema: ['number'],
  skipErrorPropagation: true,
  fn: (args) => {
    const val = args[0];
    if (IS_ERROR(val)) return val;
    if (!IS_NUMBER(val)) return "#VALUE!";
    return Math.floor(Math.abs(val)) % 2 === 0;
  },
  minArgs: 1, maxArgs: 1
};

/**
 * ISODD(value) returns TRUE if the number is odd.
 */
FunctionRegistry.info.ISODD = {
  category: 'Info',
  schema: ['number'],
  skipErrorPropagation: true,
  fn: (args) => {
    const val = args[0];
    if (IS_ERROR(val)) return val;
    if (!IS_NUMBER(val)) return "#VALUE!";
    return Math.floor(Math.abs(val)) % 2 !== 0;
  },
  minArgs: 1, maxArgs: 1
};

/**
 * TYPE(value) returns an integer indicating the data type of a value:
 * 1 (number), 2 (text), 4 (logical), 16 (error), 64 (array).
 */
FunctionRegistry.info.TYPE = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => {
    const val = args[0];
    if (IS_EMPTY(val)) return 1; // Excel returns 1 for blank cells
    if (IS_NUMBER(val)) return 1;
    if (typeof val === 'string') {
      if (IS_ERROR(val)) return 16;
      return 2;
    }
    if (typeof val === 'boolean') return 4;
    if (Array.isArray(val)) return 64;
    return 2; // Default to text
  },
  minArgs: 1, maxArgs: 1
};

/**
 * ERROR.TYPE(error_val) returns a number corresponding to an error type.
 */
FunctionRegistry.info['ERROR.TYPE'] = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => {
    const val = args[0];
    const map = {
      '#NULL!': 1,
      '#DIV/0!': 2,
      '#VALUE!': 3,
      '#REF!': 4,
      '#NAME?': 5,
      '#NUM!': 6,
      '#N/A': 7,
      '#GETTING_DATA': 8,
      '#SPILL!': 9
    };
    return map[val] || "#N/A";
  },
  minArgs: 1, maxArgs: 1
};

/**
 * N(value) converts a value to a number.
 */
FunctionRegistry.info.N = {
  category: 'Info',
  skipErrorPropagation: true,
  fn: (args) => {
    const val = args[0];
    if (IS_NUMBER(val)) return val;
    if (val === true || val === "TRUE") return 1;
    if (val === false || val === "FALSE") return 0;
    if (IS_ERROR(val)) return val;
    return 0;
  },
  minArgs: 1, maxArgs: 1
};

/**
 * NA() returns the error value #N/A.
 */
FunctionRegistry.info.NA = {
  category: 'Info',
  fn: () => "#N/A",
  minArgs: 0, maxArgs: 0
};

/**
 * INFO(type_text) returns information about the current operating environment.
 */
FunctionRegistry.info.INFO = {
  category: 'Info',
  fn: (args) => {
    const type = String(args[0]).toLowerCase();
    const map = {
      'release': '1.0',
      'numfile': 1,
      'osversion': 'SheetLab OS',
      'directory': '/',
      'system': 'pcdos'
    };
    return map[type] || "#VALUE!";
  },
  minArgs: 1, maxArgs: 1
};

// These functions require special handling in FormulaEvaluator to access registry/metadata
/**
 * ISFORMULA(reference) returns TRUE if the cell contains a formula.
 */
FunctionRegistry.info.ISFORMULA = { category: 'Info', fn: () => false, minArgs: 1, maxArgs: 1 };
/**
 * ISREF(value) returns TRUE if the value is a valid cell reference.
 */
FunctionRegistry.info.ISREF = { category: 'Info', fn: () => false, minArgs: 1, maxArgs: 1 };
/**
 * CELL(info_type, [reference]) returns information about formatting, location, or contents of a cell.
 */
FunctionRegistry.info.CELL = { category: 'Info', fn: () => null, minArgs: 1, maxArgs: 2 };
/**
 * SHEET([value]) returns the sheet number of the referenced sheet.
 */
FunctionRegistry.info.SHEET = { category: 'Info', fn: () => 1, minArgs: 0, maxArgs: 1 };
/**
 * SHEETS([reference]) returns the number of sheets in a reference.
 */
FunctionRegistry.info.SHEETS = { category: 'Info', fn: () => 1, minArgs: 0, maxArgs: 1 };

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

// --- LOOKUP & REFERENCE FUNCTIONS ---

FunctionRegistry.lookup.VLOOKUP = {
  category: 'Lookup',
  schema: ['any', 'any', 'number', 'logical'],
  fn: (args) => LookupEnforcement.VLOOKUP(args[0], args[1], args[2], args[3] !== undefined ? args[3] : false),
  minArgs: 3, maxArgs: 4
};

FunctionRegistry.lookup.HLOOKUP = {
  category: 'Lookup',
  schema: ['any', 'any', 'number', 'logical'],
  fn: (args) => LookupEnforcement.HLOOKUP(args[0], args[1], args[2], args[3] !== undefined ? args[3] : false),
  minArgs: 3, maxArgs: 4
};

FunctionRegistry.lookup.LOOKUP = {
  category: 'Lookup',
  schema: ['any', 'any', 'any'],
  fn: (args) => {
    const [val, lookupVec, resultVec] = args;
    // Basic LOOKUP: find val in lookupVec, return from resultVec (or lookupVec if omitted)
    const idx = LookupEnforcement.lookupMatch(val, lookupVec, 1); // 1 = less than or equal
    if (IS_ERROR(idx)) return idx;
    const res = resultVec || lookupVec;
    const flatRes = Array.isArray(res) ? res.flat() : [res];
    return flatRes[idx];
  },
  minArgs: 2, maxArgs: 3
};

FunctionRegistry.lookup.XLOOKUP = {
  category: 'Lookup',
  schema: ['any', 'any', 'any', 'any', 'number', 'number'],
  fn: (args) => LookupEnforcement.XLOOKUP(args[0], args[1], args[2], args[3], args[4], args[5]),
  minArgs: 3, maxArgs: 6
};

FunctionRegistry.lookup.MATCH = {
  category: 'Lookup',
  schema: ['any', 'any', 'number'],
  fn: (args) => {
    const res = LookupEnforcement.lookupMatch(args[0], args[1], args[2] || 0);
    return IS_ERROR(res) ? res : res + 1;
  },
  minArgs: 2, maxArgs: 3
};

FunctionRegistry.lookup.XMATCH = {
  category: 'Lookup',
  schema: ['any', 'any', 'number', 'number'],
  fn: (args) => {
    const res = LookupEnforcement.lookupMatch(args[0], args[1], args[2], args[3]);
    return IS_ERROR(res) ? res : res + 1;
  },
  minArgs: 2, maxArgs: 4
};

FunctionRegistry.lookup.INDEX = {
  category: 'Lookup',
  schema: ['any', 'number', 'number'],
  fn: (args) => LookupEnforcement.INDEX(args[0], args[1], args[2]),
  minArgs: 2, maxArgs: 3
};

FunctionRegistry.lookup.ADDRESS = {
  category: 'Lookup',
  schema: ['number', 'number', 'number', 'logical', 'text'],
  fn: (args) => {
    const [r, c, abs = 1, a1 = true, sheet] = args;
    if (r < 1 || c < 1) return "#VALUE!";
    let isRowAbs = true, isColAbs = true;
    if (abs === 2) isColAbs = false;
    else if (abs === 3) isRowAbs = false;
    else if (abs === 4) { isRowAbs = false; isColAbs = false; }

    const addr = ReferenceResolver.formatReference(r - 1, c - 1, isRowAbs, isColAbs);
    return sheet ? `${sheet}!${addr}` : addr;
  },
  minArgs: 2, maxArgs: 5
};

FunctionRegistry.lookup.INDIRECT = {
  category: 'Lookup',
  schema: ['text'],
  fn: (args, context) => {
    const ref = args[0];
    if (typeof ref !== 'string') return "#VALUE!";
    if (!context.registry) return "#VALUE!";

    // Evaluate text -> reference safely
    if (ReferenceResolver.isRange(ref)) {
        return context.registry.getRangeValues(ref);
    }
    return context.registry.getCell(ref).computed;
  },
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.lookup.OFFSET = {
    category: 'Lookup',
    schema: ['any', 'number', 'number', 'number', 'number'],
    fn: (args, context) => {
        // OFFSET(ref, rows, cols, [height], [width])
        // Since Rule 1 resolves references before execution, we need the source reference string.
        // But SheetLab's current architecture resolves args to values.
        // We'll use a hack or assume the first arg is evaluated but we need its original coords.
        // For SheetLab, we might need to pass the raw expression to the function if it's OFFSET/INDIRECT.
        // However, if we can't get raw, we'll try to find it in registry if it's a known range.

        // This is a limitation: OFFSET needs the *reference*, not the value.
        // We will implement a simplified version that works if the first arg is a range result or single value.
        // Better: parseAndEval should handle OFFSET specially.
        return "#VALUE!"; // Placeholder for special handling in evaluator
    },
    minArgs: 3, maxArgs: 5
};

FunctionRegistry.lookup.AREAS = {
    category: 'Lookup',
    fn: (args) => 1, // Basic support: single range is always 1 area.
    minArgs: 1, maxArgs: 1
};

FunctionRegistry.lookup.CHOOSE = {
    category: 'Lookup',
    schema: ['number'],
    fn: (args) => {
        const idx = Math.floor(args[0]);
        if (idx < 1 || idx >= args.length) return "#VALUE!";
        return args[idx];
    },
    minArgs: 2, maxArgs: null
};

FunctionRegistry.lookup.FILTER = {
    category: 'Lookup',
    schema: ['any', 'any', 'any'],
    fn: (args) => LookupEnforcement.FILTER(args[0], args[1], args[2]),
    minArgs: 2, maxArgs: 3
};

FunctionRegistry.lookup.SORT = {
    category: 'Lookup',
    schema: ['any', 'number', 'number', 'logical'],
    fn: (args) => LookupEnforcement.SORT(args[0], args[1] || 1, args[2] || 1, args[3] || false),
    minArgs: 1, maxArgs: 4
};

FunctionRegistry.lookup.SORTBY = {
    category: 'Lookup',
    schema: ['any'],
    fn: (args) => LookupEnforcement.SORTBY(args[0], ...args.slice(1)),
    minArgs: 2, maxArgs: null
};

FunctionRegistry.lookup.UNIQUE = {
    category: 'Lookup',
    schema: ['any'],
    fn: (args) => {
        const array = args[0];
        if (!Array.isArray(array)) return array;
        const seen = new Set();
        return array.filter(row => {
            const s = JSON.stringify(row);
            if (seen.has(s)) return false;
            seen.add(s);
            return true;
        });
    },
    minArgs: 1, maxArgs: 1
};

FunctionRegistry.lookup.HSTACK = {
    category: 'Lookup',
    fn: (args) => LookupEnforcement.HSTACK(...args),
    minArgs: 1, maxArgs: null
};

FunctionRegistry.lookup.VSTACK = {
    category: 'Lookup',
    fn: (args) => LookupEnforcement.VSTACK(...args),
    minArgs: 1, maxArgs: null
};

FunctionRegistry.lookup.TRANSPOSE = {
    category: 'Lookup',
    fn: (args) => LookupEnforcement.TRANSPOSE(args[0]),
    minArgs: 1, maxArgs: 1
};

FunctionRegistry.lookup.SEQUENCE = {
    category: 'Lookup',
    schema: ['number', 'number', 'number', 'number'],
    fn: (args) => LookupEnforcement.SEQUENCE(args[0], args[1], args[2], args[3]),
    minArgs: 0, maxArgs: 4
};

FunctionRegistry.lookup.TOCOL = {
    category: 'Lookup',
    schema: ['any', 'number', 'logical'],
    fn: (args) => LookupEnforcement.TOCOL(args[0], args[1] || 0, args[2] || false),
    minArgs: 1, maxArgs: 3
};

FunctionRegistry.lookup.TOROW = {
    category: 'Lookup',
    schema: ['any', 'number', 'logical'],
    fn: (args) => LookupEnforcement.TOROW(args[0], args[1] || 0, args[2] || false),
    minArgs: 1, maxArgs: 3
};

FunctionRegistry.lookup.TAKE = {
    category: 'Lookup',
    schema: ['any', 'number', 'number'],
    fn: (args) => LookupEnforcement.TAKE(args[0], args[1], args[2]),
    minArgs: 2, maxArgs: 3
};

FunctionRegistry.lookup.DROP = {
    category: 'Lookup',
    schema: ['any', 'number', 'number'],
    fn: (args) => LookupEnforcement.DROP(args[0], args[1], args[2]),
    minArgs: 2, maxArgs: 3
};

FunctionRegistry.lookup.CHOOSECOLS = {
    category: 'Lookup',
    fn: (args) => LookupEnforcement.CHOOSECOLS(args[0], ...args.slice(1)),
    minArgs: 2, maxArgs: null
};

FunctionRegistry.lookup.CHOOSEROWS = {
    category: 'Lookup',
    fn: (args) => LookupEnforcement.CHOOSEROWS(args[0], ...args.slice(1)),
    minArgs: 2, maxArgs: null
};

FunctionRegistry.lookup.EXPAND = {
    category: 'Lookup',
    schema: ['any', 'number', 'number', 'any'],
    fn: (args) => LookupEnforcement.EXPAND(args[0], args[1], args[2], args[3]),
    minArgs: 2, maxArgs: 4
};

FunctionRegistry.lookup.WRAPROWS = {
    category: 'Lookup',
    schema: ['any', 'number', 'any'],
    fn: (args) => {
        const [vector, wrapCount, padWith = "#N/A"] = args;
        const flat = Array.isArray(vector) ? vector.flat() : [vector];
        const result = [];
        for (let i = 0; i < flat.length; i += wrapCount) {
            const row = flat.slice(i, i + wrapCount);
            while (row.length < wrapCount) row.push(padWith);
            result.push(row);
        }
        return result;
    },
    minArgs: 2, maxArgs: 3
};

FunctionRegistry.lookup.WRAPCOLS = {
    category: 'Lookup',
    schema: ['any', 'number', 'any'],
    fn: (args) => {
        const [vector, wrapCount, padWith = "#N/A"] = args;
        const flat = Array.isArray(vector) ? vector.flat() : [vector];
        const numCols = Math.ceil(flat.length / wrapCount);
        const result = Array(wrapCount).fill(0).map(() => Array(numCols).fill(padWith));

        for (let i = 0; i < flat.length; i++) {
            const c = Math.floor(i / wrapCount);
            const r = i % wrapCount;
            result[r][c] = flat[i];
        }
        return result;
    },
    minArgs: 2, maxArgs: 3
};

FunctionRegistry.lookup.ROW = {
    category: 'Lookup',
    fn: (args, context) => {
        if (args.length === 0) {
            const coord = ReferenceResolver.idToCoord(context.sourceCell);
            return coord ? coord.r + 1 : "#VALUE!";
        }
        // If argument is provided, resolve reference. evaluator already resolved to value if it's A1.
        // We need a special way to get the row of a reference.
        // This remains a limitation in the current pipeline without raw expression access.
        return "#VALUE!";
    },
    minArgs: 0, maxArgs: 1
};

FunctionRegistry.lookup.COLUMN = {
    category: 'Lookup',
    fn: (args, context) => {
        if (args.length === 0) {
            const coord = ReferenceResolver.idToCoord(context.sourceCell);
            return coord ? coord.c + 1 : "#VALUE!";
        }
        return "#VALUE!";
    },
    minArgs: 0, maxArgs: 1
};

FunctionRegistry.lookup.ROWS = {
    category: 'Lookup',
    fn: (args) => {
        const array = args[0];
        return Array.isArray(array) ? array.length : 1;
    },
    minArgs: 1, maxArgs: 1
};

FunctionRegistry.lookup.COLUMNS = {
    category: 'Lookup',
    fn: (args) => {
        const array = args[0];
        if (!Array.isArray(array)) return 1;
        return Array.isArray(array[0]) ? array[0].length : array.length;
    },
    minArgs: 1, maxArgs: 1
};

FunctionRegistry.lookup.FORMULATEXT = {
    category: 'Lookup',
    fn: (args, context) => {
        // Limitation: evaluator resolves refs to values.
        return "#VALUE!";
    },
    minArgs: 1, maxArgs: 1
};

FunctionRegistry.lookup.HYPERLINK = {
    category: 'Lookup',
    schema: ['text', 'text'],
    fn: (args) => {
        const link = args[0];
        if (!link) return "#VALUE!";
        // Rule 14: Basic validation (URL or # reference)
        const isUrl = /^(https?|ftp|mailto):/i.test(link);
        const isRef = link.startsWith('#');
        if (!isUrl && !isRef) return "#VALUE!";
        return args[1] || link;
    },
    minArgs: 1, maxArgs: 2
};

// --- DATE & TIME FUNCTIONS ---

FunctionRegistry.date.DATE = {
  category: 'Date/Time',
  schema: ['number', 'number', 'number'],
  fn: (args) => dateConstruct(args[0], args[1], args[2]),
  minArgs: 3, maxArgs: 3
};

FunctionRegistry.date.TIME = {
  category: 'Date/Time',
  schema: ['number', 'number', 'number'],
  fn: (args) => timeConstruct(args[0], args[1], args[2]),
  minArgs: 3, maxArgs: 3
};

FunctionRegistry.date.TODAY = {
  category: 'Date/Time',
  fn: () => toSerial(new Date()),
  minArgs: 0, maxArgs: 0
};

FunctionRegistry.date.NOW = {
  category: 'Date/Time',
  fn: () => toSerial(new Date()),
  minArgs: 0, maxArgs: 0
};

FunctionRegistry.date.DATEVALUE = {
  category: 'Date/Time',
  schema: ['any'],
  fn: (args) => {
    if (IS_EMPTY(args[0])) return null;
    const res = parseDate(args[0]);
    return res === null ? "#VALUE!" : res;
  },
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.date.TIMEVALUE = {
  category: 'Date/Time',
  schema: ['any'],
  fn: (args) => {
    if (IS_EMPTY(args[0])) return null;
    const res = parseDate(args[0]);
    if (res === null) return "#VALUE!";
    if (IS_ERROR(res)) return res;
    return res - Math.floor(res);
  },
  minArgs: 1, maxArgs: 1
};

const dateExtractor = (comp) => (args) => {
  const serial = args[0];
  if (IS_EMPTY(serial)) return "#VALUE!";
  return extractComponent(serial, comp);
};

FunctionRegistry.date.YEAR = { category: 'Date/Time', schema: ['number'], fn: dateExtractor('year'), minArgs: 1, maxArgs: 1 };
FunctionRegistry.date.MONTH = { category: 'Date/Time', schema: ['number'], fn: dateExtractor('month'), minArgs: 1, maxArgs: 1 };
FunctionRegistry.date.DAY = { category: 'Date/Time', schema: ['number'], fn: dateExtractor('day'), minArgs: 1, maxArgs: 1 };
FunctionRegistry.date.HOUR = { category: 'Date/Time', schema: ['number'], fn: dateExtractor('hour'), minArgs: 1, maxArgs: 1 };
FunctionRegistry.date.MINUTE = { category: 'Date/Time', schema: ['number'], fn: dateExtractor('minute'), minArgs: 1, maxArgs: 1 };
FunctionRegistry.date.SECOND = { category: 'Date/Time', schema: ['number'], fn: dateExtractor('second'), minArgs: 1, maxArgs: 1 };

FunctionRegistry.date.WEEKDAY = {
  category: 'Date/Time',
  schema: ['number', 'number'],
  fn: (args) => weekday(args[0], args[1] || 1),
  minArgs: 1, maxArgs: 2
};

FunctionRegistry.date.WEEKNUM = {
  category: 'Date/Time',
  schema: ['number', 'number'],
  fn: (args) => weekNum(args[0], args[1] || 1),
  minArgs: 1, maxArgs: 2
};

FunctionRegistry.date.ISOWEEKNUM = {
  category: 'Date/Time',
  schema: ['number'],
  fn: (args) => isoWeekNum(args[0]),
  minArgs: 1, maxArgs: 1
};

FunctionRegistry.date.EDATE = {
  category: 'Date/Time',
  schema: ['number', 'number'],
  fn: (args) => eDate(args[0], args[1]),
  minArgs: 2, maxArgs: 2
};

FunctionRegistry.date.EOMONTH = {
  category: 'Date/Time',
  schema: ['number', 'number'],
  fn: (args) => eoMonth(args[0], args[1]),
  minArgs: 2, maxArgs: 2
};

FunctionRegistry.date.DAYS = {
  category: 'Date/Time',
  schema: ['number', 'number'],
  fn: (args) => {
    if (IS_EMPTY(args[0]) || IS_EMPTY(args[1])) return null;
    return Math.floor(args[0] - args[1]);
  },
  minArgs: 2, maxArgs: 2
};

FunctionRegistry.date.DAYS360 = {
  category: 'Date/Time',
  schema: ['number', 'number', 'logical'],
  fn: (args) => days360(args[0], args[1], args[2] || false),
  minArgs: 2, maxArgs: 3
};

FunctionRegistry.date.DATEDIF = {
  category: 'Date/Time',
  schema: ['number', 'number', 'any'],
  fn: (args) => dateDif(args[0], args[1], String(args[2] || "")),
  minArgs: 3, maxArgs: 3
};

FunctionRegistry.date.NETWORKDAYS = {
  category: 'Date/Time',
  schema: ['number', 'number', 'any'],
  fn: (args) => netWorkDaysIntl(args[0], args[1], 1, FLATTEN([args[2] || []]).filter(h => !IS_EMPTY(h))),
  minArgs: 2, maxArgs: 3
};

FunctionRegistry.date['NETWORKDAYS.INTL'] = {
  category: 'Date/Time',
  schema: ['number', 'number', 'any', 'any'],
  fn: (args) => netWorkDaysIntl(args[0], args[1], args[2] || 1, FLATTEN([args[3] || []]).filter(h => !IS_EMPTY(h))),
  minArgs: 2, maxArgs: 4
};

FunctionRegistry.date.WORKDAY = {
  category: 'Date/Time',
  schema: ['number', 'number', 'any'],
  fn: (args) => workDayIntl(args[0], args[1], 1, FLATTEN([args[2] || []]).filter(h => !IS_EMPTY(h))),
  minArgs: 2, maxArgs: 3
};

FunctionRegistry.date['WORKDAY.INTL'] = {
  category: 'Date/Time',
  schema: ['number', 'number', 'any', 'any'],
  fn: (args) => workDayIntl(args[0], args[1], args[2] || 1, FLATTEN([args[3] || []]).filter(h => !IS_EMPTY(h))),
  minArgs: 2, maxArgs: 4
};

FunctionRegistry.date.YEARFRAC = {
  category: 'Date/Time',
  schema: ['number', 'number', 'number'],
  fn: (args) => yearFrac(args[0], args[1], args[2] || 0),
  minArgs: 2, maxArgs: 3
};

export default FunctionRegistry;
