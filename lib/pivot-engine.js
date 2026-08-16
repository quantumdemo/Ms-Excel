import { ReferenceResolver } from './excel-core.js';

/**
 * Deterministic PivotTable Engine for LearnExcelAI
 *
 * Architecture:
 * USER REQUEST -> AI INTENT CONFIG -> VALIDATION AGAINST HEADERS -> DETERMINISTIC PIVOT ENGINE -> NEW WORKSHEET
 */

/**
 * Supported Aggregation Functions
 */
export const AGGREGATIONS = {
  SUM: 'SUM',
  AVERAGE: 'AVERAGE',
  COUNT: 'COUNT',
  COUNTA: 'COUNTA',
  COUNTUNIQUE: 'COUNTUNIQUE',
  MIN: 'MIN',
  MAX: 'MAX',
  MEDIAN: 'MEDIAN',
  STDEV: 'STDEV',
  'STDEV.S': 'STDEV.S',
  'STDEV.P': 'STDEV.P',
  VAR: 'VAR',
  'VAR.S': 'VAR.S',
  'VAR.P': 'VAR.P'
};

/**
 * Evaluates mathematical aggregation over raw array of values.
 * Ignores non-numeric values for numeric aggregations (SUM, AVERAGE, MIN, MAX, MEDIAN, STDEV, VAR).
 */
export function evaluateAggregation(values = [], aggType = 'SUM') {
  const normAgg = (aggType || 'SUM').toUpperCase();

  // Helper for numeric extraction
  const numVals = values
    .map(v => typeof v === 'number' ? v : (v !== null && v !== '' && !isNaN(Number(v)) ? Number(v) : null))
    .filter(v => v !== null && !isNaN(v));

  const nonBlankVals = values.filter(v => v !== null && v !== undefined && String(v).trim() !== '');

  switch (normAgg) {
    case 'SUM': {
      if (numVals.length === 0) return 0;
      return numVals.reduce((acc, curr) => acc + curr, 0);
    }
    case 'AVERAGE': {
      if (numVals.length === 0) return 0;
      const sum = numVals.reduce((acc, curr) => acc + curr, 0);
      return sum / numVals.length;
    }
    case 'COUNT': {
      return numVals.length;
    }
    case 'COUNTA': {
      return nonBlankVals.length;
    }
    case 'COUNTUNIQUE': {
      const uniqueSet = new Set(nonBlankVals.map(v => String(v).trim().toLowerCase()));
      return uniqueSet.size;
    }
    case 'MIN': {
      if (numVals.length === 0) return 0;
      return Math.min(...numVals);
    }
    case 'MAX': {
      if (numVals.length === 0) return 0;
      return Math.max(...numVals);
    }
    case 'MEDIAN': {
      if (numVals.length === 0) return 0;
      const sorted = [...numVals].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
      }
      return sorted[mid];
    }
    case 'STDEV':
    case 'STDEV.S': {
      if (numVals.length <= 1) return 0;
      const mean = numVals.reduce((a, b) => a + b, 0) / numVals.length;
      const variance = numVals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (numVals.length - 1);
      return Math.sqrt(variance);
    }
    case 'STDEV.P': {
      if (numVals.length === 0) return 0;
      const mean = numVals.reduce((a, b) => a + b, 0) / numVals.length;
      const variance = numVals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numVals.length;
      return Math.sqrt(variance);
    }
    case 'VAR':
    case 'VAR.S': {
      if (numVals.length <= 1) return 0;
      const mean = numVals.reduce((a, b) => a + b, 0) / numVals.length;
      return numVals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (numVals.length - 1);
    }
    case 'VAR.P': {
      if (numVals.length === 0) return 0;
      const mean = numVals.reduce((a, b) => a + b, 0) / numVals.length;
      return numVals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numVals.length;
    }
    default: {
      if (numVals.length === 0) return 0;
      return numVals.reduce((acc, curr) => acc + curr, 0);
    }
  }
}

/**
 * Detects metadata (type, non-empty %, unique counts, formatting) for each column in source data.
 */
export function detectFieldMetadata(headers = [], records = []) {
  const metadata = {};

  headers.forEach((hdr) => {
    const textName = typeof hdr === 'string' ? hdr : (hdr.text || hdr.name);
    const colIndex = typeof hdr === 'object' && hdr.colIndex !== undefined ? hdr.colIndex : null;

    let numCount = 0;
    let textCount = 0;
    let dateCount = 0;
    let emptyCount = 0;
    const uniqueValues = new Set();
    const sampleFormats = [];

    records.forEach((rec) => {
      const val = rec[textName] !== undefined ? rec[textName] : (colIndex !== null ? rec[colIndex] : null);
      if (val === null || val === undefined || String(val).trim() === '') {
        emptyCount++;
        return;
      }

      const strVal = String(val).trim();
      uniqueValues.add(strVal);

      // Check date format / parsing
      const isDate = !isNaN(Date.parse(strVal)) && (strVal.includes('-') || strVal.includes('/') || strVal.includes(':'));
      if (isDate) {
        dateCount++;
      } else if (!isNaN(Number(strVal))) {
        numCount++;
      } else {
        textCount++;
      }
    });

    const totalPopulated = records.length - emptyCount;
    let inferredType = 'text';
    if (numCount > textCount && numCount > dateCount) {
      inferredType = 'numeric';
    } else if (dateCount > textCount && dateCount > numCount) {
      inferredType = 'date';
    }

    const lowerName = textName.toLowerCase();
    const isIdField = lowerName.includes('id') || lowerName.includes('code') || lowerName.includes('number') || lowerName.includes('num');

    // Smart default aggregation
    let defaultAggregation = 'SUM';
    if (inferredType === 'text' || isIdField) {
      defaultAggregation = isIdField ? 'COUNT' : 'COUNTA';
    } else if (inferredType === 'numeric') {
      if (lowerName.includes('avg') || lowerName.includes('average')) {
        defaultAggregation = 'AVERAGE';
      } else if (lowerName.includes('max') || lowerName.includes('highest')) {
        defaultAggregation = 'MAX';
      } else if (lowerName.includes('min') || lowerName.includes('lowest')) {
        defaultAggregation = 'MIN';
      } else {
        defaultAggregation = 'SUM';
      }
    }

    metadata[textName] = {
      header: textName,
      inferredType,
      colIndex,
      isIdField,
      totalCount: records.length,
      populatedCount: totalPopulated,
      uniqueCount: uniqueValues.size,
      distinctValues: Array.from(uniqueValues),
      defaultAggregation
    };
  });

  return metadata;
}

/**
 * Robustly resolves a requested field name against actual dataset headers using:
 * 1. Exact match
 * 2. Case-insensitive exact match
 * 3. Normalized match (without special chars/spaces)
 * 4. Alias / Semantic match
 * 5. Fuzzy match
 */
export function resolveField(requestedName, actualHeaders = []) {
  if (!requestedName || actualHeaders.length === 0) return null;

  const rawReq = String(requestedName).trim();
  const reqLower = rawReq.toLowerCase();
  const reqNorm = reqLower.replace(/[^a-z0-9]/g, '');

  // Handle date grouping wrapper functions e.g. Month(Order Date)
  let dateGroupFunc = null;
  const dateMatch = rawReq.match(/^(year|quarter|month|day)\s*\((.+)\)$/i);
  let innerField = rawReq;
  if (dateMatch) {
    dateGroupFunc = dateMatch[1].toUpperCase();
    innerField = dateMatch[2].trim();
  }

  const headerStrings = actualHeaders.map(h => typeof h === 'string' ? h : h.text);

  // 1. Exact match
  if (headerStrings.includes(innerField)) {
    return { resolvedHeader: innerField, dateGroupFunc };
  }

  // 2. Case-insensitive exact match
  const ciMatch = headerStrings.find(h => h.toLowerCase() === innerField.toLowerCase());
  if (ciMatch) {
    return { resolvedHeader: ciMatch, dateGroupFunc };
  }

  // 3. Normalized match
  const normMatch = headerStrings.find(h => h.toLowerCase().replace(/[^a-z0-9]/g, '') === innerField.toLowerCase().replace(/[^a-z0-9]/g, ''));
  if (normMatch) {
    return { resolvedHeader: normMatch, dateGroupFunc };
  }

  // 4. Semantic / Alias matching
  const aliases = {
    region: ['sales region', 'location', 'area', 'zone', 'city', 'country', 'state'],
    product: ['item', 'product name', 'item name', 'goods', 'article', 'description'],
    quantity: ['units sold', 'qty', 'units', 'volume', 'count', 'amount sold'],
    sales: ['revenue', 'total sales', 'total revenue', 'total price', 'price', 'amount', 'turnover'],
    profit: ['net profit', 'margin', 'earnings', 'gain'],
    date: ['order date', 'sale date', 'transaction date', 'timestamp'],
    customer: ['client', 'customer name', 'buyer', 'account']
  };

  const reqKey = Object.keys(aliases).find(k => reqLower.includes(k) || k.includes(reqLower));
  if (reqKey && aliases[reqKey]) {
    const aliasMatch = headerStrings.find(h => {
      const hLower = h.toLowerCase();
      return aliases[reqKey].some(al => hLower.includes(al));
    });
    if (aliasMatch) {
      return { resolvedHeader: aliasMatch, dateGroupFunc };
    }
  }

  // 5. Substring / Fuzzy match
  const subMatch = headerStrings.find(h => h.toLowerCase().includes(reqLower) || reqLower.includes(h.toLowerCase()));
  if (subMatch) {
    return { resolvedHeader: subMatch, dateGroupFunc };
  }

  return null;
}

/**
 * Extracts date dimension grouping e.g. Year, Quarter, Month, Day from date value
 */
export function extractDateGrouping(dateVal, groupingType) {
  if (!dateVal) return 'Unknown Date';
  const parsed = new Date(dateVal);
  if (isNaN(parsed.getTime())) return String(dateVal);

  switch (groupingType) {
    case 'YEAR':
      return String(parsed.getFullYear());
    case 'QUARTER': {
      const q = Math.floor(parsed.getMonth() / 3) + 1;
      return `Q${q} ${parsed.getFullYear()}`;
    }
    case 'MONTH': {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parsed.getMonth()]} ${parsed.getFullYear()}`;
    }
    case 'DAY': {
      return parsed.toISOString().split('T')[0];
    }
    default:
      return String(dateVal);
  }
}

/**
 * Deterministic Pivot Table Computation Engine.
 *
 * @param {Object} params
 * @param {Array<Object>} params.records - Array of row objects from source dataset
 * @param {Array<string>} params.headers - Source dataset column headers
 * @param {Array<string|Object>} params.rows - Row grouping fields e.g. ["Region"]
 * @param {Array<string|Object>} params.columns - Column grouping fields e.g. ["Product"]
 * @param {Array<{ field: string, aggregation: string }>} params.values - Measure fields e.g. [{ field: "Sales", aggregation: "SUM" }]
 * @param {Array<{ field: string, operator: string, value: any }>} params.filters - Filter rules e.g. [{ field: "Product", operator: "=", value: "Laptop" }]
 */
export function computePivotTable({
  records = [],
  headers = [],
  rows = [],
  columns = [],
  values = [],
  filters = []
}) {
  const metadata = detectFieldMetadata(headers, records);

  // 1. Resolve and Validate Fields
  const resolvedRows = (rows || []).map(r => {
    const rawName = typeof r === 'string' ? r : r.field;
    const res = resolveField(rawName, headers);
    return res ? { field: res.resolvedHeader, dateGroupFunc: res.dateGroupFunc || r.dateGroupFunc } : null;
  }).filter(Boolean);

  const resolvedColumns = (columns || []).map(c => {
    const rawName = typeof c === 'string' ? c : c.field;
    const res = resolveField(rawName, headers);
    return res ? { field: res.resolvedHeader, dateGroupFunc: res.dateGroupFunc || c.dateGroupFunc } : null;
  }).filter(Boolean);

  let resolvedValues = (values || []).map(v => {
    const rawName = typeof v === 'string' ? v : v.field;
    const res = resolveField(rawName, headers);
    if (!res) return null;
    const fieldMeta = metadata[res.resolvedHeader];
    const agg = (v.aggregation || fieldMeta?.defaultAggregation || 'SUM').toUpperCase();
    return {
      field: res.resolvedHeader,
      aggregation: agg,
      label: `${agg.charAt(0) + agg.slice(1).toLowerCase()} of ${res.resolvedHeader}`
    };
  }).filter(Boolean);

  // Fallback: If no value field resolved, pick first numeric or non-row field
  if (resolvedValues.length === 0 && headers.length > 0) {
    const rowFieldNames = resolvedRows.map(r => r.field);
    const candidateMeasure = headers.find(h => !rowFieldNames.includes(h) && metadata[h]?.inferredType === 'numeric') ||
                             headers.find(h => !rowFieldNames.includes(h)) ||
                             headers[0];
    const agg = metadata[candidateMeasure]?.defaultAggregation || 'SUM';
    resolvedValues.push({
      field: candidateMeasure,
      aggregation: agg,
      label: `${agg.charAt(0) + agg.slice(1).toLowerCase()} of ${candidateMeasure}`
    });
  }

  // 2. Filter Records
  const filteredRecords = records.filter(rec => {
    if (!filters || filters.length === 0) return true;
    return filters.every(f => {
      const res = resolveField(f.field, headers);
      if (!res) return true;
      const recVal = rec[res.resolvedHeader];
      const targetVal = f.value;
      const op = f.operator || '=';

      if (op === '=' || op === '==') {
        return String(recVal).trim().toLowerCase() === String(targetVal).trim().toLowerCase();
      } else if (op === '!=') {
        return String(recVal).trim().toLowerCase() !== String(targetVal).trim().toLowerCase();
      } else if (op === '>') {
        return Number(recVal) > Number(targetVal);
      } else if (op === '<') {
        return Number(recVal) < Number(targetVal);
      } else if (op === '>=') {
        return Number(recVal) >= Number(targetVal);
      } else if (op === '<=') {
        return Number(recVal) <= Number(targetVal);
      }
      return true;
    });
  });

  // Helper to extract formatted cell key for row/col dimensions
  const getDimensionValue = (rec, dimObj) => {
    const raw = rec[dimObj.field];
    if (dimObj.dateGroupFunc) {
      return extractDateGrouping(raw, dimObj.dateGroupFunc);
    }
    if (raw === null || raw === undefined || String(raw).trim() === '') {
      return '(blank)';
    }
    return String(raw).trim();
  };

  // 3. Extract Distinct Column Dimensions for Cross-Tabulation
  const columnKeyTuples = [];
  const columnKeyMap = new Map();

  if (resolvedColumns.length > 0) {
    filteredRecords.forEach(rec => {
      const tuple = resolvedColumns.map(c => getDimensionValue(rec, c));
      const tupleKey = tuple.join(' | ');
      if (!columnKeyMap.has(tupleKey)) {
        columnKeyMap.set(tupleKey, tuple);
        columnKeyTuples.push(tuple);
      }
    });
    columnKeyTuples.sort((a, b) => a.join(' | ').localeCompare(b.join(' | ')));
  }

  // 4. Hierarchical Row Grouping & Aggregation
  // We group records by nested row key tuples
  const rowGroupsMap = new Map(); // tupleKey -> Array of records

  filteredRecords.forEach(rec => {
    const rowTuple = resolvedRows.length > 0
      ? resolvedRows.map(r => getDimensionValue(rec, r))
      : ['Total'];
    const rowTupleKey = rowTuple.join(' | ');

    if (!rowGroupsMap.has(rowTupleKey)) {
      rowGroupsMap.set(rowTupleKey, {
        tuple: rowTuple,
        records: []
      });
    }
    rowGroupsMap.get(rowTupleKey).records.push(rec);
  });

  const sortedRowGroups = Array.from(rowGroupsMap.values()).sort((a, b) => a.tuple.join(' | ').localeCompare(b.tuple.join(' | ')));

  // 5. Construct Structured Output Result
  const rowDimensionHeaders = resolvedRows.map(r => r.dateGroupFunc ? `${r.dateGroupFunc}(${r.field})` : r.field);
  const colDimensionHeaders = resolvedColumns.map(c => c.dateGroupFunc ? `${c.dateGroupFunc}(${c.field})` : c.field);

  // Grand Total calculation directly from underlying filtered records
  const grandTotalValues = {};
  if (resolvedColumns.length > 0) {
    columnKeyTuples.forEach(colTuple => {
      const colTupleKey = colTuple.join(' | ');
      const colMatchingRecs = filteredRecords.filter(rec =>
        resolvedColumns.every((c, idx) => getDimensionValue(rec, c) === colTuple[idx])
      );
      resolvedValues.forEach(valObj => {
        const rawVals = colMatchingRecs.map(rec => rec[valObj.field]);
        grandTotalValues[`${colTupleKey}__${valObj.field}__${valObj.aggregation}`] = evaluateAggregation(rawVals, valObj.aggregation);
      });
    });
  }
  // Overall Grand Total
  resolvedValues.forEach(valObj => {
    const rawVals = filteredRecords.map(rec => rec[valObj.field]);
    grandTotalValues[`OVERALL__${valObj.field}__${valObj.aggregation}`] = evaluateAggregation(rawVals, valObj.aggregation);
  });

  // Process rows & subtotals for multi-row hierarchy
  const processedRows = [];

  sortedRowGroups.forEach(group => {
    const cellValues = {};

    if (resolvedColumns.length > 0) {
      columnKeyTuples.forEach(colTuple => {
        const colTupleKey = colTuple.join(' | ');
        const colMatchingRecs = group.records.filter(rec =>
          resolvedColumns.every((c, idx) => getDimensionValue(rec, c) === colTuple[idx])
        );
        resolvedValues.forEach(valObj => {
          const rawVals = colMatchingRecs.map(rec => rec[valObj.field]);
          cellValues[`${colTupleKey}__${valObj.field}__${valObj.aggregation}`] = evaluateAggregation(rawVals, valObj.aggregation);
        });
      });
    }

    // Row-level totals across column dimension
    resolvedValues.forEach(valObj => {
      const rawVals = group.records.map(rec => rec[valObj.field]);
      cellValues[`ROW_TOTAL__${valObj.field}__${valObj.aggregation}`] = evaluateAggregation(rawVals, valObj.aggregation);
    });

    processedRows.push({
      tuple: group.tuple,
      isSubtotal: false,
      recordCount: group.records.length,
      values: cellValues
    });
  });

  return {
    rows: resolvedRows,
    columns: resolvedColumns,
    values: resolvedValues,
    filters,
    columnTuples: columnKeyTuples,
    dataRows: processedRows,
    grandTotalValues,
    metadata,
    totalRecordsEvaluated: filteredRecords.length
  };
}

/**
 * Generates an Excel-like 2D table grid representation of a computed PivotTable.
 * Ready to be loaded directly into a SheetLab CellRegistry or exported.
 */
export function generatePivotSheetGrid(pivotResult, title = "PivotTable Summary") {
  if (!pivotResult) return [];

  const { rows, columns, values, columnTuples, dataRows, grandTotalValues, metadata } = pivotResult;
  const grid = [];

  // Title Row
  grid.push([title]);
  grid.push([]); // Blank row

  // Filter Summary Header if filters exist
  if (pivotResult.filters && pivotResult.filters.length > 0) {
    pivotResult.filters.forEach(f => {
      grid.push([`Filter: ${f.field}`, `${f.operator || '='} ${f.value}`]);
    });
    grid.push([]);
  }

  // Header Row Construction
  const rowHeaderLabels = rows.length > 0 ? rows.map(r => r.dateGroupFunc ? `${r.dateGroupFunc}(${r.field})` : r.field) : ["Row Labels"];
  const headerRow = [...rowHeaderLabels];

  if (columns.length > 0) {
    columnTuples.forEach(colTuple => {
      const colLabel = colTuple.join(' - ');
      values.forEach(valObj => {
        headerRow.push(`${colLabel} (${valObj.label})`);
      });
    });
    values.forEach(valObj => {
      headerRow.push(`Total ${valObj.label}`);
    });
  } else {
    values.forEach(valObj => {
      headerRow.push(valObj.label);
    });
  }

  grid.push(headerRow);

  // Data Rows Insertion
  dataRows.forEach(dRow => {
    const rowLine = [...dRow.tuple];

    if (columns.length > 0) {
      columnTuples.forEach(colTuple => {
        const colTupleKey = colTuple.join(' | ');
        values.forEach(valObj => {
          const valKey = `${colTupleKey}__${valObj.field}__${valObj.aggregation}`;
          rowLine.push(dRow.values[valKey] ?? 0);
        });
      });
      values.forEach(valObj => {
        const valKey = `ROW_TOTAL__${valObj.field}__${valObj.aggregation}`;
        rowLine.push(dRow.values[valKey] ?? 0);
      });
    } else {
      values.forEach(valObj => {
        const valKey = `ROW_TOTAL__${valObj.field}__${valObj.aggregation}`;
        rowLine.push(dRow.values[valKey] ?? 0);
      });
    }

    grid.push(rowLine);
  });

  // Grand Total Row
  const grandTotalRow = ["Grand Total"];
  // Pad empty spaces for multi-row dimensions
  for (let i = 1; i < rowHeaderLabels.length; i++) {
    grandTotalRow.push("");
  }

  if (columns.length > 0) {
    columnTuples.forEach(colTuple => {
      const colTupleKey = colTuple.join(' | ');
      values.forEach(valObj => {
        const key = `${colTupleKey}__${valObj.field}__${valObj.aggregation}`;
        grandTotalRow.push(grandTotalValues[key] ?? 0);
      });
    });
    values.forEach(valObj => {
      const key = `OVERALL__${valObj.field}__${valObj.aggregation}`;
      grandTotalRow.push(grandTotalValues[key] ?? 0);
    });
  } else {
    values.forEach(valObj => {
      const key = `OVERALL__${valObj.field}__${valObj.aggregation}`;
      grandTotalRow.push(grandTotalValues[key] ?? 0);
    });
  }

  grid.push(grandTotalRow);

  return grid;
}
