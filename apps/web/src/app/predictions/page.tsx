"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechIcon } from "@/components/ui/TechIcon";

type PredictionType = "MATCH_WINNER" | "SCORE_RANGE" | "MVP" | "FIRST_TD";
type MarketStatus = "OPEN" | "LOCKED" | "RESOLVED";

const typeConfig: Record<PredictionType, { label: string; icon: string; color: string }> = {
  MATCH_WINNER: { label: "Match Winner", icon: "trophy", color: "#F5A623" },
  SCORE_RANGE: { label: "Score Range", icon: "chart", color: "#00E5FF" },
  MVP: { label: "MVP Pick", icon: "star", color: "#7B2FBE" },
  FIRST_TD: { label: "First Touchdown", icon: "football", color: "#E63946" },
};

const statusConfig: Record<MarketStatus, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "#2EC4B6" },
  LOCKED: { label: "Locked", color: "#F5A623" },
  RESOLVED: { label: "Resolved", color: "#8B949E" },
};

const markets = [
  {
    id: "m1", type: "MATCH_WINNER" as PredictionType, status: "OPEN" as MarketStatus,
    title: "Blitz Squad vs Red Zone Raiders",
    subtitle: "Spring Showdown Semi-Final • Apr 17, 8PM",
    pool: 450, wagers: 34,
    options: [
      { id: "o1", label: "Blitz Squad", odds: 1.65, pct: 62 },
      { id: "o2", label: "Red Zone Raiders", odds: 2.40, pct: 38 },
    ],
  },
  {
    id: "m2", type: "FIRST_TD" as PredictionType, status: "OPEN" as MarketStatus,
    title: "Who scores first TD?",
    subtitle: "Blitz Squad vs Red Zone Raiders",
    pool: 180, wagers: 22,
    options: [
      { id: "o3", label: "Marcus Johnson", odds: 2.50, pct: 35 },
      { id: "o4", label: "DeShawn Williams", odds: 3.20, pct: 22 },
      { id: "o5", label: "Tyler Chen", odds: 4.00, pct: 18 },
      { id: "o6", label: "Other Player", odds: 2.80, pct: 25 },
    ],
  },
  {
    id: "m3", type: "SCORE_RANGE" as PredictionType, status: "OPEN" as MarketStatus,
    title: "Total combined score range?",
    subtitle: "Touchdown Kings vs Flag City • Apr 18, 6PM",
    pool: 290, wagers: 28,
    options: [
      { id: "o7", label: "Under 35", odds: 3.50, pct: 18 },
      { id: "o8", label: "35-49", odds: 2.10, pct: 42 },
      { id: "o9", label: "50-64", odds: 2.50, pct: 28 },
      { id: "o10", label: "65+", odds: 5.00, pct: 12 },
    ],
  },
  {
    id: "m4", type: "MVP" as PredictionType, status: "LOCKED" as MarketStatus,
    title: "Spring Showdown Final MVP",
    subtitle: "Final match • Locked at kickoff",
    pool: 620, wagers: 51,
    options: [
      { id: "o11", label: "Marcus Johnson", odds: 2.80, pct: 30 },
      { id: "o12", label: "Alex Kim", odds: 3.50, pct: 24 },
      { id: "o13", label: "Chris Thompson", odds: 4.00, pct: 20 },
      { id: "o14", label: "Field (any other)", odds: 3.00, pct: 26 },
    ],
  },
  {
    id: "m5", type: "MATCH_WINNER" as PredictionType, status: "RESOLVED" as MarketStatus,
    title: "Flag Masters vs End Zone Elite",
    subtitle: "Quarter-Final • Completed",
    pool: 380, wagers: 42,
    options: [
      { id: "o15", label: "Flag Masters", odds: 2.10, pct: 40 },
      { id: "o16", label: "End Zone Elite", odds: 1.75, pct: 60, winner: true },
    ],
  },
];

export default function PredictionsPage() {
  const [filter, setFilter] = useState<"ALL" | PredictionType>("ALL");
  const [selectedBets, setSelectedBets] = useState<Record<string, { optionId: string; amount: number }>>({});
  const [betAmounts, setBetAmounts] = useState<Record<string, number>>({});

  const filtered = filter === "ALL" ? markets : markets.filter((m) => m.type === filter);

  const placeBet = (marketId: string, optionId: string) => {
    const amount = betAmounts[marketId] || 10;
    setSelectedBets((s) => ({ ...s, [marketId]: { optionId, amount } }));
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="of-container">
          <div className="mb-8">
            <h1 className="of-heading-md text-white mb-2 inline-flex items-center gap-2">
              <TechIcon name="target" size={22} color="var(--of-gold)" />
              Prediction Markets
            </h1>
            <p className="of-body-lg">Predict match outcomes and earn FLAG tokens. 10% rake funds the platform.</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Open Markets", value: markets.filter((m) => m.status === "OPEN").length.toString(), icon: "flame", color: "#2EC4B6" },
              { label: "Total Volume", value: `${markets.reduce((s, m) => s + m.pool, 0).toLocaleString()} FLAG`, icon: "wallet", color: "#F5A623" },
              { label: "Active Wagers", value: markets.reduce((s, m) => s + m.wagers, 0).toString(), icon: "target", color: "#7B2FBE" },
              { label: "Your Wins", value: "5", icon: "trophy", color: "#00E5FF" },
            ].map((s) => (
              <div key={s.label} className="of-glass p-4 text-center">
                <div className="mb-1 flex justify-center"><TechIcon name={s.icon} size={20} color={s.color} /></div>
                <div className="text-lg font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--of-text-dim)] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Type Filters */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setFilter("ALL")}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer"
              style={{ background: filter === "ALL" ? "var(--of-gradient-gold)" : "var(--of-bg-elevated)", color: filter === "ALL" ? "#0A0A0F" : "#8B949E" }}
            >
              All Markets
            </button>
            {(Object.entries(typeConfig) as [PredictionType, typeof typeConfig[PredictionType]][]).map(([key, conf]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer"
                style={{ background: filter === key ? "var(--of-bg-elevated)" : "transparent", color: filter === key ? conf.color : "#8B949E", border: `1px solid ${filter === key ? conf.color + "60" : "transparent"}` }}
              >
                {conf.label}
              </button>
            ))}
          </div>

          {/* Markets */}
          <div className="space-y-4">
            {filtered.map((market, i) => {
              const tc = typeConfig[market.type];
              const sc = statusConfig[market.status];
              const bet = selectedBets[market.id];

              return (
                <motion.div
                  key={market.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="of-glass p-5"
                  style={market.status === "OPEN" ? {} : { opacity: 0.7 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <TechIcon name={tc.icon} size={18} color={tc.color} />
                        <h3 className="text-white font-bold">{market.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--of-text-dim)]">
                        <span style={{ color: tc.color }}>{tc.label}</span>
                        <span>{market.subtitle}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ color: sc.color, background: `${sc.color}15` }}>
                        {market.status === "OPEN" && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 animate-pulse" style={{ background: sc.color }} />}
                        {sc.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-xs text-[var(--of-text-muted)]">
                    <span className="inline-flex items-center gap-1"><TechIcon name="wallet" size={12} color="var(--of-gold)" /> Pool: <strong className="text-[var(--of-gold)]">{market.pool} FLAG</strong></span>
                    <span className="inline-flex items-center gap-1"><TechIcon name="target" size={12} color="var(--of-text-muted)" /> {market.wagers} wagers</span>
                  </div>

                  {/* Options */}
                  <div className="grid gap-2" style={{ gridTemplateColumns: market.options.length <= 2 ? "1fr 1fr" : `repeat(${Math.min(market.options.length, 4)}, 1fr)` }}>
                    {market.options.map((opt) => {
                      const isBet = bet?.optionId === opt.id;
                      const isWinner = "winner" in opt && opt.winner;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => market.status === "OPEN" ? placeBet(market.id, opt.id) : null}
                          className="p-3 rounded-xl text-center transition-all cursor-pointer"
                          style={{
                            background: isWinner ? "rgba(46,196,182,0.1)" : isBet ? "rgba(245,166,35,0.1)" : "var(--of-bg-elevated)",
                            border: `1px solid ${isWinner ? "#2EC4B6" : isBet ? "var(--of-gold)" : "transparent"}`,
                          }}
                          disabled={market.status !== "OPEN"}
                        >
                          <div className="text-xs font-semibold text-white mb-1">
                            {opt.label}
                            {isWinner && <span className="ml-1 text-[#2EC4B6]">Winner</span>}
                          </div>
                          <div className="text-sm font-black" style={{ color: tc.color }}>{opt.odds.toFixed(2)}x</div>
                          <div className="h-1 rounded-full mt-2 mx-auto" style={{ background: "var(--of-bg-deep)", width: "80%" }}>
                            <div className="h-full rounded-full" style={{ width: `${opt.pct}%`, background: tc.color }} />
                          </div>
                          <div className="text-[10px] text-[var(--of-text-dim)] mt-1">{opt.pct}%</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bet amount + confirm for open markets */}
                  {market.status === "OPEN" && bet && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)] flex items-center gap-4"
                      >
                        <span className="text-xs text-[var(--of-text-muted)]">Wager:</span>
                        <div className="flex gap-1">
                          {[5, 10, 25, 50, 100].map((amt) => (
                            <button
                              key={amt}
                              onClick={() => { setBetAmounts((a) => ({ ...a, [market.id]: amt })); placeBet(market.id, bet.optionId); }}
                              className="px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors"
                              style={{
                                background: (betAmounts[market.id] || 10) === amt ? "var(--of-gradient-gold)" : "var(--of-bg-elevated)",
                                color: (betAmounts[market.id] || 10) === amt ? "#0A0A0F" : "#8B949E",
                              }}
                            >
                              {amt}
                            </button>
                          ))}
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <span className="text-xs text-[var(--of-text-muted)]">
                            Potential win: <strong className="text-[#2EC4B6]">{((betAmounts[market.id] || 10) * (market.options.find((o) => o.id === bet.optionId)?.odds || 1)).toFixed(0)} FLAG</strong>
                          </span>
                          <button className="px-4 py-2 rounded-lg text-xs font-bold text-[#0A0A0F] cursor-pointer hover:scale-105 transition-transform" style={{ background: "var(--of-gradient-gold)" }}>
                            Place Bet
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
