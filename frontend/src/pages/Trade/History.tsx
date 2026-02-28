import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { History as HistoryIcon } from 'lucide-react';
import { useTransactionHistory } from '../../hooks/useWallet';
import { SectionHeader } from '../../components/common/SectionHeader';
import { LoadingState } from '../../components/common/LoadingState';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export function History() {
  const { identity } = useInternetIdentity();
  const { data: history, isLoading } = useTransactionHistory();

  const formatTimestamp = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Transaction History"
        subtitle="View all your past transactions"
        icon={<HistoryIcon className="w-8 h-8" />}
      />

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Complete history of your trading activity</CardDescription>
        </CardHeader>
        <CardContent>
          {!identity ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Log in to view your transaction history</p>
            </div>
          ) : isLoading ? (
            <LoadingState count={5} className="h-12" />
          ) : history && history.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((tx, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Badge variant="outline">{tx.type}</Badge>
                    </TableCell>
                    <TableCell>{tx.tokenSymbol}</TableCell>
                    <TableCell className="font-mono">{tx.amount.toString()}</TableCell>
                    <TableCell>
                      <Badge variant="default">Completed</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatTimestamp(tx.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No transactions yet</p>
              <p className="text-sm mt-2">Your transaction history will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
