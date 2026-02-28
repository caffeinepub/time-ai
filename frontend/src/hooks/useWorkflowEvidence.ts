import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { WorkflowRun, EvidenceItem, NotarizationRecord } from '../backend';

// ============================================
// WORKFLOW RUN HOOKS
// ============================================

export function useWorkflowRuns() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WorkflowRun[]>({
    queryKey: ['workflowRuns'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getWorkflowRuns();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useWorkflowRun(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WorkflowRun | null>({
    queryKey: ['workflowRun', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getWorkflowRun(id);
    },
    enabled: !!actor && !actorFetching && id !== null,
  });
}

export function useCreateWorkflowRun() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      evidenceItemIds,
    }: {
      name: string;
      description: string;
      evidenceItemIds: bigint[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createWorkflowRun(name, description, evidenceItemIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflowRuns'] });
    },
  });
}

export function useWorkflowRunEvidence(workflowRunId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<EvidenceItem[]>({
    queryKey: ['workflowRunEvidence', workflowRunId?.toString()],
    queryFn: async () => {
      if (!actor || workflowRunId === null) return [];
      return actor.getWorkflowRunEvidence(workflowRunId);
    },
    enabled: !!actor && !actorFetching && workflowRunId !== null,
  });
}

// ============================================
// EVIDENCE ITEM HOOKS
// ============================================

export function useEvidenceItems() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<EvidenceItem[]>({
    queryKey: ['evidenceItems'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getEvidenceItems();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateEvidenceItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      description,
      notarizationRecordId,
    }: {
      description: string;
      notarizationRecordId: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createEvidenceItem(description, notarizationRecordId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evidenceItems'] });
    },
  });
}

// ============================================
// NOTARIZATION RECORD HELPERS
// ============================================

export function useNotarizationRecord(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<NotarizationRecord | null>({
    queryKey: ['notarizationRecord', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      // Fetch all records and find the one we need
      const allRecords = await actor.getMyNotarizationRecords();
      return allRecords.find((r) => r.id === id) || null;
    },
    enabled: !!actor && !actorFetching && id !== null,
  });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleString();
}

export function parseControlFromDescription(description: string): string | null {
  // Extract control ID from description using pattern: [CONTROL:control-id]
  const match = description.match(/\[CONTROL:([^\]]+)\]/);
  return match ? match[1] : null;
}

export function buildDescriptionWithControl(description: string, controlId: string): string {
  // Prepend control tag to description
  return `[CONTROL:${controlId}] ${description}`;
}
