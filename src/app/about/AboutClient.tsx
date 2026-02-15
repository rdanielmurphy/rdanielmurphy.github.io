"use client";

import dynamic from "next/dynamic";

const AboutScene = dynamic(() => import("@/components/AboutScene"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function AboutClient() {
  return <AboutScene />;
}
