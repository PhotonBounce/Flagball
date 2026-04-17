"use client";

/* ── HUD-style corner brackets and scan-line overlay ───── */

export function HUDOverlay() {
  return (
    <div className="of-hud-overlay pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      {/* Corner brackets */}
      <div className="of-hud-corner of-hud-corner--tl" />
      <div className="of-hud-corner of-hud-corner--tr" />
      <div className="of-hud-corner of-hud-corner--bl" />
      <div className="of-hud-corner of-hud-corner--br" />

      {/* Top status bar */}
      <div className="of-hud-status-bar">
        <span className="of-hud-dot of-hud-dot--live" />
        <span className="of-hud-label">SYS:ONLINE</span>
        <span className="of-hud-divider" />
        <span className="of-hud-label">ONLYFLAGS v1.0</span>
        <span className="of-hud-divider" />
        <span className="of-hud-label">POLYGON MAINNET</span>
      </div>
    </div>
  );
}

export function ScanLines() {
  return (
    <div className="of-scanlines pointer-events-none fixed inset-0 z-30" aria-hidden="true" />
  );
}
