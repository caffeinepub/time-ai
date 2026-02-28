import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { AgentDesignState, SharedAgentDesignState } from '../backend';

export function useBackendAgentDesigns() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const query = useQuery<AgentDesignState[]>({
    queryKey: ['agentDesigns'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAgentDesigns();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: async (design: SharedAgentDesignState) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createAgentDesign(design);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentDesigns'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, design }: { id: number; design: SharedAgentDesignState }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateAgentDesign(BigInt(id), design);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentDesigns'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteAgentDesign(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentDesigns'] });
    },
  });

  return {
    designs: query.data || [],
    isLoading: actorFetching || query.isLoading,
    createDesign: (design: SharedAgentDesignState) => createMutation.mutate(design),
    updateDesign: (id: number, design: SharedAgentDesignState) =>
      updateMutation.mutate({ id, design }),
    deleteDesign: (id: number) => deleteMutation.mutate(id),
  };
}
