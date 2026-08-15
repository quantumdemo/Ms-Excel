import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function POST(req) {
  try {
    const body = await req.json();
    const { data, sheets: incomingSheets } = body;

    const workbook = XLSX.utils.book_new();

    const getFormatCode = (fmt) => {
      switch (fmt) {
        case 'currency': return '"$"#,##0.00';
        case 'percentage': return '0.00%';
        case 'date': return 'yyyy-mm-dd';
        case 'number': return '#,##0.00';
        case 'text': return '@';
        default: return undefined;
      }
    };

    const processSheetData = (sheetData) => {
      return (sheetData || []).map(row =>
        (row || []).map(cell => {
          if (cell && typeof cell === 'object') {
            const val = cell.value ?? "";
            const fmtCode = getFormatCode(cell.format);
            if (cell.formula) {
              const f = cell.formula.startsWith('=') ? cell.formula.substring(1) : cell.formula;
              return { v: val, f: f, z: fmtCode };
            }
            return { v: val, z: fmtCode };
          }
          return cell;
        })
      );
    };

    if (incomingSheets && Array.isArray(incomingSheets) && incomingSheets.length > 0) {
      incomingSheets.forEach((s, idx) => {
        const sheetName = s.name || `Sheet${idx + 1}`;
        const processed = processSheetData(s.data);
        const worksheet = XLSX.utils.aoa_to_sheet(processed);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      });
    } else if (data && Array.isArray(data)) {
      const processed = processSheetData(data);
      const worksheet = XLSX.utils.aoa_to_sheet(processed);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    } else {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx', cellStyles: true });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="SheetLab_Workbook_Export.xlsx"'
      }
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Failed to generate Excel file: " + error.message }, { status: 500 });
  }
}
