/**
 * Bond and Securities Enforcement Layer for SheetLab
 * Handles complex bond mathematics, day count conventions, and coupon scheduling.
 */

import { IS_NUMBER, IS_ERROR } from './evaluation-pipeline.js';
import {
    fromSerial, toSerial, days360, yearFrac, parseDate, isLeapYear
} from './date-time-enforcement.js';
import { SOLVE_ITERATIVELY } from './financial-enforcement.js';

// --- CONSTANTS ---
const MS_PER_DAY = 24 * 60 * 60 * 1000;

// --- DAY COUNT CONVENTIONS ---

/**
 * Returns the number of days in the year for a given basis.
 */
export const DAYS_IN_YEAR = (dateSerial, basis) => {
    switch (basis) {
        case 0: case 2: case 4: return 360;
        case 1: return isLeapYear(fromSerial(dateSerial).getUTCFullYear()) ? 366 : 365;
        case 3: return 365;
        default: return 360;
    }
};

/**
 * Returns number of days between two dates based on basis.
 */
export const COUNT_DAYS = (start, end, basis) => {
    if (basis === 0 || basis === 4) return days360(start, end, basis === 4);
    return Math.floor(end - start);
};

// --- COUPON HELPERS ---

/**
 * COUPNUM: Number of coupons payable between settlement and maturity.
 */
export const COUPNUM = (settlement, maturity, frequency) => {
    if (settlement >= maturity) return "#NUM!";
    const m = fromSerial(maturity);
    const s = fromSerial(settlement);

    let count = 0;
    let current = new Date(m);
    while (toSerial(current) > settlement) {
        count++;
        current.setUTCMonth(current.getUTCMonth() - (12 / frequency));
    }
    return count;
};

/**
 * COUPNCD: Next coupon date after settlement.
 */
export const COUPNCD = (settlement, maturity, frequency) => {
    const m = fromSerial(maturity);
    let current = new Date(m);
    while (toSerial(current) > settlement) {
        const next = new Date(current);
        current.setUTCMonth(current.getUTCMonth() - (12 / frequency));
        if (toSerial(current) <= settlement) return toSerial(next);
    }
    return toSerial(m);
};

/**
 * COUPPCD: Previous coupon date before settlement.
 */
export const COUPPCD = (settlement, maturity, frequency) => {
    const m = fromSerial(maturity);
    let current = new Date(m);
    while (toSerial(current) > settlement) {
        current.setUTCMonth(current.getUTCMonth() - (12 / frequency));
    }
    return toSerial(current);
};

/**
 * COUPDAYS: Number of days in the coupon period that contains the settlement date.
 */
export const COUPDAYS = (settlement, maturity, frequency, basis) => {
    const ncd = COUPNCD(settlement, maturity, frequency);
    const pcd = COUPPCD(settlement, maturity, frequency);
    return COUNT_DAYS(pcd, ncd, basis);
};

/**
 * COUPDAYSNC: Number of days from the settlement date to the next coupon date.
 */
export const COUPDAYSNC = (settlement, maturity, frequency, basis) => {
    const ncd = COUPNCD(settlement, maturity, frequency);
    return COUNT_DAYS(settlement, ncd, basis);
};

/**
 * COUPDAYBS: Number of days from the beginning of the coupon period to the settlement date.
 */
export const COUPDAYBS = (settlement, maturity, frequency, basis) => {
    const pcd = COUPPCD(settlement, maturity, frequency);
    return COUNT_DAYS(pcd, settlement, basis);
};

// --- CORE BOND MODELS ---

/**
 * PRICE Model (Simplified)
 */
export const BOND_PRICE = (settlement, maturity, rate, yieldRate, redemption, frequency, basis) => {
    if (yieldRate < 0 || rate < 0) return "#NUM!";

    const n = COUPNUM(settlement, maturity, frequency);
    const dsc = COUPDAYSNC(settlement, maturity, frequency, basis);
    const e = COUPDAYS(settlement, maturity, frequency, basis);
    const a = COUPDAYBS(settlement, maturity, frequency, basis);

    if (n === 1) {
        const t1 = (redemption + (100 * rate / frequency));
        const t2 = 1 + (yieldRate / frequency) * (dsc / e);
        const accInt = (100 * rate / frequency) * (a / e);
        return t1 / t2 - accInt;
    }

    // Series price formula
    let sum = 0;
    for (let k = 1; k <= n; k++) {
        sum += (100 * rate / frequency) / Math.pow(1 + yieldRate / frequency, k - 1 + dsc / e);
    }
    sum += redemption / Math.pow(1 + yieldRate / frequency, n - 1 + dsc / e);

    const accInt = (100 * rate / frequency) * (a / e);
    return sum - accInt;
};

/**
 * YIELD Model
 */
export const BOND_YIELD = (settlement, maturity, rate, pr, redemption, frequency, basis, guess = 0.1) => {
    const fn = (y) => BOND_PRICE(settlement, maturity, rate, y, redemption, frequency, basis) - pr;
    return SOLVE_ITERATIVELY(fn, guess);
};

/**
 * DURATION Models
 */
export const BOND_DURATION = (settlement, maturity, coupon, yieldRate, frequency, basis, modified = false) => {
    const n = COUPNUM(settlement, maturity, frequency);
    if (IS_ERROR(n)) return n;
    const dsc = COUPDAYSNC(settlement, maturity, frequency, basis);
    const e = COUPDAYS(settlement, maturity, frequency, basis);

    let cashFlows = [];
    for (let k = 1; k <= n; k++) {
        cashFlows.push({
            time: (k - 1 + dsc / e) / frequency,
            amount: 100 * coupon / frequency
        });
    }
    cashFlows[n - 1].amount += 100; // Redemption 100

    let pvSum = 0;
    let weightedTimeSum = 0;
    for (const cf of cashFlows) {
        const pv = cf.amount / Math.pow(1 + yieldRate / frequency, cf.time * frequency);
        pvSum += pv;
        weightedTimeSum += pv * cf.time;
    }

    const duration = weightedTimeSum / pvSum;
    if (modified) {
        return duration / (1 + yieldRate / frequency);
    }
    return duration;
};

// --- INTEREST ACCRUAL ---

export const ACCRINT = (issue, first_interest, settlement, rate, par, frequency, basis) => {
    // Simplified model
    const days = COUNT_DAYS(issue, settlement, basis);
    const yearDays = DAYS_IN_YEAR(issue, basis);
    return par * rate * (days / yearDays);
};

export const ACCRINTM = (issue, settlement, rate, par, basis) => {
    const days = COUNT_DAYS(issue, settlement, basis);
    const yearDays = DAYS_IN_YEAR(issue, basis);
    return par * rate * (days / yearDays);
};

// --- TREASURY BILLS ---

export const TBILLPRICE = (settlement, maturity, discount) => {
    const days = Math.floor(maturity - settlement);
    if (days < 0 || days > 366) return "#NUM!";
    return 100 * (1 - discount * days / 360);
};

export const TBILLYIELD = (settlement, maturity, pr) => {
    const days = Math.floor(maturity - settlement);
    if (days < 0 || days > 366) return "#NUM!";
    return (100 - pr) / pr * (360 / days);
};

export const TBILLEQ = (settlement, maturity, discount) => {
    const days = Math.floor(maturity - settlement);
    if (days < 0 || days > 366) return "#NUM!";
    return (365 * discount) / (360 - (discount * days));
};

// --- ADDITIONAL ---

export const DISC = (settlement, maturity, pr, redemption, basis) => {
    const days = COUNT_DAYS(settlement, maturity, basis);
    const yearDays = DAYS_IN_YEAR(settlement, basis);
    return (redemption - pr) / redemption * (yearDays / days);
};

export const RECEIVED = (settlement, maturity, investment, discount, basis) => {
    const days = COUNT_DAYS(settlement, maturity, basis);
    const yearDays = DAYS_IN_YEAR(settlement, basis);
    return investment / (1 - discount * days / yearDays);
};

export const INTRATE = (settlement, maturity, investment, redemption, basis) => {
    const days = COUNT_DAYS(settlement, maturity, basis);
    const yearDays = DAYS_IN_YEAR(settlement, basis);
    return (redemption - investment) / investment * (yearDays / days);
};
