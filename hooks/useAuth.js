import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

let isInitialized = false;

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  isApproved: false,
  isAdmin: false,
  error: null,

  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),

  // Internal helper to sync user to Supabase tables
  syncToSupabase: async (sbUser) => {
    if (!sbUser) return;

    try {
      const emailLower = sbUser.email.toLowerCase().trim();

      // Parallelize initial checks and user upsert with timeout protection
      const [upsertRes, progressRes, adminRes, approvedRes] = await Promise.allSettled([
        supabase.from('users').upsert({
          id: sbUser.id,
          email: sbUser.email,
          display_name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.display_name,
          photo_url: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.photo_url,
          updated_at: new Date().toISOString()
        }),
        supabase.from('progress').select('user_id').eq('user_id', sbUser.id).maybeSingle(),
        supabase.from('admins').select('email').ilike('email', emailLower).maybeSingle(),
        supabase.from('allowed_users').select('email').ilike('email', emailLower).maybeSingle()
      ]);

      // Ensure progress record exists if not found
      if (progressRes.status === 'fulfilled' && !progressRes.value.data) {
        supabase.from('progress').insert({
          user_id: sbUser.id,
          xp: 0,
          streak: 0,
          completed_lessons: []
        }).catch(err => console.error("Insert progress error:", err));
      }

      const isAdmin = adminRes.status === 'fulfilled' && !!adminRes.value.data;
      const isApproved = isAdmin || (approvedRes.status === 'fulfilled' && !!approvedRes.value.data);

      set({ isAdmin, isApproved });
    } catch (err) {
      console.error("Error in syncToSupabase:", err);
    }
  },

  login: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error("Auth Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  loginWithPopup: () => get().login(),

  logout: async () => {
    // Clear user state immediately to trigger instantaneous UI transition
    set({ user: null, isAdmin: false, isApproved: false, loading: false });

    try {
      const { useProgressStore } = await import('@/hooks/useProgress');
      useProgressStore.getState().reset();
    } catch (e) {
      console.error("Error resetting progress store:", e);
    }

    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  },

  init: () => {
    // Guarantee loading resolves within 800ms max regardless of network
    const hardTimeout = setTimeout(() => {
      if (get().loading) {
        set({ loading: false });
      }
    }, 800);

    if (!isInitialized) {
      isInitialized = true;

      // 1. Get initial session and resolve loading immediately
      supabase.auth.getSession().then(({ data: { session } }) => {
        clearTimeout(hardTimeout);
        if (session?.user) {
          set({ user: session.user, loading: false });
          get().syncToSupabase(session.user);
        } else {
          set({ user: null, loading: false });
        }
      }).catch((err) => {
        console.error("getSession error:", err);
        clearTimeout(hardTimeout);
        set({ loading: false });
      });

      // 2. Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          set({ user: session.user, loading: false });
          get().syncToSupabase(session.user);
        } else if (event === 'SIGNED_OUT') {
          set({ user: null, isAdmin: false, isApproved: false, loading: false });
        }
      });
    }

    return () => {};
  }
}));
