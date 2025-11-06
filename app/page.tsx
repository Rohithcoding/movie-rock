'use client';

import dynamic from "next/dynamic";

const RealMoviesContent = dynamic(
  () => import("@/components/sections/Home/RealMoviesContent").then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-pulse text-2xl text-white">Loading movies...</div>
      </div>
    )
  }
);

export default function HomePage() {
  return <RealMoviesContent />;
}
