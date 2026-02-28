import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Activity, Coins } from 'lucide-react';
import { useCurrentPrice } from '../../../hooks/useMarket';
import { useTokenAnalytics } from '../../../hooks/useTokenAnalytics';

interface MarketOverviewSectionProps {
  token: 'TIME' | 'TRAV';
}

export function MarketOverviewSection({ token }: MarketOverviewSectionProps) {
  const { data: currentPrice, isLoading: priceLoading } = useCurrentPrice(token);
  const { data: analytics, isLoading: analyticsLoading } = useTokenAnalytics(token);

  const isLoading = priceLoading || analyticsLoading;

  const formatNumber = (value: bigint | undefined) => {
    if (!value) return '0';
    return value.toLocaleString();
  };

  const priceChange = 0; // Placeholder for 24h change
  const priceChangePercent = 0; // Placeholder

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Market Overview - {token} AI
        </CardTitle>
        <CardDescription>Real-time market metrics and key performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse h-24 bg-muted rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Current Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>Current Price</span>
              </div>
              <div className="text-2xl font-bold">
                {currentPrice ? formatNumber(currentPrice) : '0'} USDT
              </div>
              <div className={`flex items-center gap-1 text-sm ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%</span>
              </div>
            </div>

            {/* 24h Volume */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4" />
                <span>24h Volume</span>
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(analytics?.tradingVolume24h)}
              </div>
              <Badge variant="outline" className="text-xs">
                Last 24 hours
              </Badge>
            </div>

            {/* Circulating Supply */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Coins className="w-4 h-4" />
                <span>Circulating Supply</span>
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(analytics?.circulatingSupply)}
              </div>
              <Badge variant="secondary" className="text-xs">
                In circulation
              </Badge>
            </div>

            {/* Market Cap */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Market Cap</span>
              </div>
              <div className="text-2xl font-bold">
                {currentPrice && analytics?.circulatingSupply
                  ? formatNumber(currentPrice * analytics.circulatingSupply)
                  : '0'}
              </div>
              <Badge variant="outline" className="text-xs">
                USDT
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
