"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechIcon } from "@/components/ui/TechIcon";

type TournamentStatus = "UPCOMING" | "LIVE" | "COMPLETED";

const statusConfig: Record<TournamentStatus, { label: string; color: string; bg: string }> = {
  UPCOMING: { label: "Upcoming", color: "#F5A623", bg: "rgba(245,166,35,0.1)" },
  LIVE: { label: "Live", color: "#E63946", bg: "rgba(230,57,70,0.1)" },
  COMPLETED: { label: "Completed", color: "#8B949E", bg: "rgba(139,148,158,0.1)" },
};

const tournaments = [
  {
    id: "1", name: "Spring Showdown Championship", status: "LIVE" as TournamentStatus, format: "SINGLE_ELIMINATION",
    icon: "trophy", entryFee: 50, prizePool: 2500, teams: 16, maxTeams: 16, startDate: "Apr 15", location: "Miami, FL",
    description: "The biggest spring tournament. 16 teams battle for glory.",
  },
  {
    id: "2", name: "Weekly Blitz League", status: "UPCOMING" as TournamentStatus, format: "ROUND_ROBIN",
    icon: "zap", entryFee: 25, prizePool: 1000, teams: 6, maxTeams: 8, startDate: "Apr 22", location: "Austin, TX",
    description: "Round-robin format. Every team plays every other team.",
  },
  {
    id: "3", name: "Midnight Madness", status: "UPCOMING" as TournamentStatus, format: "DOUBLE_ELIMINATION",
    icon: "moon", entryFee: 75, prizePool: 5000, teams: 10, maxTeams: 32, startDate: "May 1", location: "Las Vegas, NV",
    description: "Double elimination under the lights. Big entry, bigger prizes.",
  },
  {
    id: "4", name: "Coastal Classic", status: "COMPLETED" as TournamentStatus, format: "SINGLE_ELIMINATION",
    icon: "waves", entryFee: 40, prizePool: 1800, teams: 8, maxTeams: 8, startDate: "Apr 5", location: "San Diego, CA",
    description: "Beachside battle. 8 teams, one champion.",
  },
  {
    id: "5", name: "Friday Night Lights", status: "UPCOMING" as TournamentStatus, format: "SINGLE_ELIMINATION",
    icon: "lightbulb", entryFee: 30, prizePool: 1500, teams: 4, maxTeams: 16, startDate: "Apr 25", location: "Dallas, TX",
    description: "Under the lights, anything can happen. Open registration.",
  },
  {
    id: "6", name: "Pro Invitational", status: "COMPLETED" as TournamentStatus, format: "ROUND_ROBIN",
    icon: "medal", entryFee: 100, prizePool: 8000, teams: 6, maxTeams: 6, startDate: "Mar 20", location: "Los Angeles, CA",
    description: "Invite-only for top-ranked teams. Massive prize pool.",
  },
];

const liveBracket = [
  { round: "Quarter-Finals", matches: [
    { team1: "Blitz Squad", team2: "Red Zone Raiders", score1: 28, score2: 21, winner: "team1" },
    { team1: "Flag Masters", team2: "End Zone Elite", score1: 14, score2: 35, winner: "team2" },
    { team1: "Touchdown Kings", team2: "Rush Hour", score1: 42, score2: 35, winner: "team1" },
    { team1: "Pocket Rockets", team2: "Flag City", score1: 7, score2: 21, winner: "team2" },
  ]},
  { round: "Semi-Finals", matches: [
    { team1: "Blitz Squad", team2: "End Zone Elite", score1: 35, score2: 28, winner: "team1" },
    { team1: "Touchdown Kings", team2: "Flag City", score1: null, score2: null, winner: null },
  ]},
  { round: "Final", matches: [
    { team1: "TBD", team2: "TBD", score1: null, score2: null, winner: null },
  ]},
];

export default function TournamentsPage() {
  const [filter, setFilter] = useState<"ALL" | TournamentStatus>("ALL");
  const [showBracket, setShowBracket] = useState(false);

  const filtered = filter === "ALL" ? tournaments : tournaments.filter((t) => t.status === filter);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="of-container">
          <div className="mb-8">
            <h1 className="of-heading-md text-white mb-2 inline-flex items-center gap-2">
              <TechIcon name="trophy" size={22} color="var(--of-gold)" />
              Tournaments
            </h1>
            <p className="of-body-lg">Compete for FLAG tokens and glory. 10% rake funds the prize pool platform.</p>
          </div>

          {/* Stats Banner */}
          <div className="of-glass p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <TechIcon name="flame" size={28} color="#E63946" />
              <div>
                <div className="text-sm font-bold text-[#E63946] animate-pulse">LIVE NOW</div>
                <div className="text-lg font-bold text-white">Spring Showdown Championship</div>
                <div className="text-xs text-[var(--of-text-dim)]">Semi-Finals in progress • Miami, FL</div>
              </div>
            </div>
            <button
              onClick={() => setShowBracket(!showBracket)}
              className="of-btn-shimmer px-5 py-2.5 text-sm font-bold uppercase tracking-wider"
            >
              {showBracket ? "Hide" : "View"} Live Bracket
            </button>
          </div>

          {/* Live Bracket */}
          {showBracket && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="of-glass p-6 mb-8 overflow-x-auto"
              style={{ borderColor: "rgba(230,57,70,0.2)" }}
            >
              <h3 className="text-sm font-bold text-white mb-4 inline-flex items-center gap-2">
                <TechIcon name="trophy" size={16} color="var(--of-gold)" />
                Spring Showdown - Live Bracket
              </h3>
              <div className="flex gap-8 min-w-[700px]">
                {liveBracket.map((round, ri) => (
                  <div key={round.round} className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--of-text-dim)] mb-3 text-center">
                      {round.round}
                    </div>
                    <div className="space-y-4" style={{ paddingTop: ri * 40 }}>
                      {round.matches.map((m, mi) => (
                        <div key={mi} className="rounded-xl overflow-hidden" style={{ background: "var(--of-bg-elevated)" }}>
                          <div
                            className="flex items-center justify-between px-3 py-2 text-xs"
                            style={{
                              background: m.winner === "team1" ? "rgba(46,196,182,0.06)" : undefined,
                              borderLeft: m.winner === "team1" ? "3px solid #2EC4B6" : "3px solid transparent",
                            }}
                          >
                            <span className={m.winner === "team1" ? "text-white font-bold" : "text-[var(--of-text-muted)]"}>
                              {m.team1}
                            </span>
                            <span className="font-mono font-bold" style={{ color: m.score1 !== null ? (m.winner === "team1" ? "#2EC4B6" : "#8B949E") : "#484F58" }}>
                              {m.score1 ?? "—"}
                            </span>
                          </div>
                          <div className="h-px bg-[rgba(255,255,255,0.03)]" />
                          <div
                            className="flex items-center justify-between px-3 py-2 text-xs"
                            style={{
                              background: m.winner === "team2" ? "rgba(46,196,182,0.06)" : undefined,
                              borderLeft: m.winner === "team2" ? "3px solid #2EC4B6" : "3px solid transparent",
                            }}
                          >
                            <span className={m.winner === "team2" ? "text-white font-bold" : "text-[var(--of-text-muted)]"}>
                              {m.team2}
                            </span>
                            <span className="font-mono font-bold" style={{ color: m.score2 !== null ? (m.winner === "team2" ? "#2EC4B6" : "#8B949E") : "#484F58" }}>
                              {m.score2 ?? "—"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(["ALL", "LIVE", "UPCOMING", "COMPLETED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer"
                style={{
                  background: filter === f ? "var(--of-gradient-gold)" : "var(--of-bg-elevated)",
                  color: filter === f ? "#0A0A0F" : "#8B949E",
                }}
              >
                {f === "ALL" ? "All" : f === "LIVE" ? "Live" : f === "UPCOMING" ? "Upcoming" : "Completed"}
              </button>
            ))}
          </div>

          {/* Tournament Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((t, i) => {
              const sc = statusConfig[t.status];
              const spotsLeft = t.maxTeams - t.teams;
              const progress = (t.teams / t.maxTeams) * 100;

              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="of-glass p-5"
                  style={t.status === "LIVE" ? { borderColor: "rgba(230,57,70,0.3)", boxShadow: "0 0 20px rgba(230,57,70,0.1)" } : {}}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <TechIcon name={t.icon} size={26} color={sc.color} container="diamond" />
                      <div>
                        <h3 className="text-white font-bold">{t.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--of-text-dim)]">
                          <span className="inline-flex items-center gap-1"><TechIcon name="mappin" size={12} color="var(--of-text-dim)" /> {t.location}</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1"><TechIcon name="calendar" size={12} color="var(--of-text-dim)" /> {t.startDate}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ color: sc.color, background: sc.bg }}>
                      {sc.label}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--of-text-muted)] mb-4">{t.description}</p>

                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="rounded-lg p-2" style={{ background: "var(--of-bg-elevated)" }}>
                      <div className="text-xs text-[var(--of-text-dim)]">Entry Fee</div>
                      <div className="text-sm font-bold text-[var(--of-gold)]">{t.entryFee} FLAG</div>
                    </div>
                    <div className="rounded-lg p-2" style={{ background: "var(--of-bg-elevated)" }}>
                      <div className="text-xs text-[var(--of-text-dim)]">Prize Pool</div>
                      <div className="text-sm font-bold text-[#2EC4B6]">{t.prizePool.toLocaleString()} FLAG</div>
                    </div>
                    <div className="rounded-lg p-2" style={{ background: "var(--of-bg-elevated)" }}>
                      <div className="text-xs text-[var(--of-text-dim)]">Format</div>
                      <div className="text-[10px] font-bold text-white">{t.format.replace(/_/g, " ")}</div>
                    </div>
                  </div>

                  {/* Team fill bar */}
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="text-[var(--of-text-dim)]">{t.teams}/{t.maxTeams} teams</span>
                    {spotsLeft > 0 && t.status !== "COMPLETED" && (
                      <span className="text-[#F5A623] font-semibold">{spotsLeft} spots left</span>
                    )}
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "var(--of-bg-elevated)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                        background: progress === 100 ? "#2EC4B6" : "var(--of-gradient-gold)",
                      }}
                    />
                  </div>

                  {t.status === "UPCOMING" && spotsLeft > 0 && (
                    <button className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold text-[#0A0A0F] cursor-pointer transition-transform hover:scale-[1.02]" style={{ background: "var(--of-gradient-gold)" }}>
                      Register Team — {t.entryFee} FLAG
                    </button>
                  )}
                  {t.status === "LIVE" && (
                    <button className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer bg-[rgba(230,57,70,0.15)] border border-[rgba(230,57,70,0.3)] hover:bg-[rgba(230,57,70,0.25)] transition-colors">
                      Watch Live
                    </button>
                  )}
                  {t.status === "COMPLETED" && (
                    <button className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold text-[var(--of-text-muted)] cursor-pointer bg-[var(--of-bg-elevated)] hover:text-white transition-colors">
                      View Results
                    </button>
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
