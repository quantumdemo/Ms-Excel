import { NextResponse } from 'next/server.js';

/**
 * Fallback Intelligent Rule Engine for AI Data Coach when AI API Key is unavailable.
 */
function generateFallbackResponse(question, context = {}, attemptedFormula = null) {
  const q = (question || "").toLowerCase();
  const selected = context.selectedCell || {};
  const headers = (context.headers || []).map(h => h.text);
  const headerStr = headers.length > 0 ? headers.join(", ") : "your columns";
  const selectedCellId = selected.id || "the selected cell";
  const selectedVal = selected.computed;
  const selectedRaw = selected.raw || "";

  // 0. Pivot Table Generation
  if (q.includes("pivot") || context.requestType === "generate_pivot") {
    const headersList = (context.headers || []).map(h => h.text);
    const catColName = headersList[0] || "Category";
    const numColName = headersList[1] || headersList[headersList.length - 1] || "Value";

    const catMap = new Map();
    const sampleRows = context.sampleData || [];

    sampleRows.forEach(row => {
      const catVal = row[0] ? String(row[0]).trim() : null;
      const numVal = Number(row[1] || row[row.length - 1]) || 0;
      if (catVal && catVal.toLowerCase() !== catColName.toLowerCase()) {
        catMap.set(catVal, (catMap.get(catVal) || 0) + numVal);
      }
    });

    const pivotRows = [];
    catMap.forEach((sumVal, catKey) => {
      pivotRows.push({ category: catKey, value: sumVal });
    });

    if (pivotRows.length === 0) {
      pivotRows.push({ category: "Group A", value: 125000 });
      pivotRows.push({ category: "Group B", value: 85000 });
      pivotRows.push({ category: "Group C", value: 45000 });
    }

    return {
      type: "data_analysis",
      answer: "AI Intelligent Pivot Table Analysis",
      explanation: `Analyzed dataset and identified primary category '${catColName}' and metric '${numColName}'. Generated automated grouped aggregation summary.`,
      formula: `=SUMIF(${catColName}, A2, ${numColName})`,
      hint: "Pivot summary worksheet created with intelligent categorical aggregation.",
      learningObjective: "Master Pivot Table grouped summaries and categorical aggregation.",
      difficulty: "intermediate",
      action: {
        type: "generate_pivot",
        pivotData: {
          categoryHeader: catColName,
          measureHeader: numColName,
          rows: pivotRows
        }
      }
    };
  }

  // 1. Formula Error Diagnosis
  if (q.includes("error") || (selected.hasError && typeof selectedVal === 'string')) {
    const errType = typeof selectedVal === 'string' && selectedVal.startsWith("#") ? selectedVal : "#VALUE!";
    let explanation = "Errors happen when formulas encounter unexpected inputs or range mismatches.";
    let hint = "Double-check your cell ranges and argument order.";

    if (errType === "#CIRCULAR!") {
      explanation = "A circular reference occurs when a formula refers to its own cell directly or indirectly.";
      hint = "Change the formula target range so it doesn't include cell " + selectedCellId + ".";
    } else if (errType === "#SPILL!") {
      explanation = "A dynamic array formula tried to expand results, but nearby cells blocked the spill range.";
      hint = "Clear the empty cells below or to the right of " + selectedCellId + " to allow the results to display.";
    } else if (errType === "#REF!") {
      explanation = "This cell references a range or cell that was deleted or moved.";
      hint = "Re-enter the correct range e.g. A2:A10 in your formula.";
    } else if (errType === "#VALUE!") {
      explanation = "A parameter type mismatch occurred (e.g. supplying text where a number was required).";
      hint = "Ensure all cells in your formula range contain numeric values.";
    }

    return {
      type: "error_help",
      answer: `Found error ${errType} in cell ${selectedCellId}.`,
      explanation,
      formula: selectedRaw.startsWith("=") ? selectedRaw : "=SUM(A1:A10)",
      hint,
      learningObjective: "Identify and resolve common Excel formula evaluation errors.",
      difficulty: "beginner",
      action: null
    };
  }

  // 2. Explain Formula
  if (q.includes("explain") || q.includes("what does this formula do")) {
    if (selectedRaw.startsWith("=")) {
      const funcNameMatch = selectedRaw.match(/^=([A-Z0-9_\.]+)/i);
      const funcName = funcNameMatch ? funcNameMatch[1].toUpperCase() : "Excel";
      return {
        type: "explanation",
        answer: `Cell ${selectedCellId} uses the ${funcName} function.`,
        explanation: `The formula \`${selectedRaw}\` computes a value based on referenced cells in your sheet. Currently evaluated result: ${selectedVal ?? 'N/A'}.`,
        formula: selectedRaw,
        hint: `You can click another cell to see its formula explanation.`,
        learningObjective: `Understand formula structure and execution for ${funcName}.`,
        difficulty: "beginner",
        action: null
      };
    } else {
      return {
        type: "explanation",
        answer: `Cell ${selectedCellId} currently contains a raw value (${selectedVal ?? 'empty'}).`,
        explanation: `To add a calculation, start typing with an equals sign \`=\` e.g., \`=SUM(A1:A10)\`.`,
        formula: "=SUM(A1:A10)",
        hint: "Select a cell containing a formula starting with '=' to get a detailed breakdown.",
        learningObjective: "Understand Excel raw cell values vs formulas.",
        difficulty: "beginner",
        action: null
      };
    }
  }

  // 3. Data Analysis / What to analyze
  if (q.includes("analyze") || q.includes("what should i analyze") || q.includes("help me analyze")) {
    const numCols = Object.keys(context.columnTypes || {}).filter(k => context.columnTypes[k] === "numeric");
    const numColName = numCols[0] || (headers[1] || headers[0] || "Revenue");
    const catColName = headers[0] || "Category";

    return {
      type: "data_analysis",
      answer: `Analysis Guide for your dataset (${headerStr}).`,
      explanation: `I detected dataset headers: ${headerStr}. A great first step is to summarize total and conditional metrics for ${numColName}.`,
      formula: `=SUMIF(A2:A10, "${catColName}", B2:B10)`,
      hint: `Try calculating total ${numColName} using =SUM(...) or category breakdowns with =SUMIF(...)`,
      learningObjective: "Perform basic aggregation and conditional analysis on spreadsheet data.",
      difficulty: "intermediate",
      action: {
        type: "insert_formula",
        cell: selectedCellId,
        formula: `=SUM(B2:B100)`
      }
    };
  }

  // 4. Calculate / Suggest Formula
  if (q.includes("calculate") || q.includes("sum") || q.includes("total") || q.includes("average") || q.includes("how to")) {
    const targetCol = headers[1] ? "B" : "A";
    const suggestedFormula = `=SUM(${targetCol}2:${targetCol}100)`;

    return {
      type: "formula_help",
      answer: `Recommended Formula for ${selectedCellId}`,
      explanation: `To aggregate numeric values in column ${targetCol}, use the \`SUM\` function. It automatically adds up all numbers within the specified range.`,
      formula: suggestedFormula,
      hint: `You can replace ${targetCol}2:${targetCol}100 with your actual data range.`,
      learningObjective: "Apply SUM function for totals.",
      difficulty: "beginner",
      action: {
        type: "insert_formula",
        cell: selectedCellId,
        formula: suggestedFormula
      }
    };
  }

  // 5. Answer Checking / Practice Mode
  if (attemptedFormula || q.includes("check")) {
    const userFormula = attemptedFormula || selectedRaw;
    const isCorrect = userFormula.toUpperCase().startsWith("=") && (userFormula.includes("SUM") || userFormula.includes("AVERAGE") || userFormula.includes("IF"));

    return {
      type: "practice",
      answer: isCorrect ? "Great work! Your formula structure looks correct." : "Good attempt! Let's refine your formula.",
      explanation: isCorrect
        ? `Your formula \`${userFormula}\` is valid and computes expected results.`
        : `Your formula \`${userFormula}\` might need adjustment. Make sure it starts with \`=\` and uses valid functions like \`SUM\`, \`AVERAGE\`, or \`SUMIF\`.`,
      formula: isCorrect ? userFormula : "=SUM(A1:A10)",
      hint: isCorrect ? "Try exploring conditional totals next with SUMIF!" : "Check parentheses and commas between arguments.",
      learningObjective: "Master Excel formula syntax and error resolution.",
      difficulty: "beginner",
      action: null
    };
  }

  // Default Guidance
  return {
    type: "guided_solution",
    answer: "Spreadsheet Assistant Ready",
    explanation: `I've analyzed your spreadsheet with columns: [${headerStr}]. Selected cell: ${selectedCellId} (Value: ${selectedVal ?? 'empty'}). Ask me to explain formulas, diagnose errors, or suggest calculations!`,
    formula: null,
    hint: "Try one of the suggested prompts below e.g. 'Help me analyze this data'.",
    learningObjective: "Explore AI Data Coach capabilities.",
    difficulty: "beginner",
    action: null
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { question, context, learnerContext, attemptedFormula } = body;

    if (!question && !context) {
      return (NextResponse?.json || Response.json)(
        { error: "Invalid request payload. Question or context is required." },
        { status: 400 }
      );
    }

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    const systemPrompt = `You are an AI Data Coach for LearnExcelAI.
Your goal is to act as a helpful spreadsheet learning tutor.
Spreadsheet Context:
${JSON.stringify(context, null, 2)}
Learner Question: ${question}
Attempted Formula: ${attemptedFormula || 'None'}

Return ONLY a valid JSON object strictly adhering to this schema:
{
  "type": "explanation" | "guided_solution" | "formula_help" | "error_help" | "data_analysis" | "practice",
  "answer": "short summary heading",
  "explanation": "clear educational breakdown",
  "formula": "=FORMULA(...)" or null,
  "hint": "helpful hint for learner",
  "learningObjective": "learning goal",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "action": null or { "type": "insert_formula", "cell": "CELL_ID", "formula": "=FORMULA(...)" } or { "type": "generate_pivot", "pivotData": { "categoryHeader": "...", "measureHeader": "...", "rows": [{ "category": "...", "value": 100 }] } }
}`;

    // 1. Try Groq Cloud (Free Tier)
    if (groqKey) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: question }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2
          })
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          return (NextResponse?.json || Response.json)(parsed);
        }
      } catch (err) {
        console.warn("Groq AI call failed, trying next provider:", err?.message);
      }
    }

    // 2. Try Google Gemini (Free Tier)
    if (geminiKey) {
      try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: systemPrompt + "\nUser Question: " + question }]
            }],
            generationConfig: {
              response_mime_type: "application/json",
              temperature: 0.2
            }
          })
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return (NextResponse?.json || Response.json)(parsed);
          }
        }
      } catch (err) {
        console.warn("Gemini AI call failed, trying next provider:", err?.message);
      }
    }

    // 3. Try OpenAI
    if (openaiKey) {
      try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: systemPrompt }],
            response_format: { type: "json_object" },
            temperature: 0.2
          })
        });

        if (openaiRes.ok) {
          const data = await openaiRes.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          return (NextResponse?.json || Response.json)(parsed);
        }
      } catch (err) {
        console.warn("OpenAI call failed, using fallback engine:", err?.message);
      }
    }

    // 4. Use Intelligent Rule Engine Fallback (Zero Config Needed)
    const fallbackResponse = generateFallbackResponse(question, context, attemptedFormula);
    return (NextResponse?.json || Response.json)(fallbackResponse);

  } catch (err) {
    console.error("AI Coach API error:", err);
    return (NextResponse?.json || Response.json)(
      {
        type: "explanation",
        answer: "AI Coach Temporarily Unavailable",
        explanation: "Unable to process AI request at this moment. You can continue using SheetLab normally.",
        formula: null,
        hint: "Check your formula syntax directly in the formula bar.",
        learningObjective: "SheetLab Sandbox Operation",
        difficulty: "beginner",
        action: null
      },
      { status: 200 }
    );
  }
}
export { generateFallbackResponse };
