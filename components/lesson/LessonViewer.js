"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Info, CheckCircle2, HelpCircle, ArrowRight, Check } from "lucide-react";
import SpreadsheetEngine from "@/components/spreadsheet/SpreadsheetEngine";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/hooks/useAuth";
import { useProgressStore } from "@/hooks/useProgress";

export default function LessonViewer({ lesson, onBack }) {
  const [currentStep, setCurrentStep] = useState('theory'); // theory, practice, complete
  const [userInput, setUserInput] = useState("");
  const [evaluatedResult, setEvaluatedResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { user } = useAuthStore();
  const { completeLesson } = useProgressStore();

  const handleCellChange = (raw, evaluated) => {
    setUserInput(raw);
    setEvaluatedResult(evaluated);

    const cleanRaw = raw?.toString().replace(/\s/g, '').toUpperCase() || "";
    const cleanExpected = lesson.practice.expectedFormula.replace(/\s/g, '').toUpperCase();

    if (cleanRaw === `=${cleanExpected}` || (evaluated === lesson.practice.expectedValue)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleComplete = async () => {
    if (user) {
      await completeLesson(user.uid, lesson.id, lesson.xp);
    }
    setCurrentStep('complete');
  };

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl active:bg-white/5">
          <ChevronLeft size={24} />
        </button>
        <h2 className="font-bold text-sm truncate max-w-[200px]">{lesson.title}</h2>
        <div className="w-10 h-1 bg-white/10 rounded-full overflow-hidden">
           <div
             className="h-full bg-excel-green transition-all duration-500"
             style={{ width: currentStep === 'theory' ? '33%' : currentStep === 'practice' ? '66%' : '100%' }}
           />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
        <AnimatePresence mode="wait">
          {currentStep === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <div className="bg-excel-green/10 text-excel-green text-[10px] font-bold px-2 py-1 rounded inline-block mb-4 uppercase tracking-wider">
                Overview
              </div>
              <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
              <p className="text-slate-400 leading-relaxed mb-8">
                {lesson.description}
              </p>

              <div className="bg-card-dark border border-white/5 rounded-2xl p-5 mb-8">
                <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                  <Info size={16} className="text-excel-green" />
                  Syntax
                </h3>
                <code className="block bg-black/40 p-3 rounded-lg text-excel-light font-mono text-xs overflow-x-auto whitespace-nowrap no-scrollbar border border-white/5">
                  ={lesson.syntax}
                </code>
              </div>

              <div className="space-y-6">
                <h3 className="font-bold">Key Examples</h3>
                {lesson.examples?.map((ex, i) => (
                  <div key={i} className="border-l-2 border-excel-green/30 pl-4 py-1">
                    <p className="text-sm text-slate-400 mb-2">{ex.description}</p>
                    <code className="text-white font-mono text-sm">{ex.formula}</code>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setCurrentStep('practice')}
                className="w-full mt-12 bg-excel-green text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
              >
                Start Practice
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {currentStep === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Practice Challenge</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                   {lesson.practice.instructions}
                </p>
              </div>

              <SpreadsheetEngine
                initialData={lesson.practice.initialData}
                targetCell={lesson.practice.targetCell}
                onCellChange={handleCellChange}
              />

              <div className="mt-8 space-y-4">
                 <div className={cn(
                   "p-4 rounded-2xl border transition-all duration-300",
                   isCorrect
                    ? "bg-excel-green/10 border-excel-green/20"
                    : "bg-white/5 border-white/5"
                 )}>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-slate-500 uppercase">Your Input</span>
                       {isCorrect && (
                         <div className="flex items-center gap-1 text-excel-green animate-bounce">
                           <Check size={16} strokeWidth={3} />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Correct!</span>
                         </div>
                       )}
                    </div>
                    <div className="font-mono text-sm">
                       {userInput || <span className="text-slate-600 italic">Start typing in the green cell...</span>}
                    </div>
                    {evaluatedResult !== null && (
                      <div className="mt-2 text-xs text-slate-400">
                        Result: <span className="text-white">{evaluatedResult}</span>
                      </div>
                    )}
                 </div>

                 <button
                   onClick={() => setShowHint(!showHint)}
                   className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors"
                 >
                    <HelpCircle size={14} />
                    {showHint ? "Hide hint" : "Show hint"}
                 </button>

                 {showHint && (
                   <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-400"
                   >
                     Try using the <strong>={lesson.practice.expectedFormula.split('(')[0]}</strong> function with range <strong>{lesson.practice.expectedFormula.match(/\((.*?)\)/)?.[1]}</strong>
                   </motion.div>
                 )}
              </div>

              <button
                onClick={handleComplete}
                disabled={!isCorrect}
                className="w-full mt-10 bg-excel-green text-white font-bold py-4 rounded-2xl disabled:opacity-30 disabled:grayscale transition-all active:scale-95 shadow-lg shadow-excel-green/20"
              >
                Complete Lesson
              </button>
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 h-full flex flex-col items-center justify-center text-center pt-20"
            >
              <div className="relative mb-8">
                 <div className="absolute inset-0 bg-excel-green blur-3xl opacity-20 rounded-full" />
                 <motion.div
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ type: "spring", damping: 12 }}
                   className="relative w-32 h-32 bg-excel-green rounded-full flex items-center justify-center text-white"
                 >
                    <Check size={64} strokeWidth={3} />
                 </motion.div>

                 <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-2 -right-2 bg-blue-500 w-10 h-10 rounded-full border-4 border-bg-dark flex items-center justify-center text-white"
                 >
                    <div className="flex -space-x-2">
                       <Check size={14} strokeWidth={4} />
                       <Check size={14} strokeWidth={4} />
                    </div>
                 </motion.div>
              </div>

              <h2 className="text-3xl font-bold mb-2">Lesson Complete!</h2>
              <p className="text-slate-400 mb-8">You've mastered the {lesson.title} and earned {lesson.xp} XP.</p>

              <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 mb-12">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 font-medium">Points Earned</span>
                    <span className="text-excel-light font-bold">+{lesson.xp} XP</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Accuracy</span>
                    <span className="text-white font-bold">100%</span>
                 </div>
              </div>

              <button
                onClick={onBack}
                className="w-full bg-white text-black font-bold py-4 rounded-2xl active:scale-95 transition-all shadow-xl"
              >
                Back to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
