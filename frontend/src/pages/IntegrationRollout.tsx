import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, Circle, Layers, Shield, FileText, Package, Link, FileCheck } from 'lucide-react';

interface IntegrationStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  deliverables: string[];
  definitionOfDone: string[];
  status: 'current' | 'future';
}

const integrationSteps: IntegrationStep[] = [
  {
    id: 1,
    title: 'MCP-Style Tool Registry',
    description: 'A unified internal registry where TIME AI and TRAV AI can access tools through a standard interface. This provides cleaner interoperability, easier expansion, predictable enforcement, and stronger audit capabilities.',
    icon: <Layers className="w-6 h-6" />,
    deliverables: [
      'Centralized tool registry data structure in backend',
      'Standard tool interface definition',
      'Tool registration and discovery API',
      'Frontend UI for browsing available tools',
      'Integration with TIME AI and TRAV AI agents',
    ],
    definitionOfDone: [
      'Backend API endpoints for tool registration and retrieval are implemented and tested',
      'Frontend displays all registered tools with metadata (name, description, capabilities)',
      'Tools can be registered via admin interface',
      'Agent systems can query and invoke tools through the registry',
      'Error states handled (no tools available, failed registration)',
      'Manual verification: Register a test tool and invoke it from an agent',
    ],
    status: 'current',
  },
  {
    id: 2,
    title: 'Runtime Security & Behavior Monitor',
    description: 'A lightweight internal module that watches for abnormal agent actions, repeated policy edge cases, and failed audits. This aligns with 2026 security patterns for agent systems.',
    icon: <Shield className="w-6 h-6" />,
    deliverables: [
      'Real-time monitoring service for agent actions',
      'Anomaly detection rules engine',
      'Alert system for security events',
      'Dashboard for viewing security metrics',
      'Integration with existing audit log',
    ],
    definitionOfDone: [
      'Backend monitoring service captures all agent actions in real-time',
      'Anomaly detection rules are configurable and trigger alerts',
      'Frontend dashboard displays security metrics and recent alerts',
      'Failed audits are logged and visible to admins',
      'Alert notifications work (UI toast or dedicated alerts page)',
      'Manual verification: Trigger an anomaly and confirm alert appears',
    ],
    status: 'future',
  },
  {
    id: 3,
    title: 'Enterprise Data-Format Integration Hub',
    description: 'A small internal layer that understands PDF extraction, XLS/CSV, EDI (for supply chain), ISO 20022 messages, and trade documents. This boosts enterprise and government workflows.',
    icon: <FileText className="w-6 h-6" />,
    deliverables: [
      'Document parsing library integration (PDF, XLS, CSV)',
      'EDI message parser for supply chain formats',
      'ISO 20022 financial message handler',
      'Upload and processing UI',
      'Extracted data preview and export',
    ],
    definitionOfDone: [
      'Backend can parse PDF, XLS, CSV files and extract structured data',
      'EDI and ISO 20022 message formats are recognized and parsed',
      'Frontend upload interface accepts multiple file types',
      'Extracted data is displayed in a readable format',
      'Error handling for unsupported formats or corrupted files',
      'Manual verification: Upload sample files of each type and verify extraction',
    ],
    status: 'future',
  },
  {
    id: 4,
    title: 'Internal Workflow Marketplace',
    description: 'A curated library of ready-made modules for payroll, supply chain, world trade, compliance, HR onboarding, and document processing. Users can enable or disable modules with one click.',
    icon: <Package className="w-6 h-6" />,
    deliverables: [
      'Workflow module catalog in backend',
      'Enable/disable toggle functionality',
      'Module configuration interface',
      'Pre-built workflow templates (payroll, HR, compliance, etc.)',
      'User-specific module activation tracking',
    ],
    definitionOfDone: [
      'Backend stores available workflow modules with metadata',
      'Users can enable/disable modules via frontend toggle',
      'Enabled modules appear in user\'s workflow list',
      'Each module includes configuration options (if applicable)',
      'Module state persists across sessions',
      'Manual verification: Enable a module, refresh page, confirm it remains enabled',
    ],
    status: 'future',
  },
  {
    id: 5,
    title: 'Partner Integration Shells',
    description: 'Structured placeholders for FedEx, UPS, DHL, Cisco, NASA, Boeing, Quant, XRP, and HBAR. These are prepared so when a partner wants to integrate, the architecture is already in place.',
    icon: <Link className="w-6 h-6" />,
    deliverables: [
      'Partner integration schema definitions',
      'API endpoint stubs for each partner',
      'Configuration UI for partner credentials',
      'Status dashboard showing integration readiness',
      'Documentation for partner onboarding',
    ],
    definitionOfDone: [
      'Backend defines integration schemas for all listed partners',
      'Frontend displays partner integration status (ready, pending, active)',
      'Admin can configure partner API credentials',
      'Integration shells include placeholder endpoints that return mock data',
      'Documentation page explains how to activate each integration',
      'Manual verification: View partner list and confirm all partners are listed with status',
    ],
    status: 'future',
  },
  {
    id: 6,
    title: 'Unified Evidence & Compliance Feed',
    description: 'TIME AI already audits everything — but a dedicated feed that compiles all actions, timestamps, agent identities, and policy decisions. This becomes one of your strongest enterprise features.',
    icon: <FileCheck className="w-6 h-6" />,
    deliverables: [
      'Unified compliance feed aggregator',
      'Real-time event streaming to feed',
      'Advanced filtering (by agent, action type, date range)',
      'Export functionality (CSV, JSON, PDF)',
      'Compliance report generator',
    ],
    definitionOfDone: [
      'Backend aggregates all audit events into a unified feed',
      'Frontend displays feed with real-time updates',
      'Filters work correctly (agent, action type, date range)',
      'Export generates valid files in requested format',
      'Compliance reports include all required metadata',
      'Manual verification: Perform an action, confirm it appears in feed within seconds',
    ],
    status: 'future',
  },
];

export function IntegrationRollout() {
  const currentStep = integrationSteps.find((step) => step.status === 'current');
  const futureSteps = integrationSteps.filter((step) => step.status === 'future');

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionHeader
        title="Integration Rollout Plan"
        subtitle="Strategic step-by-step implementation of high-value integrations for TIME AI + TRAV AI ecosystem"
        icon={<Layers className="w-10 h-10 text-primary" />}
      />

      {/* Process Overview */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Implementation Process
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground">
            This rollout follows a <strong>one-build-per-step</strong> approach to ensure quality and stability.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Only <strong>one integration step</strong> will be implemented per build</li>
            <li>Each step must meet its <strong>Definition of Done</strong> before proceeding</li>
            <li>The process <strong>pauses for user approval</strong> between steps</li>
            <li>No step begins until the previous step is confirmed 100% complete</li>
          </ul>
        </CardContent>
      </Card>

      {/* Current Step */}
      {currentStep && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="default" className="text-sm px-3 py-1">
              Current Step
            </Badge>
            <h2 className="text-2xl font-bold text-foreground">
              Step {currentStep.id} of {integrationSteps.length}
            </h2>
          </div>

          <Card className="border-primary shadow-lg">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  {currentStep.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{currentStep.title}</CardTitle>
                  <CardDescription className="text-base">{currentStep.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Deliverables */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Deliverables
                </h3>
                <ul className="space-y-2">
                  {currentStep.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <Circle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Definition of Done */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Definition of Done
                </h3>
                <ul className="space-y-2">
                  {currentStep.definitionOfDone.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Future Steps */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline" className="text-sm px-3 py-1">
            Future Steps
          </Badge>
          <h2 className="text-2xl font-bold text-foreground">Upcoming Integrations</h2>
        </div>

        <div className="space-y-4">
          {futureSteps.map((step) => (
            <Card key={step.id} className="border-muted">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted text-muted-foreground">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        Step {step.id}
                      </Badge>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Deliverables */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Deliverables</h4>
                  <ul className="space-y-1">
                    {step.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Circle className="w-3 h-3 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Definition of Done */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Definition of Done</h4>
                  <ul className="space-y-1">
                    {step.definitionOfDone.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <Card className="mt-8 border-amber-500/20 bg-amber-500/5">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Note:</strong> Each step will be implemented individually with full testing and user approval before moving to the next.
            This ensures quality, stability, and alignment with your strategic goals.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
