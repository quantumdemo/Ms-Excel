
import { FormulaEvaluator } from './formula-evaluator.js';
import { ReferenceResolver } from './reference-resolver.js';

export { ReferenceResolver };

/**
 * CellRegistry is the central store for spreadsheet data.
 * It manages values, formulas, and dependency-based recalculation.
 */
export class CellRegistry {
  constructor(rows = 40, cols = 26, externalParser = null) {
    this.cells = new Map(); // id -> { raw, computed, type, dependencies, parsedFormula }
    this.dependents = new Map(); // id -> Set of ids that depend on this id
    this.spillMap = new Map(); // id -> sourceId (cell that caused the spill)
    this.rows = rows;
    this.cols = cols;
    this.externalParser = externalParser; // e.g., hot-formula-parser instance
    this.evaluator = new FormulaEvaluator(this);
    this.onUpdate = null; // Callback for UI sync
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
                dependencies: [sourceId],
                parsedFormula: null
            };
        }
    }

    return this.cells.get(cleanId) || {
      raw: "",
      computed: null,
      type: "text",
      dependencies: [],
      parsedFormula: null
    };
  }

  updateCell(id, rawValue) {
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
      const rangeRegex = /\$?[A-Z]+\$?[0-9]+:\$?[A-Z]+\$?[0-9]+/g;
      const refRegex = /\$?[A-Z]+\$?[0-9]+/g;

      const rawRanges = formulaWithoutStrings.toUpperCase().match(rangeRegex) || [];
      const rawRefs = formulaWithoutStrings.toUpperCase().replace(rangeRegex, '').match(refRegex) || [];

      const allDeps = new Set();

      rawRanges.forEach(rangeStr => {
        const coords = ReferenceResolver.getRangeCoords(rangeStr);
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
        this.cells.set(cleanId, { raw, computed: "#CIRCULAR!", type, dependencies, parsedFormula });
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

    this.cells.set(cleanId, {
      raw,
      computed: raw === "" ? null : raw,
      type,
      dependencies,
      parsedFormula
    });

    this.recalculate(cleanId);
    if (this.onUpdate) this.onUpdate();
  }

  recalculate(startId) {
    const affected = this.getAffectedNodesTopological(startId);
    affected.forEach(id => {
      this.computeValue(id);
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

  computeValue(id) {
    const cell = this.cells.get(id);
    if (!cell) return;

    // Clear previous spills from this cell
    for (const [spillId, sourceId] of this.spillMap.entries()) {
        if (sourceId === id) {
            this.spillMap.delete(spillId);
            // Trigger dependents of cells that were previously spilled into
            this.recalculate(spillId);
        }
    }

    if (cell.type === "formula") {
      if (this.externalParser) {
        const result = this.externalParser.parse(cell.parsedFormula);
        cell.computed = result.error ? result.error : result.result;
      } else {
        cell.computed = this.evaluator.evaluate("=" + cell.parsedFormula, { sourceCell: id });
      }

      // Handle Spilling
      if (Array.isArray(cell.computed)) {
          const coords = ReferenceResolver.idToCoord(id);
          const rows = cell.computed.length;
          const cols = Array.isArray(cell.computed[0]) ? cell.computed[0].length : 1;

          let blocked = false;
          const spillIds = [];

          for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                  if (r === 0 && c === 0) continue;
                  const targetId = ReferenceResolver.coordToId(coords.r + r, coords.c + c);

                  // Check if cell is occupied by a non-spill value
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
    } else if (cell.type === "number") {
      cell.computed = Number(cell.raw);
    } else {
      cell.computed = cell.raw === "" ? null : cell.raw;
    }
  }

  getGridData() {
    const grid = Array(this.rows).fill(null).map(() => Array(this.cols).fill(""));

    // Fill basic cells
    this.cells.forEach((data, id) => {
      const coord = ReferenceResolver.idToCoord(id);
      if (coord && coord.r < this.rows && coord.c < this.cols) {
        grid[coord.r][coord.c] = data.computed;
      }
    });

    // Fill spilled cells
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
    const coords = ReferenceResolver.getRangeCoords(rangeStr);
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
}
