'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun, Zap, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { GiDuck } from 'react-icons/gi';
import { CustomConnectButton } from './wallet/CustomConnectButton';

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
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b bg-background/80 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background/80">
              <GiDuck className="h-4 w-4 text-primary" />
            </div>
          </div>
          <button
            onClick={() => handleNavigate('home')}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            DuckStrike
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Button
            variant="ghost"
            className="text-sm font-medium"
            onClick={() => handleNavigate('features')}
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="text-sm font-medium"
            onClick={() => handleNavigate('demo')}
          >
            Demo
          </Button>
          <Button
            variant="ghost"
            className="text-sm font-medium"
            onClick={() => handleNavigate('stats')}
          >
            Stats
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-xl"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <CustomConnectButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-xl"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-xl"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <CustomConnectButton />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/80 backdrop-blur-sm border-b">
            <Button
              variant="ghost"
              className="w-full text-left justify-start text-sm font-medium"
              onClick={() => handleNavigate('features')}
            >
              Features
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left justify-start text-sm font-medium"
              onClick={() => handleNavigate('demo')}
            >
              Demo
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left justify-start text-sm font-medium"
              onClick={() => handleNavigate('stats')}
            >
              Stats
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
