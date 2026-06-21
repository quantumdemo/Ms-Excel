import { create } from 'zustand';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { googleProvider } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  isApproved: false,
  isAdmin: false,
  error: null,

  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),

  // Internal helper to sync Firebase user to Supabase
  syncToSupabase: async (firebaseUser) => {
    if (!firebaseUser) return;

    try {
      // Upsert user into Supabase users table
      await supabase.from('users').upsert({
        id: firebaseUser.uid,
        email: firebaseUser.email,
        display_name: firebaseUser.displayName,
        photo_url: firebaseUser.photoURL,
        updated_at: new Date().toISOString()
      });

      // Ensure a progress record exists for the user
      const { data: progress } = await supabase
        .from('progress')
        .select('user_id')
        .eq('user_id', firebaseUser.uid)
        .single();

      if (!progress) {
        await supabase.from('progress').insert({
          user_id: firebaseUser.uid,
          xp: 0,
          streak: 0,
          completed_lessons: []
        });
      }

      // Check for approval and admin status
      const [adminCheck, approvedCheck] = await Promise.all([
        supabase.from('admins').select('email').eq('email', firebaseUser.email).single(),
        supabase.from('allowed_users').select('email').eq('email', firebaseUser.email).single()
      ]);

      const isAdmin = !!adminCheck.data;
      const isApproved = isAdmin || !!approvedCheck.data;

      set({ isAdmin, isApproved });
    } catch (err) {
      console.error("Error syncing user to Supabase:", err);
    }
  },

  login: async () => {
    set({ loading: true, error: null });
    if (!auth || !googleProvider) {
      const errorMsg = "Authentication is not properly initialized. Check your environment variables.";
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await get().syncToSupabase(result.user);
      set({ user: result.user, loading: false });
      return result.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await signOut(auth);
      set({ user: null, isAdmin: false, isApproved: false, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  init: () => {
    if (!auth) return () => {};
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await get().syncToSupabase(user);
      } else {
        set({ isAdmin: false, isApproved: false });
      }
      set({ user, loading: false });
    });
    return unsubscribe;
  }
}));
