"use client";


import { FaTelegram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PinContainer } from "../ui/3d-pin";
import { Button } from "../ui/button";

export function ContactSection() {
    return (
        <section className="py-20 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-16 md:grid-cols-2 items-center">
                    {/* Social Links */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                            <p className="text-muted-foreground mb-8">
                                Connect with us across our Web3 ecosystem and stay updated with the latest DuckStrike developments.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <Button
                                variant="outline"
                                className="w-full rounded-xl border-primary/20 hover:border-primary hover:bg-primary/10"
                                onClick={() => window.open('https://t.me/duckstrike', '_blank')}
                            >
                                <FaTelegram className="mr-2 h-5 w-5 text-primary" />
                                Telegram
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full rounded-xl border-primary/20 hover:border-primary hover:bg-primary/10"
                                onClick={() => window.open('https://x.com/duckstrike', '_blank')}
                            >
                                <FaXTwitter className="mr-2 h-5 w-5 text-primary" />
                                X
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full rounded-xl border-primary/20 hover:border-primary hover:bg-primary/10"
                                onClick={() => window.open('https://youtube.com/@duckstrike', '_blank')}
                            >
                                <FaYoutube className="mr-2 h-5 w-5 text-primary" />
                                YouTube
                            </Button>
                        </div>
                    </div>

                    {/* DuckChain Link */}
                    <div className="flex items-center justify-center">
                        <PinContainer
                            title="Explore DuckChain"
                            href="https://duckchain.io"
                        >
                            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                                <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                                    Built on DuckChain
                                </h3>
                                <div className="text-base !m-0 !p-0 font-normal">
                                    <span className="text-slate-500">
                                        Discover how DuckChain's revolutionary blockchain technology powers our secure and efficient transaction platform.
                                    </span>
                                </div>
                                <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-primary via-primary/50 to-primary/20" />
                            </div>
                        </PinContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}