"use client";

import LandingPage from "@/components/landing/LandingPage";
import { useRouter } from "next/navigation";

export default function PublicLandingRoute() {
  const router = useRouter();

  return (
    <LandingPage
      onGetStarted={() => {
        router.push("/");
      }}
    />
  );
}
