import {
  Layout, BrainCircuit, Type, Calendar, Search,
  Calculator, BarChart3, Landmark, Info, Zap
} from "lucide-react";

export const functionCategories = [
  { id: 'foundations', name: 'Excel Foundations', icon: Layout, color: '#6366f1' },
  { id: 'logical', name: 'Logical', icon: BrainCircuit, color: '#3b82f6' },
  { id: 'text', name: 'Text', icon: Type, color: '#ec4899' },
  { id: 'date-time', name: 'Date & Time', icon: Calendar, color: '#10b981' },
  { id: 'lookup', name: 'Lookup & Reference', icon: Search, color: '#f59e0b' },
  { id: 'math', name: 'Math & Trig', icon: Calculator, color: '#8b5cf6' },
  { id: 'statistical', name: 'Statistical', icon: BarChart3, color: '#ef4444' },
  { id: 'financial', name: 'Financial', icon: Landmark, color: '#059669' },
  { id: 'information', name: 'Information', icon: Info, color: '#64748b' },
  { id: 'dynamic-array', name: 'Dynamic Arrays', icon: Zap, color: '#f97316' },
];

export const createPlaceholderLesson = (id, name, category) => ({
  id,
  title: `${name} Function`,
  category,
  difficulty: "Beginner",
  xp: 50,
  introduction: {
    title: `Mastering the ${name} function`,
    description: `The ${name} function is a powerful tool in your Excel toolkit, specifically designed for ${category} tasks. It allows you to process data and extract meaningful insights with minimal effort.`,
    concept: `This function works by taking specific inputs, known as arguments, and returning a computed result based on the logic of ${name}.`
  },
  syntax: `=${name}(range_or_value, [additional_options])`,
  syntaxBreakdown: [
    { arg: "range_or_value", desc: "The primary data or cell range that the function will process." },
    { arg: "additional_options", desc: "Optional settings to refine the behavior and output of the function." }
  ],
  detailedExamples: [
    {
      title: `Analyzing Data with ${name}`,
      table: {
        headers: ["Source Data", "Formula Applied", "Output"],
        rows: [
          ["Sample Value 1", `=${name}(A2)`, "Result 1"],
          ["Sample Value 2", `=${name}(A3)`, "Result 2"]
        ]
      },
      explanation: `By applying ${name} to your dataset, Excel automates the calculation, ensuring accuracy and consistency across your report.`
    }
  ],
  commonMistakes: [
    { title: "Wrong Syntax", desc: `Ensure you use the correct number of commas and parentheses for ${name}.` },
    { title: "Data Type", desc: "Check if the function expects text, numbers, or logical values." }
  ],
  proTips: [
    `Mastering ${name} is a great step toward becoming an Excel professional.`,
    "You can find this function in the Formulas tab of the Excel ribbon."
  ],
  miniChallenge: {
    question: `Write a formula using ${name} to calculate a result from cell A2.`,
    expectedAnswer: `=${name}(A2)`
  },
  practice: {
    instructions: `Apply the ${name} function to solve the challenge below.`,
    initialData: [["Value A", "Value B", "Result"], [10, 20, ""]],
    targetCell: [1, 2],
    expectedFormula: `${name}(A2,B2)`,
    expectedValue: "VALID"
  }
});
