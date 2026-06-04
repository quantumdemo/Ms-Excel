"use client";

import { cn } from '@/lib/utils';

export default function FunctionScreentip({ activeFunction, visible }) {
  if (!visible || !activeFunction) return null;

  const { name, argIndex, args } = activeFunction;

  return (
    <div
      data-formula-ui="screentip"
      className="absolute z-[100] bottom-full mb-2 bg-slate-800 border border-white/10 rounded-md px-3 py-2 shadow-2xl text-xs font-mono animate-in slide-in-from-bottom-1 duration-150">
      <div className="flex items-center gap-1 text-slate-300">
        <span className="font-bold text-slate-100">{name}</span>
        <span>(</span>
        {args.length > 0 ? (
          args.map((arg, idx) => (
            <span key={idx} className="contents">
              <span className={cn(
                "transition-all duration-200 px-0.5 rounded",
                idx === argIndex ? "bg-excel-green/20 text-excel-green font-bold scale-110" : "text-slate-400"
              )}>
                {arg.optional ? `[${arg.name}]` : arg.name}
              </span>
              {idx < args.length - 1 && <span className="text-slate-600">, </span>}
            </span>
          ))
        ) : (
          <span className="text-slate-500 italic">no arguments</span>
        )}
        <span>)</span>
      </div>
    </div>
  );
}
