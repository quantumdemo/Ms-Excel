"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Info, HelpCircle, ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import CustomSpreadsheet from "@/components/spreadsheet/CustomSpreadsheet";
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

    // Check if formula matches OR result matches
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
    <div className="min-h-screen bg-bg-dark flex flex-col fixed inset-0 z-50">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-bg-dark/80 backdrop-blur-md">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl active:bg-white/5">
          <ChevronLeft size={24} />
        </button>
        <h2 className="font-bold text-sm truncate max-w-[200px]">{lesson.title}</h2>
        <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
           <motion.div
             initial={{ width: 0 }}
             animate={{ width: currentStep === 'theory' ? '33%' : currentStep === 'practice' ? '66%' : '100%' }}
             className="h-full bg-excel-green"
           />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
        <AnimatePresence mode="wait">
          {currentStep === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div className="bg-excel-green/10 text-excel-green text-[10px] font-bold px-2 py-1 rounded inline-block mb-4 uppercase tracking-wider">
                {lesson.category}
              </div>
              <h1 className="text-4xl font-black mb-6 leading-tight">{lesson.title}</h1>

              <section className="mb-12">
                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                    <HelpCircle className="text-excel-green" size={20} />
                    {lesson.introduction.title}
                 </h2>
                 <p className="text-slate-400 leading-relaxed text-lg mb-6">
                    {lesson.introduction.description}
                 </p>
                 <div className="p-5 bg-excel-green/5 border border-excel-green/20 rounded-3xl">
                    <p className="text-slate-200 font-medium italic">
                       {lesson.introduction.concept}
                    </p>
                 </div>
              </section>

              <hr className="border-white/5 mb-12" />

              <section className="mb-12">
                 <h2 className="text-xl font-bold mb-6 text-white">Syntax</h2>
                 <div className="bg-black/40 p-6 rounded-3xl border border-white/5 mb-8">
                    <code className="text-excel-light font-mono text-lg block break-all">
                       {lesson.syntax}
                    </code>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Syntax Breakdown</h3>
                    {lesson.syntaxBreakdown?.map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                         <div className="w-8 h-8 bg-excel-green/10 rounded-lg flex items-center justify-center font-bold text-excel-green text-xs flex-shrink-0">
                            {i + 1}
                         </div>
                         <div>
                            <p className="font-bold text-slate-200 mb-1">{item.arg}</p>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              <hr className="border-white/5 mb-12" />

              <section className="mb-12">
                 <h2 className="text-xl font-bold mb-8 text-white">Detailed Examples</h2>
                 <div className="space-y-10">
                    {lesson.detailedExamples?.map((ex, i) => (
                      <div key={i} className="space-y-6">
                         <h3 className="font-bold text-slate-300 flex items-center gap-2">
                            <span className="w-2 h-2 bg-excel-green rounded-full" />
                            {ex.title}
                         </h3>

                         <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/20">
                            <table className="w-full text-left text-xs border-collapse">
                               <thead>
                                  <tr className="bg-white/5">
                                     {ex.table.headers.map((h, j) => (
                                       <th key={j} className="p-3 font-bold text-slate-400 border-b border-white/5 uppercase tracking-wider">{h}</th>
                                     ))}
                                  </tr>
                               </thead>
                               <tbody>
                                  {ex.table.rows.map((row, j) => (
                                    <tr key={j}>
                                       {row.map((cell, k) => (
                                         <td key={k} className="p-3 border-b border-white/5 text-slate-300 font-mono">{cell}</td>
                                       ))}
                                    </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                         {ex.stepByStep && (
                           <div className="space-y-3 px-2">
                             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">How it works</p>
                             <ul className="space-y-2">
                               {ex.stepByStep.map((step, k) => (
                                 <li key={k} className="text-sm text-slate-400 flex gap-3">
                                   <span className="text-excel-green font-bold">{k + 1}.</span>
                                   {step}
                                 </li>
                               ))}
                             </ul>
                           </div>
                         )}
                         {ex.explanation && <p className="text-sm text-slate-500 italic px-2">{ex.explanation}</p>}
                      </div>
                    ))}
                 </div>
              </section>

              <hr className="border-white/5 mb-12" />

              <section className="mb-12">
                 <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <Sparkles className="text-orange-400" size={20} />
                    Common Mistakes
                 </h2>
                 <div className="space-y-4">
                    {lesson.commonMistakes?.map((m, i) => (
                      <div key={i} className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
                         <p className="font-bold text-red-400 mb-2">{m.title}</p>
                         <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="mb-12">
                 <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <Zap className="text-excel-green" size={20} />
                    Pro Tips
                 </h2>
                 <ul className="space-y-4">
                    {lesson.proTips?.map((tip, i) => (
                      <li key={i} className="flex gap-4">
                         <div className="w-1.5 h-1.5 bg-excel-green rounded-full mt-2.5 flex-shrink-0" />
                         <p className="text-slate-400 text-base leading-relaxed">{tip}</p>
                      </li>
                    ))}
                 </ul>
              </section>

              <hr className="border-white/5 mb-12" />

              <section className="mb-12 p-8 bg-gradient-to-br from-excel-green/20 to-transparent border border-excel-green/20 rounded-[2.5rem]">
                 <h2 className="text-2xl font-black mb-4 text-white">Mini Challenge</h2>
                 <p className="text-slate-300 mb-8 leading-relaxed">
                    {lesson.miniChallenge.question}
                 </p>

                 <div className="group">
                    <p className="text-[10px] font-black text-excel-green uppercase tracking-widest mb-3 opacity-50 group-hover:opacity-100 transition-opacity">Expected Answer</p>
                    <code className="block bg-black/40 p-4 rounded-xl text-excel-light font-mono text-sm blur-md hover:blur-none transition-all duration-500 select-none">
                       {lesson.miniChallenge.expectedAnswer}
                    </code>
                 </div>
              </section>

              <button
                onClick={() => {
                  setCurrentStep('practice');
                  window.scrollTo(0, 0);
                }}
                className="w-full mt-6 bg-white text-black font-black py-6 rounded-[2.5rem] flex items-center justify-center gap-4 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                Go to Lab Practice
                <ArrowRight size={24} />
              </button>
            </motion.div>
          )}

          {currentStep === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-6"
            >
              <div className="mb-8">
                <p className="text-excel-green font-bold text-xs uppercase tracking-[0.2em] mb-2">Interactive Challenge</p>
                <h3 className="font-bold text-2xl mb-3 leading-tight">{lesson.practice.instructions}</h3>
              </div>

              <CustomSpreadsheet
                initialData={lesson.practice.initialData}
                targetCell={lesson.practice.targetCell}
                onCellChange={handleCellChange}
              />

              <div className="mt-8 space-y-4">
                 <div className={cn(
                   "p-5 rounded-[2rem] border-2 transition-all duration-500",
                   isCorrect
                    ? "bg-excel-green/10 border-excel-green shadow-lg shadow-excel-green/10"
                    : "bg-white/5 border-white/5"
                 )}>
                    <div className="flex items-center justify-between mb-3">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Formula</span>
                       {isCorrect && (
                         <div className="flex items-center gap-1.5 text-excel-green font-black animate-pulse">
                           <Check size={18} strokeWidth={4} />
                           <span className="text-xs uppercase">Brilliant!</span>
                         </div>
                       )}
                    </div>
                    <div className="font-mono text-lg text-white">
                       {userInput || <span className="text-slate-700 italic">Select a cell...</span>}
                    </div>
                 </div>

                 <button
                   onClick={() => setShowHint(!showHint)}
                   className="flex items-center gap-2 text-sm text-slate-500 px-4 py-2 hover:text-white transition-colors"
                 >
                    <HelpCircle size={16} />
                    {showHint ? "Hide Hint" : "Stuck? Get a Hint"}
                 </button>

                 <AnimatePresence>
                   {showHint && (
                     <motion.div
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       exit={{ opacity: 0, height: 0 }}
                       className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-sm text-blue-400"
                     >
                       💡 Use the <strong>={lesson.practice.expectedFormula.split('(')[0]}</strong> function.
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              <button
                onClick={handleComplete}
                disabled={!isCorrect}
                className="w-full mt-12 bg-excel-green text-white font-black py-5 rounded-[2rem] disabled:opacity-20 disabled:grayscale transition-all active:scale-95 shadow-xl shadow-excel-green/20"
              >
                Complete Mission
              </button>
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 h-full flex flex-col items-center justify-center text-center pt-24"
            >
              <div className="relative mb-12">
                 <div className="absolute inset-0 bg-excel-green blur-[80px] opacity-30 rounded-full" />
                 <motion.div
                   initial={{ scale: 0, rotate: -45 }}
                   animate={{ scale: 1, rotate: 0 }}
                   transition={{ type: "spring", damping: 12, stiffness: 100 }}
                   className="relative w-40 h-40 bg-gradient-to-br from-excel-green to-excel-dark rounded-full flex items-center justify-center text-white shadow-2xl"
                 >
                    <Check size={80} strokeWidth={4} />
                 </motion.div>

                 <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -bottom-4 -right-4 bg-[#34b7f1] w-14 h-14 rounded-full border-4 border-bg-dark flex items-center justify-center text-white"
                 >
                    <div className="flex -space-x-3">
                       <Check size={20} strokeWidth={5} />
                       <Check size={20} strokeWidth={5} />
                    </div>
                 </motion.div>
              </div>

              <h2 className="text-4xl font-black mb-3">Mastered!</h2>
              <p className="text-slate-400 text-lg mb-12">You've unlocked the secrets of {lesson.title}.</p>

              <div className="w-full space-y-4 mb-16">
                 <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 flex justify-between items-center">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">XP Earned</span>
                    <span className="text-excel-light font-black text-2xl">+{lesson.xp}</span>
                 </div>
              </div>

              <button
                onClick={onBack}
                className="w-full bg-white text-black font-black py-6 rounded-[2rem] active:scale-95 transition-all shadow-2xl"
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
