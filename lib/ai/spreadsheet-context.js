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

  // Find non-empty cells, headers, formula cells, and errors
  const nonEmptyCells = [];
  const formulaCells = [];
  const errors = [];
  const columnTypeCounts = {}; // colIndex -> { number, text, formula }

  // Inspect grid (up to max 50 rows x 26 cols for context efficiency)
  const maxInspectRows = Math.min(rows, 50);
  const maxInspectCols = Math.min(cols, 26);

  let headerRowIndex = 0;
  // Look for header row (first row with multiple text entries)
  for (let r = 0; r < Math.min(maxInspectRows, 5); r++) {
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

  const headers = [];
  for (let c = 0; c < maxInspectCols; c++) {
    const id = ReferenceResolver.coordToId(headerRowIndex, c);
    const cell = registry.getCell(id);
    if (cell.raw) {
      headers.push({
        colIndex: c,
        colLabel: ReferenceResolver.coordToId(0, c).replace(/[0-9]/g, ''),
        text: String(cell.computed ?? cell.raw)
      });
    }
  }

  for (let r = 0; r < maxInspectRows; r++) {
    for (let c = 0; c < maxInspectCols; c++) {
      const id = ReferenceResolver.coordToId(r, c);
      const cell = registry.getCell(id);

      if (!cell.raw && cell.computed === null) continue;

      nonEmptyCells.push({ id, r, c, raw: cell.raw, computed: cell.computed, type: cell.type });

      // Track column type statistics
      if (!columnTypeCounts[c]) {
        columnTypeCounts[c] = { number: 0, text: 0, formula: 0 };
      }
      if (cell.type === 'number') columnTypeCounts[c].number++;
      else if (cell.type === 'formula') columnTypeCounts[c].formula++;
      else columnTypeCounts[c].text++;

      // Track formulas
      if (cell.type === 'formula' && formulaCells.length < 20) {
        formulaCells.push({
          id,
          formula: cell.raw,
          computed: cell.computed,
          hasError: typeof cell.computed === 'string' && cell.computed.startsWith("#")
        });
      }

      // Track errors
      if (typeof cell.computed === 'string' && cell.computed.startsWith("#") && errors.length < 10) {
        errors.push({
          id,
          formula: cell.raw,
          error: cell.computed
        });
      }
    }
  }

  // Derive dominant type for each column
  const columnTypes = {};
  headers.forEach(h => {
    const counts = columnTypeCounts[h.colIndex];
    if (counts) {
      if (counts.number >= counts.text && counts.number >= counts.formula) {
        columnTypes[h.text] = "numeric";
      } else if (counts.formula >= counts.text) {
        columnTypes[h.text] = "formula";
      } else {
        columnTypes[h.text] = "text";
      }
    }
  });

  // Extract compact 2D sample data matrix (top 10 populated rows)
  const sampleData = [];
  for (let r = 0; r < Math.min(maxInspectRows, 12); r++) {
    const rowObj = {};
    let rowHasData = false;
    for (let c = 0; c < Math.min(maxInspectCols, 10); c++) {
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
