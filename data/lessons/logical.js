export const logicalLessons = [
  {
    id: "if",
    title: "IF Function",
    category: "logical",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "The Power of Decision Making: IF Function",
      description: "The IF function is the foundation of logic in Excel. It allows the spreadsheet to think and react differently depending on the information it receives.",
      concept: "Think of it like a fork in the road: 'If the sign says Left, go Left. Otherwise, go Right.' It transforms a static grid of data into a smart, automated system."
    },
    internalLogic: "Internally, Excel evaluates your 'logical_test'. It results in a binary choice (TRUE or FALSE). Based on this outcome, Excel activates only the specific code path for that result, ignoring the other path entirely.",
    whyItExists: "Without the IF function, every calculation in Excel would be the same for every row. We need IF to handle variations—like different tax brackets for different income levels, or different pass/fail statuses for different scores.",
    whenToUse: "Use the IF function whenever you need a cell to show different results based on a condition. If your sentence starts with 'If...', you probably need this function.",
    realWorldUseCases: [
      "Determining if a project is 'Over Budget' or 'Under Budget'.",
      "Calculating employee commissions based on meeting sales targets.",
      "Assigning letter grades (A, B, C) to student scores.",
      "Flagging overdue invoices in an accounting system."
    ],
    businessExample: {
      scenario: "A manager wants to automatically approve all purchase requests under ₦500 and flag anything higher for 'Manual Review'.",
      formula: "=IF(B2<500, \"Approved\", \"Manual Review\")"
    },
    syntax: "=IF(logical_test, value_if_true, [value_if_false])",
    syntaxBreakdown: [
      { arg: "logical_test", desc: "The 'Question'. A condition that can be TRUE or FALSE. Usually uses comparison operators like > (greater than), < (less than), or = (equal to)." },
      { arg: "value_if_true", desc: "The 'Yes' result. This is what shows up in the cell if your question is answered with a TRUE." },
      { arg: "value_if_false", desc: "The 'No' result. This is what shows up if the condition is FALSE. If you leave this out, Excel will just display the word 'FALSE'." }
    ],
    detailedExamples: [
      {
        title: "Example: Sales Commission",
        table: {
          headers: ["Sales Rep", "Sales Amount", "Formula", "Commission"],
          rows: [
            ["John", "12000", "=IF(B2>10000, B2*0.1, 0)", "1200"],
            ["Sarah", "8000", "=IF(B3>10000, B3*0.1, 0)", "0"]
          ]
        },
        stepByStep: [
          "Excel looks at B2 (12,000).",
          "It tests: Is 12,000 > 10,000? (TRUE).",
          "Since it is TRUE, it calculates the 'value_if_true': 12,000 * 0.1.",
          "The final result 1,200 is placed in the cell."
        ]
      }
    ],
    commonMistakes: [
      { title: "Missing quotes for text.", desc: "Always wrap text results in double quotes, e.g., \"PASS\", not PASS." },
      { title: "Forgetting the second comma.", desc: "Even if you want the cell to be blank on FALSE, use a comma and empty quotes: =IF(A1>10, \"High\", \"\")." }
    ],
    limitations: "A single IF function can only handle one test and two outcomes. If you have 3+ outcomes, you need to 'Nest' your IF functions or use the IFS function.",
    bestPractices: [
      "Keep formulas simple. If you find yourself nesting more than 3 IFs, consider using a VLOOKUP table instead.",
      "Always provide a 'value_if_false' to avoid seeing the ugly 'FALSE' text in your reports."
    ],
    proTips: [
      "Combine IF with AND/OR to check multiple conditions at once.",
      "Use IF to catch and clean up errors in your sheets."
    ],
    relatedFunctions: ["IFS", "AND", "OR", "XOR", "NOT", "SWITCH"],
    miniChallenge: {
      question: "You have an inventory count in cell A2. Write a formula that shows \"Restock\" if the count is less than 10, otherwise show \"In Stock\".",
      expectedAnswer: "=IF(A2<10, \"Restock\", \"In Stock\")"
    },
    practice: {
      instructions: "In cell C2, write a formula to show \"PASS\" if the score in B2 is 50 or above, otherwise \"FAIL\".",
      initialData: [["Student", "Score", "Result"], ["Alice", 75, ""]],
      targetCell: [1, 2],
      expectedFormula: "IF(B2>=50,\"PASS\",\"FAIL\")",
      expectedValue: "PASS"
    },
    sandboxData: [
      ["Student", "Score", "Status"],
      ["Alice", 85, "=IF(B2>=50, \"PASS\", \"FAIL\")"],
      ["Bob", 42, "=IF(B3>=50, \"PASS\", \"FAIL\")"],
      ["Charlie", 91, "=IF(B4>=50, \"PASS\", \"FAIL\")"],
      ["David", 38, "=IF(B5>=50, \"PASS\", \"FAIL\")"]
    ]
  },
  {
    id: "and",
    title: "AND Function",
    category: "logical",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Checking Every Box: AND",
      description: "The AND function is a strict checker. It only gives a TRUE result if every single condition you provide is met.",
      concept: "Think of it like a checklist. For a loan to be approved, the applicant must have 'Good Credit' AND 'High Income'. If even one is missing, the answer is No."
    },
    internalLogic: "Excel evaluates each argument in the list. It stops at the first FALSE it finds and returns FALSE. Only if it reaches the end of the list without any FALSE values does it return TRUE.",
    whyItExists: "Real-world decisions are rarely based on just one factor. We need AND to handle complex requirements where multiple criteria must be satisfied simultaneously.",
    whenToUse: "Use AND whenever you have multiple 'must-haves'. If your logic is 'This must be true AND that must also be true', use this function.",
    realWorldUseCases: [
      "Checking if a student passed both the written and practical exam.",
      "Verifying if an employee is eligible for a bonus (Sales > ₦10k AND Attendance > 95%).",
      "Ensuring a date is within a specific range (Start Date <= Today AND End Date >= Today)."
    ],
    businessExample: {
      scenario: "A warehouse needs to flag items that are 'Low Stock' AND 'High Priority'.",
      formula: "=AND(B2<10, C2=\"High\")"
    },
    syntax: "=AND(logical1, [logical2], ...)",
    syntaxBreakdown: [
      { arg: "logical1", desc: "The first condition you want to test (e.g., A2 > 50)." },
      { arg: "logical2", desc: "Optional. Additional conditions that MUST also be true." }
    ],
    detailedExamples: [
      {
        title: "Example: Hiring Filter",
        table: {
          headers: ["Degree?", "Experience", "AND Formula", "Shortlist?"],
          rows: [
            ["Yes", "5 Years", "=AND(A2=\"Yes\", B2>=3)", "TRUE"],
            ["No", "10 Years", "=AND(A3=\"Yes\", B3>=3)", "FALSE"]
          ]
        },
        stepByStep: [
          "Excel checks A3: Is 'No' equal to 'Yes'? (FALSE).",
          "Since one part is already FALSE, AND immediately returns FALSE.",
          "The candidate is not shortlisted."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using for just one check.", desc: "If you only have one condition, don't use AND. Just write =A1>10." },
      { title: "Expected text output.", desc: "AND only returns TRUE or FALSE. To show 'Yes' or 'No', wrap it in an IF: =IF(AND(...), \"Yes\", \"No\")." }
    ],
    limitations: "AND doesn't tell you WHICH condition failed, only that at least one did.",
    bestPractices: [
      "Always use AND inside an IF function to turn the TRUE/FALSE into useful text.",
      "Limit your checks to 5-10 conditions to keep the formula readable."
    ],
    proTips: [
      "Use AND to check for numbers between a range: =AND(A1>=10, A1<=20).",
      "Combine with OR for even more advanced logic."
    ],
    relatedFunctions: ["OR", "NOT", "XOR", "IF"],
    miniChallenge: {
      question: "Write a formula to check if cell A2 is greater than 100 and cell B2 is less than 50.",
      expectedAnswer: "=AND(A2>100, B2<50)"
    },
    practice: {
      instructions: "In cell C2, check if B2 is greater than 50 AND A2 is \"Yes\".",
      initialData: [["Approved", "Score", "Result"], ["Yes", 75, ""]],
      targetCell: [1, 2],
      expectedFormula: "AND(A2=\"Yes\",B2>50)",
      expectedValue: true
    },
    sandboxData: [
      ["Candidate", "Degree", "Years Exp", "Hire?"],
      ["John", "Yes", 5, "=AND(B2=\"Yes\", C2>=3)"],
      ["Sarah", "No", 10, "=AND(B3=\"Yes\", C3>=3)"],
      ["Mike", "Yes", 2, "=AND(B4=\"Yes\", C4>=3)"]
    ]
  },
  {
    id: "or",
    title: "OR Function",
    category: "logical",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Any Path Works: OR",
      description: "The OR function is flexible. It returns TRUE if even a single one of your conditions is met.",
      concept: "Think of it like a store coupon. You get a discount if you are a 'Student' OR a 'Senior'. You don't have to be both; either one qualifies you."
    },
    internalLogic: "Excel scans your arguments one by one. The moment it finds a single TRUE, it stops and returns TRUE. It only returns FALSE if every single item in the list is FALSE.",
    whyItExists: "Business rules often have multiple ways to reach a goal. OR allows us to capture these 'any-of-the-above' situations without complex nested formulas.",
    whenToUse: "Use OR whenever you have multiple valid options. If your logic is 'If this is true OR that is true', use this function.",
    realWorldUseCases: [
      "Flagging weekends (Day = 'Saturday' OR Day = 'Sunday').",
      "Approving discounts (Customer = 'VIP' OR Purchase > ₦500).",
      "Identifying errors (Cell = '' OR Cell = 0)."
    ],
    businessExample: {
      scenario: "An HR manager wants to find employees who have either a 'Master's Degree' OR '10+ years experience'.",
      formula: "=OR(B2=\"Masters\", C2>=10)"
    },
    syntax: "=OR(logical1, [logical2], ...)",
    syntaxBreakdown: [
      { arg: "logical1", desc: "The first potential path (e.g., A2 = \"Red\")." },
      { arg: "logical2", desc: "Optional. Another path that would also make the whole thing TRUE." }
    ],
    detailedExamples: [
      {
        title: "Example: Weekend Finder",
        table: {
          headers: ["Day", "Formula", "Is Weekend?"],
          rows: [
            ["Saturday", "=OR(A2=\"Saturday\", A2=\"Sunday\")", "TRUE"],
            ["Monday", "=OR(A3=\"Saturday\", A3=\"Sunday\")", "FALSE"]
          ]
        },
        stepByStep: [
          "Excel looks at A2 ('Saturday').",
          "Is 'Saturday' equal to 'Saturday'? (TRUE).",
          "Since it found a TRUE, it doesn't even check the second part. It returns TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with AND.", desc: "Remember: AND needs ALL to be true. OR only needs ONE." }
    ],
    limitations: "OR can be too broad. Make sure you don't accidentally return TRUE for data you didn't mean to include.",
    bestPractices: [
      "Use OR inside an IF statement to make your spreadsheet output more human-readable.",
      "If you have many OR conditions, consider if you can simplify with a range or a different function."
    ],
    proTips: [
      "Use OR to check if a cell contains any of several specific values.",
      "Combine with NOT to exclude specific groups."
    ],
    relatedFunctions: ["AND", "XOR", "NOT", "IF"],
    miniChallenge: {
      question: "Check if cell A2 is either \"Paid\" or \"Exempt\".",
      expectedAnswer: "=OR(A2=\"Paid\", A2=\"Exempt\")"
    },
    practice: {
      instructions: "In cell C2, check if B2 is greater than 100 OR A2 is \"VIP\".",
      initialData: [["Status", "Amount", "Check"], ["VIP", 50, ""]],
      targetCell: [1, 2],
      expectedFormula: "OR(A2=\"VIP\",B2>100)",
      expectedValue: true
    }
  },
  {
    id: "iferror",
    title: "IFERROR Function",
    category: "logical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "The Safety Net: IFERROR",
      description: "IFERROR is a professional cleanup tool. It catches errors (like #DIV/0! or #VALUE!) and replaces them with a result you choose.",
      concept: "Think of it as a backup plan. 'Try to do this calculation. If it crashes, do this instead.' It keeps your reports looking tidy and professional."
    },
    internalLogic: "Excel first runs the 'value' formula. If it results in any error (#N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, or #NULL!), Excel ignores that result and runs the 'value_if_error' instead.",
    whyItExists: "Errors are common in raw data (like dividing by zero when a value is missing). These errors are ugly and break other formulas. IFERROR prevents these errors from spreading through your sheet.",
    whenToUse: "Use IFERROR whenever you have a calculation that might 'break' due to missing or bad data.",
    realWorldUseCases: [
      "Calculating 'Cost per Unit' when some units might be zero (prevents #DIV/0!).",
      "Cleaning up VLOOKUP results when a search term isn't found.",
      "Preventing errors from appearing in charts and dashboards."
    ],
    businessExample: {
      scenario: "A finance analyst is dividing Revenue by Headcount. Some departments have 0 staff, causing an error. They want to show 0 instead of the error.",
      formula: "=IFERROR(A2/B2, 0)"
    },
    syntax: "=IFERROR(value, value_if_error)",
    syntaxBreakdown: [
      { arg: "value", desc: "The 'Attempt'. The formula, calculation, or cell you want to check for errors." },
      { arg: "value_if_error", desc: "The 'Backup'. What to display if the first part fails." }
    ],
    detailedExamples: [
      {
        title: "Example: Safe Division",
        table: {
          headers: ["Total", "Count", "Formula", "Result"],
          rows: [
            ["100", "0", "=IFERROR(A2/B2, 0)", "0"],
            ["100", "5", "=IFERROR(A3/B3, 0)", "20"]
          ]
        },
        stepByStep: [
          "Excel tries to divide 100 by 0.",
          "It gets a #DIV/0! error.",
          "Because an error occurred, it switches to the backup value: 0."
        ]
      }
    ],
    commonMistakes: [
      { title: "Hiding real bugs.", desc: "Don't use IFERROR to hide a mistake in your logic. Only use it to handle expected data issues." }
    ],
    limitations: "IFERROR catches ALL errors. If you only want to catch #N/A (missing data), use IFNA instead.",
    bestPractices: [
      "Use descriptive backup text like \"Check Data\" or \"Missing\" instead of just leaving it blank.",
      "Wrap complex formulas in IFERROR at the very end of building them."
    ],
    proTips: [
      "Use IFERROR with VLOOKUP to make your search results much cleaner.",
      "Combined with an empty string (\" \"), it makes your sheet look blank until data is entered."
    ],
    relatedFunctions: ["IFNA", "ISERROR", "ISERR", "IF"],
    miniChallenge: {
      question: "Write a formula to divide A1 by B1. If there's an error, show the text \"Fix Input\".",
      expectedAnswer: "=IFERROR(A1/B1, \"Fix Input\")"
    },
    practice: {
      instructions: "In cell C2, use IFERROR to calculate B2/A2. If it results in an error, show 0.",
      initialData: [["A", "B", "Safe Div"], [0, 10, ""]],
      targetCell: [1, 2],
      expectedFormula: "IFERROR(B2/A2, 0)",
      expectedValue: 0
    }
  },
  {
    id: "ifna",
    title: "IFNA Function",
    category: "logical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Precision Handling: IFNA",
      description: "The IFNA function is a targeted version of IFERROR. It only catches the #N/A error, which usually means 'Not Found'.",
      concept: "It's like a specialized filter. If a VLOOKUP can't find an item, IFNA swaps the error for something better. But if the formula has a real math error, IFNA lets you see it so you can fix it."
    },
    internalLogic: "Excel evaluates the 'value'. If (and only if) the result is exactly #N/A, it returns 'value_if_na'. For any other error (like #REF! or #VALUE!), it will still show that error.",
    whyItExists: "Beginners often hide all errors with IFERROR, but that can hide serious problems. IFNA exists so you can handle 'Missing Data' (#N/A) without hiding 'Broken Formulas' (#REF!).",
    whenToUse: "Use IFNA exclusively with lookup functions (VLOOKUP, HLOOKUP, MATCH, XLOOKUP) to handle missing items professionally.",
    realWorldUseCases: [
      "Replacing #N/A with 'Item Not in Catalog' in a price checker.",
      "Showing 0 instead of #N/A when counting items that don't exist yet.",
      "Chaining lookups: If Item isn't in List A, look in List B."
    ],
    businessExample: {
      scenario: "A salesperson is looking up a discount code. If the code isn't found (#N/A), they want to apply a '0%' discount automatically.",
      formula: "=IFNA(VLOOKUP(A2, Codes, 2, FALSE), 0)"
    },
    syntax: "=IFNA(value, value_if_na)",
    syntaxBreakdown: [
      { arg: "value", desc: "The calculation or lookup you want to check (usually a VLOOKUP or XLOOKUP)." },
      { arg: "value_if_na", desc: "The friendly result to show if the item is missing." }
    ],
    detailedExamples: [
      {
        title: "Example: Search Cleanup",
        table: {
          headers: ["Input ID", "Result", "Formula", "Final"],
          rows: [
            ["105", "#N/A", "=IFNA(B2, \"Not Found\")", "Not Found"],
            ["101", "John", "=IFNA(B3, \"Not Found\")", "John"]
          ]
        },
        stepByStep: [
          "The lookup in B2 fails to find ID 105, returning #N/A.",
          "IFNA sees the #N/A and triggers the backup.",
          "It displays 'Not Found' instead of the error."
        ]
      }
    ],
    commonMistakes: [
      { title: "Expecting it to catch math errors.", desc: "If you divide by zero, IFNA will still show #DIV/0!. Use IFERROR for math issues." }
    ],
    limitations: "Only works for #N/A. Does not work for any other error type.",
    bestPractices: [
      "Use IFNA instead of IFERROR when working with lookups to keep your spreadsheet 'debuggable'.",
      "Always use a clear, helpful message for the backup value."
    ],
    proTips: [
      "Chain lookups: =IFNA(VLOOKUP(item, Table1, 2, 0), VLOOKUP(item, Table2, 2, 0)).",
      "IFNA is slightly faster for Excel to process than IFERROR."
    ],
    relatedFunctions: ["IFERROR", "VLOOKUP", "XLOOKUP", "ISNA"],
    miniChallenge: {
      question: "Write a formula to check cell A2. If it contains #N/A, show the number 0.",
      expectedAnswer: "=IFNA(A2, 0)"
    },
    practice: {
      instructions: "In cell C2, wrap the value from B2 with IFNA to show \"Item Missing\" if B2 is #N/A.",
      initialData: [["ID", "Lookup", "Clean Result"], ["A10", "#N/A", ""]],
      targetCell: [1, 2],
      expectedFormula: "IFNA(B2,\"Item Missing\")",
      expectedValue: "Item Missing"
    }
  },
  {
    id: "ifs",
    title: "IFS Function",
    category: "logical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Multiple Conditions Made Easy: IFS",
      description: "The IFS function checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.",
      concept: "Think of it like a multiple-choice quiz. If Score > 90, result is 'A'. If Score > 80, result is 'B'. It's much cleaner than nesting many IF functions inside each other."
    },
    internalLogic: "Excel evaluates conditions in the order they are listed. As soon as it finds a TRUE condition, it returns the paired value and stops looking. If no conditions are TRUE, it returns an #N/A error.",
    whyItExists: "Before IFS, you had to write =IF(cond1, val1, IF(cond2, val2, val3)). This was called 'Nesting' and it was very easy to break. IFS was created to make multi-condition logic easier to write and read.",
    whenToUse: "Use IFS whenever you have 3 or more potential outcomes based on different conditions, such as grading scales, tax brackets, or tiered pricing.",
    realWorldUseCases: [
      "Assigning priority levels (High, Medium, Low) based on days overdue.",
      "Calculating tax based on income brackets.",
      "Categorizing sales reps based on their performance tiers.",
      "Assigning shipping costs based on package weight."
    ],
    businessExample: {
      scenario: "A sales manager wants to categorize deals: >₦10k is 'Large', >₦5k is 'Medium', otherwise 'Small'.",
      formula: "=IFS(B2>10000, \"Large\", B2>5000, \"Medium\", TRUE, \"Small\")"
    },
    syntax: "=IFS(logical_test1, value1, [logical_test2, value2], ...)",
    syntaxBreakdown: [
      { arg: "logical_test1", desc: "The first condition to check." },
      { arg: "value1", desc: "The result if the first condition is TRUE." },
      { arg: "logical_test2", desc: "Optional. The second condition to check if the first was FALSE." }
    ],
    detailedExamples: [
      {
        title: "Example: Grade Scale",
        table: {
          headers: ["Score", "Formula", "Grade"],
          rows: [
            ["85", "=IFS(A2>=90, \"A\", A2>=80, \"B\", A2>=70, \"C\")", "B"]
          ]
        },
        stepByStep: [
          "Excel checks if 85 >= 90 (FALSE).",
          "It moves to the next test: Is 85 >= 80? (TRUE).",
          "It returns 'B' and ignores all remaining tests."
        ]
      }
    ],
    commonMistakes: [
      { title: "No conditions are TRUE.", desc: "If none of your tests match, IFS returns #N/A. Always add a final catch-all condition by using TRUE as the last test: =IFS(..., TRUE, \"Default Result\")." }
    ],
    limitations: "Only available in Office 365 and Excel 2019 or later. It also stops at the first TRUE match, so the order of your conditions matters greatly!",
    bestPractices: [
      "Always list your conditions from most specific to least specific (e.g., check for >100 before checking for >50).",
      "Always include a catch-all 'TRUE' condition at the end."
    ],
    proTips: [
      "Use IFS for complex 'If-Then-ElseIf' logic to keep your formulas manageable.",
      "IFS can handle up to 127 different conditions."
    ],
    relatedFunctions: ["IF", "SWITCH", "CHOOSE", "VLOOKUP"],
    comparison: "IF is binary (A or B). IFS is a sequence (A, B, C, or D). SWITCH is for matching specific values (exact match only).",
    miniChallenge: {
      question: "Write a formula to show \"Cold\" if A1 < 10, \"Warm\" if A1 < 25, and \"Hot\" for anything else.",
      expectedAnswer: "=IFS(A1<10, \"Cold\", A1<25, \"Warm\", TRUE, \"Hot\")"
    },
    practice: {
      instructions: "In cell B2, use IFS to show \"Good\" if A2 > 80, \"Fair\" if A2 > 50, otherwise \"Poor\".",
      initialData: [["Score", "Rating"], [85, ""]],
      targetCell: [1, 1],
      expectedFormula: "IFS(A2>80,\"Good\",A2>50,\"Fair\",TRUE,\"Poor\")",
      expectedValue: "Good"
    }
  },
  {
    id: "not",
    title: "NOT Function",
    category: "logical",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "The Reverser: NOT",
      description: "The NOT function reverses the value of its argument. If something is TRUE, NOT makes it FALSE. If it's FALSE, NOT makes it TRUE.",
      concept: "Think of it as 'Opposite Day'. If you want to find everyone who is NOT a manager, or every order that is NOT yet paid, NOT is your tool."
    },
    internalLogic: "Excel evaluates the logical statement provided. It then performs a logical inversion (NOT operator) on the result.",
    whyItExists: "Sometimes it is easier to define what you DON'T want than what you do want. NOT allows you to filter out specific cases efficiently.",
    whenToUse: "Use NOT when you want to check if a condition is NOT met. It is most commonly used inside an IF function to exclude specific data.",
    realWorldUseCases: [
      "Excluding specific regions from a report (NOT Region = 'West').",
      "Finding incomplete tasks (NOT Status = 'Complete').",
      "Checking for non-blank cells (NOT ISBLANK)."
    ],
    businessExample: {
      scenario: "A manager wants to identify all staff who are NOT in the 'Executive' department for a general meeting.",
      formula: "=NOT(B2=\"Executive\")"
    },
    syntax: "=NOT(logical)",
    syntaxBreakdown: [
      { arg: "logical", desc: "A value or expression that can be evaluated to TRUE or FALSE." }
    ],
    detailedExamples: [
      {
        title: "Example: Payment Status",
        table: {
          headers: ["Status", "Formula", "Needs Attention?"],
          rows: [
            ["Paid", "=NOT(A2=\"Paid\")", "FALSE"],
            ["Pending", "=NOT(A3=\"Paid\")", "TRUE"]
          ]
        },
        stepByStep: [
          "Excel checks A3: Is it 'Paid'? (FALSE).",
          "The NOT function flips the FALSE to TRUE.",
          "The result is TRUE, meaning it needs attention."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using with complex text logic.", desc: "Usually, you can just use the 'not equal to' operator (<>). Instead of =NOT(A1=10), just write =A1<>10. It is easier to read!" }
    ],
    limitations: "NOT can only handle one argument at a time.",
    bestPractices: [
      "Use NOT to improve the clarity of your logic when 'excluding' something is the goal.",
      "Combine with ISBLANK or ISERROR to find valid data."
    ],
    proTips: [
      "Use =NOT(A1) as a quick way to toggle a TRUE/FALSE checkbox in a dashboard."
    ],
    relatedFunctions: ["AND", "OR", "IF"],
    miniChallenge: {
      question: "Write a formula to return TRUE if cell A1 is NOT equal to 0.",
      expectedAnswer: "=NOT(A1=0)"
    },
    practice: {
      instructions: "In cell B2, return TRUE if A2 is NOT \"Red\".",
      initialData: [["Color", "Check"], ["Blue", ""]],
      targetCell: [1, 1],
      expectedFormula: "NOT(A2=\"Red\")",
      expectedValue: true
    }
  },
  {
    id: "xor",
    title: "XOR Function",
    category: "logical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Exclusive Logic: XOR",
      description: "The XOR function stands for 'Exclusive OR'. It returns TRUE if an ODD number of arguments are TRUE, and FALSE otherwise.",
      concept: "In the simplest case (2 conditions), XOR is TRUE if exactly one condition is true. It's like a choice: 'You can have Cake OR Ice Cream, but NOT both'."
    },
    internalLogic: "Excel evaluates all arguments. It counts how many of them result in TRUE. If the count is 1, 3, 5... (odd), the result is TRUE. If the count is 0, 2, 4... (even), the result is FALSE.",
    whyItExists: "Standard OR is inclusive (either or both). XOR is necessary for scenarios where only one option should be selected, or for parity checking in data analysis.",
    whenToUse: "Use XOR when you want to ensure that one, but not both, conditions are met.",
    realWorldUseCases: [
      "Granting a bonus if an employee hit a Sales target OR a Quality target, but not both (special promotion).",
      "Identifying records where a user has one type of ID but not another.",
      "Logic gates in engineering models."
    ],
    businessExample: {
      scenario: "A promotion gives a prize if a customer bought a 'Phone' or a 'Tablet' (exclusive). If they bought both or neither, they don't get the prize.",
      formula: "=XOR(B2=\"Yes\", C2=\"Yes\")"
    },
    syntax: "=XOR(logical1, [logical2], ...)",
    syntaxBreakdown: [
      { arg: "logical1", desc: "The first condition to evaluate." },
      { arg: "logical2", desc: "Optional. Additional conditions." }
    ],
    detailedExamples: [
      {
        title: "Exclusive Selection",
        table: {
          headers: ["Option A", "Option B", "Formula", "Result"],
          rows: [
            ["TRUE", "FALSE", "=XOR(A2, B2)", "TRUE"],
            ["TRUE", "TRUE", "=XOR(A3, B3)", "FALSE"]
          ]
        },
        stepByStep: [
          "Excel looks at Row 3.",
          "Both A3 and B3 are TRUE (Count = 2).",
          "Since 2 is an even number, XOR returns FALSE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Thinking it means 'just one'.", desc: "If you have 3 conditions and all 3 are TRUE, XOR returns TRUE (because 3 is odd). It's 'Odd number is true', not just 'Only one is true'." }
    ],
    limitations: "XOR is rarely used in basic spreadsheets and can be confusing to read for others.",
    bestPractices: [
      "Comment your formula if you use XOR so others understand the exclusive logic.",
      "Use it sparingly; often a combination of AND/OR is clearer."
    ],
    proTips: [
      "XOR is very useful for 'Toggle' logic in complex dashboards."
    ],
    relatedFunctions: ["AND", "OR", "NOT", "IF"],
    miniChallenge: {
      question: "Will =XOR(TRUE, TRUE, TRUE) return TRUE or FALSE?",
      expectedAnswer: "TRUE"
    },
    practice: {
      instructions: "In cell C2, use XOR to check if exactly one of A2 or B2 is TRUE.",
      initialData: [["Opt 1", "Opt 2", "Result"], [true, false, ""]],
      targetCell: [1, 2],
      expectedFormula: "XOR(A2,B2)",
      expectedValue: true
    }
  },
  {
    id: "switch",
    title: "SWITCH Function",
    category: "logical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Clean Value Matching: SWITCH",
      description: "The SWITCH function compares one value against a list of options and returns the result for the first matching value.",
      concept: "Think of it as a simplified version of IFS or a 'lookup' for single values. If the value is 1, show 'Monday'. If it's 2, show 'Tuesday'."
    },
    internalLogic: "Excel takes the 'expression' and performs an exact equality check (=) against each 'value' in order. When it finds a match, it stops and returns the paired result.",
    whyItExists: "Before SWITCH, you had to repeat the cell reference in IFS (e.g., =IFS(A1=1, \"A\", A1=2, \"B\")). SWITCH is cleaner because you only mention the cell (A1) once.",
    whenToUse: "Use SWITCH when you are matching a single cell against a list of fixed, exact values (like ID codes or Day numbers).",
    realWorldUseCases: [
      "Converting month numbers to names (1 -> January).",
      "Mapping priority codes (A -> High, B -> Med).",
      "Translating simple status codes from an external database."
    ],
    businessExample: {
      scenario: "A project tracker has levels 1, 2, and 3. You want to show 'Junior', 'Senior', and 'Lead'.",
      formula: "=SWITCH(A2, 1, \"Junior\", 2, \"Senior\", 3, \"Lead\", \"Unknown\")"
    },
    syntax: "=SWITCH(expression, value1, result1, [value2, result2], ..., [default])",
    syntaxBreakdown: [
      { arg: "expression", desc: "The cell or value you want to test." },
      { arg: "value1", desc: "The first option to compare against the expression." },
      { arg: "result1", desc: "The value to return if value1 matches." },
      { arg: "default", desc: "Optional. What to show if NO values match. If omitted and no match is found, it returns #N/A." }
    ],
    detailedExamples: [
      {
        title: "Day of Week Translator",
        table: {
          headers: ["Code", "Formula", "Result"],
          rows: [
            ["1", "=SWITCH(A2, 1, \"Mon\", 2, \"Tue\", \"Other\")", "Mon"],
            ["5", "=SWITCH(A3, 1, \"Mon\", 2, \"Tue\", \"Other\")", "Other"]
          ]
        },
        stepByStep: [
          "Excel looks at A3 (5).",
          "Does 5 = 1? (No).",
          "Does 5 = 2? (No).",
          "No more pairs found, so it returns the default: 'Other'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Trying to use comparisons (> or <).", desc: "SWITCH only does 'equal to'. If you need to check if A1 > 10, use the IFS function instead." }
    ],
    limitations: "Cannot handle ranges or 'greater than/less than' logic. Exact matches only.",
    bestPractices: [
      "Always include a default result at the very end to handle unexpected data.",
      "Use SWITCH for readability when you have 4+ exact-match options."
    ],
    proTips: [
      "You can use functions as the 'expression'—for example, SWITCH(WEEKDAY(A2), ...)."
    ],
    relatedFunctions: ["IFS", "CHOOSE", "VLOOKUP"],
    miniChallenge: {
      question: "Write a SWITCH formula to turn the letter 'Y' into 'Yes' and 'N' into 'No', with 'Maybe' as default.",
      expectedAnswer: "=SWITCH(A1, \"Y\", \"Yes\", \"N\", \"No\", \"Maybe\")"
    },
    practice: {
      instructions: "In cell B2, use SWITCH to turn the code in A2 (1) into \"Active\" and (0) into \"Inactive\".",
      initialData: [["Code", "Status"], [1, ""]],
      targetCell: [1, 1],
      expectedFormula: "SWITCH(A2,1,\"Active\",0,\"Inactive\")",
      expectedValue: "Active"
    }
  },
  {
    id: "true",
    title: "TRUE Function",
    category: "logical",
    difficulty: "Beginner",
    xp: 50,
    introduction: {
      title: "The Standard of Success: TRUE",
      description: "The TRUE function simply returns the logical value TRUE.",
      concept: "Think of it as a constant. You usually don't type the function =TRUE(), you just type the word TRUE into a formula. Excel treats both the same."
    },
    internalLogic: "Excel recognizes TRUE as a special logical constant with a numeric value of 1. It is the result of any successful comparison (like 10 > 5).",
    whyItExists: "TRUE exists to provide a clear, unambiguous way to indicate that a condition has been met. It is compatible with other spreadsheet software and programming languages.",
    whenToUse: "Use TRUE when you need to provide a logical 'Yes' to another function, or when creating 'Checkbox' style columns in a sheet.",
    realWorldUseCases: [
      "Flagging rows for a macro or filter to process.",
      "Using as a placeholder in a complex formula while testing.",
      "Providing a 'Match' signal to a VLOOKUP."
    ],
    businessExample: {
      scenario: "You want a column that simply marks every row as 'Validated' using a logical value.",
      formula: "=TRUE()"
    },
    syntax: "=TRUE()",
    syntaxBreakdown: [
      { arg: "None", desc: "This function takes no arguments." }
    ],
    detailedExamples: [
      {
        title: "Formula vs Constant",
        table: {
          headers: ["Method", "Formula", "Result"],
          rows: [
            ["Function", "=TRUE()", "TRUE"],
            ["Typed", "TRUE", "TRUE"]
          ]
        },
        stepByStep: [
          "Excel evaluates the function.",
          "It returns the logical state TRUE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Typing as text.", desc: "If you type \"TRUE\" in quotes, Excel treats it as a word. TRUE (no quotes) is a logical value. Most formulas need the logical value." }
    ],
    limitations: "Returns only one value.",
    bestPractices: [
      "Just type TRUE instead of =TRUE() to keep your formulas shorter."
    ],
    proTips: [
      "In math, TRUE is equal to 1. You can actually do math with it: =TRUE()+TRUE() = 2."
    ],
    relatedFunctions: ["FALSE", "IF", "AND"],
    miniChallenge: {
      question: "What is the numeric value of TRUE in an Excel calculation?",
      expectedAnswer: "1"
    },
    practice: {
      instructions: "In cell A1, simply enter the TRUE function.",
      initialData: [[""]],
      targetCell: [0, 0],
      expectedFormula: "TRUE()",
      expectedValue: true
    }
  },
  {
    id: "false",
    title: "FALSE Function",
    category: "logical",
    difficulty: "Beginner",
    xp: 50,
    introduction: {
      title: "The Standard of Failure: FALSE",
      description: "The FALSE function returns the logical value FALSE.",
      concept: "The opposite of TRUE. It represents a condition NOT being met."
    },
    internalLogic: "Excel recognizes FALSE as a logical constant with a numeric value of 0.",
    whyItExists: "To provide a standard 'No' signal for logical tests.",
    whenToUse: "Use FALSE when you need to explicitly return a 'failed' state in a formula.",
    realWorldUseCases: [
      "Resetting a toggle in a dashboard.",
      "Marking data as 'Incomplete'."
    ],
    syntax: "=FALSE()",
    syntaxBreakdown: [
      { arg: "None", desc: "Takes no arguments." }
    ],
    detailedExamples: [
      {
        title: "Logical Constants",
        table: {
          headers: ["Formula", "Result", "Numeric Value"],
          rows: [
            ["=FALSE()", "FALSE", "0"]
          ]
        },
        stepByStep: [
          "Excel evaluates the function and returns FALSE."
        ]
      }
    ],
    commonMistakes: [
      { title: "Typing \"FALSE\" in quotes.", desc: "Use FALSE without quotes to ensure Excel treats it as a logical value, not text." }
    ],
    proTips: [
      "Just type FALSE directly into your formulas to save time."
    ],
    relatedFunctions: ["TRUE", "IF", "NOT"],
    miniChallenge: {
      question: "What is the numeric value of FALSE in Excel?",
      expectedAnswer: "0"
    },
    practice: {
      instructions: "In cell A1, enter the FALSE function.",
      initialData: [[""]],
      targetCell: [0, 0],
      expectedFormula: "FALSE()",
      expectedValue: false
    }
  },
  {
    id: "let",
    title: "Optimize Your Formulas: LET Function",
    category: "logical",
    difficulty: "Advanced",
    xp: 500,
    introduction: {
      title: "Optimize Your Formulas: LET Function",
      description: "The LET function makes your formulas faster and easier to read by letting you assign names to calculation results. Instead of writing the same expression over and over, you give it a name once and reuse it.",
      concept: "Think of it like labelling a box: you store a value or calculation in a named variable, then refer to that name whenever you need the contents. No more repeating the same long expression multiple times in one formula."
    },
    internalLogic: "Excel evaluates each name-value pair once and stores the result in temporary memory. It then uses that stored result whenever the name is mentioned in the final calculation. This prevents Excel from having to calculate the same thing twice.",
    whyItExists: "Complex formulas often repeat the same math (e.g., repeating a long VLOOKUP several times). This makes the formula slow and impossible to debug. LET solves this by calculating it once and giving it a name.",
    whenToUse: "Use LET whenever you have a complex formula that repeats the same calculation or when you want to make a long formula more understandable for others.",
    realWorldUseCases: [
      "Cleaning up a formula that uses the same VLOOKUP three times.",
      "Building multi-step financial models in a single cell.",
      "Improving the performance of massive spreadsheets by reducing redundant math.",
      "Creating 'Self-Documenting' formulas where the names (e.g., 'TaxRate') explain what the numbers are."
    ],
    businessExample: {
      scenario: "A manager wants to calculate a tiered bonus where 5% is paid on revenue up to 50,000 and 8% on anything above, without repeating the logic.",
      formula: "=LET(rev, B2, threshold, 50000, lower, MIN(rev, threshold), upper, MAX(0, rev-threshold), lower*0.05 + upper*0.08)"
    },
    syntax: "=LET(name1, value1, [name2, value2, ...], calculation)",
    syntaxBreakdown: [
      { arg: "name1", desc: "The variable name you assign (no quotes needed)." },
      { arg: "value1", desc: "The value or calculation stored in that name." },
      { arg: "name2, value2", desc: "Optional additional variable pairs." },
      { arg: "calculation", desc: "The final expression that uses the named variables to produce a result." }
    ],
    detailedExamples: [
      {
        title: "Example: Tiered Bonus Calculation",
        table: {
          headers: ["Employee", "Revenue", "Formula", "Bonus"],
          rows: [
            ["Alice", "65,000", "=LET(rev, B2, threshold, 50000, lower, MIN(rev, threshold), upper, MAX(0, rev-threshold), lower*0.05 + upper*0.08)", "3,700"],
            ["Ben", "40,000", "=LET(rev, B3, threshold, 50000, lower, MIN(rev, threshold), upper, MAX(0, rev-threshold), lower*0.05 + upper*0.08)", "2,000"]
          ]
        },
        stepByStep: [
          "rev stores the revenue value from column B.",
          "threshold stores 50,000.",
          "lower calculates the portion of revenue at or below the threshold.",
          "upper calculates any revenue above the threshold.",
          "The final calculation applies 5% to the lower portion and 8% to the upper portion."
        ]
      }
    ],
    commonMistakes: [
      { title: "Forgetting the final calculation.", desc: "The last argument must be the expression that returns the result." },
      { title: "Using the same variable name twice.", desc: "Each name must be unique within the LET function." },
      { title: "Putting quotes around variable names.", desc: "Unlike text strings, variable names in LET are unquoted." }
    ],
    limitations: "Only available in Office 365 and Excel 2021+.",
    bestPractices: [
      "Use clear names like 'Revenue' or 'Discount' instead of 'x' or 'y'.",
      "Indent your LET formulas (Alt+Enter) to make the name-value pairs clearly visible."
    ],
    proTips: [
      "Use LET to store intermediate results from complex lookups or calculations you reference multiple times.",
      "Pair LET with LAMBDA to create highly efficient, readable custom functions."
    ],
    relatedFunctions: ["LAMBDA", "IF", "IFS"],
    miniChallenge: {
      question: "In =LET(x, 5, x*2), what is the final result?",
      expectedAnswer: "10"
    },
    practice: {
      instructions: "In cell B2, use LET to name the value 10 as \"val\" and then multiply it by 2.",
      initialData: [["Input", "Result"], ["", ""]],
      targetCell: [1, 1],
      expectedFormula: "LET(val,10,val*2)",
      expectedValue: 20
    }
  },
  {
    id: "lambda",
    title: "Build Your Own Functions: LAMBDA Function",
    category: "logical",
    difficulty: "Advanced",
    xp: 600,
    introduction: {
      title: "Build Your Own Functions: LAMBDA Function",
      description: "The LAMBDA function lets you create custom, reusable functions without any coding or VBA. You define the parameters and the calculation, then give it a name in the Name Manager to use it anywhere in your workbook.",
      concept: "Think of it like building your own Excel tool: you decide what inputs it takes, what it does with them, and what it returns. Once saved, you call it just like SUM or VLOOKUP."
    },
    internalLogic: "LAMBDA creates a local scope where the 'parameter' names are bound to the values passed in when the function is called. It then executes the 'calculation' using those bound values.",
    whyItExists: "For decades, if you wanted a custom function in Excel, you had to learn VBA (coding). LAMBDA brings that power directly into the formula bar, making Excel fully programmable.",
    whenToUse: "Use LAMBDA for any complex logic that you repeat frequently. It makes your work more consistent and much easier to update (change the logic in one place, and it updates everywhere).",
    realWorldUseCases: [
      "Creating a custom 'TaxCalculator' for your specific region.",
      "Building a 'SafeDivide' function that always handles zeros cleanly.",
      "Standardizing a complex date-difference calculation used in HR reports.",
      "Converting proprietary unit measurements unique to your industry."
    ],
    businessExample: {
      scenario: "You want a reusable function that calculates a selling price given a cost price and a markup percentage.",
      formula: "=LAMBDA(cost, margin, cost * (1 + margin))"
    },
    syntax: "=LAMBDA(parameter1, [parameter2, ...], calculation)",
    syntaxBreakdown: [
      { arg: "parameter1", desc: "An input name for the first argument your function will accept." },
      { arg: "parameter2", desc: "Optional additional parameters." },
      { arg: "calculation", desc: "The expression that uses the parameters to produce the result." }
    ],
    detailedExamples: [
      {
        title: "Example: Custom Markup Calculator",
        table: {
          headers: ["Product", "Cost", "Margin", "Formula", "Selling Price"],
          rows: [
            ["Widget A", "50", "20%", "=MARKUP(A2, B2)", "60.00"],
            ["Widget B", "120", "15%", "=MARKUP(A3, B3)", "138.00"],
            ["Widget C", "80", "25%", "=MARKUP(A4, B4)", "100.00"]
          ]
        },
        stepByStep: [
          "Step 1: Define the LAMBDA in Name Manager (e.g., MARKUP = =LAMBDA(cost, margin, cost * (1 + margin))).",
          "Step 2: Use it in the sheet just like any built-in function.",
          "The LAMBDA accepts cost and margin as parameters and calculates the final price."
        ]
      },
      {
        title: "Direct Cell LAMBDA (Without Name Manager)",
        table: {
          headers: ["Product", "Cost", "Margin", "Formula", "Selling Price"],
          rows: [
            ["Widget A", "50", "20%", "=LAMBDA(c, m, c*(1+m))(B2, C2)", "60.00"]
          ]
        },
        stepByStep: [
          "You can use LAMBDA directly in a cell by adding parentheses with arguments at the end.",
          "In this case, (B2, C2) are passed as the 'c' and 'm' parameters immediately."
        ]
      }
    ],
    commonMistakes: [
      { title: "Forgetting to save it in Name Manager.", desc: "A bare LAMBDA in a cell returns #CALC!. Either name it or append arguments immediately." },
      { title: "Mismatched parameters and arguments.", desc: "The number of arguments you pass must match the number of parameters defined." },
      { title: "Using cell references inside the Name Manager definition.", desc: "Use only the parameter names; all values should come through the arguments." }
    ],
    limitations: "Only available in Office 365 and Excel 2021+.",
    bestPractices: [
      "Use the 'Name Manager' (Formulas Tab) to give your LAMBDA a name. This is where it becomes truly powerful.",
      "Name your parameters clearly so others know what to input."
    ],
    proTips: [
      "Combine LAMBDA with LET inside the definition to handle complex, multi-step logic in a clean way.",
      "Build a library of LAMBDAs for common business calculations like tax, commission, or unit conversions, then share them across workbooks."
    ],
    relatedFunctions: ["LET", "MAP", "REDUCE", "SCAN"],
    miniChallenge: {
      question: "What error does Excel show if you don't 'call' a LAMBDA in a cell?",
      expectedAnswer: "#CALC!"
    },
    practice: {
      instructions: "In cell B2, create a LAMBDA that takes one parameter \"x\" and adds 5 to it. Call it immediately with the value 10.",
      initialData: [["Input", "Result"], ["", ""]],
      targetCell: [1, 1],
      expectedFormula: "LAMBDA(x,x+5)(10)",
      expectedValue: 15
    }
  }
];
