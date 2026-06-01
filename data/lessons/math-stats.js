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
    "title": "Measuring Spread with AVEDEV",
    "description": "Calculates the average of the absolute deviations of data points from their mean.",
    "concept": "Think of it as 'on average, how far does each number stray from the middle?'"
  },
  "whyItExists": "Standard deviation squares distances, which can over-emphasize outliers. AVEDEV gives a more balanced look.",
  "whenToUse": "Measure consistency in a dataset.",
  "realWorldUseCases": [
    "Production consistency.",
    "Test score spread."
  ],
  "businessExample": {
    "scenario": "A manager wants to know how much daily sales fluctuate.",
    "formula": "=AVEDEV(A2:A5)"
  },
  "syntax": "=AVEDEV(number1, [number2], ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "First number/range."
    }
  ],
  "detailedExamples": [
    {
      "title": "Sales Consistency Check",
      "table": {
        "headers": [
          "A (Daily Sales)"
        ],
        "rows": [
          [
            "80"
          ],
          [
            "100"
          ],
          [
            "120"
          ],
          [
            "140"
          ]
        ]
      },
      "stepByStep": [
        "Mean = 110.",
        "Deviations: 30, 10, 10, 30.",
        "Average: 20."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Absolute values",
      "desc": "Negative differences become positive."
    }
  ],
  "proTips": [
    "Robust vs outliers."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Find AVEDEV for 10, 20, 30, 40",
    "expectedAnswer": "7.5"
  },
  "practice": {
    "instructions": "Calculate AVEDEV for the sales column.",
    "initialData": [
      [
        "Sales"
      ],
      [
        50
      ],
      [
        60
      ],
      [
        70
      ],
      [
        80
      ],
      [
        90
      ],
      [
        "Result",
        ""
      ]
    ],
    "targetCell": [
      6,
      1
    ],
    "expectedFormula": "AVEDEV(A2:A6)",
    "expectedValue": 12
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
    "description": "Calculates the arithmetic mean.",
    "concept": "If all values were equal, what would each one be?"
  },
  "whyItExists": "Fundamental way to identify the central point.",
  "whenToUse": "Find typical values.",
  "realWorldUseCases": [
    "Class marks.",
    "Daily revenue."
  ],
  "businessExample": {
    "scenario": "Average marks for the class.",
    "formula": "=AVERAGE(A2:A5)"
  },
  "syntax": "=AVERAGE(number1, [number2], ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "First range."
    }
  ],
  "detailedExamples": [
    {
      "title": "Class Marks",
      "table": {
        "headers": [
          "A (Marks)"
        ],
        "rows": [
          [
            "60"
          ],
          [
            "70"
          ],
          [
            "80"
          ],
          [
            "90"
          ]
        ]
      },
      "stepByStep": [
        "Sum: 300.",
        "Count: 4.",
        "Result: 75."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Zeros vs Blanks",
      "desc": "AVERAGE counts 0 but ignores blanks."
    }
  ],
  "proTips": [
    "Represents central performance."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Average of 25, 50, 75, 100",
    "expectedAnswer": "62.5"
  },
  "practice": {
    "instructions": "Find the average score.",
    "initialData": [
      [
        "Scores"
      ],
      [
        55
      ],
      [
        65
      ],
      [
        75
      ],
      [
        85
      ],
      [
        95
      ],
      [
        "Avg",
        ""
      ]
    ],
    "targetCell": [
      6,
      1
    ],
    "expectedFormula": "AVERAGE(B2:B6)",
    "expectedValue": 75
  }
},
{
  "id": "averagea",
  "title": "AVERAGEA Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "The All-Inclusive Mean",
    "description": "Average including text (0) and logicals (TRUE=1, FALSE=0).",
    "concept": "Count every cell, even if it's not a number."
  },
  "whyItExists": "Sometimes 'N/A' should count as 0 rather than being ignored.",
  "whenToUse": "Survey data with mixed types.",
  "realWorldUseCases": [
    "Attendance.",
    "Success rates."
  ],
  "businessExample": {
    "scenario": "Average including pass/fail flags.",
    "formula": "=AVERAGEA(A2:A5)"
  },
  "syntax": "=AVERAGEA(value1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "value1",
      "desc": "Range to average."
    }
  ],
  "detailedExamples": [
    {
      "title": "Mixed Types",
      "table": {
        "headers": [
          "A"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "TRUE"
          ],
          [
            "FALSE"
          ],
          [
            "30"
          ]
        ]
      },
      "stepByStep": [
        "TRUE=1, FALSE=0.",
        "Sum: 41.",
        "Result: 10.25."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Text as Zero",
      "desc": "AVERAGEA treats all text as 0."
    }
  ],
  "proTips": [
    "Includes logical values."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Replace FALSE with text. Does result change?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Calculate AVERAGEA for the table.",
    "initialData": [
      [
        "A"
      ],
      [
        20
      ],
      [
        "TRUE"
      ],
      [
        "Text"
      ],
      [
        40
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
    "expectedFormula": "AVERAGEA(A2:A5)",
    "expectedValue": 15.25
  }
},
{
  "id": "averageif",
  "title": "AVERAGEIF Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Conditional Averaging",
    "description": "Average of cells matching a single criteria.",
    "concept": "Filtered average: 'Avg sales for IT only'."
  },
  "whyItExists": "Segment analysis without manual filtering.",
  "whenToUse": "Average by category.",
  "realWorldUseCases": [
    "Salary by dept.",
    "High value orders."
  ],
  "businessExample": {
    "scenario": "Find avg salary for IT.",
    "formula": "=AVERAGEIF(A2:A5,\"IT\",B2:B5)"
  },
  "syntax": "=AVERAGEIF(range, criteria, [avg_range])",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Range to filter."
    }
  ],
  "detailedExamples": [
    {
      "title": "IT Salaries",
      "table": {
        "headers": [
          "A (Dept)",
          "B (Salary)"
        ],
        "rows": [
          [
            "IT",
            "50000"
          ],
          [
            "HR",
            "30000"
          ],
          [
            "IT",
            "70000"
          ],
          [
            "Sales",
            "40000"
          ]
        ]
      },
      "stepByStep": [
        "1. IT only: 50000, 70000.",
        "2. Result: 60000."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Quotes",
      "desc": "Text rules need quotes."
    }
  ],
  "proTips": [
    "Wildcards work."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Find average for HR in table.",
    "expectedAnswer": "30000"
  },
  "practice": {
    "instructions": "Find average revenue for East.",
    "initialData": [
      [
        "Region",
        "Revenue"
      ],
      [
        "East",
        200
      ],
      [
        "West",
        150
      ],
      [
        "East",
        300
      ],
      [
        "North",
        250
      ],
      [
        "East",
        350
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
    "expectedFormula": "AVERAGEIF(A2:A6,\"East\",B2:B6)",
    "expectedValue": 283.33
  }
},
{
  "id": "averageifs",
  "title": "AVERAGEIFS Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Multi-Criteria Averaging",
    "description": "Average for cells meeting multiple rules.",
    "concept": "Precise filtering: 'Avg sales of A in Feb'."
  },
  "whyItExists": "Granular filtering in one step.",
  "whenToUse": "Deep dive reporting.",
  "realWorldUseCases": [
    "Bonus tracking.",
    "Product months."
  ],
  "businessExample": {
    "scenario": "IT staff with >3 years experience.",
    "formula": "=AVERAGEIFS(B2:B5,A2:A5,\"IT\",C2:C5,\">3\")"
  },
  "syntax": "=AVERAGEIFS(avg_range, r1, c1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "average_range",
      "desc": "Range to average."
    }
  ],
  "detailedExamples": [
    {
      "title": "Complex Filter",
      "table": {
        "headers": [
          "A (Dept)",
          "B (Salary)",
          "C (Years)"
        ],
        "rows": [
          [
            "IT",
            "50000",
            "2"
          ],
          [
            "IT",
            "80000",
            "6"
          ],
          [
            "HR",
            "30000",
            "4"
          ],
          [
            "IT",
            "70000",
            "5"
          ]
        ]
      },
      "stepByStep": [
        "1. IT staff with >3 yrs.",
        "2. Result: 75000."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Arg Order",
      "desc": "Average range is FIRST."
    }
  ],
  "proTips": [
    "All criteria must be true."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Add years < 6 criteria?",
    "expectedAnswer": "C2:C5, \"<6\""
  },
  "practice": {
    "instructions": "Average sales of Product A in Feb.",
    "initialData": [
      [
        "Product",
        "Sales",
        "Month"
      ],
      [
        "A",
        100,
        "Jan"
      ],
      [
        "B",
        200,
        "Feb"
      ],
      [
        "A",
        300,
        "Feb"
      ],
      [
        "A",
        400,
        "Mar"
      ],
      [
        "B",
        150,
        "Jan"
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      6,
      1
    ],
    "expectedFormula": "AVERAGEIFS(B2:B6,A2:A6,\"A\",C2:C6,\"Feb\")",
    "expectedValue": 300
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
    "description": "Cumulative beta distribution.",
    "concept": "Think of it as modeling project completion likelihood."
  },
  "whyItExists": "Model outcomes bounded between 0 and 1.",
  "whenToUse": "PERT modeling.",
  "realWorldUseCases": [
    "Finishing on time.",
    "Market share."
  ],
  "businessExample": {
    "scenario": "Cumulative prob at 0.4.",
    "formula": "=BETA.DIST(0.4,2,3,TRUE)"
  },
  "syntax": "=BETA.DIST(x, alpha, beta, cum, [A], [B])",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "Value to evaluate."
    }
  ],
  "detailedExamples": [
    {
      "title": "Prob Model",
      "table": {
        "headers": [
          "x",
          "Alpha",
          "Beta"
        ],
        "rows": [
          [
            "0.4",
            "2",
            "3"
          ]
        ]
      },
      "stepByStep": [
        "Returns area to left.",
        "Result: 0.5248."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Bounds",
      "desc": "x must be between A and B."
    }
  ],
  "proTips": [
    "Default A=0, B=1."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Change x to 0.6. Result rises?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Compute BETA.DIST for row 2 (x=0.2, a=2, b=5).",
    "initialData": [
      [
        "x",
        "Alpha",
        "Beta"
      ],
      [
        0.2,
        2,
        5
      ],
      [
        0.5,
        3,
        4
      ],
      [
        0.7,
        2,
        2
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "BETA.DIST(A2,B2,C2,TRUE)",
    "expectedValue": 0.655
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
    "description": "Finds x from cumulative probability.",
    "concept": "If you know the probability, what's the cutoff?"
  },
  "whyItExists": "Find thresholds for confidence targets.",
  "whenToUse": "Cutoff points.",
  "realWorldUseCases": [
    "Yield targets.",
    "Confidence limits."
  ],
  "businessExample": {
    "scenario": "Cutoff for 60% probability.",
    "formula": "=BETA.INV(0.6,2,3)"
  },
  "syntax": "=BETA.INV(p, alpha, beta, [A], [B])",
  "syntaxBreakdown": [
    {
      "arg": "p",
      "desc": "Probability."
    }
  ],
  "detailedExamples": [
    {
      "title": "Reverse Lookup",
      "table": {
        "headers": [
          "Prob",
          "Alpha",
          "Beta"
        ],
        "rows": [
          [
            "0.6",
            "2",
            "3"
          ]
        ]
      },
      "stepByStep": [
        "1. Prob=0.6.",
        "2. Result: 0.456."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Range",
      "desc": "Prob must be 0-1."
    }
  ],
  "proTips": [
    "Inverse of distribution."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Try 0.8. Result rises?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Find BETA.INV for row 2 (p=0.2, a=2, b=5).",
    "initialData": [
      [
        "P",
        "B",
        "C"
      ],
      [
        0.2,
        2,
        5
      ],
      [
        0.5,
        3,
        4
      ],
      [
        0.9,
        2,
        2
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "BETA.INV(A2,B2,C2)",
    "expectedValue": 0.132
  }
},
{
  "id": "binom.dist",
  "title": "BINOM.DIST Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Yes/No Odds",
    "description": "Individual term binomial probability.",
    "concept": "Think of a coin flip: 'Chance of 4 heads in 10 flips?'"
  },
  "whyItExists": "Analyze processes with only two outcomes.",
  "whenToUse": "Defect rates.",
  "realWorldUseCases": [
    "Exactly 4 successes.",
    "QC checks."
  ],
  "businessExample": {
    "scenario": "Odds for exactly 4 in 10 flips (0.5 p).",
    "formula": "=BINOM.DIST(4,10,0.5,FALSE)"
  },
  "syntax": "=BINOM.DIST(s, n, p, cum)",
  "syntaxBreakdown": [
    {
      "arg": "s",
      "desc": "Successes."
    }
  ],
  "detailedExamples": [
    {
      "title": "Exact Odds",
      "table": {
        "headers": [
          "S",
          "T",
          "P"
        ],
        "rows": [
          [
            "4",
            "10",
            "0.5"
          ]
        ]
      },
      "stepByStep": [
        "Result: 0.205 (20.5% chance)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Cumulative",
      "desc": "FALSE for exact, TRUE for 'at most'."
    }
  ],
  "proTips": [
    "Used in experiments."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Find for 5 successes (0.5 p, 10 n).",
    "expectedAnswer": "0.246"
  },
  "practice": {
    "instructions": "Compute BINOM.DIST for 2 in 5 (0.5 p).",
    "initialData": [
      [
        "s",
        "n",
        "p"
      ],
      [
        2,
        5,
        0.5
      ],
      [
        3,
        8,
        0.6
      ],
      [
        4,
        10,
        0.4
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "BINOM.DIST(A2,B2,C2,FALSE)",
    "expectedValue": 0.3125
  }
},
{
  "id": "binom.inv",
  "title": "BINOM.INV Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Success Targets",
    "description": "Smallest value where cumulative binomial >= alpha.",
    "concept": "Threshold: 'How many sales for 70% certainty?'"
  },
  "whyItExists": "Helps in planning and risk targets.",
  "whenToUse": "Setting benchmarks.",
  "realWorldUseCases": [
    "Inventory mins.",
    "Sales targets."
  ],
  "businessExample": {
    "scenario": "Min success for 70% certainty.",
    "formula": "=BINOM.INV(10,0.5,0.7)"
  },
  "syntax": "=BINOM.INV(n, p, alpha)",
  "syntaxBreakdown": [
    {
      "arg": "alpha",
      "desc": "Target certainty."
    }
  ],
  "detailedExamples": [
    {
      "title": "Worst Case",
      "table": {
        "headers": [
          "T",
          "P",
          "A"
        ],
        "rows": [
          [
            "10",
            "0.5",
            "0.7"
          ]
        ]
      },
      "stepByStep": [
        "Alpha=0.7.",
        "Result: 6."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Significance",
      "desc": "Alpha is 0-1."
    }
  ],
  "proTips": [
    "Always returns whole number."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Try alpha 0.9. Result rises?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Compute BINOM.INV for row 2.",
    "initialData": [
      [
        "n",
        "p",
        "a"
      ],
      [
        5,
        0.5,
        0.6
      ],
      [
        8,
        0.4,
        0.7
      ],
      [
        10,
        0.3,
        0.8
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "BINOM.INV(A2,B2,C2)",
    "expectedValue": 3
  }
},
{
  "id": "chisq.dist",
  "title": "CHISQ.DIST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Testing Variation",
    "description": "Left-tailed Chi-square probability.",
    "concept": "Typically used for 'Goodness of Fit' checks."
  },
  "whyItExists": "Compare variance to expected models.",
  "whenToUse": "Research stats.",
  "realWorldUseCases": [
    "Fair die test.",
    "Pattern check."
  ],
  "businessExample": {
    "scenario": "Prob for stat 8 with 4 DF.",
    "formula": "=CHISQ.DIST(8,4,TRUE)"
  },
  "syntax": "=CHISQ.DIST(x, df, cum)",
  "syntaxBreakdown": [
    {
      "arg": "df",
      "desc": "Degrees of freedom."
    }
  ],
  "detailedExamples": [
    {
      "title": "Goodness Check",
      "table": {
        "headers": [
          "x",
          "df"
        ],
        "rows": [
          [
            "8",
            "4"
          ]
        ]
      },
      "stepByStep": [
        "Result: 0.9085."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Negative",
      "desc": "x must be non-negative."
    }
  ],
  "proTips": [
    "Used in hypothesis tests."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Change df to 6. Does result change?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Compute CHISQ.DIST for row 2 (x=5, df=2).",
    "initialData": [
      [
        "x",
        "df"
      ],
      [
        5,
        2
      ],
      [
        10,
        4
      ],
      [
        15,
        6
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "CHISQ.DIST(A2,B2,TRUE)",
    "expectedValue": 0.9179
  }
},
{
  "id": "chisq.inv",
  "title": "CHISQ.INV Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Critical Value Finder",
    "description": "Inverse of left-tailed Chi-square.",
    "concept": "Finding the threshold score for confidence levels."
  },
  "whyItExists": "Rejection cutoff for tests.",
  "whenToUse": "Threshold setting.",
  "realWorldUseCases": [
    "QC models.",
    "Test regions."
  ],
  "businessExample": {
    "scenario": "Cutoff for 5% alpha and 4 DF.",
    "formula": "=CHISQ.INV(0.05,4)"
  },
  "syntax": "=CHISQ.INV(p, df)",
  "syntaxBreakdown": [
    {
      "arg": "p",
      "desc": "Area left."
    }
  ],
  "detailedExamples": [
    {
      "title": "Cutoff Search",
      "table": {
        "headers": [
          "Prob",
          "df"
        ],
        "rows": [
          [
            "0.05",
            "4"
          ]
        ]
      },
      "stepByStep": [
        "Result: 0.7107."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Tail",
      "desc": "This is left-tailed."
    }
  ],
  "proTips": [
    "Used for decision bounds."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Try 0.01. Result drops?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Compute CHISQ.INV for row 2.",
    "initialData": [
      [
        "p",
        "df"
      ],
      [
        0.1,
        2
      ],
      [
        0.05,
        4
      ],
      [
        0.01,
        6
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "CHISQ.INV(A2,B2)",
    "expectedValue": 0.2107
  }
},
{
  "id": "chisq.test",
  "title": "CHISQ.TEST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Independence Testing",
    "description": "Probability for the chi-square statistic.",
    "concept": "Are these two variables related? (e.g. choice vs gender)."
  },
  "whyItExists": "Checks significance act vs exp.",
  "whenToUse": "Market research.",
  "realWorldUseCases": [
    "Campaign impact.",
    "Demographics."
  ],
  "businessExample": {
    "scenario": "Compare act vs exp sales.",
    "formula": "=CHISQ.TEST(A2:A3,B2:B3)"
  },
  "syntax": "=CHISQ.TEST(act, exp)",
  "syntaxBreakdown": [
    {
      "arg": "act",
      "desc": "Observed data."
    }
  ],
  "detailedExamples": [
    {
      "title": "Independence",
      "table": {
        "headers": [
          "Observed",
          "Expected"
        ],
        "rows": [
          [
            "30",
            "25"
          ],
          [
            "20",
            "25"
          ]
        ]
      },
      "stepByStep": [
        "Result p: 0.157."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Counts",
      "desc": "Expecteds should be >= 5."
    }
  ],
  "proTips": [
    "Low p = link exists."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Add more rows. p-value drops?",
    "expectedAnswer": "Usually yes"
  },
  "practice": {
    "instructions": "Perform CHISQ.TEST on data.",
    "initialData": [
      [
        "Obs",
        "Exp"
      ],
      [
        40,
        35
      ],
      [
        30,
        25
      ],
      [
        20,
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
    "expectedFormula": "CHISQ.TEST(A2:A4,B2:B4)",
    "expectedValue": 0.102
  }
},
{
  "id": "confidence.norm",
  "title": "CONFIDENCE.NORM Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Margin of Error",
    "description": "Confidence interval using normal distribution.",
    "concept": "How accurate is my survey? 'Avg is 10 +/- 2'."
  },
  "whyItExists": "Quantify uncertainty in samples.",
  "whenToUse": "Polling precision.",
  "realWorldUseCases": [
    "Poll margins.",
    "Weight ranges."
  ],
  "businessExample": {
    "scenario": "Margin for 95% (8 SD, 64 n).",
    "formula": "=CONFIDENCE.NORM(0.05,8,64)"
  },
  "syntax": "=CONFIDENCE.NORM(a, sd, n)",
  "syntaxBreakdown": [
    {
      "arg": "a",
      "desc": "Alpha."
    }
  ],
  "detailedExamples": [
    {
      "title": "Survey Precision",
      "table": {
        "headers": [
          "a",
          "sd",
          "n"
        ],
        "rows": [
          [
            "0.05",
            "8",
            "64"
          ]
        ]
      },
      "stepByStep": [
        "Result: 1.96."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Small n",
      "desc": "Use .T if n < 30."
    }
  ],
  "proTips": [
    "Higher n = smaller margin."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Change n to 100. Margin drops?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Compute margin for row 2 (a=0.05, sd=10, n=50).",
    "initialData": [
      [
        "a",
        "sd",
        "n"
      ],
      [
        0.05,
        10,
        50
      ],
      [
        0.01,
        8,
        100
      ],
      [
        0.1,
        6,
        30
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "CONFIDENCE.NORM(A2,B2,C2)",
    "expectedValue": 2.77
  }
},
{
  "id": "confidence.t",
  "title": "CONFIDENCE.T Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Small Sample Error",
    "description": "Confidence interval using t-distribution.",
    "concept": "Corrects for higher uncertainty in small groups."
  },
  "whyItExists": "Normal stats underestimate small samples.",
  "whenToUse": "Pilot studies.",
  "realWorldUseCases": [
    "Luxury batches.",
    "Small teams."
  ],
  "businessExample": {
    "scenario": "Margin for sample of 20.",
    "formula": "=CONFIDENCE.T(0.05,8,20)"
  },
  "syntax": "=CONFIDENCE.T(a, sd, n)",
  "syntaxBreakdown": [
    {
      "arg": "n",
      "desc": "Sample size."
    }
  ],
  "detailedExamples": [
    {
      "title": "Pilot Precision",
      "table": {
        "headers": [
          "a",
          "sd",
          "n"
        ],
        "rows": [
          [
            "0.05",
            "8",
            "20"
          ]
        ]
      },
      "stepByStep": [
        "Result: 3.74 (larger than .NORM)."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "n=1",
      "desc": "Fails for size 1."
    }
  ],
  "proTips": [
    "Safer than .NORM for uncertainty."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Is .T larger than .NORM?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Compute CONFIDENCE.T for row 2 (a=0.05, sd=10, n=15).",
    "initialData": [
      [
        "a",
        "sd",
        "n"
      ],
      [
        0.05,
        10,
        15
      ],
      [
        0.01,
        8,
        25
      ],
      [
        0.1,
        6,
        10
      ],
      [
        "Res",
        "",
        ""
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "CONFIDENCE.T(A2,B2,C2)",
    "expectedValue": 5.53
  }
},
{
  "id": "correl",
  "title": "CORREL Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "Relationship Strength",
    "description": "Linear correlation coefficient.",
    "concept": "Does X follow Y? (-1 to +1)."
  },
  "whyItExists": "Know if variables are linked.",
  "whenToUse": "Identifying trends.",
  "realWorldUseCases": [
    "Ad vs Revenue.",
    "Hours vs Grades."
  ],
  "businessExample": {
    "scenario": "Link study hours to scores.",
    "formula": "=CORREL(A2:A5,B2:B5)"
  },
  "syntax": "=CORREL(a1, a2)",
  "syntaxBreakdown": [
    {
      "arg": "a1",
      "desc": "First range."
    }
  ],
  "detailedExamples": [
    {
      "title": "Perfect Link",
      "table": {
        "headers": [
          "H",
          "S"
        ],
        "rows": [
          [
            "1",
            "30"
          ],
          [
            "4",
            "90"
          ]
        ]
      },
      "stepByStep": [
        "Perfectly linear. Result: 1."
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
    "+1 is perfect positive."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Change last score to 80. Result drops?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Find correlation for the data.",
    "initialData": [
      [
        "Hours",
        "Score"
      ],
      [
        1,
        20
      ],
      [
        2,
        25
      ],
      [
        3,
        35
      ],
      [
        4,
        30
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
    "expectedFormula": "CORREL(A2:A5,B2:B5)",
    "expectedValue": 0.82
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
    "description": "Counts cells containing numbers.",
    "concept": "How many actual data points are here?"
  },
  "whyItExists": "Isolate numbers from notes.",
  "whenToUse": "Reports totals.",
  "realWorldUseCases": [
    "Sales totals.",
    "Attendance."
  ],
  "businessExample": {
    "scenario": "Count numeric scores in list.",
    "formula": "=COUNT(A2:A5)"
  },
  "syntax": "=COUNT(v1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "v1",
      "desc": "Range to count."
    }
  ],
  "detailedExamples": [
    {
      "title": "Data Audit",
      "table": {
        "headers": [
          "A"
        ],
        "rows": [
          [
            "10"
          ],
          [
            "Text"
          ],
          [
            "30"
          ]
        ]
      },
      "stepByStep": [
        "Checks types. Total: 2."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Logical",
      "desc": "Ignores TRUE/FALSE in cells."
    }
  ],
  "proTips": [
    "Counts dates too!"
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Add TRUE. Count rises?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Count numeric values in table.",
    "initialData": [
      [
        "A"
      ],
      [
        5
      ],
      [
        "Text"
      ],
      [
        10
      ],
      [
        "TRUE"
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
      6,
      1
    ],
    "expectedFormula": "COUNT(A2:A6)",
    "expectedValue": 3
  }
},
{
  "id": "counta",
  "title": "COUNTA Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Content Counter",
    "description": "Counts all non-empty cells.",
    "concept": "How many rows have SOMETHING in them?"
  },
  "whyItExists": "Audit completion regardless of type.",
  "whenToUse": "Attendee lists.",
  "realWorldUseCases": [
    "Signups.",
    "Surveys."
  ],
  "businessExample": {
    "scenario": "Count all non-empty entries.",
    "formula": "=COUNTA(A2:A5)"
  },
  "syntax": "=COUNTA(v1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "v1",
      "desc": "Range."
    }
  ],
  "detailedExamples": [
    {
      "title": "Completion",
      "table": {
        "headers": [
          "A"
        ],
        "rows": [
          [
            "10"
          ],
          [
            ""
          ],
          [
            "40"
          ]
        ]
      },
      "stepByStep": [
        "Found 2 non-empty. Result: 2."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Space",
      "desc": "A space ' ' is NOT empty."
    }
  ],
  "proTips": [
    "Use for registry lists."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Add space in blank cell. Count rises?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Count non-empty cells.",
    "initialData": [
      [
        "A"
      ],
      [
        "Data"
      ],
      [
        100
      ],
      [
        ""
      ],
      [
        "Text"
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
      6,
      1
    ],
    "expectedFormula": "COUNTA(A2:A6)",
    "expectedValue": 4
  }
},
{
  "id": "countblank",
  "title": "COUNTBLANK Function",
  "category": "statistical",
  "difficulty": "Beginner",
  "xp": 150,
  "introduction": {
    "title": "Empty Cell Counter",
    "description": "Counts empty cells in a range.",
    "concept": "Gap detector: 'How many people didn't answer?'"
  },
  "whyItExists": "Detect gaps in columns.",
  "whenToUse": "Data cleaning.",
  "realWorldUseCases": [
    "Missing SSNs."
  ],
  "businessExample": {
    "scenario": "Find missing email addresses.",
    "formula": "=COUNTBLANK(C2:C100)"
  },
  "syntax": "=COUNTBLANK(range)",
  "syntaxBreakdown": [
    {
      "arg": "range",
      "desc": "Area to check."
    }
  ],
  "detailedExamples": [
    {
      "title": "Gaps",
      "table": {
        "headers": [
          "Email"
        ],
        "rows": [
          [
            "a@a.com"
          ],
          [
            ""
          ],
          [
            ""
          ]
        ]
      },
      "stepByStep": [
        "Result: 2."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Spaces",
      "desc": "Space ' ' is not blank."
    }
  ],
  "proTips": [
    "Pairs with COUNTA."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Does it count spaces?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Count blank emails.",
    "initialData": [
      [
        "Name",
        "Email"
      ],
      [
        "A",
        "a@a.com"
      ],
      [
        "B",
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
    "title": "Single-Criteria Count",
    "description": "Count cells meeting one criteria.",
    "concept": "Filter then tally: 'How many students got an A?'"
  },
  "whyItExists": "Instant summaries of subsets.",
  "whenToUse": "Reporting.",
  "realWorldUseCases": [
    "Grade A count."
  ],
  "businessExample": {
    "scenario": "Orders > $100.",
    "formula": "=COUNTIF(B2:B50, \">100\")"
  },
  "syntax": "=COUNTIF(range, criteria)",
  "syntaxBreakdown": [
    {
      "arg": "criteria",
      "desc": "Text or math rule."
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
        "Result: 2."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Quotes",
      "desc": "Text rules like \">10\" need quotes."
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
    "instructions": "Count scores > 100.",
    "initialData": [
      [
        "V"
      ],
      [
        150
      ],
      [
        50
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
    "title": "Multi-Criteria Count",
    "description": "Count cells meeting multiple conditions.",
    "concept": "Precise tally: 'How many Apples were sold in Q1?'"
  },
  "whyItExists": "Cross-tabulation in one step.",
  "whenToUse": "Complex metrics.",
  "realWorldUseCases": [
    "Sales by region."
  ],
  "businessExample": {
    "scenario": "North sales > $1000.",
    "formula": "=COUNTIFS(A2:A100, \"North\", B2:B100, \">1000\")"
  },
  "syntax": "=COUNTIFS(r1, c1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "r1",
      "desc": "First range."
    }
  ],
  "detailedExamples": [
    {
      "title": "Complex",
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
        "Result: 1."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Range Size",
      "desc": "Must be same size."
    }
  ],
  "proTips": [
    "Uses AND logic."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Ranges same size?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Count Reg 'N' and Val > 100.",
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
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "COVARIANCE.P Analyzer",
    "description": "Calculates the COVARIANCE.P property for advanced datasets.",
    "concept": "the specialized COVARIANCE.P engine"
  },
  "whyItExists": "Core component of COVARIANCE.P evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform COVARIANCE.P on data.",
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
      "title": "COVARIANCE.P Example",
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
        "Calculate COVARIANCE.P."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use COVARIANCE.P?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run COVARIANCE.P on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COVARIANCE.P(A2:A3)",
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
    "title": "COVARIANCE.S Analyzer",
    "description": "Calculates the COVARIANCE.S property for advanced datasets.",
    "concept": "the specialized COVARIANCE.S engine"
  },
  "whyItExists": "Core component of COVARIANCE.S evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform COVARIANCE.S on data.",
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
      "title": "COVARIANCE.S Example",
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
        "Calculate COVARIANCE.S."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use COVARIANCE.S?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run COVARIANCE.S on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "COVARIANCE.S(A2:A3)",
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
    "title": "DEVSQ Analyzer",
    "description": "Calculates the DEVSQ property for advanced datasets.",
    "concept": "the specialized DEVSQ engine"
  },
  "whyItExists": "Core component of DEVSQ evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform DEVSQ on data.",
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
      "title": "DEVSQ Example",
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
        "Calculate DEVSQ."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use DEVSQ?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run DEVSQ on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "DEVSQ(A2:A3)",
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
    "title": "EXPON.DIST Analyzer",
    "description": "Calculates the EXPON.DIST property for advanced datasets.",
    "concept": "the specialized EXPON.DIST engine"
  },
  "whyItExists": "Core component of EXPON.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform EXPON.DIST on data.",
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
      "title": "EXPON.DIST Example",
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
        "Calculate EXPON.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use EXPON.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run EXPON.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "EXPON.DIST(A2:A3)",
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
    "title": "F.DIST Analyzer",
    "description": "Calculates the F.DIST property for advanced datasets.",
    "concept": "the specialized F.DIST engine"
  },
  "whyItExists": "Core component of F.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform F.DIST on data.",
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
      "title": "F.DIST Example",
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
        "Calculate F.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use F.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run F.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "F.DIST(A2:A3)",
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
    "title": "F.INV Analyzer",
    "description": "Calculates the F.INV property for advanced datasets.",
    "concept": "the specialized F.INV engine"
  },
  "whyItExists": "Core component of F.INV evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform F.INV on data.",
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
      "title": "F.INV Example",
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
        "Calculate F.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use F.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run F.INV on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "F.INV(A2:A3)",
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
    "title": "F.TEST Analyzer",
    "description": "Calculates the F.TEST property for advanced datasets.",
    "concept": "the specialized F.TEST engine"
  },
  "whyItExists": "Core component of F.TEST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform F.TEST on data.",
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
      "title": "F.TEST Example",
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
        "Calculate F.TEST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use F.TEST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run F.TEST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "F.TEST(A2:A3)",
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
    "title": "FISHER Analyzer",
    "description": "Calculates the FISHER property for advanced datasets.",
    "concept": "the specialized FISHER engine"
  },
  "whyItExists": "Core component of FISHER evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform FISHER on data.",
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
      "title": "FISHER Example",
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
        "Calculate FISHER."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use FISHER?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run FISHER on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "FISHER(A2:A3)",
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
    "title": "FISHERINV Analyzer",
    "description": "Calculates the FISHERINV property for advanced datasets.",
    "concept": "the specialized FISHERINV engine"
  },
  "whyItExists": "Core component of FISHERINV evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform FISHERINV on data.",
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
      "title": "FISHERINV Example",
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
        "Calculate FISHERINV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use FISHERINV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run FISHERINV on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "FISHERINV(A2:A3)",
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
    "title": "FORECAST Analyzer",
    "description": "Calculates the FORECAST property for advanced datasets.",
    "concept": "the specialized FORECAST engine"
  },
  "whyItExists": "Core component of FORECAST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform FORECAST on data.",
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
      "title": "FORECAST Example",
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
        "Calculate FORECAST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use FORECAST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run FORECAST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "FORECAST(A2:A3)",
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
    "title": "FREQUENCY Analyzer",
    "description": "Calculates the FREQUENCY property for advanced datasets.",
    "concept": "the specialized FREQUENCY engine"
  },
  "whyItExists": "Core component of FREQUENCY evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform FREQUENCY on data.",
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
      "title": "FREQUENCY Example",
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
        "Calculate FREQUENCY."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use FREQUENCY?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run FREQUENCY on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "FREQUENCY(A2:A3)",
    "expectedValue": 150
  }
},
{
  "id": "gamma",
  "title": "GAMMA Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Factorial for Decimals",
    "description": "Continuous factorial function.",
    "concept": "Extension: 'What is 4.5 factorial?'"
  },
  "whyItExists": "Advanced math/physics.",
  "whenToUse": "Complex modeling.",
  "realWorldUseCases": [
    "Lifetime models."
  ],
  "businessExample": {
    "scenario": "Gamma for 5 (4!).",
    "formula": "=GAMMA(5)"
  },
  "syntax": "=GAMMA(n)",
  "syntaxBreakdown": [
    {
      "arg": "n",
      "desc": "Value."
    }
  ],
  "detailedExamples": [
    {
      "title": "Factorial",
      "table": {
        "headers": [
          "n"
        ],
        "rows": [
          [
            "5"
          ]
        ]
      },
      "stepByStep": [
        "Result: 24."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Negatives",
      "desc": "Invalid for non-pos integers."
    }
  ],
  "proTips": [
    "GAMMA(n+1)=n!"
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "GAMMA(5)?",
    "expectedAnswer": "24"
  },
  "practice": {
    "instructions": "Find Gamma 5.",
    "initialData": [
      [
        "n"
      ],
      [
        5
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
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "GAMMA.DIST Analyzer",
    "description": "Calculates the GAMMA.DIST property for advanced datasets.",
    "concept": "the specialized GAMMA.DIST engine"
  },
  "whyItExists": "Core component of GAMMA.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform GAMMA.DIST on data.",
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
      "title": "GAMMA.DIST Example",
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
        "Calculate GAMMA.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GAMMA.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run GAMMA.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GAMMA.DIST(A2:A3)",
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
    "title": "GAMMA.INV Analyzer",
    "description": "Calculates the GAMMA.INV property for advanced datasets.",
    "concept": "the specialized GAMMA.INV engine"
  },
  "whyItExists": "Core component of GAMMA.INV evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform GAMMA.INV on data.",
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
      "title": "GAMMA.INV Example",
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
        "Calculate GAMMA.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GAMMA.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run GAMMA.INV on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GAMMA.INV(A2:A3)",
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
    "title": "GAMMALN Analyzer",
    "description": "Calculates the GAMMALN property for advanced datasets.",
    "concept": "the specialized GAMMALN engine"
  },
  "whyItExists": "Core component of GAMMALN evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform GAMMALN on data.",
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
      "title": "GAMMALN Example",
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
        "Calculate GAMMALN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GAMMALN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run GAMMALN on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GAMMALN(A2:A3)",
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
    "title": "GAUSS Analyzer",
    "description": "Calculates the GAUSS property for advanced datasets.",
    "concept": "the specialized GAUSS engine"
  },
  "whyItExists": "Core component of GAUSS evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform GAUSS on data.",
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
      "title": "GAUSS Example",
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
        "Calculate GAUSS."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GAUSS?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run GAUSS on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GAUSS(A2:A3)",
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
    "title": "Geometric Mean",
    "description": "Compounding average of growth.",
    "concept": "Average growth: 'What's the avg annual rate over 5 yrs?'"
  },
  "whyItExists": "Handles compounding growth better than arithmetic mean.",
  "whenToUse": "Investment returns.",
  "realWorldUseCases": [
    "CAGR math."
  ],
  "businessExample": {
    "scenario": "Avg growth for 10% and 20% years.",
    "formula": "=GEOMEAN(1.1, 1.2)"
  },
  "syntax": "=GEOMEAN(number1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "number1",
      "desc": "Positive factors."
    }
  ],
  "detailedExamples": [
    {
      "title": "Returns",
      "table": {
        "headers": [
          "Y1",
          "Y2"
        ],
        "rows": [
          [
            "1.1"
          ],
          [
            "1.2"
          ]
        ]
      },
      "stepByStep": [
        "Result: 1.148."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Negatives",
      "desc": "Must be > 0."
    }
  ],
  "proTips": [
    "Best for compound interest."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Negative allowed?",
    "expectedAnswer": "No"
  },
  "practice": {
    "instructions": "Find GM for 1.1, 1.2.",
    "initialData": [
      [
        "V"
      ],
      [
        1.1
      ],
      [
        1.2
      ]
    ],
    "targetCell": [
      3,
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
    "title": "GROWTH Analyzer",
    "description": "Calculates the GROWTH property for advanced datasets.",
    "concept": "the specialized GROWTH engine"
  },
  "whyItExists": "Core component of GROWTH evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform GROWTH on data.",
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
      "title": "GROWTH Example",
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
        "Calculate GROWTH."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use GROWTH?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run GROWTH on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "GROWTH(A2:A3)",
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
    "title": "HARMEAN Analyzer",
    "description": "Calculates the HARMEAN property for advanced datasets.",
    "concept": "the specialized HARMEAN engine"
  },
  "whyItExists": "Core component of HARMEAN evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform HARMEAN on data.",
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
      "title": "HARMEAN Example",
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
        "Calculate HARMEAN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use HARMEAN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run HARMEAN on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "HARMEAN(A2:A3)",
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
    "title": "HYPGEOM.DIST Analyzer",
    "description": "Calculates the HYPGEOM.DIST property for advanced datasets.",
    "concept": "the specialized HYPGEOM.DIST engine"
  },
  "whyItExists": "Core component of HYPGEOM.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform HYPGEOM.DIST on data.",
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
      "title": "HYPGEOM.DIST Example",
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
        "Calculate HYPGEOM.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use HYPGEOM.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run HYPGEOM.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "HYPGEOM.DIST(A2:A3)",
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
    "title": "INTERCEPT Analyzer",
    "description": "Calculates the INTERCEPT property for advanced datasets.",
    "concept": "the specialized INTERCEPT engine"
  },
  "whyItExists": "Core component of INTERCEPT evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform INTERCEPT on data.",
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
      "title": "INTERCEPT Example",
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
        "Calculate INTERCEPT."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use INTERCEPT?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run INTERCEPT on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "INTERCEPT(A2:A3)",
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
    "title": "KURT Analyzer",
    "description": "Calculates the KURT property for advanced datasets.",
    "concept": "the specialized KURT engine"
  },
  "whyItExists": "Core component of KURT evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform KURT on data.",
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
      "title": "KURT Example",
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
        "Calculate KURT."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use KURT?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run KURT on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "KURT(A2:A3)",
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
    "title": "LARGE Analyzer",
    "description": "Calculates the LARGE property for advanced datasets.",
    "concept": "the specialized LARGE engine"
  },
  "whyItExists": "Core component of LARGE evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform LARGE on data.",
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
      "title": "LARGE Example",
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
        "Calculate LARGE."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LARGE?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run LARGE on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LARGE(A2:A3)",
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
    "title": "LINEST Analyzer",
    "description": "Calculates the LINEST property for advanced datasets.",
    "concept": "the specialized LINEST engine"
  },
  "whyItExists": "Core component of LINEST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform LINEST on data.",
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
      "title": "LINEST Example",
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
        "Calculate LINEST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LINEST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run LINEST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LINEST(A2:A3)",
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
    "title": "LOGEST Analyzer",
    "description": "Calculates the LOGEST property for advanced datasets.",
    "concept": "the specialized LOGEST engine"
  },
  "whyItExists": "Core component of LOGEST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform LOGEST on data.",
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
      "title": "LOGEST Example",
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
        "Calculate LOGEST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LOGEST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run LOGEST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LOGEST(A2:A3)",
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
    "title": "LOGNORM.DIST Analyzer",
    "description": "Calculates the LOGNORM.DIST property for advanced datasets.",
    "concept": "the specialized LOGNORM.DIST engine"
  },
  "whyItExists": "Core component of LOGNORM.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform LOGNORM.DIST on data.",
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
      "title": "LOGNORM.DIST Example",
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
        "Calculate LOGNORM.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LOGNORM.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run LOGNORM.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LOGNORM.DIST(A2:A3)",
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
    "title": "LOGNORM.INV Analyzer",
    "description": "Calculates the LOGNORM.INV property for advanced datasets.",
    "concept": "the specialized LOGNORM.INV engine"
  },
  "whyItExists": "Core component of LOGNORM.INV evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform LOGNORM.INV on data.",
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
      "title": "LOGNORM.INV Example",
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
        "Calculate LOGNORM.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use LOGNORM.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run LOGNORM.INV on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "LOGNORM.INV(A2:A3)",
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
    "title": "MAX Analyzer",
    "description": "Calculates the MAX property for advanced datasets.",
    "concept": "the specialized MAX engine"
  },
  "whyItExists": "Core component of MAX evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform MAX on data.",
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
      "title": "MAX Example",
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
        "Calculate MAX."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MAX?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run MAX on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MAX(A2:A3)",
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
    "title": "MAXA Analyzer",
    "description": "Calculates the MAXA property for advanced datasets.",
    "concept": "the specialized MAXA engine"
  },
  "whyItExists": "Core component of MAXA evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform MAXA on data.",
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
      "title": "MAXA Example",
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
        "Calculate MAXA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MAXA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run MAXA on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MAXA(A2:A3)",
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
    "title": "MEDIAN Analyzer",
    "description": "Calculates the MEDIAN property for advanced datasets.",
    "concept": "the specialized MEDIAN engine"
  },
  "whyItExists": "Core component of MEDIAN evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform MEDIAN on data.",
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
      "title": "MEDIAN Example",
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
        "Calculate MEDIAN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MEDIAN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run MEDIAN on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MEDIAN(A2:A3)",
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
    "title": "MIN Analyzer",
    "description": "Calculates the MIN property for advanced datasets.",
    "concept": "the specialized MIN engine"
  },
  "whyItExists": "Core component of MIN evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform MIN on data.",
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
      "title": "MIN Example",
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
        "Calculate MIN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MIN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run MIN on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MIN(A2:A3)",
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
    "title": "MINA Analyzer",
    "description": "Calculates the MINA property for advanced datasets.",
    "concept": "the specialized MINA engine"
  },
  "whyItExists": "Core component of MINA evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform MINA on data.",
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
      "title": "MINA Example",
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
        "Calculate MINA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MINA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run MINA on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MINA(A2:A3)",
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
    "title": "MODE.MULT Analyzer",
    "description": "Calculates the MODE.MULT property for advanced datasets.",
    "concept": "the specialized MODE.MULT engine"
  },
  "whyItExists": "Core component of MODE.MULT evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform MODE.MULT on data.",
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
      "title": "MODE.MULT Example",
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
        "Calculate MODE.MULT."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MODE.MULT?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run MODE.MULT on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MODE.MULT(A2:A3)",
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
    "title": "MODE.SNGL Analyzer",
    "description": "Calculates the MODE.SNGL property for advanced datasets.",
    "concept": "the specialized MODE.SNGL engine"
  },
  "whyItExists": "Core component of MODE.SNGL evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform MODE.SNGL on data.",
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
      "title": "MODE.SNGL Example",
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
        "Calculate MODE.SNGL."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use MODE.SNGL?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run MODE.SNGL on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "MODE.SNGL(A2:A3)",
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
    "title": "NEGBINOM.DIST Analyzer",
    "description": "Calculates the NEGBINOM.DIST property for advanced datasets.",
    "concept": "the specialized NEGBINOM.DIST engine"
  },
  "whyItExists": "Core component of NEGBINOM.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform NEGBINOM.DIST on data.",
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
      "title": "NEGBINOM.DIST Example",
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
        "Calculate NEGBINOM.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NEGBINOM.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run NEGBINOM.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NEGBINOM.DIST(A2:A3)",
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
    "title": "NORM.DIST Analyzer",
    "description": "Calculates the NORM.DIST property for advanced datasets.",
    "concept": "the specialized NORM.DIST engine"
  },
  "whyItExists": "Core component of NORM.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform NORM.DIST on data.",
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
      "title": "NORM.DIST Example",
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
        "Calculate NORM.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NORM.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run NORM.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NORM.DIST(A2:A3)",
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
    "title": "NORM.INV Analyzer",
    "description": "Calculates the NORM.INV property for advanced datasets.",
    "concept": "the specialized NORM.INV engine"
  },
  "whyItExists": "Core component of NORM.INV evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform NORM.INV on data.",
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
      "title": "NORM.INV Example",
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
        "Calculate NORM.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NORM.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run NORM.INV on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NORM.INV(A2:A3)",
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
    "title": "NORM.S.DIST Analyzer",
    "description": "Calculates the NORM.S.DIST property for advanced datasets.",
    "concept": "the specialized NORM.S.DIST engine"
  },
  "whyItExists": "Core component of NORM.S.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform NORM.S.DIST on data.",
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
      "title": "NORM.S.DIST Example",
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
        "Calculate NORM.S.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NORM.S.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run NORM.S.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NORM.S.DIST(A2:A3)",
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
    "title": "NORM.S.INV Analyzer",
    "description": "Calculates the NORM.S.INV property for advanced datasets.",
    "concept": "the specialized NORM.S.INV engine"
  },
  "whyItExists": "Core component of NORM.S.INV evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform NORM.S.INV on data.",
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
      "title": "NORM.S.INV Example",
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
        "Calculate NORM.S.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use NORM.S.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run NORM.S.INV on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "NORM.S.INV(A2:A3)",
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
    "title": "PEARSON Analyzer",
    "description": "Calculates the PEARSON property for advanced datasets.",
    "concept": "the specialized PEARSON engine"
  },
  "whyItExists": "Core component of PEARSON evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform PEARSON on data.",
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
      "title": "PEARSON Example",
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
        "Calculate PEARSON."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PEARSON?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run PEARSON on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PEARSON(A2:A3)",
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
    "title": "PERCENTILE.EXC Analyzer",
    "description": "Calculates the PERCENTILE.EXC property for advanced datasets.",
    "concept": "the specialized PERCENTILE.EXC engine"
  },
  "whyItExists": "Core component of PERCENTILE.EXC evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform PERCENTILE.EXC on data.",
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
      "title": "PERCENTILE.EXC Example",
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
        "Calculate PERCENTILE.EXC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERCENTILE.EXC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run PERCENTILE.EXC on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTILE.EXC(A2:A3)",
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
    "title": "PERCENTILE.INC Analyzer",
    "description": "Calculates the PERCENTILE.INC property for advanced datasets.",
    "concept": "the specialized PERCENTILE.INC engine"
  },
  "whyItExists": "Core component of PERCENTILE.INC evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform PERCENTILE.INC on data.",
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
      "title": "PERCENTILE.INC Example",
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
        "Calculate PERCENTILE.INC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERCENTILE.INC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run PERCENTILE.INC on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTILE.INC(A2:A3)",
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
    "title": "PERCENTRANK.EXC Analyzer",
    "description": "Calculates the PERCENTRANK.EXC property for advanced datasets.",
    "concept": "the specialized PERCENTRANK.EXC engine"
  },
  "whyItExists": "Core component of PERCENTRANK.EXC evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform PERCENTRANK.EXC on data.",
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
      "title": "PERCENTRANK.EXC Example",
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
        "Calculate PERCENTRANK.EXC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERCENTRANK.EXC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run PERCENTRANK.EXC on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTRANK.EXC(A2:A3)",
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
    "title": "PERCENTRANK.INC Analyzer",
    "description": "Calculates the PERCENTRANK.INC property for advanced datasets.",
    "concept": "the specialized PERCENTRANK.INC engine"
  },
  "whyItExists": "Core component of PERCENTRANK.INC evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform PERCENTRANK.INC on data.",
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
      "title": "PERCENTRANK.INC Example",
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
        "Calculate PERCENTRANK.INC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERCENTRANK.INC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run PERCENTRANK.INC on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERCENTRANK.INC(A2:A3)",
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
    "title": "PERMUT Analyzer",
    "description": "Calculates the PERMUT property for advanced datasets.",
    "concept": "the specialized PERMUT engine"
  },
  "whyItExists": "Core component of PERMUT evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform PERMUT on data.",
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
      "title": "PERMUT Example",
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
        "Calculate PERMUT."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERMUT?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run PERMUT on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERMUT(A2:A3)",
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
    "title": "PERMUTATIONA Analyzer",
    "description": "Calculates the PERMUTATIONA property for advanced datasets.",
    "concept": "the specialized PERMUTATIONA engine"
  },
  "whyItExists": "Core component of PERMUTATIONA evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform PERMUTATIONA on data.",
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
      "title": "PERMUTATIONA Example",
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
        "Calculate PERMUTATIONA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PERMUTATIONA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run PERMUTATIONA on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PERMUTATIONA(A2:A3)",
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
    "title": "PHI Analyzer",
    "description": "Calculates the PHI property for advanced datasets.",
    "concept": "the specialized PHI engine"
  },
  "whyItExists": "Core component of PHI evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform PHI on data.",
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
      "title": "PHI Example",
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
        "Calculate PHI."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PHI?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run PHI on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PHI(A2:A3)",
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
    "title": "POISSON.DIST Analyzer",
    "description": "Calculates the POISSON.DIST property for advanced datasets.",
    "concept": "the specialized POISSON.DIST engine"
  },
  "whyItExists": "Core component of POISSON.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform POISSON.DIST on data.",
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
      "title": "POISSON.DIST Example",
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
        "Calculate POISSON.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use POISSON.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run POISSON.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "POISSON.DIST(A2:A3)",
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
    "title": "PROB Analyzer",
    "description": "Calculates the PROB property for advanced datasets.",
    "concept": "the specialized PROB engine"
  },
  "whyItExists": "Core component of PROB evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform PROB on data.",
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
      "title": "PROB Example",
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
        "Calculate PROB."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use PROB?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run PROB on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "PROB(A2:A3)",
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
    "title": "QUARTILE.EXC Analyzer",
    "description": "Calculates the QUARTILE.EXC property for advanced datasets.",
    "concept": "the specialized QUARTILE.EXC engine"
  },
  "whyItExists": "Core component of QUARTILE.EXC evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform QUARTILE.EXC on data.",
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
      "title": "QUARTILE.EXC Example",
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
        "Calculate QUARTILE.EXC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use QUARTILE.EXC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run QUARTILE.EXC on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "QUARTILE.EXC(A2:A3)",
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
    "title": "QUARTILE.INC Analyzer",
    "description": "Calculates the QUARTILE.INC property for advanced datasets.",
    "concept": "the specialized QUARTILE.INC engine"
  },
  "whyItExists": "Core component of QUARTILE.INC evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform QUARTILE.INC on data.",
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
      "title": "QUARTILE.INC Example",
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
        "Calculate QUARTILE.INC."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use QUARTILE.INC?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run QUARTILE.INC on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "QUARTILE.INC(A2:A3)",
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
    "title": "RANK.AVG Analyzer",
    "description": "Calculates the RANK.AVG property for advanced datasets.",
    "concept": "the specialized RANK.AVG engine"
  },
  "whyItExists": "Core component of RANK.AVG evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform RANK.AVG on data.",
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
      "title": "RANK.AVG Example",
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
        "Calculate RANK.AVG."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use RANK.AVG?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run RANK.AVG on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "RANK.AVG(A2:A3)",
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
    "title": "RANK.EQ Analyzer",
    "description": "Calculates the RANK.EQ property for advanced datasets.",
    "concept": "the specialized RANK.EQ engine"
  },
  "whyItExists": "Core component of RANK.EQ evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform RANK.EQ on data.",
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
      "title": "RANK.EQ Example",
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
        "Calculate RANK.EQ."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use RANK.EQ?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run RANK.EQ on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "RANK.EQ(A2:A3)",
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
    "title": "RSQ Analyzer",
    "description": "Calculates the RSQ property for advanced datasets.",
    "concept": "the specialized RSQ engine"
  },
  "whyItExists": "Core component of RSQ evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform RSQ on data.",
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
      "title": "RSQ Example",
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
        "Calculate RSQ."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use RSQ?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run RSQ on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "RSQ(A2:A3)",
    "expectedValue": 150
  }
},
{
  "id": "skew",
  "title": "SKEW Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Distribution Lean",
    "description": "Measures asymmetry.",
    "concept": "Lean: 'Does data tail off to the left or right?'"
  },
  "whyItExists": "Check data balance.",
  "whenToUse": "Income distributions.",
  "realWorldUseCases": [
    "Salary skew."
  ],
  "businessExample": {
    "scenario": "Skew of {1, 10, 100}.",
    "formula": "=SKEW(B2:B4)"
  },
  "syntax": "=SKEW(v1, ...)",
  "syntaxBreakdown": [
    {
      "arg": "v1",
      "desc": "Data."
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
        "Result: 1.15."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Points",
      "desc": "Needs 3 points."
    }
  ],
  "proTips": [
    "Pos = right tail."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Skew of symmetric data?",
    "expectedAnswer": "0"
  },
  "practice": {
    "instructions": "Find skewness.",
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
      ]
    ],
    "targetCell": [
      4,
      1
    ],
    "expectedFormula": "SKEW(A2:A4)",
    "expectedValue": 1.15
  }
},
{
  "id": "skew.p",
  "title": "SKEW.P Function",
  "category": "statistical",
  "difficulty": "Intermediate",
  "xp": 200,
  "introduction": {
    "title": "SKEW.P Analyzer",
    "description": "Calculates the SKEW.P property for advanced datasets.",
    "concept": "the specialized SKEW.P engine"
  },
  "whyItExists": "Core component of SKEW.P evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform SKEW.P on data.",
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
      "title": "SKEW.P Example",
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
        "Calculate SKEW.P."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use SKEW.P?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run SKEW.P on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "SKEW.P(A2:A3)",
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
    "title": "SLOPE Analyzer",
    "description": "Calculates the SLOPE property for advanced datasets.",
    "concept": "the specialized SLOPE engine"
  },
  "whyItExists": "Core component of SLOPE evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform SLOPE on data.",
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
      "title": "SLOPE Example",
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
        "Calculate SLOPE."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use SLOPE?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run SLOPE on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "SLOPE(A2:A3)",
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
    "title": "SMALL Analyzer",
    "description": "Calculates the SMALL property for advanced datasets.",
    "concept": "the specialized SMALL engine"
  },
  "whyItExists": "Core component of SMALL evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform SMALL on data.",
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
      "title": "SMALL Example",
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
        "Calculate SMALL."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use SMALL?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run SMALL on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "SMALL(A2:A3)",
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
    "title": "STANDARDIZE Analyzer",
    "description": "Calculates the STANDARDIZE property for advanced datasets.",
    "concept": "the specialized STANDARDIZE engine"
  },
  "whyItExists": "Core component of STANDARDIZE evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform STANDARDIZE on data.",
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
      "title": "STANDARDIZE Example",
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
        "Calculate STANDARDIZE."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STANDARDIZE?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run STANDARDIZE on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STANDARDIZE(A2:A3)",
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
    "title": "STDEV.P Analyzer",
    "description": "Calculates the STDEV.P property for advanced datasets.",
    "concept": "the specialized STDEV.P engine"
  },
  "whyItExists": "Core component of STDEV.P evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform STDEV.P on data.",
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
      "title": "STDEV.P Example",
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
        "Calculate STDEV.P."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STDEV.P?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run STDEV.P on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEV.P(A2:A3)",
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
    "title": "STDEV.S Analyzer",
    "description": "Calculates the STDEV.S property for advanced datasets.",
    "concept": "the specialized STDEV.S engine"
  },
  "whyItExists": "Core component of STDEV.S evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform STDEV.S on data.",
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
      "title": "STDEV.S Example",
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
        "Calculate STDEV.S."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STDEV.S?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run STDEV.S on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEV.S(A2:A3)",
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
    "title": "STDEVA Analyzer",
    "description": "Calculates the STDEVA property for advanced datasets.",
    "concept": "the specialized STDEVA engine"
  },
  "whyItExists": "Core component of STDEVA evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform STDEVA on data.",
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
      "title": "STDEVA Example",
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
        "Calculate STDEVA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STDEVA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run STDEVA on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEVA(A2:A3)",
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
    "title": "STDEVPA Analyzer",
    "description": "Calculates the STDEVPA property for advanced datasets.",
    "concept": "the specialized STDEVPA engine"
  },
  "whyItExists": "Core component of STDEVPA evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform STDEVPA on data.",
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
      "title": "STDEVPA Example",
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
        "Calculate STDEVPA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STDEVPA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run STDEVPA on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STDEVPA(A2:A3)",
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
    "title": "STEYX Analyzer",
    "description": "Calculates the STEYX property for advanced datasets.",
    "concept": "the specialized STEYX engine"
  },
  "whyItExists": "Core component of STEYX evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform STEYX on data.",
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
      "title": "STEYX Example",
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
        "Calculate STEYX."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use STEYX?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run STEYX on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "STEYX(A2:A3)",
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
    "title": "T.DIST Analyzer",
    "description": "Calculates the T.DIST property for advanced datasets.",
    "concept": "the specialized T.DIST engine"
  },
  "whyItExists": "Core component of T.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform T.DIST on data.",
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
      "title": "T.DIST Example",
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
        "Calculate T.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use T.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run T.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "T.DIST(A2:A3)",
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
    "title": "T.INV Analyzer",
    "description": "Calculates the T.INV property for advanced datasets.",
    "concept": "the specialized T.INV engine"
  },
  "whyItExists": "Core component of T.INV evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform T.INV on data.",
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
      "title": "T.INV Example",
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
        "Calculate T.INV."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use T.INV?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run T.INV on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "T.INV(A2:A3)",
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
    "title": "T.TEST Analyzer",
    "description": "Calculates the T.TEST property for advanced datasets.",
    "concept": "the specialized T.TEST engine"
  },
  "whyItExists": "Core component of T.TEST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform T.TEST on data.",
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
      "title": "T.TEST Example",
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
        "Calculate T.TEST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use T.TEST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run T.TEST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "T.TEST(A2:A3)",
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
    "title": "TREND Analyzer",
    "description": "Calculates the TREND property for advanced datasets.",
    "concept": "the specialized TREND engine"
  },
  "whyItExists": "Core component of TREND evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform TREND on data.",
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
      "title": "TREND Example",
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
        "Calculate TREND."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use TREND?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run TREND on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "TREND(A2:A3)",
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
    "title": "TRIMMEAN Analyzer",
    "description": "Calculates the TRIMMEAN property for advanced datasets.",
    "concept": "the specialized TRIMMEAN engine"
  },
  "whyItExists": "Core component of TRIMMEAN evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform TRIMMEAN on data.",
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
      "title": "TRIMMEAN Example",
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
        "Calculate TRIMMEAN."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use TRIMMEAN?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run TRIMMEAN on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "TRIMMEAN(A2:A3)",
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
    "title": "VAR.P Analyzer",
    "description": "Calculates the VAR.P property for advanced datasets.",
    "concept": "the specialized VAR.P engine"
  },
  "whyItExists": "Core component of VAR.P evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform VAR.P on data.",
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
      "title": "VAR.P Example",
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
        "Calculate VAR.P."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use VAR.P?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run VAR.P on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VAR.P(A2:A3)",
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
    "title": "VAR.S Analyzer",
    "description": "Calculates the VAR.S property for advanced datasets.",
    "concept": "the specialized VAR.S engine"
  },
  "whyItExists": "Core component of VAR.S evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform VAR.S on data.",
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
      "title": "VAR.S Example",
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
        "Calculate VAR.S."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use VAR.S?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run VAR.S on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VAR.S(A2:A3)",
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
    "title": "VARA Analyzer",
    "description": "Calculates the VARA property for advanced datasets.",
    "concept": "the specialized VARA engine"
  },
  "whyItExists": "Core component of VARA evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform VARA on data.",
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
      "title": "VARA Example",
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
        "Calculate VARA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use VARA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run VARA on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VARA(A2:A3)",
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
    "title": "VARPA Analyzer",
    "description": "Calculates the VARPA property for advanced datasets.",
    "concept": "the specialized VARPA engine"
  },
  "whyItExists": "Core component of VARPA evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform VARPA on data.",
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
      "title": "VARPA Example",
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
        "Calculate VARPA."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use VARPA?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run VARPA on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "VARPA(A2:A3)",
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
    "title": "WEIBULL.DIST Analyzer",
    "description": "Calculates the WEIBULL.DIST property for advanced datasets.",
    "concept": "the specialized WEIBULL.DIST engine"
  },
  "whyItExists": "Core component of WEIBULL.DIST evaluation.",
  "whenToUse": "Data modeling.",
  "realWorldUseCases": [
    "Business analysis."
  ],
  "businessExample": {
    "scenario": "Perform WEIBULL.DIST on data.",
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
      "title": "WEIBULL.DIST Example",
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
        "Calculate WEIBULL.DIST."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "Data Type",
      "desc": "Numbers only."
    }
  ],
  "proTips": [
    "High precision."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "Use WEIBULL.DIST?",
    "expectedAnswer": "Yes"
  },
  "practice": {
    "instructions": "Run WEIBULL.DIST on table.",
    "initialData": [
      [
        "X"
      ],
      [
        100
      ],
      [
        200
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "WEIBULL.DIST(A2:A3)",
    "expectedValue": 150
  }
},
{
  "id": "z.test",
  "title": "Z.TEST Function",
  "category": "statistical",
  "difficulty": "Advanced",
  "xp": 300,
  "introduction": {
    "title": "Mean Shift Test",
    "description": "One-tailed Z-test p-value.",
    "concept": "Shift checker: 'Is sample mean significantly high?'"
  },
  "whyItExists": "Compare sample to target.",
  "whenToUse": "Large N checks.",
  "realWorldUseCases": [
    "Process drift."
  ],
  "businessExample": {
    "scenario": "Test weights > 12g.",
    "formula": "=Z.TEST(B2:B10, 12)"
  },
  "syntax": "=Z.TEST(a, x)",
  "syntaxBreakdown": [
    {
      "arg": "x",
      "desc": "Hypothesis."
    }
  ],
  "detailedExamples": [
    {
      "title": "Drift",
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
        "Result: 0.78."
      ]
    }
  ],
  "commonMistakes": [
    {
      "title": "One-tailed",
      "desc": "Returns p-value."
    }
  ],
  "proTips": [
    "Assumes normal."
  ],
  "relatedFunctions": [],
  "miniChallenge": {
    "question": "One or two tailed?",
    "expectedAnswer": "One-tailed"
  },
  "practice": {
    "instructions": "Run Z.TEST.",
    "initialData": [
      [
        "V"
      ],
      [
        10
      ],
      [
        20
      ]
    ],
    "targetCell": [
      3,
      1
    ],
    "expectedFormula": "Z.TEST(A2:A3,12)",
    "expectedValue": 0.78
  }
}
];