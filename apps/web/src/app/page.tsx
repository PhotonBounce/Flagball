"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { NFTShowcaseSection } from "@/components/sections/NFTShowcaseSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TokenomicsSection } from "@/components/sections/TokenomicsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { ParticleField } from "@/components/effects/ParticleField";
import { SoundManager } from "@/components/effects/SoundManager";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { FloatingOrbs } from "@/components/effects/FloatingOrbs";
import { HUDOverlay, ScanLines } from "@/components/effects/HUDOverlay";

export default function HomePage() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <SoundManager />
      <FloatingOrbs />
      <HUDOverlay />
      <ScanLines />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <NFTShowcaseSection />
        <HowItWorksSection />
        <TokenomicsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
