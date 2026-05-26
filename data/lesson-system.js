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
  description: `Master the ${name} function. It is a vital part of the ${category} toolset in Microsoft Excel.`,
  syntax: `=${name}(...)`,
  examples: [
    { description: `Basic use of ${name}`, formula: `=${name}(...)` }
  ],
  practice: {
    instructions: `Apply the ${name} function to solve the challenge below.`,
    initialData: [["Value A", "Value B", "Result"], [10, 20, ""]],
    targetCell: [1, 2],
    expectedFormula: `${name}(A2,B2)`,
    expectedValue: "VALID"
  }
});
