"use client";

import { motion } from "framer-motion";
import { ShieldAlert, MessageCircle, LogOut } from "lucide-react";
import { useAuthStore } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AccessDeniedPage() {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const whatsappLink = "https://wa.me/2348140020576?text=Hello,%20I%20would%20like%20to%20request%20access%20to%20LearnExcel.%20My%20email%20is:%20" + (user?.email || "");

  return (
    <div className="h-screen bg-bg-dark flex flex-col items-center justify-center p-10 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-red-500 rounded-full blur-[140px] opacity-10" />
         <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-red-500 rounded-full blur-[140px] opacity-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-sm">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20"
        >
          <ShieldAlert size={48} className="text-red-500" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-black mb-4 text-center leading-tight tracking-tight text-white"
        >
          Access Denied
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-center text-lg leading-relaxed mb-10"
        >
          Your account is not yet approved to access this platform. Please contact the administrator for access.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-4"
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg"
          >
            <MessageCircle size={24} />
            Contact Admin
          </a>

          <button
            onClick={handleLogout}
            className="w-full bg-white/5 text-white font-bold py-5 rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all border border-white/10"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </motion.div>
      </div>

      <p className="text-center text-slate-600 text-[10px] mt-10 px-10 leading-relaxed font-bold uppercase tracking-wider relative z-10">
        LEARNEXCELAI PREMIUM ACCESS CONTROL
      </p>
    </div>
  );
}
