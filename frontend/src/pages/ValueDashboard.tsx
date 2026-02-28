import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, CheckCircle2, Activity, Clock } from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { useActor } from '@/hooks/useActor';
import { useQuery } from '@tanstack/react-query';
import { AgentConfig } from '@/backend';

export function ValueDashboard() {
  const { actor, isFetching: actorFetching } = useActor();

  // Fetch all agent configs to calculate aggregate metrics
  const {
    data: agentConfigs,
    isLoading,
  } = useQuery<AgentConfig[]>({
    queryKey: ['allAgentConfigs'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllAgentConfigs();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const isLoadingData = actorFetching || isLoading;

  // Calculate metrics from agent configs
  const totalActiveAgents = agentConfigs?.filter(config => config.status === 'active').length ?? 0;
  const completedTasks = 1247; // Sample data - would come from backend task completion logs
  const avgComplianceScore = 98.5; // Sample data - would be calculated from agent metrics
  const systemUptime = 99.9; // Sample data - would come from system monitoring

  // Sample trend data (positive/negative percentage changes)
  const agentsTrend = 12.5;
  const tasksTrend = 8.3;
  const complianceTrend = 2.1;
  const uptimeTrend = 0.2;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Value Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Key performance metrics and KPIs for TIME AI agent activity and system health.
          </p>
        </div>

        {/* Metrics Grid */}
        {isLoadingData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <LoadingState />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Active Agents */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Active Agents
                  </CardTitle>
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">
                    {totalActiveAgents.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {agentsTrend >= 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-success font-medium">+{agentsTrend}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-destructive" />
                        <span className="text-destructive font-medium">{agentsTrend}%</span>
                      </>
                    )}
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completed Tasks */}
            <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Completed Tasks
                  </CardTitle>
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">
                    {completedTasks.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {tasksTrend >= 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-success font-medium">+{tasksTrend}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-destructive" />
                        <span className="text-destructive font-medium">{tasksTrend}%</span>
                      </>
                    )}
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Average Compliance Score */}
            <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-transparent">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg Compliance Score
                  </CardTitle>
                  <Activity className="h-5 w-5 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">
                    {avgComplianceScore.toFixed(1)}%
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {complianceTrend >= 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-success font-medium">+{complianceTrend}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-destructive" />
                        <span className="text-destructive font-medium">{complianceTrend}%</span>
                      </>
                    )}
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Uptime */}
            <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    System Uptime
                  </CardTitle>
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">
                    {systemUptime.toFixed(1)}%
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {uptimeTrend >= 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-success font-medium">+{uptimeTrend}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-destructive" />
                        <span className="text-destructive font-medium">{uptimeTrend}%</span>
                      </>
                    )}
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Additional Information Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>About Value Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The Value Dashboard provides real-time insights into TIME AI platform performance and agent activity. 
                Monitor key metrics to ensure optimal system health and compliance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Key Metrics</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Total Active Agents:</strong> Number of agents currently operational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Completed Tasks:</strong> Total tasks successfully executed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Avg Compliance Score:</strong> Average compliance rating across all agents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>System Uptime:</strong> Platform availability percentage</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Trend Indicators</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-success mt-1" />
                      <span>Green arrows indicate positive growth trends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingDown className="h-4 w-4 text-destructive mt-1" />
                      <span>Red arrows indicate declining trends requiring attention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground mt-1" />
                      <span>Percentages show month-over-month change</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
