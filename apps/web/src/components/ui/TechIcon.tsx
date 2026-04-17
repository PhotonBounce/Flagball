"use client";

import type { CSSProperties } from "react";
import {
  Zap, Trophy, Target, Smartphone, Palette, ShoppingBag,
  Gem, Coins, Gamepad2, TrendingUp, Flame, Shield,
  Ticket, BookOpen, Swords, Moon, Waves, Lightbulb,
  Medal, ClipboardList, Timer, BarChart3, Star, Users,
  Landmark, MapPin, Calendar, Lock, Crown, Wind,
  AlertTriangle, ArrowRight, Dumbbell, CircleDollarSign,
  Flag, Eye, Play, Volume2, VolumeX, Crosshair,
  Activity, Gift, Wallet, Pickaxe, Heart, Share2,
  Camera, Music2,
  type LucideIcon,
} from "lucide-react";

/* ── Icon name → Lucide component mapping ────────────── */
const iconMap: Record<string, LucideIcon> = {
  football: Flag,        // Custom football SVG below overrides this
  gem: Gem,
  diamond: Gem,
  coins: Coins,
  token: CircleDollarSign,
  trophy: Trophy,
  target: Target,
  crosshair: Crosshair,
  phone: Smartphone,
  palette: Palette,
  shop: ShoppingBag,
  runner: Activity,
  gamepad: Gamepad2,
  trending: TrendingUp,
  chart: BarChart3,
  flame: Flame,
  fire: Flame,
  shield: Shield,
  ticket: Ticket,
  book: BookOpen,
  swords: Swords,
  moon: Moon,
  waves: Waves,
  lightbulb: Lightbulb,
  medal: Medal,
  clipboard: ClipboardList,
  timer: Timer,
  star: Star,
  users: Users,
  stadium: Landmark,
  mappin: MapPin,
  calendar: Calendar,
  lock: Lock,
  crown: Crown,
  wind: Wind,
  warning: AlertTriangle,
  arrow: ArrowRight,
  strong: Dumbbell,
  flag: Flag,
  eye: Eye,
  play: Play,
  volume: Volume2,
  mute: VolumeX,
  gift: Gift,
  wallet: Wallet,
  pickaxe: Pickaxe,
  heart: Heart,
  share: Share2,
  camera: Camera,
  music: Music2,
  zap: Zap,
  bolt: Zap,
};

/* ── Custom Football SVG ─────────────────────────────── */
function FootballSVG({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="12" rx="10" ry="6" transform="rotate(-45 12 12)" />
      <path d="M7.5 7.5l9 9" />
      <path d="M9 5.5l1.5 1.5" />
      <path d="M5.5 9l1.5 1.5" />
      <path d="M13.5 17l1.5 1.5" />
      <path d="M17 13.5l1.5 1.5" />
    </svg>
  );
}

/* ── Container shapes ────────────────────────────────── */
type ContainerShape = "hex" | "diamond" | "circle" | "square" | "none";

const shapeClasses: Record<ContainerShape, string> = {
  hex: "of-icon-hex",
  diamond: "of-icon-diamond",
  circle: "of-icon-circle",
  square: "of-icon-square",
  none: "",
};

/* ── Main TechIcon component ─────────────────────────── */
interface TechIconProps {
  name: string;
  size?: number;
  color?: string;
  glow?: string;
  container?: ContainerShape;
  className?: string;
  animated?: boolean;
}

export function TechIcon({
  name,
  size = 24,
  color = "var(--of-gold)",
  glow,
  container = "none",
  className = "",
  animated = false,
}: TechIconProps) {
  const glowColor = glow || color;
  const Icon = iconMap[name];

  const iconElement =
    name === "football" ? (
      <FootballSVG size={size} className={animated ? "of-icon-pulse" : ""} />
    ) : Icon ? (
      <Icon size={size} className={animated ? "of-icon-pulse" : ""} />
    ) : (
      <Zap size={size} className={animated ? "of-icon-pulse" : ""} />
    );

  if (container === "none") {
    return (
      <span
        className={`inline-flex items-center justify-center ${className}`}
        style={{ color, filter: `drop-shadow(0 0 8px ${glowColor}40)` }}
      >
        {iconElement}
      </span>
    );
  }

  return (
    <span
      className={`of-icon-frame ${shapeClasses[container]} ${className}`}
      style={{
        "--icon-color": color,
        "--icon-glow": glowColor,
      } as CSSProperties}
    >
      <span className="of-icon-frame-border" />
      <span className="of-icon-frame-inner" style={{ color }}>
        {iconElement}
      </span>
    </span>
  );
}
