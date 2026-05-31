"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { HyperFormula } from 'hyperformula';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MousePointer2, RotateCcw, Check, Sparkles, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

// Constants for grid size
const INITIAL_ROWS = 40;
const INITIAL_COLS = 26;

// Helper to convert column index to Excel letter (0 -> A, 25 -> Z)
const getColLabel = (index) => String.fromCharCode(65 + index);

export default function SheetLab({ onBack }) {
  const [selected, setSelected] = useState({ r: 0, c: 0 });
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hfValues, setHfValues] = useState([]);
  const [isFilling, setIsFilling] = useState(false);
  const [fillRange, setFillRange] = useState(null);

  // Initialize HyperFormula
  const hf = useMemo(() => {
    const instance = HyperFormula.buildEmpty({
      licenseKey: 'gpl-v3',
    });
    instance.addSheet('Sheet1');
    return instance;
  }, []);

  const sheetId = useMemo(() => hf.getSheetId('Sheet1'), [hf]);

  // Sync HyperFormula state with React
  const refreshValues = useCallback(() => {
    if (sheetId === undefined) return;
    const values = hf.getSheetValues(sheetId);
    setHfValues([...values]);
  }, [hf, sheetId]);

  useEffect(() => {
    // Initial empty grid
    const emptyData = Array(INITIAL_ROWS).fill(0).map(() => Array(INITIAL_COLS).fill(""));
    hf.setSheetContent(sheetId, emptyData);
    refreshValues();
  }, [hf, sheetId, refreshValues]);

  const handleCellSelect = (r, c) => {
    const formula = hf.getCellFormula(sheetId, r, c);
    const value = hf.getCellValue(sheetId, r, c);
    const cellValue = formula || (value !== null && value !== undefined ? value.toString() : "");
    setSelected({ r, c });
    setInputValue(cellValue);
  };

  const handleInputChange = (val) => {
    setInputValue(val);
  };

  const commitValue = () => {
    try {
      hf.setCellContents({ sheet: sheetId, row: selected.r, col: selected.c }, [[inputValue]]);
      refreshValues();
    } catch (e) {
      console.error("Formula error:", e);
    }
  };

  const adjustRefs = (formula, rOff, cOff) => {
    if (typeof formula !== 'string' || !formula.startsWith('=')) return formula;
    return formula.replace(/(\$?[A-Z]+)(\$?[0-9]+)/g, (match, col, row) => {
      let nc = col, nr = row;
      if (!col.startsWith('$')) {
        let ci = 0;
        for (let i = 0; i < col.length; i++) ci = ci * 26 + (col.charCodeAt(i) - 64);
        ci += cOff;
        nc = "";
        while (ci > 0) {
          let rem = (ci - 1) % 26;
          nc = String.fromCharCode(65 + rem) + nc;
          ci = Math.floor((ci - rem) / 26);
        }
      }
      if (!row.startsWith('$')) nr = (parseInt(row) + rOff).toString();
      return nc + nr;
    });
  };

  const handleFillEnd = () => {
    if (!isFilling || !fillRange) return;

    const startR = fillRange.startR;
    const startC = fillRange.startC;
    const endR = fillRange.endR;
    const endC = fillRange.endC;

    const sourceFormula = hf.getCellFormula(sheetId, startR, startC);
    const sourceValue = hf.getCellValue(sheetId, startR, startC);

    // Apply fill logic
    const batchUpdates = [];
    for (let r = Math.min(startR, endR); r <= Math.max(startR, endR); r++) {
      for (let c = Math.min(startC, endC); c <= Math.max(startC, endC); c++) {
        if (r === startR && c === startC) continue;

        if (sourceFormula) {
          const adjusted = adjustRefs(sourceFormula, r - startR, c - startC);
          batchUpdates.push({
            address: { sheet: sheetId, row: r, col: c },
            value: [[adjusted]]
          });
        } else {
          batchUpdates.push({
            address: { sheet: sheetId, row: r, col: c },
            value: [[sourceValue]]
          });
        }
      }
    }

    // Batch set for performance
    batchUpdates.forEach(upd => {
      hf.setCellContents(upd.address, upd.value);
    });

    refreshValues();
    setIsFilling(false);
    setFillRange(null);
  };

  const resetSheet = () => {
    const emptyData = Array(INITIAL_ROWS).fill(0).map(() => Array(INITIAL_COLS).fill(""));
    hf.setSheetContent(sheetId, emptyData);
    refreshValues();
    setSelected({ r: 0, c: 0 });
    setInputValue("");
  };

  const handleTouchMove = (e) => {
    if (!isFilling) return;
    if (e.cancelable) e.preventDefault();
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const td = el?.closest('td');
    if (td) {
      const r = parseInt(td.getAttribute('data-row'));
      const c = parseInt(td.getAttribute('data-col'));
      if (!isNaN(r) && !isNaN(c)) {
        setFillRange(prev => ({ ...prev, endR: r, endC: c }));
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-bg-dark text-slate-100 overflow-hidden fixed inset-0 z-50 select-none">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-bg-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl active:bg-white/5 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="font-bold text-lg leading-none">SheetLab</h2>
            <p className="text-[10px] text-excel-green font-bold uppercase tracking-widest mt-1">Professional Sandbox</p>
          </div>
        </div>
        <button onClick={resetSheet} className="p-2 bg-white/5 rounded-full active:rotate-180 transition-all duration-500">
          <RotateCcw size={20} className="text-slate-400" />
        </button>
      </header>

      {/* Formula Bar */}
      <div className="flex items-center gap-3 p-4 bg-black/40 border-b border-white/5">
        <div className="px-3 py-2 bg-excel-green/10 rounded-xl font-mono font-bold text-excel-green text-sm min-w-[3rem] text-center border border-excel-green/20">
          {getColLabel(selected.c)}{selected.r + 1}
        </div>
        <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3 border border-white/5 focus-within:border-excel-green/50 focus-within:bg-white/10 transition-all shadow-inner">
          <span className="text-excel-green font-mono italic font-bold">fx</span>
          <input
            className="bg-transparent border-none outline-none text-base font-mono w-full text-slate-100"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={commitValue}
            onKeyDown={(e) => e.key === 'Enter' && commitValue()}
            placeholder="Enter value or =formula..."
          />
        </div>
      </div>

      {/* Grid */}
      <div
        className="flex-1 overflow-auto no-scrollbar relative"
        onMouseUp={handleFillEnd}
        onTouchEnd={handleFillEnd}
        onTouchMove={handleTouchMove}
      >
        <div className="inline-block min-w-full">
          <table className="border-collapse table-fixed bg-bg-dark">
            <thead>
              <tr className="sticky top-0 z-30">
                <th className="w-12 h-10 bg-surface border-b border-r border-white/10 flex items-center justify-center">
                  <Database size={14} className="text-slate-600" />
                </th>
                {Array(INITIAL_COLS).fill(0).map((_, c) => (
                  <th key={c} className={cn(
                    "w-24 h-10 bg-surface border-b border-r border-white/10 text-[10px] font-black uppercase tracking-widest transition-colors",
                    selected.c === c ? "text-excel-green bg-excel-green/5" : "text-slate-500"
                  )}>
                    {getColLabel(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hfValues.map((row, r) => (
                <tr key={r}>
                  <td className={cn(
                    "sticky left-0 z-20 w-12 h-12 border-b border-r border-white/10 text-center text-[10px] font-bold transition-colors",
                    selected.r === r ? "bg-excel-green/10 text-excel-green" : "bg-surface text-slate-600"
                  )}>
                    {r + 1}
                  </td>
                  {row.map((cell, c) => {
                    const isSelected = selected.r === r && selected.c === c;
                    const displayValue = cell?.toString() || "";

                    // Check if part of fill range
                    const isFillingCell = fillRange &&
                      r >= Math.min(fillRange.startR, fillRange.endR) &&
                      r <= Math.max(fillRange.startR, fillRange.endR) &&
                      c >= Math.min(fillRange.startC, fillRange.endC) &&
                      c <= Math.max(fillRange.startC, fillRange.endC);

                    return (
                      <td
                        key={c}
                        data-row={r}
                        data-col={c}
                        onPointerDown={() => handleCellSelect(r, c)}
                        onMouseEnter={() => isFilling && setFillRange(prev => ({ ...prev, endR: r, endC: c }))}
                        className={cn(
                          "w-24 h-12 border-b border-r border-white/5 text-sm transition-all relative outline-none",
                          isSelected ? "bg-excel-green/5 ring-2 ring-inset ring-excel-green z-10" : "hover:bg-white/[0.02]",
                          isFillingCell && "bg-excel-green/20"
                        )}
                      >
                        <div className={cn(
                          "px-2 truncate text-center font-medium",
                          displayValue.startsWith('#') ? "text-red-400 font-bold" : (typeof cell === 'number' ? "text-blue-400" : "text-slate-300")
                        )}>
                          {displayValue}
                        </div>

                        {/* Drag Handle */}
                        {isSelected && (
                          <motion.div
                            layoutId="drag-handle"
                            className={cn(
                              "absolute bottom-[-8px] right-[-8px] w-5 h-5 bg-excel-green border-2 border-white rounded-full z-40 cursor-crosshair shadow-lg",
                              isFilling && "pointer-events-none opacity-50"
                            )}
                            style={{ touchAction: 'none' }}
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              setIsFilling(true);
                              setFillRange({ startR: r, startC: c, endR: r, endC: c });
                            }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-excel-green" />
          <span>Real-time Engine Active</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{INITIAL_ROWS} Rows</span>
          <span>{INITIAL_COLS} Columns</span>
        </div>
      </div>
    </div>
  );
}
