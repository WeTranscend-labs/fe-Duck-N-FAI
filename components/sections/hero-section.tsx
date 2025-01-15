'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { GiDuck } from 'react-icons/gi';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useMotionValue, motion, useMotionTemplate } from 'framer-motion';
import { ScrollToTop } from '../scroll-top';

const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        'relative h-full flex items-center bg-background dark:bg-background justify-center w-full group',
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <ScrollToTop />
      <div className="absolute inset-0 bg-[radial-gradient(#ffda00_0.5px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] pointer-events-none opacity-30" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 218, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className={cn('relative z-20', className)}>{children}</div>
    </div>
  );
};

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      <HeroHighlight containerClassName="min-h-screen">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            {/* Logo */}
            <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-primary p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                <GiDuck className="h-12 w-12 text-primary" />
              </div>
            </div>

            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Experience{' '}
              <motion.span
                className="text-primary relative inline-block"
                initial={{ backgroundSize: '0% 100%' }}
                animate={{ backgroundSize: '100% 100%' }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  backgroundImage:
                    'linear-gradient(120deg, rgba(255, 218, 0, 0.2) 0%, rgba(255, 218, 0, 0.2) 100%)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0% 100%',
                }}
              >
                DuckStrike Transactions
              </motion.span>
            </motion.h1>

            <motion.p
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Revolutionize your crypto experience with our AI-powered
              DuckStrike extension. Simple commands, powerful results - all on
              the secure DuckStrike network.
            </motion.p>

            {/* Quick Benefits */}
            <motion.div
              className="mb-8 grid gap-4 sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
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
            </motion.div>

            <motion.div
              className="mb-12 flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
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
            </motion.div>

            {/* Key Features Preview */}
            <motion.div
              className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="p-6 text-left border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02] bg-background/50 backdrop-blur-sm">
                <h3 className="mb-2 font-semibold text-primary">
                  Natural Commands
                </h3>
                <p className="text-sm text-muted-foreground">
                  "Send 0.5 DUCK to Alex" - it's that simple on DuckStrike's
                  intuitive platform.
                </p>
              </Card>
              <Card className="p-6 text-left border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02] bg-background/50 backdrop-blur-sm">
                <h3 className="mb-2 font-semibold text-primary">
                  DuckStrike Analysis
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered system optimizes your transactions on the
                  DuckStrike network.
                </p>
              </Card>
              <Card className="hidden p-6 text-left lg:block border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02] bg-background/50 backdrop-blur-sm">
                <h3 className="mb-2 font-semibold text-primary">
                  Chain Support
                </h3>
                <p className="text-sm text-muted-foreground">
                  Native DuckStrike support with cross-chain capabilities.
                </p>
              </Card>
            </motion.div>

            {/* Extension Preview */}
            <motion.div
              className="relative mx-auto max-w-3xl mb-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="absolute -left-4 -right-4 -top-4 -z-10 h-[120%] bg-primary/10 blur-3xl" />
              <div className="overflow-hidden rounded-2xl bg-primary p-1 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80"
                  alt="DuckStrike Extension"
                  className="rounded-xl bg-background"
                />
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div>🔒 DuckStrike Secured</div>
              <div>⚡ Growing Community</div>
              <div>💎 Native DUCK Support</div>
              <div>⭐ Top-rated Extension</div>
            </motion.div>
          </div>
        </div>
      </HeroHighlight>
    </section>
  );
}
