import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MarketplaceItem, NotarizationRecord, NotaryRequest, RoadmapItem, UserRoadmap } from '../backend';
import { toast } from 'sonner';

// Marketplace Queries
export function useMarketplaceItems() {
  const { actor, isFetching } = useActor();

  return useQuery<MarketplaceItem[]>({
    queryKey: ['marketplaceItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMarketplaceItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarketplaceItem(itemId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<MarketplaceItem | null>({
    queryKey: ['marketplaceItem', itemId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMarketplaceItemById(BigInt(itemId));
    },
    enabled: !!actor && !isFetching && !!itemId,
  });
}

export function useMyMarketplaceUnlocks() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['myMarketplaceUnlocks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyMarketplaceUnlocks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUnlockMarketplaceItem() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (itemId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.unlockMarketplaceItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myMarketplaceUnlocks'] });
      toast.success('Item unlocked successfully!');
    },
    onError: (error: Error) => {
      console.error('Unlock failed:', error);
      toast.error(error.message || 'Failed to unlock item');
    },
  });
}

// Notarization Queries
export function useSubmitNotaryRequest() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (request: NotaryRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitNotaryRequest(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNotarizationRecords'] });
      toast.success('Content notarized successfully!');
    },
    onError: (error: Error) => {
      console.error('Notarization failed:', error);
      toast.error(error.message || 'Failed to notarize content');
    },
  });
}

export function useVerifyNotarizationText() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.verifyNotarizationText(text);
    },
    onError: (error: Error) => {
      console.error('Verification failed:', error);
      toast.error(error.message || 'Failed to verify content');
    },
  });
}

export function useMyNotarizationRecords() {
  const { actor, isFetching } = useActor();

  return useQuery<NotarizationRecord[]>({
    queryKey: ['myNotarizationRecords'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyNotarizationRecords();
    },
    enabled: !!actor && !isFetching,
  });
}

// Roadmap Queries
export function useRoadmapItems() {
  const { actor, isFetching } = useActor();

  return useQuery<RoadmapItem[]>({
    queryKey: ['roadmapItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRoadmapItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCurrentUserRoadmap() {
  const { actor, isFetching } = useActor();

  return useQuery<UserRoadmap | null>({
    queryKey: ['currentUserRoadmap'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCurrentUserRoadmap();
      } catch (error) {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateUserRoadmap() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (roadmap: { high: RoadmapItem[]; medium: RoadmapItem[]; low: RoadmapItem[] }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createUserRoadmap(roadmap.high, roadmap.medium, roadmap.low);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserRoadmap'] });
      toast.success('Roadmap saved successfully!');
    },
    onError: (error: Error) => {
      console.error('Failed to save roadmap:', error);
      toast.error(error.message || 'Failed to save roadmap');
    },
  });
}
