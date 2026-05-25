"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Home, BookOpen, Search, Trophy, Settings, LogOut, ChevronRight, Menu as MenuIcon, Flame, Zap, Play, CheckCircle2, Target, Award } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import HamburgerMenu from "@/components/layout/HamburgerMenu";
import { excelLessons } from "@/data/lessons";
import { useProgressStore } from "@/hooks/useProgress";
import { useAuthStore } from "@/hooks/useAuth";

export default function HomeDashboard({ onSelectLesson }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState("");

  const { xp, completedLessons } = useProgressStore();
  const { user, logout } = useAuthStore();

  const currentLevel = Math.floor(xp / 500) + 1;
  const xpInLevel = xp % 500;
  const progressPercent = (xpInLevel / 500) * 100;

  const filteredLessons = excelLessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 min-h-screen">
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

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="px-6 pt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <motion.div
                className="relative overflow-hidden bg-gradient-to-br from-excel-green to-excel-dark p-6 rounded-[2rem] shadow-xl shadow-excel-green/20 mb-8"
              >
                 <div className="relative z-10">
                    <p className="text-excel-light font-bold text-xs uppercase tracking-widest mb-1">Current Progress</p>
                    <h2 className="text-2xl font-bold text-white mb-4">Level {currentLevel}</h2>
                    <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden mb-2">
                       <motion.div
                         initial={{ width: 0 }}
                         animate={{ width: `${progressPercent}%` }}
                         className="h-full bg-white rounded-full"
                       />
                    </div>
                    <div className="flex justify-between items-center text-white/80 text-xs font-medium">
                       <span>Beginner</span>
                       <span>{xpInLevel} / 500 XP</span>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              </motion.div>

              <section className="mb-8">
                 <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                    Continue Learning
                    <button onClick={() => setActiveTab('search')} className="text-excel-green text-sm">View all</button>
                 </h3>
                 <div className="space-y-4">
                    {excelLessons.slice(0, 3).map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson)}
                          className="bg-card-dark border border-white/5 p-4 rounded-2xl flex items-center gap-4 active:scale-[0.98] transition-all relative overflow-hidden"
                        >
                           {isCompleted && (
                             <div className="absolute top-0 left-0 w-1 h-full bg-excel-green" />
                           )}
                           <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                              {lesson.category === 'basics' ? '🌱' : lesson.category === 'lookup' ? '🔍' : '📝'}
                           </div>
                           <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm flex items-center gap-2 truncate">
                                {lesson.title}
                                {isCompleted && <CheckCircle2 size={14} className="text-excel-green" />}
                              </h4>
                              <p className="text-xs text-slate-500 line-clamp-1">{lesson.description}</p>
                           </div>
                           <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${isCompleted ? "bg-excel-green text-white" : "bg-excel-green/10 text-excel-green"}`}>
                              {isCompleted ? <CheckIcon size={16} strokeWidth={3} /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </section>

              <section className="mb-8">
                 <h3 className="text-lg font-bold mb-4">Daily Challenges</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                       <div className="bg-purple-500/20 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
                          <Target size={18} className="text-purple-400" />
                       </div>
                       <h4 className="font-bold text-sm mb-1">Formula Quest</h4>
                       <p className="text-[10px] text-slate-500">Solve 3 VLOOKUP cases</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                       <div className="bg-blue-500/20 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
                          <Award size={18} className="text-blue-400" />
                       </div>
                       <h4 className="font-bold text-sm mb-1">Speed Run</h4>
                       <p className="text-[10px] text-slate-500">Finish lesson in 2m</p>
                    </div>
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
               <h2 className="text-2xl font-bold mb-6">Explore Functions</h2>
               <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search e.g. VLOOKUP, SUM, Text..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-excel-green/50 transition-all text-sm"
                  />
               </div>

               <div className="space-y-4">
                  {filteredLessons.length > 0 ? (
                    filteredLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className="bg-card-dark border border-white/5 p-4 rounded-2xl flex items-center gap-4 active:scale-[0.98] transition-all"
                      >
                         <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl">
                            {lesson.category === 'basics' ? '🌱' : lesson.category === 'lookup' ? '🔍' : '📝'}
                         </div>
                         <div className="flex-1">
                            <h4 className="font-bold text-sm flex items-center gap-2">
                              {lesson.title}
                              {completedLessons.includes(lesson.id) && <CheckCircle2 size={14} className="text-excel-green" />}
                            </h4>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{lesson.category}</p>
                         </div>
                         <ChevronRight size={18} className="text-slate-700" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                       <div className="text-4xl mb-4 opacity-20">🔍</div>
                       <p className="text-slate-500">No functions found for "{searchQuery}"</p>
                    </div>
                  )}
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
                  <button className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98]">
                     <div className="flex items-center gap-3">
                        <Settings size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                        <span className="font-medium">Account Settings</span>
                     </div>
                     <ChevronRight size={18} className="text-slate-700" />
                  </button>
                  <button
                    onClick={logout}
                    className="w-full bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-center gap-3 text-red-500 font-bold active:scale-[0.98]"
                  >
                     <LogOut size={20} />
                     Logout
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="fixed bottom-0 inset-x-0 bg-bg-dark/80 backdrop-blur-xl border-t border-white/5 px-8 py-4 flex items-center justify-between z-40">
         <NavItem icon={<Home size={22} />} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
         <NavItem icon={<Search size={22} />} active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
         <NavItem icon={<Award size={22} />} active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} />
         <NavItem icon={<Settings size={22} />} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </nav>
    </div>
  );
}

function NavItem({ icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-xl transition-all relative ${active ? "text-excel-green" : "text-slate-500 hover:text-slate-300"}`}
    >
       {icon}
       {active && (
         <motion.div
           layoutId="nav-indicator"
           className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-excel-green rounded-full shadow-[0_0_8px_#217346]"
         />
       )}
    </button>
  );
}

function CheckIcon({ size, strokeWidth }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
