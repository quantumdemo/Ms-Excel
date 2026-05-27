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
    title: `What is the ${name} Function?`,
    description: `Master the ${name} function. It is a vital part of the ${category} tools. This function helps you save time by performing tasks automatically.`,
    concept: `Like all functions, ${name} takes some information (arguments), processes it, and gives you a result.`
  },
  syntax: `=${name}(argument1, [argument2], ...)`,
  syntaxBreakdown: [
    { arg: "argument1", desc: "The first required piece of information Excel needs to run this function." },
    { arg: "argument2", desc: "Optional. Extra information you can provide to change how the function works." }
  ],
  realWorldExamples: [
    {
      title: "Common Scenario",
      table: {
        headers: ["Input Data", "Formula", "Result"],
        rows: [
          ["Sample Value", `=${name}(...)`, "Output"]
        ]
      },
      explanation: `Excel uses ${name} to turn your raw data into useful information.`
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
