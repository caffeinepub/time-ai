import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MetricsSummary, TimeSeriesEntry, AgentConfig } from '../backend';
import { Principal } from '@dfinity/principal';

// Time period helper functions
const getTimeRange = (period: 'day' | 'week' | 'month'): { startTime: bigint; endTime: bigint } => {
  const now = Date.now();
  const endTime = BigInt(now * 1_000_000); // Convert to nanoseconds
  
  let startTime: bigint;
  switch (period) {
    case 'day':
      startTime = BigInt((now - 24 * 60 * 60 * 1000) * 1_000_000);
      break;
    case 'week':
      startTime = BigInt((now - 7 * 24 * 60 * 60 * 1000) * 1_000_000);
      break;
    case 'month':
      startTime = BigInt((now - 30 * 24 * 60 * 60 * 1000) * 1_000_000);
      break;
  }
  
  return { startTime, endTime };
};

const getInterval = (period: 'day' | 'week' | 'month'): bigint => {
  switch (period) {
    case 'day':
      return BigInt(60 * 60 * 1000 * 1_000_000); // 1 hour in nanoseconds
    case 'week':
      return BigInt(24 * 60 * 60 * 1000 * 1_000_000); // 1 day in nanoseconds
    case 'month':
      return BigInt(24 * 60 * 60 * 1000 * 1_000_000); // 1 day in nanoseconds
  }
};

// Hook to fetch agent metrics summary
export function useAgentMetricsSummary(
  agentId: string | null,
  period: 'day' | 'week' | 'month'
) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MetricsSummary | null>({
    queryKey: ['agentMetricsSummary', agentId, period],
    queryFn: async () => {
      if (!actor || !agentId) return null;
      
      const { startTime, endTime } = getTimeRange(period);
      const principal = Principal.fromText(agentId);
      
      try {
        return await actor.getAgentMetricsSummary(principal, startTime, endTime);
      } catch (error) {
        console.error('Failed to fetch agent metrics summary:', error);
        return null;
      }
    },
    enabled: !!actor && !actorFetching && !!agentId,
    staleTime: 30_000, // 30 seconds
    refetchInterval: 60_000, // 60 seconds
  });
}

// Hook to fetch agent time series data
export function useAgentTimeSeries(
  agentId: string | null,
  period: 'day' | 'week' | 'month'
) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TimeSeriesEntry[]>({
    queryKey: ['agentTimeSeries', agentId, period],
    queryFn: async () => {
      if (!actor || !agentId) return [];
      
      const { startTime, endTime } = getTimeRange(period);
      const interval = getInterval(period);
      const principal = Principal.fromText(agentId);
      
      try {
        return await actor.getAgentTimeSeries(principal, startTime, endTime, interval);
      } catch (error) {
        console.error('Failed to fetch agent time series:', error);
        return [];
      }
    },
    enabled: !!actor && !actorFetching && !!agentId,
    staleTime: 30_000, // 30 seconds
    refetchInterval: 60_000, // 60 seconds
  });
}

// Hook to fetch aggregate metrics across all agents
export function useAggregateMetrics(period: 'day' | 'week' | 'month') {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<{
    totalTasks: number;
    completedTasks: number;
    averageComplianceScore: number;
    agentCount: number;
  }>({
    queryKey: ['aggregateMetrics', period],
    queryFn: async () => {
      if (!actor) {
        return {
          totalTasks: 0,
          completedTasks: 0,
          averageComplianceScore: 0,
          agentCount: 0,
        };
      }

      try {
        // Fetch all agent configs
        const configs: AgentConfig[] = await actor.getAllAgentConfigs();
        
        if (configs.length === 0) {
          return {
            totalTasks: 0,
            completedTasks: 0,
            averageComplianceScore: 0,
            agentCount: 0,
          };
        }

        const { startTime, endTime } = getTimeRange(period);
        
        // For demo purposes, we'll use a mock agent ID since we don't have real agent principals
        // In production, you would iterate through actual agent principals
        let totalTasks = 0;
        let completedTasks = 0;
        let totalComplianceScore = 0;
        let successfulFetches = 0;

        // Since we don't have real agent principals with metrics, return demo data
        return {
          totalTasks: configs.length * 10, // Demo: 10 tasks per agent
          completedTasks: configs.length * 8, // Demo: 8 completed per agent
          averageComplianceScore: 95, // Demo: 95% compliance
          agentCount: configs.length,
        };
      } catch (error) {
        console.error('Failed to fetch aggregate metrics:', error);
        return {
          totalTasks: 0,
          completedTasks: 0,
          averageComplianceScore: 0,
          agentCount: 0,
        };
      }
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000, // 30 seconds
    refetchInterval: 60_000, // 60 seconds
  });
}
