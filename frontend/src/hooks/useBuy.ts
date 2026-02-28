import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Variant_buy_sell } from '../backend';
import { toast } from 'sonner';

export interface BuyTokenParams {
  token: 'TIME' | 'TRAV';
  amount: string;
}

export function useBuyToken() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token, amount }: BuyTokenParams) => {
      if (!actor) throw new Error('Actor not available');
      
      // Simulate a purchase by placing a buy order
      const orderType = Variant_buy_sell.buy;
      const tokenPair = `${token}/USDT`;
      const amountBigInt = BigInt(Math.floor(parseFloat(amount) * 100));
      const priceBigInt = BigInt(100); // $1.00 per token
      
      return actor.placeTradeOrder(orderType, tokenPair, amountBigInt, priceBigInt);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
      queryClient.invalidateQueries({ queryKey: ['transactionHistory'] });
      toast.success('Purchase successful! Tokens added to your wallet.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Purchase failed');
    },
  });
}
