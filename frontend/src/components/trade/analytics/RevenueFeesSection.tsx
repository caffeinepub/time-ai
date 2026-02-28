import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { DollarSign, TrendingUp } from 'lucide-react';
import { useFeeTotals, useBurnedTotals } from '../../../hooks/useTokenomics';

export function RevenueFeesSection() {
  const { data: feeTotals, isLoading: feesLoading } = useFeeTotals();
  const { data: burnedTotals, isLoading: burnedLoading } = useBurnedTotals();

  const isLoading = feesLoading || burnedLoading;

  const formatNumber = (value: bigint | undefined) => {
    if (!value) return '0';
    return value.toLocaleString();
  };

  const totalFees = (feeTotals?.timeFees || BigInt(0)) + (feeTotals?.travFees || BigInt(0));
  const totalBurned = (burnedTotals?.timeBurned || BigInt(0)) + (burnedTotals?.travBurned || BigInt(0));
  const netRevenue = totalFees - totalBurned;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Revenue & Fees Dashboard
        </CardTitle>
        <CardDescription>Platform revenue, fee collection, and burn statistics</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-pulse h-32 bg-muted rounded" />
            <div className="animate-pulse h-48 bg-muted rounded" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>Total Fees</span>
                </div>
                <div className="text-2xl font-bold">{formatNumber(totalFees)}</div>
                <Badge variant="secondary" className="text-xs">All Tokens</Badge>
              </div>

              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Tokens Burned</span>
                </div>
                <div className="text-2xl font-bold text-destructive">{formatNumber(totalBurned)}</div>
                <Badge variant="destructive" className="text-xs">Deflationary</Badge>
              </div>

              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>Net Revenue</span>
                </div>
                <div className="text-2xl font-bold text-primary">{formatNumber(netRevenue)}</div>
                <Badge variant="default" className="text-xs">Retained</Badge>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Fees Collected</TableHead>
                    <TableHead>Tokens Burned</TableHead>
                    <TableHead>Net Revenue</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">TIME AI</TableCell>
                    <TableCell className="font-mono">{formatNumber(feeTotals?.timeFees)}</TableCell>
                    <TableCell className="font-mono text-destructive">
                      {formatNumber(burnedTotals?.timeBurned)}
                    </TableCell>
                    <TableCell className="font-mono text-primary">
                      {formatNumber((feeTotals?.timeFees || BigInt(0)) - (burnedTotals?.timeBurned || BigInt(0)))}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">TRAV AI</TableCell>
                    <TableCell className="font-mono">{formatNumber(feeTotals?.travFees)}</TableCell>
                    <TableCell className="font-mono text-destructive">
                      {formatNumber(burnedTotals?.travBurned)}
                    </TableCell>
                    <TableCell className="font-mono text-primary">
                      {formatNumber((feeTotals?.travFees || BigInt(0)) - (burnedTotals?.travBurned || BigInt(0)))}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Revenue Sources */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-3">Revenue Sources</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Trading Fees</span>
                  <Badge variant="outline">0.3%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Conversion Fees</span>
                  <Badge variant="outline">0.5%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Burn Rate</span>
                  <Badge variant="outline">50%</Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
