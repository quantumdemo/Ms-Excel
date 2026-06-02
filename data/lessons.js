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
const textNames = [];
const dateNames = [];
const lookupNames = [];
const mathNames = [];
const statNames = ["COUNTBLANK", "COVARIANCE.P", "COVARIANCE.S", "DEVSQ", "EXPON.DIST", "F.DIST", "F.INV", "F.TEST", "FISHER", "FISHERINV", "FORECAST", "FREQUENCY", "MODE.MULT", "MODE.SNGL", "NEGBINOM.DIST", "NORM.DIST", "NORM.INV", "NORM.S.DIST", "NORM.S.INV", "PEARSON", "PERCENTILE.EXC", "PERCENTILE.INC", "PERCENTRANK.EXC", "PERCENTRANK.INC", "PERMUT", "PERMUTATIONA", "PHI", "POISSON.DIST", "PROB", "QUARTILE.EXC", "QUARTILE.INC", "RANK.AVG", "RANK.EQ", "RSQ", "SKEW", "SKEW.P", "SLOPE", "SMALL", "STANDARDIZE", "STDEV.P", "STDEV.S", "STDEVA", "STDEVPA", "STEYX", "T.DIST", "T.INV", "T.TEST", "TREND", "TRIMMEAN", "VAR.P", "VAR.S", "VARA", "VARPA", "WEIBULL.DIST", "Z.TEST"];
const financialNames = [];
const infoNames = ["CELL", "ERROR.TYPE", "INFO", "ISFORMULA", "ISLOGICAL", "ISNONTEXT", "ISOMITTED", "ISREF", "N", "NA", "SHEET", "SHEETS", "TYPE"];

const implementedLessons = [
  ...foundationLessons,
  ...logicalLessons,
  ...lookupLessons,
  ...textLessons,
  ...mathStatsLessons,
  ...dateTimeLessons,
  ...financialLessons,
  ...dynamicArrayLessons,
  ...infoLessons,
];

const implementedIds = new Set(implementedLessons.map(l => l.id));

const placeholders = [
  ...logicalNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'logical')),
  ...textNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'text')),
  ...dateNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'date-time')),
  ...lookupNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'lookup')),
  ...mathNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'math')),
  ...statNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'statistical')),
  ...financialNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'financial')),
  ...infoNames.map(n => createPlaceholderLesson(n.toLowerCase(), n, 'info')),
].filter(p => !implementedIds.has(p.id));

export const excelLessons = [
  ...implementedLessons,
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
