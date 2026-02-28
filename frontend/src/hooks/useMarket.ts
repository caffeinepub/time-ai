import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { TradeOrder, Trade, Variant_buy_sell } from '../backend';
import { toast } from 'sonner';

export interface Order {
  id: bigint;
  side: 'buy' | 'sell';
  token: 'TIME' | 'TRAV';
  amount: bigint;
  price?: bigint;
  timestamp: bigint;
}

export interface TradeData {
  id: bigint;
  token: 'TIME' | 'TRAV';
  amount: bigint;
  price: bigint;
  timestamp: bigint;
  buyer: string;
  seller: string;
}

export interface PlaceOrderParams {
  side: 'buy' | 'sell';
  token: 'TIME' | 'TRAV';
  amount: string;
  price?: string;
}

export function useOpenOrders() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: ['openOrders'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const orders = await actor.getMyOpenOrders();
        
        return orders.map((order: TradeOrder) => ({
          id: order.id,
          side: order.orderType === Variant_buy_sell.buy ? 'buy' as const : 'sell' as const,
          token: order.tokenPair.includes('TIME') ? 'TIME' as const : 'TRAV' as const,
          amount: order.amount,
          price: order.price,
          timestamp: order.timestamp,
        }));
      } catch (error) {
        console.error('Error fetching open orders:', error);
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10000,
  });
}

export function useRecentTrades(token: 'TIME' | 'TRAV') {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TradeData[]>({
    queryKey: ['recentTrades', token],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const trades = await actor.getRecentTrades();
        
        return trades.map((trade: Trade) => ({
          id: trade.id,
          token: token,
          amount: trade.amount,
          price: trade.price,
          timestamp: trade.timestamp,
          buyer: 'User',
          seller: 'User',
        }));
      } catch (error) {
        console.error('Error fetching recent trades:', error);
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10000,
  });
}

export function useCurrentPrice(token: 'TIME' | 'TRAV') {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['currentPrice', token],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const priceData = await actor.getMarketPrice(false);
        return priceData.priceUSDT;
      } catch (error) {
        console.error('Error fetching current price:', error);
        return BigInt(100); // Fallback simulated price
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ side, token, amount, price }: PlaceOrderParams) => {
      if (!actor) throw new Error('Actor not available');
      
      const orderType = side === 'buy' ? Variant_buy_sell.buy : Variant_buy_sell.sell;
      const tokenPair = `${token}/USDT`;
      const amountBigInt = BigInt(Math.floor(parseFloat(amount) * 100));
      const priceBigInt = price ? BigInt(Math.floor(parseFloat(price) * 100)) : BigInt(100);
      
      return actor.placeTradeOrder(orderType, tokenPair, amountBigInt, priceBigInt);
    },
    onSuccess: (orderId) => {
      queryClient.invalidateQueries({ queryKey: ['openOrders'] });
      queryClient.invalidateQueries({ queryKey: ['recentTrades'] });
      toast.success(`Order placed successfully! Order ID: ${orderId.toString()}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to place order');
    },
  });
}
