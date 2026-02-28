import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';

export interface StakeParams {
  token: 'TIME' | 'TRAV';
  amount: string;
}

export function useStakedBalance(token: 'TIME' | 'TRAV') {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['stakedBalance', token],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // TODO: Replace with actual backend call when implemented
      // return actor.getStakedBalance(token === 'TIME' ? { TIME: null } : { TRAV: null });
      return BigInt(0);
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 15000,
  });
}

export function useStakeToken() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: StakeParams) => {
      if (!actor) throw new Error('Actor not available');
      
      // TODO: Replace with actual backend call when implemented
      // await actor.stakeToken(
      //   params.token === 'TIME' ? { TIME: null } : { TRAV: null },
      //   BigInt(params.amount)
      // );
      
      // Simulate for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Staking functionality not yet implemented in backend');
    },
    onSuccess: () => {
      toast.success('Tokens staked successfully');
      queryClient.invalidateQueries({ queryKey: ['stakedBalance'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalances'] });
      queryClient.invalidateQueries({ queryKey: ['tokenAnalytics'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Staking failed');
    },
  });
}

export function useUnstakeToken() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: StakeParams) => {
      if (!actor) throw new Error('Actor not available');
      
      // TODO: Replace with actual backend call when implemented
      // await actor.unstakeToken(
      //   params.token === 'TIME' ? { TIME: null } : { TRAV: null },
      //   BigInt(params.amount)
      // );
      
      // Simulate for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Unstaking functionality not yet implemented in backend');
    },
    onSuccess: () => {
      toast.success('Tokens unstaked successfully');
      queryClient.invalidateQueries({ queryKey: ['stakedBalance'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalances'] });
      queryClient.invalidateQueries({ queryKey: ['tokenAnalytics'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unstaking failed');
    },
  });
}
