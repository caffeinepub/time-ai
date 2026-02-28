import { Database, Shield, Zap, CheckCircle, Search, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { agentRegistryEntries } from '@/content/agentRegistryEntries';
import { VerificationStatus } from '@/backend';

export function AgentRegistry() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState<VerificationStatus | 'all'>('all');

  // Get unique categories
  const categories = Array.from(new Set(agentRegistryEntries.map((agent) => agent.category)));

  // Filter agents based on search, category, and verification status
  const filteredAgents = agentRegistryEntries.filter((agent) => {
    const matchesSearch =
      searchQuery === '' ||
      agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.capabilities.some((cap) => cap.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === null || agent.category === selectedCategory;

    const matchesVerificationStatus = 
      selectedVerificationStatus === 'all' || 
      agent.verificationStatus === selectedVerificationStatus;

    return matchesSearch && matchesCategory && matchesVerificationStatus;
  });

  // Format issue date from ISO string (YYYY-MM-DD)
  const formatIssueDate = (issueDateString: string): string => {
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
            Pending
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Agent Registry</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Comprehensive catalog of AI agents with capabilities, policy scopes, and governance controls.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search agents by name, description, or capabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Status Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Filter by Verification Status</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedVerificationStatus('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedVerificationStatus === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedVerificationStatus(VerificationStatus.verified)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedVerificationStatus === VerificationStatus.verified
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Verified
              </button>
              <button
                onClick={() => setSelectedVerificationStatus(VerificationStatus.pending)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedVerificationStatus === VerificationStatus.pending
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setSelectedVerificationStatus(VerificationStatus.suspended)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedVerificationStatus === VerificationStatus.suspended
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Suspended
              </button>
              <button
                onClick={() => setSelectedVerificationStatus(VerificationStatus.unverified)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedVerificationStatus === VerificationStatus.unverified
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Unverified
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredAgents.length} of {agentRegistryEntries.length} agents
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-xl">{agent.title}</CardTitle>
                  {getVerificationBadge(agent.verificationStatus)}
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="outline">{agent.category}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Issued: {formatIssueDate(agent.issueDate)}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{agent.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Capabilities */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Capabilities</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.slice(0, 3).map((capability, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{agent.capabilities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Policy Scope */}
                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Policy Scope:</span>
                    <Badge variant="outline" className="text-xs">
                      {agent.policyScope}
                    </Badge>
                  </div>
                </div>

                {/* Governance Controls */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Governance Controls Active</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No agents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
