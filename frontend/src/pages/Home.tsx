import { Sparkles, Zap, Shield, Users, FileCheck, Database, Calculator, CheckCircle2, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { routes } from '../router/routes';
import { useGetSubscription, useSubscription } from '../hooks/useSubscription';
import { toast } from 'sonner';

// Plan definitions
const PLANS = [
  {
    id: 'Free',
    name: 'Free',
    price: '$0',
    period: '/month',
    maxProjects: 1,
    maxAgents: 2,
    storageGB: 1,
    description: 'Get started with basic AI governance tools.',
  },
  {
    id: 'Basic',
    name: 'Basic',
    price: '$9',
    period: '/month',
    maxProjects: 5,
    maxAgents: 10,
    storageGB: 10,
    description: 'For individuals and small teams.',
  },
  {
    id: 'Pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    maxProjects: 20,
    maxAgents: 50,
    storageGB: 100,
    description: 'Advanced features for growing organizations.',
  },
  {
    id: 'Enterprise',
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    maxProjects: 999,
    maxAgents: 500,
    storageGB: 1000,
    description: 'Unlimited scale for enterprise deployments.',
  },
] as const;

type PlanId = (typeof PLANS)[number]['id'];

const TIER_ORDER: Record<PlanId, number> = {
  Free: 0,
  Basic: 1,
  Pro: 2,
  Enterprise: 3,
};

function getPlanLabel(currentTier: string, targetTier: PlanId): 'current' | 'upgrade' | 'downgrade' {
  const current = TIER_ORDER[currentTier as PlanId] ?? 0;
  const target = TIER_ORDER[targetTier];
  if (current === target) return 'current';
  if (target > current) return 'upgrade';
  return 'downgrade';
}

export function Home() {
  const navigate = useNavigate();
  const { isReady, identity, setSubscriptionMutation } = useSubscription();
  const { data: currentTier, isLoading: tierLoading } = useGetSubscription();

  const activeTier = currentTier ?? 'Free';

  const handlePlanChange = async (targetTier: PlanId) => {
    try {
      await setSubscriptionMutation.mutateAsync({ tier: targetTier });
      toast.success('Plan updated successfully');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update plan');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Welcome to TIME AI
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-3 max-w-3xl mx-auto">
            Governed Intelligence for Enterprise and Personal AI
          </p>

          {/* World's First Callout */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">
                World's First Dual AI Technology
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
              <FileCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                World's First AI Notary
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate({ to: routes.agentRegistry.path })}
              className="gap-2"
            >
              <Zap className="w-5 h-5" />
              Explore Agent Registry
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: routes.worldsFirst.path })}
              className="gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Explore World's First
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: routes.aiTaxAssistance.path })}
              className="gap-2"
            >
              <Calculator className="w-5 h-5" />
              AI Tax Assistance
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-accent/20 hover:border-accent/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-accent" />
                TIME AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                General intelligence for enterprise workflows and governed decision-making
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: routes.timeAIFunctionsUseCases.path })}
                className="w-full"
              >
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-primary" />
                TRAV AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Personal AI companion for daily tasks and lifestyle management
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: routes.travAIFunctionsUseCases.path })}
                className="w-full"
              >
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover:border-secondary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-secondary" />
                Governance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Policy-driven control layer for AI agent behavior and compliance
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: routes.agentRegistry.path })}
                className="w-full"
              >
                View Registry
              </Button>
            </CardContent>
          </Card>

          <Card className="border-muted/20 hover:border-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileCheck className="w-5 h-5 text-muted-foreground" />
                AI Notary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Blockchain-backed verification and certification for AI outputs
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: routes.aiNotary.path })}
                className="w-full"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ── Subscription Plans Section ── */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Subscription Plans</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose the plan that fits your needs. Upgrade or downgrade at any time.
            </p>

            {/* Current Plan Indicator */}
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30">
              {tierLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-primary" />
              )}
              <span className="text-sm font-semibold text-foreground">
                Your Current Plan:{' '}
                <span className="text-primary">
                  {tierLoading ? '...' : activeTier}
                </span>
              </span>
            </div>

            {!identity && (
              <p className="mt-3 text-sm text-muted-foreground">
                Log in to manage your subscription plan.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => {
              const label = getPlanLabel(activeTier, plan.id);
              const isCurrent = label === 'current';
              const isPending = setSubscriptionMutation.isPending;

              return (
                <Card
                  key={plan.id}
                  className={`relative flex flex-col transition-all duration-200 ${
                    isCurrent
                      ? 'border-primary shadow-md ring-1 ring-primary/40'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground text-xs px-3 py-0.5 shadow">
                        Active
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {plan.name}
                    </CardTitle>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-1 gap-4">
                    {/* Plan features */}
                    <ul className="space-y-2 flex-1">
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Max Projects</span>
                        <span className="font-semibold text-foreground">
                          {plan.maxProjects === 999 ? 'Unlimited' : plan.maxProjects}
                        </span>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Max Agents</span>
                        <span className="font-semibold text-foreground">{plan.maxAgents}</span>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Storage</span>
                        <span className="font-semibold text-foreground">
                          {plan.storageGB >= 1000
                            ? `${plan.storageGB / 1000} TB`
                            : `${plan.storageGB} GB`}
                        </span>
                      </li>
                    </ul>

                    {/* Action button */}
                    {isCurrent ? (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="w-full cursor-default opacity-70"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1.5" />
                        Current Plan
                      </Button>
                    ) : label === 'upgrade' ? (
                      <Button
                        size="sm"
                        className="w-full gap-1.5"
                        disabled={!isReady || isPending}
                        onClick={() => handlePlanChange(plan.id)}
                      >
                        {isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ArrowUp className="w-4 h-4" />
                        )}
                        Upgrade
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-1.5 text-muted-foreground hover:text-foreground"
                        disabled={!isReady || isPending}
                        onClick={() => handlePlanChange(plan.id)}
                      >
                        {isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        Downgrade
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        {/* ── End Subscription Plans ── */}

        {/* Quick Links */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate({ to: routes.marketplace.path })}
              className="justify-start gap-2"
            >
              <Database className="w-4 h-4" />
              Marketplace
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: routes.markets.path })}
              className="justify-start gap-2"
            >
              <Zap className="w-4 h-4" />
              Markets
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: routes.rewardsIncentives.path })}
              className="justify-start gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Rewards
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: routes.aiTalk.path })}
              className="justify-start gap-2"
            >
              <Users className="w-4 h-4" />
              AI Talk
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: routes.solutions.path })}
              className="justify-start gap-2"
            >
              <Shield className="w-4 h-4" />
              Solutions
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: routes.aiTaxAssistance.path })}
              className="justify-start gap-2"
            >
              <Calculator className="w-4 h-4" />
              AI Tax Assistance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
