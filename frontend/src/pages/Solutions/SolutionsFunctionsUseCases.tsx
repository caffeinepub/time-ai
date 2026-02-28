import { Clock, Briefcase, Shield, Zap, Compass, User, Sparkles, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Separator } from '../../components/ui/separator';

export default function SolutionsFunctionsUseCases() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* TIME AI Section */}
          <section>
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary" />
                TIME AI — Functions & Use Cases
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
                      Ensure regulatory compliance in financial operations with automated policy enforcement and comprehensive audit trails.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      Healthcare Operations
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Streamline patient care workflows while maintaining HIPAA compliance and protecting sensitive health information.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      Manufacturing
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Optimize production workflows, manage quality control processes, and coordinate across multiple facilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle>Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  TIME AI is built with enterprise-grade security from the ground up. All workflows are executed within secure enclaves with end-to-end encryption.
                </p>
                <p className="text-sm text-muted-foreground">
                  Role-based access control, multi-factor authentication, and blockchain-based audit logs ensure that your organization maintains complete control and visibility over all AI operations.
                </p>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-12" />

          {/* TRAV AI Section */}
          <section>
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
                <Compass className="w-8 h-8 text-accent" />
                TRAV AI — Functions & Use Cases
              </h1>
              <p className="text-lg text-muted-foreground">
                Personal AI companion for everyday tasks and experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="w-5 h-5 text-accent" />
                    Personal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Tailored to your unique preferences and needs
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Adaptive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learns and evolves with your interactions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="w-5 h-5 text-accent" />
                    Intuitive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Natural conversations and seamless experiences
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Compass className="w-5 h-5 text-primary" />
                    Exploratory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Discover new possibilities and opportunities
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
                  <AccordionItem value="assistant">
                    <AccordionTrigger>Personal Assistant</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                          TRAV AI acts as your intelligent personal assistant, helping you manage daily tasks, schedule appointments, and stay organized.
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Smart calendar management and reminders</li>
                          <li>Email and message prioritization</li>
                          <li>Task automation and workflow optimization</li>
                          <li>Proactive suggestions based on your habits</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="learning">
                    <AccordionTrigger>Personalized Learning</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                          TRAV AI adapts to your learning style and helps you acquire new skills and knowledge at your own pace.
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Customized learning paths and recommendations</li>
                          <li>Interactive tutorials and explanations</li>
                          <li>Progress tracking and milestone celebrations</li>
                          <li>Spaced repetition for better retention</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="wellness">
                    <AccordionTrigger>Wellness & Lifestyle</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                          Support your health and wellness goals with personalized recommendations and gentle accountability.
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Fitness tracking and workout suggestions</li>
                          <li>Nutrition guidance and meal planning</li>
                          <li>Mindfulness and stress management</li>
                          <li>Sleep optimization recommendations</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="creativity">
                    <AccordionTrigger>Creative Collaboration</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                          Unlock your creative potential with AI-powered brainstorming, content creation, and artistic exploration.
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Idea generation and brainstorming</li>
                          <li>Writing assistance and editing</li>
                          <li>Creative project planning</li>
                          <li>Inspiration and reference curation</li>
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
                      <User className="w-4 h-4 text-accent" />
                      Daily Life Management
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Streamline your daily routines with intelligent scheduling, reminders, and task prioritization that adapts to your lifestyle.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Personal Growth
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Achieve your goals with personalized learning paths, habit tracking, and motivational support tailored to your aspirations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-accent" />
                      Health & Wellness
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Maintain a balanced lifestyle with fitness tracking, nutrition guidance, and mindfulness practices customized to your needs.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-primary" />
                      Travel & Exploration
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Plan and enhance your travel experiences with personalized recommendations, itinerary management, and local insights.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
              <CardHeader>
                <CardTitle>Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  TRAV AI is designed with your privacy as a top priority. All personal data is encrypted and stored securely on the blockchain, giving you complete control over your information.
                </p>
                <p className="text-sm text-muted-foreground">
                  You decide what data to share, and you can delete your information at any time. TRAV AI learns from your interactions without compromising your privacy.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
