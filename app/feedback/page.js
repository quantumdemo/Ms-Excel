"use client";

import InfoPageLayout from "@/components/layout/InfoPageLayout";
import { Star, MessageCircle, Zap, Vote } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const roadmapFeatures = [
  { id: 'ai', name: "AI Formula Tutor", votes: 450 },
  { id: 'cert', name: "Shareable Certificates", votes: 320 },
  { id: 'offline', name: "Full Offline Mode", votes: 210 },
  { id: 'board', name: "Global Leaderboards", votes: 180 },
];

export default function FeedbackPage() {
  const [rating, setStarRating] = useState(0);
  const [voted, setVoted] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleVote = (id) => {
    setVoted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <InfoPageLayout title="Feedback">
      <div className="space-y-12">
        <section className="text-center">
          <h2 className="text-2xl font-black mb-2">How's your experience?</h2>
          <p className="text-slate-500 text-sm mb-6">Your feedback shapes the future of LearnExcel.</p>

          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setStarRating(i)}
                className="p-1"
              >
                <Star
                  size={40}
                  fill={i <= rating ? "#217346" : "none"}
                  className={i <= rating ? "text-excel-green" : "text-slate-700"}
                />
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem]">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="text-excel-green" size={20} />
              Drop a Review
           </h3>

           {submitted ? (
              <div className="text-center py-6">
                 <p className="text-excel-green font-black">Thank you for your feedback!</p>
              </div>
           ) : (
             <div className="space-y-5">
               <div className="grid grid-cols-2 gap-3">
                  {['Lesson Quality', 'Practice Engine', 'App Speed', 'UX Design'].map(cat => (
                    <button key={cat} className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                       {cat}
                    </button>
                  ))}
               </div>
               <textarea
                 rows={4}
                 placeholder="What can we do better?"
                 className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-excel-green"
               />
               <button
                 onClick={() => setSubmitted(true)}
                 className="w-full bg-excel-green text-white font-black py-4 rounded-[2rem] shadow-lg"
               >
                  Submit Feedback
               </button>
             </div>
           )}
        </section>

        <section>
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Vote className="text-excel-green" size={20} />
              Vote for Features
           </h3>
           <div className="space-y-3">
              {roadmapFeatures.map(feature => (
                <button
                  key={feature.id}
                  onClick={() => toggleVote(feature.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all ${
                    voted.includes(feature.id)
                      ? "bg-excel-green/10 border-excel-green shadow-lg shadow-excel-green/10"
                      : "bg-white/5 border-white/5"
                  }`}
                >
                   <span className="font-bold text-slate-200">{feature.name}</span>
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">{feature.votes + (voted.includes(feature.id) ? 1 : 0)}</span>
                      <Zap size={16} fill={voted.includes(feature.id) ? "#217346" : "none"} className={voted.includes(feature.id) ? "text-excel-green" : "text-slate-700"} />
                   </div>
                </button>
              ))}
           </div>
        </section>
      </div>
    </InfoPageLayout>
  );
}
