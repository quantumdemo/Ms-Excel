"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function FormulaAutoComplete({
  suggestions,
  selectedIndex,
  onSelect,
  visible
}) {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div
      data-formula-ui="autocomplete"
      className="absolute z-[100] mt-1 w-64 bg-slate-900 border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-100">
      <div className="max-h-60 overflow-y-auto no-scrollbar">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion.name}
            className={cn(
              "px-4 py-2 text-sm cursor-pointer flex items-center justify-between transition-colors",
              index === selectedIndex ? "bg-excel-green text-white" : "text-slate-300 hover:bg-white/5"
            )}
            onClick={() => onSelect(suggestion)}
          >
            <span className="font-mono font-bold">{suggestion.name}</span>
            <span className={cn(
                "text-[10px] uppercase tracking-wider font-bold",
                index === selectedIndex ? "text-white/70" : "text-slate-500"
            )}>
              Function
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
