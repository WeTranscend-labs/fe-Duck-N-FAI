"use client";

import { Card } from "@/components/ui/card";
import { GiDuck } from "react-icons/gi";
import { BarChart3, Lock, Brain, Wallet, Globe, Shield, Clock, Sparkles, Coins } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features on DuckStrike</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of crypto trading with our innovative AI-powered tools, built on the secure and efficient DuckStrike network
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 snap-x">
          <Card className="group relative overflow-hidden rounded-xl p-8 transition-all hover:shadow-lg hover:-translate-y-1 min-w-[300px] flex-1 snap-start">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform bg-primary opacity-10 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6 rounded-full" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                <GiDuck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI-Powered Commands</h3>
              <p className="mb-4 text-muted-foreground">Natural language processing optimized for DuckStrike transactions, making crypto transfers as simple as chatting.</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <GiDuck className="mr-2 h-4 w-4 text-primary" />
                  DuckStrike-optimized commands
                </li>
                <li className="flex items-center">
                  <GiDuck className="mr-2 h-4 w-4 text-primary" />
                  Smart response system
                </li>
              </ul>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-xl p-8 transition-all hover:shadow-lg hover:-translate-y-1 min-w-[300px] flex-1 snap-start">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform bg-primary opacity-10 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6 rounded-full" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                <GiDuck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">DuckStrike Security</h3>
              <p className="mb-4 text-muted-foreground">Built on DuckStrike's robust security protocols with additional layers of protection for your assets.</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <GiDuck className="mr-2 h-4 w-4 text-primary" />
                  DuckStrike verification
                </li>
                <li className="flex items-center">
                  <GiDuck className="mr-2 h-4 w-4 text-primary" />
                  Real-time monitoring
                </li>
              </ul>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-xl p-8 transition-all hover:shadow-lg hover:-translate-y-1 min-w-[300px] flex-1 snap-start">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform bg-primary opacity-10 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6 rounded-full" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                <GiDuck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">DuckStrike Integration</h3>
              <p className="mb-4 text-muted-foreground">Native support for DuckStrike tokens and cross-chain bridges for seamless asset transfers.</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <GiDuck className="mr-2 h-4 w-4 text-primary" />
                  Native token support
                </li>
                <li className="flex items-center">
                  <GiDuck className="mr-2 h-4 w-4 text-primary" />
                  Cross-chain bridges
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}