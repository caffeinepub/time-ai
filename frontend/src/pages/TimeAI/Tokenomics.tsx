import { Coins, TrendingUp, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

export function TimeAITokenomics() {
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
              <Coins className="w-8 h-8 text-primary" />
              TIME AI Tokenomics
            </h1>
            <p className="text-lg text-muted-foreground">
              Enterprise governance token for workflow orchestration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="w-5 h-5 text-primary" />
                  Utility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Powers enterprise workflows and governance decisions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="w-5 h-5 text-accent" />
                  Staking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Stake tokens to participate in governance and earn rewards
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deflationary model with token burns and buybacks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-accent" />
                  Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Vote on protocol upgrades and policy changes
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Token Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="supply">
                  <AccordionTrigger>Total Supply & Allocation</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        TIME tokens have a fixed maximum supply designed to ensure long-term value and scarcity.
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Enterprise partnerships: 30%</li>
                        <li>Ecosystem development: 25%</li>
                        <li>Team and advisors: 15% (vested over 4 years)</li>
                        <li>Community rewards: 20%</li>
                        <li>Treasury reserve: 10%</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="utility">
                  <AccordionTrigger>Token Utility</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        TIME tokens serve multiple functions within the ecosystem:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Payment for enterprise AI services and workflow execution</li>
                        <li>Governance voting rights on protocol decisions</li>
                        <li>Staking for network security and rewards</li>
                        <li>Access to premium features and priority support</li>
                        <li>Discounts on transaction fees</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="economics">
                  <AccordionTrigger>Economic Model</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        The TIME token economics are designed to create sustainable value:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Transaction fees are partially burned, reducing supply over time</li>
                        <li>Revenue from enterprise services funds token buybacks</li>
                        <li>Staking rewards incentivize long-term holding</li>
                        <li>Governance participation earns additional rewards</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="governance">
                  <AccordionTrigger>Governance Rights</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        TIME token holders have voting rights on key protocol decisions:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Protocol upgrades and feature additions</li>
                        <li>Fee structure adjustments</li>
                        <li>Treasury fund allocation</li>
                        <li>Partnership and integration approvals</li>
                        <li>Policy rule modifications</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Staking & Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Staking Tiers
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Different staking periods offer varying reward rates. Longer commitments earn higher APY and increased governance weight.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Reward Distribution
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Staking rewards are distributed from transaction fees and enterprise service revenue, ensuring sustainable yield generation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Governance Participation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Active participation in governance votes earns bonus rewards, incentivizing engaged community involvement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle>Deflationary Mechanics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                TIME implements multiple deflationary mechanisms to support long-term value:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Quarterly token burns based on platform revenue</li>
                <li>Transaction fee burns (percentage of each transaction)</li>
                <li>Buyback program funded by enterprise partnerships</li>
                <li>Reduced emissions over time through halving events</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
