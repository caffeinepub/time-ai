import { Sparkles, FileCheck, Shield, Zap, Network, ShoppingBag, Database, Coins, Link, Calculator, ArrowRight, ScrollText, TestTube, ScanSearch, Fingerprint, GitBranch, Gauge, MapPin, ShieldCheck, Globe, Bot, ShieldAlert, ShieldX, Workflow, Battery, IdCard, Brain, Headset, Cog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { worldsFirstItems } from '../content/worldsFirstItems';
import { useNavigate } from '@tanstack/react-router';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCheck,
  Network,
  ShoppingBag,
  Database,
  Coins,
  Link,
  Calculator,
  ScrollText,
  TestTube,
  ScanSearch,
  Fingerprint,
  GitBranch,
  Gauge,
  MapPin,
  ShieldCheck,
  Globe,
  Bot,
  ShieldAlert,
  ShieldX,
  Workflow,
  Battery,
  IdCard,
  Brain,
  Headset,
  Cog,
};

export function WorldsFirst() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Innovation Showcase
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              World's First Innovations
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              TIME AI pioneers 50 breakthrough technologies that solve global challenges across AI governance, 
              financial infrastructure, cybersecurity, identity, enterprise automation, interoperability, 
              scalability, privacy, supply chain, fraud prevention, predictive intelligence, infrastructure 
              resilience, knowledge management, international coordination, and planetary-scale systems. Each innovation represents a world-first solution 
              addressing critical gaps in technology, compliance, and trust.
            </p>
          </div>
        </div>
      </div>

      {/* Innovations Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worldsFirstItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            const itemNumber = index + 1;
            
            return (
              <Card 
                key={item.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors relative">
                      <IconComponent className="h-6 w-6" />
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold"
                      >
                        {itemNumber}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight mb-2">
                        {item.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.premiumExplanation}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Key Features</h4>
                      <ul className="space-y-1">
                        {item.keyFeatures.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <Zap className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Use Cases</h4>
                      <ul className="space-y-1">
                        {item.useCases.slice(0, 3).map((useCase, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <Shield className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {item.linkTo && (
                    <div className="mt-4 pt-4 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group/btn"
                        onClick={() => navigate({ to: item.linkTo! })}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Experience the Future?</h2>
            <p className="text-lg text-muted-foreground">
              Explore how TIME AI's world-first innovations can transform your enterprise operations, 
              compliance workflows, and AI governance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => navigate({ to: '/time-ai/functions-use-cases' })}>
                Explore TIME AI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/trav-ai/functions-use-cases' })}>
                Explore TRAV AI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
