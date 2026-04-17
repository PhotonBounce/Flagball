"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on non-touch devices
    if ("ontouchstart" in window) return;

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "A" || el.tagName === "BUTTON" || el.closest("a, button")) {
        ringRef.current?.classList.add("active");
      }
    };

    const handleOut = () => {
      ringRef.current?.classList.remove("active");
    };

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 150}px, ${pos.current.y - 150}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${target.current.x - 20}px, ${target.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[9998] w-[300px] h-[300px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, var(--of-gold) 0%, transparent 70%)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      <div ref={ringRef} className="of-cursor-ring hidden md:block" aria-hidden="true" />
    </>
  );
}
