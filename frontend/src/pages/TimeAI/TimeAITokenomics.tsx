import { Coins, TrendingUp, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

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
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              TIME AI Tokenomics
            </h1>
            <p className="text-lg text-muted-foreground">
              Token supply, utility, and economic model for the TIME AI ecosystem
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
                  <p className="text-2xl font-bold text-foreground">1,000,000,000</p>
                  <p className="text-xs text-muted-foreground">TIME tokens</p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Fixed supply with deflationary mechanisms through usage-based burning
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
                  <h4 className="font-semibold text-foreground mb-1">Governance Rights</h4>
                  <p className="text-sm text-muted-foreground">
                    Vote on protocol upgrades and ecosystem decisions
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Access & Usage</h4>
                  <p className="text-sm text-muted-foreground">
                    Pay for TIME AI services and premium features
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Staking Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn rewards by staking tokens to secure the network
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
                  <span className="text-sm text-muted-foreground">Ecosystem & Community</span>
                  <span className="font-semibold text-foreground">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Development Team</span>
                  <span className="font-semibold text-foreground">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Strategic Partners</span>
                  <span className="font-semibold text-foreground">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Public Sale</span>
                  <span className="font-semibold text-foreground">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Liquidity & Treasury</span>
                  <span className="font-semibold text-foreground">10%</span>
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
                  <h4 className="font-semibold text-foreground mb-1">Usage Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn tokens by actively using TIME AI services
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Contribution Incentives</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive tokens for improving the ecosystem
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Referral Program</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn rewards for bringing new users to the platform
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
                The TIME AI token economy is designed to align incentives across all ecosystem participants. Token holders benefit from network growth through deflationary mechanisms, while users are rewarded for active participation and contribution.
              </p>
              <p className="text-sm text-muted-foreground">
                A portion of transaction fees is burned, reducing total supply over time. Staking mechanisms ensure network security while providing passive income opportunities. Governance rights empower the community to shape the future direction of the protocol.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
