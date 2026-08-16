"use client";

import InfoPageLayout from "@/components/layout/InfoPageLayout";
import { HelpCircle, MessageSquare, ShieldAlert, Zap, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/hooks/useAuth";

const faqs = [
  { q: "How do I reset my progress?", a: "Go to Settings > Account and select 'Clear Cache' or contact support for full account reset." },
  { q: "Why is login failing?", a: "Ensure you have a stable internet connection and are using a valid Google account." },
  { q: "How do streaks work?", a: "Complete at least one lesson every 24 hours to keep your streak alive!" },
  { q: "Can I use LearnExcelAI offline?", a: "As a PWA, basic functionality is available offline once cached, but progress sync requires a connection." },
];

export default function SupportPage() {
  const { user } = useAuthStore();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState("Other");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert("Please enter a message.");
    setSubmitting(true);

    try {
      const fullMessage = name ? `Sender: ${name}\n\n${message}` : message;

      const { error } = await supabase.from('feedback').insert({
        user_id: user?.uid || null,
        category: `Support: ${category}`,
        message: fullMessage,
        rating: 0 // Default for support messages
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <InfoPageLayout title="Support Center">
      <div className="space-y-12">
        {/* FAQ Section */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="text-excel-green" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-3xl">
                <h3 className="font-bold text-slate-200 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-card-dark border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-2xl font-black mb-2">Get in Touch</h2>
          <p className="text-slate-500 text-sm mb-8">Can't find what you're looking for? Message us.</p>

          {submitted ? (
            <div className="text-center py-10">
               <div className="w-16 h-16 bg-excel-green/20 text-excel-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap fill="currentColor" size={32} />
               </div>
               <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
               <p className="text-slate-500 text-sm">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-2">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-excel-green outline-none"
                >
                  <option>Login Problem</option>
                  <option>Lesson Content Issue</option>
                  <option>Bug Report</option>
                  <option>Feature Suggestion</option>
                  <option>Other</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-excel-green"
              />
              <textarea
                rows={4}
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-excel-green"
              />
              <button
                disabled={submitting}
                className="w-full bg-excel-green text-white font-black py-5 rounded-[2rem] active:scale-95 transition-all shadow-xl shadow-excel-green/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting && <Loader2 className="animate-spin" size={20} />}
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </section>

        {/* Community Placeholder */}
        <section className="text-center pb-10">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.3em] mb-4">Join the Community</p>
          <div className="flex justify-center gap-4">
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 grayscale opacity-50">
                <MessageSquare size={20} />
             </div>
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 grayscale opacity-50">
                <ShieldAlert size={20} />
             </div>
          </div>
          <p className="text-[10px] text-slate-700 mt-4 font-bold italic">Forums & Discord coming soon</p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
