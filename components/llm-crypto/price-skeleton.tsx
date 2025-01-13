'use client';

import { useTheme } from 'next-themes';
import clsx from 'clsx';

export const PriceSkeleton = () => {
  const { resolvedTheme } = useTheme();

  const themeClasses = {
    light: {
      background: 'bg-zinc-100',
      border: 'border-zinc-200/50',
      pulse: 'bg-zinc-300/50',
      text: 'text-zinc-400',
    },
    dark: {
      background: 'bg-zinc-950',
      border: 'border-zinc-900',
      pulse: 'bg-zinc-700',
      text: 'text-zinc-600',
    },
  };

  const currentTheme =
    resolvedTheme === 'dark' ? themeClasses.dark : themeClasses.light;

  return (
    <div
      className={clsx(
        'p-5 rounded-2xl shadow-lg',
        currentTheme.background,
        currentTheme.border,
        'border',
        'relative',
        'overflow-hidden'
      )}
    >
      {/* Gradient Pulse Animation */}
      <div
        className="absolute inset-0 
        bg-gradient-to-r 
        from-transparent 
        via-white/10 
        to-transparent 
        animate-[shimmer_2s_infinite] 
        opacity-50"
      />

      <div
        className={clsx(
          'float-right inline-block px-2 py-1 rounded-full',
          'text-xs text-transparent w-20 h-6',
          'animate-pulse',
          currentTheme.pulse
        )}
      >
        Loading
      </div>

      <div
        className={clsx(
          'text-lg text-transparent w-24 h-6 rounded-md mb-3',
          'animate-pulse',
          currentTheme.pulse
        )}
      >
        Token Name
      </div>

      <div
        className={clsx(
          'text-4xl font-bold text-transparent h-10 w-48',
          'animate-pulse',
          'rounded-md',
          'my-2',
          currentTheme.pulse
        )}
      >
        Price
      </div>

      <div
        className={clsx(
          'text-sm text-transparent w-full h-4 rounded-md',
          'animate-pulse',
          'mt-4',
          currentTheme.pulse
        )}
      >
        Last Updated
      </div>

      {/* Subtle Indicator */}
      <div
        className={clsx(
          'w-2 h-2 rounded-full absolute bottom-3 right-3',
          'animate-pulse',
          currentTheme.pulse
        )}
      />
    </div>
  );
};
