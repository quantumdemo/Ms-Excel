"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import LandingPage from "@/components/landing/LandingPage";
import SplashScreen from "@/components/common/SplashScreen";

export default function AccessGuard({ children }) {
  const { user, loading, isApproved, isAdmin, init } = useAuthStore();
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = init();
    return () => unsubscribe && unsubscribe();
  }, [init]);

  // Handle branding splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5s branding requirement

    return () => clearTimeout(timer);
  }, []);

  const isPublicRoute = pathname === '/landing' || pathname === '/terms' || pathname === '/privacy' || pathname === '/about' || pathname === '/contact' || pathname === '/donate' || pathname === '/support';

  useEffect(() => {
    if (!loading && !showSplash) {
      if (!user) {
        // Unauthenticated user
      } else {
        // If logged in
        if (!isApproved && !isAdmin && pathname !== '/access-denied') {
          router.push('/access-denied');
        }

        if (isApproved || isAdmin) {
           if (pathname === '/access-denied') {
             router.push('/');
           }
        }
      }
    }
  }, [user, loading, isApproved, isAdmin, pathname, router, showSplash]);

  if (loading || showSplash) {
    return <SplashScreen />;
  }

  if (pathname.startsWith('/admin-exclusive-portal') && !isAdmin && !loading && user) {
     return null;
  }

  // Unauthenticated users see LandingPage directly
  if (!user && !isPublicRoute) {
    return (
      <LandingPage
        onGetStarted={() => {
          // Trigger Google login or navigation
        }}
      />
    );
  }

  if (user && !isApproved && !isAdmin && pathname !== '/access-denied') {
    return <SplashScreen />;
  }

  return children;
}
