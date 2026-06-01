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
  "id": "avedev",
  "title": "AVEDEV Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Average Absolute Deviation",
    "description": "Calculates the average of the absolute deviations of data points from their mean.",
    "concept": "Think of it as the dispersion measurer: \"On average, how far does each value stray from the mean?\""
  },
  "whyItExists": "It provides a more intuitive measure of variability than standard deviation for some users because it doesn't square the distances.",
  "whenToUse": "Use to measure consistency in a dataset where you want to understand the average distance from the center.",
  "realWorldUseCases": [
    "Measuring production consistency.",
    "Evaluating grade spread."
  ],
  "businessExample": {
    "scenario": "A manager wants to see how much box weights deviate from a 500g target.",
    "formula": "=AVEDEV(B2:B20)"
  },
  "syntax": "=AVEDEV(number1, [number2], ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "First number/range."
    },
    {
      "arg": "number2",
      "desc": "Optional additional data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Consistency Check",
      "table": {
        "headers": [
          "Val"
        ],
        "rows": [
          [
            "100"
          ],
          [
            "120"
          ],
          [
            "110"
          ]
        ]
      },
      "stepByStep": [
        "Mean=110.",
        "Deviations: 10, 10, 0.",
        "Average=6.67."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Absolute Values",
      "desc": "Negative and positive deviations don't cancel out."
    }
  ],
  "proTips": [
    "Less sensitive to outliers than STDEV."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "If all numbers are identical, what is the AVEDEV?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Calculate AVEDEV for B2:B4.",
    "initialData": [
      [
        "Units"
      ],
      [
        100
      ],
      [
        120
      ],
      [
        110
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "AVEDEV(B2:B4)",
    "expectedValue": 6.67
  }
},
{
  "id": "average",
  "title": "AVERAGE Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Arithmetic Mean",
    "description": "Calculates the arithmetic mean \u2014 the sum of values divided by the count.",
    "concept": "Think of it as the balancing point: \"If you redistributed all values equally, what would each be?\""
  },
  "whyItExists": "Primary way to identify the 'typical' value in a dataset.",
  "whenToUse": "Use for a single representative value, like average sales.",
  "realWorldUseCases": [
    "Monthly expenses.",
    "Exam averages."
  ],
  "businessExample": {
    "scenario": "Calculate average daily revenue.",
    "formula": "=AVERAGE(B2:B32)"
  },
  "syntax": "=AVERAGE(number1, [number2], ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "First numeric range."
    },
    {
      "arg": "number2",
      "desc": "Additional ranges."
    }
  ],
  "detailedExamples": [
    {
      "title": "Daily Sales",
      "table": {
        "headers": [
          "Sales"
        ],
        "rows": [
          [
            "12000"
          ],
          [
            "15000"
          ]
        ]
      },
      "stepByStep": [
        "Sum: 27000.",
        "Divide by 2: 13500."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Zeros vs Blanks",
      "desc": "AVERAGE counts 0s but ignores empty cells."
    }
  ],
  "proTips": [
    "Use AVERAGEA to include text."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Average of 10, 20, 30?",
    "expectedAnswer": "20"
  },
  "practice": {
    "instructions": "Find average sales for Jan-Feb (B2:B3).",
    "initialData": [
      [
        "Mo",
        "Sales"
      ],
      [
        "Jan",
        12000
      ],
      [
        "Feb",
        15000
      ],
      [
        "Avg",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "AVERAGE(B2:B3)",
    "expectedValue": 13500
  }
},
{
  "id": "averagea",
  "title": "AVERAGEA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Inclusive Average",
    "description": "Calculates average including text and logical values (TRUE=1, FALSE=0).",
    "concept": "Think of it as the comprehensive mean: \"Count every cell, even if it contains text or TRUE.\""
  },
  "whyItExists": "Ensures non-numeric responses (like 'N/A') are treated as zero instead of ignored.",
  "whenToUse": "When 'None' or 'FALSE' should count as 0 in the average.",
  "realWorldUseCases": [
    "Survey results.",
    "Attendance where 'Absent' counts as 0."
  ],
  "businessExample": {
    "scenario": "Treat 'No Rating' as 0 in team performance average.",
    "formula": "=AVERAGEA(C2:C20)"
  },
  "syntax": "=AVERAGEA(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Values or ranges to average."
    }
  ],
  "detailedExamples": [
    {
      "title": "Mixed Data",
      "table": {
        "headers": [
          "Val"
        ],
        "rows": [
          [
            "8"
          ],
          [
            "N/A"
          ]
        ]
      },
      "stepByStep": [
        "'N/A' treated as 0.",
        "Sum: 8.",
        "Count: 2. Result: 4."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Inflated Count",
      "desc": "Lowers average because it includes text cells in denominator."
    }
  ],
  "proTips": [
    "TRUE = 1, FALSE = 0."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Value assigned to TRUE?",
    "expectedAnswer": "1"
  },
  "practice": {
    "instructions": "Average ratings in B2:B3.",
    "initialData": [
      [
        "R"
      ],
      [
        8
      ],
      [
        "N/A"
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "AVERAGEA(B2:B3)",
    "expectedValue": 4
  }
},
{
  "id": "averageif",
  "title": "AVERAGEIF Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Conditional Average",
    "description": "Average of cells meeting a single criteria.",
    "concept": "Think of it as the filtered average: \"What is average sales for ONLY the 'North' region?\""
  },
  "whyItExists": "Segment analysis without manual filtering.",
  "whenToUse": "Find mean of a specific subset based on one rule.",
  "realWorldUseCases": [
    "Salary by dept.",
    "Average order value over $50."
  ],
  "businessExample": {
    "scenario": "Find average sales for 'North' region.",
    "formula": "=AVERAGEIF(A2:A10, \"North\", B2:B10)"
  },
  "syntax": "=AVERAGEIF(range, criteria, [average_range])",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Range to check criteria against."
    },
    {
      "arg": "criteria",
      "desc": "The condition (e.g., '>100')."
    }
  ],
  "detailedExamples": [
    {
      "title": "Regional Sales",
      "table": {
        "headers": [
          "Reg",
          "Sales"
        ],
        "rows": [
          [
            "North",
            "500"
          ],
          [
            "South",
            "300"
          ],
          [
            "North",
            "700"
          ]
        ]
      },
      "stepByStep": [
        "Matches: 500, 700.",
        "Sum: 1200. Count: 2. Result: 600."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Range Mismatch",
      "desc": "range and average_range must be same size."
    }
  ],
  "proTips": [
    "Wildcards supported."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Wildcard for any characters?",
    "expectedAnswer": "*"
  },
  "practice": {
    "instructions": "Average North sales.",
    "initialData": [
      [
        "R",
        "S"
      ],
      [
        "North",
        500
      ],
      [
        "South",
        300
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "AVERAGEIF(A2:A3,\"North\",B2:B3)",
    "expectedValue": 500
  }
},
{
  "id": "averageifs",
  "title": "AVERAGEIFS Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Multi-Criteria Average",
    "description": "Average of cells meeting multiple criteria.",
    "concept": "Think of it as the multi-filter average: \"Average sales for North in Q1?\""
  },
  "whyItExists": "Handles complex data analysis across several variables.",
  "whenToUse": "Deep-dive reporting with multiple conditions.",
  "realWorldUseCases": [
    "Senior rep commission.",
    "3rd floor rental prices."
  ],
  "businessExample": {
    "scenario": "Average North sales in Q1.",
    "formula": "=AVERAGEIFS(C2:C100, A2:A100, \"North\", B2:B100, \"Q1\")"
  },
  "syntax": "=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "average_range",
      "desc": "Cells to average (must be first)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Granular Sales",
      "table": {
        "headers": [
          "R",
          "Q",
          "S"
        ],
        "rows": [
          [
            "North",
            "Q1",
            "500"
          ]
        ]
      },
      "stepByStep": [
        "Filter: North + Q1.",
        "Result: 500."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Arg Order",
      "desc": "average_range is FIRST."
    }
  ],
  "proTips": [
    "Uses AND logic."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Which range is first?",
    "expectedAnswer": "average_range"
  },
  "practice": {
    "instructions": "North Q1 average.",
    "initialData": [
      [
        "R",
        "Q",
        "S"
      ],
      [
        "North",
        "Q1",
        500
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      2,
      1
    ],
    "expectedFormula": "AVERAGEIFS(C2:C2,A2:A2,\"North\",B2:B2,\"Q1\")",
    "expectedValue": 500
  }
},
{
  "id": "beta.dist",
  "title": "BETA.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Beta Probability",
    "description": "Returns cumulative beta distribution or probability density.",
    "concept": "Think of it as the likelihood tracker: \"Probability task completion is in a range?\""
  },
  "whyItExists": "Used in PERT to model variability of task durations.",
  "whenToUse": "Modeling bounded variables (0 to 1).",
  "realWorldUseCases": [
    "Project finishing on time.",
    "Market share likelihood."
  ],
  "businessExample": {
    "scenario": "Probability task is 50% complete (alpha=2, beta=5).",
    "formula": "=BETA.DIST(0.5, 2, 5, TRUE)"
  },
  "syntax": "=BETA.DIST(x, alpha, beta, cumulative, [A], [B])",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "Value to evaluate."
    },
    {
      "arg": "cumulative",
      "desc": "TRUE for area, FALSE for point."
    }
  ],
  "detailedExamples": [
    {
      "title": "Completion",
      "table": {
        "headers": [
          "X"
        ],
        "rows": [
          [
            "0.5"
          ]
        ]
      },
      "stepByStep": [
        "x=0.5, a=2, b=5.",
        "Result: 0.8906."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Bounds",
      "desc": "X must be between A and B."
    }
  ],
  "proTips": [
    "Defaults to 0 and 1."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Default lower bound?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Cumulative Beta for x=0.5, a=2, b=5.",
    "initialData": [
      [
        "X"
      ],
      [
        0.5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "BETA.DIST(0.5,2,5,TRUE)",
    "expectedValue": 0.8906
  }
},
{
  "id": "beta.inv",
  "title": "BETA.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse Beta",
    "description": "Value of x for a given probability in beta distribution.",
    "concept": "Think of it as the inverse solver: \"What completion % corresponds to 90% probability?\""
  },
  "whyItExists": "Allows finding thresholds for beta-distributed variables.",
  "whenToUse": "Finding value corresponding to confidence level.",
  "realWorldUseCases": [
    "Market share thresholds.",
    "Task completion targets."
  ],
  "businessExample": {
    "scenario": "Find 95th percentile for project completion.",
    "formula": "=BETA.INV(0.95, 2, 5)"
  },
  "syntax": "=BETA.INV(probability, alpha, beta, [A], [B])",
  "syntaxBreakdown": [
    {
      "arg": "probability",
      "desc": "Target probability (0-1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Threshold",
      "table": {
        "headers": [
          "P"
        ],
        "rows": [
          [
            "0.95"
          ]
        ]
      },
      "stepByStep": [
        "p=0.95.",
        "Result: 0.5822."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Prob Range",
      "desc": "Must be 0 to 1."
    }
  ],
  "proTips": [
    "Inverse of BETA.DIST."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Returns prob or x?",
    "expectedAnswer": "Value of X"
  },
  "practice": {
    "instructions": "95% X value (a=2, b=5).",
    "initialData": [
      [
        "P"
      ],
      [
        0.95
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "BETA.INV(0.95,2,5)",
    "expectedValue": 0.5822
  }
},
{
  "id": "binom.dist",
  "title": "BINOM.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Binomial Probability",
    "description": "Probability of exactly K successes in N trials.",
    "concept": "Think of it as the success tracker: \"Prob of 5 heads in 10 flips?\""
  },
  "whyItExists": "Analyzes processes with only two outcomes (Pass/Fail).",
  "whenToUse": "Binary outcomes modeling.",
  "realWorldUseCases": [
    "Defect counts.",
    "Conversion rates."
  ],
  "businessExample": {
    "scenario": "Prob of 2 defects in 100 items (1% rate).",
    "formula": "=BINOM.DIST(2, 100, 0.01, FALSE)"
  },
  "syntax": "=BINOM.DIST(number_s, trials, probability_s, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "number_s",
      "desc": "Successes."
    },
    {
      "arg": "trials",
      "desc": "Total flips."
    }
  ],
  "detailedExamples": [
    {
      "title": "QC",
      "table": {
        "headers": [
          "S"
        ],
        "rows": [
          [
            "2"
          ]
        ]
      },
      "stepByStep": [
        "N=100, K=2, P=0.01.",
        "Individual term (FALSE).",
        "Result: 0.1849."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Cumulative",
      "desc": "TRUE for 'at most', FALSE for 'exactly'."
    }
  ],
  "proTips": [
    "Trials must be independent."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Cumulative for 'at most 3'?",
    "expectedAnswer": "TRUE"
  },
  "practice": {
    "instructions": "Prob of 2 success (N=100, P=0.01).",
    "initialData": [
      [
        "S"
      ],
      [
        2
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "BINOM.DIST(2,100,0.01,FALSE)",
    "expectedValue": 0.1849
  }
},
{
  "id": "binom.inv",
  "title": "BINOM.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse Binomial",
    "description": "Smallest value where cumulative binomial >= criterion.",
    "concept": "Think of it as the success targeter: \"How much stock for 95% certainty?\""
  },
  "whyItExists": "Determines successes needed for specific confidence.",
  "whenToUse": "Risk and inventory planning.",
  "realWorldUseCases": [
    "Min stock levels.",
    "Pass result thresholds."
  ],
  "businessExample": {
    "scenario": "Min stock for 90% service level.",
    "formula": "=BINOM.INV(10, 0.5, 0.9)"
  },
  "syntax": "=BINOM.INV(trials, probability_s, alpha)",
  "syntaxBreakdown": [
    {
      "arg": "alpha",
      "desc": "Criterion (0-1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Inventory",
      "table": {
        "headers": [
          "A"
        ],
        "rows": [
          [
            "0.9"
          ]
        ]
      },
      "stepByStep": [
        "Find smallest X where CumProb >= 0.9.",
        "Result: 7."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Alpha",
      "desc": "Must be 0-1."
    }
  ],
  "proTips": [
    "Always returns an integer."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Returns integer?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Min X for 0.9 alpha (N=10, P=0.5).",
    "initialData": [
      [
        "A"
      ],
      [
        0.9
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "BINOM.INV(10,0.5,0.9)",
    "expectedValue": 7
  }
},
{
  "id": "chisq.dist",
  "title": "CHISQ.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Chi-Square Distribution",
    "description": "Left-tailed probability of Chi-square.",
    "concept": "Think of it as the goodness-of-fit: \"Does data match expectations?\""
  },
  "whyItExists": "Used in hypothesis testing for variances.",
  "whenToUse": "Finding probability of a Chi-square result.",
  "realWorldUseCases": [
    "Fair die test.",
    "Link between gender and choice."
  ],
  "businessExample": {
    "scenario": "Check if error frequency matches model.",
    "formula": "=CHISQ.DIST(18.3, 10, TRUE)"
  },
  "syntax": "=CHISQ.DIST(x, deg_freedom, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "deg_freedom",
      "desc": "Degrees of freedom (n-1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Variance",
      "table": {
        "headers": [
          "X"
        ],
        "rows": [
          [
            "18.3"
          ]
        ]
      },
      "stepByStep": [
        "X=18.3, DF=10.",
        "Result: 0.9500."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Negative X",
      "desc": "Must be >= 0."
    }
  ],
  "proTips": [
    "DF must be integer."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Can X be negative?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Cumul Chi-sq for X=18.3, DF=10.",
    "initialData": [
      [
        "X"
      ],
      [
        18.3
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "CHISQ.DIST(18.3,10,TRUE)",
    "expectedValue": 0.95
  }
},
{
  "id": "chisq.inv",
  "title": "CHISQ.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse Chi-Square",
    "description": "Inverse of left-tailed Chi-square.",
    "concept": "Think of it as the cutoff finder: \"Critical value for 5% significance?\""
  },
  "whyItExists": "Finds critical values for testing without tables.",
  "whenToUse": "Setting rejection region threshold.",
  "realWorldUseCases": [
    "Alpha 0.05 cutoff.",
    "Variance equality threshold."
  ],
  "businessExample": {
    "scenario": "Critical value for 5% (0.05) with 10 DF.",
    "formula": "=CHISQ.INV(0.05, 10)"
  },
  "syntax": "=CHISQ.INV(probability, deg_freedom)",
  "syntaxBreakdown": [
    {
      "arg": "probability",
      "desc": "Probability (0-1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Critical",
      "table": {
        "headers": [
          "P"
        ],
        "rows": [
          [
            "0.05"
          ]
        ]
      },
      "stepByStep": [
        "p=0.05, df=10.",
        "Result: 3.9403."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Prob",
      "desc": "Area to the LEFT."
    }
  ],
  "proTips": [
    "Inverse of CHISQ.DIST."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Inverse of CHISQ.DIST?",
    "expectedAnswer": "CHISQ.INV"
  },
  "practice": {
    "instructions": "Inv Chi-sq for P=0.05, DF=10.",
    "initialData": [
      [
        "P"
      ],
      [
        0.05
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "CHISQ.INV(0.05,10)",
    "expectedValue": 3.9403
  }
},
{
  "id": "chisq.test",
  "title": "CHISQ.TEST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Chi-Square Test",
    "description": "Test for independence: probability for Chi-square stat.",
    "concept": "Think of it as the relationship detector: \"Is difference due to chance or a real link?\""
  },
  "whyItExists": "Simplifies categorical data analysis.",
  "whenToUse": "Testing if two categorical variables are independent.",
  "realWorldUseCases": [
    "Campaign influence.",
    "Machine vs defect rate."
  ],
  "businessExample": {
    "scenario": "Compare actual choices vs equal preference model.",
    "formula": "=CHISQ.TEST(B2:C2, B3:C3)"
  },
  "syntax": "=CHISQ.TEST(actual_range, expected_range)",
  "syntaxBreakdown": [
    {
      "arg": "actual_range",
      "desc": "Observed data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Independence",
      "table": {
        "headers": [
          "Act",
          "Exp"
        ],
        "rows": [
          [
            "30",
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Compare act vs exp.",
        "Result p: 0.0016."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Exp Counts",
      "desc": "Should be >= 5."
    }
  ],
  "proTips": [
    "Low p = significant relationship."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Low p means?",
    "expectedAnswer": "Significant relationship"
  },
  "practice": {
    "instructions": "CHISQ.TEST on B2:C2 vs B3:C3.",
    "initialData": [
      [
        "A1",
        "A2"
      ],
      [
        30,
        10
      ],
      [
        20,
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "CHISQ.TEST(B2:C2,B3:C3)",
    "expectedValue": 0.0016
  }
},
{
  "id": "confidence.norm",
  "title": "CONFIDENCE.NORM Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Normal Confidence",
    "description": "Confidence interval for mean using normal distribution.",
    "concept": "Think of it as the margin of error: \"Plus or minus how much for 95%?\""
  },
  "whyItExists": "Provides measure of precision for sample mean.",
  "whenToUse": "n > 30 and pop SD is known.",
  "realWorldUseCases": [
    "Avg height interval.",
    "Polling margin of error."
  ],
  "businessExample": {
    "scenario": "Margin for 95% (SD 2.5, n=100).",
    "formula": "=CONFIDENCE.NORM(0.05, 2.5, 100)"
  },
  "syntax": "=CONFIDENCE.NORM(alpha, standard_dev, size)",
  "syntaxBreakdown": [
    {
      "arg": "alpha",
      "desc": "Significance (1 - confidence)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Poll",
      "table": {
        "headers": [
          "A"
        ],
        "rows": [
          [
            "0.05"
          ]
        ]
      },
      "stepByStep": [
        "Alpha=0.05.",
        "Result: 0.4900."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Alpha Definition",
      "desc": "99% confidence = 0.01 alpha."
    }
  ],
  "proTips": [
    "Use CONFIDENCE.T for n < 30."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Alpha for 95%?",
    "expectedAnswer": "0.05"
  },
  "practice": {
    "instructions": "Margin for a=0.05, SD=2.5, N=100.",
    "initialData": [
      [
        "A"
      ],
      [
        0.05
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "CONFIDENCE.NORM(0.05,2.5,100)",
    "expectedValue": 0.49
  }
},
{
  "id": "confidence.t",
  "title": "CONFIDENCE.T Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "T-Dist Confidence",
    "description": "Confidence interval for mean using student's T.",
    "concept": "Think of it as the small sample margin: \"Margin of error for small groups.\""
  },
  "whyItExists": "More accurate for small n (n < 30).",
  "whenToUse": "Small sample sizes.",
  "realWorldUseCases": [
    "Pilot studies.",
    "Luxury goods batches."
  ],
  "businessExample": {
    "scenario": "Margin for n=10, SD=1.",
    "formula": "=CONFIDENCE.T(0.05, 1, 10)"
  },
  "syntax": "=CONFIDENCE.T(alpha, standard_dev, size)",
  "syntaxBreakdown": [
    {
      "arg": "size",
      "desc": "Sample size."
    }
  ],
  "detailedExamples": [
    {
      "title": "Pilot",
      "table": {
        "headers": [
          "N"
        ],
        "rows": [
          [
            "10"
          ]
        ]
      },
      "stepByStep": [
        "n=10, df=9.",
        "Result: 0.7154."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Min Size",
      "desc": "Must be at least 2."
    }
  ],
  "proTips": [
    "Always larger than .NORM."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Better for n=5?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Margin for a=0.05, SD=1, N=10.",
    "initialData": [
      [
        "A"
      ],
      [
        0.05
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "CONFIDENCE.T(0.05,1,10)",
    "expectedValue": 0.7154
  }
},
{
  "id": "correl",
  "title": "CORREL Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Correlation",
    "description": "Pearson correlation between two datasets.",
    "concept": "Think of it as the relationship strength: \"Does Y go up when X does?\""
  },
  "whyItExists": "Quantifies linear link between two variables (-1 to +1).",
  "whenToUse": "Check if variables are linked.",
  "realWorldUseCases": [
    "Marketing vs Revenue.",
    "Study hours vs Scores."
  ],
  "businessExample": {
    "scenario": "Check if ad spend leads to revenue.",
    "formula": "=CORREL(B2:B10, C2:C10)"
  },
  "syntax": "=CORREL(array1, array2)",
  "syntaxBreakdown": [
    {
      "arg": "array1",
      "desc": "First dataset."
    }
  ],
  "detailedExamples": [
    {
      "title": "Perfect",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "10"
          ],
          [
            "2",
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Result: 1.0."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Causation",
      "desc": "Correlation != Causation."
    }
  ],
  "proTips": [
    "Near 0 = no linear link."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Max CORREL?",
    "expectedAnswer": "1"
  },
  "practice": {
    "instructions": "Correl X(B2:B3) and Y(C2:C3).",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        10
      ],
      [
        2,
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      0
    ],
    "expectedFormula": "CORREL(B2:B3,C2:C3)",
    "expectedValue": 1
  }
},
{
  "id": "count",
  "title": "COUNT Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Numeric Counter",
    "description": "Counts cells in a range that contain numbers.",
    "concept": "Think of it as the number tally: \"How many numerical entries?\""
  },
  "whyItExists": "Quantifies volume of numeric data, ignoring text.",
  "whenToUse": "Counting valid numeric analysis points.",
  "realWorldUseCases": [
    "Students who took test.",
    "Transaction counts."
  ],
  "businessExample": {
    "scenario": "Count items with recorded weight.",
    "formula": "=COUNT(B2:B500)"
  },
  "syntax": "=COUNT(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Range to count numbers in."
    }
  ],
  "detailedExamples": [
    {
      "title": "Scores",
      "table": {
        "headers": [
          "S"
        ],
        "rows": [
          [
            "85"
          ],
          [
            "Absent"
          ]
        ]
      },
      "stepByStep": [
        "85 is numeric.",
        "Result: 1."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Dates",
      "desc": "Dates are numbers and will be counted."
    }
  ],
  "proTips": [
    "Use COUNTA for text."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Includes text?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Count numeric B2:B3.",
    "initialData": [
      [
        "S"
      ],
      [
        85
      ],
      [
        "Absent"
      ],
      [
        "Tot",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COUNT(B2:B3)",
    "expectedValue": 1
  }
},
{
  "id": "counta",
  "title": "COUNTA Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Non-Empty Counter",
    "description": "Counts cells that are not empty.",
    "concept": "Think of it as the existence tally: \"How many cells have SOMETHING?\""
  },
  "whyItExists": "Total count of entries regardless of type.",
  "whenToUse": "Auditing completion of responses.",
  "realWorldUseCases": [
    "Workshop signups.",
    "Task completion check."
  ],
  "businessExample": {
    "scenario": "Count all event responses.",
    "formula": "=COUNTA(B2:B50)"
  },
  "syntax": "=COUNTA(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Range to count content in."
    }
  ],
  "detailedExamples": [
    {
      "title": "Audit",
      "table": {
        "headers": [
          "R"
        ],
        "rows": [
          [
            "Yes"
          ],
          [
            "2"
          ],
          [
            "#N/A"
          ]
        ]
      },
      "stepByStep": [
        "All non-empty.",
        "Result: 3."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Empty Strings",
      "desc": "Cells with \"\" formula result are NOT empty."
    }
  ],
  "proTips": [
    "Use COUNTBLANK for gaps."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Counts errors?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Count non-empty B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        "Yes"
      ],
      [
        "2"
      ],
      [
        "Tot",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COUNTA(B2:B3)",
    "expectedValue": 2
  }
},
{
  "id": "countblank",
  "title": "COUNTBLANK Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Empty Counter",
    "description": "Counts empty cells in a range.",
    "concept": "Think of it as the missing data finder: \"How many gaps in the list?\""
  },
  "whyItExists": "Easiest way to detect missing info.",
  "whenToUse": "Data cleaning and progress tracking.",
  "realWorldUseCases": [
    "Missing SSNs.",
    "Missing emails."
  ],
  "businessExample": {
    "scenario": "Identify missing values in critical column.",
    "formula": "=COUNTBLANK(C2:C100)"
  },
  "syntax": "=COUNTBLANK(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Range to check for blanks."
    }
  ],
  "detailedExamples": [
    {
      "title": "Gaps",
      "table": {
        "headers": [
          "E"
        ],
        "rows": [
          [
            "a@a.com"
          ],
          [
            ""
          ]
        ]
      },
      "stepByStep": [
        "Result: 1."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Spaces",
      "desc": "Cell with a space is NOT blank."
    }
  ],
  "proTips": [
    "Counts \"\" formula results."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Counts cell with space?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Count blanks in B2:B3.",
    "initialData": [
      [
        "E"
      ],
      [
        "a@a.com"
      ],
      [
        ""
      ],
      [
        "Tot",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COUNTBLANK(B2:B3)",
    "expectedValue": 1
  }
},
{
  "id": "countif",
  "title": "COUNTIF Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Criteria Counter",
    "description": "Counts cells meeting a single criteria.",
    "concept": "Think of it as the filtered tally: \"How many are 'Completed'?\""
  },
  "whyItExists": "Instant summaries of data subsets.",
  "whenToUse": "High-level status or region counts.",
  "realWorldUseCases": [
    "Grade A count.",
    "Salesperson tally."
  ],
  "businessExample": {
    "scenario": "Count orders > $100.",
    "formula": "=COUNTIF(B2:B50, \">100\")"
  },
  "syntax": "=COUNTIF(range, criteria)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Cells to count."
    },
    {
      "arg": "criteria",
      "desc": "The condition."
    }
  ],
  "detailedExamples": [
    {
      "title": "Grades",
      "table": {
        "headers": [
          "G"
        ],
        "rows": [
          [
            "A"
          ],
          [
            "B"
          ],
          [
            "A"
          ]
        ]
      },
      "stepByStep": [
        "Criteria: 'A'.",
        "Result: 2."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Quotes",
      "desc": "Criteria like \">10\" must be in quotes."
    }
  ],
  "proTips": [
    "Wildcards supported."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Quotes for '>10'?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Count B2:B3 > 100.",
    "initialData": [
      [
        "S"
      ],
      [
        150
      ],
      [
        50
      ],
      [
        "Tot",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COUNTIF(B2:B3,\">100\")",
    "expectedValue": 1
  }
},
{
  "id": "countifs",
  "title": "COUNTIFS Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Multi-Criteria Counter",
    "description": "Counts cells meeting multiple criteria.",
    "concept": "Think of it as the precise tally: \"How many 'Completed' AND 'Urgent'?\""
  },
  "whyItExists": "Granular filtering and counting in one step.",
  "whenToUse": "Cross-tabulation and detailed metrics.",
  "realWorldUseCases": [
    "Sales > 5yr AND Dept Sales.",
    "In Stock AND On Sale."
  ],
  "businessExample": {
    "scenario": "Count 'North' sales > $1000.",
    "formula": "=COUNTIFS(A2:A100, \"North\", B2:B100, \">1000\")"
  },
  "syntax": "=COUNTIFS(r1, c1, [r2, c2]...)",
  "syntaxBreakdown": [
    {
      "arg": "r1",
      "desc": "First range."
    }
  ],
  "detailedExamples": [
    {
      "title": "Tally",
      "table": {
        "headers": [
          "Reg",
          "S"
        ],
        "rows": [
          [
            "N",
            1500
          ],
          [
            "S",
            2000
          ]
        ]
      },
      "stepByStep": [
        "North AND >1000.",
        "Result: 1."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Range Size",
      "desc": "All ranges must be same size."
    }
  ],
  "proTips": [
    "Up to 127 pairs."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Ranges same size?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Count Reg='N' and Val>100 (A2:A3, B2:B3).",
    "initialData": [
      [
        "R",
        "V"
      ],
      [
        "N",
        150
      ],
      [
        "S",
        200
      ],
      [
        "Tot",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COUNTIFS(A2:A3,\"N\",B2:B3,\">100\")",
    "expectedValue": 1
  }
},
{
  "id": "covariance.p",
  "title": "COVARIANCE.P Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Population Covariance",
    "description": "Calculates the average of the products of deviations for each data point pair in two datasets (population).",
    "concept": "Think of it as the directional move: \"Do X and Y move together, and by how much?\""
  },
  "whyItExists": "It is a key metric in finance to determine how two stocks or assets move in relation to each other.",
  "whenToUse": "Use when you have the entire population of data and want to know the direction of the relationship.",
  "realWorldUseCases": [
    "Analyzing the relationship between stock price and interest rates.",
    "Measuring how height and weight vary together in a full dataset."
  ],
  "businessExample": {
    "scenario": "An analyst calculates the covariance between monthly stock returns and market index returns.",
    "formula": "=COVARIANCE.P(B2:B13, C2:C13)"
  },
  "syntax": "=COVARIANCE.P(array1, array2)",
  "syntaxBreakdown": [
    {
      "arg": "array1",
      "desc": "The first range of data points."
    },
    {
      "arg": "array2",
      "desc": "The second range of data points."
    }
  ],
  "detailedExamples": [
    {
      "title": "Movement Test",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "2"
          ],
          [
            "2",
            "4"
          ],
          [
            "3",
            "6"
          ]
        ]
      },
      "stepByStep": [
        "Both increase together perfectly.",
        "Calculate the average product of deviations.",
        "Result: 0.6667 (Positive value means they move together)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Array Sizes",
      "desc": "The two arrays must have the same number of data points; otherwise, Excel returns an error."
    }
  ],
  "proTips": [
    "Positive result means X and Y move in the same direction; negative means opposite."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does a positive covariance mean variables move in the same or opposite direction?",
    "expectedAnswer": "same"
  },
  "practice": {
    "instructions": "Find the population covariance for B2:B3 and C2:C3.",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        2
      ],
      [
        2,
        4
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      0
    ],
    "expectedFormula": "COVARIANCE.P(B2:B3,C2:C3)",
    "expectedValue": 0.25
  }
},
{
  "id": "covariance.s",
  "title": "COVARIANCE.S Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Sample Covariance",
    "description": "Calculates the average of the products of deviations for a sample of data pairs.",
    "concept": "Think of it as the sample relationship: \"Based on this sample, how do X and Y relate?\""
  },
  "whyItExists": "It provides an unbiased estimate of population covariance when you only have a subset of data.",
  "whenToUse": "Use in almost all research scenarios where you are using a sample to represent a larger group.",
  "realWorldUseCases": [
    "Estimating portfolio risk from a sample of daily returns.",
    "Analyzing the link between fertilizer and crop yield from test plots."
  ],
  "businessExample": {
    "scenario": "A manager estimates the link between employee training hours and productivity from a sample of 10 workers.",
    "formula": "=COVARIANCE.S(B2:B11, C2:C11)"
  },
  "syntax": "=COVARIANCE.S(array1, array2)",
  "syntaxBreakdown": [
    {
      "arg": "array1",
      "desc": "First range of sample data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Sample Move",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "2"
          ],
          [
            "2",
            "4"
          ]
        ]
      },
      "stepByStep": [
        "N=2 (sample size).",
        "Calculate deviations and multiply.",
        "Result: 1.0 (Higher than COVARIANCE.P because it divides by N-1)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Small Samples",
      "desc": "You need at least two pairs of data; otherwise, COVARIANCE.S returns #DIV/0!."
    }
  ],
  "proTips": [
    "Always use COVARIANCE.S unless you are 100% sure you have every single data point in the population."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Is COVARIANCE.S usually larger or smaller than COVARIANCE.P for the same data?",
    "expectedAnswer": "larger"
  },
  "practice": {
    "instructions": "Find the sample covariance for B2:B3 and C2:C3.",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        2
      ],
      [
        2,
        4
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      0
    ],
    "expectedFormula": "COVARIANCE.S(B2:B3,C2:C3)",
    "expectedValue": 1
  }
},
{
  "id": "devsq",
  "title": "DEVSQ Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Sum of Squares of Deviations",
    "description": "Calculates the sum of squares of deviations of data points from their sample mean.",
    "concept": "Think of it as the variance component: \"How much total 'distance' is there between the values and the average?\""
  },
  "whyItExists": "It is a vital building block for more complex statistical formulas, such as calculating variance or performing ANOVA.",
  "whenToUse": "Use when building custom statistical models or calculating variance manually.",
  "realWorldUseCases": [
    "Internal math for linear regression models.",
    "Analyzing the total variation in a dataset."
  ],
  "businessExample": {
    "scenario": "A data analyst calculates the total squared deviation to use as an input for a custom risk model.",
    "formula": "=DEVSQ(B2:B5)"
  },
  "syntax": "=DEVSQ(number1, [number2], ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "The first number or range."
    }
  ],
  "detailedExamples": [
    {
      "title": "Squared Distance",
      "table": {
        "headers": [
          "Val"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "2"
          ],
          [
            "3"
          ]
        ]
      },
      "stepByStep": [
        "Mean=2.",
        "Squared deviations: (1-2)^2=1, (2-2)^2=0, (3-2)^2=1.",
        "Sum: 2."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Empty Cells",
      "desc": "DEVSQ ignores empty cells, but it will error if no numeric values are found."
    }
  ],
  "proTips": [
    "Dividing DEVSQ by (N-1) gives you the sample variance (VAR.S)."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "If you divide DEVSQ by N-1, what statistical value do you get?",
    "expectedAnswer": "variance"
  },
  "practice": {
    "instructions": "Find DEVSQ for values 1, 2, 3 in B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        2
      ],
      [
        3
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "DEVSQ(B2:B4)",
    "expectedValue": 2
  }
},
{
  "id": "expon.dist",
  "title": "EXPON.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Exponential Distribution",
    "description": "Returns the exponential distribution probability.",
    "concept": "Think of it as the waiting time tool: \"What is the probability that the next customer arrives in less than 5 minutes?\""
  },
  "whyItExists": "It models the time between events in a Poisson process, making it essential for queueing theory.",
  "whenToUse": "Use to model waiting times or reliability, such as how long a lightbulb lasts or how often users click a button.",
  "realWorldUseCases": [
    "Modeling time between calls in a call center.",
    "Estimating time until a machine part fails."
  ],
  "businessExample": {
    "scenario": "A retail store expects 0.1 customers per minute (lambda). What is the probability a customer arrives within 5 minutes?",
    "formula": "=EXPON.DIST(5, 0.1, TRUE)"
  },
  "syntax": "=EXPON.DIST(x, lambda, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "lambda",
      "desc": "The parameter value (mean rate of occurrence)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Waiting Time",
      "table": {
        "headers": [
          "X",
          "Lambda"
        ],
        "rows": [
          [
            "5",
            "0.1"
          ]
        ]
      },
      "stepByStep": [
        "X=5, Lambda=0.1.",
        "Cumulative TRUE calculates probability of waiting <= 5 mins.",
        "Result: 0.3935."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Lambda Sign",
      "desc": "Lambda must be a positive number; otherwise, Excel returns an error."
    }
  ],
  "proTips": [
    "The exponential distribution is 'memoryless', meaning future events don't depend on past ones."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the common use for EXPON.DIST?",
    "expectedAnswer": "waiting time"
  },
  "practice": {
    "instructions": "Find cumulative probability for X=5 and Lambda=0.1.",
    "initialData": [
      [
        "X"
      ],
      [
        5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "EXPON.DIST(5,0.1,TRUE)",
    "expectedValue": 0.3935
  }
},
{
  "id": "f.dist",
  "title": "F.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "F-Distribution Probability",
    "description": "Calculates the F probability distribution (left-tailed).",
    "concept": "Think of it as the variance ratio checker: \"Is the variance of Group A significantly different from Group B?\""
  },
  "whyItExists": "It is the core distribution used in ANOVA (Analysis of Variance) to compare multiple groups.",
  "whenToUse": "Use when comparing the variances of two different populations or in ANOVA tests.",
  "realWorldUseCases": [
    "Comparing the consistency of two manufacturing machines.",
    "Testing if training programs lead to different levels of performance variance."
  ],
  "businessExample": {
    "scenario": "A scientist compares the variance of two groups and gets an F-statistic of 1.5 with DF 5 and 20.",
    "formula": "=F.DIST(1.5, 5, 20, TRUE)"
  },
  "syntax": "=F.DIST(x, deg_freedom1, deg_freedom2, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "The value to evaluate."
    },
    {
      "arg": "deg_freedom1",
      "desc": "Numerator degrees of freedom."
    }
  ],
  "detailedExamples": [
    {
      "title": "Variance Ratio",
      "table": {
        "headers": [
          "F",
          "DF1",
          "DF2"
        ],
        "rows": [
          [
            "1.5",
            "5",
            "20"
          ]
        ]
      },
      "stepByStep": [
        "F=1.5.",
        "Calculate cumulative area to the left.",
        "Result: 0.7656."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Non-Positive DF",
      "desc": "Degrees of freedom must be at least 1."
    }
  ],
  "proTips": [
    "Use F.DIST.RT for the right-tailed probability (common in hypothesis tests)."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "In which statistical test is the F-distribution primarily used?",
    "expectedAnswer": "ANOVA"
  },
  "practice": {
    "instructions": "Find the cumulative F-distribution for X=1.5, DF1=5, DF2=20.",
    "initialData": [
      [
        "X"
      ],
      [
        1.5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "F.DIST(1.5,5,20,TRUE)",
    "expectedValue": 0.7656
  }
},
{
  "id": "f.inv",
  "title": "F.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse F-Distribution",
    "description": "Returns the inverse of the F probability distribution.",
    "concept": "Think of it as the cutoff finder: \"What F-statistic value corresponds to a 5% significance level?\""
  },
  "whyItExists": "It finds critical values for F-tests used in regression and ANOVA analysis.",
  "whenToUse": "Use to set the rejection boundary for hypothesis tests comparing variances.",
  "realWorldUseCases": [
    "Determining the F-threshold for a 95% confidence ANOVA.",
    "Finding critical values for regression model validation."
  ],
  "businessExample": {
    "scenario": "An analyst wants the F-value for the bottom 5% (0.05) probability with 5 and 20 DF.",
    "formula": "=F.INV(0.05, 5, 20)"
  },
  "syntax": "=F.INV(probability, deg_freedom1, deg_freedom2)",
  "syntaxBreakdown": [
    {
      "arg": "probability",
      "desc": "Area to the left (0 to 1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Critical Value",
      "table": {
        "headers": [
          "P",
          "DF1",
          "DF2"
        ],
        "rows": [
          [
            "0.05",
            "5",
            "20"
          ]
        ]
      },
      "stepByStep": [
        "P=0.05.",
        "Inverse F lookup.",
        "Result: 0.2036."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "P Value",
      "desc": "If you want a 5% tail on the RIGHT, you must input 0.95 into F.INV."
    }
  ],
  "proTips": [
    "F.INV is the inverse of F.DIST."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the inverse function of F.DIST?",
    "expectedAnswer": "F.INV"
  },
  "practice": {
    "instructions": "Find inverse F for P=0.05, DF1=5, DF2=20.",
    "initialData": [
      [
        "P"
      ],
      [
        0.05
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "F.INV(0.05,5,20)",
    "expectedValue": 0.2036
  }
},
{
  "id": "f.test",
  "title": "F.TEST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "F-Test p-Value",
    "description": "Returns the result of an F-test: the two-tailed probability that variances in two arrays are not significantly different.",
    "concept": "Think of it as the variance equality: \"Are these two groups spread out in the same way?\""
  },
  "whyItExists": "It is a prerequisite for a T-test; it tells you if you can assume equal variances between two groups.",
  "whenToUse": "Use before a T-test to decide if the 'Equal Variance' or 'Unequal Variance' version should be used.",
  "realWorldUseCases": [
    "Comparing the consistency of test scores from two different schools.",
    "Checking if two production lines have identical variability."
  ],
  "businessExample": {
    "scenario": "An analyst compares the variance of sales from Team A and Team B to see if they are equally consistent.",
    "formula": "=F.TEST(B2:B10, C2:C10)"
  },
  "syntax": "=F.TEST(array1, array2)",
  "syntaxBreakdown": [
    {
      "arg": "array1",
      "desc": "The first dataset."
    },
    {
      "arg": "array2",
      "desc": "The second dataset."
    }
  ],
  "detailedExamples": [
    {
      "title": "Equality Test",
      "table": {
        "headers": [
          "A",
          "B"
        ],
        "rows": [
          [
            "1",
            "1"
          ],
          [
            "2",
            "3"
          ],
          [
            "3",
            "1"
          ]
        ]
      },
      "stepByStep": [
        "Compare variances of {1,2,3} and {1,3,1}.",
        "F-statistic calculation.",
        "Result p: 0.5000 (Vastly similar)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Low p-value",
      "desc": "A p-value < 0.05 means the variances ARE significantly different."
    }
  ],
  "proTips": [
    "Always check variances before performing a T-test!"
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does F.TEST return a p-value or a critical value?",
    "expectedAnswer": "p-value"
  },
  "practice": {
    "instructions": "Run F.TEST on B2:B3 and C2:C3.",
    "initialData": [
      [
        "A",
        "B"
      ],
      [
        1,
        1
      ],
      [
        2,
        3
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "F.TEST(B2:B3,C2:C3)",
    "expectedValue": 0.5
  }
},
{
  "id": "fisher",
  "title": "FISHER Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Fisher Transformation",
    "description": "Calculates the Fisher transformation of a correlation coefficient.",
    "concept": "Think of it as the normalizer: \"Turn a correlation (r) into a value that follows a normal distribution (z).\""
  },
  "whyItExists": "Correlations aren't normally distributed, which makes hypothesis testing difficult. Fisher's 'z-transform' solves this.",
  "whenToUse": "Use when performing statistical tests on correlation coefficients, like comparing two different correlations.",
  "realWorldUseCases": [
    "Testing if a correlation is significantly different from zero.",
    "Building confidence intervals for a correlation coefficient."
  ],
  "businessExample": {
    "scenario": "A researcher transforms a high correlation of 0.75 for further analysis.",
    "formula": "=FISHER(0.75)"
  },
  "syntax": "=FISHER(r)",
  "syntaxBreakdown": [
    {
      "arg": "r",
      "desc": "Correlation coefficient (-1 to 1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Transformation",
      "table": {
        "headers": [
          "R"
        ],
        "rows": [
          [
            "0.75"
          ]
        ]
      },
      "stepByStep": [
        "Input r=0.75.",
        "Apply Fisher formula.",
        "Result: 0.9730."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Range of r",
      "desc": "r must be strictly between -1 and 1; -1 or 1 results in an error."
    }
  ],
  "proTips": [
    "Used mostly in advanced academic research."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Between what two values must r be for the FISHER function?",
    "expectedAnswer": "-1 and 1"
  },
  "practice": {
    "instructions": "Transform a correlation of 0.75.",
    "initialData": [
      [
        "R"
      ],
      [
        0.75
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "FISHER(0.75)",
    "expectedValue": 0.973
  }
},
{
  "id": "fisherinv",
  "title": "FISHERINV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse Fisher",
    "description": "Returns the inverse of the Fisher transformation.",
    "concept": "Think of it as the correlation restorer: \"Turn a Fisher-z value back into a correlation (r).\""
  },
  "whyItExists": "It allows you to convert normalized test results back into a meaningful correlation value.",
  "whenToUse": "Use after performing math on Fisher-transformed values to return to an 'r' value.",
  "realWorldUseCases": [
    "Converting a confidence interval from z-scores back to correlations.",
    "Reporting results in 'r' after a Meta-analysis."
  ],
  "businessExample": {
    "scenario": "An analyst converts a z-value of 0.973 back into a correlation.",
    "formula": "=FISHERINV(0.973)"
  },
  "syntax": "=FISHERINV(y)",
  "syntaxBreakdown": [
    {
      "arg": "y",
      "desc": "The Fisher-transformed value."
    }
  ],
  "detailedExamples": [
    {
      "title": "Restoration",
      "table": {
        "headers": [
          "Y"
        ],
        "rows": [
          [
            "0.973"
          ]
        ]
      },
      "stepByStep": [
        "Input y=0.973.",
        "Apply inverse Fisher.",
        "Result: 0.75."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Large Y",
      "desc": "Very large Y values will always return a correlation very close to 1."
    }
  ],
  "proTips": [
    "FISHERINV(FISHER(r)) always returns r."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What does FISHERINV return?",
    "expectedAnswer": "correlation"
  },
  "practice": {
    "instructions": "Convert 0.973 back into a correlation.",
    "initialData": [
      [
        "Y"
      ],
      [
        0.973
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "FISHERINV(0.973)",
    "expectedValue": 0.75
  }
},
{
  "id": "forecast",
  "title": "FORECAST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Linear Forecast",
    "description": "Predicts a future value based on existing values using linear regression.",
    "concept": "Think of it as the crystal ball: \"Based on the trend, where will my sales be next month?\""
  },
  "whyItExists": "It is the simplest way to perform a trend prediction in Excel without advanced modeling.",
  "whenToUse": "Use for simple linear predictions like sales projections or cost estimates based on time.",
  "realWorldUseCases": [
    "Predicting Dec sales based on Jan-Nov trends.",
    "Estimating future expenses based on historical growth."
  ],
  "businessExample": {
    "scenario": "A shop owner predicts month 3 sales based on months 1 and 2.",
    "formula": "=FORECAST(3, B2:B3, A2:A3)"
  },
  "syntax": "=FORECAST(x, known_y, known_x)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "The point you want to predict."
    },
    {
      "arg": "known_y",
      "desc": "Dependent data points (e.g. Sales)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Sales Trend",
      "table": {
        "headers": [
          "Month",
          "Sales"
        ],
        "rows": [
          [
            "1",
            "10"
          ],
          [
            "2",
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Current trend is +10 per month.",
        "Target month 3.",
        "Result: 30."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Non-Linear Data",
      "desc": "If your data follows a curve rather than a line, FORECAST will be inaccurate."
    }
  ],
  "proTips": [
    "In newer Excel, this is replaced by FORECAST.LINEAR, but FORECAST still works for compatibility."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does FORECAST use linear or exponential regression?",
    "expectedAnswer": "linear"
  },
  "practice": {
    "instructions": "Predict value for month 3 using B2:B3 as Y and A2:A3 as X.",
    "initialData": [
      [
        "M",
        "V"
      ],
      [
        1,
        10
      ],
      [
        2,
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "FORECAST(3,B2:B3,A2:A3)",
    "expectedValue": 30
  }
},
{
  "id": "frequency",
  "title": "FREQUENCY Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Frequency Distribution",
    "description": "Calculates how often values occur within a range of values, and then returns a vertical array of numbers.",
    "concept": "Think of it as the bin sorter: \"How many scores fall into each grade bracket (0-50, 51-70, 71-100)?\""
  },
  "whyItExists": "It is the essential tool for creating histograms and frequency tables.",
  "whenToUse": "Use when you need to group continuous data into discrete categories (like age groups or price tiers).",
  "realWorldUseCases": [
    "Grouping exam scores into letter grades.",
    "Tallying the number of customers in various age brackets."
  ],
  "businessExample": {
    "scenario": "A teacher sorts scores (15, 5) into a bin of 10. The result shows how many are below 10 and how many above.",
    "formula": "=FREQUENCY(B2:B3, C2:C2)"
  },
  "syntax": "=FREQUENCY(data_array, bins_array)",
  "syntaxBreakdown": [
    {
      "arg": "data_array",
      "desc": "The values you want to count."
    },
    {
      "arg": "bins_array",
      "desc": "The intervals (buckets) to sort values into."
    }
  ],
  "detailedExamples": [
    {
      "title": "Grade Bins",
      "table": {
        "headers": [
          "Data",
          "Bins"
        ],
        "rows": [
          [
            "15",
            "10"
          ],
          [
            "5",
            ""
          ]
        ]
      },
      "stepByStep": [
        "Data: {15, 5}. Bin: 10.",
        "Group 1 (<=10): {5}. Count: 1.",
        "Group 2 (>10): {15}. Count: 1. Result: {1, 1}."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "One Extra Bin",
      "desc": "FREQUENCY always returns one more value than the number of bins provided (to catch everything above the last bin)."
    }
  ],
  "proTips": [
    "This is an array function; it 'spills' into multiple cells in modern Excel."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "If you have 3 bins, how many results will FREQUENCY return?",
    "expectedAnswer": "4"
  },
  "practice": {
    "instructions": "Find frequency for B2:B3 using bin C2.",
    "initialData": [
      [
        "Data",
        "Bins"
      ],
      [
        15,
        10
      ],
      [
        5,
        ""
      ]
    ],
    "targetCell": [
      3,
      0
    ],
    "expectedFormula": "FREQUENCY(B2:B3,C2:C2)",
    "expectedValue": 1
  }
},
{
  "id": "gamma",
  "title": "GAMMA Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Gamma Function Value",
    "description": "Returns the Gamma function value for a given number.",
    "concept": "Think of it as the factorial extension: \"Think of it as a way to calculate factorials for numbers that aren't whole integers.\""
  },
  "whyItExists": "It is a fundamental mathematical function used in complex statistical and engineering calculations.",
  "whenToUse": "Use when working with distributions related to the Gamma function or when you need the continuous version of the factorial function.",
  "realWorldUseCases": [
    "Calculating higher-level probabilities in physics.",
    "Used in modeling lifetimes in engineering."
  ],
  "businessExample": {
    "scenario": "An engineer needs the Gamma value for 2.5 to use in a fluid dynamics model.",
    "formula": "=GAMMA(2.5)"
  },
  "syntax": "=GAMMA(number)",
  "syntaxBreakdown": [
    {
      "arg": "number",
      "desc": "The number for which you want to calculate the Gamma function."
    }
  ],
  "detailedExamples": [
    {
      "title": "Gamma Calculation",
      "table": {
        "headers": [
          "X"
        ],
        "rows": [
          [
            "5"
          ]
        ]
      },
      "stepByStep": [
        "For a whole number n, GAMMA(n) = (n-1)!.",
        "GAMMA(5) = 4! = 4 * 3 * 2 * 1.",
        "Result: 24."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Zero and Negatives",
      "desc": "The function returns an error if the number is zero or a negative integer."
    }
  ],
  "proTips": [
    "GAMMA(n+1) is equal to n! (n-factorial) for positive integers."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is GAMMA(4)?",
    "expectedAnswer": "6"
  },
  "practice": {
    "instructions": "Find the Gamma value for 5 in B2.",
    "initialData": [
      [
        "X"
      ],
      [
        5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "GAMMA(5)",
    "expectedValue": 24
  }
},
{
  "id": "gamma.dist",
  "title": "GAMMA.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Gamma Distribution",
    "description": "Returns the gamma distribution probability.",
    "concept": "Think of it as the event timer: \"How long until the 3rd event occurs?\""
  },
  "whyItExists": "It is widely used to model wait times and reliability, specifically when multiple independent events must occur.",
  "whenToUse": "Use to analyze the time until a specific number of events occur in a Poisson process.",
  "realWorldUseCases": [
    "Predicting time until the 5th customer arrival.",
    "Modeling the lifespan of electronic components."
  ],
  "businessExample": {
    "scenario": "A call center wants to know the probability of waiting less than 10 minutes (X) for 3 calls (Alpha) given an average interval of 2 mins (Beta).",
    "formula": "=GAMMA.DIST(10, 3, 2, TRUE)"
  },
  "syntax": "=GAMMA.DIST(x, alpha, beta, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "alpha",
      "desc": "The shape parameter."
    },
    {
      "arg": "beta",
      "desc": "The scale parameter."
    }
  ],
  "detailedExamples": [
    {
      "title": "Wait Time",
      "table": {
        "headers": [
          "X",
          "A",
          "B"
        ],
        "rows": [
          [
            "10",
            "3",
            "2"
          ]
        ]
      },
      "stepByStep": [
        "X=10, Alpha=3, Beta=2.",
        "Cumulative TRUE.",
        "Result: 0.8753."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Parameters",
      "desc": "X, Alpha, and Beta must all be positive values."
    }
  ],
  "proTips": [
    "If alpha = 1, it becomes the Exponential distribution."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What distribution is a special case of Gamma when alpha=1?",
    "expectedAnswer": "exponential"
  },
  "practice": {
    "instructions": "Find cumulative Gamma prob for X=10, a=3, b=2.",
    "initialData": [
      [
        "X"
      ],
      [
        10
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "GAMMA.DIST(10,3,2,TRUE)",
    "expectedValue": 0.8753
  }
},
{
  "id": "gamma.inv",
  "title": "GAMMA.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse Gamma",
    "description": "Returns the inverse of the gamma cumulative distribution.",
    "concept": "Think of it as the inverse timer: \"At what time can I be 90% sure the 3rd event has happened?\""
  },
  "whyItExists": "It helps find specific time thresholds or cutoffs in processes modeled by the Gamma distribution.",
  "whenToUse": "Use to determine how long a process must run to achieve a target confidence level.",
  "realWorldUseCases": [
    "Determining the required battery life to ensure 99% reliability.",
    "Finding the time threshold for service level agreements."
  ],
  "businessExample": {
    "scenario": "A manager needs the time value (X) that covers 90% of outcomes with Alpha 3 and Beta 2.",
    "formula": "=GAMMA.INV(0.9, 3, 2)"
  },
  "syntax": "=GAMMA.INV(probability, alpha, beta)",
  "syntaxBreakdown": [
    {
      "arg": "probability",
      "desc": "Target probability (0 to 1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Threshold Finding",
      "table": {
        "headers": [
          "P",
          "A",
          "B"
        ],
        "rows": [
          [
            "0.9",
            "3",
            "2"
          ]
        ]
      },
      "stepByStep": [
        "P=0.9, A=3, B=2.",
        "Inverse Gamma lookup.",
        "Result: 10.6446."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Probability",
      "desc": "Probability must be between 0 and 1 inclusive."
    }
  ],
  "proTips": [
    "Inverse of GAMMA.DIST."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Inverse function of GAMMA.DIST?",
    "expectedAnswer": "GAMMA.INV"
  },
  "practice": {
    "instructions": "Find X for P=0.9, a=3, b=2.",
    "initialData": [
      [
        "P"
      ],
      [
        0.9
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "GAMMA.INV(0.9,3,2)",
    "expectedValue": 10.6446
  }
},
{
  "id": "gammaln",
  "title": "GAMMALN Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Natural Log of Gamma",
    "description": "Returns the natural logarithm of the gamma function, \u0393(x).",
    "concept": "Think of it as the large number handler: \"Calculate Gamma for huge numbers without the result exploding to infinity.\""
  },
  "whyItExists": "The Gamma function grows incredibly fast; taking the natural log allows mathematicians to work with the values on a manageable scale.",
  "whenToUse": "Use in complex probability density functions and when calculating factorials for very large numbers.",
  "realWorldUseCases": [
    "Used inside the formulas for other statistical distributions like Poisson or Binomial.",
    "Academic research involving large-scale factorials."
  ],
  "businessExample": {
    "scenario": "An academic researcher needs the natural log of the Gamma value for 4 for a complex probability model.",
    "formula": "=GAMMALN(4)"
  },
  "syntax": "=GAMMALN(x)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "The value for which you want to calculate GAMMALN."
    }
  ],
  "detailedExamples": [
    {
      "title": "Log-Gamma",
      "table": {
        "headers": [
          "X"
        ],
        "rows": [
          [
            "4"
          ]
        ]
      },
      "stepByStep": [
        "GAMMA(4) = 6.",
        "LN(6) = 1.7917.",
        "Result: 1.7917."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Positive X",
      "desc": "X must be a positive number."
    }
  ],
  "proTips": [
    "GAMMALN is often used to calculate large factorials: LN(n!) = GAMMALN(n+1)."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is LN(GAMMA(4)) approximately?",
    "expectedAnswer": "1.7917"
  },
  "practice": {
    "instructions": "Calculate GAMMALN for X=4.",
    "initialData": [
      [
        "X"
      ],
      [
        4
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "GAMMALN(4)",
    "expectedValue": 1.7917
  }
},
{
  "id": "gauss",
  "title": "GAUSS Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Gaussian Probability",
    "description": "Returns 0.5 less than the standard normal cumulative distribution.",
    "concept": "Think of it as the central area calculator: \"What is the probability of a value falling between the average and Z standard deviations?\""
  },
  "whyItExists": "It focuses on the distance from the center of the bell curve, rather than the area starting from the far left.",
  "whenToUse": "Use when you want to know the probability of being 'between' the mean and a specific point.",
  "realWorldUseCases": [
    "Calculating the chance of a measurement being within 1 standard deviation of the average.",
    "Analyzing data within the central part of a normal distribution."
  ],
  "businessExample": {
    "scenario": "An analyst wants the probability of a value falling between the mean and 2 standard deviations away.",
    "formula": "=GAUSS(2)"
  },
  "syntax": "=GAUSS(z)",
  "syntaxBreakdown": [
    {
      "arg": "z",
      "desc": "The number of standard deviations from the mean."
    }
  ],
  "detailedExamples": [
    {
      "title": "Central Prob",
      "table": {
        "headers": [
          "Z"
        ],
        "rows": [
          [
            "2"
          ]
        ]
      },
      "stepByStep": [
        "NORM.S.DIST(2, TRUE) = 0.9772.",
        "Subtract 0.5.",
        "Result: 0.4772."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Standard Normal",
      "desc": "GAUSS assumes a Mean of 0 and SD of 1. For other values, you must calculate Z manually."
    }
  ],
  "proTips": [
    "GAUSS(z) = NORM.S.DIST(z, TRUE) - 0.5."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "GAUSS(2) is NORM.S.DIST(2) minus what value?",
    "expectedAnswer": "0.5"
  },
  "practice": {
    "instructions": "Find GAUSS(2) in B2.",
    "initialData": [
      [
        "Z"
      ],
      [
        2
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "GAUSS(2)",
    "expectedValue": 0.4772
  }
},
{
  "id": "geomean",
  "title": "GEOMEAN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Geometric Mean",
    "description": "Returns the geometric mean of an array or range of positive data.",
    "concept": "Think of it as the compounding average: \"What is the average growth rate of my investment over several years?\""
  },
  "whyItExists": "Arithmetic means fail for percentages and growth rates because they don't account for compounding. GEOMEAN correctly averages ratios.",
  "whenToUse": "Use whenever you are averaging growth rates, interest rates, or investment returns.",
  "realWorldUseCases": [
    "Calculating the average annual growth rate (CAGR).",
    "Averaging population growth rates over decades."
  ],
  "businessExample": {
    "scenario": "An investor wants the average growth rate for a stock that grew by 10% then 20%.",
    "formula": "=GEOMEAN(1.1, 1.2)"
  },
  "syntax": "=GEOMEAN(number1, [number2], ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "The values for which you want to calculate the geometric mean."
    }
  ],
  "detailedExamples": [
    {
      "title": "Investment Growth",
      "table": {
        "headers": [
          "Year 1",
          "Year 2"
        ],
        "rows": [
          [
            "1.1",
            "1.2"
          ]
        ]
      },
      "stepByStep": [
        "Multiply values: 1.1 * 1.2 = 1.32.",
        "Take the square root (since there are 2 numbers).",
        "Result: 1.1489."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Negative Values",
      "desc": "All data points must be positive (> 0). You cannot have a negative geometric mean."
    }
  ],
  "proTips": [
    "The geometric mean is always less than or equal to the arithmetic mean."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Can GEOMEAN handle negative numbers?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Find the geometric mean of 1.1 and 1.2.",
    "initialData": [
      [
        "V1",
        "V2"
      ],
      [
        1.1,
        1.2
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      1
    ],
    "expectedFormula": "GEOMEAN(B2:B3)",
    "expectedValue": 1.1489
  }
},
{
  "id": "growth",
  "title": "GROWTH Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Exponential Growth Forecast",
    "description": "Calculates predicted exponential growth by using existing data.",
    "concept": "Think of it as the viral trend predictor: \"If my users are doubling every month, how many will I have in 6 months?\""
  },
  "whyItExists": "Many things in business (like virus spread or tech adoption) grow exponentially rather than in a straight line.",
  "whenToUse": "Use for forecasting when the rate of change increases as the base grows.",
  "realWorldUseCases": [
    "Predicting startup user growth.",
    "Forecasting compound interest accumulation."
  ],
  "businessExample": {
    "scenario": "A marketing lead forecasts month 3 users based on month 1 (100) and month 2 (200).",
    "formula": "=GROWTH(B2:B3, A2:A3, 3)"
  },
  "syntax": "=GROWTH(known_y, [known_x], [new_x])",
  "syntaxBreakdown": [
    {
      "arg": "known_y",
      "desc": "Dependent data points (e.g., users)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Exponential Trend",
      "table": {
        "headers": [
          "M",
          "U"
        ],
        "rows": [
          [
            "1",
            "100"
          ],
          [
            "2",
            "200"
          ]
        ]
      },
      "stepByStep": [
        "Users are doubling (2x).",
        "Apply trend to month 3.",
        "Result: 400."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Wrong Model",
      "desc": "Do not use GROWTH for things that follow a straight line (use FORECAST instead)."
    }
  ],
  "proTips": [
    "GROWTH is the exponential equivalent of the linear TREND function."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does GROWTH use linear or exponential regression?",
    "expectedAnswer": "exponential"
  },
  "practice": {
    "instructions": "Predict month 3 users (A2:A3 is X, B2:B3 is Y).",
    "initialData": [
      [
        "M",
        "U"
      ],
      [
        1,
        100
      ],
      [
        2,
        200
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GROWTH(B2:B3,A2:A3,3)",
    "expectedValue": 400
  }
},
{
  "id": "harmean",
  "title": "HARMEAN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Harmonic Mean",
    "description": "Returns the harmonic mean of a dataset.",
    "concept": "Think of it as the rate average: \"What is the average speed of a trip if I go 40mph one way and 60mph back?\""
  },
  "whyItExists": "Standard averages (Arithmetic) fail when averaging rates (like speed or price-to-earnings ratios) because they weight the higher value too much.",
  "whenToUse": "Use when averaging rates or ratios, specifically when those rates are applied over equal distances or quantities.",
  "realWorldUseCases": [
    "Calculating average travel speed.",
    "Averaging P/E ratios in finance."
  ],
  "businessExample": {
    "scenario": "An analyst averages speeds of 40mph and 60mph.",
    "formula": "=HARMEAN(40, 60)"
  },
  "syntax": "=HARMEAN(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Positive values to average."
    }
  ],
  "detailedExamples": [
    {
      "title": "Speed Test",
      "table": {
        "headers": [
          "S1",
          "S2"
        ],
        "rows": [
          [
            "40",
            "60"
          ]
        ]
      },
      "stepByStep": [
        "Calculate reciprocals: 1/40 + 1/60 = 0.0416.",
        "Divide count (2) by sum of reciprocals.",
        "Result: 48."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Zero/Negative",
      "desc": "All values must be positive (> 0)."
    }
  ],
  "proTips": [
    "The Harmonic Mean is always the smallest of the three means (AM > GM > HM)."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the harmonic mean of 40 and 60?",
    "expectedAnswer": "48"
  },
  "practice": {
    "instructions": "Find harmonic mean of 40 and 60.",
    "initialData": [
      [
        "S1",
        "S2"
      ],
      [
        40,
        60
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      1
    ],
    "expectedFormula": "HARMEAN(B2:B3)",
    "expectedValue": 48
  }
},
{
  "id": "hypgeom.dist",
  "title": "HYPGEOM.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Hypergeometric Distribution",
    "description": "Returns the hypergeometric distribution.",
    "concept": "Think of it as the sampling without replacement: \"If I pull 5 cards from a deck, what's the chance of getting 2 Aces?\""
  },
  "whyItExists": "Unlike Binomial, Hypergeometric assumes the probability changes each time you take a sample because you aren't putting the item back.",
  "whenToUse": "Use for quality control in small batches or any 'draw' without replacement.",
  "realWorldUseCases": [
    "Selecting marbles from a jar.",
    "Auditing a small set of files for errors."
  ],
  "businessExample": {
    "scenario": "A manager pulls 10 files (sample) from a pile of 100 (pop). If 5 in the pile are wrong (pop_s), what's the chance 1 in the sample is wrong?",
    "formula": "=HYPGEOM.DIST(1, 10, 5, 100, FALSE)"
  },
  "syntax": "=HYPGEOM.DIST(sample_s, number_sample, population_s, number_pop, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "sample_s",
      "desc": "Successes in sample."
    },
    {
      "arg": "number_sample",
      "desc": "Sample size."
    }
  ],
  "detailedExamples": [
    {
      "title": "File Audit",
      "table": {
        "headers": [
          "s",
          "n",
          "S",
          "N"
        ],
        "rows": [
          [
            "1",
            "10",
            "5",
            "100"
          ]
        ]
      },
      "stepByStep": [
        "Sample 10, target 1 success.",
        "Pop 100, total 5 successes.",
        "Result: 0.3391."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Sample > Pop",
      "desc": "Sample size cannot be larger than the population size."
    }
  ],
  "proTips": [
    "If the population is very large, this behaves like BINOM.DIST."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Is Hypergeometric used for sampling with or without replacement?",
    "expectedAnswer": "without replacement"
  },
  "practice": {
    "instructions": "Find prob of 1 success in sample of 10 (Pop=100, Pop_s=5).",
    "initialData": [
      [
        "s"
      ],
      [
        1
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "HYPGEOM.DIST(1,10,5,100,FALSE)",
    "expectedValue": 0.3391
  }
},
{
  "id": "intercept",
  "title": "INTERCEPT Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Y-Axis Intercept",
    "description": "Calculates the point at which a line will intersect the y-axis by using existing x-values and y-values.",
    "concept": "Think of it as the starting point: \"What is the value of Y when X is exactly zero?\""
  },
  "whyItExists": "It defines the 'base' or 'fixed' component of a linear model, such as fixed costs in business.",
  "whenToUse": "Use when creating a linear regression equation (y = mx + b), where INTERCEPT is 'b'.",
  "realWorldUseCases": [
    "Calculating fixed monthly costs in a production model.",
    "Finding the starting temperature in a heating experiment."
  ],
  "businessExample": {
    "scenario": "A business finds its fixed costs by seeing what spending is when sales (X) are 0.",
    "formula": "=INTERCEPT(B2:B3, A2:A3)"
  },
  "syntax": "=INTERCEPT(known_y, known_x)",
  "syntaxBreakdown": [
    {
      "arg": "known_y",
      "desc": "Dependent data."
    },
    {
      "arg": "known_x",
      "desc": "Independent data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Fixed Cost",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "10"
          ],
          [
            "2",
            "15"
          ]
        ]
      },
      "stepByStep": [
        "For every +1 X, Y goes +5 (Slope).",
        "If we go back 1 step from X=1 to X=0, Y goes down 5.",
        "10 - 5 = 5. Result: 5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Empty/Text",
      "desc": "Cells with text or blanks are ignored, but if arrays have different sizes, it returns an error."
    }
  ],
  "proTips": [
    "Pairs perfectly with the SLOPE function."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "In y = mx + b, which letter is the INTERCEPT?",
    "expectedAnswer": "b"
  },
  "practice": {
    "instructions": "Find intercept for B2:B3 (Y) and A2:A3 (X).",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        10
      ],
      [
        2,
        15
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "INTERCEPT(B2:B3,A2:A3)",
    "expectedValue": 5
  }
},
{
  "id": "kurt",
  "title": "KURT Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Kurtosis",
    "description": "Returns the kurtosis of a dataset.",
    "concept": "Think of it as the tail thickness: \"Does my data have frequent extreme outliers compared to a normal distribution?\""
  },
  "whyItExists": "It helps identify 'tail risk'. High kurtosis means you are more likely to have extreme, unexpected events.",
  "whenToUse": "Use when analyzing risk in financial markets or quality control to see if 'outliers' are common.",
  "realWorldUseCases": [
    "Analyzing stock market returns for 'black swan' events.",
    "Checking if manufacturing errors are clustered or sparse."
  ],
  "businessExample": {
    "scenario": "An analyst checks if a dataset has frequent outliers.",
    "formula": "=KURT(B2:B5)"
  },
  "syntax": "=KURT(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Range of data points (at least 4)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Peak Test",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "1"
          ],
          [
            "1"
          ],
          [
            "10"
          ]
        ]
      },
      "stepByStep": [
        "Most data is 1, one is 10 (extreme outlier).",
        "Calculate kurtosis.",
        "Result: 4.0."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Points",
      "desc": "KURT requires at least 4 data points; otherwise, it returns #DIV/0!."
    }
  ],
  "proTips": [
    "0 = Normal distribution; Positive = heavy tails; Negative = light tails."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What kurtosis value represents a normal distribution?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Find kurtosis for B2:B5.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        1
      ],
      [
        1
      ],
      [
        10
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      5,
      1
    ],
    "expectedFormula": "KURT(B2:B5)",
    "expectedValue": 4
  }
},
{
  "id": "large",
  "title": "LARGE Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Kth Largest Value",
    "description": "Returns the k-th largest value in a dataset.",
    "concept": "Think of it as the ranking finder: \"Who got the 2nd highest score?\""
  },
  "whyItExists": "It allows you to extract top performers or high values without sorting the entire list.",
  "whenToUse": "Use to create 'Top 5' lists or leaderboards in dashboards.",
  "realWorldUseCases": [
    "Finding the 3rd highest sales total.",
    "Extracting the runner-up in a competition."
  ],
  "businessExample": {
    "scenario": "A manager wants the 2nd highest score from a list of 3.",
    "formula": "=LARGE(B2:B4, 2)"
  },
  "syntax": "=LARGE(array, k)",
  "syntaxBreakdown": [
    {
      "arg": "array",
      "desc": "The range of data."
    },
    {
      "arg": "k",
      "desc": "The position (rank) to return."
    }
  ],
  "detailedExamples": [
    {
      "title": "Top Rank",
      "table": {
        "headers": [
          "Score"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "20"
          ],
          [
            "30"
          ]
        ]
      },
      "stepByStep": [
        "Data sorted: 30, 20, 10.",
        "Position k=2 requested.",
        "Result: 20."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "K out of bounds",
      "desc": "K cannot be larger than the number of data points."
    }
  ],
  "proTips": [
    "Use SMALL to find the k-th lowest values."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "If k=1, LARGE is the same as which other function?",
    "expectedAnswer": "MAX"
  },
  "practice": {
    "instructions": "Find 2nd largest value in B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        20
      ],
      [
        30
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "LARGE(B2:B4,2)",
    "expectedValue": 20
  }
},
{
  "id": "linest",
  "title": "LINEST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Linear Regression Stats",
    "description": "Calculates the statistics for a line by using the 'least squares' method.",
    "concept": "Think of it as the regression engine: \"Give me the slope, intercept, and accuracy stats for my trendline.\""
  },
  "whyItExists": "It is the most powerful tool for multivariate regression analysis in Excel.",
  "whenToUse": "Use when you need the mathematical parameters (Slope and Intercept) to build a predictive model.",
  "realWorldUseCases": [
    "Calculating price elasticity.",
    "Modeling the impact of multiple ad channels on sales."
  ],
  "businessExample": {
    "scenario": "An analyst gets the slope and intercept for a trend {2, 4} over time {1, 2}.",
    "formula": "=LINEST(B2:B3, A2:A3)"
  },
  "syntax": "=LINEST(known_y, [known_x])",
  "syntaxBreakdown": [
    {
      "arg": "known_y",
      "desc": "Dependent set."
    }
  ],
  "detailedExamples": [
    {
      "title": "Model Building",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "2"
          ],
          [
            "2",
            "4"
          ]
        ]
      },
      "stepByStep": [
        "Slope is 2, Intercept is 0.",
        "Returns an array {2, 0}.",
        "Result: 2."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Array Formula",
      "desc": "LINEST returns multiple values; in old Excel, you must select cells and press Ctrl+Shift+Enter."
    }
  ],
  "proTips": [
    "The first value returned is the Slope, the second is the Intercept."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does LINEST return one value or multiple values?",
    "expectedAnswer": "multiple values"
  },
  "practice": {
    "instructions": "Get first result of LINEST for B2:B3 (Y) and A2:A3 (X).",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        2
      ],
      [
        2,
        4
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LINEST(B2:B3,A2:A3)",
    "expectedValue": 2
  }
},
{
  "id": "logest",
  "title": "LOGEST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Exponential Regression Stats",
    "description": "Calculates the statistics for an exponential curve that fits your data.",
    "concept": "Think of it as the growth engine: \"Find the growth factor for a viral trend.\""
  },
  "whyItExists": "It is used to find the parameters of exponential growth, common in finance and biology.",
  "whenToUse": "Use when your data points follow a curve where values double or triple at regular intervals.",
  "realWorldUseCases": [
    "Estimating population growth rates.",
    "Analyzing the viral growth of a social media platform."
  ],
  "businessExample": {
    "scenario": "An analyst finds the growth factor for values that double (100 to 200).",
    "formula": "=LOGEST(B2:B3, A2:A3)"
  },
  "syntax": "=LOGEST(known_y, [known_x])",
  "syntaxBreakdown": [
    {
      "arg": "known_y",
      "desc": "Dependent data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Growth Model",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "100"
          ],
          [
            "2",
            "200"
          ]
        ]
      },
      "stepByStep": [
        "Growth factor is 2, base is 50 (y=50*2^x).",
        "Returns {2, 50}.",
        "Result: 2."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Y Values",
      "desc": "Y values must be positive (> 0) because you cannot take the log of a non-positive number."
    }
  ],
  "proTips": [
    "Pairs well with the GROWTH function."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "In y = b * m^x, which value does the first part of LOGEST return?",
    "expectedAnswer": "m"
  },
  "practice": {
    "instructions": "Get first result of LOGEST for B2:B3 (Y) and A2:A3 (X).",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        100
      ],
      [
        2,
        200
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LOGEST(B2:B3,A2:A3)",
    "expectedValue": 2
  }
},
{
  "id": "lognorm.dist",
  "title": "LOGNORM.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Log-Normal Distribution",
    "description": "Returns the log-normal distribution of x.",
    "concept": "Think of it as the skewed bell curve: \"Model data that can't be negative, like stock prices or wealth.\""
  },
  "whyItExists": "Many real-world variables aren't symmetric; they are 'skewed' with a long tail on the right. Log-normal models this perfectly.",
  "whenToUse": "Use in finance for option pricing or in biology to model size distributions.",
  "realWorldUseCases": [
    "Modeling the distribution of house prices.",
    "Analyzing stock price changes."
  ],
  "businessExample": {
    "scenario": "An analyst wants the cumulative log-normal prob for X=4 (Mean=3.5, SD=1.2).",
    "formula": "=LOGNORM.DIST(4, 3.5, 1.2, TRUE)"
  },
  "syntax": "=LOGNORM.DIST(x, mean, standard_dev, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "Value to evaluate."
    }
  ],
  "detailedExamples": [
    {
      "title": "Stock Model",
      "table": {
        "headers": [
          "X",
          "M",
          "SD"
        ],
        "rows": [
          [
            "4",
            "3.5",
            "1.2"
          ]
        ]
      },
      "stepByStep": [
        "Take LN(X).",
        "Compare to Normal Dist with M and SD.",
        "Result: 0.0385."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "X > 0",
      "desc": "X must be positive; log-normal distributions do not exist for zero or negative numbers."
    }
  ],
  "proTips": [
    "The log of the variable follows a normal distribution."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Can X be 0 in LOGNORM.DIST?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Find cumulative log-normal prob for (4, 3.5, 1.2).",
    "initialData": [
      [
        "X"
      ],
      [
        4
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "LOGNORM.DIST(4,3.5,1.2,TRUE)",
    "expectedValue": 0.0385
  }
},
{
  "id": "lognorm.inv",
  "title": "LOGNORM.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse Log-Normal",
    "description": "Returns the inverse of the log-normal cumulative distribution.",
    "concept": "Think of it as the threshold finder: \"What asset price covers 95% of expected outcomes?\""
  },
  "whyItExists": "It allows you to find cutoffs and confidence intervals for skewed data.",
  "whenToUse": "Use to determine price targets or size limits in log-normal populations.",
  "realWorldUseCases": [
    "Determining the 99th percentile of income.",
    "Finding the price of a stock at a specific probability."
  ],
  "businessExample": {
    "scenario": "An analyst wants the price cutoff for the top 5% (0.95 prob) of outcomes.",
    "formula": "=LOGNORM.INV(0.95, 3.5, 1.2)"
  },
  "syntax": "=LOGNORM.INV(probability, mean, standard_dev)",
  "syntaxBreakdown": [
    {
      "arg": "probability",
      "desc": "Target probability (0 to 1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Price Target",
      "table": {
        "headers": [
          "P",
          "M",
          "SD"
        ],
        "rows": [
          [
            "0.95",
            "3.5",
            "1.2"
          ]
        ]
      },
      "stepByStep": [
        "P=0.95, M=3.5, SD=1.2.",
        "Inverse lookup.",
        "Result: 238.5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Probability",
      "desc": "Ensure the probability is between 0 and 1."
    }
  ],
  "proTips": [
    "Inverse of LOGNORM.DIST."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Inverse function of LOGNORM.DIST?",
    "expectedAnswer": "LOGNORM.INV"
  },
  "practice": {
    "instructions": "Find X for P=0.95, m=3.5, sd=1.2.",
    "initialData": [
      [
        "P"
      ],
      [
        0.95
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "LOGNORM.INV(0.95,3.5,1.2)",
    "expectedValue": 238.5
  }
},
{
  "id": "max",
  "title": "MAX Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Maximum Value",
    "description": "Returns the largest value in a set of values.",
    "concept": "Think of it as the ceiling finder: \"What is the highest number in this list?\""
  },
  "whyItExists": "It is the simplest way to identify peak performance, highest costs, or top scores.",
  "whenToUse": "Use whenever you need to find the absolute high point in a range of numeric data.",
  "realWorldUseCases": [
    "Finding the highest sale of the month.",
    "Identifying the maximum temperature in a week."
  ],
  "businessExample": {
    "scenario": "A manager needs to find the highest revenue day from a list of scores.",
    "formula": "=MAX(B2:B3)"
  },
  "syntax": "=MAX(number1, [number2], ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Numbers or ranges to search."
    }
  ],
  "detailedExamples": [
    {
      "title": "Peak Revenue",
      "table": {
        "headers": [
          "Score"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "50"
          ]
        ]
      },
      "stepByStep": [
        "Compare 10 and 50.",
        "Result: 50."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Text",
      "desc": "MAX ignores text and logical values. If you need to include them, use MAXA."
    }
  ],
  "proTips": [
    "Pairs well with MIN."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the MAX of -5 and -10?",
    "expectedAnswer": "-5"
  },
  "practice": {
    "instructions": "Find the maximum value in B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        50
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MAX(B2:B3)",
    "expectedValue": 50
  }
},
{
  "id": "maxa",
  "title": "MAXA Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Inclusive Maximum",
    "description": "Returns the largest value in a set of values, including text and logical values (TRUE=1, FALSE=0).",
    "concept": "Think of it as the comprehensive ceiling: \"Find the highest value, counting 'TRUE' as 1 and text as 0.\""
  },
  "whyItExists": "It is useful when your data contains indicators like 'TRUE/FALSE' that you want to compare against numeric thresholds.",
  "whenToUse": "Use when text (0) and TRUE (1) should be considered in the comparison.",
  "realWorldUseCases": [
    "Comparing numeric scores against a 'TRUE' flag (1).",
    "Analyzing mixed data where text should count as zero."
  ],
  "businessExample": {
    "scenario": "An analyst compares a score of 0.5 against a 'TRUE' flag (1).",
    "formula": "=MAXA(0.5, TRUE)"
  },
  "syntax": "=MAXA(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Values or ranges to evaluate."
    }
  ],
  "detailedExamples": [
    {
      "title": "Inclusive Peak",
      "table": {
        "headers": [
          "V1",
          "V2"
        ],
        "rows": [
          [
            "0.5",
            "TRUE"
          ]
        ]
      },
      "stepByStep": [
        "TRUE is treated as 1.",
        "Compare 0.5 and 1.",
        "Result: 1."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Text as Zero",
      "desc": "MAXA treats text as 0. If all numbers are negative, MAXA might return 0 if text exists!"
    }
  ],
  "proTips": [
    "Use MAX if you only care about numbers."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "In MAXA, what numeric value is assigned to text?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Find MAXA for 0.5 (B2) and TRUE (B3).",
    "initialData": [
      [
        "V"
      ],
      [
        0.5
      ],
      [
        "TRUE"
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MAXA(B2:B3)",
    "expectedValue": 1
  }
},
{
  "id": "median",
  "title": "MEDIAN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Middle Value",
    "description": "Returns the median, or the middle number, of the given numbers.",
    "concept": "Think of it as the midpoint: \"Half the values are higher than this, and half are lower.\""
  },
  "whyItExists": "It is much more 'robust' than AVERAGE because it isn't skewed by extreme outliers (like a billionaire moving into a neighborhood).",
  "whenToUse": "Use for income, house prices, or any data with extreme 'long tails'.",
  "realWorldUseCases": [
    "Calculating median household income.",
    "Finding the middle price of a house in a city."
  ],
  "businessExample": {
    "scenario": "An analyst finds the middle value in a skewed dataset {1, 10, 100}.",
    "formula": "=MEDIAN(B2:B4)"
  },
  "syntax": "=MEDIAN(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Data points to find the middle of."
    }
  ],
  "detailedExamples": [
    {
      "title": "Middle Ground",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "10"
          ],
          [
            "100"
          ]
        ]
      },
      "stepByStep": [
        "Sort: 1, 10, 100.",
        "Middle is 10.",
        "Result: 10."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Even Counts",
      "desc": "If there's an even number of data points, MEDIAN averages the middle TWO numbers."
    }
  ],
  "proTips": [
    "If AVERAGE and MEDIAN are very different, your data is skewed."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the median of 1, 2, 3, 4?",
    "expectedAnswer": "2.5"
  },
  "practice": {
    "instructions": "Find the median of B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        10
      ],
      [
        100
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "MEDIAN(B2:B4)",
    "expectedValue": 10
  }
},
{
  "id": "min",
  "title": "MIN Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Minimum Value",
    "description": "Returns the smallest value in a set of values.",
    "concept": "Think of it as the floor finder: \"What is the lowest number in this list?\""
  },
  "whyItExists": "Essential for identifying low points, minimum costs, or lowest scores.",
  "whenToUse": "Use to find the absolute low point in a numeric range.",
  "realWorldUseCases": [
    "Finding the lowest production cost.",
    "Identifying the minimum temperature of the day."
  ],
  "businessExample": {
    "scenario": "A manager needs the lowest sales day revenue.",
    "formula": "=MIN(B2:B3)"
  },
  "syntax": "=MIN(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Numbers or ranges to search."
    }
  ],
  "detailedExamples": [
    {
      "title": "Floor Search",
      "table": {
        "headers": [
          "Score"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "50"
          ]
        ]
      },
      "stepByStep": [
        "Compare 10 and 50.",
        "Result: 10."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Zeros",
      "desc": "MIN will return 0 if it exists in the data. If you want to ignore 0, use MINIFS."
    }
  ],
  "proTips": [
    "Use with MAX to find the range of your data."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the MIN of 0, 5, 10?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Find the minimum value in B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        50
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MIN(B2:B3)",
    "expectedValue": 10
  }
},
{
  "id": "mina",
  "title": "MINA Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Inclusive Minimum",
    "description": "Returns the smallest value in a set of values, including text and logical values (TRUE=1, FALSE=0).",
    "concept": "Think of it as the comprehensive floor: \"Find the lowest value, counting 'FALSE' as 0 and text as 0.\""
  },
  "whyItExists": "Useful when comparing numeric data against flags; it ensures text and FALSE are treated as zero.",
  "whenToUse": "Use when you want to treat text or FALSE as the lowest possible boundary (0).",
  "realWorldUseCases": [
    "Finding the minimum score where 'Incomplete' (text) should count as 0.",
    "Comparing scores against a FALSE flag (0)."
  ],
  "businessExample": {
    "scenario": "An analyst compares a score of 10 against a 'FALSE' flag.",
    "formula": "=MINA(10, FALSE)"
  },
  "syntax": "=MINA(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Values or ranges to evaluate."
    }
  ],
  "detailedExamples": [
    {
      "title": "Inclusive Floor",
      "table": {
        "headers": [
          "V1",
          "V2"
        ],
        "rows": [
          [
            "10",
            "FALSE"
          ]
        ]
      },
      "stepByStep": [
        "FALSE is treated as 0.",
        "Compare 10 and 0.",
        "Result: 0."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Hidden Zeros",
      "desc": "Since text is 0, MINA will almost always return 0 if any text exists in a range of positive numbers."
    }
  ],
  "proTips": [
    "Use MIN if you want to ignore text."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What value does MINA assign to FALSE?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Find MINA for 10 (B2) and FALSE (B3).",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        "FALSE"
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MINA(B2:B3)",
    "expectedValue": 0
  }
},
{
  "id": "mode.mult",
  "title": "MODE.MULT Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Multiple Modes",
    "description": "Returns a vertical array of the most frequently occurring values in a dataset.",
    "concept": "Think of it as the popularity tie-breaker: \"What if TWO values both appear most often? Give me both.\""
  },
  "whyItExists": "Standard MODE functions only return one value. If your data has two peaks (bimodal), you need MODE.MULT to see both.",
  "whenToUse": "Use when analyzing distributions where multiple 'most common' values are expected.",
  "realWorldUseCases": [
    "Analyzing common clothing sizes sold where both Medium and Large are equally popular.",
    "Identifying multiple peak hours in traffic data."
  ],
  "businessExample": {
    "scenario": "A shop owner finds the most popular prices {1, 1, 2, 2, 3}.",
    "formula": "=MODE.MULT(B2:B6)"
  },
  "syntax": "=MODE.MULT(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Data to analyze."
    }
  ],
  "detailedExamples": [
    {
      "title": "Bimodal Data",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "1"
          ],
          [
            "2"
          ],
          [
            "2"
          ],
          [
            "3"
          ]
        ]
      },
      "stepByStep": [
        "Count frequencies: 1 appears twice, 2 appears twice.",
        "They tie for first place.",
        "Result: {1, 2}."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Array Spilling",
      "desc": "In modern Excel, it returns multiple cells. In old Excel, you must enter as an array formula."
    }
  ],
  "proTips": [
    "If there are no duplicates, it returns #N/A."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does MODE.MULT return one value or many?",
    "expectedAnswer": "many"
  },
  "practice": {
    "instructions": "Find modes for {1,1,2,2,3} in B2:B6.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        1
      ],
      [
        2
      ],
      [
        2
      ],
      [
        3
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      6,
      1
    ],
    "expectedFormula": "MODE.MULT(B2:B6)",
    "expectedValue": 1
  }
},
{
  "id": "mode.sngl",
  "title": "MODE.SNGL Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Most Frequent Value",
    "description": "Returns the most frequently occurring value in a dataset.",
    "concept": "Think of it as the popularity contest: \"Which single number appears most often?\""
  },
  "whyItExists": "It identifies the most 'popular' or common item, which is useful for inventory and category analysis.",
  "whenToUse": "Use to find the single most common price point, score, or measurement.",
  "realWorldUseCases": [
    "Finding the best-selling product price.",
    "Identifying the most common shoe size in a shipment."
  ],
  "businessExample": {
    "scenario": "A manager finds the most common score from {5, 5, 10}.",
    "formula": "=MODE.SNGL(B2:B4)"
  },
  "syntax": "=MODE.SNGL(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Data to analyze."
    }
  ],
  "detailedExamples": [
    {
      "title": "Commonality",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "5"
          ],
          [
            "5"
          ],
          [
            "10"
          ]
        ]
      },
      "stepByStep": [
        "Count: 5 appears twice, 10 appears once.",
        "5 is most frequent.",
        "Result: 5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "No Duplicates",
      "desc": "If no value appears more than once, MODE.SNGL returns #N/A."
    }
  ],
  "proTips": [
    "Replaces the old MODE function for better precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What error is returned if no values repeat?",
    "expectedAnswer": "#N/A"
  },
  "practice": {
    "instructions": "Find the most common value in B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        5
      ],
      [
        5
      ],
      [
        10
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "MODE.SNGL(B2:B4)",
    "expectedValue": 5
  }
},
{
  "id": "negbinom.dist",
  "title": "NEGBINOM.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Negative Binomial",
    "description": "Returns the negative binomial distribution probability.",
    "concept": "Think of it as the failure tracker: \"What's the probability I fail 5 times before I finally get my 3rd success?\""
  },
  "whyItExists": "It models the number of failures before a target success goal is reached, which is vital for reliability testing.",
  "whenToUse": "Use when the number of successes is fixed, and you are measuring the probability of the number of trials needed.",
  "realWorldUseCases": [
    "Predicting how many calls a salesperson must make to get 5 sales.",
    "Modeling how many defective parts appear before the 10th good part."
  ],
  "businessExample": {
    "scenario": "A recruiter wants to know the probability of 5 rejections (failures) before getting 3 hires (successes), with a 50% hire rate.",
    "formula": "=NEGBINOM.DIST(5, 3, 0.5, FALSE)"
  },
  "syntax": "=NEGBINOM.DIST(number_f, number_s, probability_s, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "number_f",
      "desc": "Number of failures."
    },
    {
      "arg": "number_s",
      "desc": "Target number of successes."
    }
  ],
  "detailedExamples": [
    {
      "title": "Hiring Logic",
      "table": {
        "headers": [
          "F",
          "S",
          "P"
        ],
        "rows": [
          [
            "5",
            "3",
            "0.5"
          ]
        ]
      },
      "stepByStep": [
        "F=5, S=3, P=0.5.",
        "Calculate probability of exactly 5 failures.",
        "Result: 0.1094."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Interpretation",
      "desc": "Unlike Binomial (fixed trials), Negative Binomial has a fixed number of successes."
    }
  ],
  "proTips": [
    "Use cumulative=TRUE for 'at most' X failures."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does NEGBINOM.DIST fix the number of successes or trials?",
    "expectedAnswer": "successes"
  },
  "practice": {
    "instructions": "Find prob of exactly 5 failures for 3 successes at 0.5 prob.",
    "initialData": [
      [
        "F"
      ],
      [
        5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "NEGBINOM.DIST(5,3,0.5,FALSE)",
    "expectedValue": 0.1094
  }
},
{
  "id": "norm.dist",
  "title": "NORM.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Normal Dist",
    "description": "Probability for bell curve.",
    "concept": "Think of it as the bell-curve tool: \"Prob value <= X?\""
  },
  "whyItExists": "Fundamental for working with the 'Bell Curve'.",
  "whenToUse": "Height, IQ, or score probabilities.",
  "realWorldUseCases": [
    "Percentile rank.",
    "Defective part prob."
  ],
  "businessExample": {
    "scenario": "Rank student scoring 85 (Mean 70, SD 10).",
    "formula": "=NORM.DIST(85, 70, 10, TRUE)"
  },
  "syntax": "=NORM.DIST(x, m, sd, c)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "Value."
    }
  ],
  "detailedExamples": [
    {
      "title": "Percentile",
      "table": {
        "headers": [
          "S"
        ],
        "rows": [
          [
            "85"
          ]
        ]
      },
      "stepByStep": [
        "z=(85-70)/10=1.5.",
        "Result: 0.9332."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "SD",
      "desc": "Must be positive."
    }
  ],
  "proTips": [
    "TRUE for cumulative area."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Result if X=Mean and c=TRUE?",
    "expectedAnswer": "0.5"
  },
  "practice": {
    "instructions": "Calc NORM.DIST (85, 70, 10, TRUE).",
    "initialData": [
      [
        "X"
      ],
      [
        85
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "NORM.DIST(85,70,10,TRUE)",
    "expectedValue": 0.9332
  }
},
{
  "id": "norm.inv",
  "title": "NORM.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse Normal",
    "description": "Returns the inverse of the normal cumulative distribution for the specified mean and standard deviation.",
    "concept": "Think of it as the cutoff solver: \"What score do I need to be in the top 10%?\""
  },
  "whyItExists": "It allows you to find cutoffs and thresholds for any normally distributed population.",
  "whenToUse": "Use to determine performance tiers, grade boundaries, or quality control limits.",
  "realWorldUseCases": [
    "Finding the IQ score for the top 2% of the population.",
    "Setting a weight limit that only 1% of packages will exceed."
  ],
  "businessExample": {
    "scenario": "A teacher wants the cutoff score for the 90th percentile (Mean 70, SD 10).",
    "formula": "=NORM.INV(0.9, 70, 10)"
  },
  "syntax": "=NORM.INV(probability, mean, standard_dev)",
  "syntaxBreakdown": [
    {
      "arg": "probability",
      "desc": "Area to the left (0 to 1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Cutoff Search",
      "table": {
        "headers": [
          "P",
          "M",
          "SD"
        ],
        "rows": [
          [
            "0.9",
            "70",
            "10"
          ]
        ]
      },
      "stepByStep": [
        "P=0.9.",
        "Inverse lookup on bell curve.",
        "Result: 82.8155."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "P-Value",
      "desc": "Ensure the probability is the total area to the LEFT. For 'Top 10%', use 0.9."
    }
  ],
  "proTips": [
    "Inverse of NORM.DIST."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What score is the 50th percentile (Mean 70, SD 10)?",
    "expectedAnswer": "70"
  },
  "practice": {
    "instructions": "Find score for 90th percentile (Mean 70, SD 10).",
    "initialData": [
      [
        "P"
      ],
      [
        0.9
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "NORM.INV(0.9,70,10)",
    "expectedValue": 82.8155
  }
},
{
  "id": "norm.s.dist",
  "title": "NORM.S.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Standard Normal Dist",
    "description": "Returns the standard normal cumulative distribution (mean 0, SD 1).",
    "concept": "Think of it as the z-table tool: \"What is the probability area for a Z-score of 1.5?\""
  },
  "whyItExists": "It is the 'standard' bell curve tool that everyone in stats uses to lookup Z-values without a paper table.",
  "whenToUse": "Use when you already have a Z-score and want to find its percentile.",
  "realWorldUseCases": [
    "Converting a Z-score to a p-value.",
    "Analyzing any data that has been 'standardized'."
  ],
  "businessExample": {
    "scenario": "An analyst looks up the probability for a Z-score of 1.5.",
    "formula": "=NORM.S.DIST(1.5, TRUE)"
  },
  "syntax": "=NORM.S.DIST(z, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "z",
      "desc": "The Z-score (standard deviations from mean)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Z-Lookup",
      "table": {
        "headers": [
          "Z"
        ],
        "rows": [
          [
            "1.5"
          ]
        ]
      },
      "stepByStep": [
        "Input Z=1.5.",
        "Calculate cumulative area.",
        "Result: 0.9332."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Cumulative",
      "desc": "Always use TRUE for probability area."
    }
  ],
  "proTips": [
    "NORM.S.DIST(z) is the same as NORM.DIST(z, 0, 1, TRUE)."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the Mean of a 'Standard' Normal distribution?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Find prob for Z=1.5.",
    "initialData": [
      [
        "Z"
      ],
      [
        1.5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "NORM.S.DIST(1.5,TRUE)",
    "expectedValue": 0.9332
  }
},
{
  "id": "norm.s.inv",
  "title": "NORM.S.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse Standard Normal",
    "description": "Returns the inverse of the standard normal cumulative distribution.",
    "concept": "Think of it as the z-score finder: \"What Z-score corresponds to the top 5%?\""
  },
  "whyItExists": "It allows you to find the number of standard deviations needed to cover a specific percentage of data.",
  "whenToUse": "Use to find Z-critical values for hypothesis testing and confidence intervals.",
  "realWorldUseCases": [
    "Finding the Z-score for a 95% confidence interval (1.96).",
    "Determining how many SDs away the 99th percentile lies."
  ],
  "businessExample": {
    "scenario": "An analyst finds the Z-score for a 97.5% (0.975) cumulative probability.",
    "formula": "=NORM.S.INV(0.975)"
  },
  "syntax": "=NORM.S.INV(probability)",
  "syntaxBreakdown": [
    {
      "arg": "probability",
      "desc": "Probability (0 to 1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Z-Critical",
      "table": {
        "headers": [
          "P"
        ],
        "rows": [
          [
            "0.975"
          ]
        ]
      },
      "stepByStep": [
        "P=0.975.",
        "Inverse lookup.",
        "Result: 1.96."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Range",
      "desc": "Probability must be between 0 and 1."
    }
  ],
  "proTips": [
    "Used to calculate confidence intervals: Mean +/- (Z * SD)."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the approximate Z-score for a 97.5% probability?",
    "expectedAnswer": "1.96"
  },
  "practice": {
    "instructions": "Find Z-score for P=0.975.",
    "initialData": [
      [
        "P"
      ],
      [
        0.975
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "NORM.S.INV(0.975)",
    "expectedValue": 1.96
  }
},
{
  "id": "pearson",
  "title": "PEARSON Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Pearson correlation",
    "description": "Returns the Pearson product-moment correlation coefficient, r.",
    "concept": "Think of it as the linear link: \"How tightly do these two variables stick to a straight line?\""
  },
  "whyItExists": "It is the standard way to measure linear correlation between two variables.",
  "whenToUse": "Use to quantify the strength of a relationship, identical in result to CORREL.",
  "realWorldUseCases": [
    "Correlating height and weight.",
    "Analyzing relationship between ad spend and sales."
  ],
  "businessExample": {
    "scenario": "An analyst checks the linear link between X {1, 2} and Y {2, 4}.",
    "formula": "=PEARSON(B2:B3, C2:C3)"
  },
  "syntax": "=PEARSON(array1, array2)",
  "syntaxBreakdown": [
    {
      "arg": "array1",
      "desc": "First set of data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Link Test",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "2"
          ],
          [
            "2",
            "4"
          ]
        ]
      },
      "stepByStep": [
        "As X doubles, Y doubles.",
        "Perfect linear link.",
        "Result: 1.0."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Non-linear",
      "desc": "Pearson only detects STRAIGHT line relationships."
    }
  ],
  "proTips": [
    "Interchangeable with the CORREL function."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Is PEARSON same as CORREL?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Find Pearson correlation for B2:B3 and C2:C3.",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        2
      ],
      [
        2,
        4
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      0
    ],
    "expectedFormula": "PEARSON(B2:B3,C2:C3)",
    "expectedValue": 1
  }
},
{
  "id": "percentile.exc",
  "title": "PERCENTILE.EXC Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Exclusive Percentile",
    "description": "Returns the k-th percentile of values in a range, where k is in the range 0 to 1, exclusive.",
    "concept": "Think of it as the ranking splitter: \"Divide my data into 100 parts, but ignore the very bottom and very top boundaries.\""
  },
  "whyItExists": "It is used in academic and medical fields where you don't want the extreme boundaries (0% and 100%) to be selectable.",
  "whenToUse": "Use when working with large datasets where you want a conservative estimate of percentiles.",
  "realWorldUseCases": [
    "Determining the 90th percentile of test scores in a large population.",
    "Analyzing income distribution excluding the absolute extremes."
  ],
  "businessExample": {
    "scenario": "An analyst wants the 50th percentile (Median) for {1, 10}.",
    "formula": "=PERCENTILE.EXC(B2:B3, 0.5)"
  },
  "syntax": "=PERCENTILE.EXC(array, k)",
  "syntaxBreakdown": [
    {
      "arg": "k",
      "desc": "The percentile value (0 to 1, exclusive)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Midpoint",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "10"
          ]
        ]
      },
      "stepByStep": [
        "K=0.5.",
        "Exclude 0/1 bounds.",
        "Result: 5.5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Small Samples",
      "desc": "PERCENTILE.EXC requires more data than .INC. If your k is too small/large for the sample size, it returns #NUM!."
    }
  ],
  "proTips": [
    "Generally used for larger populations."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Can k be 0 or 1 in PERCENTILE.EXC?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Find 50th percentile for B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        10
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTILE.EXC(B2:B3,0.5)",
    "expectedValue": 5.5
  }
},
{
  "id": "percentile.inc",
  "title": "PERCENTILE.INC Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Inclusive Percentile",
    "description": "Returns the k-th percentile of values in a range, where k is in the range 0 to 1, inclusive.",
    "concept": "Think of it as the position finder: \"What value is at the 90th percentile of my data?\""
  },
  "whyItExists": "It is the standard way to calculate percentiles in business, as it allows you to select any point from 0% (Min) to 100% (Max).",
  "whenToUse": "Use for almost all business reporting, such as performance benchmarks or salary bands.",
  "realWorldUseCases": [
    "Setting a bonus threshold at the 75th percentile of sales.",
    "Reporting the 90th percentile response time for support tickets."
  ],
  "businessExample": {
    "scenario": "A manager finds the 50th percentile (Median) for {1, 10}.",
    "formula": "=PERCENTILE.INC(B2:B3, 0.5)"
  },
  "syntax": "=PERCENTILE.INC(array, k)",
  "syntaxBreakdown": [
    {
      "arg": "k",
      "desc": "The percentile value (0 to 1, inclusive)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Median Value",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "10"
          ]
        ]
      },
      "stepByStep": [
        "K=0.5.",
        "Midpoint between 1 and 10.",
        "Result: 5.5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "K Range",
      "desc": "K must be between 0 and 1."
    }
  ],
  "proTips": [
    "PERCENTILE.INC(array, 0.5) is the same as MEDIAN(array)."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What k value corresponds to the median?",
    "expectedAnswer": "0.5"
  },
  "practice": {
    "instructions": "Find 50th percentile for B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        10
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTILE.INC(B2:B3,0.5)",
    "expectedValue": 5.5
  }
},
{
  "id": "percentrank.exc",
  "title": "PERCENTRANK.EXC Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Exclusive Rank",
    "description": "Returns the rank of a value in a dataset as a percentage (0..1, exclusive).",
    "concept": "Think of it as the percentile score: \"What percentile does this specific score fall into? (Excluding 0/1)\""
  },
  "whyItExists": "It tells you the relative standing of a value within a population, conservative of boundaries.",
  "whenToUse": "Use to find where a specific student or data point sits in a large group.",
  "realWorldUseCases": [
    "Finding the percentile rank of a score of 8 in a large test.",
    "Determining rank of a product's price in the market."
  ],
  "businessExample": {
    "scenario": "An analyst ranks the value 8 in a set {1, 8, 10}.",
    "formula": "=PERCENTRANK.EXC(B2:B4, 8)"
  },
  "syntax": "=PERCENTRANK.EXC(array, x, [significance])",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "The value whose rank you want to find."
    }
  ],
  "detailedExamples": [
    {
      "title": "Rank Test",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "8"
          ],
          [
            "10"
          ]
        ]
      },
      "stepByStep": [
        "Identify position of 8.",
        "Exclude 0/1 bounds.",
        "Result: 0.5 (50th percentile)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Array Size",
      "desc": "Returns #N/A if the value is not in the range and falls outside boundaries."
    }
  ],
  "proTips": [
    "Result is between 0 and 1 (exclusive)."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does .EXC include the 0% and 100% marks?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Find rank of 8 in B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        8
      ],
      [
        10
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "PERCENTRANK.EXC(B2:B4,8)",
    "expectedValue": 0.5
  }
},
{
  "id": "percentrank.inc",
  "title": "PERCENTRANK.INC Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inclusive Rank",
    "description": "Returns the rank of a value in a dataset as a percentage (0..1, inclusive).",
    "concept": "Think of it as the relative position: \"What is my percentile rank in this group?\""
  },
  "whyItExists": "Standard business tool for calculating percentiles, where the lowest value is 0% and the highest is 100%.",
  "whenToUse": "Use for grading, sales rankings, or identifying top performers.",
  "realWorldUseCases": [
    "Calculating your percentile rank in a company-wide survey.",
    "Finding the rank of a specific sales figure."
  ],
  "businessExample": {
    "scenario": "A manager ranks the value 8 in a set {1, 8, 10}.",
    "formula": "=PERCENTRANK.INC(B2:B4, 8)"
  },
  "syntax": "=PERCENTRANK.INC(array, x, [significance])",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "The value to rank."
    }
  ],
  "detailedExamples": [
    {
      "title": "Relative Rank",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "8"
          ],
          [
            "10"
          ]
        ]
      },
      "stepByStep": [
        "Lowest (1) is 0%, Highest (10) is 100%.",
        "8 is between them.",
        "Result: 0.7777 (77.7th percentile)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Interpolation",
      "desc": "If X is not in the array, Excel interpolates to find the rank."
    }
  ],
  "proTips": [
    "Most common percentile rank function."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What rank is the highest value in .INC?",
    "expectedAnswer": "1"
  },
  "practice": {
    "instructions": "Find rank of 8 in B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        8
      ],
      [
        10
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "PERCENTRANK.INC(B2:B4,8)",
    "expectedValue": 0.7777
  }
},
{
  "id": "permut",
  "title": "PERMUT Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Permutations",
    "description": "Returns the number of permutations for a given number of objects.",
    "concept": "Think of it as the order matters: \"How many ways can I pick 1st, 2nd, and 3rd place from 10 people?\""
  },
  "whyItExists": "In permutations, the sequence is critical (ABC is different from CBA).",
  "whenToUse": "Use when the order of selection matters, like passwords or prize rankings.",
  "realWorldUseCases": [
    "Calculating ways to assign 3 roles to 5 people.",
    "Determining possible outcomes in a horse race."
  ],
  "businessExample": {
    "scenario": "An organizer finds ways to award 2 prizes to 3 people.",
    "formula": "=PERMUT(3, 2)"
  },
  "syntax": "=PERMUT(number, number_chosen)",
  "syntaxBreakdown": [
    {
      "arg": "number",
      "desc": "Total items."
    },
    {
      "arg": "number_chosen",
      "desc": "Items to select."
    }
  ],
  "detailedExamples": [
    {
      "title": "Sequence Test",
      "table": {
        "headers": [
          "N",
          "K"
        ],
        "rows": [
          [
            "3",
            "2"
          ]
        ]
      },
      "stepByStep": [
        "Possible pairs from {A,B,C}: AB, BA, AC, CA, BC, CB.",
        "Count: 6.",
        "Result: 6."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Order",
      "desc": "If order DOES NOT matter, use COMBIN instead."
    }
  ],
  "proTips": [
    "Result is always larger than or equal to COMBIN."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does order matter in PERMUT?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Ways to choose 2 from 3 (order matters).",
    "initialData": [
      [
        "N",
        "K"
      ],
      [
        3,
        2
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      1
    ],
    "expectedFormula": "PERMUT(B2,C2)",
    "expectedValue": 6
  }
},
{
  "id": "permutationa",
  "title": "PERMUTATIONA Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Permutations with Repetition",
    "description": "Returns the number of permutations for a given number of objects (with repetition).",
    "concept": "Think of it as the reusable picker: \"How many 4-digit PINs can I make if I can use the same number twice?\""
  },
  "whyItExists": "It handles scenarios where items are not 'used up' after selection, like digits in a code.",
  "whenToUse": "Use for password combinations or any selection where replacement is allowed.",
  "realWorldUseCases": [
    "Calculating possible 3-letter codes using a 26-letter alphabet.",
    "Finding possible outcomes for multiple dice rolls."
  ],
  "businessExample": {
    "scenario": "An IT manager finds combinations for a 2-digit code using numbers 1-3.",
    "formula": "=PERMUTATIONA(3, 2)"
  },
  "syntax": "=PERMUTATIONA(number, number_chosen)",
  "syntaxBreakdown": [
    {
      "arg": "number",
      "desc": "Number of options per slot."
    }
  ],
  "detailedExamples": [
    {
      "title": "Code Builder",
      "table": {
        "headers": [
          "N",
          "K"
        ],
        "rows": [
          [
            "3",
            "2"
          ]
        ]
      },
      "stepByStep": [
        "Options: 11, 12, 13, 21, 22, 23, 31, 32, 33.",
        "Formula: 3^2.",
        "Result: 9."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Formula",
      "desc": "Result is simply number ^ number_chosen."
    }
  ],
  "proTips": [
    "Much larger results than PERMUT."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is 3 squared (PERMUTATIONA 3, 2)?",
    "expectedAnswer": "9"
  },
  "practice": {
    "instructions": "Possible 2-slot codes with 3 options each.",
    "initialData": [
      [
        "N",
        "K"
      ],
      [
        3,
        2
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      1
    ],
    "expectedFormula": "PERMUTATIONA(B2,C2)",
    "expectedValue": 9
  }
},
{
  "id": "phi",
  "title": "PHI Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Normal Density",
    "description": "Returns the value of the density function for a standard normal distribution.",
    "concept": "Think of it as the bell-curve height: \"How 'high' is the bell curve at this specific point?\""
  },
  "whyItExists": "Used in complex statistical graphing and theoretical probability calculations.",
  "whenToUse": "Use when you need the exact value of the probability density function (PDF), not the area (CDF).",
  "realWorldUseCases": [
    "Graphing a standard normal curve.",
    "Advanced engineering calculations involving Gaussian noise."
  ],
  "businessExample": {
    "scenario": "A data scientist needs the height of the curve at X=0 (the peak).",
    "formula": "=PHI(0)"
  },
  "syntax": "=PHI(x)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "The number for which you want the density."
    }
  ],
  "detailedExamples": [
    {
      "title": "Curve Height",
      "table": {
        "headers": [
          "X"
        ],
        "rows": [
          [
            "0"
          ]
        ]
      },
      "stepByStep": [
        "X=0 is the center.",
        "Calculate density.",
        "Result: 0.3989."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Density vs Probability",
      "desc": "PHI returns the height of the curve, NOT the probability of the value occurring."
    }
  ],
  "proTips": [
    "PHI(0) is the highest point of the standard normal curve."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the result of PHI(0)?",
    "expectedAnswer": "0.3989"
  },
  "practice": {
    "instructions": "Find PHI(0) in B2.",
    "initialData": [
      [
        "X"
      ],
      [
        0
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "PHI(0)",
    "expectedValue": 0.3989
  }
},
{
  "id": "poisson.dist",
  "title": "POISSON.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Poisson Distribution",
    "description": "Returns the Poisson distribution.",
    "concept": "Think of it as the occurrence tracker: \"What is the chance of 10 customers arriving in an hour if the average is 8?\""
  },
  "whyItExists": "It is perfect for modeling random independent events that occur at a constant average rate.",
  "whenToUse": "Use for arrivals, phone calls, or defects in a large batch.",
  "realWorldUseCases": [
    "Predicting website traffic spikes.",
    "Calculating the probability of a specific number of insurance claims."
  ],
  "businessExample": {
    "scenario": "A manager wants the prob of exactly 5 calls (X) if average is 10.",
    "formula": "=POISSON.DIST(5, 10, FALSE)"
  },
  "syntax": "=POISSON.DIST(x, mean, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "Number of events."
    },
    {
      "arg": "mean",
      "desc": "Expected average rate."
    }
  ],
  "detailedExamples": [
    {
      "title": "Arrival Prob",
      "table": {
        "headers": [
          "X",
          "M"
        ],
        "rows": [
          [
            "5",
            "10"
          ]
        ]
      },
      "stepByStep": [
        "X=5, Mean=10.",
        "Individual probability (FALSE).",
        "Result: 0.0378."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Fixed Rate",
      "desc": "Poisson assumes events are independent and the rate is constant."
    }
  ],
  "proTips": [
    "Use TRUE for 'up to X' events."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does Poisson model dependent or independent events?",
    "expectedAnswer": "independent"
  },
  "practice": {
    "instructions": "Find prob of exactly 5 events with mean 10.",
    "initialData": [
      [
        "X"
      ],
      [
        5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "POISSON.DIST(5,10,FALSE)",
    "expectedValue": 0.0378
  }
},
{
  "id": "prob",
  "title": "PROB Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Range Probability",
    "description": "Returns the probability that values in a range are between two limits.",
    "concept": "Think of it as the weighted odds: \"If I have a list of values and their probabilities, what's the chance of getting a value between 10 and 20?\""
  },
  "whyItExists": "It allows you to calculate total probability for a set of discrete outcomes.",
  "whenToUse": "Use when you have a custom probability distribution (like sales forecasts with odds).",
  "realWorldUseCases": [
    "Calculating the chance that sales fall between $5k and $10k.",
    "Analyzing risk in a custom decision tree."
  ],
  "businessExample": {
    "scenario": "An analyst checks the chance of getting 1 or 2, given {1,2} each has 50% odds.",
    "formula": "=PROB(A2:A3, B2:B3, 1, 2)"
  },
  "syntax": "=PROB(x_range, prob_range, lower_limit, [upper_limit])",
  "syntaxBreakdown": [
    {
      "arg": "x_range",
      "desc": "Possible values."
    },
    {
      "arg": "prob_range",
      "desc": "Odds for each value."
    }
  ],
  "detailedExamples": [
    {
      "title": "Odds Calculation",
      "table": {
        "headers": [
          "X",
          "P"
        ],
        "rows": [
          [
            "1",
            "0.5"
          ],
          [
            "2",
            "0.5"
          ]
        ]
      },
      "stepByStep": [
        "Target: 1 to 2.",
        "Sum odds for 1 and 2.",
        "Result: 1.0."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Prob Sum",
      "desc": "The prob_range must sum to 1.0."
    }
  ],
  "proTips": [
    "If upper_limit is omitted, it returns the probability of exactly lower_limit."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What must the probability range sum to?",
    "expectedAnswer": "1"
  },
  "practice": {
    "instructions": "Find prob of 1 or 2 using B2:B3 as X and C2:C3 as P.",
    "initialData": [
      [
        "X",
        "P"
      ],
      [
        1,
        0.5
      ],
      [
        2,
        0.5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PROB(B2:B3,C2:C3,1,2)",
    "expectedValue": 1
  }
},
{
  "id": "quartile.exc",
  "title": "QUARTILE.EXC Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Exclusive Quartile",
    "description": "Returns the quartile of a dataset, based on percentile values from 0..1, exclusive.",
    "concept": "Think of it as the data splitter: \"Divide my data into 4 equal parts (25% each), but don't count the min/max points.\""
  },
  "whyItExists": "Useful for identifying the spread of 'typical' values while being conservative about boundaries.",
  "whenToUse": "Use in statistics when you want to ignore the absolute extremes of a range.",
  "realWorldUseCases": [
    "Splitting exam results into performance tiers.",
    "Analyzing core market prices."
  ],
  "businessExample": {
    "scenario": "An analyst finds the 1st quartile for {1, 10}.",
    "formula": "=QUARTILE.EXC(B2:B3, 1)"
  },
  "syntax": "=QUARTILE.EXC(array, quart)",
  "syntaxBreakdown": [
    {
      "arg": "quart",
      "desc": "1 (25th), 2 (Median), or 3 (75th)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Split Test",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "10"
          ]
        ]
      },
      "stepByStep": [
        "Exclude bounds.",
        "Calculate 25th percentile.",
        "Result: 3.25."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Quart Value",
      "desc": "Must be 1, 2, or 3 (0 and 4 are invalid for .EXC)."
    }
  ],
  "proTips": [
    "Quartile 2 is the Median."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Can you use 0 or 4 in QUARTILE.EXC?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Find 1st quartile for B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        10
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "QUARTILE.EXC(B2:B3,1)",
    "expectedValue": 3.25
  }
},
{
  "id": "quartile.inc",
  "title": "QUARTILE.INC Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Inclusive Quartile",
    "description": "Returns the quartile of a dataset, based on percentile values from 0..1, inclusive.",
    "concept": "Think of it as the quarterly marker: \"Where is the 25%, 50%, and 75% mark in my data?\""
  },
  "whyItExists": "Standard tool for building box plots and identifying data spread.",
  "whenToUse": "Use to summarize the distribution of a group of numbers into quarters.",
  "realWorldUseCases": [
    "Analyzing salary bands.",
    "Identifying the spread of delivery times."
  ],
  "businessExample": {
    "scenario": "A manager finds the 1st quartile for {1, 10}.",
    "formula": "=QUARTILE.INC(B2:B3, 1)"
  },
  "syntax": "=QUARTILE.INC(array, quart)",
  "syntaxBreakdown": [
    {
      "arg": "quart",
      "desc": "0 (Min), 1, 2, 3, 4 (Max)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Spread Test",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "10"
          ]
        ]
      },
      "stepByStep": [
        "Include bounds 1 and 10.",
        "Calculate 25th percentile.",
        "Result: 3.25."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Quart Range",
      "desc": "Must be 0, 1, 2, 3, or 4."
    }
  ],
  "proTips": [
    "QUARTILE.INC with quart=2 is the Median."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is quartile 4?",
    "expectedAnswer": "Maximum"
  },
  "practice": {
    "instructions": "Find 1st quartile for B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        10
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "QUARTILE.INC(B2:B3,1)",
    "expectedValue": 3.25
  }
},
{
  "id": "rank.avg",
  "title": "RANK.AVG Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Average Rank",
    "description": "Returns the rank of a number in a list; if multiple values have the same rank, the average rank is returned.",
    "concept": "Think of it as the fair standing: \"If two people tie for 1st, give them both rank 1.5.\""
  },
  "whyItExists": "It avoids 'gaps' in rankings by averaging ties, which is more mathematically consistent for some models.",
  "whenToUse": "Use in competitive analysis or academic scoring where ties should be handled gracefully.",
  "realWorldUseCases": [
    "Ranking students where tied scores share the middle rank.",
    "Analyzing sales performance with ties."
  ],
  "businessExample": {
    "scenario": "A manager ranks {10, 10, 5}. The two 10s tie for 1st and 2nd.",
    "formula": "=RANK.AVG(10, B2:B4)"
  },
  "syntax": "=RANK.AVG(number, ref, [order])",
  "syntaxBreakdown": [
    {
      "arg": "number",
      "desc": "The value to rank."
    },
    {
      "arg": "ref",
      "desc": "The list of numbers."
    }
  ],
  "detailedExamples": [
    {
      "title": "Tie Handling",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "10"
          ],
          [
            "5"
          ]
        ]
      },
      "stepByStep": [
        "Sorted: 10, 10, 5.",
        "10s occupy slots 1 and 2.",
        "Average of 1 and 2 is 1.5. Result: 1.5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Order",
      "desc": "0 (default) is descending; 1 is ascending."
    }
  ],
  "proTips": [
    "Use RANK.EQ if you want tied values to have the SAME top rank."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Rank of 10 in {10, 10, 5} with RANK.AVG?",
    "expectedAnswer": "1.5"
  },
  "practice": {
    "instructions": "Find average rank of 10 in B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        10
      ],
      [
        5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "RANK.AVG(B2,B2:B4)",
    "expectedValue": 1.5
  }
},
{
  "id": "rank.eq",
  "title": "RANK.EQ Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Equality Rank",
    "description": "Returns the rank of a number in a list of numbers; its size is relative to other values.",
    "concept": "Think of it as the leaderboard: \"If two people tie for 1st, they both get rank 1.\""
  },
  "whyItExists": "It is the most common way to rank items, identical to how Olympic medals or most leaderboards work.",
  "whenToUse": "Use for leaderboards, competitions, or identifying top performers.",
  "realWorldUseCases": [
    "Ranking sales reps by total revenue.",
    "Identifying the top 10 most popular products."
  ],
  "businessExample": {
    "scenario": "A manager ranks {10, 10, 5}.",
    "formula": "=RANK.EQ(10, B2:B4)"
  },
  "syntax": "=RANK.EQ(number, ref, [order])",
  "syntaxBreakdown": [
    {
      "arg": "ref",
      "desc": "The entire list of numbers."
    }
  ],
  "detailedExamples": [
    {
      "title": "Standing",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "10"
          ],
          [
            "5"
          ]
        ]
      },
      "stepByStep": [
        "Sorted: 10, 10, 5.",
        "Both 10s are in 1st place.",
        "Result: 1."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Absolute Ref",
      "desc": "Always use $B$2:$B$4 for the reference so it doesn't shift when you copy the formula!"
    }
  ],
  "proTips": [
    "Replaces the old RANK function."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Rank of 10 in {10, 10, 5} with RANK.EQ?",
    "expectedAnswer": "1"
  },
  "practice": {
    "instructions": "Find rank of 10 (B2) in B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        10
      ],
      [
        5
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "RANK.EQ(B2,B2:B4)",
    "expectedValue": 1
  }
},
{
  "id": "rsq",
  "title": "RSQ Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "R-Squared",
    "description": "Returns the square of the Pearson product-moment correlation coefficient.",
    "concept": "Think of it as the model fitness: \"How much of the movement in Y is explained by X? (0% to 100%)\""
  },
  "whyItExists": "It measures how well your trendline fits your data. 0.90 means 90% of the variance is explained by the model.",
  "whenToUse": "Use to validate your forecasting models. Higher is better!",
  "realWorldUseCases": [
    "Evaluating the accuracy of a sales forecast model.",
    "Measuring how much of stock price movement is due to the market."
  ],
  "businessExample": {
    "scenario": "An analyst checks the 'fit' of a perfect trend {2, 4} over {1, 2}.",
    "formula": "=RSQ(B2:B3, A2:A3)"
  },
  "syntax": "=RSQ(known_y, known_x)",
  "syntaxBreakdown": [
    {
      "arg": "known_y",
      "desc": "Dependent data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Model Fit",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "2"
          ],
          [
            "2",
            "4"
          ]
        ]
      },
      "stepByStep": [
        "Correlation is 1.0.",
        "1.0 squared is 1.0.",
        "Result: 1.0 (Perfect fit)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Overfitting",
      "desc": "A high RSQ doesn't always mean your model is 'good' for future predictions!"
    }
  ],
  "proTips": [
    "RSQ is simply PEARSON squared."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the maximum possible value for RSQ?",
    "expectedAnswer": "1"
  },
  "practice": {
    "instructions": "Find RSQ for Y(B2:B3) and X(A2:A3).",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        2
      ],
      [
        2,
        4
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "RSQ(B2:B3,A2:A3)",
    "expectedValue": 1
  }
},
{
  "id": "skew",
  "title": "SKEW Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Sample Skewness",
    "description": "Returns the skewness of a distribution based on a sample.",
    "concept": "Think of it as the symmetry checker: \"Does my data lean more to the left or the right?\""
  },
  "whyItExists": "It tells you if your data is balanced or has a 'long tail' in one direction, which affects which statistical tests you can use.",
  "whenToUse": "Use when analyzing distributions of things like income or response times.",
  "realWorldUseCases": [
    "Checking if sales data is skewed by a few massive deals.",
    "Analyzing student grades for asymmetric results."
  ],
  "businessExample": {
    "scenario": "An analyst checks the lean of {1, 10, 100}.",
    "formula": "=SKEW(B2:B4)"
  },
  "syntax": "=SKEW(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Data to analyze (at least 3)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Tail Test",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "10"
          ],
          [
            "100"
          ]
        ]
      },
      "stepByStep": [
        "Data is heavily weighted to the low end with one high outlier.",
        "Calculate skewness.",
        "Result: 1.15 (Positive skew)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Points",
      "desc": "Requires at least 3 data points."
    }
  ],
  "proTips": [
    "Positive = tail on the right; Negative = tail on the left."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What does a positive skew indicate?",
    "expectedAnswer": "right tail"
  },
  "practice": {
    "instructions": "Find skewness for B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        10
      ],
      [
        100
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "SKEW(B2:B4)",
    "expectedValue": 1.153
  }
},
{
  "id": "skew.p",
  "title": "SKEW.P Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Population Skewness",
    "description": "Returns the skewness of a distribution based on a population.",
    "concept": "Think of it as the total symmetry: \"How lopsided is my entire population of data?\""
  },
  "whyItExists": "It provides the exact skewness value for a complete dataset without the 'sample bias' adjustment.",
  "whenToUse": "Use when you have the entire population, like every student in a school.",
  "realWorldUseCases": [
    "Analyzing the skew of a company's total annual salaries.",
    "Measuring the symmetry of weights for all items in a warehouse."
  ],
  "businessExample": {
    "scenario": "An analyst finds the skew for {1, 10, 100} assuming it is the full population.",
    "formula": "=SKEW.P(B2:B4)"
  },
  "syntax": "=SKEW.P(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Data to analyze."
    }
  ],
  "detailedExamples": [
    {
      "title": "Total Lean",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "10"
          ],
          [
            "100"
          ]
        ]
      },
      "stepByStep": [
        "N=3 (whole population).",
        "Calculate population skewness.",
        "Result: 0.81 (Slightly lower than SKEW)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Sample size",
      "desc": "Requires at least 3 points."
    }
  ],
  "proTips": [
    "Always lower than SKEW for the same data."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Which is usually higher for the same data: SKEW or SKEW.P?",
    "expectedAnswer": "SKEW"
  },
  "practice": {
    "instructions": "Find population skew for B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        10
      ],
      [
        100
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "SKEW.P(B2:B4)",
    "expectedValue": 0.81
  }
},
{
  "id": "slope",
  "title": "SLOPE Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Line Slope",
    "description": "Returns the slope of the linear regression line through data points in known_y's and known_x's.",
    "concept": "Think of it as the rate of change: \"For every 1 unit X increases, how much does Y change?\""
  },
  "whyItExists": "It is the core of trend analysis; it tells you the 'steepness' of your sales growth or cost increase.",
  "whenToUse": "Use to quantify trends, such as sales growth per month or efficiency gains per worker.",
  "realWorldUseCases": [
    "Calculating sales growth rate.",
    "Determining variable cost per unit."
  ],
  "businessExample": {
    "scenario": "A manager finds the growth rate for sales {10, 20} over months {1, 2}.",
    "formula": "=SLOPE(B2:B3, A2:A3)"
  },
  "syntax": "=SLOPE(known_y, known_x)",
  "syntaxBreakdown": [
    {
      "arg": "known_y",
      "desc": "Dependent set."
    },
    {
      "arg": "known_x",
      "desc": "Independent set."
    }
  ],
  "detailedExamples": [
    {
      "title": "Growth Rate",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "10"
          ],
          [
            "2",
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Y goes up by 10 as X goes up by 1.",
        "Change in Y / Change in X = 10 / 1.",
        "Result: 10."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Array Order",
      "desc": "Known Y must be the first argument, known X the second."
    }
  ],
  "proTips": [
    "Pairs with INTERCEPT to create the line equation y = mx + b."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the slope if Y doubles every time X increases by 1 (e.g. 10 to 20)?",
    "expectedAnswer": "10"
  },
  "practice": {
    "instructions": "Find the slope for B2:B3 and A2:A3.",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        10
      ],
      [
        2,
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "SLOPE(B2:B3,A2:A3)",
    "expectedValue": 10
  }
},
{
  "id": "small",
  "title": "SMALL Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Kth Smallest Value",
    "description": "Returns the k-th smallest value in a dataset.",
    "concept": "Think of it as the bottom ranking: \"Who got the 2nd lowest score?\""
  },
  "whyItExists": "It allows you to identify poor performers or minimum thresholds without sorting.",
  "whenToUse": "Use for bottom-N analysis or to find 'slowest' times in a list.",
  "realWorldUseCases": [
    "Finding the 3rd cheapest vendor.",
    "Extracting the three lowest test scores."
  ],
  "businessExample": {
    "scenario": "A manager wants the 2nd lowest score from {10, 20, 30}.",
    "formula": "=SMALL(B2:B4, 2)"
  },
  "syntax": "=SMALL(array, k)",
  "syntaxBreakdown": [
    {
      "arg": "array",
      "desc": "Data to search."
    },
    {
      "arg": "k",
      "desc": "Position (1=min)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Bottom Rank",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "20"
          ],
          [
            "30"
          ]
        ]
      },
      "stepByStep": [
        "Sorted: 10, 20, 30.",
        "k=2 requested.",
        "Result: 20."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "K limit",
      "desc": "K must be <= count of data points."
    }
  ],
  "proTips": [
    "The opposite of the LARGE function."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "If k=1, SMALL is same as which function?",
    "expectedAnswer": "MIN"
  },
  "practice": {
    "instructions": "Find 2nd smallest value in B2:B4.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        20
      ],
      [
        30
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "SMALL(B2:B4,2)",
    "expectedValue": 20
  }
},
{
  "id": "standardize",
  "title": "STANDARDIZE Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Z-Score Calculator",
    "description": "Returns a normalized value from a distribution characterized by mean and standard_dev.",
    "concept": "Think of it as the score normalizer: \"Turn a raw score into a Z-score (how many standard deviations from the mean).\""
  },
  "whyItExists": "It allows you to compare apples to oranges (e.g. comparing an SAT score to an ACT score) by putting them on the same scale.",
  "whenToUse": "Use when you need to see how 'extreme' a single data point is relative to the group.",
  "realWorldUseCases": [
    "Calculating the Z-score for a student's grade.",
    "Determining if a measurement is an outlier."
  ],
  "businessExample": {
    "scenario": "An analyst normalizes a score of 85 given Mean 70 and SD 10.",
    "formula": "=STANDARDIZE(85, 70, 10)"
  },
  "syntax": "=STANDARDIZE(x, mean, standard_dev)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "The value to normalize."
    }
  ],
  "detailedExamples": [
    {
      "title": "Z-Score",
      "table": {
        "headers": [
          "X",
          "M",
          "SD"
        ],
        "rows": [
          [
            "85",
            "70",
            "10"
          ]
        ]
      },
      "stepByStep": [
        "(85 - 70) = 15.",
        "15 / 10 = 1.5.",
        "Result: 1.5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "SD sign",
      "desc": "Standard deviation must be > 0."
    }
  ],
  "proTips": [
    "A standardized value of 0 means the score is exactly average."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the result if X equals the Mean?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Standardize 85 with mean 70 and sd 10.",
    "initialData": [
      [
        "X"
      ],
      [
        85
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "STANDARDIZE(85,70,10)",
    "expectedValue": 1.5
  }
},
{
  "id": "stdev.p",
  "title": "STDEV.P Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Population Std Dev",
    "description": "Calculates standard deviation based on the entire population given as arguments.",
    "concept": "Think of it as the total spread: \"On average, how far does every single point in the population stray from the mean?\""
  },
  "whyItExists": "It provides the most accurate measure of spread when you have every possible data point.",
  "whenToUse": "Use when the data represents a complete set (e.g. every employee in a small team).",
  "realWorldUseCases": [
    "Measuring the volatility of all stock prices in a portfolio.",
    "Analyzing the consistency of every product in a small batch."
  ],
  "businessExample": {
    "scenario": "An analyst finds the spread for {10, 20} (full population).",
    "formula": "=STDEV.P(B2:B3)"
  },
  "syntax": "=STDEV.P(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Population data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Total Spread",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Mean=15.",
        "Deviations: -5, 5.",
        "Average of squares is 25. SQRT(25)=5.",
        "Result: 5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Bias",
      "desc": "Do not use STDEV.P for samples; it will underestimate the true variation."
    }
  ],
  "proTips": [
    "Always lower than STDEV.S for the same data."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Is STDEV.P used for samples or full populations?",
    "expectedAnswer": "full populations"
  },
  "practice": {
    "instructions": "Find population std dev for B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEV.P(B2:B3)",
    "expectedValue": 5
  }
},
{
  "id": "stdev.s",
  "title": "STDEV.S Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Sample Std Dev",
    "description": "Estimates standard deviation based on a sample.",
    "concept": "Think of it as the volatility meter: \"Based on this sample, how much do values typically vary?\""
  },
  "whyItExists": "It is the 'standard' measure of risk and variability in almost all fields.",
  "whenToUse": "Use in 99% of cases where you have a subset of data.",
  "realWorldUseCases": [
    "Calculating the risk (volatility) of a stock.",
    "Measuring consistency in manufacturing based on random checks."
  ],
  "businessExample": {
    "scenario": "A manager finds the spread for {10, 20} (sample).",
    "formula": "=STDEV.S(B2:B3)"
  },
  "syntax": "=STDEV.S(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Sample data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Sample Spread",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Mean=15.",
        "Uses N-1 correction for samples.",
        "Result: 7.07."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Min count",
      "desc": "Requires at least 2 data points; otherwise returns #DIV/0!."
    }
  ],
  "proTips": [
    "SQRT of VAR.S."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Which uses 'N-1' in the formula: .S or .P?",
    "expectedAnswer": ".S"
  },
  "practice": {
    "instructions": "Find sample std dev for B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEV.S(B2:B3)",
    "expectedValue": 7.071
  }
},
{
  "id": "stdeva",
  "title": "STDEVA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Inclusive Sample Std Dev",
    "description": "Estimates standard deviation based on a sample, including text and logical values.",
    "concept": "Think of it as the comprehensive spread: \"Calculate variation counting 'TRUE' as 1 and text as 0.\""
  },
  "whyItExists": "Useful when non-numeric results (like 'Fail' as 0) should be included in the variation model.",
  "whenToUse": "Use when analyzing survey data where TRUE/FALSE responses are mixed with numbers.",
  "realWorldUseCases": [
    "Measuring variation in binary outcomes.",
    "Analyzing consistency when 'None' (0) is a valid data point."
  ],
  "businessExample": {
    "scenario": "An analyst checks variation in {10, FALSE}.",
    "formula": "=STDEVA(B2:B3)"
  },
  "syntax": "=STDEVA(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Sample values."
    }
  ],
  "detailedExamples": [
    {
      "title": "Mixed Spread",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "FALSE"
          ]
        ]
      },
      "stepByStep": [
        "FALSE=0. Sample={10, 0}.",
        "Mean=5.",
        "Result: 7.07."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Text is 0",
      "desc": "Text is treated as 0, which can drastically increase your spread if your numbers are all large."
    }
  ],
  "proTips": [
    "TRUE=1, FALSE=0, Text=0."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What numeric value does STDEVA assign to FALSE?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Find STDEVA for 10 and FALSE.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        "FALSE"
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEVA(B2:B3)",
    "expectedValue": 7.071
  }
},
{
  "id": "stdevpa",
  "title": "STDEVPA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Inclusive Population Std Dev",
    "description": "Calculates standard deviation based on the entire population, including text and logical values.",
    "concept": "Think of it as the total inclusive spread"
  },
  "whyItExists": "Used for complete populations where non-numeric data points should be treated as zeros.",
  "whenToUse": "Use when analyzing a whole group that contains categorical 'FALSE' or text markers.",
  "realWorldUseCases": [
    "Analyzing the spread of an entire team's numeric scores and 'Absent' (0) flags."
  ],
  "businessExample": {
    "scenario": "An analyst checks population spread for {10, FALSE}.",
    "formula": "=STDEVPA(B2:B3)"
  },
  "syntax": "=STDEVPA(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Population values."
    }
  ],
  "detailedExamples": [
    {
      "title": "Total Mixed",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "FALSE"
          ]
        ]
      },
      "stepByStep": [
        "FALSE=0. Pop={10, 0}.",
        "Mean=5. Deviations: 5, -5.",
        "Result: 5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Denominator",
      "desc": "Uses N instead of N-1."
    }
  ],
  "proTips": [
    "Almost always returns a smaller value than STDEVA."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What value does STDEVPA assign to TRUE?",
    "expectedAnswer": "1"
  },
  "practice": {
    "instructions": "Find STDEVPA for 10 and FALSE.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        "FALSE"
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEVPA(B2:B3)",
    "expectedValue": 5
  }
},
{
  "id": "steyx",
  "title": "STEYX Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Standard Error of Regression",
    "description": "Returns the standard error of the predicted y-value for each x in the regression.",
    "concept": "Think of it as the forecast error: \"On average, how far off is my trendline from the actual data?\""
  },
  "whyItExists": "It tells you the reliability of your forecast. A low STEYX means your trendline is very accurate.",
  "whenToUse": "Use to judge the quality of a forecasting model.",
  "realWorldUseCases": [
    "Evaluating the 'noise' in a sales projection.",
    "Measuring the accuracy of a budget model."
  ],
  "businessExample": {
    "scenario": "An analyst checks the error for Y {10, 21} and X {1, 2}.",
    "formula": "=STEYX(B2:B3, A2:A3)"
  },
  "syntax": "=STEYX(known_y, known_x)",
  "syntaxBreakdown": [
    {
      "arg": "known_y",
      "desc": "Actual values."
    }
  ],
  "detailedExamples": [
    {
      "title": "Error Test",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "10"
          ],
          [
            "2",
            "21"
          ]
        ]
      },
      "stepByStep": [
        "Trend is nearly perfect (10, 20).",
        "Actual is slightly off.",
        "Result: #DIV/0! (Needs >2 points for error)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Min Points",
      "desc": "Requires at least 3 data points to calculate an error; otherwise returns #DIV/0!."
    }
  ],
  "proTips": [
    "Lower values mean a better fit."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does a higher STEYX mean a better or worse fit?",
    "expectedAnswer": "worse"
  },
  "practice": {
    "instructions": "STEYX for Y(B2:B4) and X(A2:A4).",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        10
      ],
      [
        2,
        21
      ],
      [
        3,
        30
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "STEYX(B2:B4,A2:A4)",
    "expectedValue": 0.577
  }
},
{
  "id": "t.dist",
  "title": "T.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "T-Distribution Probability",
    "description": "Returns the Student's left-tailed t-distribution.",
    "concept": "Think of it as the small sample bell curve: \"What is the probability area for a small sample dataset?\""
  },
  "whyItExists": "The normal distribution (Z) is inaccurate for small samples (n < 30). T.DIST is designed specifically for small datasets.",
  "whenToUse": "Use for hypothesis testing when the sample size is small.",
  "realWorldUseCases": [
    "Finding p-values for pilot studies.",
    "Analyzing clinical trial results with few participants."
  ],
  "businessExample": {
    "scenario": "An analyst wants the left-tailed prob for T=2.1 with 10 DF.",
    "formula": "=T.DIST(2.1, 10, TRUE)"
  },
  "syntax": "=T.DIST(x, deg_freedom, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "The T-statistic."
    }
  ],
  "detailedExamples": [
    {
      "title": "Small Sample Prob",
      "table": {
        "headers": [
          "X",
          "DF"
        ],
        "rows": [
          [
            "2.1",
            "10"
          ]
        ]
      },
      "stepByStep": [
        "X=2.1, DF=10.",
        "Area to the left.",
        "Result: 0.9691."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "DF limit",
      "desc": "Degrees of freedom must be >= 1."
    }
  ],
  "proTips": [
    "As DF increases, T.DIST starts to look exactly like NORM.S.DIST."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Is T.DIST better for large or small samples?",
    "expectedAnswer": "small"
  },
  "practice": {
    "instructions": "Find T.DIST for (2.1, 10, TRUE).",
    "initialData": [
      [
        "X"
      ],
      [
        2.1
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "T.DIST(2.1,10,TRUE)",
    "expectedValue": 0.9691
  }
},
{
  "id": "t.inv",
  "title": "T.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Inverse T-Dist",
    "description": "Returns the left-tailed inverse of the Student's t-distribution.",
    "concept": "Think of it as the small sample cutoff: \"What T-value corresponds to the 95th percentile in a small group?\""
  },
  "whyItExists": "It finds critical values for T-tests, allowing you to set rejection thresholds for small samples.",
  "whenToUse": "Use to build confidence intervals for small datasets.",
  "realWorldUseCases": [
    "Finding the T-cutoff for a 95% confidence interval.",
    "Setting thresholds for academic research samples."
  ],
  "businessExample": {
    "scenario": "An analyst needs the T-value for 95% prob with 10 DF.",
    "formula": "=T.INV(0.95, 10)"
  },
  "syntax": "=T.INV(probability, deg_freedom)",
  "syntaxBreakdown": [
    {
      "arg": "probability",
      "desc": "Area to the left."
    }
  ],
  "detailedExamples": [
    {
      "title": "T-Cutoff",
      "table": {
        "headers": [
          "P",
          "DF"
        ],
        "rows": [
          [
            "0.95",
            "10"
          ]
        ]
      },
      "stepByStep": [
        "P=0.95, DF=10.",
        "Result: 1.8124."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "One-tailed",
      "desc": "T.INV is left-tailed. For two-tailed, use T.INV.2T."
    }
  ],
  "proTips": [
    "Inverse of T.DIST."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Inverse of T.DIST?",
    "expectedAnswer": "T.INV"
  },
  "practice": {
    "instructions": "Find T-value for P=0.95, DF=10.",
    "initialData": [
      [
        "P"
      ],
      [
        0.95
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "T.INV(0.95,10)",
    "expectedValue": 1.8124
  }
},
{
  "id": "t.test",
  "title": "T.TEST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "T-Test p-Value",
    "description": "Returns the probability associated with a Student's t-test.",
    "concept": "Think of it as the mean comparison: \"Is the average of Group A significantly different from Group B?\""
  },
  "whyItExists": "It is the most famous test in statistics for comparing two groups.",
  "whenToUse": "Use to see if a change (like a new website design) actually made a difference in the mean result.",
  "realWorldUseCases": [
    "Comparing test scores of boys vs girls.",
    "Testing if a drug improved health markers vs a placebo."
  ],
  "businessExample": {
    "scenario": "A manager compares Group A {1, 2} and Group B {10, 20}.",
    "formula": "=T.TEST(B2:B3, C2:C3, 2, 2)"
  },
  "syntax": "=T.TEST(array1, array2, tails, type)",
  "syntaxBreakdown": [
    {
      "arg": "tails",
      "desc": "1 or 2."
    },
    {
      "arg": "type",
      "desc": "1(Paired), 2(Equal Var), 3(Unequal Var)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Difference Test",
      "table": {
        "headers": [
          "A",
          "B"
        ],
        "rows": [
          [
            "1",
            "10"
          ],
          [
            "2",
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Means are 1.5 and 15.",
        "Calculate probability that this is chance.",
        "Result: 0.14 (Not significant for this tiny sample)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Type",
      "desc": "Choosing the wrong 'Type' can give incorrect p-values. Use type 3 if unsure."
    }
  ],
  "proTips": [
    "p-value < 0.05 usually means a significant difference."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What p-value threshold is commonly used for 'significance'?",
    "expectedAnswer": "0.05"
  },
  "practice": {
    "instructions": "Run 2-tailed, equal-var T.TEST on B2:B3 vs C2:C3.",
    "initialData": [
      [
        "A",
        "B"
      ],
      [
        1,
        10
      ],
      [
        2,
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "T.TEST(B2:B3,C2:C3,2,2)",
    "expectedValue": 0.14
  }
},
{
  "id": "trend",
  "title": "TREND Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Linear Trend Values",
    "description": "Returns values along a linear trend.",
    "concept": "Think of it as the trendline filler: \"What would the missing values be if they followed a perfect straight line?\""
  },
  "whyItExists": "It allows you to calculate multiple future points or fill in gaps in a dataset at once.",
  "whenToUse": "Use to generate a series of future values based on current linear growth.",
  "realWorldUseCases": [
    "Filling in missing monthly sales data.",
    "Projecting next 5 months of growth."
  ],
  "businessExample": {
    "scenario": "A manager predicts values for months 3 and 4 based on 1 and 2.",
    "formula": "=TREND(B2:B3, A2:A3, {3, 4})"
  },
  "syntax": "=TREND(known_y, [known_x], [new_x])",
  "syntaxBreakdown": [
    {
      "arg": "known_y",
      "desc": "Current Y values."
    }
  ],
  "detailedExamples": [
    {
      "title": "Series Projection",
      "table": {
        "headers": [
          "X",
          "Y"
        ],
        "rows": [
          [
            "1",
            "10"
          ],
          [
            "2",
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Line is +10 per X.",
        "Predict for X=3.",
        "Result: 30."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Array Function",
      "desc": "TREND can return multiple values; use caution in old Excel."
    }
  ],
  "proTips": [
    "Similar to FORECAST but can return multiple values."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does TREND use linear or exponential logic?",
    "expectedAnswer": "linear"
  },
  "practice": {
    "instructions": "Find TREND value for X=3 (B2:B3 are Y, A2:A3 are X).",
    "initialData": [
      [
        "X",
        "Y"
      ],
      [
        1,
        10
      ],
      [
        2,
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "TREND(B2:B3,A2:A3,3)",
    "expectedValue": 30
  }
},
{
  "id": "trimmean",
  "title": "TRIMMEAN Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Trimmed Mean",
    "description": "Returns the mean of the interior of a dataset.",
    "concept": "Think of it as the outlier remover: \"Calculate the average, but throw away the highest and lowest 10% of scores first.\""
  },
  "whyItExists": "It gives a better 'typical' value than AVERAGE when you have messy data with extreme mistakes or outliers.",
  "whenToUse": "Use in sports judging or market analysis to ignore 'extremes'.",
  "realWorldUseCases": [
    "Calculating average score in gymnastics (dropping high/low).",
    "Averaging home prices while ignoring mansions and ruins."
  ],
  "businessExample": {
    "scenario": "A manager trims 20% from {1, 10, 11, 100} to remove the 1 and 100.",
    "formula": "=TRIMMEAN(B2:B5, 0.5)"
  },
  "syntax": "=TRIMMEAN(array, percent)",
  "syntaxBreakdown": [
    {
      "arg": "percent",
      "desc": "Fraction of points to exclude (0 to 1)."
    }
  ],
  "detailedExamples": [
    {
      "title": "Messy Average",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "1"
          ],
          [
            "10"
          ],
          [
            "11"
          ],
          [
            "100"
          ]
        ]
      },
      "stepByStep": [
        "Drop top and bottom 25% (1 point each).",
        "Average remaining {10, 11}.",
        "Result: 10.5."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Percent",
      "desc": "The percent is the TOTAL excluded. 0.2 excluded means 0.1 from the top and 0.1 from the bottom."
    }
  ],
  "proTips": [
    "Percent=0 makes it identical to AVERAGE."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "If percent is 0.2, what % is removed from each end?",
    "expectedAnswer": "10%"
  },
  "practice": {
    "instructions": "Trimmean of B2:B5 with 0.5 percent.",
    "initialData": [
      [
        "V"
      ],
      [
        1
      ],
      [
        10
      ],
      [
        11
      ],
      [
        100
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      6,
      1
    ],
    "expectedFormula": "TRIMMEAN(B2:B5,0.5)",
    "expectedValue": 10.5
  }
},
{
  "id": "var.p",
  "title": "VAR.P Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Population Variance",
    "description": "Calculates variance based on the entire population.",
    "concept": "Think of it as the total variation: \"How much total volatility is in my entire population?\""
  },
  "whyItExists": "Variance is the standard deviation squared. It is used in complex financial modeling.",
  "whenToUse": "Use when you have 100% of the data points.",
  "realWorldUseCases": [
    "Calculating risk for an entire asset class.",
    "Measuring variation in all products produced in a day."
  ],
  "businessExample": {
    "scenario": "An analyst finds population variance for {10, 20}.",
    "formula": "=VAR.P(B2:B3)"
  },
  "syntax": "=VAR.P(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Population data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Total Variation",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Mean=15. Deviations squared: 25, 25.",
        "Average of squares: 25.",
        "Result: 25."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Sample error",
      "desc": "If you only have a sample, VAR.P will be too low. Use VAR.S instead."
    }
  ],
  "proTips": [
    "VAR.P = (STDEV.P)^2."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is the relationship between VAR.P and STDEV.P?",
    "expectedAnswer": "squared"
  },
  "practice": {
    "instructions": "Find population variance for B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VAR.P(B2:B3)",
    "expectedValue": 25
  }
},
{
  "id": "var.s",
  "title": "VAR.S Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Sample Variance",
    "description": "Estimates variance based on a sample.",
    "concept": "Think of it as the sample volatility: \"How much variation should I expect based on this sample?\""
  },
  "whyItExists": "It is the fundamental measure of dispersion in statistics.",
  "whenToUse": "Use for subsets of data.",
  "realWorldUseCases": [
    "Calculating the variance of stock returns.",
    "Measuring spread in scientific experiments."
  ],
  "businessExample": {
    "scenario": "A manager finds sample variance for {10, 20}.",
    "formula": "=VAR.S(B2:B3)"
  },
  "syntax": "=VAR.S(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Sample data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Sample Variation",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Mean=15.",
        "N-1 correction: 50/1.",
        "Result: 50."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Units",
      "desc": "Variance is in 'units squared'. To get back to original units, take the SQRT (Standard Deviation)."
    }
  ],
  "proTips": [
    "VAR.S = (STDEV.S)^2."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does VAR.S use N or N-1 in its denominator?",
    "expectedAnswer": "N-1"
  },
  "practice": {
    "instructions": "Find sample variance for B2:B3.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VAR.S(B2:B3)",
    "expectedValue": 50
  }
},
{
  "id": "vara",
  "title": "VARA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Inclusive Sample Variance",
    "description": "Estimates variance based on a sample, including text and logical values.",
    "concept": "Think of it as the total sample spread"
  },
  "whyItExists": "Allows variation analysis on datasets containing text flags (0) or logicals (1/0).",
  "whenToUse": "Use when non-numeric data should be considered in the variance model.",
  "realWorldUseCases": [
    "Analyzing consistency when 'Fail' (0) counts as a measurement."
  ],
  "businessExample": {
    "scenario": "An analyst checks inclusive variance for {10, FALSE}.",
    "formula": "=VARA(B2:B3)"
  },
  "syntax": "=VARA(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Sample values."
    }
  ],
  "detailedExamples": [
    {
      "title": "Mixed Variation",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "FALSE"
          ]
        ]
      },
      "stepByStep": [
        "FALSE=0. Mean=5.",
        "N-1 correction: (25+25)/1.",
        "Result: 50."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Text as 0",
      "desc": "Text is treated as 0."
    }
  ],
  "proTips": [
    "Almost always returns same as VAR.S if all data is numeric."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What is TRUE treated as in VARA?",
    "expectedAnswer": "1"
  },
  "practice": {
    "instructions": "Find VARA for 10 and FALSE.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        "FALSE"
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VARA(B2:B3)",
    "expectedValue": 50
  }
},
{
  "id": "varpa",
  "title": "VARPA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Inclusive Population Variance",
    "description": "Calculates variance based on the entire population, including text and logical values.",
    "concept": "Think of it as the total inclusive variation"
  },
  "whyItExists": "Measures exact population variation where all items (numeric or not) are included.",
  "whenToUse": "Use for complete datasets with mixed data types.",
  "realWorldUseCases": [
    "Entire team performance variation including 'No Score' (0) flags."
  ],
  "businessExample": {
    "scenario": "An analyst checks total variance for {10, FALSE}.",
    "formula": "=VARPA(B2:B3)"
  },
  "syntax": "=VARPA(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Population values."
    }
  ],
  "detailedExamples": [
    {
      "title": "Pop Mixed",
      "table": {
        "headers": [
          "V"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "FALSE"
          ]
        ]
      },
      "stepByStep": [
        "FALSE=0. Mean=5.",
        "Average squared deviations: 25.",
        "Result: 25."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Denominator",
      "desc": "Uses N instead of N-1."
    }
  ],
  "proTips": [
    "VARPA = (STDEVPA)^2."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "What value is assigned to text in VARPA?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Find VARPA for 10 and FALSE.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        "FALSE"
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VARPA(B2:B3)",
    "expectedValue": 25
  }
},
{
  "id": "weibull.dist",
  "title": "WEIBULL.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Weibull Distribution",
    "description": "Returns the Weibull distribution.",
    "concept": "Think of it as the reliability analyzer: \"How likely is a part to fail after X hours?\""
  },
  "whyItExists": "It is the primary tool for life-testing and reliability engineering. It can model increasing, decreasing, or constant failure rates.",
  "whenToUse": "Use to analyze time-to-failure in machines or electronic components.",
  "realWorldUseCases": [
    "Predicting when a car engine might fail.",
    "Estimating the lifespan of a lightbulb."
  ],
  "businessExample": {
    "scenario": "An engineer checks failure prob at 100 hours (Alpha 1, Beta 100).",
    "formula": "=WEIBULL.DIST(100, 1, 100, TRUE)"
  },
  "syntax": "=WEIBULL.DIST(x, alpha, beta, cumulative)",
  "syntaxBreakdown": [
    {
      "arg": "alpha",
      "desc": "Shape parameter."
    },
    {
      "arg": "beta",
      "desc": "Scale parameter."
    }
  ],
  "detailedExamples": [
    {
      "title": "Reliability",
      "table": {
        "headers": [
          "X",
          "A",
          "B"
        ],
        "rows": [
          [
            "100",
            "1",
            "100"
          ]
        ]
      },
      "stepByStep": [
        "X=100, Alpha=1, Beta=100.",
        "Cumulative TRUE.",
        "Result: 0.6321."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "X < 0",
      "desc": "X must be non-negative."
    }
  ],
  "proTips": [
    "If alpha=1, it is identical to the Exponential distribution."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Is Weibull used in life-testing?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Find Weibull prob for (100, 1, 100, TRUE).",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      2,
      0
    ],
    "expectedFormula": "WEIBULL.DIST(100,1,100,TRUE)",
    "expectedValue": 0.6321
  }
},
{
  "id": "z.test",
  "title": "Z.TEST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Z-Test",
    "description": "One-tailed p-value of a z-test.",
    "concept": "Think of it as the mean checker: \"Is mean significantly higher?\""
  },
  "whyItExists": "Critical for hypothesis testing.",
  "whenToUse": "Verify if sample mean represents real shift.",
  "realWorldUseCases": [
    "Training improvement.",
    "Product weight drift."
  ],
  "businessExample": {
    "scenario": "Test if weights are significantly higher than 12g.",
    "formula": "=Z.TEST(B2:B10, 12)"
  },
  "syntax": "=Z.TEST(array, x, [sigma])",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "Hypothesized value."
    }
  ],
  "detailedExamples": [
    {
      "title": "Gain",
      "table": {
        "headers": [
          "S"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Sample Mean=15.",
        "Result p: 0.78."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Sample Size",
      "desc": "Best for large datasets."
    }
  ],
  "proTips": [
    "Low p = significant."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "One or two tailed?",
    "expectedAnswer": "one-tailed"
  },
  "practice": {
    "instructions": "Z.TEST B2:B3 with value 12.",
    "initialData": [
      [
        "D"
      ],
      [
        10
      ],
      [
        20
      ],
      [
        "Res",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "Z.TEST(B2:B3,12)",
    "expectedValue": 0.78
  }
}
];