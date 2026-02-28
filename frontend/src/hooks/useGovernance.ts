import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';

export interface Proposal {
  id: bigint;
  title: string;
  description: string;
  creator: string;
  createdAt: bigint;
  votesFor: bigint;
  votesAgainst: bigint;
  status: 'active' | 'passed' | 'rejected';
}

export interface CreateProposalParams {
  title: string;
  description: string;
}

export interface VoteParams {
  proposalId: bigint;
  support: boolean;
}

export function useProposals() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Proposal[]>({
    queryKey: ['proposals'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // TODO: Replace with actual backend call when implemented
      // return actor.getProposals();
      return [];
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 15000,
  });
}

export function useCreateProposal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateProposalParams) => {
      if (!actor) throw new Error('Actor not available');
      
      // TODO: Replace with actual backend call when implemented
      // const result = await actor.createProposal(params.title, params.description);
      
      // Simulate for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Proposal creation not yet implemented in backend');
    },
    onSuccess: () => {
      toast.success('Proposal created successfully');
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Proposal creation failed');
    },
  });
}

export function useVote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: VoteParams) => {
      if (!actor) throw new Error('Actor not available');
      
      // TODO: Replace with actual backend call when implemented
      // await actor.vote(params.proposalId, params.support);
      
      // Simulate for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Voting functionality not yet implemented in backend');
    },
    onSuccess: () => {
      toast.success('Vote recorded successfully');
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Voting failed');
    },
  });
}
