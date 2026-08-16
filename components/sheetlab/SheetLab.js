"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RotateCcw, Database, Sparkles, Plus, X, Edit2, Hash, Calendar, DollarSign, Percent, Type, LayoutGrid, MoreVertical, Layers, PieChart, CheckSquare, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WorkbookManager, ReferenceResolver, formatCellValue } from '@/lib/excel-core';
import FormulaAutoComplete from '../spreadsheet/FormulaAutoComplete';
import FunctionScreentip from '../spreadsheet/FunctionScreentip';
import ExcelActions from './ExcelActions';
import AICoachPanel from './AICoachPanel';
import { buildSpreadsheetContext } from '@/lib/ai/spreadsheet-context';
import { getFunctionSuggestions, extractQuery, findActiveFunction } from '@/lib/formula-ui-utils';
import { computePivotTable, generatePivotSheetGrid, AGGREGATIONS } from '@/lib/pivot-engine';
import _ from 'lodash';

const INITIAL_ROWS = 120;
const MAX_IMPORT_ROWS = 100;
const INITIAL_COLS = 26;

const FORMAT_OPTIONS = [
  { id: 'general', label: 'General', icon: Hash },
  { id: 'number', label: 'Number (1,234.56)', icon: Hash },
  { id: 'currency', label: 'Currency ($1,234.56)', icon: DollarSign },
  { id: 'date', label: 'Date (2024-01-01)', icon: Calendar },
  { id: 'percentage', label: 'Percentage (12.50%)', icon: Percent },
  { id: 'text', label: 'Text', icon: Type }
];

const GridCell = React.memo(({ r, c, id, cellData, isS, isColS, isF, editValue, onSelect, onPointerDown, onFillStart }) => {
  const rawDisplay = isS ? editValue : cellData?.computed;
  const displayValue = isS ? editValue : formatCellValue(rawDisplay, cellData?.format || 'general');

  return (
    <td
      data-row={r}
      data-col={c}
      onClick={() => onSelect(r, c, id)}
      onPointerDown={(e) => onPointerDown(e, r, c)}
      className={cn(
        "border border-white/5 h-12 min-w-[100px] min-h-[48px] p-2 text-sm transition-all relative outline-none cursor-cell",
        isS && "ring-2 ring-inset ring-excel-green bg-excel-green/5 z-20",
        isColS && !isS && "bg-excel-green/10 border-excel-green/20",
        !isS && !isColS && "hover:bg-white/[0.02]",
        isF && "bg-excel-green/20"
      )}
    >
      <div className={cn(
        "px-2 truncate text-center font-medium pointer-events-none",
        displayValue?.toString().startsWith("#") ? "text-red-400 font-bold" : (typeof rawDisplay === 'number' ? "text-blue-400" : "text-slate-300")
      )}>
        {displayValue?.toString() ?? ""}
      </div>
      {cellData?.validation?.type === 'list' && (
        <select
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/80 border border-white/20 text-[10px] text-excel-green font-bold rounded px-1 outline-none opacity-80 hover:opacity-100 cursor-pointer"
          value={rawDisplay || ''}
          onChange={(e) => onSelect(r, c, id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="" disabled>-- Select --</option>
          {(cellData.validation.values || []).map((opt, i) => (
            <option key={i} value={opt} className="bg-bg-dark text-slate-100">{opt}</option>
          ))}
        </select>
      )}
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
  const [workbook, setWorkbook] = useState(null);
  const [activeSheetName, setActiveSheetName] = useState("Sheet1");
  const [selected, setSelected] = useState({ r: 0, c: 0 });
  const [selectedCol, setSelectedCol] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [editingSheetName, setEditingSheetName] = useState(null);
  const [sheetNameInput, setSheetNameInput] = useState("");

  const [dragStarted, setDragStarted] = useState(false);
  const pointerStartPos = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Refresh Confirmation Modal State
  const [isRefreshModalOpen, setIsRefreshModalOpen] = useState(false);

  // Formula UI State
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSelectedIndex] = useState(0);
  const [activeFunction, setActiveFunction] = useState(null);
  const [cursorPos, setCursorPos] = useState(0);

  // Quick Tools Popup State
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [pivotAggType, setPivotAggType] = useState("SUM");
  const [manualRowField, setManualRowField] = useState("");
  const [manualColField, setManualColField] = useState("");
  const [manualValField, setManualValField] = useState("");
  const [manualValAgg, setManualValAgg] = useState("SUM");
  const [validationInput, setValidationInput] = useState("East, West, North, South");

  // AI Coach State
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [actionNotification, setActionNotification] = useState(null);

  const [fillRange, setFillRange] = useState(null);
  const [isFilling, setIsFilling] = useState(false);

  const hideFormulaUI = useCallback(() => {
    setSuggestions([]);
    setActiveFunction(null);
  }, []);

  // Initialize Workbook
  useEffect(() => {
    const wb = new WorkbookManager(INITIAL_ROWS, INITIAL_COLS);
    wb.onUpdate = () => {
      setWorkbook(Object.assign(Object.create(Object.getPrototypeOf(wb)), wb));
    };
    setWorkbook(wb);
    setActiveSheetName(wb.activeSheetName);
    setSelected({ r: 0, c: 0 });
    setInputValue("");
  }, []);

  // Browser refresh / unload protection dialog
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Do you want to refresh? Any unsaved edits will be lost.";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const activeRegistry = useMemo(() => {
    if (!workbook) return null;
    return workbook.sheets.get(activeSheetName) || workbook.activeSheet;
  }, [workbook, activeSheetName]);

  const activeCellId = useMemo(() =>
    ReferenceResolver.coordToId(selected.r, selected.c),
    [selected]
  );

  const activeCellData = useMemo(() => {
    if (!activeRegistry) return null;
    return activeRegistry.getCell(activeCellId);
  }, [activeRegistry, activeCellId]);

  const spreadsheetContext = useMemo(() => {
    if (!activeRegistry) return null;
    return buildSpreadsheetContext(activeRegistry, selected);
  }, [activeRegistry, selected]);

  const handleCellSelect = useCallback((r, c, id, newDirectValue = null) => {
    if (dragStarted || !activeRegistry) return;
    if (selectedCol !== null) {
      setSelectedCol(null);
    }
    if (newDirectValue !== null) {
      activeRegistry.updateCell(id, newDirectValue);
      setInputValue(newDirectValue);
      setSelected({ r, c });
      return;
    }
    activeRegistry.updateCell(activeCellId, inputValue);
    setSelected({ r, c });
    setInputValue(activeRegistry.getCell(id).raw || "");
    hideFormulaUI();
  }, [activeRegistry, activeCellId, inputValue, selectedCol, dragStarted, hideFormulaUI]);

  const handleColumnHeaderClick = (c) => {
    if (!activeRegistry) return;

    if (activeCellId) {
      activeRegistry.updateCell(activeCellId, inputValue);
    }

    setSelectedCol(c);
    setSelected({ r: 0, c });

    const targetCellId = ReferenceResolver.coordToId(0, c);
    const targetCell = activeRegistry.getCell(targetCellId);
    setInputValue(targetCell?.raw || "");

    hideFormulaUI();

    const colLetter = ReferenceResolver.formatReference(0, c, false, false).replace(/[0-9]/g, '');
    setActionNotification(`Selected Column ${colLetter}. Choose a data format to apply to the entire column.`);
    setTimeout(() => setActionNotification(null), 3500);
  };

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

  // Multi-sheet Import
  const handleImport = (incomingSheets) => {
    if (!workbook) return;

    const newWb = new WorkbookManager(INITIAL_ROWS, INITIAL_COLS);
    newWb.sheets.clear();

    if (Array.isArray(incomingSheets)) {
      incomingSheets.forEach(s => {
        const name = s.name || "Sheet1";
        const constrainedData = (s.data || []).slice(0, MAX_IMPORT_ROWS);
        const reg = newWb.addSheet(name);
        reg.loadData(constrainedData);
      });
    }

    newWb.onUpdate = () => {
      setWorkbook(Object.assign(Object.create(Object.getPrototypeOf(newWb)), newWb));
    };

    const firstSheetName = Array.from(newWb.sheets.keys())[0] || "Sheet1";
    newWb.setActiveSheet(firstSheetName);

    setWorkbook(newWb);
    setActiveSheetName(firstSheetName);
    setSelected({ r: 0, c: 0 });
    setSelectedCol(null);
    setInputValue(newWb.getCell("A1")?.raw || "");
  };

  // Multi-sheet Export with formatting
  const getWorkbookExportData = () => {
    if (!workbook) return { sheets: [] };

    const sheets = [];
    workbook.sheets.forEach((reg, sName) => {
      const rows = reg.rows;
      const cols = reg.cols;
      const data = [];

      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          const id = ReferenceResolver.coordToId(r, c);
          const cell = reg.getCell(id);
          row.push({
            value: cell.computed,
            formula: cell.type === 'formula' ? "=" + cell.parsedFormula : null,
            format: cell.format || 'general'
          });
        }
        data.push(row);
      }
      sheets.push({ name: sName, data });
    });

    return { sheets };
  };

  /**
   * Deterministic Pivot Engine Launcher & New Sheet Renderer
   */
  const renderPivotToNewSheet = useCallback((pivotConfig = {}) => {
    if (!activeRegistry || !workbook) return;

    const headersObj = spreadsheetContext?.headers || [];
    const headerNames = headersObj.map(h => h.text);

    // Extract raw source records from active sheet registry
    const lastRowNumber = spreadsheetContext?.dataBounds?.lastRowNumber || 100;
    const maxCol = spreadsheetContext?.dataBounds?.maxPopulatedCol || headersObj.length;

    const records = [];
    for (let r = 1; r < lastRowNumber; r++) {
      const rec = {};
      let hasVal = false;
      headersObj.forEach(h => {
        const id = ReferenceResolver.coordToId(r, h.colIndex);
        const cell = activeRegistry.getCell(id);
        const val = cell.computed ?? cell.raw ?? null;
        if (val !== null && val !== "") hasVal = true;
        rec[h.text] = val;
      });
      if (hasVal) records.push(rec);
    }

    if (records.length === 0) {
      setActionNotification("⚠️ No data records found to generate PivotTable.");
      setTimeout(() => setActionNotification(null), 3500);
      return;
    }

    // Compute PivotTable using Deterministic Pivot Engine
    const pivotResult = computePivotTable({
      records,
      headers: headerNames,
      rows: pivotConfig.rows || [],
      columns: pivotConfig.columns || [],
      values: pivotConfig.values || [],
      filters: pivotConfig.filters || []
    });

    // Generate 2D Table Grid
    const titleStr = `PivotTable - ${activeSheetName}`;
    const grid2D = generatePivotSheetGrid(pivotResult, titleStr);

    // Generate unique new sheet name e.g. PivotTable1, PivotTable2
    let pIdx = 1;
    let newSheetName = `PivotTable${pIdx}`;
    while (workbook.sheets.has(newSheetName)) {
      pIdx++;
      newSheetName = `PivotTable${pIdx}`;
    }

    // Add new worksheet and load 2D grid into CellRegistry
    const newReg = workbook.addSheet(newSheetName);
    newReg.loadData(grid2D);

    // Apply number formats to measure columns if values contain currency/number hints
    grid2D.forEach((row, rIdx) => {
      row.forEach((cellVal, cIdx) => {
        const cellId = ReferenceResolver.coordToId(rIdx, cIdx);
        if (typeof cellVal === 'number') {
          // Check if value looks like monetary amount
          if (Math.abs(cellVal) > 10) {
            newReg.setCellFormat(cellId, 'number');
          }
        }
      });
    });

    workbook.setActiveSheet(newSheetName);
    setActiveSheetName(newSheetName);
    setSelected({ r: 0, c: 0 });
    setSelectedCol(null);
    setInputValue(newReg.getCell("A1")?.raw || "");
    setIsToolsOpen(false);

    setActionNotification(`✨ Created Excel PivotTable in '${newSheetName}'`);
    setTimeout(() => setActionNotification(null), 4000);
  }, [activeRegistry, workbook, spreadsheetContext, activeSheetName]);

  // Controlled AI Action Execution
  const handleApplyAIAction = (action) => {
    if (!action) return;

    if (action.type === 'insert_formula' && activeRegistry) {
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

      activeRegistry.updateCell(targetCellId, formulaStr);
      setSelected({ r: coord.r, c: coord.c });
      setInputValue(formulaStr);

      setActionNotification(`Applied ${formulaStr} to cell ${targetCellId}`);
      setTimeout(() => setActionNotification(null), 3500);
    } else if (action.type === 'generate_pivot') {
      const config = action.pivotConfig || action.pivotData || {};
      renderPivotToNewSheet(config);
    }
  };

  const handleFormatChange = (e) => {
    const fmt = e.target.value;
    if (!activeRegistry) return;

    if (selectedCol !== null) {
      activeRegistry.setColumnFormat(selectedCol, fmt);
      const colLetter = ReferenceResolver.formatReference(0, selectedCol, false, false).replace(/[0-9]/g, '');
      setActionNotification(`Applied ${fmt} data format to Column ${colLetter}`);
      setTimeout(() => setActionNotification(null), 3500);
    } else if (activeCellId) {
      activeRegistry.setCellFormat(activeCellId, fmt);
    }
  };

  // AI Natural Language Pivot Table Request
  const handleGeneratePivot = async () => {
    if (!activeRegistry || !workbook) return;

    setActionNotification(`✨ AI parsing intent & computing PivotTable...`);

    try {
      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Generate an intelligent pivot table summary for this dataset using ${pivotAggType} aggregation`,
          context: { ...spreadsheetContext, requestType: "generate_pivot" }
        })
      });

      if (res.ok) {
        const aiResponse = await res.json();
        if (aiResponse?.action?.type === "generate_pivot") {
          const config = aiResponse.action.pivotConfig || aiResponse.action.pivotData || {};
          renderPivotToNewSheet(config);
          return;
        }
      }
    } catch (err) {
      console.warn("AI Pivot call failed, using deterministic default:", err);
    }

    // Fallback default
    renderPivotToNewSheet({
      rows: [manualRowField || "Category"],
      values: [{ field: manualValField || "Value", aggregation: pivotAggType }]
    });
  };

  // Manual Custom Pivot Table Execution
  const handleGenerateManualPivot = () => {
    const headers = spreadsheetContext?.headers?.map(h => h.text) || [];
    const rowF = manualRowField || headers[0] || "Region";
    const valF = manualValField || headers.find(h => h !== rowF) || "Sales";
    const colF = manualColField || null;

    const config = {
      rows: [rowF],
      columns: colF ? [colF] : [],
      values: [{ field: valF, aggregation: manualValAgg || "SUM" }]
    };

    renderPivotToNewSheet(config);
  };

  // Apply Cell Data Validation Dropdown
  const handleApplyValidation = () => {
    if (!activeRegistry || !activeCellId) return;
    const items = validationInput.split(',').map(s => s.trim()).filter(Boolean);
    if (items.length === 0) return;

    activeRegistry.setCellValidation(activeCellId, { type: 'list', values: items });
    setIsToolsOpen(false);

    setActionNotification(`Set dropdown list rule [${items.join(', ')}] on cell ${activeCellId}`);
    setTimeout(() => setActionNotification(null), 3500);
  };

  // Sheet Tabs Actions
  const handleAddSheet = () => {
    if (!workbook) return;
    const newName = `Sheet${workbook.sheets.size + 1}`;
    workbook.addSheet(newName);
    workbook.setActiveSheet(newName);
    setActiveSheetName(newName);
    setSelected({ r: 0, c: 0 });
    setSelectedCol(null);
    setInputValue("");
  };

  const handleSwitchSheet = (sName) => {
    if (!workbook || sName === activeSheetName) return;
    workbook.setActiveSheet(sName);
    setActiveSheetName(sName);
    setSelected({ r: 0, c: 0 });
    setSelectedCol(null);
    const reg = workbook.sheets.get(sName);
    setInputValue(reg?.getCell("A1")?.raw || "");
    hideFormulaUI();
  };

  const handleStartRename = (sName) => {
    setEditingSheetName(sName);
    setSheetNameInput(sName);
  };

  const handleConfirmRename = () => {
    if (workbook && editingSheetName && sheetNameInput.trim()) {
      workbook.renameSheet(editingSheetName, sheetNameInput.trim());
      setActiveSheetName(workbook.activeSheetName);
    }
    setEditingSheetName(null);
  };

  const handleDeleteSheet = (sName, e) => {
    e.stopPropagation();
    if (workbook && workbook.sheets.size > 1) {
      workbook.deleteSheet(sName);
      setActiveSheetName(workbook.activeSheetName);
      setSelected({ r: 0, c: 0 });
      setSelectedCol(null);
    }
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

    if (activeRegistry) activeRegistry.updateCell(activeCellId, newVal);
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
        if (activeRegistry) activeRegistry.updateCell(activeCellId, inputValue);
        e.currentTarget.blur();
        hideFormulaUI();
      }
      if (e.key === 'Escape') {
        setInputValue(activeRegistry?.getCell(activeCellId).raw || "");
        e.currentTarget.blur();
        hideFormulaUI();
      }
    }
  };

  const handleFillEnd = useCallback(() => {
    setDragStarted(false);
    pointerStartPos.current = null;
    if (!isFilling || !fillRange || !activeRegistry) return;

    const { startR, startC, endR, endC } = fillRange;
    if (startR === endR && startC === endC) {
      setIsFilling(false);
      setFillRange(null);
      return;
    }

    const rDir = endR > startR ? 1 : (endR < startR ? -1 : 0);
    const cDir = endC > startC ? 1 : (endC < startC ? -1 : 0);

    const sourceId = ReferenceResolver.coordToId(startR, startC);
    const sourceCell = activeRegistry.getCell(sourceId);
    const sourceRaw = sourceCell.raw;

    let step = 0;
    let hasPattern = false;
    if (sourceCell.type === "number") {
      const sVal = Number(sourceRaw);
      const prevR = startR > 0 ? startR - 1 : -1;
      const prevC = startC > 0 ? startC - 1 : -1;

      if (rDir !== 0 && prevR !== -1) {
        const pId = ReferenceResolver.coordToId(prevR, startC);
        const pCell = activeRegistry.getCell(pId);
        if (pCell.type === "number") {
          step = sVal - Number(pCell.raw);
          hasPattern = true;
        }
      } else if (cDir !== 0 && prevC !== -1) {
        const pId = ReferenceResolver.coordToId(startR, prevC);
        const pCell = activeRegistry.getCell(pId);
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
          activeRegistry.updateCell(targetId, ReferenceResolver.adjustFormula(sourceRaw, r - startR, 0));
        } else if (hasPattern) {
          activeRegistry.updateCell(targetId, (Number(sourceRaw) + step * offset).toString());
        } else {
          activeRegistry.updateCell(targetId, sourceRaw);
        }
      }
    } else if (cDir !== 0) {
      for (let c = startC + cDir; cDir > 0 ? c <= endC : c >= endC; c += cDir) {
        const offset = Math.abs(c - startC);
        const targetId = ReferenceResolver.coordToId(startR, c);
        if (sourceCell.type === "formula") {
          activeRegistry.updateCell(targetId, ReferenceResolver.adjustFormula(sourceRaw, 0, c - startC));
        } else if (hasPattern) {
          activeRegistry.updateCell(targetId, (Number(sourceRaw) + step * offset).toString());
        } else {
          activeRegistry.updateCell(targetId, sourceRaw);
        }
      }
    }

    setIsFilling(false);
    setFillRange(null);
  }, [isFilling, fillRange, activeRegistry]);

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
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'SELECT') return;
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  if (!workbook || !activeRegistry) return null;

  const currentHeaders = spreadsheetContext?.headers || [];

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
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* AI Coach Entry Button */}
          <button
            onClick={() => setIsAICoachOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-excel-green/20 border border-excel-green/40 hover:bg-excel-green/30 text-excel-green rounded-xl font-bold text-xs transition-all active:scale-95 shadow-md shadow-excel-green/10"
          >
            <span>AI Coach</span>
          </button>

          <ExcelActions
            onImport={handleImport}
            getWorkbookExportData={getWorkbookExportData}
            isRegistryReady={!!activeRegistry}
          />

          <button
            onClick={() => setIsRefreshModalOpen(true)}
            className="p-2 bg-white/5 rounded-full active:rotate-180 transition-all duration-500"
            title="Refresh Worksheet"
          >
            <RotateCcw size={20} className="text-slate-400" />
          </button>
        </div>
      </header>

      {/* Formula & Formatting Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-black/40 border-b border-white/5 relative">
        <div className="flex items-center gap-2 relative">
          <div className="px-3 py-2 bg-excel-green/10 rounded-xl font-mono font-bold text-excel-green text-sm min-w-[3.5rem] text-center border border-excel-green/20">
            {selectedCol !== null ? `Col ${ReferenceResolver.formatReference(0, selectedCol, false, false).replace(/[0-9]/g, '')}` : activeCellId}
          </div>

          {/* Cell Format Selector */}
          <select
            value={activeCellData?.format || 'general'}
            onChange={handleFormatChange}
            className="bg-white/5 border border-white/10 text-slate-300 font-bold text-xs rounded-xl px-3 py-2.5 outline-none focus:border-excel-green/50 cursor-pointer"
          >
            {FORMAT_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id} className="bg-bg-dark text-slate-100">
                {opt.label}
              </option>
            ))}
          </select>

          {/* Quick Tools Popup Menu Button */}
          <button
            onClick={() => setIsToolsOpen(!isToolsOpen)}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-slate-300 transition-all active:scale-95 flex items-center justify-center"
            title="Quick Tools Menu"
          >
            <LayoutGrid size={18} className="text-excel-green" />
          </button>
        </div>

        {/* Quick Tools Popup Modal */}
        <AnimatePresence>
          {isToolsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute top-16 left-4 sm:left-auto z-[110] w-84 bg-card-dark border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <LayoutGrid size={16} className="text-excel-green" />
                  PivotTable & Quick Tools
                </span>
                <button onClick={() => setIsToolsOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              {/* AI Auto Pivot Action */}
              <div className="bg-white/5 border border-white/5 p-3 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChart size={18} className="text-excel-green" />
                    <span className="font-bold text-xs text-white">AI Auto PivotTable</span>
                  </div>
                  <select
                    value={pivotAggType}
                    onChange={(e) => setPivotAggType(e.target.value)}
                    className="bg-black/60 border border-white/20 text-excel-green font-bold text-[11px] rounded-lg px-2 py-1 outline-none cursor-pointer"
                  >
                    <option value="SUM" className="bg-bg-dark text-slate-100">SUM</option>
                    <option value="AVERAGE" className="bg-bg-dark text-slate-100">AVERAGE</option>
                    <option value="COUNT" className="bg-bg-dark text-slate-100">COUNT</option>
                    <option value="COUNTA" className="bg-bg-dark text-slate-100">COUNTA</option>
                    <option value="COUNTUNIQUE" className="bg-bg-dark text-slate-100">COUNTUNIQUE</option>
                    <option value="MAX" className="bg-bg-dark text-slate-100">MAX</option>
                    <option value="MIN" className="bg-bg-dark text-slate-100">MIN</option>
                    <option value="MEDIAN" className="bg-bg-dark text-slate-100">MEDIAN</option>
                    <option value="STDEV" className="bg-bg-dark text-slate-100">STDEV</option>
                  </select>
                </div>
                <button
                  onClick={handleGeneratePivot}
                  className="w-full bg-excel-green hover:bg-excel-green/90 text-white font-bold py-2 rounded-xl text-xs active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} />
                  <span>AI Pivot Breakdown</span>
                </button>
              </div>

              {/* Manual Custom Pivot Field Picker */}
              <div className="bg-white/5 border border-white/5 p-3 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <SlidersHorizontal size={16} className="text-excel-green" />
                  <span>Manual Pivot Config (Override)</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Rows Field</label>
                    <select
                      value={manualRowField}
                      onChange={(e) => setManualRowField(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-slate-200 outline-none cursor-pointer"
                    >
                      <option value="">-- Select Row Field --</option>
                      {currentHeaders.map((h, i) => (
                        <option key={i} value={h.text} className="bg-bg-dark text-slate-100">{h.text}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Columns Field (Optional)</label>
                    <select
                      value={manualColField}
                      onChange={(e) => setManualColField(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-slate-200 outline-none cursor-pointer"
                    >
                      <option value="">-- None --</option>
                      {currentHeaders.map((h, i) => (
                        <option key={i} value={h.text} className="bg-bg-dark text-slate-100">{h.text}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="text-slate-400 font-bold block mb-1">Values Field</label>
                      <select
                        value={manualValField}
                        onChange={(e) => setManualValField(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-slate-200 outline-none cursor-pointer"
                      >
                        <option value="">-- Select Value --</option>
                        {currentHeaders.map((h, i) => (
                          <option key={i} value={h.text} className="bg-bg-dark text-slate-100">{h.text}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-28">
                      <label className="text-slate-400 font-bold block mb-1">Function</label>
                      <select
                        value={manualValAgg}
                        onChange={(e) => setManualValAgg(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 text-excel-green font-bold rounded-xl px-2 py-1.5 text-[11px] outline-none cursor-pointer"
                      >
                        <option value="SUM" className="bg-bg-dark text-slate-100">SUM</option>
                        <option value="AVERAGE" className="bg-bg-dark text-slate-100">AVERAGE</option>
                        <option value="COUNT" className="bg-bg-dark text-slate-100">COUNT</option>
                        <option value="COUNTA" className="bg-bg-dark text-slate-100">COUNTA</option>
                        <option value="COUNTUNIQUE" className="bg-bg-dark text-slate-100">COUNTUNIQUE</option>
                        <option value="MAX" className="bg-bg-dark text-slate-100">MAX</option>
                        <option value="MIN" className="bg-bg-dark text-slate-100">MIN</option>
                        <option value="MEDIAN" className="bg-bg-dark text-slate-100">MEDIAN</option>
                        <option value="STDEV" className="bg-bg-dark text-slate-100">STDEV</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerateManualPivot}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-1.5 rounded-xl text-xs active:scale-98 transition-all border border-white/10 mt-1"
                >
                  Generate Custom PivotTable
                </button>
              </div>

              {/* In-Cell Validation Action */}
              <div className="bg-white/5 border border-white/5 p-3 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <CheckSquare size={16} className="text-excel-green" />
                  <span>Set Dropdown Rule on {activeCellId}</span>
                </div>
                <input
                  type="text"
                  value={validationInput}
                  onChange={(e) => setValidationInput(e.target.value)}
                  placeholder="Comma separated e.g. East, West"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
                />
                <button
                  onClick={handleApplyValidation}
                  className="w-full bg-excel-green hover:bg-excel-green/90 text-white font-bold py-1.5 rounded-xl text-xs active:scale-98 transition-all"
                >
                  Apply In-Cell Dropdown
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                activeRegistry.updateCell(activeCellId, val);
                updateFormulaUI(val, pos);
              }}
              onKeyDown={handleInputKeyDown}
              onBlur={() => {
                 activeRegistry.updateCell(activeCellId, inputValue);
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
                {Array(INITIAL_COLS).fill(0).map((_, c) => {
                  const colLetter = ReferenceResolver.formatReference(0, c, false, false).replace(/[0-9]/g, '');
                  const isColS = selectedCol === c;
                  return (
                    <th
                      key={c}
                      onClick={() => handleColumnHeaderClick(c)}
                      className={cn(
                        "w-[100px] h-10 bg-surface border-b border-r border-white/10 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer hover:bg-excel-green/20 hover:text-excel-green select-none",
                        isColS || selected.c === c ? "text-excel-green bg-excel-green/10 font-bold" : "text-slate-500"
                      )}
                      title={`Click to select and format entire Column ${colLetter}`}
                    >
                      {colLetter}
                    </th>
                  );
                })}
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
                    const cellData = activeRegistry.getCell(id);
                    const isS = selected.r === r && selected.c === c;
                    const isColS = selectedCol === c;
                    const isF = fillRange && r >= Math.min(fillRange.startR, fillRange.endR) && r <= Math.max(fillRange.startR, fillRange.endR) && c >= Math.min(fillRange.startC, fillRange.endC) && c <= Math.max(fillRange.startC, fillRange.endC);

                    return (
                      <GridCell
                        key={c}
                        r={r}
                        c={c}
                        id={id}
                        cellData={cellData}
                        isS={isS}
                        isColS={isColS}
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

      {/* Multi-Sheet Tabs Bar */}
      <div className="p-2 bg-black/60 border-t border-white/10 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {Array.from(workbook.sheets.keys()).map((sName) => {
            const isActive = sName === activeSheetName;
            const isEditing = editingSheetName === sName;

            return (
              <div
                key={sName}
                onClick={() => handleSwitchSheet(sName)}
                onDoubleClick={() => handleStartRename(sName)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all border",
                  isActive
                    ? "bg-excel-green text-white border-excel-green/50 shadow-md shadow-excel-green/20"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 border-white/5"
                )}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={sheetNameInput}
                    onChange={(e) => setSheetNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirmRename()}
                    onBlur={handleConfirmRename}
                    autoFocus
                    className="bg-black/50 text-white font-bold text-xs px-1.5 py-0.5 rounded outline-none border border-white/20 w-20"
                  />
                ) : (
                  <span>{sName}</span>
                )}

                {workbook.sheets.size > 1 && !isEditing && (
                  <button
                    onClick={(e) => handleDeleteSheet(sName, e)}
                    className="p-0.5 rounded hover:bg-black/20 text-slate-300 opacity-60 hover:opacity-100 transition-opacity"
                    title="Delete Sheet"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            );
          })}

          <button
            onClick={handleAddSheet}
            title="Add New Worksheet"
            className="flex items-center justify-center p-2 bg-white/5 hover:bg-white/10 text-excel-green rounded-xl border border-white/10 transition-all active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-2 flex-shrink-0">
          <span>{INITIAL_ROWS} Rows</span>
          <span>{INITIAL_COLS} Cols</span>
        </div>
      </div>

      {/* AI Coach Drawer Panel */}
      <AICoachPanel
        isOpen={isAICoachOpen}
        onClose={() => setIsAICoachOpen(false)}
        context={spreadsheetContext}
        onApplyAction={handleApplyAIAction}
      />

      {/* Refresh Confirmation Dialog Modal */}
      <AnimatePresence>
        {isRefreshModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card-dark border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center space-y-6 relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full mx-auto flex items-center justify-center shadow-inner">
                <RotateCcw size={28} />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Do you want to refresh?</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Refreshing will reset your current worksheet and formula state. Any unsaved edits will be cleared.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsRefreshModalOpen(false)}
                  className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs rounded-2xl border border-white/10 active:scale-95 transition-all"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    setIsRefreshModalOpen(false);
                    const wb = new WorkbookManager(INITIAL_ROWS, INITIAL_COLS);
                    wb.onUpdate = () => {
                      setWorkbook(Object.assign(Object.create(Object.getPrototypeOf(wb)), wb));
                    };
                    setWorkbook(wb);
                    setActiveSheetName("Sheet1");
                    setSelected({ r: 0, c: 0 });
                    setSelectedCol(null);
                    setInputValue("");
                    window.location.reload();
                  }}
                  className="flex-1 py-3.5 bg-excel-green hover:bg-excel-green/90 text-white font-black text-xs rounded-2xl shadow-lg shadow-excel-green/20 active:scale-95 transition-all"
                >
                  Yes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
