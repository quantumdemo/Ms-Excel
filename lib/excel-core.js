
/**
 * ReferenceResolver handles conversions between Excel-style cell identifiers (e.g., "A1")
 * and 0-indexed coordinates { r, c }.
 */
export class ReferenceResolver {
  static idToCoord(id) {
    if (!id) return null;
    const match = id.toUpperCase().match(/([A-Z]+)([0-9]+)/);
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
    this.onUpdate = null; // Callback for UI sync
  }

  getCell(id) {
    return this.cells.get(id) || {
      raw: "",
      computed: "",
      type: "text",
      dependencies: [],
      parsedFormula: null
    };
  }

  /**
   * Updates a cell's raw value and triggers dependency tracking and recalculation.
   */
  updateCell(id, rawValue) {
    const raw = String(rawValue);
    let type = "text";
    let dependencies = [];
    let parsedFormula = null;

    // 1. Determine Content Type
    if (raw.startsWith("=")) {
      type = "formula";
      parsedFormula = raw.substring(1);
      // Extract cell references (A1, B2, etc.)
      const refRegex = /[A-Z]+[0-9]+/g;
      dependencies = Array.from(new Set(raw.toUpperCase().match(refRegex) || []));
    } else if (raw !== "" && !isNaN(raw) && !isNaN(parseFloat(raw))) {
      type = "number";
    }

    // 2. Manage Dependency Graph & Cycle Detection
    if (dependencies.includes(id)) {
        this.cells.set(id, { raw, computed: "#CIRCULAR!", type, dependencies, parsedFormula });
        if (this.onUpdate) this.onUpdate();
        return;
    }

    const oldCell = this.getCell(id);
    if (oldCell.dependencies) {
      oldCell.dependencies.forEach(depId => {
        this.dependents.get(depId)?.delete(id);
      });
    }

    dependencies.forEach(depId => {
      if (!this.dependents.has(depId)) {
        this.dependents.set(depId, new Set());
      }
      this.dependents.get(depId).add(id);
    });

    // 3. Store Cell Data
    this.cells.set(id, {
      raw,
      computed: raw,
      type,
      dependencies,
      parsedFormula
    });

    // 4. Trigger Recalculation
    this.recalculate(id);

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
    const visiting = new Set(); // For cycle detection during recalculation

    const visit = (id) => {
      if (visiting.has(id)) return; // Cycle found
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

      // Foundation structural support for expressions
      const expression = cell.parsedFormula.toUpperCase();
      const refRegex = /[A-Z]+[0-9]+/g;

      let evalExpr = expression.replace(refRegex, (match) => {
        const refCell = this.getCell(match);
        const val = refCell.computed;
        if (typeof val === 'number') return val;
        if (val === "" || val === undefined || val === null) return 0;
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      });

      try {
        if (/^[0-9+\-*/().\s]+$/.test(evalExpr)) {
          // eslint-disable-next-line no-eval
          const result = eval(evalExpr);
          cell.computed = result;
        } else {
          cell.computed = evalExpr;
        }
      } catch (e) {
        cell.computed = "#VALUE!";
      }
    } else if (cell.type === "number") {
      cell.computed = Number(cell.raw);
    } else {
      cell.computed = cell.raw;
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
}
