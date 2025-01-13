'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ActivityIcon,
  CoinsIcon,
  DollarSignIcon,
  GaugeIcon,
  TrendingUpIcon,
  UsersIcon,
} from '@/components/ui/icons';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export const StatsSkeleton = () => {
  const { resolvedTheme } = useTheme();

  const themeClasses = {
    light: {
      background: 'bg-zinc-100/70',
      border: 'border-zinc-200/50',
      header: 'bg-zinc-200/50 backdrop-blur-sm border-zinc-300/30',
      text: {
        primary: 'text-zinc-800',
        secondary: 'text-zinc-600',
      },
      skeleton: {
        base: 'bg-zinc-300',
        gradient: 'from-zinc-300 via-zinc-200 to-zinc-300',
      },
    },
    dark: {
      background: 'bg-zinc-900/70',
      border: 'border-zinc-700/30',
      header: 'bg-zinc-800/50 backdrop-blur-sm border-zinc-700/30',
      text: {
        primary: 'text-zinc-200',
        secondary: 'text-zinc-500',
      },
      skeleton: {
        base: 'bg-zinc-800',
        gradient: 'from-zinc-800 via-zinc-700 to-zinc-800',
      },
    },
  };

  const currentTheme =
    resolvedTheme === 'dark' ? themeClasses.dark : themeClasses.light;

  const SkeletonItem = ({
    icon: Icon,
    label,
  }: {
    icon: React.ElementType;
    label: string;
  }) => (
    <div className="flex flex-col gap-2">
      <div
        className={cn('flex items-center text-sm', currentTheme.text.secondary)}
      >
        <Icon className={cn('w-4 h-4 mr-2', currentTheme.text.secondary)} />
        {label}
      </div>
      <div className="relative overflow-hidden">
        <div className={cn('h-6 rounded-md', currentTheme.skeleton.base)}>
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-r animate-skeleton-loading',
              `from-${currentTheme.skeleton.gradient}`
            )}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Card
      className={cn(
        'w-full max-w-full mx-auto rounded-2xl overflow-hidden',
        currentTheme.background,
        currentTheme.border
      )}
    >
      <CardHeader
        className={cn(
          'p-4 border-b flex flex-row items-center',
          currentTheme.header
        )}
      >
        <CardTitle
          className={cn(
            'text-lg font-bold flex-grow',
            currentTheme.text.primary
          )}
        >
          Market Stats Loading
        </CardTitle>
        <div
          className={cn(
            'w-8 h-4 rounded-full animate-skeleton-loading',
            `bg-gradient-to-r ${currentTheme.skeleton.gradient}`
          )}
        />
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <SkeletonItem icon={DollarSignIcon} label="Market Cap" />
          <SkeletonItem icon={ActivityIcon} label="24h Volume" />
          <SkeletonItem icon={GaugeIcon} label="Dominance" />
          <SkeletonItem icon={TrendingUpIcon} label="Volume Change" />
          <SkeletonItem icon={CoinsIcon} label="Total Supply" />
          <SkeletonItem icon={UsersIcon} label="Rank" />
        </div>
      </CardContent>
    </Card>
  );
};
