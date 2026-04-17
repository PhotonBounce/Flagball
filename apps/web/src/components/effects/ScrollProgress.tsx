"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px]" aria-hidden="true">
      <div
        className="h-full transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background: "var(--of-gradient-gold)",
          boxShadow: "0 0 12px rgba(245, 166, 35, 0.5)",
        }}
      />
    </div>
  );
}
