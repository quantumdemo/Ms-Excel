import { foundationLessons } from './lessons/foundations';
import { logicalLessons } from './lessons/logical';
import { lookupLessons } from './lessons/lookup';
import { textLessons } from './lessons/text';
import { mathStatsLessons } from './lessons/math-stats';
import { dateTimeLessons } from './lessons/date-time';
import { financialLessons } from './lessons/financial';
import { dynamicArrayLessons } from './lessons/dynamic-array';
import { infoLessons } from './lessons/info';
import { createPlaceholderLesson } from './lesson-system';

const logicalNames = [];
const textNames = ["ARRAYTOTEXT", "ASC", "BAHTTEXT", "CHAR", "CLEAN", "CODE", "CONCATENATE", "DBCS", "DOLLAR", "EXACT", "FIXED", "REPLACE", "REPT", "T", "TEXT", "TEXTAFTER", "TEXTBEFORE", "TEXTSPLIT", "UNICHAR", "UNICODE", "VALUE"];
const dateNames = ["DATEVALUE", "DAYS", "DAYS360", "EDATE", "EOMONTH", "HOUR", "ISOWEEKNUM", "MINUTE", "NETWORKDAYS.INTL", "SECOND", "TIME", "TIMEVALUE", "WEEKDAY", "WEEKNUM", "WORKDAY", "WORKDAY.INTL", "YEARFRAC"];
const lookupNames = ["ADDRESS", "AREAS", "CHOOSE", "CHOOSECOLS", "CHOOSEROWS", "COLUMN", "COLUMNS", "DROP", "EXPAND", "FORMULATEXT", "GETPIVOTDATA", "HLOOKUP", "HSTACK", "HYPERLINK", "INDIRECT", "LOOKUP", "OFFSET", "ROW", "ROWS", "RTD", "SORTBY", "TAKE", "TOCOL", "TOROW", "TRANSPOSE", "VSTACK", "WRAPCOLS", "WRAPROWS", "XMATCH"];
const mathNames = ["CEILING", "COMBIN", "COMBINA", "DECIMAL", "EVEN", "EXP", "FACT", "FACTDOUBLE", "FLOOR", "GCD", "ISO.CEILING", "LCM", "LN", "LOG", "LOG10", "MROUND", "MULTINOMIAL", "ODD", "PI", "POWER", "QUOTIENT", "RAND", "RANDBETWEEN", "ROMAN", "SEQUENCE", "SERIESSUM", "SIGN", "SQRTPI", "SUBTOTAL", "SUMSQ", "SUMX2MY2", "SUMX2PY2", "SUMXMY2", "TRUNC"];
const statNames = ["AVEDEV", "AVERAGEA", "BETA.DIST", "BETA.INV", "BINOM.DIST", "BINOM.INV", "CHISQ.DIST", "CHISQ.INV", "CHISQ.TEST", "CONFIDENCE.NORM", "CONFIDENCE.T", "CORREL", "COUNTBLANK", "COVARIANCE.P", "COVARIANCE.S", "DEVSQ", "EXPON.DIST", "F.DIST", "F.INV", "F.TEST", "FISHER", "FISHERINV", "FORECAST", "FREQUENCY", "GAMMA", "GAMMA.DIST", "GAMMA.INV", "GAMMALN", "GAUSS", "GEOMEAN", "GROWTH", "HARMEAN", "HYPGEOM.DIST", "INTERCEPT", "KURT", "LARGE", "LINEST", "LOGEST", "LOGNORM.DIST", "LOGNORM.INV", "MAXA", "MINA", "MODE.MULT", "MODE.SNGL", "NEGBINOM.DIST", "NORM.DIST", "NORM.INV", "NORM.S.DIST", "NORM.S.INV", "PEARSON", "PERCENTILE.EXC", "PERCENTILE.INC", "PERCENTRANK.EXC", "PERCENTRANK.INC", "PERMUT", "PERMUTATIONA", "PHI", "POISSON.DIST", "PROB", "QUARTILE.EXC", "QUARTILE.INC", "RANK.AVG", "RANK.EQ", "RSQ", "SKEW", "SKEW.P", "SLOPE", "SMALL", "STANDARDIZE", "STDEV.P", "STDEV.S", "STDEVA", "STDEVPA", "STEYX", "T.DIST", "T.INV", "T.TEST", "TREND", "TRIMMEAN", "VAR.P", "VAR.S", "VARA", "VARPA", "WEIBULL.DIST", "Z.TEST"];
const financialNames = ["ACCRINT", "ACCRINTM", "AMORDEGRC", "AMORLINC", "COUPDAYBS", "COUPDAYS", "COUPDAYSNC", "COUPNCD", "COUPNUM", "COUPPCD", "CUMIPMT", "CUMPRINC", "DB", "DDB", "DISC", "DOLLARDE", "DOLLARFR", "DURATION", "EFFECT", "FV", "FVSCHEDULE", "INTRATE", "IPMT", "IRR", "ISPMT", "MDURATION", "MIRR", "NOMINAL", "NPER", "NPV", "ODDFPRICE", "ODDFYIELD", "ODDLPRICE", "ODDLYIELD", "PDURATION", "PPMT", "PRICE", "PRICEDISC", "PRICEMAT", "PV", "RATE", "RECEIVED", "RRI", "SLN", "SYD", "TBILLEQ", "TBILLPRICE", "TBILLYIELD", "VDB", "XIRR", "XNPV", "YIELD", "YIELDDISC", "YIELDMAT"];
const infoNames = ["CELL", "ERROR.TYPE", "INFO", "ISFORMULA", "ISLOGICAL", "ISNONTEXT", "ISOMITTED", "ISREF", "N", "NA", "SHEET", "SHEETS", "TYPE"];

const placeholders = [
  ...logicalNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'logical')),
  ...textNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'text')),
  ...dateNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'date-time')),
  ...lookupNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'lookup')),
  ...mathNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'math')),
  ...statNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'statistical')),
  ...financialNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'financial')),
  ...infoNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'info')),
];

export const excelLessons = [
  ...foundationLessons,
  ...logicalLessons,
  ...lookupLessons,
  ...textLessons,
  ...mathStatsLessons,
  ...dateTimeLessons,
  ...financialLessons,
  ...dynamicArrayLessons,
  ...infoLessons,
  ...placeholders
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
