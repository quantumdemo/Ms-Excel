/**
 * Lookup & Reference Enforcement Layer for SheetLab
 * Governs strict correctness, stability, and consistency in lookup operations.
 */

import { IS_EMPTY, IS_ERROR, IS_NUMBER, TO_NUMBER } from './evaluation-pipeline.js';

// --- CORE LOOKUP LOGIC ---

/**
 * Validates if an array is sorted.
 * @param {Array} arr - The array to check.
 * @param {number} direction - 1 for ascending, -1 for descending.
 */
const isSorted = (arr, direction) => {
    for (let i = 0; i < arr.length - 1; i++) {
        const current = arr[i];
        const next = arr[i + 1];
        if (IS_EMPTY(current) || IS_EMPTY(next)) continue;
        if (direction === 1 && current > next) return false;
        if (direction === -1 && current < next) return false;
    }
    return true;
};

/**
 * Core matching logic for MATCH, XMATCH, and other lookups.
 * Enforces Rule 4 (Exact by default) and Rule 5 (Sort validation).
 */
export const lookupMatch = (lookupValue, lookupArray, matchMode = 0, searchMode = 1) => {
    if (!Array.isArray(lookupArray)) return "#VALUE!";
    const flatArray = lookupArray.flat();

    // Rule 5: Enforcement of sorting for approximate matches
    if (matchMode === 1 && !isSorted(flatArray, 1)) return "#N/A"; // Excel returns N/A or wrong result, we enforce error for safety if requested
    if (matchMode === -1 && !isSorted(flatArray, -1)) return "#N/A";

    let resultIndex = -1;

    // Search Modes: 1 (first-to-last), -1 (last-to-first)
    const range = searchMode === -1 ? [...Array(flatArray.length).keys()].reverse() : [...Array(flatArray.length).keys()];

    for (const i of range) {
        const val = flatArray[i];

        if (matchMode === 0) { // Exact Match
            if (val === lookupValue) {
                resultIndex = i;
                if (searchMode !== -1) break; // Found first
            }
        } else if (matchMode === 1) { // Less than or equal (next smaller)
            if (val <= lookupValue) {
                if (resultIndex === -1 || val > flatArray[resultIndex]) {
                    resultIndex = i;
                }
            }
        } else if (matchMode === -1) { // Greater than or equal (next larger)
            if (val >= lookupValue) {
                if (resultIndex === -1 || val < flatArray[resultIndex]) {
                    resultIndex = i;
                }
            }
        } else if (matchMode === 2) { // Wildcard match (Simplified)
             if (typeof lookupValue === 'string' && typeof val === 'string') {
                 const regex = new RegExp('^' + lookupValue.replace(/\?/g, '.').replace(/\*/g, '.*') + '$', 'i');
                 if (regex.test(val)) {
                     resultIndex = i;
                     if (searchMode !== -1) break;
                 }
             }
        }
    }

    return resultIndex === -1 ? "#N/A" : resultIndex;
};

// --- LOOKUP FUNCTIONS ---

export const VLOOKUP = (lookupValue, tableArray, colIndex, rangeLookup = true) => {
    if (!Array.isArray(tableArray)) return "#VALUE!";
    const matchMode = rangeLookup ? 1 : 0;
    const lookupVector = tableArray.map(row => row[0]);
    const idx = lookupMatch(lookupValue, lookupVector, matchMode);

    if (IS_ERROR(idx)) return idx;
    const row = tableArray[idx];
    if (!row || colIndex < 1 || colIndex > row.length) return "#REF!";
    return row[colIndex - 1];
};

export const HLOOKUP = (lookupValue, tableArray, rowIndex, rangeLookup = true) => {
    if (!Array.isArray(tableArray)) return "#VALUE!";
    const matchMode = rangeLookup ? 1 : 0;
    const lookupVector = tableArray[0];
    const idx = lookupMatch(lookupValue, lookupVector, matchMode);

    if (IS_ERROR(idx)) return idx;
    if (rowIndex < 1 || rowIndex > tableArray.length) return "#REF!";
    const row = tableArray[rowIndex - 1];
    return row[idx];
};

export const XLOOKUP = (lookupValue, lookupArray, returnArray, ifNotFound = "#N/A", matchMode = 0, searchMode = 1) => {
    const idx = lookupMatch(lookupValue, lookupArray, matchMode, searchMode);
    if (idx === "#N/A") return ifNotFound;
    if (IS_ERROR(idx)) return idx;

    const flatReturn = Array.isArray(returnArray) ? returnArray.flat() : [returnArray];
    if (idx < 0 || idx >= flatReturn.length) return "#REF!";
    return flatReturn[idx];
};

export const INDEX = (array, rowNum, colNum) => {
    if (!Array.isArray(array)) return "#VALUE!";

    // Excel INDEX can take 0 to return whole row/col, but SheetLab core might need adaptation.
    // For now, enforce valid indices.
    const r = rowNum === 0 ? 0 : rowNum - 1;
    const c = (colNum === undefined || colNum === 0) ? 0 : colNum - 1;

    if (r < 0 || r >= array.length) return "#REF!";
    const row = array[r];
    if (Array.isArray(row)) {
        if (c < 0 || c >= row.length) return "#REF!";
        return row[c];
    }
    return row;
};

// --- ARRAY TRANSFORMATIONS ---

export const HSTACK = (...arrays) => {
    let maxRows = 0;
    const processed = arrays.map(arr => {
        const rows = Array.isArray(arr) ? (Array.isArray(arr[0]) ? arr : [arr]) : [[arr]];
        maxRows = Math.max(maxRows, rows.length);
        return rows;
    });

    const result = [];
    for (let r = 0; r < maxRows; r++) {
        const newRow = [];
        processed.forEach(arr => {
            const row = arr[r];
            if (row) {
                if (Array.isArray(row)) newRow.push(...row);
                else newRow.push(row);
            } else {
                // Rule 3: Pad with #N/A if rows don't match
                const width = Array.isArray(arr[0]) ? arr[0].length : 1;
                for (let i = 0; i < width; i++) newRow.push("#N/A");
            }
        });
        result.push(newRow);
    }
    return result;
};

export const VSTACK = (...arrays) => {
    let maxWidth = 0;
    const processed = arrays.map(arr => {
        const rows = Array.isArray(arr) ? (Array.isArray(arr[0]) ? arr : [arr]) : [[arr]];
        const width = Array.isArray(rows[0]) ? rows[0].length : 1;
        maxWidth = Math.max(maxWidth, width);
        return rows;
    });

    const result = [];
    processed.forEach(arr => {
        arr.forEach(row => {
            const newRow = Array.isArray(row) ? [...row] : [row];
            // Rule 3: Pad with #N/A if widths don't match
            while (newRow.length < maxWidth) newRow.push("#N/A");
            result.push(newRow);
        });
    });
    return result;
};

export const TOCOL = (array, ignore = 0, scanByColumn = false) => {
    if (!Array.isArray(array)) return [array];
    const rows = array.length;
    const cols = Array.isArray(array[0]) ? array[0].length : 1;
    const result = [];

    if (scanByColumn) {
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                const val = Array.isArray(array[r]) ? array[r][c] : array[r];
                if (shouldIgnore(val, ignore)) continue;
                result.push([val]);
            }
        }
    } else {
        array.flat().forEach(val => {
            if (shouldIgnore(val, ignore)) return;
            result.push([val]);
        });
    }
    return result;
};

export const TOROW = (array, ignore = 0, scanByColumn = false) => {
    const col = TOCOL(array, ignore, scanByColumn);
    return [col.flat()];
};

const shouldIgnore = (val, mode) => {
    if (mode === 1 && IS_EMPTY(val)) return true;
    if (mode === 2 && IS_ERROR(val)) return true;
    if (mode === 3 && (IS_EMPTY(val) || IS_ERROR(val))) return true;
    return false;
};

export const TAKE = (array, rows, columns) => {
    if (!Array.isArray(array)) return array;
    let rStart = 0, rEnd = array.length;
    if (rows > 0) rEnd = Math.min(rows, array.length);
    else if (rows < 0) rStart = Math.max(0, array.length + rows);

    let subset = array.slice(rStart, rEnd);

    if (columns !== undefined) {
        subset = subset.map(row => {
            if (!Array.isArray(row)) return row;
            let cStart = 0, cEnd = row.length;
            if (columns > 0) cEnd = Math.min(columns, row.length);
            else if (columns < 0) cStart = Math.max(0, row.length + columns);
            return row.slice(cStart, cEnd);
        });
    }
    return subset;
};

export const DROP = (array, rows, columns) => {
    if (!Array.isArray(array)) return array;
    let rStart = 0, rEnd = array.length;
    if (rows > 0) rStart = Math.min(rows, array.length);
    else if (rows < 0) rEnd = Math.max(0, array.length + rows);

    let subset = array.slice(rStart, rEnd);

    if (columns !== undefined) {
        subset = subset.map(row => {
            if (!Array.isArray(row)) return row;
            let cStart = 0, cEnd = row.length;
            if (columns > 0) cStart = Math.min(columns, row.length);
            else if (columns < 0) cEnd = Math.max(0, row.length + columns);
            return row.slice(cStart, cEnd);
        });
    }
    return subset;
};

export const EXPAND = (array, rows, columns, padWith = "#N/A") => {
    const data = Array.isArray(array) ? (Array.isArray(array[0]) ? array : [array]) : [[array]];
    const targetRows = Math.max(rows, data.length);
    const targetCols = Math.max(columns || 0, Array.isArray(data[0]) ? data[0].length : 1);

    const result = [];
    for (let r = 0; r < targetRows; r++) {
        const newRow = [];
        for (let c = 0; c < targetCols; c++) {
            if (data[r] && data[r][c] !== undefined) {
                newRow.push(data[r][c]);
            } else {
                newRow.push(padWith);
            }
        }
        result.push(newRow);
    }
    return result;
};

export const FILTER = (array, include, ifEmpty = "#CALC!") => {
    if (!Array.isArray(array) || !Array.isArray(include)) return "#VALUE!";
    const flatInclude = include.flat();
    if (flatInclude.length !== array.length) return "#VALUE!";

    const result = array.filter((_, i) => flatInclude[i] === true || flatInclude[i] === "TRUE");
    return result.length === 0 ? ifEmpty : result;
};

export const SORTBY = (array, ...args) => {
    if (!Array.isArray(array)) return array;
    const sortParams = [];
    for (let i = 0; i < args.length; i += 2) {
        sortParams.push({
            by: Array.isArray(args[i]) ? args[i].flat() : [args[i]],
            order: args[i+1] === -1 ? -1 : 1
        });
    }

    if (sortParams.some(p => p.by.length !== array.length)) return "#VALUE!";

    const indexed = array.map((val, i) => ({ val, i }));

    indexed.sort((a, b) => {
        for (const p of sortParams) {
            const valA = p.by[a.i];
            const valB = p.by[b.i];
            if (valA === valB) continue;
            if (p.order === 1) return valA > valB ? 1 : -1;
            else return valA < valB ? 1 : -1;
        }
        return 0;
    });

    return indexed.map(item => item.val);
};
