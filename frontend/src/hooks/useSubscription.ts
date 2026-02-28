import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Principal } from '@dfinity/principal';

export function useGetSubscription() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<string>({
    queryKey: ['subscription', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      if (!identity) throw new Error('Not authenticated');
      const principal = identity.getPrincipal();
      return actor.getSubscription(principal as unknown as Principal);
    },
    enabled: !!actor && !actorFetching && !!identity,
    staleTime: 0,
  });
}

export function useSubscription() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isReady = !!actor && !actorFetching && !!identity;

  const getSubscriptionMutation = useMutation<string, Error, void>({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      if (!identity) throw new Error('Not authenticated');
      const principal = identity.getPrincipal();
      return actor.getSubscription(principal as unknown as Principal);
    },
  });

  const setSubscriptionMutation = useMutation<void, Error, { tier: string }>({
    mutationFn: async ({ tier }) => {
      if (!actor) throw new Error('Actor not available');
      if (!identity) throw new Error('Not authenticated');
      const principal = identity.getPrincipal();
      return actor.setSubscription(principal as unknown as Principal, tier);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
  });

  return {
    isReady,
    identity,
    getSubscriptionMutation,
    setSubscriptionMutation,
  };
}
