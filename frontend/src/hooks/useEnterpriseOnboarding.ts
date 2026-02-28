import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { EnterpriseOnboardingRequest } from '../backend';
import { Variant_pending_approved_rejected } from '../backend';
import { toast } from 'sonner';

// User hooks
export function useMyEnterpriseOnboardingRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<EnterpriseOnboardingRequest[]>({
    queryKey: ['myEnterpriseOnboardingRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyEnterpriseOnboardingRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitEnterpriseOnboardingRequest() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ company, contract }: { company: string; contract: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitEnterpriseOnboardingRequest(company, contract);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myEnterpriseOnboardingRequests'] });
      queryClient.invalidateQueries({ queryKey: ['allEnterpriseOnboardingRequests'] });
      toast.success('Onboarding request submitted successfully!');
    },
    onError: (error: Error) => {
      console.error('Failed to submit onboarding request:', error);
      toast.error(error.message || 'Failed to submit onboarding request');
    },
  });
}

// Admin hooks
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllEnterpriseOnboardingRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<EnterpriseOnboardingRequest[]>({
    queryKey: ['allEnterpriseOnboardingRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnterpriseOnboardingRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateEnterpriseRequestStatus() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      notes,
    }: {
      id: bigint;
      status: Variant_pending_approved_rejected;
      notes: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateEnterpriseRequestStatus(id, status, notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allEnterpriseOnboardingRequests'] });
      queryClient.invalidateQueries({ queryKey: ['myEnterpriseOnboardingRequests'] });
      toast.success('Request status updated successfully!');
    },
    onError: (error: Error) => {
      console.error('Failed to update request status:', error);
      toast.error(error.message || 'Failed to update request status');
    },
  });
}
