import { Globe, ArrowRight, CheckCircle2, Network, Shield, Zap, FileCheck, Scale, GitBranch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

export function TimeAIGlobalRailsMapping() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Globe className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                TIME AI Global Rails Integration
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              How TIME AI becomes the universal governance, audit, and compliance orchestration layer for AI-native payments across x402, AP2, A2A, stablecoins, and global financial rails.
            </p>
          </div>

          {/* Strategic Positioning */}
          <Card className="mb-8 border-accent/30 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Strategic Positioning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-foreground">
                TIME AI does not replace payment rails—it sits <strong>above them</strong> as the intelligence, governance, and audit layer. 
                While x402, AP2, A2A, stablecoins, SWIFT, and FedNow handle the actual movement of value, TIME AI ensures every AI agent transaction is:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong>Authenticated</strong> — Every agent has a verified identity and permission set</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong>Policy-Compliant</strong> — Transactions are validated against enterprise rules before execution</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong>Auditable</strong> — Immutable logs capture reasoning, approvals, and liability chains</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong>Compliant</strong> — AML, KYC, sanctions, and tax checks happen in real-time</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Step-by-Step Integration Mapping */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Network className="w-6 h-6 text-accent" />
              Step-by-Step Integration
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              TIME AI integrates with global payment rails through a six-step orchestration process that ensures governance, compliance, and auditability at every layer.
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              {/* Step 1 */}
              <AccordionItem value="step-1" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm shrink-0">
                      1
                    </div>
                    <span className="font-semibold">AI Identity & Permission Layer</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Before any AI agent can initiate a payment, TIME AI authenticates its identity, verifies its role, and enforces spending limits.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Agent registers with TIME AI and receives a cryptographic identity</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Role-based permissions define which rails the agent can access (e.g., stablecoins only, no SWIFT)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Spending limits, approval thresholds, and expiry timestamps are enforced</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Step 2 */}
              <AccordionItem value="step-2" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm shrink-0">
                      2
                    </div>
                    <span className="font-semibold">Policy-as-Code Engine</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    TIME AI enforces enterprise-defined rules for every transaction across x402, AP2, A2A, stablecoins, and traditional rails.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Define rules: "No stablecoin payments above $10K without human approval"</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Enforce compliance checks before routing to x402, AP2, or FedNow</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Block transactions that violate policy or trigger manual review workflows</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Step 3 */}
              <AccordionItem value="step-3" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm shrink-0">
                      3
                    </div>
                    <span className="font-semibold">Cross-Rail Orchestration</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    TIME AI provides a unified API for AI agents to route payments across any rail—SWIFT, FedNow, stablecoins, x402, AP2, A2A—without needing rail-specific integration.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Agent calls TIME AI: "Pay $500 to Vendor X, fastest rail available"</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>TIME AI selects optimal rail (e.g., x402 for instant settlement, USDC for cross-border)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Handles rail-specific formatting, authentication, and settlement confirmation</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Step 4 */}
              <AccordionItem value="step-4" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm shrink-0">
                      4
                    </div>
                    <span className="font-semibold">Real-Time Audit Trail</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Every transaction is logged with immutable audit records capturing reasoning, policy checks, and liability assignment.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Log: Agent ID, transaction amount, rail used, policy rules applied</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Capture: Human approvals, compliance checks, and decision rationale</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Store on-chain for tamper-proof regulatory audit and legal traceability</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Step 5 */}
              <AccordionItem value="step-5" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm shrink-0">
                      5
                    </div>
                    <span className="font-semibold">Compliance Verification</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    TIME AI validates AML, KYC, sanctions screening, and tax residency requirements before allowing settlement on any rail.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Check recipient against sanctions lists (OFAC, UN, EU)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Verify KYC status for stablecoin and crypto rail transactions</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Calculate tax exposure for cross-border payments and flag reporting requirements</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Step 6 */}
              <AccordionItem value="step-6" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm shrink-0">
                      6
                    </div>
                    <span className="font-semibold">AI-to-AI Settlement Bridge</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    TIME AI enables secure inter-agent payments with escrow, dispute resolution, and proof-of-delivery mechanisms across any rail.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Agent A pays Agent B via stablecoin with escrow held until delivery confirmation</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Smart contract or TIME AI policy enforces release conditions</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Dispute resolution protocol with human arbitration fallback if needed</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Rail-Specific Integration Examples */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-accent" />
              Rail-Specific Integration Examples
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">x402 (Instant Settlement)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>TIME AI routes high-frequency, low-value AI agent payments through x402 for instant settlement.</p>
                  <p className="text-xs italic">Example: Supply chain AI pays logistics AI for real-time tracking data.</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">AP2 (Account-to-Account)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>TIME AI orchestrates direct bank account transfers for enterprise AI agents with full audit trails.</p>
                  <p className="text-xs italic">Example: Enterprise AI pays vendor invoices via AP2 with policy-enforced approval workflows.</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">A2A (Agent-to-Agent)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>TIME AI enables secure, governed AI-to-AI payments with identity verification and liability chains.</p>
                  <p className="text-xs italic">Example: AI agent purchases API credits from another AI service with escrow protection.</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Stablecoins (USDC, USDT, USD1)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>TIME AI validates compliance and routes cross-border AI payments via stablecoins with real-time audit logs.</p>
                  <p className="text-xs italic">Example: Global AI agent network settles micro-payments in USDC with automatic tax reporting.</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">SWIFT (Traditional Banking)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>TIME AI wraps SWIFT messaging with AI governance for enterprise agents requiring traditional banking rails.</p>
                  <p className="text-xs italic">Example: AI treasury agent initiates international wire transfer with multi-signature approval.</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">FedNow (Real-Time Payments)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>TIME AI enables AI agents to leverage FedNow for instant USD settlement with full regulatory compliance.</p>
                  <p className="text-xs italic">Example: Government AI system disburses benefits via FedNow with immutable audit trail.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Why This Matters */}
          <Card className="border-accent/30 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Why This Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="leading-relaxed">
                <strong>No other platform provides this.</strong> Existing payment rails lack AI-native governance. Crypto projects focus on the rails themselves, not the control layer above them. TIME AI fills the critical gap: making AI agent payments safe, compliant, auditable, and enterprise-ready across <em>any</em> rail.
              </p>
              <p className="leading-relaxed">
                This positions TIME AI as the <strong>universal financial operating system for AI agents</strong>—the layer that governments, banks, and enterprises will require before allowing AI systems to transact autonomously.
              </p>
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground italic">
                  <FileCheck className="w-4 h-4 inline mr-1 text-accent" />
                  Every transaction is notarized, every policy is enforced, every audit trail is immutable. TIME AI makes AI payments trustworthy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
