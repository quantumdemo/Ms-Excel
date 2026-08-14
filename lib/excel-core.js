import { FormulaEvaluator } from './formula-evaluator.js';
import { ReferenceResolver } from './reference-resolver.js';
import { fromSerial } from './date-time-enforcement.js';

export { ReferenceResolver };

/**
 * Formats a raw or computed value based on cell format type.
 */
export function formatCellValue(val, format = "general") {
  if (val === null || val === undefined || val === "") return "";
  const str = String(val);
  if (str.startsWith("#")) return str; // Errors remain as-is

  switch (format) {
    case 'number': {
      const num = Number(val);
      if (isNaN(num)) return str;
      return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
    }
    case 'currency': {
      const num = Number(val);
      if (isNaN(num)) return str;
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    }
    case 'percentage': {
      const num = Number(val);
      if (isNaN(num)) return str;
      return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(num);
    }
    case 'date': {
      const num = Number(val);
      if (!isNaN(num) && num > 0) {
        try {
          const d = fromSerial(num);
          if (d && !isNaN(d.getTime())) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
          }
        } catch (e) {
          // Fallback to Date parse
        }
      }
      const dParsed = new Date(val);
      if (!isNaN(dParsed.getTime())) {
        const yyyy = dParsed.getFullYear();
        const mm = String(dParsed.getMonth() + 1).padStart(2, '0');
        const dd = String(dParsed.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      }
      return str;
    }
    case 'text':
      return str;
    case 'general':
    default:
      return str;
  }
}

/**
 * CellRegistry is the central store for spreadsheet data.
 * It manages values, formulas, and dependency-based recalculation.
 */
export class CellRegistry {
  constructor(rows = 40, cols = 26, externalParser = null) {
    this.cells = new Map(); // id -> { raw, computed, type, format, dependencies, parsedFormula }
    this.dependents = new Map(); // id -> Set of ids that depend on this id
    this.spillMap = new Map(); // id -> sourceId (cell that caused the spill)
    this.rows = rows;
    this.cols = cols;
    this.externalParser = externalParser; // e.g., hot-formula-parser instance
    this.evaluator = new FormulaEvaluator(this);
    this.onUpdate = null; // Callback for UI sync
    this.hiddenRows = new Set();
    this.filteredRows = new Set();
  }

  setRowHidden(row, hidden) {
    if (hidden) this.hiddenRows.add(row);
    else this.hiddenRows.delete(row);
  }

  setRowFiltered(row, filtered) {
    if (filtered) this.filteredRows.add(row);
    else this.filteredRows.delete(row);
  }

  isRowVisible(row, includeHidden = true) {
    if (this.filteredRows.has(row)) return false;
    if (!includeHidden && this.hiddenRows.has(row)) return false;
    return true;
  }

  getCell(id) {
    const cleanId = id.replace(/\$/g, '').toUpperCase();

    // Check if cell is a spill result
    if (this.spillMap.has(cleanId)) {
        const sourceId = this.spillMap.get(cleanId);
        const sourceCell = this.cells.get(sourceId);
        if (sourceCell && Array.isArray(sourceCell.computed)) {
            const coord = ReferenceResolver.idToCoord(cleanId);
            const sourceCoord = ReferenceResolver.idToCoord(sourceId);
            const rIdx = coord.r - sourceCoord.r;
            const cIdx = coord.c - sourceCoord.c;

            const val = sourceCell.computed[rIdx]?.[cIdx];
            return {
                raw: "",
                computed: val !== undefined ? val : null,
                type: "spill",
                format: "general",
                dependencies: [sourceId],
                parsedFormula: null
            };
        }
    }

    const cell = this.cells.get(cleanId);
    if (cell && Array.isArray(cell.computed)) {
      // If it's the anchor of a dynamic array, show the top-left value
      return {
        ...cell,
        computed: cell.computed[0]?.[0] ?? null
      };
    }

    return cell || {
      raw: "",
      computed: null,
      type: "text",
      format: "general",
      dependencies: [],
      parsedFormula: null
    };
  }

  setCellFormat(id, format) {
    const cleanId = id.replace(/\$/g, '').toUpperCase();
    const cell = this.getCell(cleanId);
    this.cells.set(cleanId, {
      ...cell,
      format: format || "general"
    });
    if (this.onUpdate) this.onUpdate();
  }

  updateCell(id, rawValue, format = null) {
    const cleanId = id.replace(/\$/g, '').toUpperCase();
    const raw = String(rawValue);
    let type = "text";
    let dependencies = [];
    let parsedFormula = null;

    if (raw.startsWith("=")) {
      type = "formula";
      parsedFormula = raw.substring(1);

      // Extract cell references and ranges, protecting string literals
      const formulaWithoutStrings = raw.replace(/"([^"\\]|\\.)*"/g, "");
      const rangeRegex = /\$?[A-Z]+\$?[0-9]+:\$?[A-Z]+\$?[0-9]+|\$?[A-Z]+:\$?[A-Z]+/g;
      const refRegex = /\$?[A-Z]+\$?[0-9]+/g;

      const rawRanges = formulaWithoutStrings.toUpperCase().match(rangeRegex) || [];
      const rawRefs = formulaWithoutStrings.toUpperCase().replace(rangeRegex, '').match(refRegex) || [];

      const allDeps = new Set();

      rawRanges.forEach(rangeStr => {
        const coords = ReferenceResolver.getRangeCoords(rangeStr, this.rows);
        if (coords) {
          for (let r = coords.startR; r <= coords.endR; r++) {
            for (let c = coords.startC; c <= coords.endC; c++) {
              allDeps.add(ReferenceResolver.coordToId(r, c));
            }
          }
        }
      });

      rawRefs.forEach(ref => allDeps.add(ref.replace(/\$/g, '')));
      dependencies = Array.from(allDeps);
    } else if (raw !== "" && !isNaN(raw) && !isNaN(parseFloat(raw))) {
      type = "number";
    }

    if (dependencies.includes(cleanId)) {
        const existingFormat = format || this.cells.get(cleanId)?.format || "general";
        this.cells.set(cleanId, { raw, computed: "#CIRCULAR!", type, format: existingFormat, dependencies, parsedFormula });
        if (this.onUpdate) this.onUpdate();
        return;
    }

    const oldCell = this.getCell(cleanId);
    if (oldCell.dependencies) {
      oldCell.dependencies.forEach(depId => {
        this.dependents.get(depId)?.delete(cleanId);
      });
    }

    dependencies.forEach(depId => {
      if (!this.dependents.has(depId)) {
        this.dependents.set(depId, new Set());
      }
      this.dependents.get(depId).add(cleanId);
    });

    const cellFormat = format || oldCell.format || "general";

    this.cells.set(cleanId, {
      raw,
      computed: raw === "" ? null : raw,
      type,
      format: cellFormat,
      dependencies,
      parsedFormula
    });

    this.recalculate(cleanId);
    if (this.onUpdate) this.onUpdate();
  }

  recalculate(startId) {
    const cycleContext = {
      timestamp: Date.now()
    };
    const affected = this.getAffectedNodesTopological(startId);
    affected.forEach(id => {
      this.computeValue(id, cycleContext);
    });
  }

  getAffectedNodesTopological(startId) {
    const visited = new Set();
    const result = [];
    const visiting = new Set();

    const visit = (id) => {
      if (visiting.has(id)) return;
      if (visited.has(id)) return;

      visiting.add(id);
      const deps = this.dependents.get(id);
      if (deps) {
        deps.forEach(dependentId => visit(dependentId));
      }
      visiting.delete(id);
      visited.add(id);
      result.push(id);
    };

    visit(startId);
    return result.reverse();
  }

  computeValue(id, cycleContext = { timestamp: Date.now() }) {
    const cell = this.cells.get(id);
    if (!cell) return;

    // Clear previous spills from this cell
    const previousSpills = [];
    for (const [spillId, sourceId] of this.spillMap.entries()) {
        if (sourceId === id) {
            this.spillMap.delete(spillId);
            previousSpills.push(spillId);
        }
    }

    if (cell.type === "formula") {
      if (this.externalParser) {
        const result = this.externalParser.parse(cell.parsedFormula);
        cell.computed = result.error ? result.error : result.result;
      } else {
        cell.computed = this.evaluator.evaluate("=" + cell.parsedFormula, { sourceCell: id, cycleContext });
      }

      // Handle Spilling
      if (Array.isArray(cell.computed)) {
          const coords = ReferenceResolver.idToCoord(id);
          let rows = cell.computed.length;
          let cols = Array.isArray(cell.computed[0]) ? cell.computed[0].length : 1;

          let blocked = false;
          const spillIds = [];

          for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                  if (r === 0 && c === 0) continue;
                  const targetId = ReferenceResolver.coordToId(coords.r + r, coords.c + c);

                  const targetCell = this.cells.get(targetId);
                  const isActuallyOccupied = targetCell && targetCell.raw !== "" && targetId !== id;
                  if (isActuallyOccupied) {
                      blocked = true;
                      break;
                  }
                  spillIds.push(targetId);
              }
              if (blocked) break;
          }

          if (blocked) {
              cell.computed = "#SPILL!";
          } else {
              spillIds.forEach(sid => this.spillMap.set(sid, id));
          }
      }

      previousSpills.forEach(sid => this.recalculate(sid));
      if (Array.isArray(cell.computed) && cell.computed !== "#SPILL!") {
          const coords = ReferenceResolver.idToCoord(id);
          for (let r = 0; r < cell.computed.length; r++) {
              for (let c = 0; c < (Array.isArray(cell.computed[0]) ? cell.computed[0].length : 1); c++) {
                  if (r === 0 && c === 0) continue;
                  this.recalculate(ReferenceResolver.coordToId(coords.r + r, coords.c + c));
              }
          }
      }
    } else if (cell.type === "number") {
      cell.computed = Number(cell.raw);
    } else {
      cell.computed = cell.raw === "" ? null : cell.raw;
    }
  }

  getGridData() {
    const grid = Array(this.rows).fill(null).map(() => Array(this.cols).fill(""));

    this.cells.forEach((data, id) => {
      const coord = ReferenceResolver.idToCoord(id);
      if (coord && coord.r < this.rows && coord.c < this.cols) {
        grid[coord.r][coord.c] = data.computed;
      }
    });

    this.spillMap.forEach((sourceId, spillId) => {
        const coord = ReferenceResolver.idToCoord(spillId);
        if (coord && coord.r < this.rows && coord.c < this.cols) {
            const cell = this.getCell(spillId);
            grid[coord.r][coord.c] = cell.computed;
        }
    });

    return grid;
  }

  getRangeValues(rangeStr) {
    const coords = ReferenceResolver.getRangeCoords(rangeStr, this.rows);
    if (!coords) return null;
    const result = [];
    for (let r = coords.startR; r <= coords.endR; r++) {
      const row = [];
      for (let c = coords.startC; c <= coords.endC; c++) {
        row.push(this.getCell(ReferenceResolver.coordToId(r, c)).computed);
      }
      result.push(row);
    }
    return result;
  }

  /**
   * Batch loads data into the registry without triggering individual updates.
   * @param {Array<Array<any>>} data - 2D array of values or {value, formula} objects
   */
  loadData(data) {
    this.cells.clear();
    this.dependents.clear();
    this.spillMap.clear();

    const rows = data.length;
    const cols = data[0]?.length || 0;
    this.rows = Math.max(this.rows, rows);
    this.cols = Math.max(this.cols, cols);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const rawValue = data[r][c];
        if (rawValue === null || rawValue === undefined || rawValue === "") continue;

        const id = ReferenceResolver.coordToId(r, c);
        let raw = "";
        let type = "text";
        let parsedFormula = null;
        let dependencies = [];

        if (typeof rawValue === 'object' && rawValue.formula) {
          raw = rawValue.formula;
          type = "formula";
          parsedFormula = raw.startsWith('=') ? raw.substring(1) : raw;
        } else {
          raw = String(rawValue);
          if (raw.startsWith("=")) {
            type = "formula";
            parsedFormula = raw.substring(1);
          } else if (raw !== "" && !isNaN(raw) && !isNaN(parseFloat(raw))) {
            type = "number";
          }
        }

        if (type === "formula") {
          const formulaWithoutStrings = raw.replace(/"([^"\\]|\\.)*"/g, "");
          const rangeRegex = /\$?[A-Z]+\$?[0-9]+:\$?[A-Z]+\$?[0-9]+|\$?[A-Z]+:\$?[A-Z]+/g;
          const refRegex = /\$?[A-Z]+\$?[0-9]+/g;

          const rawRanges = formulaWithoutStrings.toUpperCase().match(rangeRegex) || [];
          const rawRefs = formulaWithoutStrings.toUpperCase().replace(rangeRegex, '').match(refRegex) || [];

          const allDeps = new Set();
          rawRanges.forEach(rangeStr => {
            const coords = ReferenceResolver.getRangeCoords(rangeStr, this.rows);
            if (coords) {
              for (let tr = coords.startR; tr <= coords.endR; tr++) {
                for (let tc = coords.startC; tc <= coords.endC; tc++) {
                  allDeps.add(ReferenceResolver.coordToId(tr, tc));
                }
              }
            }
          });
          rawRefs.forEach(ref => allDeps.add(ref.replace(/\$/g, '')));
          dependencies = Array.from(allDeps);
        }

        this.cells.set(id, {
          raw,
          computed: type === "number" ? Number(raw) : (raw === "" ? null : raw),
          type,
          format: "general",
          dependencies,
          parsedFormula
        });

        dependencies.forEach(depId => {
          if (!this.dependents.has(depId)) {
            this.dependents.set(depId, new Set());
          }
          this.dependents.get(depId).add(id);
        });
      }
    }

    const allIds = Array.from(this.cells.keys());
    const affected = this.getAffectedNodesTopologicalMultiple(allIds);
    const cycleContext = { timestamp: Date.now() };
    affected.forEach(id => this.computeValue(id, cycleContext));

    if (this.onUpdate) this.onUpdate();
  }

  getAffectedNodesTopologicalMultiple(startIds) {
    const visited = new Set();
    const result = [];
    const visiting = new Set();

    const visit = (id) => {
      if (visiting.has(id)) return;
      if (visited.has(id)) return;

      visiting.add(id);
      const deps = this.dependents.get(id);
      if (deps) {
        deps.forEach(dependentId => visit(dependentId));
      }
      visiting.delete(id);
      visited.add(id);
      result.push(id);
    };

    startIds.forEach(id => visit(id));
    return result.reverse();
  }
}
