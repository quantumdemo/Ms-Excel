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
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.83c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335"/>
            </svg>
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
