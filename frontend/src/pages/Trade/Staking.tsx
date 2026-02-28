import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Coins, TrendingUp, Lock } from 'lucide-react';
import { useStakeToken, useUnstakeToken, useStakedBalance } from '../../hooks/useStaking';
import { toast } from 'sonner';
import { SectionHeader } from '../../components/common/SectionHeader';
import { InlineAuthGate } from '../../components/auth/InlineAuthGate';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export function Staking() {
  const { identity } = useInternetIdentity();
  const [selectedToken, setSelectedToken] = useState<'TIME' | 'TRAV'>('TIME');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  const { data: stakedBalance } = useStakedBalance(selectedToken);
  const stakeMutation = useStakeToken();
  const unstakeMutation = useUnstakeToken();

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    stakeMutation.mutate({
      token: selectedToken,
      amount: stakeAmount,
    });
  };

  const handleUnstake = () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    unstakeMutation.mutate({
      token: selectedToken,
      amount: unstakeAmount,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Staking"
        subtitle="Stake your tokens to earn rewards"
        icon={<Coins className="w-8 h-8" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Staking Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Token</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedToken} onValueChange={(v) => setSelectedToken(v as 'TIME' | 'TRAV')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TIME">TIME AI</SelectItem>
                  <SelectItem value="TRAV">TRAV AI</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Staking Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Earn Rewards</p>
                  <p className="text-sm text-muted-foreground">
                    Receive staking rewards based on your stake
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Governance Rights</p>
                  <p className="text-sm text-muted-foreground">
                    Participate in platform governance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {identity && stakedBalance !== undefined && (
            <Card>
              <CardHeader>
                <CardTitle>Your Staking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staked:</span>
                  <span className="font-medium">{stakedBalance.toString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rewards:</span>
                  <span className="font-medium text-primary">0</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Staking Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Stake / Unstake</CardTitle>
              <CardDescription>
                Manage your {selectedToken} AI staking position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stake">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="stake">Stake</TabsTrigger>
                  <TabsTrigger value="unstake">Unstake</TabsTrigger>
                </TabsList>

                <TabsContent value="stake" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="stake-amount">Amount to Stake</Label>
                    <Input
                      id="stake-amount"
                      type="number"
                      placeholder="0"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      disabled={!identity}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter the amount of {selectedToken} AI tokens to stake
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Token:</span>
                      <span className="font-medium">{selectedToken} AI</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">{stakeAmount || '0'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Est. APY:</span>
                      <span className="font-medium text-primary">12%</span>
                    </div>
                  </div>

                  <InlineAuthGate
                    message="Log in to stake tokens"
                    fallback={
                      <Button disabled className="w-full" size="lg">
                        Log In to Stake
                      </Button>
                    }
                  >
                    <Button
                      onClick={handleStake}
                      disabled={stakeMutation.isPending}
                      className="w-full"
                      size="lg"
                    >
                      {stakeMutation.isPending ? 'Staking...' : 'Stake Tokens'}
                    </Button>
                  </InlineAuthGate>
                </TabsContent>

                <TabsContent value="unstake" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                    <Input
                      id="unstake-amount"
                      type="number"
                      placeholder="0"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      disabled={!identity}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter the amount of {selectedToken} AI tokens to unstake
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Token:</span>
                      <span className="font-medium">{selectedToken} AI</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">{unstakeAmount || '0'}</span>
                    </div>
                    {identity && stakedBalance !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Currently Staked:</span>
                        <span className="font-medium">{stakedBalance.toString()}</span>
                      </div>
                    )}
                  </div>

                  <InlineAuthGate
                    message="Log in to unstake tokens"
                    fallback={
                      <Button disabled className="w-full" size="lg" variant="outline">
                        Log In to Unstake
                      </Button>
                    }
                  >
                    <Button
                      onClick={handleUnstake}
                      disabled={unstakeMutation.isPending}
                      className="w-full"
                      size="lg"
                      variant="outline"
                    >
                      {unstakeMutation.isPending ? 'Unstaking...' : 'Unstake Tokens'}
                    </Button>
                  </InlineAuthGate>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
