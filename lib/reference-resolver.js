
/**
 * ReferenceResolver handles conversions between Excel-style cell identifiers (e.g., "A1", "$A$1")
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
   * respecting absolute and mixed markers, and ignoring string literals.
   */
  static adjustFormula(formula, rOff, cOff) {
    if (typeof formula !== 'string' || !formula.startsWith('=')) return formula;

    // 1. Tokenize string literals to protect them from replacement
    const strings = [];
    const formulaWithTokens = formula.replace(/"([^"\\]|\\.)*"/g, (match) => {
        strings.push(match);
        return `__STR_${strings.length - 1}__`;
    });

    // 2. Replace references
    // Use word boundaries or ensure not part of a larger alphanumeric sequence if possible
    // But Excel references are pretty distinct.
    const refRegex = /(\$?[A-Z]+\$?[0-9]+)/g;

    const adjustedWithTokens = formulaWithTokens.replace(refRegex, (match) => {
      const parsed = ReferenceResolver.parseReference(match);
      if (!parsed) return match;

      const newR = parsed.isRowAbs ? parsed.r : parsed.r + rOff;
      const newC = parsed.isColAbs ? parsed.c : parsed.c + cOff;

      // Check bounds
      if (newR < 0 || newC < 0) return "#REF!";

      return ReferenceResolver.formatReference(newR, newC, parsed.isRowAbs, parsed.isColAbs);
    });

    // 3. Restore string literals
    return adjustedWithTokens.replace(/__STR_(\d+)__/g, (match, idx) => {
        return strings[parseInt(idx, 10)];
    });
  }
}
