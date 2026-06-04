"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Parser } from 'hot-formula-parser';
import { RotateCcw, MousePointer2 } from 'lucide-react';
import { CellRegistry, ReferenceResolver } from '@/lib/excel-core';
import FormulaAutoComplete from './FormulaAutoComplete';
import FunctionScreentip from './FunctionScreentip';
import { getFunctionSuggestions, extractQuery, findActiveFunction } from '@/lib/formula-ui-utils';
import _ from 'lodash';

// Advanced Formula Engine with LET and specialized functions
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

export default function CustomSpreadsheet({
  initialData = [[""]],
  targetCell = [-1, -1],
  onCellChange,
  isSandbox = false
}) {
  const [registry, setRegistry] = useState(null);
  const [selected, setSelected] = useState({ r: 0, c: 0 });
  const [inputValue, setInputValue] = useState("");
  const [dragStarted, setDragStarted] = useState(false);
  const pointerStartPos = useRef(null);

  const [fillRange, setFillRange] = useState(null);
  const [isFilling, setIsFilling] = useState(false);

  const hideFormulaUI = useCallback(() => {
    setSuggestions([]);
    setActiveFunction(null);
  }, []);

  // Formula UI State
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSelectedIndex] = useState(0);
  const [activeFunction, setActiveFunction] = useState(null);
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const formulaParser = useMemo(() => new ExcelEngine(), []);
  const registryRef = useRef();

  // Wire formula parser to registry
  useEffect(() => {
    hideFormulaUI();
  }, [selected, hideFormulaUI]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if click is inside autocomplete or screentip
      const isAuto = e.target.closest('[data-formula-ui="autocomplete"]');
      const isTip = e.target.closest('[data-formula-ui="screentip"]');
      if (isAuto || isTip) return;

      // Check if click is inside formula bar or grid
      const isInside = containerRef.current?.contains(e.target);
      if (!isInside) {
        hideFormulaUI();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hideFormulaUI]);

  useEffect(() => {
    formulaParser.on('callCellValue', (coord, done) => {
      if (registryRef.current) {
        const id = ReferenceResolver.coordToId(coord.row.index, coord.column.index);
        done(registryRef.current.getCell(id).computed);
      }
    });
    formulaParser.on('callRangeValue', (start, end, done) => {
      if (registryRef.current) {
        const res = [];
        for (let r = start.row.index; r <= end.row.index; r++) {
          const row = [];
          for (let c = start.column.index; c <= end.column.index; c++) {
            const id = ReferenceResolver.coordToId(r, c);
            row.push(registryRef.current.getCell(id).computed);
          }
          res.push(row);
        }
        done(res);
      }
    });
  }, [formulaParser]);

  // Grid Initialization
  useEffect(() => {
    const rCount = Math.max(initialData.length, 12);
    const cCount = Math.max(initialData[0]?.length || 0, 6);
    const r = new CellRegistry(rCount, cCount, formulaParser);

    r.onUpdate = () => {
      setRegistry(Object.assign(Object.create(Object.getPrototypeOf(r)), r));
    };

    initialData.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell !== "") {
          const id = ReferenceResolver.coordToId(rIdx, cIdx);
          r.updateCell(id, cell);
        }
      });
    });

    setRegistry(r);
    setSelected({ r: 0, c: 0 });
    const startId = ReferenceResolver.coordToId(0, 0);
    setInputValue(r.getCell(startId).raw || "");
  }, [initialData, formulaParser]);

  registryRef.current = registry;

  const updateFormulaUI = useCallback(_.debounce((val, pos) => {
    if (!val.startsWith('=')) {
      setSuggestions([]);
      setActiveFunction(null);
      return;
    }

    const query = extractQuery(val, pos);
    if (query) {
      const results = getFunctionSuggestions(query);
      setSuggestions(results);
      setSelectedIndex(0);
    } else {
      setSuggestions([]);
    }

    const active = findActiveFunction(val, pos);
    setActiveFunction(active);
  }, 50), []);

  const handleSuggestionSelect = (func) => {
    const query = extractQuery(inputValue, cursorPos);
    if (!query) return;

    const before = inputValue.substring(0, cursorPos - query.length);
    const after = inputValue.substring(cursorPos);
    const newVal = before + func.name + "(" + after;

    setInputValue(newVal);
    setSuggestions([]);

    const newPos = before.length + func.name.length + 1;
    setCursorPos(newPos);

    // Focus and move cursor
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);

    registry.updateCell(activeCellId, newVal);
  };

  const handleInputKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        handleSuggestionSelect(suggestions[suggestionIndex]);
      } else if (e.key === 'Escape') {
        hideFormulaUI();
      }
    } else {
      if (e.key === 'Enter' || e.key === 'Tab') {
        hideFormulaUI();
        e.currentTarget.blur();
      }
      if (e.key === 'Escape') {
        setInputValue(registry.getCell(activeCellId).raw || "");
        hideFormulaUI();
        e.currentTarget.blur();
      }
    }
  };

  const activeCellId = useMemo(() =>
    ReferenceResolver.coordToId(selected.r, selected.c),
    [selected]
  );

  const handleFillEnd = useCallback(() => {
    setDragStarted(false);
    pointerStartPos.current = null;
    if (!isFilling || !fillRange || !registry) return;

    const { startR, startC, endR, endC } = fillRange;
    if (startR === endR && startC === endC) {
      setIsFilling(false);
      setFillRange(null);
      return;
    }

    const rDir = endR > startR ? 1 : (endR < startR ? -1 : 0);
    const cDir = endC > startC ? 1 : (endC < startC ? -1 : 0);

    const sourceId = ReferenceResolver.coordToId(startR, startC);
    const sourceCell = registry.getCell(sourceId);
    const sourceRaw = sourceCell.raw;

    let step = 0;
    let hasPattern = false;
    if (sourceCell.type === "number") {
      const sVal = Number(sourceRaw);
      const prevR = startR > 0 ? startR - 1 : -1;
      const prevC = startC > 0 ? startC - 1 : -1;

      if (rDir !== 0 && prevR !== -1) {
        const pId = ReferenceResolver.coordToId(prevR, startC);
        const pCell = registry.getCell(pId);
        if (pCell.type === "number") {
          step = sVal - Number(pCell.raw);
          hasPattern = true;
        }
      } else if (cDir !== 0 && prevC !== -1) {
        const pId = ReferenceResolver.coordToId(startR, prevC);
        const pCell = registry.getCell(pId);
        if (pCell.type === "number") {
          step = sVal - Number(pCell.raw);
          hasPattern = true;
        }
      }
    }

    if (rDir !== 0) {
      for (let r = startR + rDir; rDir > 0 ? r <= endR : r >= endR; r += rDir) {
        const offset = Math.abs(r - startR);
        const targetId = ReferenceResolver.coordToId(r, startC);
        if (sourceCell.type === "formula") {
          registry.updateCell(targetId, ReferenceResolver.adjustFormula(sourceRaw, r - startR, 0));
        } else if (hasPattern) {
          registry.updateCell(targetId, (Number(sourceRaw) + step * offset).toString());
        } else {
          registry.updateCell(targetId, sourceRaw);
        }
      }
    } else if (cDir !== 0) {
      for (let c = startC + cDir; cDir > 0 ? c <= endC : c >= endC; c += cDir) {
        const offset = Math.abs(c - startC);
        const targetId = ReferenceResolver.coordToId(startR, c);
        if (sourceCell.type === "formula") {
          registry.updateCell(targetId, ReferenceResolver.adjustFormula(sourceRaw, 0, c - startC));
        } else if (hasPattern) {
          registry.updateCell(targetId, (Number(sourceRaw) + step * offset).toString());
        } else {
          registry.updateCell(targetId, sourceRaw);
        }
      }
    }

    // Trigger validation
    if (onCellChange && targetCell[0] !== -1) {
      const targetId = ReferenceResolver.coordToId(targetCell[0], targetCell[1]);
      const cell = registry.getCell(targetId);
      onCellChange(cell.raw, cell.computed);
    }

    setIsFilling(false);
    setFillRange(null);
  }, [isFilling, fillRange, registry, onCellChange, targetCell]);

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

  if (!registry) return null;

  return (
    <div
         ref={containerRef}
         className="flex flex-col w-full bg-card-dark rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
         onPointerUp={handleFillEnd} onPointerMove={handlePointerMove}>
      <div className="px-5 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-excel-green/20 rounded-lg flex items-center justify-center">
            <MousePointer2 size={16} className="text-excel-green" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            {isSandbox ? "Excel Sandbox Pro" : "Practice Lab"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-black/40 border-b border-white/5">
        <div className="px-3 py-1 bg-excel-green/10 rounded-md font-mono font-bold text-excel-green text-sm">
          {activeCellId}
        </div>
        <div className="flex-1 flex flex-col relative">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 border border-white/5 focus-within:border-excel-green/50 transition-all">
            <span className="text-slate-500 font-mono italic text-sm">fx</span>
            <input
              ref={inputRef}
              className="bg-transparent border-none outline-none text-sm font-mono w-full text-slate-100"
              value={inputValue}
              onKeyDown={handleInputKeyDown}
              onSelect={(e) => {
                const pos = e.target.selectionStart;
                setCursorPos(pos);
                updateFormulaUI(inputValue, pos);
              }}
              onChange={(e) => {
                  const val = e.target.value;
                  const pos = e.target.selectionStart;
                  setInputValue(val);
                  setCursorPos(pos);
                  registry.updateCell(activeCellId, val);
                  updateFormulaUI(val, pos);
                  if (onCellChange && selected.r === targetCell[0] && selected.c === targetCell[1]) {
                      onCellChange(val, registry.getCell(activeCellId).computed);
                  }
              }}
              onBlur={hideFormulaUI}
              placeholder="Enter formula or value..."
            />
          </div>
          <FormulaAutoComplete
            suggestions={suggestions}
            selectedIndex={suggestionIndex}
            onSelect={handleSuggestionSelect}
            visible={suggestions.length > 0}
          />
          <FunctionScreentip
            activeFunction={activeFunction}
            visible={!!activeFunction && suggestions.length === 0}
          />
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar relative">
        <table className="w-full border-collapse table-fixed min-w-[600px]">
          <thead>
            <tr>
              <th className="w-12 bg-black/40 border border-white/5 text-[10px] text-slate-500"></th>
              {Array(registry.cols).fill(0).map((_, c) => (
                <th key={c} className="bg-black/40 border border-white/5 p-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {ReferenceResolver.coordToId(0, c).replace(/[0-9]/g, '')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(registry.rows).fill(0).map((_, r) => (
              <tr key={r}>
                <td className="bg-black/40 border border-white/5 text-center text-[10px] font-bold text-slate-600">
                  {r + 1}
                </td>
                {Array(registry.cols).fill(0).map((_, c) => {
                  const id = ReferenceResolver.coordToId(r, c);
                  const cellData = registry.getCell(id);
                  const isS = selected.r === r && selected.c === c;
                  const isT = targetCell[0] === r && targetCell[1] === c;

                  const displayValue = isS ? inputValue : cellData.computed;

                  const isF = fillRange && r >= Math.min(fillRange.startR, fillRange.endR) && r <= Math.max(fillRange.startR, fillRange.endR) && c >= Math.min(fillRange.startC, fillRange.endC) && c <= Math.max(fillRange.startC, fillRange.endC);

                  return (
                    <td
                      key={c}
                      data-row={r}
                      data-col={c}
                      onClick={() => {
                         if (dragStarted) return;
                         setSelected({r,c});
                         setInputValue(registry.getCell(id).raw || "");
                         hideFormulaUI();
                      }}
                      onPointerDown={(e) => {
                         if (e.pointerType === 'mouse' && e.button !== 0) return;
                         pointerStartPos.current = { x: e.clientX, y: e.clientY };
                         setDragStarted(false);
                      }}
                      className={cn(
                        "border border-white/5 h-12 p-2 text-xs transition-all relative cursor-pointer",
                        isS && "ring-2 ring-inset ring-excel-green bg-excel-green/5 z-10",
                        isT && !isS && "bg-excel-green/10",
                        isF && "bg-excel-green/20"
                      )}
                    >
                      <div className="truncate text-center font-semibold pointer-events-none">
                        <span className={cn(
                            displayValue?.toString().startsWith("#") ? "text-red-500" : (typeof displayValue === 'number' ? "text-blue-400" : "text-slate-300")
                        )}>
                            {displayValue?.toString()}
                        </span>
                      </div>
                      {isS && (
                        <div
                          className="absolute bottom-[-5px] right-[-5px] w-6 h-6 bg-excel-green border-2 border-white rounded-full z-30 cursor-crosshair"
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

      <div className="p-3 bg-black/40 text-[10px] text-slate-500 flex justify-between px-6 uppercase font-bold tracking-[0.2em]">
        <span>Touch to edit • Drag dot to fill</span>
        <span className="text-excel-green">System Live</span>
      </div>
    </div>
  );
}
