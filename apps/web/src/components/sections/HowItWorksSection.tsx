"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TechIcon } from "@/components/ui/TechIcon";

const steps = [
  {
    number: "01",
    title: "Sign Up & Join",
    description: "Create your profile, find your local team or request a new one. Earn your first tokens just for joining.",
    icon: "gamepad",
    accent: "var(--of-gold)",
  },
  {
    number: "02",
    title: "Play & Record",
    description: "Hit the field! Referees log your stats in real-time — touchdowns, interceptions, flag pulls. Every stat earns XP.",
    icon: "runner",
    accent: "var(--of-green)",
  },
  {
    number: "03",
    title: "Earn & Collect",
    description: "Earn FLAG tokens and NFTs for playing, attending events, sharing content, and completing challenges.",
    icon: "wallet",
    accent: "var(--of-cyan)",
  },
  {
    number: "04",
    title: "Trade & Stake",
    description: "List NFTs on the marketplace, stake rare cards for daily yield, bid on exclusive auction drops.",
    icon: "trending",
    accent: "var(--of-purple)",
  },
  {
    number: "05",
    title: "Dominate",
    description: "Enter tournaments, build fantasy rosters, predict outcomes, climb the leaderboard. This is your game.",
    icon: "trophy",
    accent: "var(--of-orange)",
  },
];

export function HowItWorksSection() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section className="relative py-32" id="how-it-works">
      <div className="of-container">
        {/* Section header */}
        <div className="text-center mb-20">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-2 rounded-full"
            style={{ color: "var(--of-green)", background: "rgba(46, 196, 182, 0.06)", border: "1px solid rgba(46, 196, 182, 0.15)" }}
          >
            How It Works
          </span>
          <h2 className="of-heading-lg mt-4">
            <span className="text-white">From Field to </span>
            <span className="of-text-gradient">Fortune</span>
          </h2>
        </div>

        {/* Steps timeline */}
        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: visible
                ? "linear-gradient(to bottom, var(--of-gold), var(--of-green), var(--of-cyan), var(--of-purple), var(--of-orange))"
                : "var(--of-border)",
              transition: "background 2s ease",
            }}
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={step.number}
                className={`relative flex items-center mb-16 last:mb-0 transition-all duration-800 ${
                  visible ? "opacity-100" : "opacity-0"
                } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                style={{
                  transitionDelay: `${i * 200}ms`,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                }}
              >
                {/* Step marker */}
                <div
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{
                    background: step.accent,
                    boxShadow: `0 0 20px ${step.accent}60`,
                  }}
                />

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[45%] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="of-glass p-8 group cursor-default">
                    <div className="flex items-center gap-4 mb-4">
                      <TechIcon
                        name={step.icon}
                        size={28}
                        color={step.accent}
                        container="square"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      <div>
                        <span
                          className="text-xs font-bold tracking-[0.3em] uppercase block"
                          style={{ color: step.accent }}
                        >
                          Step {step.number}
                        </span>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--of-text-muted)" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
