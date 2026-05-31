"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RotateCcw, Database, Sparkles } from 'lucide-react';
import { Parser } from 'hot-formula-parser';
import { cn } from '@/lib/utils';

// Advanced Formula Engine (Same as CustomSpreadsheet)
class ExcelEngine extends Parser {
  constructor() {
    super();
    this.registerExcelFunctions();
  }

  registerExcelFunctions() {
    this.setFunction('SEQUENCE', (args) => {
      const rows = args[0] || 1;
      const cols = args[1] || 1;
      const start = args[2] || 1;
      const step = args[3] || 1;
      const result = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) row.push(start + (r * cols + c) * step);
        result.push(row);
      }
      return result;
    });

    this.setFunction('UNIQUE', (args) => {
      const flat = args[0].flat();
      return Array.from(new Set(flat)).map(v => [v]);
    });

    this.setFunction('SORT', (args) => {
      const arr = args[0];
      if (!Array.isArray(arr)) return arr;
      const sorted = [...arr].sort((a, b) => (a[0] > b[0] ? 1 : -1));
      return sorted;
    });

    this.setFunction('SUMXMY2', (args) => {
      const array_x = args[0];
      const array_y = args[1];
      if (!array_x || !array_y) return "#N/A";
      const flat_x = Array.isArray(array_x) ? array_x.flat() : [array_x];
      const flat_y = Array.isArray(array_y) ? array_y.flat() : [array_y];
      const len = Math.max(flat_x.length, flat_y.length);
      let sum = 0;
      for (let i = 0; i < len; i++) {
        const x = flat_x[i] !== undefined ? flat_x[i] : (flat_x.length === 1 ? flat_x[0] : 0);
        const y = flat_y[i] !== undefined ? flat_y[i] : (flat_y.length === 1 ? flat_y[0] : 0);
        if (typeof x === 'number' && typeof y === 'number') {
          sum += Math.pow(x - y, 2);
        }
      }
      return sum;
    });

    this.setFunction('LET', (args) => args[args.length - 1]);
  }
}

// Grid size constants for SheetLab
const INITIAL_ROWS = 40;
const INITIAL_COLS = 26;
const getColLabel = (index) => String.fromCharCode(65 + index);

export default function SheetLab({ onBack }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({ r: 0, c: 0 });
  const [inputValue, setInputValue] = useState("");
  const [dragStarted, setDragStarted] = useState(false);
  const pointerStartPos = useRef(null);
  const lastCommittedCell = useRef({ r: 0, c: 0 });
  const inputRef = useRef(null);

  const [spillMap, setSpillMap] = useState(new Map());
  const [fillRange, setFillRange] = useState(null);
  const [isFilling, setIsFilling] = useState(false);

  const evaluationCache = useRef(new Map());
  const formulaParser = useMemo(() => new ExcelEngine(), []);
  const getCellValueRef = useRef();

  useEffect(() => {
    formulaParser.on('callCellValue', (coord, done) => {
      if (getCellValueRef.current) {
        done(getCellValueRef.current(coord.row.index, coord.column.index));
      }
    });
    formulaParser.on('callRangeValue', (start, end, done) => {
      if (getCellValueRef.current) {
        const res = [];
        for (let r = start.row.index; r <= end.row.index; r++) {
          const row = [];
          for (let c = start.column.index; c <= end.column.index; c++) {
            row.push(getCellValueRef.current(r, c));
          }
          res.push(row);
        }
        done(res);
      }
    });
  }, [formulaParser]);

  // Initial Grid Initialization
  useEffect(() => {
    const emptyData = Array(INITIAL_ROWS).fill(0).map(() => Array(INITIAL_COLS).fill(""));
    setData(emptyData);
    setSelected({ r: 0, c: 0 });
    lastCommittedCell.current = { r: 0, c: 0 };
    setInputValue("");
  }, []);

  const getCellValue = useCallback((r, c, path = new Set(), currentData = null) => {
    const activeData = currentData || data;
    if (!activeData[r]) return "";

    const cellId = `${r},${c}`;
    if (spillMap.has(cellId)) return spillMap.get(cellId);
    if (path.has(cellId)) return "#CIRCULAR!";
    if (!currentData && evaluationCache.current.has(cellId)) return evaluationCache.current.get(cellId);

    const raw = activeData[r][c];
    if (raw === undefined || raw === null) return "";

    if (typeof raw === 'string' && raw.startsWith('=')) {
      const currentPath = new Set(path);
      currentPath.add(cellId);

      const prevHandler = getCellValueRef.current;
      getCellValueRef.current = (r, c) => getCellValue(r, c, currentPath, activeData);
      const parsed = formulaParser.parse(raw.substring(1));
      getCellValueRef.current = prevHandler;

      const val = parsed.error ? parsed.error : parsed.result;
      const displayVal = Array.isArray(val) ? val[0]?.[0] : val;
      if (!currentData) evaluationCache.current.set(cellId, displayVal);
      return displayVal;
    }

    if (raw !== "" && !isNaN(raw) && typeof raw !== 'boolean') return Number(raw);
    return raw;
  }, [data, formulaParser, spillMap]);

  useEffect(() => {
    const newSpills = new Map();
    data.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (typeof cell === 'string' && cell.startsWith('=')) {
          const res = formulaParser.parse(cell.substring(1));
          if (Array.isArray(res.result)) {
            res.result.forEach((arrRow, ar) => {
              arrRow.forEach((val, ac) => {
                if (ar === 0 && ac === 0) return;
                const tr = r + ar, tc = c + ac;
                if (data[tr] && tc < INITIAL_COLS) {
                  newSpills.set(`${tr},${tc}`, val);
                }
              });
            });
          }
        }
      });
    });
    setSpillMap(newSpills);
  }, [data, formulaParser]);

  getCellValueRef.current = getCellValue;
  evaluationCache.current.clear();

  const adjustRefs = useCallback((formula, rOff, cOff) => {
    if (typeof formula !== 'string' || !formula.startsWith('=')) return formula;
    return formula.replace(/(\$?[A-Z]+)(\$?[0-9]+)/g, (match, col, row) => {
      let nc = col, nr = row;
      if (!col.startsWith('$')) {
        let ci = 0;
        for (let i = 0; i < col.length; i++) ci = ci * 26 + (col.charCodeAt(i) - 64);
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
    setDragStarted(false);
    pointerStartPos.current = null;
    if (!isFilling || !fillRange) return;

    const { startR, startC, endR, endC } = fillRange;
    if (startR === endR && startC === endC) {
      setIsFilling(false);
      setFillRange(null);
      return;
    }

    const rDir = endR > startR ? 1 : (endR < startR ? -1 : 0);
    const cDir = endC > startC ? 1 : (endC < startC ? -1 : 0);
    const newData = data.map(row => [...row]);
    const sourceCell = data[startR][startC];

    let step = 0;
    let hasPattern = false;
    if (typeof sourceCell === 'number' || (!isNaN(sourceCell) && sourceCell !== "")) {
      const sVal = Number(sourceCell);
      const prevR = startR > 0 ? startR - 1 : -1;
      const prevC = startC > 0 ? startC - 1 : -1;
      if (rDir !== 0 && prevR !== -1) {
        const pVal = Number(data[prevR][startC]);
        if (!isNaN(pVal)) { step = sVal - pVal; hasPattern = true; }
      } else if (cDir !== 0 && prevC !== -1) {
        const pVal = Number(data[startR][prevC]);
        if (!isNaN(pVal)) { step = sVal - pVal; hasPattern = true; }
      }
    }

    if (rDir !== 0) {
      for (let r = startR + rDir; rDir > 0 ? r <= endR : r >= endR; r += rDir) {
        const offset = Math.abs(r - startR);
        if (typeof sourceCell === 'string' && sourceCell.startsWith('=')) {
          newData[r][startC] = adjustRefs(sourceCell, r - startR, 0);
        } else if (hasPattern) {
          newData[r][startC] = Number(sourceCell) + step * offset;
        } else {
          newData[r][startC] = sourceCell;
        }
      }
    } else if (cDir !== 0) {
      for (let c = startC + cDir; cDir > 0 ? c <= endC : c >= endC; c += cDir) {
        const offset = Math.abs(c - startC);
        if (typeof sourceCell === 'string' && sourceCell.startsWith('=')) {
          newData[startR][c] = adjustRefs(sourceCell, 0, c - startC);
        } else if (hasPattern) {
          newData[startR][c] = Number(sourceCell) + step * offset;
        } else {
          newData[startR][c] = sourceCell;
        }
      }
    }

    setData(newData);
    setIsFilling(false);
    setFillRange(null);
  }, [isFilling, fillRange, data, adjustRefs]);

  const handlePointerMove = (e) => {
    if (!isFilling) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;
    if (e.cancelable) e.preventDefault();

    const el = document.elementFromPoint(clientX, clientY);
    const td = el?.closest('td');
    if (td) {
      const r = parseInt(td.getAttribute('data-row'));
      const c = parseInt(td.getAttribute('data-col'));
      if (!isNaN(r) && !isNaN(c)) {
        const { startR, startC } = fillRange;
        if (Math.abs(r - startR) >= Math.abs(c - startC)) {
           setFillRange(prev => ({ ...prev, endR: r, endC: startC }));
        } else {
           setFillRange(prev => ({ ...prev, endR: startR, endC: c }));
        }
      }
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="flex flex-col h-screen bg-bg-dark text-slate-100 overflow-hidden fixed inset-0 z-50 select-none"
         onPointerUp={handleFillEnd} onPointerMove={handlePointerMove}>
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
        <button onClick={() => {
          setData(Array(INITIAL_ROWS).fill(0).map(() => Array(INITIAL_COLS).fill("")));
          setSelected({ r: 0, c: 0 });
          setInputValue("");
        }} className="p-2 bg-white/5 rounded-full active:rotate-180 transition-all duration-500">
          <RotateCcw size={20} className="text-slate-400" />
        </button>
      </header>

      {/* Formula Bar */}
      <div className="flex items-center gap-3 p-4 bg-black/40 border-b border-white/5">
        <div className="px-3 py-2 bg-excel-green/10 rounded-xl font-mono font-bold text-excel-green text-sm min-w-[3.5rem] text-center border border-excel-green/20">
          {getColLabel(selected.c)}{selected.r + 1}
        </div>
        <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3 border border-white/5 focus-within:border-excel-green/50 transition-all shadow-inner">
          <span className="text-excel-green font-mono italic font-bold">fx</span>
          <input
            ref={inputRef}
            className="bg-transparent border-none outline-none text-base font-mono w-full text-slate-100"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => {
               const newData = [...data.map(row => [...row])];
               newData[selected.r][selected.c] = inputValue;
               setData(newData);
            }}
            placeholder="Enter formula or value..."
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto no-scrollbar relative">
        <div className="inline-block min-w-full">
          <table className="border-collapse table-fixed bg-bg-dark">
            <thead>
              <tr className="sticky top-0 z-30">
                <th className="w-12 h-10 bg-surface border-b border-r border-white/10 flex items-center justify-center">
                  <Database size={14} className="text-slate-600" />
                </th>
                {Array(INITIAL_COLS).fill(0).map((_, c) => (
                  <th key={c} className={cn(
                    "w-[100px] h-10 bg-surface border-b border-r border-white/10 text-[10px] font-black uppercase tracking-widest transition-colors",
                    selected.c === c ? "text-excel-green bg-excel-green/5" : "text-slate-500"
                  )}>
                    {getColLabel(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, r) => (
                <tr key={r}>
                  <td className={cn(
                    "sticky left-0 z-20 w-12 h-12 border-b border-r border-white/10 text-center text-[10px] font-bold transition-colors",
                    selected.r === r ? "bg-excel-green/10 text-excel-green" : "bg-surface text-slate-600"
                  )}>
                    {r + 1}
                  </td>
                  {row.map((cell, c) => {
                    const isS = selected.r === r && selected.c === c;
                    const isSp = spillMap.has(`${r},${c}`);
                    const val = isS ? inputValue : (typeof cell === 'string' && cell.startsWith('=') ? getCellValue(r, c) : (isSp ? spillMap.get(`${r},${c}`) : cell));

                    const isF = fillRange && r >= Math.min(fillRange.startR, fillRange.endR) && r <= Math.max(fillRange.startR, fillRange.endR) && c >= Math.min(fillRange.startC, fillRange.endC) && c <= Math.max(fillRange.startC, fillRange.endC);

                    return (
                      <td
                        key={c}
                        data-row={r}
                        data-col={c}
                        onClick={() => {
                          if (dragStarted) return;
                          const newData = [...data.map(row => [...row])];
                          newData[selected.r][selected.c] = inputValue;
                          setData(newData);
                          setSelected({r,c});
                          setInputValue(newData[r][c]?.toString() || "");
                          lastCommittedCell.current = { r, c };
                        }}
                        onPointerDown={(e) => {
                          if (e.pointerType === 'mouse' && e.button !== 0) return;
                          pointerStartPos.current = { x: e.clientX, y: e.clientY };
                          setDragStarted(false);
                        }}
                        className={cn(
                          "border border-white/5 h-12 min-w-[100px] min-h-[48px] p-2 text-sm transition-all relative outline-none cursor-cell",
                          isS && "ring-2 ring-inset ring-excel-green bg-excel-green/5 z-20",
                          !isS && "hover:bg-white/[0.02]",
                          isF && "bg-excel-green/20"
                        )}
                      >
                        <div className={cn(
                          "px-2 truncate text-center font-medium pointer-events-none",
                          val?.toString().startsWith("#") ? "text-red-400 font-bold" : (typeof val === 'number' ? "text-blue-400" : "text-slate-300")
                        )}>
                          {val?.toString()}
                        </div>
                        {isS && (
                          <div
                            className="absolute bottom-[-10px] right-[-10px] w-6 h-6 bg-excel-green border-2 border-white rounded-full z-30 cursor-crosshair shadow-lg"
                            onPointerDown={(e) => {
                               e.stopPropagation();
                               setIsFilling(true);
                               setFillRange({startR:r, startC:c, endR:r, endC:c});
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
