export const infoLessons = [
  {
    id: "cell",
    title: "CELL Function",
    category: "info",
    difficulty: "Advanced",
    xp: 250,
    introduction: {
      title: "The Cell Spy: CELL",
      description: "The CELL function returns information about the formatting, location, or contents of a cell. It is a versatile tool for building dynamic workbooks that react to their own structure.",
      concept: "Think of it as a 'Cell Inspector'. You send it to a specific cell, and it reports back with technical details like its address, its row number, or even its number format."
    },
    internalLogic: "CELL looks into the metadata of the worksheet and the workbook. It retrieves properties of the target cell from Excel's internal grid mapping. Note that it is 'volatile', meaning it recalculates whenever any change is made to the workbook.",
    whyItExists: "Sometimes you need your formulas to 'know' where they are or what the file is named. CELL provides this structural awareness, allowing you to create formulas that change behavior based on their location or formatting.",
    whenToUse: "Use CELL when you need to extract the sheet name from the file path, check the formatting of a cell, or build dynamic references based on row and column numbers.",
    realWorldUseCases: [
      "Extracting the current worksheet name for use in a header.",
      "Auditing a sheet to find cells with specific types of data (labels vs values).",
      "Building dynamic headers that display the cell's own address."
    ],
    businessExample: {
      scenario: "An accountant wants to automatically display the absolute address of a 'Total' cell in a summary report to ensure it's easily traceable.",
      formula: "=CELL(\"address\", B2)"
    },
    syntax: "CELL(info_type, [reference])",
    syntaxBreakdown: [
      { arg: "info_type", desc: "A text value (in quotes) that specifies the type of cell information you want (e.g., \"address\", \"row\", \"type\")." },
      { arg: "reference", desc: "The cell that you want information about. If omitted, it defaults to the last cell that was changed." }
    ],
    detailedExamples: [
      {
        title: "Example: Examining a Product Cell",
        table: {
          headers: ["Formula", "Reference Cell", "Result", "Meaning"],
          rows: [
            ["=CELL(\"address\", B2)", "$B$2", "$B$2", "Absolute cell address."],
            ["=CELL(\"row\", B2)", "Row 2", "2", "Row number."],
            ["=CELL(\"type\", B2)", "\"Widget\"", "v", "Value (v), Label (l), or Blank (b)."],
            ["=CELL(\"format\", B2)", "$25.00", "C2", "Currency format code."]
          ]
        },
        stepByStep: [
          "The function receives the request for 'address'.",
          "It looks at cell B2.",
          "It finds the absolute reference $B$2.",
          "It returns that string as the result."
        ]
      }
    ],
    commonMistakes: [
      { title: "Forgetting quotes.", desc: "Using CELL(address, B2) without quotes around 'address' returns a #NAME? error." },
      { title: "Workbook not saved.", desc: "CELL(\"filename\") returns an empty string if the workbook has never been saved to a disk." }
    ],
    proTips: [
      "Combine CELL(\"filename\") with MID and SEARCH to extract just the sheet name.",
      "CELL is a 'volatile' function; use it sparingly in very large workbooks to avoid slowing down performance."
    ],
    relatedFunctions: ["INFO", "ADDRESS", "INDIRECT"],
    miniChallenge: {
      question: "If cell A1 contains text, what does =CELL(\"type\", A1) return?",
      expectedAnswer: "l"
    },
    practice: {
      instructions: "In cell B4, use the CELL function to find the row number of cell A1.",
      initialData: [
        ["Data", "Value"],
        ["Sample", 150],
        ["", ""],
        ["Row of A1", ""]
      ],
      targetCell: [3, 1],
      expectedFormula: "CELL(\"row\", A1)",
      expectedValue: 1
    }
  },
  {
    id: "error.type",
    title: "ERROR.TYPE Function",
    category: "info",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "The Error ID: ERROR.TYPE",
      description: "The ERROR.TYPE function returns a number that corresponds to a specific Excel error type. It's used for detailed debugging and error handling.",
      concept: "Think of it as an 'Error Fingerprint Reader'. It doesn't just tell you there's an error; it tells you exactly which one it is by giving you a unique code."
    },
    internalLogic: "Excel has a mapping of error values to integers from 1 to 8. ERROR.TYPE checks the input against this map and returns the corresponding integer.",
    whyItExists: "Not all errors are equal. A #DIV/0! error might require a different fix than a #N/A error. ERROR.TYPE allows you to distinguish between them programmatically.",
    whenToUse: "Use ERROR.TYPE in nested IF or SWITCH statements to provide custom messages or different logical paths based on the specific error encountered.",
    realWorldUseCases: [
      "Displaying 'Please provide data' for #N/A and 'Check math' for #DIV/0!.",
      "Building a diagnostic tool that explains what's wrong with a formula.",
      "Categorizing errors in a large audit log."
    ],
    businessExample: {
      scenario: "A data analyst wants to show a custom message when a VLOOKUP fails specifically because an item is missing (#N/A).",
      formula: "=IF(ERROR.TYPE(A2)=7, \"Item Not Found\", \"System Error\")"
    },
    syntax: "ERROR.TYPE(error_val)",
    syntaxBreakdown: [
      { arg: "error_val", desc: "The error value you want to identify. This can be a cell reference containing an error or a formula." }
    ],
    detailedExamples: [
      {
        title: "Example: Error Code Mapping",
        table: {
          headers: ["Error Value", "Formula", "Result", "Error Name"],
          rows: [
            ["#DIV/0!", "=ERROR.TYPE(A2)", "2", "Division by Zero"],
            ["#N/A", "=ERROR.TYPE(A3)", "7", "Not Available"],
            ["#VALUE!", "=ERROR.TYPE(A4)", "3", "Value Error"],
            ["#REF!", "=ERROR.TYPE(A5)", "4", "Reference Error"]
          ]
        },
        stepByStep: [
          "The function looks at the error in A3 (#N/A).",
          "It looks up the code for #N/A in Excel's internal table.",
          "It finds that #N/A corresponds to the number 7.",
          "It returns 7."
        ]
      }
    ],
    commonMistakes: [
      { title: "Testing non-errors.", desc: "If you apply ERROR.TYPE to a value that is NOT an error, it returns #N/A. Use ISERROR first to check." },
      { title: "Confusing with ISERROR.", desc: "ISERROR returns TRUE/FALSE; ERROR.TYPE returns a number (1-8)." }
    ],
    proTips: [
      "Use SWITCH(ERROR.TYPE(A1), 2, \"Zero Div\", 7, \"Missing\", \"Other\") for cleaner multi-error handling.",
      "The code 1 is for #NULL!, 5 for #NAME?, 6 for #NUM!, and 8 for #GETTING_DATA."
    ],
    relatedFunctions: ["ISERROR", "IFERROR", "IFNA"],
    miniChallenge: {
      question: "What number does ERROR.TYPE return for a #NAME? error?",
      expectedAnswer: "5"
    },
    practice: {
      instructions: "In cell B2, use ERROR.TYPE to identify the error code for the #REF! error in cell A2.",
      initialData: [
        ["Error", "Code"],
        ["#REF!", ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "ERROR.TYPE(A2)",
      expectedValue: 4
    }
  },
  {
    id: "info",
    title: "INFO Function",
    category: "info",
    difficulty: "Advanced",
    xp: 250,
    introduction: {
      title: "The System Reporter: INFO",
      description: "The INFO function returns information about the current operating environment, including the operating system, Excel version, and calculation mode.",
      concept: "Think of it as a 'System Info' tab. It tells you technical details about the computer and the Excel application itself rather than the data in your cells."
    },
    internalLogic: "INFO queries the operating system and Excel's internal settings to retrieve environment variables and status indicators.",
    whyItExists: "Some spreadsheets behave differently on Mac vs Windows, or need to know if calculation mode is set to Manual before running complex macros. INFO provides this context.",
    whenToUse: "Use INFO to check the OS version, find the current directory path, or determine how many sheets are currently active in memory.",
    realWorldUseCases: [
      "Displaying the current folder path in a template.",
      "Warning users if their Excel is set to 'Manual Calculation'.",
      "Building platform-aware formulas that adjust for Windows vs Mac."
    ],
    businessExample: {
      scenario: "A project manager wants to ensure all team members have their Excel set to 'Automatic' calculation to avoid errors.",
      formula: "=IF(INFO(\"recalc\")=\"Manual\", \"Warning: Set to Automatic!\", \"OK\")"
    },
    syntax: "INFO(type_text)",
    syntaxBreakdown: [
      { arg: "type_text", desc: "A text value (in quotes) specifying the type of environment info you want (e.g., \"directory\", \"osversion\")." }
    ],
    detailedExamples: [
      {
        title: "Example: System Checks",
        table: {
          headers: ["Formula", "Result (Example)", "Meaning"],
          rows: [
            ["=INFO(\"directory\")", "C:\\Users\\Finance\\", "Current folder path."],
            ["=INFO(\"osversion\")", "Windows 64-bit", "Operating system details."],
            ["=INFO(\"recalc\")", "Automatic", "Current calculation mode."],
            ["=INFO(\"system\")", "pcdos", "General system platform."]
          ]
        },
        stepByStep: [
          "The function receives the request for 'recalc'.",
          "It queries Excel's calculation settings.",
          "It detects the mode is set to 'Automatic'.",
          "It returns the text 'Automatic'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using 'memavail'.", desc: "The 'memavail' (available memory) argument is deprecated and returns #N/A in modern Excel." },
      { title: "Missing quotes.", desc: "Like the CELL function, the type_text argument must be enclosed in quotation marks." }
    ],
    proTips: [
      "Use INFO(\"numfile\") to quickly see how many workbooks are currently open.",
      "Note that 'osversion' may return very technical strings that vary widely between system updates."
    ],
    relatedFunctions: ["CELL", "SHEETS"],
    miniChallenge: {
      question: "Which INFO argument would you use to find the file path of the current folder?",
      expectedAnswer: "directory"
    },
    practice: {
      instructions: "In cell B2, use the INFO function to find the current calculation mode.",
      initialData: [
        ["Setting", "Value"],
        ["Recalc Mode", ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "INFO(\"recalc\")",
      expectedValue: "Automatic"
    }
  },
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
    syntax: "ISBLANK(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The cell reference or value you want to check (usually a single cell like A1)." }
    ],
    detailedExamples: [
      {
        title: "Example: Truly Empty vs. Empty Strings",
        table: {
          headers: ["Cell Content", "Formula", "Result", "Reason"],
          rows: [
            ["(Totally Empty)", "=ISBLANK(A2)", "TRUE", "Cell is truly empty."],
            [" ", "=ISBLANK(A3)", "FALSE", "Contains a space character."],
            ["0", "=ISBLANK(A4)", "FALSE", "Zero is a numeric value."],
            ["=\"\"", "=ISBLANK(A5)", "FALSE", "Contains a formula (even if result looks empty)."]
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
      { title: "Expecting TRUE for empty strings.", desc: "If a formula returns \"\", ISBLANK returns FALSE. Use A1=\"\" instead to catch both truly empty cells and empty-looking formulas." },
      { title: "Spaces in cells.", desc: "A cell that looks empty but contains a space ' ' will return FALSE." }
    ],
    proTips: [
      "Use =NOT(ISBLANK(A1)) to check if a cell contains any information.",
      "ISBLANK doesn't work on ranges (like A1:A10) unless you are using Dynamic Arrays (Microsoft 365)."
    ],
    relatedFunctions: ["ISTEXT", "ISNUMBER", "ISNONTEXT"],
    miniChallenge: {
      question: "If cell A1 contains a single space, what will =ISBLANK(A1) return?",
      expectedAnswer: "FALSE"
    },
    practice: {
      instructions: "In cell C2, use ISBLANK to check if the 'Age' in cell B2 is missing.",
      initialData: [
        ["Name", "Age", "ISBLANK?"],
        ["John", 25, ""],
        ["Sarah", "", ""]
      ],
      targetCell: [2, 2],
      expectedFormula: "ISBLANK(B3)",
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
      description: "The ISERROR function checks if a value results in any Excel error. It returns TRUE for ANY error type, including #N/A.",
      concept: "Think of it as a 'Smoke Detector'. If any part of a formula catches fire and breaks, ISERROR rings the bell. It is the most comprehensive way to check for mistakes."
    },
    internalLogic: "Excel evaluates the input. If the underlying value is any of the standard error types (#N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, or #NULL!), it returns TRUE.",
    whyItExists: "Complex spreadsheets often have 'cascading' errors—one mistake in cell A1 causes errors in many other cells. ISERROR allows you to catch errors and stop them from spreading.",
    whenToUse: "Use ISERROR when you want to handle ANY kind of problem in a cell. It's the ultimate safety net for your formulas.",
    realWorldUseCases: [
      "Checking if a complex engineering formula is valid.",
      "Hiding errors in client-facing reports.",
      "Creating a 'Dashboard Health' check that flags any broken formulas."
    ],
    businessExample: {
      scenario: "A financial report has many divisions. If any division has a math error, the total shows an error. The user wants to flag the error rows.",
      formula: "=IF(ISERROR(A2), \"Fix This!\", A2)"
    },
    syntax: "ISERROR(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value, expression, or cell reference you want to test for errors." }
    ],
    detailedExamples: [
      {
        title: "Example: Catching Any Error",
        table: {
          headers: ["Input", "Result", "Reason"],
          rows: [
            ["100", "FALSE", "Standard number, no error."],
            ["#DIV/0!", "TRUE", "Division by zero error."],
            ["#N/A", "TRUE", "Not Available error."],
            ["#VALUE!", "TRUE", "Wrong data type error."]
          ]
        },
        stepByStep: [
          "Excel tries to calculate 10 divided by 0.",
          "It produces a #DIV/0! error.",
          "ISERROR sees the error and returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with ISERR.", desc: "ISERR is almost the same but it does NOT catch #N/A. ISERROR catches everything." },
      { title: "Masking genuine problems.", desc: "If you use IF(ISERROR(...), \"\", ...), you might hide a mistake you actually need to fix." }
    ],
    proTips: [
      "Use IFERROR(A1, \"Error\") for cleaner formulas in modern Excel.",
      "ISERROR is useful when you need to specifically identify AND process the error rather than just replacing it."
    ],
    relatedFunctions: ["ISERR", "ISNA", "IFERROR", "IFNA"],
    miniChallenge: {
      question: "If a VLOOKUP returns #N/A, does ISERROR(VLOOKUP(...)) return TRUE or FALSE?",
      expectedAnswer: "TRUE"
    },
    practice: {
      instructions: "In cell B2, use ISERROR to check if the result in cell A2 (=10/0) is an error.",
      initialData: [
        ["Expression", "Error?"],
        ["#DIV/0!", ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "ISERROR(A2)",
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
    syntax: "ISEVEN(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The numeric value you want to test. If it is not an integer, Excel truncates it." }
    ],
    detailedExamples: [
      {
        title: "Example: Even vs. Odd",
        table: {
          headers: ["Value", "Formula", "Result", "Reason"],
          rows: [
            ["10", "=ISEVEN(10)", "TRUE", "10 is even."],
            ["15", "=ISEVEN(15)", "FALSE", "15 is odd."],
            ["0", "=ISEVEN(0)", "TRUE", "Zero is even."],
            ["-4", "=ISEVEN(-4)", "TRUE", "Negative even number."],
            ["2.9", "=ISEVEN(2.9)", "TRUE", "Truncated to 2 (even)."]
          ]
        },
        stepByStep: [
          "Excel looks at the number 2.9.",
          "It truncates the decimal part, leaving the integer 2.",
          "Since 2 is divisible by 2, it returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using text.", desc: "ISEVEN returns #VALUE! if the input is text (e.g., \"Ten\")." },
      { title: "Expectation of rounding.", desc: "ISEVEN(1.9) returns FALSE because it truncates to 1 (odd). It does NOT round to 2." }
    ],
    proTips: [
      "Use =ISEVEN(ROW()) in Conditional Formatting to highlight every other row.",
      "ISEVEN works correctly with negative numbers."
    ],
    relatedFunctions: ["ISODD", "MOD", "ROW"],
    miniChallenge: {
      question: "What does =ISEVEN(3.14) return?",
      expectedAnswer: "FALSE"
    },
    practice: {
      instructions: "In cell B2, use ISEVEN to check if the value in cell A2 is even.",
      initialData: [
        ["Value", "ISEVEN"],
        [24, ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "ISEVEN(A2)",
      expectedValue: true
    }
  },
  {
    id: "isformula",
    title: "ISFORMULA Function",
    category: "info",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "The Audit Tool: ISFORMULA",
      description: "The ISFORMULA function checks whether a cell contains a formula. It returns TRUE if it's a formula and FALSE if it's a hard-coded value.",
      concept: "Think of it as a 'Recipe Detector'. It tells you if a cell result is just a number someone typed in, or if there is a 'recipe' (formula) behind it calculating the result."
    },
    internalLogic: "Excel checks the underlying storage of the cell. If it starts with an equals sign (=), it is flagged as a formula, even if the result is a simple constant like =100.",
    whyItExists: "Auditing large spreadsheets is hard. You need to know which cells are calculated and which are manual inputs to prevent accidentally overwriting important logic.",
    whenToUse: "Use ISFORMULA for data auditing, creating conditional formatting to highlight calculated cells, or protecting your sheet from data entry errors.",
    realWorldUseCases: [
      "Highlighting all cells that contain formulas to distinguish them from inputs.",
      "Counting how many cells in a range are calculated vs manually entered.",
      "Displaying a warning if someone overwrites a formula with a number."
    ],
    businessExample: {
      scenario: "A budget manager wants to highlight all cells in a spreadsheet that contain formulas to prevent team members from accidentally deleting them.",
      formula: "=ISFORMULA(A1)"
    },
    syntax: "ISFORMULA(reference)",
    syntaxBreakdown: [
      { arg: "reference", desc: "The cell reference you want to test." }
    ],
    detailedExamples: [
      {
        title: "Example: Formulas vs Constants",
        table: {
          headers: ["Cell Content", "Formula", "Result", "Reason"],
          rows: [
            ["100", "=ISFORMULA(A1)", "FALSE", "Static number."],
            ["=SUM(10,20)", "=ISFORMULA(A2)", "TRUE", "Calculated by formula."],
            ["Hello", "=ISFORMULA(A3)", "FALSE", "Static text."],
            ["=A1+50", "=ISFORMULA(A4)", "TRUE", "Formula reference."]
          ]
        },
        stepByStep: [
          "Excel looks at cell A2.",
          "It sees that the cell starts with '='.",
          "It identifies it as a formula.",
          "It returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Inputting text.", desc: "Entering =ISFORMULA(\"=A1\") will return FALSE because the input is a text string, not a cell reference." },
      { title: "Version compatibility.", desc: "ISFORMULA is available in Excel 2013 and later. It won't work in very old versions." }
    ],
    proTips: [
      "Pair ISFORMULA with Conditional Formatting to automatically color-code your spreadsheet logic.",
      "Use =NOT(ISFORMULA(A1)) to find cells that should have formulas but were overwritten with values."
    ],
    relatedFunctions: ["FORMULATEXT", "CELL", "TYPE"],
    miniChallenge: {
      question: "If A1 contains '=10+5', what does ISFORMULA(A1) return?",
      expectedAnswer: "TRUE"
    },
    practice: {
      instructions: "In cell B3, use ISFORMULA to check if cell A3 contains a formula.",
      initialData: [
        ["Cell Content", "ISFORMULA?"],
        [500, ""],
        ["=TODAY()", ""]
      ],
      targetCell: [2, 1],
      expectedFormula: "ISFORMULA(A3)",
      expectedValue: true
    }
  },
  {
    id: "islogical",
    title: "ISLOGICAL Function",
    category: "info",
    difficulty: "Intermediate",
    xp: 150,
    introduction: {
      title: "The Boolean Check: ISLOGICAL",
      description: "The ISLOGICAL function checks whether a value is a logical value (TRUE or FALSE).",
      concept: "Think of it as a 'Switch Tester'. It checks if the data is a pure 'On/Off' (TRUE/FALSE) value rather than text or a number."
    },
    internalLogic: "Excel checks the data type. Only the boolean constants TRUE and FALSE (and formulas that result in them) return TRUE. Text that says \"TRUE\" is not the same as the logical value TRUE.",
    whyItExists: "Complex logical formulas (like nested IFs) require pure TRUE/FALSE inputs. ISLOGICAL helps verify your inputs are correct before they break your logic.",
    whenToUse: "Use ISLOGICAL when you are processing data from checkboxes, user-defined flags, or comparison results.",
    realWorldUseCases: [
      "Verifying if a 'Approval' column contains actual TRUE/FALSE values or just text.",
      "Debugging comparison formulas that might be returning unexpected types.",
      "Data validation for logical columns."
    ],
    businessExample: {
      scenario: "A project manager wants to ensure a 'Status' column only contains logical TRUE/FALSE values for automated reporting.",
      formula: "=IF(ISLOGICAL(A2), \"Valid\", \"Error: Not Logical\")"
    },
    syntax: "ISLOGICAL(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value or cell reference you want to test." }
    ],
    detailedExamples: [
      {
        title: "Example: Logical vs Text/Numbers",
        table: {
          headers: ["Input", "Formula", "Result", "Reason"],
          rows: [
            ["TRUE", "=ISLOGICAL(A1)", "TRUE", "Actual logical TRUE."],
            ["FALSE", "=ISLOGICAL(A2)", "TRUE", "Actual logical FALSE."],
            ["1", "=ISLOGICAL(A3)", "FALSE", "Number 1 is not logical."],
            ["\"TRUE\"", "=ISLOGICAL(A4)", "FALSE", "Text string \"TRUE\" is not logical."]
          ]
        },
        stepByStep: [
          "Excel looks at cell A4 (the text \"TRUE\").",
          "It sees that this is a string of characters, not a boolean value.",
          "ISLOGICAL returns FALSE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Text 'TRUE' vs Logical TRUE.", desc: "One of the most common errors. ISLOGICAL(\"TRUE\") is FALSE. ISLOGICAL(TRUE) is TRUE." },
      { title: "Numbers 1 and 0.", desc: "In some systems, 1/0 are logical. In Excel, they are numbers, so ISLOGICAL returns FALSE." }
    ],
    proTips: [
      "Comparison results like =A1>10 always return logical values, so ISLOGICAL(A1>10) is always TRUE.",
      "Convert text 'TRUE' to logical using =A1=\"TRUE\"."
    ],
    relatedFunctions: ["ISTEXT", "ISNUMBER", "IF"],
    miniChallenge: {
      question: "Does ISLOGICAL(5>3) return TRUE or FALSE?",
      expectedAnswer: "TRUE"
    },
    practice: {
      instructions: "In cell B2, use ISLOGICAL to check if cell A2 contains a logical value.",
      initialData: [
        ["Input", "ISLOGICAL?"],
        [true, ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "ISLOGICAL(A2)",
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
    internalLogic: "Excel checks the error code. If it is exactly error code 7 (#N/A), it returns TRUE. This makes it more precise than ISERROR which catches everything.",
    whyItExists: "In a database, a #VALUE! error means your formula is broken, but a #N/A error might just mean a customer is new and isn't in the list yet. ISNA lets you treat 'Missing' differently from 'Broken'.",
    whenToUse: "Always use ISNA when working with VLOOKUP, MATCH, or XLOOKUP to identify items not found in your tables.",
    realWorldUseCases: [
      "Finding products that are missing from a price list.",
      "Identifying new employees not yet in the payroll system.",
      "Gracefully handling failed lookups."
    ],
    businessExample: {
      scenario: "A pricing tool looks up discounts. If a customer doesn't have a discount (#N/A), it should say 'No Discount'.",
      formula: "=IF(ISNA(VLOOKUP(A2, Rates, 2, 0)), \"No Discount\", \"Apply Discount\")"
    },
    syntax: "ISNA(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value or formula result you want to check for #N/A." }
    ],
    detailedExamples: [
      {
        title: "Example: Precision Error Checking",
        table: {
          headers: ["Input", "ISNA Result", "Reason"],
          rows: [
            ["150", "FALSE", "Valid number."],
            ["#N/A", "TRUE", "Specifically #N/A."],
            ["#VALUE!", "FALSE", "Error, but not #N/A."],
            ["#REF!", "FALSE", "Error, but not #N/A."]
          ]
        },
        stepByStep: [
          "Excel checks the input value #VALUE!.",
          "Is it #N/A? No.",
          "ISNA returns FALSE because this is a 'Value' error, not a 'Not Available' error."
        ]
      }
    ],
    commonMistakes: [
      { title: "Trying to catch #DIV/0!.", desc: "ISNA will ignore #DIV/0! or #REF!. If you want to catch all of them, use ISERROR." },
      { title: "Overlooking IFNA.", desc: "In newer Excel, IFNA is often simpler than using IF(ISNA(...))." }
    ],
    proTips: [
      "Use ISNA specifically when #N/A has a special business meaning (like 'Not Found') rather than indicating a bug in your formula.",
      "#N/A is the only error that charts often 'ignore' (skip over) instead of plotting as zero."
    ],
    relatedFunctions: ["ISERROR", "IFNA", "VLOOKUP", "MATCH"],
    miniChallenge: {
      question: "Does ISNA return TRUE for a #REF! error?",
      expectedAnswer: "FALSE"
    },
    practice: {
      instructions: "In cell B3, use ISNA to check if the result in cell A3 is an #N/A error.",
      initialData: [
        ["Lookup Result", "ISNA?"],
        ["Product A price", ""],
        ["#N/A", ""]
      ],
      targetCell: [2, 1],
      expectedFormula: "ISNA(A3)",
      expectedValue: true
    }
  },
  {
    id: "isnontext",
    title: "ISNONTEXT Function",
    category: "info",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Excluding Words: ISNONTEXT",
      description: "The ISNONTEXT function checks if a value is NOT text. It returns TRUE for numbers, blanks, logicals, and errors, and FALSE only for text strings.",
      concept: "The opposite of ISTEXT. It's like a 'Not a Word' filter. It flags everything that Excel doesn't handle as a character string."
    },
    internalLogic: "Excel evaluates the data type. If the type is not 'Text' (string), it returns TRUE. Note that empty cells are considered non-text.",
    whyItExists: "Sometimes it's easier to check what something IS NOT. If you want to perform math, you need to make sure the cell is NON-TEXT.",
    whenToUse: "Use ISNONTEXT to identify cells that can be safely used in numeric calculations or to find non-text entries in a list of names.",
    realWorldUseCases: [
      "Ensuring a cell doesn't contain a text label before multiplying it.",
      "Finding numeric or blank entries in a column that should only have text.",
      "Filtering out 'Label' rows in a mixed data set."
    ],
    businessExample: {
      scenario: "A data cleaner wants to find any entries in a 'Product Name' column that are accidentally numbers or blanks.",
      formula: "=IF(ISNONTEXT(A2), \"Check Entry\", \"OK\")"
    },
    syntax: "ISNONTEXT(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value or cell reference you want to test." }
    ],
    detailedExamples: [
      {
        title: "Example: Text vs. The Rest",
        table: {
          headers: ["Input", "Formula", "Result", "Reason"],
          rows: [
            ["Hello", "=ISNONTEXT(A1)", "FALSE", "This is text."],
            ["100", "=ISNONTEXT(A2)", "TRUE", "This is a number (non-text)."],
            ["TRUE", "=ISNONTEXT(A3)", "TRUE", "This is logical (non-text)."],
            ["(Blank)", "=ISNONTEXT(A4)", "TRUE", "Blanks are non-text."]
          ]
        },
        stepByStep: [
          "Excel looks at cell A2 (the number 100).",
          "It determines that 100 is a numeric type, not a text string.",
          "Since it is 'not text', ISNONTEXT returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Blanks are TRUE.", desc: "People often expect ISNONTEXT to only return TRUE for numbers. But it also returns TRUE for blank cells because a blank is not text." },
      { title: "Text-formatted numbers.", desc: "If a number is stored as text (e.g., '100), ISNONTEXT will return FALSE." }
    ],
    proTips: [
      "Dates are numbers in Excel, so ISNONTEXT returns TRUE for date cells.",
      "Use AND(ISNONTEXT(A1), NOT(ISBLANK(A1))) if you only want to catch numbers and errors, excluding blank cells."
    ],
    relatedFunctions: ["ISTEXT", "ISNUMBER", "ISBLANK"],
    miniChallenge: {
      question: "What does ISNONTEXT return for a cell containing the error #N/A?",
      expectedAnswer: "TRUE"
    },
    practice: {
      instructions: "In cell B3, use ISNONTEXT to check if cell A3 is non-text.",
      initialData: [
        ["Entry", "ISNONTEXT?"],
        ["Product", ""],
        [500, ""]
      ],
      targetCell: [2, 1],
      expectedFormula: "ISNONTEXT(A3)",
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
    syntax: "ISNUMBER(value)",
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
      { title: "Confusing text-numbers.", desc: "If a number is aligned to the left, it's probably text. ISNUMBER will return FALSE. Use VALUE(A1) to convert it back to a number." },
      { title: "Empty cells.", desc: "An empty cell is not a number. ISNUMBER(blank) is FALSE." }
    ],
    proTips: [
      "Use ISNUMBER with SEARCH: =ISNUMBER(SEARCH(\"keyword\", A1)) is the standard way to check if text contains a specific word.",
      "ISNUMBER is often faster than using error-checking functions when combined with lookup logic."
    ],
    relatedFunctions: ["ISTEXT", "ISNONTEXT", "ISERROR"],
    miniChallenge: {
      question: "Will =ISNUMBER(\"123\") return TRUE or FALSE?",
      expectedAnswer: "FALSE"
    },
    practice: {
      instructions: "In cell B2, use ISNUMBER to check if the value in cell A2 is a number.",
      initialData: [
        ["Input", "ISNUMBER?"],
        [250, ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "ISNUMBER(A2)",
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
    internalLogic: "Excel truncates any decimals (cuts them off) and then checks if the remaining integer is not divisible by 2.",
    whyItExists: "Complementary to ISEVEN, used for alternating logic, mathematical grouping, and visual formatting.",
    whenToUse: "Use ISODD for highlighting every other row starting from the first, or for logic that depends on 'leftover' items.",
    realWorldUseCases: [
      "Shading Rows 1, 3, 5... for readability.",
      "Assigning tasks to 'Team A' on odd-numbered days.",
      "Splitting a database into two groups based on unique IDs."
    ],
    businessExample: {
      scenario: "A manager wants to assign 'Office Cleaning' tasks to employees with odd-numbered desk IDs.",
      formula: "=IF(ISODD(A2), \"Cleaning Duty\", \"Off\")"
    },
    syntax: "ISODD(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The numeric value to test. Decimals are truncated (not rounded)." }
    ],
    detailedExamples: [
      {
        title: "Example: Odds and Evens",
        table: {
          headers: ["Input", "Formula", "Result", "Reason"],
          rows: [
            ["7", "=ISODD(7)", "TRUE", "7 is odd."],
            ["12", "=ISODD(12)", "FALSE", "12 is even."],
            ["-5", "=ISODD(-5)", "TRUE", "Negative odd number."],
            ["0", "=ISODD(0)", "FALSE", "Zero is even."],
            ["3.9", "=ISODD(3.9)", "TRUE", "Truncates to 3 (odd)."]
          ]
        },
        stepByStep: [
          "Excel looks at the number 3.9.",
          "It ignores the .9 and keeps the 3.",
          "Since 3 is odd, it returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Non-numeric input.", desc: "Pointing ISODD at a text cell results in a #VALUE! error." },
      { title: "Zero is even.", desc: "Many forget that zero is considered even, so ISODD(0) is always FALSE." }
    ],
    proTips: [
      "Use =ISODD(ROW()) in Conditional Formatting to highlight the 1st, 3rd, 5th... rows.",
      "Combine with COUNT to check if a range has an odd number of entries."
    ],
    relatedFunctions: ["ISEVEN", "MOD", "ROW"],
    miniChallenge: {
      question: "What does =ISODD(4.2) return?",
      expectedAnswer: "FALSE"
    },
    practice: {
      instructions: "In cell B2, use ISODD to check if cell A2 contains an odd number.",
      initialData: [
        ["Value", "ISODD"],
        [31, ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "ISODD(A2)",
      expectedValue: true
    }
  },
  {
    id: "isomitted",
    title: "ISOMITTED Function",
    category: "info",
    difficulty: "Advanced",
    xp: 250,
    introduction: {
      title: "Optional Argument Checker: ISOMITTED",
      description: "The ISOMITTED function checks whether an optional argument in a LAMBDA function has been provided or left out.",
      concept: "Think of it as an 'Optional Ingredient' check in a recipe. It tells the function, 'If the user didn't give you this specific ingredient, use a default instead'."
    },
    internalLogic: "This function only operates within the context of a LAMBDA function. It evaluates the parameters passed to the LAMBDA and returns TRUE if a specific parameter was not passed.",
    whyItExists: "In Excel 365, LAMBDA allows you to create your own custom functions. ISOMITTED is the only way to make parts of your custom function optional.",
    whenToUse: "Use ISOMITTED inside a LAMBDA to provide default values for arguments that the user might not always want to type.",
    realWorldUseCases: [
      "Creating a tax calculator where the 'Tax Rate' defaults to 10% if left blank.",
      "Building a greeting function that says 'Hello World' if no name is provided.",
      "Designing complex math formulas with optional parameters."
    ],
    businessExample: {
      scenario: "A developer wants to create a custom 'Bonus' function that calculates 15% bonus by default, but allows a custom percentage.",
      formula: "=LAMBDA(sal, [pct], IF(ISOMITTED(pct), sal*0.15, sal*pct))"
    },
    syntax: "ISOMITTED(argument)",
    syntaxBreakdown: [
      { arg: "argument", desc: "The name of the parameter in the LAMBDA function that you want to check." }
    ],
    detailedExamples: [
      {
        title: "Example: Defaults with LAMBDA",
        table: {
          headers: ["LAMBDA Call", "Input", "Result", "Reason"],
          rows: [
            ["=LAMBDA(x,[y],IF(ISOMITTED(y),x*2,x+y))(5)", "5", "10", "y was omitted, so 5 * 2."],
            ["=LAMBDA(x,[y],IF(ISOMITTED(y),x*2,x+y))(5,3)", "5 and 3", "8", "y was 3, so 5 + 3."]
          ]
        },
        stepByStep: [
          "The LAMBDA is called with only one argument (5).",
          "Inside the formula, ISOMITTED(y) checks if a second argument exists.",
          "Since it's missing, ISOMITTED returns TRUE.",
          "The IF statement then executes x*2 (5*2) = 10."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using outside LAMBDA.", desc: "If you use ISOMITTED in a regular cell formula outside of a LAMBDA, it will return a #VALUE! error." },
      { title: "Quoting the argument.", desc: "Do not put the argument name in quotes. Use ISOMITTED(arg), not ISOMITTED(\"arg\")." }
    ],
    proTips: [
      "Always put optional arguments in square brackets [ ] in your LAMBDA definition.",
      "This function is only available in Microsoft 365 and Excel 2021+."
    ],
    relatedFunctions: ["LAMBDA", "LET", "IF"],
    miniChallenge: {
      question: "Can ISOMITTED be used to check if a regular cell like A1 is empty?",
      expectedAnswer: "No"
    },
    practice: {
      instructions: "In cell B2, create a LAMBDA function with an optional parameter 'b' that calculates 'a' squared if 'b' is omitted, and 'a' to the power of 'b' if provided. Test it with a=4 and omit b.",
      initialData: [
        ["Formula", "Result"],
        ["", ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "LAMBDA(a, [b], IF(ISOMITTED(b), a^2, a^b))(4)",
      expectedValue: 16
    }
  },
  {
    id: "isref",
    title: "ISREF Function",
    category: "info",
    difficulty: "Advanced",
    xp: 200,
    introduction: {
      title: "The Reference Validator: ISREF",
      description: "The ISREF function checks whether a value is a valid cell reference. It returns TRUE for references and FALSE for anything else.",
      concept: "Think of it as a 'GPS Coordinate Checker'. It tells you if the 'address' you've provided actually points to a location on the spreadsheet grid."
    },
    internalLogic: "Excel checks if the input is a pointer to a cell or range. Text strings that look like addresses (e.g., \"A1\") are NOT references; only actual grid selections or results from functions like INDIRECT are.",
    whyItExists: "When using functions like INDIRECT to build dynamic addresses, it's easy to create invalid ones. ISREF helps you verify the address exists before you try to use it.",
    whenToUse: "Use ISREF to validate named ranges, check if a sheet still exists, or verify results from complex lookup functions.",
    realWorldUseCases: [
      "Checking if a named range (e.g., 'TotalSales') has been defined in the workbook.",
      "Validating a dynamic reference created by the INDIRECT function.",
      "Ensuring a formula doesn't break when columns or sheets are deleted."
    ],
    businessExample: {
      scenario: "A dashboard creator uses INDIRECT to pull data from different sheets. If the sheet name is typed wrong, they want to show 'Invalid Sheet'.",
      formula: "=IF(ISREF(INDIRECT(A2 & \"!A1\")), \"Valid\", \"Invalid Sheet\")"
    },
    syntax: "ISREF(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value or cell reference you want to test." }
    ],
    detailedExamples: [
      {
        title: "Example: Valid vs. Invalid References",
        table: {
          headers: ["Input", "Formula", "Result", "Reason"],
          rows: [
            ["A1", "=ISREF(A1)", "TRUE", "Direct cell reference."],
            ["\"A1\"", "=ISREF(\"A1\")", "FALSE", "Text string is not a reference."],
            ["100", "=ISREF(100)", "FALSE", "Number is not a reference."],
            ["Sheet99!A1", "=ISREF(Sheet99!A1)", "FALSE", "Sheet doesn't exist (assuming)."]
          ]
        },
        stepByStep: [
          "The function looks at the input (cell A1).",
          "It recognizes that A1 is a valid coordinate on the Excel grid.",
          "It returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Quotes around addresses.", desc: "ISREF(\"B5\") is always FALSE because \"B5\" is just text. Use ISREF(B5) or ISREF(INDIRECT(\"B5\"))." },
      { title: "Deleted references.", desc: "If you point ISREF to a cell that was deleted, it will return FALSE because the reference is now #REF!." }
    ],
    proTips: [
      "Use ISREF to check if a Named Range exists: =ISREF(MyRangeName).",
      "This is excellent for building robust templates that don't crash when users rename sheets."
    ],
    relatedFunctions: ["INDIRECT", "ADDRESS", "CELL"],
    miniChallenge: {
      question: "If A1 contains the text 'B5', does ISREF(A1) return TRUE or FALSE?",
      expectedAnswer: "TRUE"
    },
    practice: {
      instructions: "In cell B2, use ISREF to check if the input in cell A2 is a valid reference.",
      initialData: [
        ["Input", "ISREF?"],
        ["C3", ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "ISREF(C3)",
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
    syntax: "ISTEXT(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value or cell reference you want to check." }
    ],
    detailedExamples: [
      {
        title: "Example: Text vs. Numbers",
        table: {
          headers: ["Value", "Formula", "Result", "Reason"],
          rows: [
            ["Hello", "=ISTEXT(A2)", "TRUE", "Standard text string."],
            ["123", "=ISTEXT(A3)", "FALSE", "This is a numeric value."],
            ["'123", "=ISTEXT(A4)", "TRUE", "Apostrophe makes it text."],
            ["=\"\"", "=ISTEXT(A5)", "TRUE", "Empty string is still text."]
          ]
        },
        stepByStep: [
          "Excel looks at cell A4.",
          "Because of the leading apostrophe, the value 123 is stored as a character string.",
          "ISTEXT returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Blanks are not text.", desc: "ISBLANK(A1) is TRUE for empty cells, but ISTEXT(A1) is FALSE. Empty is its own type." },
      { title: "Dates are not text.", desc: "ISTEXT(TODAY()) is FALSE because dates are actually numbers." }
    ],
    proTips: [
      "Use ISTEXT to find those annoying 'Numbers stored as text' that are breaking your SUM formulas.",
      "An empty string (\"\") returns TRUE for ISTEXT because it's a 'zero-length string'."
    ],
    relatedFunctions: ["ISNONTEXT", "ISNUMBER", "ISBLANK"],
    miniChallenge: {
      question: "Does ISTEXT return TRUE for a cell containing the formula =\"\"?",
      expectedAnswer: "TRUE"
    },
    practice: {
      instructions: "In cell B2, use ISTEXT to check if cell A2 contains text.",
      initialData: [
        ["Data", "ISTEXT?"],
        ["Apple", ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "ISTEXT(A2)",
      expectedValue: true
    }
  },
  {
    id: "n",
    title: "N Function",
    category: "info",
    difficulty: "Advanced",
    xp: 200,
    introduction: {
      title: "The Force-to-Number: N",
      description: "The N function converts a value to a number. It is a simple tool for ensuring data is numeric, following specific conversion rules.",
      concept: "Think of it as a 'Number Translator'. It takes different types of data (dates, logic, text) and translates them into their numeric equivalent."
    },
    internalLogic: "N follows strict rules: Numbers stay the same, Dates become serial numbers, TRUE becomes 1, FALSE becomes 0, and anything else (like text) becomes 0. Errors pass through unchanged.",
    whyItExists: "N is a legacy function for compatibility with other spreadsheet programs. It's also used to add 'hidden' comments inside formulas without affecting the math.",
    whenToUse: "Use N when you need a quick way to turn TRUE/FALSE into 1/0, or when you want to embed a text comment inside a long formula.",
    realWorldUseCases: [
      "Converting logical test results into 1s and 0s for summation.",
      "Documenting complex formulas with internal notes.",
      "Standardizing mixed data for calculation."
    ],
    businessExample: {
      scenario: "An analyst wants to sum up a column of checkboxes (TRUE/FALSE) to see how many tasks are completed.",
      formula: "=SUM(N(A2), N(A3), N(A4))"
    },
    syntax: "N(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value you want to convert to a number." }
    ],
    detailedExamples: [
      {
        title: "Example: Conversion Rules",
        table: {
          headers: ["Input", "Formula", "Result", "Reason"],
          rows: [
            ["100", "=N(A1)", "100", "Numbers are unchanged."],
            ["TRUE", "=N(A2)", "1", "TRUE becomes 1."],
            ["\"Hello\"", "=N(A3)", "0", "Text becomes 0."],
            ["7/15/2024", "=N(A4)", "45488", "Dates become serial numbers."]
          ]
        },
        stepByStep: [
          "The function receives the input 'TRUE'.",
          "According to its rule, it converts logical TRUE to 1.",
          "It returns 1."
        ]
      }
    ],
    commonMistakes: [
      { title: "Text-numbers.", desc: "N(\"100\") returns 0, not 100. If you want to convert text numbers to actual numbers, use VALUE()." },
      { title: "Confusing with VALUE.", desc: "VALUE() is much smarter and can convert text like \"$10.00\" to 10. N() cannot." }
    ],
    proTips: [
      "Add a comment to a formula: =SUM(A1:A10) + N(\"Total Sales for Q1\"). Since N(\"text\") is 0, it doesn't change the sum!",
      "Modern users often use -- (double unary) instead of N() for logical conversion."
    ],
    relatedFunctions: ["VALUE", "T", "TYPE"],
    miniChallenge: {
      question: "What does =N(\"Excel\") return?",
      expectedAnswer: "0"
    },
    practice: {
      instructions: "In cell B2, use the N function to convert the logical value in cell A2 to a number.",
      initialData: [
        ["Input", "N()"],
        [false, ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "N(A2)",
      expectedValue: 0
    }
  },
  {
    id: "na",
    title: "NA Function",
    category: "info",
    difficulty: "Intermediate",
    xp: 150,
    introduction: {
      title: "Marking Missing Data: NA",
      description: "The NA function returns the #N/A error value, which stands for 'Not Available'.",
      concept: "Think of it as a 'Reserved Sign'. You use it to tell Excel (and other people) that the data for this cell is intentionally missing or not yet available."
    },
    internalLogic: "NA is one of the few functions that takes no arguments. It simply produces the specific error code for 'Not Available'. This error value has a special property: it 'propagates', meaning any formula that uses a cell with #N/A will also result in #N/A.",
    whyItExists: "A blank cell might mean 0, or it might mean someone forgot to enter data. #N/A explicitly states: 'This data does not exist'. It is also very useful for charts, as most Excel charts will skip #N/A points instead of plotting them as zero.",
    whenToUse: "Use NA() to mark empty spots in your data set where you don't want a zero to appear in your calculations or charts.",
    realWorldUseCases: [
      "Cleaning a data set where zeros would skew the average.",
      "Hiding specific data points in a line chart.",
      "Building a template where certain results are 'Not Applicable' based on logic."
    ],
    businessExample: {
      scenario: "A sales report should only show actual sales. If no sale happened, the manager wants it marked as #N/A so it doesn't lower the average sale calculation.",
      formula: "=IF(A2=0, NA(), A2)"
    },
    syntax: "NA()",
    syntaxBreakdown: [
      { arg: "none", desc: "This function does not take any arguments, but you must include the empty parentheses ( )." }
    ],
    detailedExamples: [
      {
        title: "Example: Creating #N/A",
        table: {
          headers: ["Task", "Formula", "Result", "Reason"],
          rows: [
            ["Mark missing", "=NA()", "#N/A", "Intentional error value."],
            ["Check value", "=ISNA(NA())", "TRUE", "Confirms it is #N/A."],
            ["Math on NA", "=10 + NA()", "#N/A", "Errors propagate."]
          ]
        },
        stepByStep: [
          "The function NA() is called.",
          "It ignores any inputs (since it has none).",
          "It returns the standard Excel error #N/A."
        ]
      }
    ],
    commonMistakes: [
      { title: "Forgetting parentheses.", desc: "If you type =NA without the ( ), Excel will return a #NAME? error because it thinks you are looking for a named range." },
      { title: "Confusion with 'Not Applicable'.", desc: "While #N/A means 'Not Available', many users use it for 'Not Applicable'. Both are valid uses!" }
    ],
    proTips: [
      "In a line chart, replace empty cells with =NA() to make the line 'break' or skip those points instead of dropping to zero.",
      "Use IFNA() to handle the result of your NA() functions later in your formula chain."
    ],
    relatedFunctions: ["ISNA", "IFNA", "IFERROR"],
    miniChallenge: {
      question: "What does NA() return if you put a number inside the parentheses like NA(5)?",
      expectedAnswer: "An error (Too many arguments)"
    },
    practice: {
      instructions: "In cell B2, simply call the NA function to return the #N/A error.",
      initialData: [
        ["Task", "Result"],
        ["Return NA", ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "NA()",
      expectedValue: "#N/A"
    }
  },
  {
    id: "sheet",
    title: "SHEET Function",
    category: "info",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "The Tab Number: SHEET",
      description: "The SHEET function returns the index number of the specified sheet. By default, it returns the number of the sheet where the formula is located.",
      concept: "Think of it as a 'Page Number' for your workbook. It tells you if a sheet is the 1st, 2nd, or 10th tab in your file."
    },
    internalLogic: "Excel looks at the order of the tabs at the bottom of the screen (from left to right). SHEET returns the position number of the sheet in that sequence.",
    whyItExists: "When building complex workbooks with many tabs, you sometimes need to know where a sheet is located relative to others, or you want to display 'Page X' in a dashboard.",
    whenToUse: "Use SHEET to create dynamic sheet references, build navigation aids, or automate summaries that pull from 'the next sheet' in the workbook.",
    realWorldUseCases: [
      "Displaying 'Dashboard (Sheet 1)' in a header.",
      "Creating a summary that automatically points to the next sheet by adding 1 to the current sheet number.",
      "Auditing a workbook to see where a specific reference is located."
    ],
    businessExample: {
      scenario: "A financial controller wants to display which tab number the current 'Expense Report' is in the monthly binder.",
      formula: "=\"Tab \" & SHEET() & \" of \" & SHEETS()"
    },
    syntax: "SHEET([value])",
    syntaxBreakdown: [
      { arg: "value", desc: "Optional. The name of a sheet or a cell reference for which you want to find the index number." }
    ],
    detailedExamples: [
      {
        title: "Example: Sheet Positions",
        table: {
          headers: ["Formula", "Result (Example)", "Meaning"],
          rows: [
            ["=SHEET()", "1", "Current sheet is the 1st tab."],
            ["=SHEET(Sheet3!A1)", "3", "Reference is on the 3rd tab."],
            ["=SHEET(\"Inventory\")", "5", "The sheet named 'Inventory' is 5th."]
          ]
        },
        stepByStep: [
          "The function SHEET(\"Inventory\") is called.",
          "Excel looks at the tab list from left to right.",
          "It finds 'Inventory' in the 5th position.",
          "It returns 5."
        ]
      }
    ],
    commonMistakes: [
      { title: "Quoting sheet names.", desc: "If you use a sheet name, it must be in quotes: SHEET(\"Data\"). If you use a reference, don't use quotes: SHEET(Data!A1)." },
      { title: "Hidden sheets.", desc: "Hidden sheets ARE counted in the numbering, which can be confusing if you only see 3 tabs but the function returns 5." }
    ],
    proTips: [
      "If you move (drag) a sheet tab to a new position, the result of the SHEET function will update automatically.",
      "Combine with SHEETS() to show progress through a workbook."
    ],
    relatedFunctions: ["SHEETS", "INFO", "CELL"],
    miniChallenge: {
      question: "If you have 3 tabs [Sales, Costs, Profit], what does SHEET(Profit!A1) return?",
      expectedAnswer: "3"
    },
    practice: {
      instructions: "In cell B2, use the SHEET function to find the number of the current sheet.",
      initialData: [
        ["Scenario", "Formula"],
        ["Current sheet #", ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "SHEET()",
      expectedValue: 1
    }
  },
  {
    id: "sheets",
    title: "SHEETS Function",
    category: "info",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Total Tab Count: SHEETS",
      description: "The SHEETS function returns the total number of sheets in a reference or the entire workbook.",
      concept: "Think of it as a 'Workbook Counter'. It tells you how many pages are in your spreadsheet 'book'."
    },
    internalLogic: "Excel counts the number of worksheets, chart sheets, and macro sheets. Without an argument, it counts every sheet in the current file. If given a 3D reference (e.g., Sheet1:Sheet5!A1), it counts the sheets in that range.",
    whyItExists: "Useful for dynamic reporting where the number of sheets might change (e.g., adding a new month), or for creating navigation that says 'Sheet 1 of 12'.",
    whenToUse: "Use SHEETS to find the total count of tabs in your file, or to verify how many sheets are included in a multi-sheet calculation.",
    realWorldUseCases: [
      "Automating a 'Table of Contents' that updates when you add new sheets.",
      "Checking if a 3D SUM formula covers the correct number of months.",
      "Displaying the total sheet count in a template."
    ],
    businessExample: {
      scenario: "A manager wants a cell that automatically shows how many monthly report tabs are currently in the workbook.",
      formula: "=\"Total Reports: \" & SHEETS()"
    },
    syntax: "SHEETS([reference])",
    syntaxBreakdown: [
      { arg: "reference", desc: "Optional. A reference for which you want to know the number of sheets. If omitted, it returns the total sheets in the workbook." }
    ],
    detailedExamples: [
      {
        title: "Example: Counting Sheets",
        table: {
          headers: ["Formula", "Context", "Result", "Reason"],
          rows: [
            ["=SHEETS()", "Workbook with 5 tabs", "5", "Total count in file."],
            ["=SHEETS(Sheet1:Sheet3!A1)", "Range of sheets", "3", "Counts sheets in the range."],
            ["=SHEETS(Data!A1)", "Single sheet ref", "1", "Only 1 sheet referenced."]
          ]
        },
        stepByStep: [
          "The function SHEETS() is called with no argument.",
          "Excel scans the current workbook's tab list.",
          "It finds 12 total tabs (including hidden ones).",
          "It returns 12."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with SHEET.", desc: "SHEET returns the *location* of one sheet. SHEETS returns the *total number* of sheets." },
      { title: "Version support.", desc: "SHEETS was introduced in Excel 2013. It will not work in Excel 2010 or earlier." }
    ],
    proTips: [
      "SHEETS() counts everything: visible sheets, hidden sheets, and 'very hidden' sheets.",
      "Combine with SHEET() for a dynamic 'Page X of Y' footer in your spreadsheet."
    ],
    relatedFunctions: ["SHEET", "INFO", "CELL"],
    miniChallenge: {
      question: "Does SHEETS() count hidden worksheets?",
      expectedAnswer: "Yes"
    },
    practice: {
      instructions: "In cell B2, use the SHEETS function to find the total number of sheets in the workbook.",
      initialData: [
        ["Query", "Formula"],
        ["Total sheets", ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "SHEETS()",
      expectedValue: 1
    }
  },
  {
    id: "type",
    title: "TYPE Function",
    category: "info",
    difficulty: "Advanced",
    xp: 250,
    introduction: {
      title: "Data Categorizer: TYPE",
      description: "The TYPE function returns a number representing the data type of a value.",
      concept: "Think of it as a 'Data Scanner'. It looks at a cell and categorizes it into a group: is it a Number? Text? A Logic value? Or an Error?"
    },
    internalLogic: "Excel assigns a specific code to each data type: 1 = Number, 2 = Text, 4 = Logical, 16 = Error, 64 = Array, and 128 = Compound data. TYPE checks the cell and returns that integer code.",
    whyItExists: "Some functions only work with certain types of data. TYPE allows you to check what kind of data you have before passing it to another function, avoiding errors.",
    whenToUse: "Use TYPE in complex logic to handle numbers and text differently, or to build custom data validation checks.",
    realWorldUseCases: [
      "Creating a 'Smart Sum' that only adds cells if they are type 1 (Number).",
      "Building a diagnostic tool that identifies the type of data entered by a user.",
      "Differentiating between the number 0 (Type 1) and a blank cell (which TYPE also treats as Type 1)."
    ],
    businessExample: {
      scenario: "A template creator wants to show a different message based on whether a user enters a Number or a Text string.",
      formula: "=CHOOSE(TYPE(A2), \"You entered a Number\", \"You entered Text\")"
    },
    syntax: "TYPE(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value or cell reference for which you want to identify the data type." }
    ],
    detailedExamples: [
      {
        title: "Example: Data Type Codes",
        table: {
          headers: ["Input", "Formula", "Result", "Type Name"],
          rows: [
            ["100", "=TYPE(A1)", "1", "Number"],
            ["\"Hello\"", "=TYPE(A2)", "2", "Text"],
            ["TRUE", "=TYPE(A3)", "4", "Logical"],
            ["#N/A", "=TYPE(A4)", "16", "Error"]
          ]
        },
        stepByStep: [
          "The function looks at the input (TRUE).",
          "It identifies that TRUE is a logical boolean value.",
          "According to Excel's mapping, Logical = 4.",
          "It returns 4."
        ]
      }
    ],
    commonMistakes: [
      { title: "Blank cells.", desc: "TYPE of a blank cell is 1 (Number), which can be confusing since the cell isn't actually a number." },
      { title: "Dates.", desc: "Since dates are numbers in Excel, TYPE(TODAY()) returns 1." }
    ],
    proTips: [
      "Combine with CHOOSE to turn those confusing numbers (1, 2, 4, 16) into readable labels like \"Number\", \"Text\", etc.",
      "TYPE cannot tell you if a cell has a formula; it only looks at the resulting value. Use ISFORMULA for that."
    ],
    relatedFunctions: ["ISNUMBER", "ISTEXT", "ISLOGICAL", "ISERROR", "ISFORMULA"],
    miniChallenge: {
      question: "What number does TYPE return for a text string?",
      expectedAnswer: "2"
    },
    practice: {
      instructions: "In cell B2, use TYPE to identify the data type of the value in cell A2.",
      initialData: [
        ["Data", "TYPE"],
        [3.14, ""]
      ],
      targetCell: [1, 1],
      expectedFormula: "TYPE(A2)",
      expectedValue: 1
    }
  }
];
