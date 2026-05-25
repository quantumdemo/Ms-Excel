import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export const useProgressStore = create((set, get) => ({
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
        set({
          xp: data.xp,
          streak: data.streak,
          completedLessons: data.completed_lessons || []
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
          updated_at: new Date()
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
  }
}));
