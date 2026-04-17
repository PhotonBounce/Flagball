"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechIcon } from "@/components/ui/TechIcon";

type ContestType = "HEAD_TO_HEAD" | "TOURNAMENT" | "FIFTY_FIFTY";

const contestTypeConfig: Record<ContestType, { label: string; icon: string; color: string }> = {
  HEAD_TO_HEAD: { label: "Head to Head", icon: "swords", color: "#E63946" },
  TOURNAMENT: { label: "Tournament GPP", icon: "trophy", color: "#F5A623" },
  FIFTY_FIFTY: { label: "50/50", icon: "target", color: "#2EC4B6" },
};

const contests = [
  { id: "1", name: "Friday Night Showdown", type: "TOURNAMENT" as ContestType, entryFee: 25, prizePool: 500, entries: 18, maxEntries: 20, startTime: "7:00 PM", tier: "Pro" },
  { id: "2", name: "Quick Match", type: "HEAD_TO_HEAD" as ContestType, entryFee: 10, prizePool: 18, entries: 1, maxEntries: 2, startTime: "6:30 PM", tier: "Any" },
  { id: "3", name: "Daily Grind 50/50", type: "FIFTY_FIFTY" as ContestType, entryFee: 5, prizePool: 45, entries: 8, maxEntries: 10, startTime: "5:00 PM", tier: "Beginner" },
  { id: "4", name: "High Roller GPP", type: "TOURNAMENT" as ContestType, entryFee: 100, prizePool: 2000, entries: 12, maxEntries: 20, startTime: "8:00 PM", tier: "Elite" },
  { id: "5", name: "Afternoon Flash", type: "HEAD_TO_HEAD" as ContestType, entryFee: 15, prizePool: 27, entries: 1, maxEntries: 2, startTime: "3:00 PM", tier: "Any" },
  { id: "6", name: "Casual 50/50", type: "FIFTY_FIFTY" as ContestType, entryFee: 2, prizePool: 18, entries: 6, maxEntries: 10, startTime: "4:00 PM", tier: "Beginner" },
];

const availablePlayers = [
  { id: "p1", name: "Marcus Johnson", pos: "QB", team: "Blitz Squad", salary: 9500, projPts: 24.5, trend: "flame" },
  { id: "p2", name: "DeShawn Williams", pos: "WR", team: "End Zone Elite", salary: 8200, projPts: 18.3, trend: "trending" },
  { id: "p3", name: "Tyler Chen", pos: "WR", team: "Flag Masters", salary: 7800, projPts: 16.8, trend: "trending" },
  { id: "p4", name: "Jamal Rivera", pos: "RB", team: "Rush Hour", salary: 7500, projPts: 15.2, trend: "arrow" },
  { id: "p5", name: "Chris Thompson", pos: "WR", team: "Touchdown Kings", salary: 7000, projPts: 14.1, trend: "flame" },
  { id: "p6", name: "Alex Kim", pos: "QB", team: "Pocket Rockets", salary: 8800, projPts: 22.0, trend: "trending" },
  { id: "p7", name: "Brandon Davis", pos: "FLEX", team: "Flag City", salary: 6500, projPts: 12.8, trend: "arrow" },
  { id: "p8", name: "Darius Mitchell", pos: "WR", team: "Red Zone Raiders", salary: 6800, projPts: 13.5, trend: "trending" },
];

const SALARY_CAP = 50000;

export default function FantasyPage() {
  const [tab, setTab] = useState<"lobby" | "lineup">("lobby");
  const [filterType, setFilterType] = useState<"ALL" | ContestType>("ALL");
  const [roster, setRoster] = useState<string[]>([]);

  const rosterPlayers = availablePlayers.filter((p) => roster.includes(p.id));
  const salaryUsed = rosterPlayers.reduce((s, p) => s + p.salary, 0);
  const projPoints = rosterPlayers.reduce((s, p) => s + p.projPts, 0);
  const salaryRemaining = SALARY_CAP - salaryUsed;

  const filteredContests = filterType === "ALL" ? contests : contests.filter((c) => c.type === filterType);

  const togglePlayer = (id: string) => {
    setRoster((r) => {
      if (r.includes(id)) return r.filter((x) => x !== id);
      if (r.length >= 5) return r;
      const player = availablePlayers.find((p) => p.id === id)!;
      if (salaryUsed + player.salary > SALARY_CAP) return r;
      return [...r, id];
    });
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="of-container">
          <div className="mb-8">
            <h1 className="of-heading-md text-white mb-2 inline-flex items-center gap-2">
              <TechIcon name="zap" size={22} color="var(--of-gold)" />
              Daily Fantasy
            </h1>
            <p className="of-body-lg">Build your lineup, enter contests, win FLAG tokens. 10% platform rake funds growth.</p>
          </div>

          {/* Tab Switch */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setTab("lobby")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
              style={{ background: tab === "lobby" ? "var(--of-gradient-gold)" : "var(--of-bg-elevated)", color: tab === "lobby" ? "#0A0A0F" : "#8B949E" }}
            >
              Contest Lobby
            </button>
            <button
              onClick={() => setTab("lineup")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
              style={{ background: tab === "lineup" ? "var(--of-gradient-gold)" : "var(--of-bg-elevated)", color: tab === "lineup" ? "#0A0A0F" : "#8B949E" }}
            >
              Build Lineup
            </button>
          </div>

          {tab === "lobby" && (
            <>
              {/* Type Filters */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {(["ALL", "TOURNAMENT", "HEAD_TO_HEAD", "FIFTY_FIFTY"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterType(f)}
                    className="px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer"
                    style={{ background: filterType === f ? "var(--of-bg-elevated)" : "transparent", color: filterType === f ? "var(--of-gold)" : "#8B949E", border: `1px solid ${filterType === f ? "var(--of-gold)" : "transparent"}` }}
                  >
                    {f === "ALL" ? "All Contests" : contestTypeConfig[f].label}
                  </button>
                ))}
              </div>

              {/* Contest List */}
              <div className="space-y-3">
                {filteredContests.map((c, i) => {
                  const tc = contestTypeConfig[c.type];
                  const fillPct = (c.entries / c.maxEntries) * 100;
                  return (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="of-glass p-4 flex flex-col md:flex-row md:items-center gap-4"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <TechIcon name={tc.icon} size={22} color={tc.color} container="diamond" />
                        <div className="min-w-0">
                          <h3 className="text-white font-bold text-sm truncate">{c.name}</h3>
                          <div className="flex items-center gap-2 text-[10px] text-[var(--of-text-dim)]">
                            <span style={{ color: tc.color }}>{tc.label}</span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1"><TechIcon name="timer" size={10} color="var(--of-text-dim)" /> {c.startTime}</span>
                            <span>•</span>
                            <span>{c.tier}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-center">
                        <div>
                          <div className="text-xs text-[var(--of-text-dim)]">Entry</div>
                          <div className="text-sm font-bold text-white">{c.entryFee} FLAG</div>
                        </div>
                        <div>
                          <div className="text-xs text-[var(--of-text-dim)]">Prize</div>
                          <div className="text-sm font-bold text-[var(--of-gold)]">{c.prizePool} FLAG</div>
                        </div>
                        <div className="w-20">
                          <div className="text-xs text-[var(--of-text-dim)] mb-1">{c.entries}/{c.maxEntries}</div>
                          <div className="h-1.5 rounded-full" style={{ background: "var(--of-bg-deep)" }}>
                            <div className="h-full rounded-full" style={{ width: `${fillPct}%`, background: fillPct > 80 ? "#E63946" : "var(--of-gradient-gold)" }} />
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg text-xs font-bold text-[#0A0A0F] cursor-pointer hover:scale-105 transition-transform" style={{ background: "var(--of-gradient-gold)" }}>
                          Enter
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}

          {tab === "lineup" && (
            <>
              {/* Salary Cap Bar */}
              <div className="of-glass p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-[10px] text-[var(--of-text-dim)] uppercase tracking-wider">Salary Used</div>
                      <div className="text-lg font-bold text-white">${salaryUsed.toLocaleString()} <span className="text-xs text-[var(--of-text-dim)]">/ ${SALARY_CAP.toLocaleString()}</span></div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--of-text-dim)] uppercase tracking-wider">Remaining</div>
                      <div className="text-lg font-bold" style={{ color: salaryRemaining > 10000 ? "#2EC4B6" : salaryRemaining > 5000 ? "#F5A623" : "#E63946" }}>
                        ${salaryRemaining.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--of-text-dim)] uppercase tracking-wider">Proj. Points</div>
                      <div className="text-lg font-bold text-[var(--of-gold)]">{projPoints.toFixed(1)}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: roster.length === 5 ? "#2EC4B6" : "#8B949E" }}>
                    {roster.length}/5 Players
                  </div>
                </div>
                <div className="h-2 rounded-full" style={{ background: "var(--of-bg-elevated)" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${(salaryUsed / SALARY_CAP) * 100}%`, background: salaryRemaining < 5000 ? "#E63946" : "var(--of-gradient-gold)" }} />
                </div>
              </div>

              {/* Roster Slots */}
              {rosterPlayers.length > 0 && (
                <div className="of-glass p-4 mb-6">
                  <h3 className="text-sm font-bold text-white mb-3">Your Lineup</h3>
                  <div className="flex flex-wrap gap-2">
                    {rosterPlayers.map((p) => (
                      <div key={p.id} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "var(--of-bg-elevated)", border: "1px solid rgba(245,166,35,0.2)" }}>
                        <span className="text-[10px] font-bold text-[var(--of-gold)]">{p.pos}</span>
                        <span className="text-sm font-semibold text-white">{p.name}</span>
                        <span className="text-xs text-[var(--of-text-dim)]">${p.salary.toLocaleString()}</span>
                        <button onClick={() => togglePlayer(p.id)} className="text-xs text-[#E63946] hover:text-[#ff6b6b] cursor-pointer ml-1">Drop</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Players */}
              <div className="space-y-2">
                <div className="flex items-center px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--of-text-dim)]">
                  <span className="w-8">POS</span>
                  <span className="flex-1">Player</span>
                  <span className="w-16 text-right">Salary</span>
                  <span className="w-16 text-right">Proj Pts</span>
                      <span className="w-12 text-center">Trend</span>
                  <span className="w-16"></span>
                </div>
                {availablePlayers.map((p, i) => {
                  const isRostered = roster.includes(p.id);
                  const canAdd = !isRostered && roster.length < 5 && salaryUsed + p.salary <= SALARY_CAP;
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="of-glass flex items-center px-4 py-3 text-sm"
                      style={isRostered ? { borderColor: "rgba(245,166,35,0.3)", background: "rgba(245,166,35,0.03)" } : {}}
                    >
                      <span className="w-8 text-[10px] font-bold text-[var(--of-gold)]">{p.pos}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-white font-semibold">{p.name}</span>
                        <span className="text-xs text-[var(--of-text-dim)] ml-2">{p.team}</span>
                      </div>
                      <span className="w-16 text-right text-xs font-mono text-[var(--of-text-muted)]">${p.salary.toLocaleString()}</span>
                      <span className="w-16 text-right text-xs font-bold text-[#2EC4B6]">{p.projPts}</span>
                      <span className="w-12 text-center inline-flex justify-center">
                        <TechIcon
                          name={p.trend}
                          size={14}
                          color={p.trend === "flame" ? "#E63946" : p.trend === "trending" ? "#2EC4B6" : "#8B949E"}
                        />
                      </span>
                      <div className="w-16 text-right">
                        <button
                          onClick={() => togglePlayer(p.id)}
                          className="px-3 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors"
                          style={{
                            background: isRostered ? "rgba(230,57,70,0.15)" : canAdd ? "rgba(46,196,182,0.15)" : "rgba(139,148,158,0.1)",
                            color: isRostered ? "#E63946" : canAdd ? "#2EC4B6" : "#484F58",
                            border: `1px solid ${isRostered ? "rgba(230,57,70,0.3)" : canAdd ? "rgba(46,196,182,0.3)" : "transparent"}`,
                          }}
                          disabled={!isRostered && !canAdd}
                        >
                          {isRostered ? "Drop" : canAdd ? "+ Add" : "—"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {roster.length === 5 && (
                <div className="mt-6 text-center">
                  <button className="of-btn-shimmer px-8 py-3 text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2">
                    <TechIcon name="zap" size={14} color="currentColor" />
                    Submit Lineup & Enter Contest
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
