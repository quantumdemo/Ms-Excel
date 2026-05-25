import { create } from 'zustand';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { googleProvider } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
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
        updated_at: new Date()
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
    } catch (err) {
      console.error("Error syncing user to Supabase:", err);
    }
  },

  login: async () => {
    set({ loading: true, error: null });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await useAuthStore.getState().syncToSupabase(result.user);
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
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  init: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await useAuthStore.getState().syncToSupabase(user);
      }
      set({ user, loading: false });
    });
    return unsubscribe;
  }
}));
