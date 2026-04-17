"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { TechIcon } from "@/components/ui/TechIcon";

const mockListings = [
  { id: "1", name: "Legendary Quarterback", seller: "FlashThompson", rarity: "LEGENDARY", icon: "zap", price: 12500, bids: 14, timeLeft: "2h 15m" },
  { id: "2", name: "Championship Ring", seller: "ATLLightning", rarity: "EPIC", icon: "crown", price: 8400, bids: 8, timeLeft: "5h 42m" },
  { id: "3", name: "Interception King", seller: "DeAndre_W", rarity: "EPIC", icon: "football", price: 6200, bids: 5, timeLeft: "1d 3h" },
  { id: "4", name: "Perfect Season", seller: "NYCBlitz", rarity: "LEGENDARY", icon: "trophy", price: 25000, bids: 21, timeLeft: "8h 20m" },
  { id: "5", name: "Speed Demon Card", seller: "JessP_Creates", rarity: "RARE", icon: "runner", price: 3100, bids: 3, timeLeft: "3d 12h" },
  { id: "6", name: "Community Builder", seller: "Coach_Rod", rarity: "UNCOMMON", icon: "users", price: 850, bids: 1, timeLeft: "6d" },
  { id: "7", name: "Viral Highlight", seller: "SarahChen", rarity: "RARE", icon: "share", price: 2800, bids: 7, timeLeft: "15h" },
  { id: "8", name: "Opening Day", seller: "NewUser42", rarity: "COMMON", icon: "ticket", price: 200, bids: 0, timeLeft: "2d 5h" },
  { id: "9", name: "Double OT Winner", seller: "FlashThompson", rarity: "EPIC", icon: "flame", price: 9500, bids: 11, timeLeft: "4h" },
];

const rarityColors: Record<string, string> = {
  COMMON: "#8B949E",
  UNCOMMON: "#2EC4B6",
  RARE: "#3B82F6",
  EPIC: "#7B2FBE",
  LEGENDARY: "#F5A623",
};

export default function MarketplacePage() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.05);
  const [sortBy, setSortBy] = useState("price-high");

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="of-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h1 className="of-heading-md text-white mb-2">Marketplace</h1>
              <p className="of-body-lg">Browse, bid, and buy unique flag football NFTs.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search NFTs..."
                  className="of-input pl-10 w-64"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="of-input w-40 appearance-none"
                style={{ cursor: "pointer" }}
              >
                <option value="price-high">Price: High</option>
                <option value="price-low">Price: Low</option>
                <option value="recent">Most Recent</option>
                <option value="bids">Most Bids</option>
              </select>
            </div>
          </div>

          {/* Rarity filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["All", "LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"].map((r, i) => (
              <button
                key={r}
                className="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
                style={{
                  background: i === 0 ? "var(--of-gold)" : "var(--of-bg-elevated)",
                  color: i === 0 ? "var(--of-bg-deep)" : (r === "All" ? "var(--of-text-muted)" : rarityColors[r]),
                  border: `1px solid ${i === 0 ? "var(--of-gold)" : (r === "All" ? "var(--of-border)" : `${rarityColors[r]}30`)}`,
                }}
              >
                {r === "All" ? "All Rarities" : r}
              </button>
            ))}
          </div>

          {/* Live Auction Banner */}
          <div
            className="of-glass p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "rgba(245, 166, 35, 0.2)", background: "linear-gradient(135deg, rgba(245, 166, 35, 0.04), rgba(255, 45, 135, 0.02))" }}
          >
            <div className="flex items-center gap-4">
              <div className="of-pulse-ring">
                <span className="text-sm font-bold text-white">LIVE AUCTION</span>
              </div>
              <span className="text-sm" style={{ color: "var(--of-text-muted)" }}>
                Golden Championship Ring — Current bid:{" "}
                <strong className="of-text-gradient">45,000 FLAG</strong>
              </span>
            </div>
            <button className="of-btn-primary text-sm py-2 px-6">Place Bid</button>
          </div>

          {/* Listings grid */}
          <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing, i) => (
              <div
                key={listing.id}
                className={`group of-nft-card p-6 cursor-pointer transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                    style={{
                      color: rarityColors[listing.rarity],
                      background: `${rarityColors[listing.rarity]}15`,
                      border: `1px solid ${rarityColors[listing.rarity]}30`,
                    }}
                  >
                    {listing.rarity}
                  </span>
                  <span className="text-xs inline-flex items-center gap-1" style={{ color: "var(--of-text-dim)" }}>
                    <TechIcon name="timer" size={12} color="var(--of-text-dim)" />
                    {listing.timeLeft}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center py-8">
                  <TechIcon
                    name={listing.icon}
                    size={44}
                    color={rarityColors[listing.rarity]}
                    container="hex"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <h3 className="text-base font-bold text-white mb-1">{listing.name}</h3>
                <p className="text-xs mb-4" style={{ color: "var(--of-text-dim)" }}>
                  by @{listing.seller}
                </p>

                {/* Price + bids */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--of-border)" }}>
                  <div>
                    <div className="text-lg font-black" style={{ color: rarityColors[listing.rarity] }}>
                      {listing.price.toLocaleString()} <span className="text-xs font-medium">FLAG</span>
                    </div>
                    <div className="text-[10px]" style={{ color: "var(--of-text-dim)" }}>
                      {listing.bids} bid{listing.bids !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <button
                    className="of-btn-primary text-xs py-2 px-5"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
