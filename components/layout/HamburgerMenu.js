"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X, Home, BookOpen, Search, Trophy, Settings, LogOut,
  ChevronRight, Layout, BrainCircuit, Calculator, Type,
  Zap, Landmark, Rocket, Calendar
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/hooks/useAuth";
import { useProgressStore } from "@/hooks/useProgress";

const categories = [
  { id: 'foundations', title: 'Basics', icon: Layout },
  { id: 'logical', title: 'Logical Functions', icon: BrainCircuit },
  { id: 'math', title: 'Math & Stats', icon: Calculator },
  { id: 'lookup', title: 'Lookup & Reference', icon: Search },
  { id: 'text', title: 'Text Functions', icon: Type },
  { id: 'dynamic-array', title: 'Dynamic Arrays', icon: Zap },
  { id: 'financial', title: 'Financial', icon: Landmark },
  { id: 'date-time', title: 'Date & Time', icon: Calendar },
];

export default function HamburgerMenu({ isOpen, onClose, onSelectCategory, setActiveTab, activeTab, categoryFilter }) {
  const { user, logout } = useAuthStore();
  const { xp } = useProgressStore();
  const currentLevel = Math.floor(xp / 500) + 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-bg-dark z-[90] flex flex-col border-r border-white/5 shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <span className="font-bold text-xl">LearnExcel</span>
              </div>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full active:scale-90 transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-6">
              <div className="px-6 mb-8">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-excel-green flex-shrink-0 bg-slate-800">
                    <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=217346&color=fff`} alt="Avatar" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm leading-none mb-1 truncate">{user?.displayName || "Excel Explorer"}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Lvl {currentLevel} {currentLevel > 5 ? 'Wizard' : 'Beginner'}</p>
                  </div>
                </div>
              </div>

              <nav className="px-4 space-y-1">
                 <MenuLink
                   icon={<Home size={20} />}
                   label="Home"
                   active={activeTab === 'home'}
                   onClick={() => { setActiveTab('home'); onSelectCategory(null); onClose(); }}
                 />
                 <MenuLink
                   icon={<Search size={20} />}
                   label="Search Functions"
                   active={activeTab === 'search'}
                   onClick={() => { setActiveTab('search'); onClose(); }}
                 />
                 <MenuLink
                   icon={<Trophy size={20} />}
                   label="Achievements"
                   active={activeTab === 'achievements'}
                   onClick={() => { setActiveTab('achievements'); onClose(); }}
                 />

                 <div className="pt-6 pb-2 px-4">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Learning Roadmap</p>
                 </div>

                 {categories.map((cat) => (
                    <MenuLink
                      key={cat.id}
                      icon={(() => {
                        const Icon = cat.icon;
                        return <Icon size={20} />;
                      })()}
                      label={cat.title}
                      active={categoryFilter === cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      showChevron
                    />
                 ))}
              </nav>
            </div>

            <div className="p-6 border-t border-white/5 space-y-1">
              <MenuLink
                icon={<Settings size={20} />}
                label="Settings"
                active={activeTab === 'profile'}
                onClick={() => { setActiveTab('profile'); onClose(); }}
              />
              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-colors active:scale-[0.98]"
              >
                 <LogOut size={20} />
                 <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuLink({ icon, label, active, onClick, showChevron }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all active:scale-[0.98] group ${
        active ? "bg-excel-green/10 text-excel-green font-bold border border-excel-green/20 shadow-sm shadow-excel-green/5" : "text-slate-400 hover:bg-white/5"
      }`}
    >
      <div className={active ? "text-excel-green" : "text-slate-500 group-hover:text-excel-green transition-colors"}>
        {icon}
      </div>
      <span className="flex-1 text-left">{label}</span>
      {showChevron && (
        <ChevronRight size={16} className={`${active ? "text-excel-green" : "text-slate-600"} group-hover:translate-x-1 transition-transform`} />
      )}
    </button>
  );
}
