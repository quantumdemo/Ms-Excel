"use client";

import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/hooks/useAuth";

export default function AuthScreen() {
  const { login, loading, error } = useAuthStore();

  return (
    <div className="h-screen bg-bg-dark flex flex-col items-center justify-between p-8 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-excel-green rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-excel-green rounded-full blur-[120px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative w-28 h-28 mb-8"
        >
          <div className="absolute inset-0 bg-excel-green/20 blur-2xl rounded-full" />
          <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
        </motion.div>

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
        >
          Master Excel
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-center text-lg max-w-[280px]"
        >
          The most interactive way to learn Excel on your phone.
        </motion.p>

        {error && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            {error}
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="w-full pb-12 relative z-10"
      >
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-white text-black font-bold py-5 rounded-[2rem] flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 shadow-2xl shadow-white/10"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/0/google.svg" alt="Google" width={22} height={22} />
          {loading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="text-center text-slate-500 text-[11px] mt-8 px-6 leading-relaxed opacity-60">
          By continuing, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </motion.div>
    </div>
  );
}
