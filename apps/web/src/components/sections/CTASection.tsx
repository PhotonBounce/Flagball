"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { TechButton } from "@/components/ui/TechButton";

export function CTASection() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.2);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Big radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245, 166, 35, 0.08) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="of-container relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Football icon */}
          <div className="mb-8 of-football-bounce inline-block">
            <TechIcon name="football" size={48} color="var(--of-gold)" container="hex" animated />
          </div>

          <h2 className="of-heading-lg mb-6">
            <span className="text-white">Ready to</span>
            <br />
            <span className="of-text-gradient">Join the Revolution?</span>
          </h2>

          <p className="of-body-lg max-w-xl mx-auto mb-12">
            Flag football will never be the same. Get in early, earn your first tokens,
            and become part of the OnlyFlags legacy.
          </p>

          {/* Email signup */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="of-input flex-1"
            />
            <TechButton variant="primary" size="md">
              Get Early Access
            </TechButton>
          </div>

          <p className="text-xs" style={{ color: "var(--of-text-dim)" }}>
            No spam. Instant access to the beta. 100 free tokens on signup.
          </p>

          {/* Social proof */}
          <div className="mt-16 flex items-center justify-center gap-8 flex-wrap">
            <div className="flex -space-x-3">
              {["var(--of-gold)", "var(--of-cyan)", "var(--of-purple)", "var(--of-green)", "var(--of-orange)"].map((c, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                  style={{ borderColor: "var(--of-bg-deep)", background: "var(--of-bg-card)" }}
                >
                  <TechIcon name="football" size={14} color={c} />
                </div>
              ))}
            </div>
            <span className="text-sm" style={{ color: "var(--of-text-muted)" }}>
              <strong className="text-white">12,847+</strong> players already signed up
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
