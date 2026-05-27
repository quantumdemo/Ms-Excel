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
      { mistake: "Circular References.", fix: "Don't write the SUM formula in a cell that is part of the sum range (e.g., writing =SUM(A1:A10) in cell A5)." },
      { mistake: "Numbers stored as text.", fix: "Excel ignores text. If a cell has a 'green triangle' error, convert it to a number so SUM can see it." }
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
    comparison: "SUM adds values together, while COUNT tells you how many values there are. If you have three $10 bills, SUM is $30, but COUNT is 3.",
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
    id: "average",
    title: "AVERAGE Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Finding the Middle Ground: AVERAGE",
      description: "The AVERAGE function calculates the arithmetic mean of a group of numbers. It is the go-to tool for finding the typical value in a dataset.",
      concept: "If you have 10 and 20, the average is 15. Excel adds the numbers (10+20=30) and divides by the count (30/2=15) automatically."
    },
    internalLogic: "AVERAGE first sums all numerical values in the provided arguments, then counts how many numerical entries exist. Finally, it divides the sum by the count. It strictly ignores empty cells, text, and logical values.",
    whyItExists: "Manually calculating means for thousands of rows is exhausting and prone to error. AVERAGE provides a one-step solution for performance tracking, pricing analysis, and statistical reporting.",
    whenToUse: "Use AVERAGE when you need to find the central value of a dataset, such as average sales per day, average test scores, or average temperature.",
    realWorldUseCases: [
      "Calculating the average grade for a class of students.",
      "Determining the average monthly electricity bill.",
      "Analyzing average response time for customer support tickets.",
      "Finding the average stock price over a week."
    ],
    businessExample: {
      scenario: "A store owner wants to know the average value of a customer's purchase over the last 3 days.",
      formula: "=AVERAGE(B2:B4)"
    },
    syntax: "=AVERAGE(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number, cell reference, or range for which you want the average." },
      { arg: "number2", desc: "Optional. Additional numbers, cell references, or ranges to include." }
    ],
    detailedExamples: [
      {
        title: "Test Score Average",
        table: {
          headers: ["Student", "Score", "Formula", "Average"],
          rows: [
            ["Exam 1", "80", "=AVERAGE(B2:B3)", "85"],
            ["Exam 2", "90", "", ""]
          ]
        },
        stepByStep: [
          "Excel adds 80 and 90 to get 170.",
          "It counts that there are 2 numbers.",
          "It divides 170 by 2.",
          "The result 85 is displayed."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Zeros vs Blanks.", fix: "AVERAGE includes cells with 0 in the math. If a student missed a test, leave it blank (ignored) instead of typing 0 (included, lowers the average)." },
      { mistake: "Including the total.", fix: "Ensure your range doesn't accidentally include a 'Total' row at the bottom, as this will double the average!" }
    ],
    limitations: "AVERAGE is sensitive to 'outliers' (extremely high or low numbers). If one person earns $1 million and everyone else earns $10, the 'Average' will look very high and be misleading.",
    bestPractices: [
      "Check your data for empty cells vs zeros before averaging.",
      "Use MEDIAN alongside AVERAGE to get a better sense of your data's center."
    ],
    proTips: [
      "To average only numbers that meet a condition, use AVERAGEIF.",
      "You can select non-adjacent cells by holding Ctrl while clicking."
    ],
    relatedFunctions: ["AVERAGEIF", "AVERAGEIFS", "MEDIAN", "MODE", "SUM", "COUNT"],
    comparison: "AVERAGE is the mean. MEDIAN is the middle value. If you have 1, 2, 100, the AVERAGE is 34.3, but the MEDIAN is 2.",
    miniChallenge: {
      question: "Find the average of cells B2, B3, and B4.",
      expectedAnswer: "=AVERAGE(B2:B4)"
    },
    practice: {
      instructions: "In cell B5, calculate the average price of the items listed.",
      initialData: [["Item", "Price"], ["Item 1", 10], ["Item 2", 20], ["Item 3", 30], ["Average", ""]],
      targetCell: [4, 1],
      expectedFormula: "AVERAGE(B2:B4)",
      expectedValue: 20
    }
  },
  {
    id: "max",
    title: "MAX Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "The High Point: MAX",
      description: "The MAX function scans a group of numbers and returns the largest value. It's the quickest way to find a record-breaking performance or the highest cost.",
      concept: "Imagine looking at a list of 1,000 prices. Instead of scrolling to find the most expensive one, MAX does it for you in a fraction of a second."
    },
    internalLogic: "Excel iterates through every value in the provided range. It compares each value to the current 'highest' found so far. If it finds a larger number, it updates its record. It ignores text and blanks.",
    whyItExists: "Manual comparison is slow and prone to human error, especially in large datasets. MAX is essential for identifying peaks, limits, and top-tier data points.",
    whenToUse: "Use MAX when you need to find the highest score, the most recent date (dates are numbers!), the largest sale, or the maximum temperature.",
    realWorldUseCases: [
      "Identifying the highest sales figure in a monthly report.",
      "Finding the top score on a test.",
      "Determining the most expensive item in an inventory list.",
      "Finding the latest 'Last Login' date for a user."
    ],
    businessExample: {
      scenario: "A sales manager wants to know what the biggest single transaction was today.",
      formula: "=MAX(B2:B500)"
    },
    syntax: "=MAX(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number or range of numbers to search." },
      { arg: "number2", desc: "Optional. More numbers or ranges to include." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Top Sales",
        table: {
          headers: ["Rep", "Sales", "Formula", "Result"],
          rows: [
            ["John", "500", "=MAX(B2:B4)", "950"],
            ["Jane", "950", "", ""],
            ["Bob", "300", "", ""]
          ]
        },
        stepByStep: [
          "Excel looks at 500, 950, and 300.",
          "It determines 950 is the largest.",
          "It returns 950."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Text numbers.", fix: "If MAX returns 0 or ignores a high number, that number might be 'Text'. Convert it to a real number." }
    ],
    limitations: "MAX only gives you the number. If you want to know *who* had that number (e.g., the name of the top salesman), you need to combine it with XLOOKUP or INDEX/MATCH.",
    bestPractices: [
      "Use MAX(0, formula) to ensure a result never drops below zero (useful for commissions or tax calculations)."
    ],
    proTips: [
      "Because Excel stores dates as numbers, MAX(DateRange) will give you the most recent date."
    ],
    relatedFunctions: ["MIN", "LARGE", "SMALL", "XLOOKUP"],
    miniChallenge: {
      question: "Which function would you use to find the highest price in range A1:A20?",
      expectedAnswer: "=MAX(A1:A20)"
    },
    practice: {
      instructions: "In cell B5, use the MAX function to find the highest value in B2:B4.",
      initialData: [["Month", "Sales"], ["Jan", 150], ["Feb", 250], ["Mar", 180], ["Highest", ""]],
      targetCell: [4, 1],
      expectedFormula: "MAX(B2:B4)",
      expectedValue: 250
    }
  },
  {
    id: "min",
    title: "MIN Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "The Lowest Point: MIN",
      description: "The MIN function finds the smallest numerical value in a group of cells. It's perfect for finding the cheapest price or the fastest time.",
      concept: "The opposite of MAX. It's your filter for finding the 'bottom' of your data. If you're looking for a bargain or a bottleneck, start with MIN."
    },
    internalLogic: "Excel compares every value in your range to the current 'lowest'. It ignores text strings, logical values, and empty cells. It only counts numbers.",
    whyItExists: "Finding the minimum value manually in a spreadsheet with hundreds of rows is a recipe for mistakes. MIN guarantees the mathematically smallest value is identified.",
    whenToUse: "Use MIN to find the lowest cost, the earliest date, the worst performance score, or the minimum stock level.",
    realWorldUseCases: [
      "Finding the lowest quote from several suppliers.",
      "Identifying the earliest start date in a project timeline.",
      "Finding the smallest amount of inventory remaining.",
      "Tracking the fastest lap time in a race."
    ],
    businessExample: {
      scenario: "A purchasing agent wants to find the lowest price offered for a new laptop across 5 different vendors.",
      formula: "=MIN(B2:B6)"
    },
    syntax: "=MIN(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number or range of numbers to search." },
      { arg: "number2", desc: "Optional. More numbers or ranges to include." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Vendor Quotes",
        table: {
          headers: ["Vendor", "Quote", "Formula", "Lowest"],
          rows: [
            ["A", "$1,200", "=MIN(B2:B4)", "$1,100"],
            ["B", "$1,100", "", ""],
            ["C", "$1,500", "", ""]
          ]
        },
        stepByStep: [
          "Excel compares 1200, 1100, and 1500.",
          "It identifies 1100 as the smallest.",
          "It returns 1100."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Zeros in the data.", fix: "MIN will return 0 if a cell in your range contains 0. If you want to find the lowest *non-zero* number, you'll need the MINIFS function." }
    ],
    limitations: "Like MAX, MIN ignores text. If your range is all text, MIN will return 0.",
    bestPractices: [
      "Use MIN alongside MAX to quickly understand the 'Range' (Spread) of your data."
    ],
    proTips: [
      "To find the earliest date in a list, use =MIN(DateRange) and format the result as a date."
    ],
    relatedFunctions: ["MAX", "SMALL", "LARGE", "MINIFS"],
    miniChallenge: {
      question: "Which function finds the smallest number in a list?",
      expectedAnswer: "=MIN()"
    },
    practice: {
      instructions: "In cell B5, use the MIN function to find the lowest value in B2:B4.",
      initialData: [["Run", "Time"], ["Run 1", 12.5], ["Run 2", 11.8], ["Run 3", 13.2], ["Fastest", ""]],
      targetCell: [4, 1],
      expectedFormula: "MIN(B2:B4)",
      expectedValue: 11.8
    }
  },
  {
    id: "count",
    title: "COUNT Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Counting Numbers: COUNT",
      description: "The COUNT function counts how many cells in a range contain numbers. It ignores text, errors, and empty cells.",
      concept: "If you have a list of entries and want to know how many of them are actually numeric values (like prices or dates), COUNT is your tool."
    },
    internalLogic: "Excel checks the data type of every cell in the range. If the type is 'Number' (which includes dates and times), it adds 1 to the tally. If it is anything else, it skips it.",
    whyItExists: "Knowing the size of your numeric dataset is the first step in most statistical analysis. It helps you understand how much data you actually have to work with.",
    whenToUse: "Use COUNT when you specifically need to know the number of numeric entries. If you need to count cells with text, use COUNTA.",
    realWorldUseCases: [
      "Counting how many students took an exam (who have a score).",
      "Finding how many days a product was in stock (counting date entries).",
      "Checking how many items in a list have a price assigned.",
      "Validating that a column of data is purely numeric."
    ],
    businessExample: {
      scenario: "A teacher has a list of students and their grades. Some cells are blank because the students were absent. The teacher wants to know how many students actually have a grade.",
      formula: "=COUNT(B2:B30)"
    },
    syntax: "=COUNT(value1, [value2], ...)",
    syntaxBreakdown: [
      { arg: "value1", desc: "The first item or range to check for numbers." },
      { arg: "value2", desc: "Optional. More items or ranges to check." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Grading",
        table: {
          headers: ["Student", "Grade", "Formula", "Count"],
          rows: [
            ["Alice", "95", "=COUNT(B2:B4)", "2"],
            ["Bob", "Absent", "", ""],
            ["Charlie", "88", "", ""]
          ]
        },
        stepByStep: [
          "Excel looks at B2 (95) - it's a number. (Tally: 1)",
          "Excel looks at B3 ('Absent') - it's text. (Tally: 1)",
          "Excel looks at B4 (88) - it's a number. (Tally: 2)",
          "The result is 2."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Trying to count text.", fix: "If you use COUNT on a list of names, the result will be 0. Use COUNTA instead." }
    ],
    limitations: "COUNT strictly only looks for numbers. It will ignore 'TRUE' or 'FALSE' unless they are typed directly into the formula.",
    bestPractices: [
      "Use COUNT to verify your data is clean before performing math like SUM or AVERAGE."
    ],
    proTips: [
      "To count cells that are NOT empty (including text), use COUNTA. To count only empty cells, use COUNTBLANK."
    ],
    relatedFunctions: ["COUNTA", "COUNTIF", "COUNTIFS", "COUNTBLANK"],
    comparison: "COUNT = Numbers only. COUNTA = Anything (Text, Numbers, Errors).",
    miniChallenge: {
      question: "How do you count only the numeric cells in A1:A10?",
      expectedAnswer: "=COUNT(A1:A10)"
    },
    practice: {
      instructions: "In cell B5, count how many numeric entries are in B2:B4.",
      initialData: [["Item", "Data"], ["A", 10], ["B", "None"], ["C", 30], ["Count", ""]],
      targetCell: [4, 1],
      expectedFormula: "COUNT(B2:B4)",
      expectedValue: 2
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
      "Summing expenses that are over $100.",
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
        title: "Example 1: Category Summing",
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
      { mistake: "Mismatched range sizes.", fix: "Your 'range' and 'sum_range' MUST be the same height/width (e.g., A2:A10 and B2:B10). If they don't match, you'll get inaccurate results." },
      { mistake: "Forgetting quotes.", fix: "Text criteria like \"Fruit\" or logic like \">50\" must be in double quotes." }
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
        title: "Example 1: Multi-Filter Sales",
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
      { mistake: "Wrong Order.", fix: "In SUMIF, the sum_range is at the end. In SUMIFS, the sum_range is at the START. Don't mix them up!" },
      { mistake: "Different range sizes.", fix: "All ranges (sum_range and all criteria_ranges) must have the exact same number of rows and columns." }
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
    id: "countif",
    title: "COUNTIF Function",
    category: "statistical",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "Targeted Counting: COUNTIF",
      description: "The COUNTIF function counts the number of cells in a range that meet a specific condition.",
      concept: "Instead of counting everything, you only count the items that match your rule. 'How many students scored over 90?' or 'How many times did we sell Apples?'"
    },
    internalLogic: "Excel iterates through every cell in the range and compares it to your criteria. If the comparison is TRUE, the counter increases by 1.",
    whyItExists: "Counting specific categories is a core part of data analysis. It helps you understand frequency, popularity, and distribution within your data.",
    whenToUse: "Use COUNTIF when you need a tally of items that match a single rule.",
    realWorldUseCases: [
      "Counting how many employees have 'Completed' their training.",
      "Finding how many orders were over $500.",
      "Counting the number of 'Late' marks in an attendance log.",
      "Determining how many products in inventory are 'Out of Stock'."
    ],
    businessExample: {
      scenario: "A store manager wants to count how many 'Fruit' items are in their inventory list.",
      formula: "=COUNTIF(A2:A100, \"Fruit\")"
    },
    syntax: "=COUNTIF(range, criteria)",
    syntaxBreakdown: [
      { arg: "range", desc: "The group of cells you want to count (e.g., a list of status codes)." },
      { arg: "criteria", desc: "The condition that determines which cells to count (e.g., \">10\", \"Pending\", or a cell reference)." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Pass/Fail Tally",
        table: {
          headers: ["Score", "Formula", "Count > 70"],
          rows: [
            ["85", "=COUNTIF(A2:A4, \">70\")", "2"],
            ["60", "", ""],
            ["95", "", ""]
          ]
        },
        stepByStep: [
          "Excel checks 85: Is it > 70? (Yes). Count: 1.",
          "Excel checks 60: Is it > 70? (No). Count: 1.",
          "Excel checks 95: Is it > 70? (Yes). Count: 2.",
          "Final result: 2."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Quotes in logic.", fix: "Logical criteria like \">70\" or \"<>0\" must be wrapped in double quotes." }
    ],
    limitations: "COUNTIF only handles one condition. Use COUNTIFS for multiple conditions.",
    bestPractices: [
      "Use cell references for criteria so you can easily update what you are counting."
    ],
    proTips: [
      "To count cells that are NOT empty, use \"<>\" as your criteria.",
      "Use wildcards like \"*\" to count items that start with specific letters: =COUNTIF(A:A, \"App*\") counts Apple, Apricot, etc."
    ],
    relatedFunctions: ["COUNTIFS", "SUMIF", "AVERAGEIF", "COUNTA"],
    miniChallenge: {
      question: "How would you count how many cells in B1:B10 contain the word \"Paid\"?",
      expectedAnswer: "=COUNTIF(B1:B10, \"Paid\")"
    },
    practice: {
      instructions: "In cell B5, count how many times \"Apples\" appears in B2:B4.",
      initialData: [["Item", "Data"], ["A", "Apples"], ["B", "Oranges"], ["C", "Apples"], ["Count", ""]],
      targetCell: [4, 1],
      expectedFormula: "COUNTIF(B2:B4,\"Apples\")",
      expectedValue: 2
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
      description: "COUNTIFS counts the number of cells that meet multiple criteria across one or more ranges.",
      concept: "It's the multi-rule version of COUNTIF. 'How many sales were made by John AND were over $500?' It allows you to find very specific counts in a large dataset."
    },
    internalLogic: "Excel checks the first range for the first criteria. Then it checks the same row in the second range for the second criteria. It only increments the count if ALL conditions are TRUE for that row.",
    whyItExists: "Complex reporting often requires counting specific subsets of data. COUNTIFS is the most direct way to get these counts without complex filtering or pivot tables.",
    whenToUse: "Use COUNTIFS whenever you have two or more rules that must be met for an item to be counted.",
    realWorldUseCases: [
      "Counting how many 'High' priority tasks are still 'In Progress'.",
      "Finding the number of female employees in the 'Engineering' department.",
      "Counting how many students passed both the 'Math' and 'Science' exams.",
      "Tallying sales made in 'January' from the 'West' region."
    ],
    businessExample: {
      scenario: "A project manager wants to count how many tasks are 'Delayed' and assigned to 'Team A'.",
      formula: "=COUNTIFS(A2:A50, \"Delayed\", B2:B50, \"Team A\")"
    },
    syntax: "=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    syntaxBreakdown: [
      { arg: "criteria_range1", desc: "The first range to evaluate." },
      { arg: "criteria1", desc: "The condition for the first range." },
      { arg: "criteria_range2", desc: "Optional. The second range to evaluate." },
      { arg: "criteria2", desc: "Optional. The condition for the second range." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Specific Inventory",
        table: {
          headers: ["Item", "Color", "In Stock", "Formula", "Result"],
          rows: [
            ["Shirt", "Red", "Yes", "=COUNTIFS(B2:B4, \"Red\", C2:C4, \"Yes\")", "2"],
            ["Shirt", "Blue", "Yes", "", ""],
            ["Shirt", "Red", "Yes", "", ""]
          ]
        },
        stepByStep: [
          "Excel checks Row 2: Color is Red? (Yes). In Stock is Yes? (Yes). Count: 1.",
          "Excel checks Row 3: Color is Red? (No). Skips.",
          "Excel checks Row 4: Color is Red? (Yes). In Stock is Yes? (Yes). Count: 2.",
          "Final result: 2."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Uneven range sizes.", fix: "Every range in COUNTIFS must have the same number of rows and columns." }
    ],
    limitations: "Like SUMIFS, it uses AND logic. For OR logic, add multiple COUNTIFS together.",
    bestPractices: [
      "Use absolute references ($A$2:$A$50) if you plan to copy the formula down."
    ],
    proTips: [
      "Use COUNTIFS with date ranges to find items between two dates: =COUNTIFS(A:A, \">=\"&B1, A:A, \"<=\"&B2)."
    ],
    relatedFunctions: ["COUNTIF", "SUMIFS", "AVERAGEIFS"],
    miniChallenge: {
      question: "Count rows where A1:A10 is \"Active\" and B1:B10 is \">100\".",
      expectedAnswer: "=COUNTIFS(A1:A10, \"Active\", B1:B10, \">100\")"
    },
    practice: {
      instructions: "In cell C2, count how many rows have \"Fruit\" in A2:A4 and \"Red\" in B2:B4.",
      initialData: [["Type", "Color", "Result"], ["Fruit", "Red", ""], ["Veg", "Red", ""], ["Fruit", "Red", ""]],
      targetCell: [1, 2],
      expectedFormula: "COUNTIFS(A2:A4,\"Fruit\",B2:B4,\"Red\")",
      expectedValue: 2
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
      concept: "Think of it as a haircut for your numbers. If you have $10.333333, it's messy. ROUND trims it down to a neat $10.33."
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
      scenario: "An invoice calculation results in $105.6789. You need to round this to the nearest cent for the customer.",
      formula: "=ROUND(A2, 2)"
    },
    syntax: "=ROUND(number, num_digits)",
    syntaxBreakdown: [
      { arg: "number", desc: "The number or cell you want to round." },
      { arg: "num_digits", desc: "The number of decimal places. 0 rounds to the nearest integer. Negative numbers round to the left of the decimal (tens, hundreds)." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Currency Rounding",
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
      { mistake: "Rounding vs Formatting.", fix: "Changing the 'Decimal' button on the Home tab only *hides* the digits. The math still uses the long number. ROUND actually *changes* the number." }
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
    id: "counta",
    title: "Count Anything: COUNTA",
    category: "statistical",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "The Universal Counter: COUNTA",
      description: "COUNTA counts the number of cells in a range that are NOT empty. It counts text, numbers, errors, and symbols.",
      concept: "Unlike the basic COUNT (which only looks for numbers), COUNTA is 'Count All'. If there is anything inside the cell, it gets counted."
    },
    internalLogic: "Excel checks each cell for data. If the cell is truly empty, it skips it. If it contains even a single space or a hidden formula, it adds 1 to the tally.",
    whyItExists: "Most of the time, our lists contain names or text rather than just numbers. We need a way to count entries in a list regardless of what those entries are.",
    whenToUse: "Use COUNTA when you want to know how many rows in a list actually have data (e.g., How many people signed up for the event?).",
    realWorldUseCases: [
      "Counting names in a customer list.",
      "Tallying how many tasks have been assigned (even if not finished).",
      "Counting total items in an inventory list.",
      "Checking how many cells in a row have been filled out."
    ],
    businessExample: {
      scenario: "An office manager has a list of employees. Some are numbers (IDs) and some are names. They want to know the total number of entries.",
      formula: "=COUNTA(A2:A500)"
    },
    syntax: "=COUNTA(value1, [value2], ...)",
    syntaxBreakdown: [
      { arg: "value1", desc: "The first range or values to count." },
      { arg: "value2", desc: "Optional. More ranges to include." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Name Tally",
        table: {
          headers: ["Name", "Formula", "Result"],
          rows: [
            ["Alice", "=COUNTA(A2:A4)", "3"],
            ["123", "", ""],
            ["#N/A", "", ""]
          ]
        },
        stepByStep: [
          "Alice is text. Count: 1.",
          "123 is a number. Count: 2.",
          "#N/A is an error. Count: 3.",
          "All are non-empty. Result: 3."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Hidden spaces.", fix: "If COUNTA gives a higher number than expected, some 'blank' cells might contain invisible spaces. Use LEN to find them." }
    ],
    limitations: "COUNTA will count cells that look blank but contain formulas that result in an empty string (\"\").",
    bestPractices: [
      "Use COUNTA to find the size of your dataset before you start analyzing it."
    ],
    proTips: [
      "To count only the empty cells, use COUNTBLANK."
    ],
    relatedFunctions: ["COUNT", "COUNTIF", "COUNTBLANK"],
    comparison: "COUNT = Numbers Only. COUNTA = Everything but empty.",
    miniChallenge: {
      question: "Which function counts both text and numbers?",
      expectedAnswer: "=COUNTA()"
    },
    practice: {
      instructions: "In cell B5, count the total number of non-empty entries in B2:B4.",
      initialData: [["Item", "Data"], ["A", "Apple"], ["B", ""], ["C", 10], ["Total", ""]],
      targetCell: [4, 1],
      expectedFormula: "COUNTA(B2:B4)",
      expectedValue: 2
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
        title: "Example 1: Variance Analysis",
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
      { mistake: "Using for formatting.", fix: "If you just want to *hide* the minus sign but keep the negative math, use custom number formatting. ABS actually changes the underlying value to positive." }
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
    id: "averageif",
    title: "Conditional Means: AVERAGEIF",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Selective Averaging: AVERAGEIF",
      description: "The AVERAGEIF function calculates the average of cells in a range that meet a single criteria.",
      concept: "Like SUMIF, but for averages. 'What is the average salary, but only for the Marketing department?'"
    },
    internalLogic: "Excel identifies cells in the 'range' that match the 'criteria'. It then finds the corresponding numbers in the 'average_range', sums them, and divides by the count of matches.",
    whyItExists: "Averaging an entire column often hides the truth. You usually want to compare averages between groups (e.g., Average price of Apples vs. Average price of Oranges).",
    whenToUse: "Use AVERAGEIF when you want the typical value of a specific subset of data.",
    realWorldUseCases: [
      "Calculating the average test score for a specific class.",
      "Finding the average house price in a specific neighborhood.",
      "Determining the average rating for a specific product.",
      "Calculating the average daily temperature for only 'Rainy' days."
    ],
    businessExample: {
      scenario: "A manager wants to know the average sales amount for the 'North' region.",
      formula: "=AVERAGEIF(A2:A100, \"North\", B2:B100)"
    },
    syntax: "=AVERAGEIF(range, criteria, [average_range])",
    syntaxBreakdown: [
      { arg: "range", desc: "The cells you want to check against the criteria." },
      { arg: "criteria", desc: "The condition (e.g., \"North\" or \">100\")." },
      { arg: "average_range", desc: "Optional. The actual cells to average. If omitted, Excel averages the 'range' cells." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Category Averages",
        table: {
          headers: ["Category", "Price", "Formula", "Result"],
          rows: [
            ["Food", "10", "=AVERAGEIF(A2:A4, \"Food\", B2:B4)", "15"],
            ["Tech", "50", "", ""],
            ["Food", "20", "", ""]
          ]
        },
        stepByStep: [
          "Excel finds 'Food' in row 2 and 4.",
          "It takes the prices 10 and 20.",
          "Sum (30) divided by Count (2) = 15."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "#DIV/0! error.", fix: "This happens if no cells meet your criteria. Ensure your criteria matches your data exactly." }
    ],
    limitations: "Handles only one condition. For multiple conditions, use AVERAGEIFS.",
    bestPractices: [
      "Use cell references for your criteria to make your average tables dynamic."
    ],
    proTips: [
      "You can use wildcards (*) to average items that start or end with certain text."
    ],
    relatedFunctions: ["AVERAGEIFS", "SUMIF", "COUNTIF"],
    miniChallenge: {
      question: "Average B1:B10 if A1:A10 equals \"Passed\".",
      expectedAnswer: "=AVERAGEIF(A1:A10, \"Passed\", B1:B10)"
    },
    practice: {
      instructions: "In cell C2, average the sales (B2:B4) where the category (A2:A4) is \"Fruit\".",
      initialData: [["Category", "Sales", "Avg Fruit"], ["Fruit", 100, ""], ["Veg", 50, ""], ["Fruit", 200, ""]],
      targetCell: [1, 2],
      expectedFormula: "AVERAGEIF(A2:A4,\"Fruit\",B2:B4)",
      expectedValue: 150
    }
  },
  {
    id: "averageifs",
    title: "Multi-Condition Means: AVERAGEIFS",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 400,
    introduction: {
      title: "Surgical Averaging: AVERAGEIFS",
      description: "AVERAGEIFS calculates the average for cells that meet multiple criteria.",
      concept: "The ultimate tool for detailed group analysis. 'What is the average sale price for Red Shirts in size Large?'"
    },
    internalLogic: "Excel only includes a cell in the average if it satisfies EVERY criteria provided. It sums these valid cells and divides by the total number of valid cells found.",
    whyItExists: "For deep data analysis, you often need to filter by multiple variables simultaneously (e.g., Date, Region, and Category) to find the true 'typical' value.",
    whenToUse: "Use AVERAGEIFS whenever you have two or more conditions for your average.",
    realWorldUseCases: [
      "Average salary for 'Female' employees in 'Department X'.",
      "Average property price for '3 Bedroom' houses with '2 Bathrooms'.",
      "Average response time for 'High Priority' tickets handled by 'Team B'.",
      "Average cost of 'Imported' goods in the 'Electronics' category."
    ],
    businessExample: {
      scenario: "Find the average performance score for 'Staff' who have been with the company for '>5 years'.",
      formula: "=AVERAGEIFS(C2:C100, A2:A100, \"Staff\", B2:B100, \">5\")"
    },
    syntax: "=AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    syntaxBreakdown: [
      { arg: "average_range", desc: "The actual cells to average (Note: This is FIRST, like SUMIFS!)." },
      { arg: "criteria_range1", desc: "The first range to filter." },
      { arg: "criteria1", desc: "The condition for range 1." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Multi-Filter Average",
        table: {
          headers: ["Type", "Color", "Price", "Formula", "Result"],
          rows: [
            ["Car", "Red", "20000", "=AVERAGEIFS(C2:C4, A2:A4, \"Car\", B2:B4, \"Red\")", "22500"],
            ["Car", "Blue", "15000", "", ""],
            ["Car", "Red", "25000", "", ""]
          ]
        },
        stepByStep: [
          "Excel looks for 'Car' AND 'Red'.",
          "Matches: Row 2 (20,000) and Row 4 (25,000).",
          "Average: (20,000 + 25,000) / 2 = 22,500."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Wrong range order.", fix: "Remember that the average_range comes FIRST, just like in SUMIFS." }
    ],
    limitations: "All ranges must be the same size. If even one is different, you'll get a #VALUE! error.",
    bestPractices: [
      "Use cell references for criteria to keep your formulas flexible."
    ],
    proTips: [
      "AVERAGEIFS ignores cells containing text or blanks in the average_range automatically."
    ],
    relatedFunctions: ["AVERAGEIF", "SUMIFS", "COUNTIFS"],
    miniChallenge: {
      question: "In AVERAGEIFS, does the range to be averaged come first or last?",
      expectedAnswer: "First"
    },
    practice: {
      instructions: "In cell D2, find the average of C2:C4 where A2:A4 is \"Fruit\" and B2:B4 is \"Red\".",
      initialData: [["Type", "Color", "Val", "Result"], ["Fruit", "Red", 10, ""], ["Veg", "Red", 20, ""], ["Fruit", "Red", 30, ""]],
      targetCell: [1, 3],
      expectedFormula: "AVERAGEIFS(C2:C4,A2:A4,\"Fruit\",B2:B4,\"Red\")",
      expectedValue: 20
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
        title: "Example 1: Total Revenue",
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
      { mistake: "Array size mismatch.", fix: "If Array 1 has 5 rows and Array 2 has 6 rows, you will get a #VALUE! error. Ranges must be identical in size." }
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
    id: "median",
    title: "The True Middle: MEDIAN",
    category: "statistical",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Finding the Center: MEDIAN",
      description: "The MEDIAN function returns the middle number in a group of numbers. If you have an even count of numbers, it averages the two in the middle.",
      concept: "Unlike AVERAGE (which can be skewed by one huge number), MEDIAN tells you what the person 'in the middle' actually looks like. It is much more realistic for things like salaries or house prices."
    },
    internalLogic: "Excel sorts the numbers from smallest to largest and picks the one in the center position. If there are two center numbers, it returns their average.",
    whyItExists: "If 4 people earn $20k and 1 person earns $1M, the 'Average' is $216k (misleading!). The 'Median' is $20k (realistic!). MEDIAN is essential for honest data analysis.",
    whenToUse: "Use MEDIAN whenever your data has 'outliers' (extremely high or low values) that would make an average look wrong.",
    realWorldUseCases: [
      "Reporting the typical home price in a city.",
      "Analyzing employee salaries in a large company.",
      "Determining the typical wait time for a customer.",
      "Filtering out the effect of one exceptionally good or bad test score."
    ],
    businessExample: {
      scenario: "You want to find the typical delivery time from a list of 5 shipments.",
      formula: "=MEDIAN(B2:B6)"
    },
    syntax: "=MEDIAN(number1, [number2], ...)",
    syntaxBreakdown: [
      { arg: "number1", desc: "The first number, cell, or range to include." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Median vs Average",
        table: {
          headers: ["Values", "Average", "Median"],
          rows: [
            ["10, 20, 30, 40, 1000", "220", "30"]
          ]
        },
        stepByStep: [
          "Excel sorts the values: 10, 20, 30, 40, 1000.",
          "The middle number is 30.",
          "The Median is 30."
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Confusion with Average.", fix: "MEDIAN is the middle value, not the mean. If you have 1, 2, 100, MEDIAN is 2, while AVERAGE is 34.3." },
      { mistake: "Non-numeric data.", fix: "MEDIAN ignores text and blanks, but if the entire range is non-numeric, it returns #NUM!." }
    ],
    relatedFunctions: ["AVERAGE", "MODE", "MAX", "MIN"],
    practice: {
      instructions: "In cell B2, find the median of the values in A2:A6.",
      initialData: [["Value", "Median"], [10, ""], [50, ""], [20, ""], [30, ""], [40, ""]],
      targetCell: [1, 1],
      expectedFormula: "MEDIAN(A2:A6)",
      expectedValue: 30
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
        title: "Example 1: Inventory",
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
      { mistake: "Negative digits.", fix: "Using a negative number for num_digits rounds to the left of the decimal. =ROUNDUP(123, -1) results in 130." },
      { mistake: "Rounding toward zero.", fix: "ROUNDUP always rounds AWAY from zero. For negative numbers, -1.1 becomes -2." }
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
    title: "Force Downward: ROUNDDOWN",
    category: "math",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Always Rounding Down: ROUNDDOWN",
      description: "The ROUNDDOWN function always rounds a number toward zero.",
      concept: "The 'Floor'. Even if you have 1.99, ROUNDDOWN(1.99, 0) will give you 1. Use this when you only care about 'full' or 'completed' units."
    },
    internalLogic: "Excel simply truncates (cuts off) any digits beyond the specified precision.",
    whyItExists: "Useful for calculating age (you aren't 30 until the day of your birthday, even if you are 29.9 years old) or full years of service.",
    whenToUse: "Use when you want to ignore fractional progress and only count completed units.",
    realWorldUseCases: [
      "Calculating completed years of employment.",
      "Finding the number of full units that can be made from raw material.",
      "Rounding down currency for conservative budget estimates."
    ],
    syntax: "=ROUNDDOWN(number, num_digits)",
    commonMistakes: [
      { mistake: "Thinking it rounds to nearest.", fix: "ROUNDDOWN ignores standard 0.5 rules and always goes toward zero. 1.9 becomes 1." }
    ],
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
    title: "The Integer Function: INT",
    category: "math",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Dropping Decimals: INT",
      description: "INT rounds a number down to the nearest integer.",
      concept: "Similar to ROUNDDOWN(number, 0). It just kills the decimals and gives you the whole number part."
    },
    internalLogic: "Excel identifies the nearest integer that is less than or equal to the number.",
    whyItExists: "Essential for working with dates and times (since dates are integers and times are decimals).",
    whenToUse: "Use INT to extract the date from a NOW() timestamp.",
    syntax: "=INT(number)",
    commonMistakes: [
      { mistake: "Handling negative numbers.", fix: "INT rounds DOWN to the nearest integer. For -5.1, INT returns -6, not -5. Use TRUNC if you just want to remove decimals." }
    ],
    proTips: [
      "Use =NOW()-INT(NOW()) to get just the time from a timestamp."
    ],
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
    title: "The Remainder Finder: MOD",
    category: "math",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "What's Left Over: MOD",
      description: "The MOD function returns the remainder after a number is divided by a divisor.",
      concept: "If you have 10 cookies and share them between 3 people, each gets 3 and 1 is left over. MOD(10, 3) gives you that 1."
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
    commonMistakes: [
      { mistake: "Division by zero.", fix: "If the divisor is 0, MOD returns a #DIV/0! error. Ensure your divisor is never zero." },
      { mistake: "Negative results.", fix: "In Excel, MOD returns a result with the same sign as the divisor. This can be confusing when doing math with negative numbers." }
    ],
    proTips: [
      "Use =MOD(ROW(), 2) = 0 in conditional formatting to highlight every other row."
    ],
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
    title: "Multiply Everything: PRODUCT",
    category: "math",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Mass Multiplication: PRODUCT",
      description: "The PRODUCT function multiplies all the numbers given as arguments.",
      concept: "Like SUM, but for multiplication. =PRODUCT(A1:A5) is the same as =A1*A2*A3*A4*A5."
    },
    syntax: "=PRODUCT(number1, [number2], ...)",
    commonMistakes: [
      { mistake: "Empty cells vs Zeros.", fix: "PRODUCT ignores empty cells, but it multiplies by 0 if a cell contains a zero, making the whole result 0. Be careful with 'placeholder' zeros." }
    ],
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
    title: "Square Root: SQRT",
    category: "math",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Finding the Root: SQRT",
      description: "Returns the positive square root of a number.",
      concept: "What number multiplied by itself equals this number? SQRT(16) is 4."
    },
    syntax: "=SQRT(number)",
    commonMistakes: [
      { mistake: "Negative numbers.", fix: "SQRT cannot handle negative numbers and will return a #NUM! error. Use ABS first if you need the root of a negative's magnitude: =SQRT(ABS(A1))." }
    ],
    practice: {
      instructions: "In cell B2, find the square root of A2.",
      initialData: [["Val", "Root"], [25, ""]],
      targetCell: [1, 1],
      expectedFormula: "SQRT(A2)",
      expectedValue: 5
    }
  }
];
