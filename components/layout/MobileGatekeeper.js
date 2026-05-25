"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MobileGatekeeper({ children }) {
  const [isMobile, setIsMobile] = useState(true);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      // Mobile breakpoint usually 768px
      setIsMobile(window.innerWidth < 768);
      setChecking(false);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (checking) return null;

  if (!isMobile) {
    return (
      <div className="fixed inset-0 bg-[#0f1117] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Animated Background Cells */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-excel-green w-16 h-8 rounded-sm"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0.3
              }}
              animate={{
                y: [null, "-100vh"],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 max-w-md"
        >
          <div className="relative w-24 h-24 mx-auto mb-8">
             <Image src="/logo.png" alt="LearnExcel Logo" fill className="object-contain" />
          </div>

          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-excel-light to-white">
            Mobile Only Experience
          </h1>

          <p className="text-slate-400 text-lg mb-8">
            LearnExcel is designed specifically for mobile devices to provide the best interactive learning experience.
          </p>

          <div className="relative mx-auto w-48 h-96 border-[6px] border-slate-800 rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl premium-glow">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-800 rounded-b-xl" />
             <div className="flex flex-col items-center justify-center h-full p-4">
                <div className="w-16 h-16 bg-excel-green/20 rounded-xl flex items-center justify-center mb-4">
                   <div className="w-8 h-8 border-2 border-excel-green rounded" />
                </div>
                <div className="w-24 h-2 bg-slate-700 rounded-full mb-2" />
                <div className="w-16 h-2 bg-slate-700 rounded-full" />
             </div>
          </div>

          <div className="mt-10">
            <p className="text-sm text-slate-500 uppercase tracking-widest mb-2">Scan to open</p>
            <div className="w-32 h-32 bg-white p-2 mx-auto rounded-lg shadow-lg">
               {/* Placeholder for QR Code */}
               <div className="w-full h-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-slate-400 text-[10px]">QR CODE</span>
               </div>
            </div>
          </div>

          <p className="mt-12 text-slate-500 font-medium">by Afeez Alimi</p>
        </motion.div>
      </div>
    );
  }

  return children;
}
