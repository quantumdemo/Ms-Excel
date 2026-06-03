import FunctionRegistry from '../lib/function-registry.js';

const assertEqual = (name, actual, expected) => {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(`[PASS] ${name}: ${JSON.stringify(actual)}`);
    } else {
        console.error(`[FAIL] ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
};

console.log("--- PHASE 10: REFINED RANKING AND PERCENTILE VERIFICATION ---");

const context = {};

// PERCENTRANK.INC
assertEqual("PERCENTRANK.INC([1, 2, 3, 3, 5], 3)",
    FunctionRegistry.stats['PERCENTRANK.INC'].fn([[1, 2, 3, 3, 5], 3], context), 0.5);
assertEqual("PERCENTRANK.INC([1, 2, 3, 3, 5], 4)",
    FunctionRegistry.stats['PERCENTRANK.INC'].fn([[1, 2, 3, 3, 5], 4], context), 0.875);

assertEqual("PERCENTRANK.EXC([1, 2, 3, 3, 5], 3)",
    FunctionRegistry.stats['PERCENTRANK.EXC'].fn([[1, 2, 3, 3, 5], 3], context), 0.5);

assertEqual("PERCENTRANK.EXC([5], 5)",
    FunctionRegistry.stats['PERCENTRANK.EXC'].fn([[5], 5], context), "#NUM!");

// MODE.MULT
assertEqual("MODE.MULT([1, 2, 2, 3, 3])",
    FunctionRegistry.stats['MODE.MULT'].fn([[1, 2, 2, 3, 3]], context), [[2], [3]]);

// FREQUENCY
assertEqual("FREQUENCY([1, 5, 8, 10, 15, 20], [5, 15])",
    FunctionRegistry.stats.FREQUENCY.fn([[1, 5, 8, 10, 15, 20], [5, 15]], context), [[2], [3], [1]]);

console.log("--- VERIFICATION COMPLETE ---");
