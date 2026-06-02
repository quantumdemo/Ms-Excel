export const mathStatsLessons = [
{
    id: "sum",
    title: "SUM Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "The Foundation of Arithmetic: SUM",
      description: "The SUM function is the most fundamental tool in Excel. It adds all the numbers in a range of cells and returns the total.",
      concept: "Instead of typing =A1+A2+A3 (which is slow and error-prone), you use =SUM(A1:A3). It's faster, more accurate, and adapts automatically if you add more data."
    },
    internalLogic: "Excel scans the provided arguments, identifies all numerical values, and ignores any cells containing text, logical values (TRUE/FALSE), or empty spaces. It then performs binary addition on the identified numbers to return the arithmetic total.",
    whyItExists: "Addition is the most common task in data management. SUM exists to automate this process, allowing for massive calculations that would be impossible to do manually without errors.",
    whenToUse: "Use SUM whenever you need the total of two or more numbers or ranges. If you are doing addition, use SUM.",
    realWorldUseCases: [
      "Totaling monthly household expenses.",
      "Calculating total quarterly revenue for a business.",
      "Adding up inventory items in a warehouse.",
      "Summing hours worked by employees for payroll."
    ],
    businessExample: {
      scenario: "A retail store manager needs to know the total value of sales from 3 different departments.",
      formula: "=SUM(B2, B3, B4)"
    },
    syntax: "=SUM(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first item you want to add. This can be a number, a cell reference (A1), or a range (A1:A10)." },
      { arg: "number2", desc: "Optional. Additional numbers, cells, or ranges to include in the total. You can add up to 255 items." }
    ],
    detailedExamples: [
      {
        title: "Monthly Sales Total",
        table: {
          headers: ["Item", "Price", "Formula", "Total"],
          rows: [
            ["Phone", "800", "=SUM(B2:B4)", "1500"],
            ["Case", "50", "", ""],
            ["Charger", "650", "", ""]
          ]
        },
        stepByStep: [
          "Excel identifies the range B2:B4.",
          "It extracts the values 800, 50, and 650.",
          "It performs the addition: 800 + 50 + 650.",
          "The result (1,500) is placed in the cell."
        ]
      }
    ],
    commonMistakes: [
      { title: "Circular References.", desc: "Don't write the SUM formula in a cell that is part of the sum range (e.g., writing =SUM(A1:A10) in cell A5)." },
      { title: "Numbers stored as text.", desc: "Excel ignores text. If a cell has a 'green triangle' error, convert it to a number so SUM can see it." }
    ],
    limitations: "SUM only performs addition. It cannot directly handle conditions (use SUMIF for that) or complex criteria.",
    bestPractices: [
      "Use ranges (A1:A10) rather than individual cells (A1, A2, A3) whenever possible to keep formulas clean.",
      "Use 'AutoSum' (Alt+= on Windows) for even faster totals."
    ],
    proTips: [
      "You can sum cells across multiple sheets (3D Summing) by using the format: =SUM(Sheet1:Sheet3!A1).",
      "SUM can handle text strings that look like numbers if they are provided directly as arguments (not as cell references)."
    ],
    relatedFunctions: ["SUMIF", "SUMIFS", "AVERAGE", "COUNT", "SUBTOTAL"],
    comparison: "SUM adds values together, while COUNT tells you how many values there are. If you have three ₦10 bills, SUM is ₦30, but COUNT is 3.",
    miniChallenge: {
      question: "You have sales in B2, B3, B4, and B5. Write the shortest formula to add them all.",
      expectedAnswer: "=SUM(B2:B5)"
    },
    practice: {
      instructions: "In cell B5, use the SUM function to calculate the total of values in B2, B3, and B4.",
      initialData: [["Item", "Cost"], ["Rent", 1200], ["Food", 400], ["Travel", 200], ["Total", ""]],
      targetCell: [4, 1],
      expectedFormula: "SUM(B2:B4)",
      expectedValue: 1800
    }
  },
{
    id: "sumif",
    title: "SUMIF Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Conditional Totals: SUMIF",
      description: "The SUMIF function adds values in a range only if they meet a specific criteria you define.",
      concept: "Think of it like a filter and a calculator combined. 'Add up the sales, BUT ONLY for the North region.' It saves you from having to sort and sum manually."
    },
    internalLogic: "Excel looks at each cell in the 'range'. It checks if it matches the 'criteria'. If it's a match, it takes the corresponding value from the 'sum_range' and adds it to the running total.",
    whyItExists: "Business data is messy. You rarely want to sum *everything*. You usually want to sum by category, by person, or by date. SUMIF is the most efficient way to do this selectively.",
    whenToUse: "Use SUMIF when you have one condition to check (e.g., Category = 'Food') before adding numbers.",
    realWorldUseCases: [
      "Calculating total sales for a specific employee.",
      "Summing expenses that are over ₦100.",
      "Totaling inventory for a specific brand.",
      "Summing all overdue invoices."
    ],
    businessExample: {
      scenario: "A coffee shop owner wants to find the total sales of 'Espresso' from a long list of various drinks sold.",
      formula: "=SUMIF(A2:A100, \"Espresso\", B2:B100)"
    },
    syntax: "=SUMIF(range, criteria, [sum_range])",
    syntaxBreakdown: [
      { arg: "range", desc: "The range of cells you want to check against the criteria (e.g., the Category column)." },
      { arg: "criteria", desc: "The condition that must be met (e.g., \"Apple\", \">100\", or a cell reference)." },
      { arg: "sum_range", desc: "Optional. The actual cells to add. If omitted, Excel sums the cells in the 'range' argument." }
    ],
    detailedExamples: [
      {
        title: "Example: Category Summing",
        table: {
          headers: ["Category", "Sales", "Formula", "Result"],
          rows: [
            ["Fruit", "50", "=SUMIF(A2:A4, \"Fruit\", B2:B4)", "80"],
            ["Veg", "20", "", ""],
            ["Fruit", "30", "", ""]
          ]
        },
        stepByStep: [
          "Excel checks A2: 'Fruit'. (Match!) Adds 50.",
          "Excel checks A3: 'Veg'. (No Match).",
          "Excel checks A4: 'Fruit'. (Match!) Adds 30.",
          "Total: 80."
        ]
      }
    ],
    commonMistakes: [
      { title: "Mismatched range sizes.", desc: "Your 'range' and 'sum_range' MUST be the same height/width (e.g., A2:A10 and B2:B10). If they don't match, you'll get inaccurate results." },
      { title: "Forgetting quotes.", desc: "Text criteria like \"Fruit\" or logic like \">50\" must be in double quotes." }
    ],
    limitations: "SUMIF only handles ONE condition. If you need to sum based on multiple criteria (e.g., Region = 'North' AND Category = 'Fruit'), you must use SUMIFS.",
    bestPractices: [
      "Use cell references for your criteria: =SUMIF(A2:A10, D1, B2:B10). This lets you change the filter by just typing in cell D1."
    ],
    proTips: [
      "You can use wildcards! \"*\" matches any sequence of characters. \"App*\" would sum Apple, Application, and Appliance."
    ],
    relatedFunctions: ["SUMIFS", "COUNTIF", "AVERAGEIF", "SUM"],
    miniChallenge: {
      question: "Sum range B1:B10 if A1:A10 equals \"Red\".",
      expectedAnswer: "=SUMIF(A1:A10, \"Red\", B1:B10)"
    },
    practice: {
      instructions: "In cell C2, sum the sales (B2:B4) where the category (A2:A4) is 'Fruit'.",
      initialData: [["Category", "Sales", "Total Fruit"], ["Fruit", 100, ""], ["Veg", 50, ""], ["Fruit", 200, ""]],
      targetCell: [1, 2],
      expectedFormula: "SUMIF(A2:A4,\"Fruit\",B2:B4)",
      expectedValue: 300
    }
  },
{
    id: "sumifs",
    title: "SUMIFS Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 400,
    introduction: {
      title: "Multi-Condition Totals: SUMIFS",
      description: "SUMIFS is the big brother of SUMIF. It allows you to add up numbers based on multiple different criteria at the same time.",
      concept: "Think of it as a double filter. 'Sum the sales where Region is West AND Category is Electronics.' It allows for surgical precision in your reporting."
    },
    internalLogic: "Excel checks the first criteria range against the first criteria. Then it checks the second, and so on. Only if a row satisfies ALL conditions does Excel add the corresponding value from the sum_range to the total.",
    whyItExists: "Business analysis often requires looking at intersections of data (e.g., specific products sold by a specific person in a specific month). SUMIFS handles these complex queries without needing pivot tables.",
    whenToUse: "Use SUMIFS whenever you have two or more conditions that must be met before summing.",
    realWorldUseCases: [
      "Totaling sales for a specific employee in a specific month.",
      "Summing project costs that are 'High Priority' and 'Overdue'.",
      "Calculating total units sold for 'Blue' items in 'Size Large'.",
      "Totaling budget spend for 'Marketing' department in 'Q1'."
    ],
    businessExample: {
      scenario: "A manager wants to find the total sales for 'John' in the 'North' region.",
      formula: "=SUMIFS(C2:C100, A2:A100, \"John\", B2:B100, \"North\")"
    },
    syntax: "=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    syntaxBreakdown: [
      { arg: "sum_range", desc: "The actual cells to add. (Note: This comes FIRST in SUMIFS, but LAST in SUMIF!)" },
      { arg: "criteria_range1", desc: "The first range to filter (e.g., the Sales Rep column)." },
      { arg: "criteria1", desc: "The first condition (e.g., \"John\")." },
      { arg: "criteria_range2", desc: "The second range to filter (e.g., the Region column)." },
      { arg: "criteria2", desc: "The second condition (e.g., \"North\")." }
    ],
    detailedExamples: [
      {
        title: "Example: Multi-Filter Sales",
        table: {
          headers: ["Name", "Region", "Sales", "Formula", "Result"],
          rows: [
            ["John", "North", "100", "=SUMIFS(C2:C4, A2:A4, \"John\", B2:B4, \"North\")", "100"],
            ["Jane", "North", "200", "", ""],
            ["John", "South", "300", "", ""]
          ]
        },
        stepByStep: [
          "Excel identifies the Sum Range (C2:C4).",
          "It checks row 2: Name is 'John' (Yes) and Region is 'North' (Yes). Adds 100.",
          "It checks row 4: Name is 'John' (Yes) but Region is 'South' (No). Skips.",
          "Total: 100."
        ]
      }
    ],
    commonMistakes: [
      { title: "Wrong Order.", desc: "In SUMIF, the sum_range is at the end. In SUMIFS, the sum_range is at the START. Don't mix them up!" },
      { title: "Different range sizes.", desc: "All ranges (sum_range and all criteria_ranges) must have the exact same number of rows and columns." }
    ],
    limitations: "SUMIFS uses 'AND' logic (all conditions must be true). If you need 'OR' logic (this OR that), you'll need to add two SUMIFS together.",
    bestPractices: [
      "Use cell references for criteria to make your summary tables dynamic.",
      "Always start with the sum_range when typing the formula."
    ],
    proTips: [
      "You can use dates as criteria! \">\"&DATE(2024,1,1) will sum everything after Jan 1st.",
      "SUMIFS is often a faster and cleaner alternative to Pivot Tables for simple dashboards."
    ],
    relatedFunctions: ["SUMIF", "COUNTIFS", "AVERAGEIFS", "MAXIFS"],
    miniChallenge: {
      question: "In SUMIFS, does the sum_range come at the beginning or the end?",
      expectedAnswer: "Beginning"
    },
    practice: {
      instructions: "In cell D2, sum the values in C2:C4 where A2:A4 is \"Fruit\" and B2:B4 is \"Red\".",
      initialData: [["Type", "Color", "Val", "Result"], ["Fruit", "Red", 10, ""], ["Veg", "Red", 20, ""], ["Fruit", "Blue", 30, ""]],
      targetCell: [1, 3],
      expectedFormula: "SUMIFS(C2:C4,A2:A4,\"Fruit\",B2:B4,\"Red\")",
      expectedValue: 10
    }
  },
{
    id: "round",
    title: "The Precision Tool: ROUND",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Cleaning Up Decimals: ROUND",
      description: "The ROUND function rounds a number to a specified number of decimal places based on standard rounding rules (0.5 and up goes up).",
      concept: "Think of it as a haircut for your numbers. If you have ₦10.333333, it's messy. ROUND trims it down to a neat ₦10.33."
    },
    internalLogic: "Excel looks at the digit to the right of your rounding target. If it's 5, 6, 7, 8, or 9, it rounds up. If it's 0, 1, 2, 3, or 4, it keeps the current digit (rounds down).",
    whyItExists: "Financial reports and scientific data often generate long decimals that aren't useful for humans. ROUND ensures your final numbers are clean and professional.",
    whenToUse: "Use ROUND when you need a value to be exactly a certain precision (like 2 decimal places for currency) so that subsequent math doesn't have tiny hidden errors.",
    realWorldUseCases: [
      "Rounding currency calculations to 2 decimal places.",
      "Simplifying percentage results in a report.",
      "Rounding measurements to the nearest whole number.",
      "Cleaning up results from division formulas."
    ],
    businessExample: {
      scenario: "An invoice calculation results in ₦105.6789. You need to round this to the nearest cent for the customer.",
      formula: "=ROUND(A2, 2)"
    },
    syntax: "=ROUND(number, num_digits)",
    syntaxBreakdown: [
      { arg: "number", desc: "The number or cell you want to round." },
      { arg: "num_digits", desc: "The number of decimal places. 0 rounds to the nearest integer. Negative numbers round to the left of the decimal (tens, hundreds)." }
    ],
    detailedExamples: [
      {
        title: "Example: Currency Rounding",
        table: {
          headers: ["Raw", "Digits", "Formula", "Result"],
          rows: [
            ["10.555", "2", "=ROUND(A2, 2)", "10.56"],
            ["10.554", "2", "=ROUND(A3, 2)", "10.55"]
          ]
        },
        stepByStep: [
          "Excel looks at 10.555.",
          "The 3rd decimal is 5, so the 2nd decimal increases by 1.",
          "Result: 10.56."
        ]
      }
    ],
    commonMistakes: [
      { title: "Rounding vs Formatting.", desc: "Changing the 'Decimal' button on the Home tab only *hides* the digits. The math still uses the long number. ROUND actually *changes* the number." }
    ],
    limitations: "ROUND always uses 0.5 as the cutoff. If you always want to go up (like for tax) or always down (like for inventory), use ROUNDUP or ROUNDDOWN.",
    bestPractices: [
      "Always round your final totals in financial spreadsheets to avoid 'penny-off' errors."
    ],
    proTips: [
      "Use =ROUND(A1, -1) to round to the nearest 10, or =ROUND(A1, -2) to round to the nearest 100."
    ],
    relatedFunctions: ["ROUNDUP", "ROUNDDOWN", "MROUND", "INT", "TRUNC"],
    miniChallenge: {
      question: "Round 1.234 to 2 decimal places.",
      expectedAnswer: "=ROUND(1.234, 2)"
    },
    practice: {
      instructions: "In cell B2, round the value in A2 to 2 decimal places.",
      initialData: [["Value", "Rounded"], [10.666, ""]],
      targetCell: [1, 1],
      expectedFormula: "ROUND(A2,2)",
      expectedValue: 10.67
    }
  },
{
    id: "abs",
    title: "The Positivity Function: ABS",
    category: "math",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Removing the Negative: ABS",
      description: "The ABS function returns the absolute value of a number, which means it turns negative numbers into positive numbers, while positive numbers stay positive.",
      concept: "Think of it as 'Distance'. If you walk 10 steps forward or 10 steps backward, you've still moved 10 steps. ABS only cares about the amount, not the direction (+ or -)."
    },
    internalLogic: "Excel checks if the number is less than 0. If it is, it multiplies it by -1 to make it positive. If it's already 0 or greater, it leaves it exactly as it is.",
    whyItExists: "In many business calculations (like variance analysis), we only care about the *size* of the difference, not whether it was over or under the budget.",
    whenToUse: "Use ABS when you need to calculate distances, differences, or deviations where the negative sign would confuse your final result.",
    realWorldUseCases: [
      "Calculating the difference between a forecast and actual sales (Variance).",
      "Finding the distance between two points on a coordinate system.",
      "Ensuring a result is always positive for use in another formula.",
      "Calculating the absolute error in scientific measurements."
    ],
    businessExample: {
      scenario: "You have a 'Budget' and an 'Actual' column. You want to see the total 'Swing' (difference) regardless of whether you were over or under.",
      formula: "=ABS(Actual - Budget)"
    },
    syntax: "=ABS(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The real number or cell you want the absolute value of." }
    ],
    detailedExamples: [
      {
        title: "Example: Variance Analysis",
        table: {
          headers: ["Budget", "Actual", "Formula", "Diff"],
          rows: [
            ["100", "80", "=ABS(B2-A2)", "20"],
            ["100", "120", "=ABS(B3-A3)", "20"]
          ]
        },
        stepByStep: [
          "Excel subtracts 100 from 80 to get -20.",
          "ABS sees the -20 and removes the minus sign.",
          "Result: 20."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using for formatting.", desc: "If you just want to *hide* the minus sign but keep the negative math, use custom number formatting. ABS actually changes the underlying value to positive." }
    ],
    limitations: "ABS only works on numbers. If you provide text, it will return a #VALUE! error.",
    bestPractices: [
      "Use ABS when calculating the 'Total Variance' of a project to see the absolute total deviation."
    ],
    proTips: [
      "Use =SUM(ABS(Range)) as an array formula (Ctrl+Shift+Enter in older Excel) to find the total absolute deviation."
    ],
    relatedFunctions: ["SIGN", "INT", "ROUND"],
    miniChallenge: {
      question: "What is =ABS(-500)?",
      expectedAnswer: "500"
    },
    practice: {
      instructions: "In cell B2, find the absolute value of the number in A2.",
      initialData: [["Input", "Result"], [-15, ""]],
      targetCell: [1, 1],
      expectedFormula: "ABS(A2)",
      expectedValue: 15
    }
  },
{
    id: "sumproduct",
    title: "The Multiplier-Adder: SUMPRODUCT",
    category: "math",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Multiply and Total: SUMPRODUCT",
      description: "SUMPRODUCT multiplies corresponding components in two or more ranges and returns the sum of those products.",
      concept: "Think of it as a shortcut for a common task: multiplying Quantity by Price for every row and then adding up the total. Instead of creating a new 'Total' column, SUMPRODUCT does it all in one cell."
    },
    internalLogic: "Excel takes the first number of Array 1 and the first number of Array 2, multiplies them. It does this for every row. Finally, it adds all those individual results together to give a single total.",
    whyItExists: "In inventory management and financial analysis, you constantly need to find a 'Weighted Total'. SUMPRODUCT is the most efficient way to do this without cluttering your sheet with extra columns.",
    whenToUse: "Use SUMPRODUCT whenever you need to multiply two columns and then sum the results, or for advanced conditional counting/summing.",
    realWorldUseCases: [
      "Calculating the total value of an invoice (Quantity * Price).",
      "Finding a weighted average (Grade * Credit Hours).",
      "Counting items that meet multiple criteria (advanced use).",
      "Calculating total labor costs (Hours * Hourly Rate)."
    ],
    businessExample: {
      scenario: "You have 3 items. You know the price of each and how many you sold. You want the total revenue instantly.",
      formula: "=SUMPRODUCT(A2:A4, B2:B4)"
    },
    syntax: "=SUMPRODUCT(array1, [array2], ...)",
    syntaxBreakdown: [
      { arg: "array1", desc: "The first range of numbers you want to multiply." },
      { arg: "array2", desc: "The second range of numbers. Must be the same size as array1." }
    ],
    detailedExamples: [
      {
        title: "Example: Total Revenue",
        table: {
          headers: ["Qty", "Price", "Formula", "Result"],
          rows: [
            ["10", "5", "=SUMPRODUCT(A2:A3, B2:B3)", "110"],
            ["2", "30", "", ""]
          ]
        },
        stepByStep: [
          "Excel multiplies 10 * 5 = 50.",
          "Excel multiplies 2 * 30 = 60.",
          "It adds 50 + 60 = 110."
        ]
      }
    ],
    commonMistakes: [
      { title: "Array size mismatch.", desc: "If Array 1 has 5 rows and Array 2 has 6 rows, you will get a #VALUE! error. Ranges must be identical in size." }
    ],
    limitations: "SUMPRODUCT treats non-numeric entries (like text) as zero.",
    bestPractices: [
      "Use SUMPRODUCT to avoid 'Helper Columns'—it keeps your spreadsheets cleaner."
    ],
    proTips: [
      "You can use it for conditional summing: =SUMPRODUCT((A2:A10=\"Red\")*(B2:B10)). This works like SUMIF but is more flexible."
    ],
    relatedFunctions: ["SUM", "PRODUCT", "SUMIFS"],
    miniChallenge: {
      question: "What does SUMPRODUCT do before it adds the numbers together?",
      expectedAnswer: "Multiplies"
    },
    practice: {
      instructions: "In cell C2, use SUMPRODUCT to multiply Qty (A2:A3) and Price (B2:B3) and sum them.",
      initialData: [["Qty", "Price", "Total"], [2, 10, ""], [5, 20, ""]],
      targetCell: [1, 2],
      expectedFormula: "SUMPRODUCT(A2:A3,B2:B3)",
      expectedValue: 120
    }
  },
{
    id: "roundup",
    title: "Force Upward: ROUNDUP",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Always Rounding Up: ROUNDUP",
      description: "The ROUNDUP function behaves like ROUND, but it always rounds numbers away from zero, regardless of whether the next digit is higher or lower than 5.",
      concept: "Think of it as 'The Ceiling'. If you have 1.1 and you need to round up to the nearest whole number, ROUNDUP gives you 2. It is often used when you cannot have a fraction of something (like needing to buy whole boxes of tiles)."
    },
    internalLogic: "Excel looks at the digit to the right of your specified precision. If that digit is anything other than 0, Excel increases the target digit by 1.",
    whyItExists: "In business, you often have to round up for safety or billing. For example, if a job takes 1.1 hours, you might bill for 2 hours.",
    whenToUse: "Use ROUNDUP for inventory planning (ordering enough material), billing (rounding up minutes to the next hour), or tax calculations where required.",
    realWorldUseCases: [
      "Determining how many shipping containers are needed for a load.",
      "Calculating the number of employees required for a shift (cannot have 4.2 employees).",
      "Rounding up prices for a 'minimum profit' margin.",
      "Calculating the number of full pages needed for a print job."
    ],
    businessExample: {
      scenario: "You need 10.2 liters of paint. Paint is sold in 1-liter cans. How many cans do you need?",
      formula: "=ROUNDUP(10.2, 0)"
    },
    syntax: "=ROUNDUP(number, num_digits)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value you want to round up." },
      { arg: "num_digits", desc: "The precision. 0 for nearest whole number, 1 for 1 decimal place." }
    ],
    detailedExamples: [
      {
        title: "Example: Inventory",
        table: {
          headers: ["Required", "Formula", "Order"],
          rows: [
            ["5.1", "=ROUNDUP(A2, 0)", "6"],
            ["5.9", "=ROUNDUP(A3, 0)", "6"]
          ]
        },
        stepByStep: [
          "Excel sees 5.1.",
          "Because it is ROUNDUP, it ignores the '.1' and jumps to the next whole number.",
          "Result: 6."
        ]
      }
    ],
    commonMistakes: [
      { title: "Negative digits.", desc: "Using a negative number for num_digits rounds to the left of the decimal. =ROUNDUP(123, -1) results in 130." },
      { title: "Rounding toward zero.", desc: "ROUNDUP always rounds AWAY from zero. For negative numbers, -1.1 becomes -2." }
    ],
    relatedFunctions: ["ROUND", "ROUNDDOWN", "CEILING", "INT"],
    miniChallenge: {
      question: "Round up 12.01 to the nearest whole number.",
      expectedAnswer: "=ROUNDUP(12.01, 0)"
    },
    practice: {
      instructions: "In cell B2, round up the value in A2 to the nearest integer.",
      initialData: [["Value", "Up"], [10.2, ""]],
      targetCell: [1, 1],
      expectedFormula: "ROUNDUP(A2,0)",
      expectedValue: 11
    }
  },
{
    id: "rounddown",
    title: "Force Numbers Down: ROUNDDOWN Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Force Numbers Down: ROUNDDOWN Function",
      description: "The ROUNDDOWN function rounds a number down toward zero, regardless of the next digit. Unlike standard rounding, it never rounds up — it simply chops off digits beyond the specified precision.",
      concept: "Think of it like a strict bouncer at a club: no matter how close you are to the next level, you're kept at the current one."
    },
    internalLogic: "Excel simply truncates (cuts off) any digits beyond the specified precision.",
    whyItExists: "Useful for calculating age or full years of service.",
    whenToUse: "Use ROUNDDOWN when calculating conservative estimates, floor pricing, or when you need to be sure a value is never overstated.",
    realWorldUseCases: [
      "Calculating completed years of employment.",
      "Finding the number of full units that can be made from raw material.",
      "Rounding down currency for conservative budget estimates."
    ],
    syntax: "=ROUNDDOWN(number, num_digits)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value you want to round down." },
      { arg: "num_digits", desc: "The number of decimal places to keep. Use 0 for a whole number, positive values for decimals, negative to round down before the decimal point." }
    ],
    detailedExamples: [
      {
        title: "Example: Truncating Prices",
        table: {
          headers: ["Product", "Original Price", "Formula", "Rounded Down"],
          rows: [
            ["Pen", "12.789", "=ROUNDDOWN(B2, 2)", "12.78"],
            ["Notebook", "45.999", "=ROUNDDOWN(B3, 2)", "45.99"],
            ["Eraser", "7.101", "=ROUNDDOWN(B4, 2)", "7.10"]
          ]
        },
        stepByStep: [
          "Excel takes the original price.",
          "It keeps only the number of decimal places specified.",
          "All digits beyond are discarded — no rounding up, even if the next digit is 9."
        ]
      },
      {
        title: "Rounding Precision Examples",
        table: {
          headers: ["Value", "Num_Digits", "Formula", "Result"],
          rows: [
            ["1234.5678", "2", "=ROUNDDOWN(1234.5678, 2)", "1234.56"],
            ["1234.5678", "0", "=ROUNDDOWN(1234.5678, 0)", "1234"],
            ["1234.5678", "-2", "=ROUNDDOWN(1234.5678, -2)", "1200"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Confusing with INT for negatives.", desc: "ROUNDDOWN(-4.3, 0) returns -4, while INT(-4.3) returns -5. INT always rounds down to the lower integer; ROUNDDOWN goes toward zero." },
      { title: "Expecting it to round up.", desc: "It never does, even when the next digit is 5 or more." }
    ],
    proTips: [
      "Use ROUNDDOWN when calculating conservative estimates, floor pricing, or when you need to be sure a value is never overstated.",
      "Pair with SUM on financial projections where you deliberately want to understate totals."
    ],
    relatedFunctions: ["ROUND", "ROUNDUP", "INT", "TRUNC"],
    miniChallenge: {
      question: "Round 1.99 down to zero decimal places.",
      expectedAnswer: "=ROUNDDOWN(1.99, 0)"
    },
    practice: {
      instructions: "In cell B2, round down 10.9 to 0 decimal places.",
      initialData: [["Val", "Down"], [10.9, ""]],
      targetCell: [1, 1],
      expectedFormula: "ROUNDDOWN(A2,0)",
      expectedValue: 10
    }
  },
{
    id: "int",
    title: "The Integer Extractor: INT Function",
    category: "math",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "The Integer Extractor: INT Function",
      description: "The INT function returns the integer part of a number by rounding down to the nearest whole number. For positive numbers, this simply strips the decimal. For negative numbers, it moves further away from zero.",
      concept: "Think of it as a floor function: it finds the greatest integer less than or equal to the number."
    },
    internalLogic: "Excel identifies the nearest integer that is less than or equal to the number.",
    whyItExists: "Essential for working with dates and times (since dates are integers and times are decimals).",
    whenToUse: "Use INT to extract the date from a NOW() timestamp.",
    syntax: "=INT(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value you want to convert to an integer." }
    ],
    detailedExamples: [
      {
        title: "Example: Extracting Whole Days from Hours",
        table: {
          headers: ["Employee", "Total Hours", "Formula", "Full Days"],
          rows: [
            ["John", "27.8", "=INT(B2/8)", "3"],
            ["Maria", "15.2", "=INT(B3/8)", "1"],
            ["Ahmed", "40.0", "=INT(B4/8)", "5"]
          ]
        },
        stepByStep: [
          "Total hours is divided by 8 to get the number of days (including partial).",
          "INT strips the decimal, leaving only completed full days."
        ]
      },
      {
        title: "Negative Number Behaviour",
        table: {
          headers: ["Value", "Formula", "Result"],
          rows: [
            ["7.9", "=INT(7.9)", "7"],
            ["-7.9", "=INT(-7.9)", "-8"]
          ]
        },
        stepByStep: [
          "INT rounds down to the next lowest integer.",
          "Since -8 is less than -7.9, that's the result. This is different from TRUNC which returns -7."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using INT when you want TRUNC for negative numbers.", desc: "INT moves away from zero; TRUNC moves toward zero." },
      { title: "Forgetting date-time behaviour.", desc: "INT on a date-time serial number extracts just the date, stripping the time decimal." }
    ],
    proTips: [
      "Use =INT(NOW()) to get today's date without the time component.",
      "Combine INT with division to count complete groups or units in allocation problems."
    ],
    relatedFunctions: ["TRUNC", "ROUNDDOWN", "FLOOR"],
    miniChallenge: {
      question: "Convert 5.7 to the nearest lower integer.",
      expectedAnswer: "=INT(5.7)"
    },
    practice: {
      instructions: "In cell B2, get the integer part of A2.",
      initialData: [["Value", "Int"], [5.7, ""]],
      targetCell: [1, 1],
      expectedFormula: "INT(A2)",
      expectedValue: 5
    }
  },
{
    id: "mod",
    title: "The Remainder Finder: MOD Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "The Remainder Finder: MOD Function",
      description: "The MOD function returns the remainder after a number is divided by a divisor. It answers the question: 'What's left over?'",
      concept: "Think of it like sharing sweets among friends: the MOD tells you how many sweets remain after everyone gets an equal share."
    },
    internalLogic: "Result = number - divisor * INT(number/divisor).",
    whyItExists: "Critical for scheduling (every 3rd row), unit conversions (inches remaining after feet), and alternating row colors in conditional formatting.",
    whenToUse: "Use MOD when you need to know if a number is even/odd or when grouping items.",
    realWorldUseCases: [
      "Finding if a year is a leap year (MOD by 4).",
      "Assigning tasks to 3 teams in rotation (MOD(Row, 3)).",
      "Converting total minutes into Hours and Minutes (MOD for minutes)."
    ],
    businessExample: {
      scenario: "You have 500 items and boxes of 12. How many items are left over after filling full boxes?",
      formula: "=MOD(500, 12)"
    },
    syntax: "=MOD(number, divisor)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value to be divided." },
      { arg: "divisor", desc: "The value you're dividing by." }
    ],
    detailedExamples: [
      {
        title: "Example: Identifying Alternate Rows",
        table: {
          headers: ["Item", "Row Number", "Formula", "Row Type"],
          rows: [
            ["Apple", "1", "=MOD(B2, 2)", "1 (Odd)"],
            ["Banana", "2", "=MOD(B3, 2)", "0 (Even)"],
            ["Cherry", "3", "=MOD(B4, 2)", "1 (Odd)"],
            ["Date", "4", "=MOD(B5, 2)", "0 (Even)"]
          ]
        },
        stepByStep: [
          "To identify odd/even rows for shading, use =MOD(ROW(), 2).",
          "Row 1: MOD(1, 2) = 1 (Odd).",
          "Row 2: MOD(2, 2) = 0 (Even).",
          "Row 3: MOD(3, 2) = 1 (Odd).",
          "When the result is 0, the row is even. Conditional formatting can use this to shade every other row automatically."
        ]
      },
      {
        title: "Real-World Example: Task Scheduling",
        table: {
          headers: ["Day", "Cycle Days", "Formula", "Day in Cycle"],
          rows: [
            ["23", "5", "=MOD(23, 5)", "3"]
          ]
        },
        stepByStep: [
          "You have a task that runs every 5 days.",
          "Day 23 is divided by 5, remainder is 3.",
          "The task is on day 3 of its 5-day cycle."
        ]
      }
    ],
    commonMistakes: [
      { title: "Divisor of zero.", desc: "=MOD(10,0) returns #DIV/0!." },
      { title: "Forgetting the sign rules.", desc: "The result takes the sign of the divisor. =MOD(-10,3) returns 2, not -1. =MOD(10,-3) returns -2." }
    ],
    proTips: [
      "Use =MOD(value,1) to extract just the decimal part of a number (the fractional remainder when divided by 1).",
      "Combine MOD with conditional formatting for zebra stripes, scheduling patterns, or group assignments."
    ],
    relatedFunctions: ["QUOTIENT", "INT", "ROUND"],
    miniChallenge: {
      question: "Find the remainder of 10 divided by 3.",
      expectedAnswer: "=MOD(10, 3)"
    },
    practice: {
      instructions: "In cell B2, find the remainder of 10 divided by 3.",
      initialData: [["Num", "Rem"], [10, ""]],
      targetCell: [1, 1],
      expectedFormula: "MOD(A2,3)",
      expectedValue: 1
    }
  },
{
    id: "product",
    title: "Multiply Everything: PRODUCT Function",
    category: "math",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Multiply Everything: PRODUCT Function",
      description: "The PRODUCT function multiplies all the numbers you give it and returns the final product. It's a fast way to multiply a range without typing A1*A2*A3*... endlessly.",
      concept: "Think of it like SUM, but for multiplication instead of addition."
    },
    syntax: "=PRODUCT(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number or range to multiply." },
      { arg: "number2", desc: "Optional additional numbers or ranges. You can include up to 255 arguments." }
    ],
    detailedExamples: [
      {
        title: "Example: Compound Growth",
        table: {
          headers: ["Year", "Return Factor", "Formula", "Cumulative Growth"],
          rows: [
            ["1", "1.08", "", "1.080"],
            ["2", "1.12", "", "1.210"],
            ["3", "0.95", "", "1.149"],
            ["4", "1.10", "", "1.264"],
            ["Overall", "", "=PRODUCT(B2:B5)", "1.264"]
          ]
        },
        stepByStep: [
          "PRODUCT multiplies 1.08 × 1.12 × 0.95 × 1.10.",
          "The result 1.264 means 26.4% total growth over four years.",
          "Without PRODUCT, you'd write =B2*B3*B4*B5 — manageable here, but messy with 50 rows."
        ]
      }
    ],
    commonMistakes: [
      { title: "Including blank or text cells.", desc: "They are ignored, which may silently affect your result if you expected them to count as 1 or 0." },
      { title: "Multiplying by zero unintentionally.", desc: "One zero in the range makes the entire product zero." }
    ],
    proTips: [
      "Use =PRODUCT(1+range)-1 to convert annual growth rates to a total compound growth rate.",
      "Combine with IF or FILTER to multiply only values meeting certain criteria."
    ],
    relatedFunctions: ["SUM", "SUMPRODUCT", "QUOTIENT"],
    miniChallenge: {
      question: "Multiply cells A1 and A2.",
      expectedAnswer: "=PRODUCT(A1, A2)"
    },
    practice: {
      instructions: "In cell B2, multiply the numbers in A2:A3.",
      initialData: [["Nums", "Prod"], [5, ""], [10, ""]],
      targetCell: [1, 1],
      expectedFormula: "PRODUCT(A2:A3)",
      expectedValue: 50
    }
  },
{
    id: "sqrt",
    title: "Root of the Matter: SQRT Function",
    category: "math",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Root of the Matter: SQRT Function",
      description: "The SQRT function returns the positive square root of a number. It answers: 'What number, multiplied by itself, gives this value?'",
      concept: "Think of it as the reverse of squaring: if x² = 25, then SQRT(25) = 5."
    },
    syntax: "=SQRT(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The positive number you want the square root of. Must be ≥ 0." }
    ],
    detailedExamples: [
      {
        title: "Example: Euclidean Distance",
        table: {
          headers: ["Step", "Calculation", "Formula", "Value"],
          rows: [
            ["Δx (difference in x)", "7 – 3", "=7-3", "4"],
            ["Δy (difference in y)", "1 – 4", "=1-4", "-3"],
            ["Δx²", "4²", "=4^2", "16"],
            ["Δy²", "(-3)²", "=(-3)^2", "9"],
            ["Sum of squares", "16 + 9", "=16+9", "25"],
            ["Distance", "Square root of 25", "=SQRT(25)", "5"]
          ]
        },
        stepByStep: [
          "All in one formula: =SQRT((7-3)^2 + (1-4)^2) = 5"
        ]
      }
    ],
    commonMistakes: [
      { title: "Negative number as input.", desc: "=SQRT(-9) returns #NUM!. Use =SQRT(ABS(-9)) if you need the root of the absolute value." },
      { title: "Confusing with ^0.5.", desc: "While =number^0.5 gives the same result, SQRT is clearer and self-documenting." }
    ],
    proTips: [
      "Combine with SUMSQ for quick distance calculations: =SQRT(SUMSQ(x1-x2, y1-y2)).",
      "Use in finance to annualise standard deviation: multiply the standard deviation of monthly returns by =SQRT(12)."
    ],
    relatedFunctions: ["POWER", "SUMSQ", "ABS"],
    miniChallenge: {
      question: "Find the square root of 64.",
      expectedAnswer: "=SQRT(64)"
    },
    practice: {
      instructions: "In cell B2, find the square root of A2.",
      initialData: [["Val", "Root"], [25, ""]],
      targetCell: [1, 1],
      expectedFormula: "SQRT(A2)",
      expectedValue: 5
    }
  },
{
    id: "sumsq",
    title: "Sum of Squares: SUMSQ Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Sum of Squares: SUMSQ Function",
      description: "The SUMSQ function squares each number first, then adds them all up. It follows the formula: x₁² + x₂² + x₃² + ...",
      concept: "Think of it as a two-step machine: square everything that goes in, then pour it all into a SUM bucket."
    },
    internalLogic: "Excel takes each number in the range, multiplies it by itself (squares it), and then adds all those individual results together.",
    whyItExists: "Summing squares is a fundamental step in many statistical and engineering formulas. SUMSQ provides a single-function shortcut for this multi-step process.",
    whenToUse: "Use SUMSQ when calculating the magnitude of vectors, or in any formula where you need to sum squared values.",
    realWorldUseCases: [
      "Calculating the sum of squared deviations in statistics.",
      "Finding the squared length of a vector in physics.",
      "Financial modeling involving variance analysis."
    ],
    syntax: "=SUMSQ(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number or range." },
      { arg: "number2", desc: "Optional additional numbers or ranges (up to 255)." }
    ],
    detailedExamples: [
      {
        title: "Example: Pythagorean Check",
        table: {
          headers: ["Triangle", "Leg A", "Leg B", "Formula", "Hypotenuse²"],
          rows: [
            ["1", "3", "4", "=SUMSQ(B2, C2)", "25"],
            ["2", "5", "12", "=SUMSQ(B3, C3)", "169"],
            ["3", "8", "15", "=SUMSQ(B4, C4)", "289"]
          ]
        },
        stepByStep: [
          "For Triangle 1: 3² + 4² = 9 + 16 = 25.",
          "For Triangle 2: 5² + 12² = 25 + 144 = 169.",
          "For Triangle 3: 8² + 15² = 64 + 225 = 289.",
          "To get the actual hypotenuse length, wrap with SQRT: =SQRT(SUMSQ(B2, C2))."
        ]
      },
      {
        title: "Range Use",
        table: {
          headers: ["Values", "Formula", "Result"],
          rows: [
            ["{1, 2, 3, 4}", "=SUMSQ(1,2,3,4)", "30"]
          ]
        },
        stepByStep: [
          "1²+2²+3²+4² = 1+4+9+16 = 30"
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with SUMX2PY2.", desc: "SUMSQ works on one array; SUMX2PY2 needs two arrays and squares both before adding." },
      { title: "Header rows.", desc: "Accidentally including header rows in the range — they'll be treated as 0." }
    ],
    proTips: [
      "Use SUMSQ in regression analysis to calculate the total sum of squares.",
      "Combine with COUNTA to quickly calculate variance from zero: =SUMSQ(range)/COUNTA(range)."
    ],
    relatedFunctions: ["SUM", "SQRT", "SUMPRODUCT"],
    miniChallenge: {
      question: "Find the sum of squares for 3 and 4.",
      expectedAnswer: "=SUMSQ(3, 4)"
    },
    practice: {
      instructions: "In cell B2, calculate the sum of squares for A2 and A3.",
      initialData: [["Value", "Result"], [3, ""], [4, ""]],
      targetCell: [1, 1],
      expectedFormula: "SUMSQ(A2:A3)",
      expectedValue: 25
    },
    sandboxData: [
      ["Data 1", "Data 2", "Sum of Squares"],
      [3, 4, "=SUMSQ(A2:B2)"],
      [5, 12, "=SUMSQ(A3:B3)"],
      [8, 15, "=SUMSQ(A4:B4)"]
    ]
  },
{
    id: "sumxmy2",
    title: "Difference Squared: SUMXMY2 Function",
    category: "math",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Difference Squared: SUMXMY2 Function",
      description: "The SUMXMY2 function subtracts pairs of values (X – Y), squares each difference, and then sums all the squared differences. The formula is: (x₁-y₁)² + (x₂-y₂)² + ...",
      concept: "Think of it as measuring the squared distance between two sets of points. The larger the result, the more the two arrays differ."
    },
    internalLogic: "Excel pairs up the numbers in the two arrays. For each pair (x, y), it calculates (x-y)^2. Finally, it sums all those individual squared differences.",
    whyItExists: "This calculation is the heart of finding the 'Sum of Squared Errors' (SSE), which tells scientists and analysts how much two sets of data vary from each other.",
    whenToUse: "Use this when comparing 'Actual' vs 'Forecast' data to see the total magnitude of the errors.",
    realWorldUseCases: [
      "Calculating prediction error in weather forecasting.",
      "Measuring the accuracy of a business sales forecast.",
      "Analyzing the difference between two experimental results."
    ],
    syntax: "=SUMXMY2(array_x, array_y)",
    syntaxBreakdown: [
      { arg: "array_x", desc: "The first set of values (the X values)." },
      { arg: "array_y", desc: "The second set of values (the Y values). Must be the same size as array_x." }
    ],
    detailedExamples: [
      {
        title: "Example: Forecast Accuracy (Squared Error)",
        table: {
          headers: ["Month", "Actual (X)", "Forecast (Y)", "Difference (X-Y)", "Squared (X-Y)²"],
          rows: [
            ["Jan", "150", "145", "5", "25"],
            ["Feb", "200", "210", "-10", "100"],
            ["Mar", "180", "175", "5", "25"],
            ["Apr", "220", "230", "-10", "100"],
            ["SSE", "", "", "=SUMXMY2(B2:B5, C2:C5)", "250"]
          ]
        },
        stepByStep: [
          "Excel pairs each actual value with its forecast.",
          "It computes the difference for each pair.",
          "Each difference is squared (making all values positive and penalising larger errors more).",
          "All squared differences are summed: 25 + 100 + 25 + 100 = 250."
        ]
      }
    ],
    commonMistakes: [
      { title: "Arrays of different sizes.", desc: "Both arrays must have the same number of elements, or you'll get #N/A." },
      { title: "Squaring amplifies outliers.", desc: "One large error can dominate the sum." }
    ],
    proTips: [
      "Use SUMXMY2 as the numerator in R-squared calculations to measure unexplained variance.",
      "Combine with COUNT to get Mean Squared Error (MSE): =SUMXMY2(actual, forecast)/COUNT(actual)."
    ],
    relatedFunctions: ["SUMX2MY2", "SUMX2PY2", "SUMPRODUCT"],
    miniChallenge: {
      question: "Which function calculates the sum of squares of differences between two ranges?",
      expectedAnswer: "=SUMXMY2()"
    },
    practice: {
      instructions: "In cell C2, use SUMXMY2 to compare Actuals (A2:A3) and Forecasts (B2:B3).",
      initialData: [["Actual", "Forecast", "Total Error"], [10, 8, ""], [15, 12, ""]],
      targetCell: [1, 2],
      expectedFormula: "SUMXMY2(A2:A3,B2:B3)",
      expectedValue: 13
    },
    sandboxData: [
      ["Actual (X)", "Forecast (Y)", "Squared Diff"],
      [10, 8, "=SUMXMY2(A2, B2)"],
      [15, 12, "=SUMXMY2(A3, B3)"],
      ["Total SSE", "", "=SUMXMY2(A2:A3, B2:B3)"]
    ]
  },
{
    id: "sumx2my2",
    title: "Difference of Squares: SUMX2MY2 Function",
    category: "math",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Difference of Squares: SUMX2MY2 Function",
      description: "The SUMX2MY2 function squares each X value and each Y value separately, then subtracts the squared Y from the squared X for each pair, and finally sums the results. Formula: (x₁² – y₁²) + (x₂² – y₂²) + ...",
      concept: "Think of it as: 'Square first, then subtract, then sum.' Unlike SUMXMY2, the subtraction happens after squaring."
    },
    internalLogic: "For each pair (x, y), it calculates (x^2 - y^2) and then sums those results.",
    whyItExists: "It simplifies the calculation of variance differences in statistical models and is useful in certain physics equations involving energy levels.",
    whenToUse: "Use this when you need the sum of the differences of individual squares, often seen in regression analysis.",
    syntax: "=SUMX2MY2(array_x, array_y)",
    syntaxBreakdown: [
      { arg: "array_x", desc: "The X values." },
      { arg: "array_y", desc: "The Y values. Must match array_x in size." }
    ],
    detailedExamples: [
      {
        title: "Example: Energy Variance",
        table: {
          headers: ["Object", "Initial Velocity (X)", "Final Velocity (Y)", "X² – Y²"],
          rows: [
            ["A", "10", "8", "100 – 64 = 36"],
            ["B", "6", "6", "36 – 36 = 0"],
            ["C", "15", "12", "225 – 144 = 81"],
            ["Total", "", "", "=SUMX2MY2(B2:B4, C2:C4) = 117"]
          ]
        },
        stepByStep: [
          "Object A: 10² – 8² = 100 – 64 = 36.",
          "Object B: 6² – 6² = 36 – 36 = 0.",
          "Object C: 15² – 12² = 225 – 144 = 81.",
          "Sum: 36 + 0 + 81 = 117."
        ]
      }
    ],
    commonMistakes: [
      { title: "Expecting the same result as SUMXMY2.", desc: "They compute completely different things: SUMXMY2 squares after subtracting; SUMX2MY2 squares before subtracting." },
      { title: "Negative results are possible.", desc: "If Y values are generally larger, the total will be negative." }
    ],
    proTips: [
      "Use when comparing magnitudes directly — it's algebraically equivalent to (x-y)(x+y) for each pair, useful in factoring problems.",
      "Pairs well with SUMSQ for decomposing variance components."
    ],
    relatedFunctions: ["SUMXMY2", "SUMX2PY2"],
    miniChallenge: {
      question: "What is the result of SUMX2MY2 on {3} and {2}?",
      expectedAnswer: "5"
    },
    practice: {
      instructions: "In cell C2, use SUMX2MY2 on A2:A3 and B2:B3.",
      initialData: [["X", "Y", "Result"], [4, 3, ""], [5, 4, ""]],
      targetCell: [1, 2],
      expectedFormula: "SUMX2MY2(A2:A3,B2:B3)",
      expectedValue: 16
    }
  },
{
    id: "ceiling",
    title: "Round Up to Significance: CEILING Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Round Up to Significance: CEILING Function",
      description: "The CEILING function rounds a number up to the nearest multiple of a specified significance. It always moves away from zero (for positive numbers, it rounds up; for negative, it rounds to a more negative number).",
      concept: "Think of it like buying planks of wood: if you need 3.2 metres and they're sold in 1-metre lengths, CEILING tells you to buy 4."
    },
    internalLogic: "Excel identifies the nearest multiple of the significance that is greater than or equal to the number (in absolute terms).",
    whyItExists: "Useful for packaging, scheduling, and financial thresholds where you must meet a minimum multiple.",
    whenToUse: "Use CEILING for time billing in 15-minute increments or adjusting order quantities to standard box sizes.",
    realWorldUseCases: [
      "Determining the number of full boxes needed for shipping.",
      "Rounding up prices to the nearest nickel or dime.",
      "Billing work hours in fixed blocks (e.g., 15 mins)."
    ],
    syntax: "=CEILING(number, significance)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value to round up." },
      { arg: "significance", desc: "The multiple to which you want to round." }
    ],
    detailedExamples: [
      {
        title: "Example: Packaging Units",
        table: {
          headers: ["Order Units", "Box Size", "Formula", "Boxes Needed"],
          rows: [
            ["14", "6", "=CEILING(B2, 6)/6", "3"],
            ["30", "6", "=CEILING(B3, 6)/6", "5"],
            ["7", "6", "=CEILING(B4, 6)/6", "2"]
          ]
        },
        stepByStep: [
          "CEILING rounds 14 up to the next multiple of 6: 18.",
          "18 units ÷ 6 per box = 3 boxes.",
          "For 30, CEILING returns 30 exactly (already a multiple)."
        ]
      },
      {
        title: "Rounding Monetary Values",
        table: {
          headers: ["Value", "Significance", "Formula", "Result"],
          rows: [
            ["4.23", "0.10", "=CEILING(4.23, 0.1)", "4.30"],
            ["4.23", "0.25", "=CEILING(4.23, 0.25)", "4.25"],
            ["4.23", "1", "=CEILING(4.23, 1)", "5"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Sign mismatch.", desc: "Using a negative significance with a positive number (or vice versa) returns #NUM!. Both must share the same sign." },
      { title: "Confusing with ROUNDUP.", desc: "CEILING rounds to a multiple; ROUNDUP rounds to a number of decimal places." }
    ],
    proTips: [
      "Use CEILING for time billing in 15-minute increments: =CEILING(minutes_worked, 15).",
      "CEILING with significance of 1 quickly rounds any decimal up to the next integer."
    ],
    relatedFunctions: ["FLOOR", "MROUND", "ROUNDUP"],
    miniChallenge: {
      question: "What is =CEILING(3.2, 1)?",
      expectedAnswer: "4"
    },
    practice: {
      instructions: "In cell C2, calculate the boxes needed by rounding up A2 to the nearest multiple of 6 and dividing by 6.",
      initialData: [["Units", "Box Size", "Result"], [14, 6, ""]],
      targetCell: [1, 2],
      expectedFormula: "CEILING(A2,6)/6",
      expectedValue: 3
    }
  },
{
    id: "combin",
    title: "Count Combinations: COMBIN Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Count Combinations: COMBIN Function",
      description: "The COMBIN function returns the number of ways to choose a certain number of items from a larger set, where the order does not matter (combinations, not permutations). Repetition is not allowed.",
      concept: "Think of it like forming a team: if you pick Alice and Bob, that's the same as picking Bob and Alice."
    },
    internalLogic: "COMBIN uses the formula: n! / (r! × (n-r)!).",
    whyItExists: "Essential for probability calculations and statistical sampling.",
    whenToUse: "Use COMBIN to calculate the number of possible outcomes where order is irrelevant.",
    syntax: "=COMBIN(number, number_chosen)",
    syntaxBreakdown: [
      { arg: "number", desc: "The total number of items." },
      { arg: "number_chosen", desc: "How many items you're choosing." }
    ],
    detailedExamples: [
      {
        title: "Example: Team Selection",
        table: {
          headers: ["Total Employees", "Committee Size", "Formula", "Possible Teams"],
          rows: [
            ["8", "3", "=COMBIN(8, 3)", "56"]
          ]
        }
      },
      {
        title: "Lottery Odds Table",
        table: {
          headers: ["Game", "Total Balls", "Balls Drawn", "Formula", "Combinations"],
          rows: [
            ["Pick 3", "10", "3", "=COMBIN(B2, C2)", "120"],
            ["Pick 6", "49", "6", "=COMBIN(B3, C3)", "13,983,816"],
            ["Pick 5", "35", "5", "=COMBIN(B4, C4)", "324,632"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Invalid arguments.", desc: "number_chosen > number returns #NUM!." },
      { title: "Decimal values.", desc: "COMBIN truncates non-integer values automatically." }
    ],
    proTips: [
      "Use COMBIN to calculate binomial coefficients in probability distributions.",
      "Pair with the binomial probability formula: =COMBIN(n,k) * p^k * (1-p)^(n-k)."
    ],
    relatedFunctions: ["PERMUT", "COMBINA", "FACT"],
    miniChallenge: {
      question: "How many ways to choose 2 items from 4?",
      expectedAnswer: "6"
    },
    practice: {
      instructions: "In cell C2, calculate the number of ways to choose 3 items from 8 using COMBIN.",
      initialData: [["Total", "Choose", "Ways"], [8, 3, ""]],
      targetCell: [1, 2],
      expectedFormula: "COMBIN(A2,B2)",
      expectedValue: 56
    }
  },
{
    id: "combina",
    title: "Combinations With Repetition: COMBINA Function",
    category: "math",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Combinations With Repetition: COMBINA Function",
      description: "The COMBINA function returns the number of combinations where repetition is allowed and order doesn't matter. Unlike COMBIN, an item can be chosen more than once.",
      concept: "Think of it like choosing ice cream scoops: you can pick chocolate, chocolate, vanilla — repetition is fine."
    },
    internalLogic: "COMBINA uses the formula: (n + r – 1)! / (r! × (n – 1)!).",
    whyItExists: "Useful in multiset counting problems and resource allocation.",
    syntax: "=COMBINA(number, number_chosen)",
    syntaxBreakdown: [
      { arg: "number", desc: "Total number of unique items." },
      { arg: "number_chosen", desc: "How many items you're picking (with repetition allowed)." }
    ],
    detailedExamples: [
      {
        title: "Example: Ice Cream Flavours",
        table: {
          headers: ["Total Flavours", "Scoops", "Formula", "Possible Combos"],
          rows: [
            ["5", "3", "=COMBINA(5, 3)", "35"]
          ]
        },
        stepByStep: [
          "For 5 flavours, 3 scoops: (5+3–1)!/(3! × 4!) = 7!/(6×24) = 35."
        ]
      },
      {
        title: "Comparison with COMBIN",
        table: {
          headers: ["Function", "Formula", "Result"],
          rows: [
            ["COMBIN", "=COMBIN(5,3)", "10"],
            ["COMBINA", "=COMBINA(5,3)", "35"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Using COMBIN instead.", desc: "Always double-check whether repeats make sense for your problem." }
    ],
    proTips: [
      "If order matters and repetition is allowed, use =number^number_chosen instead."
    ],
    relatedFunctions: ["COMBIN", "PERMUT"],
    miniChallenge: {
      question: "Does COMBINA allow repetition?",
      expectedAnswer: "Yes"
    },
    practice: {
      instructions: "In cell C2, use COMBINA to find possible combos for 5 items choosing 3.",
      initialData: [["N", "R", "Combos"], [5, 3, ""]],
      targetCell: [1, 2],
      expectedFormula: "COMBINA(A2,B2)",
      expectedValue: 35
    }
  },
{
    id: "decimal",
    title: "Convert Text to Number Base: DECIMAL Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Convert Text to Number Base: DECIMAL Function",
      description: "The DECIMAL function converts a text representation of a number in a given base to its decimal (base-10) equivalent. It handles bases from 2 (binary) to 36.",
      concept: "Think of it as a translator: 'What does this binary string actually mean in normal numbers?'"
    },
    internalLogic: "Excel calculates the positional value based on the radix (base).",
    whyItExists: "Critical for computing, engineering, and working with non-standard number systems like Hex or Binary.",
    syntax: "=DECIMAL(text, radix)",
    syntaxBreakdown: [
      { arg: "text", desc: "The number as a text string in the source base. Max 255 characters." },
      { arg: "radix", desc: "The base of the source number (between 2 and 36)." }
    ],
    detailedExamples: [
      {
        title: "Example: Converting Bases",
        table: {
          headers: ["Source Value", "Base", "Formula", "Decimal Result"],
          rows: [
            ["1101", "2", "=DECIMAL(\"1101\", 2)", "13"],
            ["FF", "16", "=DECIMAL(\"FF\", 16)", "255"],
            ["1A", "16", "=DECIMAL(\"1A\", 16)", "26"],
            ["777", "8", "=DECIMAL(\"777\", 8)", "511"]
          ]
        },
        stepByStep: [
          "Binary 1101: 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13.",
          "Hex FF: F=15, so 15×16¹ + 15×16⁰ = 240 + 15 = 255."
        ]
      }
    ],
    commonMistakes: [
      { title: "Missing quotes.", desc: "The input must be text. =DECIMAL(1101, 2) without quotes may cause errors." },
      { title: "Invalid radix.", desc: "Radix less than 2 or greater than 36 returns #NUM!." }
    ],
    proTips: [
      "Use alongside BASE (which does the reverse — decimal to any base) for complete base conversion.",
      "DECIMAL is case-insensitive: 'FF' and 'ff' are treated the same."
    ],
    relatedFunctions: ["BASE", "BIN2DEC", "HEX2DEC"],
    miniChallenge: {
      question: "Convert binary '101' to decimal.",
      expectedAnswer: "5"
    },
    practice: {
      instructions: "In cell C2, convert the binary value in A2 (radix 2) to decimal.",
      initialData: [["Base2", "Radix", "Result"], ["1101", 2, ""]],
      targetCell: [1, 2],
      expectedFormula: "DECIMAL(A2,B2)",
      expectedValue: 13
    }
  },
{
    id: "even",
    title: "Round to Nearest Even Integer: EVEN Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Round to Nearest Even Integer: EVEN Function",
      description: "The EVEN function rounds a number up to the nearest even integer, moving away from zero. Positive numbers go up to the next even; negative numbers go to the next more negative even.",
      concept: "Think of it like seating pairs at a dinner table: you always round up to the next full pair."
    },
    internalLogic: "Excel identifies the smallest even integer whose absolute value is greater than or equal to the number's absolute value.",
    whyItExists: "Useful for grouping items into pairs or handling processes that require even units.",
    syntax: "=EVEN(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value to round." }
    ],
    detailedExamples: [
      {
        title: "Example: Pairing Items",
        table: {
          headers: ["Item", "Individual Count", "Formula", "Pairs to Order"],
          rows: [
            ["Shoes", "7", "=EVEN(B2)/2", "4"],
            ["Gloves", "12", "=EVEN(B3)/2", "6"],
            ["Socks", "3", "=EVEN(B4)/2", "2"]
          ]
        },
        stepByStep: [
          "7 rounds up to the next even number: 8. That's 4 pairs.",
          "12 is already even, so it stays 12 (6 pairs)."
        ]
      },
      {
        title: "Negative Values",
        table: {
          headers: ["Value", "Formula", "Result"],
          rows: [
            ["3.2", "=EVEN(3.2)", "4"],
            ["-3.2", "=EVEN(-3.2)", "-4"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Mathematical sign.", desc: "For negatives, it moves further from zero, which is actually rounding down numerically." }
    ],
    proTips: [
      "Use EVEN when calculating page counts for double-sided printing: =EVEN(pages)/2."
    ],
    relatedFunctions: ["ODD", "ROUND", "CEILING"],
    miniChallenge: {
      question: "What is =EVEN(3)?",
      expectedAnswer: "4"
    },
    practice: {
      instructions: "In cell B2, round A2 up to the nearest even number.",
      initialData: [["Val", "Even"], [7, ""]],
      targetCell: [1, 1],
      expectedFormula: "EVEN(A2)",
      expectedValue: 8
    }
  },
{
    id: "exp",
    title: "The Exponential Function: EXP Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "The Exponential Function: EXP Function",
      description: "The EXP function returns e (Euler's number, approximately 2.71828) raised to a given power. It's the inverse of the natural logarithm (LN).",
      concept: "Think of it as the engine of continuous growth: if something grows at 100% continuously, EXP tells you the final multiplier."
    },
    internalLogic: "Calculates e^n.",
    whyItExists: "Fundamental in finance (continuous compounding) and science (population growth, decay).",
    syntax: "=EXP(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The exponent applied to e." }
    ],
    detailedExamples: [
      {
        title: "Example: Continuous Compound Interest",
        table: {
          headers: ["Variable", "Value", "Result"],
          rows: [
            ["Principal", "1,000", ""],
            ["Rate", "5%", ""],
            ["Years", "3", ""],
            ["Growth Factor", "=EXP(0.05*3)", "1.1618"],
            ["Future Value", "=1000*EXP(0.15)", "₦1,161.83"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Confusing with POWER.", desc: "=POWER(2,3) gives 2³=8; =EXP(3) gives e³≈20.09." }
    ],
    proTips: [
      "Pair with LN to verify: =LN(EXP(x)) always returns x."
    ],
    relatedFunctions: ["LN", "LOG", "POWER"],
    miniChallenge: {
      question: "What is =EXP(0)?",
      expectedAnswer: "1"
    },
    practice: {
      instructions: "In cell B2, calculate e raised to the power of A2.",
      initialData: [["Power", "Result"], [1, ""]],
      targetCell: [1, 1],
      expectedFormula: "EXP(A2)",
      expectedValue: 2.71828182845904
    }
  },
{
    id: "fact",
    title: "The Factorial Factory: FACT Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "The Factorial Factory: FACT Function",
      description: "The FACT function returns the factorial of a number: the product of all positive integers from 1 up to that number. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.",
      concept: "Think of it as counting arrangements: how many ways can you line up 5 people?"
    },
    internalLogic: "Iterative multiplication of sequence 1 to n.",
    whyItExists: "Core function for combinatorics and probability.",
    syntax: "=FACT(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "A non-negative integer. FACT truncates decimals." }
    ],
    detailedExamples: [
      {
        title: "Example: Permutations of Books",
        table: {
          headers: ["Books", "Formula", "Arrangements"],
          rows: [
            ["6", "=FACT(6)", "720"]
          ]
        }
      },
      {
        title: "Factorial Growth Table",
        table: {
          headers: ["n", "Formula", "Result"],
          rows: [
            ["0", "=FACT(0)", "1"],
            ["3", "=FACT(3)", "6"],
            ["5", "=FACT(5)", "120"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Large numbers.", desc: "FACT(171) returns #NUM! as it exceeds Excel's limit." }
    ],
    proTips: [
      "For permutations of r items from n, use =FACT(n)/FACT(n-r)."
    ],
    relatedFunctions: ["FACTDOUBLE", "COMBIN", "PERMUT"],
    miniChallenge: {
      question: "What is =FACT(3)?",
      expectedAnswer: "6"
    },
    practice: {
      instructions: "In cell B2, find the factorial of A2.",
      initialData: [["Val", "Fact"], [5, ""]],
      targetCell: [1, 1],
      expectedFormula: "FACT(A2)",
      expectedValue: 120
    }
  },
{
    id: "factdouble",
    title: "Double Factorial: FACTDOUBLE Function",
    category: "math",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Double Factorial: FACTDOUBLE Function",
      description: "The FACTDOUBLE function returns the double factorial of a number. For an even number n, it multiplies all even numbers from n down to 2. For odd n, it multiplies all odd numbers from n down to 1.",
      concept: "Think of it as a factorial that skips every other number. Notation: n!!."
    },
    syntax: "=FACTDOUBLE(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "A non-negative number. Decimals are truncated." }
    ],
    detailedExamples: [
      {
        title: "Example: Double Factorial Patterns",
        table: {
          headers: ["n", "Type", "Calculation", "Formula", "Result"],
          rows: [
            ["6", "Even", "6×4×2", "=FACTDOUBLE(6)", "48"],
            ["7", "Odd", "7×5×3×1", "=FACTDOUBLE(7)", "105"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Confusing with FACT.", desc: "FACT(6) = 720; FACTDOUBLE(6) = 48. They are very different." }
    ],
    relatedFunctions: ["FACT"],
    miniChallenge: {
      question: "What is =FACTDOUBLE(4)?",
      expectedAnswer: "8"
    },
    practice: {
      instructions: "In cell B2, find the double factorial of A2.",
      initialData: [["Val", "DoubleFact"], [5, ""]],
      targetCell: [1, 1],
      expectedFormula: "FACTDOUBLE(A2)",
      expectedValue: 15
    }
  },
{
    id: "floor",
    title: "Round Down to Significance: FLOOR Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Round Down to Significance: FLOOR Function",
      description: "The FLOOR function rounds a number down to the nearest multiple of a specified significance, moving toward zero.",
      concept: "Think of it as the opposite of CEILING: if you have ₦4.87 and can only withdraw in multiples of ₦0.10, FLOOR says you can take ₦4.80."
    },
    whyItExists: "Ideal for currency dispensing, inventory carton calculations, and time-clocking.",
    syntax: "=FLOOR(number, significance)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value to round down." },
      { arg: "significance", desc: "The multiple to round to." }
    ],
    detailedExamples: [
      {
        title: "Example: Currency Rounding",
        table: {
          headers: ["Request", "Multiple", "Formula", "Dispensed"],
          rows: [
            ["87", "5", "=FLOOR(87, 5)", "85"],
            ["123", "5", "=FLOOR(123, 5)", "120"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Mismatched signs.", desc: "Number and significance must share the same sign or you get #NUM!." }
    ],
    relatedFunctions: ["CEILING", "MROUND", "ROUNDDOWN"],
    miniChallenge: {
      question: "What is =FLOOR(7.9, 1)?",
      expectedAnswer: "7"
    },
    practice: {
      instructions: "In cell B2, round A2 down to the nearest multiple of 5.",
      initialData: [["Val", "Floor"], [87, ""]],
      targetCell: [1, 1],
      expectedFormula: "FLOOR(A2,5)",
      expectedValue: 85
    }
  },
{
    id: "gcd",
    title: "Greatest Common Divisor: GCD Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Greatest Common Divisor: GCD Function",
      description: "The GCD function returns the largest integer that divides all the given numbers without a remainder.",
      concept: "Think of it as finding the biggest box size that can perfectly pack several different lengths."
    },
    syntax: "=GCD(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number." },
      { arg: "number2", desc: "Optional additional numbers (up to 255)." }
    ],
    detailedExamples: [
      {
        title: "Example: Simplifying Ratios",
        table: {
          headers: ["Ingredient", "Parts", "GCD", "Simplifying Divisor"],
          rows: [
            ["A", "48", "", ""],
            ["B", "72", "", ""],
            ["C", "108", "", ""],
            ["GCD", "", "=GCD(48, 72, 108)", "12"]
          ]
        },
        stepByStep: [
          "Original ratio 48:72:108 is divided by GCD 12.",
          "Results in simplified ratio 4:6:9."
        ]
      }
    ],
    commonMistakes: [
      { title: "Negative numbers.", desc: "Negative numbers are treated as positive." },
      { title: "Including zero.", desc: "GCD(n, 0) = n, which may be unexpected." }
    ],
    proTips: [
      "Use GCD to simplify fractions: numerator/GCD & denominator/GCD.",
      "Helpful in scheduling: find the GCD of task cycles to determine when they align."
    ],
    relatedFunctions: ["LCM"],
    miniChallenge: {
      question: "What is =GCD(12, 18)?",
      expectedAnswer: "6"
    },
    practice: {
      instructions: "In cell B2, find the GCD of 48, 72, and 108.",
      initialData: [["Nums", "GCD"], ["48, 72, 108", ""]],
      targetCell: [1, 1],
      expectedFormula: "GCD(48,72,108)",
      expectedValue: 12
    }
  },
{
    id: "iso.ceiling",
    title: "ISO-Compliant Ceiling: ISO.CEILING Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "ISO-Compliant Ceiling: ISO.CEILING Function",
      description: "The ISO.CEILING function rounds a number up to the nearest multiple of significance, regardless of the sign of the number. It always rounds away from zero.",
      concept: "Think of it as CEILING's more predictable cousin: no sign-matching rules, always rounds to the larger absolute value."
    },
    syntax: "=ISO.CEILING(number, [significance])",
    syntaxBreakdown: [
      { arg: "number", desc: "The value to round up." },
      { arg: "significance", desc: "The multiple (optional, defaults to 1)." }
    ],
    detailedExamples: [
      {
        title: "Comparison: CEILING vs ISO.CEILING",
        table: {
          headers: ["Value", "Significance", "CEILING", "ISO.CEILING"],
          rows: [
            ["-4.3", "1", "#NUM!", "-5"],
            ["-4.3", "-1", "-5", "-5"],
            ["4.3", "1", "5", "5"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Assuming CEILING parity.", desc: "ISO.CEILING behaves differently with negatives than basic CEILING." }
    ],
    proTips: [
      "Prefer ISO.CEILING over CEILING in modern workbooks for consistent rounding regardless of sign."
    ],
    relatedFunctions: ["CEILING", "FLOOR"],
    miniChallenge: {
      question: "What is =ISO.CEILING(-4.3, 1)?",
      expectedAnswer: "-5"
    },
    practice: {
      instructions: "In cell B2, use ISO.CEILING on -4.3 with significance 1.",
      initialData: [["Val", "Result"], [-4.3, ""]],
      targetCell: [1, 1],
      expectedFormula: "ISO.CEILING(A2,1)",
      expectedValue: -5
    }
  },
{
    id: "lcm",
    title: "Least Common Multiple: LCM Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Least Common Multiple: LCM Function",
      description: "The LCM function returns the smallest positive integer that is a multiple of all the numbers provided.",
      concept: "Think of it like synchronising events: when will three cycles with different lengths next happen at the same time?"
    },
    syntax: "=LCM(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number." },
      { arg: "number2", desc: "Optional additional numbers (up to 255)." }
    ],
    detailedExamples: [
      {
        title: "Example: Meeting Schedule",
        table: {
          headers: ["Machine", "Cycle (days)"],
          rows: [
            ["A", "4"],
            ["B", "6"],
            ["C", "10"]
          ]
        },
        stepByStep: [
          "LCM(4, 6, 10) = 60.",
          "They'll all be serviced together again on day 60."
        ]
      }
    ],
    commonMistakes: [
      { title: "Including zero.", desc: "LCM(n,0) returns 0, which may not be useful in scheduling." }
    ],
    proTips: [
      "Useful in project planning to find when cyclical tasks align."
    ],
    relatedFunctions: ["GCD"],
    miniChallenge: {
      question: "What is =LCM(3, 5)?",
      expectedAnswer: "15"
    },
    practice: {
      instructions: "In cell B2, find the LCM of 4, 6, and 10.",
      initialData: [["Nums", "LCM"], ["4, 6, 10", ""]],
      targetCell: [1, 1],
      expectedFormula: "LCM(4,6,10)",
      expectedValue: 60
    }
  },
{
    id: "ln",
    title: "Natural Logarithm: LN Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Natural Logarithm: LN Function",
      description: "The LN function returns the natural logarithm of a number — the power to which e must be raised to equal that number. It's the inverse of EXP.",
      concept: "Think of it as asking: 'How long do I need to grow continuously at 100% to reach this value?'"
    },
    syntax: "=LN(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "A positive number. LN of 1 is 0; LN of e is 1." }
    ],
    detailedExamples: [
      {
        title: "Example: Time to Double Investment",
        table: {
          headers: ["Variable", "Value", "Formula", "Result"],
          rows: [
            ["Target ratio", "2 (double)", "", ""],
            ["Rate", "8%", "", ""],
            ["Time (years)", "", "=LN(2)/0.08", "8.66"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Invalid inputs.", desc: "Zero or negative numbers return #NUM!. LN is undefined for x ≤ 0." }
    ],
    proTips: [
      "In regression, log-transforming a variable with LN can linearise exponential relationships."
    ],
    relatedFunctions: ["EXP", "LOG", "LOG10"],
    miniChallenge: {
      question: "What is =LN(1)?",
      expectedAnswer: "0"
    },
    practice: {
      instructions: "In cell B2, calculate the natural log of A2.",
      initialData: [["Val", "LN"], [1, ""]],
      targetCell: [1, 1],
      expectedFormula: "LN(A2)",
      expectedValue: 0
    }
  },
{
    id: "log",
    title: "Logarithm to Any Base: LOG Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Logarithm to Any Base: LOG Function",
      description: "The LOG function returns the logarithm of a number to a specified base. If no base is given, it defaults to base 10.",
      concept: "Think of it as asking: 'What power do I raise this base to, to get my number?'"
    },
    syntax: "=LOG(number, [base])",
    syntaxBreakdown: [
      { arg: "number", desc: "The positive number you want the logarithm of." },
      { arg: "base", desc: "Optional. The base of the logarithm (default is 10)." }
    ],
    detailedExamples: [
      {
        title: "Example: Base Conversion",
        table: {
          headers: ["Value", "Base", "Formula", "Result"],
          rows: [
            ["8", "2", "=LOG(8, 2)", "3"],
            ["100", "10", "=LOG(100)", "2"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Base of 1.", desc: "Base of 1 returns #DIV/0!." }
    ],
    relatedFunctions: ["LN", "LOG10"],
    miniChallenge: {
      question: "What is =LOG(8, 2)?",
      expectedAnswer: "3"
    },
    practice: {
      instructions: "In cell C2, find log base 2 of A2.",
      initialData: [["Val", "Base", "Result"], [8, 2, ""]],
      targetCell: [1, 2],
      expectedFormula: "LOG(A2,B2)",
      expectedValue: 3
    }
  },
{
    id: "log10",
    title: "Base-10 Logarithm: LOG10 Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Base-10 Logarithm: LOG10 Function",
      description: "The LOG10 function returns the base-10 logarithm of a number — how many times you need to multiply 10 to reach that number.",
      concept: "Think of it as measuring orders of magnitude: how many zeros after the 1?"
    },
    syntax: "=LOG10(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "A positive number." }
    ],
    detailedExamples: [
      {
        title: "Example: Decibel Calculation",
        table: {
          headers: ["Intensity Ratio", "Formula", "Log10", "Decibels (x10)"],
          rows: [
            ["1,000,000", "=LOG10(1000000)", "6", "60"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Non-positive inputs.", desc: "Negative or zero returns #NUM!." }
    ],
    proTips: [
      "Perfect for pH calculations, Richter scale, and decibels."
    ],
    relatedFunctions: ["LOG", "LN"],
    miniChallenge: {
      question: "What is =LOG10(100)?",
      expectedAnswer: "2"
    },
    practice: {
      instructions: "In cell B2, find the base-10 log of 1000.",
      initialData: [["Val", "Log10"], [1000, ""]],
      targetCell: [1, 1],
      expectedFormula: "LOG10(A2)",
      expectedValue: 3
    }
  },
{
    id: "mround",
    title: "Round to Nearest Multiple: MROUND Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Round to Nearest Multiple: MROUND Function",
      description: "The MROUND function rounds a number to the nearest multiple of a specified significance. If the number is exactly halfway between two multiples, it rounds up (away from zero).",
      concept: "Think of it as rounding cash to the nearest 5 pence, or minutes to the nearest quarter hour."
    },
    syntax: "=MROUND(number, multiple)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value to round." },
      { arg: "multiple", desc: "The significance to round to." }
    ],
    detailedExamples: [
      {
        title: "Example: Time Clock Rounding",
        table: {
          headers: ["Actual Minutes", "Round To", "Formula", "Billed Minutes"],
          rows: [
            ["43", "15", "=MROUND(B2, 15)", "45"],
            ["37", "15", "=MROUND(B3, 15)", "30"],
            ["52", "15", "=MROUND(B4, 15)", "45"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Sign mismatch.", desc: "Number and multiple must have the same sign, or you get #NUM!." }
    ],
    proTips: [
      "In manufacturing, use MROUND to adjust raw material orders to standard pack sizes."
    ],
    relatedFunctions: ["ROUND", "CEILING", "FLOOR"],
    miniChallenge: {
      question: "What is =MROUND(2.23, 0.05)?",
      expectedAnswer: "2.25"
    },
    practice: {
      instructions: "In cell C2, round A2 to the nearest multiple of 15.",
      initialData: [["Mins", "Signif", "Result"], [43, 15, ""]],
      targetCell: [1, 2],
      expectedFormula: "MROUND(A2,B2)",
      expectedValue: 45
    }
  },
{
    id: "multinomial",
    title: "Multinomial Coefficient: MULTINOMIAL Function",
    category: "math",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Multinomial Coefficient: MULTINOMIAL Function",
      description: "The MULTINOMIAL function returns the ratio of the factorial of the sum of values to the product of the factorials of each value. It answers: 'How many ways can I arrange these groups?'",
      concept: "Think of it like arranging letters with repeats: how many distinct ways to arrange the word 'MISSISSIPPI'?"
    },
    syntax: "=MULTINOMIAL(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The count of the first group." },
      { arg: "number2", desc: "Optional additional group counts." }
    ],
    detailedExamples: [
      {
        title: "Example: Arranging Coloured Balls",
        table: {
          headers: ["Colour", "Count"],
          rows: [
            ["Red", "3"],
            ["Blue", "2"],
            ["Green", "4"]
          ]
        },
        stepByStep: [
          "Total balls = 3 + 2 + 4 = 9.",
          "Ways: 9! / (3! × 2! × 4!) = 1,260."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with COMBIN.", desc: "MULTINOMIAL is for multiple groups, not choosing a subset." }
    ],
    relatedFunctions: ["FACT", "COMBIN"],
    miniChallenge: {
      question: "What is =MULTINOMIAL(2, 2)?",
      expectedAnswer: "6"
    },
    practice: {
      instructions: "In cell B2, find the multinomial for 3, 2, and 4.",
      initialData: [["Counts", "Result"], ["3, 2, 4", ""]],
      targetCell: [1, 1],
      expectedFormula: "MULTINOMIAL(3,2,4)",
      expectedValue: 1260
    }
  },
{
    id: "odd",
    title: "Round to Nearest Odd Integer: ODD Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Round to Nearest Odd Integer: ODD Function",
      description: "The ODD function rounds a number up to the nearest odd integer, moving away from zero.",
      concept: "Think of it as EVEN's quirky sibling: it always rounds to an odd number, away from zero."
    },
    syntax: "=ODD(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value to round." }
    ],
    detailedExamples: [
      {
        title: "Example: Odd-Numbered Seating",
        table: {
          headers: ["Guests", "Formula", "Seats Arranged"],
          rows: [
            ["12", "=ODD(12)", "13"],
            ["7", "=ODD(7)", "7"],
            ["2.1", "=ODD(2.1)", "3"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "ISODD confusion.", desc: "ODD rounds the number; ISODD only tests if it is odd." }
    ],
    relatedFunctions: ["EVEN", "ROUND"],
    miniChallenge: {
      question: "What is =ODD(12)?",
      expectedAnswer: "13"
    },
    practice: {
      instructions: "In cell B2, round A2 up to the nearest odd integer.",
      initialData: [["Val", "Odd"], [12, ""]],
      targetCell: [1, 1],
      expectedFormula: "ODD(A2)",
      expectedValue: 13
    }
  },
{
    id: "pi",
    title: "The Circle Constant: PI Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "The Circle Constant: PI Function",
      description: "The PI function returns the mathematical constant π (pi), approximately 3.14159265358979, accurate to 15 digits.",
      concept: "Think of it as the universal circle key: the ratio of any circle's circumference to its diameter."
    },
    syntax: "=PI()",
    syntaxBreakdown: [
      { arg: "(none)", desc: "PI takes no arguments, but the empty parentheses are required." }
    ],
    detailedExamples: [
      {
        title: "Example: Circle Calculations",
        table: {
          headers: ["Property", "Radius", "Formula", "Result"],
          rows: [
            ["Circumference", "5", "=2*PI()*5", "31.416"],
            ["Area", "5", "=PI()*5^2", "78.540"]
          ]
        }
      },
      {
        title: "Converting Degrees to Radians",
        table: {
          headers: ["Degrees", "Formula", "Radians"],
          rows: [
            ["180", "=PI()", "3.1416"],
            ["90", "=PI()/2", "1.5708"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Missing parentheses.", desc: "=PI without () returns #NAME?. Always write =PI()." },
      { title: "Manual typing.", desc: "Typing 3.14 manually loses precision. Always use PI() for accurate calculations." }
    ],
    proTips: [
      "Use PI() in any geometry formula involving circles, spheres, or cylinders.",
      "Combine with SIN, COS, TAN for angle calculations in radians."
    ],
    relatedFunctions: ["SQRTPI", "SIN", "COS"],
    miniChallenge: {
      question: "What does =PI() return approximately?",
      expectedAnswer: "3.14159"
    },
    practice: {
      instructions: "In cell B2, calculate the area of a circle with radius in A2 (πr²).",
      initialData: [["Radius", "Area"], [5, ""]],
      targetCell: [1, 1],
      expectedFormula: "PI()*A2^2",
      expectedValue: 78.5398163397448
    }
  },
{
    id: "power",
    title: "Raise to a Power: POWER Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Raise to a Power: POWER Function",
      description: "The POWER function returns a number raised to a specified exponent. It's equivalent to the caret operator ^.",
      concept: "Think of it as a supercharged multiplier: instead of writing A*A*A*A, you write POWER(A,4)."
    },
    syntax: "=POWER(number, power)",
    syntaxBreakdown: [
      { arg: "number", desc: "The base number." },
      { arg: "power", desc: "The exponent. Can be positive, negative, or fractional." }
    ],
    detailedExamples: [
      {
        title: "Example: Compound Annual Growth",
        table: {
          headers: ["Principal", "Rate", "Years", "Formula", "Future Value"],
          rows: [
            ["5,000", "7%", "10", "=5000*POWER(1+0.07, 10)", "₦9,835.76"]
          ]
        }
      },
      {
        title: "Power Variations",
        table: {
          headers: ["Base", "Exponent", "Formula", "Result"],
          rows: [
            ["3", "2", "=POWER(3,2)", "9"],
            ["16", "0.5", "=POWER(16,0.5)", "4"],
            ["2", "-3", "=POWER(2,-3)", "0.125"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Negative base.", desc: "Using a negative base with a fractional exponent may return #NUM!." },
      { title: "EXP vs POWER.", desc: "POWER(2,3) = 8, but EXP(3) ≈ 20.09." }
    ],
    proTips: [
      "Use fractional powers for all root calculations: cube root = =POWER(x, 1/3)."
    ],
    relatedFunctions: ["EXP", "SQRT"],
    miniChallenge: {
      question: "What is =POWER(2, 4)?",
      expectedAnswer: "16"
    },
    practice: {
      instructions: "In cell B2, raise A2 to the power of 3.",
      initialData: [["Val", "Cube"], [3, ""]],
      targetCell: [1, 1],
      expectedFormula: "POWER(A2,3)",
      expectedValue: 27
    }
  },
{
    id: "quotient",
    title: "Integer Division: QUOTIENT Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Integer Division: QUOTIENT Function",
      description: "The QUOTIENT function returns the integer portion of a division, discarding the remainder. It tells you how many whole times one number fits into another.",
      concept: "Think of it as division that ignores the leftover crumbs. It's equivalent to =INT(numerator/denominator)."
    },
    syntax: "=QUOTIENT(numerator, denominator)",
    syntaxBreakdown: [
      { arg: "numerator", desc: "The number to be divided." },
      { arg: "denominator", desc: "The number to divide by." }
    ],
    detailedExamples: [
      {
        title: "Example: Packing Items",
        table: {
          headers: ["Total Items", "Per Box", "Formula", "Full Boxes"],
          rows: [
            ["250", "24", "=QUOTIENT(250, 24)", "10"],
            ["100", "12", "=QUOTIENT(100, 12)", "8"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Non-numeric values.", desc: "Both arguments must be numeric or you get #VALUE!." },
      { title: "Confusing with /.", desc: "Regular division / gives the decimal; QUOTIENT only gives the integer." }
    ],
    proTips: [
      "QUOTIENT + MOD together form a complete division breakdown."
    ],
    relatedFunctions: ["MOD", "INT"],
    miniChallenge: {
      question: "What is =QUOTIENT(10, 3)?",
      expectedAnswer: "3"
    },
    practice: {
      instructions: "In cell B2, find the quotient of A2 divided by 4.",
      initialData: [["Val", "Quotient"], [10, ""]],
      targetCell: [1, 1],
      expectedFormula: "QUOTIENT(A2,4)",
      expectedValue: 2
    }
  },
{
    id: "rand",
    title: "Random Number Generator: RAND Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Random Number Generator: RAND Function",
      description: "The RAND function returns a random decimal number greater than or equal to 0 and less than 1. It recalculates every time the worksheet is refreshed.",
      concept: "Think of it as a digital dice that rolls itself whenever you make any change."
    },
    syntax: "=RAND()",
    syntaxBreakdown: [
      { arg: "(none)", desc: "RAND takes no arguments, but parentheses are required." }
    ],
    detailedExamples: [
      {
        title: "Example: Scaling Random Values",
        table: {
          headers: ["#", "Formula", "Random Value", "Scaled (1-10)"],
          rows: [
            ["1", "=RAND()", "0.7234", "8"]
          ]
        },
        stepByStep: [
          "RAND() generates a decimal between 0 and 1.",
          "Multiply by 10 to get 0 to 9.999...",
          "INT strips decimals, then +1 shifts to 1–10."
        ]
      }
    ],
    commonMistakes: [
      { title: "Volatility.", desc: "Forgetting RAND recalculates on every sheet change, which can slow large workbooks." },
      { title: "Security.", desc: "Not suitable for high-stakes cryptography." }
    ],
    proTips: [
      "To freeze random values, use Paste Special > Values."
    ],
    relatedFunctions: ["RANDBETWEEN"],
    miniChallenge: {
      question: "Does RAND() take any arguments?",
      expectedAnswer: "No"
    },
    practice: {
      instructions: "In cell A1, simply enter the RAND function.",
      initialData: [[""]],
      targetCell: [0, 0],
      expectedFormula: "RAND()",
      expectedValue: 0.5
    }
  },
{
    id: "randbetween",
    title: "Random Integer Between Bounds: RANDBETWEEN Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Random Integer Between Bounds: RANDBETWEEN Function",
      description: "The RANDBETWEEN function returns a random integer between (and including) two specified numbers. Like RAND, it recalculates on every sheet change.",
      concept: "Think of it as setting the lower and upper face of a digital die: roll and you get a whole number within those limits."
    },
    syntax: "=RANDBETWEEN(bottom, top)",
    syntaxBreakdown: [
      { arg: "bottom", desc: "The smallest integer you want." },
      { arg: "top", desc: "The largest integer you want." }
    ],
    detailedExamples: [
      {
        title: "Example: Generating Test Scores",
        table: {
          headers: ["Student", "Formula", "Score"],
          rows: [
            ["Alice", "=RANDBETWEEN(50, 100)", "87"],
            ["Ben", "=RANDBETWEEN(50, 100)", "63"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Bottom > Top.", desc: "If bottom is greater than top, it returns #NUM!." }
    ],
    proTips: [
      "To generate random dates: =RANDBETWEEN(DATE(2020,1,1), DATE(2025,12,31))."
    ],
    relatedFunctions: ["RAND"],
    miniChallenge: {
      question: "Get a random number between 1 and 6.",
      expectedAnswer: "=RANDBETWEEN(1, 6)"
    },
    practice: {
      instructions: "In cell B2, generate a random number between A2 and 100.",
      initialData: [["Bottom", "Random"], [50, ""]],
      targetCell: [1, 1],
      expectedFormula: "RANDBETWEEN(A2,100)",
      expectedValue: 75
    }
  },
{
    id: "roman",
    title: "Convert to Roman Numerals: ROMAN Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Convert to Roman Numerals: ROMAN Function",
      description: "The ROMAN function converts a regular number into its Roman numeral equivalent as text.",
      concept: "Think of it as a time machine for your spreadsheet: transforming modern digits into ancient notation."
    },
    syntax: "=ROMAN(number, [form])",
    syntaxBreakdown: [
      { arg: "number", desc: "The number to convert (must be 1–3999)." },
      { arg: "form", desc: "Optional. 0 (classic), 1-4 (more concise), TRUE (simplified). Default is 0." }
    ],
    detailedExamples: [
      {
        title: "Example: Year Display",
        table: {
          headers: ["Year", "Formula", "Roman Numeral"],
          rows: [
            ["2024", "=ROMAN(2024)", "MMXXIV"],
            ["1999", "=ROMAN(1999)", "MCMXCIX"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Number limit.", desc: "Must be 1–3999. Others return #VALUE!." }
    ],
    proTips: [
      "Useful for outlines, chapter numbering, or adding a classical touch to reports."
    ],
    relatedFunctions: ["ARABIC"],
    miniChallenge: {
      question: "Convert 10 to Roman.",
      expectedAnswer: "X"
    },
    practice: {
      instructions: "In cell B2, convert A2 to a Roman numeral.",
      initialData: [["Num", "Roman"], [2024, ""]],
      targetCell: [1, 1],
      expectedFormula: "ROMAN(A2)",
      expectedValue: "MMXXIV"
    }
  },
{
    id: "sequence",
    title: "Generate Number Sequences: SEQUENCE Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Generate Number Sequences: SEQUENCE Function",
      description: "The SEQUENCE function generates an array of sequential numbers in a grid of specified rows and columns.",
      concept: "Think of it as an automatic number factory: tell it how many rows and columns you need, and it fills them in order."
    },
    syntax: "=SEQUENCE(rows, [columns], [start], [step])",
    syntaxBreakdown: [
      { arg: "rows", desc: "Number of rows to fill." },
      { arg: "columns", desc: "Optional. Number of columns (default 1)." },
      { arg: "start", desc: "Optional. Starting number (default 1)." },
      { arg: "step", desc: "Optional. Increment between numbers (default 1)." }
    ],
    detailedExamples: [
      {
        title: "Example: Monthly Date Generator",
        table: {
          headers: ["#", "Formula", "Output"],
          rows: [
            ["1", "=SEQUENCE(12, 1, DATE(2026,1,1), 1)", "01/01/2026"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Missing rows.", desc: "Rows argument is required — omitting it returns #CALC!." },
      { title: "Spill errors.", desc: "Adjacent cells must be empty for the array to spill." }
    ],
    proTips: [
      "Combine with DATE to generate timelines: =SEQUENCE(365, 1, DATE(2026,1,1))."
    ],
    relatedFunctions: ["RANDARRAY"],
    miniChallenge: {
      question: "Generate a sequence of 5 numbers.",
      expectedAnswer: "=SEQUENCE(5)"
    },
    practice: {
      instructions: "In cell A1, generate a sequence of 5 rows and 1 column.",
      initialData: [[""]],
      targetCell: [0, 0],
      expectedFormula: "SEQUENCE(5,1)",
      expectedValue: 1
    }
  },
{
    id: "seriessum",
    title: "Sum of a Power Series: SERIESSUM Function",
    category: "math",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Sum of a Power Series: SERIESSUM Function",
      description: "The SERIESSUM function calculates the sum of a power series based on a starting exponent, step, and coefficients.",
      concept: "Think of it as evaluating a polynomial or Taylor series efficiently without typing every term."
    },
    syntax: "=SERIESSUM(x, n, m, coefficients)",
    syntaxBreakdown: [
      { arg: "x", desc: "The input value for the series." },
      { arg: "n", desc: "The starting exponent for the first coefficient." },
      { arg: "m", desc: "The step by which the exponent increases." },
      { arg: "coefficients", desc: "A range or array of constants multiplying each term." }
    ],
    detailedExamples: [
      {
        title: "Example: Polynomial Evaluation",
        table: {
          headers: ["x", "n", "m", "Coefficients", "Result"],
          rows: [
            ["2", "0", "1", "{2, 3, 1}", "12"]
          ]
        },
        stepByStep: [
          "Evaluate 2x⁰ + 3x¹ + 1x² at x = 2.",
          "Result: 2 + 6 + 4 = 12."
        ]
      }
    ],
    commonMistakes: [
      { title: "Non-numeric coefficients.", desc: "Text or blanks in the range can cause #VALUE!." }
    ],
    proTips: [
      "Elegant replacement for long polynomial formulas when n=0 and m=1."
    ],
    relatedFunctions: ["SUMPRODUCT"],
    miniChallenge: {
      question: "Evaluate x² + x + 1 at x=1 using SERIESSUM.",
      expectedAnswer: "=SERIESSUM(1, 0, 1, {1, 1, 1})"
    },
    practice: {
      instructions: "In cell B2, evaluate the sum of series for x=2, starting n=0, step 1, with coefficients in A2:A4.",
      initialData: [["Coeffs", "Result"], [2, ""], [3, ""], [1, ""]],
      targetCell: [1, 1],
      expectedFormula: "SERIESSUM(2,0,1,A2:A4)",
      expectedValue: 12
    }
  },
{
    id: "sign",
    title: "Determine the Sign: SIGN Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Determine the Sign: SIGN Function",
      description: "The SIGN function returns 1 if a number is positive, -1 if negative, and 0 if zero. It captures the direction, not the magnitude.",
      concept: "Think of it as a compass: it tells you whether you're heading up, down, or staying flat."
    },
    syntax: "=SIGN(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "Any real number." }
    ],
    detailedExamples: [
      {
        title: "Example: Classifying Monthly Changes",
        table: {
          headers: ["Month", "Change", "Formula", "Direction"],
          rows: [
            ["Feb", "+2,500", "=SIGN(2500)", "1"],
            ["Mar", "-3,500", "=SIGN(-3500)", "-1"],
            ["Apr", "0", "=SIGN(0)", "0"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Expecting magnitude.", desc: "SIGN(-500) returns -1, not 500. Use ABS for magnitude." }
    ],
    proTips: [
      "Perfect for directional indicators (arrows, colour coding) in dashboards."
    ],
    relatedFunctions: ["ABS"],
    miniChallenge: {
      question: "What is =SIGN(-15)?",
      expectedAnswer: "-1"
    },
    practice: {
      instructions: "In cell B2, find the sign of A2.",
      initialData: [["Val", "Sign"], [-100, ""]],
      targetCell: [1, 1],
      expectedFormula: "SIGN(A2)",
      expectedValue: -1
    }
  },
{
    id: "sqrtpi",
    title: "Square Root of Pi Times Number: SQRTPI Function",
    category: "math",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Square Root of Pi Times Number: SQRTPI Function",
      description: "The SQRTPI function returns the square root of a number multiplied by π: SQRTPI(x) = √(x × π).",
      concept: "Think of it as a shortcut for =SQRT(PI()*number)."
    },
    syntax: "=SQRTPI(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The number to multiply by π before taking the square root. Must be ≥ 0." }
    ],
    detailedExamples: [
      {
        title: "Example: Geometry and Distribution",
        table: {
          headers: ["Parameter", "Formula", "Result"],
          rows: [
            ["x = 2", "=SQRTPI(2)", "2.5066"],
            ["x = 1", "=SQRTPI(1)", "1.7725"],
            ["x = 0", "=SQRTPI(0)", "0"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Negative numbers.", desc: "Negative number returns #NUM!." },
      { title: "Miscalculation.", desc: "Confusing with =SQRT(number)*PI()." }
    ],
    proTips: [
      "SQRTPI appears in the normal distribution probability density function denominator."
    ],
    relatedFunctions: ["SQRT", "PI"],
    miniChallenge: {
      question: "What is =SQRTPI(1) approximately?",
      expectedAnswer: "1.772"
    },
    practice: {
      instructions: "In cell B2, find the square root of A2 times Pi.",
      initialData: [["Val", "Result"], [2, ""]],
      targetCell: [1, 1],
      expectedFormula: "SQRTPI(A2)",
      expectedValue: 2.506628274631
    }
  },
{
    id: "subtotal",
    title: "Aggregate with Control: SUBTOTAL Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Aggregate with Control: SUBTOTAL Function",
      description: "The SUBTOTAL function performs a calculation (SUM, AVERAGE, etc.) on a range while optionally ignoring filtered-out or hidden rows.",
      concept: "Think of it as a smart aggregator that respects your filters: filter out some rows, and SUBTOTAL adapts instantly."
    },
    syntax: "=SUBTOTAL(function_num, ref1, [ref2], ...)",
    syntaxBreakdown: [
      { arg: "function_num", desc: "A code (1–11 or 101–111) specifying the calculation type (e.g., 9 for SUM)." },
      { arg: "ref1", desc: "The range to aggregate." }
    ],
    detailedExamples: [
      {
        title: "Example: Filtered Sales Totals",
        table: {
          headers: ["Region", "Sales"],
          rows: [
            ["North", "500"],
            ["South", "300"],
            ["East", "400"],
            ["West", "600"],
            ["Total", "=SUBTOTAL(9, B2:B5)"]
          ]
        },
        stepByStep: [
          "Function code 9 means SUM.",
          "If you filter out 'South' and 'West', the subtotal automatically updates from 1,800 to 900."
        ]
      }
    ],
    commonMistakes: [
      { title: "Nesting.", desc: "SUBTOTAL ignores other SUBTOTAL cells within the range." },
      { title: "Function codes.", desc: "Codes 1–11 only ignore filtered rows, not manually hidden ones (use 101–111 for both)." }
    ],
    proTips: [
      "Ideal for subtotaling within a column without circular references."
    ],
    relatedFunctions: ["AGGREGATE", "SUM"],
    miniChallenge: {
      question: "Which function_num is used for SUM in SUBTOTAL?",
      expectedAnswer: "9"
    },
    practice: {
      instructions: "In cell B6, use SUBTOTAL with code 9 to sum the range B2:B5.",
      initialData: [["Region", "Sales"], ["A", 100], ["B", 200], ["C", 300], ["D", 400], ["Subtotal", ""]],
      targetCell: [5, 1],
      expectedFormula: "SUBTOTAL(9,B2:B5)",
      expectedValue: 1000
    }
  },
{
    id: "trunc",
    title: "Truncate to Precision: TRUNC Function",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Truncate to Precision: TRUNC Function",
      description: "The TRUNC function cuts off a number to a specified number of decimal places without any rounding.",
      concept: "Think of it as a clean cut: unlike INT or ROUNDDOWN, TRUNC always chops toward zero."
    },
    syntax: "=TRUNC(number, [num_digits])",
    syntaxBreakdown: [
      { arg: "number", desc: "The value to truncate." },
      { arg: "num_digits", desc: "Optional. Number of decimal places to keep (default 0)." }
    ],
    detailedExamples: [
      {
        title: "Example: Extracting Dollars",
        table: {
          headers: ["Price", "Formula", "Result"],
          rows: [
            ["45.89", "=TRUNC(B2)", "45"],
            ["-67.90", "=TRUNC(B3)", "-67"]
          ]
        }
      },
      {
        title: "INT vs TRUNC comparison",
        table: {
          headers: ["Value", "INT", "TRUNC"],
          rows: [
            ["7.9", "7", "7"],
            ["-7.9", "-8", "-7"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Negative parity.", desc: "Assuming TRUNC and INT are identical for negatives." }
    ],
    proTips: [
      "Use TRUNC when you need to remove time from a date-time value."
    ],
    relatedFunctions: ["INT", "ROUNDDOWN"],
    miniChallenge: {
      question: "What is =TRUNC(-4.9)?",
      expectedAnswer: "-4"
    },
    practice: {
      instructions: "In cell B2, truncate A2 to 0 decimal places.",
      initialData: [["Val", "Trunc"], [45.89, ""]],
      targetCell: [1, 1],
      expectedFormula: "TRUNC(A2)",
      expectedValue: 45
    }
  },
{
    id: "sumx2py2",
    title: "Sum of Squares: SUMX2PY2 Function",
    category: "math",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Sum of Squares: SUMX2PY2 Function",
      description: "The SUMX2PY2 function squares both X and Y values for each pair, adds the two squares together, and then sums everything. Formula: (x₁² + y₁²) + (x₂² + y₂²) + ...",
      concept: "Think of it as the combined magnitude of two sets: square both, add together, sum it all up."
    },
    internalLogic: "For each pair (x, y), it calculates (x^2 + y^2) and then sums those results.",
    whyItExists: "Commonly used in geometry and physics for calculating the sum of squared distances or total energy across multiple components.",
    whenToUse: "Use this to calculate aggregate squared magnitudes between two datasets.",
    syntax: "=SUMX2PY2(array_x, array_y)",
    syntaxBreakdown: [
      { arg: "array_x", desc: "The X values." },
      { arg: "array_y", desc: "The Y values. Must match array_x in size." }
    ],
    detailedExamples: [
      {
        title: "Example: Total Energy (Squared Velocity)",
        table: {
          headers: ["Object", "Velocity 1 (X)", "Velocity 2 (Y)", "X² + Y²"],
          rows: [
            ["A", "4", "3", "16 + 9 = 25"],
            ["B", "6", "8", "36 + 64 = 100"],
            ["C", "5", "12", "25 + 144 = 169"],
            ["Total", "", "", "=SUMX2PY2(B2:B4, C2:C4) = 294"]
          ]
        },
        stepByStep: [
          "Object A: 4² + 3² = 16 + 9 = 25.",
          "Object B: 6² + 8² = 36 + 64 = 100.",
          "Object C: 5² + 12² = 25 + 144 = 169.",
          "Sum: 25 + 100 + 169 = 294."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with SUMSQ.", desc: "SUMSQ works on one set of numbers. SUMX2PY2 needs two arrays of equal size and always adds both squares." },
      { title: "Arrays of unequal length.", desc: "Arrays of unequal length cause #N/A." }
    ],
    proTips: [
      "In geometry, use SUMX2PY2 for the sum of squared distances from the origin for a set of (x,y) points.",
      "The square root of SUMX2PY2 gives the Euclidean norm of paired data: =SQRT(SUMX2PY2(x_range, y_range))."
    ],
    relatedFunctions: ["SUMXMY2", "SUMX2MY2", "SUMSQ"],
    miniChallenge: {
      question: "What is the result of SUMX2PY2 on {1} and {2}?",
      expectedAnswer: "5"
    },
    practice: {
      instructions: "In cell C2, use SUMX2PY2 on A2:A3 and B2:B3.",
      initialData: [["X", "Y", "Result"], [3, 4, ""], [1, 2, ""]],
      targetCell: [1, 2],
      expectedFormula: "SUMX2PY2(A2:A3,B2:B3)",
      expectedValue: 30
    }
  },
  {
    id: "avedev",
    title: "AVEDEV Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Mean Absolute Deviation: AVEDEV",
      description: "Calculates the average of the absolute deviations of data points from their mean.",
      concept: "Think of it as 'on average, how far does each number stray from the middle?'"
    },
    internalLogic: "Excel calculates the arithmetic mean of all values, finds the absolute deviation of each value from that mean, and then averages those absolute deviations.",
    whyItExists: "Standard deviation squares distances, which can over-emphasize outliers. AVEDEV gives a more balanced look at data dispersion in its original units.",
    whenToUse: "Use AVEDEV for understanding typical distance from the mean. It is often used in quality control to measure consistency.",
    realWorldUseCases: [
      "Measuring production consistency in manufacturing.",
      "Evaluating test score spread in education.",
      "Analyzing daily sales fluctuations in retail."
    ],
    businessExample: {
      scenario: "A manager wants to know how much daily sales fluctuate from the average.",
      formula: "=AVEDEV(A2:A6)"
    },
    syntax: "=AVEDEV(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "First number or range (required)." },
      { arg: "number2", desc: "Additional numbers/ranges (optional, up to 255)." }
    ],
    detailedExamples: [
      {
        title: "Sales Consistency Check",
        table: {
          headers: ["Day", "Value"],
          rows: [
            ["1", "10"],
            ["2", "20"],
            ["3", "30"],
            ["4", "40"],
            ["5", "50"]
          ]
        },
        stepByStep: [
          "Mean Calculation: (10+20+30+40+50)/5 = 30.",
          "Absolute Deviations: |10-30|=20, |20-30|=10, |30-30|=0, |40-30|=10, |50-30|=20.",
          "Final Result: (20+10+0+10+20)/5 = 12."
        ]
      }
    ],
    commonMistakes: [
      { title: "Non-numeric values", desc: "Including non-numeric values directly in the arguments causes errors." },
      { title: "Confusing with STDEV", desc: "STDEV squares deviations first, weighting outliers more heavily than AVEDEV." }
    ],
    proTips: [
      "Use for understanding typical distance from mean in original units.",
      "Robustness check: compare with standard deviation to see the impact of outliers.",
      "Pair with AVERAGE for a full picture of center and dispersion."
    ],
    relatedFunctions: ["AVERAGE", "STDEV.S", "STDEV.P", "ABS"],
    miniChallenge: {
      question: "Monthly sales: ₦500, ₦600, ₦550, ₦480, ₦520. Calculate the AVEDEV.",
      expectedAnswer: "36"
    },
    practice: {
      instructions: "In cell B9, find the AVEDEV of prices in B2:B6.",
      initialData: [["Product", "Price"], ["A", 15], ["B", 22], ["C", 18], ["D", 25], ["E", 20], ["", ""], ["Task", "Formula"], ["AVEDEV", ""]],
      targetCell: [8, 1],
      expectedFormula: "AVEDEV(B2:B6)",
      expectedValue: 2.8
    }
  },
  {
    id: "average",
    title: "AVERAGE Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Arithmetic Mean: AVERAGE",
      description: "Calculates the arithmetic mean of a group of numbers by summing them and dividing by the count.",
      concept: "If you had to pick one number to represent the whole group, this would be it. It finds the 'middle' ground of your data."
    },
    internalLogic: "Excel sums all numeric values in the provided arguments and divides that sum by the count of those numeric values.",
    whyItExists: "Averages are the most fundamental way to identify the central point of a dataset, allowing for quick comparisons between different groups.",
    whenToUse: "Use whenever you need to find the typical or average value, such as average test scores, daily steps, or monthly expenses.",
    realWorldUseCases: [
      "Calculating class average scores for students.",
      "Finding the average daily steps from a fitness tracker.",
      "Estimating average monthly household expenses."
    ],
    businessExample: {
      scenario: "A teacher wants to find the average score for the class, ignoring students who haven't taken the test yet.",
      formula: "=AVERAGE(B2:B5)"
    },
    syntax: "=AVERAGE(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "First number, cell reference, or range (required)." },
      { arg: "number2", desc: "Additional up to 255 arguments (optional)." }
    ],
    detailedExamples: [
      {
        title: "Class Average Performance",
        table: {
          headers: ["Student", "Score"],
          rows: [
            ["John", "85"],
            ["Sarah", "92"],
            ["Mike", "78"],
            ["Emma", "88"],
            ["Dave", ""]
          ]
        },
        stepByStep: [
          "Sum of scores: 85 + 92 + 78 + 88 = 343.",
          "Count of scores: 4 (Dave is ignored as his cell is blank).",
          "Average: 343 / 4 = 85.75."
        ]
      }
    ],
    commonMistakes: [
      { title: "Including headers", desc: "Including header rows in your range can sometimes cause errors or unexpected results." },
      { title: "Zeros vs Blanks", desc: "AVERAGE counts zeros as data points, but ignores blank cells completely. This can significantly change your result." },
      { title: "Confusing with AVERAGEA", desc: "AVERAGEA counts logical values and text as 0/1, while AVERAGE ignores them." }
    ],
    proTips: [
      "Use ROUND with AVERAGE for more presentable report results.",
      "In modern Excel, nest with FILTER to average only specific subsets of data.",
      "Combine with conditional formatting to highlight values above or below the average."
    ],
    relatedFunctions: ["AVERAGEA", "AVERAGEIF", "AVERAGEIFS", "MEDIAN", "MODE.SNGL"],
    miniChallenge: {
      question: "Calculate the average of: 45, 0, 55, blank, and 60. What is the result?",
      expectedAnswer: "40"
    },
    practice: {
      instructions: "In cell B8, calculate the average steps (excluding blanks) from B2:B6.",
      initialData: [["Day", "Steps"], ["Mon", 8500], ["Tue", 7200], ["Wed", 9100], ["Thu", 6800], ["Fri", ""], ["", ""], ["Average", ""]],
      targetCell: [7, 1],
      expectedFormula: "AVERAGE(B2:B6)",
      expectedValue: 7900
    }
  },
  {
    id: "averagea",
    title: "AVERAGEA Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "The All-Inclusive Mean: AVERAGEA",
      description: "Calculates the average of all non-empty cells in a range, including text and logical values (TRUE/FALSE).",
      concept: "Unlike the standard AVERAGE, this counts every cell that isn't empty. It's useful when 'no data' or 'text entries' should still influence the final average."
    },
    internalLogic: "Excel counts all non-empty cells. It treats text as 0, TRUE as 1, and FALSE as 0. It then divides the total sum by the count of all non-empty cells.",
    whyItExists: "In surveys or checklists, you often want a 'No Response' or 'False' to lower the overall average score, rather than ignoring it.",
    whenToUse: "Use for survey data where 'No response' or logical flags should be part of the average calculation.",
    realWorldUseCases: [
      "Calculating survey rating averages where text responses represent 0.",
      "Averaging attendance records using TRUE/FALSE flags.",
      "Data quality audits where text entries indicate missing values."
    ],
    businessExample: {
      scenario: "An HR manager wants an average score where 'No Response' from an employee effectively counts as a zero.",
      formula: "=AVERAGEA(B2:B6)"
    },
    syntax: "=AVERAGEA(value1, [value2], ...)",
    syntaxBreakdown: [
      { arg: "value1", desc: "First value or range to average (required)." },
      { arg: "value2", desc: "Additional arguments (optional)." }
    ],
    detailedExamples: [
      {
        title: "Mixed Data Survey",
        table: {
          headers: ["Employee", "Response"],
          rows: [
            ["John", "5"],
            ["Sarah", "TRUE"],
            ["Mike", "3"],
            ["Emma", "No Response"],
            ["Dave", "FALSE"]
          ]
        },
        stepByStep: [
          "Conversion: 5, 1 (TRUE), 3, 0 (Text), 0 (FALSE).",
          "Sum: 5 + 1 + 3 + 0 + 0 = 9.",
          "Count: 5 non-empty cells.",
          "Final Result: 9 / 5 = 1.8."
        ]
      }
    ],
    commonMistakes: [
      { title: "Unexpected Zeros", desc: "Forgetting that text evaluates to zero can drastically lower your average if you weren't expecting it." },
      { title: "Using for purely numeric data", desc: "If your data is all numbers and blanks, use standard AVERAGE so blanks are properly ignored." }
    ],
    proTips: [
      "Use when you want blanks to be ignored but text/logicals to be included.",
      "Pair with COUNTA to verify the denominator being used in the average.",
      "Good for grading systems where 'Incomplete' should penalize the final score."
    ],
    relatedFunctions: ["AVERAGE", "COUNTA", "ISNUMBER"],
    miniChallenge: {
      question: "Values: 10, 'N/A', TRUE, 5, blank. What does AVERAGEA return?",
      expectedAnswer: "4"
    },
    practice: {
      instructions: "In cell B8, calculate the AVERAGEA result for the ratings in B2:B6.",
      initialData: [["Item", "Rating"], ["A", 4], ["B", "TRUE"], ["C", "No rating"], ["D", 2], ["E", "FALSE"], ["", ""], ["Result", ""]],
      targetCell: [7, 1],
      expectedFormula: "AVERAGEA(B2:B6)",
      expectedValue: 1.4
    }
  },
  {
    id: "averageif",
    title: "AVERAGEIF Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Conditional Averaging: AVERAGEIF",
      description: "Calculates the average of cells that meet a single specific criterion you define.",
      concept: "It's like a filter and a calculator in one: 'Find all the rows for the North region, and then average their sales.'"
    },
    internalLogic: "Excel evaluates each cell in the criteria range. For every match, it identifies the corresponding cell in the average_range and includes it in the final average calculation.",
    whyItExists: "Business reports often require averages for specific segments (like a single department or region) without needing to manually sort or filter the data first.",
    whenToUse: "Use whenever you need to average data based on one condition (e.g., Average sales where Category = 'Fruit').",
    realWorldUseCases: [
      "Calculating average sales for a specific region.",
      "Finding the average salary for a specific department.",
      "Averaging product prices that are above a certain threshold."
    ],
    businessExample: {
      scenario: "A sales manager wants to find the average sales specifically for the 'IT' department.",
      formula: "=AVERAGEIF(A2:A6, \"IT\", B2:B6)"
    },
    syntax: "=AVERAGEIF(range, criteria, [average_range])",
    syntaxBreakdown: [
      { arg: "range", desc: "The cells you want to check against the criteria (required)." },
      { arg: "criteria", desc: "The condition (number, text, or expression) that must be met (required)." },
      { arg: "average_range", desc: "The actual cells to average. If omitted, Excel averages the cells in the 'range' argument (optional)." }
    ],
    detailedExamples: [
      {
        title: "Regional Sales Average",
        table: {
          headers: ["Region", "Sales"],
          rows: [
            ["North", "100"],
            ["South", "200"],
            ["North", "150"],
            ["East", "300"],
            ["North", "125"]
          ]
        },
        stepByStep: [
          "Excel identifies 'North' rows: 100, 150, 125.",
          "Sum: 100 + 150 + 125 = 375.",
          "Count of matches: 3.",
          "Average: 375 / 3 = 125."
        ]
      }
    ],
    commonMistakes: [
      { title: "Mismatched range sizes", desc: "The 'range' and 'average_range' must be the same size and shape, or you will get inaccurate results." },
      { title: "Missing quotes", desc: "Text criteria (like \"North\") and logical operators (like \">100\") must be enclosed in double quotes." },
      { title: "Multi-condition attempt", desc: "AVERAGEIF only handles ONE condition. If you need more, you must use AVERAGEIFS." }
    ],
    proTips: [
      "Use wildcards like 'North*' to average all regions starting with 'North'.",
      "Criteria can reference other cells: \">=\"&D1.",
      "Omit the average_range if you want to average the same cells you are testing."
    ],
    relatedFunctions: ["AVERAGEIFS", "SUMIF", "COUNTIF", "AVERAGE"],
    miniChallenge: {
      question: "Data: Products A,B,A,C,A with prices 10,20,15,25,12. What is the average price of Product A?",
      expectedAnswer: "12.33"
    },
    practice: {
      instructions: "In cell B8, find the average IT salary from the department list in A2:A6 and salaries in B2:B6.",
      initialData: [["Dept", "Salary"], ["IT", 75000], ["HR", 62000], ["IT", 82000], ["Sales", 70000], ["IT", 78000], ["", ""], ["Average IT", ""]],
      targetCell: [7, 1],
      expectedFormula: "AVERAGEIF(A2:A6,\"IT\",B2:B6)",
      expectedValue: 78333.33
    }
  },
  {
    id: "averageifs",
    title: "AVERAGEIFS Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Multi-Criteria Averaging: AVERAGEIFS",
      description: "Calculates the average of cells that meet multiple specific criteria across different ranges.",
      concept: "Think of it as a laser-focused filter. 'Average the sales where the Region is North AND the Product is Widget.' It allows for precise data drilling."
    },
    internalLogic: "Excel checks all provided conditions using AND logic. Only rows that satisfy EVERY criterion are included. It then sums the matching values from the average_range and divides by the count of those matches.",
    whyItExists: "Complex business analysis often requires looking at the intersection of several factors (e.g., specific products, in specific regions, during specific months) without needing pivot tables.",
    whenToUse: "Use whenever you have two or more conditions that must all be true before averaging.",
    realWorldUseCases: [
      "Calculating average sales for a specific rep in a specific region.",
      "Averaging project costs that are 'High Priority' and 'Overdue'.",
      "Finding average performance scores for 'Full-time' staff in 'Department A'."
    ],
    businessExample: {
      scenario: "A manager wants Sue's average sales performance specifically in the 'West' region.",
      formula: "=AVERAGEIFS(D2:D6, B2:B6, \"Sue\", C2:C6, \"West\")"
    },
    syntax: "=AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    syntaxBreakdown: [
      { arg: "average_range", desc: "The actual cells you want to average (required, and must come FIRST)." },
      { arg: "criteria_range1", desc: "The first range to evaluate (required)." },
      { arg: "criteria1", desc: "The first condition to meet (required)." },
      { arg: "criteria_range2, criteria2", desc: "Additional pairs of ranges and conditions (optional, up to 127 pairs)." }
    ],
    detailedExamples: [
      {
        title: "Multi-Filter Performance",
        table: {
          headers: ["Region", "Product", "Sales"],
          rows: [
            ["North", "Widget", "100"],
            ["South", "Gadget", "200"],
            ["North", "Gadget", "150"],
            ["East", "Widget", "300"],
            ["North", "Widget", "125"]
          ]
        },
        stepByStep: [
          "Logic: Region must be 'North' AND Product must be 'Widget'.",
          "Matches: Row 1 (100) and Row 5 (125).",
          "Sum: 100 + 125 = 225.",
          "Count: 2.",
          "Final Result: 225 / 2 = 112.5."
        ]
      }
    ],
    commonMistakes: [
      { title: "Wrong Argument Order", desc: "The average_range comes FIRST in AVERAGEIFS, but LAST in AVERAGEIF. This is the most common cause of errors." },
      { title: "Mismatched range sizes", desc: "All ranges must have the exact same number of rows and columns." },
      { title: "OR logic expectation", desc: "AVERAGEIFS uses AND logic (all criteria must be true). For OR logic, you need more complex formulas." }
    ],
    proTips: [
      "Structure your data as an Excel Table so ranges update automatically as you add rows.",
      "Use cell references for criteria to create dynamic dashboard summaries.",
      "Combine with dates: \">=\"&DATE(2024,1,1) for specific time periods."
    ],
    relatedFunctions: ["AVERAGEIF", "SUMIFS", "COUNTIFS", "MAXIFS", "MINIFS"],
    miniChallenge: {
      question: "You need to find average sales for 'West' region where amount > ₦500 during 'Q1'. Which function is best?",
      expectedAnswer: "AVERAGEIFS"
    },
    practice: {
      instructions: "In cell E8, calculate Sue's average sales in the West region from the table (B2:B6 for Rep, C2:C6 for Region, D2:D6 for Amount).",
      initialData: [["Month", "Rep", "Region", "Amount"], ["Jan", "Sue", "West", 600], ["Jan", "Bob", "East", 450], ["Feb", "Sue", "West", 550], ["Feb", "Ann", "West", 700], ["Mar", "Sue", "West", 500], ["", "", "", ""], ["Result", "", "Avg Sue West", ""]],
      targetCell: [7, 3],
      expectedFormula: "AVERAGEIFS(D2:D6,B2:B6,\"Sue\",C2:C6,\"West\")",
      expectedValue: 550
    }
  },
  {
    id: "beta.dist",
    title: "BETA.DIST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Beta Distribution: BETA.DIST",
      description: "Calculates the beta cumulative distribution function (CDF) or the beta probability density function (PDF).",
      concept: "The Beta distribution is often used to model the variation in the percentage of something across samples, like the time people spend watching a video or the probability of a project succeeding."
    },
    internalLogic: "It standardizes the value 'x' to the range [A, B] and then computes the beta function's integral (for CDF) or the height of the curve (for PDF) based on the shape parameters alpha and beta.",
    whyItExists: "Beta distributions are extremely flexible for modeling proportions and probabilities because they are constrained between 0 and 1 (or any defined interval A to B).",
    whenToUse: "Use BETA.DIST in project management (PERT analysis) or for modeling uncertainty in probabilities.",
    realWorldUseCases: [
      "Modeling the percentage of defective items in a batch.",
      "Estimating project completion times in risk analysis.",
      "Analyzing market share proportions."
    ],
    businessExample: {
      scenario: "A risk analyst wants to find the probability that a project will be at most 40% complete given specific shape parameters.",
      formula: "=BETA.DIST(0.4, 2, 5, TRUE)"
    },
    syntax: "=BETA.DIST(x, alpha, beta, cumulative, [A], [B])",
    syntaxBreakdown: [
      { arg: "x", desc: "The value between A and B at which to evaluate the function (required)." },
      { arg: "alpha", desc: "A shape parameter of the distribution (must be > 0) (required)." },
      { arg: "beta", desc: "A shape parameter of the distribution (must be > 0) (required)." },
      { arg: "cumulative", desc: "TRUE returns the CDF (probability ≤ x); FALSE returns the PDF (required)." },
      { arg: "A, B", desc: "Optional. The lower and upper bounds of the interval for x (defaults to 0 and 1)." }
    ],
    detailedExamples: [
      {
        title: "Beta CDF vs PDF",
        table: {
          headers: ["x", "Alpha", "Beta", "Cumulative", "Result"],
          rows: [
            ["0.4", "2", "5", "TRUE", "0.7667"],
            ["0.4", "2", "5", "FALSE", "1.5552"]
          ]
        },
        stepByStep: [
          "With Alpha=2 and Beta=5, the distribution is skewed toward lower values.",
          "At x=0.4, 76.67% of the distribution lies at or below this value (CDF).",
          "The value 1.5552 represents the height of the probability curve at that exact point (PDF)."
        ]
      }
    ],
    commonMistakes: [
      { title: "Value outside bounds", desc: "If x is less than A or greater than B, Excel returns a #NUM! error." },
      { title: "Alpha or Beta ≤ 0", desc: "The shape parameters must be positive numbers." },
      { title: "Cumulative flag", desc: "Forgetting that TRUE returns the area under the curve, not the height." }
    ],
    proTips: [
      "If Alpha > Beta, the distribution skews right; if Beta > Alpha, it skews left.",
      "If Alpha = Beta = 1, the Beta distribution is identical to the Uniform distribution.",
      "Use for PERT analysis: Alpha and Beta can be calculated from optimistic, most likely, and pessimistic time estimates."
    ],
    relatedFunctions: ["BETA.INV", "NORM.DIST", "BINOM.DIST"],
    miniChallenge: {
      question: "Find the probability that a proportion is ≤ 0.3 with shape parameters alpha=3 and beta=7.",
      expectedAnswer: "=BETA.DIST(0.3, 3, 7, TRUE)"
    },
    practice: {
      instructions: "In cell B7, calculate the CDF (Cumulative) for x=0.25 with Alpha=4 and Beta=4.",
      initialData: [["Parameter", "Value"], ["x", 0.25], ["Alpha", 4], ["Beta", 4], ["", ""], ["CDF Result", ""]],
      targetCell: [5, 1],
      expectedFormula: "BETA.DIST(0.25,4,4,TRUE)",
      expectedValue: 0.070556640625
    }
  },
  {
    id: "beta.inv",
    title: "BETA.INV Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Inverse Beta Distribution: BETA.INV",
      description: "Returns the inverse of the beta cumulative distribution function (BETA.DIST with cumulative = TRUE).",
      concept: "It answers the question: 'What value of x gives me a specific cumulative probability?' It's the reverse of finding a probability."
    },
    internalLogic: "Excel uses iterative numerical methods to find the value 'x' such that the area under the beta distribution curve from the lower bound A to x equals the provided probability.",
    whyItExists: "Critical for determining confidence bounds and percentiles for proportions and probabilities in statistical modeling.",
    whenToUse: "Use BETA.INV to find the value corresponding to a specific percentile (e.g., 'What proportion marks the bottom 10% of results?').",
    realWorldUseCases: [
      "Determining the 95th percentile for project completion percentages.",
      "Finding confidence intervals for conversion rates.",
      "Estimating time limits in Bayesian statistical models."
    ],
    businessExample: {
      scenario: "A planner wants to know the project completion percentage that marks the 95th percentile of expected outcomes.",
      formula: "=BETA.INV(0.95, 8, 2)"
    },
    syntax: "=BETA.INV(probability, alpha, beta, [A], [B])",
    syntaxBreakdown: [
      { arg: "probability", desc: "The cumulative probability between 0 and 1 (required)." },
      { arg: "alpha", desc: "Shape parameter > 0 (required)." },
      { arg: "beta", desc: "Shape parameter > 0 (required)." },
      { arg: "A, B", desc: "Optional lower and upper bounds (defaults to 0 and 1)." }
    ],
    detailedExamples: [
      {
        title: "Percentile Calculation",
        table: {
          headers: ["Probability", "Alpha", "Beta", "Result (x)"],
          rows: [
            ["0.95", "8", "2", "0.9033"]
          ]
        },
        stepByStep: [
          "For a Beta distribution (8, 2), 95% of the area is found to the left of 0.9033.",
          "In a business context, you could be 95% confident the value will be 0.9033 or less."
        ]
      }
    ],
    commonMistakes: [
      { title: "Probability outside [0,1]", desc: "Providing a probability < 0 or > 1 returns a #NUM! error." },
      { title: "Iterative limits", desc: "If Excel cannot find a result within 100 iterations, it returns #N/A (rare for standard values)." }
    ],
    proTips: [
      "Pair with BETA.DIST to verify your result: BETA.DIST(result, ...) should equal your probability.",
      "Essential for PERT (Program Evaluation and Review Technique) in project management.",
      "Use to calculate 'True' conversion rate bounds when you have limited sample sizes."
    ],
    relatedFunctions: ["BETA.DIST", "NORM.INV", "T.INV"],
    miniChallenge: {
      question: "What value corresponds to the 90th percentile of a Beta distribution with alpha=2, beta=6?",
      expectedAnswer: "0.45"
    },
    practice: {
      instructions: "In cell B6, find the value for the 10th percentile (0.10) with Alpha=3 and Beta=3.",
      initialData: [["Parameter", "Value"], ["Probability", 0.10], ["Alpha", 3], ["Beta", 3], ["", ""], ["Beta Inverse", ""]],
      targetCell: [5, 1],
      expectedFormula: "BETA.INV(0.1,3,3)",
      expectedValue: 0.19412
    }
  },
  {
    id: "binom.dist",
    title: "BINOM.DIST Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Binomial Distribution: BINOM.DIST",
      description: "Calculates the individual term binomial distribution probability (exact) or the cumulative distribution (at most).",
      concept: "Think of this as the 'Coin Flip' function. It models scenarios with only two outcomes: success or failure (e.g., Heads/Tails, Pass/Fail, Win/Loss)."
    },
    internalLogic: "For the exact probability (PDF), it uses the combinations formula: P(X=k) = C(n,k) * p^k * (1-p)^(n-k). For cumulative (CDF), it sums the probabilities of getting 0, 1, ..., k successes.",
    whyItExists: "Essential for quality control and risk management where you need to know the likelihood of a specific number of 'successes' in a fixed number of trials.",
    whenToUse: "Use when you have a fixed number of independent trials, each with the same constant probability of success.",
    realWorldUseCases: [
      "Finding the probability of exactly 3 heads in 10 coin flips.",
      "Calculating the risk of having 2 or more defective items in a shipment of 50.",
      "Estimating the likelihood of 5 out of 10 sales calls resulting in a purchase."
    ],
    businessExample: {
      scenario: "A call center has a 35% success rate. What is the chance of getting exactly 3 sales in the next 10 calls?",
      formula: "=BINOM.DIST(3, 10, 0.35, FALSE)"
    },
    syntax: "=BINOM.DIST(number_s, trials, probability_s, cumulative)",
    syntaxBreakdown: [
      { arg: "number_s", desc: "The number of successes you want to evaluate (required)." },
      { arg: "trials", desc: "The total number of independent trials (required)." },
      { arg: "probability_s", desc: "The constant probability of success for each trial (required)." },
      { arg: "cumulative", desc: "TRUE for 'at most' (CDF); FALSE for 'exactly' (PMF) (required)." }
    ],
    detailedExamples: [
      {
        title: "Sales Call Success",
        table: {
          headers: ["Successes", "Trials", "Prob", "Cumulative", "Result"],
          rows: [
            ["3", "10", "0.35", "FALSE", "0.2522"],
            ["3", "10", "0.35", "TRUE", "0.5138"]
          ]
        },
        stepByStep: [
          "The exact chance of exactly 3 sales is 25.22%.",
          "The chance of getting 0, 1, 2, OR 3 sales (at most 3) is 51.38%."
        ]
      }
    ],
    commonMistakes: [
      { title: "Successes > Trials", desc: "You cannot have more successes than trials. This returns #NUM!." },
      { title: "Prob as Percentage", desc: "Excel expects a decimal. Use 0.35, not 35 (which would be 3500% success rate!)." },
      { title: "Non-integers", desc: "Excel truncates successes and trials to integers." }
    ],
    proTips: [
      "To find 'At least k successes', use =1 - BINOM.DIST(k-1, n, p, TRUE).",
      "If n * p > 5 and n * (1-p) > 5, the binomial distribution starts looking like a Normal distribution.",
      "Use BINOM.DIST.RANGE for probability between two specific values (e.g., between 2 and 5 successes)."
    ],
    relatedFunctions: ["BINOM.INV", "HYPGEOM.DIST", "POISSON.DIST"],
    miniChallenge: {
      question: "What is the probability of getting exactly 2 heads in 5 fair coin flips?",
      expectedAnswer: "0.3125"
    },
    practice: {
      instructions: "In cell B7, find the exact probability of 4 successes in 12 trials with a 25% (0.25) success rate.",
      initialData: [["Parameter", "Value"], ["Successes", 4], ["Trials", 12], ["Probability", 0.25], ["", ""], ["Exact Prob", ""]],
      targetCell: [5, 1],
      expectedFormula: "BINOM.DIST(4,12,0.25,FALSE)",
      expectedValue: 0.19357
    }
  },
  {
    id: "binom.inv",
    title: "BINOM.INV Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Inverse Binomial: BINOM.INV",
      description: "Returns the smallest value for which the cumulative binomial distribution is greater than or equal to a criterion value (alpha).",
      concept: "It's like finding a threshold. 'How many successes do I need to be 90% sure the process is working?' or 'What's the maximum number of errors I can expect at a certain confidence level?'"
    },
    internalLogic: "Excel calculates the cumulative binomial distribution for k = 0, 1, 2... and returns the first value of k where the probability P(X ≤ k) ≥ alpha.",
    whyItExists: "Crucial for determining sample sizes and critical values in hypothesis testing and quality assurance.",
    whenToUse: "Use to find the minimum number of successes required to meet a target confidence level.",
    realWorldUseCases: [
      "Determining the minimum sample size for a survey.",
      "Finding the critical value for a pass/fail quality check.",
      "Risk assessment: maximum number of defaults in a credit portfolio."
    ],
    businessExample: {
      scenario: "In a batch of 20 items with a 40% success rate, what is the smallest number of successes such that the cumulative probability is at least 80%?",
      formula: "=BINOM.INV(20, 0.4, 0.8)"
    },
    syntax: "=BINOM.INV(trials, probability_s, alpha)",
    syntaxBreakdown: [
      { arg: "trials", desc: "The number of independent Bernoulli trials (required)." },
      { arg: "probability_s", desc: "The success probability of each trial (required)." },
      { arg: "alpha", desc: "The target cumulative probability (confidence level) (required)." }
    ],
    detailedExamples: [
      {
        title: "Threshold Calculation",
        table: {
          headers: ["Trials", "Prob", "Alpha", "Result (k)"],
          rows: [
            ["20", "0.4", "0.8", "10"]
          ]
        },
        stepByStep: [
          "With 20 trials and p=0.4, Excel checks cumulative probabilities.",
          "P(X ≤ 9) = 0.755 (Too low).",
          "P(X ≤ 10) = 0.872 (Meets alpha of 0.8).",
          "Result: 10."
        ]
      }
    ],
    commonMistakes: [
      { title: "Non-integer Trials", desc: "Trials are truncated to integers. =BINOM.INV(20.9, ...) counts as 20." },
      { title: "Alpha outside [0,1]", desc: "Providing an alpha like 80 (instead of 0.8) returns #NUM!." },
      { title: "Confusing Alpha", desc: "Alpha here is the target *cumulative* probability, not the significance level used in some other functions." }
    ],
    proTips: [
      "Use for quality control: find the maximum number of defects allowed to maintain 95% confidence in a process.",
      "Matches the legacy CRITBINOM function for backward compatibility.",
      "Helpful in staffing: how many agents do we need to ensure 90% of calls are answered?"
    ],
    relatedFunctions: ["BINOM.DIST", "NORM.INV", "POISSON.DIST"],
    miniChallenge: {
      question: "With 15 trials and p=0.3, what is the smallest k where the cumulative probability is ≥ 0.9?",
      expectedAnswer: "7"
    },
    practice: {
      instructions: "In cell B6, find the BINOM.INV value for 25 trials, 50% (0.5) success rate, and a 95% (0.95) alpha.",
      initialData: [["Parameter", "Value"], ["Trials", 25], ["Prob", 0.5], ["Alpha", 0.95], ["", ""], ["BINOM.INV", ""]],
      targetCell: [5, 1],
      expectedFormula: "BINOM.INV(25,0.5,0.95)",
      expectedValue: 17
    }
  },
  {
    id: "chisq.dist",
    title: "CHISQ.DIST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Chi-Square Distribution: CHISQ.DIST",
      description: "Returns the left-tailed probability of the chi-squared distribution.",
      concept: "The Chi-Square distribution is used to test how well a model fits the data (Goodness of Fit) or if two categorical variables are independent."
    },
    internalLogic: "Excel calculates the area under the chi-square curve from 0 to 'x' (for CDF) or the height at 'x' (for PDF) given the specified degrees of freedom.",
    whyItExists: "Fundamental for hypothesis testing in science and marketing where you compare observed frequencies against expected frequencies.",
    whenToUse: "Use to calculate the p-value for a chi-square test or to model variance in a population.",
    realWorldUseCases: [
      "Analyzing if customer preferences differ by region.",
      "Testing if a die is fair (observed vs. expected rolls).",
      "Quality control: measuring variance in manufactured parts."
    ],
    businessExample: {
      scenario: "Find the probability of a chi-square value of 5.0 with 3 degrees of freedom (Cumulative).",
      formula: "=CHISQ.DIST(5, 3, TRUE)"
    },
    syntax: "=CHISQ.DIST(x, deg_freedom, cumulative)",
    syntaxBreakdown: [
      { arg: "x", desc: "The value at which to evaluate the distribution (must be ≥ 0) (required)." },
      { arg: "deg_freedom", desc: "The number of degrees of freedom (must be a positive integer) (required)." },
      { arg: "cumulative", desc: "TRUE for CDF (area to the left); FALSE for PDF (required)." }
    ],
    detailedExamples: [
      {
        title: "Chi-Square Left Tail",
        table: {
          headers: ["x", "df", "Cumulative", "Result"],
          rows: [
            ["5.0", "3", "TRUE", "0.8282"],
            ["5.0", "3", "FALSE", "0.1202"]
          ]
        },
        stepByStep: [
          "For df=3, approximately 82.8% of the distribution is less than or equal to 5.0.",
          "Note: For right-tail p-values (common in testing), use CHISQ.DIST.RT or 1 - CHISQ.DIST."
        ]
      }
    ],
    commonMistakes: [
      { title: "Negative x", desc: "The Chi-Square distribution is only defined for x ≥ 0. Negative values return #NUM!." },
      { title: "Wrong Tail", desc: "Standard hypothesis tests usually look for the right-tail probability. CHISQ.DIST returns the LEFT tail." }
    ],
    proTips: [
      "Mean of Chi-Square = degrees of freedom.",
      "Variance of Chi-Square = 2 * degrees of freedom.",
      "As df increases, the Chi-Square distribution starts to look like a Normal distribution."
    ],
    relatedFunctions: ["CHISQ.DIST.RT", "CHISQ.INV", "CHISQ.TEST"],
    miniChallenge: {
      question: "Find the left-tail probability P(X ≤ 7.8) with 4 degrees of freedom.",
      expectedAnswer: "0.9009"
    },
    practice: {
      instructions: "In cell B7, calculate the CDF (Cumulative) for x=3.5 with 6 degrees of freedom.",
      initialData: [["Parameter", "Value"], ["x", 3.5], ["df", 6], ["Cumulative", "TRUE"], ["", ""], ["CDF", ""]],
      targetCell: [5, 1],
      expectedFormula: "CHISQ.DIST(3.5,6,TRUE)",
      expectedValue: 0.2568
    }
  },
  {
    id: "chisq.inv",
    title: "CHISQ.INV Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Inverse Chi-Square: CHISQ.INV",
      description: "Returns the inverse of the left-tailed probability of the chi-squared distribution.",
      concept: "It finds the critical value. 'Given a probability of 95%, what chi-square score marks the boundary?' This is used to find the cutoff for rejecting a null hypothesis."
    },
    internalLogic: "Excel uses iterative numerical methods to find the value 'x' such that CHISQ.DIST(x, df, TRUE) equals the provided probability.",
    whyItExists: "Necessary for determining critical values in statistical significance testing (alpha levels).",
    whenToUse: "Use to find the chi-square statistic corresponding to a specific confidence level.",
    realWorldUseCases: [
      "Determining the critical value for a 0.05 significance level test.",
      "Calculating confidence intervals for population variance.",
      "Establishing rejection regions in goodness-of-fit tests."
    ],
    businessExample: {
      scenario: "Find the value that marks the 95th percentile (left-tail 0.95) of a chi-square distribution with 10 degrees of freedom.",
      formula: "=CHISQ.INV(0.95, 10)"
    },
    syntax: "=CHISQ.INV(probability, deg_freedom)",
    syntaxBreakdown: [
      { arg: "probability", desc: "The left-tail cumulative probability between 0 and 1 (required)." },
      { arg: "deg_freedom", desc: "The number of degrees of freedom (positive integer) (required)." }
    ],
    detailedExamples: [
      {
        title: "Critical Value Lookup",
        table: {
          headers: ["Probability", "df", "Critical Value"],
          rows: [
            ["0.95", "10", "18.307"]
          ]
        },
        stepByStep: [
          "For df=10, 95% of the data falls below 18.307.",
          "If your calculated test statistic is higher than this value, you would reject the null hypothesis at the 5% (1-0.95) significance level."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using Right-Tail Prob", desc: "If you have an alpha of 0.05 for a right-tail test, you must use 0.95 (1 - 0.05) as the probability." },
      { title: "Prob = 0 or 1", desc: "Probability must be > 0 and < 1. Exact 0 or 1 returns #NUM!." }
    ],
    proTips: [
      "Use CHISQ.INV.RT if you prefer to input the right-tail probability directly (e.g., 0.05).",
      "Pair with CHISQ.TEST to see if your result is significantly different from expected.",
      "Always verify degrees of freedom: for a table, df = (rows-1) * (cols-1)."
    ],
    relatedFunctions: ["CHISQ.INV.RT", "CHISQ.DIST", "T.INV"],
    miniChallenge: {
      question: "Find the critical value for alpha=0.05 with 8 degrees of freedom (using 0.95 left-tail).",
      expectedAnswer: "15.507"
    },
    practice: {
      instructions: "In cell B6, find the critical value for a 99% (0.99) probability with 15 degrees of freedom.",
      initialData: [["Parameter", "Value"], ["Probability", 0.99], ["df", 15], ["", ""], ["Critical Value", ""]],
      targetCell: [4, 1],
      expectedFormula: "CHISQ.INV(0.99,15)",
      expectedValue: 30.578
    }
  },
  {
    id: "chisq.test",
    title: "CHISQ.TEST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Independence Test: CHISQ.TEST",
      description: "Returns the test for independence (p-value) from the chi-squared distribution.",
      concept: "It compares what you saw (Observed) with what you expected (Expected). If the p-value is low (< 0.05), it means there is a significant relationship between your variables."
    },
    internalLogic: "1. Calculates the Chi-Square statistic: Σ[(Observed - Expected)² / Expected]. 2. Determines degrees of freedom. 3. Returns the right-tail probability (p-value) for that statistic.",
    whyItExists: "Crucial for determining if differences in data are 'real' or just due to random chance.",
    whenToUse: "Use to analyze survey results or A/B tests to see if the outcome depends on the category (e.g., 'Does gender affect brand preference?').",
    realWorldUseCases: [
      "A/B Testing: Does Design A lead to more clicks than Design B?",
      "Marketing: Do different age groups prefer different products?",
      "Science: Does a new drug perform better than a placebo?"
    ],
    businessExample: {
      scenario: "Compare observed counts in A2:B3 with expected counts. A p-value < 0.05 suggests a significant difference.",
      formula: "=CHISQ.TEST(A2:B3, C2:D3)"
    },
    syntax: "=CHISQ.TEST(actual_range, expected_range)",
    syntaxBreakdown: [
      { arg: "actual_range", desc: "The range containing your observed frequencies (required)." },
      { arg: "expected_range", desc: "The range containing the values you'd expect if there were no relationship (required)." }
    ],
    detailedExamples: [
      {
        title: "Preference Analysis",
        table: {
          headers: ["", "Product A", "Product B", "Result"],
          rows: [
            ["Observed Group 1", "45", "55", ""],
            ["Observed Group 2", "60", "40", ""],
            ["P-Value", "", "", "0.134"]
          ]
        },
        stepByStep: [
          "Input actual data in one range and expected data in another.",
          "Excel calculates the differences, squares them, and sums them up.",
          "A p-value of 0.134 means there is a 13.4% chance the difference is just noise. We usually need < 5% to call it 'significant'."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using Percentages", desc: "CHISQ.TEST requires counts (frequencies), not percentages or ratios." },
      { title: "Expected values < 5", desc: "The test is less reliable if any cell in the 'expected_range' is less than 5." },
      { title: "Different Array Sizes", desc: "Both ranges must have identical dimensions (e.g., 2x2)." }
    ],
    proTips: [
      "To find the expected range manually for a contingency table: (Row Total * Column Total) / Grand Total.",
      "A low p-value does NOT tell you which category is different, just that the overall table shows a relationship.",
      "Combine with conditional formatting to flag results where p < 0.05."
    ],
    relatedFunctions: ["CHISQ.DIST", "T.TEST", "F.TEST"],
    miniChallenge: {
      question: "If CHISQ.TEST returns 0.02, is the relationship typically considered significant?",
      expectedAnswer: "Yes"
    },
    practice: {
      instructions: "In cell B6, calculate the p-value comparing observed counts in B2:C3 with the expected counts in D2:E3.",
      initialData: [["", "Pass", "Fail", "Exp Pass", "Exp Fail"], ["Method A", 70, 30, 60, 40], ["Method B", 50, 50, 60, 40], ["", "", "", "", ""], ["P-Value", ""]],
      targetCell: [5, 1],
      expectedFormula: "CHISQ.TEST(B2:C3,D2:E3)",
      expectedValue: 0.0044
    }
  },
  {
    id: "confidence.norm",
    title: "CONFIDENCE.NORM Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Margin of Error (Normal): CONFIDENCE.NORM",
      description: "Calculates the margin of error for a population mean using a normal distribution.",
      concept: "Think of this as the 'Plus or Minus' in a survey. 'We are 95% sure the average salary is ₦100,000, plus or minus ₦2,940.' It tells you how precise your sample average is."
    },
    internalLogic: "Excel uses the formula: z * (sigma / √n), where z is the critical value for the normal distribution, sigma is the population standard deviation, and n is the sample size.",
    whyItExists: "Necessary for reporting the precision of data in large samples (usually n ≥ 30) where the population standard deviation is known or can be estimated.",
    whenToUse: "Use to calculate a confidence interval for a mean (Interval = Mean ± Result) when you have a large sample size.",
    realWorldUseCases: [
      "Calculating the margin of error for customer satisfaction scores.",
      "Determining the reliability of weight measurements in a factory.",
      "Estimating the precision of average delivery times."
    ],
    businessExample: {
      scenario: "Find the margin of error with 95% confidence (alpha 0.05), a standard deviation of 15, and a sample of 100.",
      formula: "=CONFIDENCE.NORM(0.05, 15, 100)"
    },
    syntax: "=CONFIDENCE.NORM(alpha, standard_dev, size)",
    syntaxBreakdown: [
      { arg: "alpha", desc: "The significance level (e.g., 0.05 for 95% confidence) (required)." },
      { arg: "standard_dev", desc: "The population standard deviation (assumed to be known) (required)." },
      { arg: "size", desc: "The sample size (number of observations) (required)." }
    ],
    detailedExamples: [
      {
        title: "Precision Estimate",
        table: {
          headers: ["Alpha", "Std Dev", "Sample Size", "Result (Margin)"],
          rows: [
            ["0.05", "15", "100", "2.94"]
          ]
        },
        stepByStep: [
          "For 95% confidence (alpha 0.05), the z-score is 1.96.",
          "Excel calculates: 1.96 * (15 / √100) = 1.96 * 1.5.",
          "Result: 2.94. You are 95% confident the true mean is within ±2.94 of your sample mean."
        ]
      }
    ],
    commonMistakes: [
      { title: "Alpha vs Confidence", desc: "Alpha is 1 minus the confidence level. For 95% confidence, use 0.05, not 95." },
      { title: "Small Sample", desc: "If your sample size is small (n < 30), it's better to use CONFIDENCE.T." },
      { title: "Sample vs Population Std Dev", desc: "NORM assumes you know the population standard deviation. If you only have sample data, use CONFIDENCE.T." }
    ],
    proTips: [
      "Confidence Interval = AVERAGE(data) ± CONFIDENCE.NORM(alpha, sigma, size).",
      "A smaller alpha (e.g., 0.01) will result in a larger margin of error (wider interval).",
      "Increasing the sample size (n) will decrease the margin of error, making your estimate more precise."
    ],
    relatedFunctions: ["CONFIDENCE.T", "NORM.S.INV", "STDEV.P"],
    miniChallenge: {
      question: "Find the margin of error for 95% confidence with sigma=8 and n=64.",
      expectedAnswer: "1.96"
    },
    practice: {
      instructions: "In cell B6, find the margin of error for a 90% confidence level (alpha 0.10), sigma of 25, and sample size of 200.",
      initialData: [["Parameter", "Value"], ["Alpha", 0.10], ["Std Dev", 25], ["Size", 200], ["", ""], ["Margin of Error", ""]],
      targetCell: [5, 1],
      expectedFormula: "CONFIDENCE.NORM(0.1,25,200)",
      expectedValue: 2.907
    }
  },
  {
    id: "confidence.t",
    title: "CONFIDENCE.T Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Margin of Error (T-Dist): CONFIDENCE.T",
      description: "Calculates the margin of error for a population mean using a Student's t-distribution.",
      concept: "This is the more realistic 'Plus or Minus' tool. Since we rarely know the 'true' population deviation and usually work with smaller samples, the T-distribution accounts for that extra uncertainty."
    },
    internalLogic: "Excel uses the formula: t * (s / √n), where t is the critical value for the t-distribution with n-1 degrees of freedom, s is the sample standard deviation, and n is the sample size.",
    whyItExists: "Unlike the normal distribution, the t-distribution is wider at the tails to account for the fact that we are estimating the standard deviation from a sample.",
    whenToUse: "Always use CONFIDENCE.T if you have a small sample (n < 30) or if you are using the sample standard deviation (which is almost always).",
    realWorldUseCases: [
      "Finding the margin of error for a small pilot study (e.g., 15 participants).",
      "Calculating reliability for monthly test scores.",
      "Estimating average production costs from a limited batch."
    ],
    businessExample: {
      scenario: "Calculate the 95% confidence margin for a small sample of 25 items with a sample standard deviation of 15.",
      formula: "=CONFIDENCE.T(0.05, 15, 25)"
    },
    syntax: "=CONFIDENCE.T(alpha, standard_dev, size)",
    syntaxBreakdown: [
      { arg: "alpha", desc: "The significance level (e.g., 0.05 for 95% confidence) (required)." },
      { arg: "standard_dev", desc: "The sample standard deviation (required)." },
      { arg: "size", desc: "The sample size (required)." }
    ],
    detailedExamples: [
      {
        title: "Small Sample Precision",
        table: {
          headers: ["Alpha", "Std Dev", "Size", "Result"],
          rows: [
            ["0.05", "15", "25", "6.19"]
          ]
        },
        stepByStep: [
          "With df=24 and alpha=0.05, the t-critical value is approximately 2.064.",
          "Excel calculates: 2.064 * (15 / √25) = 2.064 * 3.",
          "Result: 6.19. Note how this is much larger than the 2.94 from the Normal distribution!"
        ]
      }
    ],
    commonMistakes: [
      { title: "Sample size < 2", desc: "The sample size must be at least 2, or Excel returns a #DIV/0! error (because df = size - 1)." },
      { title: "Assuming it's same as NORM", desc: "CONFIDENCE.T provides a wider, safer margin of error than CONFIDENCE.NORM for the same data." }
    ],
    proTips: [
      "As your sample size increases, the result of CONFIDENCE.T gets closer and closer to CONFIDENCE.NORM.",
      "In most business and research contexts, CONFIDENCE.T is the 'safer' and more accurate choice.",
      "Pair with T.INV.2T to find the critical t-value manually."
    ],
    relatedFunctions: ["CONFIDENCE.NORM", "T.INV.2T", "STDEV.S"],
    miniChallenge: {
      question: "Which function gives a wider margin of error for a sample size of 10: CONFIDENCE.NORM or CONFIDENCE.T?",
      expectedAnswer: "CONFIDENCE.T"
    },
    practice: {
      instructions: "In cell B6, find the margin of error for a 95% confidence level (alpha 0.05), sample std dev of 20, and size of 10.",
      initialData: [["Parameter", "Value"], ["Alpha", 0.05], ["Std Dev", 20], ["Size", 10], ["", ""], ["Margin of Error", ""]],
      targetCell: [5, 1],
      expectedFormula: "CONFIDENCE.T(0.05,20,10)",
      expectedValue: 14.306
    }
  },
  {
    id: "correl",
    title: "CORREL Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Relationship Finder: CORREL",
      description: "Calculates the Pearson product-moment correlation coefficient between two sets of data.",
      concept: "It answers the question: 'Do these two things move together?' If I spend more on Ads, does Revenue go up? It returns a score between -1 and +1."
    },
    internalLogic: "It calculates the covariance of the two arrays divided by the product of their standard deviations. The result 'r' indicates the strength and direction of the linear relationship.",
    whyItExists: "Critical for identifying patterns. It helps businesses understand which variables are linked (e.g., Temperature and Ice Cream sales).",
    whenToUse: "Use to measure the strength of a relationship between two columns of numeric data.",
    realWorldUseCases: [
      "Analyzing the link between study hours and exam scores.",
      "Determining if advertising spend is correlated with sales growth.",
      "Checking the relationship between humidity and product shelf life."
    ],
    businessExample: {
      scenario: "Find the correlation between hours studied in A2:A6 and exam scores in B2:B6.",
      formula: "=CORREL(A2:A6, B2:B6)"
    },
    syntax: "=CORREL(array1, array2)",
    syntaxBreakdown: [
      { arg: "array1", desc: "The first range of cell values (required)." },
      { arg: "array2", desc: "The second range of cell values (must be same size) (required)." }
    ],
    detailedExamples: [
      {
        title: "Study vs. Scores",
        table: {
          headers: ["Hours", "Score", "Result"],
          rows: [
            ["2", "65", ""],
            ["3", "70", ""],
            ["5", "80", "0.9847"],
            ["4", "75", ""],
            ["6", "90", ""]
          ]
        },
        stepByStep: [
          "Input hours in column A and scores in column B.",
          "A result of 0.9847 means a very strong positive correlation.",
          "As study hours go up, scores reliably go up."
        ]
      }
    ],
    commonMistakes: [
      { title: "Mismatch sizes", desc: "If array1 and array2 have different numbers of cells, Excel returns #N/A." },
      { title: "Correlation vs Causation", desc: "Just because two things are correlated doesn't mean one CAUSES the other. They might both be caused by something else!" },
      { title: "Non-linear links", desc: "CORREL only measures straight-line relationships. It might miss a U-shaped pattern." }
    ],
    proTips: [
      "A score of +1.0 is a perfect positive relationship; -1.0 is a perfect negative relationship; 0 is no relationship.",
      "Always plot your data on a Scatter Chart to see the relationship visually.",
      "Square the result (r²) to find the 'Coefficient of Determination', which tells you what % of the variance is shared."
    ],
    relatedFunctions: ["PEARSON", "RSQ", "COVARIANCE.P", "SLOPE"],
    miniChallenge: {
      question: "If X={1,2,3} and Y={2,4,6}, what is the correlation coefficient?",
      expectedAnswer: "1"
    },
    practice: {
      instructions: "In cell B8, find the correlation between Temperature (A2:A6) and Sales (B2:B6).",
      initialData: [["Temp", "Sales"], [75, 120], [80, 150], [85, 180], [90, 200], [95, 230], ["", ""], ["CORREL", ""]],
      targetCell: [7, 1],
      expectedFormula: "CORREL(A2:A6,B2:B6)",
      expectedValue: 0.9959
    }
  },
  {
    id: "count",
    title: "COUNT Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "The Number counter: COUNT",
      description: "Counts the number of cells that contain numbers in a range or set of values.",
      concept: "Think of it as a inventory tool for numeric data. It ignores text, errors, and blanks, only tallying up the actual numbers (and dates)."
    },
    internalLogic: "Excel scans the provided arguments and increments the counter only for cells containing numeric values, including dates and formulas that return numbers.",
    whyItExists: "Useful for finding out how many data points you actually have in a dataset, regardless of how much text or empty space is mixed in.",
    whenToUse: "Use when you need to know how many entries in a column are numeric (e.g., 'How many people provided their age?').",
    realWorldUseCases: [
      "Counting how many sales were recorded in a month.",
      "Checking how many students submitted their numeric scores.",
      "Inventory: counting items where a price is listed."
    ],
    businessExample: {
      scenario: "An office manager wants to know how many employees provided a numeric 'Years of Service' value.",
      formula: "=COUNT(A2:A100)"
    },
    syntax: "=COUNT(value1, [value2], ...)",
    syntaxBreakdown: [
      { arg: "value1", desc: "The first item, cell reference, or range you want to count (required)." },
      { arg: "value2", desc: "Optional. Up to 255 additional items or ranges." }
    ],
    detailedExamples: [
      {
        title: "Numeric Inventory",
        table: {
          headers: ["Cell", "Value"],
          rows: [
            ["A2", "10"],
            ["A3", "20"],
            ["A4", "Text"],
            ["A5", "30"],
            ["A6", ""],
            ["A7", "TRUE"]
          ]
        },
        stepByStep: [
          "Excel checks A2, A3, A5: These are numbers. (Count = 3).",
          "A4 is text: Ignored.",
          "A6 is blank: Ignored.",
          "A7 is a logical value: Ignored.",
          "Final Result: 3."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with COUNTA", desc: "COUNT only tallies numbers. If you want to count EVERYTHING (text included), use COUNTA." },
      { title: "Numbers as Text", desc: "If a number is stored as text (it has a little green triangle), COUNT will ignore it." },
      { title: "Header Rows", desc: "Including headers in your range won't break the formula, but they won't be counted." }
    ],
    proTips: [
      "Use COUNT to verify that a column that *should* be all numbers doesn't have text errors.",
      "Combine with IF for conditional counting: =COUNT(IF(A2:A10>10, A2:A10)) (as an array formula).",
      "Pair with COUNTA to find the percentage of a range that is numeric."
    ],
    relatedFunctions: ["COUNTA", "COUNTIF", "COUNTIFS", "COUNTBLANK"],
    miniChallenge: {
      question: "Count the numbers in this set: {45, 'N/A', 32, '', 67, TRUE}. What is the result?",
      expectedAnswer: "3"
    },
    practice: {
      instructions: "In cell B8, count the numeric values in the Amount column (B2:B6).",
      initialData: [["Order", "Amount"], ["001", 50], ["002", "N/A"], ["003", 75], ["004", ""], ["005", "#VALUE!"], ["", ""], ["COUNT", ""]],
      targetCell: [7, 1],
      expectedFormula: "COUNT(B2:B6)",
      expectedValue: 2
    }
  },
  {
    id: "counta",
    title: "COUNTA Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "The All-Purpose Counter: COUNTA",
      description: "Counts the number of cells that are not empty in a range.",
      concept: "Think of it as 'Count Anything'. If a cell has something in it—text, numbers, errors, or even just a space—COUNTA will count it. Only truly empty cells are ignored."
    },
    internalLogic: "Excel checks every cell in the range. If the cell's value is anything other than NULL (blank), it adds 1 to the total.",
    whyItExists: "Essential for measuring the completeness of a dataset or finding out how many rows of data you have, regardless of the data type.",
    whenToUse: "Use to count text entries, find the size of a list, or check how many people responded to a question.",
    realWorldUseCases: [
      "Counting how many names are in an employee list.",
      "Checking how many tasks in a project have a status.",
      "Counting total items in an inventory list including those with error messages."
    ],
    businessExample: {
      scenario: "A project lead wants to know how many employees have 'Task Status' entries, even if those entries say 'Error'.",
      formula: "=COUNTA(B2:B50)"
    },
    syntax: "=COUNTA(value1, [value2], ...)",
    syntaxBreakdown: [
      { arg: "value1", desc: "The first item, cell reference, or range you want to count (required)." },
      { arg: "value2", desc: "Optional. Up to 255 additional items or ranges." }
    ],
    detailedExamples: [
      {
        title: "Completeness Check",
        table: {
          headers: ["Type", "Value"],
          rows: [
            ["Number", "100"],
            ["Text", "Hello"],
            ["Logical", "TRUE"],
            ["Error", "#DIV/0!"],
            ["Blank", ""]
          ]
        },
        stepByStep: [
          "Excel checks the first 4 rows: all contain data. (Count = 4).",
          "The 5th row is empty.",
          "Final Result: 4."
        ]
      }
    ],
    commonMistakes: [
      { title: "The 'Invisible' Space", desc: "If a cell looks empty but has a space (' ') in it, COUNTA will count it. This is a common cause of 'wrong' totals." },
      { title: "Formulas returning empty text", desc: "If a formula returns \"\", COUNTA counts that cell as non-empty. Use COUNTBLANK if you need to find true empties." }
    ],
    proTips: [
      "Use COUNTA to find the 'Last Row' of a dynamic list.",
      "Pair with COUNT to find how many non-numeric (text) values are in a range: =COUNTA(range) - COUNT(range).",
      "Essential for creating dynamic named ranges."
    ],
    relatedFunctions: ["COUNT", "COUNTBLANK", "COUNTIF", "ISBLANK"],
    miniChallenge: {
      question: "How many items will COUNTA find in: {'Apple', 5, '', FALSE, #N/A, null}?",
      expectedAnswer: "5"
    },
    practice: {
      instructions: "In cell B8, use COUNTA to find how many statuses have been entered in B2:B6.",
      initialData: [["ID", "Status"], [1, "Complete"], [2, ""], [3, "Pending"], [4, "Complete"], [5, ""], ["", ""], ["COUNTA", ""]],
      targetCell: [7, 1],
      expectedFormula: "COUNTA(B2:B6)",
      expectedValue: 3
    }
  },
{
    id: "countblank",
    title: "COUNTBLANK Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Finding Empty Spaces: COUNTBLANK",
      description: "The COUNTBLANK function identifies and counts the number of empty cells within a specified range.",
      concept: "Think of it as a completeness checker. It scans your data to find where information is missing, which is crucial for data cleaning and quality control."
    },
    internalLogic: "Excel scans each cell in the specified range. It counts cells that are completely empty and cells with formulas returning \"\" (empty string). It does not count cells with spaces, zeros, or errors.",
    whyItExists: "Data completeness is vital for accurate analysis. COUNTBLANK helps quickly identify missing data points in large datasets without manual inspection.",
    whenToUse: "Use to check if mandatory fields are filled, or to see how many rows in a dataset are missing key information.",
    realWorldUseCases: [
      "Checking for missing customer email addresses.",
      "Quality check for mandatory survey responses.",
      "Identifying gaps in a production log."
    ],
    businessExample: {
      scenario: "A manager wants to know how many products in a list don't have a status assigned.",
      formula: "=COUNTBLANK(B2:B6)"
    },
    syntax: "=COUNTBLANK(range)",
    syntaxBreakdown: [
      { arg: "range", desc: "The range of cells to evaluate (required)." }
    ],
    detailedExamples: [
      {
        title: "Inventory Status Check",
        table: {
          headers: ["Item", "Status"],
          rows: [
            ["Apple", "Sold"],
            ["Banana", ""],
            ["Cherry", "Sold"],
            ["Date", ""],
            ["Elderberry", ""]
          ]
        },
        stepByStep: [
          "Excel scans the range B2:B6.",
          "It identifies that B3, B5, and B6 are empty.",
          "The count of blank cells is 3.",
          "Result: 3."
        ]
      }
    ],
    commonMistakes: [
      { title: "Thinking spaces are blank.", desc: "Cells containing a space (\" \") are NOT counted as blank." },
      { title: "Forgetting zero-length strings.", desc: "Formula results that return \"\" ARE counted as blank." }
    ],
    proTips: [
      "Use to check data completeness: COUNTA + COUNTBLANK = total rows.",
      "Combine with IF to flag incomplete records: =IF(COUNTBLANK(A2:D2)>0, \"Incomplete\", \"Complete\")"
    ],
    relatedFunctions: ["COUNTA", "COUNTIF", "ISBLANK"],
    miniChallenge: {
      question: "Range A1:A5 contains: \"Data\", \"\", 0, \" \", and a formula returning \"\". What does COUNTBLANK return?",
      expectedAnswer: "2"
    },
    practice: {
      instructions: "In cell B7, use COUNTBLANK to find how many ages are missing in B2:B5.",
      initialData: [["Name", "Age", "City"], ["John", 25, "NYC"], ["Sarah", "", "Boston"], ["Mike", 30, ""], ["Emma", "", ""]],
      targetCell: [6, 1],
      expectedFormula: "COUNTBLANK(B2:B5)",
      expectedValue: 2
    }
  },
{
    id: "countif",
    title: "COUNTIF Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "Targeted Counting: COUNTIF",
      description: "The COUNTIF function counts the number of cells within a range that meet a single specified criterion.",
      concept: "Think of it as a selective counter: 'Go through this list and tell me how many times you see the word Widget' or 'How many sales were greater than 400?'"
    },
    internalLogic: "Excel evaluates each cell in the range against the criteria. If the cell matches, the counter increases by one. It supports numbers, text, and logical expressions using wildcards.",
    whyItExists: "Filtering and manually counting specific items in large lists is slow and error-prone. COUNTIF automates this, providing instant answers to frequency-based questions.",
    whenToUse: "Use when you need to count items that match one specific condition (e.g., specific product name, status, or value threshold).",
    realWorldUseCases: [
      "Counting how many times a specific employee appears in a shift log.",
      "Finding how many products are currently 'Out of Stock'.",
      "Counting transactions that exceed a certain dollar amount."
    ],
    businessExample: {
      scenario: "A sales manager wants to know how many 'Widget' sales are in the product list.",
      formula: "=COUNTIF(A2:A6, \"Widget\")"
    },
    syntax: "=COUNTIF(range, criteria)",
    syntaxBreakdown: [
      { arg: "range", desc: "The range of cells to evaluate (required)." },
      { arg: "criteria", desc: "The condition that determines which cells to count. Can be a number, expression, cell reference, or text (required)." }
    ],
    detailedExamples: [
      {
        title: "Product and Sales Counting",
        table: {
          headers: ["Product", "Sales"],
          rows: [
            ["Widget", "500"],
            ["Gadget", "300"],
            ["Widget", "450"],
            ["Gizmo", "600"],
            ["Widget", "350"]
          ]
        },
        stepByStep: [
          "For =COUNTIF(A2:A6, \"Widget\"): Excel finds \"Widget\" in rows 2, 4, and 6. Result: 3.",
          "For =COUNTIF(B2:B6, \">400\"): Excel finds values 500, 450, and 600. Result: 3."
        ]
      }
    ],
    commonMistakes: [
      { title: "Wrong reference syntax.", desc: "Use \">\"&D1 instead of \">D1\" when referencing a cell." },
      { title: "Case sensitivity.", desc: "COUNTIF is case-insensitive: \"WIDGET\" matches \"widget\"." }
    ],
    proTips: [
      "Use \"?\" for a single character wildcard (e.g., \"Sm?th\") and \"*\" for multiple characters (e.g., \"North*\").",
      "Use the tilde (~) to escape wildcards if you need to find a literal asterisk or question mark: \"~*\"."
    ],
    relatedFunctions: ["COUNTIFS", "SUMIF", "AVERAGEIF"],
    miniChallenge: {
      question: "How do you count cells in B1:B10 containing values between 50 and 100 (exclusive)?",
      expectedAnswer: "=COUNTIF(B1:B10, \">50\") - COUNTIF(B1:B10, \">=100\")"
    },
    practice: {
      instructions: "In cell B8, count how many times 'East' appears in A2:A6.",
      initialData: [["Region", "Revenue"], ["East", 1000], ["West", 800], ["East", 1200], ["North", 950], ["East", 1100], ["", ""], ["Count East", ""]],
      targetCell: [7, 1],
      expectedFormula: "COUNTIF(A2:A6,\"East\")",
      expectedValue: 3
    }
  },
{
    id: "countifs",
    title: "COUNTIFS Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Multi-Criteria Counting: COUNTIFS",
      description: "The COUNTIFS function applies multiple criteria to different ranges and counts the number of times all criteria are met simultaneously.",
      concept: "Think of it as an 'AND' counter. It only counts a row if it satisfies every condition you set — like 'Count where Region is North AND Sales are > 400'."
    },
    internalLogic: "Excel evaluates each range/criteria pair. A count is only recorded if all conditions for that row are TRUE. Each criteria_range must be the same size as the first one.",
    whyItExists: "Standard business questions often involve multiple variables. COUNTIFS allows you to analyze the intersection of different data points without complex filtering.",
    whenToUse: "Use when you need to count based on two or more criteria (e.g., Dept = IT AND Level = Senior).",
    realWorldUseCases: [
      "Counting employees who are both 'Full Time' and 'Senior'.",
      "Finding how many 'Red' items in size 'Large' are in stock.",
      "Counting orders from a specific customer that were over $500."
    ],
    businessExample: {
      scenario: "A manager wants to count how many 'North' region sales were also 'Widgets'.",
      formula: "=COUNTIFS(A2:A6, \"North\", B2:B6, \"Widget\")"
    },
    syntax: "=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    syntaxBreakdown: [
      { arg: "criteria_range1", desc: "The first range to evaluate (required)." },
      { arg: "criteria1", desc: "The condition for the first range (required)." },
      { arg: "criteria_range2, criteria2", desc: "Additional range/criteria pairs (optional, up to 127 pairs)." }
    ],
    detailedExamples: [
      {
        title: "Regional Product Analysis",
        table: {
          headers: ["Region", "Product", "Sales"],
          rows: [
            ["North", "Widget", "500"],
            ["South", "Gadget", "300"],
            ["North", "Gadget", "450"],
            ["East", "Widget", "600"],
            ["North", "Widget", "350"]
          ]
        },
        stepByStep: [
          "For North & Widget: Row 2 and Row 6 match both. Result: 2.",
          "For North & Sales > 400: Row 2 (500) and Row 4 (450) match both. Result: 2."
        ]
      }
    ],
    commonMistakes: [
      { title: "Mismatched range sizes.", desc: "All criteria ranges must have the same number of rows and columns." },
      { title: "Expecting OR logic.", desc: "COUNTIFS uses AND logic. To count A OR B, add two COUNTIF functions together." }
    ],
    proTips: [
      "Use for date ranges: =COUNTIFS(A:A, \">=\"&DATE(2024,1,1), A:A, \"<=\"&DATE(2024,1,31)).",
      "Nest within SUMPRODUCT for even more complex logical counting."
    ],
    relatedFunctions: ["COUNTIF", "SUMIFS", "AVERAGEIFS"],
    miniChallenge: {
      question: "Count orders from East region with quantity >10 placed in January 2024. How many criteria pairs do you need?",
      expectedAnswer: "4 (Region, Quantity, Start Date, End Date)"
    },
    practice: {
      instructions: "In cell B8, count how many 'IT' employees are 'Senior' (Dept in A2:A6, Level in B2:B6).",
      initialData: [["Dept", "Level", "Salary"], ["IT", "Senior", 85000], ["HR", "Junior", 55000], ["IT", "Senior", 92000], ["IT", "Junior", 60000], ["Sales", "Senior", 78000], ["", "", ""], ["IT & Senior", ""]],
      targetCell: [7, 1],
      expectedFormula: "COUNTIFS(A2:A6,\"IT\",B2:B6,\"Senior\")",
      expectedValue: 2
    }
  },
{
    id: "covariance.p",
    title: "COVARIANCE.P Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Population Relationship: COVARIANCE.P",
      description: "The COVARIANCE.P function calculates the population covariance, which measures the directional relationship between two data sets representing an entire population.",
      concept: "Think of it as a way to see if two things move together: if Stock X goes up, does Stock Y also go up? COVARIANCE.P gives you a number representing that joint variability."
    },
    internalLogic: "Excel calculates the mean of both arrays, finds the deviation of each point from its respective mean, multiplies the paired deviations, and averages those products using N (the population size).",
    whyItExists: "In finance and science, understanding how variables change together is critical for risk assessment and predictive modeling.",
    whenToUse: "Use COVARIANCE.P when you have data for every member of the group you are studying (the full population).",
    realWorldUseCases: [
      "Analyzing the relationship between two internal company metrics.",
      "Measuring how different city-wide weather patterns move together.",
      "Evaluating the joint risk of all assets in a fixed portfolio."
    ],
    businessExample: {
      scenario: "An analyst wants to see how the returns of two specific stocks in a controlled portfolio move together.",
      formula: "=COVARIANCE.P(A2:A6, B2:B6)"
    },
    syntax: "=COVARIANCE.P(array1, array2)",
    syntaxBreakdown: [
      { arg: "array1", desc: "The first range of cell values (required)." },
      { arg: "array2", desc: "The second range of cell values (required, must be same size as array1)." }
    ],
    detailedExamples: [
      {
        title: "Stock Movement Analysis",
        table: {
          headers: ["Stock X", "Stock Y"],
          rows: [
            ["12%", "8%"],
            ["15%", "10%"],
            ["9%", "7%"],
            ["14%", "11%"],
            ["10%", "6%"]
          ]
        },
        stepByStep: [
          "Excel calculates means: Stock X = 12%, Stock Y = 8.4%.",
          "It finds deviations for each pair and multiplies them.",
          "It sums these cross-products and divides by 5 (population size).",
          "Result: 0.00052 (indicates they move in the same direction)."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with COVARIANCE.S.", desc: "The .P version uses N as the denominator, while .S uses N-1 for sample data." },
      { title: "Different sized arrays.", desc: "Both arrays MUST have the exact same number of data points." }
    ],
    proTips: [
      "A positive value means variables move together; a negative value means they move in opposite directions.",
      "For a standardized measure (between -1 and +1), use the CORREL function instead.",
      "Be consistent with units: don't mix 12% (0.12) with whole numbers (12)."
    ],
    relatedFunctions: ["COVARIANCE.S", "CORREL", "STDEV.P"],
    miniChallenge: {
      question: "If X={2,4,6,8,10} and Y={3,6,9,12,15}, is the COVARIANCE.P positive or negative?",
      expectedAnswer: "Positive"
    },
    practice: {
      instructions: "In cell B8, calculate the population covariance for Height (B2:B6) and Weight (C2:C6).",
      initialData: [["", "Height", "Weight"], ["", 65, 140], ["", 70, 165], ["", 68, 155], ["", 72, 180], ["", 67, 150], ["", "", ""], ["COVARIANCE.P", ""]],
      targetCell: [7, 1],
      expectedFormula: "COVARIANCE.P(B2:B6,C2:C6)",
      expectedValue: 32.8
    }
  },
{
    id: "covariance.s",
    title: "COVARIANCE.S Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Sample Relationship: COVARIANCE.S",
      description: "The COVARIANCE.S function calculates the sample covariance, used when your data is a sample of a larger population.",
      concept: "It estimates how much two variables change together, but applies a correction (N-1) to provide an unbiased estimate for the broader population."
    },
    internalLogic: "Formula: Cov(X,Y) = Σ(xi - x̄)(yi - ȳ) / (n-1). It finds the sum of the products of the deviations and divides by the sample size minus one.",
    whyItExists: "Most data we work with is only a sample. COVARIANCE.S is mathematically adjusted to be more accurate when projecting sample findings to a whole population.",
    whenToUse: "Use COVARIANCE.S for almost all real-world data analysis where you don't have every single data point possible.",
    realWorldUseCases: [
      "Estimating the relationship between study hours and exam scores based on a class sample.",
      "Analyzing how marketing spend relates to revenue using monthly data points.",
      "Predicting how two crops will react to the same fertilizer based on trial plots."
    ],
    businessExample: {
      scenario: "A researcher wants to estimate the relationship between study hours and GPA from a small group of students.",
      formula: "=COVARIANCE.S(A2:A6, B2:B6)"
    },
    syntax: "=COVARIANCE.S(array1, array2)",
    syntaxBreakdown: [
      { arg: "array1", desc: "The first data set (required)." },
      { arg: "array2", desc: "The second data set (required, must be same dimensions as array1)." }
    ],
    detailedExamples: [
      {
        title: "Study Hours vs GPA",
        table: {
          headers: ["Study Hrs", "GPA"],
          rows: [
            ["2", "2.5"],
            ["3", "3.0"],
            ["4", "3.5"],
            ["5", "3.8"],
            ["6", "4.0"]
          ]
        },
        stepByStep: [
          "Excel finds sample means: Hrs = 4, GPA = 3.36.",
          "Calculates cross-products of deviations.",
          "Divides the sum of cross-products (3.4) by (5-1) = 4.",
          "Result: 0.85."
        ]
      }
    ],
    commonMistakes: [
      { title: "Expecting a percentage.", desc: "Covariance is not standardized like correlation; the result can be any number." },
      { title: "Ignoring array size.", desc: "If array sizes don't match, you'll get a #N/A error." }
    ],
    proTips: [
      "Use COVARIANCE.S when inferring population behavior from a smaller sample.",
      "Convert to correlation for a more intuitive measure: r = Cov(X,Y) / (sx × sy).",
      "Because it uses N-1, the result will always be slightly larger than COVARIANCE.P for the same data."
    ],
    relatedFunctions: ["COVARIANCE.P", "CORREL", "STDEV.S"],
    miniChallenge: {
      question: "Find the sample covariance of X={1,3,5,7} and Y={2,4,6,8}.",
      expectedAnswer: "6.666..."
    },
    practice: {
      instructions: "In cell B8, calculate the sample covariance for Advertising (B2:B6) and Revenue (C2:C6).",
      initialData: [["", "Advertising", "Revenue"], ["", 1000, 15000], ["", 1500, 22000], ["", 2000, 28000], ["", 2500, 34000], ["", 3000, 40000], ["", "", ""], ["COVARIANCE.S", ""]],
      targetCell: [7, 1],
      expectedFormula: "COVARIANCE.S(B2:B6,C2:C6)",
      expectedValue: 7750000
    }
  },
{
    id: "devsq",
    title: "DEVSQ Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Sum of Squared Deviations: DEVSQ",
      description: "The DEVSQ function calculates the sum of the squares of deviations of data points from their sample mean.",
      concept: "Think of it as measuring the 'total spread' of your data. It answers: how much do all these numbers, combined, stray from their average?"
    },
    internalLogic: "Excel finds the mean of the values, subtracts the mean from each value (the deviation), squares each result, and then sums all those squares together. Formula: Σ(x - x̄)².",
    whyItExists: "It is a fundamental component for calculating variance and standard deviation, and is used extensively in regression analysis to find the 'Sum of Squares Error'.",
    whenToUse: "Use DEVSQ when you need to calculate variance components manually or measure total data dispersion.",
    realWorldUseCases: [
      "Calculating the sum of squared errors (SSE) in a forecast.",
      "Internal step for building custom statistical models.",
      "Analyzing the stability of scientific readings over time."
    ],
    businessExample: {
      scenario: "An engineer wants to find the total squared variation of a series of pressure readings.",
      formula: "=DEVSQ(A2:A6)"
    },
    syntax: "=DEVSQ(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number or range of values (required)." },
      { arg: "number2", desc: "Additional numbers or ranges (optional, up to 255)." }
    ],
    detailedExamples: [
      {
        title: "Manual Spread Calculation",
        table: {
          headers: ["Value", "Deviation (x-x̄)", "Squared Dev"],
          rows: [
            ["10", "-20", "400"],
            ["20", "-10", "100"],
            ["30", "0", "0"],
            ["40", "10", "100"],
            ["50", "20", "400"]
          ]
        },
        stepByStep: [
          "Mean (x̄) = (10+20+30+40+50)/5 = 30.",
          "Deviations: 10-30 = -20, 20-30 = -10, etc.",
          "Sum of Squared Deviations: 400 + 100 + 0 + 100 + 400.",
          "Result: 1000."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with SUMSQ.", desc: "SUMSQ squares the numbers directly (x²), while DEVSQ squares the difference from the mean (x-x̄)²." },
      { title: "Non-numeric handling.", desc: "Text and blanks in the range are ignored, which can lead to a different 'N' than you might expect if calculating manually." }
    ],
    proTips: [
      "Quick check: DEVSQ = SUMSQ(range) - (SUM(range)² / COUNT(range)).",
      "Relationship to variance: Variance = DEVSQ / (n-1).",
      "Result is always zero if all numbers in the set are identical."
    ],
    relatedFunctions: ["SUMSQ", "VAR.S", "STDEV.S"],
    miniChallenge: {
      question: "Find the DEVSQ of the set: {5, 5, 5, 5, 5}. What does the result tell you?",
      expectedAnswer: "0 (No variation from the mean)"
    },
    practice: {
      instructions: "In cell B8, calculate the DEVSQ for the readings in B2:B6.",
      initialData: [["", "Reading"], ["", 12.5], ["", 13.1], ["", 12.8], ["", 13.0], ["", 12.9], ["", ""], ["DEVSQ", ""]],
      targetCell: [7, 1],
      expectedFormula: "DEVSQ(B2:B6)",
      expectedValue: 0.212
    }
  },
{
    id: "expon.dist",
    title: "EXPON.DIST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Modeling Time: EXPON.DIST",
      description: "The EXPON.DIST function calculates the exponential distribution, which is used to model the time or distance between independent events occurring at a constant average rate.",
      concept: "Think of it as the 'waiting time' distribution. If you know how often events happen on average (like customers entering a shop), EXPON.DIST tells you the probability of waiting a certain amount of time for the next one."
    },
    internalLogic: "Excel uses the parameter lambda (rate). For the Probability Density Function (PDF), it uses: f(x) = λe^(-λx). For the Cumulative Distribution Function (CDF), it uses: F(x) = 1 - e^(-λx).",
    whyItExists: "It is the mathematical foundation for reliability analysis (time to failure) and queuing theory (waiting in line).",
    whenToUse: "Use to calculate probabilities related to intervals, such as 'What is the chance a part lasts more than 100 hours?' or 'What is the probability a customer arrives within 5 minutes?'",
    realWorldUseCases: [
      "Predicting the time until the next radioactive decay.",
      "Estimating the time between phone calls at a service center.",
      "Calculating the survival probability of a machine part."
    ],
    businessExample: {
      scenario: "A service manager wants to find the probability that a customer will arrive within 0.5 minutes, given an average rate of 2 arrivals per minute.",
      formula: "=EXPON.DIST(0.5, 2, TRUE)"
    },
    syntax: "=EXPON.DIST(x, lambda, cumulative)",
    syntaxBreakdown: [
      { arg: "x", desc: "The value of the function (must be ≥ 0) (required)." },
      { arg: "lambda", desc: "The rate parameter (must be > 0) (required)." },
      { arg: "cumulative", desc: "A logical value: TRUE for CDF (probability ≤ x), FALSE for PDF (required)." }
    ],
    detailedExamples: [
      {
        title: "Waiting Time Probability",
        table: {
          headers: ["Wait Time (x)", "Rate (λ)", "Cumulative", "Probability"],
          rows: [
            ["0.5", "2", "TRUE", "0.6321"],
            ["0.5", "2", "FALSE", "0.7358"]
          ]
        },
        stepByStep: [
          "At x=0.5 with λ=2: CDF = 1 - e^(-2 * 0.5) = 1 - e^(-1) ≈ 0.6321.",
          "This means there is a 63.21% chance the next event happens within 0.5 units of time.",
          "The PDF (FALSE) returns 0.7358, which is the height of the curve at that point."
        ]
      }
    ],
    commonMistakes: [
      { title: "Negative x values.", desc: "The exponential distribution is only defined for x ≥ 0." },
      { title: "Lambda as mean.", desc: "Lambda is the RATE (1/mean). If arrivals happen every 10 mins, lambda is 0.1, not 10." }
    ],
    proTips: [
      "The mean of the distribution is 1/lambda.",
      "The 'Memoryless' property: the probability of an event happening in the next hour is the same regardless of how long you have already waited.",
      "For survival probability (chance it takes LONGER than x), use: =1 - EXPON.DIST(x, lambda, TRUE)."
    ],
    relatedFunctions: ["POISSON.DIST", "GAMMA.DIST", "NORM.DIST"],
    miniChallenge: {
      question: "If arrivals average 10 minutes (λ=0.1), what formula finds the chance of an arrival within 5 minutes?",
      expectedAnswer: "=EXPON.DIST(5, 0.1, TRUE)"
    },
    practice: {
      instructions: "In cell B6, calculate the CDF probability for x=3 and Lambda=0.4.",
      initialData: [["Parameter", "Value"], ["x", 3], ["Lambda", 0.4], ["Cumulative", "TRUE"], ["", ""], ["CDF", ""]],
      targetCell: [5, 1],
      expectedFormula: "EXPON.DIST(3,0.4,TRUE)",
      expectedValue: 0.6988
    }
  },
{
    id: "f.dist",
    title: "F.DIST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Comparing Variances: F.DIST",
      description: "The F.DIST function returns the F probability distribution, typically used to compare the degree of diversity (variance) in two data sets.",
      concept: "It helps determine if the differences between groups are significantly larger than the differences within groups, which is the core of ANOVA (Analysis of Variance)."
    },
    internalLogic: "The F-distribution is the ratio of two independent chi-square variables. Excel calculates the area under this curve from 0 to x (for CDF).",
    whyItExists: "Essential for hypothesis testing in regression and experimental design to see if a model or treatment has a significant effect.",
    whenToUse: "Use F.DIST to find p-values in ANOVA or when comparing the variances of two populations.",
    realWorldUseCases: [
      "Testing if three different fertilizers produce different crop yields.",
      "Determining if the variance of a new production process is less than the old one.",
      "Calculating significance in multiple linear regression."
    ],
    businessExample: {
      scenario: "A quality control analyst wants to find the probability of observing an F-statistic of 2.5 or less with specific degrees of freedom.",
      formula: "=F.DIST(2.5, 3, 10, TRUE)"
    },
    syntax: "=F.DIST(x, deg_freedom1, deg_freedom2, cumulative)",
    syntaxBreakdown: [
      { arg: "x", desc: "The value to evaluate (must be ≥ 0) (required)." },
      { arg: "deg_freedom1", desc: "The numerator degrees of freedom (required)." },
      { arg: "deg_freedom2", desc: "The denominator degrees of freedom (required)." },
      { arg: "cumulative", desc: "TRUE for CDF, FALSE for PDF (required)." }
    ],
    detailedExamples: [
      {
        title: "F-Distribution Probability",
        table: {
          headers: ["F-Value (x)", "df1", "df2", "Cumulative", "Result"],
          rows: [
            ["2.5", "3", "10", "TRUE", "0.8732"],
            ["2.5", "3", "10", "FALSE", "0.1181"]
          ]
        },
        stepByStep: [
          "With df1=3 and df2=10, Excel calculates the probability curve.",
          "Result 0.8732 means 87.32% of the distribution is at or below 2.5.",
          "This leaves 12.68% in the right tail (often the area of interest for p-values)."
        ]
      }
    ],
    commonMistakes: [
      { title: "Reversing df1 and df2.", desc: "The order of degrees of freedom matters; swapping them changes the curve shape." },
      { title: "Confusing with F.DIST.RT.", desc: "F.DIST returns the left-tail; F.DIST.RT returns the right-tail directly (1 - F.DIST)." }
    ],
    proTips: [
      "df1 usually relates to the number of groups or variables being tested.",
      "df2 usually relates to the number of observations minus the number of groups.",
      "Use F.INV to find the 'critical value' for a specific significance level."
    ],
    relatedFunctions: ["F.INV", "F.TEST", "CHISQ.DIST", "T.DIST"],
    miniChallenge: {
      question: "What is the result of F.DIST(0, df1, df2, TRUE)?",
      expectedAnswer: "0 (The F-distribution starts at 0)"
    },
    practice: {
      instructions: "In cell B7, find the F.DIST CDF for x=1.8, df1=2, and df2=15.",
      initialData: [["Parameter", "Value"], ["x", 1.8], ["df1", 2], ["df2", 15], ["Cumulative", "TRUE"], ["", ""], ["CDF", ""]],
      targetCell: [6, 1],
      expectedFormula: "F.DIST(1.8,2,15,TRUE)",
      expectedValue: 0.799
    }
  },
{
    id: "f.inv",
    title: "F.INV Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Finding Critical Values: F.INV",
      description: "The F.INV function returns the inverse of the F probability distribution. It finds the F-value that corresponds to a specific left-tail probability.",
      concept: "Think of it as the reverse of F.DIST. Instead of 'What is the probability of this F-value?', you ask 'What F-value gives me this probability?' This is how we find 'critical values' for statistical tests."
    },
    internalLogic: "Excel uses an iterative numerical search technique to find a value x such that F.DIST(x, df1, df2, TRUE) equals the specified probability.",
    whyItExists: "Analysts need to know the 'cutoff point' (critical value) to decide whether to reject a null hypothesis at a certain confidence level (like 95%).",
    whenToUse: "Use F.INV when you are performing an F-test manually and need to know the threshold value to compare against your calculated F-statistic.",
    realWorldUseCases: [
      "Determining the threshold for significance in an ANOVA test.",
      "Finding confidence interval bounds for the ratio of two variances.",
      "Statistical quality control to determine if variations are within acceptable limits."
    ],
    businessExample: {
      scenario: "An analyst wants to find the 95th percentile (the cutoff for alpha=0.05) of an F-distribution.",
      formula: "=F.INV(0.95, 3, 10)"
    },
    syntax: "=F.INV(probability, deg_freedom1, deg_freedom2)",
    syntaxBreakdown: [
      { arg: "probability", desc: "A probability associated with the F cumulative distribution (between 0 and 1) (required)." },
      { arg: "deg_freedom1", desc: "The numerator degrees of freedom (required)." },
      { arg: "deg_freedom2", desc: "The denominator degrees of freedom (required)." }
    ],
    detailedExamples: [
      {
        title: "Critical Value Calculation",
        table: {
          headers: ["Probability", "df1", "df2", "F-Value (Result)"],
          rows: [
            ["0.95", "3", "10", "3.7083"]
          ]
        },
        stepByStep: [
          "You specify a 95% left-tail probability (equivalent to a 5% right-tail).",
          "Excel identifies that 95% of the curve area is to the left of 3.7083.",
          "If your calculated F-statistic is greater than 3.7083, the result is 'statistically significant' at the 0.05 level."
        ]
      }
    ],
    commonMistakes: [
      { title: "Alpha vs 1-Alpha.", desc: "For a 5% significance level, you usually need the 95% point (0.95), not 0.05 (which is the very far left tail)." },
      { title: "Probability outside bounds.", desc: "Probability must be between 0 and 1 (exclusive)." }
    ],
    proTips: [
      "For a standard 5% significance test, use 0.95 as the probability.",
      "The right-tail version F.INV.RT(alpha, df1, df2) is equivalent to F.INV(1-alpha, df1, df2).",
      "Check your work: =F.DIST(F.INV(0.95, 3, 10), 3, 10, TRUE) should return 0.95."
    ],
    relatedFunctions: ["F.DIST", "F.INV.RT", "T.INV", "NORM.S.INV"],
    miniChallenge: {
      question: "Find the critical value for α=0.05 with df1=2 and df2=12. Should you use 0.05 or 0.95 as the probability?",
      expectedAnswer: "0.95"
    },
    practice: {
      instructions: "In cell B6, find the F-value for a cumulative probability of 0.99 with df1=5 and df2=25.",
      initialData: [["Parameter", "Value"], ["Probability", 0.99], ["df1", 5], ["df2", 25], ["", ""], ["F.INV Result", ""]],
      targetCell: [5, 1],
      expectedFormula: "F.INV(0.99,5,25)",
      expectedValue: 3.855
    }
  },
{
    id: "f.test",
    title: "F.TEST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Equality of Variances: F.TEST",
      description: "The F.TEST function returns the result of an F-test, which is the two-tailed probability that the variances in two arrays are not significantly different.",
      concept: "It's like a 'consistency checker' between two groups. Before you compare their averages, you use F.TEST to see if one group is much more 'scattered' than the other."
    },
    internalLogic: "Excel calculates the sample variances of both arrays, computes the F-statistic (s1²/s2²), and then returns the two-tailed p-value based on the F-distribution.",
    whyItExists: "Standard t-tests require knowing whether the two groups have equal or unequal variances. F.TEST provides the evidence needed to make that choice.",
    whenToUse: "Use F.TEST before performing a t-test to determine if you should use the 'Equal Variances' or 'Unequal Variances' version of the test.",
    realWorldUseCases: [
      "Comparing the consistency of two different manufacturing methods.",
      "Testing if two different investment portfolios have the same level of risk (volatility).",
      "Analyzing if two groups of students have a similar spread in their test scores."
    ],
    businessExample: {
      scenario: "A production manager wants to know if Method A and Method B produce parts with the same level of consistency.",
      formula: "=F.TEST(A2:A6, B2:B5)"
    },
    syntax: "=F.TEST(array1, array2)",
    syntaxBreakdown: [
      { arg: "array1", desc: "The first set of data points (required)." },
      { arg: "array2", desc: "The second set of data points (required, can be a different size than array1)." }
    ],
    detailedExamples: [
      {
        title: "Variance Consistency Test",
        table: {
          headers: ["Method A", "Method B"],
          rows: [
            ["85", "78"],
            ["90", "82"],
            ["88", "85"],
            ["92", "80"],
            ["86", ""]
          ]
        },
        stepByStep: [
          "Excel calculates the variance for Method A and Method B.",
          "It computes the F-ratio and determines the p-value.",
          "Result: 0.0421.",
          "Since 0.0421 < 0.05, the variances are significantly different. You should use an 'Unequal Variance' t-test."
        ]
      }
    ],
    commonMistakes: [
      { title: "Interpreting as a test of means.", desc: "F.TEST checks if the *spread* (variance) is the same, not the average. Use T.TEST for means." },
      { title: "One-tailed vs Two-tailed.", desc: "F.TEST always returns the two-tailed p-value." }
    ],
    proTips: [
      "If F.TEST returns a value < 0.05, the variances are likely different.",
      "Part of the 'homoscedasticity' testing required for many advanced statistical models.",
      "It doesn't matter which array you select first; Excel handles the ratio correctly."
    ],
    relatedFunctions: ["T.TEST", "VAR.S", "F.DIST"],
    miniChallenge: {
      question: "Array1={12,15,18,20}, Array2={8,10,12,14}. If F.TEST returns 0.55, are the variances significantly different?",
      expectedAnswer: "No (0.55 is much larger than 0.05)"
    },
    practice: {
      instructions: "In cell B9, find the F.TEST p-value for Machine 1 (B2:B6) and Machine 2 (C2:C5).",
      initialData: [["", "Machine 1", "Machine 2"], ["", 10.2, 9.8], ["", 10.5, 10.0], ["", 10.1, 9.9], ["", 10.3, 10.1], ["", 10.4, ""], ["", "", ""], ["F.TEST p-value", ""]],
      targetCell: [8, 1],
      expectedFormula: "F.TEST(B2:B6,C2:C5)",
      expectedValue: 0.702
    }
  },
{
    id: "fisher",
    title: "FISHER Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 250,
    introduction: {
      title: "Correlation Normalizer: FISHER",
      description: "The FISHER function applies Fisher's z-transformation to a correlation coefficient to stabilize its variance and make its distribution approximately normal.",
      concept: "Think of it as a 'stretcher' for correlations. Correlation coefficients (r) are squashed between -1 and 1. FISHER stretches them out so they are easier to analyze using standard statistical techniques."
    },
    internalLogic: "Excel uses the formula: z' = 0.5 * ln((1+r)/(1-r)). This transformation ensures that the standard error of the correlation depends only on sample size, not on the value of r itself.",
    whyItExists: "Correlation coefficients are not normally distributed, especially as they get closer to 1 or -1. This makes it hard to calculate confidence intervals or compare correlations without transforming them first.",
    whenToUse: "Use FISHER when you need to perform hypothesis testing on Pearson correlation coefficients or calculate their confidence intervals.",
    realWorldUseCases: [
      "Calculating confidence intervals for the correlation between two market indices.",
      "Meta-analysis: combining the results of multiple studies that all measured the same correlation.",
      "Testing if the correlation in Group A is significantly stronger than in Group B."
    ],
    businessExample: {
      scenario: "A data scientist wants to transform a correlation of 0.8 before calculating its 95% confidence interval.",
      formula: "=FISHER(0.8)"
    },
    syntax: "=FISHER(x)",
    syntaxBreakdown: [
      { arg: "x", desc: "A numeric value between -1 and 1 (exclusive) representing the correlation coefficient (required)." }
    ],
    detailedExamples: [
      {
        title: "Fisher Transformation Calculation",
        table: {
          headers: ["Correlation (r)", "Formula", "Fisher Z (z')"],
          rows: [
            ["0.8", "=FISHER(0.8)", "1.0986"],
            ["-0.5", "=FISHER(-0.5)", "-0.5493"]
          ]
        },
        stepByStep: [
          "For r = 0.8: z' = 0.5 * ln((1+0.8)/(1-0.8)) = 0.5 * ln(1.8/0.2) = 0.5 * ln(9).",
          "0.5 * 2.1972 = 1.0986.",
          "The value 1.0986 can now be used in normal distribution-based calculations."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using values of 1 or -1.", desc: "The function is undefined at the boundaries; it only works for values strictly between -1 and 1." },
      { title: "Forgetting to transform back.", desc: "After doing math in 'Fisher space', you must use FISHERINV to get back to a standard correlation coefficient." }
    ],
    proTips: [
      "Fisher's Z is essential for 'averaging' correlations from different studies.",
      "As 'r' approaches 1, the Fisher Z value increases exponentially toward infinity.",
      "Always round your final correlation results to a reasonable number of decimal places."
    ],
    relatedFunctions: ["FISHERINV", "CORREL", "PEARSON"],
    miniChallenge: {
      question: "Apply Fisher transformation to r = 0.6. Is the result greater or less than 0.6?",
      expectedAnswer: "Greater (≈0.693)"
    },
    practice: {
      instructions: "In cell B4, apply the FISHER transformation to the correlation in B2.",
      initialData: [["", "Correlation"], ["", 0.9], ["", ""], ["FISHER", ""]],
      targetCell: [3, 1],
      expectedFormula: "FISHER(B2)",
      expectedValue: 1.472
    }
  },
{
    id: "fisherinv",
    title: "FISHERINV Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 250,
    introduction: {
      title: "Reverse Normalization: FISHERINV",
      description: "The FISHERINV function returns the inverse of the Fisher transformation. It converts a Fisher-z value back into a standard correlation coefficient (r).",
      concept: "Think of it as the 'decoder'. After you've done complex statistical math using Fisher-transformed values, you use FISHERINV to translate those results back into the familiar -1 to 1 correlation scale."
    },
    internalLogic: "Excel uses the formula: r = (e^(2y) - 1) / (e^(2y) + 1), where y is the input Fisher-z value. This maps any real number back into the [-1, 1] range.",
    whyItExists: "Statistical tests on correlations provide results in 'z-units'. To present these findings to stakeholders in a meaningful way (as a correlation), you must invert the transformation.",
    whenToUse: "Use FISHERINV after calculating confidence interval bounds in z-space to find the upper and lower bounds of the correlation itself.",
    realWorldUseCases: [
      "Converting the average of several Fisher-transformed correlations back into a single 'average correlation'.",
      "Finding the actual correlation range for a 95% confidence interval.",
      "Translating statistical model outputs back into Pearson r coefficients."
    ],
    businessExample: {
      scenario: "An analyst has calculated a mean Fisher Z-value of 1.0986 and needs to know the corresponding correlation coefficient.",
      formula: "=FISHERINV(1.0986)"
    },
    syntax: "=FISHERINV(y)",
    syntaxBreakdown: [
      { arg: "y", desc: "The numeric value for which you want the inverse of the transformation (required)." }
    ],
    detailedExamples: [
      {
        title: "Fisher Inverse Calculation",
        table: {
          headers: ["Fisher Z (y)", "Formula", "Correlation (r)"],
          rows: [
            ["1.0986", "=FISHERINV(1.0986)", "0.8"],
            ["-0.5493", "=FISHERINV(-0.5493)", "-0.5"]
          ]
        },
        stepByStep: [
          "For y = 1.0986: e^(2 * 1.0986) = e^(2.1972) ≈ 9.",
          "r = (9 - 1) / (9 + 1) = 8 / 10 = 0.8.",
          "The transformation successfully returned the original correlation coefficient."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using with standard correlations.", desc: "FISHERINV is ONLY for values that have already been Fisher-transformed. Applying it to a standard 'r' will give a meaningless result." },
      { title: "Rounding errors.", desc: "Tiny rounding differences in the input 'y' can lead to slightly different 'r' values; always verify your precision." }
    ],
    proTips: [
      "Pair with FISHER to verify results: =FISHERINV(FISHER(0.75)) should return 0.75.",
      "Use this function at the very last step of your correlation analysis.",
      "It can handle any real number input (positive or negative)."
    ],
    relatedFunctions: ["FISHER", "CORREL", "PEARSON"],
    miniChallenge: {
      question: "Convert Fisher z = 0.5 back to a correlation coefficient. Is the result higher or lower than 0.5?",
      expectedAnswer: "Lower (≈0.462)"
    },
    practice: {
      instructions: "In cell B4, convert the Fisher Z value in B2 back to a correlation coefficient.",
      initialData: [["", "Fisher Z"], ["", 1.5], ["", ""], ["FISHERINV", ""]],
      targetCell: [3, 1],
      expectedFormula: "FISHERINV(B2)",
      expectedValue: 0.905
    }
  },
{
    id: "forecast",
    title: "FORECAST Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Predicting the Future: FORECAST",
      description: "The FORECAST function predicts a future value based on existing data by using linear regression.",
      concept: "Think of it as drawing a 'line of best fit' through your data points and extending that line into the future to see where it will land."
    },
    internalLogic: "Excel fits a linear regression line (y = mx + b) through the known_y's and known_x's. It calculates the slope (m) and intercept (b) and then plugs your input x into the equation to return the predicted y.",
    whyItExists: "Forecasting is essential for budgeting, inventory planning, and identifying trends in business and science.",
    whenToUse: "Use FORECAST when you have a series of historical data points and want to estimate what will happen next, assuming the relationship remains linear.",
    realWorldUseCases: [
      "Predicting next month's sales based on the last six months.",
      "Estimating future temperature based on historical records.",
      "Projecting resource requirements based on project growth."
    ],
    businessExample: {
      scenario: "A manager wants to predict the score a student will get if they study for 6 hours, based on previous performance data.",
      formula: "=FORECAST(6, B2:B6, A2:A6)"
    },
    syntax: "=FORECAST(x, known_y's, known_x's)",
    syntaxBreakdown: [
      { arg: "x", desc: "The data point for which you want to predict a value (required)." },
      { arg: "known_y's", desc: "The dependent range of data (required)." },
      { arg: "known_x's", desc: "The independent range of data (required, must be same size as known_y's)." }
    ],
    detailedExamples: [
      {
        title: "Study Hours vs Score Prediction",
        table: {
          headers: ["X (Hours)", "Y (Score)"],
          rows: [
            ["1", "55"],
            ["2", "65"],
            ["3", "70"],
            ["4", "80"],
            ["5", "85"]
          ]
        },
        stepByStep: [
          "Excel calculates the slope (7.5) and intercept (47.5) of the data.",
          "It uses the linear equation: y = 7.5 * x + 47.5.",
          "For x = 6: y = 7.5 * 6 + 47.5 = 92.5.",
          "Result: 92.5."
        ]
      }
    ],
    commonMistakes: [
      { title: "Reversing Y and X.", desc: "Always put the dependent variable (the thing you want to predict) first as known_y's." },
      { title: "Non-linear data.", desc: "Linear forecasting is inaccurate if your data follows a curve (like exponential growth)." }
    ],
    proTips: [
      "In modern Excel, use FORECAST.LINEAR for better clarity, as it is the direct replacement.",
      "Always plot your data on a scatter chart first to see if a straight line actually fits the trend.",
      "For multiple independent variables, use the TREND or LINEST functions."
    ],
    relatedFunctions: ["FORECAST.LINEAR", "TREND", "LINEST", "SLOPE"],
    miniChallenge: {
      question: "If Y={10,20,30,40} and X={1,2,3,4}, what is the predicted Y at X=7?",
      expectedAnswer: "70"
    },
    practice: {
      instructions: "In cell B9, predict the sales for an advertising spend of 600 using Advertising (B2:B6) and Sales (C2:C6).",
      initialData: [["", "Advertising", "Sales"], ["", 100, 1200], ["", 200, 2300], ["", 300, 3400], ["", 400, 4500], ["", 500, 5600], ["", "", ""], ["Predict at 600", ""]],
      targetCell: [8, 1],
      expectedFormula: "FORECAST(600,C2:C6,B2:B6)",
      expectedValue: 6700
    }
  },
{
    id: "frequency",
    title: "FREQUENCY Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Data Binning: FREQUENCY",
      description: "The FREQUENCY function calculates how often values occur within a range of values, and then returns a vertical array of numbers.",
      concept: "Think of it as a 'sorter'. You have a pile of data and several 'bins' (ranges). FREQUENCY goes through the data and drops each piece into the correct bin, telling you how many landed in each."
    },
    internalLogic: "Excel scans the data array and counts the number of values that fall into each interval defined by the bins array. An interval includes values up to and including the bin value. It always returns one extra value for counts above the highest bin.",
    whyItExists: "Creating histograms and frequency distributions is a fundamental step in data analysis to understand the shape and spread of your data.",
    whenToUse: "Use FREQUENCY when you need to count how many data points fall into specific brackets (e.g., how many students scored 60-70, 71-80, etc.).",
    realWorldUseCases: [
      "Analyzing age demographics of customers.",
      "Grouping test scores into grade brackets.",
      "Monitoring quality control by checking how many parts fall within specific measurement tolerances."
    ],
    businessExample: {
      scenario: "A teacher wants to count how many student scores fall into specific grade intervals.",
      formula: "=FREQUENCY(A2:A8, C2:C5)"
    },
    syntax: "=FREQUENCY(data_array, bins_array)",
    syntaxBreakdown: [
      { arg: "data_array", desc: "The set of values for which you want to count frequencies (required)." },
      { arg: "bins_array", desc: "The set of intervals (upper limits) for grouping the data (required)." }
    ],
    detailedExamples: [
      {
        title: "Test Score Distribution",
        table: {
          headers: ["Scores", "Bins", "Result (Frequency)"],
          rows: [
            ["45, 72, 85, 55, 68, 91, 78", "60", "2 (<=60)"],
            ["", "70", "1 (61-70)"],
            ["", "80", "2 (71-80)"],
            ["", "90", "1 (81-90)"],
            ["", "", "1 (>90)"]
          ]
        },
        stepByStep: [
          "Data: {45, 72, 85, 55, 68, 91, 78}. Bins: {60, 70, 80, 90}.",
          "Excel counts 2 values <= 60 (45, 55).",
          "Counts 1 value from 61 to 70 (68).",
          "Counts 2 values from 71 to 80 (72, 78).",
          "Counts 1 value from 81 to 90 (85).",
          "Counts 1 value above 90 (91).",
          "Returned Array: {2; 1; 2; 1; 1}."
        ]
      }
    ],
    commonMistakes: [
      { title: "Wrong output range.", desc: "In older Excel, you must select one more cell than the number of bins before entering the formula." },
      { title: "Forgetting Ctrl+Shift+Enter.", desc: "In older Excel versions, this is an array formula and must be entered with CSE." },
      { title: "Unsorted bins.", desc: "Bins should be in ascending order for the counts to make sense logically." }
    ],
    proTips: [
      "In Excel 365, FREQUENCY spills automatically, so you don't need to pre-select the range.",
      "The result is always a vertical array. Use TRANSPOSE if you need it horizontal.",
      "The intervals are always (previous bin, current bin]. The value is included in the current bin if it equals the bin limit."
    ],
    relatedFunctions: ["COUNTIF", "COUNTIFS", "HISTOGRAM"],
    miniChallenge: {
      question: "If you have 3 bins, how many numbers will the FREQUENCY function return?",
      expectedAnswer: "4 (one for each bin plus one for values above the highest bin)"
    },
    practice: {
      instructions: "In cell E2, use FREQUENCY to group the ages in A2:A8 using the bins in C2:C4.",
      initialData: [["Age", "", "Bins", "", "Result"], [25, "", 30, "", ""], [35, "", 40, "", ""], [42, "", 50, "", ""], [28, "", "", "", ""], [33, "", "", "", ""], [45, "", "", "", ""], [38, "", "", "", ""]],
      targetCell: [1, 4],
      expectedFormula: "FREQUENCY(A2:A8,C2:C4)",
      expectedValue: 2
    }
  },
  {
    id: "gamma",
    title: "GAMMA Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Factorial Extension: GAMMA",
      description: "Returns the value of the Gamma function for a specified number. For positive integers, Γ(n) = (n-1)!.",
      concept: "Think of it as a way to calculate factorials for numbers that aren't whole, like 4.5. It's a foundational building block for advanced statistics."
    },
    internalLogic: "Excel identifies all numeric values and computes the integral Γ(z) = ∫₀^∞ t^(z-1) e^(-t) dt. For positive integers, it simplifies to (n-1)!.",
    whyItExists: "Standard factorials only work for whole numbers. The Gamma function extends this concept to all real numbers (except zero and negative integers).",
    whenToUse: "Use GAMMA in advanced engineering, physics, and probability density calculations.",
    realWorldUseCases: [
      "Calculating complex probability distributions.",
      "Modeling waiting times in queuing theory.",
      "Scientific research involving fluid dynamics."
    ],
    businessExample: {
      scenario: "A researcher needs to calculate the Gamma value for 5 to verify a factorial-based model.",
      formula: "=GAMMA(5)"
    },
    syntax: "=GAMMA(number)",
    syntaxBreakdown: [
      { arg: "number", desc: "The value to evaluate. Must be a positive number." }
    ],
    detailedExamples: [
      {
        title: "Integer vs Decimal Gamma",
        table: {
          headers: ["Input Value", "Formula", "Result", "Notes"],
          rows: [
            ["5", "=GAMMA(5)", "24", "Same as 4! (4*3*2*1)"],
            ["4.5", "=GAMMA(4.5)", "11.6317", "Non-integer factorial extension"]
          ]
        },
        stepByStep: [
          "For GAMMA(5), Excel computes (5-1)! = 4!.",
          "4 × 3 × 2 × 1 = 24.",
          "Result: 24."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using 0 or Negative Integers", desc: "GAMMA is undefined for 0 and negative integers, returning #NUM!." },
      { title: "Expected n!", desc: "Remember that GAMMA(n) returns (n-1)!. For 5!, you need GAMMA(6)." },
      { title: "Log Gamma Confusion", desc: "Confusing with GAMMALN (natural log of Gamma)." }
    ],
    proTips: [
      "GAMMA(0.5) is exactly √π (approximately 1.77245).",
      "For very large numbers, use GAMMALN to avoid overflow errors.",
      "Faster than manual factorial recursion for large numbers."
    ],
    relatedFunctions: ["GAMMALN", "GAMMA.DIST", "FACT"],
    miniChallenge: {
      question: "Verify Γ(6) and explain its relationship to 5!.",
      expectedAnswer: "Γ(6) = 120, which is equal to 5! (5*4*3*2*1)."
    },
    practice: {
      instructions: "In cell B2, calculate the Gamma function for the value in A2.",
      initialData: [["Input", "Result"], [3, ""], ["Input", ""], [4.5, ""]],
      targetCell: [1, 1],
      expectedFormula: "GAMMA(A2)",
      expectedValue: 2
    }
  },
  {
    id: "gamma.dist",
    title: "GAMMA.DIST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "The Gamma Distribution: GAMMA.DIST",
      description: "Returns the gamma distribution. You can use this function to study variables that may have a skewed distribution.",
      concept: "Think of it as a model for 'waiting times'. It's often used to predict how long it will take for a certain number of events to occur."
    },
    internalLogic: "Calculates the probability density or cumulative distribution for the gamma distribution given Alpha (shape) and Beta (scale). Mean = αβ, Variance = αβ².",
    whyItExists: "Many real-world phenomena (like rainfall amounts or insurance claims) are right-skewed and cannot be modeled by a normal distribution.",
    whenToUse: "Use GAMMA.DIST for reliability analysis, queueing theory, or modeling skewed data distributions.",
    realWorldUseCases: [
      "Estimating the time until the next 3 customer arrivals.",
      "Modeling total rainfall during a storm.",
      "Predicting the age at which a specific component might fail."
    ],
    businessExample: {
      scenario: "An analyst wants to find the cumulative probability (CDF) for x=3 with shape 2 and scale 1.",
      formula: "=GAMMA.DIST(3, 2, 1, TRUE)"
    },
    syntax: "=GAMMA.DIST(x, alpha, beta, cumulative)",
    syntaxBreakdown: [
      { arg: "x", desc: "The value at which you want to evaluate the distribution (must be ≥ 0)." },
      { arg: "alpha", desc: "The shape parameter of the distribution (must be > 0)." },
      { arg: "beta", desc: "The scale parameter of the distribution (must be > 0). If beta = 1, it returns the standard gamma distribution." },
      { arg: "cumulative", desc: "A logical value: TRUE returns the cumulative distribution function; FALSE returns the probability density function." }
    ],
    detailedExamples: [
      {
        title: "CDF vs PDF Comparison",
        table: {
          headers: ["x", "Alpha", "Beta", "Cumulative", "Result"],
          rows: [
            ["3", "2", "1", "TRUE", "0.8009"],
            ["3", "2", "1", "FALSE", "0.1494"]
          ]
        },
        stepByStep: [
          "With Alpha=2 and Beta=1, the mean is 2.",
          "For x=3 (TRUE), the area under the curve from 0 to 3 is 0.8009.",
          "For x=3 (FALSE), the height of the curve at 3 is 0.1494."
        ]
      }
    ],
    commonMistakes: [
      { title: "Negative x values", desc: "x must be greater than or equal to 0." },
      { title: "Scale vs Rate", desc: "Excel uses Beta as a scale parameter. If you have a rate (λ), use 1/λ as your Beta." },
      { title: "Parameter Confusion", desc: "Confusing alpha (shape) and beta (scale) with rate parameter." }
    ],
    proTips: [
      "When Alpha=1, the Gamma distribution is identical to the Exponential distribution.",
      "The Gamma distribution is the sum of Alpha independent exponential variables with mean Beta.",
      "Used extensively in 'right-skewed' data modeling like household income."
    ],
    relatedFunctions: ["GAMMA.INV", "EXPON.DIST", "POISSON.DIST"],
    miniChallenge: {
      question: "Find P(X≤5) for a Gamma distribution with α=3 and β=2.",
      expectedAnswer: "=GAMMA.DIST(5, 3, 2, TRUE)"
    },
    practice: {
      instructions: "In cell B7, calculate the cumulative distribution (CDF) for x=4, alpha=3, and beta=1.5.",
      initialData: [["Parameter", "Value"], ["x", 4], ["Alpha", 3], ["Beta", 1.5], ["Cumulative", "TRUE"], ["", ""], ["CDF", ""]],
      targetCell: [6, 1],
      expectedFormula: "GAMMA.DIST(B2,B3,B4,B5)",
      expectedValue: 0.503433552277
    }
  },
  {
    id: "gamma.inv",
    title: "GAMMA.INV Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Inverse Gamma: GAMMA.INV",
      description: "Returns the inverse of the gamma cumulative distribution. If p = GAMMA.DIST(x,...), then GAMMA.INV(p,...) = x.",
      concept: "Think of it as finding a 'threshold'. 'How much time must pass so that there is a 95% probability that the events have occurred?'"
    },
    internalLogic: "Uses an iterative search to find the value x such that GAMMA.DIST(x, alpha, beta, TRUE) equals the specified probability.",
    whyItExists: "Essential for finding critical values and percentiles in skewed distributions for hypothesis testing and risk planning.",
    whenToUse: "Use GAMMA.INV to determine service level limits, warranty periods, or queue capacity requirements.",
    realWorldUseCases: [
      "Finding the 95th percentile of repair times for a service contract.",
      "Determining the required inventory capacity to meet a 90% demand probability.",
      "Calculating critical values for statistical tests involving the gamma distribution."
    ],
    businessExample: {
      scenario: "An analyst needs the 95th percentile for a Gamma distribution with shape 2 and scale 1.",
      formula: "=GAMMA.INV(0.95, 2, 1)"
    },
    syntax: "=GAMMA.INV(probability, alpha, beta)",
    syntaxBreakdown: [
      { arg: "probability", desc: "The probability associated with the gamma distribution (between 0 and 1)." },
      { arg: "alpha", desc: "The shape parameter (must be > 0)." },
      { arg: "beta", desc: "The scale parameter (must be > 0)." }
    ],
    detailedExamples: [
      {
        title: "Finding the 95th Percentile",
        table: {
          headers: ["Probability", "Alpha", "Beta", "Result"],
          rows: [
            ["0.95", "2", "1", "4.7439"]
          ]
        },
        stepByStep: [
          "Input a probability of 0.95.",
          "Excel iterates to find where 95% of the distribution area lies.",
          "Result: 4.7439. This means 95% of the values are below 4.74."
        ]
      }
    ],
    commonMistakes: [
      { title: "Probability Range", desc: "Probability must be between 0 and 1 (inclusive)." },
      { title: "Parameter Order", desc: "Ensure Alpha and Beta are in the correct positions; swapping them changes the result significantly." },
      { title: "Iteration Dependency", desc: "Expecting closed-form solution (most require iteration)." }
    ],
    proTips: [
      "Use for Value at Risk (VaR) calculations in finance for skewed return distributions.",
      "Useful for finding warranty limits: if failure time follows Gamma(α,β), find x where P(X<x)=0.05.",
      "Inverse of the Chi-Square distribution is a special case of GAMMA.INV."
    ],
    relatedFunctions: ["GAMMA.DIST", "CHISQ.INV", "NORM.INV"],
    miniChallenge: {
      question: "Find the median (50th percentile) of a Gamma(4,2) distribution.",
      expectedAnswer: "=GAMMA.INV(0.5, 4, 2)"
    },
    practice: {
      instructions: "In cell B6, find the value for a 90% probability with alpha=5 and beta=0.5.",
      initialData: [["Parameter", "Value"], ["Probability", 0.9], ["Alpha", 5], ["Beta", 0.5], ["", ""], ["GAMMA.INV", ""]],
      targetCell: [5, 1],
      expectedFormula: "GAMMA.INV(B2,B3,B4)",
      expectedValue: 3.9968
    }
  },
  {
    id: "gammaln",
    title: "GAMMALN Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Log-Gamma: GAMMALN",
      description: "Returns the natural logarithm of the gamma function, LN(Γ(x)).",
      concept: "Think of it as a 'stabilizer' for really big numbers. The Gamma function grows incredibly fast (faster than exponential), so we use its log to keep calculations manageable."
    },
    internalLogic: "Computes the natural log of the Gamma function directly: ln(Γ(x)). More numerically stable than calculating GAMMA first and then taking the log.",
    whyItExists: "In maximum likelihood estimation and complex probability math, we often need the log of the gamma function. Direct calculation prevents computer overflow errors.",
    whenToUse: "Use GAMMALN in Bayesian statistics, maximum likelihood estimation (MLE), or when working with very large factorial-like values.",
    realWorldUseCases: [
      "Calculating log-likelihoods in statistical modeling.",
      "Numerical analysis where precision for large values is critical.",
      "Computing combinations or permutations for very large sets."
    ],
    businessExample: {
      scenario: "Calculate the natural log of Γ(5) for a log-likelihood model.",
      formula: "=GAMMALN(5)"
    },
    syntax: "=GAMMALN(x)",
    syntaxBreakdown: [
      { arg: "x", desc: "The value for which you want to calculate GAMMALN (must be > 0)." }
    ],
    detailedExamples: [
      {
        title: "Log-Gamma vs Direct Log",
        table: {
          headers: ["Input Value", "GAMMA(x)", "LN(GAMMA(x))", "GAMMALN(x)"],
          rows: [
            ["5", "24", "3.1781", "3.1781"],
            ["100", "9.33E+155", "359.13", "359.13"]
          ]
        },
        stepByStep: [
          "For x=5, Γ(5) = 24.",
          "LN(24) ≈ 3.1781.",
          "GAMMALN(5) provides the same result (3.1781) but is safer for larger inputs."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using where GAMMA is needed", desc: "If you need Γ(x), you must exponentiate the result: =EXP(GAMMALN(x))." },
      { title: "Non-positive x", desc: "x must be greater than 0, or Excel returns #NUM!." },
      { title: "No Log confusion", desc: "Confusing with GAMMA (no log) function." }
    ],
    proTips: [
      "Essential for log-likelihood calculations where sums are easier to handle than products.",
      "To calculate LN(n!), use GAMMALN(n+1).",
      "Always use GAMMALN over LN(GAMMA(x)) for numerical stability."
    ],
    relatedFunctions: ["GAMMA", "LN", "EXP"],
    miniChallenge: {
      question: "Calculate GAMMALN(10) and compare with LN(FACT(9)).",
      expectedAnswer: "Both are approximately 12.8018."
    },
    practice: {
      instructions: "In cell B2, calculate the GAMMALN for the input in A2.",
      initialData: [["Input", "Result"], [3.5, ""], ["Input", ""], [100, ""]],
      targetCell: [1, 1],
      expectedFormula: "GAMMALN(A2)",
      expectedValue: 1.20097
    }
  },
  {
    id: "gauss",
    title: "GAUSS Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Gaussian Area: GAUSS",
      description: "Returns 0.5 less than the standard normal cumulative distribution. It represents the area between the mean (0) and z.",
      concept: "Think of it as 'center-to-z' probability. It tells you the chance of a value falling between the average and your specific z-score."
    },
    internalLogic: "Calculates NORM.S.DIST(z, TRUE) - 0.5. Symmetric: GAUSS(-z) = -GAUSS(z).",
    whyItExists: "Older statistical tables often listed the area from 0 to z. GAUSS provides compatibility with these legacy methods and a direct measure of 'middle-out' probability.",
    whenToUse: "Use GAUSS for quick probability checks relative to the mean or when working with older statistical documentation.",
    realWorldUseCases: [
      "Calculating the probability of a value falling between the mean and 1.96 standard deviations.",
      "Legacy engineering reports based on 'center-area' tables.",
      "Simple normality checks for industrial processes."
    ],
    businessExample: {
      scenario: "Find the area under the standard normal curve between 0 and 1.96.",
      formula: "=GAUSS(1.96)"
    },
    syntax: "=GAUSS(z)",
    syntaxBreakdown: [
      { arg: "z", desc: "The z-score (number of standard deviations from the mean) you want to evaluate." }
    ],
    detailedExamples: [
      {
        title: "Area from Mean to Z",
        table: {
          headers: ["z-score", "Formula", "Result", "Total Area between -z and z"],
          rows: [
            ["1.96", "=GAUSS(1.96)", "0.4750", "0.9500"],
            ["1.0", "=GAUSS(1.0)", "0.3413", "0.6826"]
          ]
        },
        stepByStep: [
          "Input z = 1.96.",
          "NORM.S.DIST(1.96, TRUE) is 0.9750.",
          "0.9750 - 0.5 = 0.4750.",
          "Result: 0.4750."
        ]
      }
    ],
    commonMistakes: [
      { title: "Expecting CDF", desc: "GAUSS is NOT the cumulative probability. It's the area FROM the mean. For CDF, add 0.5." },
      { title: "Two-tailed confusion", desc: "GAUSS only gives one side (0 to z). Multiply by 2 for the area between -z and z." },
      { title: "Non-standard normal", desc: "Using for non-standard normal (must standardize first)." }
    ],
    proTips: [
      "GAUSS(-z) = -GAUSS(z) due to symmetry.",
      "To get the standard 95% confidence interval area, look for z=1.96; GAUSS returns 0.475, and 2*0.475 = 0.95.",
      "Use for quick 'sigma' calculations in process control."
    ],
    relatedFunctions: ["NORM.S.DIST", "NORM.DIST", "PHI"],
    miniChallenge: {
      question: "What's the area between z=-2 and z=2 using GAUSS?",
      expectedAnswer: "2 * GAUSS(2) ≈ 0.9545."
    },
    practice: {
      instructions: "In cell B2, find the GAUSS value for a z-score of 1.5.",
      initialData: [["z-score", "Result"], [1.5, ""], ["z-score", ""], [-1.8, ""]],
      targetCell: [1, 1],
      expectedFormula: "GAUSS(A2)",
      expectedValue: 0.43319
    }
  },
  {
    id: "geomean",
    title: "GEOMEAN Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Compounded Average: GEOMEAN",
      description: "Returns the geometric mean of an array or range of positive data. It is the nth root of the product of n numbers.",
      concept: "Think of it as the 'fair' average for growth rates. If your money grows 10% then 20%, you don't use 15% (arithmetic); you use GEOMEAN to find the true steady rate."
    },
    internalLogic: "Multiplies all numbers in the range and then takes the nth root. Formula: (x₁ * x₂ * ... * x_n)^(1/n).",
    whyItExists: "Standard averages (arithmetic mean) fail when dealing with investment returns or growth rates because growth is multiplicative, not additive.",
    whenToUse: "Use GEOMEAN for investment returns, interest rates, population growth, or any data showing exponential behavior.",
    realWorldUseCases: [
      "Calculating Compound Annual Growth Rate (CAGR).",
      "Averaging price-to-earnings (P/E) ratios in finance.",
      "Biological growth rate analysis over multiple generations."
    ],
    businessExample: {
      scenario: "Calculate the average growth factor for returns of 10%, 15%, -5%, and 20%.",
      formula: "=GEOMEAN(1.10, 1.15, 0.95, 1.20) - 1"
    },
    syntax: "=GEOMEAN(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number or range for which you want the mean (must be positive)." },
      { arg: "number2", desc: "Optional additional numbers or ranges (up to 255)." }
    ],
    detailedExamples: [
      {
        title: "Investment Returns",
        table: {
          headers: ["Return Rate", "Formula", "Result"],
          rows: [
            ["10%", "=GEOMEAN(1.1,1.15,0.95,1.2)-1", "0.0947"],
            ["15%", "", ""],
            ["-5%", "", ""],
            ["20%", "", ""]
          ]
        },
        stepByStep: [
          "Excel adds 1 to each percentage internally if provided as growth factors.",
          "Multiplies all factors: 1.10 × 1.15 × 0.95 × 1.20 = 1.4421.",
          "Takes 4th root: 1.4421^(1/4) ≈ 1.0947.",
          "Result: 9.47% geometric return."
        ]
      }
    ],
    commonMistakes: [
      { title: "Zero or Negative Values", desc: "GEOMEAN requires all values to be strictly positive (>0). Zero or negative values return #NUM!." },
      { title: "Adding 1 incorrectly", desc: "Forgetting to add 1 to percentages before calculating GEOMEAN." },
      { title: "Arithmetic confusion", desc: "Confusing with arithmetic average for growth rates." }
    ],
    proTips: [
      "Always add 1 to your growth rates (e.g., 5% becomes 1.05) before calculating GEOMEAN.",
      "GEOMEAN is always less than or equal to the standard arithmetic mean.",
      "Use for CAGR calculations: =GEOMEAN(1+annual_returns)-1."
    ],
    relatedFunctions: ["AVERAGE", "HARMEAN", "PRODUCT"],
    miniChallenge: {
      question: "Calculate average growth rate: +5%, -2%, +8%, +3%.",
      expectedAnswer: "=GEOMEAN(1.05, 0.98, 1.08, 1.03) - 1 ≈ 3.4%."
    },
    practice: {
      instructions: "In cell B8, calculate the geometric mean of returns for the 5 years listed.",
      initialData: [["Year", "Return"], [1, "12%"], [2, "-3%"], [3, "8%"], [4, "15%"], [5, "-1%"], ["", ""], ["Geometric Mean", ""]],
      targetCell: [7, 1],
      expectedFormula: "GEOMEAN(1+B2:B6)-1",
      expectedValue: 0.0594
    }
  },
  {
    id: "growth",
    title: "GROWTH Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Exponential Forecasting: GROWTH",
      description: "Calculates predicted exponential growth by using existing data. It fits an exponential curve (y = b*m^x) to your data.",
      concept: "Think of it as the 'exponential' version of TREND. If your sales are doubling every month, GROWTH predicts the next double, whereas TREND would predict a straight line."
    },
    internalLogic: "Fits exponential curve: y = b × m^x using logarithmic transformation: ln(y) = ln(b) + x×ln(m). Applications linear regression to transformed data.",
    whyItExists: "Many biological and economic processes (like population growth or compound interest) follow exponential paths rather than straight lines.",
    whenToUse: "Use GROWTH for predicting revenue in fast-growing startups, bacterial growth, or long-term investment projections.",
    realWorldUseCases: [
      "Predicting future app users based on early viral growth.",
      "Forecasting revenue for a product with a constant percentage growth rate.",
      "Predicting population levels based on historical birth/death rates."
    ],
    businessExample: {
      scenario: "Predict sales for month 6 given months 1-5 where sales increased roughly 20% each month.",
      formula: "=GROWTH(B2:B6, A2:A6, 6)"
    },
    syntax: "=GROWTH(known_y's, [known_x's], [new_x's], [const])",
    syntaxBreakdown: [
      { arg: "known_y's", desc: "The set of y-values (dependent data) you already have. Must be positive." },
      { arg: "known_x's", desc: "Optional. The set of x-values (independent data) corresponding to your known y's." },
      { arg: "new_x's", desc: "Optional. The x-values for which you want GROWTH to return predicted y-values." },
      { arg: "const", desc: "Optional. TRUE (default) calculates the constant 'b' normally. FALSE forces 'b' to 1 (y = m^x)." }
    ],
    detailedExamples: [
      {
        title: "Sales Growth Projection",
        table: {
          headers: ["Month", "Sales", "Formula", "Result"],
          rows: [
            ["1", "100", "=GROWTH(B2:B6,A2:A6,6)", "249"],
            ["2", "120", "", ""],
            ["3", "144", "", ""],
            ["4", "173", "", ""],
            ["5", "208", "", ""]
          ]
        },
        stepByStep: [
          "Excel identifies the ~20% growth rate.",
          "It fits the curve: y ≈ 83.3 * 1.2^x.",
          "Plugs in x=6: 83.3 * 1.2^6 ≈ 249.",
          "Result: 249."
        ]
      }
    ],
    commonMistakes: [
      { title: "Non-positive Y values", desc: "GROWTH uses logarithms internally, so all known_y's MUST be greater than 0." },
      { title: "Confusing with TREND", desc: "Use TREND for straight lines; use GROWTH for curves that accelerate." },
      { title: "Array Entry", desc: "Forgetting array entry for multiple predictions." }
    ],
    proTips: [
      "For multiple predictions, enter as an array formula (Ctrl+Shift+Enter in older Excel) over a range of cells.",
      "Works with multiple independent variables (multiple X columns).",
      "If known_x's is omitted, Excel assumes {1, 2, 3, ...}."
    ],
    relatedFunctions: ["TREND", "LINEST", "LOGEST"],
    miniChallenge: {
      question: "Bacteria doubles every hour. Initial: 100, after 3 hrs: 800. Predict count at 5 hours.",
      expectedAnswer: "=GROWTH({100,800}, {0,3}, 5) returns 3200."
    },
    practice: {
      instructions: "In cell B7, predict revenue for Period 5 using data in A2:B5.",
      initialData: [["Period", "Revenue"], [1, 500], [2, 650], [3, 845], [4, 1099], ["", ""], ["Predict 5", ""]],
      targetCell: [6, 1],
      expectedFormula: "GROWTH(B2:B5,A2:A5,5)",
      expectedValue: 1428.7
    }
  },
  {
    id: "harmean",
    title: "HARMEAN Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Harmonic Mean: HARMEAN",
      description: "Returns the harmonic mean of a data set. The harmonic mean is the reciprocal of the arithmetic mean of reciprocals.",
      concept: "Think of it as the 'rates' average. If you travel at different speeds over equal distances, the harmonic mean gives you your true average speed."
    },
    internalLogic: "Calculates n / Σ(1/xᵢ), where n is the number of data points. It weights smaller values more heavily than the arithmetic mean.",
    whyItExists: "Standard averages (arithmetic) give misleading results when averaging rates, ratios, or prices (like P/E ratios).",
    whenToUse: "Use HARMEAN when averaging speeds, production rates, or financial ratios where you want to find the average 'per unit' measure.",
    realWorldUseCases: [
      "Calculating average speed for a trip with varying speeds over equal distances.",
      "Averaging price-to-earnings (P/E) ratios in a portfolio.",
      "Finding the average production rate of multiple machines."
    ],
    businessExample: {
      scenario: "Calculate average speed for a vehicle traveling 30 mph, 40 mph, and 60 mph over three equal distances.",
      formula: "=HARMEAN(30, 40, 60)"
    },
    syntax: "=HARMEAN(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number or range for which you want the harmonic mean (must be positive)." },
      { arg: "number2", desc: "Optional additional numbers or ranges (up to 255)." }
    ],
    detailedExamples: [
      {
        title: "Average Speed Calculation",
        table: {
          headers: ["Segment", "Speed (mph)", "Reciprocal (1/x)", "Result"],
          rows: [
            ["1", "30", "0.0333", ""],
            ["2", "40", "0.0250", ""],
            ["3", "60", "0.0167", ""],
            ["Total", "", "0.0750", "=HARMEAN(30,40,60) = 40"]
          ]
        },
        stepByStep: [
          "Sum of reciprocals: 1/30 + 1/40 + 1/60 = 0.075.",
          "Count of points: 3.",
          "Harmonic Mean: 3 / 0.075 = 40.",
          "Result: 40 mph."
        ]
      }
    ],
    commonMistakes: [
      { title: "Zero or Negative Values", desc: "HARMEAN requires all values to be strictly positive. Returns #NUM! otherwise." },
      { title: "Confusing with Arithmetic Mean", desc: "Don't use AVERAGE for rates; it will overestimate the true average (e.g., 43.3 vs 40 in the speed example)." },
      { title: "Wrong data type", desc: "Applying to non-rate data inappropriately." }
    ],
    proTips: [
      "Perfect for averaging rates and ratios.",
      "In finance, HARMEAN is preferred for averaging multiples like P/E ratios.",
      "Always ≤ geometric mean ≤ arithmetic mean."
    ],
    relatedFunctions: ["AVERAGE", "GEOMEAN"],
    miniChallenge: {
      question: "Machine A: 10 units/hr, Machine B: 15 units/hr. What is the average production rate?",
      expectedAnswer: "=HARMEAN(10, 15) = 12 units/hr."
    },
    practice: {
      instructions: "In cell B7, calculate the harmonic mean of the P/E ratios in B2:B5.",
      initialData: [["Stock", "Price/Earnings"], ["A", 15], ["B", 20], ["C", 12], ["D", 18], ["", ""], ["HARMEAN P/E", ""]],
      targetCell: [6, 1],
      expectedFormula: "HARMEAN(B2:B5)",
      expectedValue: 15.652
    }
  },
  {
    id: "hypgeom.dist",
    title: "HYPGEOM.DIST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Sampling Without Replacement: HYPGEOM.DIST",
      description: "Returns the hypergeometric distribution. This is used for sampling from a finite population without replacement.",
      concept: "Think of it as 'The Quality Control' function. If you have a box of 20 parts and 5 are broken, what's the chance of picking exactly 2 broken ones if you grab 8?"
    },
    internalLogic: "Sampling WITHOUT replacement from finite population. PMF: C(K,k)×C(N-K,n-k)/C(N,n).",
    whyItExists: "Unlike the binomial distribution, HYPGEOM.DIST accounts for the fact that each pick changes the odds for the next pick (sampling without replacement).",
    whenToUse: "Use when sampling from a small, finite population where the outcome of one trial affects the probability of the next.",
    realWorldUseCases: [
      "Quality control lot sampling.",
      "Calculating odds in card games (sampling from a deck).",
      "Estimating the probability of committee representation from a fixed group."
    ],
    businessExample: {
      scenario: "In a batch of 20 products, 8 are defective. What is the probability that exactly 2 are defective in a random sample of 5?",
      formula: "=HYPGEOM.DIST(2, 5, 8, 20, FALSE)"
    },
    syntax: "=HYPGEOM.DIST(sample_s, number_sample, population_s, number_pop, cumulative)",
    syntaxBreakdown: [
      { arg: "sample_s", desc: "The number of successes in the sample." },
      { arg: "number_sample", desc: "The size of the sample." },
      { arg: "population_s", desc: "The number of successes in the population." },
      { arg: "number_pop", desc: "The population size." },
      { arg: "cumulative", desc: "TRUE for cumulative distribution (at most k successes); FALSE for probability mass function (exactly k successes)." }
    ],
    detailedExamples: [
      {
        title: "Quality Control Sample",
        table: {
          headers: ["Parameter", "Value", "Meaning"],
          rows: [
            ["Successes in Sample (k)", "2", "Exactly 2 defects found"],
            ["Sample Size (n)", "5", "5 items checked"],
            ["Successes in Pop (K)", "8", "8 total defects exist"],
            ["Population Size (N)", "20", "20 items in total"],
            ["Result (FALSE)", "0.3973", "39.73% chance of exactly 2 defects"]
          ]
        },
        stepByStep: [
          "Identifies total ways to pick 5 from 20.",
          "Identifies ways to pick 2 defects from 8 and 3 non-defects from 12.",
          "Divides the specific ways by total ways.",
          "Result: 0.3973."
        ]
      }
    ],
    commonMistakes: [
      { title: "Sample > Population", desc: "number_sample cannot be larger than number_pop." },
      { title: "Reversing Parameters", desc: "Ensure you don't swap sample successes with population successes." },
      { title: "Using BINOM.DIST", desc: "Don't use Binomial if the population is small and you aren't putting items back after picking." }
    ],
    proTips: [
      "Use when sampling more than 5% of a finite population.",
      "If the population is very large relative to the sample, BINOM.DIST is an easier and accurate approximation.",
      "Perfect for calculating probability of drawing specific cards from a deck."
    ],
    relatedFunctions: ["BINOM.DIST", "COMBIN"],
    miniChallenge: {
      question: "Deck of 52 cards, 4 aces. Draw 5 cards. Probability of exactly 1 ace?",
      expectedAnswer: "=HYPGEOM.DIST(1, 5, 4, 52, FALSE) ≈ 0.299."
    },
    practice: {
      instructions: "In cell B8, find the probability of exactly 1 success in a sample of 10 from a population of 50 with 15 successes.",
      initialData: [["Parameter", "Value"], ["Sample_s", 1], ["Number_sample", 10], ["Population_s", 15], ["Number_pop", 50], ["Cumulative", "FALSE"], ["", ""], ["Exact probability", ""]],
      targetCell: [7, 1],
      expectedFormula: "HYPGEOM.DIST(B2,B3,B4,B5,FALSE)",
      expectedValue: 0.113
    }
  },
  {
    id: "intercept",
    title: "INTERCEPT Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Starting Point: INTERCEPT",
      description: "Calculates the point at which a line will intersect the y-axis by using existing x-values and y-values.",
      concept: "Think of it as the 'base' value. If you're calculating cost vs. production, the intercept is your 'fixed cost' (the cost when you produce zero items)."
    },
    internalLogic: "Fits a linear regression line (y = mx + b) and returns 'b'. Formula: b = ȳ - m*x̄ where m = SLOPE(y,x).",
    whyItExists: "Essential for defining the full equation of a trend line and identifying fixed components in variable data.",
    whenToUse: "Use INTERCEPT along with SLOPE to create a predictive formula for your data.",
    realWorldUseCases: [
      "Identifying fixed costs in a manufacturing process.",
      "Finding the baseline score in a performance test.",
      "Predicting starting values in scientific experiments."
    ],
    businessExample: {
      scenario: "Determine the fixed cost of production where X is units and Y is total cost.",
      formula: "=INTERCEPT(B2:B6, A2:A6)"
    },
    syntax: "=INTERCEPT(known_y's, known_x's)",
    syntaxBreakdown: [
      { arg: "known_y's", desc: "The dependent set of observations (the values you want to explain)." },
      { arg: "known_x's", desc: "The independent set of observations (the factors influencing y)." }
    ],
    detailedExamples: [
      {
        title: "Fixed Cost Identification",
        table: {
          headers: ["X", "Y", "Formula", "Result"],
          rows: [
            ["1", "3", "", ""],
            ["2", "5", "", ""],
            ["3", "7", "", ""],
            ["4", "9", "", ""],
            ["5", "11", "", ""],
            ["Fixed Cost", "", "=INTERCEPT(B2:B6, A2:A6)", "1"]
          ]
        },
        stepByStep: [
          "Excel calculates the slope (m) as 2.",
          "It finds the averages of X (3) and Y (7).",
          "Calculates b = 7 - (2 * 3) = 1.",
          "Result: 1."
        ]
      }
    ],
    commonMistakes: [
      { title: "Reversing Y and X", desc: "Always put the thing you are measuring (Y) before the thing causing the change (X)." },
      { title: "Meaningless Intercepts", desc: "Intercept may be meaningless if x never near 0 in your data range." }
    ],
    proTips: [
      "Equation of the line: y = SLOPE(...) * x + INTERCEPT(...).",
      "Same as using FORECAST(0, known_y's, known_x's).",
      "Check R² (using RSQ) to see if the regression line actually fits the data well."
    ],
    relatedFunctions: ["SLOPE", "FORECAST", "RSQ", "LINEST"],
    miniChallenge: {
      question: "Y={4,7,10,13}, X={1,2,3,4}. What is the intercept?",
      expectedAnswer: "1"
    },
    practice: {
      instructions: "In cell B8, find the intercept for Height (X in A2:A5) and Weight (Y in B2:B5).",
      initialData: [["Height", "Weight"], [60, 120], [65, 140], [70, 160], [75, 180], ["", ""], ["INTERCEPT", ""], ["SLOPE", ""]],
      targetCell: [6, 1],
      expectedFormula: "INTERCEPT(B2:B5,A2:A5)",
      expectedValue: -120
    }
  },
  {
    id: "kurt",
    title: "KURT Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Outlier Checker: KURT",
      description: "Returns the kurtosis of a data set. Kurtosis characterizes the relative peakedness or flatness of a distribution compared with the normal distribution.",
      concept: "Think of it as the 'outlier alarm'. High kurtosis means your data has frequent extreme outliers; low kurtosis means outliers are rare."
    },
    internalLogic: "Calculates excess kurtosis (compared to normal distribution). Normal distribution kurtosis = 3, so excess = sample - 3.",
    whyItExists: "Average and standard deviation don't tell the whole story. KURT tells you if your risk is concentrated in extreme, rare events.",
    whenToUse: "Use in finance to assess investment risk (fat tails) or in quality control to detect unusual variance.",
    realWorldUseCases: [
      "Financial risk modeling to identify potential 'Black Swan' events.",
      "Analyzing sensor data to detect irregular spikes or malfunctions.",
      "Evaluating the distribution of test scores."
    ],
    businessExample: {
      scenario: "Calculate the kurtosis for a list of daily stock returns to see if extreme gains/losses are common.",
      formula: "=KURT(A2:A100)"
    },
    syntax: "=KURT(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number or range (must have at least 4 data points)." },
      { arg: "number2", desc: "Optional additional numbers or ranges (up to 255)." }
    ],
    detailedExamples: [
      {
        title: "Distribution Shape Check",
        table: {
          headers: ["Value Set", "KURT Result", "Meaning"],
          rows: [
            ["{2,4,4,4,5,5,7,9}", "-0.4828", "Platykurtic (flatter than normal)"],
            ["{1,1,1,1,1,1,1,100}", "10.00", "Leptokurtic (extreme outlier present)"]
          ]
        },
        stepByStep: [
          "Excel calculates the mean and standard deviation.",
          "Computes the 4th power of deviations from the mean.",
          "Returns the excess kurtosis value.",
          "Negative result indicates a distribution with fewer/smaller outliers than normal."
        ]
      }
    ],
    commonMistakes: [
      { title: "Too few data points", desc: "Requires at least 4 numeric values; otherwise returns #DIV/0!." },
      { title: "Standard vs Excess", desc: "Excel returns 'Excess Kurtosis' (Normal = 0), not 'Standard Kurtosis' (Normal = 3)." }
    ],
    proTips: [
      "Positive Kurtosis = Frequent outliers (fat tails).",
      "Negative Kurtosis = Rare outliers (thin tails).",
      "Combine with SKEW for a complete picture of distribution shape."
    ],
    relatedFunctions: ["SKEW", "STDEV.S", "AVERAGE"],
    miniChallenge: {
      question: "Daily returns: {1,1,1,1,1,1,1,1,1,100}. What's the kurtosis? (Hint: one extreme outlier)",
      expectedAnswer: "High positive value (≈10)."
    },
    practice: {
      instructions: "In cell B10, calculate the kurtosis for the stock returns in B2:B8.",
      initialData: [["Stock Return", ""], [-0.025, ""], [0.018, ""], [0.032, ""], [-0.015, ""], [0.008, ""], [0.021, ""], [-0.009, ""], ["", ""], ["KURT", ""]],
      targetCell: [9, 1],
      expectedFormula: "KURT(B2:B8)",
      expectedValue: -1.066
    }
  },
  {
    id: "large",
    title: "LARGE Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "Finding the Top-N: LARGE",
      description: "Returns the k-th largest value in a data set. For example, the 1st, 2nd, or 5th highest number.",
      concept: "Think of it as a 'Leaderboard' tool. While MAX gives you the gold medalist, LARGE(..., 2) gives you the silver medalist."
    },
    internalLogic: "Sorts the array in descending order internally and returns the value at the specified position 'k'.",
    whyItExists: "Often you need more than just the absolute maximum; you need a list of the top performers or a specific percentile cutoff.",
    whenToUse: "Use LARGE to find the 2nd highest salary, the top 3 sales figures, or to identify values in the top tier of a dataset.",
    realWorldUseCases: [
      "Creating a 'Top 5' sales report.",
      "Identifying the 2nd and 3rd place winners in a competition.",
      "Finding the value that marks the 90th percentile (approximate)."
    ],
    businessExample: {
      scenario: "Find the 3rd highest sales figure in a range.",
      formula: "=LARGE(A2:A100, 3)"
    },
    syntax: "=LARGE(array, k)",
    syntaxBreakdown: [
      { arg: "array", desc: "The range of data you want to search." },
      { arg: "k", desc: "The position (from largest) to return. 1 is max, 2 is second max, etc." }
    ],
    detailedExamples: [
      {
        title: "Sales Leaderboard",
        table: {
          headers: ["Sales", "Formula", "Result"],
          rows: [
            ["150", "=LARGE(A2:A6, 1)", "300"],
            ["200", "=LARGE(A2:A6, 3)", "200"],
            ["175", "", ""],
            ["300", "", ""],
            ["250", "", ""]
          ]
        },
        stepByStep: [
          "Excel looks at the range {150, 200, 175, 300, 250}.",
          "Sorts them: 300, 250, 200, 175, 150.",
          "Returns the value at position 'k'.",
          "For k=3, the result is 200."
        ]
      }
    ],
    commonMistakes: [
      { title: "k > Count", desc: "If k is greater than the number of data points, it returns #NUM!." },
      { title: "k ≤ 0", desc: "k must be a positive integer; otherwise returns #NUM!." },
      { title: "Expecting k=0", desc: "k=0 does not work in Excel." }
    ],
    proTips: [
      "Use =LARGE(range, ROW(1:1)) and drag down to automatically generate a sorted top-N list.",
      "Combine with INDEX and MATCH to find the names of the top performers.",
      "Opposite of SMALL function."
    ],
    relatedFunctions: ["SMALL", "MAX", "RANK.EQ"],
    miniChallenge: {
      question: "Find 2nd and 5th largest values from: {85,92,78,95,88,76,90,82}.",
      expectedAnswer: "2nd largest = 92; 5th largest = 85."
    },
    practice: {
      instructions: "In cell B9, find the 3rd highest bonus from the list in B2:B6.",
      initialData: [["Employee", "Bonus"], ["John", 1500], ["Sarah", 2200], ["Mike", 1800], ["Emma", 2500], ["Dave", 1900], ["", ""], ["Top bonus (k=1)", ""], ["3rd highest", ""]],
      targetCell: [8, 1],
      expectedFormula: "LARGE(B2:B6,3)",
      expectedValue: 1900
    }
  },
  {
    id: "linest",
    title: "LINEST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Regression Engine: LINEST",
      description: "Calculates the statistics for a line by using the 'least squares' method to fit a straight line through your data.",
      concept: "Think of it as the 'super-powered' version of SLOPE and INTERCEPT. It can handle multiple factors at once (like predicting price based on size, age, AND location)."
    },
    internalLogic: "Array formula returning multiple values. Fits linear model using least squares. Returns slope(s) and intercept.",
    whyItExists: "Serious analysts need more than just a prediction; they need to know how reliable that prediction is (statistics). LINEST is the core engine for linear modeling in Excel.",
    whenToUse: "Use LINEST for multiple linear regression or when you need detailed diagnostic statistics for your model.",
    realWorldUseCases: [
      "Predicting house prices based on multiple independent variables.",
      "Analyzing the impact of advertising, pricing, and seasonality on sales.",
      "Scientific modeling of multi-factor experimental data."
    ],
    businessExample: {
      scenario: "Fit a line to Y={3,7,11,15} and X={1,2,3,4} and find slope and intercept.",
      formula: "=LINEST(B2:B5, A2:A5)"
    },
    syntax: "=LINEST(known_y's, [known_x's], [const], [stats])",
    syntaxBreakdown: [
      { arg: "known_y's", desc: "The dependent variables (what you want to predict)." },
      { arg: "known_x's", desc: "Optional. The independent variables. Can be multiple columns." },
      { arg: "const", desc: "Optional. TRUE (default) calculates the intercept; FALSE forces it to 0." },
      { arg: "stats", desc: "Optional. TRUE returns additional regression statistics; FALSE returns only slope(s) and intercept." }
    ],
    detailedExamples: [
      {
        title: "Simple Linear Regression",
        table: {
          headers: ["X", "Y", "Output Area", "Result"],
          rows: [
            ["1", "3", "Slope", "4"],
            ["2", "7", "Intercept", "-1"],
            ["3", "11", "", ""],
            ["4", "15", "", ""]
          ]
        },
        stepByStep: [
          "Select two adjacent cells (e.g., D2:E2).",
          "Enter =LINEST(B2:B5, A2:A5).",
          "Result: 4 (Slope) and -1 (Intercept). y = 4x - 1."
        ]
      }
    ],
    commonMistakes: [
      { title: "Output Selection", desc: "Since LINEST returns multiple values, you must select the correct range size before entering (or use INDEX)." },
      { title: "Reversing X and Y", desc: "Ensure Y is the first argument." },
      { title: "Array Entry", desc: "Forgetting array entry in older versions of Excel." }
    ],
    proTips: [
      "Use =INDEX(LINEST(...), 1) to get only the slope.",
      "Use =INDEX(LINEST(...), 2) to get only the intercept.",
      "For multiple regression, your X data must be in adjacent columns.",
      "Combine with TREND for quick predictions using the LINEST model."
    ],
    relatedFunctions: ["LOGEST", "TREND", "SLOPE", "INTERCEPT"],
    miniChallenge: {
      question: "Fit line to: Y={5,8,11,14}, X={2,4,6,8}. Find slope and intercept.",
      expectedAnswer: "Slope = 1.5; Intercept = 2."
    },
    practice: {
      instructions: "In cell B8, find the slope for Advertising (A2:A5) and Sales (B2:B5) using INDEX(LINEST, 1).",
      initialData: [["Advertising", "Sales"], [100, 1200], [200, 2300], [300, 3500], [400, 4600], ["", ""], ["LINEST: Slope", ""], ["Intercept", ""]],
      targetCell: [6, 1],
      expectedFormula: "INDEX(LINEST(B2:B5,A2:A5),1)",
      expectedValue: 11.4
    }
  },
  {
    id: "logest",
    title: "LOGEST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Exponential Regression: LOGEST",
      description: "Calculates the statistics for an exponential curve that fits your data points. Formula: y = b*m^x.",
      concept: "Think of it as LINEST for curves. Use it when the relationship between factors isn't a straight line, but a percentage growth (like compound interest)."
    },
    internalLogic: "Fits an exponential curve: y = b × m^x using linear regression on the natural logarithms of the y-values. Returns base 'm' and constant 'b'.",
    whyItExists: "Many natural and financial phenomena grow at a constant percentage rather than a constant amount.",
    whenToUse: "Use LOGEST to find the parameters of an exponential model and evaluate how well that model fits your data.",
    realWorldUseCases: [
      "Modeling population growth where the rate of change is proportional to the size.",
      "Analyzing investment returns that compound over time.",
      "Biological modeling of cell growth or viral spread."
    ],
    businessExample: {
      scenario: "Find the parameters for a model where Y values {3,9,27,81} triple for every unit of X {1,2,3,4}.",
      formula: "=LOGEST(B2:B5, A2:A5)"
    },
    syntax: "=LOGEST(known_y's, [known_x's], [const], [stats])",
    syntaxBreakdown: [
      { arg: "known_y's", desc: "The dependent variables. Must all be positive (>0)." },
      { arg: "known_x's", desc: "Optional. The independent variables." },
      { arg: "const", desc: "Optional. TRUE (default) calculates 'b'; FALSE forces 'b' to 1." },
      { arg: "stats", desc: "Optional. TRUE returns additional regression statistics." }
    ],
    detailedExamples: [
      {
        title: "Growth Curve Parameters",
        table: {
          headers: ["X", "Y", "Output (m)", "Output (b)"],
          rows: [
            ["1", "3", "3", "1"],
            ["2", "9", "", ""],
            ["3", "27", "", ""],
            ["4", "81", "", ""]
          ]
        },
        stepByStep: [
          "Excel identifies the tripling pattern.",
          "Returns m=3 (the growth multiplier) and b=1 (the initial value at x=0).",
          "The equation is: y = 1 * 3^x."
        ]
      }
    ],
    commonMistakes: [
      { title: "Non-positive Y values", desc: "Logest requires all known_y's > 0 because it uses logarithms." },
      { title: "Interpreting 'm'", desc: "Remember that 'm' is the multiplier (1 + growth rate). If m=1.05, the growth rate is 5%." },
      { title: "Interpreting Output", desc: "Output values are already exponentiated." }
    ],
    proTips: [
      "The multiplier 'm' is the average compound factor per unit of X.",
      "Use =INDEX(LOGEST(...), 1) to extract just the growth factor.",
      "Growth rate = m - 1 (as percentage)."
    ],
    relatedFunctions: ["GROWTH", "LINEST", "EXP", "LN"],
    miniChallenge: {
      question: "Y={2,4,8,16,32}, X={1,2,3,4,5}. Find exponential model parameters.",
      expectedAnswer: "m = 2; b = 1 (y = 1 * 2^x)."
    },
    practice: {
      instructions: "In cell B8, find the growth multiplier (m) for Year (A2:A5) and Users (B2:B5) using INDEX(LOGEST, 1).",
      initialData: [["Year", "Users"], [1, 500], [2, 750], [3, 1125], [4, 1688], ["", ""], ["LOGEST: m", ""], ["b", ""]],
      targetCell: [6, 1],
      expectedFormula: "INDEX(LOGEST(B2:B5,A2:A5),1)",
      expectedValue: 1.5
    }
  },
  {
    id: "lognorm.dist",
    title: "LOGNORM.DIST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Lognormal Distribution: LOGNORM.DIST",
      description: "Returns the lognormal distribution of x, where LN(x) is normally distributed with parameters mean and standard_dev.",
      concept: "Used for data that is positively skewed, meaning it has a long right tail. It's the standard model for things like stock prices, real estate values, and income distributions."
    },
    internalLogic: "If X is lognormal, ln(X) is normal with mean and std_dev. Mean of X = exp(μ+σ²/2).",
    whyItExists: "Many real-world variables never drop below zero and show strong right-skewness, making the normal distribution an inappropriate model.",
    whenToUse: "Use LOGNORM.DIST to model asset prices, latent periods of infectious diseases, or durability of mechanical components.",
    realWorldUseCases: [
      "Modeling the distribution of household incomes in a city.",
      "Predicting stock price movements in financial models.",
      "Analyzing the time-to-failure for complex machinery."
    ],
    businessExample: {
      scenario: "Find the probability that a stock price will be ≤ $2 given its log-mean is 0 and log-sd is 1.",
      formula: "=LOGNORM.DIST(2, 0, 1, TRUE)"
    },
    syntax: "=LOGNORM.DIST(x, mean, standard_dev, cumulative)",
    syntaxBreakdown: [
      { arg: "x", desc: "The value at which to evaluate the function (must be > 0)." },
      { arg: "mean", desc: "The mean of ln(x)." },
      { arg: "standard_dev", desc: "The standard deviation of ln(x) (must be > 0)." },
      { arg: "cumulative", desc: "TRUE for cumulative distribution function; FALSE for probability density function." }
    ],
    detailedExamples: [
      {
        title: "Lognormal Probabilities",
        table: {
          headers: ["x", "Mean (ln)", "Std_dev (ln)", "Cumulative", "Result"],
          rows: [
            ["2", "0", "1", "TRUE", "0.7559"],
            ["2", "0", "1", "FALSE", "0.1569"]
          ]
        },
        stepByStep: [
          "Excel takes the natural log of x (LN(2) ≈ 0.693).",
          "It evaluates this on a normal distribution with mean 0 and sd 1.",
          "For TRUE, 75.59% of the distribution is at or below 2.",
          "Result: 0.7559."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using Raw Mean/SD", desc: "You must use the mean and standard deviation of the logarithms of the data, not the data itself." },
      { title: "Non-positive x", desc: "The lognormal distribution is only defined for x > 0." },
      { title: "Parameter Confusion", desc: "Confusing mean of X with mean of ln(X)." }
    ],
    proTips: [
      "Model stock prices, real estate values, income distributions.",
      "If X follows a lognormal distribution, then LN(X) follows a normal distribution.",
      "Mean(ln(data)) = AVERAGE(LN(data))."
    ],
    relatedFunctions: ["LOGNORM.INV", "NORM.DIST"],
    miniChallenge: {
      question: "Lognormal with ln-mean=1, ln-sd=0.5. Find P(X≤4).",
      expectedAnswer: "=LOGNORM.DIST(4, 1, 0.5, TRUE) ≈ 0.779."
    },
    practice: {
      instructions: "In cell B7, calculate the cumulative lognormal distribution for x=3, mean=0.5, and sd=0.3.",
      initialData: [["Parameter", "Value"], ["x", 3], ["Mean (ln)", 0.5], ["Std_dev (ln)", 0.3], ["Cumulative", "TRUE"], ["", ""], ["CDF", ""]],
      targetCell: [6, 1],
      expectedFormula: "LOGNORM.DIST(B2,B3,B4,B5)",
      expectedValue: 0.9772
    }
  },
  {
    id: "lognorm.inv",
    title: "LOGNORM.INV Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Inverse Lognormal: LOGNORM.INV",
      description: "Returns the inverse of the lognormal cumulative distribution function.",
      concept: "It answers: 'What value of x corresponds to a specific probability in a lognormal distribution?' It's the standard tool for finding target values in skewed data."
    },
    internalLogic: "Finds x where P(X ≤ x) = probability. Uses: x = exp(μ + σ × NORM.S.INV(probability)).",
    whyItExists: "Essential for financial risk management (like Value at Risk) and determining confidence intervals for skewed data.",
    whenToUse: "Use LOGNORM.INV to find price targets, income percentiles, or safety thresholds in skewed distributions.",
    realWorldUseCases: [
      "Finding the 95th percentile of home prices in an area.",
      "Calculating 'Value at Risk' (VaR) for a portfolio with lognormal returns.",
      "Setting upper bounds for biological measurements."
    ],
    businessExample: {
      scenario: "Find the 95th percentile of a lognormal distribution with ln-mean 0 and ln-sd 1.",
      formula: "=LOGNORM.INV(0.95, 0, 1)"
    },
    syntax: "=LOGNORM.INV(probability, mean, standard_dev)",
    syntaxBreakdown: [
      { arg: "probability", desc: "The probability associated with the lognormal distribution." },
      { arg: "mean", desc: "The mean of ln(x)." },
      { arg: "standard_dev", desc: "The standard deviation of ln(x) (must be > 0)." }
    ],
    detailedExamples: [
      {
        title: "Percentile Calculation",
        table: {
          headers: ["Probability", "Mean (ln)", "Std_dev (ln)", "Result"],
          rows: [
            ["0.95", "0", "1", "5.1802"]
          ]
        },
        stepByStep: [
          "Probability is 0.95.",
          "Excel finds the corresponding z-score (1.645).",
          "Calculates exp(0 + 1 * 1.645) = exp(1.645).",
          "Result: 5.1802."
        ]
      }
    ],
    commonMistakes: [
      { title: "Probability Limits", desc: "Probability must be between 0 and 1 (exclusive)." },
      { title: "Mean/SD Confusion", desc: "Ensure you use the parameters of the logarithm, not the raw data's mean and SD." },
      { title: "Symmetry Expectation", desc: "Expecting symmetric intervals (lognormal is skewed)." }
    ],
    proTips: [
      "Use for Value at Risk (VaR) calculations.",
      "Confidence bounds: LOGNORM.INV(0.025,μ,σ) to LOGNORM.INV(0.975,μ,σ).",
      "Verify results using LOGNORM.DIST: LOGNORM.DIST(result, μ, σ, TRUE) should equal your probability."
    ],
    relatedFunctions: ["LOGNORM.DIST", "NORM.INV"],
    miniChallenge: {
      question: "Find 99th percentile of lognormal with ln-mean=2, ln-sd=0.8.",
      expectedAnswer: "=LOGNORM.INV(0.99, 2, 0.8) ≈ 47.5."
    },
    practice: {
      instructions: "In cell B6, find the 90th percentile for a lognormal distribution with mean=1.5 and sd=0.4.",
      initialData: [["Parameter", "Value"], ["Probability", 0.9], ["Mean (ln)", 1.5], ["Std_dev (ln)", 0.4], ["", ""], ["LOGNORM.INV", ""]],
      targetCell: [5, 1],
      expectedFormula: "LOGNORM.INV(B2,B3,B4)",
      expectedValue: 7.48
    }
  },
  {
    id: "max",
    title: "MAX Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Finding the Largest Value: MAX",
      description: "Returns the largest numerical value in a set of values.",
      concept: "Think of it as the 'High Score' tracker. It ignores everything except the numbers and picks out the biggest one."
    },
    internalLogic: "Scans all arguments, identifies numeric values, and returns the highest one found. It ignores text, logical values, and empty cells.",
    whyItExists: "Essential for identifying peak performance, highest costs, latest dates, or any 'maximum' threshold in data.",
    whenToUse: "Use MAX to find the highest temperature, top salesperson's revenue, or the most recent date in a range.",
    realWorldUseCases: [
      "Finding the highest monthly sales figure.",
      "Identifying the maximum temperature recorded in a week.",
      "Tracking the all-time high of a stock price."
    ],
    businessExample: {
      scenario: "Find the highest temperature from a list of readings.",
      formula: "=MAX(A2:A6)"
    },
    syntax: "=MAX(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number, cell reference, or range (required)." },
      { arg: "number2", desc: "Additional up to 255 arguments (optional)." }
    ],
    detailedExamples: [
      {
        title: "Temperature Peak",
        table: {
          headers: ["Day", "Temperature", "Formula", "Result"],
          rows: [
            ["Mon", "72", "=MAX(B2:B6)", "91"],
            ["Tue", "85", "", ""],
            ["Wed", "68", "", ""],
            ["Thu", "91", "", ""],
            ["Fri", "79", "", ""]
          ]
        },
        stepByStep: [
          "Excel looks at the numbers: 72, 85, 68, 91, 79.",
          "Compares them to find the largest.",
          "Result: 91."
        ]
      }
    ],
    commonMistakes: [
      { title: "Including Text", desc: "MAX silently ignores text. If your 'numbers' are stored as text, they won't be counted." },
      { title: "Confusing with MAXA", desc: "MAX ignores logical values (TRUE=1), while MAXA includes them." },
      { title: "Hidden Rows", desc: "Hidden rows still included (unlike SUBTOTAL)." }
    ],
    proTips: [
      "Use with dates to find the latest date.",
      "Combine with IF for conditional maximums (or use MAXIFS).",
      "MAX(0, formula) prevents negative results."
    ],
    relatedFunctions: ["MIN", "MAXA", "MAXIFS", "LARGE"],
    miniChallenge: {
      question: "Find max value: {45, -12, 89, 0, 67, \"N/A\", 92}.",
      expectedAnswer: "92."
    },
    practice: {
      instructions: "In cell B8, find the highest sales amount from the list B2:B6.",
      initialData: [["Salesperson", "Sales"], ["Alice", 45000], ["Bob", 52000], ["Carol", 48000], ["Dave", 61000], ["Eve", 39000], ["", ""], ["MAX Sales", ""]],
      targetCell: [7, 1],
      expectedFormula: "MAX(B2:B6)",
      expectedValue: 61000
    }
  },
  {
    id: "maxa",
    title: "MAXA Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "All-Inclusive Maximum: MAXA",
      description: "Returns the largest value in a set of values, including text and logical values (TRUE/FALSE).",
      concept: "Unlike MAX, which only looks at numbers, MAXA looks at everything. It treats TRUE as 1 and FALSE (or text) as 0."
    },
    internalLogic: "Evaluates all non-empty cells. TRUE = 1, FALSE = 0, and non-numeric text = 0. It then returns the highest value from this combined set.",
    whyItExists: "Useful when logical flags (TRUE/FALSE) should be treated as numeric outcomes (1/0) when looking for a maximum.",
    whenToUse: "Use MAXA when your data includes logical values that you want to represent as 1s or 0s in your analysis.",
    realWorldUseCases: [
      "Evaluating a mix of test scores and 'Pass' (TRUE) flags.",
      "Finding the maximum in a list where 'Completed' (TRUE) should count as 1.",
      "Checking data sets that might have text contaminated with numbers."
    ],
    businessExample: {
      scenario: "Find the maximum value where some entries are logical TRUE (1).",
      formula: "=MAXA(A2:A6)"
    },
    syntax: "=MAXA(value1, [value2], ...)",
    syntaxBreakdown: [
      { arg: "value1", desc: "First value or range to evaluate (required)." },
      { arg: "value2", desc: "Additional arguments (optional)." }
    ],
    detailedExamples: [
      {
        title: "Mixed Value Maximum",
        table: {
          headers: ["Input", "Interpretation", "Formula", "Result"],
          rows: [
            ["0.5", "0.5", "=MAXA(A2:A6)", "1"],
            ["0.8", "0.8", "", ""],
            ["TRUE", "1", "", ""],
            ["0.2", "0.2", "", ""],
            ["FALSE", "0", "", ""]
          ]
        },
        stepByStep: [
          "Interpret values: 0.5, 0.8, 1 (TRUE), 0.2, 0 (FALSE).",
          "Identify the largest: 1.",
          "Result: 1."
        ]
      }
    ],
    commonMistakes: [
      { title: "Text as 0", desc: "Be careful: text evaluates as 0, which might hide actual negative numbers." },
      { title: "TRUE vs 1", desc: "Remember that TRUE only equals 1. If your numbers are all >1, the TRUE won't matter." },
      { title: "MAX confusion", desc: "Confusing with MAX (which ignores logicals)." }
    ],
    proTips: [
      "Use when logical values represent numeric codes.",
      "MAXA typically = MAX unless TRUE values > all numbers.",
      "For strictly numeric data, MAX is safer."
    ],
    relatedFunctions: ["MAX", "MINA", "AVERAGEA"],
    miniChallenge: {
      question: "MAXA of: {5, 0, \"text\", TRUE, 3}. What's the result?",
      expectedAnswer: "5 (since 5 > 1)."
    },
    practice: {
      instructions: "In cell B8, find the maximum including logical values in B2:B6.",
      initialData: [["Response", ""], [7, ""], ["TRUE", ""], [3, ""], ["FALSE", ""], [9, ""], ["", ""], ["MAXA", ""]],
      targetCell: [7, 1],
      expectedFormula: "MAXA(B2:B6)",
      expectedValue: 9
    }
  },
  {
    id: "median",
    title: "MEDIAN Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "The Middle Value: MEDIAN",
      description: "Returns the median, or the middle number, of a set of given numbers.",
      concept: "If you lined up all your numbers from smallest to largest, the median is the one exactly in the middle. It's the 'typical' value that isn't fooled by outliers."
    },
    internalLogic: "Sorts the data. If there's an odd number of values, it returns the middle one. If even, it returns the average of the two middle values. Resistant to outliers.",
    whyItExists: "Averages (mean) can be skewed by one or two very high or very low numbers. The median stays stable.",
    whenToUse: "Use MEDIAN for salaries, house prices, or any data where there are extreme 'outliers' that would make a regular average misleading.",
    realWorldUseCases: [
      "Calculating the median household income.",
      "Finding the median price of houses sold in a month.",
      "Determining the typical time spent on a website."
    ],
    businessExample: {
      scenario: "Find the median income to represent the 'typical' employee salary.",
      formula: "=MEDIAN(A2:A6)"
    },
    syntax: "=MEDIAN(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "First number or range (required)." },
      { arg: "number2", desc: "Additional arguments (optional)." }
    ],
    detailedExamples: [
      {
        title: "Income Distribution",
        table: {
          headers: ["Employee", "Income", "Sorted", "Result"],
          rows: [
            ["A", "35000", "35000", ""],
            ["B", "42000", "38000", ""],
            ["C", "38000", "42000 (Middle)", "=MEDIAN(B2:B6) = 42000"],
            ["D", "45000", "45000", ""],
            ["E", "500000", "500000", ""]
          ]
        },
        stepByStep: [
          "The data is sorted: 35k, 38k, 42k, 45k, 500k.",
          "The middle value (3rd out of 5) is 42,000.",
          "The average would be 131,000 (misleading). The median is 42,000 (typical)."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with MODE", desc: "MEDIAN is the middle number; MODE is the most common number." },
      { title: "Skewed data", desc: "Not using MEDIAN for skewed data (mean misleading)." },
      { title: "Data type", desc: "Expecting MEDIAN to handle text/logical like AVERAGE." }
    ],
    proTips: [
      "Use MEDIAN for salary, income, real estate data.",
      "Compare MEDIAN vs AVERAGE to detect skewness.",
      "Combine with QUARTILE for full distribution."
    ],
    relatedFunctions: ["AVERAGE", "MODE.SNGL", "QUARTILE.EXC"],
    miniChallenge: {
      question: "Find median of {12, 7, 22, 9, 15, 18}.",
      expectedAnswer: "13.5 (Average of 12 and 15)."
    },
    practice: {
      instructions: "In cell B9, calculate the median house price from B2:B7.",
      initialData: [["House Price", ""], [250000, ""], [285000, ""], [310000, ""], [275000, ""], [2500000, ""], [295000, ""], ["", ""], ["MEDIAN", ""]],
      targetCell: [8, 1],
      expectedFormula: "MEDIAN(B2:B7)",
      expectedValue: 290000
    }
  },
  {
    id: "min",
    title: "MIN Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Finding the Smallest Value: MIN",
      description: "Returns the smallest numerical value in a set of values.",
      concept: "Think of it as the 'Floor' finder. It ignores text and empty cells to find the lowest possible number in your range."
    },
    internalLogic: "Scans all arguments, identifies numeric values, and returns the lowest one. It ignores text, logical values, and empty cells. Opposite of MAX.",
    whyItExists: "Essential for identifying minimum costs, lowest temperatures, earliest dates, or any 'bottom' threshold.",
    whenToUse: "Use MIN to find the cheapest product price, the earliest start time, or the lowest score in a test.",
    realWorldUseCases: [
      "Finding the lowest price among multiple vendors.",
      "Identifying the earliest delivery date.",
      "Tracking the 52-week low of a stock."
    ],
    businessExample: {
      scenario: "Find the lowest score in a class test.",
      formula: "=MIN(A2:A6)"
    },
    syntax: "=MIN(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "First number, cell reference, or range (required)." },
      { arg: "number2", desc: "Additional up to 255 arguments (optional)." }
    ],
    detailedExamples: [
      {
        title: "Score Floor",
        table: {
          headers: ["Student", "Score", "Formula", "Result"],
          rows: [
            ["A", "78", "=MIN(B2:B6)", "65"],
            ["B", "92", "", ""],
            ["C", "65", "", ""],
            ["D", "88", "", ""],
            ["E", "71", "", ""]
          ]
        },
        stepByStep: [
          "Excel looks at: 78, 92, 65, 88, 71.",
          "Identifies the lowest value: 65.",
          "Result: 65."
        ]
      }
    ],
    commonMistakes: [
      { title: "Zeros", desc: "MIN counts 0 as a valid number. If you have zeros representing missing data, MIN will return 0." },
      { title: "Hidden Rows", desc: "Standard MIN counts hidden rows." },
      { title: "Data type", desc: "Text and logical values silently ignored." }
    ],
    proTips: [
      "Conditional minimum: MIN(IF(range=criteria,values)) as array.",
      "Use SMALL for nth smallest.",
      "MIN(1, formula) caps at 1."
    ],
    relatedFunctions: ["MAX", "MINA", "MINIFS", "SMALL"],
    miniChallenge: {
      question: "Find minimum ignoring zeros: {5, 0, 3, 8, 0, 2}.",
      expectedAnswer: "2."
    },
    practice: {
      instructions: "In cell B8, find the lowest temperature recorded in B2:B6.",
      initialData: [["Date", "Temperature"], ["1-Jan", 32], ["2-Jan", 28], ["3-Jan", 35], ["4-Jan", 22], ["5-Jan", 30], ["", ""], ["MIN Temp", ""]],
      targetCell: [7, 1],
      expectedFormula: "MIN(B2:B6)",
      expectedValue: 22
    }
  },
  {
    id: "mina",
    title: "MINA Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "All-Inclusive Minimum: MINA",
      description: "Returns the smallest value in a set of values, including text and logical values (TRUE/FALSE).",
      concept: "The counterpart to MAXA. It treats TRUE as 1 and non-numeric text or FALSE as 0. This means if there is any text or a FALSE in your range, MINA will often return 0."
    },
    internalLogic: "Evaluates all non-empty cells. TRUE = 1, FALSE = 0, and non-numeric text = 0. It returns the smallest value in the set. Unlike MIN, does not ignore logical values.",
    whyItExists: "Useful when logical status or the presence of text should be interpreted as a 'zero' value when looking for the bottom of a dataset.",
    whenToUse: "Use MINA when your data includes logical values or text that you want to count as 0/1 in your minimum check.",
    realWorldUseCases: [
      "Checking for any 'Incomplete' (Text/0) or 'False' entries in a set of success values.",
      "Identifying the 'floor' of a mixed-data checklist.",
      "Analyzing status codes where logical flags represent numeric states."
    ],
    businessExample: {
      scenario: "Find the minimum value where some entries are logical FALSE (0).",
      formula: "=MINA(A2:A6)"
    },
    syntax: "=MINA(value1, [value2], ...)",
    syntaxBreakdown: [
      { arg: "value1", desc: "First value or range to evaluate (required)." },
      { arg: "value2", desc: "Additional arguments (optional)." }
    ],
    detailedExamples: [
      {
        title: "Mixed Value Minimum",
        table: {
          headers: ["Input", "Interpretation", "Formula", "Result"],
          rows: [
            ["10", "10", "=MINA(A2:A6)", "0"],
            ["5", "5", "", ""],
            ["TRUE", "1", "", ""],
            ["8", "8", "", ""],
            ["FALSE", "0", "", ""]
          ]
        },
        stepByStep: [
          "Interpret values: 10, 5, 1 (TRUE), 8, 0 (FALSE).",
          "Identify the smallest: 0.",
          "Result: 0."
        ]
      }
    ],
    commonMistakes: [
      { title: "Unexpected Zeros", desc: "Because text and FALSE both equal 0, MINA will return 0 if almost any non-numeric data is present." },
      { title: "Pure Numbers", desc: "If you only have positive numbers and one text string, your minimum becomes 0." },
      { title: "MINA where MIN is needed", desc: "Using MINA where MIN is more appropriate." }
    ],
    proTips: [
      "MINA often equals 0 when FALSE or text present.",
      "Useful when logical values intentionally represent numeric codes.",
      "MIN is safer for pure numeric data."
    ],
    relatedFunctions: ["MIN", "MAXA", "AVERAGEA"],
    miniChallenge: {
      question: "MINA of: {7, TRUE, 3, \"apple\", 2}. Result?",
      expectedAnswer: "0 (because \"apple\" = 0)."
    },
    practice: {
      instructions: "In cell B8, find the MINA of the mixed values in B2:B6.",
      initialData: [["Status", "Value"], ["Active", 15], ["Inactive", "FALSE"], ["Active", 20], ["Pending", "TRUE"], ["Active", 10], ["", ""], ["MINA", ""]],
      targetCell: [7, 1],
      expectedFormula: "MINA(B2:B6)",
      expectedValue: 0
    }
  },
  {
    id: "mode.mult",
    title: "MODE.MULT Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Multiple Modes: MODE.MULT",
      description: "Returns a vertical array of the most frequently occurring or repetitive values in an array or range of data.",
      concept: "Unlike standard mode which only gives you one result, MODE.MULT is designed to find all values that tie for the highest frequency. It's an array function, meaning it can return multiple answers at once."
    },
    internalLogic: "Excel scans the data, counts the frequency of each value, and identifies all values that share the highest frequency. It then returns these values as a vertical array.",
    whyItExists: "Datasets are often 'multimodal' (having more than one peak). Using a single mode function would hide the fact that multiple distinct values are equally common.",
    whenToUse: "Use MODE.MULT when analyzing data where multiple outcomes might be equally popular, such as most common shoe sizes or most frequent daily sales figures.",
    realWorldUseCases: [
      "Identifying all popular products in a sales tie.",
      "Finding multiple peak times for traffic or arrivals.",
      "Determining all 'most common' results in a survey where ties exist."
    ],
    businessExample: {
      scenario: "Find all values that occur most frequently in a list of sales amounts.",
      formula: "=MODE.MULT(A2:A8)"
    },
    syntax: "=MODE.MULT(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "First number or range (required)." },
      { arg: "number2", desc: "Additional numbers or ranges up to 255 (optional)." }
    ],
    detailedExamples: [
      {
        title: "Tied Frequency Mode",
        table: {
          headers: ["Value", "Frequency", "Result Area", "Result"],
          rows: [
            ["10", "3", "Mode 1", "10"],
            ["20", "3", "Mode 2", "20"],
            ["30", "1", "", ""]
          ]
        },
        stepByStep: [
          "Excel counts that 10 appears 3 times and 20 appears 3 times.",
          "Since they tie for the highest frequency, both are identified as modes.",
          "The function returns {10; 20} as a vertical array."
        ]
      }
    ],
    commonMistakes: [
      { title: "Not enough space", desc: "If you don't select enough cells in older Excel versions, you won't see all the modes." },
      { title: "#N/A in extras", desc: "If you select more cells than there are modes, Excel fills the extras with #N/A errors." },
      { title: "Legacy Entry", desc: "In pre-365 Excel, you must use Ctrl+Shift+Enter for this to work correctly." }
    ],
    proTips: [
      "Wrap with IFERROR to clean up #N/A results: =IFERROR(MODE.MULT(range),\"\").",
      "Use TRANSPOSE(MODE.MULT(...)) if you want the results in a horizontal row.",
      "In modern Excel (365), the results 'spill' automatically, so you only need one cell."
    ],
    relatedFunctions: ["MODE.SNGL", "AVERAGE", "MEDIAN"],
    miniChallenge: {
      question: "Find all modes for {1, 2, 2, 3, 3, 4, 5}. Which values are returned?",
      expectedAnswer: "2 and 3."
    },
    practice: {
      instructions: "In cell B10, find all modes of the product counts in B2:B8.",
      initialData: [["Item", "Count"], ["A", 5], ["B", 12], ["C", 5], ["D", 8], ["E", 12], ["F", 3], ["G", 7], ["", ""], ["Modes", ""]],
      targetCell: [9, 1],
      expectedFormula: "MODE.MULT(B2:B8)",
      expectedValue: 5
    }
  },
  {
    id: "mode.sngl",
    title: "MODE.SNGL Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Most Frequent Value: MODE.SNGL",
      description: "Returns the most frequently occurring, or repetitive, value in an array or range of data.",
      concept: "Think of it as the 'Popularity Contest' winner. It looks through your numbers and picks the one that shows up most often."
    },
    internalLogic: "Excel identifies all numeric values and counts their frequency. It returns the single value with the highest count. If there is a tie, it returns the first one it encounters.",
    whyItExists: "Mode is a key measure of central tendency, especially useful for categorical data that has been coded as numbers (like survey ratings).",
    whenToUse: "Use whenever you need to know the 'most typical' or 'most common' response, such as the most common customer rating or the most frequent test score.",
    realWorldUseCases: [
      "Finding the most common rating in a customer satisfaction survey.",
      "Identifying the most frequent score in a classroom test.",
      "Determining the most common size of an inventory item."
    ],
    businessExample: {
      scenario: "Identify the most common score from a list of exam results.",
      formula: "=MODE.SNGL(A2:A7)"
    },
    syntax: "=MODE.SNGL(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "First number or range (required)." },
      { arg: "number2", desc: "Additional numbers or ranges up to 255 (optional)." }
    ],
    detailedExamples: [
      {
        title: "Test Score Mode",
        table: {
          headers: ["Score", "Count", "Formula", "Result"],
          rows: [
            ["85", "3", "=MODE.SNGL(A2:A7)", "85"],
            ["90", "2", "", ""],
            ["78", "1", "", ""]
          ]
        },
        stepByStep: [
          "Excel identifies that 85 appears three times.",
          "90 appears twice, and 78 appears once.",
          "The highest frequency is 3, belonging to 85.",
          "Result: 85."
        ]
      }
    ],
    commonMistakes: [
      { title: "No Repeats", desc: "If all values in the range are unique, MODE.SNGL returns a #N/A error." },
      { title: "Handling Ties", desc: "If two values tie for most frequent, MODE.SNGL only returns the one that appears first in your data." },
      { title: "Text Values", desc: "Standard MODE functions ignore text. To find the mode of text, you need a more complex INDEX/MATCH/COUNTIF formula." }
    ],
    proTips: [
      "Always check for #N/A to see if your data even has a mode.",
      "MODE.SNGL is the modern replacement for the old MODE function.",
      "Combine with COUNTIF to see exactly how many times the mode occurs."
    ],
    relatedFunctions: ["MODE.MULT", "MEDIAN", "AVERAGE"],
    miniChallenge: {
      question: "Find the mode of {4, 7, 4, 9, 7, 4, 7}. Which value is returned and why?",
      expectedAnswer: "4 (It appears 3 times, tied with 7, but 4 appears earlier in the sequence)."
    },
    practice: {
      instructions: "In cell B10, identify the most common rating from the list in B2:B8.",
      initialData: [["User", "Rating"], ["1", 3], ["2", 5], ["3", 4], ["4", 3], ["5", 5], ["6", 3], ["7", 4], ["", ""], ["MODE", ""]],
      targetCell: [9, 1],
      expectedFormula: "MODE.SNGL(B2:B8)",
      expectedValue: 3
    }
  },
  {
    id: "negbinom.dist",
    title: "NEGBINOM.DIST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "The Waiting Game: NEGBINOM.DIST",
      description: "Returns the negative binomial distribution, the probability that there will be a certain number of failures before a specified number of successes.",
      concept: "Think of it as 'Trials until success'. If a basketball player has a 70% shot, how likely is it that he misses twice BEFORE he makes his 5th basket?"
    },
    internalLogic: "Calculates the probability of exactly 'number_f' failures occurring before 'number_s' successes are achieved, given a constant probability of success.",
    whyItExists: "While the regular Binomial distribution fixes the number of trials and counts successes, the Negative Binomial fixes the successes and counts the trials (or failures) needed.",
    whenToUse: "Use for modeling the number of trials required to reach a specific success threshold, such as the number of calls needed to make 10 sales.",
    realWorldUseCases: [
      "Predicting how many attempts it takes to pass a safety inspection.",
      "Modeling the number of empty houses visited before finding 3 buyers.",
      "Reliability engineering: how many cycles until the 5th failure occurs."
    ],
    businessExample: {
      scenario: "Calculate the probability of 3 failures before achieving 2 successes with a 40% success rate.",
      formula: "=NEGBINOM.DIST(3, 2, 0.4, FALSE)"
    },
    syntax: "=NEGBINOM.DIST(number_f, number_s, probability_s, cumulative)",
    syntaxBreakdown: [
      { arg: "number_f", desc: "The number of failures (required)." },
      { arg: "number_s", desc: "The success threshold (how many successes you want to reach) (required)." },
      { arg: "probability_s", desc: "The probability of success on each trial (between 0 and 1) (required)." },
      { arg: "cumulative", desc: "TRUE for cumulative distribution (at most f failures); FALSE for probability mass function (exactly f failures)." }
    ],
    detailedExamples: [
      {
        title: "Sales Call Success",
        table: {
          headers: ["Parameter", "Value", "Meaning"],
          rows: [
            ["Failures (f)", "3", "3 missed sales"],
            ["Successes (s)", "2", "Goal of 2 sales"],
            ["Rate (p)", "0.4", "40% success rate"],
            ["Result (FALSE)", "0.1382", "13.82% chance of 3 fails before 2nd sale"]
          ]
        },
        stepByStep: [
          "The formula determines total trials = 3 + 2 = 5.",
          "It calculates the probability that the 5th trial is the 2nd success.",
          "Result: 0.1382."
        ]
      }
    ],
    commonMistakes: [
      { title: "Failure vs Total", desc: "Ensure you input 'number of failures', not 'total number of trials'." },
      { title: "Success Threshold", desc: "Don't confuse this with Binomial where successes is the output you're measuring." },
      { title: "Parameter Order", desc: "Double check the order of failures and successes; swapping them changes the scenario completely." }
    ],
    proTips: [
      "Total trials = number_f + number_s.",
      "If number_s = 1, this reduces to the Geometric distribution.",
      "Useful for modeling 'bursty' data where events tend to happen in clusters."
    ],
    relatedFunctions: ["BINOM.DIST", "POISSON.DIST"],
    miniChallenge: {
      question: "Basketball player shoots 70% free throws. What's the probability of 2 misses before making 5?",
      expectedAnswer: "=NEGBINOM.DIST(2, 5, 0.7, FALSE) ≈ 0.185."
    },
    practice: {
      instructions: "In cell B8, calculate the probability of exactly 4 failures before reaching 3 successes with a 50% success rate.",
      initialData: [["Parameter", "Value"], ["number_f", 4], ["number_s", 3], ["probability_s", 0.5], ["cumulative", "FALSE"], ["", ""], ["Exact Prob", ""]],
      targetCell: [7, 1],
      expectedFormula: "NEGBINOM.DIST(B2,B3,B4,B5)",
      expectedValue: 0.1171
    }
  },
  {
    id: "norm.dist",
    title: "NORM.DIST Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "The Bell Curve: NORM.DIST",
      description: "Returns the normal distribution for the specified mean and standard deviation. This is the most common distribution in statistics.",
      concept: "Think of it as the 'Universal Probability' tool. It tells you how likely a value is based on the average and the spread of your data. It's the engine behind IQ scores, height distributions, and quality control."
    },
    internalLogic: "Calculates the probability density or cumulative distribution for the Gaussian bell curve defined by Mean (μ) and Standard Deviation (σ).",
    whyItExists: "Most natural and business phenomena (like error rates or human measurements) cluster around an average, forming a predictable bell shape.",
    whenToUse: "Use NORM.DIST to calculate percentiles, find the probability of being above/below a threshold, or plot a bell curve for your data.",
    realWorldUseCases: [
      "Calculating the proportion of parts that fall within tolerance limits.",
      "Estimating the percentage of the population with a specific test score.",
      "Financial modeling: analyzing the risk of a stock return falling below zero."
    ],
    businessExample: {
      scenario: "Find the probability of scoring 115 or less on an IQ test with mean 100 and sd 15.",
      formula: "=NORM.DIST(115, 100, 15, TRUE)"
    },
    syntax: "=NORM.DIST(x, mean, standard_dev, cumulative)",
    syntaxBreakdown: [
      { arg: "x", desc: "The value you want to test (required)." },
      { arg: "mean", desc: "The arithmetic mean of the distribution (required)." },
      { arg: "standard_dev", desc: "The standard deviation of the distribution (must be > 0) (required)." },
      { arg: "cumulative", desc: "TRUE returns the cumulative distribution (probability of being ≤ x); FALSE returns the probability density function (height of the curve at x)." }
    ],
    detailedExamples: [
      {
        title: "IQ Score Probability",
        table: {
          headers: ["x (Score)", "Mean", "Std Dev", "Cumulative", "Result"],
          rows: [
            ["115", "100", "15", "TRUE", "0.8413"],
            ["115", "100", "15", "FALSE", "0.0161"]
          ]
        },
        stepByStep: [
          "Excel calculates the z-score: (115 - 100) / 15 = 1.00.",
          "For TRUE, it finds the total area to the left of 1.00.",
          "Result: 0.8413 (84.13% of people score 115 or less)."
        ]
      }
    ],
    commonMistakes: [
      { title: "Standard_dev ≤ 0", desc: "Standard deviation must be a positive number; otherwise Excel returns #NUM!." },
      { title: "Probability vs Density", desc: "Remember that FALSE returns the 'height' of the curve, which is NOT a probability (probabilities for continuous data are area-based)." },
      { title: "Reversing parameters", desc: "Ensure you don't swap the Mean and Standard Deviation." }
    ],
    proTips: [
      "For the probability of being ABOVE a value, use =1 - NORM.DIST(x, μ, σ, TRUE).",
      "The 68-95-99.7 rule: ~68% of data is within ±1 SD, ~95% within ±2 SD.",
      "Use FALSE as the cumulative flag to generate data points for drawing a bell curve on a chart."
    ],
    relatedFunctions: ["NORM.INV", "NORM.S.DIST", "STANDARDIZE"],
    miniChallenge: {
      question: "Heights have μ=68\" and σ=3\". What proportion of people are taller than 74\" (2 standard deviations above mean)?",
      expectedAnswer: "≈ 2.28% (calculated as 1 - NORM.DIST(74, 68, 3, TRUE))."
    },
    practice: {
      instructions: "In cell B8, calculate the probability P(X≤85) for a distribution with mean=75 and sd=8.",
      initialData: [["Parameter", "Value"], ["x", 85], ["Mean", 75], ["Std_dev", 8], ["Cumulative", "TRUE"], ["", ""], ["Probability", ""]],
      targetCell: [7, 1],
      expectedFormula: "NORM.DIST(B2,B3,B4,B5)",
      expectedValue: 0.89435
    }
  },
  {
    id: "norm.inv",
    title: "NORM.INV Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Reverse Bell Curve: NORM.INV",
      description: "Returns the inverse of the normal cumulative distribution for the specified mean and standard deviation.",
      concept: "It answers the question: 'What value do I need to be in a certain percentile?' If you want to know what score is required to be in the top 5% of a test, NORM.INV is your tool."
    },
    internalLogic: "Finds the value x such that NORM.DIST(x, mean, standard_dev, TRUE) equals the specified probability.",
    whyItExists: "In planning and risk management, you often have a target risk level (probability) and need to find the corresponding threshold value (like safety stock levels or budget limits).",
    whenToUse: "Use NORM.INV to set grade cutoffs, determine inventory safety buffers, or find critical values for custom normal distributions.",
    realWorldUseCases: [
      "Setting the minimum score required to be in the top 10% of applicants.",
      "Calculating how much safety stock is needed to avoid a stockout 99% of the time.",
      "Determining the threshold for a 'High' vs 'Normal' reading in medical data."
    ],
    businessExample: {
      scenario: "Find the score that marks the 95th percentile in a distribution with mean 100 and sd 15.",
      formula: "=NORM.INV(0.95, 100, 15)"
    },
    syntax: "=NORM.INV(probability, mean, standard_dev)",
    syntaxBreakdown: [
      { arg: "probability", desc: "A probability corresponding to the normal distribution (between 0 and 1) (required)." },
      { arg: "mean", desc: "The arithmetic mean of the distribution (required)." },
      { arg: "standard_dev", desc: "The standard deviation of the distribution (required)." }
    ],
    detailedExamples: [
      {
        title: "Target Percentile Search",
        table: {
          headers: ["Probability", "Mean", "Std Dev", "Result (Value)"],
          rows: [
            ["0.95", "100", "15", "124.67"]
          ]
        },
        stepByStep: [
          "You provide a target probability of 95% (0.95).",
          "Excel identifies the z-score for 95% is ~1.645.",
          "Calculates x = 100 + (15 * 1.645) = 124.67.",
          "Result: 124.67."
        ]
      }
    ],
    commonMistakes: [
      { title: "Out of Bounds", desc: "Probability must be strictly between 0 and 1. Entering 0, 1, or numbers outside this range returns #NUM!." },
      { title: "Standard Normal Mix-up", desc: "Don't confuse with NORM.S.INV, which is only for mean 0 and sd 1." },
      { title: "Sample stats", desc: "Using sample statistics without verifying if the underlying data is actually normal." }
    ],
    proTips: [
      "To find the top 5%, use 0.95. To find the bottom 5%, use 0.05.",
      "Useful for inventory management: Lead Time Demand + NORM.INV(service_level, 0, σ_demand) gives your safety stock.",
      "Check your work: NORM.DIST(result, mean, sd, TRUE) should return your original probability."
    ],
    relatedFunctions: ["NORM.DIST", "NORM.S.INV", "CONFIDENCE.NORM"],
    miniChallenge: {
      question: "Find the score at the 90th percentile for SAT scores (μ=500, σ=100).",
      expectedAnswer: "≈ 628 (calculated as =NORM.INV(0.9, 500, 100))."
    },
    practice: {
      instructions: "In cell B7, find the 10th percentile value for a distribution with mean=200 and sd=25.",
      initialData: [["Parameter", "Value"], ["Probability", 0.1], ["Mean", 200], ["Std_dev", 25], ["", ""], ["Result", ""]],
      targetCell: [6, 1],
      expectedFormula: "NORM.INV(B2,B3,B4)",
      expectedValue: 167.96
    }
  },
  {
    id: "norm.s.dist",
    title: "NORM.S.DIST Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Standard Normal: NORM.S.DIST",
      description: "Returns the standard normal distribution (has a mean of zero and a standard deviation of one).",
      concept: "Think of this as the 'Pure Bell Curve'. In statistics, we often convert messy real-world data into z-scores (standard units) so we can compare different things fairly. NORM.S.DIST is the tool used for these z-scores."
    },
    internalLogic: "Evaluates the integral (area) or the height of the curve for the Standard Normal distribution (μ=0, σ=1) at point z.",
    whyItExists: "Standardization allows us to compare variables measured in different units (like comparing weight in kg to height in cm) using a common scale.",
    whenToUse: "Use NORM.S.DIST when you already have a z-score and want to find the p-value or the probability associated with it.",
    realWorldUseCases: [
      "Calculating p-values for hypothesis testing.",
      "Finding the probability associated with a specific number of standard deviations from the mean.",
      "Determining critical values for confidence intervals."
    ],
    businessExample: {
      scenario: "Find the probability of a z-score being 1.96 or less.",
      formula: "=NORM.S.DIST(1.96, TRUE)"
    },
    syntax: "=NORM.S.DIST(z, cumulative)",
    syntaxBreakdown: [
      { arg: "z", desc: "The value for which you want the distribution (standard deviations from mean) (required)." },
      { arg: "cumulative", desc: "TRUE for cumulative distribution (probability); FALSE for probability density function (height of curve)." }
    ],
    detailedExamples: [
      {
        title: "Standard Normal Probabilities",
        table: {
          headers: ["z", "Cumulative", "Result", "Meaning"],
          rows: [
            ["1.96", "TRUE", "0.9750", "97.5% below this point"],
            ["0", "TRUE", "0.5000", "Exactly half (the mean)"],
            ["-1.96", "TRUE", "0.0250", "2.5% below this point"]
          ]
        },
        stepByStep: [
          "Input z = 1.96.",
          "Excel finds the area under the curve from -infinity to 1.96.",
          "Result: 0.9750."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using Raw Data", desc: "Do NOT input your raw data value (x) here. You must first convert it to a z-score: z = (x - mean) / sd." },
      { title: "Missing Parameter", desc: "Unlike older versions, you MUST specify the cumulative flag (TRUE or FALSE)." }
    ],
    proTips: [
      "NORM.S.DIST(z, TRUE) is identical to NORM.DIST(z, 0, 1, TRUE).",
      "For a two-tailed p-value: =2 * (1 - NORM.S.DIST(ABS(z), TRUE)).",
      "The value 1.96 is famous because it marks the point where only 2.5% remains in the right tail (making it the 5% threshold for two-tailed tests)."
    ],
    relatedFunctions: ["NORM.DIST", "NORM.S.INV", "STANDARDIZE"],
    miniChallenge: {
      question: "Find the total area between z = -1.5 and z = 1.5.",
      expectedAnswer: "≈ 0.8664 (calculated as NORM.S.DIST(1.5, TRUE) - NORM.S.DIST(-1.5, TRUE))."
    },
    practice: {
      instructions: "In cell B6, find the cumulative probability for a z-score of 2.5.",
      initialData: [["z-score", "2.5"], ["Cumulative", "TRUE"], ["", ""], ["P(Z<=2.5)", ""]],
      targetCell: [3, 1],
      expectedFormula: "NORM.S.DIST(B1,TRUE)",
      expectedValue: 0.99379
    }
  },
  {
    id: "norm.s.inv",
    title: "NORM.S.INV Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Standard Inverse: NORM.S.INV",
      description: "Returns the inverse of the standard normal cumulative distribution.",
      concept: "It's the 'Z-Score Finder'. If you know you want to be in the 90th percentile, NORM.S.INV tells you how many standard deviations from the mean you need to be."
    },
    internalLogic: "Finds the z-value such that the area under the standard normal curve to the left of z is equal to the provided probability.",
    whyItExists: "Crucial for calculating margin of error in confidence intervals and finding critical values for z-tests.",
    whenToUse: "Use NORM.S.INV to find the z-value for a specific confidence level or to create thresholds for standardized comparisons.",
    realWorldUseCases: [
      "Finding the z-multiplier for a 95% confidence interval (1.96).",
      "Determining thresholds for quality control 'sigma' levels.",
      "Setting standardized performance tiers."
    ],
    businessExample: {
      scenario: "Find the z-score for the 97.5th percentile.",
      formula: "=NORM.S.INV(0.975)"
    },
    syntax: "=NORM.S.INV(probability)",
    syntaxBreakdown: [
      { arg: "probability", desc: "The probability associated with the normal distribution (between 0 and 1) (required)." }
    ],
    detailedExamples: [
      {
        title: "Critical Z-Score Lookup",
        table: {
          headers: ["Target Probability", "Formula", "Result (Z-score)"],
          rows: [
            ["0.975", "=NORM.S.INV(0.975)", "1.96"],
            ["0.95", "=NORM.S.INV(0.95)", "1.645"],
            ["0.50", "=NORM.S.INV(0.50)", "0"]
          ]
        },
        stepByStep: [
          "Enter target probability 0.975.",
          "Excel finds the point where 97.5% of area is to the left.",
          "Result: 1.96."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using 0 or 1", desc: "Standard normal curves are asymptotic; a probability of 0 or 1 returns a #NUM! error because the z-score would be ±infinity." },
      { title: "One-tailed vs Two-tailed", desc: "For a 95% confidence level (two-tailed), you need the 97.5th percentile (leaving 2.5% in each tail)." }
    ],
    proTips: [
      "NORM.S.INV(p) = -NORM.S.INV(1-p) due to symmetry.",
      "Common values: 1.645 (90%), 1.96 (95%), 2.576 (99%) for two-tailed confidence.",
      "Used extensively in the formula for Confidence Intervals: Mean ± Z * (SD/sqrt(n))."
    ],
    relatedFunctions: ["NORM.S.DIST", "NORM.INV", "CONFIDENCE.NORM"],
    miniChallenge: {
      question: "Find the z-score for a 99% confidence level (two-tailed). Which probability should you input?",
      expectedAnswer: "0.995 (Result ≈ 2.576)."
    },
    practice: {
      instructions: "In cell B4, find the z-score for a 90% probability.",
      initialData: [["Probability", 0.9], ["", ""], ["z-score", ""]],
      targetCell: [2, 1],
      expectedFormula: "NORM.S.INV(B1)",
      expectedValue: 1.28155
    }
  },
  {
    id: "pearson",
    title: "PEARSON Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Measuring Relationships: PEARSON",
      description: "Returns the Pearson product-moment correlation coefficient, r, a dimensionless index that ranges from -1.0 to 1.0 inclusive.",
      concept: "It's the 'Teamwork Tracker'. It measures how well two variables move together. If one goes up when the other goes up, it's positive. If they have no pattern, it's zero."
    },
    internalLogic: "Calculates r = Σ(x-x̄)(y-ȳ) / √(Σ(x-x̄)² * Σ(y-ȳ)²). This measures the strength of the *linear* relationship between two sets of data.",
    whyItExists: "Identifying correlations is the first step in predicting outcomes. If study hours and grades have a high Pearson r, we know they are strongly related.",
    whenToUse: "Use PEARSON to quantify the relationship between two variables, like height vs. weight or advertising spend vs. revenue.",
    realWorldUseCases: [
      "Analyzing the relationship between study hours and exam scores.",
      "Measuring how closely stock prices of two companies move together.",
      "Checking if temperature correlates with ice cream sales."
    ],
    businessExample: {
      scenario: "Calculate the correlation between study hours (A2:A6) and exam scores (B2:B6).",
      formula: "=PEARSON(A2:A6, B2:B6)"
    },
    syntax: "=PEARSON(array1, array2)",
    syntaxBreakdown: [
      { arg: "array1", desc: "A set of independent values (required)." },
      { arg: "array2", desc: "A set of dependent values (must be same size as array1) (required)." }
    ],
    detailedExamples: [
      {
        title: "Study vs Exam Correlation",
        table: {
          headers: ["Study Hours (X)", "Exam Score (Y)"],
          rows: [
            ["2", "65"],
            ["4", "75"],
            ["6", "85"],
            ["8", "90"],
            ["10", "95"]
          ]
        },
        stepByStep: [
          "Excel compares each X value to its mean and each Y value to its mean.",
          "It calculates the degree to which they vary together.",
          "Result: 0.9934.",
          "Meaning: Extremely strong positive linear relationship."
        ]
      }
    ],
    commonMistakes: [
      { title: "Correlation vs Causation", desc: "Just because r is high doesn't mean X causes Y. They might both be caused by something else!" },
      { title: "Size Mismatch", desc: "Both arrays must have the exact same number of data points, or Excel returns #N/A." },
      { title: "Non-Linear Patterns", desc: "PEARSON only detects straight-line relationships. It might return 0 for a perfect curve (like a circle or U-shape)." }
    ],
    proTips: [
      "PEARSON and CORREL are identical functions in Excel.",
      "Square the result (r²) to find the 'Coefficient of Determination' (RSQ), which tells you what percentage of the variance is shared.",
      "Always look at a scatter plot; outliers can artificially inflate or deflate your Pearson r."
    ],
    relatedFunctions: ["CORREL", "RSQ", "COVARIANCE.P", "LINEST"],
    miniChallenge: {
      question: "Calculate r for: X={1,2,3,4,5}, Y={1,4,9,16,25}. Is it a perfect 1.0?",
      expectedAnswer: "No (it's ≈ 0.981), because the relationship is a curve (Y=X²), not a perfect straight line."
    },
    practice: {
      instructions: "In cell B8, find the correlation between Temperature (A2:A6) and Sales (B2:B6).",
      initialData: [["Temp", "Sales"], [70, 50], [75, 65], [80, 80], [85, 95], [90, 110], ["", ""], ["Correlation", ""]],
      targetCell: [7, 1],
      expectedFormula: "PEARSON(A2:A6,B2:B6)",
      expectedValue: 1
    }
  },
  {
    id: "percentile.exc",
    title: "PERCENTILE.EXC Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Exclusive Percentile: PERCENTILE.EXC",
      description: "Returns the k-th percentile of values in a range, where k is in the range 0..1, exclusive.",
      concept: "Think of it as finding the 'cutoff point' for a specific percentage of your data. The exclusive method is preferred by statisticians as it's more conservative at the extremes."
    },
    internalLogic: "Uses the (n+1)th method for interpolation. Position = k × (n + 1). If the position is not an integer, Excel interpolates between the adjacent values.",
    whyItExists: "Businesses need to identify outliers and set benchmarks (e.g., top 10% performance). PERCENTILE.EXC provides a mathematically robust way to find these points.",
    whenToUse: "Use for professional statistical reporting and when you need to exclude the absolute minimum and maximum from your percentile bounds.",
    realWorldUseCases: [
      "Determining the 90th percentile for customer wait times.",
      "Setting bonus thresholds for the top 25% of sales staff.",
      "Identifying the first and third quartiles for a box plot (Q1=0.25, Q3=0.75)."
    ],
    businessExample: {
      scenario: "Find the 25th percentile of sales in a list of 10 values.",
      formula: "=PERCENTILE.EXC(A2:A11, 0.25)"
    },
    syntax: "=PERCENTILE.EXC(array, k)",
    syntaxBreakdown: [
      { arg: "array", desc: "The range of data you want to analyze (required)." },
      { arg: "k", desc: "The percentile value between 0 and 1, exclusive (required)." }
    ],
    detailedExamples: [
      {
        title: "Interpolated Percentile",
        table: {
          headers: ["Value", "Formula", "Result", "Notes"],
          rows: [
            ["10, 20, 30, 40, 50, 60, 70, 80, 90, 100", "=PERCENTILE.EXC(A2:A11, 0.25)", "27.5", "Interpolated between 20 and 30"],
            ["", "=PERCENTILE.EXC(A2:A11, 0.5)", "55", "Median using EXC method"]
          ]
        },
        stepByStep: [
          "Count (n) = 10. Position = 0.25 × (10 + 1) = 2.75.",
          "Excel looks at the 2nd value (20) and 3rd value (30).",
          "It calculates 20 + 0.75 × (30 - 20) = 27.5."
        ]
      }
    ],
    commonMistakes: [
      { title: "k=0 or k=1", desc: "PERCENTILE.EXC returns #NUM! for k=0 or k=1. Use PERCENTILE.INC if you need those values." },
      { title: "k as whole number", desc: "You must use 0.25, not 25, to represent the 25th percentile." }
    ],
    proTips: [
      "This is the NIST standard for calculating percentiles.",
      "Always more conservative than the INC method at the top end.",
      "Compatible with QUARTILE.EXC (Q1 = 0.25, Q2 = 0.5, Q3 = 0.75)."
    ],
    relatedFunctions: ["PERCENTILE.INC", "QUARTILE.EXC", "MEDIAN"],
    miniChallenge: {
      question: "Find the 90th percentile (exclusive) of: {5,10,15,20,25,30,35,40,45,50}.",
      expectedAnswer: "Position = 0.9*11 = 9.9. Value = 45 + 0.9*(50-45) = 49.5."
    },
    practice: {
      instructions: "In cell B11, find the 25th percentile (exclusive) of the salaries in B2:B9.",
      initialData: [["Employee", "Salary"], ["1", 45000], ["2", 52000], ["3", 48000], ["4", 55000], ["5", 62000], ["6", 51000], ["7", 58000], ["8", 49000], ["", ""], ["25th Percentile", ""]],
      targetCell: [10, 1],
      expectedFormula: "PERCENTILE.EXC(B2:B9,0.25)",
      expectedValue: 48250
    }
  },
  {
    id: "percentile.inc",
    title: "PERCENTILE.INC Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Inclusive Percentile: PERCENTILE.INC",
      description: "Returns the k-th percentile of values in a range, where k is in the range 0..1, inclusive.",
      concept: "The 'everyday' percentile. Unlike the exclusive version, this one allows you to calculate the 0th percentile (the minimum) and the 100th percentile (the maximum)."
    },
    internalLogic: "Uses the (n-1)th method for interpolation. Position = k × (n - 1) + 1. It linearly interpolates between adjacent values.",
    whyItExists: "Most business reporting and common standardized tests use the inclusive method because it's intuitive and covers the entire data range from min to max.",
    whenToUse: "Use for standard business KPIs and whenever you need 0% or 100% to be valid inputs.",
    realWorldUseCases: [
      "Calculating the median (50th percentile) of a dataset.",
      "Summarizing test scores where the minimum and maximum must be included.",
      "Averaging percentiles from different sources."
    ],
    businessExample: {
      scenario: "Find the 25th percentile of sales in a list of 10 values.",
      formula: "=PERCENTILE.INC(A2:A11, 0.25)"
    },
    syntax: "=PERCENTILE.INC(array, k)",
    syntaxBreakdown: [
      { arg: "array", desc: "The range of data you want to analyze (required)." },
      { arg: "k", desc: "The percentile value between 0 and 1, inclusive (required)." }
    ],
    detailedExamples: [
      {
        title: "Standard Percentile",
        table: {
          headers: ["Value", "k", "Formula", "Result"],
          rows: [
            ["10, 20, 30, 40, 50, 60, 70, 80, 90, 100", "0.25", "=PERCENTILE.INC(A2:A11, 0.25)", "32.5"],
            ["", "0", "=PERCENTILE.INC(A2:A11, 0)", "10 (Min)"],
            ["", "1", "=PERCENTILE.INC(A2:A11, 1)", "100 (Max)"]
          ]
        },
        stepByStep: [
          "Count (n) = 10. Position = 0.25 × (10 - 1) + 1 = 3.25.",
          "Excel looks at the 3rd value (30) and 4th value (40).",
          "It calculates 30 + 0.25 × (40 - 30) = 32.5."
        ]
      }
    ],
    commonMistakes: [
      { title: "EXC vs INC", desc: "Forgetting that INC and EXC give different results for the same k. INC is generally 'tighter'." },
      { title: "Input Format", desc: "Entering k as 25 instead of 0.25." }
    ],
    proTips: [
      "PERCENTILE.INC(array, 0.5) is exactly the same as MEDIAN(array).",
      "This function is compatible with older versions of Excel (the original PERCENTILE function).",
      "Use this for 'Five-Number Summaries' in finance."
    ],
    relatedFunctions: ["PERCENTILE.EXC", "QUARTILE.INC", "MEDIAN"],
    miniChallenge: {
      question: "Find the 0th, 50th, and 100th percentiles of {12, 8, 15, 20, 10}.",
      expectedAnswer: "8, 12, and 20."
    },
    practice: {
      instructions: "In cell B11, find the 90th percentile (inclusive) of the test scores in B2:B9.",
      initialData: [["Student", "Score"], ["1", 72], ["2", 85], ["3", 68], ["4", 91], ["5", 78], ["6", 88], ["7", 95], ["8", 74], ["", ""], ["90th Percentile", ""]],
      targetCell: [10, 1],
      expectedFormula: "PERCENTILE.INC(B2:B9,0.9)",
      expectedValue: 92.2
    }
  },
  {
    id: "percentrank.exc",
    title: "PERCENTRANK.EXC Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Relative Exclusive Rank: PERCENTRANK.EXC",
      description: "Returns the rank of a value in a data set as a percentage (0..1, exclusive) of the data set.",
      concept: "It's the reverse of the percentile function. Instead of 'What score is at 90%?', you ask 'What is the percentile rank of this specific score?' The exclusive method excludes the floor and ceiling from the calculation."
    },
    internalLogic: "Uses the (n+1) method: position/(n+1). If x is not in the array, Excel interpolates to find the rank.",
    whyItExists: "Crucial for identifying where a specific data point falls relative to the rest of the group in a robust statistical way.",
    whenToUse: "Use for standardized rankings where you want to avoid giving the top value a rank of exactly 1.0 (100%).",
    realWorldUseCases: [
      "Determining the percentile rank of a student's SAT score.",
      "Finding where a company's profit margin sits compared to competitors.",
      "Analyzing sensor data to find if a reading is unusually high or low."
    ],
    businessExample: {
      scenario: "Find the percentage rank of the value 40 in a set of 6 numbers.",
      formula: "=PERCENTRANK.EXC(A2:A7, 40)"
    },
    syntax: "=PERCENTRANK.EXC(array, x, [significance])",
    syntaxBreakdown: [
      { arg: "array", desc: "The range of data (required)." },
      { arg: "x", desc: "The value you want to rank (required)." },
      { arg: "significance", desc: "The number of decimal places for the result (optional, defaults to 3)." }
    ],
    detailedExamples: [
      {
        title: "Percent Rank Search",
        table: {
          headers: ["Data", "Target (x)", "Formula", "Result"],
          rows: [
            ["15, 25, 35, 45, 55, 65", "40", "=PERCENTRANK.EXC(A2:A7, 40)", "0.428"],
            ["", "55", "=PERCENTRANK.EXC(A2:A7, 55)", "0.714"]
          ]
        },
        stepByStep: [
          "Data count (n) = 6.",
          "For x=40, Excel interpolates between the rank of 35 and 45.",
          "Result: 0.4286 (rounded to 0.428 by default significance)."
        ]
      }
    ],
    commonMistakes: [
      { title: "Out of range", desc: "If x is smaller than the minimum or larger than the maximum in the array, Excel returns #N/A." },
      { title: "Significance", desc: "Forgetting that significance controls the display: 0.42 might be returned instead of 0.4286 if significance is set to 2." }
    ],
    proTips: [
      "Use this when you want a more 'statistical' rank that doesn't reach 0 or 1.",
      "If you need exactly 0 for min and 1 for max, use PERCENTRANK.INC.",
      "This function is the inverse of PERCENTILE.EXC."
    ],
    relatedFunctions: ["PERCENTRANK.INC", "PERCENTILE.EXC", "RANK.EQ"],
    miniChallenge: {
      question: "What's the percent rank of 30 in {10, 20, 30, 40, 50}?",
      expectedAnswer: "0.5 (Position 3 out of 5+1 gaps)."
    },
    practice: {
      instructions: "In cell B10, find the percent rank (exclusive) of the value 53 in the stock price list.",
      initialData: [["Stock Price", ""], [52, ""], [58, ""], [45, ""], [62, ""], [48, ""], [55, ""], [60, ""], ["", ""], ["% Rank of 53", ""]],
      targetCell: [9, 1],
      expectedFormula: "PERCENTRANK.EXC(B2:B8,53)",
      expectedValue: 0.5
    }
  },
  {
    id: "percentrank.inc",
    title: "PERCENTRANK.INC Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Relative Inclusive Rank: PERCENTRANK.INC",
      description: "Returns the rank of a value in a data set as a percentage (0..1, inclusive) of the data set.",
      concept: "The 'intuitive' rank. If you have the lowest score, your rank is 0%. If you have the highest, it's 100%. It tells you exactly what percentage of the group you are equal to or better than."
    },
    internalLogic: "Uses the (n-1) method: rank / (n-1). It interpolates for values that are not exactly present in the array.",
    whyItExists: "Standard in business and education for simple percentile ranking (e.g., 'scored in the 99th percentile').",
    whenToUse: "Use for customer segment rankings, performance reporting, and whenever 0% and 100% are meaningful bounds.",
    realWorldUseCases: [
      "Ranking sales performance where top is 100%.",
      "Identifying the percentile of a specific customer's spending.",
      "Standardizing metrics across different departments."
    ],
    businessExample: {
      scenario: "Find the percentage rank of 15 in a set where 15 is the minimum value.",
      formula: "=PERCENTRANK.INC(A2:A7, 15)"
    },
    syntax: "=PERCENTRANK.INC(array, x, [significance])",
    syntaxBreakdown: [
      { arg: "array", desc: "The range of data (required)." },
      { arg: "x", desc: "The value you want to rank (required)." },
      { arg: "significance", desc: "The number of decimal places (optional)." }
    ],
    detailedExamples: [
      {
        title: "Standard Rankings",
        table: {
          headers: ["Data", "Target (x)", "Formula", "Result"],
          rows: [
            ["15, 25, 35, 45, 55, 65", "15", "=PERCENTRANK.INC(A2:A7, 15)", "0.000"],
            ["", "40", "=PERCENTRANK.INC(A2:A7, 40)", "0.416"]
          ]
        },
        stepByStep: [
          "For x=15 (the minimum), the rank is exactly 0.",
          "For x=40, it sits between 35 and 45. Rank = 2.5 / (6-1) = 0.4166.",
          "Result: 0.416."
        ]
      }
    ],
    commonMistakes: [
      { title: "EXC vs INC", desc: "Choosing the wrong method can change a 'top 10%' ranking significantly." },
      { title: "Sample Size", desc: "Small samples give large jumps in rank (e.g., with only 2 items, you are either 0% or 100%)." }
    ],
    proTips: [
      "Inverse of the PERCENTILE.INC function.",
      "The default significance is 3, meaning results like 0.123 are common.",
      "This is the behavior of the legacy PERCENTRANK function."
    ],
    relatedFunctions: ["PERCENTRANK.EXC", "PERCENTILE.INC", "RANK.EQ"],
    miniChallenge: {
      question: "Percent rank of 75 in {50, 60, 70, 80, 90} using INC method?",
      expectedAnswer: "0.625."
    },
    practice: {
      instructions: "In cell B10, find the percent rank (inclusive) of the sales amount 140.",
      initialData: [["Employee", "Sales"], ["A", 120], ["B", 150], ["C", 95], ["D", 180], ["E", 135], ["F", 165], ["", ""], ["%Rank of 140", ""]],
      targetCell: [9, 1],
      expectedFormula: "PERCENTRANK.INC(B2:B7,140)",
      expectedValue: 0.533
    }
  },
  {
    id: "permut",
    title: "PERMUT Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Arrangements: PERMUT",
      description: "Returns the number of permutations for a given number of objects that can be selected from a total number of objects.",
      concept: "Think of it as 'Arranging items where order matters'. If you have 10 books and room for 3 on a shelf, how many distinct ways can you line them up?"
    },
    internalLogic: "Uses the formula: P(n,k) = n! / (n-k)!. It assumes sampling without replacement (you can't pick the same object twice).",
    whyItExists: "Crucial for probability and combinatorial optimization where the sequence is important.",
    whenToUse: "Use PERMUT for lottery odds (where order matters), race finish positions, or seating arrangements.",
    realWorldUseCases: [
      "Calculating ways to assign Gold, Silver, and Bronze medals among 8 athletes.",
      "Finding permutations of characters in a password with no repeats.",
      "Determining the number of ways to pick a President, VP, and Secretary from a group."
    ],
    businessExample: {
      scenario: "Find the number of ways to arrange 3 items from a set of 8.",
      formula: "=PERMUT(8, 3)"
    },
    syntax: "=PERMUT(number, number_chosen)",
    syntaxBreakdown: [
      { arg: "number", desc: "Total number of objects (must be an integer ≥ 0)." },
      { arg: "number_chosen", desc: "Number of objects in each permutation (must be an integer, 0 ≤ k ≤ n)." }
    ],
    detailedExamples: [
      {
        title: "Medal Winners",
        table: {
          headers: ["Total (n)", "Chosen (k)", "Formula", "Ways"],
          rows: [
            ["8", "3", "=PERMUT(8, 3)", "336"]
          ]
        },
        stepByStep: [
          "8 objects, 3 spots to fill.",
          "Ways: 8 × 7 × 6 = 336.",
          "Result: 336."
        ]
      }
    ],
    commonMistakes: [
      { title: "Order Matters", desc: "If order DOES NOT matter, use COMBIN. PERMUT gives a much larger number." },
      { title: "Size limit", desc: "k cannot be larger than n." }
    ],
    proTips: [
      "PERMUT(n, n) is the same as FACT(n).",
      "For password logic, PERMUT is for unique characters; PERMUTATIONA is for repeated ones.",
      "Non-integers are truncated automatically."
    ],
    relatedFunctions: ["COMBIN", "PERMUTATIONA", "FACT"],
    miniChallenge: {
      question: "How many 4-letter arrangements from 26 distinct letters?",
      expectedAnswer: "=PERMUT(26, 4) = 358,800."
    },
    practice: {
      instructions: "In cell B4, calculate arrangements of 4 items from 15 using PERMUT.",
      initialData: [["Total", 15], ["Chosen", 4], ["", ""], ["PERMUT", ""]],
      targetCell: [3, 1],
      expectedFormula: "PERMUT(B1,B2)",
      expectedValue: 32760
    }
  },
  {
    id: "permutationa",
    title: "PERMUTATIONA Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Arrangements with Repeats: PERMUTATIONA",
      description: "Returns the number of permutations for a given number of objects (with repetition) that can be selected from the total objects.",
      concept: "The 'PIN Code' logic. If you can use the same number twice (like 1111), you use PERMUTATIONA. Order still matters, but items can repeat."
    },
    internalLogic: "Uses the formula: n^k. Each of the k positions has n possible choices.",
    whyItExists: "Essential for calculating all possible outcomes in systems where repetition is allowed, such as digital codes and genetics.",
    whenToUse: "Use for lock combinations, license plate possibilities, or any sampling with replacement scenario.",
    realWorldUseCases: [
      "Calculating possible 4-digit ATM PINs (10,000).",
      "Finding total possible outcomes for multiple dice rolls.",
      "Determining maximum possible unique IDs of a fixed length."
    ],
    businessExample: {
      scenario: "Find the total possible 3-position arrangements of 5 items where repeats are allowed.",
      formula: "=PERMUTATIONA(5, 3)"
    },
    syntax: "=PERMUTATIONA(number, number_chosen)",
    syntaxBreakdown: [
      { arg: "number", desc: "Total number of objects (n)." },
      { arg: "number_chosen", desc: "Number of objects in each arrangement (k)." }
    ],
    detailedExamples: [
      {
        title: "PIN Possibilities",
        table: {
          headers: ["n (Options)", "k (Length)", "Formula", "Total"],
          rows: [
            ["10", "4", "=PERMUTATIONA(10, 4)", "10,000"],
            ["5", "3", "=PERMUTATIONA(5, 3)", "125"]
          ]
        },
        stepByStep: [
          "Length 3, each position has 5 options.",
          "Calculation: 5 × 5 × 5 = 5³ = 125.",
          "Result: 125."
        ]
      }
    ],
    commonMistakes: [
      { title: "PERMUT vs PERMUTATIONA", desc: "If you can't repeat items, PERMUTATIONA will vastly overestimate the possibilities." },
      { title: "Sampling logic", desc: "Confusing combinations with permutations; PERMUTATIONA counts {A,B} and {B,A} as distinct." }
    ],
    proTips: [
      "Equivalent to =number^number_chosen.",
      "Used in information theory to calculate possible bit strings.",
      "Handy for 'sampling with replacement' scenarios."
    ],
    relatedFunctions: ["PERMUT", "COMBINA", "POWER"],
    miniChallenge: {
      question: "How many 3-digit codes using digits 0-9 (repetition allowed)?",
      expectedAnswer: "1,000 (10^3)."
    },
    practice: {
      instructions: "In cell B4, find total 3-character arrangements from 26 characters (repeats allowed).",
      initialData: [["Chars", 26], ["Length", 3], ["", ""], ["PERMUTATIONA", ""]],
      targetCell: [3, 1],
      expectedFormula: "PERMUTATIONA(B1,B2)",
      expectedValue: 17576
    }
  },
  {
    id: "phi",
    title: "PHI Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 250,
    introduction: {
      title: "Normal Density: PHI",
      description: "Returns the value of the density function for a standard normal distribution.",
      concept: "It tells you the 'Height' of the bell curve at a specific point. While cumulative functions tell you the area, PHI tells you exactly how high the line is at that point."
    },
    internalLogic: "Calculates φ(x) = (1/√(2π)) × e^(-x²/2). This is the probability density function (PDF) for a standard normal distribution.",
    whyItExists: "Necessary for plotting normal curves and calculating densities in advanced statistical formulas.",
    whenToUse: "Use PHI to find the likelihood of a value occurring in a standard normal distribution or for graphical modeling of the bell curve.",
    realWorldUseCases: [
      "Generating data points for a smooth bell curve chart.",
      "Calculating the likelihood ratio in hypothesis testing.",
      "Advanced risk assessments where exact density at a point is needed."
    ],
    businessExample: {
      scenario: "Find the height of the standard normal curve at x=1.",
      formula: "=PHI(1)"
    },
    syntax: "=PHI(x)",
    syntaxBreakdown: [
      { arg: "x", desc: "The number for which you want the density of the standard normal distribution (required)." }
    ],
    detailedExamples: [
      {
        title: "Bell Curve Heights",
        table: {
          headers: ["x", "Formula", "Result", "Note"],
          rows: [
            ["0", "=PHI(0)", "0.3989", "Maximum height (the peak)"],
            ["1", "=PHI(1)", "0.2420", ""],
            ["2", "=PHI(2)", "0.0540", "Tails are very low"]
          ]
        },
        stepByStep: [
          "For x=0: Excel calculates 1/sqrt(2π) ≈ 0.3989.",
          "Result: 0.3989."
        ]
      }
    ],
    commonMistakes: [
      { title: "Probability vs Density", desc: "Density is NOT probability. It can even be greater than 1 for non-standard distributions (though not for PHI which is standard)." },
      { title: "Cumulative confusion", desc: "Confusing PHI with NORM.S.DIST(z, TRUE). PHI is equivalent to NORM.S.DIST(z, FALSE)." }
    ],
    proTips: [
      "PHI(z) = NORM.S.DIST(z, FALSE).",
      "The density is symmetric: PHI(-x) = PHI(x).",
      "Maximum value is at 0 (≈ 0.3989)."
    ],
    relatedFunctions: ["NORM.S.DIST", "GAUSS"],
    miniChallenge: {
      question: "Compare PHI(0) and PHI(2). Which is larger and why?",
      expectedAnswer: "PHI(0) is larger because it is the peak of the bell curve."
    },
    practice: {
      instructions: "In cell B4, find the density for a z-score of 1.5.",
      initialData: [["z", 1.5], ["", ""], ["PHI", ""]],
      targetCell: [2, 1],
      expectedFormula: "PHI(B1)",
      expectedValue: 0.12952
    }
  },
  {
    id: "poisson.dist",
    title: "POISSON.DIST Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Count of Rare Events: POISSON.DIST",
      description: "Returns the Poisson distribution. A common application of the Poisson distribution is predicting the number of events over a specific time, such as the number of cars arriving at a toll plaza in 1 minute.",
      concept: "Think of it as the 'Arrivals Calculator'. If you know things happen at an average rate (like 4 calls per hour), POISSON.DIST tells you how likely it is to get exactly 3, or at most 5."
    },
    internalLogic: "Models the count of independent events occurring at a constant rate in a fixed interval. PMF: P(X=k) = (e^(-λ)×λ^k)/k!. Mean = Variance = λ.",
    whyItExists: "Standard probability models fail for 'counts' in continuous intervals. Poisson is the mathematical gold standard for modeling arrivals and rare occurrences.",
    whenToUse: "Use for modeling queues, customer arrivals, defect counts on a production line, or radioactive decay.",
    realWorldUseCases: [
      "Predicting number of website crashes per month.",
      "Estimating inventory needs based on daily customer arrival rates.",
      "Calculating the risk of rare medical occurrences in a population."
    ],
    businessExample: {
      scenario: "Find the probability of exactly 3 calls arriving in an hour where the average rate is 4 per hour.",
      formula: "=POISSON.DIST(3, 4, FALSE)"
    },
    syntax: "=POISSON.DIST(x, mean, cumulative)",
    syntaxBreakdown: [
      { arg: "x", desc: "The number of events (must be a non-negative integer) (required)." },
      { arg: "mean", desc: "The expected numeric value (average rate) (required)." },
      { arg: "cumulative", desc: "TRUE for cumulative distribution (at most x events); FALSE for probability mass function (exactly x events)." }
    ],
    detailedExamples: [
      {
        title: "Call Center Arrivals",
        table: {
          headers: ["x (Events)", "λ (Mean Rate)", "Cumulative", "Result"],
          rows: [
            ["3", "4", "FALSE", "0.1954"],
            ["3", "4", "TRUE", "0.4335"]
          ]
        },
        stepByStep: [
          "Average λ = 4 calls per hour.",
          "For x=3 (FALSE), P(X=3) = e^(-4)×4³/3! ≈ 0.1954.",
          "For x=3 (TRUE), P(X≤3) = P(0)+P(1)+P(2)+P(3) ≈ 0.4335."
        ]
      }
    ],
    commonMistakes: [
      { title: "Mean Rate Error", desc: "Ensure your mean rate is for the SAME time interval as your x value." },
      { title: "Dependency", desc: "Using Poisson when events are not independent (e.g., people arriving in groups)." },
      { title: "Non-positive Mean", desc: "The mean must be greater than zero." }
    ],
    proTips: [
      "Use for rare event counts: accidents, arrivals, defects.",
      "If the mean (λ) is large (e.g., >20), the Poisson distribution looks like a Normal distribution.",
      "To find the probability of 'more than k' events, use =1 - POISSON.DIST(k, λ, TRUE)."
    ],
    relatedFunctions: ["BINOM.DIST", "NORM.DIST", "EXPON.DIST"],
    miniChallenge: {
      question: "A store averages 2 customers per minute. What's the probability of exactly 0 customers in the next minute?",
      expectedAnswer: "≈ 0.135 (calculated as =POISSON.DIST(0, 2, FALSE))."
    },
    practice: {
      instructions: "In cell B8, calculate the probability of exactly 2 events when the average is 5.",
      initialData: [["Parameter", "Value"], ["x", 2], ["Mean", 5], ["Cumulative", "FALSE"], ["", ""], ["P(X=2)", ""], ["P(X≤2)", ""]],
      targetCell: [5, 1],
      expectedFormula: "POISSON.DIST(B2,B3,FALSE)",
      expectedValue: 0.08422
    }
  },
  {
    id: "prob",
    title: "PROB Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Custom Range Probability: PROB",
      description: "Returns the probability that values in a range are between two limits.",
      concept: "Think of it as a 'Probability Adder'. If you have a list of possible outcomes (like dice rolls) and their odds, PROB adds them up for any range you specify."
    },
    internalLogic: "Sums the probabilities for all values in x_range that satisfy: lower_limit ≤ value ≤ upper_limit.",
    whyItExists: "When dealing with discrete custom distributions (not standard ones like Normal or Poisson), you need a way to sum probabilities for specific segments.",
    whenToUse: "Use PROB when you have a set of unique outcomes and their known probabilities and want to find the likelihood of a range of results.",
    realWorldUseCases: [
      "Calculating the chance of a project cost falling between two budget points.",
      "Finding the probability of a shipment containing between 5 and 10 items based on history.",
      "Estimating the likelihood of daily temperatures falling in a specific range."
    ],
    businessExample: {
      scenario: "Find the probability of a value being between 20 and 40 based on a custom discrete distribution.",
      formula: "=PROB(A2:A5, B2:B5, 20, 40)"
    },
    syntax: "=PROB(x_range, prob_range, lower_limit, [upper_limit])",
    syntaxBreakdown: [
      { arg: "x_range", desc: "The range of numeric independent variables (required)." },
      { arg: "prob_range", desc: "A set of probabilities associated with values in x_range (required, sum must equal 1)." },
      { arg: "lower_limit", desc: "The lower bound for which you want a probability (required)." },
      { arg: "upper_limit", desc: "Optional. The upper bound. If omitted, PROB returns the probability of exactly lower_limit." }
    ],
    detailedExamples: [
      {
        title: "Discrete Event Probabilities",
        table: {
          headers: ["Value (X)", "Probability", "Range to Test", "Result"],
          rows: [
            ["10", "0.2", "20 to 40", "0.8"],
            ["20", "0.3", "", ""],
            ["30", "0.4", "", ""],
            ["40", "0.1", "", ""]
          ]
        },
        stepByStep: [
          "Target range: [20, 40].",
          "Excel identifies values in range: 20 (0.3), 30 (0.4), 40 (0.1).",
          "Sums probabilities: 0.3 + 0.4 + 0.1 = 0.8.",
          "Result: 0.8."
        ]
      }
    ],
    commonMistakes: [
      { title: "Sum is not 1", desc: "If the probabilities in prob_range don't sum to 1, Excel returns #NUM!." },
      { title: "Range Size", desc: "x_range and prob_range must be the exact same size." },
      { title: "Negative Probabilities", desc: "If any probability is ≤ 0 or > 1, returns #NUM!." }
    ],
    proTips: [
      "Always verify that =SUM(prob_range) is 1.0.",
      "Use PROB to find probabilities for non-standard, empirical data gathered from observations.",
      "Combine with SUMPRODUCT(x_range, prob_range) to find the Expected Value (mean) of the distribution."
    ],
    relatedFunctions: ["SUMIF", "COUNTIF", "SUMPRODUCT"],
    miniChallenge: {
      question: "Values {1,2,3,4} with probabilities {0.1,0.2,0.3,0.4}. What is P(2 ≤ X ≤ 3)?",
      expectedAnswer: "0.5 (0.2 + 0.3)."
    },
    practice: {
      instructions: "In cell B8, find the probability that the outcome is between 200 and 350 inclusive.",
      initialData: [["Outcome", "Prob"], [100, 0.15], [200, 0.35], [300, 0.3], [400, 0.2], ["", ""], ["P(X=200)", ""], ["P(200<=X<=350)", ""]],
      targetCell: [7, 1],
      expectedFormula: "PROB(A2:A5,B2:B5,200,350)",
      expectedValue: 0.65
    }
  },
  {
    id: "quartile.exc",
    title: "QUARTILE.EXC Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Exclusive Quartiles: QUARTILE.EXC",
      description: "Returns the quartile of a data set, based on percentile values from 0..1, exclusive.",
      concept: "Think of it as slicing your data into four equal groups. The 'exclusive' method is the professional choice for identifying the 'middle 50%' of a dataset without including the very ends."
    },
    internalLogic: "Uses (n+1) interpolation. Position for Q1 = 0.25*(n+1), Q2 = 0.5*(n+1), Q3 = 0.75*(n+1).",
    whyItExists: "Businesses use quartiles to categorize performance (e.g., 'Top Quartile' employees) and to build box-and-whisker plots.",
    whenToUse: "Use for box-plot analysis and whenever you want a conservative estimate of the data splits that excludes the extremes.",
    realWorldUseCases: [
      "Categorizing students into performance quartiles.",
      "Analyzing the spread of household income.",
      "Determining the 'Interquartile Range' (IQR) to identify outliers."
    ],
    businessExample: {
      scenario: "Find the first and third quartiles for a list of 10 sales values.",
      formula: "=QUARTILE.EXC(A2:A11, 1)"
    },
    syntax: "=QUARTILE.EXC(array, quart)",
    syntaxBreakdown: [
      { arg: "array", desc: "The range of numeric values to analyze (required)." },
      { arg: "quart", desc: "The quartile to return: 1 (25th percentile), 2 (median), or 3 (75th percentile) (required)." }
    ],
    detailedExamples: [
      {
        title: "Exclusive Slicing",
        table: {
          headers: ["Data", "Quartile", "Formula", "Result"],
          rows: [
            ["10 to 100 (steps of 10)", "1", "=QUARTILE.EXC(A2:A11, 1)", "27.5"],
            ["", "3", "=QUARTILE.EXC(A2:A11, 3)", "82.5"]
          ]
        },
        stepByStep: [
          "n=10. For Q1: position = 0.25 * 11 = 2.75.",
          "Excel interpolates between the 2nd (20) and 3rd (30) values.",
          "Result: 27.5."
        ]
      }
    ],
    commonMistakes: [
      { title: "Input 0 or 4", desc: "Unlike QUARTILE.INC, the EXC version returns #NUM! for 0 (Min) and 4 (Max)." },
      { title: "Small Data", desc: "If you have fewer than 3 values, QUARTILE.EXC may return #NUM! because there isn't enough data to 'exclude' the ends." }
    ],
    proTips: [
      "QUARTILE.EXC(array, 2) is the same as MEDIAN(array).",
      "This method is consistent with PERCENTILE.EXC.",
      "Use this for Tukey-style box plots."
    ],
    relatedFunctions: ["QUARTILE.INC", "MEDIAN", "PERCENTILE.EXC"],
    miniChallenge: {
      question: "Find Q1 and Q3 using EXC for: {5, 10, 15, 20, 25, 30, 35, 40}.",
      expectedAnswer: "Q1 = 11.25; Q3 = 33.75."
    },
    practice: {
      instructions: "In cell B11, find the 1st quartile (exclusive) for the revenue data in B2:B9.",
      initialData: [["Month", "Revenue ($K)"], ["1", 150], ["2", 200], ["3", 250], ["4", 300], ["5", 350], ["6", 400], ["7", 450], ["8", 500], ["", ""], ["Q1 (EXC)", ""]],
      targetCell: [10, 1],
      expectedFormula: "QUARTILE.EXC(B2:B9,1)",
      expectedValue: 212.5
    }
  },
  {
    id: "quartile.inc",
    title: "QUARTILE.INC Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Inclusive Quartiles: QUARTILE.INC",
      description: "Returns the quartile of a data set, based on percentile values from 0..1, inclusive.",
      concept: "The 'Classic' quartile. It divides your data into four groups, but it includes the absolute floor (0) and ceiling (4) as valid options. It's the most common way to summarize data distribution."
    },
    internalLogic: "Uses (n-1) interpolation. Position = quart/4 * (n-1) + 1.",
    whyItExists: "To provide a complete 'Five-Number Summary' (Min, Q1, Median, Q3, Max) in one function.",
    whenToUse: "Use for general business summaries, legacy spreadsheet compatibility, and when you need the 0th or 100th percentile.",
    realWorldUseCases: [
      "Summarizing quarterly test results.",
      "Finding the minimum and maximum alongside quartiles.",
      "Analyzing general market surveys."
    ],
    businessExample: {
      scenario: "Find the median (2nd quartile) of a list of 10 values.",
      formula: "=QUARTILE.INC(A2:A11, 2)"
    },
    syntax: "=QUARTILE.INC(array, quart)",
    syntaxBreakdown: [
      { arg: "array", desc: "The range of numeric values (required)." },
      { arg: "quart", desc: "The value to return: 0 (Min), 1 (25th %), 2 (Median), 3 (75th %), 4 (Max) (required)." }
    ],
    detailedExamples: [
      {
        title: "Complete Summary",
        table: {
          headers: ["Quartile", "Description", "Formula", "Result"],
          rows: [
            ["0", "Minimum", "=QUARTILE.INC(A2:A11, 0)", "10"],
            ["2", "Median", "=QUARTILE.INC(A2:A11, 2)", "55"],
            ["4", "Maximum", "=QUARTILE.INC(A2:A11, 4)", "100"]
          ]
        },
        stepByStep: [
          "n=10. For Q2: position = 0.5 * 9 + 1 = 5.5.",
          "Excel averages the 5th (50) and 6th (60) values.",
          "Result: 55."
        ]
      }
    ],
    commonMistakes: [
      { title: "INC vs EXC", desc: "Forgetting that INC gives different (usually tighter) results than EXC for the same data." },
      { title: "Data type", desc: "Non-numeric values in the array cause #VALUE!." }
    ],
    proTips: [
      "QUARTILE.INC is the modern replacement for the legacy QUARTILE function.",
      "It always works even with small datasets (as few as 1 value).",
      "Handy for creating tiered rankings (e.g., 0-1, 1-2, 2-3, 3-4)."
    ],
    relatedFunctions: ["QUARTILE.EXC", "PERCENTILE.INC", "MIN", "MAX"],
    miniChallenge: {
      question: "Find all five quartiles (0,1,2,3,4) for {3, 7, 8, 12, 15, 18, 21}.",
      expectedAnswer: "3, 7.5, 12, 16.5, 21."
    },
    practice: {
      instructions: "In cell B11, find the 3rd quartile (inclusive) for the test scores in B2:B9.",
      initialData: [["Student", "Score"], ["1", 65], ["2", 72], ["3", 78], ["4", 81], ["5", 85], ["6", 89], ["7", 92], ["8", 95], ["", ""], ["Q3 (INC)", ""]],
      targetCell: [10, 1],
      expectedFormula: "QUARTILE.INC(B2:B9,3)",
      expectedValue: 90.5
    }
  },
  {
    id: "rank.avg",
    title: "RANK.AVG Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Fair Tie-Breaking: RANK.AVG",
      description: "Returns the rank of a number in a list of numbers: its size relative to other values in the list. If more than one value has the same rank, the average rank is returned.",
      concept: "The 'Compassionate' rank. If two people tie for 1st place, instead of giving them both 1st, RANK.AVG gives them both 1.5 (the average of 1st and 2nd)."
    },
    internalLogic: "Identifies the position of the value. For ties, it finds all occupied positions (e.g., 3rd, 4th, 5th) and averages those position numbers.",
    whyItExists: "Useful in competitions and statistical rankings where tied results should share a 'middle' rank rather than the highest one.",
    whenToUse: "Use RANK.AVG when you want to avoid 'gaps' in your ranking logic and treat tied participants exactly the same.",
    realWorldUseCases: [
      "Averaging tied scores in a classroom test.",
      "Ranking sales reps where ties are common.",
      "Competition tie-breaking where positions are shared."
    ],
    businessExample: {
      scenario: "Rank student scores {95, 85, 90, 85, 80} and handle ties with an average.",
      formula: "=RANK.AVG(B2, $B$2:$B$6)"
    },
    syntax: "=RANK.AVG(number, ref, [order])",
    syntaxBreakdown: [
      { arg: "number", desc: "The number whose rank you want to find (required)." },
      { arg: "ref", desc: "The range of numbers to rank against (required)." },
      { arg: "order", desc: "Optional. 0 (default) for descending (largest is 1); 1 for ascending (smallest is 1)." }
    ],
    detailedExamples: [
      {
        title: "Averaging Ties",
        table: {
          headers: ["Name", "Score", "Formula", "Rank"],
          rows: [
            ["A", "95", "=RANK.AVG(B2,$B$2:$B$6)", "1"],
            ["B", "85", "", "3.5"],
            ["C", "90", "", "2"],
            ["D", "85", "", "3.5"],
            ["E", "80", "", "5"]
          ]
        },
        stepByStep: [
          "Values sorted: 95, 90, 85, 85, 80.",
          "Positions: 1st, 2nd, 3rd, 4th, 5th.",
          "The two 85s take positions 3 and 4.",
          "Average of 3 and 4 = 3.5.",
          "Result: 3.5."
        ]
      }
    ],
    commonMistakes: [
      { title: "Relative References", desc: "Forgetting to use absolute references ($B$2:$B$6) for the 'ref' argument, which causes errors when dragging the formula down." },
      { title: "Order mix-up", desc: "Confusing descending (0) with ascending (1)." }
    ],
    proTips: [
      "Use order=1 if you are ranking things where lower is better (like race times or golf scores).",
      "RANK.AVG ensures the sum of all ranks remains constant regardless of ties.",
      "To avoid fractional ranks, use RANK.EQ."
    ],
    relatedFunctions: ["RANK.EQ", "COUNTIF"],
    miniChallenge: {
      question: "Rank {45, 45, 30, 60, 30} descending. What is the rank of 45?",
      expectedAnswer: "1.5 (Average of 1st and 2nd)."
    },
    practice: {
      instructions: "In column C, rank the student scores in B2:B7 using RANK.AVG (descending).",
      initialData: [["Student", "Score", "RANK.AVG"], ["A", 88, ""], ["B", 92, ""], ["C", 88, ""], ["D", 75, ""], ["E", 95, ""], ["F", 88, ""]],
      targetCell: [1, 2],
      expectedFormula: "RANK.AVG(B2,$B$2:$B$7,0)",
      expectedValue: 3.5
    }
  },
  {
    id: "rank.eq",
    title: "RANK.EQ Function",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Top-Tier Ranking: RANK.EQ",
      description: "Returns the rank of a number in a list of numbers. Its size is relative to other values in the list; if more than one value has the same rank, the top rank of that set of values is returned.",
      concept: "The 'Traditional' rank. If two people tie for 1st, they both get '1'. The next person gets '3' (skipping 2nd). It's the standard way we think about leaderboards."
    },
    internalLogic: "Identifies the position of the value. For ties, all tied values receive the highest possible position in that group.",
    whyItExists: "This is the classic way to rank performers where you only care about who was 'equal best'. It's identical to the legacy RANK function.",
    whenToUse: "Use for sales leaderboards, competition results, and whenever you want to highlight the top tied position.",
    realWorldUseCases: [
      "Determining winners in a sports competition.",
      "Ranking sales performance across a team.",
      "Finding the relative position of a stock's return."
    ],
    businessExample: {
      scenario: "Rank test scores {95, 85, 90, 85, 80} and give tied scores the same high rank.",
      formula: "=RANK.EQ(B2, $B$2:$B$6)"
    },
    syntax: "=RANK.EQ(number, ref, [order])",
    syntaxBreakdown: [
      { arg: "number", desc: "The value whose rank you want to find (required)." },
      { arg: "ref", desc: "The array or range of numbers to compare against (required)." },
      { arg: "order", desc: "Optional. 0 (default) for descending; 1 for ascending." }
    ],
    detailedExamples: [
      {
        title: "Standard Leaderboard",
        table: {
          headers: ["Name", "Score", "Formula", "Rank"],
          rows: [
            ["A", "95", "=RANK.EQ(B2,$B$2:$B$6)", "1"],
            ["B", "85", "", "3"],
            ["C", "90", "", "2"],
            ["D", "85", "", "3"],
            ["E", "80", "", "5"]
          ]
        },
        stepByStep: [
          "Values sorted: 95, 90, 85, 85, 80.",
          "Both 85s take the 3rd rank.",
          "The 4th rank is skipped.",
          "Result: 3."
        ]
      }
    ],
    commonMistakes: [
      { title: "Relative ref", desc: "Forgetting to lock your range with $ signs: B2:B6 vs $B$2:$B$6." },
      { title: "Expectation", desc: "Expecting average ranks (use RANK.AVG) or expecting no gaps (use a SUMPRODUCT formula for 'Dense Ranking')." }
    ],
    proTips: [
      "RANK.EQ is the direct replacement for the legacy RANK function.",
      "If you need unique ranks (1, 2, 3, 4, 5) even with ties, use: =RANK.EQ(B2, $B$2:$B$6) + COUNTIF($B$2:B2, B2) - 1.",
      "Lower is better? Use order=1 (e.g., for race times)."
    ],
    relatedFunctions: ["RANK.AVG", "PERCENTRANK.INC", "LARGE"],
    miniChallenge: {
      question: "Rank {10, 20, 20, 30, 40} ascending. What is the rank of the first 20?",
      expectedAnswer: "2 (It ties with the other 20 for 2nd place)."
    },
    practice: {
      instructions: "In column C, rank the race times in B2:B6 where lower is better (Ascending).",
      initialData: [["Athlete", "Time (sec)", "Rank (1=fastest)"], ["John", 10.5, ""], ["Mike", 10.2, ""], ["Sarah", 10.8, ""], ["Emma", 10.5, ""], ["Dave", 11, ""]],
      targetCell: [1, 2],
      expectedFormula: "RANK.EQ(B2,$B$2:$B$6,1)",
      expectedValue: 2
    }
  },
  {
    id: "rsq",
    title: "RSQ Function",
    category: "statistical",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Goodness of Fit: RSQ",
      description: "Returns the square of the Pearson product-moment correlation coefficient through data points in known_y's and known_x's.",
      concept: "The 'R-Squared' value. It tells you what percentage of the change in Y can be explained by X. If R² is 0.9, then 90% of the movement is explained by the relationship."
    },
    internalLogic: "Calculates the proportion of the variance in the dependent variable that is predictable from the independent variable. RSQ = PEARSON(y,x)².",
    whyItExists: "Correlation tells you how variables move; RSQ tells you how strong and reliable that relationship is for making predictions.",
    whenToUse: "Use RSQ to evaluate the accuracy of a trendline or to see how much one factor (like advertising) influences another (like sales).",
    realWorldUseCases: [
      "Evaluating how well a linear model fits historical sales data.",
      "Determining the reliability of a stock's 'Beta' relative to the market.",
      "Analyzing the impact of price changes on consumer demand."
    ],
    businessExample: {
      scenario: "Find the R² value for a set of X and Y data points to see how well they correlate.",
      formula: "=RSQ(B2:B6, A2:A6)"
    },
    syntax: "=RSQ(known_y's, known_x's)",
    syntaxBreakdown: [
      { arg: "known_y's", desc: "The dependent set of observations (required)." },
      { arg: "known_x's", desc: "The independent set of observations (required, must be same size as known_y's)." }
    ],
    detailedExamples: [
      {
        title: "Model Reliability Check",
        table: {
          headers: ["X", "Y", "Formula", "Result"],
          rows: [
            ["1", "2.1", "=RSQ(B2:B6, A2:A6)", "0.9987"],
            ["2", "3.8", "", ""],
            ["3", "6.2", "", ""],
            ["4", "7.9", "", ""],
            ["5", "10.1", "", ""]
          ]
        },
        stepByStep: [
          "Excel calculates the Pearson r (≈ 0.9993).",
          "Squares the value (0.9993²).",
          "Result: 0.9987.",
          "Meaning: 99.87% of the variation in Y is explained by X."
        ]
      }
    ],
    commonMistakes: [
      { title: "Reversing Y and X", desc: "Though RSQ gives the same result if swapped, standard procedure is dependent variable FIRST." },
      { title: "Misinterpreting Causation", desc: "A high RSQ doesn't mean X causes Y; it only means they vary together predictably." },
      { title: "Non-Linear Data", desc: "A low RSQ might just mean the relationship is a curve, not that there is no relationship." }
    ],
    proTips: [
      "Check residual plots to verify if a linear model is appropriate, even if RSQ is high.",
      "In multiple regression, use 'Adjusted R-Squared' from the LINEST function instead.",
      "An RSQ of 1.0 means a perfect linear fit."
    ],
    relatedFunctions: ["PEARSON", "CORREL", "LINEST", "SLOPE"],
    miniChallenge: {
      question: "If Pearson r = 0.8, what is the RSQ? What does it tell you?",
      expectedAnswer: "0.64. It means 64% of the variance is explained by the model."
    },
    practice: {
      instructions: "In cell B9, find the R² value for Price (A2:A6) and Demand (B2:B6).",
      initialData: [["Price", "Demand"], [10, 100], [12, 85], [15, 70], [18, 55], [20, 40], ["", ""], ["RSQ", ""], ["PEARSON r", ""]],
      targetCell: [7, 1],
      expectedFormula: "RSQ(B2:B6,A2:A6)",
      expectedValue: 0.991
    }
  },
  {
    id: 'skew',
    title: 'SKEW Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Measuring Distribution Asymmetry: SKEW',
      description: 'The SKEW function measures the degree of asymmetry of a distribution around its mean.',
      concept: 'Think of it as a "Tail Lean Checker". It tells you if your data has a longer tail on the right side (positive skew), the left side (negative skew), or if it is perfectly balanced (zero skew).'
    },
    internalLogic: 'Excel calculates the sample skewness using the formula: [n/((n-1)(n-2))] × Σ(x-x̄)³/s³, where s is the sample standard deviation.',
    whyItExists: 'In finance and science, knowing if data is "lopsided" is critical. For example, stock returns often have a negative skew (frequent small gains, rare large losses).',
    whenToUse: 'Use SKEW when you need to understand the shape of your data distribution beyond just the average.',
    realWorldUseCases: [
      'Analyzing investment return distributions.',
      'Checking if customer spending is skewed by a few high-value buyers.',
      'Quality control in manufacturing processes.'
    ],
    businessExample: {
      scenario: 'A risk analyst wants to see if monthly returns are balanced or lean toward one side.',
      formula: '=SKEW(A2:A50)'
    },
    syntax: '=SKEW(number1, [number2], ...)',
    syntaxBreakdown: [
      { arg: 'number1', desc: 'First number or range of the sample (required).' },
      { arg: 'number2', desc: 'Additional numbers or ranges (optional, up to 255).' }
    ],
    detailedExamples: [
      {
        title: 'Example: Simple Distribution',
        table: {
          headers: ['Value', 'Formula', 'Result'],
          rows: [
            ['2, 4, 4, 5, 5, 7, 9', '=SKEW(A2:A8)', '0.3843']
          ]
        },
        stepByStep: [
          'Excel calculates the mean and standard deviation of the set.',
          'It applies the skewness formula based on cubed deviations from the mean.',
          'A result of 0.38 indicates a slight positive skew (right tail is slightly longer).'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Insufficient data.', desc: 'If you have fewer than 3 data points, SKEW returns a #DIV/0! error.' },
      { title: 'Sample vs Population.', desc: 'SKEW is for samples. Use SKEW.P if you have the entire population.' }
    ],
    proTips: [
      'A SKEW value > 1 or < -1 suggests a highly skewed distribution.',
      'Compare mean vs median: if mean > median, the skew is likely positive.',
      'Use alongside KURT to get a full picture of the distribution shape.'
    ],
    relatedFunctions: ['SKEW.P', 'KURT', 'AVERAGE', 'MEDIAN'],
    miniChallenge: {
      question: 'Calculate SKEW for {1, 1, 1, 1, 1, 1, 100}. What does a high positive result tell you?',
      expectedAnswer: 'It tells you the data is heavily skewed to the right by the outlier 100.'
    },
    practice: {
      instructions: 'In cell B11, calculate the SKEW of the daily returns in B2:B9.',
      initialData: [['Day', 'Return %'], ['1', -1.5], ['2', 0.8], ['3', 2.1], ['4', -0.5], ['5', 1.2], ['6', 3.5], ['7', -0.9], ['8', 1.8], ['', ''], ['SKEW', '']],
      targetCell: [10, 1],
      expectedFormula: 'SKEW(B2:B9)',
      expectedValue: 0.114959
    }
  },
  {
    id: 'skew.p',
    title: 'SKEW.P Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Population Skewness: SKEW.P',
      description: 'Returns the skewness of a distribution based on a population.',
      concept: 'It measures asymmetry just like SKEW, but it assumes your data represents every single member of the group you are studying (the entire population).'
    },
    internalLogic: 'Calculates population skewness using n as the denominator throughout, without the n-1 sample correction.',
    whyItExists: 'When you have data for an entire group (e.g., all employees in a small firm), SKEW.P provides the exact asymmetry without needing to estimate from a sample.',
    whenToUse: 'Use SKEW.P only when you have the complete dataset for the entire population.',
    realWorldUseCases: [
      'Analyzing the full salary distribution of a company.',
      'Measuring asymmetry in the results of a census.',
      'Analyzing the performance of all machines in a single factory.'
    ],
    businessExample: {
      scenario: 'A company wants to find the population skewness of its annual sales across all 5 branches.',
      formula: '=SKEW.P(B2:B6)'
    },
    syntax: '=SKEW.P(number1, [number2], ...)',
    syntaxBreakdown: [
      { arg: 'number1', desc: 'First number or range of the population (required).' },
      { arg: 'number2', desc: 'Additional numbers or ranges (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Population vs Sample Skew',
        table: {
          headers: ['Value', 'SKEW (Sample)', 'SKEW.P (Population)'],
          rows: [
            ['2, 4, 4, 5, 5, 7, 9', '0.3843', '0.3008']
          ]
        },
        stepByStep: [
          'SKEW.P uses a different formula that does not correct for sample bias.',
          'The result is typically smaller in magnitude than the sample SKEW result for the same data.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Using for samples.', desc: 'If you only have a portion of the data, use SKEW instead of SKEW.P.' },
      { title: 'Minimum points.', desc: 'Requires at least 3 data points.' }
    ],
    proTips: [
      'SKEW.P converges with SKEW as the sample size (n) becomes very large.',
      'SKEW.P is available in Excel 2013 and later.'
    ],
    relatedFunctions: ['SKEW', 'STDEV.P', 'VAR.P'],
    miniChallenge: {
      question: "Entire company's sales: {100, 150, 200, 250, 500}. Find population skewness.",
      expectedAnswer: '=SKEW.P(100, 150, 200, 250, 500)'
    },
    practice: {
      instructions: 'In cell B10, calculate the SKEW.P for the population data in B2:B8.',
      initialData: [['ID', 'Value'], ['1', 12], ['2', 15], ['3', 18], ['4', 20], ['5', 25], ['6', 30], ['7', 45], ['', ''], ['SKEW.P', '']],
      targetCell: [9, 1],
      expectedFormula: 'SKEW.P(B2:B8)',
      expectedValue: 0.985888
    }
  },
  {
    id: 'slope',
    title: 'SLOPE Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Regression Line Incline: SLOPE',
      description: 'Returns the slope of the linear regression line through data points in known_y\'s and known_x\'s.',
      concept: 'It measures the "steepness" of the relationship. It tells you exactly how much Y changes for every 1 unit increase in X.'
    },
    internalLogic: 'Calculates m = Σ(x-x̄)(y-ȳ) / Σ(x-x̄)². This represents the vertical distance divided by the horizontal distance between any two points on the line.',
    whyItExists: 'SLOPE is the foundation of linear forecasting. It allows businesses to say things like "For every ₦1,000 we spend on ads, we expect 3 more sales."' ,
    whenToUse: 'Use SLOPE when you want to quantify the rate of change between two related variables.',
    realWorldUseCases: [
      'Predicting revenue growth based on marketing spend.',
      'Calculating the rate of return (Beta) of a stock.',
      'Estimating material usage based on production volume.'
    ],
    businessExample: {
      scenario: 'Determine the relationship between Experience (X) and Salary (Y).',
      formula: '=SLOPE(B2:B6, A2:A6)'
    },
    syntax: '=SLOPE(known_y\'s, known_x\'s)',
    syntaxBreakdown: [
      { arg: 'known_y\'s', desc: 'The dependent set of data points (required).' },
      { arg: 'known_x\'s', desc: 'The independent set of data points (required).' }
    ],
    detailedExamples: [
      {
        title: 'Simple Linear Relationship',
        table: {
          headers: ['X', 'Y', 'Formula', 'Result'],
          rows: [
            ['1, 2, 3, 4, 5', '3, 7, 11, 15, 19', '=SLOPE(B2:B6, A2:A6)', '4']
          ]
        },
        stepByStep: [
          'For every 1 unit increase in X, Y increases by exactly 4 units.',
          'The slope (m) is therefore 4.',
          'Combined with INTERCEPT, you can build the full line equation: y = 4x - 1.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Reversing Y and X.', desc: 'The dependent variable (Y) must come FIRST in the formula. If you swap them, you get the wrong rate of change.' },
      { title: 'Unequal ranges.', desc: 'The X and Y ranges must have the same number of data points.' }
    ],
    proTips: [
      'Use SLOPE and INTERCEPT together to predict future values.',
      'A slope of 0 means there is no linear relationship between the variables.',
      'Use with RSQ to see how "reliable" the slope calculation actually is.'
    ],
    relatedFunctions: ['INTERCEPT', 'RSQ', 'LINEST', 'FORECAST.LINEAR'],
    miniChallenge: {
      question: 'Y={5, 10, 15, 20}, X={2, 4, 6, 8}. What is the slope?',
      expectedAnswer: '2.5 (Each unit of X adds 2.5 to Y).'
    },
    practice: {
      instructions: 'In cell B8, calculate the SLOPE of Salary (C) relative to Experience (B).',
      initialData: [['', 'Exp (yr)', 'Salary (₦K)'], ['', 1, 45], ['', 3, 52], ['', 5, 58], ['', 7, 65], ['', 10, 72], ['', '', ''], ['SLOPE', '', '']],
      targetCell: [7, 1],
      expectedFormula: 'SLOPE(C2:C6,B2:B6)',
      expectedValue: 3.02459
    }
  },
  {
    id: 'small',
    title: 'SMALL Function',
    category: 'statistical',
    difficulty: 'Beginner',
    xp: 150,
    introduction: {
      title: 'Finding the k-th Smallest: SMALL',
      description: 'Returns the k-th smallest value in a data set.',
      concept: 'Think of it as a "Flexible Minimum". While MIN always gives you the absolute smallest (1st smallest), SMALL lets you pick the 2nd, 3rd, or 10th smallest value.'
    },
    internalLogic: 'Excel sorts the range in ascending order internally and then retrieves the value at the specified position k.',
    whyItExists: 'Often in business, you don\'t want the absolute outlier (the minimum), but rather the "bottom 3" or a specific low-end benchmark.',
    whenToUse: 'Use SMALL to identify the lowest prices, shortest wait times, or bottom-performing scores in a dataset.',
    realWorldUseCases: [
      'Identifying the three cheapest vendors for a part.',
      'Finding the 2nd lowest temperature of the month.',
      "Creating a sorted list from a range of numbers."
    ],
    businessExample: {
      scenario: 'Find the 2nd cheapest product in a price list.',
      formula: '=SMALL(B2:B50, 2)'
    },
    syntax: '=SMALL(array, k)',
    syntaxBreakdown: [
      { arg: 'array', desc: 'The range of data to analyze (required).' },
      { arg: 'k', desc: 'The position from the smallest value (1 = smallest, 2 = second smallest, etc.) (required).' }
    ],
    detailedExamples: [
      {
        title: 'Price Ranking',
        table: {
          headers: ['Price', 'k', 'Formula', 'Result'],
          rows: [
            ['45, 12, 89, 34, 67', '1', '=SMALL(A2:A6, 1)', '12'],
            ['', '3', '=SMALL(A2:A6, 3)', '45']
          ]
        },
        stepByStep: [
          'Sorted data: 12, 34, 45, 67, 89.',
          'Position 1 is 12 (Minimum).',
          'Position 3 is 45.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'k out of range.', desc: 'If k is larger than the number of data points, or if k ≤ 0, Excel returns a #NUM! error.' },
      { title: 'Ignoring non-numeric data.', desc: 'SMALL ignores text and logical values, which might affect your count of k.' }
    ],
    proTips: [
      'To get a sorted list, use =SMALL(range, ROW(1:1)) and drag down.',
      'Combine with INDEX and MATCH to find the name of the product with the k-th lowest price.',
      'The opposite of SMALL is the LARGE function.'
    ],
    relatedFunctions: ['LARGE', 'MIN', 'MAX', 'RANK'],
    miniChallenge: {
      question: 'Find the 2nd smallest in the set: {100, 50, 75, 25, 90}.',
      expectedAnswer: '50'
    },
    practice: {
      instructions: 'In cell B8, find the cheapest price (k=1) from B2:B6. In cell B9, find the 3rd cheapest.',
      initialData: [['Product', 'Price'], ['Widget', 15], ['Gadget', 22], ['Gizmo', 18], ['Thingy', 12], ['Doodad', 25], ['', ''], ['Cheapest', ''], ['3rd Cheapest', '']],
      targetCell: [7, 1],
      expectedFormula: 'SMALL(B2:B6,1)',
      expectedValue: 12
    }
  },
  {
    id: 'standardize',
    title: 'STANDARDIZE Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Creating Z-Scores: STANDARDIZE',
      description: 'Returns a normalized value from a distribution characterized by a mean and standard deviation.',
      concept: 'It turns raw scores into "Z-scores". It tells you exactly how many standard deviations a value is away from the average.'
    },
    internalLogic: 'Calculates (x - mean) / standard_dev.',
    whyItExists: 'It allows you to compare apples to oranges. By standardizing, you can see if a 92 on a Math test is better than an 85 on an English test by seeing which one is further from its class average.',
    whenToUse: 'Use STANDARDIZE when you need to compare values from different groups or scales.',
    realWorldUseCases: [
      'Comparing employee performance across different departments.',
      'Standardizing test scores for university admissions.',
      'Detecting outliers (values with a z-score greater than 3 or less than -3).'
    ],
    businessExample: {
      scenario: 'Calculate the z-score for a customer who spent ₦8,500 where the average is ₦7,500 and SD is ₦800.',
      formula: '=STANDARDIZE(8500, 7500, 800)'
    },
    syntax: '=STANDARDIZE(x, mean, standard_dev)',
    syntaxBreakdown: [
      { arg: 'x', desc: 'The value you want to normalize (required).' },
      { arg: 'mean', desc: 'The arithmetic mean of the distribution (required).' },
      { arg: 'standard_dev', desc: 'The standard deviation (>0) (required).' }
    ],
    detailedExamples: [
      {
        title: 'Student Performance',
        table: {
          headers: ['Score (x)', 'Class Mean', 'SD', 'Result (Z-score)'],
          rows: [
            ['85', '75', '8', '1.25']
          ]
        },
        stepByStep: [
          'Excel subtracts the mean from the score: 85 - 75 = 10.',
          'It divides the result by the SD: 10 / 8 = 1.25.',
          'Result 1.25 means the student is 1.25 standard deviations above the average.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Negative Standard Deviation.', desc: 'Standard deviation must be greater than zero, or Excel returns a #NUM! error.' },
      { title: 'Swapping x and mean.', desc: 'Ensure you subtract the mean from the score, not vice versa, to get the correct sign (+ or -).' }
    ],
    proTips: [
      'A positive z-score is above the mean; a negative one is below.',
      'Standardized values are often used in machine learning and data science as a preprocessing step.',
      'Values with |z| > 3 are statistically considered outliers.'
    ],
    relatedFunctions: ['NORM.S.DIST', 'AVERAGE', 'STDEV.P'],
    miniChallenge: {
      question: 'Test scores μ=70, σ=12. What is the z-score for a score of 88?',
      expectedAnswer: '1.5 ( (88-70)/12 )'
    },
    practice: {
      instructions: 'In cell B5, standardize the student score. In cell B10, standardize the height.',
      initialData: [['Student Score', 92], ['Class Mean', 80], ['Class Std Dev', 10], ['', ''], ['STANDARDIZE', ''], ['', ''], ['Height (in)', 74], ['Mean Height', 68], ['Std Dev', 3], ['STANDARDIZE', '']],
      targetCell: [4, 1],
      expectedFormula: 'STANDARDIZE(B1,B2,B3)',
      expectedValue: 1.2
    }
  },
  {
    id: 'stdev.p',
    title: 'STDEV.P Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Population Standard Deviation: STDEV.P',
      description: 'Calculates standard deviation based on the entire population given as arguments.',
      concept: 'It measures the "spread" of your data. A low standard deviation means the numbers are mostly close to the average; a high one means they are spread out.'
    },
    internalLogic: 'Calculates the square root of the population variance: √(Σ(x-μ)²/n). It uses "n" as the denominator.',
    whyItExists: 'When you have every single data point for a group (like every student in a class), STDEV.P gives you the exact measurement of how much they vary.',
    whenToUse: 'Use STDEV.P when the data you are analyzing represents the entire group (population).',
    realWorldUseCases: [
      'Measuring consistency in the weight of all items produced by a machine.',
      'Analyzing the age spread of all members in a small local club.',
      'Checking variability in test scores for an entire school district.'
    ],
    businessExample: {
      scenario: 'Find the standard deviation of all 5 machines in the shop.',
      formula: '=STDEV.P(A2:A6)'
    },
    syntax: '=STDEV.P(number1, [number2], ...)',
    syntaxBreakdown: [
      { arg: 'number1', desc: 'First numeric value or range of the population (required).' },
      { arg: 'number2', desc: 'Additional values or ranges (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Entire Group Variation',
        table: {
          headers: ['Value', 'Formula', 'Result'],
          rows: [
            ['10, 20, 30, 40, 50', '=STDEV.P(A2:A6)', '14.1421']
          ]
        },
        stepByStep: [
          'Average is 30.',
          'Deviations squared: 400, 100, 0, 100, 400. Sum = 1000.',
          'Divide by count (5): 1000 / 5 = 200.',
          'Square root of 200 ≈ 14.1421.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Using for samples.', desc: 'If you only have a subset of data, use STDEV.S instead. STDEV.P will underestimate the true variation in a larger population.' },
      { title: 'Non-numeric data.', desc: 'STDEV.P ignores blanks, text, and logicals in ranges.' }
    ],
    proTips: [
      'STDEV.P will always be smaller than STDEV.S for the same dataset.',
      'It is the square root of the VAR.P function.',
      'Use for quality control of total production runs.'
    ],
    relatedFunctions: ['STDEV.S', 'VAR.P', 'STDEVA'],
    miniChallenge: {
      question: "All employees' ages: {25, 30, 35, 40, 45}. Find population standard deviation.",
      expectedAnswer: '7.071 (√50)'
    },
    practice: {
      instructions: 'In cell B10, calculate the STDEV.P for the weights of all products in B2:B8.',
      initialData: [['ID', 'Weight (kg)'], ['1', 50], ['2', 52], ['3', 48], ['4', 51], ['5', 49], ['6', 53], ['7', 50], ['', ''], ['STDEV.P', '']],
      targetCell: [9, 1],
      expectedFormula: 'STDEV.P(B2:B8)',
      expectedValue: 1.59079
    }
  },
  {
    id: 'stdev.s',
    title: 'STDEV.S Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Sample Standard Deviation: STDEV.S',
      description: 'Estimates standard deviation based on a sample.',
      concept: 'The "Unbiased Spread Finder". Because samples are smaller than populations, they tend to look less variable than they really are. STDEV.S corrects for this by using "n-1" in its math.'
    },
    internalLogic: 'Calculates the square root of the sample variance: √(Σ(x-x̄)²/(n-1)). Uses Bessel\'s correction (n-1) to provide an unbiased estimate.',
    whyItExists: 'In most real-world research, you only have a sample. STDEV.S is the statistical standard for estimating the true spread of a larger population from a small group.',
    whenToUse: 'Use STDEV.S for almost all general data analysis where your data represents a sample of a larger population.',
    realWorldUseCases: [
      'Estimating the variation in customer arrival times based on a 1-day sample.',
      'Analyzing health data from a sample of patients to generalize to a city.',
      'Quality testing a random sample of 10 items from a batch of 1,000.'
    ],
    businessExample: {
      scenario: 'Estimate the variation in delivery times based on the last 10 deliveries.',
      formula: '=STDEV.S(B2:B11)'
    },
    syntax: '=STDEV.S(number1, [number2], ...)',
    syntaxBreakdown: [
      { arg: 'number1', desc: 'First numeric value or range of the sample (required).' },
      { arg: 'number2', desc: 'Additional values or ranges (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Sample Spread Estimate',
        table: {
          headers: ['Sample', 'Formula', 'Result'],
          rows: [
            ['10, 20, 30, 40, 50', '=STDEV.S(A2:A6)', '15.8114']
          ]
        },
        stepByStep: [
          'Average is 30. Squared deviations sum to 1000.',
          'Divide by (n-1), which is 4: 1000 / 4 = 250.',
          'Square root of 250 ≈ 15.8114.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Fewer than 2 points.', desc: 'STDEV.S requires at least 2 numbers to calculate variation. 1 number returns #DIV/0!.' },
      { title: 'Using for population.', desc: 'If you use STDEV.S on a full population, you will slightly overestimate the true standard deviation.' }
    ],
    proTips: [
      'STDEV.S is the default choice for most analysts.',
      'It is the square root of the VAR.S function.',
      'Use with CONFIDENCE.T to create confidence intervals for small samples.'
    ],
    relatedFunctions: ['STDEV.P', 'VAR.S', 'AVERAGE'],
    miniChallenge: {
      question: 'Sample weights: {150, 160, 155, 165, 170}. Find sample standard deviation.',
      expectedAnswer: '7.906 (√62.5)'
    },
    practice: {
      instructions: 'In cell B9, find the STDEV.S for the sample readings in B2:B7.',
      initialData: [['ID', 'Reading'], ['1', 23.5], ['2', 24.1], ['3', 23.8], ['4', 24.2], ['5', 23.6], ['6', 24.0], ['', ''], ['STDEV.S', '']],
      targetCell: [8, 1],
      expectedFormula: 'STDEV.S(B2:B7)',
      expectedValue: 0.280476
    }
  },
  {
    id: 'stdeva',
    title: 'STDEVA Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Inclusive Sample Spread: STDEVA',
      description: 'Estimates standard deviation based on a sample, including logical values and text.',
      concept: 'It is a variation of STDEV.S that treats TRUE as 1, FALSE as 0, and any text string as 0. It is useful when your data has non-numeric "flags" that should count as values.'
    },
    internalLogic: 'Uses the (n-1) sample formula, but converts all non-blank cells into numbers (TRUE=1, others=0) before calculating.',
    whyItExists: 'In some surveys or datasets, text like "None" or "N/A" should be treated as a zero value rather than being ignored.',
    whenToUse: 'Use STDEVA when your dataset contains logical values or text that you want to include in the statistical calculation.',
    realWorldUseCases: [
      'Analyzing survey responses where "Yes" (TRUE) and "No" (FALSE) are mixed with ratings.',
      'Calculating variation in a list where "Error" text should count as a 0.',
      'Handling data from older systems that exports status as text.'
    ],
    businessExample: {
      scenario: 'Find the standard deviation of a range where TRUE/FALSE represents success/failure.',
      formula: '=STDEVA(B2:B20)'
    },
    syntax: '=STDEVA(value1, [value2], ...)',
    syntaxBreakdown: [
      { arg: 'value1', desc: 'First value or range of the sample (required).' },
      { arg: 'value2', desc: 'Additional values or ranges (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Mixed Data Spread',
        table: {
          headers: ['Value', 'Interpret', 'Formula', 'Result'],
          rows: [
            ['10, 20, TRUE, 30, Text', '10, 20, 1, 30, 0', '=STDEVA(A2:A6)', '12.8141']
          ]
        },
        stepByStep: [
          'Excel converts the 5 values into 10, 20, 1, 30, 0.',
          'It calculates the sample standard deviation (n=5).',
          'Result: 12.8141.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Text becomes zero.', desc: 'If your text is meant to be ignored, use STDEV.S. STDEVA will lower your average and change your deviation by adding zeros to the dataset.' },
      { title: 'TRUE becomes 1.', desc: 'Make sure a value of 1 is the correct representation for your logical TRUE flags.' }
    ],
    proTips: [
      'STDEVA usually gives a different result than STDEV.S because it counts more cells.',
      'Blank cells are still ignored by STDEVA; only text and logicals are converted.'
    ],
    relatedFunctions: ['STDEV.S', 'STDEVPA', 'VARA'],
    miniChallenge: {
      question: 'STDEVA of {5, 10, TRUE, 15, "N/A"}. How many items are in the denominator (n-1)?',
      expectedAnswer: '4 (5 items total, so 5-1=4).'
    },
    practice: {
      instructions: 'In cell B8, calculate the STDEVA of the mixed responses in B2:B6. Compare it to STDEV.S in cell B9.',
      initialData: [['User', 'Response'], ['1', 8], ['2', 12], ['3', 'TRUE'], ['4', 6], ['5', 'FALSE'], ['', ''], ['STDEVA', ''], ['STDEV.S', '']],
      targetCell: [7, 1],
      expectedFormula: 'STDEVA(B2:B6)',
      expectedValue: 4.97996
    }
  },
  {
    id: 'stdevpa',
    title: 'STDEVPA Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Inclusive Population Spread: STDEVPA',
      description: 'Calculates standard deviation based on the entire population, including logical values and text.',
      concept: 'The population version of STDEVA. It treats TRUE as 1 and Text/FALSE as 0, but uses "n" in its formula because it assumes you have the entire population.'
    },
    internalLogic: 'Calculates √(Σ(x-μ)²/n), converting logicals (TRUE=1) and text (Text=0) into numeric values first.',
    whyItExists: 'Useful for analyzing complete datasets (like an entire factory output) where non-numeric codes represent zero or one states.',
    whenToUse: 'Use STDEVPA when you have the entire population and need to include logical/text flags in your variation analysis.',
    realWorldUseCases: [
      'Measuring variation in an entire year of quality control logs where "Pass" is text.',
      'Analyzing status flags across an entire employee database.',
      'Checking consistency in sensors where some readings are "Error" text.'
    ],
    businessExample: {
      scenario: 'Calculate population standard deviation for all 5 sensors, including text errors.',
      formula: '=STDEVPA(B2:B6)'
    },
    syntax: '=STDEVPA(value1, [value2], ...)',
    syntaxBreakdown: [
      { arg: 'value1', desc: 'First value or range of the population (required).' },
      { arg: 'value2', desc: 'Additional values or ranges (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Full Population Mixed Data',
        table: {
          headers: ['Value', 'Formula', 'Result'],
          rows: [
            ['10, 20, TRUE, 30, Text', '=STDEVPA(A2:A6)', '11.4612']
          ]
        },
        stepByStep: [
          'Values are treated as 10, 20, 1, 30, 0.',
          'STDEVPA divides the squared deviation sum by 5 (n), not 4 (n-1).',
          'Result: 11.4612.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Using for samples.', desc: 'If you only have a portion of the data, use STDEVA instead.' },
      { title: 'Text conversion.', desc: 'Forgetting that ALL text becomes zero. If "N/A" shouldn\'t be 0, clean your data first.' }
    ],
    proTips: [
      'STDEVPA will always be smaller than STDEVA for the same data.',
      'Use only when non-numeric codes carry specific intended numeric meaning (0 or 1).'
    ],
    relatedFunctions: ['STDEVA', 'STDEV.P', 'VARPA'],
    miniChallenge: {
      question: 'Population data: {3, 7, TRUE, 5}. Find STDEVPA.',
      expectedAnswer: '2.236 (√5)'
    },
    practice: {
      instructions: 'In cell B8, calculate the STDEVPA for the complete dataset in B2:B6.',
      initialData: [['ID', 'Value'], ['1', 15], ['2', 22], ['3', 'FALSE'], ['4', 18], ['5', 25], ['', ''], ['STDEVPA', '']],
      targetCell: [7, 1],
      expectedFormula: 'STDEVPA(B2:B6)',
      expectedValue: 8.69483
    }
  },
  {
    id: 'steyx',
    title: 'STEYX Function',
    category: 'statistical',
    difficulty: 'Advanced',
    xp: 300,
    introduction: {
      title: 'Regression Error Margin: STEYX',
      description: 'Returns the standard error of the predicted y-value for each x in the regression.',
      concept: 'The "Prediction Accuracy Checker". It tells you how far, on average, your actual data points are from the calculated regression line. A smaller STEYX means your forecast is more reliable.'
    },
    internalLogic: 'Calculates the standard error: √(Σ(y-ŷ)²/(n-2)), where ŷ is the predicted value of y.',
    whyItExists: 'Forecasts are never 100% perfect. STEYX quantifies that imperfection so managers can plan for the "worst case" error margin.',
    whenToUse: 'Use STEYX after calculating a trend to see how much "noise" or error is in your linear model.',
    realWorldUseCases: [
      'Estimating the error margin in a 12-month sales forecast.',
      'Measuring the reliability of a cost-per-unit estimate.',
      'Determining the typical prediction error in scientific experiments.'
    ],
    businessExample: {
      scenario: 'Find the standard error of sales predictions based on advertising spend.',
      formula: '=STEYX(B2:B10, A2:A10)'
    },
    syntax: '=STEYX(known_y\'s, known_x\'s)',
    syntaxBreakdown: [
      { arg: 'known_y\'s', desc: 'The dependent set of data points (required).' },
      { arg: 'known_x\'s', desc: 'The independent set of data points (required).' }
    ],
    detailedExamples: [
      {
        title: 'Forecast Error Calculation',
        table: {
          headers: ['X', 'Y', 'Formula', 'Result'],
          rows: [
            ['1, 2, 3, 4, 5', '3, 5, 8, 10, 13', '=STEYX(B2:B6, A2:A6)', '0.3162']
          ]
        },
        stepByStep: [
          'Excel calculates the best-fit line through the points.',
          'It finds the vertical distance from each point to that line.',
          'The average magnitude of these distances (adjusted for degrees of freedom) is 0.3162.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Reversing Y and X.', desc: 'Just like SLOPE, Y must come FIRST. If you reverse them, you are calculating the error of X relative to Y.' },
      { title: 'Too few points.', desc: 'Requires at least 3 data points (because it divides by n-2).' }
    ],
    proTips: [
      'Roughly 68% of actual points will fall within ±1 STEYX of the regression line.',
      'STEYX of 0 means a perfect linear fit where every point lies exactly on the line.',
      'Use in conjunction with TREND or FORECAST.LINEAR.'
    ],
    relatedFunctions: ['SLOPE', 'INTERCEPT', 'RSQ', 'TREND'],
    miniChallenge: {
      question: 'If you have perfect linear data (X={1,2,3}, Y={2,4,6}), what will STEYX return?',
      expectedAnswer: '0 (Zero error).'
    },
    practice: {
      instructions: 'In cell B8, find the STEYX for the Advertising (B) vs Sales (C) data.',
      initialData: [['', 'Ad Spend (₦)', 'Sales (₦)'], ['', 100, 1100], ['', 200, 2100], ['', 300, 3200], ['', 400, 3900], ['', 500, 5100], ['', '', ''], ['STEYX', '', '']],
      targetCell: [7, 1],
      expectedFormula: 'STEYX(C2:C6,B2:B6)',
      expectedValue: 121.106
    }
  },
  {
    id: 't.dist',
    title: 'T.DIST Function',
    category: 'statistical',
    difficulty: 'Advanced',
    xp: 300,
    introduction: {
      title: "Student's T-Distribution: T.DIST",
      description: 'Returns the Student\'s left-tailed t-distribution.',
      concept: 'The "Small Sample Specialist". Use this when you are doing statistics on a small group (less than 30) where you don\'t know the true population spread. It looks like a bell curve but has "fatter tails" to account for uncertainty.'
    },
    internalLogic: 'Calculates the probability density function (PDF) or cumulative distribution function (CDF) for the t-distribution with specified degrees of freedom.',
    whyItExists: 'In real-world business, we rarely have thousands of data points. T-distribution was invented specifically to help people make accurate inferences from small samples.',
    whenToUse: 'Use T.DIST for hypothesis testing on small samples where the population standard deviation is unknown.',
    realWorldUseCases: [
      'Determining if a new medicine works based on a small trial of 15 people.',
      'Checking if a machine\'s output has changed based on a sample of 10 items.',
      'Finding the p-value for a t-test.'
    ],
    businessExample: {
      scenario: 'Find the left-tail probability for a t-value of 1.5 with 10 degrees of freedom.',
      formula: '=T.DIST(1.5, 10, TRUE)'
    },
    syntax: '=T.DIST(x, deg_freedom, cumulative)',
    syntaxBreakdown: [
      { arg: 'x', desc: 'The numeric value at which to evaluate the distribution (required).' },
      { arg: 'deg_freedom', desc: 'An integer indicating the degrees of freedom (required).' },
      { arg: 'cumulative', desc: 'TRUE returns the CDF (probability ≤ x); FALSE returns the PDF.' }
    ],
    detailedExamples: [
      {
        title: 'T-Distribution Probability',
        table: {
          headers: ['x', 'df', 'Cumulative', 'Result'],
          rows: [
            ['1.5', '10', 'TRUE', '0.9186'],
            ['1.5', '10', 'FALSE', '0.1257']
          ]
        },
        stepByStep: [
          'With 10 degrees of freedom, the probability of being at or below 1.5 is 91.86%.',
          'The height of the curve at 1.5 is 0.1257.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Negative degrees of freedom.', desc: 'Degrees of freedom must be greater than zero.' },
      { title: 'Using for two-tailed tests.', desc: 'T.DIST is left-tailed. For two-tailed probability, use T.DIST.2T.' }
    ],
    proTips: [
      'As degrees of freedom increase (above 30), T.DIST becomes nearly identical to NORM.DIST.',
      'Use T.DIST.RT for right-tailed (upper) probabilities.'
    ],
    relatedFunctions: ['T.INV', 'T.TEST', 'NORM.DIST'],
    miniChallenge: {
      question: 'Find P(T ≤ 2.0) with df=15.',
      expectedAnswer: '=T.DIST(2.0, 15, TRUE)'
    },
    practice: {
      instructions: 'In cell B6, find the left-tail probability. In cell B7, find the PDF at t=2.5.',
      initialData: [['Parameter', 'Value'], ['t-value', 2.5], ['df', 20], ['Cumulative', 'TRUE'], ['', ''], ['Left-tail prob', ''], ['PDF', '']],
      targetCell: [5, 1],
      expectedFormula: 'T.DIST(B2,B3,TRUE)',
      expectedValue: 0.989383
    }
  },
  {
    id: 't.inv',
    title: 'T.INV Function',
    category: 'statistical',
    difficulty: 'Advanced',
    xp: 300,
    introduction: {
      title: 'Inverse T-Distribution: T.INV',
      description: 'Returns the left-tailed inverse of the Student\'s t-distribution.',
      concept: 'The "T-Score Finder". If you know the probability (like 95%), T.INV tells you the specific t-value cutoff point. It\'s the reverse of T.DIST.'
    },
    internalLogic: 'Finds the value t such that the area under the t-distribution curve to the left is equal to the probability.',
    whyItExists: 'Essential for finding critical values for t-tests and for constructing confidence intervals for small datasets.',
    whenToUse: 'Use T.INV when you need to find the "critical value" for a one-tailed statistical test.',
    realWorldUseCases: [
      'Setting a 95% confidence threshold for a small-sample test.',
      'Determining the cutoff score for a "statistically significant" result.',
      'Finding the t-multiplier for a margin of error calculation.'
    ],
    businessExample: {
      scenario: 'Find the t-value for the 95th percentile with 10 degrees of freedom.',
      formula: '=T.INV(0.95, 10)'
    },
    syntax: '=T.INV(probability, deg_freedom)',
    syntaxBreakdown: [
      { arg: 'probability', desc: 'The probability (0 < p < 1) (required).' },
      { arg: 'deg_freedom', desc: 'Degrees of freedom (required).' }
    ],
    detailedExamples: [
      {
        title: 'Critical T-Value Lookup',
        table: {
          headers: ['Probability', 'df', 'Result'],
          rows: [
            ['0.95', '10', '1.8125']
          ]
        },
        stepByStep: [
          '95% of the distribution lies to the left of 1.8125.',
          'If your test result is higher than 1.8125, it is in the top 5%.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Probability bounds.', desc: 'Probability must be strictly between 0 and 1.' },
      { title: 'One-tailed vs Two-tailed.', desc: 'T.INV is for one-tailed. Use T.INV.2T for two-tailed tests.' }
    ],
    proTips: [
      'To find the critical value for a two-tailed test with alpha 0.05, you would look up the 0.975 probability in T.INV.',
      'Verify by wrapping with T.DIST: T.DIST(T.INV(p,df),df,TRUE) = p.'
    ],
    relatedFunctions: ['T.DIST', 'T.INV.2T', 'NORM.S.INV'],
    miniChallenge: {
      question: 'Find critical t-value for one-tailed α=0.01 with df=25.',
      expectedAnswer: '=T.INV(0.99, 25)'
    },
    practice: {
      instructions: 'In cell B5, find the T.INV for 97.5% with df=15. In cell B9, find it for 5% with df=30.',
      initialData: [['Parameter', 'Value'], ['Prob', 0.975], ['df', 15], ['', ''], ['T.INV', ''], ['', ''], ['Prob', 0.05], ['df', 30], ['T.INV', '']],
      targetCell: [4, 1],
      expectedFormula: 'T.INV(B2,B3)',
      expectedValue: 2.13145
    }
  },
  {
    id: 't.test',
    title: 'T.TEST Function',
    category: 'statistical',
    difficulty: 'Advanced',
    xp: 400,
    introduction: {
      title: 'Hypothesis Comparison: T.TEST',
      description: 'Returns the probability associated with a Student\'s t-Test.',
      concept: 'The "Significance Checker". It compares two groups of numbers and tells you the "p-value" — the probability that the difference between them was just a lucky accident.'
    },
    internalLogic: 'Calculates the t-statistic based on the chosen type (paired, equal variance, or unequal variance) and returns the corresponding p-value.',
    whyItExists: 'Managers use T.TEST to prove that a change (like a new training program or a price increase) actually made a real difference and wasn\'t just random chance.',
    whenToUse: 'Use T.TEST whenever you want to compare the averages of two datasets to see if they are "significantly" different.',
    realWorldUseCases: [
      'Comparing sales before and after a marketing campaign (Type 1: Paired).',
      'Comparing test scores between Class A and Class B (Type 2: Independent).',
      'Checking if two different suppliers provide the same quality of parts.'
    ],
    businessExample: {
      scenario: 'Determine if there is a significant difference between Group A and Group B scores.',
      formula: '=T.TEST(A2:A6, B2:B6, 2, 2)'
    },
    syntax: '=T.TEST(array1, array2, tails, type)',
    syntaxBreakdown: [
      { arg: 'array1', desc: 'First data set (required).' },
      { arg: 'array2', desc: 'Second data set (required).' },
      { arg: 'tails', desc: '1 for one-tailed, 2 for two-tailed (required).' },
      { arg: 'type', desc: '1=Paired; 2=Independent (equal variance); 3=Independent (unequal variance) (required).' }
    ],
    detailedExamples: [
      {
        title: 'Group Comparison Results',
        table: {
          headers: ['Group A', 'Group B', 'Formula', 'P-Value'],
          rows: [
            ['85, 90, 88, 92, 86', '78, 82, 85, 80, 84', '=T.TEST(A2:A6, B2:B6, 2, 2)', '0.0419']
          ]
        },
        stepByStep: [
          'Excel calculates the mean of both groups.',
          'It performs a two-tailed, equal variance t-test.',
          'The result is 0.0419. Since this is < 0.05, the difference is considered "statistically significant".'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Wrong type choice.', desc: 'Use Type 1 only if the SAME people/items are in both lists (e.g., Before vs After). Use Type 3 if the groups are independent and have different spreads.' },
      { title: 'Interpreting large p-values.', desc: 'If p > 0.05, it means the difference is NOT significant. You cannot claim the groups are different.' }
    ],
    proTips: [
      'Type 3 (Welch\'s t-test) is a safer default if you aren\'t sure about variances.',
      'A "p-value" under 0.05 is the universal gold standard for proving a result is real.'
    ],
    relatedFunctions: ['T.DIST', 'F.TEST', 'AVERAGE'],
    miniChallenge: {
      question: 'Before: {10, 12, 15, 18}, After: {8, 10, 13, 16}. What type should you use?',
      expectedAnswer: 'Type 1 (Paired), because it is a Before/After comparison of the same items.'
    },
    practice: {
      instructions: 'In cell B8, perform a two-tailed (tails=2), unequal variance (type=3) t-test on Method 1 (B2:B6) vs Method 2 (C2:C6).',
      initialData: [['', 'Method 1', 'Method 2'], ['', 45, 42], ['', 48, 44], ['', 52, 47], ['', 50, 45], ['', 47, 43], ['', '', ''], ['P-Value', '', '']],
      targetCell: [7, 1],
      expectedFormula: 'T.TEST(B2:B6,C2:C6,2,3)',
      expectedValue: 0.024519
    }
  },
  {
    id: 'trend',
    title: 'TREND Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Linear Data Forecasting: TREND',
      description: 'Returns values along a linear trend.',
      concept: 'The "Prediction Engine". Give it your historical data, and TREND will automatically calculate the best-fit line and tell you what the future numbers should be.'
    },
    internalLogic: 'Fits a straight line (y = mx + b) using the method of least squares and returns the y-values along that line for the specified new x-values.',
    whyItExists: 'Managers need to project future performance. TREND does the math of a trendline automatically without needing a chart.',
    whenToUse: 'Use TREND to predict future sales, costs, or growth based on a consistent linear history.',
    realWorldUseCases: [
      'Projecting next month\'s sales based on the last 4 months.',
      'Estimating future energy costs based on past usage patterns.',
      'Creating a linear "baseline" for project performance tracking.'
    ],
    businessExample: {
      scenario: 'Predict Month 5 and 6 sales based on Months 1 to 4.',
      formula: '=TREND(B2:B5, A2:A5, {5;6})'
    },
    syntax: '=TREND(known_y\'s, [known_x\'s], [new_x\'s], [const])',
    syntaxBreakdown: [
      { arg: 'known_y\'s', desc: 'The set of dependent y-values you already know (required).' },
      { arg: 'known_x\'s', desc: 'The independent x-values (like month numbers) (optional).' },
      { arg: 'new_x\'s', desc: 'The x-values you want to get new y-predictions for (optional).' },
      { arg: 'const', desc: 'TRUE to calculate the intercept normally; FALSE to force it through zero (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Sales Projection',
        table: {
          headers: ['Month (X)', 'Sales (Y)', 'Formula', 'Prediction'],
          rows: [
            ['1, 2, 3, 4', '3, 7, 11, 15', '=TREND(B2:B5, A2:A5, 5)', '19']
          ]
        },
        stepByStep: [
          'The data has a clear pattern: Y = 4X - 1.',
          'TREND identifies this pattern.',
          'For Month 5: 4(5) - 1 = 19.',
          'Result: 19.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Array entry.', desc: 'In older Excel versions, you must select the output range and press Ctrl+Shift+Enter for multiple predictions.' },
      { title: 'Non-linear data.', desc: 'If your data grows exponentially (curved), TREND will provide an inaccurate straight-line estimate.' }
    ],
    proTips: [
      'TREND can return multiple values at once (an array).',
      'If you only need one future prediction, FORECAST.LINEAR is slightly simpler.',
      'Use GROWTH instead of TREND if your data is compounding (exponential).'
    ],
    relatedFunctions: ['FORECAST.LINEAR', 'GROWTH', 'LINEST', 'SLOPE'],
    miniChallenge: {
      question: 'TREND for Y={5, 10, 15, 20}, X={2, 4, 6, 8}. What is the prediction for X=10?',
      expectedAnswer: '25'
    },
    practice: {
      instructions: 'In cell B7, predict Month 5 sales. In cell B8, predict Month 6 sales.',
      initialData: [['Month', 'Sales'], [1, 200], [2, 240], [3, 280], [4, 320], ['', ''], ['Month 5', ''], ['Month 6', '']],
      targetCell: [6, 1],
      expectedFormula: 'TREND(B2:B5,A2:A5,5)',
      expectedValue: 360
    }
  },
  {
    id: 'trimmean',
    title: 'TRIMMEAN Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Outlier-Resistant Average: TRIMMEAN',
      description: 'Returns the mean of the interior of a data set.',
      concept: 'The "Fair Average". It removes a percentage of the highest and lowest values before calculating the mean. This stops extreme outliers from "trashing" your result.'
    },
    internalLogic: 'Sorts the data, excludes the specified percentage of points from the top and bottom equally, and then averages the remaining middle values.',
    whyItExists: 'In scoring (like the Olympics) or price analysis, the highest and lowest results are often "flukes". TRIMMEAN focuses on the consistent middle performance.',
    whenToUse: 'Use TRIMMEAN when you have a dataset with potential "junk" outliers at the extreme ends.',
    realWorldUseCases: [
      'Olympic diving scores (remove the high/low judge).',
      'Calculating typical employee performance while ignoring one-off bad months.',
      'Averaging stock prices while ignoring brief "flash" spikes.'
    ],
    businessExample: {
      scenario: 'Calculate the average salary while ignoring the top 10% and bottom 10% of earners.',
      formula: '=TRIMMEAN(A2:A100, 0.2)'
    },
    syntax: '=TRIMMEAN(array, percent)',
    syntaxBreakdown: [
      { arg: 'array', desc: 'The range of values to trim and average (required).' },
      { arg: 'percent', desc: 'The fraction of data points to exclude (0 to 1). 0.2 means 20% total (10% from each end) (required).' }
    ],
    detailedExamples: [
      {
        title: 'Trimming Extremes',
        table: {
          headers: ['Data', 'Percent', 'Formula', 'Result'],
          rows: [
            ['5, 12, 23, 34, 45, 56, 67, 78, 89, 95', '0.2', '=TRIMMEAN(A2:A11, 0.2)', '50.5']
          ]
        },
        stepByStep: [
          '10 items total. 20% (0.2) of 10 = 2 items to exclude.',
          'Excel removes 1 from the top (95) and 1 from the bottom (5).',
          'Averages the remaining 8 items: 12, 23, 34, 45, 56, 67, 78, 89.',
          'Result: 50.5.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Percent confusion.', desc: 'The "percent" is the TOTAL to remove. If you want to remove 10% from each tail, you must enter 0.2 (20%).' },
      { title: 'Rounding.', desc: 'Excel rounds the number of excluded points down to the nearest multiple of 2.' }
    ],
    proTips: [
      'A 20% trim (0.2) is the most common industry standard.',
      'TRIMMEAN is safer than AVERAGE but more descriptive than MEDIAN.',
      'If percent = 0, it is the same as a regular AVERAGE.'
    ],
    relatedFunctions: ['AVERAGE', 'MEDIAN', 'QUARTILE.EXC'],
    miniChallenge: {
      question: 'TRIMMEAN with 10% trim: {1, 2, 3, 4, 100}. Will 100 be removed?',
      expectedAnswer: 'No, because 10% of 5 is 0.5, which rounds down to zero items removed.'
    },
    practice: {
      instructions: 'In cell B11, calculate the TRIMMEAN (0.25 trim) of the scores in B2:B9.',
      initialData: [['Student', 'Score'], ['A', 85], ['B', 92], ['C', 45], ['D', 78], ['E', 88], ['F', 95], ['G', 52], ['H', 90], ['', ''], ['TRIMMEAN', '']],
      targetCell: [10, 1],
      expectedFormula: 'TRIMMEAN(B2:B9,0.25)',
      expectedValue: 80.8333
    }
  },
  {
    id: 'var.p',
    title: 'VAR.P Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Population Variance: VAR.P',
      description: 'Calculates variance based on the entire population.',
      concept: 'The "Squared Spread". It measures how far numbers are spread out from their average. Because it squares the distances, it is always positive and gives a big "penalty" to outliers.'
    },
    internalLogic: 'Calculates σ² = Σ(x-μ)²/n. It is the average of the squared differences from the mean.',
    whyItExists: 'Variance is the mathematical engine behind risk and volatility. STDEV.P is just the square root of VAR.P.',
    whenToUse: 'Use VAR.P when you have data for the entire population and need to calculate statistical volatility.',
    realWorldUseCases: [
      'Analyzing the volatility of an entire month\'s production output.',
      'Calculating the squared deviation of all employee ages in a firm.',
      'Academic research where the entire dataset is known.'
    ],
    businessExample: {
      scenario: 'Find the population variance for the output of all 5 machines.',
      formula: '=VAR.P(A2:A6)'
    },
    syntax: '=VAR.P(number1, [number2], ...)',
    syntaxBreakdown: [
      { arg: 'number1', desc: 'First numeric value or range of the population (required).' },
      { arg: 'number2', desc: 'Additional values or ranges (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Population Variance Calculation',
        table: {
          headers: ['Value', 'Formula', 'Result'],
          rows: [
            ['10, 20, 30, 40, 50', '=VAR.P(A2:A6)', '200']
          ]
        },
        stepByStep: [
          'Average = 30.',
          'Squared deviations: 400, 100, 0, 100, 400.',
          'Sum = 1000.',
          'Divide by count (5): 1000 / 5 = 200.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Using for samples.', desc: 'VAR.P will underestimate the variance of a sample. Use VAR.S for sample data.' },
      { title: 'Squared units.', desc: 'Variance is in "units squared" (e.g., ₦²). For results in the original units (₦), take the square root to get Standard Deviation.' }
    ],
    proTips: [
      'VAR.P is always smaller than VAR.S for the same dataset.',
      'Square root of VAR.P = STDEV.P.'
    ],
    relatedFunctions: ['VAR.S', 'STDEV.P', 'VARA'],
    miniChallenge: {
      question: 'Population: {2, 4, 6, 8, 10}. What is the variance?',
      expectedAnswer: '8'
    },
    practice: {
      instructions: 'In cell B10, calculate the VAR.P for the output of all machines in B2:B8.',
      initialData: [['Machine', 'Output'], ['1', 100], ['2', 105], ['3', 98], ['4', 102], ['5', 103], ['6', 97], ['7', 101], ['', ''], ['VAR.P', '']],
      targetCell: [9, 1],
      expectedFormula: 'VAR.P(B2:B8)',
      expectedValue: 6.69388
    }
  },
  {
    id: 'var.s',
    title: 'VAR.S Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Sample Variance: VAR.S',
      description: 'Estimates variance based on a sample.',
      concept: 'The "Unbiased Volatility Estimator". Like STDEV.S, it uses "n-1" to ensure it doesn\'t underestimate the true variance of the population it represents.'
    },
    internalLogic: 'Calculates s² = Σ(x-x̄)²/(n-1).',
    whyItExists: 'Standard in almost all statistical software for estimating the true spread of a population from a sample.',
    whenToUse: 'Use VAR.S for all sample-based data analysis where you need to measure variability.',
    realWorldUseCases: [
      'Estimating the volatility of stock market returns based on a 30-day sample.',
      'Analyzing the variance in daily assembly line speed from a 5-day sample.',
      'Scientific research where only a subset of the population is tested.'
    ],
    businessExample: {
      scenario: 'Estimate the variance in delivery times based on a sample of 5 deliveries.',
      formula: '=VAR.S(B2:B6)'
    },
    syntax: '=VAR.S(number1, [number2], ...)',
    syntaxBreakdown: [
      { arg: 'number1', desc: 'First numeric value or range of the sample (required).' },
      { arg: 'number2', desc: 'Additional values or ranges (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Sample Variance Calculation',
        table: {
          headers: ['Sample', 'Formula', 'Result'],
          rows: [
            ['10, 20, 30, 40, 50', '=VAR.S(A2:A6)', '250']
          ]
        },
        stepByStep: [
          'Average = 30. Sum of squared deviations = 1000.',
          'Divide by (n-1) = 4.',
          '1000 / 4 = 250.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Fewer than 2 points.', desc: 'VAR.S requires at least 2 numbers. 1 number returns #DIV/0!.' },
      { title: 'Using for population.', desc: 'Using VAR.S on a full population slightly overestimates the true variance.' }
    ],
    proTips: [
      'VAR.S is the default choice for most statistical reporting.',
      'Square root of VAR.S = STDEV.S.'
    ],
    relatedFunctions: ['VAR.P', 'STDEV.S', 'VARA'],
    miniChallenge: {
      question: 'Sample: {15, 18, 22, 25, 20}. Find sample variance.',
      expectedAnswer: '14.5'
    },
    practice: {
      instructions: 'In cell B9, calculate the VAR.S for the sample times in B2:B7.',
      initialData: [['Sample ID', 'Time (min)'], ['1', 5.2], ['2', 4.8], ['3', 5.5], ['4', 5.1], ['5', 4.9], ['6', 5.3], ['', ''], ['VAR.S', '']],
      targetCell: [8, 1],
      expectedFormula: 'VAR.S(B2:B7)',
      expectedValue: 0.066667
    }
  },
  {
    id: 'vara',
    title: 'VARA Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Inclusive Sample Variance: VARA',
      description: 'Estimates variance based on a sample, including logical values and text.',
      concept: 'A variation of VAR.S that allows non-numeric data to be included in the math. TRUE becomes 1; anything else non-numeric (text or FALSE) becomes 0.'
    },
    internalLogic: 'Uses the (n-1) sample variance formula after converting logicals and text into 1s and 0s.',
    whyItExists: 'In many data systems, "None" or "Fail" are stored as text but mathematically represent a value of zero.',
    whenToUse: 'Use VARA when your dataset includes non-numeric flags that carry intentional zero/one numeric meaning.',
    realWorldUseCases: [
      'Calculating variance in a task list where "Complete" is TRUE.',
      'Analyzing data where "Failed" text counts as a zero score.',
      'Mixed-data surveys where responses are 1-5 or "No comment" (0).'
    ],
    businessExample: {
      scenario: 'Calculate variance for a list where TRUE/FALSE represents success/failure.',
      formula: '=VARA(B2:B20)'
    },
    syntax: '=VARA(value1, [value2], ...)',
    syntaxBreakdown: [
      { arg: 'value1', desc: 'First value or range of the sample (required).' },
      { arg: 'value2', desc: 'Additional values or ranges (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Mixed Data Variance',
        table: {
          headers: ['Value', 'Formula', 'Result'],
          rows: [
            ['10, 20, TRUE, 30, Text', '=VARA(A2:A6)', '164.2']
          ]
        },
        stepByStep: [
          'Interpreted as 10, 20, 1, 30, 0.',
          'Sample variance of these 5 numbers is calculated.',
          'Result: 164.2.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Text becomes zero.', desc: 'If your text is just descriptive and shouldn\'t be 0, VARA will give you a misleading result.' },
      { title: 'Ignoring non-numeric.', desc: 'Forgetting that VARA treats FALSE as 0, which might drastically change your mean and variance.' }
    ],
    proTips: [
      'VARA usually differs from VAR.S for the same mixed dataset.',
      'Square root of VARA = STDEVA.'
    ],
    relatedFunctions: ['VAR.S', 'VARPA', 'STDEVA'],
    miniChallenge: {
      question: 'VARA of {5, 10, TRUE, 15}. Compare with VAR.S of {5, 10, 15}. Which is larger?',
      expectedAnswer: 'VARA (29.6) vs VAR.S (25). VARA is larger because it includes the "1" from TRUE.'
    },
    practice: {
      instructions: 'In cell B8, calculate the VARA of the mixed data in B2:B6. Compare to VAR.S in cell B9.',
      initialData: [['ID', 'Response'], ['1', 12], ['2', 18], ['3', 'TRUE'], ['4', 8], ['5', 'FALSE'], ['', ''], ['VARA', ''], ['VAR.S', '']],
      targetCell: [7, 1],
      expectedFormula: 'VARA(B2:B6)',
      expectedValue: 57.2
    }
  },
  {
    id: 'varpa',
    title: 'VARPA Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 200,
    introduction: {
      title: 'Inclusive Population Variance: VARPA',
      description: 'Calculates variance based on the entire population, including logical values and text.',
      concept: 'The population version of VARA. It includes logicals (TRUE=1) and text (0) in the calculation and uses "n" as the denominator.'
    },
    internalLogic: 'Calculates Σ(x-μ)²/n, where TRUE=1 and Text/FALSE=0.',
    whyItExists: 'For complete datasets where non-numeric status codes represent numeric "states" (0 or 1).',
    whenToUse: 'Use VARPA when you have the entire population and need to include logical/text flags in your volatility analysis.',
    realWorldUseCases: [
      'Calculating total production variance across all machines where "Offline" is text.',
      'Analyzing volatility in status codes across an entire customer database.',
      'Full-census data analysis involving logical status flags.'
    ],
    businessExample: {
      scenario: 'Calculate population variance for the entire sensor grid, including text errors.',
      formula: '=VARPA(B2:B20)'
    },
    syntax: '=VARPA(value1, [value2], ...)',
    syntaxBreakdown: [
      { arg: 'value1', desc: 'First value or range of the population (required).' },
      { arg: 'value2', desc: 'Additional values or ranges (optional).' }
    ],
    detailedExamples: [
      {
        title: 'Full Population Mixed Variance',
        table: {
          headers: ['Value', 'Formula', 'Result'],
          rows: [
            ['10, 20, TRUE, 30, Text', '=VARPA(A2:A6)', '131.36']
          ]
        },
        stepByStep: [
          'Interpreted as 10, 20, 1, 30, 0.',
          'Calculates population variance (n=5).',
          'Result: 131.36.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Sample vs Population.', desc: 'Use VARA if you only have a sample.' },
      { title: 'Text inclusion.', desc: 'ALL text becomes zero. Ensure this is the intended statistical behavior for your specific text data.' }
    ],
    proTips: [
      'VARPA is always smaller than VARA for the same dataset.',
      'Square root of VARPA = STDEVPA.'
    ],
    relatedFunctions: ['VARA', 'VAR.P', 'STDEVPA'],
    miniChallenge: {
      question: 'Complete dataset: {8, 12, FALSE, 10, 15}. Find VARPA.',
      expectedAnswer: '24.4'
    },
    practice: {
      instructions: 'In cell B8, calculate the VARPA for all responses in B2:B6.',
      initialData: [['User', 'Result'], ['1', 20], ['2', 25], ['3', 'TRUE'], ['4', 15], ['5', 22], ['', ''], ['VARPA', '']],
      targetCell: [7, 1],
      expectedFormula: 'VARPA(B2:B6)',
      expectedValue: 71.44
    }
  },
  {
    id: 'weibull.dist',
    title: 'WEIBULL.DIST Function',
    category: 'statistical',
    difficulty: 'Advanced',
    xp: 300,
    introduction: {
      title: 'Reliability & Life Analysis: WEIBULL.DIST',
      description: 'Returns the Weibull distribution.',
      concept: 'The "Engine of Survival Statistics". It is used to predict the lifespan of parts, products, and even medical outcomes. It can model systems where the failure rate decreases, stays constant, or increases over time.'
    },
    internalLogic: 'Calculates the PDF or CDF based on shape (Alpha) and scale (Beta) parameters.',
    whyItExists: 'Weibull is the most flexible distribution in engineering. By changing Alpha, it can mimic many other distributions (like the Normal or Exponential).',
    whenToUse: 'Use WEIBULL.DIST for reliability engineering, survival analysis, and lifetime prediction.',
    realWorldUseCases: [
      'Predicting the probability that a lightbulb will fail before 1,000 hours.',
      'Analyzing the "time-to-failure" for industrial machinery.',
      'Modeling wind speeds for renewable energy sites.'
    ],
    businessExample: {
      scenario: 'Find the probability of a part failing before 100 hours with Alpha=2 and Beta=150.',
      formula: '=WEIBULL.DIST(100, 2, 150, TRUE)'
    },
    syntax: '=WEIBULL.DIST(x, alpha, beta, cumulative)',
    syntaxBreakdown: [
      { arg: 'x', desc: 'The value at which to evaluate the function (≥0) (required).' },
      { arg: 'alpha', desc: 'The shape parameter (>0) (required).' },
      { arg: 'beta', desc: 'The scale parameter (>0) (required).' },
      { arg: 'cumulative', desc: 'TRUE for CDF (probability of failure by time x); FALSE for PDF.' }
    ],
    detailedExamples: [
      {
        title: 'Failure Probability Calculation',
        table: {
          headers: ['x (Time)', 'Alpha', 'Beta', 'Cumulative', 'Result'],
          rows: [
            ['100', '2', '150', 'TRUE', '0.3588'],
            ['100', '2', '150', 'FALSE', '0.0057']
          ]
        },
        stepByStep: [
          'Alpha=2 means the failure rate is increasing over time.',
          'Beta=150 is the "characteristic life" (63.2% of parts fail by this time).',
          'At x=100, the probability of failure is 35.88%.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'Negative x or alpha.', desc: 'All numeric arguments (x, alpha, beta) must be non-negative (and alpha, beta must be > 0).' },
      { title: 'Parameter confusion.', desc: 'Swapping alpha (shape) and beta (scale) will completely change the curve.' }
    ],
    proTips: [
      'If Alpha = 1, it becomes the Exponential Distribution.',
      'If Alpha = 3.6, it approximately follows a Normal Distribution.',
      'Scale (Beta) is the point where ~63.2% of the population has failed.'
    ],
    relatedFunctions: ['NORM.DIST', 'EXPON.DIST', 'LOGNORM.DIST'],
    miniChallenge: {
      question: 'Weibull with α=1.5, β=1000. Find the probability of failure before 500 hours.',
      expectedAnswer: '=WEIBULL.DIST(500, 1.5, 1000, TRUE) ≈ 0.297.'
    },
    practice: {
      instructions: 'In cell B7, find the cumulative failure probability. In cell B8, find the failure density (PDF).',
      initialData: [['Parameter', 'Value'], ['x', 200], ['Alpha', 3], ['Beta', 250], ['Cumulative', 'TRUE'], ['', ''], ['CDF', ''], ['PDF', '']],
      targetCell: [6, 1],
      expectedFormula: 'WEIBULL.DIST(B2,B3,B4,TRUE)',
      expectedValue: 0.400704
    }
  },
  {
    id: 'z.test',
    title: 'Z.TEST Function',
    category: 'statistical',
    difficulty: 'Intermediate',
    xp: 250,
    introduction: {
      title: 'One-Tailed Z-Test: Z.TEST',
      description: 'Returns the one-tailed probability value of a z-test.',
      concept: 'The "Threshold Checker". It tests if a sample mean is higher than a hypothesized population mean. It\'s used when you have a large sample (n > 30) or you already know the population standard deviation.'
    },
    internalLogic: 'Calculates the z-score: (x̄ - μ) / (σ / √n) and returns the area to the right of that score (1 - NORM.S.DIST).',
    whyItExists: 'Z.TEST is a quick way to see if a small change in your data is significant or just noise, provided you have a large enough group to be confident.',
    whenToUse: 'Use Z.TEST for right-tailed hypothesis testing on large samples.',
    realWorldUseCases: [
      'Checking if a new ad campaign increased average order value.',
      'Testing if a factory machine is outputting slightly higher than its spec.',
      'Analyzing large-scale survey results for significant deviations.'
    ],
    businessExample: {
      scenario: 'Test if the average score of 102.4 is significantly higher than 100, assuming SD is 5.',
      formula: '=Z.TEST(A2:A11, 100, 5)'
    },
    syntax: '=Z.TEST(array, x, [sigma])',
    syntaxBreakdown: [
      { arg: 'array', desc: 'The range of data to test (required).' },
      { arg: 'x', desc: 'The hypothesized population mean (required).' },
      { arg: 'sigma', desc: 'The known population standard deviation (optional; uses sample SD if omitted).' }
    ],
    detailedExamples: [
      {
        title: 'Right-Tail Probability',
        table: {
          headers: ['Data', 'Test Mean (x)', 'Sigma', 'Result'],
          rows: [
            ['105, 98, 102, 110, 95, 108, 100, 103, 97, 106', '100', '5', '0.0572']
          ]
        },
        stepByStep: [
          'Sample Mean (x̄) = 102.4.',
          'Excel calculates the z-score relative to 100.',
          'It returns the probability that a random sample would be 102.4 or HIGHER.',
          'Result 0.0572 means there is a 5.72% chance this result happened by luck.'
        ]
      }
    ],
    commonMistakes: [
      { title: 'One-tailed only.', desc: 'Z.TEST always calculates the right-tail (x̄ > x). For two-tailed, use: 2 * MIN(Z.TEST, 1-Z.TEST).' },
      { title: 'Sample size.', desc: 'Strictly speaking, Z-tests are for large samples (n ≥ 30). For smaller samples, use T.TEST.' }
    ],
    proTips: [
      'If Z.TEST < 0.05, we typically "Reject the Null" and say the increase is significant.',
      'To test if the mean is LOWER (left-tail), use: 1 - Z.TEST(...).'
    ],
    relatedFunctions: ['T.TEST', 'NORM.S.DIST', 'STDEV.P'],
    miniChallenge: {
      question: 'Sample mean test: data={52, 48, 55, 50, 53}, test μ=50 with σ=3. Is this significantly higher at α=0.05?',
      expectedAnswer: 'No (p ≈ 0.067). It is close, but not quite significant.'
    },
    practice: {
      instructions: 'In cell B10, find the one-tailed p-value for a hypothesized mean of 30 and sigma of 3. In cell B11, find the two-tailed p-value.',
      initialData: [['Data'], [32], [35], [28], [33], [30], [34], [31], ['', ''], ['One-tailed', ''], ['Two-tailed', '']],
      targetCell: [9, 1],
      expectedFormula: 'Z.TEST(A2:A8,30,3)',
      expectedValue: 0.050727
    }
  }
];
