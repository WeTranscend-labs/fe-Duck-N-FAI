"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SectionHighlight } from "@/components/ui/section-highlight";
import { MessageSquare } from "lucide-react";

const testimonials = [
    {
        quote: "DuckStrike has revolutionized how I handle crypto transactions. The AI assistant is incredibly intuitive and helpful.",
        name: "Alex Thompson",
        title: "Crypto Trader"
    },
    {
        quote: "The security features and speed of transactions on DuckChain are unmatched. This is the future of crypto.",
        name: "Sarah Chen",
        title: "DeFi Developer"
    },
    {
        quote: "I've tried many crypto platforms, but DuckStrike's AI integration makes it stand out. It's simply amazing.",
        name: "Michael Rodriguez",
        title: "Blockchain Analyst"
    },
    {
        quote: "The cross-chain capabilities and user experience are exceptional. DuckStrike has become my go-to platform.",
        name: "Emma Wilson",
        title: "Investment Manager"
    },
    {
        quote: "As a developer, I appreciate the robust infrastructure and innovative features DuckStrike brings to the table.",
        name: "David Park",
        title: "Smart Contract Engineer"
    }
];

export function TestimonialsSection() {
    return (
        <section className="relative overflow-hidden py-20">

            <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-4">
                        <MessageSquare className="h-4 w-4" />
                        Testimonials
                    </div>
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                        What Our Users Say
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Join thousands of satisfied users who trust DuckStrike for their crypto transactions
                    </p>
                </div>

                <div className="flex flex-col gap-8">
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="left"
                        speed="slow"
                    />
                    <InfiniteMovingCards
                        items={[...testimonials].reverse()}
                        direction="right"
                        speed="slow"
                    />
                </div>
            </div>

        </section>
    );
}