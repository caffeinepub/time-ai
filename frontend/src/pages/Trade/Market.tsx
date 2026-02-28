import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { useOpenOrders, useRecentTrades, useCurrentPrice, usePlaceOrder } from '../../hooks/useMarket';
import { useTokenomicsConfig } from '../../hooks/useTokenomics';
import { toast } from 'sonner';
import { SectionHeader } from '../../components/common/SectionHeader';
import { LoadingState } from '../../components/common/LoadingState';
import { InlineAuthGate } from '../../components/auth/InlineAuthGate';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export function Market() {
  const { identity } = useInternetIdentity();
  const [selectedToken, setSelectedToken] = useState<'TIME' | 'TRAV'>('TIME');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const { data: openOrders, isLoading: ordersLoading } = useOpenOrders();
  const { data: recentTrades, isLoading: tradesLoading } = useRecentTrades(selectedToken);
  const { data: currentPrice } = useCurrentPrice(selectedToken);
  const { data: config } = useTokenomicsConfig();
  const placeOrderMutation = usePlaceOrder();

  const handlePlaceOrder = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    placeOrderMutation.mutate({
      side: orderSide,
      token: selectedToken,
      amount,
      price: price || undefined,
    });
  };

  const formatTimestamp = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleTimeString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Trade Market"
        subtitle="Place orders and trade TIME AI and TRAV AI tokens"
        icon={<TrendingUp className="w-8 h-8" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Placement */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
              <CardDescription>Create a new buy or sell order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="market-token">Token</Label>
                  <Select value={selectedToken} onValueChange={(v) => setSelectedToken(v as 'TIME' | 'TRAV')}>
                    <SelectTrigger id="market-token">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TIME">TIME AI</SelectItem>
                      <SelectItem value="TRAV">TRAV AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Order Type</Label>
                  <Tabs value={orderSide} onValueChange={(v) => setOrderSide(v as 'buy' | 'sell')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="buy">Buy</TabsTrigger>
                      <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div>
                  <Label htmlFor="order-amount">Amount</Label>
                  <Input
                    id="order-amount"
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!identity}
                  />
                </div>

                <div>
                  <Label htmlFor="order-price">Limit Price (optional)</Label>
                  <Input
                    id="order-price"
                    type="number"
                    placeholder="Market price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={!identity}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave empty for market order
                  </p>
                </div>

                <div className="bg-muted p-3 rounded-lg space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Price:</span>
                    <span className="font-medium">{currentPrice?.toString() || '—'}</span>
                  </div>
                  {config && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trade Fee:</span>
                      <span className="font-medium">{config.tradeFeePercent}%</span>
                    </div>
                  )}
                </div>

                <InlineAuthGate
                  message="Log in to place orders"
                  fallback={
                    <Button disabled className="w-full" variant={orderSide === 'buy' ? 'default' : 'destructive'}>
                      Log In to Place Order
                    </Button>
                  }
                >
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={placeOrderMutation.isPending}
                    className="w-full"
                    variant={orderSide === 'buy' ? 'default' : 'destructive'}
                  >
                    {placeOrderMutation.isPending ? 'Placing...' : `Place ${orderSide.toUpperCase()} Order`}
                  </Button>
                </InlineAuthGate>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Open Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Your Open Orders</CardTitle>
              <CardDescription>Active orders waiting to be filled</CardDescription>
            </CardHeader>
            <CardContent>
              {!identity ? (
                <div className="text-center py-8 text-muted-foreground">
                  Log in to view your open orders
                </div>
              ) : ordersLoading ? (
                <LoadingState count={2} className="h-12" />
              ) : openOrders && openOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Side</TableHead>
                      <TableHead>Token</TableHead>
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
                        <TableCell>{order.token}</TableCell>
                        <TableCell>{order.amount.toString()}</TableCell>
                        <TableCell>{order.price?.toString() || 'Market'}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatTimestamp(order.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No open orders
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>Latest {selectedToken} AI market activity</CardDescription>
            </CardHeader>
            <CardContent>
              {tradesLoading ? (
                <LoadingState count={3} className="h-12" />
              ) : recentTrades && recentTrades.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTrades.map((trade) => (
                      <TableRow key={trade.id.toString()}>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatTimestamp(trade.timestamp)}
                        </TableCell>
                        <TableCell>{trade.amount.toString()}</TableCell>
                        <TableCell className="font-mono">{trade.price.toString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No recent trades
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
