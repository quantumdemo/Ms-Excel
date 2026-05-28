"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

export default function MobileGatekeeper({ children }) {
  const [isMobile, setIsMobile] = useState(true);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
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
      <div className="fixed inset-0 bg-[#0f1117] overflow-y-auto no-scrollbar">
        {/* Futuristic Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-excel-green rounded-full blur-[180px] opacity-20" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-excel-green rounded-full blur-[180px] opacity-20" />

          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-excel-green/20 w-20 h-10 rounded-lg flex items-center justify-center text-[8px] font-mono text-excel-green/40"
              initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
              animate={{ y: ["-10vh", "110vh"], rotate: [0, 360] }}
              transition={{ duration: Math.random() * 30 + 20, repeat: Infinity, ease: "linear" }}
            >
              fx()
            </motion.div>
          ))}
        </div>

        <div className="flex min-h-full items-center justify-center p-6 py-12 md:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 max-w-2xl bg-black/40 backdrop-blur-3xl p-8 md:p-16 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] text-center"
          >
            <div className="relative w-20 h-20 md:w-32 md:h-32 mx-auto mb-8 md:mb-10">
               <Image src="/logo.png" alt="LearnExcel" fill className="object-contain" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-tight">
              Designed for <br/><span className="text-excel-green">Your Smartphone</span>
            </h1>

            <p className="text-slate-400 text-base md:text-xl mb-10 md:mb-12 max-w-md mx-auto leading-relaxed">
              The full LearnExcel experience is optimized for touch-first mobile learning. Please open this page on your mobile device.
            </p>

            <div className="flex flex-col items-center gap-6">
              <p className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.4em]">Scan to open instantly</p>
              <div className="p-4 md:p-6 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl premium-glow relative group">
                <div className="absolute inset-0 bg-excel-green/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white p-2 rounded-2xl">
                  <QRCodeSVG
                    value="https://learn-excel-zeta.vercel.app"
                    size={150}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: "/logo.png",
                      x: undefined,
                      y: undefined,
                      height: 34,
                      width: 34,
                      excavate: true,
                    }}
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none border-2 border-excel-green/10 rounded-[2.5rem]" />
              </div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-6 md:mt-10 text-slate-500 hidden sm:block"
              >
                <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1 mx-auto">
                   <div className="w-1 h-2 bg-slate-500 rounded-full" />
                </div>
              </motion.div>
            </div>

            <p className="mt-12 md:mt-16 text-slate-500 font-bold tracking-widest text-[10px] md:text-xs uppercase">A Premium Interactive Learning Platform</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return children;
}
