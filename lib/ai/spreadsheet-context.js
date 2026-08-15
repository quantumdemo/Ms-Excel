import { ReferenceResolver } from '../excel-core.js';

/**
 * Builds a compact, intelligent spreadsheet context object for the AI Data Coach.
 *
 * @param {import('../excel-core').CellRegistry} registry - The active CellRegistry instance.
 * @param {{ r: number, c: number }} [selectedCoords={ r: 0, c: 0 }] - Currently selected cell.
 * @returns {Object} Structured spreadsheet context.
 */
export function buildSpreadsheetContext(registry, selectedCoords = { r: 0, c: 0 }) {
  if (!registry) {
    return {
      dimensions: { rows: 0, cols: 0 },
      sheetName: "Sheet1",
      dataBounds: { lastRowNumber: 1, maxPopulatedCol: 0, totalPopulatedRows: 0 },
      selectedCell: null,
      headers: [],
      sampleData: [],
      nearbyCells: [],
      formulaCells: [],
      errors: [],
      columnTypes: {},
      nonEmptyCellCount: 0
    };
  }

  const { rows, cols } = registry;
  const selectedCellId = ReferenceResolver.coordToId(selectedCoords.r, selectedCoords.c);
  const selectedCellData = registry.getCell(selectedCellId);

  const selectedCell = {
    id: selectedCellId,
    r: selectedCoords.r,
    c: selectedCoords.c,
    raw: selectedCellData?.raw || "",
    computed: selectedCellData?.computed ?? null,
    type: selectedCellData?.type || "empty",
    hasError: typeof selectedCellData?.computed === 'string' && selectedCellData.computed.startsWith("#")
  };

  // Find exact last populated row and column across the full registry map
  let maxPopulatedRow = 0;
  let maxPopulatedCol = 0;

  registry.cells.forEach((cell, id) => {
    if (cell.raw !== "" || cell.computed !== null) {
      const coord = ReferenceResolver.idToCoord(id);
      if (coord) {
        if (coord.r > maxPopulatedRow) maxPopulatedRow = coord.r;
        if (coord.c > maxPopulatedCol) maxPopulatedCol = coord.c;
      }
    }
  });

  const lastRowNumber = Math.max(maxPopulatedRow + 1, 10);
  const maxInspectCols = Math.min(cols, Math.max(maxPopulatedCol + 1, 10));

  // Extract nearby 3x3 cells neighborhood
  const nearbyCells = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const nr = selectedCoords.r + dr;
      const nc = selectedCoords.c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const id = ReferenceResolver.coordToId(nr, nc);
        const cell = registry.getCell(id);
        if (cell.raw || cell.computed) {
          nearbyCells.push({
            id,
            r: nr,
            c: nc,
            raw: cell.raw || "",
            computed: cell.computed
          });
        }
      }
    }
  }

  // Header row detection
  let headerRowIndex = 0;
  for (let r = 0; r < Math.min(rows, 5); r++) {
    let textCount = 0;
    for (let c = 0; c < maxInspectCols; c++) {
      const id = ReferenceResolver.coordToId(r, c);
      const cell = registry.getCell(id);
      if (cell.raw && cell.type !== 'number' && !cell.raw.startsWith('=')) {
        textCount++;
      }
    }
    if (textCount >= 2) {
      headerRowIndex = r;
      break;
    }
  }

  const startDataRowNumber = headerRowIndex + 2; // e.g. Header at Row 1 (idx 0) -> Data starts at Row 2

  // Non-empty, formula, error, and column statistical profiling
  const nonEmptyCells = [];
  const formulaCells = [];
  const errors = [];
  const columnTypeCounts = {}; // colIndex -> { number, text, formula }
  const columnUniqueValues = {}; // colIndex -> Set of unique cell strings

  const maxInspectRows = Math.min(rows, Math.max(lastRowNumber, 50));

  for (let r = 0; r < maxInspectRows; r++) {
    for (let c = 0; c < maxInspectCols; c++) {
      const id = ReferenceResolver.coordToId(r, c);
      const cell = registry.getCell(id);

      if (!cell.raw && cell.computed === null) continue;

      nonEmptyCells.push({ id, r, c, raw: cell.raw, computed: cell.computed, type: cell.type });

      if (!columnTypeCounts[c]) {
        columnTypeCounts[c] = { number: 0, text: 0, formula: 0 };
        columnUniqueValues[c] = new Set();
      }

      if (r >= headerRowIndex + 1) {
        if (cell.computed !== null && cell.computed !== "") {
          columnUniqueValues[c].add(String(cell.computed));
        }
      }

      if (cell.type === 'number' || (!isNaN(Number(cell.computed)) && cell.computed !== "" && cell.computed !== null)) {
        columnTypeCounts[c].number++;
      } else if (cell.type === 'formula') {
        columnTypeCounts[c].formula++;
      } else {
        columnTypeCounts[c].text++;
      }

      if (cell.type === 'formula' && formulaCells.length < 20) {
        formulaCells.push({
          id,
          formula: cell.raw,
          computed: cell.computed,
          hasError: typeof cell.computed === 'string' && cell.computed.startsWith("#")
        });
      }

      if (typeof cell.computed === 'string' && cell.computed.startsWith("#") && errors.length < 10) {
        errors.push({
          id,
          formula: cell.raw,
          error: cell.computed
        });
      }
    }
  }

  const headers = [];
  const columnTypes = {};

  for (let c = 0; c < maxInspectCols; c++) {
    const id = ReferenceResolver.coordToId(headerRowIndex, c);
    const cell = registry.getCell(id);
    if (cell.raw) {
      const colLabel = ReferenceResolver.coordToId(0, c).replace(/[0-9]/g, '');
      const headerText = String(cell.computed ?? cell.raw);
      const counts = columnTypeCounts[c] || { number: 0, text: 0, formula: 0 };
      const uniqueCount = columnUniqueValues[c]?.size || 0;

      const isNumeric = counts.number > counts.text;
      const inferredType = isNumeric ? "numeric" : "text";

      columnTypes[headerText] = inferredType;

      headers.push({
        colIndex: c,
        colLabel,
        text: headerText,
        inferredType,
        uniqueCount,
        dataRange: `${colLabel}${startDataRowNumber}:${colLabel}${lastRowNumber}`,
        fullColumnRange: `${colLabel}:${colLabel}`,
        startRow: startDataRowNumber,
        endRow: lastRowNumber
      });
    }
  }

  // Extract 2D sample data matrix across ALL active columns
  const sampleData = [];
  for (let r = 0; r < Math.min(lastRowNumber, 20); r++) {
    const rowObj = {};
    let rowHasData = false;
    for (let c = 0; c < maxInspectCols; c++) {
      const id = ReferenceResolver.coordToId(r, c);
      const cell = registry.getCell(id);
      if (cell.raw !== "") {
        rowHasData = true;
      }
      rowObj[id] = cell.computed ?? cell.raw ?? "";
    }
    if (rowHasData) {
      sampleData.push(rowObj);
    }
  }

  return {
    dimensions: { rows, cols },
    sheetName: registry.sheetName || "Sheet1",
    dataBounds: {
      lastRowNumber,
      startDataRowNumber,
      maxPopulatedCol,
      totalPopulatedRows: nonEmptyCells.length
    },
    selectedCell,
    headers,
    sampleData,
    nearbyCells,
    formulaCells,
    errors,
    columnTypes,
    nonEmptyCellCount: nonEmptyCells.length
  };
}
