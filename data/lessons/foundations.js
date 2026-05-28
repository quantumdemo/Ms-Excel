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
      { arg: "Mixed ($A1 or A$1)", desc: "Locks only the Column ($A) or only the Row ($1). Used in advanced matrix tables." }
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
  }
];
