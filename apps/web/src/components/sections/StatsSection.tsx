"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState } from "react";
import { TechIcon } from "@/components/ui/TechIcon";

const stats = [
  { label: "Active Players", value: 12847, prefix: "", suffix: "+", icon: "runner", color: "var(--of-green)" },
  { label: "NFTs Minted", value: 58320, prefix: "", suffix: "", icon: "gem", color: "var(--of-cyan)" },
  { label: "Tokens Earned", value: 2450000, prefix: "", suffix: "", icon: "coins", color: "var(--of-gold)" },
  { label: "Games Played", value: 4891, prefix: "", suffix: "", icon: "stadium", color: "var(--of-purple)" },
];

function AnimatedCounter({ value, prefix = "", suffix = "", visible }: { value: number; prefix: string; suffix: string; visible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      const current = Math.floor(eased * value);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [visible, value]);

  const formatted = count >= 1000000
    ? `${(count / 1000000).toFixed(1)}M`
    : count >= 1000
    ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
    : count.toLocaleString();

  return (
    <span>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export function StatsSection() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <section className="relative py-8 overflow-hidden">
      {/* Ticker bar */}
      <div
        className="of-ticker py-4 mb-12"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.05), transparent)",
          borderTop: "1px solid var(--of-border)",
          borderBottom: "1px solid var(--of-border)",
        }}
      >
        <div className="of-ticker-content">
          {Array.from({ length: 2 }).map((_, rep) => (
            <span key={rep} className="inline-flex items-center gap-12 mr-12">
              {[
                { icon: "football", text: "PLAY TO EARN" },
                { icon: "gem", text: "COLLECT NFTS" },
                { icon: "trophy", text: "WIN TOURNAMENTS" },
                { icon: "flame", text: "STAKE & EARN" },
                { icon: "zap", text: "FANTASY LEAGUES" },
                { icon: "target", text: "PREDICTIONS" },
                { icon: "shield", text: "SEASON PASSES" },
              ].map((t) => (
                <span key={t.text} className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "var(--of-text-dim)" }}>
                  <TechIcon name={t.icon} size={14} color="var(--of-gold)" />
                  {t.text}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="of-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`of-glass of-stat-card transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="mb-3">
                <TechIcon name={stat.icon} size={28} color={stat.color} container="diamond" />
              </div>
              <div className="of-stat-number">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  visible={visible}
                />
              </div>
              <div className="of-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
