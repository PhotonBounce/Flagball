"use client";

import { useEffect, useState } from "react";
import { TechIcon } from "@/components/ui/TechIcon";
import { TechButton } from "@/components/ui/TechButton";
import {
  LayoutDashboard, Store, Landmark, Swords, Trophy, Crosshair, BookOpen, User,
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Market", href: "/marketplace", icon: Store },
  { label: "Staking", href: "/staking", icon: Landmark },
  { label: "Fantasy", href: "/fantasy", icon: Swords },
  { label: "Tourneys", href: "/tournaments", icon: Trophy },
  { label: "Predict", href: "/predictions", icon: Crosshair },
  { label: "Rules", href: "/rules", icon: BookOpen },
  { label: "Profile", href: "/profile", icon: User },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
      style={{
        background: scrolled ? "rgba(10, 10, 15, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(0, 229, 255, 0.08)"
          : "1px solid transparent",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: scrolled
            ? "linear-gradient(90deg, transparent, var(--of-cyan), var(--of-gold), var(--of-cyan), transparent)"
            : "transparent",
          opacity: 0.4,
          transition: "all 0.5s ease",
        }}
      />

      <div className="of-container flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <span className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            <TechIcon name="football" size={22} color="var(--of-gold)" />
          </span>
          <span className="text-xl font-black tracking-tight">
            <span className="text-white">ONLY</span>
            <span className="of-text-gradient">FLAGS</span>
          </span>
          <span
            className="hidden sm:inline-block text-[8px] font-bold tracking-[0.3em] uppercase px-2 py-0.5 ml-1"
            style={{
              color: "var(--of-cyan)",
              background: "rgba(0, 229, 255, 0.06)",
              border: "1px solid rgba(0, 229, 255, 0.15)",
              borderRadius: "2px",
            }}
          >
            BETA
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-sm hover:bg-white/[0.03]"
                style={{ color: "var(--of-text-muted)" }}
              >
                <Icon
                  size={14}
                  className="transition-colors duration-300 group-hover:text-[var(--of-cyan)]"
                  style={{ opacity: 0.5 }}
                />
                <span className="group-hover:text-white transition-colors duration-300">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <TechButton variant="ghost" size="sm">Sign In</TechButton>
          <TechButton variant="primary" size="sm">Get Started</TechButton>
        </div>

        {/* Mobile hamburger — sci-fi bars */}
        <button
          className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="w-6 h-[2px] transition-all duration-300"
            style={{
              background: mobileOpen ? "var(--of-cyan)" : "var(--of-text)",
              transform: mobileOpen ? "rotate(45deg) translateY(5px)" : "none",
              boxShadow: mobileOpen ? "0 0 8px var(--of-cyan)" : "none",
            }}
          />
          <span
            className="w-4 h-[2px] transition-all duration-300"
            style={{
              background: "var(--of-text)",
              opacity: mobileOpen ? 0 : 0.5,
            }}
          />
          <span
            className="w-6 h-[2px] transition-all duration-300"
            style={{
              background: mobileOpen ? "var(--of-cyan)" : "var(--of-text)",
              transform: mobileOpen ? "rotate(-45deg) translateY(-5px)" : "none",
              boxShadow: mobileOpen ? "0 0 8px var(--of-cyan)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "rgba(10, 10, 15, 0.95)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(0, 229, 255, 0.08)",
        }}
      >
        <div className="of-container py-6 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 py-3 px-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white/[0.03]"
                style={{ color: "var(--of-text-muted)" }}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={16} style={{ color: "var(--of-cyan)", opacity: 0.5 }} />
                {link.label}
              </a>
            );
          })}
          <div className="pt-4 flex gap-3">
            <TechButton variant="ghost" size="sm" fullWidth>Sign In</TechButton>
            <TechButton variant="primary" size="sm" fullWidth>Get Started</TechButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
