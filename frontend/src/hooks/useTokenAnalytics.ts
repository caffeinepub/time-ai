import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export interface TokenAnalytics {
  circulatingSupply: bigint;
  availableSupply: bigint;
  tradingVolume24h: bigint;
  stakedSupply?: bigint;
}

export function useTokenAnalytics(token: 'TIME' | 'TRAV') {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TokenAnalytics>({
    queryKey: ['tokenAnalytics', token],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const distributions = await actor.listTokenDistributions(false);
        
        // Map backend data to analytics format
        let distribution;
        if (token === 'TIME') {
          distribution = distributions.timeTokenDistributions;
        } else {
          distribution = distributions.travTokenDistributions;
        }

        if (!distribution) {
          // Return zeros if no data available
          return {
            circulatingSupply: BigInt(0),
            availableSupply: BigInt(0),
            tradingVolume24h: BigInt(0),
            stakedSupply: BigInt(0),
          };
        }

        // Calculate analytics from distribution data
        const totalSupply = distribution.timeTokens + distribution.travTokens + 
                           distribution.miningTokens + distribution.timeAiTokens + 
                           distribution.travAiTokens;

        return {
          circulatingSupply: totalSupply,
          availableSupply: totalSupply,
          tradingVolume24h: BigInt(0), // Not available in current backend
          stakedSupply: distribution.miningTokens,
        };
      } catch (error) {
        console.error('Error fetching token analytics:', error);
        // Return zeros on error
        return {
          circulatingSupply: BigInt(0),
          availableSupply: BigInt(0),
          tradingVolume24h: BigInt(0),
          stakedSupply: BigInt(0),
        };
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000,
  });
}
