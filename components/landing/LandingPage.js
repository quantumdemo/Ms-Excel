"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, CheckCircle2, ArrowRight, Play, Database,
  Brain, Zap, Target, BookOpen, Layers, Shield, ChevronRight, MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-bg-dark text-slate-100 flex flex-col font-sans overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 px-6 py-4 bg-bg-dark/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/logo.png" alt="LearnExcelAI Logo" fill className="object-contain" priority />
          </div>
          <span className="font-black text-xl tracking-tight text-white">
            LearnExcel<span className="text-excel-green">AI</span>
          </span>
        </div>
        <button
          onClick={onGetStarted}
          className="px-5 py-2.5 bg-excel-green hover:bg-excel-green/90 text-white font-bold text-xs rounded-2xl shadow-lg shadow-excel-green/20 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>Launch App</span>
          <ArrowRight size={14} />
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-12 pb-16 text-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-excel-green/15 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-excel-green/10 border border-excel-green/30 rounded-full text-excel-green text-xs font-bold mb-6"
        >
          <Sparkles size={14} />
          <span>The Next-Gen AI-Assisted Spreadsheet Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-6 leading-[1.15] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400"
        >
          Your Personal <br />
          <span className="text-excel-green">AI Data Coach</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed mb-8"
        >
          "Ask your spreadsheet a question. Learn how to solve it. Understand the result."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 bg-excel-green hover:bg-excel-green/90 text-white font-black rounded-2xl text-base shadow-2xl shadow-excel-green/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <span>Start Learning Free</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* AI Coach UI Demonstration Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto bg-card-dark border border-white/10 rounded-[2.5rem] p-6 shadow-2xl text-left relative overflow-hidden"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-excel-green/20 rounded-xl flex items-center justify-center border border-excel-green/30">
                <Sparkles size={16} className="text-excel-green" />
              </div>
              <span className="font-bold text-sm text-white">AI Data Coach Demonstration</span>
            </div>
            <span className="text-[10px] font-mono text-excel-green bg-excel-green/10 px-2.5 py-1 rounded-full uppercase font-bold">
              Live Engine
            </span>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">User Prompt:</span>
              <span className="text-slate-200 font-medium">"Which region generated the highest revenue?"</span>
            </div>

            <div className="bg-excel-green/10 border border-excel-green/20 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-excel-green flex items-center gap-1.5">
                  <Sparkles size={14} />
                  Guided Solution
                </span>
                <span className="text-[10px] text-slate-400 font-mono">SUMIF Analysis</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                I found a <strong>Region</strong> column and a <strong>Revenue</strong> column. To calculate conditional revenue, let's start with <code>SUMIF</code>.
              </p>
              <div className="p-2.5 bg-black/60 rounded-xl font-mono text-excel-green text-[11px] flex items-center justify-between">
                <span>=SUMIF(A2:A100, "Lagos", C2:C100)</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Safe Action</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-16 bg-black/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Why Traditional Courses Fail</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Passive video tutorials don't teach real data problem solving. You need interactive practice with real-time feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<MessageSquare className="text-red-400" />}
              title="Generic Chatbots"
              description="Generic AI models don't know your spreadsheet ranges, active cells, or formula dependency graph."
            />
            <FeatureCard
              icon={<BookOpen className="text-amber-400" />}
              title="Passive Watching"
              description="Watching someone else edit cells doesn't build muscle memory for complex formula syntax."
            />
            <FeatureCard
              icon={<CheckCircle2 className="text-excel-green" />}
              title="The LearnExcelAI Way"
              description="Context-aware AI coaching directly in a live spreadsheet sandbox that explains, checks, and guides."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">How LearnExcelAI Works</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              A 3-step continuous learning loop that transforms how you learn spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step="01"
              title="Import or Enter Data"
              description="Use SheetLab to import .xlsx spreadsheets or enter data directly into our real-time CellRegistry grid."
            />
            <StepCard
              step="02"
              title="Ask AI Data Coach"
              description="Ask questions about formulas, errors, or data structure. The AI extracts compact context without leaking private data."
            />
            <StepCard
              step="03"
              title="Apply & Master"
              description="Review proposed formula actions, apply them safely with 1-click, and test your understanding through guided feedback."
            />
          </div>
        </div>
      </section>

      {/* Product Benefits & Target Users */}
      <section className="px-6 py-16 bg-black/40 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Built for Modern Learners</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Whether you are a student, analyst, business owner, or career switcher.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenefitCard
              icon={<Zap className="text-excel-green" />}
              title="Interactive SheetLab Sandbox"
              items={[
                "100x26 responsive grid powered by CellRegistry engine",
                "Full formula evaluator supporting 100+ functions",
                "Excel Import/Export with SheetJS integration",
                "Controlled formula actions with safety verification"
              ]}
            />
            <BenefitCard
              icon={<Brain className="text-purple-400" />}
              title="Context-Aware AI Intelligence"
              items={[
                "Understands headers, active cell, and 3x3 cell neighborhood",
                "Diagnoses #VALUE!, #SPILL!, #REF!, and #CIRCULAR! errors",
                "Provides guided hints before giving away full solutions",
                "Adapts to your skill level and tracks learning signals"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-20 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto relative z-10">
          <h2 className="text-4xl font-black mb-4">Ready to Master Excel with AI?</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Join thousands of learners building real data analysis skills today with LearnExcelAI.
          </p>
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-10 py-5 bg-excel-green hover:bg-excel-green/90 text-white font-black rounded-2xl text-lg shadow-2xl shadow-excel-green/40 active:scale-95 transition-all inline-flex items-center justify-center gap-3"
          >
            <span>Start Learning Now</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-8 px-6 text-center text-xs text-slate-500 font-medium">
        <p>© {new Date().getFullYear()} LearnExcelAI. Master Microsoft Excel with AI Assistance.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-card-dark border border-white/5 p-6 rounded-3xl space-y-3">
      <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-bold text-base text-white">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ step, title, description }) {
  return (
    <div className="bg-card-dark border border-white/5 p-6 rounded-3xl space-y-3 relative overflow-hidden">
      <span className="text-3xl font-black text-excel-green/20 absolute top-4 right-4">{step}</span>
      <h3 className="font-bold text-base text-white">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

function BenefitCard({ icon, title, items }) {
  return (
    <div className="bg-card-dark border border-white/5 p-6 rounded-3xl space-y-4">
      <div className="flex items-center gap-3 border-b border-white/5 pb-3">
        <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-bold text-base text-white">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
            <CheckCircle2 size={16} className="text-excel-green flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
