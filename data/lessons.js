export const excelLessons = [
  {
    id: "sum-basic",
    title: "SUM Function",
    category: "basics",
    difficulty: "Beginner",
    xp: 50,
    description: "The SUM function adds all numbers that you specify as arguments. Each argument can be a range, a cell reference, an array, a constant, a formula, or the result from another function.",
    syntax: "SUM(number1, [number2], ...)",
    examples: [
      {
        description: "Add values in cells A1 through A5",
        formula: "=SUM(A1:A5)"
      }
    ],
    practice: {
      instructions: "Calculate the total sales by summing the values in the range B2:B5.",
      initialData: [
        ["Item", "Sales"],
        ["Apples", 50],
        ["Oranges", 80],
        ["Bananas", 40],
        ["Grapes", 60],
        ["Total", ""]
      ],
      targetCell: [5, 1], // Row 5, Col 1 (Total value)
      expectedFormula: "SUM(B2:B5)",
      expectedValue: 230
    }
  },
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
      initialData: [
        ["Product", "Price", "", "Lookup", "Result"],
        ["Apple", 1.2, "", "Banana", ""],
        ["Banana", 0.8],
        ["Orange", 1.5],
        ["Mango", 2.0]
      ],
      targetCell: [1, 4],
      expectedFormula: "VLOOKUP(D2,A2:B5,2,FALSE)",
      expectedValue: 0.8
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
