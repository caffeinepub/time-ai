import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Wallet as WalletIcon, Send, Copy } from 'lucide-react';
import { useWalletBalances, useTransactionHistory } from '../../hooks/useWallet';
import { toast } from 'sonner';
import { SectionHeader } from '../../components/common/SectionHeader';
import { LoadingState } from '../../components/common/LoadingState';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { InlineAuthGate } from '../../components/auth/InlineAuthGate';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export function Wallet() {
  const { identity } = useInternetIdentity();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState<'TIME' | 'TRAV'>('TIME');

  const { data: balance, isLoading: balanceLoading } = useWalletBalances();
  const { data: history, isLoading: historyLoading } = useTransactionHistory();

  const handleSend = () => {
    if (!recipient || !amount || parseFloat(amount) <= 0) {
      toast.error('Please enter valid recipient and amount');
      return;
    }
    // TODO: Implement send mutation when backend is ready
    toast.error('Send functionality not yet implemented in backend');
  };

  const handleCopyAddress = () => {
    if (identity) {
      navigator.clipboard.writeText(identity.getPrincipal().toString());
      toast.success('Address copied to clipboard');
    }
  };

  const formatTimestamp = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Wallet"
        subtitle="Manage your TIME AI and TRAV AI tokens"
        icon={<WalletIcon className="w-8 h-8" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Wallet Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Address Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Address</CardTitle>
            </CardHeader>
            <CardContent>
              {identity ? (
                <div className="space-y-2">
                  <p className="text-xs font-mono break-all bg-muted p-2 rounded">
                    {identity.getPrincipal().toString()}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={handleCopyAddress}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Address
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Log in to view your address
                </p>
              )}
            </CardContent>
          </Card>

          {/* Balance Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Balances</CardTitle>
            </CardHeader>
            <CardContent>
              {!identity ? (
                <p className="text-sm text-muted-foreground">
                  Log in to view your balances
                </p>
              ) : balanceLoading ? (
                <LoadingState count={2} className="h-12" />
              ) : balance ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">TIME AI</span>
                    <span className="text-lg font-bold">{balance.timeBalance.toString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">TRAV AI</span>
                    <span className="text-lg font-bold">{balance.travBalance.toString()}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No balance data</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Send Tokens & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Send Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Send Tokens</CardTitle>
              <CardDescription>Transfer tokens to another address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    placeholder="Enter principal ID"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    disabled={!identity}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="token">Token</Label>
                    <select
                      id="token"
                      value={selectedToken}
                      onChange={(e) => setSelectedToken(e.target.value as 'TIME' | 'TRAV')}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      disabled={!identity}
                    >
                      <option value="TIME">TIME AI</option>
                      <option value="TRAV">TRAV AI</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="send-amount">Amount</Label>
                    <Input
                      id="send-amount"
                      type="number"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={!identity}
                    />
                  </div>
                </div>

                <InlineAuthGate
                  message="Log in to send tokens"
                  fallback={
                    <Button disabled className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Log In to Send
                    </Button>
                  }
                >
                  <Button
                    onClick={handleSend}
                    disabled={false}
                    className="w-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Tokens
                  </Button>
                </InlineAuthGate>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              {!identity ? (
                <div className="text-center py-8 text-muted-foreground">
                  Log in to view your transaction history
                </div>
              ) : historyLoading ? (
                <LoadingState count={3} className="h-12" />
              ) : history && history.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((tx, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Badge>{tx.type}</Badge>
                        </TableCell>
                        <TableCell>{tx.tokenSymbol}</TableCell>
                        <TableCell>{tx.amount.toString()}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatTimestamp(tx.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
