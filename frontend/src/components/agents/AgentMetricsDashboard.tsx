import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimePeriodSelector } from './TimePeriodSelector';
import { TaskCompletionChart } from './TaskCompletionChart';
import { ComplianceScoreChart } from './ComplianceScoreChart';
import { useAgentTimeSeries, useAggregateMetrics } from '@/hooks/useAgentMetrics';
import { LoadingState } from '@/components/common/LoadingState';
import { TrendingUp, Activity, CheckCircle2 } from 'lucide-react';

export function AgentMetricsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');
  
  // For demo purposes, we'll use aggregate metrics since we don't have specific agent IDs
  const { data: aggregateData, isLoading: aggregateLoading } = useAggregateMetrics(selectedPeriod);
  
  // Mock agent ID for time series demo (in production, this would come from actual agent data)
  const mockAgentId = null; // Set to null to show demo state
  const { data: timeSeriesData, isLoading: timeSeriesLoading } = useAgentTimeSeries(mockAgentId, selectedPeriod);

  const isLoading = aggregateLoading || timeSeriesLoading;

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Agent Metrics Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive visualizations of agent performance and compliance
          </p>
        </div>
        <TimePeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      </div>

      {/* Summary Metrics Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <LoadingState />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Tasks */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Tasks</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{aggregateData?.totalTasks ?? 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {aggregateData?.agentCount ?? 0} agents
              </p>
            </CardContent>
          </Card>

          {/* Completion Rate */}
          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Completion Rate</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {aggregateData?.totalTasks 
                  ? ((aggregateData.completedTasks / aggregateData.totalTasks) * 100).toFixed(1)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {aggregateData?.completedTasks ?? 0} of {aggregateData?.totalTasks ?? 0} completed
              </p>
            </CardContent>
          </Card>

          {/* Average Compliance */}
          <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Avg Compliance</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {aggregateData?.averageComplianceScore.toFixed(1) ?? 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Platform-wide average
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <Card>
              <CardContent className="pt-6">
                <LoadingState />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <LoadingState />
              </CardContent>
            </Card>
          </>
        ) : timeSeriesData && timeSeriesData.length > 0 ? (
          <>
            <TaskCompletionChart data={timeSeriesData} period={selectedPeriod} />
            <ComplianceScoreChart data={timeSeriesData} period={selectedPeriod} />
          </>
        ) : (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>No Time Series Data Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Time series charts will appear here once agents begin logging task completions.
                  Use the backend's <code className="text-xs bg-muted px-1 py-0.5 rounded">logTaskCompletion</code> method to record agent activity.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Info Card */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/10 mt-0.5">
              <Activity className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground mb-1">About Agent Metrics</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This dashboard provides real-time insights into agent performance across your organization. 
                Metrics are automatically updated every 60 seconds and can be filtered by day, week, or month. 
                Task completion data and compliance scores help you monitor agent effectiveness and identify areas for improvement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
