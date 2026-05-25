"use client";

import { motion } from "framer-motion";
import { LogIn, Sparkles } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/hooks/useAuth";

export default function AuthScreen() {
  const { login, loading, error } = useAuthStore();

  return (
    <div className="h-screen bg-bg-dark flex flex-col items-center justify-between p-10 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-excel-green rounded-full blur-[140px] opacity-20" />
         <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-excel-green rounded-full blur-[140px] opacity-20" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className="relative w-32 h-32 mb-10"
        >
          <div className="absolute inset-0 bg-excel-green blur-[40px] opacity-30 rounded-full" />
          <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-black mb-6 text-center leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500"
        >
          Master Excel <br/> Like a Pro
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 text-center text-xl max-w-[280px] leading-relaxed mb-10"
        >
          Interactive lessons, real practice, professional results.
        </motion.p>

        {error && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 bg-red-500/10 border border-red-500/20 rounded-[2rem] text-red-500 text-sm font-bold flex items-center gap-3 backdrop-blur-xl"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            {error}
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", damping: 20 }}
        className="w-full pb-10 relative z-10"
      >
        <div className="flex flex-col gap-4">
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-white text-black font-black py-6 rounded-[2.5rem] flex items-center justify-center gap-4 active:scale-95 transition-all disabled:opacity-50 shadow-[0_20px_40px_rgba(255,255,255,0.1)] relative overflow-hidden group"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/0/google.svg" alt="Google" width={24} height={24} />
            {loading ? "Authenticating..." : "Sign in with Google"}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-active:opacity-100 transition-opacity" />
          </button>

          <div className="flex items-center justify-center gap-2 text-slate-600 font-bold text-[10px] uppercase tracking-widest mt-4">
             <Sparkles size={14} className="text-excel-green" />
             Join 10,000+ Students
          </div>
        </div>

        <p className="text-center text-slate-700 text-[10px] mt-10 px-10 leading-relaxed font-bold uppercase tracking-wider">
          BY CREATING AN ACCOUNT, YOU AGREE TO OUR TERMS AND PRIVACY POLICY.
        </p>
      </motion.div>
    </div>
  );
}
