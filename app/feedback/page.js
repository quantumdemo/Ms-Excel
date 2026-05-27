"use client";

import InfoPageLayout from "@/components/layout/InfoPageLayout";
import { Star, MessageCircle, Zap, Vote, Loader2, Frown, Meh, Smile, Star as StarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const roadmapFeatures = [
  { id: 'ai-tutor', name: "AI Formula Tutor" },
  { id: 'certificates', name: "Shareable Certificates" },
  { id: 'offline-mode', name: "Full Offline Mode" },
  { id: 'leaderboards', name: "Global Leaderboards" },
  { id: 'mock-exams', name: "Professional Mock Exams" },
];

export default function FeedbackPage() {
  const { user } = useAuthStore();
  const [rating, setStarRating] = useState(0);
  const [selectedCat, setSelectedCat] = useState('Lesson Quality');
  const [message, setMessage] = useState("");
  const [votedIds, setVotedIds] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    fetchVotes();
    if (user) fetchUserVotes();
  }, [user]);

  const fetchVotes = async () => {
    const { data } = await supabase.from('feature_votes').select('feature_id');
    if (data) {
      const counts = data.reduce((acc, v) => {
        acc[v.feature_id] = (acc[v.feature_id] || 0) + 1;
        return acc;
      }, {});
      setVoteCounts(counts);
    }
  };

  const fetchUserVotes = async () => {
    const { data } = await supabase.from('feature_votes').select('feature_id').eq('user_id', user.uid);
    if (data) setVotedIds(data.map(v => v.feature_id));
  };

  const handleVote = async (featureId) => {
    if (!user) return alert("Please sign in to vote!");

    if (votedIds.includes(featureId)) {
      await supabase.from('feature_votes').delete().eq('user_id', user.uid).eq('feature_id', featureId);
      setVotedIds(prev => prev.filter(id => id !== featureId));
    } else {
      await supabase.from('feature_votes').insert({ user_id: user.uid, feature_id: featureId });
      setVotedIds(prev => [...prev, featureId]);
    }
    fetchVotes();
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) return alert("Please select a star rating!");
    setSubmitting(true);

    try {
      await supabase.from('feedback').insert({
        user_id: user?.uid || null,
        rating,
        category: selectedCat,
        message
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <InfoPageLayout title="Feedback & Roadmap">
      <div className="space-y-12">
        <section className="text-center">
          <h2 className="text-2xl font-black mb-2">How's your experience?</h2>
          <p className="text-slate-500 text-sm mb-8">Your feedback shapes the future of LearnExcel.</p>

          <div className="flex justify-between max-w-xs mx-auto mb-8">
            {[
              { v: 1, icon: Frown, color: "text-red-400", l: 'Poor' },
              { v: 2, icon: Meh, color: "text-orange-400", l: 'Average' },
              { v: 3, icon: Smile, color: "text-blue-400", l: 'Good' },
              { v: 4, icon: StarIcon, color: "text-excel-green", l: 'Excellent' }
            ].map((i) => (
              <button
                key={i.v}
                onClick={() => setStarRating(i.v)}
                className="flex flex-col items-center gap-2 transition-all active:scale-90"
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border",
                  rating === i.v ? `bg-white/10 border-white/20 scale-110 ${i.color}` : "bg-white/5 border-transparent opacity-40 grayscale hover:opacity-100"
                )}>
                  <i.icon size={28} />
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  rating === i.v ? i.color : "text-slate-600"
                )}>{i.l}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="text-excel-green" size={20} />
              Drop a Review
           </h3>

           {submitted ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-6">
                 <div className="w-16 h-16 bg-excel-green/20 text-excel-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap fill="currentColor" />
                 </div>
                 <p className="text-excel-green font-black text-lg">Feedback Received!</p>
                 <p className="text-slate-500 text-xs mt-2 font-bold uppercase tracking-widest">Thank you for helping us grow.</p>
              </motion.div>
           ) : (
             <div className="space-y-6">
               <div className="grid grid-cols-2 gap-3">
                  {['Lesson Quality', 'Practice Engine', 'App Speed', 'UX Design'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      className={`p-3 rounded-2xl border transition-all text-[10px] font-bold uppercase tracking-widest ${
                        selectedCat === cat ? "bg-excel-green border-excel-green text-white" : "bg-white/5 border-white/10 text-slate-500"
                      }`}
                    >
                       {cat}
                    </button>
                  ))}
               </div>
               <textarea
                 rows={4}
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 placeholder="Tell us what you think..."
                 className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm outline-none focus:ring-2 focus:ring-excel-green text-slate-200"
               />
               <button
                 onClick={handleSubmitFeedback}
                 disabled={submitting}
                 className="w-full bg-excel-green text-white font-black py-5 rounded-[2.5rem] shadow-xl shadow-excel-green/20 flex items-center justify-center gap-3 disabled:opacity-50"
               >
                  {submitting && <Loader2 className="animate-spin" size={20} />}
                  {submitting ? "Sending..." : "Submit Feedback"}
               </button>
             </div>
           )}
        </section>

        <section>
           <div className="mb-6">
             <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
                <Vote className="text-excel-green" size={20} />
                Feature Roadmap
             </h3>
             <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-1">Vote for what comes next</p>
           </div>

           <div className="space-y-3">
              {roadmapFeatures.map(feature => (
                <button
                  key={feature.id}
                  onClick={() => handleVote(feature.id)}
                  className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all ${
                    votedIds.includes(feature.id)
                      ? "bg-excel-green/10 border-excel-green shadow-lg shadow-excel-green/10"
                      : "bg-white/5 border-white/5"
                  }`}
                >
                   <span className="font-bold text-slate-200">{feature.name}</span>
                   <div className="flex items-center gap-3">
                      <span className="text-sm font-black font-mono text-slate-500">
                        {voteCounts[feature.id] || 0}
                      </span>
                      <div className={`p-2 rounded-xl transition-all ${votedIds.includes(feature.id) ? "bg-excel-green text-white" : "bg-white/10 text-slate-700"}`}>
                        <Zap size={16} fill={votedIds.includes(feature.id) ? "white" : "none"} />
                      </div>
                   </div>
                </button>
              ))}
           </div>
        </section>
      </div>
    </InfoPageLayout>
  );
}
