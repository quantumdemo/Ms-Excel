import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useProgressStore } from '@/hooks/useProgress';

export const useAILearningStore = create(
  persist(
    (set, get) => ({
      aiQuestionsCount: 0,
      aiFormulasAttempted: 0,
      conceptsPracticed: [],

      recordAIQuestion: (question, category = "general") => {
        const { aiQuestionsCount } = get();
        const newCount = aiQuestionsCount + 1;
        set({ aiQuestionsCount: newCount });

        // Reward +10 XP for asking learning questions with AI Coach
        try {
          const progressState = useProgressStore.getState();
          if (progressState && typeof progressState.completeLesson === 'function') {
            // Add progress XP signal
            const currentXp = progressState.xp || 0;
            useProgressStore.setState({ xp: currentXp + 10 });
          }
        } catch (err) {
          console.warn("Could not sync AI XP reward to main progress store:", err);
        }
      },

      recordFormulaAttempt: (formula) => {
        const { aiFormulasAttempted } = get();
        set({ aiFormulasAttempted: aiFormulasAttempted + 1 });
      },

      recordConcept: (conceptName) => {
        const { conceptsPracticed } = get();
        if (!conceptsPracticed.includes(conceptName)) {
          set({ conceptsPracticed: [...conceptsPracticed, conceptName] });
        }
      }
    }),
    {
      name: 'learn-excel-ai-progress',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
