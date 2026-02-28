import { Gift, Award, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { SectionHeader } from '../components/common/SectionHeader';
import { LoadingState, LoadingSpinner } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { useMyRewardPoints, useMyRewardEvents, useEarnRewardPoints } from '../hooks/useRewards';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';

export function RewardsIncentives() {
  const { identity } = useInternetIdentity();
  const { data: points, isLoading: pointsLoading } = useMyRewardPoints();
  const { data: events, isLoading: eventsLoading } = useMyRewardEvents();
  const earnMutation = useEarnRewardPoints();

  const handleClaimDaily = () => {
    earnMutation.mutate({
      points: 10,
      description: 'Daily reward claim',
    });
  };

  const formatTimestamp = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleString();
  };

  if (!identity) {
    return (
      <div className="relative min-h-[calc(100vh-8rem)]">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Rewards & Incentives"
              subtitle="Earn rewards through ecosystem participation and engagement"
              icon={<Gift className="w-8 h-8 text-accent" />}
            />

            <EmptyState
              title="Login Required"
              description="Please log in to view your rewards and earn points through ecosystem participation."
              icon={<Gift className="w-12 h-12 text-muted-foreground" />}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Rewards & Incentives"
            subtitle="Earn rewards through ecosystem participation and engagement"
            icon={<Gift className="w-8 h-8 text-accent" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5 text-accent" />
                  Your Reward Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pointsLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="text-4xl font-bold text-foreground">
                    {points?.toString() || '0'} Points
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Earn points through daily activities, community participation, and ecosystem engagement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  Daily Reward
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleClaimDaily}
                  disabled={earnMutation.isPending}
                  className="w-full"
                >
                  {earnMutation.isPending ? 'Claiming...' : 'Claim 10 Points'}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Claim your daily reward
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {eventsLoading ? (
                <LoadingState count={3} className="h-16" />
              ) : events && events.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id.toString()}>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>
                          <Badge variant={Number(event.points) > 0 ? 'default' : 'secondary'}>
                            {Number(event.points) > 0 ? '+' : ''}{event.points.toString()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatTimestamp(event.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No reward activity yet. Start earning by claiming your daily reward!
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How to Earn Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="daily">
                  <AccordionTrigger>Daily Rewards</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        Claim your daily reward to earn points consistently. Daily rewards help you build your point balance over time.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="participation">
                  <AccordionTrigger>Community Participation</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        Engage with the community through discussions, contributions, and collaborative activities to earn additional rewards.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="usage">
                  <AccordionTrigger>Platform Usage</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        Use TIME AI and TRAV AI features, complete workflows, and interact with agents to earn rewards based on your activity level.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Reward Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Accumulated reward points can be used for premium features, marketplace purchases, and exclusive access to advanced AI capabilities within the TIME AI ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
