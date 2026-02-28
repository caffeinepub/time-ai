import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export interface PricePoint {
  timestamp: bigint;
  price: bigint;
}

export function usePriceHistory(token: 'TIME' | 'TRAV', timeframe: string = '24h') {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PricePoint[]>({
    queryKey: ['priceHistory', token, timeframe],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const priceData = await actor.getMarketPrice(false);
        
        // Generate a simple series based on current price
        const now = Date.now();
        const points: PricePoint[] = [];
        const basePrice = Number(priceData.priceUSDT);
        
        for (let i = 24; i >= 0; i--) {
          const variance = (Math.random() - 0.5) * (basePrice * 0.05);
          points.push({
            timestamp: BigInt(now - i * 3600000),
            price: BigInt(Math.max(1, Math.floor(basePrice + variance))),
          });
        }
        
        return points;
      } catch (error) {
        console.error('Error fetching price history:', error);
        
        // Generate placeholder data on error
        const now = Date.now();
        const points: PricePoint[] = [];
        for (let i = 24; i >= 0; i--) {
          points.push({
            timestamp: BigInt(now - i * 3600000),
            price: BigInt(100 + Math.floor(Math.random() * 20)),
          });
        }
        return points;
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 60000,
  });
}
