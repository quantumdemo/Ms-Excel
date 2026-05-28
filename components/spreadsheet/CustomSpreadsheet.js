"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Parser } from 'hot-formula-parser';
import { RotateCcw } from 'lucide-react';

export default function CustomSpreadsheet({
  initialData = [[""]],
  targetCell = [-1, -1],
  onCellChange,
  isSandbox = false
}) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({ r: 0, c: 0 });
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // Initialize data with padding or expansion
  useEffect(() => {
    const minRows = 10;
    const minCols = 5;

    const rowCount = Math.max(initialData.length, minRows);
    const colCount = Math.max(initialData[0]?.length || 0, minCols);

    const newData = Array(rowCount).fill(0).map((_, r) => {
      return Array(colCount).fill(0).map((_, c) => {
        return initialData[r]?.[c] !== undefined ? initialData[r][c] : "";
      });
    });

    setData(newData);
    setSelected({ r: 0, c: 0 });
    setInputValue(newData[0]?.[0]?.toString() || "");
  }, [initialData]);

  // Map to store evaluated results to avoid redundant calculations within a single render
  const evaluationCache = useRef(new Map());

  // Single parser instance reused for all evaluations
  const formulaParser = useMemo(() => new Parser(), []);

  const getCellValue = useCallback((r, c, path = new Set()) => {
    const cellId = `${r},${c}`;
    if (path.has(cellId)) return "#CIRCULAR!";
    if (evaluationCache.current.has(cellId)) return evaluationCache.current.get(cellId);

    const val = data[r]?.[c];
    if (val === undefined) return "";

    if (typeof val === 'string' && val.startsWith('=')) {
      const currentPath = new Set(path);
      currentPath.add(cellId);

      // Setup parser handlers for this specific evaluation context
      const onCallCellValue = (cellCoord, done) => {
        done(getCellValue(cellCoord.row.index, cellCoord.column.index, currentPath));
      };
      const onCallRangeValue = (startCell, endCell, done) => {
        const result = [];
        for (let row = startCell.row.index; row <= endCell.row.index; row++) {
          const rowData = [];
          for (let col = startCell.column.index; col <= endCell.column.index; col++) {
            rowData.push(getCellValue(row, col, currentPath));
          }
          result.push(rowData);
        }
        done(result);
      };

      formulaParser.off('callCellValue');
      formulaParser.off('callRangeValue');
      formulaParser.on('callCellValue', onCallCellValue);
      formulaParser.on('callRangeValue', onCallRangeValue);

      const result = formulaParser.parse(val.substring(1));
      const finalVal = result.error ? result.error : result.result;

      evaluationCache.current.set(cellId, finalVal);
      return finalVal;
    }

    // Numeric conversion
    if (val !== "" && !isNaN(val) && typeof val !== 'boolean') {
      return Number(val);
    }

    return val;
  }, [data, formulaParser]);

  // Reset cache on every render to ensure fresh data
  evaluationCache.current.clear();

  const getCellLabel = (r, c) => {
    const col = String.fromCharCode(65 + c);
    return `${col}${r + 1}`;
  };

  const handleSelect = (r, c) => {
    setSelected({ r, c });
    setEditing(false);
    const cellValue = data[r]?.[c];
    setInputValue(cellValue?.toString() || "");
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveCell();
    }
  };

  const saveCell = () => {
    if (!data[selected.r]) return;

    const newData = data.map((row, r) =>
      r === selected.r
        ? row.map((cell, c) => c === selected.c ? inputValue : cell)
        : row
    );

    setData(newData);
    setEditing(false);

    if (selected.r === targetCell[0] && selected.c === targetCell[1] && onCellChange) {
      evaluationCache.current.clear();
      const evaluated = getCellValue(selected.r, selected.c);
      onCellChange(inputValue, evaluated);
    }
  };

  const resetSpreadsheet = () => {
    const minRows = 10;
    const minCols = 5;
    const rowCount = Math.max(initialData.length, minRows);
    const colCount = Math.max(initialData[0]?.length || 0, minCols);

    const newData = Array(rowCount).fill(0).map((_, r) => {
      return Array(colCount).fill(0).map((_, c) => {
        return initialData[r]?.[c] !== undefined ? initialData[r][c] : "";
      });
    });

    setData(newData);
    setSelected({ r: 0, c: 0 });
    setInputValue(newData[0]?.[0]?.toString() || "");
    evaluationCache.current.clear();
    if (onCellChange && targetCell[0] !== -1) {
      onCellChange("", "");
    }
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  if (data.length === 0) return null;

  return (
    <div className="flex flex-col w-full bg-card-dark rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
      <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          {isSandbox ? "Practice Sandbox" : "Challenge Lab"}
        </span>
        {isSandbox && (
          <button
            onClick={resetSpreadsheet}
            className="flex items-center gap-1.5 text-[10px] font-bold text-excel-green hover:text-excel-light transition-colors uppercase tracking-wider"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 p-3 bg-black/40 border-b border-white/5">
        <div className="w-10 h-10 bg-excel-green/20 rounded-lg flex items-center justify-center font-bold text-excel-green text-sm">
          {getCellLabel(selected.r, selected.c)}
        </div>
        <div className="flex-1 flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/5">
          <span className="text-slate-500 font-mono italic text-xs">fx</span>
          <input
            className="bg-transparent border-none outline-none text-sm font-mono w-full text-slate-200"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={saveCell}
            onKeyDown={handleKeyDown}
            placeholder="Type formula (e.g. =SUM(A1:A5))"
          />
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full border-collapse table-fixed min-w-[400px]">
          <thead>
            <tr>
              <th className="w-10 bg-black/40 border border-white/5 text-[10px] text-slate-500"></th>
              {data[0]?.map((_, c) => (
                <th key={c} className="bg-black/40 border border-white/5 p-1 text-[10px] font-bold text-slate-500 uppercase">
                  {String.fromCharCode(65 + c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                <td className="bg-black/40 border border-white/5 text-center text-[10px] font-bold text-slate-500">
                  {r + 1}
                </td>
                {row.map((cell, c) => {
                  const isSelected = selected.r === r && selected.c === c;
                  const isTarget = targetCell[0] === r && targetCell[1] === c;
                  const displayValue = typeof cell === 'string' && cell.startsWith('=')
                    ? getCellValue(r, c)
                    : cell;

                  return (
                    <td
                      key={c}
                      onClick={() => handleSelect(r, c)}
                      onDoubleClick={handleDoubleClick}
                      className={cn(
                        "border border-white/5 h-12 p-1 text-xs transition-all relative cursor-pointer",
                        isSelected && "ring-2 ring-inset ring-excel-green z-10 bg-excel-green/5",
                        isTarget && !isSelected && "bg-excel-green/10"
                      )}
                    >
                      {editing && isSelected ? (
                        <input
                          ref={inputRef}
                          className="absolute inset-0 w-full h-full bg-black text-white outline-none px-2 z-20"
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={saveCell}
                          onKeyDown={handleKeyDown}
                        />
                      ) : (
                        <div className={cn(
                          "truncate text-center font-medium",
                          displayValue?.toString().startsWith("#") ? "text-red-400" :
                          typeof displayValue === 'number' ? "text-blue-400" : "text-slate-300"
                        )}>
                          {displayValue?.toString()}
                        </div>
                      )}
                      {isTarget && (
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-excel-green rounded-full m-1 opacity-50" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-2 bg-black/20 text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
        {isSandbox ? "Free Practice Area • Every cell supports formulas" : "Touch cells to edit • Double tap to type"}
      </div>
    </div>
  );
}
