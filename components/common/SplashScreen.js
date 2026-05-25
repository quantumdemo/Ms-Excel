"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bg-dark flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-32 h-32 mb-6"
      >
        <div className="absolute inset-0 bg-excel-green/20 blur-3xl rounded-full" />
        <Image
          src="/logo.png"
          alt="LearnExcel Logo"
          fill
          className="object-contain relative z-10"
        />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
      >
        LearnExcel
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-4 text-slate-500 text-sm font-medium tracking-widest uppercase"
      >
        by Afeez Alimi
      </motion.p>

      <motion.div
        className="absolute bottom-12 w-12 h-1 bg-white/10 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-excel-green"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
