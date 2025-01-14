"use client";

import { cn } from '@/lib/utils';
import { Sparkle, UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function UserMessage({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className="flex items-start justify-end gap-3">
      <div className="max-w-[85%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'inline-block rounded-2xl px-4 py-3 text-sm shadow-sm',
            theme === 'dark'
              ? 'bg-primary/15 text-foreground'
              : 'bg-primary/10 text-foreground'
          )}
        >
          {children}
        </motion.div>
      </div>
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        theme === 'dark'
          ? 'bg-primary/10 text-primary'
          : 'bg-primary/5 text-primary'
      )}>
        <UserIcon className="h-4 w-4" />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1">
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-primary/40"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-primary/40"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-primary/40"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
}

export function BotMessage({
  children,
  className,
  isLoading,
}: {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        theme === 'dark'
          ? 'bg-primary/10 text-primary'
          : 'bg-primary/5 text-primary'
      )}>
        <Sparkle className="h-4 w-4" />
      </div>
      <div className="max-w-[85%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'inline-block rounded-2xl px-4 py-3 text-sm shadow-sm',
            theme === 'dark'
              ? 'bg-muted/50 text-foreground'
              : 'bg-muted/30 text-foreground',
            isLoading && 'min-w-[60px]'
          )}
        >
          {isLoading ? <TypingIndicator /> : children}
        </motion.div>
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <div className="flex items-start gap-3">
      {showAvatar && (
        <div className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          theme === 'dark'
            ? 'bg-primary/10 text-primary'
            : 'bg-primary/5 text-primary'
        )}>
          <Sparkle className="h-4 w-4" />
        </div>
      )}
      <div className="max-w-[85%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'rounded-2xl px-4 py-3 text-sm shadow-sm',
            theme === 'dark'
              ? 'bg-muted/50 text-foreground border border-border/10'
              : 'bg-muted/30 text-foreground border border-border/5'
          )}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function AssistantMessage({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'max-w-[85%] px-4 py-2 text-xs rounded-xl shadow-sm',
          theme === 'dark'
            ? 'bg-muted/30 text-muted-foreground'
            : 'bg-muted/20 text-muted-foreground'
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}