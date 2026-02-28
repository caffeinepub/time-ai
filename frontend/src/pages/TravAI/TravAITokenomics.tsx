import { Coins, TrendingUp, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

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
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              TRAV AI Tokenomics
            </h1>
            <p className="text-lg text-muted-foreground">
              Token supply, utility, and economic model for the TRAV AI ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  Token Supply
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Supply</p>
                  <p className="text-2xl font-bold text-foreground">500,000,000</p>
                  <p className="text-xs text-muted-foreground">TRAV tokens</p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Capped supply with user-centric distribution model
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Token Utility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Personal AI Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Unlock personalized TRAV AI features and capabilities
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Premium Services</h4>
                  <p className="text-sm text-muted-foreground">
                    Access advanced personalization and priority support
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Loyalty Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn tokens through consistent usage and engagement
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">User Rewards</span>
                  <span className="font-semibold text-foreground">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Development Team</span>
                  <span className="font-semibold text-foreground">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ecosystem Growth</span>
                  <span className="font-semibold text-foreground">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Strategic Partners</span>
                  <span className="font-semibold text-foreground">10%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Liquidity & Treasury</span>
                  <span className="font-semibold text-foreground">5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Earning Mechanisms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Daily Engagement</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn tokens for regular interaction with TRAV AI
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Feedback Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive tokens for providing valuable feedback
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Community Building</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn rewards for helping other users and sharing knowledge
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle>Economic Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The TRAV AI token economy prioritizes user engagement and long-term value creation. With 50% of tokens allocated to user rewards, the model incentivizes active participation and quality interactions.
              </p>
              <p className="text-sm text-muted-foreground">
                Token holders benefit from exclusive access to premium personalization features and priority support. The loyalty program rewards consistent users with increasing benefits over time, creating a sustainable ecosystem that grows with its community.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
