import { createPlaceholderLesson } from './lesson-system';

const foundationLessons = [
  {
    id: "excel-overview",
    title: "Overview of Excel",
    category: "foundations",
    difficulty: "Beginner",
    xp: 100,
    description: "Welcome to LearnExcel! Microsoft Excel is a powerful spreadsheet application used for data analysis, calculations, and visualization. It consists of Rows (numbers), Columns (letters), and Cells (the intersection of a row and column).",
    syntax: "N/A",
    practice: {
      instructions: "Identify the cell address. Click on cell B2 and type 'LearnExcel'.",
      initialData: [["A1", "B1"], ["A2", ""]],
      targetCell: [1, 1],
      expectedFormula: "LearnExcel",
      expectedValue: "LearnExcel"
    }
  },
  {
    id: "cell-referencing",
    title: "Cell Referencing",
    category: "foundations",
    difficulty: "Beginner",
    xp: 150,
    description: "Cells are referenced by their column and row (e.g., A1). Relative references (A1) change when copied, while Absolute references (\$A\$1) stay fixed.",
    syntax: "A1 (Relative), $A$1 (Absolute)",
    practice: {
      instructions: "In cell B2, reference the value in A2 using a relative reference.",
      initialData: [["Value", "Reference"], [100, ""]],
      targetCell: [1, 1],
      expectedFormula: "A2",
      expectedValue: 100
    }
  }
];

const logical = ["AND", "FALSE", "IF", "IFERROR", "IFNA", "IFS", "LAMBDA", "LET", "NOT", "OR", "SWITCH", "TRUE", "XOR"];
const text = ["ARRAYTOTEXT", "ASC", "BAHTTEXT", "CHAR", "CLEAN", "CODE", "CONCAT", "CONCATENATE", "DBCS", "DOLLAR", "EXACT", "FIND", "FIXED", "LEFT", "LEN", "LOWER", "MID", "NUMBERVALUE", "PHONETIC", "PROPER", "REPLACE", "REPT", "RIGHT", "SEARCH", "SUBSTITUTE", "T", "TEXT", "TEXTAFTER", "TEXTBEFORE", "TEXTJOIN", "TEXTSPLIT", "TRIM", "UNICHAR", "UNICODE", "UPPER", "VALUE"];
const date = ["DATE", "DATEDIF", "DATEVALUE", "DAY", "DAYS", "DAYS360", "EDATE", "EOMONTH", "HOUR", "ISOWEEKNUM", "MINUTE", "MONTH", "NETWORKDAYS", "NETWORKDAYS.INTL", "NOW", "SECOND", "TIME", "TIMEVALUE", "TODAY", "WEEKDAY", "WEEKNUM", "WORKDAY", "WORKDAY.INTL", "YEAR", "YEARFRAC"];
const lookup = ["ADDRESS", "AREAS", "CHOOSE", "CHOOSECOLS", "CHOOSEROWS", "COLUMN", "COLUMNS", "DROP", "EXPAND", "FILTER", "FORMULATEXT", "GETPIVOTDATA", "HLOOKUP", "HSTACK", "HYPERLINK", "INDEX", "INDIRECT", "LOOKUP", "MATCH", "OFFSET", "ROW", "ROWS", "RTD", "SORT", "SORTBY", "TAKE", "TOCOL", "TOROW", "TRANSPOSE", "UNIQUE", "VLOOKUP", "VSTACK", "WRAPCOLS", "WRAPROWS", "XLOOKUP", "XMATCH"];
const math = ["ABS", "CEILING", "COMBIN", "COMBINA", "DECIMAL", "EVEN", "EXP", "FACT", "FACTDOUBLE", "FLOOR", "GCD", "INT", "ISO.CEILING", "LCM", "LN", "LOG", "LOG10", "MOD", "MROUND", "MULTINOMIAL", "ODD", "PI", "POWER", "PRODUCT", "QUOTIENT", "RAND", "RANDBETWEEN", "ROMAN", "ROUND", "ROUNDDOWN", "ROUNDUP", "SEQUENCE", "SERIESSUM", "SIGN", "SQRT", "SQRTPI", "SUBTOTAL", "SUM", "SUMIF", "SUMIFS", "SUMPRODUCT", "SUMSQ", "SUMX2MY2", "SUMX2PY2", "SUMXMY2", "TRUNC"];
const statistical = ["AVEDEV", "AVERAGE", "AVERAGEA", "AVERAGEIF", "AVERAGEIFS", "BETA.DIST", "BETA.INV", "BINOM.DIST", "BINOM.INV", "CHISQ.DIST", "CHISQ.INV", "CHISQ.TEST", "CONFIDENCE.NORM", "CONFIDENCE.T", "CORREL", "COUNT", "COUNTA", "COUNTBLANK", "COUNTIF", "COUNTIFS", "COVARIANCE.P", "COVARIANCE.S", "DEVSQ", "EXPON.DIST", "F.DIST", "F.INV", "F.TEST", "FISHER", "FISHERINV", "FORECAST", "FREQUENCY", "GAMMA", "GAMMA.DIST", "GAMMA.INV", "GAMMALN", "GAUSS", "GEOMEAN", "GROWTH", "HARMEAN", "HYPGEOM.DIST", "INTERCEPT", "KURT", "LARGE", "LINEST", "LOGEST", "LOGNORM.DIST", "LOGNORM.INV", "MAX", "MAXA", "MEDIAN", "MIN", "MINA", "MODE.MULT", "MODE.SNGL", "NEGBINOM.DIST", "NORM.DIST", "NORM.INV", "NORM.S.DIST", "NORM.S.INV", "PEARSON", "PERCENTILE.EXC", "PERCENTILE.INC", "PERCENTRANK.EXC", "PERCENTRANK.INC", "PERMUT", "PERMUTATIONA", "PHI", "POISSON.DIST", "PROB", "QUARTILE.EXC", "QUARTILE.INC", "RANK.AVG", "RANK.EQ", "RSQ", "SKEW", "SKEW.P", "SLOPE", "SMALL", "STANDARDIZE", "STDEV.P", "STDEV.S", "STDEVA", "STDEVPA", "STEYX", "T.DIST", "T.INV", "T.TEST", "TREND", "TRIMMEAN", "VAR.P", "VAR.S", "VARA", "VARPA", "WEIBULL.DIST", "Z.TEST"];
const financial = ["ACCRINT", "ACCRINTM", "AMORDEGRC", "AMORLINC", "COUPDAYBS", "COUPDAYS", "COUPDAYSNC", "COUPNCD", "COUPNUM", "COUPPCD", "CUMIPMT", "CUMPRINC", "DB", "DDB", "DISC", "DOLLARDE", "DOLLARFR", "DURATION", "EFFECT", "FV", "FVSCHEDULE", "INTRATE", "IPMT", "IRR", "ISPMT", "MDURATION", "MIRR", "NOMINAL", "NPER", "NPV", "ODDFPRICE", "ODDFYIELD", "ODDLPRICE", "ODDLYIELD", "PDURATION", "PMT", "PPMT", "PRICE", "PRICEDISC", "PRICEMAT", "PV", "RATE", "RECEIVED", "RRI", "SLN", "SYD", "TBILLEQ", "TBILLPRICE", "TBILLYIELD", "VDB", "XIRR", "XNPV", "YIELD", "YIELDDISC", "YIELDMAT"];
const information = ["CELL", "ERROR.TYPE", "INFO", "ISBLANK", "ISERR", "ISERROR", "ISEVEN", "ISFORMULA", "ISLOGICAL", "ISNA", "ISNONTEXT", "ISNUMBER", "ISODD", "ISOMITTED", "ISREF", "ISTEXT", "N", "NA", "SHEET", "SHEETS", "TYPE"];

const allFunctions = [
  ...logical.map(n => ({ n, c: 'logical' })),
  ...text.map(n => ({ n, c: 'text' })),
  ...date.map(n => ({ n, c: 'date-time' })),
  ...lookup.map(n => ({ n, c: 'lookup' })),
  ...math.map(n => ({ n, c: 'math' })),
  ...statistical.map(n => ({ n, c: 'statistical' })),
  ...financial.map(n => ({ n, c: 'financial' })),
  ...information.map(n => ({ n, c: 'information' })),
];

export const excelLessons = [
  ...foundationLessons,
  ...allFunctions.map(f => createPlaceholderLesson(f.n.toLowerCase(), f.n, f.c))
];

export const getLessonById = (id) => excelLessons.find(l => l.id === id);
export const getLessonsByCategory = (category) => excelLessons.filter(l => l.category === category);
export const getCategoryStats = (completedLessons) => {
  const stats = {};
  excelLessons.forEach(lesson => {
    if (!stats[lesson.category]) stats[lesson.category] = { total: 0, completed: 0 };
    stats[lesson.category].total++;
    if (completedLessons.includes(lesson.id)) stats[lesson.category].completed++;
  });
  return stats;
};
