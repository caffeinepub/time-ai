import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { PricePoint } from '../../hooks/usePriceSeries';

interface PriceChartProps {
  data: PricePoint[];
  token: 'TIME' | 'TRAV';
  isLoading?: boolean;
}

export function PriceChart({ data, token, isLoading }: PriceChartProps) {
  const { points, minPrice, maxPrice, priceRange } = useMemo(() => {
    if (!data || data.length === 0) {
      return { points: '', minPrice: 0, maxPrice: 100, priceRange: 100 };
    }

    const prices = data.map((p) => Number(p.price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;

    const width = 100;
    const height = 60;
    const padding = 5;

    const pointsStr = data
      .map((point, i) => {
        const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((Number(point.price) - min) / range) * (height - 2 * padding);
        return `${x},${y}`;
      })
      .join(' ');

    return { points: pointsStr, minPrice: min, maxPrice: max, priceRange: range };
  }, [data]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{token} AI Price Chart</CardTitle>
          <CardDescription>Loading chart data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse h-[200px] bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{token} AI Price Chart</CardTitle>
          <CardDescription>No price data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            No chart data to display
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentPrice = data[data.length - 1]?.price || BigInt(0);
  const previousPrice = data[data.length - 2]?.price || currentPrice;
  const priceChange = Number(currentPrice) - Number(previousPrice);
  const priceChangePercent = Number(previousPrice) > 0 
    ? ((priceChange / Number(previousPrice)) * 100).toFixed(2)
    : '0.00';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{token} AI Price Chart</span>
          <div className="text-right">
            <div className="text-2xl font-bold">{currentPrice.toString()} USDT</div>
            <div className={`text-sm ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
            </div>
          </div>
        </CardTitle>
        <CardDescription>24-hour price movement</CardDescription>
      </CardHeader>
      <CardContent>
        <svg
          viewBox="0 0 100 60"
          className="w-full h-[200px]"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line x1="5" y1="15" x2="95" y2="15" stroke="currentColor" strokeWidth="0.1" opacity="0.2" />
          <line x1="5" y1="30" x2="95" y2="30" stroke="currentColor" strokeWidth="0.1" opacity="0.2" />
          <line x1="5" y1="45" x2="95" y2="45" stroke="currentColor" strokeWidth="0.1" opacity="0.2" />

          {/* Price line */}
          <polyline
            points={points}
            fill="none"
            stroke={token === 'TIME' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Area fill */}
          <polygon
            points={`5,55 ${points} 95,55`}
            fill={token === 'TIME' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
            opacity="0.1"
          />
        </svg>
      </CardContent>
    </Card>
  );
}
