import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { ArrowUpDown, Clock } from 'lucide-react';
import { useOpenOrders, useRecentTrades } from '../../../hooks/useMarket';

interface OrderFlowDepthSectionProps {
  token: 'TIME' | 'TRAV';
}

export function OrderFlowDepthSection({ token }: OrderFlowDepthSectionProps) {
  const { data: openOrders, isLoading: ordersLoading } = useOpenOrders();
  const { data: recentTrades, isLoading: tradesLoading } = useRecentTrades(token);

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleTimeString();
  };

  const formatAmount = (amount: bigint) => {
    return amount.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5" />
          Order Flow & Market Depth
        </CardTitle>
        <CardDescription>Live order book and recent trading activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Open Orders</TabsTrigger>
            <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {ordersLoading ? (
              <div className="animate-pulse h-64 bg-muted rounded" />
            ) : openOrders && openOrders.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Side</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openOrders.map((order) => (
                      <TableRow key={order.id.toString()}>
                        <TableCell>
                          <Badge variant={order.side === 'buy' ? 'default' : 'destructive'}>
                            {order.side.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{formatAmount(order.amount)}</TableCell>
                        <TableCell className="font-mono">
                          {order.price ? formatAmount(order.price) : 'Market'}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatTimestamp(order.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <ArrowUpDown className="w-12 h-12 mb-2 opacity-20" />
                <p>No open orders</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trades" className="space-y-4">
            {tradesLoading ? (
              <div className="animate-pulse h-64 bg-muted rounded" />
            ) : recentTrades && recentTrades.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTrades.map((trade) => (
                      <TableRow key={trade.id.toString()}>
                        <TableCell className="font-mono">{formatAmount(trade.amount)}</TableCell>
                        <TableCell className="font-mono">{formatAmount(trade.price)}</TableCell>
                        <TableCell className="font-mono text-xs">{trade.buyer}</TableCell>
                        <TableCell className="font-mono text-xs">{trade.seller}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimestamp(trade.timestamp)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Clock className="w-12 h-12 mb-2 opacity-20" />
                <p>No recent trades</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
