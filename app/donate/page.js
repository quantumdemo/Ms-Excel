"use client";

import InfoPageLayout from "@/components/layout/InfoPageLayout";
import { Coffee, Heart, Globe, CreditCard, Banknote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const DONATION_LINKS = {
  coffee: process.env.NEXT_PUBLIC_DONATE_COFFEE || "#",
  paypal: process.env.NEXT_PUBLIC_DONATE_PAYPAL || "#",
  paystack: process.env.NEXT_PUBLIC_DONATE_PAYSTACK || "#",
  opay: "7032749455" // Sample account or handled via Paystack
};

export default function DonatePage() {
  const openLink = (url) => {
    if (url === "#") return alert("Payment link coming soon!");
    window.open(url, "_blank");
  };

  return (
    <InfoPageLayout title="Support the Project">
      <div className="space-y-12">
        <section className="text-center relative py-6">
          <div className="absolute inset-0 bg-excel-green blur-[120px] opacity-10 rounded-full" />
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-28 h-28 bg-excel-green/20 text-excel-green rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 relative z-10 shadow-2xl"
          >
            <Heart fill="currentColor" size={48} />
          </motion.div>
          <h2 className="text-4xl font-black mb-4 relative z-10 leading-tight">Keep LearnExcel <br/><span className="text-excel-green font-black">100% Free</span></h2>
          <p className="text-slate-500 text-lg leading-relaxed relative z-10 px-4">
            Join the community in making professional Excel education accessible to everyone, everywhere.
          </p>
        </section>

        <section className="grid gap-8">
           <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Globe size={80} />
              </div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                 International Support
              </h3>
              <div className="space-y-4 relative z-10">
                 <DonationButton
                   onClick={() => openLink(DONATION_LINKS.coffee)}
                   icon={<Coffee size={20} className="text-orange-400" />}
                   label="Buy Me a Coffee"
                   sub="Small one-time support"
                 />
                 <DonationButton
                   onClick={() => openLink(DONATION_LINKS.paypal)}
                   icon={<CreditCard size={20} className="text-blue-400" />}
                   label="PayPal / Stripe"
                   sub="Custom donation amount"
                 />
              </div>
           </div>

           <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Banknote size={80} className="text-excel-green" />
              </div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                 Nigeria (Paystack / Transfer)
              </h3>
              <div className="space-y-4 relative z-10">
                 <DonationButton
                   onClick={() => openLink(DONATION_LINKS.paystack)}
                   icon={<span>🇳🇬</span>}
                   label="Paystack Instant"
                   sub="Debit Card / USSD / Transfer"
                 />
                 <div className="p-5 bg-black/40 rounded-3xl border border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Bank Transfer</p>
                    <div className="flex justify-between items-center">
                       <div>
                          <p className="text-white font-black text-sm">7032749455</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Opay / Moniepoint</p>
                       </div>
                       <div className="px-3 py-1 bg-excel-green/10 text-excel-green rounded-lg text-[10px] font-black uppercase">
                          Copy
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <section className="bg-gradient-to-br from-excel-green/20 to-transparent border border-excel-green/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-excel-green" size={24} />
              <h3 className="font-black text-xl text-white">Impact Wall</h3>
           </div>
           <ul className="space-y-5">
              {[
                { title: 'Free Learning', desc: 'Keep high-quality lessons free for everyone.' },
                { title: 'Server Costs', desc: 'Cover hosting and database infrastructure.' },
                { title: 'Engine R&D', desc: 'Improve the interactive spreadsheet engine.' }
              ].map(item => (
                <li key={item.title} className="flex gap-4">
                   <div className="w-1.5 h-1.5 bg-excel-green rounded-full mt-2" />
                   <div>
                      <p className="font-bold text-slate-200 text-sm leading-tight mb-1">{item.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                   </div>
                </li>
              ))}
           </ul>
        </section>

        <div className="text-center pb-12">
           <p className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.4em] mb-4">
              A community driven project
           </p>
           <p className="text-[10px] text-slate-600 italic">
              "We rise by lifting others."
           </p>
        </div>
      </div>
    </InfoPageLayout>
  );
}

function DonationButton({ icon, label, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 bg-black/40 rounded-[1.5rem] border border-white/5 active:scale-[0.98] transition-all hover:bg-white/5 group shadow-sm"
    >
       <div className="flex items-center gap-5 text-left">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-excel-green group-hover:text-white transition-all">
             {icon}
          </div>
          <div>
             <p className="font-black text-slate-100 text-sm">{label}</p>
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{sub}</p>
          </div>
       </div>
       <ChevronRight size={18} className="text-slate-700 group-hover:text-excel-green group-hover:translate-x-1 transition-all" />
    </button>
  );
}

function ChevronRight({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
