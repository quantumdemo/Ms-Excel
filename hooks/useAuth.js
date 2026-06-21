import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

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
      // 1. Upsert user into users table
      const { error: upsertError } = await supabase.from('users').upsert({
        id: sbUser.id,
        email: sbUser.email,
        display_name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.display_name,
        photo_url: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.photo_url,
        updated_at: new Date().toISOString()
      });

      if (upsertError) console.error("Upsert user error:", upsertError);

      // 2. Ensure progress record
      const { data: progress } = await supabase
        .from('progress')
        .select('user_id')
        .eq('user_id', sbUser.id)
        .single();

      if (!progress) {
        await supabase.from('progress').insert({
          user_id: sbUser.id,
          xp: 0,
          streak: 0,
          completed_lessons: []
        });
      }

      // 3. Check for approval and admin status (case-insensitive)
      const emailLower = sbUser.email.toLowerCase().trim();
      const [adminCheck, approvedCheck] = await Promise.all([
        supabase.from('admins').select('email').ilike('email', emailLower).maybeSingle(),
        supabase.from('allowed_users').select('email').ilike('email', emailLower).maybeSingle()
      ]);

      const isAdmin = !!adminCheck.data;
      const isApproved = isAdmin || !!approvedCheck.data;


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
      // Note: Redirect will happen here
    } catch (error) {
      console.error("Auth Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  // Supabase uses the same method for everything, but we'll keep the alias for compatibility
  loginWithPopup: () => get().login(),

  logout: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null, isAdmin: false, isApproved: false, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  init: () => {
    // 1. Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await get().syncToSupabase(session.user);
        set({ user: session.user, loading: false });
      } else {
        set({ loading: false });
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await get().syncToSupabase(session.user);
        set({ user: session.user, loading: false });
      } else if (event === 'SIGNED_OUT') {
        set({ user: null, isAdmin: false, isApproved: false, loading: false });
      }
    });

    return () => subscription.unsubscribe();
  }
}));
