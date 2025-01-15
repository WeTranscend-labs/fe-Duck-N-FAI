"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GiDuck } from "react-icons/gi";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { CustomConnectButton } from "./wallet/CustomConnectButton";

export const FloatingNav = ({
  onNavigate,
  className,
}: {
  onNavigate: (section: string) => void;
  className?: string;
}) => {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Chat", section: "chat", href: "/chat" },
    { name: "Features", section: "features" },
    { name: "Demo", section: "demo" },
    { name: "Stats", section: "stats" },

  ];

  const handleNavigation = (item: { section: string; href?: string }) => {
    if (item.href) {
      window.location.href = item.href;
    } else {
      onNavigate(item.section);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.2,
      }}
      className={cn(
        "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-primary/20 rounded-full bg-background/80 backdrop-blur-md shadow-lg z-50 pr-2 pl-8 py-2 items-center justify-center space-x-4",
        className
      )}
    >
      <div className="flex items-center gap-2 pr-2 border-r border-primary/20">
        <div className="h-6 w-6 rounded-full bg-primary p-0.5">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-background/80">
            <GiDuck className="h-3 w-3 text-primary" />
          </div>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="text-sm font-semibold hover:text-primary transition-colors"
        >
          DuckStrike
        </button>
      </div>

      {navItems.map((navItem, idx) => (
        <Button
          key={`nav-${idx}`}
          variant="ghost"
          size="sm"
          onClick={() => handleNavigation(navItem)}
          className="text-sm font-medium"
        >
          {navItem.name}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-8 w-8 rounded-full"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <CustomConnectButton />
    </motion.div>
  );
};