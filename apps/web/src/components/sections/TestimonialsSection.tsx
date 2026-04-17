"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import { TechIcon } from "@/components/ui/TechIcon";

const testimonials = [
  {
    name: "Marcus 'Flash' Thompson",
    role: "Quarterback, ATL Lightning",
    icon: "zap",
    color: "var(--of-gold)",
    quote: "OnlyFlags turned my weekend flag football hobby into something legendary. My Player Card NFT went from Common to Epic in one season.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Team Captain, NYC Blitz",
    icon: "flame",
    color: "var(--of-orange)",
    quote: "The staking rewards are insane. I stake my rare NFTs and earn tokens while I sleep. Plus, the tournament prize pools keep getting bigger.",
    rating: 5,
  },
  {
    name: "DeAndre Williams",
    role: "Fantasy League Champion",
    icon: "trophy",
    color: "var(--of-cyan)",
    quote: "I've played fantasy football for years, but OnlyFlags fantasy is different. Real flag football players, real stats, real crypto prizes.",
    rating: 5,
  },
  {
    name: "Jessica Park",
    role: "Content Creator",
    icon: "palette",
    color: "var(--of-pink)",
    quote: "I uploaded my highlight compilations to the creator marketplace and now I earn royalties every time someone buys my content. Game changer.",
    rating: 5,
  },
  {
    name: "Coach Rodriguez",
    role: "Certified Referee",
    icon: "flag",
    color: "var(--of-green)",
    quote: "The referee app makes logging stats so easy. I earn tokens for every game I officiate, and the rules quiz feature is brilliant.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.1);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-32" id="testimonials">
      <div className="of-container" ref={ref}>
        {/* Section header */}
        <div className="text-center mb-20">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-2 rounded-full"
            style={{ color: "var(--of-pink)", background: "rgba(255, 45, 135, 0.06)", border: "1px solid rgba(255, 45, 135, 0.15)" }}
          >
            Community Voices
          </span>
          <h2 className="of-heading-lg mt-4">
            <span className="text-white">Hear from </span>
            <span className="of-text-gradient-fire">the Players</span>
          </h2>
        </div>

        {/* Main testimonial display */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="of-glass p-10 md:p-14 text-center relative overflow-hidden">
            {/* Quote mark */}
            <div
              className="absolute top-6 left-8 text-[120px] leading-none font-serif opacity-5 select-none"
              style={{ color: "var(--of-gold)" }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Avatar */}
            <div className="mb-6">
              <TechIcon
                name={testimonials[activeIdx].icon}
                size={36}
                color={testimonials[activeIdx].color}
                container="circle"
                animated
              />
            </div>

            {/* Quote */}
            <blockquote className="text-lg md:text-xl leading-relaxed font-medium text-white mb-8 relative z-10">
              &ldquo;{testimonials[activeIdx].quote}&rdquo;
            </blockquote>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: testimonials[activeIdx].rating }).map((_, i) => (
                <TechIcon key={i} name="star" size={16} color="var(--of-gold)" />
              ))}
            </div>

            {/* Author */}
            <div>
              <div className="font-bold text-white">{testimonials[activeIdx].name}</div>
              <div className="text-sm" style={{ color: "var(--of-text-muted)" }}>{testimonials[activeIdx].role}</div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  background: i === activeIdx ? "var(--of-gold)" : "var(--of-border)",
                  transform: i === activeIdx ? "scale(1.3)" : "scale(1)",
                  boxShadow: i === activeIdx ? "0 0 12px rgba(245, 166, 35, 0.5)" : "none",
                }}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
