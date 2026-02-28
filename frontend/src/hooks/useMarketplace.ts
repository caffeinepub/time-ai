import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MarketplaceItem, MarketplaceUnlock } from '../backend';

export function useMarketplaceItems() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MarketplaceItem[]>({
    queryKey: ['marketplaceItems'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMarketplaceItems();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useMarketplaceItemById(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MarketplaceItem | null>({
    queryKey: ['marketplaceItem', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getMarketplaceItemById(id);
    },
    enabled: !!actor && !actorFetching && id !== null,
  });
}

export function useUnlockMarketplaceItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.unlockMarketplaceItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myMarketplaceUnlocks'] });
    },
  });
}

export function useMyMarketplaceUnlocks() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MarketplaceUnlock[]>({
    queryKey: ['myMarketplaceUnlocks'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyMarketplaceUnlocks();
    },
    enabled: !!actor && !actorFetching,
  });
}
