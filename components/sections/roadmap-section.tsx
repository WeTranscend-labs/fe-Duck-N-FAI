"use client";

import { Card } from "@/components/ui/card";
import { Sparkles, Rocket, Shield, Globe, Check, Clock } from "lucide-react";
import { SectionHighlight } from "@/components/ui/section-highlight";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ROADMAP_PHASES = [
    {
        phase: "Phase 1: Beta Launch",
        icon: <Sparkles className="h-5 w-5" />,
        title: "Foundation & Testing",
        timeline: "Q1 2024",
        features: [
            "AI-powered transaction assistant beta testing",
            "Core wallet integration features",

            "Community feedback collection",
            "Initial security audits",
            "Bug fixes and performance optimization"
        ],
        status: "In Progress",
        progress: 85,
        color: "from-yellow-500 to-yellow-600"
    },
    {
        phase: "Phase 2: Market Ready",
        icon: <Rocket className="h-5 w-5" />,
        title: "Enhanced Features & Stability",
        timeline: "Q2 2024",
        features: [
            "Advanced AI capabilities expansion",
            "Multi-chain support enhancement",
            "DeFi protocol integrations",
            "Mobile app beta release",
            "Performance improvements",
            "Extended security features"
        ],
        status: "Upcoming",
        progress: 15,
        color: "from-blue-500 to-blue-600"
    },
    {
        phase: "Phase 3: Enterprise Solutions",
        icon: <Shield className="h-5 w-5" />,
        title: "Security & Enterprise Focus",
        timeline: "Q3 2024",
        features: [
            "Enterprise-grade security implementation",
            "Institutional features rollout",
            "Advanced analytics dashboard",
            "API access for developers",
            "Automated compliance tools",
            "Enhanced transaction monitoring"
        ],
        status: "Planned",
        progress: 0,
        color: "from-purple-500 to-purple-600"
    },
    {
        phase: "Phase 4: Global Expansion",
        icon: <Globe className="h-5 w-5" />,
        title: "Worldwide Adoption",
        timeline: "Q4 2024",
        features: [
            "Global market expansion",
            "Multi-language support",
            "Advanced cross-chain features",
            "DuckChain ecosystem growth",
            "Strategic partnerships",
            "Community governance implementation"
        ],
        status: "Planned",
        progress: 0,
        color: "from-green-500 to-green-600"
    }
];

function ProgressBar({ progress, color }: { progress: number; color: string }) {
    return (
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn("h-full rounded-full bg-gradient-to-r", color)}
            />
        </div>
    );
}

function PhaseCard({ phase, index }: { phase: typeof ROADMAP_PHASES[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative"
        >
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background border-primary/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="space-y-6">
                    {/* Phase Header */}
                    <div className="space-y-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className={cn(
                                    "flex items-center gap-2 text-sm font-medium",
                                    `text-${phase.color.split('-')[1]}-500`
                                )}>
                                    <div className={cn(
                                        "p-2 rounded-lg",
                                        `bg-${phase.color.split('-')[1]}-500/10`
                                    )}>
                                        {phase.icon}
                                    </div>
                                    {phase.phase}
                                </div>
                                <h3 className="text-xl font-bold">{phase.title}</h3>
                            </div>
                            <div className={cn(
                                "text-xs font-medium px-3 py-1.5 rounded-full",
                                phase.status === "In Progress"
                                    ? "bg-yellow-500/10 text-yellow-500"
                                    : phase.status === "Upcoming"
                                        ? "bg-blue-500/10 text-blue-500"
                                        : "bg-muted text-muted-foreground"
                            )}>
                                {phase.status === "In Progress" && <Check className="inline-block w-3 h-3 mr-1" />}
                                {phase.status === "Upcoming" && <Clock className="inline-block w-3 h-3 mr-1" />}
                                {phase.status}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-sm font-medium text-muted-foreground">
                                {phase.timeline}
                            </div>
                            <div className="flex-1">
                                <ProgressBar progress={phase.progress} color={phase.color} />
                            </div>
                            <div className="text-sm font-medium">
                                {phase.progress}%
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid gap-3 sm:grid-cols-2">
                        {phase.features.map((feature, featureIndex) => (
                            <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                                className={cn(
                                    "flex items-start gap-2 p-3 rounded-lg text-sm",
                                    `bg-${phase.color.split('-')[1]}-500/5`
                                )}
                            >
                                <div className={cn(
                                    "h-1.5 w-1.5 rounded-full mt-1.5",
                                    `bg-${phase.color.split('-')[1]}-500`
                                )} />
                                <span className="text-muted-foreground">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

export function RoadmapSection() {
    return (
        <section id="roadmap" className="relative overflow-hidden">
            <SectionHighlight
                containerClassName="py-20"
                dotColor="#ffda00"
                dotOpacity="0.15"
                glowColor="rgba(255, 218, 0, 0.1)"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-4">
                            <Rocket className="h-4 w-4" />
                            Development Roadmap
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                            Our Journey Forward
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Follow our development progress as we build the future of crypto transactions
                        </p>
                    </div>

                    {/* Timeline Connector */}
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden lg:block" />

                        {/* Roadmap Grid */}
                        <div className="grid gap-8 lg:gap-16">
                            {ROADMAP_PHASES.map((phase, index) => (
                                <div key={index} className={cn(
                                    "lg:grid lg:grid-cols-2 lg:gap-8 items-center",
                                    index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                                )}>
                                    {index % 2 === 0 ? (
                                        <>
                                            <PhaseCard phase={phase} index={index} />
                                            <div className="hidden lg:block" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="hidden lg:block" />
                                            <PhaseCard phase={phase} index={index} />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionHighlight>
        </section>
    );
}