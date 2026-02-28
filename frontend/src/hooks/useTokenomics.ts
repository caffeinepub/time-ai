import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export interface TokenomicsConfig {
  conversionFeePercent: number;
  tradeFeePercent: number;
  burnPercent: number;
}

export interface FeeTotals {
  timeFees: bigint;
  travFees: bigint;
}

export interface BurnedTotals {
  timeBurned: bigint;
  travBurned: bigint;
}

export function useTokenomicsConfig() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TokenomicsConfig>({
    queryKey: ['tokenomicsConfig'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // Config not available in backend yet, return defaults
      return {
        conversionFeePercent: 0.5,
        tradeFeePercent: 0.3,
        burnPercent: 50.0,
      };
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useFeeTotals() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<FeeTotals>({
    queryKey: ['feeTotals'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const burnAnalysis = await actor.getTokenBurnAnalysisSingleSeries(false);
        
        // Use revenue retained as proxy for fees collected
        return {
          timeFees: burnAnalysis.revenueRetainedUSDT / BigInt(2),
          travFees: burnAnalysis.revenueRetainedUSDT / BigInt(2),
        };
      } catch (error) {
        console.error('Error fetching fee totals:', error);
        return {
          timeFees: BigInt(0),
          travFees: BigInt(0),
        };
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 60000,
  });
}

export function useBurnedTotals() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<BurnedTotals>({
    queryKey: ['burnedTotals'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const burnAnalysis = await actor.getTokenBurnAnalysisSingleSeries(false);
        
        // Split burned tokens between TIME and TRAV
        return {
          timeBurned: burnAnalysis.tokensBurned / BigInt(2),
          travBurned: burnAnalysis.tokensBurned / BigInt(2),
        };
      } catch (error) {
        console.error('Error fetching burned totals:', error);
        return {
          timeBurned: BigInt(0),
          travBurned: BigInt(0),
        };
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 60000,
  });
}
