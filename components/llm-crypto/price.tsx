import { formatPrice } from '@/lib/format-price';
import clsx from 'clsx';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function Price({ name = 'BTC', price = 12.34, delta = 1 }) {
  const isPositive = delta > 0;
  const percentageChange = ((delta / price) * 100).toFixed(2);

  return (
    <div
      className="relative p-5 rounded-2xl bg-gradient-to-br 
      from-zinc-900 to-zinc-800 
      border border-zinc-700/50 
      shadow-2xl 
      transform transition-all 
      hover:scale-[1.02] 
      hover:shadow-3xl"
    >
      <div
        className={clsx(
          'absolute top-3 right-3 px-3 py-1 text-xs rounded-full',
          'flex items-center space-x-1 font-semibold',
          isPositive
            ? 'bg-green-500/20 text-green-400'
            : 'bg-red-500/20 text-red-400'
        )}
      >
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>{`${isPositive ? '+' : ''}${percentageChange}%`}</span>
      </div>

      <div className="text-lg text-zinc-300 tracking-wider uppercase">
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
        <div className="text-xs text-zinc-500 tracking-tight">
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
