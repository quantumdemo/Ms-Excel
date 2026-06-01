/**
 * Global Evaluation Pipeline for SheetLab
 * Governs consistency across all function categories.
 */

// --- VALUE TYPE SYSTEM ---

export const IS_EMPTY = (val) => val === null || val === undefined || val === "";

export const IS_NUMBER = (val) => typeof val === 'number' && !isNaN(val);

export const IS_ERROR = (val) => typeof val === 'string' && val.startsWith('#');

export const IS_LOGICAL = (val) => typeof val === 'boolean' || val === "TRUE" || val === "FALSE";

export const IS_ARRAY = (val) => Array.isArray(val);

// --- TYPE NORMALIZATION LAYER ---

/**
 * Converts value to number only when safe.
 */
export const TO_NUMBER = (val) => {
    if (IS_NUMBER(val)) return val;
    if (IS_EMPTY(val)) return null;
    if (val === true || val === "TRUE") return 1;
    if (val === false || val === "FALSE") return 0;

    return "#VALUE!";
};

/**
 * Converts value to logical.
 */
export const TO_LOGICAL = (val) => {
    if (typeof val === 'boolean') return val;
    if (val === "TRUE") return true;
    if (val === "FALSE") return false;
    if (IS_NUMBER(val)) return val !== 0;
    if (IS_EMPTY(val)) return null;
    return "#VALUE!";
};

// --- ARRAY AND RANGE HANDLING ---

export const FLATTEN = (args) => {
    const result = [];
    args.forEach(arg => {
        if (IS_ARRAY(arg)) {
            arg.forEach(row => {
                if (IS_ARRAY(row)) {
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

export const MAP = (array, fn) => {
    if (!IS_ARRAY(array)) return fn(array);
    return array.map(item => IS_ARRAY(item) ? MAP(item, fn) : fn(item));
};

// --- INPUT NORMALIZATION & VALIDATION ---

/**
 * Normalizes values based on category-specific rules.
 */
export const NORMALIZE_INPUT = (value, category, type) => {
    if (IS_ERROR(value)) return value;
    if (IS_ARRAY(value)) return value; // Don't normalize arrays here

    switch (category) {
        case 'Math':
            if (IS_EMPTY(value)) return null;
            return type === 'number' ? TO_NUMBER(value) : value;

        case 'Statistical':
            if (IS_EMPTY(value)) return null;
            return type === 'number' ? TO_NUMBER(value) : value;

        case 'Financial':
            if (IS_EMPTY(value)) return "#VALUE!";
            return type === 'number' ? TO_NUMBER(value) : value;

        case 'Logical':
            if (IS_EMPTY(value)) return null;
            return type === 'logical' ? TO_LOGICAL(value) : value;

        default:
            return value;
    }
};

/**
 * Validates inputs against a schema.
 */
export const VALIDATE_INPUTS = (args, schema, category) => {
    if (!schema || schema.length === 0) return args;

    return args.map((arg, idx) => {
        const type = schema[idx] || schema[schema.length - 1];

        // If input contains an error, propagate it immediately (Strict Propagation)
        if (IS_ERROR(arg)) return arg;

        if (IS_ARRAY(arg)) {
            return MAP(arg, (val) => NORMALIZE_INPUT(val, category, type));
        }

        return NORMALIZE_INPUT(arg, category, type);
    });
};

// --- GLOBAL EXECUTION PIPELINE ---

/**
 * EXECUTE_WITH_GUARDS governs the entire execution flow.
 */
export const EXECUTE_WITH_GUARDS = (fnDef, args, context = {}) => {
    try {
        // 1. Strict Error Propagation: If any input contains an error -> propagate it immediately
        for (const arg of args) {
            if (IS_ERROR(arg)) return arg;
            if (IS_ARRAY(arg)) {
                const flat = FLATTEN([arg]);
                for (const cell of flat) {
                    if (IS_ERROR(cell)) return cell;
                }
            }
        }

        const category = fnDef.category || 'General';

        let processedArgs = args;
        if (fnDef.autoFlatten) {
            processedArgs = [FLATTEN(args)];
        }

        const validatedArgs = VALIDATE_INPUTS(processedArgs, fnDef.schema, category);

        // Check if any validation resulted in an error
        for (const arg of validatedArgs) {
            if (IS_ERROR(arg)) return arg;
            if (IS_ARRAY(arg)) {
                const flat = FLATTEN([arg]);
                for (const cell of flat) {
                    if (IS_ERROR(cell)) return cell;
                }
            }
        }

        // 3. Execute function logic
        const result = fnDef.fn(validatedArgs, context);

        return result;
    } catch (e) {
        console.error("Pipeline Execution Error:", e);
        return "#VALUE!";
    }
};

// --- ITERATIVE FUNCTION CONTROL ---

export const IterativeEngine = {
    MAX_ITERATIONS: 100,
    CONVERGENCE_TOLERANCE: 1e-9,
    DAMPING_FACTOR: 0.8,

    iterateNewton: function(fn, dfn, guess = 0.1) {
        let x = guess;
        for (let i = 0; i < this.MAX_ITERATIONS; i++) {
            const y = fn(x);
            const dy = dfn(x);

            if (Math.abs(dy) < 1e-12) {
                x += 0.01;
                continue;
            }

            const delta = y / dy;
            const nextX = x - this.DAMPING_FACTOR * delta;

            if (Math.abs(nextX - x) < this.CONVERGENCE_TOLERANCE) return nextX;

            if (nextX <= -0.999) {
                x = (x - 1) / 2;
            } else {
                x = nextX;
            }
        }
        return "#NUM!";
    }
};
