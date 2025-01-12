"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { StatsSection } from "@/components/sections/stats-section";
import { DemoSection } from "@/components/sections/demo-section";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar onNavigate={scrollToSection} />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <DemoSection />
      </main>
    </>
  );
}