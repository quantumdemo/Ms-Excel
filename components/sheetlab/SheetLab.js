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
  const [selection, setSelection] = useState({ startR: 0, startC: 0, endR: 0, endC: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hfValues, setHfValues] = useState([]);
  const [isFilling, setIsFilling] = useState(false);
  const [fillRange, setFillRange] = useState(null);

  const lastCommittedCell = useRef({ r: 0, c: 0 });

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

  const commitValue = useCallback(() => {
    const { r, c } = lastCommittedCell.current;
    try {
      // Get current formula/value to see if it actually changed
      const formula = hf.getCellFormula(sheetId, r, c);
      const value = hf.getCellValue(sheetId, r, c);
      const currentContent = formula || (value !== null && value !== undefined ? value.toString() : "");

      if (currentContent !== inputValue) {
        hf.setCellContents({ sheet: sheetId, row: r, col: c }, [[inputValue]]);
        refreshValues();
      }
    } catch (e) {
      console.error("Formula error:", e);
    }
  }, [hf, sheetId, refreshValues, inputValue]);

  const handleCellSelect = (r, c, isMultiSelect = false) => {
    if (!isMultiSelect) {
      // Commit previous value before moving
      commitValue();

      const formula = hf.getCellFormula(sheetId, r, c);
      const value = hf.getCellValue(sheetId, r, c);
      const cellValue = formula || (value !== null && value !== undefined ? (typeof value === 'object' ? JSON.stringify(value) : value.toString()) : "");

      setSelected({ r, c });
      setSelection({ startR: r, startC: c, endR: r, endC: c });
      setInputValue(cellValue);
      lastCommittedCell.current = { r, c };
    } else {
      setSelection(prev => ({ ...prev, endR: r, endC: c }));
    }
  };

  const handleInputChange = (val) => {
    setInputValue(val);
  };

  const adjustRefs = useCallback((formula, rOff, cOff) => {
    if (typeof formula !== 'string' || !formula.startsWith('=')) return formula;
    return formula.replace(/(\$?[A-Z]+)(\$?[0-9]+)/g, (match, col, row) => {
      let nc = col, nr = row;
      if (!col.startsWith('$')) {
        let ci = 0;
        let colStr = col;
        for (let i = 0; i < colStr.length; i++) ci = ci * 26 + (colStr.charCodeAt(i) - 64);
        ci += cOff;
        if (ci <= 0 || ci > INITIAL_COLS) return "#REF!";
        nc = "";
        while (ci > 0) {
          let rem = (ci - 1) % 26;
          nc = String.fromCharCode(65 + rem) + nc;
          ci = Math.floor((ci - rem) / 26);
        }
      }
      if (!row.startsWith('$')) {
        let ri = parseInt(row) + rOff;
        if (ri <= 0 || ri > INITIAL_ROWS) return "#REF!";
        nr = ri.toString();
      }
      return nc + nr;
    });
  }, []);

  const handleFillEnd = useCallback(() => {
    if (isSelecting) setIsSelecting(false);
    if (!isFilling || !fillRange) return;

    const { startR, startC, endR, endC } = fillRange;
    if (startR === endR && startC === endC) {
      setIsFilling(false);
      setFillRange(null);
      return;
    }

    const sR1 = Math.min(selection.startR, selection.endR);
    const sR2 = Math.max(selection.startR, selection.endR);
    const sC1 = Math.min(selection.startC, selection.endC);
    const sC2 = Math.max(selection.startC, selection.endC);

    const batchUpdates = [];
    const rDir = endR > startR ? 1 : (endR < startR ? -1 : 0);
    const cDir = endC > startC ? 1 : (endC < startC ? -1 : 0);

    if (rDir !== 0) { // Vertical drag
      const rowCount = sR2 - sR1 + 1;
      const isSequence = rowCount > 1 && typeof hf.getCellValue(sheetId, sR1, startC) === 'number' && typeof hf.getCellValue(sheetId, sR2, startC) === 'number';
      let step = 0;
      if (isSequence) {
        step = (hf.getCellValue(sheetId, sR2, startC) - hf.getCellValue(sheetId, sR1, startC)) / (sR2 - sR1);
      }

      for (let r = startR + rDir; rDir > 0 ? r <= endR : r >= endR; r += rDir) {
        const offset = Math.abs(r - startR);
        if (isSequence) {
          const baseVal = hf.getCellValue(sheetId, startR, startC);
          batchUpdates.push({ address: { sheet: sheetId, row: r, col: startC }, value: [[baseVal + step * offset]] });
        } else {
          const sourceRowIdx = sR1 + (offset % rowCount);
          const sourceFormula = hf.getCellFormula(sheetId, sourceRowIdx, startC);
          const sourceValue = hf.getCellValue(sheetId, sourceRowIdx, startC);
          if (sourceFormula) {
            const adjusted = adjustRefs(sourceFormula, r - sourceRowIdx, 0);
            batchUpdates.push({ address: { sheet: sheetId, row: r, col: startC }, value: [[adjusted]] });
          } else {
            batchUpdates.push({ address: { sheet: sheetId, row: r, col: startC }, value: [[sourceValue]] });
          }
        }
      }
    } else if (cDir !== 0) { // Horizontal drag
      const colCount = sC2 - sC1 + 1;
      const isSequence = colCount > 1 && typeof hf.getCellValue(sheetId, startR, sC1) === 'number' && typeof hf.getCellValue(sheetId, startR, sC2) === 'number';
      let step = 0;
      if (isSequence) {
        step = (hf.getCellValue(sheetId, startR, sC2) - hf.getCellValue(sheetId, startR, sC1)) / (sC2 - sC1);
      }

      for (let c = startC + cDir; cDir > 0 ? c <= endC : c >= endC; c += cDir) {
        const offset = Math.abs(c - startC);
        if (isSequence) {
          const baseVal = hf.getCellValue(sheetId, startR, startC);
          batchUpdates.push({ address: { sheet: sheetId, row: startR, col: c }, value: [[baseVal + step * offset]] });
        } else {
          const sourceColIdx = sC1 + (offset % colCount);
          const sourceFormula = hf.getCellFormula(sheetId, startR, sourceColIdx);
          const sourceValue = hf.getCellValue(sheetId, startR, sourceColIdx);
          if (sourceFormula) {
            const adjusted = adjustRefs(sourceFormula, 0, c - sourceColIdx);
            batchUpdates.push({ address: { sheet: sheetId, row: startR, col: c }, value: [[adjusted]] });
          } else {
            batchUpdates.push({ address: { sheet: sheetId, row: startR, col: c }, value: [[sourceValue]] });
          }
        }
      }
    }

    batchUpdates.forEach(upd => hf.setCellContents(upd.address, upd.value));
    refreshValues();
    setIsFilling(false);
    setFillRange(null);
  }, [isSelecting, isFilling, fillRange, selection, hf, sheetId, refreshValues, adjustRefs]);

  useEffect(() => {
    const up = () => {
      if (isSelecting || isFilling) handleFillEnd();
    };
    window.addEventListener('pointerup', up);
    return () => window.removeEventListener('pointerup', up);
  }, [isSelecting, isFilling, handleFillEnd]);

  const resetSheet = () => {
    const emptyData = Array(INITIAL_ROWS).fill(0).map(() => Array(INITIAL_COLS).fill(""));
    hf.setSheetContent(sheetId, emptyData);
    refreshValues();
    setSelected({ r: 0, c: 0 });
    setInputValue("");
  };

  const handleTouchMove = (e) => {
    if (!isFilling && !isSelecting) return;

    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    if (e.cancelable && (isFilling || isSelecting)) e.preventDefault();

    const el = document.elementFromPoint(clientX, clientY);
    const td = el?.closest('td');
    if (td) {
      const r = parseInt(td.getAttribute('data-row'));
      const c = parseInt(td.getAttribute('data-col'));
      if (!isNaN(r) && !isNaN(c)) {
        if (isSelecting) {
          handleCellSelect(r, c, true);
        } else if (isFilling && fillRange) {
          const { startR, startC } = fillRange;
          // Restrict to vertical OR horizontal
          if (Math.abs(r - startR) >= Math.abs(c - startC)) {
            setFillRange(prev => ({ ...prev, endR: r, endC: startC }));
          } else {
            setFillRange(prev => ({ ...prev, endR: startR, endC: c }));
          }
        }
      }
    }
  };

  const handleMouseEnter = (r, c) => {
    if (isSelecting) {
      handleCellSelect(r, c, true);
    } else if (isFilling && fillRange) {
      const { startR, startC } = fillRange;
      // Restrict to vertical OR horizontal
      if (Math.abs(r - startR) >= Math.abs(c - startC)) {
        setFillRange(prev => ({ ...prev, endR: r, endC: startC }));
      } else {
        setFillRange(prev => ({ ...prev, endR: startR, endC: c }));
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
        onPointerUp={handleFillEnd}
        onPointerMove={handleTouchMove}
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
                    const displayValue = isSelected ? inputValue : (cell?.toString() || "");

                    const isInSelection =
                      r >= Math.min(selection.startR, selection.endR) &&
                      r <= Math.max(selection.startR, selection.endR) &&
                      c >= Math.min(selection.startC, selection.endC) &&
                      c <= Math.max(selection.startC, selection.endC);

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
                        onPointerDown={(e) => {
                          if (e.pointerType === 'mouse' && e.button !== 0) return;
                          setIsSelecting(true);
                          handleCellSelect(r, c);
                        }}
                        onPointerEnter={() => handleMouseEnter(r, c)}
                        className={cn(
                          "w-24 h-12 border-b border-r border-white/5 text-sm transition-all relative outline-none",
                          isSelected && "ring-2 ring-inset ring-excel-green z-20 bg-excel-green/5",
                          isInSelection && !isSelected && "bg-excel-green/10",
                          !isInSelection && "hover:bg-white/[0.02]",
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
                        {r === Math.max(selection.startR, selection.endR) && c === Math.max(selection.startC, selection.endC) && (
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
                              // When dragging handle from selection, startR/startC should be the "anchor" of the fill
                              // usually the bottom-right cell of selection
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
