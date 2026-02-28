import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AgentStatusBadge } from '@/components/common/AgentStatusBadge';
import { AgentMetricsDashboard } from '@/components/agents/AgentMetricsDashboard';
import { InlineAuthGate } from '@/components/auth/InlineAuthGate';
import { useActor } from '@/hooks/useActor';
import { useQuery } from '@tanstack/react-query';
import { AgentConfig, AgentStatus, VerificationStatus } from '@/backend';
import { LoadingState } from '@/components/common/LoadingState';
import { EmptyState } from '@/components/common/EmptyState';
import { Shield, Calendar, Award, Zap, Users, ListChecks, CheckCircle2, ShieldCheck } from 'lucide-react';
import { agentRegistryEntries } from '@/content/agentRegistryEntries';

export function AgentPassports() {
  const [agentName, setAgentName] = useState('');
  const { actor, isFetching: actorFetching } = useActor();

  const {
    data: agentConfigs,
    isLoading,
    error,
  } = useQuery<AgentConfig[]>({
    queryKey: ['myAgentConfigs'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyAgentConfigs();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  // Determine loading state
  const isLoadingData = actorFetching || isLoading;

  // Get the first agent config for display (or use mock data if none exists)
  const currentAgent = agentConfigs && agentConfigs.length > 0 ? agentConfigs[0] : null;
  const agentStatus = currentAgent?.status ?? AgentStatus.pending;

  // Calculate metrics from actual backend data
  const totalAgents = agentConfigs?.length ?? 0;
  const activeTasks = 0; // Hardcoded placeholder - would come from task completion logs
  const complianceScore = 100; // Hardcoded placeholder - would be calculated from metrics

  // Format issue date from nanoseconds timestamp
  const formatIssueDate = (issueDate: bigint | undefined): string => {
    if (!issueDate || issueDate === 0n) {
      return 'Not Set';
    }
    
    try {
      // Convert nanoseconds to milliseconds
      const milliseconds = Number(issueDate / 1_000_000n);
      const date = new Date(milliseconds);
      
      // Format as "Month Day, Year" (e.g., "January 15, 2024")
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Format issue date from ISO string (YYYY-MM-DD)
  const formatIssueDateFromString = (issueDateString: string): string => {
    try {
      const date = new Date(issueDateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return issueDateString;
    }
  };

  // Get verification status badge component
  const getVerificationBadge = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.verified:
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            Verified
          </Badge>
        );
      case VerificationStatus.pending:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Shield className="h-3.5 w-3.5 mr-1.5" />
            Pending Verification
          </Badge>
        );
      case VerificationStatus.suspended:
        return (
          <Badge variant="destructive">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
            Suspended
          </Badge>
        );
      case VerificationStatus.unverified:
        return (
          <Badge variant="secondary">
            <Shield className="h-3.5 w-3.5 mr-1.5" />
            Unverified
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Shield className="h-3.5 w-3.5 mr-1.5" />
            Unknown
          </Badge>
        );
    }
  };

  const issueDate = currentAgent?.issueDate;
  const formattedIssueDate = formatIssueDate(issueDate);
  const agentDisplayName = currentAgent?.name ?? 'No Agent Registered';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Agent Passports
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Identity, credentials, and verification data for all TIME AI agents.
        </p>

        {/* Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Total Agents Metric */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Agents</span>
              </div>
              {isLoadingData ? (
                <div className="h-10 flex items-center">
                  <LoadingState />
                </div>
              ) : (
                <div className="text-3xl font-bold text-foreground">{totalAgents}</div>
              )}
            </CardContent>
          </Card>

          {/* Active Tasks Metric */}
          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <ListChecks className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Active Tasks</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{activeTasks}</div>
            </CardContent>
          </Card>

          {/* Compliance Score Metric */}
          <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Compliance Score</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{complianceScore}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Metrics Dashboard - Auth Gated */}
        <div className="mb-8">
          <InlineAuthGate
            fallback={
              <Card className="border-2 border-muted">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Authentication Required
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please log in to view detailed agent metrics and performance analytics.
                    </p>
                  </div>
                </CardContent>
              </Card>
            }
          >
            <AgentMetricsDashboard />
          </InlineAuthGate>
        </div>

        {/* Passport Serial Number Field */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Passport Serial Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Serial Number:</span>
              <span className="text-base font-mono text-foreground">AP-2026-001-ALPHA</span>
            </div>
          </CardContent>
        </Card>

        {/* Agent Name Field - Now displays actual backend data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Agent Name</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingData ? (
              <LoadingState />
            ) : error ? (
              <EmptyState
                icon={<Shield className="h-12 w-12 text-muted-foreground" />}
                title="Unable to load agent name"
                description="There was an error loading the agent name. Please try again later."
              />
            ) : (
              <div className="space-y-2">
                <Label htmlFor="agent-name" className="text-sm font-medium text-muted-foreground">
                  Name
                </Label>
                <Input
                  id="agent-name"
                  type="text"
                  placeholder="Enter agent name"
                  value={agentName || agentDisplayName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="max-w-md"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Agent Status Indicator */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Agent Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingData ? (
              <LoadingState />
            ) : error ? (
              <EmptyState
                icon={<Shield className="h-12 w-12 text-muted-foreground" />}
                title="Unable to load status"
                description="There was an error loading the agent status. Please try again later."
              />
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Current Status:</span>
                <AgentStatusBadge status={agentStatus} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Issue Date Field - Now displays actual backend data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Issue Date</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingData ? (
              <LoadingState />
            ) : error ? (
              <EmptyState
                icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
                title="Unable to load issue date"
                description="There was an error loading the issue date. Please try again later."
              />
            ) : (
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Issued:</span>
                <span className="text-base text-foreground">{formattedIssueDate}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Agent Registry Catalog */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Agent Registry Catalog
          </h2>
          <div className="space-y-6">
            {agentRegistryEntries.map((agent) => (
              <Card key={agent.id} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{agent.title}</CardTitle>
                        {getVerificationBadge(agent.verificationStatus)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="outline">
                          {agent.category}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Issued: {formatIssueDateFromString(agent.issueDate)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{agent.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Capabilities Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <h3 className="text-base font-semibold text-foreground">Capabilities</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.map((capability, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Credentials Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-5 w-5 text-primary" />
                      <h3 className="text-base font-semibold text-foreground">Credentials</h3>
                    </div>
                    <ul className="space-y-2">
                      {agent.credentials.map((credential, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{credential}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Policy Scope */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Policy Scope:</span>
                      <Badge variant="outline">{agent.policyScope}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
