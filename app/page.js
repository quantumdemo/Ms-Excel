"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/hooks/useAuth";
import { useProgressStore } from "@/hooks/useProgress";
import SplashScreen from "@/components/common/SplashScreen";
import Onboarding from "@/components/common/Onboarding";
import AuthScreen from "@/components/common/AuthScreen";

// Dynamic imports for heavy components
const HomeDashboard = dynamic(() => import("@/components/home/HomeDashboard"), { ssr: false });
const LessonViewer = dynamic(() => import("@/components/lesson/LessonViewer"), { ssr: false });
const SheetLab = dynamic(() => import("@/components/sheetlab/SheetLab"), { ssr: false });

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Dashboard UI State (lifted for persistence when returning from Lesson)
  const [activeTab, setActiveTab] = useState('home');
  const [categoryFilter, setCategoryFilter] = useState(null);

  const { user, loading, init } = useAuthStore();
  const { fetchProgress } = useProgressStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      const hasSeenOnboarding = typeof window !== "undefined" && localStorage.getItem("hasSeenOnboarding");
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }, 2500);

    const unsubscribe = init();
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [init]);

  useEffect(() => {
    if (user) {
      fetchProgress(user.uid);
    }
  }, [user, fetchProgress]);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Note: Authentication and Authorization are now handled by AccessGuard in layout.js

  if (loading) {
     return <SplashScreen />;
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
