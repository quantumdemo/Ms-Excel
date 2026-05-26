"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InfoPageLayout({ title, children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col">
      <header className="sticky top-0 z-40 px-6 py-5 bg-bg-dark/80 backdrop-blur-xl border-b border-white/5 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-xl active:bg-white/5"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-black tracking-tight">{title}</h1>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-6 pb-20 no-scrollbar overflow-y-auto"
      >
        {children}
      </motion.main>
    </div>
  );
}
