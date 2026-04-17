"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useParallax } from "@/hooks/useScrollReveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { TechButton } from "@/components/ui/TechButton";
import { Zap, Play } from "lucide-react";

const FootballField3D = dynamic(
  () => import("@/components/effects/FootballField3D").then((m) => m.FootballField3D),
  { ssr: false }
);

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const parallaxRef = useParallax(0.15);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Football Field Background */}
      <FootballField3D className="opacity-40" />

      {/* Data grid overlay */}
      <div className="of-data-grid" aria-hidden="true" />

      {/* Animated football field lines behind hero */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.04 }}
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${i * 10}%`,
              background: "var(--of-green)",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Radial spotlight */}
      <div
        className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="of-container relative z-10 text-center pt-32 pb-20">
        {/* Live indicator */}
        <div
          className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="of-live-bar">
            <span style={{ marginLeft: "-6px" }} />
            NOW IN BETA
          </span>
        </div>

        {/* Main title with staggered word reveal */}
        <h1
          ref={titleRef}
          className={`of-heading-xl mb-6 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <span className="block text-white">The Future of</span>
          <span className="of-text-gradient block mt-2">Flag Football</span>
          <span className="block text-white mt-2 text-[0.5em]">
            is{" "}
            <span
              className="of-glitch inline-block of-neon-text-gold"
              data-text="OnlyFlags"
              style={{
                background: "var(--of-gradient-fire)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              OnlyFlags
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`of-body-lg max-w-2xl mx-auto mb-10 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          Play. Earn. Collect. The blockchain-integrated platform where every touchdown,
          every flag pull, and every hustle moment turns into digital gold.
        </p>

        {/* CTA buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <TechButton variant="primary" size="lg">
            <Zap size={18} />
            Join the Game
          </TechButton>
          <TechButton variant="neon" size="lg">
            <Play size={18} />
            Watch Trailer
          </TechButton>
        </div>

        {/* Animated football icon */}
        <div
          className={`mt-16 of-football-bounce transition-all duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
          aria-hidden="true"
        >
          <TechIcon name="football" size={56} color="var(--of-gold)" container="hex" animated />
        </div>

        {/* HUD-style scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
            loaded ? "opacity-60" : "opacity-0"
          }`}
          style={{ transitionDelay: "1500ms" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-[9px] tracking-[0.4em] uppercase font-mono"
              style={{ color: "var(--of-cyan)" }}
            >
              Scroll
            </span>
            <div className="w-px h-8 relative overflow-hidden">
              <div
                className="w-full h-4 absolute"
                style={{
                  background: "linear-gradient(180deg, var(--of-cyan), transparent)",
                  animation: "scrollPulse 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0% { top: -16px; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 32px; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
