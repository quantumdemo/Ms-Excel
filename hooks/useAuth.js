import { create } from 'zustand';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
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

  login: async (method = 'auto') => {
    set({ loading: true, error: null });
    if (!auth || !googleProvider) {
      const errorMsg = "Authentication is not properly initialized. Please contact admin.";
      set({ error: errorMsg, loading: false });
      return;
    }

    try {
      // Auto-detect best method if not specified
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const useRedirect = method === 'redirect' || (method === 'auto' && isMobile);

      if (useRedirect) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        await get().syncToSupabase(result.user);
        set({ user: result.user, loading: false });
        return result.user;
      }
    } catch (error) {
      console.error("Auth Error:", error);
      let errorMessage = error.message;
      if (error.code === 'auth/popup-blocked') errorMessage = "Popup blocked. Use the 'Alternative Sign-in' below.";
      if (error.code === 'auth/network-request-failed') errorMessage = "Connection failed. Please check your internet.";
      if (error.code === 'auth/unauthorized-domain') errorMessage = "This domain is not authorized. Check Firebase Console.";

      set({ error: errorMessage, loading: false });
    }
  },

  // Helper for explicit fallback
  loginWithPopup: () => get().login('popup'),

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

    // Handle redirect result
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        await get().syncToSupabase(result.user);
        set({ user: result.user, loading: false });
      }
    }).catch((error) => {
      console.error("Redirect auth error:", error);
      set({ error: error.message, loading: false });
    });

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
