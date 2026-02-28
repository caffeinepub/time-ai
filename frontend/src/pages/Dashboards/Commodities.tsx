import { TrendingUp, AlertTriangle, BarChart3, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';

export function Commodities() {
  const categories = [
    { name: 'Energy', items: ['Crude Oil', 'Natural Gas', 'Coal'], color: 'text-amber-500' },
    { name: 'Metals', items: ['Gold', 'Silver', 'Copper'], color: 'text-yellow-500' },
    { name: 'Agriculture', items: ['Wheat', 'Corn', 'Soybeans'], color: 'text-green-500' },
    { name: 'Livestock', items: ['Cattle', 'Hogs', 'Poultry'], color: 'text-orange-500' },
  ];

  const simulatedMetrics = [
    { label: 'Total Categories', value: '4', trend: '+0%' },
    { label: 'Tracked Commodities', value: '12', trend: '+0%' },
    { label: 'Simulated Volume', value: '$0', trend: '+0%' },
    { label: 'Educational Mode', value: 'Active', trend: 'Info' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with Icon */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-16 h-16">
            <img
              src="/assets/generated/commodities-rwa-icons.dim_1024x1024.png"
              alt="Commodities"
              className="w-full h-full object-contain"
            />
          </div>
          <Badge variant="outline">Informational Dashboard</Badge>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Commodities Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Educational overview of commodity categories and market concepts. This is a simulation for learning purposes only.
        </p>
      </div>

      {/* Disclaimer */}
      <Alert className="mb-8">
        <Info className="w-4 h-4" />
        <AlertDescription>
          <strong>Educational Simulation:</strong> This dashboard provides informational content about commodities. 
          No real trading, tokenization, or financial transactions are available on this platform.
        </AlertDescription>
      </Alert>

      {/* Simulated Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {simulatedMetrics.map((metric, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Commodity Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, idx) => (
            <Card key={idx} className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className={`w-5 h-5 ${category.color}`} />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-center justify-between p-2 rounded bg-muted/50"
                    >
                      <span className="text-sm text-foreground">{item}</span>
                      <Badge variant="outline" className="text-xs">
                        Simulated
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Educational Notes */}
      <Card className="bg-gradient-to-br from-card to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            • This dashboard is for educational and informational purposes only
          </p>
          <p>
            • No real commodity trading or tokenization is available on this platform
          </p>
          <p>
            • All metrics and data shown are simulated examples
          </p>
          <p>
            • Real commodity trading requires specialized platforms, regulatory compliance, and custody solutions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
