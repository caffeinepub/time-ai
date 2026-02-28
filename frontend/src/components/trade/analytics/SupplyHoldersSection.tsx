import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Coins, Lock, TrendingUp, Users } from 'lucide-react';
import { useTokenAnalytics } from '../../../hooks/useTokenAnalytics';

interface SupplyHoldersSectionProps {
  token: 'TIME' | 'TRAV';
}

export function SupplyHoldersSection({ token }: SupplyHoldersSectionProps) {
  const { data: analytics, isLoading } = useTokenAnalytics(token);

  const formatNumber = (value: bigint | undefined) => {
    if (!value) return '0';
    return value.toLocaleString();
  };

  const calculatePercentage = (part: bigint | undefined, total: bigint | undefined) => {
    if (!part || !total || total === BigInt(0)) return 0;
    return Number((part * BigInt(100)) / total);
  };

  const circulatingPercent = calculatePercentage(
    analytics?.circulatingSupply,
    analytics?.availableSupply
  );
  const stakedPercent = calculatePercentage(
    analytics?.stakedSupply,
    analytics?.availableSupply
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Supply & Distribution Analytics
        </CardTitle>
        <CardDescription>Token supply metrics and holder distribution</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-20 bg-muted rounded" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Circulating Supply */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="font-medium">Circulating Supply</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatNumber(analytics?.circulatingSupply)} / {formatNumber(analytics?.availableSupply)}
                </span>
              </div>
              <Progress value={circulatingPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {circulatingPercent.toFixed(2)}% of total supply in circulation
              </p>
            </div>

            {/* Staked Supply */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-secondary" />
                  <span className="font-medium">Staked Supply</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatNumber(analytics?.stakedSupply)}
                </span>
              </div>
              <Progress value={stakedPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {stakedPercent.toFixed(2)}% of total supply staked
              </p>
            </div>

            {/* Available Supply */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="font-medium">Total Available Supply</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatNumber(analytics?.availableSupply)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Circulating</p>
                  <p className="text-lg font-bold">{formatNumber(analytics?.circulatingSupply)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Locked/Staked</p>
                  <p className="text-lg font-bold">{formatNumber(analytics?.stakedSupply)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
