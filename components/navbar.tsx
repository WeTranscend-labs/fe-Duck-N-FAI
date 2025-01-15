'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { GiDuck } from 'react-icons/gi';
import { CustomConnectButton } from './wallet/CustomConnectButton';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logo from '@/public/imgs/logo.webp';
import Logo from './common/Logo';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <motion.nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Logo className="h-8 w-8" />
          <button
            onClick={() => handleNavigate('home')}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            DuckStrike
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className="text-sm font-medium hover:bg-primary/10"
              onClick={() => handleNavigate('features')}
            >
              Features
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium hover:bg-primary/10"
              onClick={() => handleNavigate('demo')}
            >
              Demo
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium hover:bg-primary/10"
              onClick={() => handleNavigate('stats')}
            >
              Stats
            </Button>
          </div>

          <div className="flex items-center space-x-2 pl-2 border-l border-primary/10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl hover:bg-primary/10"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <CustomConnectButton />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-xl hover:bg-primary/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <CustomConnectButton />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-xl hover:bg-primary/10"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 space-y-2 bg-background/80 backdrop-blur-md border-t border-primary/10">
              <Button
                variant="ghost"
                className="w-full text-left justify-start text-sm font-medium hover:bg-primary/10"
                onClick={() => handleNavigate('features')}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                className="w-full text-left justify-start text-sm font-medium hover:bg-primary/10"
                onClick={() => handleNavigate('demo')}
              >
                Demo
              </Button>
              <Button
                variant="ghost"
                className="w-full text-left justify-start text-sm font-medium hover:bg-primary/10"
                onClick={() => handleNavigate('stats')}
              >
                Stats
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
