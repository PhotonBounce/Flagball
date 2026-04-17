"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { ArrowRight } from "lucide-react";

const features = [
  {
    icon: "football",
    title: "Find Your Team",
    description: "Join or create local flag football teams. Request your city's team, invite friends, and get auto-matched to players nearby.",
    gradient: "var(--of-gradient-gold)",
    glow: "var(--of-glow-gold)",
    color: "var(--of-gold)",
  },
  {
    icon: "gem",
    title: "Earn NFTs",
    description: "12 unique NFT types — from Attendance badges to legendary Player Cards. Every play, every moment can mint digital gold.",
    gradient: "var(--of-gradient-neon)",
    glow: "var(--of-glow-cyan)",
    color: "var(--of-cyan)",
  },
  {
    icon: "coins",
    title: "Token Economy",
    description: "Earn FLAG tokens for every action. Stake your NFTs for daily yield. Trade on the built-in marketplace.",
    gradient: "var(--of-gradient-field)",
    glow: "var(--of-glow-green)",
    color: "var(--of-green)",
  },
  {
    icon: "trophy",
    title: "Tournaments",
    description: "Enter organized tournaments — single elimination, double elimination, or round robin. Compete for massive prize pools.",
    gradient: "var(--of-gradient-fire)",
    glow: "var(--of-glow-gold)",
    color: "var(--of-orange)",
  },
  {
    icon: "crosshair",
    title: "Fantasy & Predictions",
    description: "Build fantasy rosters, predict match outcomes, and earn tokens from your knowledge of the game.",
    gradient: "var(--of-gradient-neon)",
    glow: "var(--of-glow-purple)",
    color: "var(--of-purple)",
  },
  {
    icon: "share",
    title: "Social Sharing",
    description: "Share highlights, NFTs, and achievements across all platforms. Build share streaks for multiplied rewards.",
    gradient: "var(--of-gradient-gold)",
    glow: "var(--of-glow-gold)",
    color: "var(--of-gold)",
  },
  {
    icon: "palette",
    title: "Creator Marketplace",
    description: "Upload playbooks, highlight compilations, and training content. Earn royalties on every sale, forever.",
    gradient: "var(--of-gradient-fire)",
    glow: "var(--of-glow-gold)",
    color: "var(--of-pink)",
  },
  {
    icon: "shop",
    title: "Merch Store",
    description: "Print-on-demand team merch with NFT-exclusive designs. Unlock special drops with your rare collectibles.",
    gradient: "var(--of-gradient-field)",
    glow: "var(--of-glow-green)",
    color: "var(--of-green)",
  },
];

export function FeaturesSection() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section className="relative py-32" id="features">
      <div className="of-container">
        {/* Section header */}
        <div className="text-center mb-20">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-2 rounded-full"
            style={{ color: "var(--of-gold)", background: "rgba(245, 166, 35, 0.08)", border: "1px solid rgba(245, 166, 35, 0.15)" }}
          >
            Platform Features
          </span>
          <h2 className="of-heading-lg mt-4">
            <span className="text-white">Everything You Need to </span>
            <span className="of-text-gradient">Dominate</span>
          </h2>
          <p className="of-body-lg max-w-2xl mx-auto mt-4">
            A complete ecosystem for flag football players, fans, and creators — powered by blockchain technology.
          </p>
        </div>

        {/* Feature cards grid */}
        <div ref={ref} className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group of-glass p-8 cursor-pointer transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Icon with glow */}
              <div className="relative mb-6">
                <TechIcon
                  name={feature.icon}
                  size={32}
                  color={feature.color}
                  container="hex"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: feature.gradient,
                    filter: "blur(30px)",
                    transform: "scale(0.6)",
                  }}
                />
              </div>

              {/* Title with underline animation */}
              <h3 className="text-lg font-bold text-white mb-3 relative inline-block">
                {feature.title}
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: feature.gradient }}
                />
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: "var(--of-text-muted)" }}>
                {feature.description}
              </p>

              {/* Arrow indicator */}
              <div
                className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0"
                style={{ color: "var(--of-gold)" }}
              >
                <span>Explore</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
