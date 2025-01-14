"use client";

import { cn } from '@/lib/utils';
import { Sparkle, UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function UserMessage({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className="flex items-start justify-end gap-2">
      <div className="max-w-[85%]">
        <div className={cn(
          'inline-block rounded-2xl px-3 py-2 text-sm',
          theme === 'dark'
            ? 'bg-primary/15 text-foreground'
            : 'bg-primary/10 text-foreground'
        )}>
          {children}
        </div>
      </div>
      <div className={cn(
        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
        theme === 'dark'
          ? 'bg-primary/10 text-primary'
          : 'bg-primary/5 text-primary'
      )}>
        <UserIcon className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1">
      <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
      <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
      <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
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
    <div className={cn('flex items-start gap-2', className)}>
      <div className={cn(
        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
        theme === 'dark'
          ? 'bg-primary/10 text-primary'
          : 'bg-primary/5 text-primary'
      )}>
        <Sparkle className="h-3.5 w-3.5" />
      </div>
      <div className="max-w-[85%]">
        <div className={cn(
          'inline-block rounded-2xl px-3 py-2 text-sm',
          theme === 'dark'
            ? 'bg-muted/50 text-foreground'
            : 'bg-muted/30 text-foreground',
          isLoading && 'min-w-[60px]'
        )}>
          {isLoading ? <TypingIndicator /> : children}
        </div>
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
    <div className="flex items-start gap-2">
      {showAvatar && (
        <div className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
          theme === 'dark'
            ? 'bg-primary/10 text-primary'
            : 'bg-primary/5 text-primary'
        )}>
          <Sparkle className="h-3.5 w-3.5" />
        </div>
      )}
      <div className="max-w-[85%]">
        <div className={cn(
          'rounded-2xl px-3 py-2 text-sm',
          theme === 'dark'
            ? 'bg-muted/50 text-foreground border border-border/10'
            : 'bg-muted/30 text-foreground border border-border/5'
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function AssistantMessage({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center">
      <div className={cn(
        'max-w-[85%] px-3 py-2 text-xs rounded-xl',
        theme === 'dark'
          ? 'bg-muted/30 text-muted-foreground'
          : 'bg-muted/20 text-muted-foreground'
      )}>
        {children}
      </div>
    </div>
  );
}