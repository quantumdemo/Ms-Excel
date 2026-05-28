export const dynamicArrayLessons = [
  {
    id: "unique",
    title: "UNIQUE Function",
    category: "dynamic-array",
    difficulty: "Intermediate",
    xp: 250,
    introduction: {
      title: "Automated Deduplication: UNIQUE",
      description: "The UNIQUE function returns a list of unique values from a range or array. It instantly removes duplicates without any manual 'Copy-Paste' effort.",
      concept: "Imagine a long list of 100 customer names where some names appear multiple times. UNIQUE scans the list and gives you just the 'Master List' of individual names, once each."
    },
    internalLogic: "UNIQUE is part of the 'Dynamic Array' engine. It scans the source array and builds a 'hash map' of seen values. It only outputs the first instance of each new value it encounters. Crucially, the result 'spills' into neighboring cells automatically.",
    whyItExists: "Before UNIQUE, removing duplicates required the manual 'Remove Duplicates' tool or complex array formulas. This function makes data cleaning dynamic—if you add a new unique name to your data, the results update instantly.",
    whenToUse: "Use UNIQUE whenever you need to create a dropdown list, summarize data by category, or find out how many different items are in a messy list.",
    realWorldUseCases: [
      "Creating a list of unique cities where you have customers.",
      "Summarizing a list of products sold in a day.",
      "Extracting unique student IDs from an attendance sheet.",
      "Filtering out duplicates from a consolidated data import."
    ],
    businessExample: {
      scenario: "A marketing team has a list of email signups. They want a clean list of unique domains (e.g., gmail.com, yahoo.com) to target their ads.",
      formula: "=UNIQUE(B2:B500)"
    },
    syntax: "=UNIQUE(array, [by_col], [exactly_once])",
    syntaxBreakdown: [
      { arg: "array", desc: "The range or array from which you want to return unique rows or columns." },
      { arg: "by_col", desc: "Optional. Use FALSE (default) to compare rows. Use TRUE to compare columns." },
      { arg: "exactly_once", desc: "Optional. Use FALSE (default) to return all distinct items. Use TRUE to return ONLY items that appear exactly once in the list." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Distinct Product List",
        table: {
          headers: ["Orders", "UNIQUE Formula", "Result List"],
          rows: [
            ["Apple", "=UNIQUE(A2:A4)", "Apple"],
            ["Banana", "", "Banana"],
            ["Apple", "", ""]
          ]
        },
        stepByStep: [
          "Excel looks at the list: Apple, Banana, Apple.",
          "It picks Apple (1st unique).",
          "It picks Banana (2nd unique).",
          "It sees Apple again (Duplicate) and ignores it.",
          "The result Apple and Banana 'spill' into two cells."
        ]
      }
    ],
    commonMistakes: [
      { title: "The #SPILL! Error.", desc: "This happens if there is already data in the cells where UNIQUE wants to put its results. Clear the area and the list will appear." }
    ],
    limitations: "Only available in modern Excel (Office 365 and Excel 2021+). If you share the file with someone on Excel 2016, they will see an error.",
    bestPractices: [
      "Combine UNIQUE with SORT (e.g., =SORT(UNIQUE(A2:A10))) to get a clean, alphabetized list.",
      "Use the '#' symbol (e.g., =D2#) to reference the entire results of a UNIQUE formula elsewhere."
    ],
    proTips: [
      "Use the 'exactly_once' argument as TRUE to find unique errors or items that haven't been repeated yet."
    ],
    relatedFunctions: ["SORT", "FILTER", "SORTBY", "TRANSPOSE"],
    comparison: "The 'Remove Duplicates' tool is a one-time static action. The UNIQUE function is a dynamic formula that stays up to date.",
    miniChallenge: {
      question: "You have a list of categories in A2:A20. Write the formula to get an alphabetized list of unique categories.",
      expectedAnswer: "=SORT(UNIQUE(A2:A20))"
    },
    practice: {
      instructions: "In cell B2, use UNIQUE to get a list of unique names from the range A2:A5.",
      initialData: [["Names", "Unique"], ["Alice", ""], ["Bob", ""], ["Alice", ""], ["Charlie", ""]],
      targetCell: [1, 1],
      expectedFormula: "UNIQUE(A2:A5)",
      expectedValue: "Alice"
    }
  },
  {
    id: "sort",
    title: "The Organizer: SORT",
    category: "dynamic-array",
    difficulty: "Intermediate",
    xp: 200,
    introduction: {
      title: "Automatic Ordering: SORT",
      description: "The SORT function sorts the contents of a range or array automatically. When your data changes, the sorted list updates instantly.",
      concept: "Instead of clicking the 'Sort' button every time you add a new row, the SORT function keeps your data in order (A-Z or 1-10) 24/7."
    },
    internalLogic: "SORT takes the source range and creates a virtual copy. It then reorders the rows of that copy based on the column and order you specify. The result 'spills' into the sheet.",
    whyItExists: "Manual sorting is a 'static' action—it only happens when you click the button. SORT is a 'dynamic' action—it ensures your reports always look professional and organized without manual upkeep.",
    whenToUse: "Use SORT for dashboards, top-10 lists, or whenever you want to present data in a specific alphabetical or numerical order.",
    realWorldUseCases: [
      "Alphabetizing a list of student names.",
      "Ordering sales reps from highest to lowest revenue.",
      "Sorting products by price to find the cheapest options.",
      "Keeping a 'Recent Orders' list sorted by date."
    ],
    businessExample: {
      scenario: "You have a list of sales and you want to see them sorted from largest to smallest automatically.",
      formula: "=SORT(A2:B10, 2, -1)"
    },
    syntax: "=SORT(array, [sort_index], [sort_order], [by_col])",
    syntaxBreakdown: [
      { arg: "array", desc: "The range or list you want to sort." },
      { arg: "sort_index", desc: "Optional. The column number to sort by. Defaults to 1." },
      { arg: "sort_order", desc: "Optional. 1 for Ascending (A-Z, 1-10), -1 for Descending (Z-A, 10-1)." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Alphabetical Names",
        table: {
          headers: ["Names", "Formula", "Sorted"],
          rows: [
            ["Zebra", "=SORT(A2:A4)", "Apple"],
            ["Apple", "", "Banana"],
            ["Banana", "", "Zebra"]
          ]
        },
        stepByStep: [
          "Excel takes the list: Zebra, Apple, Banana.",
          "It finds Apple is first in the alphabet.",
          "It places them in order: Apple, Banana, Zebra.",
          "The results spill into 3 cells."
        ]
      }
    ],
    commonMistakes: [
      { title: "#SPILL! error.", desc: "Clear any data that is blocking the cells below the formula." }
    ],
    limitations: "Only available in modern Excel (365/2021+).",
    bestPractices: [
      "Combine with UNIQUE to get an alphabetized list of categories: =SORT(UNIQUE(A2:A50))."
    ],
    proTips: [
      "If you need to sort by multiple columns (e.g., Department then Name), use the SORTBY function instead."
    ],
    relatedFunctions: ["SORTBY", "UNIQUE", "FILTER"],
    miniChallenge: {
      question: "Sort range A1:A10 in descending order (highest first).",
      expectedAnswer: "=SORT(A1:A10, 1, -1)"
    },
    practice: {
      instructions: "In cell B2, use SORT to alphabetize the names in A2:A4.",
      initialData: [["Names", "Sorted"], ["Zack", ""], ["Alice", ""], ["Bob", ""]],
      targetCell: [1, 1],
      expectedFormula: "SORT(A2:A4)",
      expectedValue: "Alice"
    }
  }
];
