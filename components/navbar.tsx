"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? "border-b bg-background/80 backdrop-blur-sm" : "bg-transparent"
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background/80">
              <Zap className="h-4 w-4 text-primary" />
            </div>
          </div>
          <button 
            onClick={() => onNavigate('home')}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            DuckStrike
          </button>
        </div>
        
        <div className="flex items-center space-x-6">
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => onNavigate('features')}
          >
            Features
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => onNavigate('demo')}
          >
            Demo
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => onNavigate('stats')}
          >
            Stats
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}