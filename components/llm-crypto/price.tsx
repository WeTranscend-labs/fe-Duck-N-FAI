'use client';

import { formatPrice } from '@/lib/format-price';
import clsx from 'clsx';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Price({ name = 'BTC', price = 12.34, delta = 1 }) {
  const { resolvedTheme } = useTheme();
  const isPositive = delta > 0;
  const percentageChange = ((delta / price) * 100).toFixed(2);

  // Định nghĩa các class theme
  const themeClasses = {
    light: {
      background: 'bg-gradient-to-br from-zinc-100 to-zinc-200',
      border: 'border-zinc-200/50',
      text: {
        primary: 'text-zinc-800',
        secondary: 'text-zinc-600',
        trend: {
          positive: 'text-green-700 bg-green-500/20',
          negative: 'text-red-700 bg-red-500/20',
        },
      },
    },
    dark: {
      background: 'bg-gradient-to-br from-zinc-900 to-zinc-800',
      border: 'border-zinc-700/50',
      text: {
        primary: 'text-zinc-300',
        secondary: 'text-zinc-500',
        trend: {
          positive: 'text-green-400 bg-green-500/20',
          negative: 'text-red-400 bg-red-500/20',
        },
      },
    },
  };

  // Chọn theme hiện tại
  const currentTheme =
    resolvedTheme === 'dark' ? themeClasses.dark : themeClasses.light;

  return (
    <div
      className={`
        relative p-5 rounded-2xl 
        ${currentTheme.background}
        ${currentTheme.border}
        shadow-2xl 
        transform transition-all 
        hover:scale-[1.02] 
        hover:shadow-3xl
        dark:border-zinc-700/50
      `}
    >
      <div
        className={clsx(
          'absolute top-3 right-3 px-3 py-1 text-xs rounded-full',
          'flex items-center space-x-1 font-semibold',
          isPositive
            ? currentTheme.text.trend.positive
            : currentTheme.text.trend.negative
        )}
      >
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>{`${isPositive ? '+' : ''}${percentageChange}%`}</span>
      </div>

      <div
        className={`text-lg ${currentTheme.text.secondary} tracking-wider uppercase`}
      >
        {name}
      </div>

      <div
        className={clsx(
          'text-4xl font-extrabold mt-2 mb-3',
          'bg-clip-text text-transparent',
          isPositive
            ? 'bg-gradient-to-r from-green-400 to-green-600'
            : 'bg-gradient-to-r from-red-400 to-red-600'
        )}
      >
        {formatPrice(price)}
      </div>

      <div className="flex justify-between items-center">
        <div
          className={`text-xs ${currentTheme.text.secondary} tracking-tight`}
        >
          Last Updated: {format(new Date(), 'MMM do, HH:mm:ss a')}
        </div>

        <div
          className={clsx(
            'w-2 h-2 rounded-full',
            isPositive ? 'bg-green-500' : 'bg-red-500'
          )}
        />
      </div>
    </div>
  );
}
