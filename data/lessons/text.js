export const textLessons = [
  {
    id: "arraytotext",
    title: "Convert an Array to a Text String: ARRAYTOTEXT Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Convert an Array to a Text String: ARRAYTOTEXT Function",
      description: "The ARRAYTOTEXT function converts an array or range into a text string. You can choose a concise format (comma-separated) or a strict format (wraps in braces, showing rows and columns).",
      concept: "Think of it as printing an array: either quickly for readability, or strictly to show the exact structure."
    },
    syntax: "=ARRAYTOTEXT(array, [format])",
    syntaxBreakdown: [
      { arg: "array", desc: "The array or range to convert." },
      { arg: "format", desc: "Optional. 0 = concise (default), 1 = strict." }
    ],
    detailedExamples: [
      {
        title: "Example: Quick Summary of a Range",
        table: {
          headers: ["Color", "Size"],
          rows: [
            ["Red", "Big"],
            ["Blue", "Small"]
          ]
        },
        stepByStep: [
          "Concise format (=ARRAYTOTEXT(A2:B3, 0)) scans row by row and separates with commas: 'Red, Big, Blue, Small'.",
          "Strict format (=ARRAYTOTEXT(A2:B3, 1)) wraps in braces: '{\"Red\",\"Big\";\"Blue\",\"Small\"}'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Concise default.", desc: "Forgetting the format argument defaults to concise, which may lose structural information." },
      { title: "TEXTJOIN confusion.", desc: "ARRAYTOTEXT is for displaying array structure; TEXTJOIN is for merging data with custom separators." }
    ],
    proTips: [
      "Use strict format for debugging dynamic array outputs.",
      "Combine with other text functions to inspect internal array contents."
    ],
    relatedFunctions: ["TEXTJOIN", "CONCAT"],
    miniChallenge: {
      question: "Which format code (0 or 1) shows array braces and semicolons?",
      expectedAnswer: "1"
    },
    practice: {
      instructions: "In cell C1, convert range A1:B1 to a concise text string.",
      initialData: [["A", "B", ""]],
      targetCell: [0, 2],
      expectedFormula: "ARRAYTOTEXT(A1:B1,0)",
      expectedValue: "A, B"
    }
  },
  {
    id: "asc",
    title: "Convert Full-Width to Half-Width Characters: ASC Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Convert Full-Width to Half-Width Characters: ASC Function",
      description: "The ASC function converts full-width (double-byte) characters to half-width (single-byte) characters. Used mainly for J/C/K language text normalization.",
      concept: "Think of it as normalising text width: wide 'ＡＢＣ' becomes narrow 'ABC'."
    },
    syntax: "=ASC(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The text containing full-width characters to convert." }
    ],
    detailedExamples: [
      {
        title: "Example: Normalising Text",
        table: {
          headers: ["Input (Full-Width)", "Formula", "Output (Half-Width)"],
          rows: [
            ["ＡＢＣ１２３", "=ASC(A2)", "ABC123"],
            ["ｈｅｌｌｏ", "=ASC(A3)", "hello"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Ideographs.", desc: "Many CJK ideographs have no half-width equivalent and are unchanged." },
      { title: "DBCS confusion.", desc: "DBCS does the reverse (half-width to full-width)." }
    ],
    proTips: [
      "Use ASC when cleaning imported data from systems using full-width characters."
    ],
    relatedFunctions: ["DBCS", "CLEAN"],
    miniChallenge: {
      question: "What does =ASC(\"Ａ\") return?",
      expectedAnswer: "A"
    },
    practice: {
      instructions: "In cell B2, convert the full-width text in A2 to half-width.",
      initialData: [["Wide", "Narrow"], ["ＡＢＣ", ""]],
      targetCell: [1, 1],
      expectedFormula: "ASC(A2)",
      expectedValue: "ABC"
    }
  },
  {
    id: "bahttext",
    title: "Convert Number to Thai Baht Text: BAHTTEXT Function",
    category: "text",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Convert Number to Thai Baht Text: BAHTTEXT Function",
      description: "The BAHTTEXT function converts a number into Thai text with the word 'Baht' appended, following Thai currency conventions.",
      concept: "Think of it as a localised number-to-words converter: 123 becomes 'หนึ่งร้อยยี่สิบสามบาทถ้วน'."
    },
    syntax: "=BAHTTEXT(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The number to convert. Can be a value, cell reference, or formula." }
    ],
    detailedExamples: [
      {
        title: "Example: Thai Invoice Amount",
        table: {
          headers: ["Amount", "Formula", "Thai Text"],
          rows: [
            ["500", "=BAHTTEXT(500)", "ห้าร้อยบาทถ้วน"],
            ["0.75", "=BAHTTEXT(0.75)", "เจ็ดสิบห้าสตางค์"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Thai-specific.", desc: "There is no equivalent English number-to-words function in standard Excel." }
    ],
    proTips: [
      "BAHTTEXT respects regional settings; ensure Thai language support is installed."
    ],
    relatedFunctions: ["TEXT", "DOLLAR"],
    miniChallenge: {
      question: "What word is appended for exactly zero decimals in BAHTTEXT?",
      expectedAnswer: "ถ้วน"
    },
    practice: {
      instructions: "In cell B2, convert the number 500 to Thai Baht text.",
      initialData: [["Num", "Thai"], [500, ""]],
      targetCell: [1, 1],
      expectedFormula: "BAHTTEXT(A2)",
      expectedValue: "ห้าร้อยบาทถ้วน"
    }
  },
  {
    id: "char",
    title: "Convert a Number to a Character: CHAR Function",
    category: "text",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Convert a Number to a Character: CHAR Function",
      description: "The CHAR function returns the character specified by a numeric code (1-255).",
      concept: "Think of it as a code translator: give it a number, get back a symbol, letter, or special character."
    },
    syntax: "=CHAR(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "A number from 1 to 255 representing the character code." }
    ],
    detailedExamples: [
      {
        title: "Example: Symbols and Breaks",
        table: {
          headers: ["Code", "Formula", "Character"],
          rows: [
            ["10", "=CHAR(10)", "(line break)"],
            ["65", "=CHAR(65)", "A"],
            ["149", "=CHAR(149)", "•"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Code limits.", desc: "Using codes outside 1-255 returns #VALUE!. For Unicode, use UNICHAR." },
      { title: "Wrap Text.", desc: "Forgetting to enable 'Wrap Text' when using CHAR(10) for line breaks." }
    ],
    proTips: [
      "Use =CHAR(ROW()+64) to generate letters A, B, C dynamically.",
      "CHAR(10) is essential for multi-line labels in formulas."
    ],
    relatedFunctions: ["CODE", "UNICHAR", "UNICODE"],
    miniChallenge: {
      question: "What character code is used for a line break in Windows?",
      expectedAnswer: "10"
    },
    practice: {
      instructions: "In cell B2, get the character for code 65.",
      initialData: [["Code", "Char"], [65, ""]],
      targetCell: [1, 1],
      expectedFormula: "CHAR(A2)",
      expectedValue: "A"
    }
  },
  {
    id: "clean",
    title: "Remove Non-Printable Characters: CLEAN Function",
    category: "text",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Remove Non-Printable Characters: CLEAN Function",
      description: "The CLEAN function removes the first 32 non-printable characters (codes 0-31) from text. These characters often cause display issues or formula errors in imported data.",
      concept: "Think of it as a decontaminator: it scrubs out invisible junk characters that shouldn't be there."
    },
    syntax: "=CLEAN(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The text string to clean. Can be a cell reference or literal text." }
    ],
    detailedExamples: [
      {
        title: "Example: Cleaning Imported Data",
        table: {
          headers: ["Imported Text", "Formula", "Cleaned Text"],
          rows: [
            ["Sales[tab]Report", "=CLEAN(A2)", "SalesReport"],
            ["Data" + " " + "Break", "=CLEAN(A3)", "DataBreak"]
          ]
        },
        stepByStep: [
          "CLEAN identifies characters with ASCII codes 0-31.",
          "It removes them, leaving only printable characters.",
          "Note: It also removes line breaks (code 10)."
        ]
      }
    ],
    commonMistakes: [
      { title: "Above code 31.", desc: "CLEAN does not remove non-printable characters with codes above 31 (like CHAR(160))." },
      { title: "Trim confusion.", desc: "CLEAN doesn't remove leading/trailing spaces — use TRIM for that." }
    ],
    proTips: [
      "Combine: =TRIM(CLEAN(SUBSTITUTE(A1, CHAR(160), \" \"))) to handle non-breaking spaces too.",
      "Use as a first step when troubleshooting VLOOKUP failures on imported data."
    ],
    relatedFunctions: ["TRIM", "SUBSTITUTE", "REPLACE"],
    miniChallenge: {
      question: "Which character codes does CLEAN remove?",
      expectedAnswer: "0-31"
    },
    practice: {
      instructions: "In cell B2, clean the text in A2 by removing non-printable characters.",
      initialData: [["Messy", "Clean"], ["Data" + String.fromCharCode(7), ""]],
      targetCell: [1, 1],
      expectedFormula: "CLEAN(A2)",
      expectedValue: "Data"
    }
  },
  {
    id: "code",
    title: "Get the Numeric Code of a Character: CODE Function",
    category: "text",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Get the Numeric Code of a Character: CODE Function",
      description: "The CODE function returns the numeric ANSI code for the first character in a text string. It's the inverse of CHAR.",
      concept: "Think of it as asking: 'What's the secret number behind this character?'"
    },
    syntax: "=CODE(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The text string. Only the first character's code is returned." }
    ],
    detailedExamples: [
      {
        title: "Example: Auditing Characters",
        table: {
          headers: ["Text", "Formula", "Code", "Character"],
          rows: [
            ["A", "=CODE(\"A\")", "65", "Uppercase A"],
            ["a", "=CODE(\"a\")", "97", "Lowercase a"],
            ["(space)", "=CODE(\" \")", "32", "Space"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "First char only.", desc: "CODE only returns the first character's code, not the whole string." },
      { title: "Unicode.", desc: "For characters beyond 255, use UNICODE instead of CODE." }
    ],
    proTips: [
      "Use CODE to identify invisible characters causing formula errors.",
      "Difference between UPPER and LOWER codes is always 32."
    ],
    relatedFunctions: ["CHAR", "UNICODE", "UNICHAR"],
    miniChallenge: {
      question: "What is =CODE(\"A\")?",
      expectedAnswer: "65"
    },
    practice: {
      instructions: "In cell B2, get the code for the character in A2.",
      initialData: [["Char", "Code"], ["A", ""]],
      targetCell: [1, 1],
      expectedFormula: "CODE(A2)",
      expectedValue: 65
    }
  },
  {
    id: "concatenate",
    title: "Join Text Strings Together: CONCATENATE Function",
    category: "text",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Join Text Strings Together: CONCATENATE Function",
      description: "The CONCATENATE function joins multiple text strings into one. It's the classic version of CONCAT.",
      concept: "Think of it as glue: take several pieces of text and stick them end to end."
    },
    syntax: "=CONCATENATE(text1, [text2], ...)",
    syntaxBreakdown: [
      { arg: "text1", desc: "The first text item (required)." },
      { arg: "text2", desc: "Optional additional items (up to 255)." }
    ],
    detailedExamples: [
      {
        title: "Example: Building Full Names",
        table: {
          headers: ["First", "Last", "Formula", "Full Name"],
          rows: [
            ["John", "Smith", "=CONCATENATE(A2, \" \", B2)", "John Smith"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Manual spaces.", desc: "CONCATENATE doesn't insert spaces automatically; you must add \" \"." },
      { title: "Range joining.", desc: "CONCATENATE does not accept ranges. Use CONCAT or TEXTJOIN instead." }
    ],
    proTips: [
      "The & operator is often faster to type than CONCATENATE.",
      "Use TEXT function inside to preserve number formatting."
    ],
    relatedFunctions: ["CONCAT", "TEXTJOIN"],
    miniChallenge: {
      question: "Can CONCATENATE join a range like A1:A10?",
      expectedAnswer: "No"
    },
    practice: {
      instructions: "In cell C2, join A2 and B2 with a hyphen \"-\" between them.",
      initialData: [["Part 1", "Part 2", "Joined"], ["A", "1", ""]],
      targetCell: [1, 2],
      expectedFormula: "CONCATENATE(A2,\"-\",B2)",
      expectedValue: "A-1"
    }
  },
  {
    id: "dbcs",
    title: "Convert Half-Width to Full-Width Characters: DBCS Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Convert Half-Width to Full-Width Characters: DBCS Function",
      description: "The DBCS function converts half-width (single-byte) characters to full-width (double-byte) characters. It's the inverse of ASC.",
      concept: "Think of it as widening text: narrow 'ABC123' becomes wide 'ＡＢＣ１２３'."
    },
    syntax: "=DBCS(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The text containing half-width characters to widen." }
    ],
    detailedExamples: [
      {
        title: "Example: Formatting Names",
        table: {
          headers: ["Input (Half-Width)", "Formula", "Output (Full-Width)"],
          rows: [
            ["ABC123", "=DBCS(A2)", "ＡＢＣ１２３"],
            ["hello", "=DBCS(A3)", "ｈｅｌｌｏ"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "ASC confusion.", desc: "DBCS widens, ASC narrows. They are opposites." }
    ],
    proTips: [
      "Useful when preparing data for systems that expect full-width formatting in Asian languages."
    ],
    relatedFunctions: ["ASC"],
    miniChallenge: {
      question: "What is the inverse function of DBCS?",
      expectedAnswer: "ASC"
    },
    practice: {
      instructions: "In cell B2, convert the text in A2 to full-width.",
      initialData: [["Narrow", "Wide"], ["ABC", ""]],
      targetCell: [1, 1],
      expectedFormula: "DBCS(A2)",
      expectedValue: "ＡＢＣ"
    }
  },
  {
    id: "dollar",
    title: "Convert Number to Currency Text: DOLLAR Function",
    category: "text",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Convert Number to Currency Text: DOLLAR Function",
      description: "The DOLLAR function converts a number to text using currency format. The currency symbol applied depends on your system's regional settings.",
      concept: "Think of it as TEXT with a currency sign built in: it formats and converts to text in one step."
    },
    syntax: "=DOLLAR(number, [decimals])",
    syntaxBreakdown: [
      { arg: "number", desc: "The number to format." },
      { arg: "decimals", desc: "Optional. Number of decimal places (default 2)." }
    ],
    detailedExamples: [
      {
        title: "Example: Formatting Invoice Amounts",
        table: {
          headers: ["Amount", "Formula", "Result (US locale)"],
          rows: [
            ["1234.5", "=DOLLAR(1234.5)", "₦1,234.50"],
            ["-99.99", "=DOLLAR(-99.99)", "(₦99.99)"]
          ]
        }
      },
      {
        title: "Decimal Variations",
        table: {
          headers: ["Number", "Decimals", "Formula", "Result"],
          rows: [
            ["5678.9", "1", "=DOLLAR(5678.9, 1)", "₦5,678.9"],
            ["5678.9", "-2", "=DOLLAR(5678.9, -2)", "₦5,700"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Result is text.", desc: "You cannot SUM DOLLAR outputs directly without converting back." },
      { title: "Locale dependent.", desc: "The currency symbol depends on the system settings of the computer opening the file." }
    ],
    proTips: [
      "Use DOLLAR when embedding currency values within text strings.",
      "For more control, use TEXT with a custom format string."
    ],
    relatedFunctions: ["FIXED", "TEXT", "VALUE"],
    miniChallenge: {
      question: "What is the default number of decimal places for DOLLAR?",
      expectedAnswer: "2"
    },
    practice: {
      instructions: "In cell B2, convert the amount in A2 to currency text with 0 decimal places.",
      initialData: [["Amount", "Currency"], [1234.5, ""]],
      targetCell: [1, 1],
      expectedFormula: "DOLLAR(A2,0)",
      expectedValue: "₦1,235"
    }
  },
  {
    id: "exact",
    title: "Case-Sensitive Comparison: EXACT Function",
    category: "text",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Case-Sensitive Comparison: EXACT Function",
      description: "The EXACT function compares two text strings and returns TRUE if they are identical, including case.",
      concept: "Think of it as a strict inspector: 'Are these two strings exactly the same, character for character?'"
    },
    syntax: "=EXACT(text1, text2)",
    syntaxBreakdown: [
      { arg: "text1", desc: "The first text string." },
      { arg: "text2", desc: "The second text string." }
    ],
    detailedExamples: [
      {
        title: "Example: Validating IDs",
        table: {
          headers: ["Stored ID", "Entered ID", "Formula", "Match?"],
          rows: [
            ["ABC123", "ABC123", "=EXACT(A2, B2)", "TRUE"],
            ["ABC123", "abc123", "=EXACT(A3, B3)", "FALSE"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Spaces.", desc: "EXACT does not ignore leading/trailing spaces." },
      { title: "Unnecessary use.", desc: "Use EXACT only when case-sensitivity matters. For normal checks, use the = operator." }
    ],
    proTips: [
      "Use EXACT with Data Validation to enforce case-sensitive entry.",
      "Combine with IF for case-sensitive lookups."
    ],
    relatedFunctions: ["FIND", "SEARCH"],
    miniChallenge: {
      question: "Does EXACT(\"A\", \"a\") return TRUE or FALSE?",
      expectedAnswer: "FALSE"
    },
    practice: {
      instructions: "In cell C2, check if A2 and B2 are exactly identical.",
      initialData: [["Str1", "Str2", "Exact?"], ["Apple", "apple", ""]],
      targetCell: [1, 2],
      expectedFormula: "EXACT(A2,B2)",
      expectedValue: false
    }
  },
  {
    id: "fixed",
    title: "Format Number as Fixed-Decimal Text: FIXED Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Format Number as Fixed-Decimal Text: FIXED Function",
      description: "The FIXED function rounds a number to a specified number of decimal places and returns it as text with thousands separators.",
      concept: "Think of it as number-to-text formatting without the dollar sign: clean, comma-separated, fixed decimals."
    },
    syntax: "=FIXED(number, [decimals], [no_commas])",
    syntaxBreakdown: [
      { arg: "number", desc: "The number to format." },
      { arg: "decimals", desc: "Optional. Number of decimal places (default 2)." },
      { arg: "no_commas", desc: "Optional. TRUE = suppress thousands separator; FALSE/omitted = include commas." }
    ],
    detailedExamples: [
      {
        title: "Example: Formatting Figures",
        table: {
          headers: ["Value", "Decimals", "Commas?", "Formula", "Result"],
          rows: [
            ["1234.567", "1", "Yes", "=FIXED(1234.567, 1, FALSE)", "1,234.6"],
            ["1234.567", "2", "No", "=FIXED(1234.567, 2, TRUE)", "1234.57"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Text output.", desc: "The result is text and cannot be used in calculations without conversion." }
    ],
    proTips: [
      "Use FIXED to standardize the appearance of numbers in text-heavy reports."
    ],
    relatedFunctions: ["TEXT", "DOLLAR", "ROUND"],
    miniChallenge: {
      question: "Which argument prevents the use of thousands-separator commas in FIXED?",
      expectedAnswer: "no_commas"
    },
    practice: {
      instructions: "In cell B2, format A2 with 1 decimal place and no commas.",
      initialData: [["Num", "Fixed"], [1234.56, ""]],
      targetCell: [1, 1],
      expectedFormula: "FIXED(A2,1,TRUE)",
      expectedValue: "1234.6"
    }
  },
  {
    id: "left",
    title: "LEFT Function",
    category: "text",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Taking from the Start: LEFT",
      description: "The LEFT function extracts a specific number of characters from the very beginning (left side) of a text string.",
      concept: "Use this when you only need the first few letters or numbers from a cell, like getting an Area Code from a phone number or a First Initial from a name."
    },
    internalLogic: "Excel counts the number of characters you specify starting from the very first character (index 1) of the string. It returns those characters as a new text string.",
    whyItExists: "Data is often combined in one cell (like a barcode 'DE-559'). LEFT allows you to isolate the prefix ('DE') so you can categorize or filter your data effectively.",
    whenToUse: "Use LEFT when your data has a consistent prefix or when you need just the start of a long string.",
    realWorldUseCases: [
      "Extracting the 'Country Code' from an international phone number.",
      "Getting the 'Category Code' from a long product SKU.",
      "Grabbing the first letter of a name for an initial.",
      "Pulling the Year from a custom date string like '2024-ID-001'."
    ],
    businessExample: {
      scenario: "A warehouse manager needs to extract the 2-letter 'State Code' from a list of shipping labels like 'NY-99021'.",
      formula: "=LEFT(A2, 2)"
    },
    syntax: "=LEFT(text, [num_chars])",
    syntaxBreakdown: [
      { arg: "text", desc: "The source cell or text you want to pull from." },
      { arg: "num_chars", desc: "Optional. How many characters to pull. If omitted, Excel grabs just the first 1 character." }
    ],
    detailedExamples: [
      {
        title: "Example: First Initial",
        table: {
          headers: ["Name", "Formula", "Initial"],
          rows: [
            ["Afeez Alimi", "=LEFT(A2, 1)", "A"]
          ]
        },
        stepByStep: [
          "Excel looks at 'Afeez Alimi'.",
          "It counts 1 character from the start.",
          "It returns 'A'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Grabbing hidden spaces.", desc: "If your data has a space at the start, LEFT might return a blank. Always wrap your text in TRIM first: =LEFT(TRIM(A2), 1)." }
    ],
    limitations: "LEFT cannot jump over characters. It always starts from the very first letter.",
    bestPractices: [
      "Use LEFT when the data you need is always at the beginning of the cell."
    ],
    proTips: [
      "Combine LEFT with FIND to extract everything before a space: =LEFT(A1, FIND(\" \", A1)-1)."
    ],
    relatedFunctions: ["RIGHT", "MID", "LEN", "FIND"],
    miniChallenge: {
      question: "Extract the first 3 characters from cell B2.",
      expectedAnswer: "=LEFT(B2, 3)"
    },
    practice: {
      instructions: "In cell B2, extract the first 4 characters of the text in A2.",
      initialData: [["Text", "Result"], ["EXCEL-2024", ""]],
      targetCell: [1, 1],
      expectedFormula: "LEFT(A2,4)",
      expectedValue: "EXCE"
    }
  },
  {
    id: "right",
    title: "RIGHT Function",
    category: "text",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Taking from the End: RIGHT",
      description: "The RIGHT function extracts characters from the end (right side) of a text string.",
      concept: "This is the mirror of LEFT. It's perfect for grabbing the last few digits of a bank account, a file extension, or the year from a date string."
    },
    internalLogic: "Excel starts at the very last character of the string and counts backwards by the number of characters you requested. It then returns those characters in their original order.",
    whyItExists: "Codes and IDs often have important information at the end (suffixes). RIGHT lets you isolate that information (like '.xlsx' from a filename) without needing to know how long the start of the text is.",
    whenToUse: "Use RIGHT when the data you need is consistently positioned at the end of a cell.",
    realWorldUseCases: [
      "Extracting the last 4 digits of a Social Security or Credit Card number.",
      "Getting the file extension from a filename (e.g., 'pdf').",
      "Pulling a ZIP code from the end of a full address string.",
      "Extracting a Year from a string like 'Order-2023'."
    ],
    businessExample: {
      scenario: "A security officer needs to show only the last 3 digits of an ID number 'ID-77890' for a public display.",
      formula: "=RIGHT(A2, 3)"
    },
    syntax: "=RIGHT(text, [num_chars])",
    syntaxBreakdown: [
      { arg: "text", desc: "The source cell." },
      { arg: "num_chars", desc: "Optional. How many characters to pull from the end. Defaults to 1." }
    ],
    detailedExamples: [
      {
        title: "Example: Year Extractor",
        table: {
          headers: ["Label", "Formula", "Year"],
          rows: [
            ["SKU-2024", "=RIGHT(A2, 4)", "2024"]
          ]
        },
        stepByStep: [
          "Excel starts at the '4' in 'SKU-2024'.",
          "It counts 4 characters back: 4, 2, 0, 2.",
          "It returns '2024'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Trailing spaces.", desc: "If there is a hidden space at the end of your data, RIGHT will count that space as a character! Use TRIM first." }
    ],
    proTips: [
      "Use =RIGHT(A1, LEN(A1)-5) to remove the first 5 characters and keep everything else."
    ],
    relatedFunctions: ["LEFT", "MID", "LEN", "TRIM"],
    miniChallenge: {
      question: "Extract the last 2 characters from cell C10.",
      expectedAnswer: "=RIGHT(C10, 2)"
    },
    practice: {
      instructions: "In cell B2, extract the last 2 characters of the serial number in A2.",
      initialData: [["Serial", "End"], ["SKU-99", ""]],
      targetCell: [1, 1],
      expectedFormula: "RIGHT(A2,2)",
      expectedValue: "99"
    }
  },
  {
    id: "concat",
    title: "CONCAT Function",
    category: "text",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Gluing Data Together: CONCAT",
      description: "The CONCAT function combines text from multiple cells, ranges, or strings into one single result. It is the modern, more efficient replacement for the old CONCATENATE function.",
      concept: "Imagine you have a 'First Name' in one column and a 'Last Name' in another. CONCAT acts like glue, joining them together into a single 'Full Name' cell."
    },
    internalLogic: "Excel takes the character strings provided in each argument and appends them sequentially. It does not automatically add delimiters (like spaces); it simply joins exactly what it is given.",
    whyItExists: "In raw data, information is often split across columns. To create readable reports, mailing labels, or unique IDs, we need a way to merge these separate pieces into a coherent string.",
    whenToUse: "Use CONCAT when you need to join text from two or more cells without needing complex separators between every single item (though you can add them manually).",
    realWorldUseCases: [
      "Creating full names from first, middle, and last name columns.",
      "Building full addresses from street, city, and zip code cells.",
      "Generating unique product SKUs by joining category and ID codes.",
      "Creating dynamic email subjects or notification messages."
    ],
    businessExample: {
      scenario: "A marketing manager needs to create a personalized greeting: 'Hello [Name], welcome to our sale!'",
      formula: "=CONCAT(\"Hello \", A2, \", welcome to our sale!\")"
    },
    syntax: "=CONCAT(text1, [text2], ...)",
    syntaxBreakdown: [
      { arg: "text1", desc: "The first item to join. This can be a specific text string (in quotes), a cell reference (like A2), or even a whole range (like A2:B10)." },
      { arg: "text2", desc: "Optional. Additional items you want to join to the first one." }
    ],
    detailedExamples: [
      {
        title: "Example: Employee Email Generator",
        table: {
          headers: ["Username", "Domain", "Formula", "Result"],
          rows: [
            ["john.doe", "company.com", "=CONCAT(A2, \"@\", B2)", "john.doe@company.com"]
          ]
        },
        stepByStep: [
          "Excel takes 'john.doe' from A2.",
          "It then appends the '@' symbol provided in quotes.",
          "Finally, it adds 'company.com' from B2.",
          "The result is a complete email address."
        ]
      }
    ],
    commonMistakes: [
      { title: "Forgetting spaces.", desc: "CONCAT doesn't add spaces. You must add them manually using \" \", e.g., =CONCAT(A2, \" \", B2)." },
      { title: "Numbers formatted as text.", desc: "If joining numbers to create a code, ensure the result doesn't break other math formulas." }
    ],
    limitations: "While CONCAT can join ranges, it doesn't allow you to specify a separator (like a comma) between every item in that range easily. For that, use TEXTJOIN.",
    bestPractices: [
      "Use the '&' operator for very simple joins (e.g., =A2&B2). Use CONCAT when joining large ranges or many items.",
      "Always test your formula with names that have different lengths."
    ],
    proTips: [
      "CONCAT is 'Range-Aware', meaning you can type =CONCAT(A1:Z1) to join an entire row of data instantly.",
      "Combine it with UPPER or LOWER to standardize the casing of your joined text."
    ],
    relatedFunctions: ["TEXTJOIN", "UPPER", "LOWER", "PROPER", "LEFT", "RIGHT"],
    miniChallenge: {
      question: "Cell A2 contains 'Order-' and B2 contains '559'. Write a formula to join them into 'Order-559'.",
      expectedAnswer: "=CONCAT(A2, B2)"
    },
    practice: {
      instructions: "In cell C2, join the First Name in A2 and Last Name in B2 with a space between them.",
      initialData: [["First", "Last", "Full Name"], ["Afeez", "Alimi", ""]],
      targetCell: [1, 2],
      expectedFormula: "CONCAT(A2,\" \",B2)",
      expectedValue: "Afeez Alimi"
    }
  },
  {
    id: "len",
    title: "LEN Function",
    category: "text",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Measuring Text Length: LEN",
      description: "The LEN function counts the total number of characters in a cell, including letters, numbers, spaces, punctuation, and even invisible characters.",
      concept: "Think of it as a character counter. If you have a limit on how long a text should be (like a password or a specific ID format), LEN is your primary tool for verification."
    },
    internalLogic: "Excel scans the underlying data string of the referenced cell and returns an integer representing the total count of UTF-16 code units. This means it counts everything exactly as it appears in the formula bar.",
    whyItExists: "Data validation and manipulation often require knowing the size of the data. For example, ensuring an account number is exactly 10 digits, or knowing where to split a string using other functions.",
    whenToUse: "Use LEN when you need to validate input length, or as a helper function inside MID, LEFT, or RIGHT to dynamically extract portions of a string.",
    realWorldUseCases: [
      "Checking if a user's password meets a minimum length requirement.",
      "Validating that a phone number or ID contains the correct number of digits.",
      "Finding the position of the last character in a string.",
      "Cleaning data by identifying cells with extra trailing spaces."
    ],
    businessExample: {
      scenario: "A data entry clerk needs to ensure all 'Product Codes' are exactly 8 characters long. They want a column that shows the length of each code.",
      formula: "=LEN(A2)"
    },
    syntax: "=LEN(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The cell or text string you want to measure. It can be a reference to a cell containing any type of data." }
    ],
    detailedExamples: [
      {
        title: "Example: Basic Counting",
        table: {
          headers: ["Text", "Formula", "Result"],
          rows: [
            ["Excel", "=LEN(A2)", "5"],
            ["Excel 365", "=LEN(A3)", "9"]
          ]
        },
        stepByStep: [
          "Excel looks at cell A3 ('Excel 365').",
          "It counts 'E', 'x', 'c', 'e', 'l', ' ' (space), '3', '6', '5'.",
          "The total count is 9."
        ]
      }
    ],
    commonMistakes: [
      { title: "Counting invisible spaces.", desc: "If LEN gives a higher number than expected, use TRIM to remove hidden spaces: =LEN(TRIM(A2))." }
    ],
    limitations: "LEN counts spaces. It also counts formatting symbols if they are actually part of the text, but it does NOT count cell formatting (like currency symbols added via the Home tab).",
    bestPractices: [
      "Always use TRIM with LEN if you are validating user-entered data to ignore accidental spaces."
    ],
    proTips: [
      "Use =LEN(A1)-LEN(SUBSTITUTE(A1,\" \",\"\"))+1 to count the number of words in a cell."
    ],
    relatedFunctions: ["TRIM", "LEFT", "RIGHT", "MID", "FIND"],
    miniChallenge: {
      question: "How would you find the length of the text in cell C10?",
      expectedAnswer: "=LEN(C10)"
    },
    practice: {
      instructions: "In cell B2, use LEN to find the length of the string in A2.",
      initialData: [["Input", "Length"], ["LearnExcel", ""]],
      targetCell: [1, 1],
      expectedFormula: "LEN(A2)",
      expectedValue: 10
    }
  },
  {
    id: "trim",
    title: "TRIM Function",
    category: "text",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "The Data Cleaner: TRIM",
      description: "The TRIM function removes all extra spaces from a text string, leaving only single spaces between words and no spaces at the start or end.",
      concept: "When data is imported from websites or other software, it often comes with 'invisible' spaces. TRIM is like a vacuum cleaner—it sucks up the mess so your formulas don't break."
    },
    internalLogic: "TRIM identifies leading spaces (before text) and trailing spaces (after text) and deletes them. Within a text string, it identifies any sequence of multiple spaces and replaces them with a single space character.",
    whyItExists: "Hidden spaces are the #1 reason why VLOOKUP and other search functions fail. Even though 'Apple' and 'Apple ' look the same, Excel sees them as completely different. TRIM fixes this inconsistency.",
    whenToUse: "Use TRIM on any data imported from an outside source before you try to analyze, sort, or search it.",
    realWorldUseCases: [
      "Cleaning a list of email addresses before sending a newsletter.",
      "Fixing a list of names where some have accidental double spaces.",
      "Ensuring VLOOKUP finds a match by removing trailing spaces from the lookup value.",
      "Preparing data for export to a professional database."
    ],
    businessExample: {
      scenario: "A customer database has names like '  John  Doe '. You need to clean these so they look professional in a mailing list.",
      formula: "=TRIM(A2)"
    },
    syntax: "=TRIM(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The messy text or cell reference you want to clean up." }
    ],
    detailedExamples: [
      {
        title: "Example: Space Removal",
        table: {
          headers: ["Dirty Text", "Formula", "Clean Result"],
          rows: [
            ["  Office  ", "=TRIM(A2)", "Office"],
            ["New   York", "=TRIM(A3)", "New York"]
          ]
        },
        stepByStep: [
          "Excel identifies spaces at the start and end of '  Office  '.",
          "It removes them, leaving only the word 'Office'.",
          "In 'New   York', it finds 3 spaces and reduces them to 1."
        ]
      }
    ],
    commonMistakes: [
      { title: "Trying to remove ALL spaces.", desc: "TRIM keeps single spaces between words. If you want to remove every single space (like in a phone number), use the SUBSTITUTE function instead." }
    ],
    limitations: "TRIM only handles the standard space character (ASCII 32). It will not remove non-breaking spaces often found in web data (ASCII 160).",
    bestPractices: [
      "Wrap your VLOOKUP lookup values in TRIM: =VLOOKUP(TRIM(A2), ...).",
      "Use TRIM as part of your standard 'Data Intake' process."
    ],
    proTips: [
      "If TRIM doesn't work, your data likely contains 'Non-Breaking Spaces'. Use =TRIM(CLEAN(SUBSTITUTE(A1, CHAR(160), \" \"))) to fix even the toughest web data."
    ],
    relatedFunctions: ["CLEAN", "SUBSTITUTE", "REPLACE", "LEN"],
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
  },
  {
    id: "mid",
    title: "MID Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Extracting from the Middle: MID",
      description: "The MID function pulls a specific number of characters from the middle of a text string, starting at any position you choose.",
      concept: "While LEFT and RIGHT are limited to the edges, MID allows you to reach inside a string. Think of it like a surgical tool—you tell it where to start and how much to take."
    },
    internalLogic: "Excel moves to the 'start_num' position in the string (the first letter is 1). From that exact point, it moves forward by the 'num_chars' count and returns that segment as a new string.",
    whyItExists: "Professional data often contains structured codes where the middle part has a specific meaning (e.g., in 'US-NY-001', 'NY' represents the state). MID is the only way to isolate that internal data.",
    whenToUse: "Use MID when the information you need is at a consistent position inside a larger string, but not at the very beginning or end.",
    realWorldUseCases: [
      "Extracting the area code from a phone number in the format (555) 123-4567.",
      "Isolating a department code from a long employee ID string.",
      "Pulling specific digits from a credit card or bank account number.",
      "Extracting the month from a text date like '2024-05-12'."
    ],
    businessExample: {
      scenario: "A shipping company uses tracking numbers like 'SHIP-PR-99'. They need to extract the 2-letter priority code ('PR') which always starts at character 6.",
      formula: "=MID(A2, 6, 2)"
    },
    syntax: "=MID(text, start_num, num_chars)",
    syntaxBreakdown: [
      { arg: "text", desc: "The source string or cell containing the data." },
      { arg: "start_num", desc: "The position of the first character you want to extract. 1 is the first letter." },
      { arg: "num_chars", desc: "How many characters you want to pull out from the starting point." }
    ],
    detailedExamples: [
      {
        title: "Example: SKU Decoding",
        table: {
          headers: ["Full SKU", "Formula", "Category"],
          rows: [
            ["WID-GOLD-99", "=MID(A2, 5, 4)", "GOLD"]
          ]
        },
        stepByStep: [
          "Excel jumps to the 5th character in 'WID-GOLD-99' (the letter 'G').",
          "It counts 4 characters starting from 'G'.",
          "It returns 'GOLD'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Incorrect start position.", desc: "Count manually or use the FIND function to find the exact starting position of your data." },
      { title: "Num_chars too long.", desc: "If you ask for 100 characters but only 5 remain, MID just returns the 5. It won't crash, but your logic might be off." }
    ],
    limitations: "MID returns text. If you extract a number (like '123') and want to use it in math, wrap it in the VALUE function: =VALUE(MID(...)).",
    bestPractices: [
      "Use the FIND function to dynamically calculate the start_num if the position of your data varies row by row."
    ],
    proTips: [
      "Use =MID(A1, 1, 3) is the same as =LEFT(A1, 3). MID is the most versatile of all extraction functions."
    ],
    relatedFunctions: ["LEFT", "RIGHT", "FIND", "SEARCH", "LEN"],
    miniChallenge: {
      question: "Extract 3 characters from cell A1, starting at the 4th position.",
      expectedAnswer: "=MID(A1, 4, 3)"
    },
    practice: {
      instructions: "In cell B2, extract 3 characters from A2 starting at position 4.",
      initialData: [["Code", "Extract"], ["XX-VIP-01", ""]],
      targetCell: [1, 1],
      expectedFormula: "MID(A2,4,3)",
      expectedValue: "VIP"
    }
  },
  {
    id: "upper",
    title: "UPPER Function",
    category: "text",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "ALL CAPS: UPPER",
      description: "The UPPER function converts all letters in a text string to uppercase.",
      concept: "Need to make a header stand out? Or ensure that ID codes are consistent? UPPER takes any text and shouts it in capital letters."
    },
    internalLogic: "Excel scans the text for lowercase characters (a-z) and replaces them with their uppercase equivalents (A-Z). Non-letter characters like numbers and symbols are left unchanged.",
    whyItExists: "Data from different people often comes in a mix of cases (john, John, JOHN). For professional reports and database consistency, everything should match. UPPER is the fastest way to standardize.",
    whenToUse: "Use UPPER for headers, state abbreviations, or any data that needs a uniform, loud appearance.",
    realWorldUseCases: [
      "Standardizing a list of names for a database.",
      "Ensuring state codes (ny, nj) are all capitalized (NY, NJ).",
      "Making specific warnings or labels stand out in a report.",
      "Formatting data for export to systems that only accept uppercase."
    ],
    businessExample: {
      scenario: "A list of email addresses has messy capitalization. You want to make them all uppercase for a printed mailing list.",
      formula: "=UPPER(A2)"
    },
    syntax: "=UPPER(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The cell or text string you want to capitalize." }
    ],
    detailedExamples: [
      {
        title: "Example: Case Correction",
        table: {
          headers: ["Input", "Formula", "Output"],
          rows: [
            ["excel", "=UPPER(A2)", "EXCEL"],
            ["Excel 365", "=UPPER(A3)", "EXCEL 365"]
          ]
        },
        stepByStep: [
          "Excel reads 'excel'.",
          "It converts 'e','x','c','e','l' to capitals.",
          "Result: EXCEL."
        ]
      }
    ],
    commonMistakes: [
      { title: "Expecting numbers to change.", desc: "UPPER only affects letters. Numbers and punctuation will remain exactly the same." }
    ],
    limitations: "It converts everything. If you only want to capitalize the first letter, use PROPER instead.",
    bestPractices: [
      "Use UPPER when preparing data for VLOOKUP if your search is case-sensitive (though Excel lookups usually aren't, other software might be)."
    ],
    proTips: [
      "Combine with TRIM to clean and capitalize at once: =UPPER(TRIM(A1))."
    ],
    relatedFunctions: ["LOWER", "PROPER", "TRIM"],
    miniChallenge: {
      question: "Convert the text in cell A1 to all capital letters.",
      expectedAnswer: "=UPPER(A1)"
    },
    practice: {
      instructions: "In cell B2, convert the text in A2 to uppercase.",
      initialData: [["Lower", "Upper"], ["hello", ""]],
      targetCell: [1, 1],
      expectedFormula: "UPPER(A2)",
      expectedValue: "HELLO"
    }
  },
  {
    id: "lower",
    title: "LOWER Function",
    category: "text",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Small Letters: LOWER",
      description: "The LOWER function converts all capital letters in a text string to lowercase.",
      concept: "Great for email addresses and website URLs, which look best in all small letters. It removes the 'shouting' from your data."
    },
    internalLogic: "Excel identifies all uppercase letters (A-Z) and replaces them with their lowercase counterparts (a-z). Numbers and symbols remain untouched.",
    whyItExists: "To provide consistency in data entry. Standardizing everything to lowercase is a common step in data cleaning before analysis.",
    whenToUse: "Use LOWER for email addresses, URLs, or when you want to minimize the visual impact of a long text string.",
    realWorldUseCases: [
      "Converting a list of full names to lowercase email handles.",
      "Cleaning up a column of feedback where users used all-caps by mistake.",
      "Ensuring consistency in tags or categories."
    ],
    businessExample: {
      scenario: "You have a list of names and you need to generate email addresses for them in the format name@company.com (all lowercase).",
      formula: "=LOWER(A2) & \"@company.com\""
    },
    syntax: "=LOWER(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The cell or text string you want to make lowercase." }
    ],
    detailedExamples: [
      {
        title: "Example: Standardizing",
        table: {
          headers: ["Mixed", "Formula", "Lower"],
          rows: [
            ["EXCEL", "=LOWER(A2)", "excel"],
            ["New York", "=LOWER(A3)", "new york"]
          ]
        },
        stepByStep: [
          "Excel takes 'EXCEL'.",
          "It converts all letters to small case.",
          "Result: 'excel'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using for formal names.", desc: "LOWER will make 'John Doe' look like 'john doe'. Use PROPER instead for names." }
    ],
    bestPractices: [
      "Always use LOWER for data that will be used in URLs or Email addresses."
    ],
    proTips: [
      "Use LOWER inside a search formula to ensure you find a match regardless of how it was typed."
    ],
    relatedFunctions: ["UPPER", "PROPER", "TRIM"],
    miniChallenge: {
      question: "Convert 'DATA' to lowercase.",
      expectedAnswer: "=LOWER(\"DATA\")"
    },
    practice: {
      instructions: "In cell B2, convert the text in A2 to lowercase.",
      initialData: [["Upper", "Lower"], ["WORLD", ""]],
      targetCell: [1, 1],
      expectedFormula: "LOWER(A2)",
      expectedValue: "world"
    }
  },
  {
    id: "proper",
    title: "PROPER Function",
    category: "text",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Title Case: PROPER",
      description: "The PROPER function capitalizes the first letter in each word and converts all other letters to lowercase.",
      concept: "The 'Professional' case. It's the best way to fix a list of names or addresses so they look correct in a formal report."
    },
    internalLogic: "Excel identifies the first character of every word (any letter following a non-letter character like a space). It capitalizes those and makes everything else lowercase.",
    whyItExists: "People are lazy when typing names (e.g., 'john doe' or 'JOHN DOE'). PROPER fixes this automatically, saving you from hours of manual re-typing.",
    whenToUse: "Use PROPER for names of people, cities, countries, or book titles.",
    realWorldUseCases: [
      "Fixing a list of customer names for a mail merge.",
      "Cleaning up a list of city names from a web form.",
      "Formatting titles in a library database.",
      "Ensuring addresses (123 main st) look professional (123 Main St)."
    ],
    businessExample: {
      scenario: "Your customer list has names in all caps. You need them to look nice for a formal letter.",
      formula: "=PROPER(A2)"
    },
    syntax: "=PROPER(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The cell or text string you want to format in title case." }
    ],
    detailedExamples: [
      {
        title: "Example: Name Fixing",
        table: {
          headers: ["Messy Name", "Formula", "Proper Name"],
          rows: [
            ["john DOE", "=PROPER(A2)", "John Doe"],
            ["mArY-aNnE", "=PROPER(A3)", "Mary-Anne"]
          ]
        },
        stepByStep: [
          "Excel identifies 'j' as the start. Capitalizes it: 'J'.",
          "It sees a space, then 'D'. Capitalizes it: 'D'.",
          "All other letters become lowercase.",
          "Result: 'John Doe'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Acronyms.", desc: "PROPER will turn 'NASA' into 'Nasa'. If you have acronyms, you'll have to fix those manually or use a different formula." }
    ],
    limitations: "PROPER capitalizes *every* word. Small words like 'of' or 'the' will also be capitalized ('The King Of England').",
    bestPractices: [
      "Use PROPER as the final step in cleaning names before sending them to a client."
    ],
    proTips: [
      "PROPER even works on text joined together: =PROPER(\"new\" & \" \" & \"york\") results in 'New York'."
    ],
    relatedFunctions: ["UPPER", "LOWER", "TRIM"],
    miniChallenge: {
      question: "Convert 'united states' to Proper Case.",
      expectedAnswer: "=PROPER(\"united states\")"
    },
    practice: {
      instructions: "In cell B2, convert the name in A2 to Proper Case.",
      initialData: [["Input", "Proper"], ["alex smith", ""]],
      targetCell: [1, 1],
      expectedFormula: "PROPER(A2)",
      expectedValue: "Alex Smith"
    }
  },
  {
    id: "textjoin",
    title: "TEXTJOIN Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "The Advanced Joiner: TEXTJOIN",
      description: "TEXTJOIN combines text from multiple ranges and/or strings, and includes a delimiter you specify between each text value that will be combined.",
      concept: "Think of it as CONCAT on steroids. It can ignore empty cells and automatically put a comma, space, or any other character between your items."
    },
    internalLogic: "Excel iterates through the provided ranges. If a cell is not empty (or if you choose to include empty cells), it appends the text to the result string, preceded by the delimiter (except for the first item).",
    whyItExists: "Before TEXTJOIN, joining a list of names with commas was a nightmare (e.g., =A1&\", \"&B1&\", \"&C1...). If B1 was empty, you'd end up with double commas. TEXTJOIN fixes this perfectly.",
    whenToUse: "Use TEXTJOIN whenever you are combining a list of items and want a specific separator (like a comma, slash, or dash) between them.",
    realWorldUseCases: [
      "Combining a list of email addresses into a single string for a 'To' field.",
      "Joining a full address (Street, City, Zip) with commas.",
      "Creating a comma-separated list of products from an order.",
      "Building a breadcrumb trail for a report (Home > Sales > Q1)."
    ],
    businessExample: {
      scenario: "You have a list of skills in different cells and you want to combine them into one cell, separated by a comma and a space, ignoring any blank cells.",
      formula: "=TEXTJOIN(\", \", TRUE, A2:A10)"
    },
    syntax: "=TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)",
    syntaxBreakdown: [
      { arg: "delimiter", desc: "The character(s) you want to put between your text (e.g., \", \", \"/\", or \"\"). Wrap in quotes." },
      { arg: "ignore_empty", desc: "TRUE means Excel skips empty cells. FALSE includes them." },
      { arg: "text1", desc: "The first cell, range, or text string to join." }
    ],
    detailedExamples: [
      {
        title: "Example: Address Builder",
        table: {
          headers: ["Street", "City", "Zip", "Formula", "Result"],
          rows: [
            ["123 Main St", "New York", "10001", "=TEXTJOIN(\", \", TRUE, A2:C2)", "123 Main St, New York, 10001"],
            ["456 Oak Ave", "", "90210", "=TEXTJOIN(\", \", TRUE, A3:C3)", "456 Oak Ave, 90210"]
          ]
        },
        stepByStep: [
          "Excel looks at Row 3.",
          "It sees '456 Oak Ave'.",
          "It sees an empty cell and ignores it (because ignore_empty is TRUE).",
          "It sees '90210'.",
          "It joins them with a comma and space: '456 Oak Ave, 90210'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Forgetting the second argument.", desc: "You MUST tell Excel whether to ignore empty cells (TRUE) or not (FALSE). If you skip it, the formula will error." }
    ],
    limitations: "Only available in Office 365 and Excel 2019+.",
    bestPractices: [
      "Use TRUE for the ignore_empty argument 99% of the time to keep your lists clean."
    ],
    proTips: [
      "To join items on new lines, use CHAR(10) as your delimiter and turn on 'Wrap Text' for the cell."
    ],
    relatedFunctions: ["CONCAT", "TEXTSPLIT", "SUBSTITUTE"],
    miniChallenge: {
      question: "Combine A1 and B1 with a dash \"-\" and ignore empty cells.",
      expectedAnswer: "=TEXTJOIN(\"-\", TRUE, A1, B1)"
    },
    practice: {
      instructions: "In cell C2, use TEXTJOIN to combine the words in A2 and B2 with a space \" \" as the delimiter.",
      initialData: [["First", "Last", "Full Name"], ["John", "Doe", ""]],
      targetCell: [1, 2],
      expectedFormula: "TEXTJOIN(\" \",TRUE,A2,B2)",
      expectedValue: "John Doe"
    }
  },
  {
    id: "substitute",
    title: "SUBSTITUTE Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Find and Replace: SUBSTITUTE",
      description: "The SUBSTITUTE function replaces specific text in a string with new text. It is precise and case-sensitive.",
      concept: "Think of it as a laser-guided 'Find and Replace' tool. If you want to change '2023' to '2024' everywhere it appears in a cell, SUBSTITUTE is your function."
    },
    internalLogic: "Excel scans the text for the exact match of 'old_text'. It then swaps every instance (or a specific instance) with the 'new_text'.",
    whyItExists: "Data often contains consistent errors or outdated information (like a legacy brand name). SUBSTITUTE allows you to bulk-update these within formulas without changing the original data.",
    whenToUse: "Use SUBSTITUTE when you know the specific text you want to replace, but don't know exactly where it is in the string.",
    realWorldUseCases: [
      "Changing file paths (e.g., swapping 'C:\\' for 'D:\\').",
      "Updating a year in a list of project titles.",
      "Removing dashes from social security numbers or phone numbers.",
      "Correcting a common misspelling across a dataset."
    ],
    businessExample: {
      scenario: "A company changed its name from 'OldCorp' to 'NewCorp'. You need to update the company name in a list of project descriptions.",
      formula: "=SUBSTITUTE(A2, \"OldCorp\", \"NewCorp\")"
    },
    syntax: "=SUBSTITUTE(text, old_text, new_text, [instance_num])",
    syntaxBreakdown: [
      { arg: "text", desc: "The source cell or text." },
      { arg: "old_text", desc: "The text you want to find and remove." },
      { arg: "new_text", desc: "The text you want to put in its place." },
      { arg: "instance_num", desc: "Optional. Which occurrence to replace. If left blank, it replaces ALL occurrences." }
    ],
    detailedExamples: [
      {
        title: "Example: Removing Dashes",
        table: {
          headers: ["Phone", "Formula", "Result"],
          rows: [
            ["555-123-4567", "=SUBSTITUTE(A2, \"-\", \"\")", "5551234567"]
          ]
        },
        stepByStep: [
          "Excel finds the first '-'. Replaces it with nothing (\"\").",
          "It finds the second '-'. Replaces it with nothing.",
          "Result: 5551234567."
        ]
      }
    ],
    commonMistakes: [
      { title: "Case sensitivity.", desc: "SUBSTITUTE is case-sensitive. If you try to replace \"apple\" in \"Apple Pie\", nothing will happen. Match the case exactly." }
    ],
    limitations: "It only replaces exact text. It cannot use wildcards. For that, you might need REPLACE or a combination of other functions.",
    bestPractices: [
      "Always double-check the case of your old_text."
    ],
    proTips: [
      "Use SUBSTITUTE to count how many times a word appears in a cell by comparing the length before and after the substitution."
    ],
    relatedFunctions: ["REPLACE", "TEXTJOIN", "TRIM"],
    miniChallenge: {
      question: "Replace the word \"Bad\" with \"Good\" in cell A1.",
      expectedAnswer: "=SUBSTITUTE(A1, \"Bad\", \"Good\")"
    },
    practice: {
      instructions: "In cell B2, replace the year \"2023\" with \"2024\" in the text from A2.",
      initialData: [["Report", "Updated"], ["Sales 2023", ""]],
      targetCell: [1, 1],
      expectedFormula: "SUBSTITUTE(A2,\"2023\",\"2024\")",
      expectedValue: "Sales 2024"
    }
  },
  {
    id: "find",
    title: "Exact Search: FIND",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Locating Text: FIND",
      description: "The FIND function returns the starting position of one text string within another text string. It is case-sensitive.",
      concept: "Think of it as a search tool that tells you exactly where a word or letter starts. If you search for 'E' in 'Excel', FIND returns 1."
    },
    internalLogic: "Excel scans the 'within_text' from left to right. When it finds an exact, case-sensitive match for 'find_text', it returns the character position of the first character.",
    whyItExists: "You often need to know *where* a space, dash, or specific word is so you can use that position inside other functions like LEFT, RIGHT, or MID to extract data.",
    whenToUse: "Use FIND when you need the exact position of text and the case matters (e.g., finding a capital letter).",
    realWorldUseCases: [
      "Finding the position of a space to separate First and Last names.",
      "Locating the '@' symbol in an email address.",
      "Finding the position of a specific delimiter like a dash or slash.",
      "Checking if a specific code exists within a larger string."
    ],
    businessExample: {
      scenario: "You have a list of full names (e.g., 'John Doe') and you want to find the position of the space so you can extract the first name later.",
      formula: "=FIND(\" \", A2)"
    },
    syntax: "=FIND(find_text, within_text, [start_num])",
    syntaxBreakdown: [
      { arg: "find_text", desc: "The text you want to find. Must be in quotes." },
      { arg: "within_text", desc: "The cell or text string you are searching inside." },
      { arg: "start_num", desc: "Optional. The character position to start searching from. Defaults to 1." }
    ],
    detailedExamples: [
      {
        title: "Example: Space Locator",
        table: {
          headers: ["Text", "Formula", "Result"],
          rows: [
            ["Excel Tips", "=FIND(\" \", A2)", "6"]
          ]
        },
        stepByStep: [
          "Excel looks at 'Excel Tips'.",
          "It counts: E(1), x(2), c(3), e(4), l(5), ' '(6).",
          "The space is at position 6. Result: 6."
        ]
      }
    ],
    commonMistakes: [
      { title: "Case mismatch.", desc: "FIND is case-sensitive. =FIND(\"e\", \"Excel\") will return 4, not 1. Use SEARCH if you don't care about case." },
      { title: "Text not found.", desc: "If the text isn't found, FIND returns a #VALUE! error. Wrap it in IFERROR to handle this." }
    ],
    limitations: "Does not support wildcards (* or ?).",
    bestPractices: [
      "Use FIND as a 'helper' inside LEFT, RIGHT, or MID to create dynamic extraction formulas."
    ],
    proTips: [
      "To find the second occurrence of a space, use: =FIND(\" \", A1, FIND(\" \", A1)+1)."
    ],
    relatedFunctions: ["SEARCH", "LEFT", "RIGHT", "MID", "LEN"],
    miniChallenge: {
      question: "Find the position of the letter \"A\" in the word \"APPLE\".",
      expectedAnswer: "=FIND(\"A\", \"APPLE\")"
    },
    practice: {
      instructions: "In cell B2, find the position of the space \" \" in the text in A2.",
      initialData: [["Full Name", "Space Pos"], ["John Doe", ""]],
      targetCell: [1, 1],
      expectedFormula: "FIND(\" \",A2)",
      expectedValue: 5
    }
  },
  {
    id: "search",
    title: "Flexible Search: SEARCH",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Smart Locating: SEARCH",
      description: "The SEARCH function returns the position of one text string within another. Unlike FIND, it is NOT case-sensitive and supports wildcards.",
      concept: "The 'easier' version of FIND. It doesn't care if you search for 'a' or 'A', it just finds the match. It's like a smarter, more relaxed search bar."
    },
    internalLogic: "Excel scans the text for a match. It ignores the case of the letters and allows for wildcards (* for any characters, ? for a single character).",
    whyItExists: "Human data entry is inconsistent. People mix 'USA', 'usa', and 'Usa'. SEARCH finds what you're looking for regardless of how it was typed.",
    whenToUse: "Use SEARCH 90% of the time when you just need to find where a word or character is located.",
    realWorldUseCases: [
      "Finding the position of a word in a long sentence.",
      "Searching for a partial ID code using wildcards.",
      "Checking if a cell contains a specific keyword (e.g., 'Error' or 'Success')."
    ],
    businessExample: {
      scenario: "You want to find where the word 'Total' starts in a messy description string, even if it's 'TOTAL' or 'total'.",
      formula: "=SEARCH(\"total\", A2)"
    },
    syntax: "=SEARCH(find_text, within_text, [start_num])",
    syntaxBreakdown: [
      { arg: "find_text", desc: "The text you want to find. Can include wildcards (*, ?)." },
      { arg: "within_text", desc: "The text to search inside." },
      { arg: "start_num", desc: "Optional. Where to start counting from." }
    ],
    detailedExamples: [
      {
        title: "Example: Wildcard Search",
        table: {
          headers: ["Text", "Formula", "Result"],
          rows: [
            ["ID-NYC-101", "=SEARCH(\"*-101\", A2)", "1"]
          ]
        },
        stepByStep: [
          "Excel looks for any text ending in '-101'.",
          "It finds the match starting at the very first character.",
          "Result: 1."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using for exact case checks.", desc: "If you specifically need to find a capital 'A' and ignore small 'a', you MUST use FIND." }
    ],
    proTips: [
      "Use =ISNUMBER(SEARCH(\"keyword\", A1)) to create a simple TRUE/FALSE check if a cell contains a specific word."
    ],
    relatedFunctions: ["FIND", "LEFT", "MID", "REPLACE"],
    miniChallenge: {
      question: "Which function is NOT case-sensitive: FIND or SEARCH?",
      expectedAnswer: "SEARCH"
    },
    practice: {
      instructions: "In cell B2, search for \"excel\" in A2 (case-insensitive).",
      initialData: [["Input", "Pos"], ["Learn Excel", ""]],
      targetCell: [1, 1],
      expectedFormula: "SEARCH(\"excel\",A2)",
      expectedValue: 7
    }
  },
  {
    id: "replace",
    title: "Replace Text by Position: REPLACE Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Replace Text by Position: REPLACE Function",
      description: "The REPLACE function swaps a specific portion of a text string with different text, based on the starting position and number of characters you specify.",
      concept: "Think of it as a precise swap: 'Go to character 5, take out 3 letters, and put this new word in their place.'"
    },
    syntax: "=REPLACE(old_text, start_num, num_chars, new_text)",
    syntaxBreakdown: [
      { arg: "old_text", desc: "The text string in which you want to replace characters." },
      { arg: "start_num", desc: "The position of the first character you want to replace." },
      { arg: "num_chars", desc: "The number of characters you want to remove." },
      { arg: "new_text", desc: "The new text that will replace the removed characters." }
    ],
    detailedExamples: [
      {
        title: "Example: Masking Data",
        table: {
          headers: ["Input", "Formula", "Output"],
          rows: [
            ["12345678", "=REPLACE(A2, 1, 4, \"****\")", "****5678"],
            ["2023-ID", "=REPLACE(A3, 1, 4, \"2024\")", "2024-ID"]
          ]
        },
        stepByStep: [
          "Excel starts at character 1.",
          "It removes 4 characters ('1234').",
          "It inserts '****' at that position.",
          "Result: ****5678."
        ]
      }
    ],
    commonMistakes: [
      { title: "Substitution vs Replace.", desc: "Use REPLACE when you know the POSITION (e.g. character 5). Use SUBSTITUTE when you know the actual TEXT (e.g. replace 'Apple')." }
    ],
    proTips: [
      "Use REPLACE with 0 for num_chars to insert text at a position without removing anything."
    ],
    relatedFunctions: ["SUBSTITUTE", "MID", "LEFT", "RIGHT"],
    miniChallenge: {
      question: "In =REPLACE(\"12345\", 1, 2, \"AB\"), what is the result?",
      expectedAnswer: "AB345"
    },
    practice: {
      instructions: "In cell B2, replace the first 2 characters of A2 with \"ID\".",
      initialData: [["Old", "New"], ["00-99", ""]],
      targetCell: [1, 1],
      expectedFormula: "REPLACE(A2,1,2,\"ID\")",
      expectedValue: "ID-99"
    }
  },
  {
    id: "rept",
    title: "Repeat Text: REPT Function",
    category: "text",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Repeat Text: REPT Function",
      description: "The REPT function repeats a text string a specified number of times.",
      concept: "Think of it as a stamp: tell it what to say and how many times to press it down."
    },
    syntax: "=REPT(text, number_times)",
    syntaxBreakdown: [
      { arg: "text", desc: "The text you want to repeat." },
      { arg: "number_times", desc: "The number of times to repeat it. Must be a positive number." }
    ],
    detailedExamples: [
      {
        title: "Example: Simple In-Cell Charts",
        table: {
          headers: ["Score", "Formula", "Bar Chart"],
          rows: [
            ["5", "=REPT(\"|\", A2)", "|||||"],
            ["3", "=REPT(\"|\", A3)", "|||"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Result length.", desc: "If the repeated string exceeds 32,767 characters, REPT returns #VALUE!." },
      { title: "Zero repeats.", desc: "If number_times is 0, REPT returns \"\" (empty text)." }
    ],
    proTips: [
      "Combine REPT with a specific font (like Playbill or Stencil) to create easy in-cell progress bars."
    ],
    relatedFunctions: ["CONCAT", "TEXTJOIN"],
    miniChallenge: {
      question: "What is =REPT(\"*\", 3)?",
      expectedAnswer: "***"
    },
    practice: {
      instructions: "In cell B2, repeat the string in A2 5 times.",
      initialData: [["Char", "Repeated"], ["*", ""]],
      targetCell: [1, 1],
      expectedFormula: "REPT(A2,5)",
      expectedValue: "*****"
    }
  },
  {
    id: "t",
    title: "Check for Text: T Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Check for Text: T Function",
      description: "The T function returns the text referred to by a value. If the value is text, T returns the text; otherwise, it returns an empty string (\"\").",
      concept: "Think of it as a text-only filter: 'If this is a word, show it. If it's a number or anything else, hide it.'"
    },
    syntax: "=T(value)",
    syntaxBreakdown: [
      { arg: "value", desc: "The value or cell you want to check." }
    ],
    detailedExamples: [
      {
        title: "Example: Filtering Text from Numbers",
        table: {
          headers: ["Input", "Formula", "Result"],
          rows: [
            ["Apple", "=T(A2)", "Apple"],
            ["123", "=T(A3)", ""],
            ["TRUE", "=T(A4)", ""]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Unexpected empty cells.", desc: "Remember that T returns an empty string for numbers, which might look like data is missing." }
    ],
    proTips: [
      "Use T to ensure that a function expecting text doesn't crash if it's accidentally given a number."
    ],
    relatedFunctions: ["ISTEXT", "N", "VALUE"],
    miniChallenge: {
      question: "What does =T(100) return?",
      expectedAnswer: "\"\""
    },
    practice: {
      instructions: "In cell B2, use the T function to check the value in A2.",
      initialData: [["Value", "Text Only"], ["Excel", ""]],
      targetCell: [1, 1],
      expectedFormula: "T(A2)",
      expectedValue: "Excel"
    }
  },
  {
    id: "text",
    title: "Format Value as Text: TEXT Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Format Value as Text: TEXT Function",
      description: "The TEXT function converts a numeric value to text and applies a custom format that you specify using format codes.",
      concept: "Think of it as 'Number Formatting' inside a formula. It allows you to keep your dates and currencies looking correct even when you join them with other text."
    },
    syntax: "=TEXT(value, format_text)",
    syntaxBreakdown: [
      { arg: "value", desc: "The number, date, or formula result you want to format." },
      { arg: "format_text", desc: "The format code in double quotes (e.g., \"dd/mm/yyyy\" or \"₦#,##0\")." }
    ],
    detailedExamples: [
      {
        title: "Example: Date Formatting",
        table: {
          headers: ["Date", "Formula", "Result"],
          rows: [
            ["01/01/2024", "=TEXT(A2, \"mmmm\")", "January"],
            ["01/01/2024", "=TEXT(A3, \"ddd\")", "Mon"]
          ]
        }
      },
      {
        title: "Example: Combining Text and Numbers",
        table: {
          headers: ["Sales", "Formula", "Message"],
          rows: [
            ["5000", "=\"Total: \" & TEXT(A2, \"₦#,##0\")", "Total: ₦5,000"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Result is text.", desc: "Once converted, you cannot use the result in math calculations directly." },
      { title: "Missing quotes.", desc: "The format code MUST be inside double quotes." }
    ],
    proTips: [
      "Use \"00000\" to force leading zeros on zip codes or ID numbers.",
      "Use \"h:mm AM/PM\" to format time in a readable string."
    ],
    relatedFunctions: ["VALUE", "FIXED", "DOLLAR"],
    miniChallenge: {
      question: "What format code shows the full month name?",
      expectedAnswer: "mmmm"
    },
    practice: {
      instructions: "In cell B2, format the number in A2 as currency using \"₦#,##0\".",
      initialData: [["Num", "Formatted"], [1234, ""]],
      targetCell: [1, 1],
      expectedFormula: "TEXT(A2,\"₦#,##0\")",
      expectedValue: "₦1,234"
    }
  },
  {
    id: "textafter",
    title: "Extract Text After Delimiter: TEXTAFTER Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Extract Text After Delimiter: TEXTAFTER Function",
      description: "The TEXTAFTER function returns text that occurs after a given character or string (delimiter).",
      concept: "Think of it as a smarter, modern version of RIGHT combined with FIND. You just say 'give me everything after the dash'."
    },
    syntax: "=TEXTAFTER(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    syntaxBreakdown: [
      { arg: "text", desc: "The source text." },
      { arg: "delimiter", desc: "The character or string to look for." },
      { arg: "instance_num", desc: "Optional. Which occurrence of the delimiter to use (default 1)." }
    ],
    detailedExamples: [
      {
        title: "Example: Domain Extractor",
        table: {
          headers: ["Email", "Formula", "Domain"],
          rows: [
            ["john@company.com", "=TEXTAFTER(A2, \"@\")", "company.com"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Delimiter not found.", desc: "Returns #N/A if the delimiter isn't present, unless [if_not_found] is specified." }
    ],
    proTips: [
      "Use a negative instance_num to start searching from the end of the string."
    ],
    relatedFunctions: ["TEXTBEFORE", "TEXTSPLIT", "RIGHT"],
    miniChallenge: {
      question: "In =TEXTAFTER(\"A-B-C\", \"-\", 2), what is the result?",
      expectedAnswer: "C"
    },
    practice: {
      instructions: "In cell B2, extract everything after the hyphen \"-\" in A2.",
      initialData: [["Code", "Suffix"], ["SKU-99", ""]],
      targetCell: [1, 1],
      expectedFormula: "TEXTAFTER(A2,\"-\")",
      expectedValue: "99"
    }
  },
  {
    id: "textbefore",
    title: "Extract Text Before Delimiter: TEXTBEFORE Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Extract Text Before Delimiter: TEXTBEFORE Function",
      description: "The TEXTBEFORE function returns text that occurs before a given character or string (delimiter).",
      concept: "Think of it as a smarter, modern version of LEFT combined with FIND. You just say 'give me everything before the dash'."
    },
    syntax: "=TEXTBEFORE(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    syntaxBreakdown: [
      { arg: "text", desc: "The source text." },
      { arg: "delimiter", desc: "The character or string to look for." },
      { arg: "instance_num", desc: "Optional. Which occurrence of the delimiter to use (default 1)." }
    ],
    detailedExamples: [
      {
        title: "Example: Username Extractor",
        table: {
          headers: ["Email", "Formula", "Username"],
          rows: [
            ["john@company.com", "=TEXTBEFORE(A2, \"@\")", "john"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Delimiter not found.", desc: "Returns #N/A if the delimiter isn't present, unless [if_not_found] is specified." }
    ],
    proTips: [
      "Use a negative instance_num to start searching from the end of the string."
    ],
    relatedFunctions: ["TEXTAFTER", "TEXTSPLIT", "LEFT"],
    miniChallenge: {
      question: "In =TEXTBEFORE(\"A-B-C\", \"-\", 2), what is the result?",
      expectedAnswer: "A-B"
    },
    practice: {
      instructions: "In cell B2, extract everything before the hyphen \"-\" in A2.",
      initialData: [["Code", "Prefix"], ["SKU-99", ""]],
      targetCell: [1, 1],
      expectedFormula: "TEXTBEFORE(A2,\"-\")",
      expectedValue: "SKU"
    }
  },
  {
    id: "textsplit",
    title: "Split Text into Rows or Columns: TEXTSPLIT Function",
    category: "text",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Split Text into Rows or Columns: TEXTSPLIT Function",
      description: "The TEXTSPLIT function splits a text string into multiple cells using a delimiter.",
      concept: "Think of it as 'Text to Columns' in formula form: take a list and turn it into a grid."
    },
    syntax: "=TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode], [pad_with])",
    syntaxBreakdown: [
      { arg: "text", desc: "The source text to split." },
      { arg: "col_delimiter", desc: "The character that separates your columns." },
      { arg: "row_delimiter", desc: "Optional. The character that separates your rows." }
    ],
    detailedExamples: [
      {
        title: "Example: Splitting a List",
        table: {
          headers: ["Input", "Formula", "Result"],
          rows: [
            ["Red,Blue,Green", "=TEXTSPLIT(A2, \",\")", "Red | Blue | Green"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Spill area.", desc: "Ensure there's enough empty space for the results to spill into." }
    ],
    proTips: [
      "You can split by multiple delimiters at once by using an array like {\",\",\";\"}."
    ],
    relatedFunctions: ["TEXTJOIN", "TEXTBEFORE", "TEXTAFTER"],
    miniChallenge: {
      question: "Which argument defines the column separator in TEXTSPLIT?",
      expectedAnswer: "col_delimiter"
    },
    practice: {
      instructions: "In cell B2, split the text in A2 using a comma \",\" as the column delimiter.",
      initialData: [["List", "Split"], ["A,B,C", ""]],
      targetCell: [1, 1],
      expectedFormula: "TEXTSPLIT(A2,\",\")",
      expectedValue: "A"
    }
  },
  {
    id: "unichar",
    title: "Convert Number to Unicode Character: UNICHAR Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Convert Number to Unicode Character: UNICHAR Function",
      description: "The UNICHAR function returns the Unicode character that is referenced by the given numeric value.",
      concept: "Think of it as a supercharged CHAR: it can reach thousands of symbols, emojis, and characters from every language."
    },
    syntax: "=UNICHAR(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The Unicode number for the character." }
    ],
    detailedExamples: [
      {
        title: "Example: Symbols",
        table: {
          headers: ["Code", "Formula", "Symbol"],
          rows: [
            ["9733", "=UNICHAR(9733)", "★"],
            ["128512", "=UNICHAR(128512)", "😀"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Invalid codes.", desc: "Using a code that doesn't exist returns #VALUE!." }
    ],
    proTips: [
      "Use UNICHAR to add professional icons or emojis directly into your dashboard formulas."
    ],
    relatedFunctions: ["UNICODE", "CHAR", "CODE"],
    miniChallenge: {
      question: "Which function supports larger character codes: CHAR or UNICHAR?",
      expectedAnswer: "UNICHAR"
    },
    practice: {
      instructions: "In cell B2, get the Unicode character for code 9733 (Star).",
      initialData: [["Code", "Symbol"], [9733, ""]],
      targetCell: [1, 1],
      expectedFormula: "UNICHAR(A2)",
      expectedValue: "★"
    }
  },
  {
    id: "unicode",
    title: "Get Unicode Numeric Value: UNICODE Function",
    category: "text",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Get Unicode Numeric Value: UNICODE Function",
      description: "The UNICODE function returns the numeric code (code point) for the first character of the text.",
      concept: "The inverse of UNICHAR: give it a symbol, and it tells you its Unicode number."
    },
    syntax: "=UNICODE(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The text string containing the character." }
    ],
    detailedExamples: [
      {
        title: "Example: Audit Symbols",
        table: {
          headers: ["Symbol", "Formula", "Code"],
          rows: [
            ["★", "=UNICODE(A2)", "9733"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "First char only.", desc: "Like CODE, UNICODE only looks at the very first character." }
    ],
    relatedFunctions: ["UNICHAR", "CODE", "CHAR"],
    miniChallenge: {
      question: "What is the inverse of UNICODE?",
      expectedAnswer: "UNICHAR"
    },
    practice: {
      instructions: "In cell B2, get the Unicode value for the character in A2.",
      initialData: [["Symbol", "Code"], ["★", ""]],
      targetCell: [1, 1],
      expectedFormula: "UNICODE(A2)",
      expectedValue: 9733
    }
  },
  {
    id: "value",
    title: "Convert Text to Number: VALUE Function",
    category: "text",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Convert Text to Number: VALUE Function",
      description: "The VALUE function converts a text string that represents a number into a real numeric value.",
      concept: "Think of it as a converter: 'This looks like a number, but Excel thinks it's text. Make it a real number so I can add it up.'"
    },
    syntax: "=VALUE(text)",
    syntaxBreakdown: [
      { arg: "text", desc: "The text in quotes or a cell reference containing text to be converted." }
    ],
    detailedExamples: [
      {
        title: "Example: Fixing Imported Data",
        table: {
          headers: ["Text", "Formula", "Number"],
          rows: [
            ["₦1,000", "=VALUE(A2)", "1000"],
            ["16:45", "=VALUE(A3)", "0.6979"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Unrecognized format.", desc: "If the text doesn't look like a number, date, or time, VALUE returns #VALUE!." }
    ],
    proTips: [
      "Excel usually converts text to numbers automatically in math, but using VALUE is safer and more explicit."
    ],
    relatedFunctions: ["TEXT", "NUMBERVALUE", "T"],
    miniChallenge: {
      question: "What is =VALUE(\"100\") + 50?",
      expectedAnswer: "150"
    },
    practice: {
      instructions: "In cell B2, convert the text number in A2 to a real number.",
      initialData: [["Text", "Num"], ["123", ""]],
      targetCell: [1, 1],
      expectedFormula: "VALUE(A2)",
      expectedValue: 123
    }
  }
];
