/**
 * ReferenceResolver handles conversions between Excel-style cell identifiers (e.g., "A1", "$A$1", "A:A")
 * and 0-indexed coordinates { r, c }.
 */
export class ReferenceResolver {
  static idToCoord(id) {
    if (!id) return null;
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
   * Parses a column-only reference e.g., "A", "$A".
   */
  static parseColumnReference(colRef) {
    const match = colRef.toUpperCase().match(/(\$?)([A-Z]+)/);
    if (!match) return null;

    const colStr = match[2];
    let col = 0;
    for (let i = 0; i < colStr.length; i++) {
      col = col * 26 + (colStr.charCodeAt(i) - 64);
    }
    return col - 1;
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
    if (!expr) return false;
    return /^(\$?[A-Z]+\$?[0-9]+):(\$?[A-Z]+\$?[0-9]+)$/i.test(expr) || /^(\$?[A-Z]+):(\$?[A-Z]+)$/i.test(expr);
  }

  static getRangeCoords(rangeStr, maxRows = 100) {
    if (!rangeStr) return null;
    const parts = rangeStr.split(':');
    if (parts.length !== 2) return null;

    // Check if full-column range e.g. "J:J", "A:C", "$A:$C"
    if (/^\$?[A-Z]+$/i.test(parts[0]) && /^\$?[A-Z]+$/i.test(parts[1])) {
      const col1 = ReferenceResolver.parseColumnReference(parts[0]);
      const col2 = ReferenceResolver.parseColumnReference(parts[1]);
      if (col1 === null || col2 === null) return null;
      return {
        startR: 0,
        startC: Math.min(col1, col2),
        endR: maxRows - 1,
        endC: Math.max(col1, col2)
      };
    }

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
   * respecting absolute and mixed markers, and ignoring string literals.
   */
  static adjustFormula(formula, rOff, cOff) {
    if (typeof formula !== 'string' || !formula.startsWith('=')) return formula;

    const strings = [];
    const formulaWithTokens = formula.replace(/"([^"\\]|\\.)*"/g, (match) => {
        strings.push(match);
        return `__STR_${strings.length - 1}__`;
    });

    const refRegex = /(\$?[A-Z]+\$?[0-9]+)/g;

    const adjustedWithTokens = formulaWithTokens.replace(refRegex, (match) => {
      const parsed = ReferenceResolver.parseReference(match);
      if (!parsed) return match;

      const newR = parsed.isRowAbs ? parsed.r : parsed.r + rOff;
      const newC = parsed.isColAbs ? parsed.c : parsed.c + cOff;

      if (newR < 0 || newC < 0) return "#REF!";

      return ReferenceResolver.formatReference(newR, newC, parsed.isRowAbs, parsed.isColAbs);
    });

    return adjustedWithTokens.replace(/__STR_(\d+)__/g, (match, idx) => {
        return strings[parseInt(idx, 10)];
    });
  }
}
