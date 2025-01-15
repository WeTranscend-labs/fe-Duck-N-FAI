"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageSquare, Zap, Shield, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function DemoSection() {
  const router = useRouter();

  return (
    <section id="demo" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(255,218,0,0.15)_0%,rgba(255,255,255,0)_100%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Live Demo
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Experience DuckChain AI
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Try our AI assistant now and discover how it can revolutionize your crypto transactions
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/chat")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8"
          >
            Try DuckChain AI Now
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 hover:shadow-md transition-all hover:scale-[1.01] bg-[linear-gradient(107.78deg,rgba(84,80,230,0.2)_-3.86%,rgba(165,165,174,0.0457021)_51.23%,rgba(170,170,170,0.036)_70.2%,rgba(77,73,255,0.096)_95.95%)] border-primary/10">
            <div className="flex gap-4">
              <div className="bg-primary/15 p-3 rounded-xl h-fit">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Natural Language Processing</h3>
                <p className="text-muted-foreground">
                  Communicate with our AI in plain English. No need to learn complex commands or syntax.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-all hover:scale-[1.01] bg-[linear-gradient(107.78deg,rgba(84,80,230,0.2)_-3.86%,rgba(165,165,174,0.0457021)_51.23%,rgba(170,170,170,0.036)_70.2%,rgba(77,73,255,0.096)_95.95%)] border-primary/10">
            <div className="flex gap-4">
              <div className="bg-primary/15 p-3 rounded-xl h-fit">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Instant Responses</h3>
                <p className="text-muted-foreground">
                  Get immediate answers to your questions about DuckChain transactions and features.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-all hover:scale-[1.01] bg-[linear-gradient(107.78deg,rgba(84,80,230,0.2)_-3.86%,rgba(165,165,174,0.0457021)_51.23%,rgba(170,170,170,0.036)_70.2%,rgba(77,73,255,0.096)_95.95%)] border-primary/10">
            <div className="flex gap-4">
              <div className="bg-primary/15 p-3 rounded-xl h-fit">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Secure Interactions</h3>
                <p className="text-muted-foreground">
                  All conversations are protected with enterprise-grade security and encryption.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}