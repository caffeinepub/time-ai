import { Zap, Clock, Shield, Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export function TimeAIFunctionsUseCases() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              TIME AI Functions & Use Cases
            </h1>
            <p className="text-lg text-muted-foreground">
              General intelligence for enterprise workflows and governed decision-making
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Core Functions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Workflow Orchestration</h4>
                  <p className="text-sm text-muted-foreground">
                    Coordinate complex multi-step processes with intelligent routing and validation
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Decision Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide data-driven insights and recommendations for critical business decisions
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Process Automation</h4>
                  <p className="text-sm text-muted-foreground">
                    Automate repetitive tasks while maintaining governance and audit trails
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Time Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Temporal Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze time-series data and identify patterns across historical records
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Scheduling Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Optimize resource allocation and timing for maximum efficiency
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Deadline Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Track and prioritize time-sensitive tasks with intelligent alerts
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Governance & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Policy Enforcement</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure all actions comply with organizational policies and regulations
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Audit Logging</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain immutable records of all decisions and actions on-chain
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Access Control</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage permissions and validate authorization for sensitive operations
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-accent" />
                  Integration Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Multi-Agent Coordination</h4>
                  <p className="text-sm text-muted-foreground">
                    Seamlessly hand off tasks to TRAV AI while maintaining context
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">System Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with enterprise systems and external data sources
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">API Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Expose controlled interfaces for third-party integrations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle>Real-World Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Enterprise Operations</h4>
                <p className="text-sm text-muted-foreground">
                  Coordinate supply chain logistics, manage vendor relationships, and optimize resource allocation across departments with intelligent workflow automation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Financial Services</h4>
                <p className="text-sm text-muted-foreground">
                  Process transactions, validate compliance requirements, and provide real-time risk assessment for trading and investment decisions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Government & Public Sector</h4>
                <p className="text-sm text-muted-foreground">
                  Manage citizen services, coordinate inter-agency workflows, and maintain transparent audit trails for public accountability.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
