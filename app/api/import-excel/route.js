import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

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
            const cellData = {
              value: cell.v ?? "",
              formula: cell.f ? `=${cell.f}` : null
            };
            // If there's no formula, we can just return the value or the object
            // To satisfy both options, we'll return the object if it has a formula
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
