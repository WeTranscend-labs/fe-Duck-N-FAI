"use client";

import { Navbar } from "@/components/navbar";
import { FloatingNav } from "@/components/floating-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { StatsSection } from "@/components/sections/stats-section";
import { DemoSection } from "@/components/sections/demo-section";
import { ContactSection } from "@/components/sections/contact-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Show regular navbar on mobile and desktop (when not scrolled) */}
      <div className={isDesktop ? (scrolled ? "hidden" : "block") : "block"}>
        <Navbar onNavigate={scrollToSection} />
      </div>

      {/* Show floating nav only on desktop when scrolled */}
      {isDesktop && scrolled && (
        <FloatingNav onNavigate={scrollToSection} />
      )}

      <motion.main
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(255,218,0,0.1)_0%,rgba(255,255,255,0)_100%)]" />
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <DemoSection />
        <ContactSection />
      </motion.main>
    </>
  );
}