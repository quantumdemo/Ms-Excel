"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/hooks/useAuth";
import { useProgressStore } from "@/hooks/useProgress";
import SplashScreen from "@/components/common/SplashScreen";
import Onboarding from "@/components/common/Onboarding";
import AuthScreen from "@/components/common/AuthScreen";
import HomeDashboard from "@/components/home/HomeDashboard";
import LessonViewer from "@/components/lesson/LessonViewer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const { user, loading, init } = useAuthStore();
  const { fetchProgress } = useProgressStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
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

  if (!user && !loading) {
    return <AuthScreen />;
  }

  if (loading) {
     return <SplashScreen />;
  }

  return (
    <main className="min-h-screen bg-bg-dark text-slate-50">
       <AnimatePresence mode="wait">
          {selectedLesson ? (
            <LessonViewer
              key="viewer"
              lesson={selectedLesson}
              onBack={() => setSelectedLesson(null)}
            />
          ) : (
            <HomeDashboard
              key="dashboard"
              onSelectLesson={(lesson) => setSelectedLesson(lesson)}
            />
          )}
       </AnimatePresence>
    </main>
  );
}
