import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { RewardEvent } from '../backend';
import { toast } from 'sonner';

export function useMyRewardPoints() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['myRewardPoints'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyRewardPoints();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useMyRewardEvents() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<RewardEvent[]>({
    queryKey: ['myRewardEvents'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyRewardEvents();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useEarnRewardPoints() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ points, description }: { points: number; description: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.earnRewardPoints(BigInt(points), description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myRewardPoints'] });
      queryClient.invalidateQueries({ queryKey: ['myRewardEvents'] });
      toast.success('Reward points earned successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to earn reward points');
    },
  });
}

export function useRedeemRewardPoints() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ points, description }: { points: number; description: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.redeemRewardPoints(BigInt(points), description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myRewardPoints'] });
      queryClient.invalidateQueries({ queryKey: ['myRewardEvents'] });
      toast.success('Reward points redeemed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to redeem reward points');
    },
  });
}
