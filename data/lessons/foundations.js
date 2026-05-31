export const foundationLessons = [
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
    internalLogic: "Excel operates on a massive grid. When you enter data, Excel stores it in a coordinate-based system. Formulas then access these coordinates to perform calculations in real-time.",
    whyItExists: "Before Excel, data was calculated by hand or with physical ledgers. Excel was created to automate math, ensure accuracy, and allow users to model 'What-If' scenarios instantly.",
    whenToUse: "Use Excel for any task involving lists, math, financial tracking, or data organization. If you need to store and calculate information, Excel is the tool.",
    realWorldUseCases: [
      "Tracking daily sales in a shop.",
      "Managing a personal monthly budget.",
      "Creating a list of clients and contact info.",
      "Analyzing business performance over time."
    ],
    syntax: "N/A",
    syntaxBreakdown: [
      { arg: "Columns", desc: "Vertical blocks identified by letters (A, B, C...)" },
      { arg: "Rows", desc: "Horizontal blocks identified by numbers (1, 2, 3...)" },
      { arg: "Cells", desc: "The meeting point of a Row and Column (e.g., B2)" }
    ],
    detailedExamples: [
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
    },
    sandboxData: [
      ["Columns", "A", "B", "C"],
      ["Row 1", "A1", "B1", "C1"],
      ["Row 2", "A2", "B2", "C2"],
      ["Row 3", "A3", "B3", "C3"]
    ]
  },
  {
    id: "cell-referencing",
    title: "Cell Referencing",
    category: "foundations",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "The Heart of Excel: Cell Referencing",
      description: "Cell referencing means using a cell's address (like A1) in a formula instead of typing actual values directly. This makes your work dynamic and professional.",
      concept: "Instead of writing =50+20, you write =A1+B1. If you change the numbers in A1 or B1 later, the result updates automatically. You don't have to rewrite the formula!"
    },
    internalLogic: "When you reference a cell, Excel 'points' to that memory location. Any time the value in that location changes, Excel triggers a recalculation for every formula pointing to it.",
    whyItExists: "Referencing allows you to build a template once and reuse it forever. It separates your data from your logic.",
    whenToUse: "Always use cell references. Never 'hard-code' (type) numbers directly into a formula if those numbers already exist in your spreadsheet.",
    realWorldUseCases: [
      "Applying a single tax rate to 100 different product prices.",
      "Totaling sales for different months using the same 'SUM' formula.",
      "Creating financial models where changing one 'Interest Rate' cell updates the whole report."
    ],
    syntax: "A1, $A$1, $A1, A$1",
    syntaxBreakdown: [
      { arg: "Relative (A1)", desc: "The default. Changes automatically when you copy the formula to other cells. Excel thinks 'one cell to the left'." },
      { arg: "Absolute ($A$1)", desc: "The 'Lock'. Does NOT change when copied. The $ signs lock the column and row." },
      { arg: "Mixed ($A1 or A$1)", desc: "Locks only the Column ($A) or only the Row (₦1). Used in advanced matrix tables." }
    ],
    detailedExamples: [
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
      { title: "Forgetting $ Signs", desc: "If you don't lock a cell that should stay constant, your calculations will 'slide' and break when copied." },
      { title: "Locking Everything", desc: "Only use Absolute references when a value MUST stay fixed. Over-locking makes formulas impossible to copy/fill." }
    ],
    proTips: [
      "Press F4 (or Fn+F4) while editing a formula to quickly cycle between A1 -> $A$1 -> A$1 -> $A1.",
      "Mastering referencing is the 'Secret Sauce' that separates beginners from Excel pros."
    ],
    relatedFunctions: ["SUM", "VLOOKUP", "INDEX"],
    comparison: "Relative is like following directions: 'walk two blocks'. Absolute is like giving an address: 'Meet at 123 Main St'.",
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
    },
    sandboxData: [
      ["Item", "Price", "Tax (5%)", "Total"],
      ["Phone", 500, "=B2*0.05", "=B2+C2"],
      ["Laptop", 1200, "=B3*0.05", "=B3+C3"],
      ["Tablet", 300, "=B4*0.05", "=B4+C4"]
    ]
  },
  {
    id: "excel-errors",
    title: "Excel Error Types",
    category: "foundations",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "Understanding What Excel Is Telling You",
      description: "Errors in Excel are not just annoyances, they are diagnostic messages. Each error type tells you something specific about what went wrong.",
      concept: "Learning to read them is like learning to read a car's dashboard warning lights. Think of errors as Excel's way of saying 'I tried to do what you asked, but here's why I couldn't.'"
    },
    internalLogic: "When Excel encounters a calculation it cannot complete (like dividing by zero or referring to a deleted cell), it stops the process and returns a specific error code instead of a value.",
    whyItExists: "Without specific error types, you wouldn't know if a formula failed because of a typo, a missing file, or a math impossibility. Errors help you debug your work.",
    whenToUse: "You don't 'use' errors intentionally, but you must learn to recognize them to fix your spreadsheets effectively.",
    realWorldUseCases: [
      "#DIV/0! when calculating averages for data that hasn't been entered yet.",
      "#N/A when a product ID doesn't exist in your price list.",
      "#REF! after deleting a sheet that was used in a summary report.",
      "#NAME? when you accidentally type '=SUMM' instead of '=SUM'."
    ],
    syntax: "#DIV/0!, #N/A, #VALUE!, #REF!, #NAME?, #NUM!, #NULL!, #SPILL!, #CALC!, #GETTING_DATA",
    syntaxBreakdown: [
      { arg: "#DIV/0!", desc: "Division by zero. The divisor cell is 0 or blank." },
      { arg: "#N/A", desc: "Value not available. Classic lookup failure (VLOOKUP/XLOOKUP)." },
      { arg: "#VALUE!", desc: "Wrong type of argument (e.g., adding a number to text)." },
      { arg: "#REF!", desc: "Invalid reference. A cell or sheet used in the formula was deleted." },
      { arg: "#NAME?", desc: "Unrecognised text. Usually a typo in a function name or missing quotes." },
      { arg: "#NUM!", desc: "#NUM! error. Formula produces a number too large or impossible." },
      { arg: "#NULL!", desc: "No intersection. Ranges in the formula do not overlap (often an accidental space)." }
    ],
    detailedExamples: [
      {
        title: "Example 1: #DIV/0! — Division by Zero",
        table: {
          headers: ["Revenue", "Units", "Formula", "Result"],
          rows: [
            ["₦5,000", "0", "=A2/B2", "#DIV/0!"],
            ["₦5,000", "(blank)", "=A3/B3", "#DIV/0!"]
          ]
        },
        stepByStep: [
          "Excel tries to divide the revenue by the number of units.",
          "Since units is 0 or blank, the calculation is mathematically impossible.",
          "Excel returns #DIV/0! to warn you that the divisor is missing or zero."
        ],
        explanation: "Fix by using =IF(B2=0, \"N/A\", A2/B2) or =IFERROR(A2/B2, \"N/A\")."
      },
      {
        title: "Example 2: #N/A — Value Not Available",
        table: {
          headers: ["ID", "Name", "Lookup ID", "Result"],
          rows: [
            ["101", "Alice", "999", "#N/A"],
            ["102", "Ben", "", ""]
          ]
        },
        stepByStep: [
          "A VLOOKUP or XLOOKUP searches for ID 999 in the list.",
          "ID 999 does not exist in the source data.",
          "Excel returns #N/A because the requested value is 'Not Available'."
        ],
        explanation: "Fix by verifying data or using =IFNA(VLOOKUP(...), \"Not found\")."
      },
      {
        title: "Example 3: #VALUE! — Wrong Argument Type",
        table: {
          headers: ["A", "B", "Formula", "Result"],
          rows: [
            ["10", "ABC", "=A2 + B2", "#VALUE!"],
            ["10", "\" 20 \"", "=A3 * B3", "#VALUE!"]
          ]
        },
        stepByStep: [
          "The formula tries to perform math on a text string ('ABC').",
          "Excel cannot add a number to text.",
          "Excel returns #VALUE! because one of the arguments is the wrong data type."
        ],
        explanation: "Fix by using VALUE() function or cleaning text with TRIM() and CLEAN()."
      },
      {
        title: "Example 4: #REF! — Invalid Reference",
        table: {
          headers: ["Item", "Price", "Formula", "Result"],
          rows: [
            ["Phone", "₦500", "=SUM(#REF!)", "#REF!"]
          ]
        },
        stepByStep: [
          "The formula originally pointed to a range (e.g., A1:A5).",
          "The rows or columns in that range were deleted.",
          "The reference is now broken, so Excel returns #REF!."
        ],
        explanation: "Undo immediately or rebuild the formula pointing to the new correct range."
      },
      {
        title: "Example 5: #NAME? — Unrecognised Text",
        table: {
          headers: ["Scenario", "Formula", "Error", "Fix"],
          rows: [
            ["Misspelling", "=SUMM(A1:A10)", "#NAME?", "=SUM(A1:A10)"],
            ["Missing Quotes", "=IF(A1=Yes, 1, 0)", "#NAME?", "=IF(A1=\"Yes\", 1, 0)"]
          ]
        },
        explanation: "This usually happens due to a typo in a function name or forgetting quotes around text."
      },
      {
        title: "Example 6: #NUM! — Invalid Number",
        table: {
          headers: ["Formula", "Result", "Why"],
          rows: [
            ["=SQRT(-9)", "#NUM!", "Negative square root"],
            ["=FACT(171)", "#NUM!", "Exceeds Excel's limit"],
            ["=RATE(1000, -100, 1000)", "#NUM!", "Formula can't converge"]
          ]
        },
        explanation: "The result is either too large, too small, or mathematically impossible for Excel to handle."
      },
      {
        title: "Modern Errors (365/2021+)",
        table: {
          headers: ["Error", "Meaning", "Common Cause"],
          rows: [
            ["#SPILL!", "Spill range blocked", "Something is in the way of a dynamic array output."],
            ["#CALC!", "Calculation error", "FILTER found no matches or LAMBDA missing args."],
            ["#NULL!", "No intersection", "Using a space instead of a comma between ranges."],
            ["#GETTING_DATA", "Data retrieving", "A linked data type (like Stocks) is still loading."]
          ]
        }
      },
      {
        title: "Error Handling Functions",
        table: {
          headers: ["Function", "Purpose", "Example"],
          rows: [
            ["IFERROR", "Catches any error", "=IFERROR(A1/B1, \"Error\")"],
            ["IFNA", "Catches only #N/A", "=IFNA(VLOOKUP(...), \"Not found\")"],
            ["ISERROR", "TRUE if any error", "=ISERROR(A1)"],
            ["ISERR", "TRUE if any error except #N/A", "=ISERR(A1)"],
            ["ISNA", "TRUE if #N/A", "=ISNA(A1)"]
          ]
        }
      },
      {
        title: "Error Auditing Tools",
        table: {
          headers: ["Tool", "Tab", "Purpose"],
          rows: [
            ["Trace Precedents", "Formulas", "Arrows showing which cells feed into the formula."],
            ["Trace Dependents", "Formulas", "Arrows showing which cells depend on this cell."],
            ["Error Checking", "Formulas", "Walks through each error on the sheet."],
            ["Evaluate Formula", "Formulas", "Steps through a formula part by part."],
            ["Watch Window", "Formulas", "Monitor cell values while working elsewhere."]
          ]
        }
      },
      {
        title: "Error Type Codes (for ERROR.TYPE function)",
        table: {
          headers: ["Error", "Code"],
          rows: [
            ["#NULL!", "1"],
            ["#DIV/0!", "2"],
            ["#VALUE!", "3"],
            ["#REF!", "4"],
            ["#NAME?", "5"],
            ["#NUM!", "6"],
            ["#N/A", "7"],
            ["#GETTING_DATA", "8"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Hiding all errors.", desc: "Using IFERROR to hide everything can mask serious bugs. Use IFNA for lookups instead." },
      { title: "Hard-deleting cells.", desc: "Deleting rows/columns causes #REF!. Clear the contents or use 'Cut' instead." }
    ],
    bestPractices: [
      "Use Trace Precedents/Dependents (Formulas tab) to see which cells feed into a broken formula.",
      "Use 'Evaluate Formula' to step through a calculation part by part.",
      "Build in error checks: =IF(ISERROR(A1), \"CHECK DATA\", A1) for critical dashboard values."
    ],
    proTips: [
      "When debugging, work from the inside out. Break nested functions into helper columns.",
      "#N/A on purpose — sometimes you want #N/A for charts (they skip #N/A points). Use =NA().",
      "Green triangles in the cell corner are Excel's way of offering a fix. Click them for suggestions."
    ],
    relatedFunctions: ["IFERROR", "IFNA", "ISERROR", "ERROR.TYPE"],
    miniChallenge: {
      question: "Which function specifically catches only the #N/A error?",
      expectedAnswer: "IFNA"
    },
    practice: {
      instructions: "In cell C2, write a formula to divide Revenue (A2) by Units (B2). It will result in an error because B2 is 0.",
      initialData: [["Revenue", "Units", "Result"], [5000, 0, ""]],
      targetCell: [1, 2],
      expectedFormula: "A2/B2",
      expectedValue: "#DIV/0!"
    }
  }
];
