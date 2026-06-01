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
  { id: 'info', name: 'Information', icon: Info, color: '#64748b' },
  { id: 'dynamic-array', name: 'Dynamic Arrays', icon: Zap, color: '#f97316' },
];

const categoryMetadata = {
  logical: {
    useCase: "automated decision making",
    exampleHeader: ["Condition", "Value If True", "Result"],
    exampleRow: ["=10>5", "Success", "YES"]
  },
  text: {
    useCase: "cleaning and manipulating string data",
    exampleHeader: ["Input String", "Logic", "Transformed"],
    exampleRow: ["Excel Pro", "Extract", "Pro"]
  },
  math: {
    useCase: "complex numerical computations",
    exampleHeader: ["Value A", "Value B", "Calculated"],
    exampleRow: [150, 25, "Result"]
  },
  lookup: {
    useCase: "retrieving data from specific ranges",
    exampleHeader: ["ID", "Lookup Table", "Result"],
    exampleRow: ["E-101", "Database", "Match"]
  },
  financial: {
    useCase: "investment and loan analysis",
    exampleHeader: ["Principal", "Rate", "Payment"],
    exampleRow: [5000, "5%", 250]
  }
};

export const createPlaceholderLesson = (id, name, category) => {
  const meta = categoryMetadata[category] || {
    useCase: "efficient data processing",
    exampleHeader: ["Input A", "Input B", "Output"],
    exampleRow: [100, 200, "Analyzed"]
  };

  return {
    id,
    title: `${name} Function`,
    category,
    difficulty: "Beginner",
    xp: 50,
    introduction: {
      title: `The Purpose of ${name}`,
      description: `The ${name} function is essential for ${meta.useCase}. It transforms raw spreadsheet data into meaningful insights by applying specific logical rules.`,
      concept: `By providing ${name} with the required arguments, you can automate repetitive tasks and ensure mathematical precision in your reports.`
    },
    syntax: `=${name}(argument1, [argument2], ...)`,
    syntaxBreakdown: [
      { arg: "argument1", desc: "The primary range or value that the function evaluates." },
      { arg: "argument2", desc: "Optional additional parameters to refine the output." }
    ],
    detailedExamples: [
      {
        title: "Example",
        table: {
          headers: meta.exampleHeader,
          rows: [
            [meta.exampleRow[0], meta.exampleRow[1], `=${name}(A2)`],
            ["Sample Data", "Secondary Data", `=${name}(A3)`]
          ]
        },
        explanation: `In this reporting scenario, ${name} processes the input cells to generate a standardized result, which updates automatically if the source data changes.`
      }
    ],
    commonMistakes: [
      { title: "Incomplete Arguments", desc: `Ensure all required parameters for ${name} are provided to avoid #N/A or #VALUE errors.` }
    ],
    proTips: [
      `Use ${name} in combination with other functions to build more powerful nested formulas.`
    ],
    miniChallenge: {
      question: `Apply the ${name} function to the value in cell A2 to get an automated result.`,
      expectedAnswer: `=${name}(A2)`
    },
    practice: {
      instructions: `Use the ${name} function in cell C2 to analyze the data in column B.`,
      initialData: [["Category", "Data Point", "Result"], ["Item 1", 10, ""], ["Item 2", 20, ""]],
      targetCell: [1, 2],
      expectedFormula: `${name}(B2)`,
      expectedValue: "VALID"
    },
    sandboxData: [
      ["Dataset", "Value 1", "Value 2", "Analysis"],
      ["Test Alpha", 100, 50, `=${name}(B2, C2)`],
      ["Test Beta", 200, 150, `=${name}(B3, C3)`],
      ["Test Gamma", 300, 250, `=${name}(B4, C4)`]
    ]
  };
};
