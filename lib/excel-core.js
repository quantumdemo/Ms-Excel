
/**
 * ReferenceResolver handles conversions between Excel-style cell identifiers (e.g., "A1", "$A$1")
 * and 0-indexed coordinates { r, c }.
 */
import { FormulaEvaluator } from './formula-evaluator.js';

/**
 * ReferenceResolver handles conversions between Excel-style cell identifiers (e.g., "A1", "$A$1")
 * and 0-indexed coordinates { r, c }.
 */
export class ReferenceResolver {
  static idToCoord(id) {
    if (!id) return null;
    // Strip $ for basic coordinate conversion
    const cleanId = id.replace(/\$/g, '').toUpperCase();
    const match = cleanId.match(/([A-Z]+)([0-9]+)/);
    if (!match) return null;

    const colStr = match[1];
    const row = parseInt(match[2], 10) - 1;

    let col = 0;
    for (let i = 0; i < colStr.length; i++) {
      col = col * 26 + (colStr.charCodeAt(i) - 64);
    }

    return { r: row, c: col - 1 };
  }

  static coordToId(r, c) {
    let colStr = "";
    let tempC = c + 1;
    while (tempC > 0) {
      let rem = (tempC - 1) % 26;
      colStr = String.fromCharCode(65 + rem) + colStr;
      tempC = Math.floor((tempC - rem) / 26);
    }
    return `${colStr}${r + 1}`;
  }

  /**
   * Parses a reference like "$A$1", "A$1", or "$A1" into components.
   */
  static parseReference(ref) {
    const match = ref.toUpperCase().match(/(\$?)([A-Z]+)(\$?)([0-9]+)/);
    if (!match) return null;

    const isColAbs = match[1] === '$';
    const colStr = match[2];
    const isRowAbs = match[3] === '$';
    const rowStr = match[4];

    let col = 0;
    for (let i = 0; i < colStr.length; i++) {
      col = col * 26 + (colStr.charCodeAt(i) - 64);
    }

    return {
      r: parseInt(rowStr, 10) - 1,
      c: col - 1,
      isRowAbs,
      isColAbs
    };
  }

  /**
   * Formats components back into a reference string.
   */
  static formatReference(r, c, isRowAbs = false, isColAbs = false) {
    let colStr = "";
    let tempC = c + 1;
    while (tempC > 0) {
      let rem = (tempC - 1) % 26;
      colStr = String.fromCharCode(65 + rem) + colStr;
      tempC = Math.floor((tempC - rem) / 26);
    }
    return `${isColAbs ? '$' : ''}${colStr}${isRowAbs ? '$' : ''}${r + 1}`;
  }

  static isRange(expr) {
    return /^(\$?[A-Z]+\$?[0-9]+):(\$?[A-Z]+\$?[0-9]+)$/i.test(expr);
  }

  static getRangeCoords(rangeStr) {
    const parts = rangeStr.split(':');
    const start = ReferenceResolver.parseReference(parts[0]);
    const end = ReferenceResolver.parseReference(parts[1]);
    if (!start || !end) return null;
    return {
      startR: Math.min(start.r, end.r),
      startC: Math.min(start.c, end.c),
      endR: Math.max(start.r, end.r),
      endC: Math.max(start.c, end.c)
    };
  }

  /**
   * Adjusts all references in a formula based on row and column offsets,
   * respecting absolute and mixed markers.
   */
  static adjustFormula(formula, rOff, cOff) {
    if (typeof formula !== 'string' || !formula.startsWith('=')) return formula;

    // Regex matches references like $A$1, A$1, $A1, A1
    const refRegex = /(\$?[A-Z]+\$?[0-9]+)/g;

    return formula.replace(refRegex, (match) => {
      const parsed = ReferenceResolver.parseReference(match);
      if (!parsed) return match;

      const newR = parsed.isRowAbs ? parsed.r : parsed.r + rOff;
      const newC = parsed.isColAbs ? parsed.c : parsed.c + cOff;

      // Check bounds (Excel behavior: #REF! if out of bounds)
      if (newR < 0 || newC < 0) return "#REF!";

      return ReferenceResolver.formatReference(newR, newC, parsed.isRowAbs, parsed.isColAbs);
    });
  }
}

/**
 * CellRegistry is the central store for spreadsheet data.
 * It manages values, formulas, and dependency-based recalculation.
 */
export class CellRegistry {
  constructor(rows = 40, cols = 26, externalParser = null) {
    this.cells = new Map(); // id -> { raw, computed, type, dependencies, parsedFormula }
    this.dependents = new Map(); // id -> Set of ids that depend on this id
    this.rows = rows;
    this.cols = cols;
    this.externalParser = externalParser; // e.g., hot-formula-parser instance
    this.evaluator = new FormulaEvaluator(this);
    this.onUpdate = null; // Callback for UI sync
  }

  getCell(id) {
    // id should be clean (A1 style) for internal lookup
    const cleanId = id.replace(/\$/g, '').toUpperCase();
    return this.cells.get(cleanId) || {
      raw: "",
      computed: null,
      type: "text",
      dependencies: [],
      parsedFormula: null
    };
  }

  /**
   * Updates a cell's raw value and triggers dependency tracking and recalculation.
   */
  updateCell(id, rawValue) {
    const cleanId = id.replace(/\$/g, '').toUpperCase();
    const raw = String(rawValue);
    let type = "text";
    let dependencies = [];
    let parsedFormula = null;

    // 1. Determine Content Type
    if (raw.startsWith("=")) {
      type = "formula";
      parsedFormula = raw.substring(1);
      // Extract cell references and ranges, including absolute markers
      const rangeRegex = /\$?[A-Z]+\$?[0-9]+:\$?[A-Z]+\$?[0-9]+/g;
      const refRegex = /\$?[A-Z]+\$?[0-9]+/g;

      const rawRanges = raw.toUpperCase().match(rangeRegex) || [];
      const rawRefs = raw.toUpperCase().replace(rangeRegex, '').match(refRegex) || [];

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

    // 2. Manage Dependency Graph & Cycle Detection
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

    // 3. Store Cell Data
    this.cells.set(cleanId, {
      raw,
      computed: raw,
      type,
      dependencies,
      parsedFormula
    });

    // 4. Trigger Recalculation
    this.recalculate(cleanId);

    if (this.onUpdate) this.onUpdate();
  }

  /**
   * Recalculates the changed cell and all its dependents using topological order.
   */
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

  /**
   * Computes the display value of a cell based on its type and raw input.
   */
  computeValue(id) {
    const cell = this.cells.get(id);
    if (!cell) return;

    if (cell.type === "formula") {
      if (this.externalParser) {
        const result = this.externalParser.parse(cell.parsedFormula);
        cell.computed = result.error ? result.error : result.result;
        return;
      }

      cell.computed = this.evaluator.evaluate("=" + cell.parsedFormula);
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
