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
      instructions: "Identify the cell address. Click on cell B2 and type \"LearnExcel\".",
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
    introduction: {
      title: "What is Cell Referencing?",
      description: "Cell referencing means using a cell's address (like A1) in a formula instead of typing actual values directly. This makes your work dynamic!",
      concept: "Instead of writing =50+20, you write =A1+B1. If you change the numbers in A1 or B1 later, the result updates automatically."
    },
    syntax: "A1, $A$1, $A1, A$1",
    syntaxBreakdown: [
      { arg: "Relative (A1)", desc: "The default. Changes automatically when you copy the formula to other cells." },
      { arg: "Absolute ($A$1)", desc: "The \"Lock\". Does NOT change when copied. Used for constant values like Tax Rates." },
      { arg: "Mixed ($A1 or A$1)", desc: "Locks only the Column ($A) or only the Row ($1)." }
    ],
    realWorldExamples: [
      {
        title: "Relative: Totaling Rows",
        table: {
          headers: ["A", "B", "C (Formula)", "Result"],
          rows: [
            ["10", "20", "=A1+B1", "30"],
            ["15", "30", "Copy Down -> =A2+B2", "45"]
          ]
        },
        explanation: "Excel automatically adjusts the row numbers as you copy the formula down."
      },
      {
        title: "Absolute: Tax Calculation",
        table: {
          headers: ["Price", "Tax Rate (Fixed)", "Formula", "Total"],
          rows: [
            ["100", "5% ($B$1)", "=A2*$B$1", "5"],
            ["200", "5% ($B$1)", "=A3*$B$1", "10"]
          ]
        },
        explanation: "By using $B$1, the tax rate stays locked even when you calculate for different prices."
      }
    ],
    commonMistakes: [
      { title: "Forgetting $ Signs", desc: "If you don't lock a cell that should stay constant, your calculations will break when copied." },
      { title: "Locking Everything", desc: "Only use Absolute references when a value MUST stay fixed. Over-locking makes formulas hard to reuse." }
    ],
    proTips: [
      "Press F4 (or Fn+F4) while editing a formula to quickly switch between Relative, Absolute, and Mixed styles.",
      "Mastering referencing is the \"Secret Sauce\" to becoming an Excel expert."
    ],
    miniChallenge: {
      question: "You have prices in Column A and a VAT rate in cell B1. How do you write a formula to multiply A2 by B1 while keeping B1 fixed?",
      expectedAnswer: "=A2*$B$1"
    },
    practice: {
      instructions: "In cell B2, reference the value in A2 using a relative reference.",
      initialData: [["Value", "Reference"], [100, ""]],
      targetCell: [1, 1],
      expectedFormula: "A2",
      expectedValue: 100
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
      { title: "Missing Quotes", desc: "Always put text results inside quotation marks like \"PASS\"." },
      { title: "Missing Commas", desc: "Arguments must be separated by commas." }
    ],
    proTips: [
      "IF can be combined with AND and OR for complex logic.",
      "Nested IFs allow you to check for multiple conditions at once."
    ],
    miniChallenge: {
      question: "Write a formula that returns \"Adult\" if age in A2 is 18 or more, otherwise \"Minor\".",
      expectedAnswer: "=IF(A2>=18,\"Adult\",\"Minor\")"
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
    { title: "Zeros vs Blanks", desc: "AVERAGE includes cells with 0 in the calculation but skips empty cells. If a student missed a test, leave it blank; don't type 0 unless they actually scored zero." },
    { title: "Text in Range", desc: "AVERAGE ignores cells containing text or logical values (TRUE/FALSE)." }
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
    { title: "Counting Text", desc: "COUNT only counts numbers. If you try to count names or \"Yes/No\" answers, it will return 0. Use COUNTA for text." },
    { title: "Numbers as Text", desc: "If a number is formatted as text, COUNT might ignore it." }
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
      explanation: "VLOOKUP finds ID 101 and returns \"Alice\" from the 2nd column."
    }
  ],
  commonMistakes: [
    { title: "Search Column", desc: "The lookup value MUST be in the very first column of your table range. Excel cannot look to the left with VLOOKUP." },
    { title: "Static Columns", desc: "If you insert a new column in your table, VLOOKUP will still use the old index number and return wrong data." },
    { title: "#N/A Error", desc: "This happens if the value you are looking for doesn't exist in the first column." }
  ],
  proTips: [
    "Always use FALSE for the last argument when you need an exact match (like searching for an ID or Name).",
    "Use Absolute References ($A$2:$C$10) for the table range if you plan to copy the formula down to other cells.",
    "XLOOKUP is a newer and better alternative if your version of Excel supports it."
  ],
  miniChallenge: {
    question: "Lookup \"Product1\" in range A1:B10 and get the price from column 2 (Exact match).",
    expectedAnswer: "=VLOOKUP(\"Product1\", A1:B10, 2, FALSE)"
  },
  practice: {
    instructions: "In cell E2, find the Price of the product named in D2 using VLOOKUP from the table in A2:B4.",
    initialData: [["Product", "Price", "", "Search", "Result"], ["Apple", 5, "", "Banana", ""], ["Banana", 3, "", "", ""], ["Mango", 4, "", "", ""]],
    targetCell: [1, 4],
    expectedFormula: "VLOOKUP(D2,A2:B4,2,FALSE)",
    expectedValue: 3
  }
};

const andLesson = {
  id: "and",
  title: "AND Function",
  category: "logical",
  difficulty: "Beginner",
  xp: 100,
  introduction: {
    title: "What is the AND Function?",
    description: "The AND function checks multiple conditions at once. It only returns TRUE if ALL the conditions you provide are met.",
    concept: "Think of it like a checklist. If you need a student to have a score > 50 AND attendance > 80% to pass, AND will tell you if they did both."
  },
  syntax: "=AND(logical1, [logical2], ...)",
  syntaxBreakdown: [
    { arg: "logical1", desc: "The first condition you want to test (e.g., A2 > 10)." },
    { arg: "logical2", desc: "Optional. Additional conditions you want to check." }
  ],
  realWorldExamples: [
    {
      title: "Job Eligibility",
      table: {
        headers: ["Experience", "Degree", "AND Formula", "Eligible?"],
        rows: [
          ["5 Years", "Yes", "=AND(A2>=3, B2=\"Yes\")", "TRUE"],
          ["2 Years", "Yes", "=AND(A3>=3, B3=\"Yes\")", "FALSE"]
        ]
      },
      explanation: "The second row returns FALSE because only one of the two conditions was met."
    }
  ],
  commonMistakes: [
    { title: "Single Condition", desc: "Using AND for just one condition is unnecessary. Just use the comparison directly (e.g., A1 > 10)." }
  ],
  proTips: [
    "AND is almost always used inside an IF function to create powerful logic.",
    "It can handle up to 255 separate conditions!"
  ],
  miniChallenge: {
    question: "Write a formula to check if A2 is greater than 10 and B2 is less than 5.",
    expectedAnswer: "=AND(A2>10, B2<5)"
  },
  practice: {
    instructions: "In cell C2, check if B2 is greater than 50 AND A2 is \"Yes\".",
    initialData: [["Approved", "Score", "Result"], ["Yes", 75, ""]],
    targetCell: [1, 2],
    expectedFormula: "AND(A2=\"Yes\",B2>50)",
    expectedValue: true
  }
};

const orLesson = {
  id: "or",
  title: "OR Function",
  category: "logical",
  difficulty: "Beginner",
  xp: 100,
  introduction: {
    title: "What is the OR Function?",
    description: "The OR function returns TRUE if ANY of the conditions you provide are met. It only returns FALSE if none of them are TRUE.",
    concept: "It's like a \"one-or-more\" check. If a customer gets a discount if they are a \"Member\" OR if they \"Spend > $100\", OR will find them."
  },
  syntax: "=OR(logical1, [logical2], ...)",
  syntaxBreakdown: [
    { arg: "logical1", desc: "The first condition to test." },
    { arg: "logical2", desc: "Optional. Additional conditions." }
  ],
  realWorldExamples: [
    {
      title: "Weekend Check",
      table: {
        headers: ["Day", "Formula", "Is Weekend?"],
        rows: [
          ["Saturday", "=OR(A2=\"Saturday\", A2=\"Sunday\")", "TRUE"],
          ["Monday", "=OR(A3=\"Saturday\", A3=\"Sunday\")", "FALSE"]
        ]
      },
      explanation: "Since \"Saturday\" matches one of our choices, the result is TRUE."
    }
  ],
  commonMistakes: [
    { title: "Confusing AND/OR", desc: "Remember: AND needs ALL to be true; OR only needs ONE to be true." }
  ],
  proTips: [
    "Like AND, the OR function is best used inside an IF statement.",
    "Use OR when you have multiple valid paths to a single result."
  ],
  miniChallenge: {
    question: "Check if cell A2 is either \"Red\" or \"Blue\".",
    expectedAnswer: "=OR(A2=\"Red\", A2=\"Blue\")"
  },
  practice: {
    instructions: "In cell C2, check if B2 is greater than 100 OR A2 is \"VIP\".",
    initialData: [["Status", "Amount", "Check"], ["VIP", 50, ""]],
    targetCell: [1, 2],
    expectedFormula: "OR(A2=\"VIP\",B2>100)",
    expectedValue: true
  }
};

const lenLesson = {
  id: "len",
  title: "LEN Function",
  category: "text",
  difficulty: "Beginner",
  xp: 100,
  introduction: {
    title: "What is the LEN Function?",
    description: "The LEN function counts the number of characters in a cell, including letters, numbers, spaces, and punctuation.",
    concept: "Think of it as a character counter. If you have a limit on how long a text should be (like a password or ID), LEN helps you check it."
  },
  syntax: "=LEN(text)",
  syntaxBreakdown: [
    { arg: "text", desc: "The cell or text you want to measure." }
  ],
  realWorldExamples: [
    {
      title: "Password Strength",
      table: {
        headers: ["Password", "LEN Formula", "Length"],
        rows: [
          ["Excel123", "=LEN(A2)", "8"],
          ["Abc", "=LEN(A3)", "3"]
        ]
      },
      explanation: "LEN accurately counts every single symbol in the cell."
    }
  ],
  commonMistakes: [
    { title: "Invisible Spaces", desc: "LEN counts spaces too! If your text looks short but LEN gives a high number, check for trailing spaces." }
  ],
  proTips: [
    "LEN is very useful when combined with LEFT, RIGHT, or MID to extract parts of text.",
    "It also counts numbers, even if they aren't formatted as text."
  ],
  miniChallenge: {
    question: "How would you count the characters in cell B5?",
    expectedAnswer: "=LEN(B5)"
  },
  practice: {
    instructions: "In cell B2, use LEN to find the length of the string in A2.",
    initialData: [["Input", "Length"], ["LearnExcel", ""]],
    targetCell: [1, 1],
    expectedFormula: "LEN(A2)",
    expectedValue: 10
  }
};

const trimLesson = {
  id: "trim",
  title: "TRIM Function",
  category: "text",
  difficulty: "Beginner",
  xp: 150,
  introduction: {
    title: "What is the TRIM Function?",
    description: "The TRIM function removes all extra spaces from a text, leaving only single spaces between words.",
    concept: "Use this to clean up messy data. Often, data imported from other systems has hidden spaces at the start or end that break formulas like VLOOKUP."
  },
  syntax: "=TRIM(text)",
  syntaxBreakdown: [
    { arg: "text", desc: "The messy text you want to clean up." }
  ],
  realWorldExamples: [
    {
      title: "Data Cleaning",
      table: {
        headers: ["Dirty Text", "TRIM Formula", "Clean Result"],
        rows: [
          ["  John Doe  ", "=TRIM(A2)", "John Doe"]
        ]
      },
      explanation: "TRIM deletes the spaces at the start and end but keeps the one between \"John\" and \"Doe\"."
    }
  ],
  commonMistakes: [
    { title: "Inner Spaces", desc: "TRIM will NOT remove a single space between words. It only removes extra (double/triple) spaces or leading/trailing ones." }
  ],
  proTips: [
    "Always wrap your VLOOKUP lookup_value in TRIM if you suspect your data is messy.",
    "TRIM is a lifesaver for professional data analysts."
  ],
  miniChallenge: {
    question: "Clean the text in cell A2 which has extra spaces.",
    expectedAnswer: "=TRIM(A2)"
  },
  practice: {
    instructions: "In cell B2, use TRIM to clean the text in A2.",
    initialData: [["Messy", "Clean"], ["  Excel  ", ""]],
    targetCell: [1, 1],
    expectedFormula: "TRIM(A2)",
    expectedValue: "Excel"
  }
};

const concatLesson = {
  id: "concat",
  title: "CONCAT Function",
  category: "text",
  difficulty: "Beginner",
  xp: 100,
  introduction: {
    title: "What is the CONCAT Function?",
    description: "CONCAT combines text from multiple cells or ranges into one single cell. It is the modern version of the CONCATENATE function.",
    concept: "Think of it as \"gluing\" pieces of text together. For example, joining a First Name and Last Name into a Full Name."
  },
  syntax: "=CONCAT(text1, [text2], ...)",
  syntaxBreakdown: [
    { arg: "text1", desc: "The first item to join. Can be text in quotes, a cell reference, or a range." },
    { arg: "text2", desc: "Optional. Additional items to join to the first one." }
  ],
  realWorldExamples: [
    {
      title: "Creating Full Names",
      table: {
        headers: ["First", "Last", "Formula", "Full Name"],
        rows: [
          ["John", "Smith", "=CONCAT(A2, \" \", B2)", "John Smith"]
        ]
      },
      explanation: "We join the first name, a space in quotes, and the last name."
    }
  ],
  commonMistakes: [
    { title: "Missing Spaces", desc: "CONCAT doesn't add spaces automatically. You must add them yourself using \" \"." }
  ],
  proTips: [
    "You can select a whole range like A1:E1 to join everything in those cells at once.",
    "Use the '&' symbol as a shortcut for joining text: =A1 & \" \" & B1."
  ],
  miniChallenge: {
    question: "Join the text in A1 and B1 with a hyphen (-) in between.",
    expectedAnswer: "=CONCAT(A1, \"-\", B1)"
  },
  practice: {
    instructions: "In cell C2, join the First Name in A2 and Last Name in B2 with a space between them.",
    initialData: [["First", "Last", "Full Name"], ["Afeez", "Alimi", ""]],
    targetCell: [1, 2],
    expectedFormula: "CONCAT(A2,\" \",B2)",
    expectedValue: "Afeez Alimi"
  }
};

const sumifLesson = {
  id: "sumif",
  title: "SUMIF Function",
  category: "math",
  difficulty: "Intermediate",
  xp: 250,
  introduction: {
    title: "What is the SUMIF Function?",
    description: "SUMIF adds up numbers in a range that meet a specific condition (criteria). It's like combining SUM and IF.",
    concept: "Use this when you don't want the total of everything, but only for a specific category—like 'Total Sales for Region North' or 'Total Expenses for Food'."
  },
  syntax: "=SUMIF(range, criteria, [sum_range])",
  syntaxBreakdown: [
    { arg: "range", desc: "The cells you want to check against the criteria (e.g., a list of Category names)." },
    { arg: "criteria", desc: "The condition that must be met (e.g., \"Food\" or \">100\")." },
    { arg: "sum_range", desc: "Optional. The actual cells to add. If omitted, Excel adds the cells in the first 'range'." }
  ],
  realWorldExamples: [
    {
      title: "Department Spending",
      table: {
        headers: ["Dept", "Cost", "Criteria", "Result"],
        rows: [
          ["Sales", "500", "Sales", "=SUMIF(A2:A4, \"Sales\", B2:B4)"],
          ["HR", "300", "", "800"],
          ["Sales", "300", "", ""]
        ]
      },
      explanation: "Excel looks for \"Sales\" in column A and adds the corresponding values (500 + 300)."
    }
  ],
  commonMistakes: [
    { title: "Range Mismatch", desc: "The 'range' and 'sum_range' must be the same size. If one has 10 cells, the other must too." }
  ],
  proTips: [
    "You can use wildcards like \"*\" to match partial text (e.g., \"*East*\" matches \"NorthEast\").",
    "For multiple conditions, use SUMIFS."
  ],
  miniChallenge: {
    question: "Sum values in B2:B10 where the category in A2:A10 is \"Revenue\".",
    expectedAnswer: "=SUMIF(A2:A10, \"Revenue\", B2:B10)"
  },
  practice: {
    instructions: "In cell D2, calculate the total cost for \"Fruit\" in the range A2:B4.",
    initialData: [["Type", "Cost", "", "Total Fruit"], ["Fruit", 10, "", ""], ["Meat", 50, "", ""], ["Fruit", 25, "", ""]],
    targetCell: [1, 3],
    expectedFormula: "SUMIF(A2:A4,\"Fruit\",B2:B4)",
    expectedValue: 35
  }
};

const maxLesson = {
  id: "max",
  title: "MAX Function",
  category: "statistical",
  difficulty: "Beginner",
  xp: 100,
  introduction: {
    title: "What is the MAX Function?",
    description: "The MAX function finds the largest (highest) number in a range of cells.",
    concept: "Use this to quickly identify the top performer, the highest price, or the latest date in a long list of data."
  },
  syntax: "=MAX(number1, [number2], ...)",
  syntaxBreakdown: [
    { arg: "number1", desc: "The first number or range you want to check." },
    { arg: "number2", desc: "Optional. More numbers or ranges." }
  ],
  realWorldExamples: [
    {
      title: "Finding Top Sales",
      table: {
        headers: ["Rep", "Sales", "Formula", "Result"],
        rows: [
          ["Alice", "5000", "=MAX(B2:B4)", "9000"],
          ["Bob", "9000", "", ""],
          ["Charlie", "4000", "", ""]
        ]
      },
      explanation: "Excel scans the list and pulls out the biggest value (9,000)."
    }
  ],
  commonMistakes: [
    { title: "Non-Numeric", desc: "MAX ignores text and empty cells. If your range has no numbers, it returns 0." }
  ],
  proTips: [
    "MAX is great for setting limits, like ensuring a calculated value doesn't drop below a certain floor."
  ],
  miniChallenge: {
    question: "Find the highest value in cells C1 through C50.",
    expectedAnswer: "=MAX(C1:C50)"
  },
  practice: {
    instructions: "In cell B5, find the maximum value from B2, B3, and B4.",
    initialData: [["Item", "Value"], ["A", 100], ["B", 500], ["C", 250], ["Max", ""]],
    targetCell: [4, 1],
    expectedFormula: "MAX(B2:B4)",
    expectedValue: 500
  }
};

const minLesson = {
  id: "min",
  title: "MIN Function",
  category: "statistical",
  difficulty: "Beginner",
  xp: 100,
  introduction: {
    title: "What is the MIN Function?",
    description: "The MIN function finds the smallest (lowest) number in a range of cells.",
    concept: "Think of it as the opposite of MAX. It's perfect for finding the cheapest price, the lowest score, or the earliest date."
  },
  syntax: "=MIN(number1, [number2], ...)",
  syntaxBreakdown: [
    { arg: "number1", desc: "The first range or number to check." },
    { arg: "number2", desc: "Optional. More ranges or numbers." }
  ],
  realWorldExamples: [
    {
      title: "Lowest Price",
      table: {
        headers: ["Store", "Price", "Formula", "Result"],
        rows: [
          ["Shop A", "25", "=MIN(B2:B3)", "19"],
          ["Shop B", "19", "", ""]
        ]
      },
      explanation: "Excel identifies that 19 is the smallest number in the list."
    }
  ],
  commonMistakes: [
    { title: "Zeros", desc: "MIN counts 0 as a value. If a cell is 0, MIN will likely pick it as the lowest!" }
  ],
  proTips: [
    "Use MIN to find the earliest deadline in a project schedule."
  ],
  miniChallenge: {
    question: "Find the lowest number in Column A.",
    expectedAnswer: "=MIN(A:A)"
  },
  practice: {
    instructions: "In cell B5, find the minimum value from B2, B3, and B4.",
    initialData: [["Item", "Cost"], ["A", 15], ["B", 8], ["C", 22], ["Min", ""]],
    targetCell: [4, 1],
    expectedFormula: "MIN(B2:B4)",
    expectedValue: 8
  }
};

const iferrorLesson = {
  id: "iferror",
  title: "IFERROR Function",
  category: "logical",
  difficulty: "Intermediate",
  xp: 200,
  introduction: {
    title: "What is the IFERROR Function?",
    description: "IFERROR is a safety net for your formulas. It catches errors like #VALUE!, #DIV/0!, and #REF! and shows a cleaner result instead.",
    concept: "If your formula works, you see the result. If it crashes or has an error, you see the backup text or value you chose."
  },
  syntax: "=IFERROR(value, value_if_error)",
  syntaxBreakdown: [
    { arg: "value", desc: "The formula or cell you want to check for errors." },
    { arg: "value_if_error", desc: "What to show if an error is found (e.g., \"Error in data\", 0, or blank \"\")." }
  ],
  realWorldExamples: [
    {
      title: "Safe Division",
      table: {
        headers: ["Total", "Count", "Formula", "Result"],
        rows: [
          ["100", "0", "=IFERROR(A2/B2, 0)", "0"],
          ["100", "5", "=IFERROR(A3/B3, 0)", "20"]
        ]
      },
      explanation: "Dividing by zero usually causes a #DIV/0! error. IFERROR replaces it with 0 to keep your sheet tidy."
    }
  ],
  commonMistakes: [
    { title: "Hiding real bugs", desc: "Don't use IFERROR to hide errors you should actually fix. Only use it when an error is expected (like division by zero)." }
  ],
  proTips: [
    "Use IFERROR to keep your charts from breaking when data is missing.",
    "Combined with VLOOKUP, it handles missing search items perfectly."
  ],
  miniChallenge: {
    question: "Write a formula to divide A1 by B1 safely. If there is an error, show \"Check Input\".",
    expectedAnswer: "=IFERROR(A1/B1, \"Check Input\")"
  },
  practice: {
    instructions: "In cell C2, use IFERROR to calculate B2/A2. If it results in an error, show 0.",
    initialData: [["A", "B", "Safe Div"], [0, 10, ""]],
    targetCell: [1, 2],
    expectedFormula: "IFERROR(B2/A2, 0)",
    expectedValue: 0
  }
};

const ifnaLesson = {
  id: "ifna",
  title: "IFNA Function",
  category: "logical",
  difficulty: "Intermediate",
  xp: 250,
  introduction: {
    title: "What is the IFNA Function?",
    description: "The IFNA function lets you handle #N/A errors without getting messy errors all over your sheet. It is especially useful with lookup functions like VLOOKUP or XLOOKUP.",
    concept: "It checks a value or formula, and if the result is #N/A, it returns whatever you specify instead. If it’s not #N/A, it returns the original result."
  },
  syntax: "=IFNA(value, value_if_na)",
  syntaxBreakdown: [
    { arg: "value", desc: "The formula or cell you want to check. Usually a VLOOKUP or MATCH." },
    { arg: "value_if_na", desc: "What to show if the result is #N/A. Can be text, 0, or blank \"\"." }
  ],
  realWorldExamples: [
    {
      title: "Cleaner Lookup Reports",
      table: {
        headers: ["Search ID", "VLOOKUP Result", "IFNA Formula", "Final Display"],
        rows: [
          ["105", "#N/A", "=IFNA(B2, \"Not Found\")", "Not Found"],
          ["101", "John Doe", "=IFNA(B3, \"Not Found\")", "John Doe"]
        ]
      },
      explanation: "IFNA replaces the ugly #N/A error with a friendly \"Not Found\" message."
    }
  ],
  commonMistakes: [
    { title: "Using for all errors", desc: "IFNA ONLY catches #N/A errors. If you have a #DIV/0! or #VALUE! error, IFNA will not hide it. Use IFERROR for those." }
  ],
  proTips: [
    "IFNA is faster and more precise than IFERROR when you only care about missing lookup values.",
    "Use it to keep your SUM or AVERAGE calculations from breaking due to missing data."
  ],
  miniChallenge: {
    question: "Write a formula to check cell A2. If it is #N/A, show 0. Otherwise show A2.",
    expectedAnswer: "=IFNA(A2, 0)"
  },
  practice: {
    instructions: "In cell C2, wrap the value from B2 with IFNA to show \"Item Missing\" if B2 is #N/A.",
    initialData: [["ID", "Lookup", "Clean Result"], ["A10", "#N/A", ""]],
    targetCell: [1, 2],
    expectedFormula: "IFNA(B2,\"Item Missing\")",
    expectedValue: "Item Missing"
  }
};

const countaLesson = {
  id: "counta",
  title: "COUNTA Function",
  category: "statistical",
  difficulty: "Beginner",
  xp: 150,
  introduction: {
    title: "What is the COUNTA Function?",
    description: "The COUNTA function counts all cells that are NOT empty. It counts text, numbers, dates, and even errors.",
    concept: "While the regular COUNT only counts numbers, COUNTA counts \"anything\" except empty space. Use this to count names, products, or attendance."
  },
  syntax: "=COUNTA(value1, [value2], ...)",
  syntaxBreakdown: [
    { arg: "value1", desc: "The range or cell you want to check for content." },
    { arg: "value2", desc: "Optional. More ranges to include in the count." }
  ],
  realWorldExamples: [
    {
      title: "Attendance List",
      table: {
        headers: ["Student", "Attended?", "Formula", "Count"],
        rows: [
          ["John", "Yes", "=COUNTA(B2:B3)", "2"],
          ["Mary", "Yes", "", ""]
        ]
      },
      explanation: "Since both cells have text, COUNTA returns 2."
    }
  ],
  commonMistakes: [
    { title: "Invisible Characters", desc: "If a cell looks empty but has a space in it, COUNTA will count it! Use TRIM to fix this." }
  ],
  proTips: [
    "COUNTA is the most versatile counting function for lists of names or categories.",
    "If you want to count only the empty cells, use COUNTBLANK."
  ],
  miniChallenge: {
    question: "Count all non-empty cells in the range A1:A10.",
    expectedAnswer: "=COUNTA(A1:A10)"
  },
  practice: {
    instructions: "In cell B6, count how many students have a status in cells B2 through B5.",
    initialData: [["Student", "Status"], ["John", "Paid"], ["Mary", ""], ["Afeez", "Paid"], ["Kuda", "Pending"], ["Total", ""]],
    targetCell: [5, 1],
    expectedFormula: "COUNTA(B2:B5)",
    expectedValue: 3
  }
};

const leftLesson = {
  id: "left",
  title: "LEFT Function",
  category: "text",
  difficulty: "Beginner",
  xp: 100,
  introduction: {
    title: "What is the LEFT Function?",
    description: "The LEFT function extracts a specific number of characters from the start (left side) of a text string.",
    concept: "Use this when you only need the first few letters or numbers from a cell, like getting an Area Code from a phone number or a First Initial from a name."
  },
  syntax: "=LEFT(text, [num_chars])",
  syntaxBreakdown: [
    { arg: "text", desc: "The cell or text you want to extract from." },
    { arg: "num_chars", desc: "Optional. How many characters you want to pull. If left blank, it defaults to 1." }
  ],
  realWorldExamples: [
    {
      title: "Extracting First Name Initial",
      table: {
        headers: ["Full Name", "LEFT Formula", "Initial"],
        rows: [
          ["Afeez Alimi", "=LEFT(A2, 1)", "A"]
        ]
      },
      explanation: "We tell Excel to look at the name and grab just the 1st character from the left."
    }
  ],
  commonMistakes: [
    { title: "Counting Spaces", desc: "LEFT counts spaces as characters. If your result is empty, you might be grabbing a leading space." }
  ],
  proTips: [
    "Combine LEFT with FIND to extract everything before a specific character like a space or comma.",
    "Great for processing standardized IDs or serial numbers."
  ],
  miniChallenge: {
    question: "Extract the first 3 characters from cell A2.",
    expectedAnswer: "=LEFT(A2, 3)"
  },
  practice: {
    instructions: "In cell B2, extract the first 4 characters of the text in A2.",
    initialData: [["Text", "Result"], ["EXCEL-2024", ""]],
    targetCell: [1, 1],
    expectedFormula: "LEFT(A2,4)",
    expectedValue: "EXCE"
  }
};

const rightLesson = {
  id: "right",
  title: "RIGHT Function",
  category: "text",
  difficulty: "Beginner",
  xp: 100,
  introduction: {
    title: "What is the RIGHT Function?",
    description: "The RIGHT function extracts a specific number of characters from the end (right side) of a text string.",
    concept: "This is the opposite of LEFT. It's perfect for grabbing the last digits of a credit card, the year from a date string, or a file extension."
  },
  syntax: "=RIGHT(text, [num_chars])",
  syntaxBreakdown: [
    { arg: "text", desc: "The text or cell reference to pull from." },
    { arg: "num_chars", desc: "Optional. How many characters to pull from the end. Defaults to 1." }
  ],
  realWorldExamples: [
    {
      title: "Getting Year from String",
      table: {
        headers: ["Date Label", "RIGHT Formula", "Year"],
        rows: [
          ["ID-2023", "=RIGHT(A2, 4)", "2023"]
        ]
      },
      explanation: "Excel counts 4 characters starting from the very end of the text."
    }
  ],
  commonMistakes: [
    { title: "Trailing Spaces", desc: "If there are invisible spaces after your text, RIGHT will grab those instead of the letters you want! Use TRIM first." }
  ],
  proTips: [
    "Use =RIGHT(A1, LEN(A1)-5) to extract everything except the first 5 characters."
  ],
  miniChallenge: {
    question: "Extract the last 2 characters from cell B2.",
    expectedAnswer: "=RIGHT(B2, 2)"
  },
  practice: {
    instructions: "In cell B2, extract the last 2 characters of the serial number in A2.",
    initialData: [["Serial", "End"], ["SKU-99", ""]],
    targetCell: [1, 1],
    expectedFormula: "RIGHT(A2,2)",
    expectedValue: "99"
  }
};

const midLesson = {
  id: "mid",
  title: "MID Function",
  category: "text",
  difficulty: "Intermediate",
  xp: 200,
  introduction: {
    title: "What is the MID Function?",
    description: "The MID function extracts a specific number of characters from the middle of a text string, starting at any position you choose.",
    concept: "Unlike LEFT and RIGHT which start at the edges, MID lets you jump to the 3rd or 10th letter and start grabbing text from there."
  },
  syntax: "=MID(text, start_num, num_chars)",
  syntaxBreakdown: [
    { arg: "text", desc: "The source text." },
    { arg: "start_num", desc: "The position of the first character you want to extract (e.g., 2 for the second letter)." },
    { arg: "num_chars", desc: "How many characters to extract from that starting point." }
  ],
  realWorldExamples: [
    {
      title: "Extracting Middle ID",
      table: {
        headers: ["Full SKU", "MID Formula", "Code"],
        rows: [
          ["AB-123-XY", "=MID(A2, 4, 3)", "123"]
        ]
      },
      explanation: "We start at the 4th character (\"1\") and extract 3 characters total."
    }
  ],
  commonMistakes: [
    { title: "Wrong Start Number", desc: "If your start_num is less than 1, Excel returns an error. If it's longer than the text, it returns blank." }
  ],
  proTips: [
    "MID is the most powerful extraction tool when your data has a consistent internal structure."
  ],
  miniChallenge: {
    question: "Extract 2 characters from cell A1, starting at the 3rd character.",
    expectedAnswer: "=MID(A1, 3, 2)"
  },
  practice: {
    instructions: "In cell B2, extract 3 characters from A2 starting at position 3.",
    initialData: [["Code", "Extract"], ["XX-VIP-01", ""]],
    targetCell: [1, 1],
    expectedFormula: "MID(A2,4,3)",
    expectedValue: "VIP"
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
    { title: "Circular Reference", desc: "Don't include the cell where you are writing the formula in the SUM range. This creates a never-ending loop." },
    { title: "Non-Numeric Data", desc: "SUM ignores text. If your numbers are stored as text, Excel won't add them. Look for the little green triangle in the corner of your cells!" }
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
  sumifLesson,
  averageLesson,
  countLesson,
  countaLesson,
  maxLesson,
  minLesson,
  vlookupLesson,
  ifnaLesson,
  iferrorLesson,
  andLesson,
  orLesson,
  concatLesson,
  lenLesson,
  trimLesson,
  leftLesson,
  rightLesson,
  midLesson,
  ...allFunctions
    .filter(f => !["SUM", "SUMIF", "AVERAGE", "COUNT", "COUNTA", "MAX", "MIN", "VLOOKUP", "IF", "IFNA", "IFERROR", "AND", "OR", "CONCAT", "LEN", "TRIM", "LEFT", "RIGHT", "MID"].includes(f.n))
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
