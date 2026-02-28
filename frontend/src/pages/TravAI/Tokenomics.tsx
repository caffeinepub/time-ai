import { Coins, Gift, Zap, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

export function TravAITokenomics() {
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
              <Coins className="w-8 h-8 text-accent" />
              TRAV AI Tokenomics
            </h1>
            <p className="text-lg text-muted-foreground">
              Reward token for personal AI experiences and engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="w-5 h-5 text-accent" />
                  Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Earn tokens through active engagement and contributions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-primary" />
                  Utility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Unlock premium features and personalized experiences
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-accent" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Participate in community governance and decisions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="w-5 h-5 text-primary" />
                  Exchange
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Trade and convert within the ecosystem
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
                        TRAV tokens are designed to reward active users and grow with the community.
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>User rewards and incentives: 40%</li>
                        <li>Community development: 25%</li>
                        <li>Ecosystem partnerships: 15%</li>
                        <li>Team and advisors: 10% (vested over 3 years)</li>
                        <li>Liquidity provision: 10%</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="earning">
                  <AccordionTrigger>Earning TRAV Tokens</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        Multiple ways to earn TRAV tokens through ecosystem participation:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Daily active usage rewards</li>
                        <li>Completing tasks and achieving milestones</li>
                        <li>Referring new users to the platform</li>
                        <li>Contributing feedback and suggestions</li>
                        <li>Participating in community events</li>
                        <li>Creating and sharing content</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="utility">
                  <AccordionTrigger>Token Utility</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        TRAV tokens unlock enhanced experiences and benefits:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Access to premium AI features and capabilities</li>
                        <li>Personalization options and customization</li>
                        <li>Priority support and faster response times</li>
                        <li>Exclusive content and early access to new features</li>
                        <li>Discounts on marketplace items and services</li>
                        <li>Voting rights on community proposals</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="economics">
                  <AccordionTrigger>Economic Model</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        TRAV token economics balance growth with sustainability:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Gradual token release to prevent inflation</li>
                        <li>Burn mechanism for premium feature purchases</li>
                        <li>Staking rewards for long-term holders</li>
                        <li>Dynamic supply adjustments based on usage</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Reward Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-accent" />
                    Daily Engagement
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Earn tokens every day you interact with TRAV AI. Consecutive days unlock bonus multipliers and special rewards.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Achievement System
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Complete challenges and reach milestones to earn achievement badges and token bonuses. Track your progress and compete with friends.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    Referral Rewards
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Invite friends to join TRAV AI and earn tokens when they become active users. Both you and your referrals receive bonuses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle>Spending & Redemption</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Use your TRAV tokens to enhance your AI experience:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Unlock advanced AI capabilities and personalization</li>
                <li>Purchase digital items and services in the marketplace</li>
                <li>Upgrade to premium subscription tiers</li>
                <li>Gift tokens to other users</li>
                <li>Convert to TIME tokens for enterprise features</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
