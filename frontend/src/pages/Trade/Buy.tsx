import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ShoppingCart } from 'lucide-react';
import { useBuyToken } from '../../hooks/useBuy';
import { toast } from 'sonner';
import { SectionHeader } from '../../components/common/SectionHeader';
import { InlineAuthGate } from '../../components/auth/InlineAuthGate';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export function Buy() {
  const { identity } = useInternetIdentity();
  const buyMutation = useBuyToken();
  const [selectedToken, setSelectedToken] = useState<'TIME' | 'TRAV'>('TIME');
  const [amount, setAmount] = useState('');

  const handleBuy = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    buyMutation.mutate({
      token: selectedToken,
      amount,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Buy Tokens"
        subtitle="Purchase TIME AI and TRAV AI tokens"
        icon={<ShoppingCart className="w-8 h-8" />}
      />

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Purchase Tokens</CardTitle>
            <CardDescription>
              Select a token and enter the amount you wish to purchase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="token">Select Token</Label>
                <Select value={selectedToken} onValueChange={(v) => setSelectedToken(v as 'TIME' | 'TRAV')}>
                  <SelectTrigger id="token">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TIME">TIME AI</SelectItem>
                    <SelectItem value="TRAV">TRAV AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={!identity}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter the number of tokens you want to purchase
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Token:</span>
                  <span className="font-medium">{selectedToken} AI</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{amount || '0'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per token:</span>
                  <span className="font-medium">$1.00 USD</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${amount ? parseFloat(amount).toFixed(2) : '0.00'} USD</span>
                  </div>
                </div>
              </div>

              <InlineAuthGate
                message="Log in to purchase tokens"
                fallback={
                  <Button disabled className="w-full" size="lg">
                    Log In to Purchase
                  </Button>
                }
              >
                <Button
                  onClick={handleBuy}
                  disabled={buyMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {buyMutation.isPending ? 'Processing...' : 'Purchase Tokens'}
                </Button>
              </InlineAuthGate>

              <p className="text-xs text-muted-foreground text-center">
                This is an in-app simulated purchase. Your balance will be updated immediately upon successful purchase.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
