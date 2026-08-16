import { NextResponse } from 'next/server.js';
import { resolveField } from '../../../../lib/pivot-engine.js';

/**
 * Intelligent Natural Language Intent Parser for PivotTable configuration fallback
 */
function parseNaturalLanguagePivotIntent(question = "", headers = []) {
  const q = String(question).toLowerCase();
  const headerTexts = headers.map(h => typeof h === 'string' ? h : h.text);

  let rows = [];
  let columns = [];
  let values = [];
  let filters = [];

  // 1. Detect Aggregation Function
  let agg = "SUM";
  if (q.includes("average") || q.includes("mean") || q.includes("avg")) {
    agg = "AVERAGE";
  } else if (q.includes("countunique") || q.includes("unique customer") || q.includes("distinct") || q.includes("unique")) {
    agg = "COUNTUNIQUE";
  } else if (q.includes("counta") || q.includes("number of non-empty")) {
    agg = "COUNTA";
  } else if (q.includes("count") || q.includes("how many") || q.includes("number of")) {
    agg = "COUNT";
  } else if (q.includes("max") || q.includes("highest") || q.includes("maximum") || q.includes("peak")) {
    agg = "MAX";
  } else if (q.includes("min") || q.includes("lowest") || q.includes("minimum") || q.includes("least")) {
    agg = "MIN";
  } else if (q.includes("median") || q.includes("middle")) {
    agg = "MEDIAN";
  } else if (q.includes("stdev") || q.includes("standard deviation")) {
    agg = "STDEV";
  } else if (q.includes("var") || q.includes("variance")) {
    agg = "VAR";
  }

  // 2. Detect Row & Column Dimensions (e.g. "by region", "by product", "by region and product", "by month")
  const byMatch = q.match(/by\s+([a-z0-9_\s\,\&]+?)(?=\s+(for|where|with|using|only|$))/i) || q.match(/by\s+(.+)$/i);
  if (byMatch) {
    const rawDims = byMatch[1].split(/and|\,|\&/).map(s => s.trim()).filter(Boolean);

    rawDims.forEach((dim, idx) => {
      // Check date grouping e.g. "month" or "year"
      if (dim.includes("month")) {
        const dateHeader = headerTexts.find(h => h.toLowerCase().includes("date")) || "Order Date";
        if (idx === 0) rows.push(`Month(${dateHeader})`);
        else columns.push(`Month(${dateHeader})`);
        return;
      }
      if (dim.includes("year")) {
        const dateHeader = headerTexts.find(h => h.toLowerCase().includes("date")) || "Order Date";
        if (idx === 0) rows.push(`Year(${dateHeader})`);
        else columns.push(`Year(${dateHeader})`);
        return;
      }

      const res = resolveField(dim, headerTexts);
      if (res) {
        if (idx === 0) rows.push(res.resolvedHeader);
        else columns.push(res.resolvedHeader);
      }
    });
  }

  // Fallback Row Dimension if not explicitly stated by "by"
  if (rows.length === 0) {
    const catHeader = headerTexts.find(h => {
      const lower = h.toLowerCase();
      return lower.includes("region") || lower.includes("product") || lower.includes("category") || lower.includes("department") || lower.includes("item");
    }) || headerTexts[0];
    if (catHeader) rows.push(catHeader);
  }

  // 3. Detect Value Field (Measure)
  let targetMeasure = null;
  const measureCandidates = headerTexts.filter(h => !rows.includes(h) && !columns.includes(h));

  // Direct match on header text (e.g. "quantity", "sales")
  measureCandidates.forEach(h => {
    const hLower = h.toLowerCase();
    if (!targetMeasure && q.includes(hLower)) {
      targetMeasure = h;
    }
  });

  // Plural/Synonym matching e.g. "orders" -> "Order ID", "customers" -> "Customer ID"
  if (!targetMeasure) {
    if (q.includes("order")) {
      targetMeasure = measureCandidates.find(h => h.toLowerCase().includes("order")) || "Order ID";
    } else if (q.includes("customer")) {
      targetMeasure = measureCandidates.find(h => h.toLowerCase().includes("customer")) || "Customer ID";
    } else {
      const measureKeywords = ["quantity", "sales", "revenue", "profit", "units", "amount", "price", "id"];
      measureKeywords.forEach(kw => {
        if (!targetMeasure && q.includes(kw)) {
          const matchH = measureCandidates.find(h => h.toLowerCase().includes(kw));
          if (matchH) targetMeasure = matchH;
        }
      });
    }
  }

  if (!targetMeasure) {
    targetMeasure = measureCandidates.find(h => {
      const lower = h.toLowerCase();
      return lower.includes("qty") || lower.includes("sales") || lower.includes("amount") || lower.includes("total") || lower.includes("price");
    }) || measureCandidates[0] || headerTexts[1] || headerTexts[0];
  }

  values.push({
    field: targetMeasure,
    aggregation: agg
  });

  // 4. Detect Filter (e.g. "laptops only" or "for laptops only")
  if (q.includes("laptop")) {
    const prodHeader = headerTexts.find(h => h.toLowerCase().includes("product") || h.toLowerCase().includes("item")) || "Product";
    filters.push({ field: prodHeader, operator: "=", value: "Laptop" });
  }

  return {
    intent: "pivot_table",
    rows,
    columns,
    values,
    filters,
    confidence: 0.95,
    explanation: `Structured PivotTable configuration parsed for question: "${question}"`
  };
}

/**
 * Fallback Intelligent Rule Engine for AI Data Coach when AI API Key is unavailable.
 */
function generateFallbackResponse(question, context = {}, attemptedFormula = null) {
  const q = (question || "").toLowerCase();
  const selected = context.selectedCell || {};
  const headers = context.headers || [];
  const headerStr = headers.length > 0 ? headers.map(h => typeof h === 'string' ? h : h.text).join(", ") : "your columns";
  const selectedCellId = selected.id || "the selected cell";
  const selectedVal = selected.computed;
  const selectedRaw = selected.raw || "";

  const lastRow = context.dataBounds?.lastRowNumber || 100;
  const startRow = context.dataBounds?.startDataRowNumber || 2;

  // 1. Pivot Table Generation
  if (q.includes("pivot") || context.requestType === "generate_pivot" || q.includes("by region") || q.includes("by product")) {
    const pivotConfig = parseNaturalLanguagePivotIntent(question, headers);

    return {
      type: "data_analysis",
      answer: `AI PivotTable Configuration Generated`,
      explanation: `Parsed structured PivotTable rules for your dataset (${headerStr}). The deterministic Pivot Engine will validate headers and calculate exact values.`,
      formula: null,
      hint: `Pivot summary worksheet will be constructed dynamically.`,
      learningObjective: `Master PivotTable multi-dimensional analysis and aggregation.`,
      difficulty: "intermediate",
      action: {
        type: "generate_pivot",
        pivotConfig
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
      hint = "Re-enter the correct range in your formula.";
    } else if (errType === "#VALUE!") {
      explanation = "A parameter type mismatch occurred (e.g. supplying text where a number was required).";
      hint = "Ensure all cells in your formula range contain numeric values.";
    }

    return {
      type: "error_help",
      answer: `Found error ${errType} in cell ${selectedCellId}.`,
      explanation,
      formula: selectedRaw.startsWith("=") ? selectedRaw : null,
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
        explanation: `To add a calculation, start typing with an equals sign \`=\`.`,
        formula: null,
        hint: "Select a cell containing a formula starting with '=' to get a detailed breakdown.",
        learningObjective: "Understand Excel raw cell values vs formulas.",
        difficulty: "beginner",
        action: null
      };
    }
  }

  // Default Guidance
  return {
    type: "guided_solution",
    answer: "Spreadsheet Assistant Ready",
    explanation: `I've analyzed your spreadsheet with columns [${headerStr}] spanning rows ${startRow} to ${lastRow}. Selected cell: ${selectedCellId}. Ask me to generate a PivotTable or analyze your dataset!`,
    formula: null,
    hint: "Try asking: 'Total quantity by region' or 'Average sales by product'.",
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
Your goal is to convert user natural language questions into structured PivotTable configurations OR educational guidance.

Spreadsheet Context:
${JSON.stringify(context, null, 2)}
Learner Question: ${question}

CRITICAL ARCHITECTURE RULE FOR PIVOT TABLES:
DO NOT calculate PivotTable values. You MUST ONLY generate a structured PivotTable configuration.
The deterministic Pivot Engine will validate the headers and calculate values from actual spreadsheet data.

Structured Pivot Config Schema:
{
  "intent": "pivot_table",
  "rows": ["Region"],
  "columns": [],
  "values": [
    { "field": "Quantity", "aggregation": "SUM" | "AVERAGE" | "COUNT" | "COUNTA" | "COUNTUNIQUE" | "MIN" | "MAX" | "MEDIAN" | "STDEV" | "VAR" }
  ],
  "filters": [],
  "confidence": 0.95,
  "explanation": "Clear explanation of the pivot configuration"
}

Return ONLY a valid JSON object strictly adhering to this schema:
{
  "type": "explanation" | "guided_solution" | "formula_help" | "error_help" | "data_analysis" | "practice",
  "answer": "short summary heading",
  "explanation": "clear educational breakdown",
  "formula": "=FORMULA(...)" or null,
  "hint": "helpful hint for learner",
  "learningObjective": "learning goal",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "action": null or { "type": "insert_formula", "cell": "CELL_ID", "formula": "=FORMULA(...)" } or { "type": "generate_pivot", "pivotConfig": { ... } }
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
            temperature: 0.1
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
              temperature: 0.1
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
            temperature: 0.1
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
export { generateFallbackResponse, parseNaturalLanguagePivotIntent };
