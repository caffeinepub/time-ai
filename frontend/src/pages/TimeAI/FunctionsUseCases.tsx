import { Clock, Briefcase, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

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
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
              <Clock className="w-8 h-8 text-primary" />
              TIME AI Functions & Use Cases
            </h1>
            <p className="text-lg text-muted-foreground">
              Enterprise-grade AI for workflow orchestration and governance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Enterprise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built for enterprise workflows and compliance requirements
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-accent" />
                  Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Policy-driven AI with transparent audit trails
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-primary" />
                  Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Streamline complex workflows with intelligent automation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-accent" />
                  Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Optimize time management and resource allocation
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Core Functions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="workflow">
                  <AccordionTrigger>Workflow Orchestration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        TIME AI coordinates complex multi-step workflows across teams and systems, ensuring tasks are executed in the correct sequence with proper approvals.
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Automated task routing and assignment</li>
                        <li>Dependency management and sequencing</li>
                        <li>Real-time progress tracking and notifications</li>
                        <li>Exception handling and escalation</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="compliance">
                  <AccordionTrigger>Compliance & Audit</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        Maintain comprehensive audit trails and ensure all AI actions comply with organizational policies and regulatory requirements.
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Immutable blockchain-based audit logs</li>
                        <li>Policy enforcement at every decision point</li>
                        <li>Automated compliance reporting</li>
                        <li>Role-based access control</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="integration">
                  <AccordionTrigger>Enterprise Integration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        Seamlessly integrate with existing enterprise systems, databases, and third-party services to create unified workflows.
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>API-first architecture for easy integration</li>
                        <li>Support for major enterprise platforms</li>
                        <li>Secure data synchronization</li>
                        <li>Custom connector development</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="analytics">
                  <AccordionTrigger>Analytics & Insights</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        Gain deep insights into workflow performance, bottlenecks, and optimization opportunities through advanced analytics.
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Real-time performance dashboards</li>
                        <li>Predictive analytics for resource planning</li>
                        <li>Bottleneck identification and resolution</li>
                        <li>ROI tracking and reporting</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Supply Chain Management
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Orchestrate complex supply chain workflows from procurement to delivery, with real-time visibility and automated exception handling.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    Financial Services
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Automate loan processing, compliance checks, and risk assessments while maintaining complete audit trails for regulatory compliance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Healthcare Operations
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Streamline patient care workflows, appointment scheduling, and resource allocation while ensuring HIPAA compliance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    Manufacturing
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Optimize production scheduling, quality control, and maintenance workflows with predictive analytics and automated decision-making.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                TIME AI is designed to integrate seamlessly with your existing enterprise infrastructure. Our team works with you to understand your workflows and configure the system to meet your specific needs.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact our enterprise team to schedule a consultation and see how TIME AI can transform your operations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
