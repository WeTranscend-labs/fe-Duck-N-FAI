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
  const {
    name,
    rank,
    totalSupply,
    volume,
    volumeChangePercentage24h,
    marketCap,
    dominance,
  } = props;

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
        className="bg-gradient-to-br from-zinc-900 to-zinc-800 
        border-zinc-700/50 shadow-2xl rounded-2xl overflow-hidden 
        w-full"
      >
        <CardHeader className="bg-zinc-800/50 backdrop-blur-sm p-4 border-b border-zinc-700/30">
          <CardTitle className="text-lg font-bold text-white flex items-center">
            <span
              className="mr-2 bg-gradient-to-r from-blue-400 to-purple-500 
              text-transparent bg-clip-text"
            >
              {name}
            </span>
            Market Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          {' '}
          {/* Giảm padding */}
          <div className="grid grid-cols-3 gap-2">
            {' '}
            {/* Thay đổi thành 3 cột */}
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
                className="bg-zinc-800/60 
                  rounded-lg 
                  p-2 
                  border 
                  border-zinc-700/30 
                  hover:bg-zinc-800/80 
                  transition-all 
                  duration-300 
                  group"
              >
                <div className="flex items-center mb-1">
                  {item.icon}
                  <span className="ml-1 text-[10px] text-zinc-400 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
                <div
                  className={cn(
                    'text-sm font-bold', // Giảm kích thước chữ
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
