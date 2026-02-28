import { TrendingUp, BarChart3, Activity, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { SectionHeader } from '../components/common/SectionHeader';
import { LoadingSpinner } from '../components/common/LoadingState';
import { useCurrentPrice } from '../hooks/useMarket';
import { Alert, AlertDescription } from '../components/ui/alert';

export function Markets() {
  const { data: timePrice, isLoading: timePriceLoading, error: timePriceError } = useCurrentPrice('TIME');
  const { data: travPrice, isLoading: travPriceLoading, error: travPriceError } = useCurrentPrice('TRAV');

  const formatPrice = (price: bigint | undefined) => {
    if (!price) return 'N/A';
    return `$${Number(price) / 100}`;
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Markets"
            subtitle="Market overview and ecosystem signals"
            icon={<TrendingUp className="w-8 h-8 text-accent" />}
          />

          {(timePriceError || travPriceError) && (
            <Alert className="mb-6 border-amber-500/50 bg-amber-500/10">
              <AlertDescription className="text-amber-700 dark:text-amber-300">
                Market price data is not yet available. Prices will be displayed once the backend has recorded initial market activity.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="w-5 h-5 text-primary" />
                  TIME AI Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                {timePriceLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="text-3xl font-bold text-foreground">
                    {formatPrice(timePrice)}
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Enterprise governance token
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="w-5 h-5 text-accent" />
                  TRAV AI Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                {travPriceLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="text-3xl font-bold text-foreground">
                    {formatPrice(travPrice)}
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Personal AI reward token
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  High-level market trends and ecosystem health indicators
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-primary" />
                  Ecosystem Signals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time activity metrics and network statistics
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Token Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Important updates and notes about TIME and TRAV tokens
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Market Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="overview">
                  <AccordionTrigger>Market Overview</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        The TIME AI ecosystem is built on the Internet Computer Protocol, providing a decentralized and secure foundation for AI services.
                      </p>
                      <p>
                        Market activity reflects growing adoption of governed AI systems across enterprise and individual use cases.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="signals">
                  <AccordionTrigger>Ecosystem Signals</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        Key ecosystem metrics include active users, transaction volume, agent interactions, and governance participation.
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Daily active users and engagement rates</li>
                        <li>Agent utilization and handoff patterns</li>
                        <li>Token circulation and staking metrics</li>
                        <li>Community growth and contribution levels</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tokens">
                  <AccordionTrigger>Token Notes</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        TIME and TRAV tokens serve distinct but complementary roles within the ecosystem.
                      </p>
                      <p>
                        TIME tokens focus on enterprise governance and workflow orchestration, while TRAV tokens enable personalized AI experiences and user rewards.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This page provides informational content only and does not constitute financial advice. Market data and ecosystem metrics are for educational purposes. Always conduct your own research before making any decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
