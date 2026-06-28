"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import AuthScreen from "@/components/common/AuthScreen";
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

  useEffect(() => {
    // Public routes that don't need protection (optional based on requirements)
    // But user said "Protect all routes and pages"
    const isPublicRoute = false; // We can add some if needed, e.g. pathname === '/terms'

    if (!loading && !showSplash) {
      if (!user) {
        // If not logged in and on a protected route, we'll show AuthScreen (handled below)
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

  // If on admin page, we already have internal check in the page component,
  // but we can also handle it here if we want more strictness.
  if (pathname.startsWith('/admin-exclusive-portal') && !isAdmin && !loading && user) {
     return null; // The useEffect will redirect
  }

  if (!user) {
    return <AuthScreen />;
  }

  // If user is authenticated but not approved/admin, we must not render children
  // while we are waiting for the redirect to /access-denied in useEffect.
  if (user && !isApproved && !isAdmin && pathname !== '/access-denied') {
    return <SplashScreen />;
  }

  return children;
}
