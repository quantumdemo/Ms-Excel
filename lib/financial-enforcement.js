/**
 * Financial Enforcement Layer for SheetLab
 * Ensures strict financial correctness, consistency, and stability.
 */

import { IS_ERROR, IS_NUMBER, TO_NUMBER } from './evaluation-pipeline.js';

// --- CONSTANTS ---
export const FINANCIAL_PRECISION = 1e-7;
export const FINANCIAL_MAX_ITERATIONS = 100;

// --- HELPERS ---

/**
 * Validates sign consistency for cash flows.
 * IRR and MIRR require at least one positive and one negative value.
 */
export const VALIDATE_CASHFLOW_SIGNS = (values) => {
    let hasPositive = false;
    let hasNegative = false;
    for (const v of values) {
        if (!IS_NUMBER(v)) continue;
        if (v > 0) hasPositive = true;
        if (v < 0) hasNegative = true;
        if (hasPositive && hasNegative) return true;
    }
    return false;
};

/**
 * Shared iterative solver for RATE and IRR.
 * Uses a fixed tolerance and iteration limit.
 */
export const SOLVE_ITERATIVELY = (fn, guess) => {
    let x = guess;
    const tolerance = FINANCIAL_PRECISION;
    const maxIter = FINANCIAL_MAX_ITERATIONS;

    // We use a simple secant-like or Newton-like approach if we had derivatives,
    // but the prompt suggests a general SOLVE_ITERATIVELY(fn, guess).
    // Let's implement a robust Newton method or Secant method here.
    // For now, let's use a simple Newton approach if we can estimate the derivative.

    for (let i = 0; i < maxIter; i++) {
        const y = fn(x);
        if (Math.abs(y) < tolerance) return x;

        // Estimate derivative
        const dx = 1e-6;
        const dy = fn(x + dx) - y;
        if (Math.abs(dy) < 1e-12) {
            x += 0.01; // Avoid stuck
            continue;
        }

        const nextX = x - y / (dy / dx);

        if (Math.abs(nextX - x) < tolerance) return nextX;
        x = nextX;
    }

    return "#NUM!"; // Non-convergence
};

// --- UNIFIED TVM MODEL ---
/**
 * Equation: FV + PV * (1 + rate)^nper + PMT * [(1 + rate * type) * ((1 + rate)^nper - 1) / rate] = 0
 */

export const TVM_MODELS = {
    FV: (rate, nper, pmt, pv, type) => {
        if (rate === 0) return -(pv + pmt * nper);
        const term = Math.pow(1 + rate, nper);
        return -(pv * term + pmt * (1 + rate * type) * (term - 1) / rate);
    },
    PV: (rate, nper, pmt, fv, type) => {
        if (rate === 0) return -(fv + pmt * nper);
        const term = Math.pow(1 + rate, nper);
        return -(fv + pmt * (1 + rate * type) * (term - 1) / rate) / term;
    },
    PMT: (rate, nper, pv, fv, type) => {
        if (rate === 0) return -(pv + fv) / nper;
        const term = Math.pow(1 + rate, nper);
        return -(pv * term + fv) * rate / ((1 + rate * type) * (term - 1));
    },
    NPER: (rate, pmt, pv, fv, type) => {
        if (rate === 0) return -(pv + fv) / pmt;
        const num = pmt * (1 + rate * type) - fv * rate;
        const den = rate * pv + pmt * (1 + rate * type);
        if (num <= 0 || den <= 0) return "#NUM!";
        return Math.log(num / den) / Math.log(1 + rate);
    },
    RATE: (nper, pmt, pv, fv, type, guess = 0.1) => {
        const fn = (r) => {
            if (r === 0) return pv + pmt * nper + fv;
            const term = Math.pow(1 + r, nper);
            return pv * term + pmt * (1 + r * type) * (term - 1) / r + fv;
        };
        return SOLVE_ITERATIVELY(fn, guess);
    }
};

// --- BOUNDARY VALIDATIONS ---

export const VALIDATE_PERIODS = (nper, per = null, start = null, end = null) => {
    if (nper <= 0) return "#NUM!";
    if (per !== null && (per < 1 || per > nper)) return "#NUM!";
    if (start !== null && (start < 1 || start > nper)) return "#NUM!";
    if (end !== null && (end < 1 || end > nper || end < start)) return "#NUM!";
    return true;
};

export const VALIDATE_DEPRECIATION = (cost, salvage, life, period) => {
    if (cost < 0 || salvage < 0 || life <= 0 || period < 1 || period > life) return "#NUM!";
    if (salvage > cost) return "#NUM!"; // Depreciation must not exceed asset value
    return true;
};
