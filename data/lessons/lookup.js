export const lookupLessons = [
  {
    id: "address",
    title: "Build a Cell Reference as Text: ADDRESS Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Build a Cell Reference as Text: ADDRESS Function",
      description: "The ADDRESS function returns a cell address as a text string, based on a given row and column number. You can control the reference type (absolute, relative, mixed) and optionally include the sheet name.",
      concept: "Think of it as a cell reference factory: feed it coordinates, and it tells you the address like 'Sheet1!$B$5'."
    },
    syntax: "=ADDRESS(row_num, column_num, [abs_num], [a1], [sheet_text])",
    syntaxBreakdown: [
      { arg: "row_num", desc: "The row number." },
      { arg: "column_num", desc: "The column number." },
      { arg: "abs_num", desc: "Optional. 1=absolute (default), 2=row absolute/col relative, 3=row relative/col absolute, 4=relative." },
      { arg: "a1", desc: "Optional. TRUE for A1 style (default), FALSE for R1C1 style." },
      { arg: "sheet_text", desc: "Optional. Sheet name to prepend, in quotes." }
    ],
    detailedExamples: [
      {
        title: "Example: Finding a Cell Reference Dynamically",
        table: {
          headers: ["Metric", "Value"],
          rows: [
            ["Max Value Row", "12"],
            ["Max Value Column", "3"],
            ["Address", "=ADDRESS(12, 3, 1, TRUE, \"Sales\")"]
          ]
        },
        stepByStep: [
          "Row 12, column 3 (column C).",
          "abs_num = 1 gives absolute reference ($C$12).",
          "A1 style returns 'C$12' with sheet 'Sales' prepended: 'Sales!$C$12'."
        ]
      },
      {
        title: "Reference Type Variations (Row 5, Col 2)",
        table: {
          headers: ["abs_num", "Formula", "Result"],
          rows: [
            ["1", "=ADDRESS(5, 2, 1)", "$B$5"],
            ["2", "=ADDRESS(5, 2, 2)", "B$5"],
            ["3", "=ADDRESS(5, 2, 3)", "$B5"],
            ["4", "=ADDRESS(5, 2, 4)", "B5"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Column_num as letter.", desc: "Column_num must be a number, not a letter. Use 2 for column B, not \"B\"." },
      { title: "Text result.", desc: "ADDRESS returns text, not a usable reference. To use it in calculations, wrap it with INDIRECT." }
    ],
    proTips: [
      "ADDRESS pairs powerfully with MATCH to create dynamic range references.",
      "Use with INDIRECT for flexible lookups: =INDIRECT(ADDRESS(row, col))."
    ],
    relatedFunctions: ["INDIRECT", "MATCH", "ROW", "COLUMN"],
    miniChallenge: {
      question: "What does =ADDRESS(1, 1) return?",
      expectedAnswer: "$A$1"
    },
    practice: {
      instructions: "In cell B2, use ADDRESS to get the absolute reference for row 5, column 3.",
      initialData: [["Row", "Col", "Result"], [5, 3, ""]],
      targetCell: [1, 2],
      expectedFormula: "ADDRESS(5,3)",
      expectedValue: "$C$5"
    }
  },
  {
    id: "areas",
    title: "Count Areas in a Reference: AREAS Function",
    category: "lookup",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Count Areas in a Reference: AREAS Function",
      description: "The AREAS function returns the number of separate ranges (areas) in a reference. An area is a contiguous block of cells; multiple areas are separated by commas within parentheses.",
      concept: "Think of it as counting the distinct pieces of a non-contiguous selection."
    },
    syntax: "=AREAS(reference)",
    syntaxBreakdown: [
      { arg: "reference", desc: "A reference to a cell or range. Can include multiple areas." }
    ],
    detailedExamples: [
      {
        title: "Example: Validating Multi-Range Input",
        table: {
          headers: ["Reference", "Formula", "Result"],
          rows: [
            ["(A1:A10)", "=AREAS((A1:A10))", "1"],
            ["(A1:A10, C1:C10)", "=AREAS((A1:A10, C1:C10))", "2"],
            ["(A1:A10, C1:C10, E1:E10)", "=AREAS((A1:A10, C1:C10, E1:E10))", "3"]
          ]
        }
      },
      {
        title: "Practical Use: Checking a Named Range",
        table: {
          headers: ["Named Range", "Refers To", "Formula", "Result"],
          rows: [
            ["SalesData", "=Sheet1!$A$1:$B$50", "=AREAS(SalesData)", "1"],
            ["MultiRegions", "=(Sheet1!$A$1:$A$10, Sheet1!$C$1:$C$10)", "=AREAS(MultiRegions)", "2"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Missing parentheses.", desc: "Forgetting the outer parentheses when passing multiple ranges. Use =AREAS((A1:A10, C1:C10))." },
      { title: "Counting cells.", desc: "AREAS counts separate blocks, not individual cells." }
    ],
    proTips: [
      "AREAS is useful for validating user-defined named ranges.",
      "In VBA, use AREAS to check if a range parameter is a single area or a union of areas."
    ],
    relatedFunctions: ["COLUMNS", "ROWS", "INDEX"],
    miniChallenge: {
      question: "How many areas are in =AREAS((A1:B2, D4:E5))?",
      expectedAnswer: "2"
    },
    practice: {
      instructions: "In cell A1, use AREAS to count the areas in the reference (B2:B5, D2:D5).",
      initialData: [[""]],
      targetCell: [0, 0],
      expectedFormula: "AREAS((B2:B5,D2:D5))",
      expectedValue: 2
    }
  },
  {
    id: "choose",
    title: "Select from a List by Index: CHOOSE Function",
    category: "lookup",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "Select from a List by Index: CHOOSE Function",
      description: "The CHOOSE function returns a value from a list based on a position number (index). You provide the index and a list of options; CHOOSE picks the one at that position.",
      concept: "Think of it like a switch or a vending machine: press button 3, get item 3."
    },
    syntax: "=CHOOSE(index_num, value1, [value2], ...)",
    syntaxBreakdown: [
      { arg: "index_num", desc: "A number specifying which value to return (1 for first, 2 for second, etc.)." },
      { arg: "value1", desc: "The first possible return value." },
      { arg: "value2", desc: "Optional additional values (up to 254)." }
    ],
    detailedExamples: [
      {
        title: "Example: Fiscal Quarter Labels",
        table: {
          headers: ["Month", "Quarter Number", "Formula", "Quarter Label"],
          rows: [
            ["Jan", "1", "=CHOOSE(B2, \"Q1\", \"Q2\", \"Q3\", \"Q4\")", "Q1"],
            ["May", "2", "=CHOOSE(B3, \"Q1\", \"Q2\", \"Q3\", \"Q4\")", "Q2"],
            ["Sep", "3", "=CHOOSE(B4, \"Q1\", \"Q2\", \"Q3\", \"Q4\")", "Q3"]
          ]
        }
      },
      {
        title: "Day of Week with CHOOSE",
        table: {
          headers: ["Weekday Number", "Formula", "Result"],
          rows: [
            ["1", "=CHOOSE(1, \"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\")", "Sun"],
            ["5", "=CHOOSE(5, \"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\")", "Thu"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Out of range index.", desc: "Index_num less than 1 or greater than the number of values returns #VALUE!." },
      { title: "Lookup table alternative.", desc: "Using CHOOSE when a lookup table would be more maintainable for large lists." }
    ],
    proTips: [
      "CHOOSE can return ranges, not just values, making it useful inside SUM or VLOOKUP.",
      "Combine with WEEKDAY or MONTH to convert numeric date parts to text labels."
    ],
    relatedFunctions: ["SWITCH", "VLOOKUP", "INDEX"],
    miniChallenge: {
      question: "What is =CHOOSE(2, \"Yes\", \"No\", \"Maybe\")?",
      expectedAnswer: "No"
    },
    practice: {
      instructions: "In cell C2, use CHOOSE to return \"Pass\" if B2 is 1, and \"Fail\" if B2 is 2.",
      initialData: [["Name", "Code", "Result"], ["Alice", 1, ""]],
      targetCell: [1, 2],
      expectedFormula: "CHOOSE(B2,\"Pass\",\"Fail\")",
      expectedValue: "Pass"
    }
  },
  {
    id: "choosecols",
    title: "Choose Columns from an Array: CHOOSECOLS Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Choose Columns from an Array: CHOOSECOLS Function",
      description: "The CHOOSECOLS function returns specific columns from an array or range, in any order. It's a dynamic array function that lets you rearrange, duplicate, or subset columns.",
      concept: "Think of it as a column picker: point at a table, then say 'give me columns 3, 1, and 2 in that order.'"
    },
    syntax: "=CHOOSECOLS(array, col_num1, [col_num2], ...)",
    syntaxBreakdown: [
      { arg: "array", desc: "The source array or range." },
      { arg: "col_num1", desc: "The first column number to extract. Can be negative to count from the end." },
      { arg: "col_num2", desc: "Optional additional column numbers." }
    ],
    detailedExamples: [
      {
        title: "Example: Rearranging a Report",
        table: {
          headers: ["ID", "Name", "Dept", "Salary"],
          rows: [
            ["101", "Alice", "Sales", "55,000"],
            ["102", "Ben", "Marketing", "62,000"],
            ["(Result Col 2)", "(Result Col 4)", "(Result Col 1)", "=CHOOSECOLS(A2:D3, 2, 4, 1)"]
          ]
        },
        stepByStep: [
          "Column 2 (Name) becomes the first output column.",
          "Column 4 (Salary) becomes the second.",
          "Column 1 (ID) becomes the third."
        ]
      },
      {
        title: "Negative Column Indexing",
        table: {
          headers: ["Formula", "Meaning"],
          rows: [
            ["=CHOOSECOLS(A2:D4, -1)", "Last column (Salary)"],
            ["=CHOOSECOLS(A2:D4, 1, -1)", "First and last columns"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Column index 0.", desc: "Column index of 0 returns #VALUE!." },
      { title: "Spill area.", desc: "Ensure the spill range is clear of existing data." }
    ],
    proTips: [
      "Use CHOOSECOLS with FILTER or SORT to build custom report views.",
      "Negative indices are perfect for grabbing 'the last N columns' without knowing the count."
    ],
    relatedFunctions: ["CHOOSEROWS", "INDEX", "TAKE"],
    miniChallenge: {
      question: "Which column does =CHOOSECOLS(array, -1) return?",
      expectedAnswer: "Last"
    },
    practice: {
      instructions: "In cell E1, use CHOOSECOLS to extract columns 2 and 1 from range A1:B2.",
      initialData: [["A", "B"], ["C", "D"]],
      targetCell: [0, 4],
      expectedFormula: "CHOOSECOLS(A1:B2,2,1)",
      expectedValue: "B"
    }
  },
  {
    id: "chooserows",
    title: "Choose Rows from an Array: CHOOSEROWS Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Choose Rows from an Array: CHOOSEROWS Function",
      description: "The CHOOSEROWS function returns specific rows from an array, in any order. You can pick, reorder, or duplicate rows as needed.",
      concept: "Think of it as the row-oriented twin of CHOOSECOLS."
    },
    syntax: "=CHOOSEROWS(array, row_num1, [row_num2], ...)",
    syntaxBreakdown: [
      { arg: "array", desc: "The source array or range." },
      { arg: "row_num1", desc: "The first row number to extract. Negative counts from the end." },
      { arg: "row_num2", desc: "Optional additional row numbers." }
    ],
    detailedExamples: [
      {
        title: "Example: Top and Bottom Performers",
        table: {
          headers: ["Rank", "Name", "Score"],
          rows: [
            ["1", "Diana", "98"],
            ["5", "Hannah", "61"],
            ["Result", "=CHOOSEROWS(A2:C6, 1, -1)", ""]
          ]
        },
        stepByStep: [
          "Row 1 is the first data row (Diana).",
          "Row -1 is the last row (Hannah).",
          "Both appear in the output, preserving the requested order."
        ]
      }
    ],
    commonMistakes: [
      { title: "Row index 0.", desc: "Row index of 0 returns #VALUE!." },
      { title: "Non-contiguous data.", desc: "The source array must be a contiguous range or array." }
    ],
    proTips: [
      "Combine CHOOSEROWS with SORT to extract specific rank positions.",
      "Use negative indices to always get the last row regardless of row count."
    ],
    relatedFunctions: ["CHOOSECOLS", "INDEX", "DROP"],
    miniChallenge: {
      question: "Return the first row of range A1:C10 using CHOOSEROWS.",
      expectedAnswer: "=CHOOSEROWS(A1:C10, 1)"
    },
    practice: {
      instructions: "In cell A1, use CHOOSEROWS to extract rows 2 and 1 from range B1:B2.",
      initialData: [["", "X"], ["", "Y"]],
      targetCell: [0, 0],
      expectedFormula: "CHOOSEROWS(B1:B2,2,1)",
      expectedValue: "Y"
    }
  },
  {
    id: "column",
    title: "Get the Column Number: COLUMN Function",
    category: "lookup",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Get the Column Number: COLUMN Function",
      description: "The COLUMN function returns the column number of a reference. If no reference is provided, it returns the column number of the cell containing the formula.",
      concept: "Think of it as a column GPS: 'What number column am I in?'"
    },
    syntax: "=COLUMN([reference])",
    syntaxBreakdown: [
      { arg: "reference", desc: "Optional. The cell or range. If omitted, the current cell's column." }
    ],
    detailedExamples: [
      {
        title: "Example: Building a Dynamic Index",
        table: {
          headers: ["Cell A1", "Cell B1", "Cell C1"],
          rows: [
            ["=COLUMN() → 1", "=COLUMN() → 2", "=COLUMN() → 3"]
          ]
        }
      },
      {
        title: "Using a Reference",
        table: {
          headers: ["Formula", "Result"],
          rows: [
            ["=COLUMN(E1)", "5"],
            ["=COLUMN(Z1)", "26"],
            ["=COLUMN(AA1)", "27"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Number vs Letter.", desc: "COLUMN returns a number, not a letter. Use ADDRESS to get the letter." },
      { title: "Range reference.", desc: "Providing a range returns the leftmost column: =COLUMN(B2:D10) returns 2." }
    ],
    proTips: [
      "Use =COLUMN(A1) inside formulas that need incremental numbers when dragged horizontally.",
      "Combine with MOD for alternating column patterns."
    ],
    relatedFunctions: ["ROW", "COLUMNS", "ADDRESS"],
    miniChallenge: {
      question: "What is =COLUMN(C1)?",
      expectedAnswer: "3"
    },
    practice: {
      instructions: "In cell A1, enter the COLUMN function without any arguments.",
      initialData: [[""]],
      targetCell: [0, 0],
      expectedFormula: "COLUMN()",
      expectedValue: 1
    }
  },
  {
    id: "columns",
    title: "Count Columns in a Range: COLUMNS Function",
    category: "lookup",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Count Columns in a Range: COLUMNS Function",
      description: "The COLUMNS function returns the number of columns in a given range or array.",
      concept: "Think of it as a tape measure for table width: 'How many columns wide is this range?'"
    },
    syntax: "=COLUMNS(array)",
    syntaxBreakdown: [
      { arg: "array", desc: "The range or array whose column count you want." }
    ],
    detailedExamples: [
      {
        title: "Example: Dynamic Range Sizing",
        table: {
          headers: ["Range", "Formula", "Result"],
          rows: [
            ["A1:D10", "=COLUMNS(A1:D10)", "4"],
            ["B5:G5", "=COLUMNS(B5:G5)", "6"],
            ["A:A", "=COLUMNS(A:A)", "1"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "COLUMN vs COLUMNS.", desc: "COLUMNS counts columns in a range; COLUMN returns the column number of a single cell." }
    ],
    proTips: [
      "Use COLUMNS inside SEQUENCE to generate grids matching table width.",
      "Combine with INDEX to reference the last column: =INDEX(range, , COLUMNS(range))."
    ],
    relatedFunctions: ["ROWS", "COLUMN", "INDEX"],
    miniChallenge: {
      question: "How many columns are in range A1:C5?",
      expectedAnswer: "3"
    },
    practice: {
      instructions: "In cell B2, use COLUMNS to count the columns in the range A1:C1.",
      initialData: [["A", "B", "C"], ["", "", ""]],
      targetCell: [1, 1],
      expectedFormula: "COLUMNS(A1:C1)",
      expectedValue: 3
    }
  },
  {
    id: "drop",
    title: "Drop Rows or Columns from an Array: DROP Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Drop Rows or Columns from an Array: DROP Function",
      description: "The DROP function removes a specified number of rows or columns from the edges of an array, returning what remains.",
      concept: "Think of it like trimming the crust off a sandwich: you specify how many rows/columns to cut from the top, bottom, left, or right."
    },
    syntax: "=DROP(array, rows, [columns])",
    syntaxBreakdown: [
      { arg: "array", desc: "The source array or range." },
      { arg: "rows", desc: "Number of rows to drop. Positive = from top; negative = from bottom." },
      { arg: "columns", desc: "Optional. Number of columns to drop. Positive = from left; negative = from right." }
    ],
    detailedExamples: [
      {
        title: "Example: Removing Headers and Totals",
        table: {
          headers: ["Row", "Content"],
          rows: [
            ["1", "Title"],
            ["2", "Headers"],
            ["3-12", "Data"],
            ["13", "Totals"]
          ]
        },
        stepByStep: [
          "Formula: =DROP(A1:C13, 2, 0) drops top 2 rows (Title and Headers).",
          "Formula: =DROP(DROP(A1:C13, 2), -1) drops top 2 and the bottom 1 (Totals)."
        ]
      }
    ],
    commonMistakes: [
      { title: "Exceeding bounds.", desc: "Dropping more rows than exist returns #CALC!." },
      { title: "Array output.", desc: "DROP returns an array; ensure the spill space is clear." }
    ],
    proTips: [
      "Invaluable for cleaning up imported data with extra header/footer rows.",
      "Combine with TAKE for precise range extraction."
    ],
    relatedFunctions: ["TAKE", "CHOOSEROWS", "CHOOSECOLS"],
    miniChallenge: {
      question: "How do you drop the last row of range A1:B10?",
      expectedAnswer: "=DROP(A1:B10, -1)"
    },
    practice: {
      instructions: "In cell D1, use DROP to remove the first row from range A1:B3.",
      initialData: [["H1", "H2"], ["A", "B"], ["C", "D"]],
      targetCell: [0, 3],
      expectedFormula: "DROP(A1:B3,1)",
      expectedValue: "A"
    }
  },
  {
    id: "expand",
    title: "Expand an Array to Specified Dimensions: EXPAND Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Expand an Array to Specified Dimensions: EXPAND Function",
      description: "The EXPAND function takes an array and pads it to reach a specified number of rows and columns, filling new cells with a value you choose.",
      concept: "Think of it like stretching a canvas: the original content stays in the top-left, and the new space is filled with padding."
    },
    syntax: "=EXPAND(array, rows, [columns], [pad_with])",
    syntaxBreakdown: [
      { arg: "array", desc: "The source array." },
      { arg: "rows", desc: "Target number of rows. Must be ≥ current rows." },
      { arg: "columns", desc: "Optional. Target number of columns. Must be ≥ current columns." },
      { arg: "pad_with", desc: "Optional. Value to fill new cells with (default is #N/A)." }
    ],
    detailedExamples: [
      {
        title: "Example: Standardising Table Sizes",
        table: {
          headers: ["Original", "Target Rows", "Target Cols", "Formula"],
          rows: [
            ["7x4 Table", "10", "5", "=EXPAND(Table1, 10, 5, \"\")"]
          ]
        },
        stepByStep: [
          "Original data stays in the top-left.",
          "Extra 3 rows and 1 column are added.",
          "New cells are filled with empty strings (\"\")."
        ]
      }
    ],
    commonMistakes: [
      { title: "Shrinking.", desc: "EXPAND cannot shrink an array. Use DROP or TAKE to reduce dimensions." },
      { title: "Missing pad_with.", desc: "Forgetting pad_with results in #N/A which may break other formulas." }
    ],
    proTips: [
      "Use pad_with = \"\" before VSTACK to align arrays of different sizes.",
      "Ensures consistent output grid sizes in dashboards."
    ],
    relatedFunctions: ["TAKE", "DROP", "VSTACK"],
    miniChallenge: {
      question: "What is the default fill value for EXPAND?",
      expectedAnswer: "#N/A"
    },
    practice: {
      instructions: "In cell C1, expand range A1:B1 to be 2 rows and 2 columns, padding with 0.",
      initialData: [["X", "Y"], ["", ""]],
      targetCell: [0, 2],
      expectedFormula: "EXPAND(A1:B1,2,2,0)",
      expectedValue: "X"
    }
  },
  {
    id: "formulatext",
    title: "Reveal the Formula as Text: FORMULATEXT Function",
    category: "lookup",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Reveal the Formula as Text: FORMULATEXT Function",
      description: "The FORMULATEXT function returns the formula in a referenced cell as a text string. If the cell has no formula, it returns #N/A.",
      concept: "Think of it as an X-ray for your spreadsheet: see the formula behind the result without clicking into the cell."
    },
    syntax: "=FORMULATEXT(reference)",
    syntaxBreakdown: [
      { arg: "reference", desc: "A single cell reference." }
    ],
    detailedExamples: [
      {
        title: "Example: Documenting Formulas",
        table: {
          headers: ["Item", "Result Cell", "Formula (via FORMULATEXT)"],
          rows: [
            ["Total Sales", "1,500", "=FORMULATEXT(B2) → \"=SUM(Data)\""]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Range input.", desc: "FORMULATEXT only works with a single cell reference." },
      { title: "Closed workbooks.", desc: "Returns #N/A for closed external workbook references." }
    ],
    proTips: [
      "Combine with IFNA to display a custom message: =IFNA(FORMULATEXT(A1), \"No formula\").",
      "Use in audit sheets to review complex models efficiently."
    ],
    relatedFunctions: ["ISFORMULA", "CELL", "TYPE"],
    miniChallenge: {
      question: "What does FORMULATEXT return if a cell contains a constant number?",
      expectedAnswer: "#N/A"
    },
    practice: {
      instructions: "In cell B2, display the formula text of cell A2.",
      initialData: [["Formula", "Text"], ["=10+5", ""]],
      targetCell: [1, 1],
      expectedFormula: "FORMULATEXT(A2)",
      expectedValue: "=10+5"
    }
  },
  {
    id: "getpivotdata",
    title: "Extract Data from a PivotTable: GETPIVOTDATA Function",
    category: "lookup",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Extract Data from a PivotTable: GETPIVOTDATA Function",
      description: "The GETPIVOTDATA function retrieves specific summary data from a PivotTable by specifying field names and item values. It's more precise than cell referencing because it follows the data's meaning, not its location.",
      concept: "Think of it as querying your PivotTable with a structured question: 'What is the Sum of Sales for Region North in Q2?'"
    },
    syntax: "=GETPIVOTDATA(data_field, pivot_table, [field1, item1], [field2, item2], ...)",
    syntaxBreakdown: [
      { arg: "data_field", desc: "The name of the value field to retrieve, in quotes (e.g., \"Sum of Sales\")." },
      { arg: "pivot_table", desc: "A reference to any cell in the PivotTable." },
      { arg: "field1, item1", desc: "Optional pairs specifying filters (field name and the item to match)." }
    ],
    detailedExamples: [
      {
        title: "Example: Retrieving Specific Pivot Data",
        table: {
          headers: ["Query", "Formula", "Result"],
          rows: [
            ["North Q2 Sales", "=GETPIVOTDATA(\"Sales\", $A$1, \"Region\", \"North\", \"Quarter\", \"Q2\")", "600"]
          ]
        },
        stepByStep: [
          "'Sales' is the data field name.",
          "$A$1 is any cell within the PivotTable.",
          "Field/item pairs filter to the exact intersection needed."
        ]
      }
    ],
    commonMistakes: [
      { title: "Hard-coding items.", desc: "If the PivotTable updates and items change, hard-coded item names in formulas may break." },
      { title: "Mismatched field names.", desc: "The data_field must match exactly how it appears in the PivotTable." }
    ],
    proTips: [
      "Reference cells for item values to make formulas dynamic.",
      "Turn off automatic generation if you prefer regular cell references."
    ],
    relatedFunctions: ["VLOOKUP", "XLOOKUP", "INDEX"],
    miniChallenge: {
      question: "Which argument identifies the PivotTable location in GETPIVOTDATA?",
      expectedAnswer: "pivot_table"
    },
    practice: {
      instructions: "In cell C1, use GETPIVOTDATA to get \"Sales\" from the pivot at A1 for \"Region\" \"North\".",
      initialData: [["PivotTable", ""], ["North", 500]],
      targetCell: [0, 2],
      expectedFormula: "GETPIVOTDATA(\"Sales\",A1,\"Region\",\"North\")",
      expectedValue: 500
    }
  },
  {
    id: "hlookup",
    title: "Horizontal Lookup: HLOOKUP Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Horizontal Lookup: HLOOKUP Function",
      description: "The HLOOKUP function searches for a value in the top row of a table and returns a value from the same column in a specified row below. It's the horizontal sibling of VLOOKUP.",
      concept: "Think of it as looking across the top of a table and then reaching down to pull out the matching data."
    },
    syntax: "=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])",
    syntaxBreakdown: [
      { arg: "lookup_value", desc: "The value to find in the first row." },
      { arg: "table_array", desc: "The range containing the data." },
      { arg: "row_index_num", desc: "Which row to return (1 = top row)." },
      { arg: "range_lookup", desc: "Optional. TRUE = approximate match (default), FALSE = exact match." }
    ],
    detailedExamples: [
      {
        title: "Example: Grade Boundaries",
        table: {
          headers: ["Student", "Score", "Formula", "Grade"],
          rows: [
            ["Alice", "73", "=HLOOKUP(B2, $A$1:$F$2, 2, TRUE)", "B"]
          ]
        },
        stepByStep: [
          "HLOOKUP finds the largest threshold ≤ the score.",
          "For 73, the largest threshold ≤ 73 is 70, so row 2 returns 'B'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Match type.", desc: "Forgetting to set range_lookup to FALSE when you need an exact match." },
      { title: "Row index error.", desc: "row_index_num exceeding the number of rows returns #REF!." }
    ],
    proTips: [
      "Sort the top row in ascending order when using approximate match.",
      "Consider XLOOKUP for more flexibility."
    ],
    relatedFunctions: ["VLOOKUP", "XLOOKUP", "INDEX"],
    miniChallenge: {
      question: "Which row of the table does HLOOKUP search in?",
      expectedAnswer: "Top"
    },
    practice: {
      instructions: "In cell B2, use HLOOKUP to find the value of A2 in the range $D$1:$F$2 and return row 2.",
      initialData: [["Score", "Grade", "", "0", "50", "90"], [73, "", "", "F", "D", "A"]],
      targetCell: [1, 1],
      expectedFormula: "HLOOKUP(A2,D1:F2,2,TRUE)",
      expectedValue: "D"
    }
  },
  {
    id: "hstack",
    title: "Stack Arrays Horizontally: HSTACK Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Stack Arrays Horizontally: HSTACK Function",
      description: "The HSTACK function joins multiple arrays side by side, combining their columns into a single wider array.",
      concept: "Think of it like placing tables next to each other on a desk: everything stays in its rows, columns add up horizontally."
    },
    syntax: "=HSTACK(array1, [array2], ...)",
    syntaxBreakdown: [
      { arg: "array1", desc: "The first array." },
      { arg: "array2", desc: "Optional additional arrays to stack to the right." }
    ],
    detailedExamples: [
      {
        title: "Example: Combining Two Tables",
        table: {
          headers: ["ID", "Name", "Dept", "Salary"],
          rows: [
            ["101", "Alice", "Sales", "55,000"],
            ["102", "Ben", "Marketing", "62,000"]
          ]
        },
        stepByStep: [
          "Columns from A2:B3 and D2:E3 are joined.",
          "If heights differ, the shorter array is padded with #N/A."
        ]
      }
    ],
    commonMistakes: [
      { title: "Unequal row counts.", desc: "Shorter arrays get #N/A padding, which may cause errors." }
    ],
    proTips: [
      "Perfect for assembling reports from separate data blocks.",
      "Use with CHOOSECOLS to reorder columns before stacking."
    ],
    relatedFunctions: ["VSTACK", "CHOOSECOLS", "EXPAND"],
    miniChallenge: {
      question: "Does HSTACK add rows or columns?",
      expectedAnswer: "Columns"
    },
    practice: {
      instructions: "In cell C1, stack range A1:A2 and B1:B2 horizontally.",
      initialData: [["1"], ["2"], ["3"], ["4"]],
      targetCell: [0, 2],
      expectedFormula: "HSTACK(A1:A2,B1:B2)",
      expectedValue: 1
    }
  },
  {
    id: "hyperlink",
    title: "Create Clickable Links: HYPERLINK Function",
    category: "lookup",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Create Clickable Links: HYPERLINK Function",
      description: "The HYPERLINK function creates a clickable shortcut that opens a document, webpage, or navigates within the workbook.",
      concept: "Think of it as building a bridge: one click and the user jumps to the destination."
    },
    syntax: "=HYPERLINK(link_location, [friendly_name])",
    syntaxBreakdown: [
      { arg: "link_location", desc: "The URL, file path, or internal cell reference as text." },
      { arg: "friendly_name", desc: "Optional. The text displayed in the cell (default is the link itself)." }
    ],
    detailedExamples: [
      {
        title: "Example: Email Links",
        table: {
          headers: ["Name", "Email", "Formula"],
          rows: [
            ["Alice", "alice@company.com", "=HYPERLINK(\"mailto:\"&B2, \"Email Alice\")"]
          ]
        }
      },
      {
        title: "Navigation Examples",
        table: {
          headers: ["Type", "Formula", "Result"],
          rows: [
            ["Webpage", "=HYPERLINK(\"https://google.com\", \"Google\")", "Google"],
            ["Internal", "=HYPERLINK(\"#Sheet2!A1\", \"Go\")", "Go"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Missing #.", desc: "Forgetting the # for internal workbook links." },
      { title: "Broken paths.", desc: "Links may break if external files are moved." }
    ],
    proTips: [
      "Create dynamic tables of contents that update as sheet names change."
    ],
    relatedFunctions: ["ADDRESS", "INDIRECT"],
    miniChallenge: {
      question: "What symbol is needed to link to another sheet in the same file?",
      expectedAnswer: "#"
    },
    practice: {
      instructions: "In cell B2, create a hyperlink to \"https://learnexcel.com\" with name \"Start\".",
      initialData: [["URL", "Link"], ["https://learnexcel.com", ""]],
      targetCell: [1, 1],
      expectedFormula: "HYPERLINK(A2,\"Start\")",
      expectedValue: "Start"
    }
  },
  {
    id: "indirect",
    title: "Convert Text to a Reference: INDIRECT Function",
    category: "lookup",
    difficulty: "Advanced",
    xp: 350,
    introduction: {
      title: "Convert Text to a Reference: INDIRECT Function",
      description: "The INDIRECT function takes a text string that looks like a cell reference and turns it into an actual reference that Excel can use.",
      concept: "Think of it as a translator: 'Take this string and treat it as if I typed that cell address directly.'"
    },
    syntax: "=INDIRECT(ref_text, [a1])",
    syntaxBreakdown: [
      { arg: "ref_text", desc: "A text string representing a cell reference." },
      { arg: "a1", desc: "Optional. TRUE for A1 style (default), FALSE for R1C1 style." }
    ],
    detailedExamples: [
      {
        title: "Example: Dynamic Sheet Reference",
        table: {
          headers: ["Month", "Cell", "Formula", "Result"],
          rows: [
            ["Jan", "B10", "=INDIRECT(\"'\"&A2&\"'!B10\")", "Value from Jan!B10"]
          ]
        },
        stepByStep: [
          "The formula builds a text string: \"'Jan'!B10\".",
          "INDIRECT converts it into a live reference."
        ]
      }
    ],
    commonMistakes: [
      { title: "Volatility.", desc: "INDIRECT recalculates on every change, slowing large workbooks." },
      { title: "Closed workbooks.", desc: "External references require the source to be open." }
    ],
    proTips: [
      "Use with Data Validation dropdowns to create dynamic dashboards.",
      "Wrap sheet names in single quotes if they contain spaces."
    ],
    relatedFunctions: ["ADDRESS", "INDEX", "CHOOSE"],
    miniChallenge: {
      question: "Convert the text \"A1\" to a real reference using which function?",
      expectedAnswer: "INDIRECT"
    },
    practice: {
      instructions: "In cell B2, use INDIRECT to reference the cell address written in A2.",
      initialData: [["Address", "Result", "", "Target"], ["C1", "", "", "Success"]],
      targetCell: [1, 1],
      expectedFormula: "INDIRECT(A2)",
      expectedValue: "Success"
    }
  },
  {
    id: "lookup",
    title: "Classic Vector and Array Lookup: LOOKUP Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Classic Vector and Array Lookup: LOOKUP Function",
      description: "The LOOKUP function searches for a value in a single row or column (the lookup vector) and returns a corresponding value from the same position in a result vector.",
      concept: "Think of it as matching two parallel lists: find the position in list A, and return the value at that same position in list B."
    },
    syntax: "=LOOKUP(lookup_value, lookup_vector, [result_vector])",
    syntaxBreakdown: [
      { arg: "lookup_value", desc: "The value to search for." },
      { arg: "lookup_vector", desc: "A single row or column to search in. Must be sorted ascending." },
      { arg: "result_vector", desc: "Optional. A single row or column of the same size. Returns from this." }
    ],
    detailedExamples: [
      {
        title: "Example: Tax Rate by Income Bracket",
        table: {
          headers: ["Income Threshold", "Tax Rate"],
          rows: [
            ["0", "0%"],
            ["12,500", "10%"],
            ["50,000", "20%"]
          ]
        },
        stepByStep: [
          "LOOKUP finds the largest value in the lookup_vector ≤ the lookup_value.",
          "For 45,000: largest threshold ≤ 45,000 is 12,500, so tax rate = 10%."
        ]
      }
    ],
    commonMistakes: [
      { title: "Sorting.", desc: "Lookup_vector must be sorted ascending for predictable results." },
      { title: "Smallest value.", desc: "Lookup_value smaller than the first value returns #N/A." }
    ],
    proTips: [
      "LOOKUP is faster than VLOOKUP with approximate match.",
      "If exact match is needed, use VLOOKUP with FALSE or XLOOKUP."
    ],
    relatedFunctions: ["VLOOKUP", "HLOOKUP", "XLOOKUP"],
    miniChallenge: {
      question: "Does LOOKUP require the search column to be sorted?",
      expectedAnswer: "Yes"
    },
    practice: {
      instructions: "In cell B2, use LOOKUP to find A2 in range $D$1:$D$3 and return from $E$1:$E$3.",
      initialData: [["Val", "Rate", "", "0", "0%"], [45000, "", "", "12500", "10%"], ["", "", "", "50000", "20%"]],
      targetCell: [1, 1],
      expectedFormula: "LOOKUP(A2,D1:D3,E1:E3)",
      expectedValue: "10%"
    }
  },
  {
    id: "offset",
    title: "Create a Dynamic Reference: OFFSET Function",
    category: "lookup",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Create a Dynamic Reference: OFFSET Function",
      description: "The OFFSET function returns a reference to a range that is offset from a starting cell by a specified number of rows and columns. You can also define the height and width.",
      concept: "Think of it as a navigator: start at a known point, then move down X rows and right Y columns to your destination."
    },
    syntax: "=OFFSET(reference, rows, cols, [height], [width])",
    syntaxBreakdown: [
      { arg: "reference", desc: "The starting cell or range." },
      { arg: "rows", desc: "Number of rows to move (positive = down, negative = up)." },
      { arg: "cols", desc: "Number of columns to move (positive = right, negative = left)." },
      { arg: "height", desc: "Optional. How many rows the result should be." },
      { arg: "width", desc: "Optional. How many columns the result should be." }
    ],
    detailedExamples: [
      {
        title: "Example: Rolling 3-Month Average",
        table: {
          headers: ["Month", "Sales", "3-Month Avg"],
          rows: [
            ["Jan", "100", ""],
            ["Feb", "150", ""],
            ["Mar", "200", "=AVERAGE(OFFSET(B2, 0, 0, 3, 1))"]
          ]
        },
        stepByStep: [
          "Starting from B2, height 3 takes B2:B4.",
          "Average of {100, 150, 200} = 150."
        ]
      }
    ],
    commonMistakes: [
      { title: "Volatility.", desc: "OFFSET recalculates on every change, affecting large workbooks." },
      { title: "Beyond boundaries.", desc: "Resulting range extending beyond sheet boundaries returns #REF!." }
    ],
    proTips: [
      "Ideal for dynamic named ranges that grow with data.",
      "Consider INDEX for non-volatile dynamic ranges."
    ],
    relatedFunctions: ["INDEX", "INDIRECT", "ADDRESS"],
    miniChallenge: {
      question: "Which function is a non-volatile alternative to OFFSET for dynamic ranges?",
      expectedAnswer: "INDEX"
    },
    practice: {
      instructions: "In cell C1, use OFFSET to reference cell B2 from starting point A1.",
      initialData: [["Start", "A"], ["", "B"]],
      targetCell: [0, 2],
      expectedFormula: "OFFSET(A1,1,1)",
      expectedValue: "B"
    }
  },
  {
    id: "row",
    title: "Get the Row Number: ROW Function",
    category: "lookup",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Get the Row Number: ROW Function",
      description: "The ROW function returns the row number of a reference. If no reference is given, it returns the row of the cell containing the formula.",
      concept: "Think of it as a vertical position sensor: 'What row am I in?'"
    },
    syntax: "=ROW([reference])",
    syntaxBreakdown: [
      { arg: "reference", desc: "Optional. The cell or range. If omitted, the current cell's row." }
    ],
    detailedExamples: [
      {
        title: "Example: Auto-Numbering Rows",
        table: {
          headers: ["Formula", "Content"],
          rows: [
            ["=ROW()-ROW($A$1)+1", "Item 1"],
            ["=ROW()-ROW($A$1)+1", "Item 2"]
          ]
        },
        stepByStep: [
          "ROW() returns the current row number.",
          "Subtract the header row and add 1 to start at 1."
        ]
      }
    ],
    commonMistakes: [
      { title: "ROW vs ROWS.", desc: "ROW(range) returns only the first row of the range." }
    ],
    proTips: [
      "Use =ROW(1:1) for an auto-incrementing counter when dragged down.",
      "Combine with MOD for alternating row patterns."
    ],
    relatedFunctions: ["ROWS", "COLUMN", "SEQUENCE"],
    miniChallenge: {
      question: "What is =ROW(A10)?",
      expectedAnswer: "10"
    },
    practice: {
      instructions: "In cell A5, enter the ROW function without arguments.",
      initialData: [[""]],
      targetCell: [4, 0],
      expectedFormula: "ROW()",
      expectedValue: 5
    }
  },
  {
    id: "rows",
    title: "Count Rows in a Range: ROWS Function",
    category: "lookup",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Count Rows in a Range: ROWS Function",
      description: "The ROWS function returns the number of rows in a given range or array.",
      concept: "Think of it as measuring the height of a range: 'How many rows tall is this?'"
    },
    syntax: "=ROWS(array)",
    syntaxBreakdown: [
      { arg: "array", desc: "The range or array whose row count you want." }
    ],
    detailedExamples: [
      {
        title: "Example: Dynamic Range Height",
        table: {
          headers: ["Range", "Formula", "Result"],
          rows: [
            ["A1:D10", "=ROWS(A1:D10)", "10"],
            ["B5:G5", "=ROWS(B5:G5)", "1"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "ROW vs ROWS.", desc: "ROWS counts rows in a range; ROW returns the number of a single cell." }
    ],
    proTips: [
      "Use ROWS in INDEX to get the last row: =INDEX(range, ROWS(range), column)."
    ],
    relatedFunctions: ["COLUMNS", "ROW", "INDEX"],
    miniChallenge: {
      question: "How many rows are in =ROWS(A1:A5)?",
      expectedAnswer: "5"
    },
    practice: {
      instructions: "In cell B2, use ROWS to count rows in range A1:A10.",
      initialData: [["Data"], [""], [""], ["Total", ""]],
      targetCell: [3, 1],
      expectedFormula: "ROWS(A1:A10)",
      expectedValue: 10
    }
  },
  {
    id: "rtd",
    title: "Real-Time Data: RTD Function",
    category: "lookup",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Real-Time Data: RTD Function",
      description: "The RTD function retrieves real-time data from a COM automation server — typically used for live financial data or industrial feeds.",
      concept: "Think of it as a live feed pipe: connect to an external server and pull streaming data directly into your cell."
    },
    syntax: "=RTD(ProgID, server, topic1, [topic2], ...)",
    syntaxBreakdown: [
      { arg: "ProgID", desc: "Programmatic identifier of the registered COM server." },
      { arg: "server", desc: "Server name. Leave blank (\"\") for local." },
      { arg: "topic1", desc: "First parameter specifies what data to fetch." }
    ],
    detailedExamples: [
      {
        title: "Example: Stock Price Feed",
        table: {
          headers: ["Symbol", "Formula", "Live Price"],
          rows: [
            ["MSFT", "=RTD(\"StockData.Feed\", \"\", \"LAST_PRICE\", \"MSFT\")", "425.63"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Server registration.", desc: "If the RTD server is not installed or registered, it returns #N/A." },
      { title: "Volatility.", desc: "RTD is network-dependent and affected by connectivity issues." }
    ],
    proTips: [
      "Primarily for enterprise use; often accessed via Bloomberg or Reuters add-ins."
    ],
    relatedFunctions: ["WEBSERVICE", "ENCODEURL"],
    miniChallenge: {
      question: "What does ProgID stand for in RTD?",
      expectedAnswer: "Programmatic Identifier"
    },
    practice: {
      instructions: "In cell B2, write an RTD formula for \"Prog.ID\" with local server and topic \"Price\".",
      initialData: [["Server", "Result"], ["", ""]],
      targetCell: [1, 1],
      expectedFormula: "RTD(\"Prog.ID\",\"\",\"Price\")",
      expectedValue: "VALID"
    }
  },
  {
    id: "sortby",
    title: "Sort by Another Array: SORTBY Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Sort by Another Array: SORTBY Function",
      description: "The SORTBY function sorts a range or array based on the values in one or more corresponding arrays. Unlike SORT, which sorts by the values in the data itself, SORTBY can sort by external or derived criteria.",
      concept: "Think of it as sorting a guest list by the table number in another column, without touching the guest list itself."
    },
    syntax: "=SORTBY(array, by_array1, [sort_order1], [by_array2, sort_order2], ...)",
    syntaxBreakdown: [
      { arg: "array", desc: "The data to sort." },
      { arg: "by_array1", desc: "The array to sort by. Must match array in dimensions." },
      { arg: "sort_order1", desc: "Optional. 1 = ascending (default), -1 = descending." }
    ],
    detailedExamples: [
      {
        title: "Example: Sorting Employees by Dept then Salary",
        table: {
          headers: ["Name", "Dept", "Salary"],
          rows: [
            ["Alice", "Sales", "55,000"],
            ["Ben", "Marketing", "62,000"],
            ["Carla", "Sales", "70,000"],
            ["Result", "=SORTBY(A2:C5, B2:B5, 1, C2:C5, -1)", ""]
          ]
        },
        stepByStep: [
          "First sort by Department (B2:B5), ascending.",
          "Within each department, sort by Salary (C2:C5), descending."
        ]
      }
    ],
    commonMistakes: [
      { title: "Dimension mismatch.", desc: "by_array size must match the array's row or column count." }
    ],
    proTips: [
      "Excels when you need to sort based on a calculated column without adding a helper column.",
      "Combine with FILTER to sort only a subset."
    ],
    relatedFunctions: ["SORT", "FILTER", "UNIQUE"],
    miniChallenge: {
      question: "Which function sorts based on a separate array?",
      expectedAnswer: "SORTBY"
    },
    practice: {
      instructions: "In cell E1, use SORTBY to sort range A1:A3 by B1:B3 ascending.",
      initialData: [["A", "2"], ["B", "1"], ["C", "3"]],
      targetCell: [0, 4],
      expectedFormula: "SORTBY(A1:A3,B1:B3,1)",
      expectedValue: "B"
    }
  },
  {
    id: "take",
    title: "Extract Rows or Columns from Edges: TAKE Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Extract Rows or Columns from Edges: TAKE Function",
      description: "The TAKE function extracts a specified number of consecutive rows or columns from the start or end of an array. It's the opposite of DROP — TAKE keeps what DROP discards.",
      concept: "Think of it as slicing: 'Give me the first 5 rows' or 'Give me the last 3 columns.'"
    },
    syntax: "=TAKE(array, rows, [columns])",
    syntaxBreakdown: [
      { arg: "array", desc: "The source array." },
      { arg: "rows", desc: "Number of rows to take. Positive = from top; negative = from bottom." },
      { arg: "columns", desc: "Optional. Number of columns to take. Positive = from left; negative = from right." }
    ],
    detailedExamples: [
      {
        title: "Example: Top and Bottom Sales",
        table: {
          headers: ["Operation", "Formula"],
          rows: [
            ["Top 5", "=TAKE(A2:B51, 5)"],
            ["Bottom 5", "=TAKE(A2:B51, -5)"]
          ]
        }
      },
      {
        title: "Column Extraction Examples",
        table: {
          headers: ["Array", "Formula", "Result"],
          rows: [
            ["10 rows, 5 cols", "=TAKE(A1:E10, 10, 2)", "First 2 columns"],
            ["10 rows, 5 cols", "=TAKE(A1:E10, 10, -1)", "Last column"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Exceeding size.", desc: "Taking more rows than exist returns the entire array, not an error." }
    ],
    proTips: [
      "TAKE + SORT is powerful for leaderboards: =TAKE(SORT(data, 2, -1), 10).",
      "Use negative numbers for 'last N' without knowing the row count."
    ],
    relatedFunctions: ["DROP", "CHOOSEROWS", "CHOOSECOLS"],
    miniChallenge: {
      question: "How do you take the first 3 rows of range A1:C10?",
      expectedAnswer: "=TAKE(A1:C10, 3)"
    },
    practice: {
      instructions: "In cell C1, take the first row of range A1:B2.",
      initialData: [["1", "2"], ["3", "4"]],
      targetCell: [0, 2],
      expectedFormula: "TAKE(A1:B2,1)",
      expectedValue: 1
    }
  },
  {
    id: "tocol",
    title: "Convert Array to a Single Column: TOCOL Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Convert Array to a Single Column: TOCOL Function",
      description: "The TOCOL function transforms a 2D array into a single column by scanning row by row (default) or column by column. You can optionally skip blanks and errors.",
      concept: "Think of it as flattening a table into one long vertical list."
    },
    syntax: "=TOCOL(array, [ignore], [scan_by_column])",
    syntaxBreakdown: [
      { arg: "array", desc: "The 2D array or range to flatten." },
      { arg: "ignore", desc: "Optional. 0 = keep all (default), 1 = ignore blanks, 2 = ignore errors, 3 = ignore both." },
      { arg: "scan_by_column", desc: "Optional. FALSE = row by row (default), TRUE = column by column." }
    ],
    detailedExamples: [
      {
        title: "Example: Unique List from Grid",
        table: {
          headers: ["A", "B", "C"],
          rows: [
            ["Math", "", "Art"],
            ["", "English", ""],
            ["Result", "=TOCOL(A1:C2, 1)", ""]
          ]
        },
        stepByStep: [
          "TOCOL scans row 1: Math, (blank skipped), Art.",
          "Row 2: (blank skipped), English.",
          "ignore = 1 removes blanks."
        ]
      }
    ],
    commonMistakes: [
      { title: "Missing ignore.", desc: "Forgetting the ignore parameter keeps blanks, which may clog your list." }
    ],
    proTips: [
      "Combine with UNIQUE to extract distinct non-blank entries: =UNIQUE(TOCOL(range, 1)).",
      "Prepare messy ranges for SORT or FILTER."
    ],
    relatedFunctions: ["TOROW", "TRANSPOSE", "UNIQUE"],
    miniChallenge: {
      question: "Which argument allows TOCOL to skip blank cells?",
      expectedAnswer: "ignore"
    },
    practice: {
      instructions: "In cell D1, flatten range A1:B2 into a column.",
      initialData: [["A", "B"], ["C", "D"]],
      targetCell: [0, 3],
      expectedFormula: "TOCOL(A1:B2)",
      expectedValue: "A"
    }
  },
  {
    id: "torow",
    title: "Convert Array to a Single Row: TOROW Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Convert Array to a Single Row: TOROW Function",
      description: "The TOROW function transforms a 2D array into a single row, scanning row by row (default) or column by column. You can skip blanks and errors.",
      concept: "Think of it as flattening a table into one long horizontal list — the row-oriented twin of TOCOL."
    },
    syntax: "=TOROW(array, [ignore], [scan_by_column])",
    syntaxBreakdown: [
      { arg: "array", desc: "The 2D array to flatten." },
      { arg: "ignore", desc: "Optional. 0 = keep all (default), 1 = ignore blanks, 2 = ignore errors, 3 = ignore both." },
      { arg: "scan_by_column", desc: "Optional. FALSE = row by row (default), TRUE = column by column." }
    ],
    detailedExamples: [
      {
        title: "Example: Comma-Separated Tag List",
        table: {
          headers: ["Product", "Tag 1", "Tag 2"],
          rows: [
            ["Widget", "Red", "Large"],
            ["Gadget", "Blue", "Small"]
          ]
        },
        stepByStep: [
          "TOROW flattens into a single row: Red, Large, Blue, Small.",
          "TEXTJOIN can then combine them with commas."
        ]
      }
    ],
    commonMistakes: [
      { title: "Horizontal spill.", desc: "Ensure enough empty cells to the right for the result to spill." }
    ],
    proTips: [
      "TOROW + TEXTJOIN creates clean summary strings from grid data."
    ],
    relatedFunctions: ["TOCOL", "TRANSPOSE"],
    miniChallenge: {
      question: "Does TOROW scan row-by-row or column-by-column by default?",
      expectedAnswer: "Row-by-row"
    },
    practice: {
      instructions: "In cell A3, flatten range A1:B2 into a single row.",
      initialData: [["1", "2"], ["3", "4"]],
      targetCell: [2, 0],
      expectedFormula: "TOROW(A1:B2)",
      expectedValue: 1
    }
  },
  {
    id: "transpose",
    title: "Flip Rows to Columns and Vice Versa: TRANSPOSE Function",
    category: "lookup",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "Flip Rows to Columns and Vice Versa: TRANSPOSE Function",
      description: "The TRANSPOSE function converts a vertical range to horizontal, or horizontal to vertical, swapping rows and columns.",
      concept: "Think of it as rotating your data 90 degrees: what was across becomes down, and what was down becomes across."
    },
    syntax: "=TRANSPOSE(array)",
    detailedExamples: [
      {
        title: "Example: Reshaping a Data Table",
        table: {
          headers: ["Q1", "Q2", "Q3"],
          rows: [
            ["100", "150", "200"],
            ["Result", "=TRANSPOSE(A1:C2)", ""]
          ]
        },
        stepByStep: [
          "Original is 2 rows × 3 columns.",
          "TRANSPOSE outputs 3 rows × 2 columns.",
          "Row 1 becomes Column 1; Row 2 becomes Column 2."
        ]
      }
    ],
    commonMistakes: [
      { title: "Spill area.", desc: "Spill cells must be empty in modern Excel." },
      { title: "Overwriting data.", desc: "Always check output dimensions before placing the formula." }
    ],
    proTips: [
      "Essential for converting data between formats for charts or lookups."
    ],
    relatedFunctions: ["TOCOL", "TOROW"],
    miniChallenge: {
      question: "If you transpose a 2x5 range, what are the dimensions of the result?",
      expectedAnswer: "5x2"
    },
    practice: {
      instructions: "In cell A3, transpose the range A1:B1.",
      initialData: [["H1", "H2"], ["", ""]],
      targetCell: [2, 0],
      expectedFormula: "TRANSPOSE(A1:B1)",
      expectedValue: "H1"
    }
  },
  {
    id: "vstack",
    title: "Stack Arrays Vertically: VSTACK Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Stack Arrays Vertically: VSTACK Function",
      description: "The VSTACK function joins multiple arrays top to bottom, stacking their rows into a single taller array.",
      concept: "Think of it as placing tables one below another: rows add up, columns stay aligned."
    },
    syntax: "=VSTACK(array1, [array2], ...)",
    syntaxBreakdown: [
      { arg: "array1", desc: "The first array." },
      { arg: "array2", desc: "Optional additional arrays to stack below." }
    ],
    detailedExamples: [
      {
        title: "Example: Combining Regional Data",
        table: {
          headers: ["Region", "Sales"],
          rows: [
            ["North", "500"],
            ["North", "600"],
            ["South", "400"],
            ["Result", "=VSTACK(A2:B3, A4:B4)", ""]
          ]
        },
        stepByStep: [
          "VSTACK takes all rows from the first array, then all rows from the second.",
          "Columns must match; shorter arrays are padded with #N/A."
        ]
      }
    ],
    commonMistakes: [
      { title: "Column count.", desc: "Mismatched column counts cause #N/A padding." },
      { title: "Duplicate headers.", desc: "VSTACK doesn't remove duplicate headers automatically." }
    ],
    proTips: [
      "Use with UNIQUE to merge lists and remove duplicates.",
      "Combine with FILTER to stack only filtered subsets."
    ],
    relatedFunctions: ["HSTACK", "FILTER", "UNIQUE"],
    miniChallenge: {
      question: "Does VSTACK add rows or columns?",
      expectedAnswer: "Rows"
    },
    practice: {
      instructions: "In cell A3, stack A1:A1 and B1:B1 vertically.",
      initialData: [["A"], ["B"], [""]],
      targetCell: [2, 0],
      expectedFormula: "VSTACK(A1,B1)",
      expectedValue: "A"
    }
  },
  {
    id: "wrapcols",
    title: "Wrap a Row into Columns: WRAPCOLS Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Wrap a Row into Columns: WRAPCOLS Function",
      description: "The WRAPCOLS function takes a one-dimensional array and wraps it into a 2D array by filling down each column.",
      concept: "Think of it as flowing text into a multi-column layout: the list snakes down one column, then the next."
    },
    syntax: "=WRAPCOLS(vector, wrap_count, [pad_with])",
    syntaxBreakdown: [
      { arg: "vector", desc: "The 1D array to wrap." },
      { arg: "wrap_count", desc: "Maximum number of values per column." },
      { arg: "pad_with", desc: "Optional. Value for unfilled cells (default #N/A)." }
    ],
    detailedExamples: [
      {
        title: "Example: Multi-Column List",
        table: {
          headers: ["A", "B", "C", "D"],
          rows: [
            ["Alice", "Ben", "Carla", "David"],
            ["Result", "=WRAPCOLS(A1:D1, 2)", "", ""]
          ]
        },
        stepByStep: [
          "Values fill down column 1: Alice, Ben.",
          "Then column 2: Carla, David."
        ]
      }
    ],
    commonMistakes: [
      { title: "Direction.", desc: "Forgetting that WRAPCOLS fills down each column, not across rows." },
      { title: "1D requirement.", desc: "Vector must be 1D (use TOCOL if starting with 2D)." }
    ],
    proTips: [
      "Excellent for print-friendly multi-column layouts."
    ],
    relatedFunctions: ["WRAPROWS", "TOCOL", "TOROW"],
    miniChallenge: {
      question: "Which function fills columns first: WRAPCOLS or WRAPROWS?",
      expectedAnswer: "WRAPCOLS"
    },
    practice: {
      instructions: "In cell A2, wrap range A1:D1 into columns of 2.",
      initialData: [["1", "2", "3", "4"], ["", "", "", ""]],
      targetCell: [1, 0],
      expectedFormula: "WRAPCOLS(A1:D1,2)",
      expectedValue: 1
    }
  },
  {
    id: "wraprows",
    title: "Wrap a Column into Rows: WRAPROWS Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Wrap a Column into Rows: WRAPROWS Function",
      description: "The WRAPROWS function takes a one-dimensional array and wraps it into a 2D array by filling across each row.",
      concept: "Think of it as flowing a long list into a table: the list fills left to right, then wraps to the next row."
    },
    syntax: "=WRAPROWS(vector, wrap_count, [pad_with])",
    syntaxBreakdown: [
      { arg: "vector", desc: "The 1D array to wrap." },
      { arg: "wrap_count", desc: "Number of values per row." },
      { arg: "pad_with", desc: "Optional. Fill value for leftover cells (default #N/A)." }
    ],
    detailedExamples: [
      {
        title: "Example: Calendar Layout",
        table: {
          headers: ["Day 1", "Day 2", "Day 3"],
          rows: [
            ["1", "2", "3"],
            ["Result", "=WRAPROWS(SEQUENCE(6), 3)", ""]
          ]
        },
        stepByStep: [
          "WRAPROWS fills 3 values per row, left to right.",
          "Row 1: 1, 2, 3. Row 2: 4, 5, 6."
        ]
      }
    ],
    commonMistakes: [
      { title: "WRAPCOLS vs WRAPROWS.", desc: "WRAPROWS fills row-by-row; WRAPCOLS fills column-by-column." }
    ],
    proTips: [
      "Combine with SEQUENCE to generate grids or seating charts."
    ],
    relatedFunctions: ["WRAPCOLS", "TOCOL", "SEQUENCE"],
    miniChallenge: {
      question: "How do you fill across rows? WRAPROWS or WRAPCOLS?",
      expectedAnswer: "WRAPROWS"
    },
    practice: {
      instructions: "In cell B1, wrap range A1:A4 into rows of 2.",
      initialData: [["1"], ["2"], ["3"], ["4"]],
      targetCell: [0, 1],
      expectedFormula: "WRAPROWS(A1:A4,2)",
      expectedValue: 1
    }
  },
  {
    id: "xmatch",
    title: "Next-Generation Match: XMATCH Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "Next-Generation Match: XMATCH Function",
      description: "The XMATCH function searches for a value in an array and returns its relative position. It's the modern replacement for MATCH.",
      concept: "Think of it as asking: 'Where is this value in the list?' — and getting the position back."
    },
    syntax: "=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])",
    syntaxBreakdown: [
      { arg: "lookup_value", desc: "The value to find." },
      { arg: "lookup_array", desc: "The array to search." },
      { arg: "match_mode", desc: "Optional. 0=exact (default), -1=next smaller, 1=next larger, 2=wildcard." },
      { arg: "search_mode", desc: "Optional. 1=first-to-last (default), -1=last-to-first." }
    ],
    detailedExamples: [
      {
        title: "Example: Finding Position",
        table: {
          headers: ["Employee", "Formula", "Position"],
          rows: [
            ["Alice", "=XMATCH(\"Carla\", A2:A4)", "3"],
            ["Ben", "", ""],
            ["Carla", "", ""]
          ]
        },
        stepByStep: [
          "XMATCH scans A2:A4 for 'Carla'.",
          "It finds a match at the 3rd position and returns 3."
        ]
      }
    ],
    commonMistakes: [
      { title: "Binary search.", desc: "Using binary search modes (2, -2) on unsorted data gives incorrect results." }
    ],
    proTips: [
      "XMATCH + INDEX is the modern replacement for VLOOKUP.",
      "Use search_mode -1 to find the last occurrence."
    ],
    relatedFunctions: ["MATCH", "INDEX", "XLOOKUP"],
    miniChallenge: {
      question: "Which match_mode is used for wildcards in XMATCH?",
      expectedAnswer: "2"
    },
    practice: {
      instructions: "In cell B1, find the position of \"Target\" in range A1:A3.",
      initialData: [["Other"], ["Target"], ["Other"]],
      targetCell: [0, 1],
      expectedFormula: "XMATCH(\"Target\",A1:A3)",
      expectedValue: 2
    }
  },
  {
    id: "vlookup",
    title: "VLOOKUP Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "The Search Engine of Excel: VLOOKUP",
      description: "VLOOKUP stands for 'Vertical Lookup'. It allows you to search for a specific piece of information in a large table and automatically pull back related data.",
      concept: "Think of it like using a directory. You search for a person's name (Lookup Value) in the first column, and once found, you move your finger across the row to find their Phone Number (Result)."
    },
    internalLogic: "Excel starts at the top of your 'table_array' and scans down the first column vertically. Once it finds a match for your 'lookup_value', it 'locks' that row and moves to the right based on your 'col_index_num' to retrieve the data.",
    whyItExists: "In professional environments, data is often stored in master lists (prices, employee names, SKUs). VLOOKUP is essential for connecting separate data sources—like pulling a price into an invoice based on a product code.",
    whenToUse: "Use VLOOKUP when you have a piece of ID (ID number, Name, Code) and you need to find more info about that item from a table arranged vertically.",
    realWorldUseCases: [
      "Finding an employee's department based on their ID badge number.",
      "Automatically pulling a product price into a sales sheet using a barcode.",
      "Checking a student's grade from a master results table.",
      "Mapping zip codes to city names in a marketing list."
    ],
    businessExample: {
      scenario: "A payroll clerk needs to find the Salary of an employee by searching for their Employee ID in the company database.",
      formula: "=VLOOKUP(105, A2:C50, 3, FALSE)"
    },
    syntax: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    syntaxBreakdown: [
      { arg: "lookup_value", desc: "The 'What'. The value you already know and want to search for (e.g., ID 101)." },
      { arg: "table_array", desc: "The 'Where'. The entire table or range containing your data. The search always happens in the first column of this range." },
      { arg: "col_index_num", desc: "The 'Which Column'. The number of the column you want to pull data from, starting from 1." },
      { arg: "range_lookup", desc: "The 'Match Type'. Use FALSE (or 0) for an exact match. Use TRUE (or 1) for approximate matches." }
    ],
    detailedExamples: [
      {
        title: "Example: Product Pricing",
        table: {
          headers: ["ID", "Product", "Price", "VLOOKUP Result"],
          rows: [
            ["A01", "Apple", "2.00", "=VLOOKUP(\"A02\", A2:C3, 3, FALSE)"],
            ["A02", "Banana", "1.50", "1.50"]
          ]
        },
        stepByStep: [
          "Excel looks for 'A02' in the first column (A).",
          "It finds a match in the second row.",
          "It moves to the 3rd column (Price) in that row.",
          "It returns the value: 1.50."
        ]
      }
    ],
    commonMistakes: [
      { title: "Search column not on the left.", desc: "The 'lookup_value' must be in the VERY FIRST column of the table range you select. VLOOKUP cannot look to its left." },
      { title: "Wrong column index.", desc: "If your table has 3 columns and you ask for column 5, VLOOKUP will crash with a #REF! error." },
      { title: "Forgetting FALSE.", desc: "Always use FALSE for the last argument unless you are dealing with tax brackets. Without it, VLOOKUP might give you the wrong data." }
    ],
    limitations: "VLOOKUP can only search from left to right. It also 'breaks' if you insert new columns into your table because the index numbers shift. Use XLOOKUP or INDEX/MATCH to overcome these.",
    bestPractices: [
      "Use Absolute References ($A$2:$C$10) for your table range so the formula stays correct when copied.",
      "Standardize your lookup values (use TRIM) to avoid hidden space errors."
    ],
    proTips: [
      "Wrap your VLOOKUP in an IFNA to show a friendly 'Not Found' message instead of #N/A.",
      "You can use wildcards (like \"*\") in your lookup value for partial matches."
    ],
    relatedFunctions: ["XLOOKUP", "HLOOKUP", "INDEX", "MATCH", "LOOKUP"],
    miniChallenge: {
      question: "You want to find the price (Column 2) of product ID 'SKU-50' in the range A1:B10. Write the exact formula.",
      expectedAnswer: "=VLOOKUP(\"SKU-50\", A1:B10, 2, FALSE)"
    },
    practice: {
      instructions: "In cell E2, find the Price of the product named in D2 using VLOOKUP from the table in A2:B4.",
      initialData: [["Product", "Price", "", "Search", "Result"], ["Apple", 5, "", "Banana", ""], ["Banana", 3, "", "", ""], ["Mango", 4, "", "", ""]],
      targetCell: [1, 4],
      expectedFormula: "VLOOKUP(D2,A2:B4,2,FALSE)",
      expectedValue: 3
    }
  },
  {
    id: "xlookup",
    title: "XLOOKUP Function",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 350,
    introduction: {
      title: "The Ultimate Successor: XLOOKUP",
      description: "XLOOKUP is the most powerful and versatile search function in Excel. It replaces VLOOKUP, HLOOKUP, and LOOKUP by fixing their biggest weaknesses.",
      concept: "Imagine a GPS that works in every direction. XLOOKUP searches for a value in one list and returns the corresponding value from another list, regardless of where that list is located."
    },
    internalLogic: "XLOOKUP searches the 'lookup_array' for the 'lookup_value'. Once found, it identifies the index (position) and retrieves the value from the exact same position in the 'return_array'. Unlike VLOOKUP, it defaults to an exact match and can search from bottom-to-top.",
    whyItExists: "VLOOKUP has many 'gotchas'—it can't look left, it breaks if you add columns, and it defaults to approximate matches (which often gives wrong data). XLOOKUP was designed to be safer, faster, and easier to write.",
    whenToUse: "Always prefer XLOOKUP over VLOOKUP if your version of Excel supports it. Use it for any cross-referencing task.",
    realWorldUseCases: [
      "Finding a price based on a product name (even if price is to the left!).",
      "Pulling employee details from a database without worrying about column order.",
      "Looking up the LATEST sales record by searching from the bottom up.",
      "Returning a custom 'Not Found' message directly within the formula."
    ],
    businessExample: {
      scenario: "A manager has a list of 'Employee Names' in Column B and 'Salaries' in Column A. VLOOKUP can't find this. XLOOKUP can.",
      formula: "=XLOOKUP(\"John Doe\", B2:B10, A2:A10)"
    },
    syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
    syntaxBreakdown: [
      { arg: "lookup_value", desc: "The item you are searching for." },
      { arg: "lookup_array", desc: "The list or column where the search item is located." },
      { arg: "return_array", desc: "The list or column where the information you want is located." },
      { arg: "if_not_found", desc: "Optional. The text to show if no match is found (replaces the need for IFNA)." },
      { arg: "match_mode", desc: "Optional. 0 for exact (default), -1 for next smaller, 1 for next larger." }
    ],
    detailedExamples: [
      {
        title: "Example: Safe Pricing",
        table: {
          headers: ["Item", "Stock", "Price", "XLOOKUP Result"],
          rows: [
            ["Widget", "10", "5.99", "=XLOOKUP(\"Gadget\", A2:A3, C2:C3, \"Unknown\")"],
            ["Gadget", "5", "12.50", "12.50"]
          ]
        },
        stepByStep: [
          "Excel looks for 'Gadget' in A2:A3.",
          "It finds it in row 3.",
          "It goes to row 3 in the return array (C2:C3).",
          "It returns 12.50."
        ]
      }
    ],
    commonMistakes: [
      { title: "Array size mismatch.", desc: "Your 'lookup_array' and 'return_array' must be the exact same size (e.g., both 10 rows long)." }
    ],
    limitations: "Only available in Office 365 and Excel 2021 or later.",
    bestPractices: [
      "Use descriptive range names for your arrays to make the formula readable.",
      "Always fill in the 'if_not_found' argument to prevent #N/A errors."
    ],
    proTips: [
      "Use search_mode = -1 to search from last to first (bottom to top).",
      "XLOOKUP can return an entire row of data at once if your return array includes multiple columns."
    ],
    relatedFunctions: ["VLOOKUP", "INDEX", "MATCH", "FILTER"],
    comparison: "VLOOKUP is like an old paper map—it has limitations. XLOOKUP is Google Maps—it's smart, flexible, and handles everything.",
    miniChallenge: {
      question: "Search for 'Admin' in A1:A5 and return the code from B1:B5. If not found, show 'None'.",
      expectedAnswer: "=XLOOKUP(\"Admin\", A1:A5, B1:B5, \"None\")"
    },
    practice: {
      instructions: "In cell E2, use XLOOKUP to find the Salary (Col A) of the employee in D2 (Col B). Search range B2:B4, Return range A2:A4.",
      initialData: [["Salary", "Name", "", "Search", "Result"], [5000, "Alice", "", "Bob", ""], [7000, "Bob", "", "", ""], [4500, "Charlie", "", "", ""]],
      targetCell: [1, 4],
      expectedFormula: "XLOOKUP(D2,B2:B4,A2:A4)",
      expectedValue: 7000
    }
  },
  {
    id: "index",
    title: "INDEX Function",
    category: "lookup",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "The Coordinate Locator: INDEX",
      description: "The INDEX function returns a value from a specific row and column within a range of cells.",
      concept: "Think of it like a map grid. If you say 'Row 3, Column 2', INDEX goes exactly to that spot and tells you what's inside. It is the 'GPS' of Excel functions."
    },
    internalLogic: "Excel takes the range you provide and treats it as its own mini-coordinate system. It offsets from the top-left cell of that range by the number of rows and columns you specify.",
    whyItExists: "While VLOOKUP searches for a value, INDEX is used when you already know the *location* (the row and column number) and just want to retrieve the data. It's often used as the 'Return' half of the powerful INDEX/MATCH duo.",
    whenToUse: "Use INDEX when you need to pull data from a specific position, or when building flexible lookup systems that VLOOKUP can't handle.",
    realWorldUseCases: [
      "Retrieving a specific value from a price matrix (e.g., Shipping Zone vs. Weight).",
      "Building dynamic dashboards that update based on a 'Selection' number.",
      "Pulling data from the left side of a search column (combined with MATCH).",
      "Randomly selecting an item from a list for a giveaway."
    ],
    businessExample: {
      scenario: "A price list has products in rows and different bulk discount tiers in columns. You want the price for Product 5 at Tier 3.",
      formula: "=INDEX(A1:D50, 5, 3)"
    },
    syntax: "=INDEX(array, row_num, [column_num])",
    syntaxBreakdown: [
      { arg: "array", desc: "The range of cells you want to pull data from." },
      { arg: "row_num", desc: "The row number in the array from which to return a value. 1 is the first row of your selection." },
      { arg: "column_num", desc: "Optional. The column number in the array. 1 is the first column of your selection." }
    ],
    detailedExamples: [
      {
        title: "Example: Basic Grid Lookup",
        table: {
          headers: ["", "Col 1", "Col 2"],
          rows: [
            ["Row 1", "A", "B"],
            ["Row 2", "C", "D"],
            ["Formula", "=INDEX(B1:C2, 2, 1)", "Result: C"]
          ]
        },
        stepByStep: [
          "Excel looks at the range B1:C2.",
          "It counts down to the 2nd row (Row 2).",
          "It counts across to the 1st column (Col 1).",
          "It finds the value 'C'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Counting from the whole sheet.", desc: "Row and column numbers are relative to your SELECTED range, not the whole spreadsheet. Row 1 of your range might actually be Row 10 of the sheet." }
    ],
    limitations: "INDEX alone isn't very 'smart'—it doesn't search for text. It only goes where you tell it to go.",
    bestPractices: [
      "Combine INDEX with MATCH to create a search engine that is more powerful than VLOOKUP."
    ],
    proTips: [
      "If you set row_num or column_num to 0, INDEX returns the entire row or column as an array."
    ],
    relatedFunctions: ["MATCH", "XLOOKUP", "VLOOKUP", "OFFSET"],
    miniChallenge: {
      question: "Return the value of the 3rd row and 1st column in range A1:B10.",
      expectedAnswer: "=INDEX(A1:B10, 3, 1)"
    },
    practice: {
      instructions: "In cell C2, use INDEX to get the value from the 2nd row and 1st column of the range A2:A4.",
      initialData: [["Data", "Result"], ["Apple", ""], ["Banana", ""], ["Orange", ""]],
      targetCell: [1, 1],
      expectedFormula: "INDEX(A2:A4,2,1)",
      expectedValue: "Banana"
    }
  },
  {
    id: "match",
    title: "MATCH Function",
    category: "lookup",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "The Row Finder: MATCH",
      description: "The MATCH function searches for a specific item in a range of cells and returns the relative position (the number) of that item.",
      concept: "Think of it like finding someone's place in a line. MATCH doesn't tell you their name; it tells you 'They are 4th in line'."
    },
    internalLogic: "Excel scans the range you provide. When it finds the 'lookup_value', it calculates how many cells down (or across) it is from the start and returns that integer.",
    whyItExists: "We often need to know *where* something is before we can do something with it. MATCH is the 'Search' half of the INDEX/MATCH combo. It finds the row number so INDEX can pull the data.",
    whenToUse: "Use MATCH when you need the row or column number of an item, rather than the item itself.",
    realWorldUseCases: [
      "Finding which row a specific Product ID is located in.",
      "Determining the column number of a specific month in a budget header.",
      "Checking if an item exists in a list (it returns a number if found, error if not).",
      "Dynamic data validation lists."
    ],
    businessExample: {
      scenario: "You have a list of names and you want to know which row 'John Doe' is on so you can use it in another formula.",
      formula: "=MATCH(\"John Doe\", A2:A100, 0)"
    },
    syntax: "=MATCH(lookup_value, lookup_array, [match_type])",
    syntaxBreakdown: [
      { arg: "lookup_value", desc: "The text or number you want to find." },
      { arg: "lookup_array", desc: "The single row or column you want to search." },
      { arg: "match_type", desc: "Use 0 for an exact match. (1 for smaller than, -1 for larger than)." }
    ],
    detailedExamples: [
      {
        title: "Example: Finding Position",
        table: {
          headers: ["Item", "Formula", "Position"],
          rows: [
            ["Apple", "=MATCH(\"Banana\", A2:A4, 0)", "2"],
            ["Banana", "", ""],
            ["Orange", "", ""]
          ]
        },
        stepByStep: [
          "Excel looks at the list: Apple, Banana, Orange.",
          "It searches for 'Banana'.",
          "It counts: Apple (1), Banana (2).",
          "It returns 2."
        ]
      }
    ],
    commonMistakes: [
      { title: "Forgetting the 0.", desc: "If you leave out the 0 in match_type, Excel assumes it's 1 (approximate) and might give you the wrong row number if your list isn't sorted." }
    ],
    limitations: "MATCH only works on a single row or column. It cannot search a 2D block of cells.",
    bestPractices: [
      "Always use 0 as the third argument for reliable results."
    ],
    proTips: [
      "Use =ISNUMBER(MATCH(...)) as a quick way to check if an item exists in a list."
    ],
    relatedFunctions: ["INDEX", "XLOOKUP", "VLOOKUP", "XMATCH"],
    miniChallenge: {
      question: "Find the position of \"Apple\" in the range A1:A10 using an exact match.",
      expectedAnswer: "=MATCH(\"Apple\", A1:A10, 0)"
    },
    practice: {
      instructions: "In cell B2, use MATCH to find the position of \"Banana\" in the list A2:A4.",
      initialData: [["List", "Pos"], ["Apple", ""], ["Banana", ""], ["Orange", ""]],
      targetCell: [1, 1],
      expectedFormula: "MATCH(\"Banana\",A2:A4,0)",
      expectedValue: 2
    }
  },
  {
    id: "filter",
    title: "FILTER Function",
    category: "lookup",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "The Dynamic Sieve: FILTER",
      description: "The FILTER function allows you to extract all rows from a range that meet one or more criteria you define. It automatically 'spills' the results into multiple cells.",
      concept: "Unlike SUMIF which just gives you a total, FILTER gives you the actual data. It's like having a permanent 'Filter' button applied that updates instantly when your data changes."
    },
    internalLogic: "Excel creates a 'boolean array' (a list of TRUEs and FALSEs) for every row in your range based on your criteria. It then collects every row that marked TRUE and outputs them as a dynamic array.",
    whyItExists: "Before FILTER, extracting a subset of data (like 'All sales in New York') required complex array formulas or manual copying. FILTER makes this process simple, dynamic, and automated.",
    whenToUse: "Use FILTER whenever you want to create a 'sub-list' from a larger table based on conditions.",
    realWorldUseCases: [
      "Extracting all 'Overdue' tasks into a separate daily to-do list.",
      "Showing only 'High Priority' customers in a dashboard.",
      "Filtering a sales report to show only one specific region.",
      "Isolating error rows in a dataset for cleanup."
    ],
    businessExample: {
      scenario: "A manager wants to see a list of all employees in the 'Sales' department.",
      formula: "=FILTER(A2:C100, B2:B100=\"Sales\")"
    },
    syntax: "=FILTER(array, include, [if_empty])",
    syntaxBreakdown: [
      { arg: "array", desc: "The entire range of data you want to filter (multiple columns allowed)." },
      { arg: "include", desc: "The logical test (e.g., A2:A10 > 50). This must be the same height/width as your array." },
      { arg: "if_empty", desc: "Optional. What to show if no rows match (e.g., \"No Results\")." }
    ],
    detailedExamples: [
      {
        title: "Example: High Sale Extraction",
        table: {
          headers: ["Rep", "Sales", "Formula", "High Sales List"],
          rows: [
            ["John", "500", "=FILTER(A2:B4, B2:B4>600)", "Jane | 950"],
            ["Jane", "950", "", ""],
            ["Bob", "300", "", ""]
          ]
        },
        stepByStep: [
          "Excel checks the Sales column (B2:B4).",
          "It finds only Row 3 (Jane) is > 600.",
          "It returns the entire row for Jane.",
          "The data 'spills' into the adjacent cells."
        ]
      }
    ],
    commonMistakes: [
      { title: "#SPILL! error.", desc: "Ensure the cells below and to the right of your formula are empty so the data has room to appear." },
      { title: "Criteria range mismatch.", desc: "Your 'include' range must be the same number of rows as your 'array'." }
    ],
    limitations: "Only available in Office 365 and Excel 2021+. It does not format the results (you have to apply currency/date formatting yourself).",
    bestPractices: [
      "Use FILTER inside a SORT function (e.g., =SORT(FILTER(...))) to get an organized sub-list."
    ],
    proTips: [
      "To use multiple criteria (AND), multiply them: =FILTER(A2:C10, (B2:B10=\"Sales\") * (C2:C10>500))."
    ],
    relatedFunctions: ["UNIQUE", "SORT", "XLOOKUP"],
    comparison: "VLOOKUP finds ONE item. FILTER finds EVERY item that matches.",
    miniChallenge: {
      question: "Filter range A1:B10 where column A equals \"Red\".",
      expectedAnswer: "=FILTER(A1:B10, A1:A10=\"Red\")"
    },
    practice: {
      instructions: "In cell C2, use FILTER to show rows from A2:B4 where the category (A2:A4) is \"Fruit\".",
      initialData: [["Type", "Val", "Result"], ["Fruit", 10, ""], ["Veg", 20, ""], ["Fruit", 30, ""]],
      targetCell: [1, 2],
      expectedFormula: "FILTER(A2:B4,A2:A4=\"Fruit\")",
      expectedValue: "Fruit"
    }
  }
];
