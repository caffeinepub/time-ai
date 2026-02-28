import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';

export interface TransferParams {
  token: 'TIME' | 'TRAV';
  destination: string;
  amount: string;
}

export function useTransfer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: TransferParams) => {
      if (!actor) throw new Error('Actor not available');
      
      // TODO: Replace with actual backend call when implemented
      // const result = await actor.transfer(
      //   params.token === 'TIME' ? { TIME: null } : { TRAV: null },
      //   params.destination,
      //   BigInt(params.amount)
      // );
      
      // Simulate for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Transfer functionality not yet implemented in backend');
    },
    onSuccess: () => {
      toast.success('Transfer successful');
      queryClient.invalidateQueries({ queryKey: ['walletBalances'] });
      queryClient.invalidateQueries({ queryKey: ['transactionHistory'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Transfer failed');
    },
  });
}
