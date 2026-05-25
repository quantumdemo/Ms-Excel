import { createPlaceholderLesson } from './lesson-system';

// Logical
const logicalFunctions = ["AND", "FALSE", "IF", "IFERROR", "IFNA", "IFS", "LAMBDA", "LET", "NOT", "OR", "SWITCH", "TRUE", "XOR"];
// Text
const textFunctions = ["ARRAYTOTEXT", "ASC", "BAHTTEXT", "CHAR", "CLEAN", "CODE", "CONCAT", "CONCATENATE", "DBCS", "DOLLAR", "EXACT", "FIND", "FIXED", "LEFT", "LEN", "LOWER", "MID", "NUMBERVALUE", "PHONETIC", "PROPER", "REPLACE", "REPT", "RIGHT", "SEARCH", "SUBSTITUTE", "T", "TEXT", "TEXTAFTER", "TEXTBEFORE", "TEXTJOIN", "TEXTSPLIT", "TRIM", "UNICHAR", "UNICODE", "UPPER", "VALUE"];
// Date
const dateFunctions = ["DATE", "DATEDIF", "DATEVALUE", "DAY", "DAYS", "DAYS360", "EDATE", "EOMONTH", "HOUR", "ISOWEEKNUM", "MINUTE", "MONTH", "NETWORKDAYS", "NETWORKDAYS.INTL", "NOW", "SECOND", "TIME", "TIMEVALUE", "TODAY", "WEEKDAY", "WEEKNUM", "WORKDAY", "WORKDAY.INTL", "YEAR", "YEARFRAC"];
// Lookup
const lookupFunctions = ["ADDRESS", "AREAS", "CHOOSE", "CHOOSECOLS", "CHOOSEROWS", "COLUMN", "COLUMNS", "DROP", "EXPAND", "FILTER", "FORMULATEXT", "GETPIVOTDATA", "HLOOKUP", "HSTACK", "HYPERLINK", "INDEX", "INDIRECT", "LOOKUP", "MATCH", "OFFSET", "ROW", "ROWS", "RTD", "SORT", "SORTBY", "TAKE", "TOCOL", "TOROW", "TRANSPOSE", "UNIQUE", "VLOOKUP", "VSTACK", "WRAPCOLS", "WRAPROWS", "XLOOKUP", "XMATCH"];

const allFunctionNames = [
  ...logicalFunctions.map(f => ({ name: f, cat: 'logical' })),
  ...textFunctions.map(f => ({ name: f, cat: 'text' })),
  ...dateFunctions.map(f => ({ name: f, cat: 'date-time' })),
  ...lookupFunctions.map(f => ({ name: f, cat: 'lookup' })),
];

// Generate the master index
export const masterLessonIndex = allFunctionNames.map(f =>
  createPlaceholderLesson(f.name.toLowerCase(), f.name, f.cat)
);

// Override specific lessons with real content
export const excelLessons = masterLessonIndex.map(lesson => {
  if (lesson.id === 'sum') {
    return {
      ...lesson,
      xp: 50,
      description: "Adds all numbers in a range of cells.",
      syntax: "SUM(number1, [number2], ...)",
      practice: {
         instructions: "Sum the range A2:A4",
         initialData: [["Value"], [10], [20], [30], ["Total", ""]],
         targetCell: [4, 1],
         expectedFormula: "SUM(A2:A4)",
         expectedValue: 60
      }
    };
  }
  // Add more overrides as needed...
  return lesson;
});
