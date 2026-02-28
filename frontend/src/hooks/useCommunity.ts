import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CommunityTopic, CommunityReply } from '../backend';
import { toast } from 'sonner';

export function useCommunityTopics() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<CommunityTopic[]>({
    queryKey: ['communityTopics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCommunityTopics();
    },
    enabled: !!actor && !actorFetching,
    retry: 2,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useCommunityTopic(topicId: string) {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<CommunityTopic | null>({
    queryKey: ['communityTopic', topicId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCommunityTopic(BigInt(topicId));
    },
    enabled: !!actor && !actorFetching && !!topicId,
    retry: 2,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useCommunityReplies(topicId: string) {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<CommunityReply[]>({
    queryKey: ['communityReplies', topicId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCommunityReplies(BigInt(topicId));
    },
    enabled: !!actor && !actorFetching && !!topicId,
    retry: 2,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useCreateCommunityTopic() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createCommunityTopic(title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityTopics'] });
      toast.success('Topic created successfully!');
    },
    onError: (error: Error) => {
      console.error('Failed to create topic:', error);
      toast.error(error.message || 'Failed to create topic');
    },
  });
}

export function useAddCommunityReply() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ topicId, content }: { topicId: bigint; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addCommunityReply(topicId, content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['communityReplies', variables.topicId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['communityTopic', variables.topicId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['communityTopics'] });
      toast.success('Reply added successfully!');
    },
    onError: (error: Error) => {
      console.error('Failed to add reply:', error);
      toast.error(error.message || 'Failed to add reply');
    },
  });
}
