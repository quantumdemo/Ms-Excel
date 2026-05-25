export const functionCategories = [
  { id: 'logical', name: 'Logical', icon: '🤔', color: '#3b82f6' },
  { id: 'text', name: 'Text', icon: '📝', color: '#ec4899' },
  { id: 'date-time', name: 'Date & Time', icon: '📅', color: '#10b981' },
  { id: 'lookup', name: 'Lookup & Reference', icon: '🔍', color: '#f59e0b' },
  { id: 'math', name: 'Math & Trig', icon: '🔢', color: '#8b5cf6' },
  { id: 'statistical', name: 'Statistical', icon: '📊', color: '#ef4444' },
  { id: 'financial', name: 'Financial', icon: '💰', color: '#059669' },
  { id: 'advanced', name: 'Advanced (LET/LAMBDA)', icon: '🚀', color: '#6366f1' },
  { id: 'dynamic-array', name: 'Dynamic Arrays', icon: '⚡', color: '#f97316' },
  { id: 'information', name: 'Information', icon: 'ℹ️', color: '#64748b' },
];

// Helper to generate a basic lesson structure for any function
export const createPlaceholderLesson = (id, name, category) => ({
  id,
  title: `${name} Function`,
  category,
  difficulty: "Beginner",
  xp: 50,
  description: `The ${name} function is used to perform operations related to ${category}.`,
  syntax: `=${name}(...)`,
  examples: [
    { description: `Basic use of ${name}`, formula: `=${name}(...)` }
  ],
  practice: {
    instructions: `Practice using the ${name} function.`,
    initialData: [["Input", "Result"], [10, ""]],
    targetCell: [1, 1],
    expectedFormula: `${name}(A2)`,
    expectedValue: "VALID"
  }
});
