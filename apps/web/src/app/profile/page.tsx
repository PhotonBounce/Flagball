"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechIcon } from "@/components/ui/TechIcon";

const mockProfile = {
  id: "usr_1",
  nickname: "FlagKing99",
  email: "player@example.com",
  phone: "+1 555-0123",
  role: "FAN",
  level: 28,
  xp: 14200,
  xpToNext: 18000,
  joinedAt: "Jan 2026",
  city: "Miami",
  state: "FL",
  avatarEmoji: "football",
  subscription: "PRO",
  flagBalance: 4250,
  nftCount: 12,
  stakedCount: 3,
  gamesPlayed: 47,
  touchdowns: 32,
  interceptions: 8,
  mvpAwards: 3,
  shareStreak: 7,
  affiliateTier: "SILVER",
  referrals: 14,
  commissionsEarned: 520,
  fantasyWins: 8,
  tournamentWins: 2,
};

const recentActivity = [
  { icon: "trophy", text: "Won Friday Night Showdown fantasy contest", time: "2h ago", tokens: "+125 FLAG" },
  { icon: "gem", text: "Earned Rare NFT: 100 Games Club", time: "1d ago", tokens: null },
  { icon: "coins", text: "Claimed staking rewards", time: "1d ago", tokens: "+40 FLAG" },
  { icon: "share", text: "Share streak extended to 7 days (2x multiplier)", time: "2d ago", tokens: "+20 FLAG" },
  { icon: "target", text: "Won prediction: Blitz Squad vs Red Zone Raiders", time: "3d ago", tokens: "+50 FLAG" },
  { icon: "zap", text: "Touchdown in Spring Showdown match", time: "4d ago", tokens: "+15 FLAG" },
  { icon: "users", text: "Referral bonus: New player signed up", time: "5d ago", tokens: "+25 FLAG" },
];

const achievements = [
  { id: "1", icon: "ticket", name: "First Game", desc: "Attended first flag football game", earned: true },
  { id: "2", icon: "football", name: "50 Games", desc: "Played 50 games", earned: false, progress: 47, total: 50 },
  { id: "3", icon: "trophy", name: "MVP", desc: "Earned 3 MVP awards", earned: true },
  { id: "4", icon: "gem", name: "NFT Collector", desc: "Own 10+ NFTs", earned: true },
  { id: "5", icon: "flame", name: "Hot Streak", desc: "7-day share streak", earned: true },
  { id: "6", icon: "pickaxe", name: "Master Staker", desc: "Stake 5 NFTs simultaneously", earned: false, progress: 3, total: 5 },
  { id: "7", icon: "users", name: "Recruiter", desc: "Refer 10 players", earned: true },
  { id: "8", icon: "book", name: "Rules Expert", desc: "Pass the rules quiz with 80%+", earned: true },
];

const subColors: Record<string, string> = { FREE: "#8B949E", PRO: "#F5A623", ELITE: "#7B2FBE" };

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const p = mockProfile;
  const levelProgress = (p.xp / p.xpToNext) * 100;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="of-container">
          {/* Profile Header */}
          <div className="of-glass p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--of-bg-elevated)", border: "2px solid var(--of-gold)", boxShadow: "0 0 30px rgba(245,166,35,0.2)" }}
                >
                  <TechIcon name={p.avatarEmoji} size={42} color="var(--of-gold)" container="hex" />
                </div>
                <span
                  className="absolute -bottom-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ color: subColors[p.subscription], background: `${subColors[p.subscription]}15`, border: `1px solid ${subColors[p.subscription]}30` }}
                >
                  {p.subscription}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-black text-white">{p.nickname}</h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--of-text-dim)] px-2 py-0.5 rounded bg-[var(--of-bg-elevated)]">
                    {p.role}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--of-text-muted)] mb-3">
                  <span className="inline-flex items-center gap-1"><TechIcon name="mappin" size={12} color="var(--of-text-muted)" /> {p.city}, {p.state}</span>
                  <span className="inline-flex items-center gap-1"><TechIcon name="calendar" size={12} color="var(--of-text-muted)" /> Joined {p.joinedAt}</span>
                  <span className="inline-flex items-center gap-1"><TechIcon name="users" size={12} color="var(--of-text-muted)" /> {p.referrals} referrals</span>
                </div>

                {/* Level bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[var(--of-gold)]">Level {p.level}</span>
                    <span className="text-[var(--of-text-dim)]">{p.xp.toLocaleString()} / {p.xpToNext.toLocaleString()} XP</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "var(--of-bg-elevated)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--of-gradient-gold)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${levelProgress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    style={{ background: "var(--of-bg-elevated)", color: "#8B949E", border: "1px solid var(--of-border)" }}
                  >
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                  <button className="px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors" style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6", border: "1px solid rgba(46,196,182,0.2)" }}>
                    Share Profile
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                <div className="of-glass p-3 text-center min-w-[100px]">
                  <div className="text-xl font-black text-[var(--of-gold)]">{p.flagBalance.toLocaleString()}</div>
                  <div className="text-[9px] uppercase tracking-widest text-[var(--of-text-dim)]">FLAG Tokens</div>
                </div>
                <div className="of-glass p-3 text-center min-w-[100px]">
                  <div className="text-xl font-black text-[#00E5FF]">{p.nftCount}</div>
                  <div className="text-[9px] uppercase tracking-widest text-[var(--of-text-dim)]">NFTs Owned</div>
                </div>
                <div className="of-glass p-3 text-center min-w-[100px]">
                  <div className="text-xl font-black text-white">{p.gamesPlayed}</div>
                  <div className="text-[9px] uppercase tracking-widest text-[var(--of-text-dim)]">Games Played</div>
                </div>
                <div className="of-glass p-3 text-center min-w-[100px]">
                  <div className="text-xl font-black text-[#E63946]">{p.touchdowns}</div>
                  <div className="text-[9px] uppercase tracking-widest text-[var(--of-text-dim)]">Touchdowns</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Column 1: Game Stats */}
            <div className="space-y-4">
              <div className="of-glass p-5">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><TechIcon name="football" size={16} color="var(--of-gold)" /> Game Stats</h3>
                <div className="space-y-3">
                  {[
                    { label: "Touchdowns", value: p.touchdowns, color: "#E63946" },
                    { label: "Interceptions", value: p.interceptions, color: "#00E5FF" },
                    { label: "MVP Awards", value: p.mvpAwards, color: "#F5A623" },
                    { label: "Fantasy Wins", value: p.fantasyWins, color: "#2EC4B6" },
                    { label: "Tournament Wins", value: p.tournamentWins, color: "#7B2FBE" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.03)]">
                      <span className="text-xs text-[var(--of-text-muted)]">{s.label}</span>
                      <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affiliate Stats */}
              <div className="of-glass p-5">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><TechIcon name="users" size={16} color="var(--of-cyan)" /> Affiliate Program</h3>
                <div className="text-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ color: "#F5A623", background: "rgba(245,166,35,0.1)" }}>
                    {p.affiliateTier} Tier
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--of-text-muted)]">Referrals</span>
                    <span className="font-bold text-white">{p.referrals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--of-text-muted)]">Commissions Earned</span>
                    <span className="font-bold text-[var(--of-gold)]">{p.commissionsEarned} FLAG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--of-text-muted)]">Share Streak</span>
                    <span className="font-bold text-[#E63946]">{p.shareStreak} days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Recent Activity */}
            <div className="of-glass p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><TechIcon name="clipboard" size={16} color="var(--of-cyan)" /> Recent Activity</h3>
              <div className="space-y-1">
                {recentActivity.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--of-bg-elevated)] transition-colors"
                  >
                    <span className="flex-shrink-0 mt-0.5"><TechIcon name={a.icon} size={16} color="var(--of-gold)" /></span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--of-text-muted)] leading-relaxed">{a.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-[var(--of-text-dim)]">{a.time}</span>
                        {a.tokens && <span className="text-[10px] font-bold text-[var(--of-gold)]">{a.tokens}</span>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Column 3: Achievements */}
            <div className="of-glass p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <TechIcon name="medal" size={16} color="var(--of-gold)" /> Achievements
                <span className="text-[10px] text-[var(--of-text-dim)] ml-auto">{achievements.filter((a) => a.earned).length}/{achievements.length}</span>
              </h3>
              <div className="space-y-3">
                {achievements.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-2 rounded-lg"
                    style={{ opacity: a.earned ? 1 : 0.5 }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: a.earned ? "rgba(245,166,35,0.1)" : "var(--of-bg-elevated)",
                        border: a.earned ? "1px solid rgba(245,166,35,0.2)" : "1px solid transparent",
                      }}
                    >
                      <TechIcon name={a.icon} size={16} color={a.earned ? "var(--of-gold)" : "var(--of-text-dim)"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white flex items-center gap-1">
                        {a.name}
                        {a.earned && <span className="text-[var(--of-gold)]">Earned</span>}
                      </div>
                      <div className="text-[10px] text-[var(--of-text-dim)]">{a.desc}</div>
                      {!a.earned && a.progress !== undefined && (
                        <div className="h-1 rounded-full mt-1" style={{ background: "var(--of-bg-elevated)", width: "80px" }}>
                          <div className="h-full rounded-full" style={{ width: `${(a.progress / a.total!) * 100}%`, background: "var(--of-gradient-gold)" }} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
