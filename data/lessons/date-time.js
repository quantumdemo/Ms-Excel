export const dateTimeLessons = [
  {
    id: "today",
    title: "TODAY Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Always Up to Date: TODAY",
      description: "The TODAY function returns the current date. The best part? It updates automatically every time you open your spreadsheet.",
      concept: "It is a 'volatile' function, meaning it doesn't need any input from you. It simply asks your computer: 'What is the date today?' and places it in the cell."
    },
    internalLogic: "Excel stores dates as sequential serial numbers. When you call TODAY(), Excel retrieves the current system date, converts it to its internal serial number (e.g., 45000), and formats it as a date string (e.g., MM/DD/YYYY).",
    whyItExists: "Manually updating dates in reports is a waste of time and leads to outdated information. TODAY ensures that aging reports, countdowns, and daily trackers are always accurate without human intervention.",
    whenToUse: "Use TODAY whenever you need to display the current date or calculate the difference between 'now' and a future/past date.",
    realWorldUseCases: [
      "Calculating how many days an invoice is overdue.",
      "Building a countdown timer for a project deadline.",
      "Filtering a sales report to show only today's transactions.",
      "Automatically dating a form when it is printed."
    ],
    businessExample: {
      scenario: "An office manager wants to know how many days are left until the company's annual party on December 31st.",
      formula: "=\"12/31/2024\" - TODAY()"
    },
    syntax: "=TODAY()",
    syntaxBreakdown: [
      { arg: "None", desc: "This function takes no arguments. You must include the empty parentheses ()." }
    ],
    detailedExamples: [
      {
        title: "Days Overdue",
        table: {
          headers: ["Due Date", "Today's Date", "Formula", "Days Overdue"],
          rows: [
            ["01/01/2024", "05/20/2024", "=TODAY()-A2", "140"]
          ]
        },
        stepByStep: [
          "Excel gets today's date from the system.",
          "It subtracts the old due date (A2).",
          "The resulting number is the total days passed."
        ]
      }
    ],
    commonMistakes: [
      { title: "Forgetting parentheses.", desc: "Writing =TODAY will result in a #NAME? error. Always write =TODAY()." }
    ],
    limitations: "TODAY only provides the date, not the time. If you need the exact time as well, use the NOW function.",
    bestPractices: [
      "Use TODAY in conditional formatting to highlight tasks due today in red.",
      "Avoid using too many volatile functions (like TODAY) in very large sheets, as it can slow down performance slightly."
    ],
    proTips: [
      "Press Ctrl+; (Semicolon) to insert a static date that NEVER changes. Use =TODAY() for a date that SHOULD change."
    ],
    relatedFunctions: ["NOW", "DATE", "DAY", "MONTH", "YEAR"],
    comparison: "TODAY is for dates only. NOW is for Date + Time.",
    miniChallenge: {
      question: "Write a formula to find the date 7 days from today.",
      expectedAnswer: "=TODAY()+7"
    },
    practice: {
      instructions: "In cell B2, use the TODAY function to display the current date.",
      initialData: [["Description", "Value"], ["Today is:", ""]],
      targetCell: [1, 1],
      expectedFormula: "TODAY()",
      expectedValue: "VALID"
    }
  },
  {
    id: "now",
    title: "NOW Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "The Living Clock: NOW",
      description: "The NOW function returns the current date and the current time of day. It is highly precise and updates every time the spreadsheet recalculates.",
      concept: "While TODAY only cares about the day, NOW cares about the exact moment. It captures hours, minutes, and seconds, allowing you to track time-sensitive activities."
    },
    internalLogic: "Excel represents date/time as a serial number where the integer is the date and the decimal part is the time. (e.g., 45000.5 is Noon on that date). NOW() returns both the integer and the decimal.",
    whyItExists: "For logs, time-stamping, and shift tracking, just knowing the date isn't enough. NOW provides the timestamp needed for precise measurement of durations.",
    whenToUse: "Use NOW when you need to calculate hours/minutes passed, or when you need a timestamp that includes the current time.",
    realWorldUseCases: [
      "Calculating the duration of a customer support call.",
      "Tracking exactly when a warehouse shipment was checked out.",
      "Generating a 'Last Updated' message in a dashboard.",
      "Measuring processing time for a complex set of tasks."
    ],
    businessExample: {
      scenario: "A call center manager wants to know exactly how long a call has been active. They subtract the 'Start Time' from the 'NOW' time.",
      formula: "=NOW() - A2"
    },
    syntax: "=NOW()",
    syntaxBreakdown: [
      { arg: "None", desc: "This function takes no arguments. You must include the empty parentheses ()." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Timestamping",
        table: {
          headers: ["Event", "Formula", "Result"],
          rows: [
            ["Current Time", "=NOW()", "5/20/2024 14:30"]
          ]
        },
        stepByStep: [
          "Excel checks the system clock.",
          "It retrieves the current date and time.",
          "It formats the cell to show both (e.g., MM/DD/YY HH:MM)."
        ]
      }
    ],
    commonMistakes: [
      { title: "Expecting it to tick like a clock.", desc: "NOW() only updates when the sheet is opened or changed. It doesn't update every second on its own." }
    ],
    limitations: "Like TODAY, NOW is volatile and can cause performance issues in massive workbooks if used thousands of times.",
    bestPractices: [
      "Format the cell as 'Time' or 'Custom Date/Time' to see the result clearly."
    ],
    proTips: [
      "To get only the time (without the date), use =NOW()-TODAY()."
    ],
    relatedFunctions: ["TODAY", "HOUR", "MINUTE", "SECOND"],
    miniChallenge: {
      question: "Which function returns both the current date and time?",
      expectedAnswer: "=NOW()"
    },
    practice: {
      instructions: "In cell B2, use the NOW function to get the current date and time.",
      initialData: [["Label", "Timestamp"], ["Generated at:", ""]],
      targetCell: [1, 1],
      expectedFormula: "NOW()",
      expectedValue: "VALID"
    }
  },
  {
    id: "datedif",
    title: "DATEDIF Function",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "The Secret Gap Finder: DATEDIF",
      description: "DATEDIF calculates the exact number of days, months, or years between two dates. It is a 'hidden' function in Excel—it won't appear in the autocomplete list, but it works perfectly!",
      concept: "Simple subtraction (Date2 - Date1) gives you days. But what if you want years for an age, or months for a contract? DATEDIF is the most accurate way to get those specific units."
    },
    internalLogic: "DATEDIF is a legacy function kept for compatibility. It compares the start and end dates and uses a specific calendar logic to account for varying month lengths and leap years based on the 'unit' you provide.",
    whyItExists: "Calculating age or tenure is surprisingly hard because months have different lengths. DATEDIF does the hard math of calendars for you.",
    whenToUse: "Use DATEDIF whenever you need to express the time between two dates in specific units like 'Years' or 'Months'.",
    realWorldUseCases: [
      "Calculating an employee's age based on their birthday.",
      "Determining the length of a service contract in months.",
      "Finding out how many full years someone has worked at a company (Tenure).",
      "Calculating a baby's age in months."
    ],
    businessExample: {
      scenario: "HR needs to calculate the tenure of an employee in full years. The hire date is in A2 and today's date is in B2.",
      formula: "=DATEDIF(A2, B2, \"Y\")"
    },
    syntax: "=DATEDIF(start_date, end_date, unit)",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The earlier date." },
      { arg: "end_date", desc: "The later date." },
      { arg: "unit", desc: "The type of information you want: \"Y\" (Years), \"M\" (Months), \"D\" (Days), \"YM\" (Months excluding years)." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Calculating Age",
        table: {
          headers: ["Birth Date", "Today", "Formula", "Age"],
          rows: [
            ["01/01/1990", "01/01/2024", "=DATEDIF(A2, B2, \"Y\")", "34"]
          ]
        },
        stepByStep: [
          "Excel looks at the start date (1990) and end date (2024).",
          "It counts how many full 12-month cycles have passed.",
          "It returns 34."
        ]
      }
    ],
    commonMistakes: [
      { title: "Putting the dates in the wrong order.", desc: "The start_date MUST be earlier than the end_date, or you will get a #NUM! error." },
      { title: "Typing DATEDIFF (with two Fs).", desc: "The function name only has one F: DATEDIF." }
    ],
    limitations: "Because it's a 'hidden' function, Excel won't provide tooltips or help while you type it. You have to remember the syntax.",
    bestPractices: [
      "Always use \"Y\" for age and \"M\" for contract lengths.",
      "Use \"YM\" to find remaining months after full years are counted (great for strings like '5 Years and 3 Months')."
    ],
    proTips: [
      "Combine units for a full readout: =DATEDIF(A1, B1, \"Y\") & \" Years, \" & DATEDIF(A1, B1, \"YM\") & \" Months\""
    ],
    relatedFunctions: ["YEARFRAC", "DAYS", "NETWORKDAYS"],
    miniChallenge: {
      question: "What unit would you use to find the number of full months between two dates?",
      expectedAnswer: "\"M\""
    },
    practice: {
      instructions: "In cell C2, find the number of full years between the Hire Date (A2) and Today (B2).",
      initialData: [["Hire Date", "Today", "Years"], ["01/01/2010", "01/01/2024", ""]],
      targetCell: [1, 2],
      expectedFormula: "DATEDIF(A2,B2,\"Y\")",
      expectedValue: 14
    }
  },
  {
    id: "date",
    title: "The Date Builder: DATE",
    category: "date-time",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Assembling Dates: DATE",
      description: "The DATE function creates a valid Excel date from individual year, month, and day components.",
      concept: "Think of it as a constructor. If you have '2024' in one cell, '05' in another, and '20' in a third, DATE glues them together into a real date that Excel can use for math."
    },
    internalLogic: "Excel takes the three integers provided and calculates the corresponding serial number. It is smart enough to handle 'overflow'—for example, DATE(2024, 13, 1) will automatically become January 1st, 2025.",
    whyItExists: "Data often comes in separate columns (Year, Month, Day). You cannot do date math on these separate pieces. DATE combines them into a single, functional date object.",
    whenToUse: "Use DATE whenever you need to create a date dynamically based on other cell values or formulas.",
    realWorldUseCases: [
      "Combining separate Year, Month, Day columns into one.",
      "Creating a dynamic 'First Day of Month' formula.",
      "Calculating a date based on a user's input of year and month.",
      "Generating a list of sequential dates for a calendar."
    ],
    businessExample: {
      scenario: "An HR system stores Year of Birth and Month of Birth in separate columns. You need to create a full birthday (assuming the 1st of the month).",
      formula: "=DATE(A2, B2, 1)"
    },
    syntax: "=DATE(year, month, day)",
    syntaxBreakdown: [
      { arg: "year", desc: "A 4-digit number for the year." },
      { arg: "month", desc: "A number from 1 to 12 representing the month." },
      { arg: "day", desc: "A number from 1 to 31 representing the day." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Basic Assembly",
        table: {
          headers: ["Year", "Month", "Day", "Formula", "Result"],
          rows: [
            ["2024", "12", "25", "=DATE(A2, B2, C2)", "12/25/2024"]
          ]
        },
        stepByStep: [
          "Excel takes 2024, 12, and 25.",
          "It converts them to the serial number for Christmas 2024.",
          "It formats the cell as a date."
        ]
      }
    ],
    commonMistakes: [
      { title: "Wrong Argument Order.", desc: "In many countries, we write Day/Month/Year. In Excel, the function MUST be (Year, Month, Day)." }
    ],
    limitations: "DATE cannot handle years before 1900 (Excel's calendar limit).",
    bestPractices: [
      "Always use 4-digit years (2024) to avoid ambiguity."
    ],
    proTips: [
      "Use =DATE(YEAR(TODAY()), MONTH(TODAY())+1, 0) to find the last day of the current month."
    ],
    relatedFunctions: ["DAY", "MONTH", "YEAR", "TODAY"],
    miniChallenge: {
      question: "Write a formula for January 1st, 2025.",
      expectedAnswer: "=DATE(2025, 1, 1)"
    },
    practice: {
      instructions: "In cell D2, combine the year (A2), month (B2), and day (C2) into a single date.",
      initialData: [["Year", "Month", "Day", "Result"], [2024, 1, 1, ""]],
      targetCell: [1, 3],
      expectedFormula: "DATE(A2,B2,C2)",
      expectedValue: "VALID"
    }
  },
  {
    id: "day",
    title: "Extracting the Day: DAY",
    category: "date-time",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Isolating the Day: DAY",
      description: "The DAY function returns the day of the month (a number from 1 to 31) from a specific date.",
      concept: "If you have a date like 12/25/2024, the DAY function simply pulls out the '25'."
    },
    internalLogic: "Excel looks at the serial number of the date and calculates which day of the month it represents.",
    whyItExists: "For reporting, you often need to group data by the day it occurred, regardless of the month or year.",
    whenToUse: "Use DAY when you need to extract just the day number for use in another calculation or for filtering.",
    realWorldUseCases: [
      "Calculating if a transaction happened after the 15th of the month.",
      "Grouping sales data by day of the month.",
      "Extracting the day to use in a custom text string like 'Day 25 of December'."
    ],
    syntax: "=DAY(serial_number)",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "The date from which you want to extract the day. Can be a cell reference or a date function." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Day Extraction",
        table: {
          headers: ["Date", "Formula", "Result"],
          rows: [
            ["05/20/2024", "=DAY(A2)", "20"]
          ]
        },
        stepByStep: [
          "Excel looks at the date in A2.",
          "It identifies that the day component is 20.",
          "It returns the number 20."
        ]
      }
    ],
    commonMistakes: [
      { title: "Inputting text.", desc: "If you point DAY at a cell containing 'May 20', it might fail if Excel doesn't recognize it as a date. Ensure the input is a valid Excel date (serial number)." },
      { title: "Wrong range.", desc: "DAY only accepts a single date. You cannot use it on a range like A2:A10." }
    ],
    relatedFunctions: ["MONTH", "YEAR", "DATE"],
    miniChallenge: {
      question: "Extract the day of the month from a date in A1.",
      expectedAnswer: "=DAY(A1)"
    },
    practice: {
      instructions: "In cell B2, extract the day number from the date in A2.",
      initialData: [["Date", "Day"], ["05/20/2024", ""]],
      targetCell: [1, 1],
      expectedFormula: "DAY(A2)",
      expectedValue: 20
    }
  },
  {
    id: "month",
    title: "Extracting the Month: MONTH",
    category: "date-time",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Isolating the Month: MONTH",
      description: "The MONTH function returns the month of a date as a number from 1 (January) to 12 (December).",
      concept: "Great for creating monthly reports. It turns a full date into a simple month number."
    },
    internalLogic: "Excel looks at the date's serial number and extracts the month component.",
    whyItExists: "Financial and sales data are almost always analyzed month-by-month. The MONTH function provides the number needed to sort or filter by month.",
    whenToUse: "Use MONTH whenever you need to categorize data by month.",
    realWorldUseCases: [
      "Calculating 'Month-to-Date' figures.",
      "Grouping expenses by month number.",
      "Checking if a subscription expires in a specific month."
    ],
    syntax: "=MONTH(serial_number)",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "The date you are checking." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Month Number",
        table: {
          headers: ["Date", "Formula", "Result"],
          rows: [
            ["12/25/2024", "=MONTH(A2)", "12"]
          ]
        },
        stepByStep: [
          "Excel identifies that December is the 12th month.",
          "It returns 12."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusion with text months.", desc: "MONTH returns a number (1-12). If you want the text 'January', you need the TEXT function: =TEXT(A2, \"mmmm\")." }
    ],
    relatedFunctions: ["DAY", "YEAR", "DATE"],
    miniChallenge: {
      question: "Extract the month number from a date in A1.",
      expectedAnswer: "=MONTH(A1)"
    },
    practice: {
      instructions: "In cell B2, extract the month number from the date in A2.",
      initialData: [["Date", "Month"], ["05/20/2024", ""]],
      targetCell: [1, 1],
      expectedFormula: "MONTH(A2)",
      expectedValue: 5
    }
  },
  {
    id: "year",
    title: "Extracting the Year: YEAR",
    category: "date-time",
    difficulty: "Beginner",
    xp: 100,
    introduction: {
      title: "Isolating the Year: YEAR",
      description: "The YEAR function returns the year of a date as a 4-digit integer (e.g., 2024).",
      concept: "The final piece of the date extraction trio. It helps you look at the 'Big Picture' by ignoring days and months."
    },
    internalLogic: "Excel extracts the year component from the date's serial number.",
    whyItExists: "For long-term trend analysis, you need to group data by year. YEAR makes this simple.",
    whenToUse: "Use YEAR when comparing year-over-year performance or when you need to calculate age/tenure in years.",
    realWorldUseCases: [
      "Calculating an employee's work anniversary.",
      "Grouping multi-year sales data into yearly buckets.",
      "Finding the age of a piece of equipment."
    ],
    syntax: "=YEAR(serial_number)",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "The date you are checking." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Year Extraction",
        table: {
          headers: ["Date", "Formula", "Result"],
          rows: [
            ["05/20/2024", "=YEAR(A2)", "2024"]
          ]
        },
        stepByStep: [
          "Excel pulls the 2024 part from the date.",
          "It returns 2024 as a number."
        ]
      }
    ],
    commonMistakes: [
      { title: "Two-digit year confusion.", desc: "Always use 4-digit years. If you point YEAR at a cell with '24', Excel might interpret it as the year 1924 depending on your system settings." }
    ],
    relatedFunctions: ["DAY", "MONTH", "DATE"],
    miniChallenge: {
      question: "Extract the 4-digit year from a date in A1.",
      expectedAnswer: "=YEAR(A1)"
    },
    practice: {
      instructions: "In cell B2, extract the year from the date in A2.",
      initialData: [["Date", "Year"], ["05/20/2024", ""]],
      targetCell: [1, 1],
      expectedFormula: "YEAR(A2)",
      expectedValue: 2024
    }
  },
  {
    id: "networkdays",
    title: "The Workday Calculator: NETWORKDAYS",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Counting Working Days: NETWORKDAYS",
      description: "NETWORKDAYS returns the number of whole working days between two dates, automatically excluding weekends (Saturday and Sunday) and any holidays you specify.",
      concept: "Standard subtraction (End - Start) gives you total days. But in business, we usually only care about working days. NETWORKDAYS is the 'Project Manager's' favorite function."
    },
    internalLogic: "Excel calculates the total days, then subtracts every Saturday and Sunday. If you provide a 'holidays' list, it also subtracts any of those dates if they fall on a weekday.",
    whyItExists: "Calculating project timelines or payroll based on working days is tedious to do manually, especially across months. NETWORKDAYS automates this with high accuracy.",
    whenToUse: "Use NETWORKDAYS for project planning, shipping estimates, and HR tracking (like number of days worked).",
    realWorldUseCases: [
      "Calculating how many business days it took to resolve a support ticket.",
      "Determining the number of working days in a month for budget allocation.",
      "Estimating a project completion date based on total 'man-days' required.",
      "Calculating employee leave duration (excluding weekends)."
    ],
    businessExample: {
      scenario: "A project starts on Jan 1st and ends on Jan 15th. You need to know how many actual working days that was.",
      formula: "=NETWORKDAYS(\"01/01/2024\", \"01/15/2024\")"
    },
    syntax: "=NETWORKDAYS(start_date, end_date, [holidays])",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The earlier date." },
      { arg: "end_date", desc: "The later date." },
      { arg: "holidays", desc: "Optional. A range of cells containing the dates of public holidays to be excluded." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Simple Workdays",
        table: {
          headers: ["Start", "End", "Formula", "Workdays"],
          rows: [
            ["Mon, May 6", "Fri, May 10", "=NETWORKDAYS(A2, B2)", "5"],
            ["Fri, May 10", "Mon, May 13", "=NETWORKDAYS(A3, B3)", "2"]
          ]
        },
        stepByStep: [
          "In the second row, Excel sees Friday, Saturday, Sunday, Monday.",
          "It ignores Sat and Sun.",
          "It counts Friday and Monday.",
          "Result: 2."
        ]
      }
    ],
    commonMistakes: [
      { title: "Dates in wrong order.", desc: "If the end_date is before the start_date, the result will be a negative number." }
    ],
    limitations: "NETWORKDAYS assumes Saturday and Sunday are the weekend. If your company works weekends or has different off-days (like Friday/Saturday), use the NETWORKDAYS.INTL function instead.",
    bestPractices: [
      "Always create a separate 'Holidays' table in your sheet so you can reference it in your NETWORKDAYS formulas."
    ],
    proTips: [
      "Use this to calculate 'Lead Time'—the time between an order and its fulfillment, excluding weekends."
    ],
    relatedFunctions: ["NETWORKDAYS.INTL", "WORKDAY", "DAYS"],
    miniChallenge: {
      question: "Which function counts working days while excluding weekends?",
      expectedAnswer: "=NETWORKDAYS()"
    },
    practice: {
      instructions: "In cell C2, find the number of working days between Start (A2) and End (B2).",
      initialData: [["Start", "End", "Workdays"], ["05/20/2024", "05/31/2024", ""]],
      targetCell: [1, 2],
      expectedFormula: "NETWORKDAYS(A2,B2)",
      expectedValue: 10
    }
  }
];
