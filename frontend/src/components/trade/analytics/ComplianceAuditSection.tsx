import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Shield, Filter } from 'lucide-react';
import { useComplianceLog, type ComplianceEventType } from '../../../hooks/useComplianceLog';

export function ComplianceAuditSection() {
  const [selectedToken, setSelectedToken] = useState<'TIME' | 'TRAV' | 'all'>('all');
  const [selectedEventType, setSelectedEventType] = useState<ComplianceEventType>('all');

  const { data: events, isLoading } = useComplianceLog(selectedToken, selectedEventType);

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString();
  };

  const formatAmount = (amount: bigint) => {
    return amount.toLocaleString();
  };

  const getEventBadgeVariant = (type: ComplianceEventType) => {
    switch (type) {
      case 'mint':
        return 'default';
      case 'burn':
        return 'destructive';
      case 'transfer':
        return 'secondary';
      case 'conversion':
        return 'outline';
      case 'trade':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Compliance & Audit Log
        </CardTitle>
        <CardDescription>
          Read-only audit trail of all token-affecting events with filtering capabilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Token Filter
              </label>
              <Select value={selectedToken} onValueChange={(v) => setSelectedToken(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tokens</SelectItem>
                  <SelectItem value="TIME">TIME AI</SelectItem>
                  <SelectItem value="TRAV">TRAV AI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Event Type
              </label>
              <Select value={selectedEventType} onValueChange={(v) => setSelectedEventType(v as ComplianceEventType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="mint">Mint</SelectItem>
                  <SelectItem value="burn">Burn</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                  <SelectItem value="trade">Trade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Table */}
          {isLoading ? (
            <div className="animate-pulse h-96 bg-muted rounded" />
          ) : events && events.length > 0 ? (
            <ScrollArea className="h-[500px] rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <Badge variant={getEventBadgeVariant(event.type)}>
                          {event.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{formatAmount(event.amount)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {event.details}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(event.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <Shield className="w-12 h-12 mb-2 opacity-20" />
              <p>No compliance events found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}

          {/* Summary Footer */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Events</span>
              <span className="font-semibold">{events?.length || 0}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
