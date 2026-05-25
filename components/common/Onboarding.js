"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    title: "Learn Excel interactively",
    description: "Master functions through hands-on practice, not just watching videos.",
    icon: "📊"
  },
  {
    title: "Practice real formulas",
    description: "Use our built-in spreadsheet engine to solve real-world business cases.",
    icon: "🧪"
  },
  {
    title: "Master all functions",
    description: "From basic SUM to advanced LAMBDA and Power Query.",
    icon: "🚀"
  },
  {
    title: "Become professional",
    description: "Track your progress, earn badges, and level up your career.",
    icon: "🎓"
  }
];

export default function Onboarding({ onComplete }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-screen bg-bg-dark flex flex-col p-8 overflow-hidden">
      <div className="flex justify-end pt-4">
        <button
          onClick={onComplete}
          className="text-slate-500 font-medium text-sm"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="text-7xl mb-8">{slides[current].icon}</div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              {slides[current].title}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-excel-green" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-full bg-excel-green hover:bg-excel-light text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-excel-green/20"
        >
          {current === slides.length - 1 ? "Get Started" : "Continue"}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
