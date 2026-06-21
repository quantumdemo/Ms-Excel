"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  UserMinus,
  Search,
  ShieldCheck,
  ChevronLeft,
  X,
  Mail,
  Loader2,
  Trash2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuthStore();
  const router = useRouter();
  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/");
    } else if (isAdmin) {
      fetchEmails();
    }
  }, [isAdmin, authLoading, router]);

  const fetchEmails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("allowed_users")
      .select("*")
      .order("added_at", { ascending: false });

    if (error) {
      showMessage("error", "Failed to fetch users");
    } else {
      setEmails(data);
    }
    setLoading(false);
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (!newEmail) return;

    setActionLoading(true);
    const { error } = await supabase
      .from("allowed_users")
      .insert([{ email: newEmail.toLowerCase().trim() }]);

    if (error) {
      if (error.code === "23505") {
        showMessage("error", "User already exists");
      } else {
        showMessage("error", "Failed to add user");
      }
    } else {
      showMessage("success", "User added successfully");
      setNewEmail("");
      fetchEmails();
    }
    setActionLoading(false);
  };

  const removeUser = async (email) => {
    if (!confirm(`Are you sure you want to remove ${email}?`)) return;

    setActionLoading(true);
    const { error } = await supabase
      .from("allowed_users")
      .delete()
      .eq("email", email);

    if (error) {
      showMessage("error", "Failed to remove user");
    } else {
      showMessage("success", "User removed successfully");
      fetchEmails();
    }
    setActionLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const filteredEmails = emails.filter(e =>
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || !isAdmin) {
    return (
      <div className="h-screen bg-bg-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-excel-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col text-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 px-6 py-5 bg-bg-dark/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 -ml-2 rounded-xl active:bg-white/5"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black tracking-tight">Admin Portal</h1>
        </div>
        <div className="bg-excel-green/10 text-excel-green px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-excel-green/20">
          Admin Mode
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
        {/* Stats */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem]">
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Users</div>
            <div className="text-3xl font-black">{emails.length}</div>
          </div>
          <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem]">
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Status</div>
            <div className="text-xl font-black text-excel-green flex items-center gap-2">
              <ShieldCheck size={20} /> Secure
            </div>
          </div>
        </section>

        {/* Add User */}
        <section className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 px-2">Add Approved User</h2>
          <form onSubmit={addUser} className="relative">
            <input
              type="email"
              placeholder="Enter email address..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 px-6 pr-16 focus:outline-none focus:border-excel-green/50 transition-all text-sm"
            />
            <button
              type="submit"
              disabled={actionLoading || !newEmail}
              className="absolute right-2 top-2 bottom-2 w-12 bg-excel-green text-white rounded-full flex items-center justify-center active:scale-90 transition-all disabled:opacity-50"
            >
              {actionLoading ? <Loader2 size={20} className="animate-spin" /> : <UserPlus size={20} />}
            </button>
          </form>
        </section>

        {/* Search & List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Approved List</h2>
            <div className="relative">
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
               <input
                 type="text"
                 placeholder="Search..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-excel-green/50 transition-all"
               />
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredEmails.map((item) => (
                <motion.div
                  key={item.email}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold truncate max-w-[180px]">{item.email}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tight">
                        Added {new Date(item.added_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeUser(item.email)}
                    className="p-3 text-red-500 bg-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 active:scale-90 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredEmails.length === 0 && !loading && (
              <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[3rem]">
                <Users size={40} className="mx-auto text-slate-700 mb-4" />
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">No users found</p>
              </div>
            )}

            {loading && (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-excel-green animate-spin" />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Floating Notification */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-[2rem] font-bold text-sm z-50 flex items-center gap-3 backdrop-blur-xl border ${
              message.type === "success"
                ? "bg-excel-green/10 text-excel-green border-excel-green/20"
                : "bg-red-500/10 text-red-500 border-red-500/20"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${message.type === "success" ? "bg-excel-green" : "bg-red-500"} animate-pulse`} />
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
