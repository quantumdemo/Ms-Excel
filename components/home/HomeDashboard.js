"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X, Home, BookOpen, Search, Trophy, Settings, LogOut,
  ChevronRight, Menu as MenuIcon, Flame, Zap, Play,
  CheckCircle2, Target, Award, Search as SearchIcon,
  HelpCircle as HelpCircleIcon, Heart, Layout
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import HamburgerMenu from "@/components/layout/HamburgerMenu";
import Footer from "@/components/layout/Footer";
import { excelLessons } from "@/data/lessons";
import { functionCategories } from "@/data/lesson-system";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useProgressStore } from "@/hooks/useProgress";
import { useAuthStore } from "@/hooks/useAuth";

export default function HomeDashboard({ onSelectLesson }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);

  const { xp, completedLessons } = useProgressStore();
  const { user, logout } = useAuthStore();

  const currentLevel = Math.floor(xp / 500) + 1;
  const xpInLevel = xp % 500;
  const progressPercent = (xpInLevel / 500) * 100;

  // Intelligent Search logic
  const searchIndex = useMemo(() => {
    return excelLessons.map(l => ({
      ...l,
      searchTerms: `${l.title} ${l.category} ${l.description} ${l.id}`.toLowerCase()
    }));
  }, []);

  const filteredLessons = useMemo(() => {
    let results = searchIndex;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(l => l.searchTerms.includes(q));
    }
    if (categoryFilter) {
      results = results.filter(l => l.category === categoryFilter);
    }
    return results;
  }, [searchQuery, categoryFilter, searchIndex]);

  const handleCategorySelect = (catId) => {
    setCategoryFilter(catId);
    setActiveTab('home');
    setIsMenuOpen(false);
  };

  return (
    <div className="pb-24 min-h-screen bg-bg-dark">
      <header className="sticky top-0 z-40 px-6 py-4 bg-bg-dark/80 backdrop-blur-md flex items-center justify-between border-b border-white/5">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -ml-2 rounded-xl active:bg-white/5"
        >
          <MenuIcon size={24} />
        </button>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              <Flame size={16} className="text-orange-500" fill="currentColor" />
              <span className="text-orange-500 font-bold text-sm">3</span>
           </div>
           <div className="flex items-center gap-1 bg-excel-green/10 px-3 py-1 rounded-full border border-excel-green/20">
              <Zap size={16} className="text-excel-green" fill="currentColor" />
              <span className="text-excel-green font-bold text-sm">{xp}</span>
           </div>
        </div>
      </header>

      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={handleCategorySelect}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        categoryFilter={categoryFilter}
      />

      <div className="px-6 pt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="mb-8">
                 <h1 className="text-3xl font-black mb-2">Hello, {user?.displayName?.split(' ')[0] || 'Explorer'}!</h1>
                 <p className="text-slate-500 text-sm">Ready to master a new formula today?</p>
              </div>

              <motion.div
                className="relative overflow-hidden bg-gradient-to-br from-excel-green to-excel-dark p-6 rounded-[2.5rem] shadow-2xl shadow-excel-green/30 mb-10"
              >
                 <div className="relative z-10 text-white">
                    <p className="text-excel-light font-black text-[10px] uppercase tracking-[0.3em] mb-2 opacity-80">Rank: {currentLevel > 5 ? 'Excel Wizard' : 'Junior Analyst'}</p>
                    <h2 className="text-4xl font-black mb-4">Level {currentLevel}</h2>
                    <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden mb-3">
                       <motion.div
                         initial={{ width: 0 }}
                         animate={{ width: `${progressPercent}%` }}
                         className="h-full bg-white shadow-[0_0_15px_white]"
                       />
                    </div>
                    <div className="flex justify-between items-center text-white/80 text-xs font-bold uppercase tracking-widest">
                       <span>{xpInLevel} XP</span>
                       <span>{500 - xpInLevel} XP to Next Level</span>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/5 rounded-full blur-[60px]" />
              </motion.div>

              <section className="mb-10">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black">
                       {categoryFilter ? `Category: ${categoryFilter.toUpperCase()}` : "Quick Start"}
                    </h3>
                    {categoryFilter && (
                      <button onClick={() => setCategoryFilter(null)} className="text-excel-green text-xs font-black underline">Show All</button>
                    )}
                 </div>
                 <div className="space-y-5">
                    {(categoryFilter ? filteredLessons : excelLessons.slice(0, 5)).map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      return (
                        <motion.div
                          key={lesson.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelectLesson(lesson)}
                          className="bg-card-dark border border-white/5 p-5 rounded-3xl flex items-center gap-5 relative overflow-hidden group shadow-lg"
                        >
                           <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-active:scale-110 transition-transform text-slate-400 group-hover:text-excel-green">
                              <CategoryIcon category={lesson.category} size={28} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-lg truncate text-slate-100">{lesson.title}</h4>
                                {isCompleted && <CheckCircle2 size={16} className="text-excel-green" />}
                              </div>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{lesson.category}</p>
                           </div>
                           <div className={cn(
                             "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                             isCompleted ? "bg-excel-green text-white" : "bg-excel-green/10 text-excel-green group-active:bg-excel-green group-active:text-white"
                           )}>
                              {isCompleted ? <CheckIcon size={20} strokeWidth={3} /> : <Play size={20} fill="currentColor" className="ml-1" />}
                           </div>
                        </motion.div>
                      );
                    })}
                 </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'search' && (
            <motion.div
               key="search"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
            >
               <h2 className="text-3xl font-black mb-8 leading-tight">What do you want to calculate?</h2>
               <div className="relative mb-10">
                  <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
                  <input
                    type="text"
                    placeholder="Search e.g. 'combine text', 'VLOOKUP'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-6 focus:outline-none focus:ring-2 focus:ring-excel-green transition-all text-lg font-medium shadow-2xl"
                  />
               </div>

               <div className="space-y-4">
                  {filteredLessons.slice(0, 15).map((lesson) => (
                    <motion.div
                      key={lesson.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectLesson(lesson)}
                      className="bg-card-dark border border-white/5 p-5 rounded-3xl flex items-center gap-5 active:bg-white/5 transition-all shadow-sm"
                    >
                       <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 text-slate-500">
                          <CategoryIcon category={lesson.category} size={24} />
                       </div>
                       <div className="flex-1">
                          <h4 className="font-bold text-base text-slate-200">{lesson.title}</h4>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">{lesson.category}</p>
                       </div>
                       <ChevronRight size={20} className="text-slate-700" />
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
               key="achievements"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex flex-col items-center"
            >
               <div className="w-24 h-24 bg-excel-green/10 rounded-full flex items-center justify-center mb-6 border-2 border-excel-green/20">
                  <Trophy size={48} className="text-excel-green" />
               </div>
               <h2 className="text-3xl font-black mb-2">Your Trophies</h2>
               <p className="text-slate-500 mb-10">Keep learning to unlock more!</p>

               <div className="grid grid-cols-2 gap-4 w-full">
                  <AchievementCard icon={<Target />} label="First Lesson" description="Complete 1 lesson" completed={completedLessons.length >= 1} />
                  <AchievementCard icon={<Zap />} label="XP Booster" description="Earn 1,000 XP" completed={xp >= 1000} />
                  <AchievementCard icon={<Flame />} label="Hot Streak" description="3 Day Streak" completed={false} />
                  <AchievementCard icon={<Award />} label="Master" description="All basics done" completed={completedLessons.length >= 10} />
               </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
               key="profile"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex flex-col items-center"
            >
               <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-excel-green/20 shadow-2xl">
                     <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=217346&color=fff`} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-excel-green text-white p-1.5 rounded-full border-2 border-bg-dark">
                     <Award size={14} />
                  </div>
               </div>

               <h2 className="text-2xl font-bold mb-1">{user?.displayName || "Excel User"}</h2>
               <p className="text-slate-500 text-sm mb-8">{user?.email}</p>

               <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  <div className="bg-card-dark border border-white/5 p-4 rounded-2xl text-center">
                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Lessons Done</p>
                     <p className="text-xl font-bold">{completedLessons.length}</p>
                  </div>
                  <div className="bg-card-dark border border-white/5 p-4 rounded-2xl text-center">
                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Total XP</p>
                     <p className="text-xl font-bold">{xp}</p>
                  </div>
               </div>

               <div className="w-full space-y-3">
                  <Link href="/about" className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98]">
                     <div className="flex items-center gap-3">
                        <BookOpen size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                        <span className="font-medium text-slate-200">About LearnExcel</span>
                     </div>
                     <ChevronRight size={18} className="text-slate-700" />
                  </Link>
                  <Link href="/support" className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98]">
                     <div className="flex items-center gap-3">
                        <HelpCircleIcon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                        <span className="font-medium text-slate-200">Support & FAQ</span>
                     </div>
                     <ChevronRight size={18} className="text-slate-700" />
                  </Link>
                  <Link href="/donate" className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98]">
                     <div className="flex items-center gap-3">
                        <Heart size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                        <span className="font-medium text-slate-200">Support the Project</span>
                     </div>
                     <ChevronRight size={18} className="text-slate-700" />
                  </Link>

                  <div className="pt-6">
                    <button
                      onClick={logout}
                      className="w-full bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-center gap-3 text-red-500 font-bold active:scale-[0.98]"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </div>
               </div>
               <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="fixed bottom-6 left-6 right-6 h-20 bg-bg-dark/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] px-8 flex items-center justify-between z-40 shadow-2xl overflow-hidden">
         <NavItem icon={<Home size={26} />} active={activeTab === 'home'} onClick={() => { setActiveTab('home'); setCategoryFilter(null); }} />
         <NavItem icon={<SearchIcon size={26} />} active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
         <NavItem icon={<Award size={26} />} active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} />
         <NavItem icon={<Settings size={26} />} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />

         <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-t from-excel-green/20 to-transparent" />
      </nav>
    </div>
  );
}

function NavItem({ icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all relative z-10 ${active ? "text-excel-light" : "text-slate-600 hover:text-slate-400"}`}
    >
       {icon}
       {active && (
         <motion.div
           layoutId="nav-glow"
           className="absolute inset-0 bg-excel-green/10 rounded-2xl blur-md"
         />
       )}
    </button>
  );
}

function CheckIcon({ size, strokeWidth }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AchievementCard({ icon, label, description, completed }) {
  const Icon = icon.type;
  return (
    <div className={cn(
      "p-5 rounded-3xl border text-center transition-all",
      completed ? "bg-excel-green/5 border-excel-green/20" : "bg-white/5 border-white/5 opacity-50 grayscale"
    )}>
       <div className={cn(
         "w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3",
         completed ? "bg-excel-green text-white" : "bg-white/10 text-slate-500"
       )}>
          <Icon size={24} />
       </div>
       <p className="font-bold text-sm text-slate-100 mb-1">{label}</p>
       <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{description}</p>
    </div>
  );
}

function CategoryIcon({ category, size = 20 }) {
  const cat = functionCategories.find(c => c.id === category);
  if (!cat || !cat.icon) return <Layout size={size} />;
  const Icon = cat.icon;
  return <Icon size={size} />;
}
