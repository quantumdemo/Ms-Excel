import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function POST(req) {
  try {
    const { data } = await req.json();

    if (!data || !Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const workbook = XLSX.utils.book_new();

    // Process data to handle potential objects (value + formula)
    const processedData = data.map(row =>
      row.map(cell => {
        if (cell && typeof cell === 'object' && cell.formula) {
            // SheetJS expects formula without leading '='
            const f = cell.formula.startsWith('=') ? cell.formula.substring(1) : cell.formula;
            return { v: cell.value, f: f };
        }
        return cell;
      })
    );

    const worksheet = XLSX.utils.aoa_to_sheet(processedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="SheetLab_Export.xlsx"'
      }
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Failed to generate Excel file: " + error.message }, { status: 500 });
  }
}
