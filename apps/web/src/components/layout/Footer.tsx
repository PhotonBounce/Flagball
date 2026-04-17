"use client";

import { TechIcon } from "@/components/ui/TechIcon";

const footerLinks = {
  Platform: [
    { label: "Features", href: "#features" },
    { label: "NFT Collection", href: "#nfts" },
    { label: "Tokenomics", href: "#tokenomics" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Tournaments", href: "/tournaments" },
  ],
  Community: [
    { label: "Discord", href: "#" },
    { label: "Twitter/X", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  Resources: [
    { label: "Rules Guide", href: "/rules" },
    { label: "Rules Quiz", href: "/quiz" },
    { label: "Creator Hub", href: "/creators" },
    { label: "Affiliate Program", href: "/affiliates" },
    { label: "API Docs", href: "/docs" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--of-border)" }}>
      <div className="of-container py-16">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <TechIcon name="football" size={20} color="var(--of-gold)" />
              <span className="text-xl font-black">
                <span className="text-white">Only</span>
                <span className="of-text-gradient">Flags</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--of-text-muted)" }}>
              The future of flag football. Play, earn, collect, and dominate — all on the blockchain.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: "share", label: "X" },
                { icon: "camera", label: "Instagram" },
                { icon: "music", label: "TikTok" },
                { icon: "play", label: "YouTube" },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 hover:scale-110"
                  style={{
                    background: "var(--of-bg-elevated)",
                    border: "1px solid var(--of-border)",
                  }}
                  aria-label={item.label}
                >
                  <TechIcon name={item.icon} size={14} color="var(--of-text-muted)" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-white mb-4 tracking-wide uppercase">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: "var(--of-text-muted)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="of-dash-line mt-16 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--of-text-dim)" }}>
            &copy; {new Date().getFullYear()} OnlyFlags. All rights reserved. Built on Polygon.
          </p>
          <div className="of-credits">
            Design/Development by <a href="https://photon-bounce.com">Photon-Bounce</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
