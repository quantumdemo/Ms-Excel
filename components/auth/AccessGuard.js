"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import LandingPage from "@/components/landing/LandingPage";

export default function AccessGuard({ children }) {
  const { user, loading, isApproved, isAdmin, init } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = init();
    return () => unsubscribe && unsubscribe();
  }, [init]);

  // Unregister any legacy Service Worker registrations to clear stale page caches on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      }).catch((e) => console.error("SW unregister error:", e));
    }
  }, []);

  const isPublicRoute = pathname === '/landing' || pathname === '/terms' || pathname === '/privacy' || pathname === '/about' || pathname === '/contact' || pathname === '/donate' || pathname === '/support';

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        router.replace('/landing');
      } else if (user) {
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
  }, [user, loading, isApproved, isAdmin, pathname, isPublicRoute, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-excel-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname.startsWith('/admin-exclusive-portal') && !isAdmin && !loading && user) {
     return null;
  }

  // Unauthenticated users see LandingPage directly if on /landing or redirected
  if (!user && !isPublicRoute) {
    return <LandingPage />;
  }

  if (user && !isApproved && !isAdmin && pathname !== '/access-denied') {
    return (
      <div className="fixed inset-0 z-[100] bg-bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-excel-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return children;
}
