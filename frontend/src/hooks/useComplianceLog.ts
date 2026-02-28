import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TokenOperation } from '../backend';

export type ComplianceEventType = 'all' | 'mint' | 'burn' | 'transfer' | 'conversion' | 'trade';

export interface ComplianceEvent {
  id: string;
  type: ComplianceEventType;
  timestamp: bigint;
  amount: bigint;
  details: string;
  operation: TokenOperation;
}

export function useComplianceLog(
  token: 'TIME' | 'TRAV' | 'all' = 'all',
  eventType: ComplianceEventType = 'all'
) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ComplianceEvent[]>({
    queryKey: ['complianceLog', token, eventType],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const operations = await actor.getComplianceLog(false);
        
        const events: ComplianceEvent[] = operations.map((op, index) => {
          let type: ComplianceEventType = 'all';
          let amount = BigInt(0);
          let timestamp = BigInt(0);
          let details = '';

          if (op.__kind__ === 'mint') {
            type = 'mint';
            amount = op.mint.amount;
            timestamp = op.mint.timestamp;
            details = `Minted to ${op.mint.to.toString().slice(0, 8)}...`;
          } else if (op.__kind__ === 'burn') {
            type = 'burn';
            amount = op.burn.amount;
            timestamp = op.burn.timestamp;
            details = `Tokens burned`;
          } else if (op.__kind__ === 'transfer') {
            type = 'transfer';
            amount = op.transfer.amount;
            timestamp = op.transfer.timestamp;
            details = `From ${op.transfer.from.toString().slice(0, 8)}... to ${op.transfer.to.toString().slice(0, 8)}...`;
          } else if (op.__kind__ === 'conversion') {
            type = 'conversion';
            amount = op.conversion.amount;
            timestamp = op.conversion.timestamp;
            details = `Converted between tokens`;
          } else if (op.__kind__ === 'trade') {
            type = 'trade';
            amount = op.trade.amount;
            timestamp = op.trade.timestamp;
            details = `Trade between ${op.trade.from.toString().slice(0, 8)}... and ${op.trade.to.toString().slice(0, 8)}...`;
          }

          return {
            id: `${index}-${timestamp}`,
            type,
            timestamp,
            amount,
            details,
            operation: op,
          };
        });

        // Filter by event type
        let filtered = events;
        if (eventType !== 'all') {
          filtered = events.filter(e => e.type === eventType);
        }

        // Sort by timestamp descending
        filtered.sort((a, b) => Number(b.timestamp - a.timestamp));

        return filtered;
      } catch (error) {
        console.error('Error fetching compliance log:', error);
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000,
  });
}
