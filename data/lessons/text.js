export const textLessons = [
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
        title: "Example 1: First Initial",
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
      { mistake: "Grabbing hidden spaces.", fix: "If your data has a space at the start, LEFT might return a blank. Always wrap your text in TRIM first: =LEFT(TRIM(A2), 1)." }
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
        title: "Example 1: Year Extractor",
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
      { mistake: "Trailing spaces.", fix: "If there is a hidden space at the end of your data, RIGHT will count that space as a character! Use TRIM first." }
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
        title: "Example 1: Employee Email Generator",
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
      { mistake: "Forgetting spaces.", fix: "CONCAT doesn't add spaces. You must add them manually using \" \", e.g., =CONCAT(A2, \" \", B2)." },
      { mistake: "Numbers formatted as text.", fix: "If joining numbers to create a code, ensure the result doesn't break other math formulas." }
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
        title: "Example 1: Basic Counting",
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
      { mistake: "Counting invisible spaces.", fix: "If LEN gives a higher number than expected, use TRIM to remove hidden spaces: =LEN(TRIM(A2))." }
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
        title: "Example 1: Space Removal",
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
      { mistake: "Trying to remove ALL spaces.", fix: "TRIM keeps single spaces between words. If you want to remove every single space (like in a phone number), use the SUBSTITUTE function instead." }
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
        title: "Example 1: SKU Decoding",
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
      { mistake: "Incorrect start position.", fix: "Count manually or use the FIND function to find the exact starting position of your data." },
      { mistake: "Num_chars too long.", fix: "If you ask for 100 characters but only 5 remain, MID just returns the 5. It won't crash, but your logic might be off." }
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
        title: "Example 1: Case Correction",
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
      { mistake: "Expecting numbers to change.", fix: "UPPER only affects letters. Numbers and punctuation will remain exactly the same." }
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
        title: "Example 1: Standardizing",
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
      { mistake: "Using for formal names.", fix: "LOWER will make 'John Doe' look like 'john doe'. Use PROPER instead for names." }
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
        title: "Example 1: Name Fixing",
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
      { mistake: "Acronyms.", fix: "PROPER will turn 'NASA' into 'Nasa'. If you have acronyms, you'll have to fix those manually or use a different formula." }
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
        title: "Example 1: Address Builder",
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
      { mistake: "Forgetting the second argument.", fix: "You MUST tell Excel whether to ignore empty cells (TRUE) or not (FALSE). If you skip it, the formula will error." }
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
        title: "Example 1: Removing Dashes",
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
      { mistake: "Case sensitivity.", fix: "SUBSTITUTE is case-sensitive. If you try to replace \"apple\" in \"Apple Pie\", nothing will happen. Match the case exactly." }
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
        title: "Example 1: Space Locator",
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
      { mistake: "Case mismatch.", fix: "FIND is case-sensitive. =FIND(\"e\", \"Excel\") will return 4, not 1. Use SEARCH if you don't care about case." },
      { mistake: "Text not found.", fix: "If the text isn't found, FIND returns a #VALUE! error. Wrap it in IFERROR to handle this." }
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
        title: "Example 1: Wildcard Search",
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
      { mistake: "Using for exact case checks.", fix: "If you specifically need to find a capital 'A' and ignore small 'a', you MUST use FIND." }
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
  }
];
