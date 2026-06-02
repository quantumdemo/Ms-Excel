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
  "id": "countblank",
  "title": "COUNTBLANK Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "COUNTBLANK",
    "description": "Calculate the COUNTBLANK property for data analysis.",
    "concept": "the COUNTBLANK analyzer"
  },
  "whyItExists": "Essential for COUNTBLANK property evaluation.",
  "whenToUse": "Analyze COUNTBLANK in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform COUNTBLANK on monthly data.",
    "formula": "=COUNTBLANK(B2:B50)"
  },
  "syntax": "=COUNTBLANK(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "COUNTBLANK Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select COUNTBLANK.",
        "2. Calculate COUNTBLANK."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "COUNTBLANK is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use COUNTBLANK?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use COUNTBLANK on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COUNTBLANK(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "countif",
  "title": "COUNTIF Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "COUNTIF",
    "description": "Calculate the COUNTIF property for data analysis.",
    "concept": "the COUNTIF analyzer"
  },
  "whyItExists": "Essential for COUNTIF property evaluation.",
  "whenToUse": "Analyze COUNTIF in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform COUNTIF on monthly data.",
    "formula": "=COUNTIF(B2:B50)"
  },
  "syntax": "=COUNTIF(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "COUNTIF Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select COUNTIF.",
        "2. Calculate COUNTIF."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "COUNTIF is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use COUNTIF?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use COUNTIF on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COUNTIF(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "countifs",
  "title": "COUNTIFS Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "COUNTIFS",
    "description": "Calculate the COUNTIFS property for data analysis.",
    "concept": "the COUNTIFS analyzer"
  },
  "whyItExists": "Essential for COUNTIFS property evaluation.",
  "whenToUse": "Analyze COUNTIFS in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform COUNTIFS on monthly data.",
    "formula": "=COUNTIFS(B2:B50)"
  },
  "syntax": "=COUNTIFS(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "COUNTIFS Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select COUNTIFS.",
        "2. Calculate COUNTIFS."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "COUNTIFS is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use COUNTIFS?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use COUNTIFS on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COUNTIFS(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "covariance.p",
  "title": "COVARIANCE.P Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "COVARIANCE.P",
    "description": "Calculate the COVARIANCE.P property for data analysis.",
    "concept": "the COVARIANCE.P analyzer"
  },
  "whyItExists": "Essential for COVARIANCE.P property evaluation.",
  "whenToUse": "Analyze COVARIANCE.P in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform COVARIANCE.P on monthly data.",
    "formula": "=COVARIANCE.P(B2:B50)"
  },
  "syntax": "=COVARIANCE.P(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "COVARIANCE.P Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select COVARIANCE.P.",
        "2. Calculate COVARIANCE.P."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "COVARIANCE.P is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use COVARIANCE.P?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use COVARIANCE.P on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COVARIANCE.P(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "covariance.s",
  "title": "COVARIANCE.S Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "COVARIANCE.S",
    "description": "Calculate the COVARIANCE.S property for data analysis.",
    "concept": "the COVARIANCE.S analyzer"
  },
  "whyItExists": "Essential for COVARIANCE.S property evaluation.",
  "whenToUse": "Analyze COVARIANCE.S in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform COVARIANCE.S on monthly data.",
    "formula": "=COVARIANCE.S(B2:B50)"
  },
  "syntax": "=COVARIANCE.S(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "COVARIANCE.S Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select COVARIANCE.S.",
        "2. Calculate COVARIANCE.S."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "COVARIANCE.S is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use COVARIANCE.S?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use COVARIANCE.S on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COVARIANCE.S(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "devsq",
  "title": "DEVSQ Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "DEVSQ",
    "description": "Calculate the DEVSQ property for data analysis.",
    "concept": "the DEVSQ analyzer"
  },
  "whyItExists": "Essential for DEVSQ property evaluation.",
  "whenToUse": "Analyze DEVSQ in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform DEVSQ on monthly data.",
    "formula": "=DEVSQ(B2:B50)"
  },
  "syntax": "=DEVSQ(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "DEVSQ Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select DEVSQ.",
        "2. Calculate DEVSQ."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "DEVSQ is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use DEVSQ?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use DEVSQ on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "DEVSQ(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "expon.dist",
  "title": "EXPON.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "EXPON.DIST",
    "description": "Calculate the EXPON.DIST property for data analysis.",
    "concept": "the EXPON.DIST analyzer"
  },
  "whyItExists": "Essential for EXPON.DIST property evaluation.",
  "whenToUse": "Analyze EXPON.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform EXPON.DIST on monthly data.",
    "formula": "=EXPON.DIST(B2:B50)"
  },
  "syntax": "=EXPON.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "EXPON.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select EXPON.DIST.",
        "2. Calculate EXPON.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "EXPON.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use EXPON.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use EXPON.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "EXPON.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "f.dist",
  "title": "F.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "F.DIST",
    "description": "Calculate the F.DIST property for data analysis.",
    "concept": "the F.DIST analyzer"
  },
  "whyItExists": "Essential for F.DIST property evaluation.",
  "whenToUse": "Analyze F.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform F.DIST on monthly data.",
    "formula": "=F.DIST(B2:B50)"
  },
  "syntax": "=F.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "F.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select F.DIST.",
        "2. Calculate F.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "F.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use F.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use F.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "F.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "f.inv",
  "title": "F.INV Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "F.INV",
    "description": "Calculate the F.INV property for data analysis.",
    "concept": "the F.INV analyzer"
  },
  "whyItExists": "Essential for F.INV property evaluation.",
  "whenToUse": "Analyze F.INV in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform F.INV on monthly data.",
    "formula": "=F.INV(B2:B50)"
  },
  "syntax": "=F.INV(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "F.INV Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select F.INV.",
        "2. Calculate F.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "F.INV is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use F.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use F.INV on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "F.INV(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "f.test",
  "title": "F.TEST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "F.TEST",
    "description": "Calculate the F.TEST property for data analysis.",
    "concept": "the F.TEST analyzer"
  },
  "whyItExists": "Essential for F.TEST property evaluation.",
  "whenToUse": "Analyze F.TEST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform F.TEST on monthly data.",
    "formula": "=F.TEST(B2:B50)"
  },
  "syntax": "=F.TEST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "F.TEST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select F.TEST.",
        "2. Calculate F.TEST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "F.TEST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use F.TEST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use F.TEST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "F.TEST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "fisher",
  "title": "FISHER Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "FISHER",
    "description": "Calculate the FISHER property for data analysis.",
    "concept": "the FISHER analyzer"
  },
  "whyItExists": "Essential for FISHER property evaluation.",
  "whenToUse": "Analyze FISHER in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform FISHER on monthly data.",
    "formula": "=FISHER(B2:B50)"
  },
  "syntax": "=FISHER(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "FISHER Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select FISHER.",
        "2. Calculate FISHER."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "FISHER is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use FISHER?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use FISHER on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "FISHER(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "fisherinv",
  "title": "FISHERINV Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "FISHERINV",
    "description": "Calculate the FISHERINV property for data analysis.",
    "concept": "the FISHERINV analyzer"
  },
  "whyItExists": "Essential for FISHERINV property evaluation.",
  "whenToUse": "Analyze FISHERINV in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform FISHERINV on monthly data.",
    "formula": "=FISHERINV(B2:B50)"
  },
  "syntax": "=FISHERINV(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "FISHERINV Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select FISHERINV.",
        "2. Calculate FISHERINV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "FISHERINV is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use FISHERINV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use FISHERINV on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "FISHERINV(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "forecast",
  "title": "FORECAST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "FORECAST",
    "description": "Calculate the FORECAST property for data analysis.",
    "concept": "the FORECAST analyzer"
  },
  "whyItExists": "Essential for FORECAST property evaluation.",
  "whenToUse": "Analyze FORECAST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform FORECAST on monthly data.",
    "formula": "=FORECAST(B2:B50)"
  },
  "syntax": "=FORECAST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "FORECAST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select FORECAST.",
        "2. Calculate FORECAST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "FORECAST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use FORECAST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use FORECAST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "FORECAST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "frequency",
  "title": "FREQUENCY Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "FREQUENCY",
    "description": "Calculate the FREQUENCY property for data analysis.",
    "concept": "the FREQUENCY analyzer"
  },
  "whyItExists": "Essential for FREQUENCY property evaluation.",
  "whenToUse": "Analyze FREQUENCY in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform FREQUENCY on monthly data.",
    "formula": "=FREQUENCY(B2:B50)"
  },
  "syntax": "=FREQUENCY(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "FREQUENCY Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select FREQUENCY.",
        "2. Calculate FREQUENCY."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "FREQUENCY is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use FREQUENCY?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use FREQUENCY on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "FREQUENCY(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "gamma",
  "title": "GAMMA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "GAMMA",
    "description": "Calculate the GAMMA property for data analysis.",
    "concept": "extension of factorial"
  },
  "whyItExists": "Essential for GAMMA property evaluation.",
  "whenToUse": "Analyze GAMMA in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform GAMMA on monthly data.",
    "formula": "=GAMMA(B2:B50)"
  },
  "syntax": "=GAMMA(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "GAMMA Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "GAMMA(5) = 24."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "GAMMA is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GAMMA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use GAMMA on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GAMMA(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "gamma.dist",
  "title": "GAMMA.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "GAMMA.DIST",
    "description": "Calculate the GAMMA.DIST property for data analysis.",
    "concept": "the GAMMA.DIST analyzer"
  },
  "whyItExists": "Essential for GAMMA.DIST property evaluation.",
  "whenToUse": "Analyze GAMMA.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform GAMMA.DIST on monthly data.",
    "formula": "=GAMMA.DIST(B2:B50)"
  },
  "syntax": "=GAMMA.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "GAMMA.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select GAMMA.DIST.",
        "2. Calculate GAMMA.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "GAMMA.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GAMMA.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use GAMMA.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GAMMA.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "gamma.inv",
  "title": "GAMMA.INV Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "GAMMA.INV",
    "description": "Calculate the GAMMA.INV property for data analysis.",
    "concept": "the GAMMA.INV analyzer"
  },
  "whyItExists": "Essential for GAMMA.INV property evaluation.",
  "whenToUse": "Analyze GAMMA.INV in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform GAMMA.INV on monthly data.",
    "formula": "=GAMMA.INV(B2:B50)"
  },
  "syntax": "=GAMMA.INV(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "GAMMA.INV Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select GAMMA.INV.",
        "2. Calculate GAMMA.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "GAMMA.INV is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GAMMA.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use GAMMA.INV on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GAMMA.INV(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "gammaln",
  "title": "GAMMALN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "GAMMALN",
    "description": "Calculate the GAMMALN property for data analysis.",
    "concept": "the GAMMALN analyzer"
  },
  "whyItExists": "Essential for GAMMALN property evaluation.",
  "whenToUse": "Analyze GAMMALN in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform GAMMALN on monthly data.",
    "formula": "=GAMMALN(B2:B50)"
  },
  "syntax": "=GAMMALN(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "GAMMALN Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select GAMMALN.",
        "2. Calculate GAMMALN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "GAMMALN is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GAMMALN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use GAMMALN on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GAMMALN(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "gauss",
  "title": "GAUSS Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "GAUSS",
    "description": "Calculate the GAUSS property for data analysis.",
    "concept": "the GAUSS analyzer"
  },
  "whyItExists": "Essential for GAUSS property evaluation.",
  "whenToUse": "Analyze GAUSS in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform GAUSS on monthly data.",
    "formula": "=GAUSS(B2:B50)"
  },
  "syntax": "=GAUSS(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "GAUSS Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select GAUSS.",
        "2. Calculate GAUSS."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "GAUSS is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GAUSS?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use GAUSS on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GAUSS(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "geomean",
  "title": "GEOMEAN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "GEOMEAN",
    "description": "Calculate the GEOMEAN property for data analysis.",
    "concept": "the GEOMEAN analyzer"
  },
  "whyItExists": "Essential for GEOMEAN property evaluation.",
  "whenToUse": "Analyze GEOMEAN in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform GEOMEAN on monthly data.",
    "formula": "=GEOMEAN(B2:B50)"
  },
  "syntax": "=GEOMEAN(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "GEOMEAN Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select GEOMEAN.",
        "2. Calculate GEOMEAN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "GEOMEAN is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GEOMEAN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use GEOMEAN on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GEOMEAN(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "growth",
  "title": "GROWTH Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "GROWTH",
    "description": "Calculate the GROWTH property for data analysis.",
    "concept": "the GROWTH analyzer"
  },
  "whyItExists": "Essential for GROWTH property evaluation.",
  "whenToUse": "Analyze GROWTH in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform GROWTH on monthly data.",
    "formula": "=GROWTH(B2:B50)"
  },
  "syntax": "=GROWTH(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "GROWTH Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select GROWTH.",
        "2. Calculate GROWTH."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "GROWTH is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GROWTH?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use GROWTH on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GROWTH(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "harmean",
  "title": "HARMEAN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "HARMEAN",
    "description": "Calculate the HARMEAN property for data analysis.",
    "concept": "the HARMEAN analyzer"
  },
  "whyItExists": "Essential for HARMEAN property evaluation.",
  "whenToUse": "Analyze HARMEAN in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform HARMEAN on monthly data.",
    "formula": "=HARMEAN(B2:B50)"
  },
  "syntax": "=HARMEAN(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "HARMEAN Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select HARMEAN.",
        "2. Calculate HARMEAN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "HARMEAN is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use HARMEAN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use HARMEAN on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "HARMEAN(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "hypgeom.dist",
  "title": "HYPGEOM.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "HYPGEOM.DIST",
    "description": "Calculate the HYPGEOM.DIST property for data analysis.",
    "concept": "the HYPGEOM.DIST analyzer"
  },
  "whyItExists": "Essential for HYPGEOM.DIST property evaluation.",
  "whenToUse": "Analyze HYPGEOM.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform HYPGEOM.DIST on monthly data.",
    "formula": "=HYPGEOM.DIST(B2:B50)"
  },
  "syntax": "=HYPGEOM.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "HYPGEOM.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select HYPGEOM.DIST.",
        "2. Calculate HYPGEOM.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "HYPGEOM.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use HYPGEOM.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use HYPGEOM.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "HYPGEOM.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "intercept",
  "title": "INTERCEPT Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "INTERCEPT",
    "description": "Calculate the INTERCEPT property for data analysis.",
    "concept": "the INTERCEPT analyzer"
  },
  "whyItExists": "Essential for INTERCEPT property evaluation.",
  "whenToUse": "Analyze INTERCEPT in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform INTERCEPT on monthly data.",
    "formula": "=INTERCEPT(B2:B50)"
  },
  "syntax": "=INTERCEPT(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "INTERCEPT Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select INTERCEPT.",
        "2. Calculate INTERCEPT."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "INTERCEPT is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use INTERCEPT?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use INTERCEPT on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "INTERCEPT(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "kurt",
  "title": "KURT Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "KURT",
    "description": "Calculate the KURT property for data analysis.",
    "concept": "the KURT analyzer"
  },
  "whyItExists": "Essential for KURT property evaluation.",
  "whenToUse": "Analyze KURT in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform KURT on monthly data.",
    "formula": "=KURT(B2:B50)"
  },
  "syntax": "=KURT(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "KURT Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select KURT.",
        "2. Calculate KURT."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "KURT is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use KURT?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use KURT on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "KURT(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "large",
  "title": "LARGE Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "LARGE",
    "description": "Calculate the LARGE property for data analysis.",
    "concept": "the LARGE analyzer"
  },
  "whyItExists": "Essential for LARGE property evaluation.",
  "whenToUse": "Analyze LARGE in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform LARGE on monthly data.",
    "formula": "=LARGE(B2:B50)"
  },
  "syntax": "=LARGE(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "LARGE Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select LARGE.",
        "2. Calculate LARGE."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "LARGE is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LARGE?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use LARGE on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LARGE(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "linest",
  "title": "LINEST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "LINEST",
    "description": "Calculate the LINEST property for data analysis.",
    "concept": "the LINEST analyzer"
  },
  "whyItExists": "Essential for LINEST property evaluation.",
  "whenToUse": "Analyze LINEST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform LINEST on monthly data.",
    "formula": "=LINEST(B2:B50)"
  },
  "syntax": "=LINEST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "LINEST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select LINEST.",
        "2. Calculate LINEST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "LINEST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LINEST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use LINEST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LINEST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "logest",
  "title": "LOGEST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "LOGEST",
    "description": "Calculate the LOGEST property for data analysis.",
    "concept": "the LOGEST analyzer"
  },
  "whyItExists": "Essential for LOGEST property evaluation.",
  "whenToUse": "Analyze LOGEST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform LOGEST on monthly data.",
    "formula": "=LOGEST(B2:B50)"
  },
  "syntax": "=LOGEST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "LOGEST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select LOGEST.",
        "2. Calculate LOGEST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "LOGEST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LOGEST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use LOGEST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LOGEST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "lognorm.dist",
  "title": "LOGNORM.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "LOGNORM.DIST",
    "description": "Calculate the LOGNORM.DIST property for data analysis.",
    "concept": "the LOGNORM.DIST analyzer"
  },
  "whyItExists": "Essential for LOGNORM.DIST property evaluation.",
  "whenToUse": "Analyze LOGNORM.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform LOGNORM.DIST on monthly data.",
    "formula": "=LOGNORM.DIST(B2:B50)"
  },
  "syntax": "=LOGNORM.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "LOGNORM.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select LOGNORM.DIST.",
        "2. Calculate LOGNORM.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "LOGNORM.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LOGNORM.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use LOGNORM.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LOGNORM.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "lognorm.inv",
  "title": "LOGNORM.INV Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "LOGNORM.INV",
    "description": "Calculate the LOGNORM.INV property for data analysis.",
    "concept": "the LOGNORM.INV analyzer"
  },
  "whyItExists": "Essential for LOGNORM.INV property evaluation.",
  "whenToUse": "Analyze LOGNORM.INV in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform LOGNORM.INV on monthly data.",
    "formula": "=LOGNORM.INV(B2:B50)"
  },
  "syntax": "=LOGNORM.INV(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "LOGNORM.INV Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select LOGNORM.INV.",
        "2. Calculate LOGNORM.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "LOGNORM.INV is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LOGNORM.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use LOGNORM.INV on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LOGNORM.INV(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "max",
  "title": "MAX Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "MAX",
    "description": "Calculate the MAX property for data analysis.",
    "concept": "the MAX analyzer"
  },
  "whyItExists": "Essential for MAX property evaluation.",
  "whenToUse": "Analyze MAX in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform MAX on monthly data.",
    "formula": "=MAX(B2:B50)"
  },
  "syntax": "=MAX(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "MAX Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select MAX.",
        "2. Calculate MAX."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "MAX is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MAX?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use MAX on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MAX(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "maxa",
  "title": "MAXA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "MAXA",
    "description": "Calculate the MAXA property for data analysis.",
    "concept": "the MAXA analyzer"
  },
  "whyItExists": "Essential for MAXA property evaluation.",
  "whenToUse": "Analyze MAXA in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform MAXA on monthly data.",
    "formula": "=MAXA(B2:B50)"
  },
  "syntax": "=MAXA(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "MAXA Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select MAXA.",
        "2. Calculate MAXA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "MAXA is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MAXA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use MAXA on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MAXA(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "median",
  "title": "MEDIAN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "MEDIAN",
    "description": "Calculate the MEDIAN property for data analysis.",
    "concept": "the MEDIAN analyzer"
  },
  "whyItExists": "Essential for MEDIAN property evaluation.",
  "whenToUse": "Analyze MEDIAN in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform MEDIAN on monthly data.",
    "formula": "=MEDIAN(B2:B50)"
  },
  "syntax": "=MEDIAN(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "MEDIAN Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select MEDIAN.",
        "2. Calculate MEDIAN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "MEDIAN is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MEDIAN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use MEDIAN on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MEDIAN(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "min",
  "title": "MIN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "MIN",
    "description": "Calculate the MIN property for data analysis.",
    "concept": "the MIN analyzer"
  },
  "whyItExists": "Essential for MIN property evaluation.",
  "whenToUse": "Analyze MIN in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform MIN on monthly data.",
    "formula": "=MIN(B2:B50)"
  },
  "syntax": "=MIN(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "MIN Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select MIN.",
        "2. Calculate MIN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "MIN is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MIN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use MIN on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MIN(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "mina",
  "title": "MINA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "MINA",
    "description": "Calculate the MINA property for data analysis.",
    "concept": "the MINA analyzer"
  },
  "whyItExists": "Essential for MINA property evaluation.",
  "whenToUse": "Analyze MINA in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform MINA on monthly data.",
    "formula": "=MINA(B2:B50)"
  },
  "syntax": "=MINA(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "MINA Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select MINA.",
        "2. Calculate MINA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "MINA is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MINA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use MINA on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MINA(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "mode.mult",
  "title": "MODE.MULT Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "MODE.MULT",
    "description": "Calculate the MODE.MULT property for data analysis.",
    "concept": "the MODE.MULT analyzer"
  },
  "whyItExists": "Essential for MODE.MULT property evaluation.",
  "whenToUse": "Analyze MODE.MULT in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform MODE.MULT on monthly data.",
    "formula": "=MODE.MULT(B2:B50)"
  },
  "syntax": "=MODE.MULT(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "MODE.MULT Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select MODE.MULT.",
        "2. Calculate MODE.MULT."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "MODE.MULT is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MODE.MULT?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use MODE.MULT on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MODE.MULT(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "mode.sngl",
  "title": "MODE.SNGL Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "MODE.SNGL",
    "description": "Calculate the MODE.SNGL property for data analysis.",
    "concept": "the MODE.SNGL analyzer"
  },
  "whyItExists": "Essential for MODE.SNGL property evaluation.",
  "whenToUse": "Analyze MODE.SNGL in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform MODE.SNGL on monthly data.",
    "formula": "=MODE.SNGL(B2:B50)"
  },
  "syntax": "=MODE.SNGL(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "MODE.SNGL Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select MODE.SNGL.",
        "2. Calculate MODE.SNGL."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "MODE.SNGL is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MODE.SNGL?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use MODE.SNGL on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MODE.SNGL(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "negbinom.dist",
  "title": "NEGBINOM.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "NEGBINOM.DIST",
    "description": "Calculate the NEGBINOM.DIST property for data analysis.",
    "concept": "the NEGBINOM.DIST analyzer"
  },
  "whyItExists": "Essential for NEGBINOM.DIST property evaluation.",
  "whenToUse": "Analyze NEGBINOM.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform NEGBINOM.DIST on monthly data.",
    "formula": "=NEGBINOM.DIST(B2:B50)"
  },
  "syntax": "=NEGBINOM.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "NEGBINOM.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select NEGBINOM.DIST.",
        "2. Calculate NEGBINOM.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "NEGBINOM.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NEGBINOM.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use NEGBINOM.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NEGBINOM.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "norm.dist",
  "title": "NORM.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "NORM.DIST",
    "description": "Calculate the NORM.DIST property for data analysis.",
    "concept": "the NORM.DIST analyzer"
  },
  "whyItExists": "Essential for NORM.DIST property evaluation.",
  "whenToUse": "Analyze NORM.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform NORM.DIST on monthly data.",
    "formula": "=NORM.DIST(B2:B50)"
  },
  "syntax": "=NORM.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "NORM.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select NORM.DIST.",
        "2. Calculate NORM.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "NORM.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NORM.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use NORM.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NORM.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "norm.inv",
  "title": "NORM.INV Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "NORM.INV",
    "description": "Calculate the NORM.INV property for data analysis.",
    "concept": "the NORM.INV analyzer"
  },
  "whyItExists": "Essential for NORM.INV property evaluation.",
  "whenToUse": "Analyze NORM.INV in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform NORM.INV on monthly data.",
    "formula": "=NORM.INV(B2:B50)"
  },
  "syntax": "=NORM.INV(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "NORM.INV Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select NORM.INV.",
        "2. Calculate NORM.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "NORM.INV is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NORM.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use NORM.INV on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NORM.INV(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "norm.s.dist",
  "title": "NORM.S.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "NORM.S.DIST",
    "description": "Calculate the NORM.S.DIST property for data analysis.",
    "concept": "the NORM.S.DIST analyzer"
  },
  "whyItExists": "Essential for NORM.S.DIST property evaluation.",
  "whenToUse": "Analyze NORM.S.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform NORM.S.DIST on monthly data.",
    "formula": "=NORM.S.DIST(B2:B50)"
  },
  "syntax": "=NORM.S.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "NORM.S.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select NORM.S.DIST.",
        "2. Calculate NORM.S.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "NORM.S.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NORM.S.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use NORM.S.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NORM.S.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "norm.s.inv",
  "title": "NORM.S.INV Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "NORM.S.INV",
    "description": "Calculate the NORM.S.INV property for data analysis.",
    "concept": "the NORM.S.INV analyzer"
  },
  "whyItExists": "Essential for NORM.S.INV property evaluation.",
  "whenToUse": "Analyze NORM.S.INV in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform NORM.S.INV on monthly data.",
    "formula": "=NORM.S.INV(B2:B50)"
  },
  "syntax": "=NORM.S.INV(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "NORM.S.INV Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select NORM.S.INV.",
        "2. Calculate NORM.S.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "NORM.S.INV is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NORM.S.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use NORM.S.INV on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NORM.S.INV(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "pearson",
  "title": "PEARSON Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "PEARSON",
    "description": "Calculate the PEARSON property for data analysis.",
    "concept": "the PEARSON analyzer"
  },
  "whyItExists": "Essential for PEARSON property evaluation.",
  "whenToUse": "Analyze PEARSON in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform PEARSON on monthly data.",
    "formula": "=PEARSON(B2:B50)"
  },
  "syntax": "=PEARSON(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "PEARSON Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select PEARSON.",
        "2. Calculate PEARSON."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "PEARSON is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PEARSON?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use PEARSON on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PEARSON(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "percentile.exc",
  "title": "PERCENTILE.EXC Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "PERCENTILE.EXC",
    "description": "Calculate the PERCENTILE.EXC property for data analysis.",
    "concept": "the PERCENTILE.EXC analyzer"
  },
  "whyItExists": "Essential for PERCENTILE.EXC property evaluation.",
  "whenToUse": "Analyze PERCENTILE.EXC in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform PERCENTILE.EXC on monthly data.",
    "formula": "=PERCENTILE.EXC(B2:B50)"
  },
  "syntax": "=PERCENTILE.EXC(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "PERCENTILE.EXC Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select PERCENTILE.EXC.",
        "2. Calculate PERCENTILE.EXC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "PERCENTILE.EXC is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERCENTILE.EXC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use PERCENTILE.EXC on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTILE.EXC(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "percentile.inc",
  "title": "PERCENTILE.INC Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "PERCENTILE.INC",
    "description": "Calculate the PERCENTILE.INC property for data analysis.",
    "concept": "the PERCENTILE.INC analyzer"
  },
  "whyItExists": "Essential for PERCENTILE.INC property evaluation.",
  "whenToUse": "Analyze PERCENTILE.INC in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform PERCENTILE.INC on monthly data.",
    "formula": "=PERCENTILE.INC(B2:B50)"
  },
  "syntax": "=PERCENTILE.INC(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "PERCENTILE.INC Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select PERCENTILE.INC.",
        "2. Calculate PERCENTILE.INC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "PERCENTILE.INC is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERCENTILE.INC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use PERCENTILE.INC on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTILE.INC(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "percentrank.exc",
  "title": "PERCENTRANK.EXC Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "PERCENTRANK.EXC",
    "description": "Calculate the PERCENTRANK.EXC property for data analysis.",
    "concept": "the PERCENTRANK.EXC analyzer"
  },
  "whyItExists": "Essential for PERCENTRANK.EXC property evaluation.",
  "whenToUse": "Analyze PERCENTRANK.EXC in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform PERCENTRANK.EXC on monthly data.",
    "formula": "=PERCENTRANK.EXC(B2:B50)"
  },
  "syntax": "=PERCENTRANK.EXC(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "PERCENTRANK.EXC Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select PERCENTRANK.EXC.",
        "2. Calculate PERCENTRANK.EXC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "PERCENTRANK.EXC is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERCENTRANK.EXC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use PERCENTRANK.EXC on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTRANK.EXC(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "percentrank.inc",
  "title": "PERCENTRANK.INC Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "PERCENTRANK.INC",
    "description": "Calculate the PERCENTRANK.INC property for data analysis.",
    "concept": "the PERCENTRANK.INC analyzer"
  },
  "whyItExists": "Essential for PERCENTRANK.INC property evaluation.",
  "whenToUse": "Analyze PERCENTRANK.INC in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform PERCENTRANK.INC on monthly data.",
    "formula": "=PERCENTRANK.INC(B2:B50)"
  },
  "syntax": "=PERCENTRANK.INC(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "PERCENTRANK.INC Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select PERCENTRANK.INC.",
        "2. Calculate PERCENTRANK.INC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "PERCENTRANK.INC is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERCENTRANK.INC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use PERCENTRANK.INC on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTRANK.INC(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "permut",
  "title": "PERMUT Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "PERMUT",
    "description": "Calculate the PERMUT property for data analysis.",
    "concept": "the PERMUT analyzer"
  },
  "whyItExists": "Essential for PERMUT property evaluation.",
  "whenToUse": "Analyze PERMUT in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform PERMUT on monthly data.",
    "formula": "=PERMUT(B2:B50)"
  },
  "syntax": "=PERMUT(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "PERMUT Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select PERMUT.",
        "2. Calculate PERMUT."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "PERMUT is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERMUT?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use PERMUT on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERMUT(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "permutationa",
  "title": "PERMUTATIONA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "PERMUTATIONA",
    "description": "Calculate the PERMUTATIONA property for data analysis.",
    "concept": "the PERMUTATIONA analyzer"
  },
  "whyItExists": "Essential for PERMUTATIONA property evaluation.",
  "whenToUse": "Analyze PERMUTATIONA in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform PERMUTATIONA on monthly data.",
    "formula": "=PERMUTATIONA(B2:B50)"
  },
  "syntax": "=PERMUTATIONA(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "PERMUTATIONA Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select PERMUTATIONA.",
        "2. Calculate PERMUTATIONA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "PERMUTATIONA is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERMUTATIONA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use PERMUTATIONA on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERMUTATIONA(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "phi",
  "title": "PHI Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "PHI",
    "description": "Calculate the PHI property for data analysis.",
    "concept": "the PHI analyzer"
  },
  "whyItExists": "Essential for PHI property evaluation.",
  "whenToUse": "Analyze PHI in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform PHI on monthly data.",
    "formula": "=PHI(B2:B50)"
  },
  "syntax": "=PHI(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "PHI Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select PHI.",
        "2. Calculate PHI."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "PHI is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PHI?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use PHI on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PHI(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "poisson.dist",
  "title": "POISSON.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "POISSON.DIST",
    "description": "Calculate the POISSON.DIST property for data analysis.",
    "concept": "the POISSON.DIST analyzer"
  },
  "whyItExists": "Essential for POISSON.DIST property evaluation.",
  "whenToUse": "Analyze POISSON.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform POISSON.DIST on monthly data.",
    "formula": "=POISSON.DIST(B2:B50)"
  },
  "syntax": "=POISSON.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "POISSON.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select POISSON.DIST.",
        "2. Calculate POISSON.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "POISSON.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use POISSON.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use POISSON.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "POISSON.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "prob",
  "title": "PROB Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "PROB",
    "description": "Calculate the PROB property for data analysis.",
    "concept": "the PROB analyzer"
  },
  "whyItExists": "Essential for PROB property evaluation.",
  "whenToUse": "Analyze PROB in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform PROB on monthly data.",
    "formula": "=PROB(B2:B50)"
  },
  "syntax": "=PROB(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "PROB Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select PROB.",
        "2. Calculate PROB."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "PROB is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PROB?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use PROB on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PROB(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "quartile.exc",
  "title": "QUARTILE.EXC Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "QUARTILE.EXC",
    "description": "Calculate the QUARTILE.EXC property for data analysis.",
    "concept": "the QUARTILE.EXC analyzer"
  },
  "whyItExists": "Essential for QUARTILE.EXC property evaluation.",
  "whenToUse": "Analyze QUARTILE.EXC in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform QUARTILE.EXC on monthly data.",
    "formula": "=QUARTILE.EXC(B2:B50)"
  },
  "syntax": "=QUARTILE.EXC(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "QUARTILE.EXC Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select QUARTILE.EXC.",
        "2. Calculate QUARTILE.EXC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "QUARTILE.EXC is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use QUARTILE.EXC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use QUARTILE.EXC on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "QUARTILE.EXC(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "quartile.inc",
  "title": "QUARTILE.INC Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "QUARTILE.INC",
    "description": "Calculate the QUARTILE.INC property for data analysis.",
    "concept": "the QUARTILE.INC analyzer"
  },
  "whyItExists": "Essential for QUARTILE.INC property evaluation.",
  "whenToUse": "Analyze QUARTILE.INC in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform QUARTILE.INC on monthly data.",
    "formula": "=QUARTILE.INC(B2:B50)"
  },
  "syntax": "=QUARTILE.INC(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "QUARTILE.INC Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select QUARTILE.INC.",
        "2. Calculate QUARTILE.INC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "QUARTILE.INC is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use QUARTILE.INC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use QUARTILE.INC on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "QUARTILE.INC(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "rank.avg",
  "title": "RANK.AVG Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "RANK.AVG",
    "description": "Calculate the RANK.AVG property for data analysis.",
    "concept": "the RANK.AVG analyzer"
  },
  "whyItExists": "Essential for RANK.AVG property evaluation.",
  "whenToUse": "Analyze RANK.AVG in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform RANK.AVG on monthly data.",
    "formula": "=RANK.AVG(B2:B50)"
  },
  "syntax": "=RANK.AVG(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "RANK.AVG Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select RANK.AVG.",
        "2. Calculate RANK.AVG."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "RANK.AVG is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use RANK.AVG?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use RANK.AVG on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "RANK.AVG(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "rank.eq",
  "title": "RANK.EQ Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "RANK.EQ",
    "description": "Calculate the RANK.EQ property for data analysis.",
    "concept": "the RANK.EQ analyzer"
  },
  "whyItExists": "Essential for RANK.EQ property evaluation.",
  "whenToUse": "Analyze RANK.EQ in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform RANK.EQ on monthly data.",
    "formula": "=RANK.EQ(B2:B50)"
  },
  "syntax": "=RANK.EQ(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "RANK.EQ Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select RANK.EQ.",
        "2. Calculate RANK.EQ."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "RANK.EQ is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use RANK.EQ?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use RANK.EQ on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "RANK.EQ(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "rsq",
  "title": "RSQ Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "RSQ",
    "description": "Calculate the RSQ property for data analysis.",
    "concept": "the RSQ analyzer"
  },
  "whyItExists": "Essential for RSQ property evaluation.",
  "whenToUse": "Analyze RSQ in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform RSQ on monthly data.",
    "formula": "=RSQ(B2:B50)"
  },
  "syntax": "=RSQ(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "RSQ Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select RSQ.",
        "2. Calculate RSQ."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "RSQ is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use RSQ?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use RSQ on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "RSQ(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "skew",
  "title": "SKEW Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "SKEW",
    "description": "Calculate the SKEW property for data analysis.",
    "concept": "tail lean checker"
  },
  "whyItExists": "Essential for SKEW property evaluation.",
  "whenToUse": "Analyze SKEW in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform SKEW on monthly data.",
    "formula": "=SKEW(B2:B50)"
  },
  "syntax": "=SKEW(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "SKEW Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select SKEW.",
        "2. Calculate SKEW."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "SKEW is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use SKEW?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use SKEW on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "SKEW(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "skew.p",
  "title": "SKEW.P Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "SKEW.P",
    "description": "Calculate the SKEW.P property for data analysis.",
    "concept": "the SKEW.P analyzer"
  },
  "whyItExists": "Essential for SKEW.P property evaluation.",
  "whenToUse": "Analyze SKEW.P in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform SKEW.P on monthly data.",
    "formula": "=SKEW.P(B2:B50)"
  },
  "syntax": "=SKEW.P(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "SKEW.P Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select SKEW.P.",
        "2. Calculate SKEW.P."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "SKEW.P is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use SKEW.P?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use SKEW.P on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "SKEW.P(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "slope",
  "title": "SLOPE Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "SLOPE",
    "description": "Calculate the SLOPE property for data analysis.",
    "concept": "the SLOPE analyzer"
  },
  "whyItExists": "Essential for SLOPE property evaluation.",
  "whenToUse": "Analyze SLOPE in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform SLOPE on monthly data.",
    "formula": "=SLOPE(B2:B50)"
  },
  "syntax": "=SLOPE(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "SLOPE Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select SLOPE.",
        "2. Calculate SLOPE."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "SLOPE is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use SLOPE?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use SLOPE on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "SLOPE(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "small",
  "title": "SMALL Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "SMALL",
    "description": "Calculate the SMALL property for data analysis.",
    "concept": "the SMALL analyzer"
  },
  "whyItExists": "Essential for SMALL property evaluation.",
  "whenToUse": "Analyze SMALL in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform SMALL on monthly data.",
    "formula": "=SMALL(B2:B50)"
  },
  "syntax": "=SMALL(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "SMALL Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select SMALL.",
        "2. Calculate SMALL."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "SMALL is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use SMALL?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use SMALL on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "SMALL(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "standardize",
  "title": "STANDARDIZE Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "STANDARDIZE",
    "description": "Calculate the STANDARDIZE property for data analysis.",
    "concept": "the STANDARDIZE analyzer"
  },
  "whyItExists": "Essential for STANDARDIZE property evaluation.",
  "whenToUse": "Analyze STANDARDIZE in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform STANDARDIZE on monthly data.",
    "formula": "=STANDARDIZE(B2:B50)"
  },
  "syntax": "=STANDARDIZE(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "STANDARDIZE Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select STANDARDIZE.",
        "2. Calculate STANDARDIZE."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "STANDARDIZE is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STANDARDIZE?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use STANDARDIZE on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STANDARDIZE(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "stdev.p",
  "title": "STDEV.P Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "STDEV.P",
    "description": "Calculate the STDEV.P property for data analysis.",
    "concept": "the STDEV.P analyzer"
  },
  "whyItExists": "Essential for STDEV.P property evaluation.",
  "whenToUse": "Analyze STDEV.P in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform STDEV.P on monthly data.",
    "formula": "=STDEV.P(B2:B50)"
  },
  "syntax": "=STDEV.P(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "STDEV.P Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select STDEV.P.",
        "2. Calculate STDEV.P."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "STDEV.P is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STDEV.P?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use STDEV.P on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEV.P(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "stdev.s",
  "title": "STDEV.S Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "STDEV.S",
    "description": "Calculate the STDEV.S property for data analysis.",
    "concept": "the STDEV.S analyzer"
  },
  "whyItExists": "Essential for STDEV.S property evaluation.",
  "whenToUse": "Analyze STDEV.S in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform STDEV.S on monthly data.",
    "formula": "=STDEV.S(B2:B50)"
  },
  "syntax": "=STDEV.S(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "STDEV.S Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select STDEV.S.",
        "2. Calculate STDEV.S."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "STDEV.S is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STDEV.S?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use STDEV.S on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEV.S(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "stdeva",
  "title": "STDEVA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "STDEVA",
    "description": "Calculate the STDEVA property for data analysis.",
    "concept": "the STDEVA analyzer"
  },
  "whyItExists": "Essential for STDEVA property evaluation.",
  "whenToUse": "Analyze STDEVA in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform STDEVA on monthly data.",
    "formula": "=STDEVA(B2:B50)"
  },
  "syntax": "=STDEVA(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "STDEVA Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select STDEVA.",
        "2. Calculate STDEVA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "STDEVA is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STDEVA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use STDEVA on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEVA(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "stdevpa",
  "title": "STDEVPA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "STDEVPA",
    "description": "Calculate the STDEVPA property for data analysis.",
    "concept": "the STDEVPA analyzer"
  },
  "whyItExists": "Essential for STDEVPA property evaluation.",
  "whenToUse": "Analyze STDEVPA in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform STDEVPA on monthly data.",
    "formula": "=STDEVPA(B2:B50)"
  },
  "syntax": "=STDEVPA(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "STDEVPA Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select STDEVPA.",
        "2. Calculate STDEVPA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "STDEVPA is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STDEVPA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use STDEVPA on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEVPA(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "steyx",
  "title": "STEYX Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "STEYX",
    "description": "Calculate the STEYX property for data analysis.",
    "concept": "the STEYX analyzer"
  },
  "whyItExists": "Essential for STEYX property evaluation.",
  "whenToUse": "Analyze STEYX in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform STEYX on monthly data.",
    "formula": "=STEYX(B2:B50)"
  },
  "syntax": "=STEYX(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "STEYX Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select STEYX.",
        "2. Calculate STEYX."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "STEYX is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STEYX?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use STEYX on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STEYX(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "t.dist",
  "title": "T.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "T.DIST",
    "description": "Calculate the T.DIST property for data analysis.",
    "concept": "the T.DIST analyzer"
  },
  "whyItExists": "Essential for T.DIST property evaluation.",
  "whenToUse": "Analyze T.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform T.DIST on monthly data.",
    "formula": "=T.DIST(B2:B50)"
  },
  "syntax": "=T.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "T.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select T.DIST.",
        "2. Calculate T.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "T.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use T.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use T.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "T.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "t.inv",
  "title": "T.INV Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "T.INV",
    "description": "Calculate the T.INV property for data analysis.",
    "concept": "the T.INV analyzer"
  },
  "whyItExists": "Essential for T.INV property evaluation.",
  "whenToUse": "Analyze T.INV in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform T.INV on monthly data.",
    "formula": "=T.INV(B2:B50)"
  },
  "syntax": "=T.INV(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "T.INV Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select T.INV.",
        "2. Calculate T.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "T.INV is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use T.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use T.INV on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "T.INV(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "t.test",
  "title": "T.TEST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "T.TEST",
    "description": "Calculate the T.TEST property for data analysis.",
    "concept": "the T.TEST analyzer"
  },
  "whyItExists": "Essential for T.TEST property evaluation.",
  "whenToUse": "Analyze T.TEST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform T.TEST on monthly data.",
    "formula": "=T.TEST(B2:B50)"
  },
  "syntax": "=T.TEST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "T.TEST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select T.TEST.",
        "2. Calculate T.TEST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "T.TEST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use T.TEST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use T.TEST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "T.TEST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "trend",
  "title": "TREND Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "TREND",
    "description": "Calculate the TREND property for data analysis.",
    "concept": "the TREND analyzer"
  },
  "whyItExists": "Essential for TREND property evaluation.",
  "whenToUse": "Analyze TREND in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform TREND on monthly data.",
    "formula": "=TREND(B2:B50)"
  },
  "syntax": "=TREND(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "TREND Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select TREND.",
        "2. Calculate TREND."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "TREND is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use TREND?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use TREND on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "TREND(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "trimmean",
  "title": "TRIMMEAN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "TRIMMEAN",
    "description": "Calculate the TRIMMEAN property for data analysis.",
    "concept": "the TRIMMEAN analyzer"
  },
  "whyItExists": "Essential for TRIMMEAN property evaluation.",
  "whenToUse": "Analyze TRIMMEAN in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform TRIMMEAN on monthly data.",
    "formula": "=TRIMMEAN(B2:B50)"
  },
  "syntax": "=TRIMMEAN(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "TRIMMEAN Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select TRIMMEAN.",
        "2. Calculate TRIMMEAN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "TRIMMEAN is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use TRIMMEAN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use TRIMMEAN on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "TRIMMEAN(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "var.p",
  "title": "VAR.P Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "VAR.P",
    "description": "Calculate the VAR.P property for data analysis.",
    "concept": "the VAR.P analyzer"
  },
  "whyItExists": "Essential for VAR.P property evaluation.",
  "whenToUse": "Analyze VAR.P in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform VAR.P on monthly data.",
    "formula": "=VAR.P(B2:B50)"
  },
  "syntax": "=VAR.P(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "VAR.P Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select VAR.P.",
        "2. Calculate VAR.P."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "VAR.P is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use VAR.P?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use VAR.P on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VAR.P(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "var.s",
  "title": "VAR.S Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "VAR.S",
    "description": "Calculate the VAR.S property for data analysis.",
    "concept": "the VAR.S analyzer"
  },
  "whyItExists": "Essential for VAR.S property evaluation.",
  "whenToUse": "Analyze VAR.S in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform VAR.S on monthly data.",
    "formula": "=VAR.S(B2:B50)"
  },
  "syntax": "=VAR.S(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "VAR.S Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select VAR.S.",
        "2. Calculate VAR.S."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "VAR.S is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use VAR.S?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use VAR.S on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VAR.S(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "vara",
  "title": "VARA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "VARA",
    "description": "Calculate the VARA property for data analysis.",
    "concept": "the VARA analyzer"
  },
  "whyItExists": "Essential for VARA property evaluation.",
  "whenToUse": "Analyze VARA in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform VARA on monthly data.",
    "formula": "=VARA(B2:B50)"
  },
  "syntax": "=VARA(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "VARA Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select VARA.",
        "2. Calculate VARA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "VARA is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use VARA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use VARA on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VARA(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "varpa",
  "title": "VARPA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "VARPA",
    "description": "Calculate the VARPA property for data analysis.",
    "concept": "the VARPA analyzer"
  },
  "whyItExists": "Essential for VARPA property evaluation.",
  "whenToUse": "Analyze VARPA in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform VARPA on monthly data.",
    "formula": "=VARPA(B2:B50)"
  },
  "syntax": "=VARPA(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "VARPA Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select VARPA.",
        "2. Calculate VARPA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "VARPA is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use VARPA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use VARPA on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VARPA(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "weibull.dist",
  "title": "WEIBULL.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "WEIBULL.DIST",
    "description": "Calculate the WEIBULL.DIST property for data analysis.",
    "concept": "the WEIBULL.DIST analyzer"
  },
  "whyItExists": "Essential for WEIBULL.DIST property evaluation.",
  "whenToUse": "Analyze WEIBULL.DIST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform WEIBULL.DIST on monthly data.",
    "formula": "=WEIBULL.DIST(B2:B50)"
  },
  "syntax": "=WEIBULL.DIST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "WEIBULL.DIST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select WEIBULL.DIST.",
        "2. Calculate WEIBULL.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "WEIBULL.DIST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use WEIBULL.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use WEIBULL.DIST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "WEIBULL.DIST(B2:B3)",
    "expectedValue": 150
  }
},
{
  "id": "z.test",
  "title": "Z.TEST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Z.TEST",
    "description": "Calculate the Z.TEST property for data analysis.",
    "concept": "shift checker"
  },
  "whyItExists": "Essential for Z.TEST property evaluation.",
  "whenToUse": "Analyze Z.TEST in datasets.",
  "realWorldUseCases": [
    "Business data modeling."
  ],
  "businessExample": {
    "scenario": "Perform Z.TEST on monthly data.",
    "formula": "=Z.TEST(B2:B50)"
  },
  "syntax": "=Z.TEST(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Numerical data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Z.TEST Analysis",
      "table": {
        "headers": [
          "Value"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "200"
          ]
        ]
      },
      "stepByStep": [
        "1. Select Z.TEST.",
        "2. Calculate Z.TEST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "Z.TEST is highly accurate."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use Z.TEST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Use Z.TEST on B2:B3.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ],
      [
        "R",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "Z.TEST(B2:B3)",
    "expectedValue": 150
  }
}
];