"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechIcon } from "@/components/ui/TechIcon";

const rarityColors: Record<string, string> = {
  COMMON: "#8B949E",
  UNCOMMON: "#2EC4B6",
  RARE: "#3B82F6",
  EPIC: "#7B2FBE",
  LEGENDARY: "#F5A623",
};

const dailyYields: Record<string, number> = {
  COMMON: 1,
  UNCOMMON: 2.5,
  RARE: 5,
  EPIC: 10,
  LEGENDARY: 25,
};

const mockStaked = [
  { id: "1", name: "Flash Thompson Card", type: "PLAYER_CARD", rarity: "RARE", icon: "zap", stakedAt: "2026-03-15", accumulated: 165, daysStaked: 33 },
  { id: "2", name: "Golden Arm", type: "HIGHLIGHT", rarity: "EPIC", icon: "strong", stakedAt: "2026-04-01", accumulated: 170, daysStaked: 17 },
  { id: "3", name: "League Champion", type: "ACHIEVEMENT", rarity: "LEGENDARY", icon: "crown", stakedAt: "2026-02-28", accumulated: 1225, daysStaked: 49 },
];

const mockUnstaked = [
  { id: "4", name: "Season Opener Badge", type: "ATTENDANCE", rarity: "COMMON", icon: "ticket" },
  { id: "5", name: "First Touchdown", type: "ACHIEVEMENT", rarity: "UNCOMMON", icon: "trophy" },
  { id: "6", name: "Top Recruiter", type: "REFERRAL", rarity: "UNCOMMON", icon: "users" },
  { id: "7", name: "Rules Master", type: "RULES_EXPERT", rarity: "RARE", icon: "book" },
  { id: "8", name: "Viral Moment", type: "SOCIAL_CHAMPION", rarity: "RARE", icon: "share" },
  { id: "9", name: "2026 Season Pass", type: "SEASON_PASS", rarity: "EPIC", icon: "ticket" },
];

function StakedCard({ nft, onUnstake }: { nft: typeof mockStaked[0]; onUnstake: () => void }) {
  const color = rarityColors[nft.rarity];
  const yield_ = dailyYields[nft.rarity];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="of-glass p-5 relative overflow-hidden"
      style={{ borderColor: `${color}40` }}
    >
      {/* Glow pulse */}
      <div
        className="absolute inset-0 opacity-10 animate-pulse"
        style={{ background: `radial-gradient(ellipse at center, ${color}, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${color}15`, border: `1px solid ${color}30` }}
            >
              <TechIcon name={nft.icon} size={20} color={color} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{nft.name}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{nft.rarity}</span>
                <span className="text-[10px] text-[var(--of-text-dim)]">•</span>
                <span className="text-[10px] text-[var(--of-text-dim)]">{nft.type.replace(/_/g, " ")}</span>
              </div>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-[rgba(46,196,182,0.1)] text-[#2EC4B6] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] animate-pulse" />
            Staked
          </span>
        </div>

        {/* Yield info */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
          <div className="rounded-lg p-2" style={{ background: "var(--of-bg-elevated)" }}>
            <div className="text-xs text-[var(--of-text-dim)]">Daily Yield</div>
            <div className="font-bold text-sm" style={{ color }}>{yield_} FLAG</div>
          </div>
          <div className="rounded-lg p-2" style={{ background: "var(--of-bg-elevated)" }}>
            <div className="text-xs text-[var(--of-text-dim)]">Days Staked</div>
            <div className="font-bold text-sm text-white">{nft.daysStaked}</div>
          </div>
          <div className="rounded-lg p-2" style={{ background: "var(--of-bg-elevated)" }}>
            <div className="text-xs text-[var(--of-text-dim)]">Accumulated</div>
            <div className="font-bold text-sm text-[var(--of-gold)]">{nft.accumulated} FLAG</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-[rgba(46,196,182,0.1)] text-[#2EC4B6] border border-[rgba(46,196,182,0.2)] hover:bg-[rgba(46,196,182,0.2)] transition-colors cursor-pointer">
            Claim {nft.accumulated} FLAG
          </button>
          <button
            onClick={onUnstake}
            className="py-2 px-3 rounded-lg text-xs font-bold bg-[rgba(230,57,70,0.1)] text-[#E63946] border border-[rgba(230,57,70,0.2)] hover:bg-[rgba(230,57,70,0.2)] transition-colors cursor-pointer"
          >
            Unstake
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function UnstakedCard({ nft, onStake }: { nft: typeof mockUnstaked[0]; onStake: () => void }) {
  const color = rarityColors[nft.rarity];
  const yield_ = dailyYields[nft.rarity];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="of-glass p-4 flex items-center gap-3"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <TechIcon name={nft.icon} size={18} color={color} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-semibold text-sm truncate">{nft.name}</h4>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{nft.rarity}</span>
          <span className="text-[10px] text-[var(--of-text-dim)]">{yield_} FLAG/day</span>
        </div>
      </div>
      <button
        onClick={onStake}
        className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0A0A0F] cursor-pointer transition-transform hover:scale-105"
        style={{ background: "var(--of-gradient-gold)" }}
      >
        Stake
      </button>
    </motion.div>
  );
}

export default function StakingPage() {
  const [stakedNfts, setStakedNfts] = useState(mockStaked);
  const [unstakedNfts, setUnstakedNfts] = useState(mockUnstaked);

  const totalDailyYield = stakedNfts.reduce((sum, n) => sum + dailyYields[n.rarity], 0);
  const totalAccumulated = stakedNfts.reduce((sum, n) => sum + n.accumulated, 0);
  const monthlyProjection = totalDailyYield * 30;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="of-container">
          <div className="mb-8">
            <h1 className="of-heading-md text-white mb-2 inline-flex items-center gap-2">
              <TechIcon name="pickaxe" size={22} color="var(--of-gold)" />
              NFT Staking Vault
            </h1>
            <p className="of-body-lg">Stake your NFTs to earn passive FLAG token rewards. Higher rarity = higher yield.</p>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "NFTs Staked", value: stakedNfts.length.toString(), icon: "lock", color: "#2EC4B6" },
              { label: "Daily Yield", value: `${totalDailyYield} FLAG`, icon: "trending", color: "#F5A623" },
              { label: "Monthly Projection", value: `${monthlyProjection} FLAG`, icon: "chart", color: "#7B2FBE" },
              { label: "Claimable Now", value: `${totalAccumulated} FLAG`, icon: "wallet", color: "#00E5FF" },
            ].map((s) => (
              <div key={s.label} className="of-glass p-4 text-center">
                <div className="mb-1 flex justify-center">
                  <TechIcon name={s.icon} size={20} color={s.color} />
                </div>
                <div className="text-lg font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--of-text-dim)] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Yield Rates Table */}
          <div className="of-glass p-5 mb-8">
            <h3 className="text-sm font-bold text-white mb-4 inline-flex items-center gap-2">
              <TechIcon name="clipboard" size={16} color="var(--of-cyan)" />
              Staking Yield Rates
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(dailyYields).map(([rarity, yield_]) => (
                <div key={rarity} className="text-center p-3 rounded-xl" style={{ background: "var(--of-bg-elevated)" }}>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: rarityColors[rarity] }}>
                    {rarity}
                  </div>
                  <div className="text-sm font-black text-white">{yield_}</div>
                  <div className="text-[10px] text-[var(--of-text-dim)]">FLAG/day</div>
                </div>
              ))}
            </div>
          </div>

          {/* Staked NFTs */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse" />
              Currently Staked ({stakedNfts.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {stakedNfts.map((nft) => (
                  <StakedCard key={nft.id} nft={nft} onUnstake={() => {
                    setStakedNfts((s) => s.filter((n) => n.id !== nft.id));
                    setUnstakedNfts((u) => [...u, { id: nft.id, name: nft.name, type: nft.type, rarity: nft.rarity, icon: nft.icon }]);
                  }} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Available to Stake */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 inline-flex items-center gap-2">
              <TechIcon name="wallet" size={18} color="var(--of-cyan)" />
              Available to Stake ({unstakedNfts.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              <AnimatePresence>
                {unstakedNfts.map((nft) => (
                  <UnstakedCard key={nft.id} nft={nft} onStake={() => {
                    setUnstakedNfts((u) => u.filter((n) => n.id !== nft.id));
                    setStakedNfts((s) => [...s, { ...nft, stakedAt: new Date().toISOString().slice(0, 10), accumulated: 0, daysStaked: 0 }]);
                  }} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
