import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// Placeholder types until backend is implemented
export interface WalletBalance {
  timeBalance: bigint;
  travBalance: bigint;
}

export interface WalletAddress {
  timeAddress: string;
  travAddress: string;
}

export interface Transaction {
  id: bigint;
  timestamp: bigint;
  tokenSymbol: 'TIME' | 'TRAV';
  type: 'mint' | 'burn' | 'transfer' | 'buy' | 'sell' | 'convert' | 'fee' | 'stake' | 'unstake';
  amount: bigint;
  from?: string;
  to?: string;
}

export function useWalletBalances() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WalletBalance>({
    queryKey: ['walletBalances'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // TODO: Replace with actual backend call when implemented
      // return actor.getWalletBalances();
      return {
        timeBalance: BigInt(0),
        travBalance: BigInt(0),
      };
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10000, // Poll every 10 seconds
  });
}

export function useWalletAddresses() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WalletAddress>({
    queryKey: ['walletAddresses'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // TODO: Replace with actual backend call when implemented
      // return actor.getWalletAddresses();
      return {
        timeAddress: 'TIME-ADDR-PLACEHOLDER',
        travAddress: 'TRAV-ADDR-PLACEHOLDER',
      };
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useTransactionHistory() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Transaction[]>({
    queryKey: ['transactionHistory'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // TODO: Replace with actual backend call when implemented
      // return actor.getTransactionHistory();
      return [];
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 15000, // Poll every 15 seconds
  });
}
