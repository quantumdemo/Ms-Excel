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
    const flatArray = (lookupArray.length > 0 && Array.isArray(lookupArray[0])) ? lookupArray.map(r => Array.isArray(r) ? r[0] : r) : lookupArray;

    const normalizedLookupValue = (lookupValue !== null && lookupValue !== undefined && typeof lookupValue === 'string') ? lookupValue.toUpperCase() : lookupValue;

    // Rule 5: Enforcement of sorting for approximate matches
    if (matchMode === 1 && !isSorted(flatArray, 1)) return "#N/A"; // Excel returns N/A or wrong result, we enforce error for safety if requested
    if (matchMode === -1 && !isSorted(flatArray, -1)) return "#N/A";

    let resultIndex = -1;

    // Search Modes: 1 (first-to-last), -1 (last-to-first)
    const range = searchMode === -1 ? [...Array(flatArray.length).keys()].reverse() : [...Array(flatArray.length).keys()];

    for (const i of range) {
        const val = flatArray[i];
        const normalizedVal = (val !== null && val !== undefined && typeof val === 'string') ? val.toUpperCase() : val;

        if (matchMode === 0) { // Exact Match
            if (normalizedVal == normalizedLookupValue) {
                resultIndex = i;
                if (searchMode !== -1) break; // Found first
            }
        } else if (matchMode === 1) { // Less than or equal (next smaller)
            if (normalizedVal <= normalizedLookupValue) {
                if (resultIndex === -1 || normalizedVal > ((typeof flatArray[resultIndex] === 'string') ? flatArray[resultIndex].toUpperCase() : flatArray[resultIndex])) {
                    resultIndex = i;
                }
            }
        } else if (matchMode === -1) { // Greater than or equal (next larger)
            if (normalizedVal >= normalizedLookupValue) {
                if (resultIndex === -1 || normalizedVal < ((typeof flatArray[resultIndex] === 'string') ? flatArray[resultIndex].toUpperCase() : flatArray[resultIndex])) {
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

    // Check colIndex before lookup
    const maxCols = tableArray.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 1), 0);
    if (colIndex < 1 || colIndex > maxCols) return "#REF!";

    const matchMode = rangeLookup ? 1 : 0;
    const lookupVector = tableArray.map(row => Array.isArray(row) ? row[0] : row);
    const idx = lookupMatch(lookupValue, lookupVector, matchMode);

    if (IS_ERROR(idx)) return idx;
    const row = tableArray[idx];
    if (!row || colIndex > (Array.isArray(row) ? row.length : 1)) return "#REF!";
    return Array.isArray(row) ? row[colIndex - 1] : row;
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
    if (idx === "#N/A") return ifNotFound === undefined ? "#N/A" : ifNotFound;
    if (IS_ERROR(idx)) return idx;

    if (!Array.isArray(returnArray)) {
        return (idx === 0) ? returnArray : "#REF!";
    }

    // If returnArray is 2D, return the corresponding row/element
    if (Array.isArray(returnArray[0])) {
        if (idx < 0 || idx >= returnArray.length) return "#REF!";
        const res = returnArray[idx];
        if (Array.isArray(res) && res.length === 1) return res[0];
        return [res]; // Return as 2D row for spilling
    }

    if (idx < 0 || idx >= returnArray.length) return "#REF!";
    return returnArray[idx];
};

export const INDEX = (array, rowNum, colNum) => {
    if (!Array.isArray(array)) return "#VALUE!";

    const rows = array.length;
    const cols = Array.isArray(array[0]) ? array[0].length : 1;

    // Excel behavior: if rowNum is omitted (but indexed), it's 0.
    // If it's a 1D vector, rowNum can be the index and colNum omitted.
    let r = rowNum;
    let c = colNum;

    // Handle 1D vector where rowNum acts as the only index
    if (rows === 1 || cols === 1) {
        const index = (r !== 0) ? r : c;
        if (index === 0) return array;
        if (rows === 1) {
            if (index < 1 || index > cols) return "#REF!";
            return Array.isArray(array[0]) ? array[0][index - 1] : array[index - 1];
        } else {
            if (index < 1 || index > rows) return "#REF!";
            const res = array[index - 1];
            return Array.isArray(res) ? res[0] : res;
        }
    }

    // Handle 0 indices (returns whole row/column) for 2D
    if (r === 0 && c === 0) return array;
    if (r === 0) {
        if (c < 1 || c > cols) return "#REF!";
        return array.map(row => Array.isArray(row) ? [row[c - 1]] : [row]);
    }
    if (c === 0) {
        if (r < 1 || r > rows) return "#REF!";
        const row = array[r - 1];
        return Array.isArray(row) ? [row] : [[row]];
    }

    const rIdx = r - 1;
    const cIdx = c - 1;

    if (rIdx < 0 || rIdx >= rows) return "#REF!";
    const row = array[rIdx];
    if (Array.isArray(row)) {
        if (cIdx < 0 || cIdx >= row.length) return "#REF!";
        return row[cIdx];
    }
    return (cIdx === 0) ? row : "#REF!";
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

export const CHOOSECOLS = (array, ...indices) => {
    if (!Array.isArray(array)) return array;
    const data = Array.isArray(array[0]) ? array : [array];
    const numCols = data[0].length;

    const result = data.map(row => {
        return indices.map(idx => {
            let i = Math.floor(idx);
            if (i === 0) return "#VALUE!";
            if (i < 0) i = numCols + i + 1;
            if (i < 1 || i > numCols) return "#VALUE!";
            return row[i - 1];
        });
    });

    if (result.some(row => row.some(cell => cell === "#VALUE!"))) return "#VALUE!";
    return result;
};

export const CHOOSEROWS = (array, ...indices) => {
    if (!Array.isArray(array)) return array;
    const data = Array.isArray(array[0]) ? array : [array];
    const numRows = data.length;

    try {
        const result = indices.map(idx => {
            let i = Math.floor(idx);
            if (i === 0) throw new Error("#VALUE!");
            if (i < 0) i = numRows + i + 1;
            if (i < 1 || i > numRows) throw new Error("#VALUE!");
            return data[i - 1];
        });
        return result;
    } catch (e) {
        return "#VALUE!";
    }
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

export const SORT = (array, sortIndex = 1, sortOrder = 1, byCol = false) => {
    if (!Array.isArray(array)) return array;
    const data = Array.isArray(array[0]) ? array : [array];

    if (byCol) {
        const transposed = TRANSPOSE(data);
        const sorted = SORT(transposed, sortIndex, sortOrder, false);
        return TRANSPOSE(sorted);
    }

    const idx = Math.floor(sortIndex);
    const order = sortOrder === -1 ? -1 : 1;
    const numCols = data[0].length;

    if (idx < 1 || idx > numCols) return "#VALUE!";

    const sortVec = data.map(row => row[idx - 1]);
    return SORTBY(data, sortVec, order);
};

export const TRANSPOSE = (array) => {
    if (!Array.isArray(array)) return [[array]];
    const data = Array.isArray(array[0]) ? array : [array];
    const rows = data.length;
    const cols = data[0].length;
    const result = Array(cols).fill(0).map(() => Array(rows).fill(null));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            result[c][r] = data[r][c];
        }
    }
    return result;
};

export const SEQUENCE = (rows = 1, columns = 1, start = 1, step = 1) => {
    const r = Math.max(0, Math.floor(rows));
    const c = Math.max(0, Math.floor(columns));
    if (r === 0 || c === 0) return "#CALC!";

    const result = [];
    let current = start;
    for (let i = 0; i < r; i++) {
        const row = [];
        for (let j = 0; j < c; j++) {
            row.push(current);
            current += step;
        }
        result.push(row);
    }
    return result;
};
