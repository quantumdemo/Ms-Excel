"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/hooks/useAuth";
import { useProgressStore } from "@/hooks/useProgress";
import Onboarding from "@/components/common/Onboarding";

// Dynamic imports for heavy components
const HomeDashboard = dynamic(() => import("@/components/home/HomeDashboard"), { ssr: false });
const LessonViewer = dynamic(() => import("@/components/lesson/LessonViewer"), { ssr: false });
const SheetLab = dynamic(() => import("@/components/sheetlab/SheetLab"), { ssr: false });

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Dashboard UI State (lifted for persistence when returning from Lesson)
  const [activeTab, setActiveTab] = useState('home');
  const [categoryFilter, setCategoryFilter] = useState(null);

  const { user, loading } = useAuthStore();
  const { fetchProgress } = useProgressStore();

  useEffect(() => {
    // Check onboarding after initial load
    const hasSeenOnboarding = typeof window !== "undefined" && localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProgress(user.id);
    }
  }, [user, fetchProgress]);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (loading) {
     return (
       <div className="fixed inset-0 z-[100] bg-bg-dark flex items-center justify-center">
         <div className="w-8 h-8 border-3 border-excel-green border-t-transparent rounded-full animate-spin" />
       </div>
     );
  }

  return (
    <main className="min-h-screen bg-bg-dark text-slate-50">
       <AnimatePresence mode="wait">
          {selectedLesson ? (
            <LessonViewer
              key={selectedLesson.id}
              lesson={selectedLesson}
              onBack={() => setSelectedLesson(null)}
            />
          ) : activeTab === 'sheetlab' ? (
            <SheetLab
              key="sheetlab"
              onBack={() => setActiveTab('home')}
            />
          ) : (
            <HomeDashboard
              key="dashboard"
              onSelectLesson={(lesson) => setSelectedLesson(lesson)}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          )}
       </AnimatePresence>
    </main>
  );
}
