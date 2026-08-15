import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

function extractNamedRanges(workbook) {
  const namesMap = {};
  const namesList = workbook?.Workbook?.Names || workbook?.Names || [];

  if (Array.isArray(namesList)) {
    namesList.forEach(item => {
      if (item?.Name && item?.Ref) {
        let cleanRef = String(item.Ref).replace(/\$/g, '').trim();
        if (cleanRef.startsWith('=')) {
          cleanRef = cleanRef.substring(1).trim();
        }
        // Remove quotes around sheet names e.g. 'Sheet1'!D2 -> Sheet1!D2
        cleanRef = cleanRef.replace(/^'([^']+)'!/, '$1!');
        namesMap[item.Name] = cleanRef;
      }
    });
  }

  return namesMap;
}

function resolveFormulaNamedRanges(formula, namesMap) {
  if (!formula || Object.keys(namesMap).length === 0) return formula;

  let resolved = formula;
  const sortedNames = Object.keys(namesMap).sort((a, b) => b.length - a.length);

  sortedNames.forEach(name => {
    const targetRef = namesMap[name];
    try {
      const regex = new RegExp(`\\b${name}\\b`, 'g');
      resolved = resolved.replace(regex, targetRef);
    } catch (e) {
      resolved = resolved.split(name).join(targetRef);
    }
  });

  return resolved;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.name.endsWith('.xlsx')) {
      return NextResponse.json({ error: "Invalid file format. Only .xlsx is supported." }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'buffer', cellFormula: true, cellNF: true, cellStyles: true });

    // Extract defined Named Ranges from workbook metadata
    const namesMap = extractNamedRanges(workbook);

    const sheets = workbook.SheetNames.map(name => {
      const worksheet = workbook.Sheets[name];
      const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
      const data = [];

      for (let r = range.s.r; r <= range.e.r; r++) {
        const row = [];
        for (let c = range.s.c; c <= range.e.c; c++) {
          const cellAddress = XLSX.utils.encode_cell({ r, c });
          const cell = worksheet[cellAddress];

          if (!cell) {
            row.push("");
          } else {
            let formulaStr = null;
            if (cell.f) {
              const rawFormula = `=${cell.f}`;
              formulaStr = resolveFormulaNamedRanges(rawFormula, namesMap);
            }

            const cellData = {
              value: cell.v ?? "",
              formula: formulaStr
            };

            if (cellData.formula) {
              row.push(cellData);
            } else {
              row.push(cellData.value);
            }
          }
        }
        data.push(row);
      }

      return {
        name,
        data
      };
    });

    return NextResponse.json({ sheets });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json({ error: "Failed to parse Excel file: " + error.message }, { status: 500 });
  }
}
