import { createPlaceholderLesson } from './lesson-system';

const foundationLessons = [
  {
    id: "excel-overview",
    title: "Overview of Excel",
    category: "foundations",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "What is Microsoft Excel?",
      description: "Microsoft Excel is a powerful spreadsheet application used for data analysis, calculations, and visualization. It is the gold standard for professionals worldwide.",
      concept: "Excel consists of Rows (identified by numbers), Columns (identified by letters), and Cells (the intersection of a row and column, like A1)."
    },
    syntax: "N/A",
    syntaxBreakdown: [
      { arg: "Columns", desc: "Vertical blocks identified by letters (A, B, C...)" },
      { arg: "Rows", desc: "Horizontal blocks identified by numbers (1, 2, 3...)" },
      { arg: "Cells", desc: "The meeting point of a Row and Column (e.g., B2)" }
    ],
    realWorldExamples: [
      {
        title: "The Spreadsheet Grid",
        table: {
          headers: ["", "A (Column)", "B (Column)"],
          rows: [
            ["1 (Row)", "Cell A1", "Cell B1"],
            ["2 (Row)", "Cell A2", "Cell B2"]
          ]
        },
        explanation: "Every box you see in Excel is a cell with a unique address."
      }
    ],
    commonMistakes: [
      { title: "Mixing Rows/Cols", desc: "Always name the Column letter first, then the Row number (A1, not 1A)." }
    ],
    proTips: [
      "Excel is used in almost every professional industry from finance to healthcare.",
      "Learning Excel on your phone gives you the power to manage data anywhere."
    ],
    miniChallenge: {
      question: "If you are in Column C and Row 5, what is your cell address?",
      expectedAnswer: "C5"
    },
    practice: {
      instructions: "Identify the cell address. Click on cell B2 and type 'LearnExcel'.",
      initialData: [["A1", "B1"], ["A2", ""]],
      targetCell: [1, 1],
      expectedFormula: "LearnExcel",
      expectedValue: "LearnExcel"
    }
  },
  {
    id: "if",
    title: "IF Function",
    category: "logical",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "What is the IF Function?",
      description: "The IF function is one of the most important logical functions in Microsoft Excel. It allows Excel to make decisions based on conditions.",
      concept: "The IF function checks whether a condition is TRUE or FALSE. If TRUE, it returns one result; if FALSE, it returns another."
    },
    syntax: "=IF(logical_test, value_if_true, value_if_false)",
    syntaxBreakdown: [
      { arg: "logical_test", desc: "The condition you want to check (e.g., A2 >= 50)." },
      { arg: "value_if_true", desc: "The result you want if the condition is met." },
      { arg: "value_if_false", desc: "The result you want if the condition is NOT met." }
    ],
    realWorldExamples: [
      {
        title: "Student Results",
        table: {
          headers: ["Student", "Score", "Formula", "Result"],
          rows: [
          ["John", "72", "=IF(B2>=50, \"PASS\", \"FAIL\")", "PASS"],
          ["Mary", "40", "=IF(B3>=50, \"PASS\", \"FAIL\")", "FAIL"]
          ]
        },
        explanation: "Excel checks the score and automatically assigns a Pass or Fail status."
      }
    ],
    commonMistakes: [
      { title: "Missing Quotes", desc: "Always put text results inside quotation marks like 'PASS'." },
      { title: "Missing Commas", desc: "Arguments must be separated by commas." }
    ],
    proTips: [
      "IF can be combined with AND and OR for complex logic.",
      "Nested IFs allow you to check for multiple conditions at once."
    ],
    miniChallenge: {
      question: "Write a formula that returns 'Adult' if age in A2 is 18 or more, otherwise 'Minor'.",
      expectedAnswer: "=IF(A2>=18,'Adult','Minor')"
    },
    practice: {
      instructions: "In cell C2, write a formula to show \"PASS\" if the score in B2 is 50 or above, otherwise \"FAIL\".",
      initialData: [["Student", "Score", "Result"], ["Alice", 75, ""]],
      targetCell: [1, 2],
      expectedFormula: "IF(B2>=50,\"PASS\",\"FAIL\")",
      expectedValue: "PASS"
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

const averageLesson = {
  id: "average",
  title: "AVERAGE Function",
  category: "statistical",
  difficulty: "Beginner",
  xp: 150,
  introduction: {
    title: "What is the AVERAGE Function?",
    description: "The AVERAGE function calculates the arithmetic mean of a group of numbers. It adds them all up and divides by how many there are.",
    concept: "Instead of adding and dividing manually, AVERAGE does the math for you. Perfect for finding mean scores, prices, or performance."
  },
  syntax: "=AVERAGE(number1, [number2], ...)",
  syntaxBreakdown: [
    { arg: "number1", desc: "The first number or range you want to average." },
    { arg: "number2", desc: "Optional. Additional numbers or ranges to include." }
  ],
  realWorldExamples: [
    {
      title: "Average Test Score",
      table: {
        headers: ["Student", "Score", "Formula", "Result"],
        rows: [
          ["Exam 1", "80", "=AVERAGE(B2:B3)", "85"],
          ["Exam 2", "90", "", ""]
        ]
      },
      explanation: "Excel calculates (80 + 90) / 2 = 85."
    }
  ],
  commonMistakes: [
    { title: "Zeros vs Blanks", desc: "AVERAGE includes cells with 0 but ignores empty cells. This can change your result!" }
  ],
  proTips: [
    "To ignore zeros, you might need the AVERAGEIF function.",
    "You can select non-adjacent cells by holding Ctrl (or Cmd) while selecting."
  ],
  miniChallenge: {
    question: "Find the average of cells B2, B3, and B4.",
    expectedAnswer: "=AVERAGE(B2:B4)"
  },
  practice: {
    instructions: "In cell B5, calculate the average price of the items listed.",
    initialData: [["Item", "Price"], ["Item 1", 10], ["Item 2", 20], ["Item 3", 30], ["Average", ""]],
    targetCell: [4, 1],
    expectedFormula: "AVERAGE(B2:B4)",
    expectedValue: 20
  }
};

const countLesson = {
  id: "count",
  title: "COUNT Function",
  category: "statistical",
  difficulty: "Beginner",
  xp: 100,
  introduction: {
    title: "What is the COUNT Function?",
    description: "The COUNT function tells you how many cells in a range contain numbers.",
    concept: "Use this when you need to know 'how many' items you have, rather than 'how much' they add up to."
  },
  syntax: "=COUNT(value1, [value2], ...)",
  syntaxBreakdown: [
    { arg: "value1", desc: "The range or cells where you want to count numbers." },
    { arg: "value2", desc: "Optional. Additional ranges to count." }
  ],
  realWorldExamples: [
    {
      title: "Inventory Check",
      table: {
        headers: ["Item", "Qty", "Formula", "Result"],
        rows: [
          ["Apples", "10", "=COUNT(B2:B3)", "2"],
          ["Oranges", "5", "", ""]
        ]
      },
      explanation: "There are two numbers in the quantity column, so the result is 2."
    }
  ],
  commonMistakes: [
    { title: "Counting Text", desc: "COUNT only counts numbers. To count text or anything else, use COUNTA." }
  ],
  proTips: [
    "Numbers, dates, and times are all counted by COUNT.",
    "Empty cells and errors are ignored."
  ],
  miniChallenge: {
    question: "How would you count the numbers in the range A1 to A100?",
    expectedAnswer: "=COUNT(A1:A100)"
  },
  practice: {
    instructions: "In cell B6, count how many numeric entries are in cells B2 through B5.",
    initialData: [["Month", "Sales"], ["Jan", 500], ["Feb", "N/A"], ["Mar", 600], ["Apr", 450], ["Entries", ""]],
    targetCell: [5, 1],
    expectedFormula: "COUNT(B2:B5)",
    expectedValue: 3
  }
};

const vlookupLesson = {
  id: "vlookup",
  title: "VLOOKUP Function",
  category: "lookup",
  difficulty: "Intermediate",
  xp: 300,
  introduction: {
    title: "What is the VLOOKUP Function?",
    description: "VLOOKUP stands for 'Vertical Lookup'. It searches for a value in the first column of a table and returns a value in the same row from another column.",
    concept: "Think of it like looking up a name in a phone book to find a phone number. You find the name (Vertical search) and move across to get the info (Result)."
  },
  syntax: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
  syntaxBreakdown: [
    { arg: "lookup_value", desc: "The value you want to find (the 'search term')." },
    { arg: "table_array", desc: "The range of cells that contains the data (the 'database')." },
    { arg: "col_index_num", desc: "The column number in the table from which to retrieve the value." },
    { arg: "range_lookup", desc: "Use FALSE for an exact match, TRUE for an approximate match." }
  ],
  realWorldExamples: [
    {
      title: "Employee ID Lookup",
      table: {
        headers: ["ID", "Name", "Dept", "Result"],
        rows: [
          ["101", "Alice", "Sales", "=VLOOKUP(101, A2:C3, 2, FALSE)"],
          ["102", "Bob", "HR", "Alice"]
        ]
      },
      explanation: "VLOOKUP finds ID 101 and returns 'Alice' from the 2nd column."
    }
  ],
  commonMistakes: [
    { title: "Search Column", desc: "The lookup_value MUST be in the very first column of your table_array." },
    { title: "Static Columns", desc: "If you add columns to your table, VLOOKUP might break because the index number doesn't change." }
  ],
  proTips: [
    "Always use FALSE for range_lookup when searching for specific items (like IDs or Names).",
    "XLOOKUP is the modern, more powerful replacement for VLOOKUP."
  ],
  miniChallenge: {
    question: "Lookup 'Product1' in range A1:B10 and get the price from column 2 (Exact match).",
    expectedAnswer: "=VLOOKUP('Product1', A1:B10, 2, FALSE)"
  },
  practice: {
    instructions: "In cell E2, find the Price of the product named in D2 using VLOOKUP from the table in A2:B4.",
    initialData: [["Product", "Price", "", "Search", "Result"], ["Apple", 5, "", "Banana", ""], ["Banana", 3, "", "", ""], ["Mango", 4, "", "", ""]],
    targetCell: [1, 4],
    expectedFormula: "VLOOKUP(D2,A2:B4,2,FALSE)",
    expectedValue: 3
  }
};

const sumLesson = {
  id: "sum",
  title: "SUM Function",
  category: "math",
  difficulty: "Beginner",
  xp: 150,
  introduction: {
    title: "What is the SUM Function?",
    description: "The SUM function is the most basic and frequently used function in Excel. It adds all the numbers in a range of cells and returns the total.",
    concept: "Instead of typing =A1+A2+A3, you can simply use =SUM(A1:A3). It saves time and prevents errors as your data grows."
  },
  syntax: "=SUM(number1, [number2], ...)",
  syntaxBreakdown: [
    { arg: "number1", desc: "The first number, cell reference, or range you want to add (e.g., A2 or A2:A10)." },
    { arg: "number2", desc: "Optional. Additional numbers or ranges you want to include in the total." }
  ],
  realWorldExamples: [
    {
      title: "Monthly Sales Total",
      table: {
        headers: ["Month", "Sales", "Formula", "Total"],
        rows: [
          ["Jan", "5000", "=SUM(B2:B3)", "12000"],
          ["Feb", "7000", "", ""]
        ]
      },
      explanation: "Excel adds 5,000 and 7,000 to give you a total of 12,000 instantly."
    }
  ],
  commonMistakes: [
    { title: "Circular Reference", desc: "Don't include the cell where the formula is written in the SUM range." },
    { title: "Non-Numeric Data", desc: "SUM ignores text, so ensure your numbers are formatted correctly." }
  ],
  proTips: [
    "Use Alt + = (Windows) or Cmd + Shift + T (Mac) to quickly AutoSum a range.",
    "SUM can handle up to 255 individual arguments."
  ],
  miniChallenge: {
    question: "Write a formula to add all values from cell A1 down to cell A10.",
    expectedAnswer: "=SUM(A1:A10)"
  },
  practice: {
    instructions: "In cell B5, use the SUM function to calculate the total of values in B2, B3, and B4.",
    initialData: [["Item", "Cost"], ["Rent", 1200], ["Food", 400], ["Travel", 200], ["Total", ""]],
    targetCell: [4, 1],
    expectedFormula: "SUM(B2:B4)",
    expectedValue: 1800
  }
};

export const excelLessons = [
  ...foundationLessons,
  sumLesson,
  averageLesson,
  countLesson,
  vlookupLesson,
  ...allFunctions
    .filter(f => !["SUM", "AVERAGE", "COUNT", "VLOOKUP", "IF"].includes(f.n))
    .map(f => createPlaceholderLesson(f.n.toLowerCase(), f.n, f.c))
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
