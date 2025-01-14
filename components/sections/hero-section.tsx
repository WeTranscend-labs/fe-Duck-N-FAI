'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock } from 'lucide-react';
import { GiDuck } from 'react-icons/gi';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-20 sm:py-32 bg-background"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-primary p-1">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
              <GiDuck className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Experience{' '}
            <span className="text-primary">DuckStrike Transactions</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Revolutionize your crypto experience with our AI-powered DuckStrike
            extension. Simple commands, powerful results - all on the secure
            DuckStrike network.
          </p>

          {/* Quick Benefits */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <GiDuck className="h-5 w-5 text-primary" />
              <span>DuckStrike Security</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <GiDuck className="h-5 w-5 text-primary" />
              <span>Fast Confirmations</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <GiDuck className="h-5 w-5 text-primary" />
              <span>AI Integration</span>
            </div>
          </div>

          <div className="mb-12 flex justify-center space-x-4">
            <Button
              size="lg"
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Launch DuckStrike <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-primary text-primary hover:bg-primary/10"
            >
              Watch Demo
            </Button>
          </div>

          {/* Key Features Preview */}
          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 text-left border-primary/20 hover:border-primary/40 transition-colors">
              <h3 className="mb-2 font-semibold text-primary">
                Natural Commands
              </h3>
              <p className="text-sm text-muted-foreground">
                Send 0.5 DUCK to Alex - it&apos;s that simple on
                DuckStrike&apos;s intuitive platform.
              </p>
            </Card>
            <Card className="p-6 text-left border-primary/20 hover:border-primary/40 transition-colors">
              <h3 className="mb-2 font-semibold text-primary">
                DuckStrike Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                AI-powered system optimizes your transactions on the DuckStrike
                network.
              </p>
            </Card>
            <Card className="hidden p-6 text-left lg:block border-primary/20 hover:border-primary/40 transition-colors">
              <h3 className="mb-2 font-semibold text-primary">Chain Support</h3>
              <p className="text-sm text-muted-foreground">
                Native DuckStrike support with cross-chain capabilities.
              </p>
            </Card>
          </div>

          {/* Extension Preview with DuckChain Link */}
          <div className="relative mx-auto max-w-3xl mb-16">
            <div className="absolute -left-4 -right-4 -top-4 -z-10 h-[120%] bg-primary/10 blur-3xl" />
            <div className="overflow-hidden rounded-2xl bg-primary p-1 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80"
                alt="DuckStrike Extension"
                className="rounded-xl bg-background object-cover"
                fill
              />
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div>🔒 DuckStrike Secured</div>
            <div>⚡ Growing Community</div>
            <div>💎 Native DUCK Support</div>
            <div>⭐ Top-rated Extension</div>
          </div>
        </div>
      </div>
    </section>
  );
}
