"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Parser } from 'hot-formula-parser';

export default function CustomSpreadsheet({ initialData, targetCell, onCellChange }) {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState({ r: 0, c: 0 });
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const parser = new Parser();

  // Custom parser logic for spreadsheet cell references
  parser.on('callCellValue', (cellCoord, done) => {
    const val = data[cellCoord.row.index]?.[cellCoord.column.index];
    done(val);
  });

  const getCellLabel = (r, c) => {
    const col = String.fromCharCode(65 + c);
    return `${col}${r + 1}`;
  };

  const handleSelect = (r, c) => {
    setSelected({ r, c });
    setEditing(false);
    const cellValue = data[r][c];
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
    const newData = [...data];
    newData[selected.r][selected.c] = inputValue;
    setData(newData);
    setEditing(false);

    if (selected.r === targetCell[0] && selected.c === targetCell[1]) {
      let evaluated = inputValue;
      if (inputValue.startsWith('=')) {
        const result = parser.parse(inputValue.substring(1));
        evaluated = result.error ? result.error : result.result;
      }
      onCellChange(inputValue, evaluated);
    }
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <div className="flex flex-col w-full bg-card-dark rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
      {/* Formula Bar */}
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
            placeholder="Type formula..."
          />
        </div>
      </div>

      {/* Grid */}
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
                        <div className="truncate text-center">
                          {cell}
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
        Touch cells to edit • Double tap to type
      </div>
    </div>
  );
}
