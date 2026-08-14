"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RotateCcw, Database, Sparkles, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CellRegistry, ReferenceResolver } from '@/lib/excel-core';
import FormulaAutoComplete from '../spreadsheet/FormulaAutoComplete';
import FunctionScreentip from '../spreadsheet/FunctionScreentip';
import ExcelActions from './ExcelActions';
import AICoachPanel from './AICoachPanel';
import { buildSpreadsheetContext } from '@/lib/ai/spreadsheet-context';
import { getFunctionSuggestions, extractQuery, findActiveFunction } from '@/lib/formula-ui-utils';
import _ from 'lodash';

// Grid size constants for SheetLab
const INITIAL_ROWS = 100;
const INITIAL_COLS = 26;

const GridCell = React.memo(({ r, c, id, cellData, isS, isF, editValue, onSelect, onPointerDown, onFillStart }) => {
  const displayValue = isS ? editValue : cellData?.computed;

  return (
    <td
      data-row={r}
      data-col={c}
      onClick={() => onSelect(r, c, id)}
      onPointerDown={(e) => onPointerDown(e, r, c)}
      className={cn(
        "border border-white/5 h-12 min-w-[100px] min-h-[48px] p-2 text-sm transition-all relative outline-none cursor-cell",
        isS && "ring-2 ring-inset ring-excel-green bg-excel-green/5 z-20",
        !isS && "hover:bg-white/[0.02]",
        isF && "bg-excel-green/20"
      )}
    >
      <div className={cn(
        "px-2 truncate text-center font-medium pointer-events-none",
        displayValue?.toString().startsWith("#") ? "text-red-400 font-bold" : (typeof displayValue === 'number' ? "text-blue-400" : "text-slate-300")
      )}>
        {displayValue?.toString() ?? ""}
      </div>
      {isS && (
        <div
          className="absolute bottom-[-10px] right-[-10px] w-6 h-6 bg-excel-green border-2 border-white rounded-full z-30 cursor-crosshair shadow-lg"
          onPointerDown={(e) => onFillStart(e, r, c)}
        />
      )}
    </td>
  );
});

GridCell.displayName = 'GridCell';

export default function SheetLab({ onBack }) {
  const [registry, setRegistry] = useState(null);
  const [selected, setSelected] = useState({ r: 0, c: 0 });
  const [inputValue, setInputValue] = useState("");
  const [dragStarted, setDragStarted] = useState(false);
  const pointerStartPos = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Formula UI State
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSelectedIndex] = useState(0);
  const [activeFunction, setActiveFunction] = useState(null);
  const [cursorPos, setCursorPos] = useState(0);

  // AI Coach State
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [actionNotification, setActionNotification] = useState(null);

  const [fillRange, setFillRange] = useState(null);
  const [isFilling, setIsFilling] = useState(false);

  const hideFormulaUI = useCallback(() => {
    setSuggestions([]);
    setActiveFunction(null);
  }, []);

  // Initialize Registry
  useEffect(() => {
    const r = new CellRegistry(INITIAL_ROWS, INITIAL_COLS);
    r.onUpdate = () => {
      setRegistry(Object.assign(Object.create(Object.getPrototypeOf(r)), r));
    };
    setRegistry(r);
    setSelected({ r: 0, c: 0 });
    setInputValue("");
  }, []);

  const activeCellId = useMemo(() =>
    ReferenceResolver.coordToId(selected.r, selected.c),
    [selected]
  );

  // Build active spreadsheet context for AI Coach
  const spreadsheetContext = useMemo(() => {
    if (!registry) return null;
    return buildSpreadsheetContext(registry, selected);
  }, [registry, selected]);

  const handleCellSelect = useCallback((r, c, id) => {
    if (dragStarted) return;
    registry.updateCell(activeCellId, inputValue);
    setSelected({ r, c });
    setInputValue(registry.getCell(id).raw || "");
    hideFormulaUI();
  }, [registry, activeCellId, inputValue, dragStarted, hideFormulaUI]);

  const handleCellPointerDown = useCallback((e, r, c) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    setDragStarted(false);
  }, []);

  const handleFillStart = useCallback((e, r, c) => {
    e.stopPropagation();
    setIsFilling(true);
    setFillRange({ startR: r, startC: c, endR: r, endC: c });
  }, []);

  const handleImport = (data) => {
    if (!registry) return;

    const constrainedData = data.slice(0, INITIAL_ROWS);

    const newRegistry = new CellRegistry(
      INITIAL_ROWS,
      Math.max(INITIAL_COLS, constrainedData[0]?.length || 0)
    );

    newRegistry.onUpdate = () => {
      setRegistry(Object.assign(Object.create(Object.getPrototypeOf(newRegistry)), newRegistry));
    };

    newRegistry.loadData(constrainedData);

    setRegistry(newRegistry);
    setSelected({ r: 0, c: 0 });
    setInputValue(newRegistry.getCell("A1").raw || "");
  };

  const getExportData = () => {
    if (!registry) return [];

    const rows = registry.rows;
    const cols = registry.cols;
    const data = [];

    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        const id = ReferenceResolver.coordToId(r, c);
        const cell = registry.getCell(id);

        if (cell.type === 'formula') {
            row.push({
                value: cell.computed,
                formula: "=" + cell.parsedFormula
            });
        } else {
            row.push(cell.raw || "");
        }
      }
      data.push(row);
    }
    return data;
  };

  // Controlled Action Validation & Execution
  const handleApplyAIAction = (action) => {
    if (!action || action.type !== 'insert_formula' || !registry) return;

    const targetCellId = (action.cell || activeCellId).toUpperCase();
    const coord = ReferenceResolver.idToCoord(targetCellId);

    if (!coord || coord.r < 0 || coord.r >= INITIAL_ROWS || coord.c < 0 || coord.c >= INITIAL_COLS) {
      console.warn("Invalid cell action coordinates:", action);
      return;
    }

    const formulaStr = String(action.formula || "").trim();
    if (!formulaStr.startsWith("=")) {
      console.warn("Invalid formula action syntax (must start with '='):", action);
      return;
    }

    // Execute through standard CellRegistry update mechanism
    registry.updateCell(targetCellId, formulaStr);

    // Update active UI selection & input
    setSelected({ r: coord.r, c: coord.c });
    setInputValue(formulaStr);

    setActionNotification(`Applied ${formulaStr} to cell ${targetCellId}`);
    setTimeout(() => setActionNotification(null), 3500);
  };

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
        registry.updateCell(activeCellId, inputValue);
        e.currentTarget.blur();
        hideFormulaUI();
      }
      if (e.key === 'Escape') {
        setInputValue(registry.getCell(activeCellId).raw || "");
        e.currentTarget.blur();
        hideFormulaUI();
      }
    }
  };

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

    setIsFilling(false);
    setFillRange(null);
  }, [isFilling, fillRange, registry]);

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
    hideFormulaUI();
  }, [selected, hideFormulaUI]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isAuto = e.target.closest('[data-formula-ui="autocomplete"]');
      const isTip = e.target.closest('[data-formula-ui="screentip"]');
      if (isAuto || isTip) return;

      const isInside = containerRef.current?.contains(e.target);
      if (!isInside) {
        hideFormulaUI();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hideFormulaUI]);

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

  if (!registry) return null;

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-screen bg-bg-dark text-slate-100 overflow-hidden fixed inset-0 z-50 select-none"
      onPointerUp={handleFillEnd}
      onPointerMove={handlePointerMove}
    >
      {/* Action Notification Toast */}
      <AnimatePresence>
        {actionNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[120] bg-excel-green text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/20"
          >
            <Sparkles size={16} />
            <span>{actionNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-bg-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl active:bg-white/5 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="font-bold text-lg leading-none">SheetLab</h2>
            <p className="text-[10px] text-excel-green font-bold uppercase tracking-widest mt-1">
              Professional Sandbox
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* AI Coach Entry Button */}
          <button
            onClick={() => setIsAICoachOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-excel-green/20 border border-excel-green/40 hover:bg-excel-green/30 text-excel-green rounded-xl font-bold text-xs transition-all active:scale-95 shadow-md shadow-excel-green/10"
          >
            <Sparkles size={16} className="text-excel-green" />
            <span>✨ AI Coach</span>
          </button>

          <ExcelActions
            onImport={handleImport}
            getGridData={getExportData}
            isRegistryReady={!!registry}
          />

          <button onClick={() => {
            const r = new CellRegistry(INITIAL_ROWS, INITIAL_COLS);
            r.onUpdate = () => {
              setRegistry(Object.assign(Object.create(Object.getPrototypeOf(r)), r));
            };
            setRegistry(r);
            setSelected({ r: 0, c: 0 });
            setInputValue("");
          }} className="p-2 bg-white/5 rounded-full active:rotate-180 transition-all duration-500">
            <RotateCcw size={20} className="text-slate-400" />
          </button>
        </div>
      </header>

      {/* Formula Bar */}
      <div className="flex items-center gap-3 p-4 bg-black/40 border-b border-white/5">
        <div className="px-3 py-2 bg-excel-green/10 rounded-xl font-mono font-bold text-excel-green text-sm min-w-[3.5rem] text-center border border-excel-green/20">
          {activeCellId}
        </div>
        <div className="flex-1 flex flex-col relative">
          <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3 border border-white/5 focus-within:border-excel-green/50 transition-all shadow-inner">
            <span className="text-excel-green font-mono italic font-bold">fx</span>
            <input
              ref={inputRef}
              className="bg-transparent border-none outline-none text-base font-mono w-full text-slate-100"
              value={inputValue}
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
              }}
              onKeyDown={handleInputKeyDown}
              onBlur={() => {
                 registry.updateCell(activeCellId, inputValue);
                 hideFormulaUI();
              }}
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
                    {ReferenceResolver.formatReference(0, c, false, false).replace(/[0-9]/g, '')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(INITIAL_ROWS).fill(0).map((_, r) => (
                <tr key={r}>
                  <td className={cn(
                    "sticky left-0 z-20 w-12 h-12 border-b border-r border-white/10 text-center text-[10px] font-bold transition-colors",
                    selected.r === r ? "bg-excel-green/10 text-excel-green" : "bg-surface text-slate-600"
                  )}>
                    {r + 1}
                  </td>
                  {Array(INITIAL_COLS).fill(0).map((_, c) => {
                    const id = ReferenceResolver.coordToId(r, c);
                    const cellData = registry.getCell(id);
                    const isS = selected.r === r && selected.c === c;
                    const isF = fillRange && r >= Math.min(fillRange.startR, fillRange.endR) && r <= Math.max(fillRange.startR, fillRange.endR) && c >= Math.min(fillRange.startC, fillRange.endC) && c <= Math.max(fillRange.startC, fillRange.endC);

                    return (
                      <GridCell
                        key={c}
                        r={r}
                        c={c}
                        id={id}
                        cellData={cellData}
                        isS={isS}
                        isF={isF}
                        editValue={isS ? inputValue : null}
                        onSelect={handleCellSelect}
                        onPointerDown={handleCellPointerDown}
                        onFillStart={handleFillStart}
                      />
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
          <span>LearnExcelAI Engine Active</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{INITIAL_ROWS} Rows</span>
          <span>{INITIAL_COLS} Columns</span>
        </div>
      </div>

      {/* AI Coach Drawer Panel */}
      <AICoachPanel
        isOpen={isAICoachOpen}
        onClose={() => setIsAICoachOpen(false)}
        context={spreadsheetContext}
        onApplyAction={handleApplyAIAction}
      />
    </div>
  );
}
