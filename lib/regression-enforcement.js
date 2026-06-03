/**
 * Regression and Forecasting Enforcement Layer for SheetLab.
 * Implements matrix-based least squares and exponential regression.
 */

import { IS_NUMBER, TO_NUMBER, IS_EMPTY } from './evaluation-pipeline.js';

// --- BASIC STATISTICAL UTILITIES ---

export const mean = (arr) => {
    if (!arr || arr.length === 0) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
};

export const variance = (arr, population = false) => {
    if (!arr || arr.length < (population ? 1 : 2)) return 0;
    const m = mean(arr);
    const sqDiffs = arr.map(v => Math.pow(v - m, 2));
    return sqDiffs.reduce((a, b) => a + b, 0) / (arr.length - (population ? 0 : 1));
};

export const covariance = (arr1, arr2, population = false) => {
    if (!arr1 || !arr2 || arr1.length !== arr2.length || arr1.length < (population ? 1 : 2)) return 0;
    const m1 = mean(arr1);
    const m2 = mean(arr2);
    let sum = 0;
    for (let i = 0; i < arr1.length; i++) {
        sum += (arr1[i] - m1) * (arr2[i] - m2);
    }
    return sum / (arr1.length - (population ? 0 : 1));
};

// --- MATRIX UTILITIES ---

/**
 * Transposes a matrix.
 */
export const transpose = (A) => {
    return A[0].map((_, c) => A.map(r => r[c]));
};

/**
 * Multiplies two matrices A and B.
 */
export const multiply = (A, B) => {
    const result = Array(A.length).fill(0).map(() => Array(B[0].length).fill(0));
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < B.length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
};

/**
 * Solves a linear system Ax = b using Gaussian elimination with partial pivoting.
 */
export const solve = (A, b) => {
    const n = A.length;
    const matrix = A.map((row, i) => [...row, b[i][0]]);

    for (let i = 0; i < n; i++) {
        // Pivot
        let max = Math.abs(matrix[i][i]);
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(matrix[k][i]) > max) {
                max = Math.abs(matrix[k][i]);
                maxRow = k;
            }
        }

        // Swap rows
        const temp = matrix[maxRow];
        matrix[maxRow] = matrix[i];
        matrix[i] = temp;

        if (Math.abs(matrix[i][i]) < 1e-12) {
            throw new Error("Singular matrix");
        }

        // Make upper triangular
        for (let k = i + 1; k < n; k++) {
            const c = -matrix[k][i] / matrix[i][i];
            for (let j = i; j <= n; j++) {
                if (i === j) {
                    matrix[k][j] = 0;
                } else {
                    matrix[k][j] += c * matrix[i][j];
                }
            }
        }
    }

    // Back substitution
    const x = Array(n).fill(0).map(() => [0]);
    for (let i = n - 1; i >= 0; i--) {
        x[i][0] = matrix[i][n] / matrix[i][i];
        for (let k = i - 1; k >= 0; k--) {
            matrix[k][n] -= matrix[k][i] * x[i][0];
        }
    }
    return x;
};

// --- REGRESSION CORE ---

/**
 * Internal LINEST implementation.
 * Returns { coefficients, statistics }
 */
const runLinest = (known_ys, known_xs, hasConst = true, returnStats = false) => {
    // 1. Data Normalization
    if (!Array.isArray(known_ys)) return "#VALUE!";

    const isRowVectorY = known_ys.length === 1 && Array.isArray(known_ys[0]);
    const yFlat = known_ys.flat();
    const n = yFlat.length;

    let xMatrix;
    if (!known_xs) {
        xMatrix = Array(n).fill(0).map((_, i) => [i + 1]);
    } else {
        if (!Array.isArray(known_xs)) return "#VALUE!";

        // Ensure known_xs is 2D
        const x2D = Array.isArray(known_xs[0]) ? known_xs : known_xs.map(x => [x]);

        if (isRowVectorY) {
            // known_ys is 1xN. known_xs should be MxN or NxM?
            // If known_xs is NxM where N is num observations, then x2D.length === n.
            // If known_xs is MxN where N is num observations, then x2D[0].length === n.

            if (x2D.length === n) {
                xMatrix = x2D;
            } else if (x2D[0].length === n) {
                xMatrix = x2D[0].map((_, colIndex) => x2D.map(row => row[colIndex]));
            } else {
                return "#REF!";
            }
        } else {
            // known_ys is Nx1. known_xs should be NxM.
            if (x2D.length === n) {
                xMatrix = x2D;
            } else if (x2D[0].length === n) {
                // maybe it's transposed
                xMatrix = x2D[0].map((_, colIndex) => x2D.map(row => row[colIndex]));
            } else {
                return "#REF!";
            }
        }
    }

    const numVars = xMatrix[0].length;

    // 2. Build X matrix for least squares (y = X * beta)
    let X = xMatrix;
    if (hasConst) {
        X = xMatrix.map(row => [...row, 1]);
    }

    // 3. Solve (X'X) * beta = X'y
    const XT = transpose(X);
    const XTX = multiply(XT, X);
    const XTy = multiply(XT, yFlat.map(y => [y]));

    let beta;
    try {
        beta = solve(XTX, XTy);
    } catch (e) {
        // Excel often returns 0 for collinear variables instead of failing
        // but for now we follow the instruction to ensure numerical stability
        // and return #NUM! for singular matrices as implemented in solve.
        return "#NUM!";
    }

    // Coefficients: [m_n, m_{n-1}, ..., m_1, b]
    // beta is [m_1, m_2, ..., m_n, b]
    const coeffs = beta.map(r => r[0]);
    if (hasConst) {
        const b = coeffs.pop();
        coeffs.reverse();
        coeffs.push(b);
    } else {
        coeffs.reverse();
        coeffs.push(0);
    }

    if (!returnStats) return { coefficients: coeffs };

    // 4. Statistics
    const yMean = mean(yFlat);
    const ssTot = yFlat.reduce((acc, y) => acc + Math.pow(y - yMean, 2), 0);

    let ssResid = 0;
    const yHat = X.map(row => {
        let val = 0;
        for (let j = 0; j < row.length; j++) {
            // beta is [m1, m2, ..., b]
            if (hasConst && j === row.length - 1) {
                val += beta[j][0];
            } else {
                val += row[j] * beta[j][0];
            }
        }
        return val;
    });

    for (let i = 0; i < n; i++) {
        ssResid += Math.pow(yFlat[i] - yHat[i], 2);
    }

    const ssReg = ssTot - ssResid;
    const df = n - (hasConst ? numVars + 1 : numVars);
    const r2 = ssTot === 0 ? 1 : ssReg / ssTot;
    const sey = df > 0 ? Math.sqrt(ssResid / df) : 0;
    const fStat = (df > 0 && ssResid !== 0) ? (ssReg / (hasConst ? numVars : numVars)) / (ssResid / df) : 0;

    // Standard errors of coefficients
    // SE = sqrt(sey^2 * diag(XTX^-1))
    // For now, if stats are requested, we'd need matrix inversion or more advanced solving.
    // Simplified: return basic stats Excel requires.
    const stats = [
        [r2, sey],
        [fStat, df],
        [ssReg, ssResid]
    ];

    return { coefficients: coeffs, stats: stats };
};

// --- EXPORTED FUNCTIONS ---

export const LINEST = (known_ys, known_xs, hasConst = true, returnStats = false) => {
    const res = runLinest(known_ys, known_xs, hasConst, returnStats);
    if (typeof res === 'string') return res;

    if (!returnStats) return [res.coefficients];

    // Excel LINEST output structure:
    // row 1: m_n, m_{n-1}, ..., m_1, b
    // row 2: se_n, se_{n-1}, ..., se_1, se_b
    // row 3: r^2, se_y
    // row 4: F, df
    // row 5: ss_reg, ss_resid
    const row1 = res.coefficients;
    const row2 = Array(row1.length).fill(0); // placeholder for SE
    const row3 = [...res.stats[0]];
    while (row3.length < row1.length) row3.push("#N/A");
    const row4 = [...res.stats[1]];
    while (row4.length < row1.length) row4.push("#N/A");
    const row5 = [...res.stats[2]];
    while (row5.length < row1.length) row5.push("#N/A");

    return [row1, row2, row3, row4, row5];
};

export const TREND = (known_ys, known_xs, new_xs, hasConst = true) => {
    const linestRes = runLinest(known_ys, known_xs, hasConst, false);
    if (typeof linestRes === 'string') return linestRes;

    const coeffs = linestRes.coefficients; // [m_n, ..., m_1, b]
    const b = coeffs[coeffs.length - 1];
    const ms = coeffs.slice(0, coeffs.length - 1).reverse(); // [m_1, m_2, ..., m_n]

    let targets;
    if (!new_xs) {
        targets = known_xs || Array(known_ys.length).fill(0).map((_, i) => [i + 1]);
    } else {
        targets = new_xs;
    }

    if (!Array.isArray(targets)) return "#VALUE!";

    if (!Array.isArray(targets[0])) {
        // [4, 5] -> [[4], [5]]
        targets = targets.map(x => [x]);
    } else if (targets.length === 1 && targets[0].length > ms.length && ms.length > 0) {
        // [[4, 5]] but we need NxM targets where M is numVars.
        // If targets is 1xN and we expect variables in columns, maybe it's transposed?
        // Excel: If known_ys is 1-col, TREND expects new_xs to have vars in cols.
        // If known_ys is 1-row, TREND expects new_xs to have vars in rows.
    }

    const result = targets.map(row => {
        let val = b;
        for (let i = 0; i < row.length; i++) {
            val += row[i] * ms[i];
        }
        return [val];
    });

    return result;
};

export const LOGEST = (known_ys, known_xs, hasConst = true, returnStats = false) => {
    // ln(y) = ln(b) + x * ln(m)
    const flatY = known_ys.flat();
    if (flatY.some(y => y <= 0)) return "#NUM!";

    const lnY = known_ys.map(row => (Array.isArray(row) ? row : [row]).map(y => Math.log(y)));
    const linestRes = runLinest(lnY, known_xs, hasConst, returnStats);
    if (typeof linestRes === 'string') return linestRes;

    // linestRes.coefficients are [ln(m_n), ..., ln(m_1), ln(b)]
    const coeffs = linestRes.coefficients.map(c => Math.exp(c));

    if (!returnStats) return [coeffs];

    // For LOGEST stats, some are different, but R2, DF etc are from the linear regression of logs
    const row1 = coeffs;
    const row2 = Array(row1.length).fill(0); // placeholder
    const row3 = [...linestRes.stats[0]];
    while (row3.length < row1.length) row3.push("#N/A");
    const row4 = [...linestRes.stats[1]];
    while (row4.length < row1.length) row4.push("#N/A");
    const row5 = [...linestRes.stats[2]];
    while (row5.length < row1.length) row5.push("#N/A");

    return [row1, row2, row3, row4, row5];
};

export const GROWTH = (known_ys, known_xs, new_xs, hasConst = true) => {
    const lnY = known_ys.map(row => (Array.isArray(row) ? row : [row]).map(y => Math.log(y)));
    const trendRes = TREND(lnY, known_xs, new_xs, hasConst);
    if (typeof trendRes === 'string') return trendRes;

    return trendRes.map(row => row.map(val => Math.exp(val)));
};

export const FORECAST = (x, known_ys, known_xs) => {
    const linestRes = runLinest(known_ys, known_xs, true, false);
    if (typeof linestRes === 'string') return linestRes;

    const coeffs = linestRes.coefficients; // [m, b] for simple regression
    if (coeffs.length !== 2) return "#VALUE!"; // FORECAST is for simple regression

    return coeffs[1] + x * coeffs[0];
};
