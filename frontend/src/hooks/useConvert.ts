import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';

export interface ConversionRate {
  timeToTrav: number;
  travToTime: number;
}

export interface ConvertParams {
  from: 'TIME' | 'TRAV';
  to: 'TIME' | 'TRAV';
  amount: string;
}

export function useConversionRate() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ConversionRate>({
    queryKey: ['conversionRate'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // TODO: Replace with actual backend call when implemented
      // return actor.getConversionRate();
      return {
        timeToTrav: 1.0,
        travToTime: 1.0,
      };
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000, // Poll every 30 seconds
  });
}

export function useConvertToken() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: ConvertParams) => {
      if (!actor) throw new Error('Actor not available');
      
      // TODO: Replace with actual backend call when implemented
      // const result = await actor.convertToken(
      //   params.from === 'TIME' ? { TIME: null } : { TRAV: null },
      //   params.to === 'TIME' ? { TIME: null } : { TRAV: null },
      //   BigInt(params.amount)
      // );
      
      // Simulate for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Conversion functionality not yet implemented in backend');
    },
    onSuccess: () => {
      toast.success('Conversion successful');
      queryClient.invalidateQueries({ queryKey: ['walletBalances'] });
      queryClient.invalidateQueries({ queryKey: ['transactionHistory'] });
      queryClient.invalidateQueries({ queryKey: ['conversionRate'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Conversion failed');
    },
  });
}
