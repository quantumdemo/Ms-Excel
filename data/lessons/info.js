export const infoLessons = [
  {
    id: "isblank",
    title: "ISBLANK Function",
    category: "info",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Checking for Voids: ISBLANK",
      description: "The ISBLANK function checks whether a cell is completely empty. It returns TRUE if the cell is empty and FALSE if it contains any data at all.",
      concept: "Think of it as an 'Empty Box' detector. It doesn't care what is in the box; it only cares if the box is empty. Even a space or a zero makes the box 'not empty'."
    },
    internalLogic: "Excel looks at the memory address of the cell. If the cell contains no value, no formula, and no invisible characters, Excel returns TRUE. If there is even a formula that results in an empty string (\"\"), ISBLANK will return FALSE because the cell 'contains' a formula.",
    whyItExists: "Data entry is messy. We need a reliable way to find out which parts of our spreadsheet are missing information so we can flag them for completion or avoid errors in calculations.",
    whenToUse: "Use ISBLANK when you want to trigger an action only when a cell has been left untouched. It's perfect for data-entry checklists.",
    realWorldUseCases: [
      "Identifying missing contact information in a mailing list.",
      "Preventing formulas from calculating until all inputs are provided.",
      "Creating conditional formatting that highlights empty required fields."
    ],
    businessExample: {
      scenario: "An HR coordinator wants to highlight rows where an employee hasn't entered their 'Emergency Contact' yet.",
      formula: "=IF(ISBLANK(B2), \"Missing Info\", \"OK\")"
    },
    syntax: "=ISBLANK(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The cell reference or value you want to check (usually a single cell like A1)." }
    ],
    detailedExamples: [
      {
        title: "Example: The 'Ghost' Space",
        table: {
          headers: ["Cell Content", "Formula", "Result", "Reason"],
          rows: [
            ["(Totally Empty)", "=ISBLANK(A2)", "TRUE", "Cell is truly empty."],
            [" ", "=ISBLANK(A3)", "FALSE", "Contains a space character."],
            ["0", "=ISBLANK(A4)", "FALSE", "Zero is a value."],
            ["=\"\"", "=ISBLANK(A5)", "FALSE", "Contains a formula."]
          ]
        },
        stepByStep: [
          "Excel checks cell A3.",
          "It finds a 'space' character inside.",
          "Because a space is data, the cell is not empty.",
          "ISBLANK returns FALSE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Expecting TRUE for empty strings.", desc: "If a formula returns \"\", ISBLANK returns FALSE. Use A1=\"\" instead to catch both truly empty cells and empty-looking formulas." }
    ],
    limitations: "It cannot check a range of cells at once (like ISBLANK(A1:A10)). It only checks the first cell or returns an array in newer Excel versions.",
    bestPractices: [
      "Combine with IF to create helpful user prompts like 'Please Enter Date'."
    ],
    proTips: [
      "Use =NOT(ISBLANK(A1)) to check if a cell contains any information."
    ],
    relatedFunctions: ["ISTEXT", "ISNUMBER", "ISNONTEXT"],
    miniChallenge: {
      question: "If cell A1 contains a single space, what will =ISBLANK(A1) return?",
      expectedAnswer: "FALSE"
    },
    practice: {
      instructions: "In cell B2, use ISBLANK to check if cell A2 is empty.",
      initialData: [["Data", "Is Empty?"], ["", ""]],
      targetCell: [1, 1],
      expectedFormula: "ISBLANK(A2)",
      expectedValue: true
    }
  },
  {
    id: "isnumber",
    title: "ISNUMBER Function",
    category: "info",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Identifying Digits: ISNUMBER",
      description: "The ISNUMBER function checks if a value is a number. It returns TRUE for numbers and FALSE for everything else (text, errors, or blanks).",
      concept: "Think of it as a 'Number Guard'. It ensures that the data you are about to use in a math formula is actually a number, preventing those annoying #VALUE! errors."
    },
    internalLogic: "Excel checks the data type of the value. In Excel, Dates and Times are also stored as numbers, so ISNUMBER will return TRUE for them too. It returns FALSE for 'Numbers stored as text' (like '123' with an apostrophe).",
    whyItExists: "Computers are picky. You can't multiply 'Apple' by 5. ISNUMBER helps you verify that your data is ready for math before you try to calculate it.",
    whenToUse: "Use ISNUMBER when you are importing data from other systems that might mix numbers and text, or when you want to check if a FIND or SEARCH function found a match.",
    realWorldUseCases: [
      "Verifying that a 'Zip Code' column contains only numbers.",
      "Checking if a SEARCH function was successful (SEARCH returns a number if found).",
      "Filtering out non-numeric entries in a financial report."
    ],
    businessExample: {
      scenario: "A warehouse manager wants to check if a 'Serial Number' was typed correctly as a number or mistakenly as text.",
      formula: "=IF(ISNUMBER(A2), \"Valid\", \"Error: Text Detected\")"
    },
    syntax: "=ISNUMBER(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value or cell reference you want to check." }
    ],
    detailedExamples: [
      {
        title: "Example: Dates and Text",
        table: {
          headers: ["Value", "Formula", "Result", "Reason"],
          rows: [
            ["123", "=ISNUMBER(A2)", "TRUE", "Standard number."],
            ["01/01/2024", "=ISNUMBER(A3)", "TRUE", "Dates are numbers in Excel."],
            ["'123", "=ISNUMBER(A4)", "FALSE", "Text-formatted number."],
            ["#N/A", "=ISNUMBER(A5)", "FALSE", "Errors are not numbers."]
          ]
        },
        stepByStep: [
          "Excel looks at the value in A3 (a date).",
          "Internally, Excel sees the number 45292.",
          "Since 45292 is a number, ISNUMBER returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing text-numbers.", desc: "If a number is aligned to the left, it's probably text. ISNUMBER will return FALSE. Use VALUE(A1) to convert it back to a number." }
    ],
    limitations: "Returns TRUE for dates, which can be confusing if you only want 'actual' numbers.",
    bestPractices: [
      "Use ISNUMBER with SEARCH: =ISNUMBER(SEARCH(\"keyword\", A1)) is the standard way to check if text contains a specific word."
    ],
    proTips: [
      "ISNUMBER is often faster than using error-checking functions when combined with lookup logic."
    ],
    relatedFunctions: ["ISTEXT", "ISNONTEXT", "ISERROR"],
    miniChallenge: {
      question: "Will =ISNUMBER(\"123\") return TRUE or FALSE?",
      expectedAnswer: "FALSE"
    },
    practice: {
      instructions: "In cell B2, check if the value in A2 is a number.",
      initialData: [["Value", "Check"], [150, ""]],
      targetCell: [1, 1],
      expectedFormula: "ISNUMBER(A2)",
      expectedValue: true
    }
  },
  {
    id: "istext",
    title: "ISTEXT Function",
    category: "info",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Detecting Words: ISTEXT",
      description: "The ISTEXT function checks if a value is text. It returns TRUE for any text string and FALSE for numbers, blanks, or errors.",
      concept: "The opposite of ISNUMBER. It's like a 'Word Detector'. It flags anything that is handled as a string of characters rather than a numeric value."
    },
    internalLogic: "Excel evaluates the data type of the cell. Anything inside quotes or formatted as text triggers a TRUE. Note that an empty string (\"\") produced by a formula is considered text.",
    whyItExists: "When building dashboards, you often need to separate labels from data. ISTEXT helps you identify where headers or notes have been placed in data columns.",
    whenToUse: "Use ISTEXT to validate that a 'Name' or 'Notes' field actually contains text, or to identify 'Numbers stored as text' that need fixing.",
    realWorldUseCases: [
      "Checking if an 'Employee Name' field contains text.",
      "Finding numbers that have been accidentally formatted as text (which prevents math).",
      "Identifying cells that contain formula-generated text messages."
    ],
    businessExample: {
      scenario: "An analyst wants to count how many rows in a 'Comments' column actually have text written in them.",
      formula: "=IF(ISTEXT(A2), \"Has Comment\", \"Empty\")"
    },
    syntax: "=ISTEXT(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The cell or value to check." }
    ],
    detailedExamples: [
      {
        title: "Example: Text vs Numbers",
        table: {
          headers: ["Value", "Formula", "Result", "Reason"],
          rows: [
            ["Hello", "=ISTEXT(A2)", "TRUE", "Standard text."],
            ["123", "=ISTEXT(A3)", "FALSE", "This is a number."],
            ["'456", "=ISTEXT(A4)", "TRUE", "Apostrophe makes it text."]
          ]
        },
        stepByStep: [
          "Excel looks at A4.",
          "Because of the leading apostrophe, the value is stored as a string.",
          "ISTEXT returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Blanks are not text.", desc: "ISBLANK(A1) is TRUE for empty cells, but ISTEXT(A1) is FALSE. Empty is its own type." }
    ],
    proTips: [
      "Use ISTEXT to find those annoying 'Numbers stored as text' that are breaking your SUM formulas."
    ],
    relatedFunctions: ["ISNONTEXT", "ISNUMBER", "ISBLANK"],
    miniChallenge: {
      question: "Does ISTEXT return TRUE for a cell containing the formula =\"\"?",
      expectedAnswer: "TRUE"
    },
    practice: {
      instructions: "In cell B2, check if the value in A2 is text.",
      initialData: [["Data", "Check"], ["Invoice #101", ""]],
      targetCell: [1, 1],
      expectedFormula: "ISTEXT(A2)",
      expectedValue: true
    }
  },
  {
    id: "iserror",
    title: "ISERROR Function",
    category: "info",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Universal Error Check: ISERROR",
      description: "The ISERROR function checks if a value results in any Excel error. It returns TRUE for #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, or #NULL!.",
      concept: "Think of it as a 'Smoke Detector'. If any part of a formula catches fire and breaks, ISERROR rings the bell. It is the most comprehensive way to check for mistakes."
    },
    internalLogic: "Excel evaluates the input. If the underlying value is any of the 7 standard error types, it returns TRUE. If the result is valid data (including blanks), it returns FALSE.",
    whyItExists: "Complex spreadsheets often have 'cascading' errors—one mistake in cell A1 causes errors in 50 other cells. ISERROR allows you to catch the first error and stop it from spreading.",
    whenToUse: "Use ISERROR when you want to handle ANY kind of problem in a cell. It's the ultimate safety net for your formulas.",
    realWorldUseCases: [
      "Checking if a complex engineering formula is valid.",
      "Hiding errors in client-facing reports (using IF and ISERROR).",
      "Creating a 'Dashboard Health' check that flags any broken formulas in the workbook."
    ],
    businessExample: {
      scenario: "A financial report has many divisions. If any division has a math error, the total shows an error. The user wants to flag the error rows.",
      formula: "=IF(ISERROR(A2), \"Fix This!\", A2)"
    },
    syntax: "=ISERROR(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The formula or cell reference you want to check for errors." }
    ],
    detailedExamples: [
      {
        title: "Example: Catching Any Error",
        table: {
          headers: ["Problem", "Error Type", "Formula", "Result"],
          rows: [
            ["1/0", "#DIV/0!", "=ISERROR(A2)", "TRUE"],
            ["Missing VLOOKUP", "#N/A", "=ISERROR(A3)", "TRUE"],
            ["Broken Reference", "#REF!", "=ISERROR(A4)", "TRUE"]
          ]
        },
        stepByStep: [
          "Excel tries to calculate 1 divided by 0.",
          "It produces a #DIV/0! error.",
          "ISERROR sees the error and returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using ISERROR instead of ISERR.", desc: "If you want to catch all errors EXCEPT #N/A, use ISERR. ISERROR catches everything." }
    ],
    limitations: "It doesn't tell you WHICH error occurred, just that there is one.",
    bestPractices: [
      "Use IFERROR instead of IF(ISERROR(...)) in modern Excel. It's shorter and faster."
    ],
    proTips: [
      "Combine ISERROR with NOT to find only 'Clean' data."
    ],
    relatedFunctions: ["ISERR", "ISNA", "IFERROR", "IFNA"],
    miniChallenge: {
      question: "Which function catches #N/A errors: ISERROR, ISERR, or both?",
      expectedAnswer: "ISERROR"
    },
    practice: {
      instructions: "In cell B2, check if the formula in A2 results in an error.",
      initialData: [["Formula", "Check"], ["#REF!", ""]],
      targetCell: [1, 1],
      expectedFormula: "ISERROR(A2)",
      expectedValue: true
    }
  },
  {
    id: "isna",
    title: "ISNA Function",
    category: "info",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Missing Data Check: ISNA",
      description: "The ISNA function specifically checks for the #N/A (Not Available) error. It returns TRUE only for #N/A and FALSE for all other values, including other errors.",
      concept: "Think of it as a 'Missing Item' locator. In lookup functions, #N/A usually means 'I looked, but I couldn't find that specific item'. ISNA helps you handle that specific scenario."
    },
    internalLogic: "Excel checks the error code. If it is exactly error code 7 (#N/A), it returns TRUE. This makes it more precise than ISERROR.",
    whyItExists: "In a database, a #VALUE! error means your formula is broken, but a #N/A error might just mean a customer is new and isn't in the list yet. We need ISNA to treat 'Missing Data' differently from 'Broken Formulas'.",
    whenToUse: "Always use ISNA when working with VLOOKUP, HLOOKUP, MATCH, or XLOOKUP to identify items not found in your tables.",
    realWorldUseCases: [
      "Finding products that are missing from a price list.",
      "Identifying new employees who haven't been assigned an ID yet.",
      "Filtering out #N/A results in a large data reconciliation project."
    ],
    businessExample: {
      scenario: "A pricing tool looks up discounts. If a customer doesn't have a discount (#N/A), it should just say 'Standard Price'.",
      formula: "=IF(ISNA(VLOOKUP(A2, Discounts, 2, 0)), \"Standard\", \"Discounted\")"
    },
    syntax: "=ISNA(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value or formula result you want to check for #N/A." }
    ],
    detailedExamples: [
      {
        title: "Example: Precision Checking",
        table: {
          headers: ["Value", "ISNA Result", "ISERROR Result", "Reason"],
          rows: [
            ["#N/A", "TRUE", "TRUE", "Both catch #N/A."],
            ["#DIV/0!", "FALSE", "TRUE", "ISNA only catches #N/A."]
          ]
        },
        stepByStep: [
          "Excel checks cell A3 (#DIV/0!).",
          "Is it #N/A? No.",
          "ISNA returns FALSE because this is a math error, not a 'missing data' error."
        ]
      }
    ],
    commonMistakes: [
      { title: "Trying to catch #REF! errors.", desc: "ISNA will ignore #REF!. Use ISERROR if you want to catch both." }
    ],
    bestPractices: [
      "Use IFNA for simple replacements, and IF(ISNA(...)) for more complex logical paths."
    ],
    relatedFunctions: ["ISERROR", "ISERR", "IFNA", "VLOOKUP"],
    miniChallenge: {
      question: "Does ISNA return TRUE for a #VALUE! error?",
      expectedAnswer: "FALSE"
    },
    practice: {
      instructions: "In cell B2, check if A2 contains an #N/A error.",
      initialData: [["Result", "Check"], ["#N/A", ""]],
      targetCell: [1, 1],
      expectedFormula: "ISNA(A2)",
      expectedValue: true
    }
  },
  {
    id: "iseven",
    title: "ISEVEN Function",
    category: "info",
    difficulty: "Beginner",
    xp: 50,
    introduction: {
      title: "The Parity Check: ISEVEN",
      description: "The ISEVEN function checks if a number is even. It returns TRUE if the number is even and FALSE if it is odd.",
      concept: "Think of it as a 'Pairs' detector. If you can divide a number by 2 with no remainder, it is Even."
    },
    internalLogic: "Excel truncates (cuts off) any decimals from the number first. It then checks if the resulting integer is divisible by 2. Zero (0) is considered an even number.",
    whyItExists: "Often used in spreadsheets for visual formatting (like shading every other row) or for logic that depends on 'pairs' of items.",
    whenToUse: "Use ISEVEN for alternating row colors, scheduling (every other week), or simple mathematical filtering.",
    realWorldUseCases: [
      "Creating 'Zebra Stripes' in a table (Row 2, 4, 6...).",
      "Scheduling tasks on even-numbered days of the month.",
      "Splitting a list into two equal groups based on ID numbers."
    ],
    businessExample: {
      scenario: "A teacher wants to assign 'Group A' to students with even ID numbers.",
      formula: "=IF(ISEVEN(A2), \"Group A\", \"Group B\")"
    },
    syntax: "=ISEVEN(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value you want to test. If it has decimals, Excel ignores them." }
    ],
    detailedExamples: [
      {
        title: "Example: Numbers and Decimals",
        table: {
          headers: ["Value", "Formula", "Result", "Reason"],
          rows: [
            ["2", "=ISEVEN(2)", "TRUE", "Even number."],
            ["3", "=ISEVEN(3)", "FALSE", "Odd number."],
            ["2.9", "=ISEVEN(2.9)", "TRUE", "Truncates to 2, which is even."]
          ]
        },
        stepByStep: [
          "Excel looks at 2.9.",
          "It ignores the .9 and looks at the 2.",
          "Since 2 is even, it returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using on text.", desc: "ISEVEN will return #VALUE! if you point it at a cell containing text. Use ISNUMBER first if your data is messy." }
    ],
    proTips: [
      "In Conditional Formatting, use =ISEVEN(ROW()) to color every second row automatically."
    ],
    relatedFunctions: ["ISODD", "MOD", "ROW"],
    miniChallenge: {
      question: "Is zero (0) considered even or odd by the ISEVEN function?",
      expectedAnswer: "Even"
    },
    practice: {
      instructions: "In cell B2, check if the number in A2 is even.",
      initialData: [["Number", "Check"], [42, ""]],
      targetCell: [1, 1],
      expectedFormula: "ISEVEN(A2)",
      expectedValue: true
    }
  },
  {
    id: "isodd",
    title: "ISODD Function",
    category: "info",
    difficulty: "Beginner",
    xp: 50,
    introduction: {
      title: "The Remainder Check: ISODD",
      description: "The ISODD function checks if a number is odd. It returns TRUE for odd numbers and FALSE for even numbers.",
      concept: "The twin brother of ISEVEN. It flags any number that has a 'leftover' 1 when you try to divide it by 2."
    },
    internalLogic: "Excel truncates any decimals and then checks if the integer is not divisible by 2.",
    whyItExists: "Complementary to ISEVEN, used for alternating logic and mathematical grouping.",
    syntax: "=ISODD(number)",
    detailedExamples: [
      {
        title: "Odd Numbers",
        table: {
          headers: ["Value", "Formula", "Result"],
          rows: [
            ["1", "=ISODD(1)", "TRUE"],
            ["2", "=ISODD(2)", "FALSE"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Non-numeric input.", desc: "Pointing ISODD at a cell containing text will result in a #VALUE! error. Ensure the cell contains a number." },
      { title: "Confusion with decimals.", desc: "ISODD truncates decimals. =ISODD(1.9) returns TRUE because it only looks at the integer 1. Don't use it if you need precise decimal parity." }
    ],
    relatedFunctions: ["ISEVEN", "MOD"],
    miniChallenge: {
      question: "What does =ISODD(3.7) return?",
      expectedAnswer: "TRUE"
    },
    practice: {
      instructions: "In cell B2, check if the number in A2 is odd.",
      initialData: [["Number", "Check"], [13, ""]],
      targetCell: [1, 1],
      expectedFormula: "ISODD(A2)",
      expectedValue: true
    }
  }
];
