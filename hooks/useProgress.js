import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export const useProgressStore = create(
  persist(
    (set, get) => ({
  xp: 0,
  streak: 0,
  completedLessons: [],
  loading: false,

  fetchProgress: async (userId) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) {
        const { xp, completedLessons } = get();
        // Sync local with server: use server data but ensure local data isn't lost
        // (assuming server is source of truth but local might be ahead during offline/sync)
        set({
          xp: Math.max(xp, data.xp),
          streak: Math.max(0, data.streak),
          completedLessons: Array.from(new Set([...completedLessons, ...(data.completed_lessons || [])]))
        });
      }
    } catch (err) {
      console.error("Error fetching progress:", err);
    } finally {
      set({ loading: false });
    }
  },

  completeLesson: async (userId, lessonId, points) => {
    const { xp, completedLessons } = get();

    if (completedLessons.includes(lessonId)) return;

    const newXp = xp + points;
    const newCompleted = [...completedLessons, lessonId];

    set({ xp: newXp, completedLessons: newCompleted });

    try {
      await supabase
        .from('progress')
        .upsert({
          user_id: userId,
          xp: newXp,
          completed_lessons: newCompleted,
          updated_at: new Date().toISOString()
        });

      // Also record in lesson_completion table
      await supabase
        .from('lesson_completion')
        .insert({
          user_id: userId,
          lesson_id: lessonId,
          points_earned: points
        });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  },

  reset: () => {
    set({ xp: 0, streak: 0, completedLessons: [], loading: false });
  },
    }),
    {
      name: 'excel-progress-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
