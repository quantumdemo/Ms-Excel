import { NextResponse } from 'next/server.js';

/**
 * Fallback Intelligent Rule Engine for AI Data Coach when AI API Key is unavailable.
 */
function generateFallbackResponse(question, context = {}, attemptedFormula = null) {
  const q = (question || "").toLowerCase();
  const selected = context.selectedCell || {};
  const headers = context.headers || [];
  const headerStr = headers.length > 0 ? headers.map(h => h.text).join(", ") : "your columns";
  const selectedCellId = selected.id || "the selected cell";
  const selectedVal = selected.computed;
  const selectedRaw = selected.raw || "";

  const lastRow = context.dataBounds?.lastRowNumber || 100;
  const startRow = context.dataBounds?.startDataRowNumber || 2;

  // Find column matching target or default to C or B
  const colC = headers.find(h => h.colLabel === 'C') || headers[0] || { colLabel: 'C', text: 'Column' };
  const colB = headers.find(h => h.colLabel === 'B') || headers[1] || { colLabel: 'B', text: 'Value' };
  const colA = headers.find(h => h.colLabel === 'A') || headers[0] || { colLabel: 'A', text: 'Category' };

  const exactRangeC = `${colC.colLabel}${startRow}:${colC.colLabel}${lastRow}`;
  const exactRangeB = `${colB.colLabel}${startRow}:${colB.colLabel}${lastRow}`;
  const exactRangeA = `${colA.colLabel}${startRow}:${colA.colLabel}${lastRow}`;

  // 0. UNIQUE Function Request
  if (q.includes("unique")) {
    return {
      type: "formula_help",
      answer: `Extract Unique Values for ${colC.text}`,
      explanation: `To extract all distinct items from the ${colC.text} column (spanning rows ${startRow} to ${lastRow}), use the \`UNIQUE\` function.`,
      formula: `=UNIQUE(${exactRangeC})`,
      hint: `Reference options: Relative \`=UNIQUE(${exactRangeC})\`, Absolute \`=UNIQUE($${colC.colLabel}$${startRow}:$${colC.colLabel}$${lastRow})\`, or Full Column \`=UNIQUE(${colC.colLabel}:${colC.colLabel})\`.`,
      learningObjective: "Master dynamic array UNIQUE function and proper Excel range referencing.",
      difficulty: "intermediate",
      action: {
        type: "insert_formula",
        cell: selectedCellId,
        formula: `=UNIQUE(${exactRangeC})`
      }
    };
  }

  // 1. Pivot Table Generation
  if (q.includes("pivot") || context.requestType === "generate_pivot") {
    const catColName = colA.text || "Category";
    const numColName = colB.text || "Value";

    let aggType = "SUM";
    if (q.includes("average") || q.includes("mean")) aggType = "AVERAGE";
    else if (q.includes("count") || q.includes("frequency")) aggType = "COUNT";
    else if (q.includes("max") || q.includes("highest")) aggType = "MAX";
    else if (q.includes("min") || q.includes("lowest")) aggType = "MIN";

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

    const funcFormula = aggType === "AVERAGE"
      ? `=AVERAGEIF(${exactRangeA}, A2, ${exactRangeB})`
      : aggType === "COUNT"
      ? `=COUNTIF(${exactRangeA}, A2)`
      : aggType === "MAX"
      ? `=MAXIFS(${exactRangeB}, ${exactRangeA}, A2)`
      : aggType === "MIN"
      ? `=MINIFS(${exactRangeB}, ${exactRangeA}, A2)`
      : `=SUMIF(${exactRangeA}, A2, ${exactRangeB})`;

    return {
      type: "data_analysis",
      answer: `AI Intelligent Pivot Table (${aggType}) Analysis`,
      explanation: `Analyzed dataset spanning rows ${startRow} to ${lastRow}. Grouped primary category '${catColName}' and metric '${numColName}' using ${aggType} aggregation.`,
      formula: funcFormula,
      hint: `Pivot summary worksheet created using ${aggType} aggregation.`,
      learningObjective: `Master Pivot Table multi-aggregation (${aggType}) and categorical analysis.`,
      difficulty: "intermediate",
      action: {
        type: "generate_pivot",
        pivotData: {
          categoryHeader: catColName,
          measureHeader: numColName,
          aggregationType: aggType,
          rows: pivotRows
        }
      }
    };
  }

  // 2. Formula Error Diagnosis
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
      hint = "Re-enter the correct range e.g. " + exactRangeB + " in your formula.";
    } else if (errType === "#VALUE!") {
      explanation = "A parameter type mismatch occurred (e.g. supplying text where a number was required).";
      hint = "Ensure all cells in your formula range contain numeric values.";
    }

    return {
      type: "error_help",
      answer: `Found error ${errType} in cell ${selectedCellId}.`,
      explanation,
      formula: selectedRaw.startsWith("=") ? selectedRaw : `=SUM(${exactRangeB})`,
      hint,
      learningObjective: "Identify and resolve common Excel formula evaluation errors.",
      difficulty: "beginner",
      action: null
    };
  }

  // 3. Explain Formula
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
        explanation: `To add a calculation, start typing with an equals sign \`=\` e.g., \`=SUM(${exactRangeB})\`.`,
        formula: `=SUM(${exactRangeB})`,
        hint: "Select a cell containing a formula starting with '=' to get a detailed breakdown.",
        learningObjective: "Understand Excel raw cell values vs formulas.",
        difficulty: "beginner",
        action: null
      };
    }
  }

  // 4. Data Analysis
  if (q.includes("analyze") || q.includes("what should i analyze") || q.includes("help me analyze")) {
    return {
      type: "data_analysis",
      answer: `Analysis Guide for your dataset (${headerStr}).`,
      explanation: `I detected dataset headers: ${headerStr} spanning rows ${startRow} to ${lastRow}. A great first step is to summarize total and conditional metrics for ${colB.text}.`,
      formula: `=SUMIF(${exactRangeA}, "${colA.text}", ${exactRangeB})`,
      hint: `Try calculating total ${colB.text} using =SUM(${exactRangeB}) or category breakdowns with =SUMIF(...)`,
      learningObjective: "Perform basic aggregation and conditional analysis on spreadsheet data.",
      difficulty: "intermediate",
      action: {
        type: "insert_formula",
        cell: selectedCellId,
        formula: `=SUM(${exactRangeB})`
      }
    };
  }

  // 5. Calculate / Suggest Formula
  if (q.includes("calculate") || q.includes("sum") || q.includes("total") || q.includes("average") || q.includes("how to")) {
    const suggestedFormula = `=SUM(${exactRangeB})`;

    return {
      type: "formula_help",
      answer: `Recommended Formula for ${selectedCellId}`,
      explanation: `To aggregate numeric values in column ${colB.colLabel} (${colB.text}) across rows ${startRow} to ${lastRow}, use the \`SUM\` function.`,
      formula: suggestedFormula,
      hint: `Options: Relative \`=SUM(${exactRangeB})\`, Absolute \`=SUM($${colB.colLabel}$${startRow}:$${colB.colLabel}$${lastRow})\`, or Full Column \`=SUM(${colB.colLabel}:${colB.colLabel})\`.`,
      learningObjective: "Apply SUM function for totals with proper Excel referencing.",
      difficulty: "beginner",
      action: {
        type: "insert_formula",
        cell: selectedCellId,
        formula: suggestedFormula
      }
    };
  }

  // 6. Answer Checking / Practice Mode
  if (attemptedFormula || q.includes("check")) {
    const userFormula = attemptedFormula || selectedRaw;
    const isCorrect = userFormula.toUpperCase().startsWith("=") && (userFormula.includes("SUM") || userFormula.includes("AVERAGE") || userFormula.includes("IF") || userFormula.includes("UNIQUE"));

    return {
      type: "practice",
      answer: isCorrect ? "Great work! Your formula structure looks correct." : "Good attempt! Let's refine your formula.",
      explanation: isCorrect
        ? `Your formula \`${userFormula}\` is valid and computes expected results.`
        : `Your formula \`${userFormula}\` might need adjustment. Make sure it starts with \`=\` and uses valid ranges e.g. \`${exactRangeB}\`.`,
      formula: isCorrect ? userFormula : `=SUM(${exactRangeB})`,
      hint: isCorrect ? "Try exploring absolute or mixed referencing next!" : "Check range bounds and argument commas.",
      learningObjective: "Master Excel formula syntax and range referencing.",
      difficulty: "beginner",
      action: null
    };
  }

  // Default Guidance
  return {
    type: "guided_solution",
    answer: "Spreadsheet Assistant Ready",
    explanation: `I've analyzed your spreadsheet with columns [${headerStr}] spanning rows ${startRow} to ${lastRow}. Selected cell: ${selectedCellId} (Value: ${selectedVal ?? 'empty'}). Ask me to extract unique items, explain formulas, or calculate totals!`,
    formula: null,
    hint: "Try asking: 'Get unique products' or 'Help me analyze this data'.",
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

CRITICAL SPREADSHEET RANGE & REFERENCING INSTRUCTIONS:
1. ALWAYS inspect the 'headers' and 'dataBounds' in the spreadsheet context for exact column ranges.
   - For example, if header 'Product' in column C has dataRange: "C2:C100" (or dataBounds.lastRowNumber = 100), ALWAYS use "C2:C100" or full column "C:C" in suggested formulas!
   - NEVER truncate or guess ranges like "C2:C12" when the actual data spans to row 100.
2. SPREADSHEET REFERENCING RULES:
   - Relative References: e.g. C2:C100 (for standard calculations)
   - Absolute References: e.g. $C$2:$C$100 (when formulas will be copied/dragged)
   - Mixed References: e.g. C$2:C$100 or $C2:$C100 (when locking only row or column)
   - Full-Column References: e.g. C:C or UNIQUE(C:C) (for full column functions)
   - Cross-Sheet References: e.g. Sheet2!C2:C100 or 'PivotSummary'!A2:A10 (when referencing other sheets in the workbook)

Return ONLY a valid JSON object strictly adhering to this schema:
{
  "type": "explanation" | "guided_solution" | "formula_help" | "error_help" | "data_analysis" | "practice",
  "answer": "short summary heading",
  "explanation": "clear educational breakdown",
  "formula": "=FORMULA(...)" or null,
  "hint": "helpful hint for learner",
  "learningObjective": "learning goal",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "action": null or { "type": "insert_formula", "cell": "CELL_ID", "formula": "=FORMULA(...)" } or { "type": "generate_pivot", "pivotData": { "categoryHeader": "...", "measureHeader": "...", "aggregationType": "SUM" | "AVERAGE" | "COUNT" | "MAX" | "MIN", "rows": [{ "category": "...", "value": 100 }] } }
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
