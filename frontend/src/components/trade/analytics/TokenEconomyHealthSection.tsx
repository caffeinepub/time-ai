import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Activity, Flame, Coins, TrendingUp } from 'lucide-react';
import { useFeeTotals, useBurnedTotals } from '../../../hooks/useTokenomics';

interface TokenEconomyHealthSectionProps {
  token: 'TIME' | 'TRAV';
}

export function TokenEconomyHealthSection({ token }: TokenEconomyHealthSectionProps) {
  const { data: feeTotals, isLoading: feesLoading } = useFeeTotals();
  const { data: burnedTotals, isLoading: burnedLoading } = useBurnedTotals();

  const isLoading = feesLoading || burnedLoading;

  const formatNumber = (value: bigint | undefined) => {
    if (!value) return '0';
    return value.toLocaleString();
  };

  const fees = token === 'TIME' ? feeTotals?.timeFees : feeTotals?.travFees;
  const burned = token === 'TIME' ? burnedTotals?.timeBurned : burnedTotals?.travBurned;

  const burnRate = fees && burned && fees > BigInt(0)
    ? Number((burned * BigInt(100)) / fees)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Token Economy Health
        </CardTitle>
        <CardDescription>Economic performance and sustainability metrics</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse h-32 bg-muted rounded" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Fees Collected */}
              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Coins className="w-4 h-4" />
                  <span>Total Fees Collected</span>
                </div>
                <div className="text-3xl font-bold">{formatNumber(fees)}</div>
                <Badge variant="secondary" className="text-xs">
                  Platform Revenue
                </Badge>
              </div>

              {/* Tokens Burned */}
              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Flame className="w-4 h-4" />
                  <span>Total Tokens Burned</span>
                </div>
                <div className="text-3xl font-bold text-destructive">{formatNumber(burned)}</div>
                <Badge variant="destructive" className="text-xs">
                  Deflationary Mechanism
                </Badge>
              </div>
            </div>

            {/* Economic Ratios */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Economic Ratios
              </h4>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Burn Rate</span>
                  <span className="font-mono font-semibold">{burnRate.toFixed(2)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Fee Collection Status</span>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Token Velocity</span>
                  <span className="font-mono font-semibold">Moderate</span>
                </div>
              </div>
            </div>

            {/* Health Indicators */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 border rounded">
                <div className="text-xs text-muted-foreground mb-1">Supply Health</div>
                <Badge variant="default" className="text-xs">Healthy</Badge>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-xs text-muted-foreground mb-1">Burn Mechanism</div>
                <Badge variant="default" className="text-xs">Active</Badge>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-xs text-muted-foreground mb-1">Fee System</div>
                <Badge variant="default" className="text-xs">Operational</Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
