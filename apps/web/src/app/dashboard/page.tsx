"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TechIcon } from "@/components/ui/TechIcon";

const mockNfts = [
  { id: "1", name: "Season Opener Badge", type: "ATTENDANCE", rarity: "COMMON", icon: "ticket", xp: 45, level: 2, staked: false },
  { id: "2", name: "First Touchdown", type: "ACHIEVEMENT", rarity: "UNCOMMON", icon: "trophy", xp: 280, level: 8, staked: false },
  { id: "3", name: "Flash Thompson Card", type: "PLAYER_CARD", rarity: "RARE", icon: "zap", xp: 1250, level: 22, staked: true },
  { id: "4", name: "Top Recruiter", type: "REFERRAL", rarity: "UNCOMMON", icon: "users", xp: 150, level: 5, staked: false },
  { id: "5", name: "Rules Master", type: "RULES_EXPERT", rarity: "RARE", icon: "book", xp: 500, level: 14, staked: false },
  { id: "6", name: "Golden Arm", type: "HIGHLIGHT", rarity: "EPIC", icon: "strong", xp: 2100, level: 31, staked: true },
  { id: "7", name: "Viral Moment", type: "SOCIAL_CHAMPION", rarity: "RARE", icon: "share", xp: 800, level: 18, staked: false },
  { id: "8", name: "2026 Season Pass", type: "SEASON_PASS", rarity: "EPIC", icon: "ticket", xp: 0, level: 1, staked: false },
];

const rarityColors: Record<string, string> = {
  COMMON: "#8B949E",
  UNCOMMON: "#2EC4B6",
  RARE: "#3B82F6",
  EPIC: "#7B2FBE",
  LEGENDARY: "#F5A623",
};

const rarityGlow: Record<string, string> = {
  COMMON: "rgba(139, 148, 158, 0.2)",
  UNCOMMON: "rgba(46, 196, 182, 0.2)",
  RARE: "rgba(59, 130, 246, 0.3)",
  EPIC: "rgba(123, 47, 190, 0.3)",
  LEGENDARY: "rgba(245, 166, 35, 0.4)",
};

export default function DashboardPage() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.05);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="of-container">
          {/* Header */}
          <div className="mb-12">
            <h1 className="of-heading-md text-white mb-2">My Collection</h1>
            <p className="of-body-lg">Manage your NFTs, stake for yield, or list on the marketplace.</p>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Total NFTs", value: "8", icon: "gem" },
              { label: "Staked", value: "2", icon: "lock" },
              { label: "Daily Yield", value: "28 FLAG", icon: "coins" },
              { label: "Collection Value", value: "45.2K", icon: "chart" },
            ].map((stat) => (
              <div key={stat.label} className="of-glass p-5 text-center">
                <TechIcon name={stat.icon} size={22} color="var(--of-gold)" />
                <div className="text-2xl font-black text-white mt-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "var(--of-text-dim)" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["All", "Player Cards", "Achievements", "Attendance", "Staked"].map((filter, i) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  i === 0 ? "" : ""
                }`}
                style={{
                  background: i === 0 ? "var(--of-gold)" : "var(--of-bg-elevated)",
                  color: i === 0 ? "var(--of-bg-deep)" : "var(--of-text-muted)",
                  border: `1px solid ${i === 0 ? "var(--of-gold)" : "var(--of-border)"}`,
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* NFT Grid */}
          <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockNfts.map((nft, i) => (
              <div
                key={nft.id}
                className={`group of-nft-card p-5 cursor-pointer transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Rarity + Staked badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                    style={{
                      color: rarityColors[nft.rarity],
                      background: `${rarityColors[nft.rarity]}15`,
                      border: `1px solid ${rarityColors[nft.rarity]}30`,
                    }}
                  >
                    {nft.rarity}
                  </span>
                  {nft.staked && (
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{ color: "var(--of-green)", background: "rgba(46, 196, 182, 0.1)", border: "1px solid rgba(46, 196, 182, 0.2)" }}
                    >
                      STAKED
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center py-8">
                  <TechIcon
                    name={nft.icon}
                    size={42}
                    color={rarityColors[nft.rarity]}
                    container="hex"
                    className="transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <h3 className="text-sm font-bold text-white mb-1 truncate">{nft.name}</h3>
                <p className="text-xs mb-3" style={{ color: "var(--of-text-dim)" }}>
                  {nft.type.replace(/_/g, " ")}
                </p>

                {/* XP Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium" style={{ color: "var(--of-text-dim)" }}>
                      Lv.{nft.level}
                    </span>
                    <span className="text-[10px] font-medium" style={{ color: rarityColors[nft.rarity] }}>
                      {nft.xp} XP
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--of-bg-deep)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min((nft.level / 50) * 100, 100)}%`,
                        background: rarityColors[nft.rarity],
                        boxShadow: `0 0 8px ${rarityGlow[nft.rarity]}`,
                      }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 text-[10px] font-bold tracking-wider uppercase py-2 rounded-lg transition-all duration-300 hover:brightness-110"
                    style={{
                      background: `${rarityColors[nft.rarity]}15`,
                      color: rarityColors[nft.rarity],
                      border: `1px solid ${rarityColors[nft.rarity]}25`,
                    }}
                  >
                    {nft.staked ? "Unstake" : "Stake"}
                  </button>
                  <button
                    className="flex-1 text-[10px] font-bold tracking-wider uppercase py-2 rounded-lg transition-all duration-300 hover:brightness-110"
                    style={{
                      background: "var(--of-bg-elevated)",
                      color: "var(--of-text-muted)",
                      border: "1px solid var(--of-border)",
                    }}
                  >
                    List
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
