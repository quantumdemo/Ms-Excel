export const excelLessons = [
  // BASICS
  {
    id: "sum-basic",
    title: "SUM Function",
    category: "basics",
    difficulty: "Beginner",
    xp: 50,
    description: "The SUM function adds all numbers that you specify as arguments. Each argument can be a range, a cell reference, an array, a constant, a formula, or the result from another function.",
    syntax: "SUM(number1, [number2], ...)",
    examples: [{ description: "Add values in cells A1 through A5", formula: "=SUM(A1:A5)" }],
    practice: {
      instructions: "Calculate the total sales by summing the values in the range B2:B5.",
      initialData: [["Item", "Sales"], ["Apples", 50], ["Oranges", 80], ["Bananas", 40], ["Grapes", 60], ["Total", ""]],
      targetCell: [5, 1],
      expectedFormula: "SUM(B2:B5)",
      expectedValue: 230
    }
  },
  // LOGICAL
  {
    id: "if-logic",
    title: "IF Function",
    category: "logical",
    difficulty: "Beginner",
    xp: 80,
    description: "The IF function allows you to make logical comparisons between a value and what you expect.",
    syntax: "IF(logical_test, value_if_true, [value_if_false])",
    practice: {
      instructions: "In cell C2, write a formula to return 'Pass' if the score in B2 is 50 or higher, otherwise 'Fail'.",
      initialData: [["Student", "Score", "Result"], ["Afeez", 85, ""]],
      targetCell: [1, 2],
      expectedFormula: "IF(B2>=50,\"Pass\",\"Fail\")",
      expectedValue: "Pass"
    }
  },
  {
    id: "ifs-multi",
    title: "IFS Function",
    category: "logical",
    difficulty: "Intermediate",
    xp: 100,
    description: "The IFS function checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.",
    syntax: "IFS(condition1, value1, [condition2, value2], ...)",
    practice: {
      instructions: "Assign grades in C2: 'A' if B2 >= 90, 'B' if B2 >= 80, 'C' otherwise.",
      initialData: [["Name", "Score", "Grade"], ["John", 85, ""]],
      targetCell: [1, 2],
      expectedFormula: "IFS(B2>=90,\"A\",B2>=80,\"B\",TRUE,\"C\")",
      expectedValue: "B"
    }
  },
  {
    id: "switch-logic",
    title: "SWITCH Function",
    category: "logical",
    difficulty: "Intermediate",
    xp: 90,
    description: "The SWITCH function evaluates one value against a list of values, and returns the result corresponding to the first matching value.",
    syntax: "SWITCH(expression, value1, result1, [default_or_value2, result2], ...)",
    practice: {
      instructions: "Map code in A2 to description in B2: 1='Active', 2='Pending'. Use SWITCH.",
      initialData: [["Code", "Status"], [2, ""]],
      targetCell: [1, 1],
      expectedFormula: "SWITCH(A2,1,\"Active\",2,\"Pending\")",
      expectedValue: "Pending"
    }
  },
  // LOOKUP
  {
    id: "vlookup-intro",
    title: "VLOOKUP",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 150,
    description: "Use VLOOKUP when you need to find things in a table or a range by row.",
    syntax: "VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    practice: {
      instructions: "Find the price of 'Banana' from the table A2:B5. Output it in cell E2.",
      initialData: [["Product", "Price", "", "Lookup", "Result"], ["Apple", 1.2, "", "Banana", ""], ["Banana", 0.8], ["Orange", 1.5], ["Mango", 2.0]],
      targetCell: [1, 4],
      expectedFormula: "VLOOKUP(D2,A2:B5,2,FALSE)",
      expectedValue: 0.8
    }
  },
  {
    id: "xlookup-modern",
    title: "XLOOKUP",
    category: "lookup",
    difficulty: "Intermediate",
    xp: 150,
    description: "The modern successor to VLOOKUP. It searches a range or an array, and returns an item corresponding to the first match it finds.",
    syntax: "XLOOKUP(lookup_value, lookup_array, return_array, ...)",
    practice: {
      instructions: "Use XLOOKUP to find the Salary for the ID in D2.",
      initialData: [["ID", "Salary", "", "Search ID", "Result"], ["E001", 50000, "", "E003", ""], ["E002", 60000], ["E003", 75000], ["E004", 90000]],
      targetCell: [1, 4],
      expectedFormula: "XLOOKUP(D2,A2:A5,B2:B5)",
      expectedValue: 75000
    }
  },
  {
    id: "index-match",
    title: "INDEX & MATCH",
    category: "lookup",
    difficulty: "Advanced",
    xp: 200,
    description: "Combining INDEX and MATCH allows for more flexible lookups than VLOOKUP.",
    syntax: "INDEX(array, MATCH(lookup_value, lookup_array, [match_type]))",
    practice: {
      instructions: "Find Price of 'Orange' using INDEX and MATCH.",
      initialData: [["Product", "Price"], ["Apple", 1], ["Orange", 2], ["Total", ""]],
      targetCell: [2, 1],
      expectedFormula: "INDEX(B1:B2,MATCH(\"Orange\",A1:A2,0))",
      expectedValue: 2
    }
  },
  // TEXT
  {
    id: "left-text",
    title: "LEFT Function",
    category: "text",
    difficulty: "Beginner",
    xp: 40,
    description: "LEFT returns the first character or characters in a text string.",
    syntax: "LEFT(text, [num_chars])",
    practice: {
      instructions: "Extract the first 3 characters of A2.",
      initialData: [["ID", "Code"], ["EXL-2024", ""]],
      targetCell: [1, 1],
      expectedFormula: "LEFT(A2,3)",
      expectedValue: "EXL"
    }
  },
  {
    id: "textjoin-adv",
    title: "TEXTJOIN",
    category: "text",
    difficulty: "Intermediate",
    xp: 100,
    description: "Combines text from multiple ranges with a delimiter.",
    syntax: "TEXTJOIN(delimiter, ignore_empty, text1, ...)",
    practice: {
      instructions: "Combine names with space.",
      initialData: [["First", "Middle", "Last", "Full"], ["Afeez", "", "Alimi", ""]],
      targetCell: [1, 3],
      expectedFormula: "TEXTJOIN(\" \",TRUE,A2,B2,C2)",
      expectedValue: "Afeez Alimi"
    }
  },
  {
    id: "substitute-text",
    title: "SUBSTITUTE",
    category: "text",
    difficulty: "Intermediate",
    xp: 80,
    description: "Substitutes new_text for old_text in a text string.",
    syntax: "SUBSTITUTE(text, old_text, new_text, [instance_num])",
    practice: {
      instructions: "Replace '-' with '/' in A2.",
      initialData: [["Date-Raw", "Formatted"], ["2024-05-25", ""]],
      targetCell: [1, 1],
      expectedFormula: "SUBSTITUTE(A2,\"-\",\"/\")",
      expectedValue: "2024/05/25"
    }
  },
  // MATH & STATS
  {
    id: "sumifs-math",
    title: "SUMIFS Function",
    category: "math",
    difficulty: "Intermediate",
    xp: 120,
    description: "Adds cells that meet multiple criteria.",
    syntax: "SUMIFS(sum_range, criteria_range1, criteria1, ...)",
    practice: {
      instructions: "Sum sales for 'West' region.",
      initialData: [["Item", "Sales", "Region"], ["Pens", 100, "East"], ["Books", 200, "West"], ["Pens", 150, "West"], ["Total West", ""]],
      targetCell: [4, 1],
      expectedFormula: "SUMIFS(B2:B4,C2:C4,\"West\")",
      expectedValue: 350
    }
  },
  {
    id: "countifs-stat",
    title: "COUNTIFS",
    category: "math",
    difficulty: "Intermediate",
    xp: 100,
    description: "Counts cells that meet multiple criteria.",
    syntax: "COUNTIFS(criteria_range1, criteria1, ...)",
    practice: {
      instructions: "Count 'Pens' in 'West'.",
      initialData: [["Item", "Region"], ["Pens", "West"], ["Books", "West"], ["Pens", "West"], ["Count", ""]],
      targetCell: [4, 0],
      expectedFormula: "COUNTIFS(A2:A4,\"Pens\",B2:B4,\"West\")",
      expectedValue: 2
    }
  },
  {
    id: "averageif-stat",
    title: "AVERAGEIF",
    category: "math",
    difficulty: "Intermediate",
    xp: 100,
    description: "Returns the average of all cells in a range that meet a given criteria.",
    syntax: "AVERAGEIF(range, criteria, [average_range])",
    practice: {
      instructions: "Average sales where region is 'East'.",
      initialData: [["Region", "Sales"], ["East", 100], ["West", 200], ["East", 300], ["Avg East", ""]],
      targetCell: [4, 1],
      expectedFormula: "AVERAGEIF(A2:A4,\"East\",B2:B4)",
      expectedValue: 200
    }
  },
  // DATE & TIME
  {
    id: "datedif-date",
    title: "DATEDIF",
    category: "basics",
    difficulty: "Intermediate",
    xp: 90,
    description: "Calculates the number of days, months, or years between two dates.",
    syntax: "DATEDIF(start_date, end_date, unit)",
    practice: {
      instructions: "Calculate years between A2 and B2.",
      initialData: [["Start", "End", "Years"], ["2010-01-01", "2024-01-01", ""]],
      targetCell: [1, 2],
      expectedFormula: "DATEDIF(A2,B2,\"Y\")",
      expectedValue: 14
    }
  },
  {
    id: "networkdays-date",
    title: "NETWORKDAYS",
    category: "basics",
    difficulty: "Intermediate",
    xp: 110,
    description: "Returns the number of whole working days between two dates.",
    syntax: "NETWORKDAYS(start_date, end_date, [holidays])",
    practice: {
      instructions: "Calculate working days in Jan 2024 (A2 to B2).",
      initialData: [["Start", "End", "Days"], ["2024-01-01", "2024-01-31", ""]],
      targetCell: [1, 2],
      expectedFormula: "NETWORKDAYS(A2,B2)",
      expectedValue: 23
    }
  },
  // DYNAMIC ARRAYS
  {
    id: "filter-array",
    title: "FILTER Function",
    category: "dynamic",
    difficulty: "Advanced",
    xp: 200,
    description: "Filters a range based on criteria.",
    syntax: "FILTER(array, include, [if_empty])",
    practice: {
      instructions: "Filter items with Price > 1.",
      initialData: [["Item", "Price"], ["Apple", 0.5], ["Orange", 1.2], ["Mango", 2.0], ["Result", ""]],
      targetCell: [4, 0],
      expectedFormula: "FILTER(A2:B4,B2:B4>1)",
      expectedValue: "Orange"
    }
  },
  {
    id: "unique-array",
    title: "UNIQUE Function",
    category: "dynamic",
    difficulty: "Advanced",
    xp: 150,
    description: "Returns a list of unique values in a list or range.",
    syntax: "UNIQUE(array, [by_col], [exactly_once])",
    practice: {
      instructions: "Get unique categories from A2:A5.",
      initialData: [["Category"], ["A"], ["B"], ["A"], ["C"], ["Unique", ""]],
      targetCell: [5, 0],
      expectedFormula: "UNIQUE(A2:A5)",
      expectedValue: "A"
    }
  },
  {
    id: "sort-array",
    title: "SORT Function",
    category: "dynamic",
    difficulty: "Advanced",
    xp: 150,
    description: "Sorts the contents of a range or array.",
    syntax: "SORT(array, [sort_index], [sort_order], [by_col])",
    practice: {
      instructions: "Sort scores in B2:B4 in descending order (-1).",
      initialData: [["Name", "Score"], ["A", 80], ["B", 95], ["C", 70], ["Sorted", ""]],
      targetCell: [4, 1],
      expectedFormula: "SORT(B2:B4,1,-1)",
      expectedValue: 95
    }
  },
  // ADVANCED & FINANCIAL
  {
    id: "pmt-financial",
    title: "PMT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 180,
    description: "Calculates the payment for a loan based on constant payments and a constant interest rate.",
    syntax: "PMT(rate, nper, pv, [fv], [type])",
    practice: {
      instructions: "Calculate monthly payment for 5% annual rate (B2/12), 36 months (B3), $10000 loan (B4).",
      initialData: [["Label", "Value"], ["Rate", 0.05], ["Nper", 36], ["PV", 10000], ["Monthly", ""]],
      targetCell: [4, 1],
      expectedFormula: "PMT(B2/12,B3,B4)",
      expectedValue: -299.71
    }
  },
  {
    id: "let-advanced",
    title: "LET Function",
    category: "advanced",
    difficulty: "Advanced",
    xp: 250,
    description: "The LET function assigns names to calculation results.",
    syntax: "LET(name1, name_value1, calculation_or_name2, ...)",
    practice: {
      instructions: "Use LET to calculate 'Total' by assigning 'x' to 10 and 'y' to 20, then x+y.",
      initialData: [["Label", "Value"], ["Result", ""]],
      targetCell: [1, 1],
      expectedFormula: "LET(x,10,y,20,x+y)",
      expectedValue: 30
    }
  },
  {
    id: "lambda-advanced",
    title: "LAMBDA Function",
    category: "advanced",
    difficulty: "Professional",
    xp: 500,
    description: "Use LAMBDA to create custom, reusable functions and call them by a friendly name.",
    syntax: "LAMBDA([parameter1, parameter2, ...], calculation)",
    practice: {
      instructions: "Create a LAMBDA that doubles a value: LAMBDA(x, x*2)(B2). B2 is 50.",
      initialData: [["Input", 50], ["Result", ""]],
      targetCell: [1, 1],
      expectedFormula: "LAMBDA(x,x*2)(B1)",
      expectedValue: 100
    }
  }
];

export const getLessonById = (id) => excelLessons.find(l => l.id === id);
export const getLessonsByCategory = (category) => excelLessons.filter(l => l.category === category);
export const getCategoryStats = (completedLessons) => {
  const stats = {};
  excelLessons.forEach(lesson => {
    if (!stats[lesson.category]) {
       stats[lesson.category] = { total: 0, completed: 0 };
    }
    stats[lesson.category].total++;
    if (completedLessons.includes(lesson.id)) {
       stats[lesson.category].completed++;
    }
  });
  return stats;
};
