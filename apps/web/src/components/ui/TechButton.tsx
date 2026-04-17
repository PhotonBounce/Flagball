"use client";

import { type ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "danger" | "neon";

interface TechButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function TechButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  fullWidth = false,
}: TechButtonProps) {
  const sizeClasses = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`of-btn-tech of-btn-tech--${variant} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <span className="of-btn-tech-scanline" />
      <span className="of-btn-tech-content">{children}</span>
      <span className="of-btn-tech-corners" />
    </button>
  );
}
