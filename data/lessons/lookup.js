export const lookupLessons = [
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
        title: "Example 1: Product Pricing",
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
        title: "Example 1: Safe Pricing",
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
        title: "Example 1: Basic Grid Lookup",
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
        title: "Example 1: Finding Position",
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
        title: "Example 1: High Sale Extraction",
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
