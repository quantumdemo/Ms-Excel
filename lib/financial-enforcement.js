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

    // Newton's method with numerical derivative estimation
    for (let i = 0; i < maxIter; i++) {
        const y = fn(x);
        if (Math.abs(y) < tolerance) return x;

        // Estimate derivative using a small step
        const dx = 0.0001;
        const y2 = fn(x + dx);
        const dy = (y2 - y) / dx;

        if (Math.abs(dy) < 1e-12) {
            x += 0.01; // Avoid plateau
            continue;
        }

        const nextX = x - y / dy;

        // Excel-like damping and boundary protection
        if (Math.abs(nextX - x) < tolerance) return nextX;

        if (nextX <= -1) {
            x = (x - 1) / 2;
        } else {
            x = nextX;
        }
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
    },
    RRI: (nper, pv, fv) => {
        if (nper <= 0) return "#NUM!";
        if (pv === 0) return "#DIV/0!";
        if (pv * fv < 0) return "#NUM!"; // Cannot have negative result for power
        return Math.pow(fv / pv, 1 / nper) - 1;
    },
    PDURATION: (rate, pv, fv) => {
        if (rate <= 0 || pv <= 0 || fv <= 0) return "#NUM!";
        return (Math.log(fv) - Math.log(pv)) / Math.log(1 + rate);
    }
};

// --- ADVANCED FINANCIAL MODELS ---

export const ISPMT_CORE = (rate, per, nper, pv) => {
    if (nper === 0) return "#DIV/0!";
    // per is expected to be 1-based in our registry mapping,
    // Excel ISPMT uses 0 to nper-1 internally.
    // Formula: ISPMT = -pv * rate * (1 - (per-1)/nper)
    return -pv * rate * (1 - (per - 1) / nper);
};

export const FVSCHEDULE_CORE = (principal, schedule) => {
    let result = principal;
    for (const rate of schedule) {
        if (!IS_NUMBER(rate)) continue;
        result *= (1 + rate);
    }
    return result;
};

export const XNPV_CORE = (rate, values, dates) => {
    if (values.length !== dates.length) return "#VALUE!";
    if (values.length === 0) return 0;

    const d0 = dates[0];
    let total = 0;
    for (let i = 0; i < values.length; i++) {
        const diff = dates[i] - d0;
        if (diff < 0) return "#NUM!";
        // Exact day-based discounting: CF_i / (1 + rate)^((date_i - date_0) / 365)
        total += values[i] / Math.pow(1 + rate, diff / 365);
    }
    return total;
};

export const XIRR_CORE = (values, dates, guess = 0.1) => {
    if (values.length !== dates.length) return "#VALUE!";
    if (!VALIDATE_CASHFLOW_SIGNS(values)) return "#NUM!";

    const fn = (r) => XNPV_CORE(r, values, dates);
    return SOLVE_ITERATIVELY(fn, guess);
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
