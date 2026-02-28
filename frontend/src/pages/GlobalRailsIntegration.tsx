import { 
  Globe, 
  Network, 
  Zap, 
  ArrowLeftRight, 
  Coins, 
  Shield, 
  FileText, 
  Lock, 
  BarChart, 
  Workflow,
  CheckCircle2,
  ArrowDown,
  Building,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

export default function GlobalRailsIntegration() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Globe className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Global Rails Integration
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              TIME AI serves as the governance and compliance orchestration layer above global payment rails, 
              providing authentication, policy enforcement, and auditability for AI-native transactions across 
              x402, AP2, A2A, stablecoins, SWIFT, and FedNow.
            </p>
          </div>

          {/* Strategic Positioning */}
          <Card className="mb-8 border-accent/30 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Strategic Positioning: Orchestration Above Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-foreground">
                TIME AI does not replace payment rails—it sits <strong>above them</strong> as the universal 
                governance, compliance, and audit layer. While x402, AP2, A2A, stablecoins, SWIFT, and FedNow 
                handle the actual movement of value, TIME AI ensures every transaction is:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong>Authenticated</strong> — Every agent and user has verified identity and permission sets</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong>Policy-Compliant</strong> — Transactions validated against enterprise rules before execution</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong>Auditable</strong> — Immutable logs capture reasoning, approvals, and liability chains</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong>Compliant</strong> — Real-time AML, KYC, sanctions, and tax checks across all rails</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Supported Payment Rails */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Network className="w-6 h-6 text-accent" />
              Supported Payment Rails
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              TIME AI provides unified governance across modern and traditional payment infrastructure, 
              ensuring consistent compliance regardless of the underlying rail.
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="x402" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Zap className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-semibold">x402 — Modern Payment Protocol</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    x402 enables instant payment settlements with real-time finality, ideal for high-frequency, 
                    low-value transactions in AI-native workflows.
                  </p>
                  <div className="bg-card border border-border/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-foreground">TIME AI Integration:</p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Pre-transaction policy validation and spending limit enforcement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Real-time audit logging with transaction reasoning capture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Automated compliance checks for AML and fraud detection</span>
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ap2" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Workflow className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-semibold">AP2 — Automated Payment Protocol 2</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    AP2 provides next-generation automated clearing for enterprise payments with enhanced 
                    security and programmable payment logic.
                  </p>
                  <div className="bg-card border border-border/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-foreground">TIME AI Integration:</p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Multi-signature approval workflows for high-value transactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Policy-based routing with conditional execution rules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Comprehensive audit trails for regulatory reporting</span>
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="a2a" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <ArrowLeftRight className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-semibold">A2A — Account-to-Account Transfers</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Direct bank account transfers that bypass card networks, reducing costs and settlement times 
                    for enterprise payments.
                  </p>
                  <div className="bg-card border border-border/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-foreground">TIME AI Integration:</p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Identity verification and account ownership validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Fraud detection with behavioral analysis and anomaly detection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Reconciliation automation with exception handling</span>
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="stablecoins" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Coins className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-semibold">Stablecoins — USDC, USDT, USD1</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Digital dollar equivalents providing instant, low-cost cross-border payments with blockchain 
                    transparency and programmability.
                  </p>
                  <div className="bg-card border border-border/50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Supported Stablecoins:</p>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Coins className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                          <span><strong>USDC</strong> — Circle's USD Coin with monthly attestation reports</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Coins className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                          <span><strong>USDT</strong> — Tether with multi-blockchain deployment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Coins className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                          <span><strong>USD1</strong> — Paxos Dollar with full regulatory compliance</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">TIME AI Integration:</p>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                          <span>Multi-chain support with unified governance across networks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                          <span>KYC/AML compliance validation before transaction execution</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                          <span>Tax reporting automation for cross-border stablecoin payments</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="swift" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Globe className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-semibold">SWIFT — International Wire Transfers</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Traditional international wire transfer network connecting 11,000+ financial institutions 
                    across 200+ countries for secure cross-border payments.
                  </p>
                  <div className="bg-card border border-border/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-foreground">TIME AI Integration:</p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>SWIFT message formatting and validation automation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Sanctions screening against OFAC, UN, and EU lists</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Enhanced tracking with SWIFT gpi integration for real-time status</span>
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fednow" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Zap className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-semibold">FedNow — Real-Time Payment Service</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Federal Reserve's instant payment infrastructure enabling 24/7/365 real-time payments 
                    between U.S. financial institutions.
                  </p>
                  <div className="bg-card border border-border/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-foreground">TIME AI Integration:</p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Real-time payment initiation with instant settlement confirmation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Fraud prevention with velocity checks and pattern analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>Request for Payment (RFP) workflow automation</span>
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Integration Architecture */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Network className="w-6 h-6 text-accent" />
              Integration Architecture
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              TIME AI operates as a middleware orchestration layer, intercepting and validating all payment 
              instructions before they reach underlying rails.
            </p>

            <div className="space-y-4">
              {/* Top Layer */}
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">Enterprise Applications & Workflows</CardTitle>
                  <CardDescription>
                    ERP systems, accounting software, procurement platforms, and AI agents
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-accent" />
              </div>

              {/* Middle Layer - TIME AI */}
              <Card className="border-accent/50 bg-accent/10">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    TIME AI Orchestration Layer
                  </CardTitle>
                  <CardDescription>
                    Governance, compliance, and audit orchestration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card border border-border/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-accent" />
                        <p className="text-sm font-medium">Authentication & Identity</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Agent verification, role-based permissions, spending limits
                      </p>
                    </div>
                    <div className="bg-card border border-border/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-accent" />
                        <p className="text-sm font-medium">Policy Compliance Engine</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Rule validation, approval workflows, exception handling
                      </p>
                    </div>
                    <div className="bg-card border border-border/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-accent" />
                        <p className="text-sm font-medium">Audit & Monitoring</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Immutable logs, compliance reporting, liability tracking
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-accent" />
              </div>

              {/* Bottom Layer */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Payment Rails Infrastructure</CardTitle>
                  <CardDescription>
                    Underlying payment networks handling value transfer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="bg-card border border-border/50 rounded-lg p-2 text-center">
                      <Zap className="w-5 h-5 text-accent mx-auto mb-1" />
                      <p className="text-xs font-medium">x402</p>
                    </div>
                    <div className="bg-card border border-border/50 rounded-lg p-2 text-center">
                      <Workflow className="w-5 h-5 text-accent mx-auto mb-1" />
                      <p className="text-xs font-medium">AP2</p>
                    </div>
                    <div className="bg-card border border-border/50 rounded-lg p-2 text-center">
                      <ArrowLeftRight className="w-5 h-5 text-accent mx-auto mb-1" />
                      <p className="text-xs font-medium">A2A</p>
                    </div>
                    <div className="bg-card border border-border/50 rounded-lg p-2 text-center">
                      <Coins className="w-5 h-5 text-accent mx-auto mb-1" />
                      <p className="text-xs font-medium">Stablecoins</p>
                    </div>
                    <div className="bg-card border border-border/50 rounded-lg p-2 text-center">
                      <Globe className="w-5 h-5 text-accent mx-auto mb-1" />
                      <p className="text-xs font-medium">SWIFT</p>
                    </div>
                    <div className="bg-card border border-border/50 rounded-lg p-2 text-center">
                      <Zap className="w-5 h-5 text-accent mx-auto mb-1" />
                      <p className="text-xs font-medium">FedNow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 bg-card border border-border/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">How it works:</strong> TIME AI intercepts all payment 
                instructions from enterprise applications, validates them against policy rules, performs 
                compliance checks, logs the decision rationale, and then routes the approved transaction 
                to the appropriate payment rail. This ensures consistent governance regardless of which 
                rail is used for settlement.
              </p>
            </div>
          </div>

          {/* Key Integration Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-accent" />
              Key Integration Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="w-5 h-5 text-accent" />
                    Real-Time Compliance Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Continuous validation of transactions against regulatory requirements and internal 
                    policies before rail execution.
                  </p>
                  <p className="text-xs">
                    Automatically screens for AML violations, sanctions matches, and policy breaches in 
                    real-time, blocking non-compliant transactions before they reach payment rails.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Network className="w-5 h-5 text-accent" />
                    Cross-Rail Interoperability
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Unified interface for managing payments across multiple rails with consistent governance 
                    regardless of underlying infrastructure.
                  </p>
                  <p className="text-xs">
                    Single API abstracts rail-specific complexities, enabling seamless switching between 
                    x402, stablecoins, SWIFT, and FedNow based on cost, speed, and compliance requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="w-5 h-5 text-accent" />
                    Automated Audit Trails
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Immutable record of all payment decisions, policy checks, and approvals for regulatory 
                    reporting.
                  </p>
                  <p className="text-xs">
                    Blockchain-backed audit logs capture transaction reasoning, approval chains, and 
                    compliance validation results with tamper-proof timestamps.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lock className="w-5 h-5 text-accent" />
                    Policy Enforcement Mechanisms
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Configurable rule engine that enforces spending limits, approval workflows, and 
                    compliance checks.
                  </p>
                  <p className="text-xs">
                    Define policies like "No international payments above $50K without CFO approval" or 
                    "Block all stablecoin transactions to sanctioned countries."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BarChart className="w-5 h-5 text-accent" />
                    Regulatory Reporting
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Automated generation of compliance reports for AML, KYC, sanctions screening, and 
                    transaction monitoring.
                  </p>
                  <p className="text-xs">
                    Pre-built report templates for FinCEN, OFAC, and international regulatory bodies with 
                    one-click export functionality.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Workflow className="w-5 h-5 text-accent" />
                    Multi-Rail Orchestration
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Intelligent routing and failover across payment rails based on cost, speed, and 
                    compliance requirements.
                  </p>
                  <p className="text-xs">
                    Automatically selects optimal rail for each transaction and fails over to alternative 
                    rails during outages or capacity constraints.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enterprise Use Cases */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Building className="w-6 h-6 text-accent" />
              Enterprise Use Cases
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building className="w-5 h-5 text-accent" />
                    Cross-Border Payment Orchestration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Scenario:</p>
                    <p className="text-muted-foreground">
                      A multinational corporation needs to pay suppliers across 50 countries with varying 
                      payment preferences and regulatory requirements.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Solution:</p>
                    <p className="text-muted-foreground">
                      TIME AI routes payments through the optimal rail (FedNow for US, SWIFT for international, 
                      stablecoins for emerging markets) while maintaining consistent compliance checks and 
                      audit trails across all rails.
                    </p>
                  </div>
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                    <p className="font-medium text-foreground mb-1">Benefit:</p>
                    <p className="text-muted-foreground">
                      40% reduction in payment processing time and unified governance across all payment channels.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileCheck className="w-5 h-5 text-accent" />
                    Regulatory Compliance Reporting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Scenario:</p>
                    <p className="text-muted-foreground">
                      Financial institution must generate monthly AML reports covering transactions across 
                      SWIFT, ACH, and stablecoin networks.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Solution:</p>
                    <p className="text-muted-foreground">
                      TIME AI aggregates transaction data from all rails, applies consistent risk scoring, 
                      and generates consolidated compliance reports with drill-down capabilities.
                    </p>
                  </div>
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                    <p className="font-medium text-foreground mb-1">Benefit:</p>
                    <p className="text-muted-foreground">
                      Automated compliance reporting saves 200+ hours monthly and reduces regulatory risk.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="w-5 h-5 text-accent" />
                    Multi-Rail Failover & Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Scenario:</p>
                    <p className="text-muted-foreground">
                      Payment processor needs reliability and cost optimization across multiple payment rails 
                      with varying availability and pricing.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Solution:</p>
                    <p className="text-muted-foreground">
                      TIME AI monitors rail availability and costs in real-time, automatically failing over 
                      to alternative rails during outages and selecting lowest-cost options when available.
                    </p>
                  </div>
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                    <p className="font-medium text-foreground mb-1">Benefit:</p>
                    <p className="text-muted-foreground">
                      99.99% payment reliability and 25% reduction in transaction costs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    Policy-Based Payment Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Scenario:</p>
                    <p className="text-muted-foreground">
                      Enterprise needs to enforce different approval workflows for domestic vs. international 
                      payments with varying risk profiles.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Solution:</p>
                    <p className="text-muted-foreground">
                      TIME AI applies policy rules based on payment amount, destination, and rail type, 
                      routing high-value international payments through multi-signature approval while 
                      auto-approving routine domestic transactions.
                    </p>
                  </div>
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                    <p className="font-medium text-foreground mb-1">Benefit:</p>
                    <p className="text-muted-foreground">
                      Enhanced security without slowing down business operations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Getting Started */}
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle>Getting Started with Global Rails Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                TIME AI's global rails integration is designed for enterprise deployment with comprehensive 
                onboarding support, technical documentation, and dedicated integration assistance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border border-border/50 rounded-lg p-4">
                  <p className="font-medium text-foreground mb-2">1. Assessment</p>
                  <p className="text-xs text-muted-foreground">
                    Evaluate your current payment infrastructure and identify integration requirements
                  </p>
                </div>
                <div className="bg-card border border-border/50 rounded-lg p-4">
                  <p className="font-medium text-foreground mb-2">2. Configuration</p>
                  <p className="text-xs text-muted-foreground">
                    Configure policy rules, approval workflows, and rail-specific settings
                  </p>
                </div>
                <div className="bg-card border border-border/50 rounded-lg p-4">
                  <p className="font-medium text-foreground mb-2">3. Deployment</p>
                  <p className="text-xs text-muted-foreground">
                    Phased rollout with testing, validation, and production migration support
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Contact our enterprise integration team to schedule a consultation and technical architecture review.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
