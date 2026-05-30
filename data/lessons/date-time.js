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
        title: "Example: Timestamping",
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
        title: "Example: Calculating Age",
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
        title: "Example: Basic Assembly",
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
    title: "DAY Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Extracting the Day: DAY Function",
      description: "The DAY function extracts the day of the month from a date, returning a number from 1 to 31.",
      concept: "Think of it as asking a date: 'Which day of the month are you?'"
    },
    internalLogic: "Excel stores dates as serial numbers. DAY extracts the day-of-month portion (1-31) from that serial number.",
    whyItExists: "For reporting, you often need to group data by the day it occurred, regardless of the month or year.",
    whenToUse: "Use DAY when you need to extract just the day number for use in another calculation or for filtering.",
    realWorldUseCases: [
      "Calculating if a transaction happened after the 15th of the month.",
      "Grouping sales data by day of the month.",
      "Extracting the day to use in a custom text string like 'Day 25 of December'."
    ],
    businessExample: {
      scenario: "Categorise transactions by the day of the month to analyse mid-month vs month-end performance.",
      formula: "=DAY(A2)"
    },
    syntax: "=DAY(serial_number)",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "A valid Excel date (a serial number or date entered as text)." }
    ],
    detailedExamples: [
      {
        title: "Example: Categorising Transactions by Day of Month",
        table: {
          headers: ["Transaction Date", "Formula", "Day"],
          rows: [
            ["15/01/2026", "=DAY(A2)", "15"],
            ["28/02/2026", "=DAY(A3)", "28"],
            ["01/03/2026", "=DAY(A4)", "1"]
          ]
        },
        stepByStep: [
          "Excel stores dates as serial numbers (15/01/2026 = 46040).",
          "DAY extracts the day-of-month portion: 15.",
          "Works on any valid date, whether typed directly or from a cell reference."
        ]
      },
      {
        title: "Using DAY in Conditional Logic",
        table: {
          headers: ["Date", "Formula", "Category"],
          rows: [
            ["05/03/2026", "=IF(DAY(A2)<=15, \"First Half\", \"Second Half\")", "First Half"],
            ["20/03/2026", "=IF(DAY(A3)<=15, \"First Half\", \"Second Half\")", "Second Half"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Using DAY on text that isn't a date.", desc: "Returns #VALUE!." },
      { title: "Month-end confusion.", desc: "DAY of 31/03/2026 is 31, not 1. Use EOMONTH for month boundaries." },
      { title: "Forgetting it returns a number.", desc: "For day names (e.g., 'Monday'), use TEXT(date, \"dddd\")." }
    ],
    proTips: [
      "Combine with DATE to create dynamic month-start dates: =DATE(YEAR(today), MONTH(today), 1).",
      "Use =DAY(EOMONTH(date, 0)) to find the last day number of any month (28, 30, or 31)."
    ],
    relatedFunctions: ["DATE", "MONTH", "YEAR", "EOMONTH"],
    miniChallenge: {
      question: "What does =DAY(\"2026-01-15\") return?",
      expectedAnswer: "15"
    },
    practice: {
      instructions: "In cell B2, extract the day of the month from the date in A2.",
      initialData: [["Date", "Day"], ["15/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "DAY(A2)",
      expectedValue: 15
    }
  },
  {
    id: "month",
    title: "MONTH Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Extracting the Month: MONTH Function",
      description: "The MONTH function extracts the month from a date as a number from 1 (January) to 12 (December).",
      concept: "Think of it as asking a date: 'Which month are you in?'"
    },
    internalLogic: "Excel identifies the month component (1-12) from the date's serial number.",
    whyItExists: "Essential for monthly reporting, grouping data by quarters, and seasonal analysis.",
    businessExample: {
      scenario: "Group sales data by quarter using the month number.",
      formula: "=MONTH(A2)"
    },
    syntax: "=MONTH(serial_number)",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "A valid Excel date." }
    ],
    detailedExamples: [
      {
        title: "Example: Grouping Sales by Quarter",
        table: {
          headers: ["Date", "Formula", "Month", "Quarter"],
          rows: [
            ["15/01/2026", "=MONTH(A2)", "1", "Q1"],
            ["22/04/2026", "=MONTH(A3)", "4", "Q2"],
            ["08/09/2026", "=MONTH(A4)", "9", "Q3"],
            ["30/12/2026", "=MONTH(A5)", "12", "Q4"]
          ]
        },
        stepByStep: [
          "MONTH reads the serial number and returns the month portion.",
          "January = 1, February = 2, ..., December = 12.",
          "The quarter formula divides by 3 and rounds up: months 1-3 -> 1, 4-6 -> 2, etc."
        ]
      },
      {
        title: "Month Name Conversion",
        table: {
          headers: ["Date", "Formula", "Month Name"],
          rows: [
            ["15/01/2026", "=TEXT(A2, \"mmmm\")", "January"],
            ["15/01/2026", "=TEXT(A2, \"mmm\")", "Jan"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "MONTH of an empty cell.", desc: "Returns 1 (Excel treats empty as 0, which is January 0, 1900)." },
      { title: "MONTH returns a number, not a name.", desc: "Use TEXT function for names ('January')." }
    ],
    proTips: [
      "For fiscal year starting in April: =YEAR(date) + IF(MONTH(date) >= 4, 1, 0).",
      "Combine with DATE to build dates: =DATE(2026, MONTH(A2), 1) for the first of that month."
    ],
    relatedFunctions: ["DAY", "YEAR", "DATE", "TEXT"],
    miniChallenge: {
      question: "What number does MONTH return for April?",
      expectedAnswer: "4"
    },
    practice: {
      instructions: "In cell B2, extract the month number from the date in A2.",
      initialData: [["Date", "Month"], ["15/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "MONTH(A2)",
      expectedValue: 1
    }
  },
  {
    id: "year",
    title: "YEAR Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Extracting the Year: YEAR Function",
      description: "The YEAR function extracts the year from a date as a four-digit number (e.g., 2026).",
      concept: "Think of it as asking a date: 'Which year do you belong to?'"
    },
    internalLogic: "Excel isolates the four-digit year (1900-9999) from the date's serial number.",
    businessExample: {
      scenario: "Filter transactions or group annual reports by isolating the year.",
      formula: "=YEAR(A2)"
    },
    syntax: "=YEAR(serial_number)",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "A valid Excel date." }
    ],
    detailedExamples: [
      {
        title: "Example: Annual Sales Summary",
        table: {
          headers: ["Date", "Formula", "Year"],
          rows: [
            ["15/01/2025", "=YEAR(A2)", "2025"],
            ["22/06/2026", "=YEAR(A3)", "2026"],
            ["31/12/2024", "=YEAR(A4)", "2024"]
          ]
        },
        stepByStep: [
          "YEAR reads the serial number and returns the year portion.",
          "Works with dates from 1900 onwards.",
          "Returns a four-digit number."
        ]
      },
      {
        title: "Fiscal Year (Starting April)",
        table: {
          headers: ["Date", "Formula", "Fiscal Year"],
          rows: [
            ["15/03/2026", "=YEAR(A2) - IF(MONTH(A2)<4, 1, 0)", "FY2025"],
            ["15/05/2026", "=YEAR(A3) - IF(MONTH(A3)<4, 1, 0)", "FY2026"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "YEAR of an empty cell.", desc: "Returns 1900 (Excel's base date)." },
      { title: "Two-digit years.", desc: "Excel interprets them based on regional cutoffs (typically 1930-2029)." }
    ],
    proTips: [
      "YEAR is the simplest way to isolate the year for pivot table grouping or SUMIFS criteria.",
      "Combine with DATE: =DATE(YEAR(A2), 12, 31) gives the last day of that year."
    ],
    relatedFunctions: ["DAY", "MONTH", "DATE"],
    miniChallenge: {
      question: "What does =YEAR(\"31/12/2026\") return?",
      expectedAnswer: "2026"
    },
    practice: {
      instructions: "In cell B2, extract the year from the date in A2.",
      initialData: [["Date", "Year"], ["15/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "YEAR(A2)",
      expectedValue: 2026
    }
  },
  {
    id: "networkdays",
    title: "NETWORKDAYS Function",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "The Workday Calculator: NETWORKDAYS Function",
      description: "The NETWORKDAYS function calculates the number of working days between two dates, automatically excluding weekends (Saturday and Sunday) and optionally excluding a list of holidays.",
      concept: "Think of it as a workday counter: 'How many weekdays fall between these two dates, minus the holidays?'"
    },
    internalLogic: "Excel identifies total days between start and end, subtracts all Saturdays and Sundays, and then subtracts any provided holiday dates that fall on weekdays.",
    businessExample: {
      scenario: "Calculate the actual working time for a project, excluding weekends and public holidays.",
      formula: "=NETWORKDAYS(B2, C2, $F$2:$F$3)"
    },
    syntax: "=NETWORKDAYS(start_date, end_date, [holidays])",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The start date." },
      { arg: "end_date", desc: "The end date." },
      { arg: "holidays", desc: "Optional. A range of dates to exclude (e.g., public holidays)." }
    ],
    detailedExamples: [
      {
        title: "Example: Project Duration in Working Days",
        table: {
          headers: ["Project", "Start", "End", "Holiday", "Formula", "Working Days"],
          rows: [
            ["Alpha", "01/06/2026", "15/06/2026", "(none)", "=NETWORKDAYS(B2, C2)", "11"],
            ["Beta", "01/06/2026", "15/06/2026", "08/06/2026", "=NETWORKDAYS(B3, C3, D3)", "10"]
          ]
        },
        stepByStep: [
          "Project Alpha: 1 June (Mon) to 15 June (Mon) = 15 calendar days.",
          "Weekends: 6-7 June and 13-14 June = 4 weekend days.",
          "15 - 4 = 11 working days.",
          "Project Beta: same dates but minus the 8 June holiday = 10 working days."
        ]
      }
    ],
    commonMistakes: [
      { title: "Including start and end.", desc: "NETWORKDAYS counts BOTH the start and end date. To exclude start, subtract 1." },
      { title: "Holidays on weekends.", desc: "These are not double-counted; NETWORKDAYS handles this correctly." }
    ],
    proTips: [
      "Build a named range for your organisation's public holidays and reference it in every NETWORKDAYS formula.",
      "For custom weekends (not Sat/Sun), use NETWORKDAYS.INTL."
    ],
    relatedFunctions: ["NETWORKDAYS.INTL", "WORKDAY", "DAYS"],
    miniChallenge: {
      question: "How many working days are in a regular Monday-Friday week?",
      expectedAnswer: "5"
    },
    practice: {
      instructions: "In cell C2, calculate the working days between 01/06/2026 and 15/06/2026.",
      initialData: [["Start", "End", "Working Days"], ["06/01/2026", "06/15/2026", ""]],
      targetCell: [1, 2],
      expectedFormula: "NETWORKDAYS(A2,B2)",
      expectedValue: 11
    }
  },
  {
    id: "datevalue",
    title: "DATEVALUE Function",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Convert Date Text to a Serial Number: DATEVALUE Function",
      description: "The DATEVALUE function converts a date stored as text into an Excel serial number, making it usable in date calculations.",
      concept: "Think of it as the date translator: 'This text says 15 Jan 2026 — turn it into a real date for me.'"
    },
    internalLogic: "Excel parses the text string and interprets it as a date based on system regional settings, returning the 1900-system serial number.",
    syntax: "=DATEVALUE(date_text)",
    syntaxBreakdown: [
      { arg: "date_text", desc: "A text string representing a date (e.g., \"15/01/2026\")." }
    ],
    detailedExamples: [
      {
        title: "Example: Fixing Imported Dates",
        table: {
          headers: ["Imported Text", "Formula", "Serial Number", "Formatted"],
          rows: [
            ["15 Jan 2026", "=DATEVALUE(A2)", "46040", "15/01/2026"],
            ["2026-01-15", "=DATEVALUE(A3)", "46040", "15/01/2026"]
          ]
        },
        stepByStep: [
          "DATEVALUE parses the string based on regional settings.",
          "It returns the serial number (46040 for 15 Jan 2026).",
          "Format the cell as 'Date' to see it properly."
        ]
      }
    ],
    commonMistakes: [
      { title: "Regional format mismatches.", desc: "'01/15/2026' may fail on a UK system expecting '15/01/2026'." },
      { title: "Invalid date strings.", desc: "'31/02/2026' returns #VALUE!." }
    ],
    proTips: [
      "Add 0 or multiply by 1 to force text-to-date conversion: =A1+0 often works when DATEVALUE fails.",
      "For international datasets, use the DATE function with parsed components to avoid regional issues."
    ],
    relatedFunctions: ["DATE", "TIMEVALUE", "VALUE"],
    miniChallenge: {
      question: "Convert '2026-01-15' text to a date using DATEVALUE.",
      expectedAnswer: "=DATEVALUE(\"2026-01-15\")"
    },
    practice: {
      instructions: "In cell B2, convert the text date in A2 to a serial number.",
      initialData: [["Text", "Serial"], ["15 Jan 2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "DATEVALUE(A2)",
      expectedValue: 46040
    }
  },
  {
    id: "days",
    title: "DAYS Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Days Between Two Dates: DAYS Function",
      description: "The DAYS function returns the number of days between two dates. It's equivalent to subtracting one date from another.",
      concept: "Think of it as a calendar span calculator: 'How many days separate these two dates?'"
    },
    internalLogic: "Result = end_date - start_date.",
    syntax: "=DAYS(end_date, start_date)",
    syntaxBreakdown: [
      { arg: "end_date", desc: "The later date." },
      { arg: "start_date", desc: "The earlier date." }
    ],
    detailedExamples: [
      {
        title: "Example: Calculating Invoice Age",
        table: {
          headers: ["Invoice Date", "Today", "Formula", "Days Outstanding"],
          rows: [
            ["01/06/2026", "15/06/2026", "=DAYS(B2, A2)", "14"],
            ["20/05/2026", "15/06/2026", "=DAYS(B3, A3)", "26"]
          ]
        },
        stepByStep: [
          "DAYS subtracts start_date from end_date.",
          "Order matters: DAYS(end, start) gives positive when end > start.",
          "If start is after end, the result is negative."
        ]
      }
    ],
    commonMistakes: [
      { title: "Reversing arguments.", desc: "DAYS(end, start) not DAYS(start, end). Reversal gives negative days." },
      { title: "Including time.", desc: "DAYS returns a decimal if times are present. Use INT for whole days." }
    ],
    proTips: [
      "DAYS is essentially =end_date - start_date with clearer intent.",
      "For working days only, use NETWORKDAYS."
    ],
    relatedFunctions: ["DATEDIF", "NETWORKDAYS", "DAYS360"],
    miniChallenge: {
      question: "In =DAYS(B1, A1), which cell should be the later date for a positive result?",
      expectedAnswer: "B1"
    },
    practice: {
      instructions: "In cell C2, calculate the days between end date B2 and start date A2.",
      initialData: [["Start", "End", "Days"], ["06/01/2026", "06/15/2026", ""]],
      targetCell: [1, 2],
      expectedFormula: "DAYS(B2,A2)",
      expectedValue: 14
    }
  },
  {
    id: "days360",
    title: "DAYS360 Function",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Days Between Dates (360-Day Year): DAYS360 Function",
      description: "The DAYS360 function calculates the number of days between two dates based on a 360-day year (12 months of 30 days each).",
      concept: "Think of it as the accountant's calendar: every month has exactly 30 days, making interest calculations uniform."
    },
    internalLogic: "Excel treats every month as having 30 days. Difference = (Y2-Y1)*360 + (M2-M1)*30 + (D2-D1).",
    whyItExists: "Commonly used in accounting and financial calculations (30/360 day count convention) for bonds and mortgages.",
    syntax: "=DAYS360(start_date, end_date, [method])",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The start date." },
      { arg: "end_date", desc: "The end date." },
      { arg: "method", desc: "Optional. FALSE/omitted = US (NASD); TRUE = European method." }
    ],
    detailedExamples: [
      {
        title: "Example: Interest Accrual Calculation",
        table: {
          headers: ["Start", "End", "Formula", "Days (360-day year)"],
          rows: [
            ["15/01/2026", "15/06/2026", "=DAYS360(A2, B2)", "150"]
          ]
        },
        stepByStep: [
          "Under the 360-day method, each full month is 30 days.",
          "Jan 15 to Jun 15 = 5 months * 30 = 150 days.",
          "Actual calendar days would be 151."
        ]
      }
    ],
    commonMistakes: [
      { title: "Assuming it matches actual days.", desc: "It often doesn't. Use DAYS for real calendar counts." },
      { title: "Method argument.", desc: "US and European methods differ for specific date pairs (like Feb 28/29)." }
    ],
    proTips: [
      "DAYS360 is standard in bond markets using the 30/360 convention.",
      "For precise year portions, use YEARFRAC."
    ],
    relatedFunctions: ["DAYS", "YEARFRAC"],
    miniChallenge: {
      question: "How many days are in 2 full months according to DAYS360?",
      expectedAnswer: "60"
    },
    practice: {
      instructions: "In cell C2, calculate the days between A2 and B2 using a 360-day year.",
      initialData: [["Start", "End", "Result"], ["01/15/2026", "06/15/2026", ""]],
      targetCell: [1, 2],
      expectedFormula: "DAYS360(A2,B2)",
      expectedValue: 150
    }
  },
  {
    id: "edate",
    title: "EDATE Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "Shift a Date by Months: EDATE Function",
      description: "The EDATE function returns a date that is a specified number of months before or after a start date.",
      concept: "Think of it as a monthly time machine: 'What date is exactly 3 months from now?'"
    },
    internalLogic: "Excel adds/subtracts months and returns the same day of the month. If the day doesn't exist (e.g., 31st in a 30-day month), it returns the last valid day.",
    businessExample: {
      scenario: "Calculate contract renewal or subscription expiry dates based on a fixed term of months.",
      formula: "=EDATE(A2, 12)"
    },
    syntax: "=EDATE(start_date, months)",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The starting date." },
      { arg: "months", desc: "Number of months to add (positive) or subtract (negative)." }
    ],
    detailedExamples: [
      {
        title: "Example: Contract Renewal Dates",
        table: {
          headers: ["Start Date", "Term (months)", "Formula", "End Date"],
          rows: [
            ["15/01/2026", "12", "=EDATE(A2, 12)", "15/01/2027"],
            ["31/01/2026", "1", "=EDATE(A3, 1)", "28/02/2026"],
            ["31/03/2026", "-1", "=EDATE(A4, -1)", "28/02/2026"]
          ]
        },
        stepByStep: [
          "EDATE adds/subtracts the specified number of months.",
          "It handles month-end boundaries: 31 Jan + 1 month = 28 Feb (not 31 Feb).",
          "Result is a valid Excel date serial number."
        ]
      }
    ],
    commonMistakes: [
      { title: "Using for days.", desc: "Works with months only. Use =A1+30 for days." },
      { title: "February anomalies.", desc: "Verify results when start dates are 29th, 30th, or 31st." }
    ],
    proTips: [
      "Perfect for subscription renewals, warranty expiries, and payment schedules.",
      "Combine with EOMONTH for month-end alignment."
    ],
    relatedFunctions: ["EOMONTH", "DATE", "DATEDIF"],
    miniChallenge: {
      question: "What is =EDATE(\"2026-01-31\", 1)?",
      expectedAnswer: "28/02/2026"
    },
    practice: {
      instructions: "In cell B2, add 12 months to the date in A2.",
      initialData: [["Start", "End"], ["15/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "EDATE(A2,12)",
      expectedValue: "VALID"
    }
  },
  {
    id: "eomonth",
    title: "EOMONTH Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "End of Month: EOMONTH Function",
      description: "The EOMONTH function returns the last day of the month that is a specified number of months before or after a start date.",
      concept: "Think of it as a month-end finder: 'What's the last day of the month, 3 months from now?'"
    },
    internalLogic: "Excel adds/subtracts months and then finds the maximum day number (28-31) for the resulting month.",
    whyItExists: "Go-to function for month-end reporting, accruals, and monthly financial models.",
    syntax: "=EOMONTH(start_date, months)",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The starting date." },
      { arg: "months", desc: "0 = current month; negative = past; positive = future." }
    ],
    detailedExamples: [
      {
        title: "Example: Month-End Reporting Dates",
        table: {
          headers: ["Start Date", "Months", "Formula", "End of Month"],
          rows: [
            ["15/01/2026", "0", "=EOMONTH(A2, 0)", "31/01/2026"],
            ["15/01/2026", "1", "=EOMONTH(A3, 1)", "28/02/2026"],
            ["15/01/2026", "-1", "=EOMONTH(A4, -1)", "31/12/2025"]
          ]
        },
        stepByStep: [
          "Months = 0 gives the end of the current month.",
          "Months = 1 gives end of next month (adjusts for month length).",
          "Months = -1 gives end of previous month."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with EDATE.", desc: "EOMONTH always returns the LAST day; EDATE returns the SAME day number." },
      { title: "Months relative to TODAY.", desc: "It is relative to start_date, not the current date." }
    ],
    proTips: [
      "Use =EOMONTH(TODAY(), -1)+1 to get the first day of the current month.",
      "Invaluable for depreciation schedules and monthly alignment."
    ],
    relatedFunctions: ["EDATE", "DATE", "TODAY"],
    miniChallenge: {
      question: "Get the last day of February 2024 (leap year) using EOMONTH(date, 0).",
      expectedAnswer: "29/02/2024"
    },
    practice: {
      instructions: "In cell B2, find the end of the current month for date A2.",
      initialData: [["Date", "End"], ["15/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "EOMONTH(A2,0)",
      expectedValue: "VALID"
    }
  },
  {
    id: "hour",
    title: "HOUR Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Extract the Hour: HOUR Function",
      description: "The HOUR function extracts the hour from a time value, returning a number from 0 (midnight) to 23 (11 PM).",
      concept: "Think of it as reading the clock: 'What hour does this time belong to?'"
    },
    internalLogic: "Excel extracts the hour portion from the decimal part of a date-time serial number.",
    businessExample: {
      scenario: "Categorise shift logins or call centre volume by the hour of the day.",
      formula: "=HOUR(A2)"
    },
    syntax: "=HOUR(serial_number)",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "A valid Excel time (or date-time)." }
    ],
    detailedExamples: [
      {
        title: "Example: Categorising Shifts",
        table: {
          headers: ["Login Time", "Formula", "Hour", "Shift"],
          rows: [
            ["06:30", "=HOUR(A2)", "6", "Morning"],
            ["14:00", "=HOUR(A3)", "14", "Afternoon"],
            ["22:15", "=HOUR(A4)", "22", "Night"]
          ]
        },
        stepByStep: [
          "Time is a fraction of a day (06:30 = 0.2708).",
          "HOUR extracts the integer hour: 6.",
          "Shift logic: =IF(HOUR(A2)<12, \"Morning\", ...)."
        ]
      }
    ],
    commonMistakes: [
      { title: "HOUR of date-only value.", desc: "Returns 0 (midnight is assumed)." },
      { title: "Text times.", desc: "Need TIMEVALUE conversion first: =HOUR(TIMEVALUE(\"14:30\"))." }
    ],
    proTips: [
      "Use for time-of-day pricing or peak-volume analysis.",
      "Combine with MINUTE and SECOND for full time decomposition."
    ],
    relatedFunctions: ["MINUTE", "SECOND", "TIME"],
    miniChallenge: {
      question: "What number does HOUR return for 11 PM?",
      expectedAnswer: "23"
    },
    practice: {
      instructions: "In cell B2, extract the hour from the time in A2.",
      initialData: [["Time", "Hour"], ["14:30", ""]],
      targetCell: [1, 1],
      expectedFormula: "HOUR(A2)",
      expectedValue: 14
    }
  },
  {
    id: "isoweeknum",
    title: "ISOWEEKNUM Function",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "ISO Week Number: ISOWEEKNUM Function",
      description: "The ISOWEEKNUM function returns the ISO week number of a date. Weeks start on Monday, and the first week of the year contains the first Thursday.",
      concept: "Think of it as the international week counter: 'Which ISO week does this date fall in?'"
    },
    internalLogic: "Follows the ISO 8601 standard calendar system.",
    whyItExists: "Standard for European business reporting and project management compliance.",
    syntax: "=ISOWEEKNUM(date)",
    syntaxBreakdown: [
      { arg: "date", desc: "A valid Excel date." }
    ],
    detailedExamples: [
      {
        title: "Example: Weekly Reporting Calendar",
        table: {
          headers: ["Date", "Formula", "ISO Week"],
          rows: [
            ["01/01/2026 (Thu)", "=ISOWEEKNUM(A2)", "1"],
            ["04/01/2026 (Sun)", "=ISOWEEKNUM(A3)", "1"],
            ["05/01/2026 (Mon)", "=ISOWEEKNUM(A4)", "2"]
          ]
        },
        stepByStep: [
          "ISO Week 1 contains the first Thursday.",
          "1 Jan 2026 is Thu, so it's Week 1.",
          "5 Jan 2026 is the start of Week 2."
        ]
      }
    ],
    commonMistakes: [
      { title: "Confusing with WEEKNUM.", desc: "WEEKNUM default is Sunday-start; ISOWEEKNUM is strictly Monday-start." },
      { title: "ISO week 53.", desc: "Occurs in some years (like 2026)." }
    ],
    proTips: [
      "Use for European/ISO compliance.",
      "For ISO year: =YEAR(date - WEEKDAY(date, 2) + 4)."
    ],
    relatedFunctions: ["WEEKNUM", "WEEKDAY"],
    miniChallenge: {
      question: "On which day does an ISO week always start?",
      expectedAnswer: "Monday"
    },
    practice: {
      instructions: "In cell B2, find the ISO week number for the date in A2.",
      initialData: [["Date", "ISO Week"], ["01/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "ISOWEEKNUM(A2)",
      expectedValue: 1
    }
  },
  {
    id: "minute",
    title: "MINUTE Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Extract the Minute: MINUTE Function",
      description: "The MINUTE function extracts the minute from a time value, returning a number from 0 to 59.",
      concept: "Think of it as zooming in on the clock: 'How many minutes past the hour?'"
    },
    internalLogic: "Excel identifies the minutes portion from the time component of a serial number.",
    syntax: "=MINUTE(serial_number)",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "A valid Excel time or date-time." }
    ],
    detailedExamples: [
      {
        title: "Example: Rounding Time",
        table: {
          headers: ["Login Time", "Minute", "Formula", "Rounded Time"],
          rows: [
            ["08:07", "=MINUTE(A2)", "7", "08:00"],
            ["08:37", "37", "", "08:30"]
          ]
        },
        stepByStep: [
          "MINUTE extracts the component (0-59).",
          "Used with MROUND or FLOOR to align timestamps to intervals.",
          "Result is an integer."
        ]
      }
    ],
    commonMistakes: [
      { title: "MINUTE of date-only.", desc: "Returns 0." },
      { title: "Result range.", desc: "Returns 0-59, not 1-60." }
    ],
    proTips: [
      "Use for categorising events into 15-minute or 30-minute intervals.",
      "Combine with FLOOR(time, 1/24/4) for 15-min rounding."
    ],
    relatedFunctions: ["HOUR", "SECOND", "TIME"],
    miniChallenge: {
      question: "What is =MINUTE(\"14:45\")?",
      expectedAnswer: "45"
    },
    practice: {
      instructions: "In cell B2, extract the minute from the time in A2.",
      initialData: [["Time", "Minute"], ["14:30", ""]],
      targetCell: [1, 1],
      expectedFormula: "MINUTE(A2)",
      expectedValue: 30
    }
  },
  {
    id: "networkdays.intl",
    title: "NETWORKDAYS.INTL Function",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Custom Weekend Workday Calculator: NETWORKDAYS.INTL",
      description: "The NETWORKDAYS.INTL function calculates working days between two dates with custom weekend definitions (e.g., Friday-Saturday).",
      concept: "Think of it as the international workday counter: 'How many working days, when our weekend is Friday?'"
    },
    internalLogic: "Calculates span, subtracts custom non-working days defined by code or string, and subtracts holidays.",
    businessExample: {
      scenario: "Calculate deadlines for global teams where weekend days vary by region (e.g., Middle East).",
      formula: "=NETWORKDAYS.INTL(A2, B2, 7)"
    },
    syntax: "=NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The start date." },
      { arg: "end_date", desc: "The end date." },
      { arg: "weekend", desc: "Number (1-17) or string (\"0000011\") defining weekend days. 7 = Fri/Sat." },
      { arg: "holidays", desc: "Optional. Range of holiday dates to exclude." }
    ],
    detailedExamples: [
      {
        title: "Example: Middle Eastern Work Week",
        table: {
          headers: ["Project", "Start", "End", "Weekend Code", "Result"],
          rows: [
            ["Alpha", "01/06/2026", "15/06/2026", "7 (Fri/Sat)", "10"]
          ]
        },
        stepByStep: [
          "Code 7 sets Friday and Saturday as weekends.",
          "Working days are Sun-Thu.",
          "Holidays on non-working days are not double-counted."
        ]
      },
      {
        title: "Weekend Code Reference",
        table: {
          headers: ["Code", "Weekend Days", "11", "Sunday only"],
          rows: [
            ["1", "Sat, Sun", "17", "Saturday only"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Weekend code vs string.", desc: "Code is a number; string is text in quotes like \"0000001\"." }
    ],
    proTips: [
      "Use string format \"0110001\" for non-consecutive or mid-week weekends.",
      "Essential for global project management."
    ],
    relatedFunctions: ["NETWORKDAYS", "WORKDAY.INTL"],
    miniChallenge: {
      question: "Which code represents a Sunday-only weekend?",
      expectedAnswer: "11"
    },
    practice: {
      instructions: "In cell C2, calculate working days with Friday/Saturday weekend (code 7).",
      initialData: [["Start", "End", "Days"], ["06/01/2026", "06/15/2026", ""]],
      targetCell: [1, 2],
      expectedFormula: "NETWORKDAYS.INTL(A2,B2,7)",
      expectedValue: 10
    }
  },
  {
    id: "second",
    title: "SECOND Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Extract the Second: SECOND Function",
      description: "The SECOND function extracts the second from a time value, returning a number from 0 to 59.",
      concept: "Think of it as the finest detail on the clock: 'How many seconds past the minute?'"
    },
    internalLogic: "Excel retrieves the seconds portion from the decimal serial number.",
    syntax: "=SECOND(serial_number)",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "A valid Excel time or date-time." }
    ],
    detailedExamples: [
      {
        title: "Example: Analysing Call Duration Precision",
        table: {
          headers: ["Call End Time", "Formula", "Seconds"],
          rows: [
            ["14:35:42", "=SECOND(A2)", "42"],
            ["14:36:00", "=SECOND(A4)", "0"]
          ]
        },
        stepByStep: [
          "Time is stored as a fraction of a day.",
          "SECOND extracts component (0-59).",
          "Used for precise logging or race results."
        ]
      }
    ],
    commonMistakes: [
      { title: "Leap seconds.", desc: "Excel does not handle leap seconds; result is always 0-59." }
    ],
    proTips: [
      "Useful for server logs or transaction timestamps.",
      "Combine with TIME constructor to adjust precision."
    ],
    relatedFunctions: ["HOUR", "MINUTE", "TIME"],
    miniChallenge: {
      question: "What is =SECOND(\"00:00:15\")?",
      expectedAnswer: "15"
    },
    practice: {
      instructions: "In cell B2, extract the second from the time in A2.",
      initialData: [["Time", "Second"], ["14:30:25", ""]],
      targetCell: [1, 1],
      expectedFormula: "SECOND(A2)",
      expectedValue: 25
    }
  },
  {
    id: "time",
    title: "TIME Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 150,
    introduction: {
      title: "Build a Time from Components: TIME Function",
      description: "The TIME function creates a time value from separate hour, minute, and second components.",
      concept: "Think of it as a time constructor: give it hours, minutes, seconds — get a valid Excel time."
    },
    internalLogic: "Result = (hour * 3600 + minute * 60 + second) / 86400. It handles overflows automatically (e.g., 75 mins = 1 hr 15 mins).",
    businessExample: {
      scenario: "Calculate end times by adding durations (hours/mins) to a start time.",
      formula: "=A2 + TIME(B2, C2, 0)"
    },
    syntax: "=TIME(hour, minute, second)",
    syntaxBreakdown: [
      { arg: "hour", desc: "0 to 32767 (wraps every 24 hours)." },
      { arg: "minute", desc: "0 to 32767." },
      { arg: "second", desc: "0 to 32767." }
    ],
    detailedExamples: [
      {
        title: "Example: Calculating End Time",
        table: {
          headers: ["Start Time", "Hours", "Minutes", "End Time"],
          rows: [
            ["09:00", "1", "30", "10:30"],
            ["23:00", "2", "0", "01:00"]
          ]
        },
        stepByStep: [
          "TIME(1, 30, 0) creates a value for 1.5 hours.",
          "Adding to start time handles midnight wrap automatically.",
          "Format as 'Time' to display."
        ]
      },
      {
        title: "Overflow Handling",
        table: {
          headers: ["Formula", "Result", "Explanation"],
          rows: [
            ["=TIME(0, 75, 0)", "01:15", "75 mins = 1 hr 15"],
            ["=TIME(25, 0, 0)", "01:00", "25 hrs wraps to 1 AM"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "TIME vs DATE-TIME.", desc: "TIME represents time on 'Day 0' (0 Jan 1900)." },
      { title: "Negative numbers.", desc: "Returns #NUM!." }
    ],
    proTips: [
      "Perfect for adding durations without manual fraction math.",
      "For durations > 24 hours, use [h]:mm:ss custom format."
    ],
    relatedFunctions: ["DATE", "TIMEVALUE", "HOUR"],
    miniChallenge: {
      question: "What does =TIME(0, 120, 0) represent?",
      expectedAnswer: "2:00 AM (2 hours)"
    },
    practice: {
      instructions: "In cell D2, build a time from hour A2, minute B2, and second C2.",
      initialData: [["H", "M", "S", "Time"], [14, 30, 0, ""]],
      targetCell: [1, 3],
      expectedFormula: "TIME(A2,B2,C2)",
      expectedValue: "VALID"
    }
  },
  {
    id: "timevalue",
    title: "TIMEVALUE Function",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Convert Time Text to a Serial Number: TIMEVALUE Function",
      description: "The TIMEVALUE function converts a time stored as text into an Excel time serial number (a fraction of a day).",
      concept: "Think of it as the time translator: 'This text says 2:30 PM — turn it into a real time I can calculate with.'"
    },
    internalLogic: "Excel parses the string (e.g. \"14:30\") and returns its decimal equivalent (0.60417).",
    syntax: "=TIMEVALUE(time_text)",
    syntaxBreakdown: [
      { arg: "time_text", desc: "A text string representing a time (e.g., \"14:30\", \"2:30 PM\")." }
    ],
    detailedExamples: [
      {
        title: "Example: Parsing Imported Timestamps",
        table: {
          headers: ["Imported Text", "Formula", "Time Serial", "Formatted"],
          rows: [
            ["14:30", "=TIMEVALUE(A2)", "0.60417", "14:30"],
            ["2:30 PM", "=TIMEVALUE(A3)", "0.60417", "14:30"]
          ]
        },
        stepByStep: [
          "TIMEVALUE parses the string.",
          "Returns decimal: 0 = 00:00, 0.5 = 12:00.",
          "Usable in math: subtracting two TIMEVALUEs gives duration."
        ]
      }
    ],
    commonMistakes: [
      { title: "Date text.", desc: "TIMEVALUE ignores dates; returns only time portion." },
      { title: "Invalid strings.", desc: "Returns #VALUE! for bad formats." }
    ],
    proTips: [
      "Useful for CSV imports or web data.",
      "For date+time, use =DATEVALUE(text) + TIMEVALUE(text)."
    ],
    relatedFunctions: ["TIME", "DATEVALUE", "VALUE"],
    miniChallenge: {
      question: "What decimal does =TIMEVALUE(\"12:00\") return?",
      expectedAnswer: "0.5"
    },
    practice: {
      instructions: "In cell B2, convert the text time in A2 to a time serial number.",
      initialData: [["Text", "Serial"], ["14:30", ""]],
      targetCell: [1, 1],
      expectedFormula: "TIMEVALUE(A2)",
      expectedValue: 0.604166666666667
    }
  },
  {
    id: "weekday",
    title: "WEEKDAY Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "Day of the Week as a Number: WEEKDAY Function",
      description: "The WEEKDAY function returns the day of the week for a date as a number (e.g. Monday = 1).",
      concept: "Think of it as a calendar decoder: 'Is this date a Monday, and what number does Monday get?'"
    },
    internalLogic: "Maps the date to a number based on the chosen return_type schema.",
    businessExample: {
      scenario: "Identify weekends for conditional formatting or shift scheduling.",
      formula: "=WEEKDAY(A2, 2) > 5"
    },
    syntax: "=WEEKDAY(serial_number, [return_type])",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "A valid Excel date." },
      { arg: "return_type", desc: "Optional. 1=Sun(1)-Sat(7), 2=Mon(1)-Sun(7), 3=Mon(0)-Sun(6)." }
    ],
    detailedExamples: [
      {
        title: "Example: Identifying Weekends",
        table: {
          headers: ["Date", "Formula", "Weekday (type 2)", "Weekend?"],
          rows: [
            ["15/01/2026 (Thu)", "=WEEKDAY(A2, 2)", "4", "FALSE"],
            ["18/01/2026 (Sun)", "=WEEKDAY(A3, 2)", "7", "TRUE"]
          ]
        },
        stepByStep: [
          "Return_type 2 numbers Monday as 1.",
          "Thursday is 4; Sunday is 7.",
          "Value > 5 identifies Sat/Sun."
        ]
      }
    ],
    commonMistakes: [
      { title: "Default return_type.", desc: "Type 1 (Sun=1) is default, which may conflict with Mon-start logic." },
      { title: "Using on text.", desc: "Wrap text in DATEVALUE first." }
    ],
    proTips: [
      "Use type 2 for ISO-compatible Monday-Sunday numbering.",
      "Combine with Conditional Formatting: =WEEKDAY(A1, 2)>5 to shade weekends."
    ],
    relatedFunctions: ["TEXT", "WORKDAY", "WEEKNUM"],
    miniChallenge: {
      question: "In return_type 2, what number represents Monday?",
      expectedAnswer: "1"
    },
    practice: {
      instructions: "In cell B2, find the weekday number (Monday=1, return_type 2) for date A2.",
      initialData: [["Date", "Weekday"], ["15/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "WEEKDAY(A2,2)",
      expectedValue: 4
    }
  },
  {
    id: "weeknum",
    title: "WEEKNUM Function",
    category: "date-time",
    difficulty: "Beginner",
    xp: 200,
    introduction: {
      title: "Week Number of the Year: WEEKNUM Function",
      description: "The WEEKNUM function returns the week number of a date (1-53) based on a specified week-start day.",
      concept: "Think of it as the calendar week counter: useful for weekly reporting and sales grouping."
    },
    internalLogic: "Calculates week count from Jan 1st based on the chosen start day (Sun, Mon, etc.).",
    syntax: "=WEEKNUM(serial_number, [return_type])",
    syntaxBreakdown: [
      { arg: "serial_number", desc: "A valid Excel date." },
      { arg: "return_type", desc: "Optional. 1=Sunday (default), 2=Monday, 21=ISO (Mon-start)." }
    ],
    detailedExamples: [
      {
        title: "Example: Grouping Sales by Week",
        table: {
          headers: ["Date", "Formula (Sun-start)", "Formula (Mon-start)"],
          rows: [
            ["04/01/2026 (Sun)", "=WEEKNUM(A2, 1) -> 2", "=WEEKNUM(A2, 2) -> 1"]
          ]
        },
        stepByStep: [
          "Type 1: 4 Jan is the first Sunday -> Week 2.",
          "Type 2: 4 Jan is still in Week 1 (Monday is the boundary).",
          "Result depends heavily on return_type."
        ]
      }
    ],
    commonMistakes: [
      { title: "Year boundaries.", desc: "1 Jan may be Week 53 of the previous year in some types." },
      { title: "ISO compliance.", desc: "Type 21 is not fully ISO; use ISOWEEKNUM for true ISO 8601." }
    ],
    proTips: [
      "Standard for US-style reporting (Sun-start).",
      "Combine with YEAR: =YEAR(date) & \"-W\" & WEEKNUM(date, 2)."
    ],
    relatedFunctions: ["ISOWEEKNUM", "WEEKDAY"],
    miniChallenge: {
      question: "What is the default week start day for WEEKNUM?",
      expectedAnswer: "Sunday"
    },
    practice: {
      instructions: "In cell B2, find the week number for the date in A2 (default).",
      initialData: [["Date", "Week"], ["01/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "WEEKNUM(A2)",
      expectedValue: 1
    }
  },
  {
    id: "workday",
    title: "WORKDAY Function",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Find a Working Day N Days Away: WORKDAY Function",
      description: "The WORKDAY function returns a date that is a specified number of working days before or after a start date, excluding weekends and optionally holidays.",
      concept: "Think of it as a project deadline calculator: 'What date is 10 working days from now?'"
    },
    internalLogic: "Adds/subtracts days, skipping Sat/Sun and provided holiday dates.",
    businessExample: {
      scenario: "Calculate delivery deadlines or SLA targets based on business days.",
      formula: "=WORKDAY(A2, 10, holidays)"
    },
    syntax: "=WORKDAY(start_date, days, [holidays])",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The starting date." },
      { arg: "days", desc: "Working days to shift (positive/negative)." },
      { arg: "holidays", desc: "Optional. A range of holiday dates to skip." }
    ],
    detailedExamples: [
      {
        title: "Example: Calculating Delivery Deadlines",
        table: {
          headers: ["Order Date", "Working Days", "Holiday", "Result"],
          rows: [
            ["01/06/2026 (Mon)", "10", "(none)", "15/06/2026"],
            ["01/06/2026 (Mon)", "10", "08/06/2026", "16/06/2026"]
          ]
        },
        stepByStep: [
          "10 workdays from Mon 1 June = Mon 15 June (skips 2 weekends).",
          "Adding 8 June holiday pushes to Tue 16 June.",
          "Negative days count backwards."
        ]
      }
    ],
    commonMistakes: [
      { title: "Excludes start_date.", desc: "1 working day from Monday is Tuesday, not Monday." },
      { title: "days = 0.", desc: "Returns start_date itself (adjusted if non-working)." }
    ],
    proTips: [
      "Essential for project timelines and SLA calculations.",
      "For custom weekends, use WORKDAY.INTL."
    ],
    relatedFunctions: ["WORKDAY.INTL", "NETWORKDAYS"],
    miniChallenge: {
      question: "What date is 1 working day after a Friday (assuming no holidays)?",
      expectedAnswer: "The following Monday"
    },
    practice: {
      instructions: "In cell B2, find the date 10 working days after A2.",
      initialData: [["Start", "Deadline"], ["06/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "WORKDAY(A2,10)",
      expectedValue: "VALID"
    }
  },
  {
    id: "workday.intl",
    title: "WORKDAY.INTL Function",
    category: "date-time",
    difficulty: "Intermediate",
    xp: 300,
    introduction: {
      title: "Custom Weekend Workday Finder: WORKDAY.INTL",
      description: "The WORKDAY.INTL function returns a date that is a specified number of working days before or after a start date, with custom weekends.",
      concept: "Think of it as the global deadline calculator: 'What date is 10 working days from now, when our weekend is Friday-Saturday?'"
    },
    internalLogic: "Skips non-working days defined by the weekend code/string and holiday range.",
    syntax: "=WORKDAY.INTL(start_date, days, [weekend], [holidays])",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The starting date." },
      { arg: "days", desc: "Working days to shift." },
      { arg: "weekend", desc: "Optional code (e.g. 7 = Fri/Sat) or string." }
    ],
    detailedExamples: [
      {
        title: "Example: Middle East Project Deadline",
        table: {
          headers: ["Start", "Days", "Weekend", "Deadline"],
          rows: [
            ["01/06/2026 (Mon)", "10", "7 (Fri/Sat)", "14/06/2026"]
          ]
        },
        stepByStep: [
          "Code 7 sets working days as Sun-Thu.",
          "10 days covers two Sun-Thu blocks.",
          "Final result matches local work schedules."
        ]
      }
    ],
    commonMistakes: [
      { title: "Mixing codes and strings.", desc: "7 is a code; \"0000110\" is the string equivalent." }
    ],
    proTips: [
      "Use for global team scheduling.",
      "Combine with NETWORKDAYS.INTL to plan and verify milestones."
    ],
    relatedFunctions: ["WORKDAY", "NETWORKDAYS.INTL"],
    miniChallenge: {
      question: "What does code 7 represent in WORKDAY.INTL?",
      expectedAnswer: "Friday and Saturday weekend"
    },
    practice: {
      instructions: "In cell B2, find the date 10 working days after A2 with Fri/Sat weekend (code 7).",
      initialData: [["Start", "Deadline"], ["06/01/2026", ""]],
      targetCell: [1, 1],
      expectedFormula: "WORKDAY.INTL(A2,10,7)",
      expectedValue: "VALID"
    }
  },
  {
    id: "yearfrac",
    title: "YEARFRAC Function",
    category: "date-time",
    difficulty: "Advanced",
    xp: 300,
    introduction: {
      title: "Fraction of a Year Between Dates: YEARFRAC Function",
      description: "The YEARFRAC function calculates the fraction of a year between two dates, based on a specified day-count convention.",
      concept: "Think of it as a precise year measurer: 'What portion of a year lies between these two dates?'"
    },
    internalLogic: "Calculates total days / days in year according to basis (360, 365, or actual).",
    whyItExists: "Essential for prorated interest, depreciation, age calculations, and accruals.",
    syntax: "=YEARFRAC(start_date, end_date, [basis])",
    syntaxBreakdown: [
      { arg: "start_date", desc: "The start date." },
      { arg: "end_date", desc: "The end date." },
      { arg: "basis", desc: "Optional. 0=US 30/360, 1=Actual/Actual, 2=Actual/360, 3=Actual/365." }
    ],
    detailedExamples: [
      {
        title: "Example: Prorated Salary",
        table: {
          headers: ["Start", "End", "Basis", "Year Fraction"],
          rows: [
            ["15/01/2026", "31/12/2026", "1", "0.9616"]
          ]
        },
        stepByStep: [
          "Basis 1 (Actual/Actual) counts actual days (351 in this case).",
          "351 / 365 = 0.9616.",
          "Multiply by annual salary to get prorated pay."
        ]
      },
      {
        title: "Basis Comparison Table",
        table: {
          headers: ["Basis", "Convention", "Use Case"],
          rows: [
            ["0", "US 30/360", "Corporate bonds"],
            ["1", "Actual/Actual", "Government bonds"],
            ["2", "Actual/360", "Money markets"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Basis 1 and Leap Years.", desc: "Handles leap years by using 366 for the denominator." },
      { title: "Negative result.", desc: "If end date is before start date." }
    ],
    proTips: [
      "Use basis 1 for precise age calculations: =YEARFRAC(birthdate, TODAY(), 1).",
      "Confirm conventions with accounting before using for high-value interest calcs."
    ],
    relatedFunctions: ["DATEDIF", "DAYS360"],
    miniChallenge: {
      question: "Which basis calculates the exact portion of the year (Actual/Actual)?",
      expectedAnswer: "1"
    },
    practice: {
      instructions: "In cell C2, calculate year fraction between A2 and B2 (Actual/Actual basis 1).",
      initialData: [["Start", "End", "Fraction"], ["01/15/2026", "12/31/2026", ""]],
      targetCell: [1, 2],
      expectedFormula: "YEARFRAC(A2,B2,1)",
      expectedValue: 0.961643835616438
    }
  }
];
