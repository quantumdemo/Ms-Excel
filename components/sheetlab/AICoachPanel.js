"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Sparkles, Send, Lightbulb, CheckCircle2, AlertCircle,
  HelpCircle, ArrowRight, Play, Copy, Check, ChevronDown, RefreshCw, Mic, MicOff, Wrench
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAILearningStore } from '@/lib/ai/ai-progress';

const SUGGESTED_PROMPTS = [
  "Explain this formula",
  "Help me analyze this data",
  "Find an error in my formula",
  "What should I analyze?",
  "Help me calculate this"
];

export default function AICoachPanel({
  isOpen,
  onClose,
  context,
  onApplyAction,
  onRecordProgress
}) {
  const [messages, setMessages] = useState([]);
  const [inputQuestion, setInputQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedFormula, setCopiedFormula] = useState(null);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // Speech Recognition Setup
  const toggleVoiceListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please type your query.");
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => setIsListening(true);
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuestion(transcript);
        }
        setIsListening(false);
      };
      rec.onerror = (err) => {
        console.warn("Voice dictation error:", err);
        setIsListening(false);
      };
      rec.onend = () => setIsListening(false);

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      console.warn("Failed to initialize speech recognition:", e);
      setIsListening(false);
    }
  };

  const handleSendPrompt = async (promptText) => {
    const q = promptText || inputQuestion;
    if (!q.trim() || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputQuestion("");
    setLoading(true);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          context: context || {}
        })
      });

      const aiData = await res.json();

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        data: aiData
      };

      setMessages(prev => [...prev, aiMsg]);

      useAILearningStore.getState().recordAIQuestion(q, aiData.type);

      if (onRecordProgress) {
        onRecordProgress('ai_question_asked', { question: q, type: aiData.type });
      }
    } catch (err) {
      console.error("Failed to query AI Coach:", err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          data: {
            type: 'explanation',
            answer: 'AI Coach Connection Error',
            explanation: 'Unable to reach the AI Coach right now. Please check your network connection and try again.',
            hint: 'Your spreadsheet continues to work offline normally.',
            difficulty: 'beginner',
            action: null
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyFormula = (formulaStr) => {
    if (!formulaStr) return;
    navigator.clipboard.writeText(formulaStr);
    setCopiedFormula(formulaStr);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const hasFormulaError = context?.selectedCell?.hasError;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-x-0 bottom-0 top-16 md:top-20 md:left-auto md:right-0 md:w-[450px] bg-bg-dark border-t md:border-l border-white/10 rounded-t-[2.5rem] md:rounded-tr-none z-[100] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-excel-green/20 rounded-2xl flex items-center justify-center border border-excel-green/30">
                  <Sparkles size={20} className="text-excel-green" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-none text-white">AI Data Coach</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Ask questions about your spreadsheet or get help learning Excel.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              {/* Context Header Badge */}
              <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  Active Cell: <strong className="text-excel-green">{context?.selectedCell?.id || 'A1'}</strong>
                </span>
                <span className="text-slate-500 font-mono text-[10px] uppercase">
                  {context?.nonEmptyCellCount || 0} Data Cells
                </span>
              </div>

              {/* Instant 1-Click "Fix Formula" Repair Banner if active cell has an error */}
              {hasFormulaError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl space-y-2"
                >
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                    <AlertCircle size={16} />
                    <span>Formula Error Detected in {context.selectedCell.id}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Cell contains <code className="text-red-400 font-mono">{context.selectedCell.computed}</code>. Would you like the AI Coach to fix it?
                  </p>
                  <button
                    onClick={() => handleSendPrompt(`Fix formula error in cell ${context.selectedCell.id}`)}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md shadow-red-500/20"
                  >
                    <Wrench size={14} />
                    <span>⚡ 1-Click Fix Formula</span>
                  </button>
                </motion.div>
              )}

              {/* Messages */}
              {messages.length === 0 ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-excel-green/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-excel-green/20">
                    <Lightbulb size={28} className="text-excel-green" />
                  </div>
                  <h4 className="font-bold text-base text-slate-200 mb-2">How can I help with your sheet?</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
                    Select a prompt below or type your question about formulas, errors, or data analysis.
                  </p>

                  {/* Suggested Prompts */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SUGGESTED_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendPrompt(prompt)}
                        className="px-3 py-2 bg-card-dark hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-medium text-slate-300 active:scale-95 transition-all text-left flex items-center gap-2"
                      >
                        <Sparkles size={12} className="text-excel-green flex-shrink-0" />
                        <span>"{prompt}"</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={cn("flex flex-col gap-2", msg.sender === 'user' ? "items-end" : "items-start")}>
                    {msg.sender === 'user' ? (
                      <div className="bg-excel-green text-white font-medium text-sm px-4 py-3 rounded-2xl max-w-[85%] shadow-md">
                        {msg.text}
                      </div>
                    ) : (
                      <div className="w-full bg-card-dark border border-white/10 p-4 rounded-2xl space-y-3">
                        {/* Title / Type Badge */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-bold text-sm text-excel-green flex items-center gap-2">
                            <Sparkles size={16} />
                            {msg.data?.answer || "AI Coach Insights"}
                          </span>
                          <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                            {msg.data?.type || "Guide"}
                          </span>
                        </div>

                        {/* Explanation */}
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {msg.data?.explanation}
                        </p>

                        {/* Formula Display */}
                        {msg.data?.formula && (
                          <div className="p-3 bg-black/50 border border-white/10 rounded-xl font-mono text-xs text-excel-green flex items-center justify-between gap-2">
                            <span className="truncate">{msg.data.formula}</span>
                            <button
                              onClick={() => handleCopyFormula(msg.data.formula)}
                              className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 text-slate-300 transition-colors"
                              title="Copy Formula"
                            >
                              {copiedFormula === msg.data.formula ? <Check size={14} className="text-excel-green" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {/* Hint */}
                        {msg.data?.hint && (
                          <div className="flex items-start gap-2 text-xs text-amber-400/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                            <Lightbulb size={14} className="flex-shrink-0 mt-0.5" />
                            <p className="flex-1">{msg.data.hint}</p>
                          </div>
                        )}

                        {/* Action Proposal Button */}
                        {msg.data?.action && msg.data.action.type === 'insert_formula' && (
                          <div className="pt-2">
                            <button
                              onClick={() => {
                                if (onApplyAction) onApplyAction(msg.data.action);
                              }}
                              className="w-full bg-excel-green hover:bg-excel-green/90 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-lg shadow-excel-green/20"
                            >
                              <Play size={14} fill="currentColor" />
                              <span>Apply Formula ({msg.data.action.formula} to {msg.data.action.cell})</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}

              {loading && (
                <div className="flex items-center gap-3 p-4 bg-card-dark rounded-2xl border border-white/10">
                  <RefreshCw size={18} className="text-excel-green animate-spin" />
                  <span className="text-xs text-slate-400 font-medium">Analyzing spreadsheet context...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar with Voice Dictation */}
            <div className="p-4 border-t border-white/10 bg-black/60">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:border-excel-green/50 transition-all">
                <input
                  type="text"
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
                  placeholder={isListening ? "Listening..." : "Ask about this spreadsheet..."}
                  className="bg-transparent border-none outline-none text-sm text-slate-100 placeholder-slate-500 flex-1"
                />

                {/* Voice Dictation Button */}
                <button
                  type="button"
                  onClick={toggleVoiceListening}
                  title="Voice Dictation Query"
                  className={cn(
                    "p-2 rounded-xl transition-all active:scale-95",
                    isListening ? "bg-red-500 text-white animate-pulse" : "bg-white/10 text-slate-300 hover:text-white"
                  )}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>

                <button
                  onClick={() => handleSendPrompt()}
                  disabled={!inputQuestion.trim() || loading}
                  className="p-2 bg-excel-green text-white rounded-xl disabled:opacity-40 hover:bg-excel-green/90 active:scale-95 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
