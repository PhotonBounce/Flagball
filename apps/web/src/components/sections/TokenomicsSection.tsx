"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const tokenomicsData = [
  { label: "Play Rewards", percent: 40, color: "var(--of-gold)" },
  { label: "Staking Yield", percent: 20, color: "var(--of-green)" },
  { label: "Tournament Prizes", percent: 15, color: "var(--of-cyan)" },
  { label: "Creator Rewards", percent: 10, color: "var(--of-purple)" },
  { label: "Referral Program", percent: 10, color: "var(--of-orange)" },
  { label: "Community Reserve", percent: 5, color: "var(--of-pink)" },
];

const stakingTiers = [
  { rarity: "COMMON", daily: 1, color: "#8B949E" },
  { rarity: "UNCOMMON", daily: 3, color: "#2EC4B6" },
  { rarity: "RARE", daily: 8, color: "#3B82F6" },
  { rarity: "EPIC", daily: 20, color: "#7B2FBE" },
  { rarity: "LEGENDARY", daily: 50, color: "#F5A623" },
];

export function TokenomicsSection() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <section className="relative py-32 overflow-hidden" id="tokenomics">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(245, 166, 35, 0.04) 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      <div className="of-container relative z-10" ref={ref}>
        {/* Section header */}
        <div className="text-center mb-20">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-2 rounded-full"
            style={{ color: "var(--of-gold)", background: "rgba(245, 166, 35, 0.06)", border: "1px solid rgba(245, 166, 35, 0.15)" }}
          >
            Token Economy
          </span>
          <h2 className="of-heading-lg mt-4">
            <span className="text-white">FLAG Token </span>
            <span className="of-text-gradient">Economics</span>
          </h2>
          <p className="of-body-lg max-w-2xl mx-auto mt-4">
            A sustainable play-to-earn ecosystem designed to reward real players, creators, and fans.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Token distribution visual */}
          <div
            className={`transition-all duration-800 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <h3 className="text-xl font-bold text-white mb-8">Token Distribution</h3>
            <div className="space-y-5">
              {tokenomicsData.map((item, i) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.percent}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--of-bg-elevated)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-1500 ease-out"
                      style={{
                        width: visible ? `${item.percent}%` : "0%",
                        background: item.color,
                        transitionDelay: `${i * 150}ms`,
                        boxShadow: `0 0 12px ${item.color}40`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staking yields */}
          <div
            className={`transition-all duration-800 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <h3 className="text-xl font-bold text-white mb-8">Daily Staking Yield</h3>
            <div className="space-y-4">
              {stakingTiers.map((tier, i) => (
                <div
                  key={tier.rarity}
                  className="of-glass p-5 flex items-center justify-between group cursor-default"
                  style={{
                    transitionDelay: `${(i + tokenomicsData.length) * 100}ms`,
                    borderLeftWidth: "3px",
                    borderLeftColor: tier.color,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: tier.color, boxShadow: `0 0 10px ${tier.color}60` }}
                    />
                    <span className="font-semibold text-white">{tier.rarity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black" style={{ color: tier.color }}>
                      {tier.daily}
                    </span>
                    <span className="text-xs ml-1" style={{ color: "var(--of-text-dim)" }}>
                      FLAG/day
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lock bonus callout */}
            <div
              className="mt-6 of-glass p-5 text-center"
              style={{ borderColor: "rgba(245, 166, 35, 0.2)", background: "rgba(245, 166, 35, 0.03)" }}
            >
              <span className="text-sm" style={{ color: "var(--of-text-muted)" }}>
                Lock for <strong className="text-white">7d</strong> → <span style={{ color: "var(--of-gold)" }}>1.2x</span>
                {" · "}
                <strong className="text-white">30d</strong> → <span style={{ color: "var(--of-gold)" }}>1.5x</span>
                {" · "}
                <strong className="text-white">90d</strong> → <span style={{ color: "var(--of-gold)" }}>2.0x</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
