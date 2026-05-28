"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Parser } from 'hot-formula-parser';
import { RotateCcw, MousePointer2 } from 'lucide-react';

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

      // Real Excel behavior: if one is single value, it's used for all
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

    this.setFunction('LET', (args) => {
       return args[args.length - 1];
    });
  }
}

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
  const [spillMap, setSpillMap] = useState(new Map());
  const [fillRange, setFillRange] = useState(null);
  const [isFilling, setIsFilling] = useState(false);

  const evaluationCache = useRef(new Map());
  const formulaParser = useMemo(() => new ExcelEngine(), []);

  // Grid Initialization
  useEffect(() => {
    const rCount = Math.max(initialData.length, 12);
    const cCount = Math.max(initialData[0]?.length || 0, 6);
    const newData = Array(rCount).fill(0).map((_, r) =>
      Array(cCount).fill(0).map((_, c) => initialData[r]?.[c] ?? "")
    );
    setData(newData);
    setSelected({ r: 0, c: 0 });
    setInputValue(newData[0]?.[0]?.toString() || "");
  }, [initialData]);

  // Comprehensive Evaluation Logic
  const getCellValue = useCallback((r, c, path = new Set()) => {
    const cellId = `${r},${c}`;
    if (spillMap.has(cellId)) return spillMap.get(cellId);
    if (path.has(cellId)) return "#CIRCULAR!";
    if (evaluationCache.current.has(cellId)) return evaluationCache.current.get(cellId);

    const raw = data[r]?.[c];
    if (raw === undefined) return "";

    if (typeof raw === 'string' && raw.startsWith('=')) {
      const currentPath = new Set(path);
      currentPath.add(cellId);

      formulaParser.off('callCellValue');
      formulaParser.on('callCellValue', (coord, done) => {
        done(getCellValue(coord.row.index, coord.column.index, currentPath));
      });

      formulaParser.off('callRangeValue');
      formulaParser.on('callRangeValue', (start, end, done) => {
        const res = [];
        for (let row = start.row.index; row <= end.row.index; row++) {
          const rowData = [];
          for (let col = start.column.index; col <= end.column.index; col++) {
            rowData.push(getCellValue(row, col, currentPath));
          }
          res.push(rowData);
        }
        done(res);
      });

      const parsed = formulaParser.parse(raw.substring(1));
      const val = parsed.error ? parsed.error : parsed.result;

      const displayVal = Array.isArray(val) ? val[0]?.[0] : val;
      evaluationCache.current.set(cellId, displayVal);
      return displayVal;
    }

    if (raw !== "" && !isNaN(raw) && typeof raw !== 'boolean') return Number(raw);
    return raw;
  }, [data, formulaParser, spillMap]);

  // Update Spills Effect
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
                if (tr < data.length && tc < data[0].length) {
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

  evaluationCache.current.clear();

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
    const src = data[fillRange.startR][fillRange.startC];
    const newData = data.map((row, r) =>
      row.map((cell, c) => {
        if (r >= Math.min(fillRange.startR, fillRange.endR) &&
            r <= Math.max(fillRange.startR, fillRange.endR) &&
            c >= Math.min(fillRange.startC, fillRange.endC) &&
            c <= Math.max(fillRange.startC, fillRange.endC)) {
          return adjustRefs(src, r - fillRange.startR, c - fillRange.startC);
        }
        return cell;
      })
    );
    setData(newData);
    setIsFilling(false);
    setFillRange(null);
  };

  if (data.length === 0) return null;

  return (
    <div className="flex flex-col w-full bg-card-dark rounded-3xl overflow-hidden border border-white/5 shadow-2xl select-none"
         onMouseUp={handleFillEnd} onTouchEnd={handleFillEnd}>
      <div className="px-5 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-excel-green/20 rounded-lg flex items-center justify-center">
            <MousePointer2 size={16} className="text-excel-green" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            {isSandbox ? "Excel Sandbox Pro" : "Practice Lab"}
          </span>
        </div>
        {isSandbox && (
          <button onClick={() => setData(initialData)} className="p-2 rounded-full hover:bg-white/5 text-excel-green transition-colors">
            <RotateCcw size={18} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 p-4 bg-black/40 border-b border-white/5">
        <div className="px-3 py-1 bg-excel-green/10 rounded-md font-mono font-bold text-excel-green text-sm">
          {String.fromCharCode(65 + selected.c)}{selected.r + 1}
        </div>
        <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 border border-white/5 focus-within:border-excel-green/50 transition-all">
          <span className="text-slate-500 font-mono italic text-sm">fx</span>
          <input
            className="bg-transparent border-none outline-none text-sm font-mono w-full text-slate-100"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => {
               const newData = [...data];
               newData[selected.r][selected.c] = inputValue;
               setData(newData);
               if (onCellChange && selected.r === targetCell[0] && selected.c === targetCell[1]) {
                 onCellChange(inputValue, getCellValue(selected.r, selected.c));
               }
            }}
            placeholder="Enter formula or value..."
          />
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar relative">
        <table className="w-full border-collapse table-fixed min-w-[600px]">
          <thead>
            <tr>
              <th className="w-12 bg-black/40 border border-white/5 text-[10px] text-slate-500"></th>
              {data[0]?.map((_, c) => (
                <th key={c} className="bg-black/40 border border-white/5 p-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {String.fromCharCode(65 + c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                <td className="bg-black/40 border border-white/5 text-center text-[10px] font-bold text-slate-600">
                  {r + 1}
                </td>
                {row.map((cell, c) => {
                  const isS = selected.r === r && selected.c === c;
                  const isT = targetCell[0] === r && targetCell[1] === c;
                  const isSp = spillMap.has(`${r},${c}`);
                  const val = typeof cell === 'string' && cell.startsWith('=') ? getCellValue(r, c) : (isSp ? spillMap.get(`${r},${c}`) : cell);

                  const isF = fillRange && r >= Math.min(fillRange.startR, fillRange.endR) && r <= Math.max(fillRange.startR, fillRange.endR) && c >= Math.min(fillRange.startC, fillRange.endC) && c <= Math.max(fillRange.startC, fillRange.endC);

                  return (
                    <td
                      key={c}
                      onClick={() => { setSelected({r,c}); setInputValue(cell.toString()); }}
                      onMouseEnter={() => isFilling && setFillRange({...fillRange, endR: r, endC: c})}
                      className={cn(
                        "border border-white/5 h-12 p-2 text-xs transition-all relative cursor-pointer",
                        isS && "ring-2 ring-inset ring-excel-green bg-excel-green/5 z-10",
                        isT && !isS && "bg-excel-green/10",
                        isSp && "text-blue-400 italic bg-blue-500/5",
                        isF && "bg-excel-green/20"
                      )}
                    >
                      <div className={cn(
                        "truncate text-center font-semibold",
                        val?.toString().startsWith("#") ? "text-red-500" : (typeof val === 'number' ? "text-blue-400" : "text-slate-300")
                      )}>
                        {val?.toString()}
                      </div>
                      {isS && (
                        <div
                          className="absolute bottom-[-5px] right-[-5px] w-4 h-4 bg-excel-green border-2 border-white rounded-full z-30 cursor-crosshair"
                          onMouseDown={(e) => { e.stopPropagation(); setIsFilling(true); setFillRange({startR:r, startC:c, endR:r, endC:c}); }}
                          onTouchStart={(e) => { e.stopPropagation(); setIsFilling(true); setFillRange({startR:r, startC:c, endR:r, endC:c}); }}
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
