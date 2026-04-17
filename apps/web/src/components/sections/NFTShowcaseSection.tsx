"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { TechIcon } from "@/components/ui/TechIcon";
import { ArrowRight } from "lucide-react";

const nftShowcase = [
  {
    name: "Golden Touchdown",
    type: "ACHIEVEMENT",
    rarity: "LEGENDARY",
    icon: "trophy",
    color: "#F5A623",
    description: "First player to score 100 touchdowns this season",
    price: "5,000 FLAG",
    glow: "rgba(245, 166, 35, 0.4)",
  },
  {
    name: "Iron Defense",
    type: "PLAYER_CARD",
    rarity: "EPIC",
    icon: "shield",
    color: "#7B2FBE",
    description: "50+ flag pulls in a single season — Level 35 Card",
    price: "3,200 FLAG",
    glow: "rgba(123, 47, 190, 0.4)",
  },
  {
    name: "Lightning Strike",
    type: "HIGHLIGHT",
    rarity: "RARE",
    icon: "zap",
    color: "#3B82F6",
    description: "80-yard touchdown run highlight reel moment",
    price: "1,800 FLAG",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    name: "Flag Day Attendee",
    type: "ATTENDANCE",
    rarity: "UNCOMMON",
    icon: "ticket",
    color: "#2EC4B6",
    description: "Attended the OnlyFlags National Championship",
    price: "500 FLAG",
    glow: "rgba(46, 196, 182, 0.4)",
  },
  {
    name: "Season Pass 2026",
    type: "SEASON_PASS",
    rarity: "EPIC",
    icon: "ticket",
    color: "#FF6B35",
    description: "All-access pass — exclusive events + merch drops",
    price: "8,000 FLAG",
    glow: "rgba(255, 107, 53, 0.4)",
  },
  {
    name: "Rules Master",
    type: "RULES_EXPERT",
    rarity: "RARE",
    icon: "book",
    color: "#2EC4B6",
    description: "Perfect score on the flag football rules quiz",
    price: "Not For Sale",
    glow: "rgba(46, 196, 182, 0.4)",
  },
];

const rarityColors: Record<string, string> = {
  COMMON: "#8B949E",
  UNCOMMON: "#2EC4B6",
  RARE: "#3B82F6",
  EPIC: "#7B2FBE",
  LEGENDARY: "#F5A623",
};

export function NFTShowcaseSection() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden" id="nfts">
      {/* Background gradient shift */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(123, 47, 190, 0.06) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="of-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-2 rounded-full"
            style={{ color: "var(--of-cyan)", background: "rgba(0, 229, 255, 0.06)", border: "1px solid rgba(0, 229, 255, 0.15)" }}
          >
            NFT Collection
          </span>
          <h2 className="of-heading-lg mt-4">
            <span className="text-white">Collect </span>
            <span className="of-text-gradient-neon">Digital Moments</span>
          </h2>
          <p className="of-body-lg max-w-2xl mx-auto mt-4">
            12 unique NFT types across 5 rarity tiers. Every play could mint your next legendary collectible.
          </p>
        </div>

        {/* NFT Cards */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {nftShowcase.map((nft, i) => (
            <div
              key={nft.name}
              className={`group relative transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* NFT Card */}
              <div
                className="of-nft-card p-6 h-full cursor-pointer"
                style={{
                  borderColor: hoveredIdx === i ? nft.color : undefined,
                  boxShadow: hoveredIdx === i ? `0 20px 60px ${nft.glow}` : undefined,
                }}
              >
                {/* Rarity badge */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                    style={{
                      color: rarityColors[nft.rarity],
                      background: `${rarityColors[nft.rarity]}15`,
                      border: `1px solid ${rarityColors[nft.rarity]}30`,
                    }}
                  >
                    {nft.rarity}
                  </span>
                  <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "var(--of-text-dim)" }}>
                    {nft.type.replace(/_/g, " ")}
                  </span>
                </div>

                {/* NFT Image/Icon */}
                <div className="relative flex items-center justify-center py-10">
                  <TechIcon
                    name={nft.icon}
                    size={56}
                    color={nft.color}
                    container="hex"
                    animated={hoveredIdx === i}
                    className="transition-all duration-500"
                  />
                  {/* Holographic ring */}
                  {nft.rarity === "LEGENDARY" && (
                    <div
                      className="absolute inset-0 rounded-full opacity-20"
                      style={{
                        background: `conic-gradient(from 0deg, ${nft.color}, #FF2D87, #00E5FF, #7B2FBE, ${nft.color})`,
                        animation: "spin 4s linear infinite",
                        filter: "blur(20px)",
                      }}
                    />
                  )}
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-white mb-2">{nft.name}</h3>
                <p className="text-sm mb-4" style={{ color: "var(--of-text-muted)" }}>
                  {nft.description}
                </p>

                {/* Price / action */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--of-border)" }}>
                  <span className="text-sm font-bold" style={{ color: nft.color }}>
                    {nft.price}
                  </span>
                  <button
                    className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      color: nft.color,
                      background: `${nft.color}10`,
                      border: `1px solid ${nft.color}30`,
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-16">
          <button className="of-btn-ghost">
            View Full Collection
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
