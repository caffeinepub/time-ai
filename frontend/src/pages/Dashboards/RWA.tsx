import { Building2, Shield, TrendingUp, Info, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Progress } from '../../components/ui/progress';

export function RWA() {
  const simulatedVaults = [
    { name: 'Real Estate Vault', value: '$0', apy: '0%', status: 'Simulation' },
    { name: 'Treasury Bonds Vault', value: '$0', apy: '0%', status: 'Simulation' },
    { name: 'Commodities Vault', value: '$0', apy: '0%', status: 'Simulation' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with Icon */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-16 h-16">
            <img
              src="/assets/generated/commodities-rwa-icons.dim_1024x1024.png"
              alt="Real-World Assets"
              className="w-full h-full object-contain"
            />
          </div>
          <Badge variant="outline">Educational Dashboard</Badge>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Real-World Assets (RWA)
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Educational overview of RWA concepts including tokenization, fractionalization, and yield generation. 
          This is a simulation for learning purposes only.
        </p>
      </div>

      {/* Disclaimer */}
      <Alert className="mb-8">
        <Info className="w-4 h-4" />
        <AlertDescription>
          <strong>Educational Simulation:</strong> This dashboard demonstrates RWA concepts. 
          No real asset tokenization, custody, or financial transactions are available on this platform.
        </AlertDescription>
      </Alert>

      {/* Conceptual Vaults */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Conceptual Vaults</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {simulatedVaults.map((vault, idx) => (
            <Card key={idx} className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">{vault.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Value</div>
                  <div className="text-2xl font-bold text-foreground">{vault.value}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Simulated APY</div>
                  <div className="text-lg font-semibold text-accent">{vault.apy}</div>
                </div>
                <Badge variant="outline" className="w-full justify-center">
                  {vault.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fractionalization Concept */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Fractionalization Concept
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Fractionalization allows high-value assets to be divided into smaller, tradeable units. 
            This concept enables broader access to traditionally illiquid assets.
          </p>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Example: $1M Property</span>
                <span className="text-foreground font-medium">1,000 tokens @ $1,000 each</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Example: $500K Art Piece</span>
                <span className="text-foreground font-medium">500 tokens @ $1,000 each</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Notes */}
      <Card className="bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            • This dashboard is for educational and informational purposes only
          </p>
          <p>
            • No real asset tokenization, custody, or financial transactions are available on this platform
          </p>
          <p>
            • All vaults and metrics shown are simulated examples
          </p>
          <p>
            • Real RWA tokenization requires legal frameworks, custody solutions, and regulatory compliance
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
