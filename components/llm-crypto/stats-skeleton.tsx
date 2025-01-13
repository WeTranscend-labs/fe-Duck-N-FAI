import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ActivityIcon,
  CoinsIcon,
  DollarSignIcon,
  GaugeIcon,
  TrendingUpIcon,
  UsersIcon,
} from '@/components/ui/icons';

export const StatsSkeleton = () => {
  const SkeletonItem = ({
    icon: Icon,
    label,
  }: {
    icon: React.ElementType;
    label: string;
  }) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center text-sm text-zinc-500">
        <Icon className="w-4 h-4 mr-2 text-zinc-600" />
        {label}
      </div>
      <div className="relative overflow-hidden">
        <div className="h-6 bg-zinc-800 rounded-md">
          <div
            className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 
            animate-skeleton-loading"
          />
        </div>
      </div>
    </div>
  );

  return (
    <Card
      className="w-full max-w-full mx-auto bg-zinc-900/70 
      border-zinc-700/30 rounded-2xl overflow-hidden"
    >
      <CardHeader
        className="bg-zinc-800/50 backdrop-blur-sm p-4 
        border-b border-zinc-700/30 flex flex-row items-center"
      >
        <CardTitle className="text-lg font-bold text-zinc-200 flex-grow">
          Market Stats Loading
        </CardTitle>
        <div
          className="w-8 h-4 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 
          animate-skeleton-loading rounded-full"
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
