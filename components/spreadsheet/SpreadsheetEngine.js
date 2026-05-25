"use client";

import { useEffect, useRef, useState } from 'react';
import 'handsontable/styles/handsontable.min.css';
import { registerAllModules } from 'handsontable/registry';
import Handsontable from 'handsontable';
import { Parser } from 'hot-formula-parser';

registerAllModules();

export default function SpreadsheetEngine({ initialData, onCellChange, targetCell }) {
  const containerRef = useRef(null);
  const hotRef = useRef(null);
  const [formulaValue, setFormulaValue] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    const parser = new Parser();

    // Simple mock formula evaluation for validation
    parser.on('callCellValue', (cellCoord, done) => {
      if (hotRef.current) {
        const value = hotRef.current.getDataAtCell(cellCoord.row.index, cellCoord.column.index);
        done(value);
      }
    });

    parser.on('callRangeValue', (startCell, endCell, done) => {
      if (hotRef.current) {
        const fragment = hotRef.current.getData(startCell.row.index, startCell.column.index, endCell.row.index, endCell.column.index);
        done(fragment);
      }
    });

    const hot = new Handsontable(containerRef.current, {
      data: JSON.parse(JSON.stringify(initialData)),
      rowHeaders: true,
      colHeaders: true,
      height: '300px',
      width: '100%',
      licenseKey: 'non-commercial-and-evaluation',
      afterSelection: (row, col) => {
        const val = hot.getDataAtCell(row, col);
        setFormulaValue(val?.toString().startsWith('=') ? val : '');
      },
      afterChange: (changes) => {
        if (changes) {
          changes.forEach(([row, col, prev, next]) => {
            if (row === targetCell[0] && col === targetCell[1]) {
              // Pass the raw input and evaluated result back
              let evaluated = next;
              if (next && next.toString().startsWith('=')) {
                 const result = parser.parse(next.substring(1));
                 evaluated = result.error ? result.error : result.result;
              }
              onCellChange(next, evaluated);
            }
          });
        }
      },
      cells(row, col) {
        const cellProperties = {};
        if (row === targetCell[0] && col === targetCell[1]) {
          cellProperties.className = 'target-cell';
        }
        return cellProperties;
      }
    });

    hotRef.current = hot;

    return () => {
      hot.destroy();
    };
  }, [initialData, targetCell, onCellChange]);

  return (
    <div className="flex flex-col gap-2 w-full overflow-hidden rounded-xl border border-white/10 bg-card-dark shadow-xl">
      <div className="flex items-center gap-2 p-2 bg-black/20 border-b border-white/5">
         <div className="bg-excel-green text-[10px] font-bold px-2 py-1 rounded">fx</div>
         <div className="flex-1 text-sm font-mono text-slate-300 truncate h-6">
            {formulaValue || "Select a cell..."}
         </div>
      </div>
      <div ref={containerRef} className="spreadsheet-container" />
      <style jsx global>{`
        .handsontable {
          color: #f8fafc;
          font-family: var(--font-geist-mono);
          font-size: 13px;
        }
        .handsontable th {
          background-color: #1c1f26 !important;
          color: #94a3b8 !important;
          border-color: #334155 !important;
        }
        .handsontable td {
          background-color: #0f1117 !important;
          color: #f8fafc !important;
          border-color: #334155 !important;
        }
        .handsontable .target-cell {
          background-color: rgba(33, 115, 70, 0.1) !important;
          border: 2px solid #217346 !important;
        }
        .handsontable .ht_master .wtHolder {
          overflow: auto !important;
        }
      `}</style>
    </div>
  );
}
