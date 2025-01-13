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
import { formatPrice } from '@/lib/format-price';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface StatsProps {
  name: string;
  rank: number;
  totalSupply: number;
  volume: number;
  volumeChangePercentage24h: number;
  marketCap: number;
  dominance: number;
}

const PropDefaults: StatsProps = {
  name: 'Bitcoin',
  rank: 1,
  totalSupply: 21000000,
  volume: 14817933452.303745,
  volumeChangePercentage24h: 0.1991271,
  marketCap: 1367347641840.1716,
  dominance: 53.9279,
};

export function Stats(props: StatsProps = PropDefaults) {
  const { resolvedTheme } = useTheme();
  const {
    name,
    rank,
    totalSupply,
    volume,
    volumeChangePercentage24h,
    marketCap,
    dominance,
  } = props;

  // Theme configuration
  const themeClasses = {
    light: {
      background: 'bg-gradient-to-br from-zinc-100 to-zinc-200',
      border: 'border-zinc-200/50',
      header: 'bg-zinc-200/50 backdrop-blur-sm border-zinc-300/30',
      text: {
        primary: 'text-zinc-800',
        secondary: 'text-zinc-600',
        muted: 'text-zinc-500',
      },
      statsItem:
        'bg-white/60 backdrop-blur-lg border-zinc-200/50 hover:bg-zinc-100/80',
      gradient: 'from-blue-300 to-purple-400',
    },
    dark: {
      background: 'bg-gradient-to-br from-zinc-900 to-zinc-800',
      border: 'border-zinc-700/50',
      header: 'bg-zinc-800/50 backdrop-blur-sm border-zinc-700/30',
      text: {
        primary: 'text-zinc-300',
        secondary: 'text-zinc-500',
        muted: 'text-zinc-400',
      },
      statsItem: 'bg-zinc-800/60 border-zinc-700/30 hover:bg-zinc-800/80',
      gradient: 'from-blue-400 to-purple-500',
    },
  };

  const currentTheme =
    resolvedTheme === 'dark' ? themeClasses.dark : themeClasses.light;

  const statsItems = [
    {
      icon: <DollarSignIcon className="w-5 h-5 text-blue-500" />,
      label: 'Market Cap',
      value: formatPrice(marketCap),
      color: 'text-blue-600',
    },
    {
      icon: <ActivityIcon className="w-5 h-5 text-purple-500" />,
      label: '24h Volume',
      value: formatPrice(volume),
      color: 'text-purple-600',
    },
    {
      icon: <GaugeIcon className="w-5 h-5 text-green-500" />,
      label: 'Dominance',
      value: `${dominance}%`,
      color: 'text-green-600',
    },
    {
      icon: (
        <TrendingUpIcon
          className={cn(
            'w-5 h-5',
            volumeChangePercentage24h > 0 ? 'text-emerald-500' : 'text-red-500'
          )}
        />
      ),
      label: '24h Volume Change',
      value: `${volumeChangePercentage24h}%`,
      color:
        volumeChangePercentage24h > 0 ? 'text-emerald-600' : 'text-red-600',
    },
    {
      icon: <CoinsIcon className="w-5 h-5 text-amber-500" />,
      label: 'Total Supply',
      value: totalSupply.toLocaleString(),
      color: 'text-amber-600',
    },
    {
      icon: <UsersIcon className="w-5 h-5 text-indigo-500" />,
      label: 'Rank',
      value: rank.toString(),
      color: 'text-indigo-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full mx-auto"
    >
      <Card
        className={`
          ${currentTheme.background}
          ${currentTheme.border}
          shadow-2xl 
          rounded-2xl 
          overflow-hidden 
          w-full
        `}
      >
        <CardHeader
          className={`
            ${currentTheme.header}
            p-4 
            border-b
            flex 
            items-center 
            justify-between
          `}
        >
          <CardTitle
            className={`
              text-lg 
              font-bold 
              ${currentTheme.text.primary}
              flex 
              items-center
            `}
          >
            <span
              className={`
                mr-2 
                bg-gradient-to-r 
                ${currentTheme.gradient}
                text-transparent 
                bg-clip-text
              `}
            >
              {name}
            </span>
            Market Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {statsItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                className={`
                  ${currentTheme.statsItem}
                  rounded-lg 
                  p-2 
                  border 
                  hover:scale-[1.02] 
                  transition-all 
                  duration-300 
                  group
                `}
              >
                <div className="flex items-center mb-1">
                  {item.icon}
                  <span
                    className={`
                      ml-1 
                      text-[10px] 
                      ${currentTheme.text.muted}
                      group-hover:text-inherit 
                      transition-colors
                    `}
                  >
                    {item.label}
                  </span>
                </div>
                <div
                  className={cn(
                    'text-sm font-bold',
                    item.color,
                    'group-hover:scale-105 transition-transform'
                  )}
                >
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
