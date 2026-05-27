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
    description: `Master the ${name} function. It is a vital part of the ${category} toolset in Microsoft Excel. This function helps you perform complex tasks automatically.`,
    concept: `The ${name} function is designed to process data in your spreadsheet efficiently.`
  },
  syntax: `=${name}(argument1, [argument2], ...)`,
  syntaxBreakdown: [
    { arg: "argument1", desc: "The first required piece of information for the function." },
    { arg: "argument2", desc: "An optional piece of information to further refine the result." }
  ],
  realWorldExamples: [
    {
      title: "General Usage",
      table: {
        headers: ["Data A", "Data B", "Formula", "Result"],
        rows: [
          ["Val 1", "Val 2", `=${name}(...)`, "Output"]
        ]
      },
      explanation: `By using ${name}, Excel automatically calculates the output based on your input data.`
    }
  ],
  commonMistakes: [
    { title: "Incorrect Range", desc: "Make sure you select the correct cells for your calculation." }
  ],
  proTips: [
    `You can use ${name} with other functions to create even more powerful formulas.`
  ],
  miniChallenge: {
    question: `Write a formula using ${name} to process the data in cells A2 and B2.`,
    expectedAnswer: `=${name}(A2,B2)`
  },
  practice: {
    instructions: `Apply the ${name} function to solve the challenge below.`,
    initialData: [["Value A", "Value B", "Result"], [10, 20, ""]],
    targetCell: [1, 2],
    expectedFormula: `${name}(A2,B2)`,
    expectedValue: "VALID"
  }
});
