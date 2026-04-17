"use client";

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="of-orb of-orb-gold" style={{ top: "10%", left: "5%" }} />
      <div className="of-orb of-orb-purple" style={{ top: "60%", right: "10%" }} />
      <div className="of-orb of-orb-cyan" style={{ bottom: "15%", left: "40%" }} />
      <div
        className="of-orb"
        style={{
          top: "30%",
          right: "25%",
          width: 180,
          height: 180,
          background: "var(--of-pink)",
          filter: "blur(100px)",
          opacity: 0.06,
          animationDelay: "-8s",
        }}
      />
    </div>
  );
}
