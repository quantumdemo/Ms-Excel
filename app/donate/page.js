"use client";

import InfoPageLayout from "@/components/layout/InfoPageLayout";
import { Coffee, Heart, Globe, CreditCard, Banknote } from "lucide-react";
import { motion } from "framer-motion";

export default function DonatePage() {
  return (
    <InfoPageLayout title="Support the Project">
      <div className="space-y-10">
        <section className="text-center relative">
          <div className="absolute inset-0 bg-excel-green blur-[100px] opacity-10 rounded-full" />
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-excel-green/20 text-excel-green rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
          >
            <Heart fill="currentColor" size={40} />
          </motion.div>
          <h2 className="text-3xl font-black mb-4 relative z-10">Keep LearnExcel Free</h2>
          <p className="text-slate-500 text-lg leading-relaxed relative z-10">
            We're on a mission to make Excel mastery accessible to everyone, regardless of where they are in the world.
          </p>
        </section>

        <section className="grid gap-6">
           <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Globe size={16} className="text-blue-500" />
                 International
              </h3>
              <div className="space-y-3">
                 <DonationButton icon={<Coffee size={18} />} label="Buy Me a Coffee" sub="Small tip" />
                 <DonationButton icon={<CreditCard size={18} />} label="PayPal / Stripe" sub="Custom amount" />
              </div>
           </div>

           <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Banknote size={16} className="text-excel-green" />
                 Nigeria (Paystack)
              </h3>
              <div className="space-y-3">
                 <DonationButton icon={<span>🇳🇬</span>} label="Local Bank Transfer" sub="Opay / Moniepoint" />
                 <DonationButton icon={<span>📱</span>} label="PalmPay / Paystack" sub="Instant support" />
              </div>
           </div>
        </section>

        <section className="bg-excel-green/10 border border-excel-green/20 p-8 rounded-[2.5rem]">
           <h3 className="font-bold text-xl mb-4">Where does it go?</h3>
           <ul className="space-y-4">
              {['Server & Hosting Costs', 'Interactive Engine Development', 'Free Content Creation', 'Community Support'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-400 text-sm">
                   <div className="w-1.5 h-1.5 bg-excel-green rounded-full" />
                   {item}
                </li>
              ))}
           </ul>
        </section>

        <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest pb-10">
           Thank you for being part of our story.
        </p>
      </div>
    </InfoPageLayout>
  );
}

function DonationButton({ icon, label, sub }) {
  return (
    <button className="w-full flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 active:scale-[0.98] transition-all">
       <div className="flex items-center gap-4 text-left">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-300">
             {icon}
          </div>
          <div>
             <p className="font-bold text-slate-200 text-sm">{label}</p>
             <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
          </div>
       </div>
       <ChevronRight size={16} className="text-slate-700" />
    </button>
  );
}

function ChevronRight({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
