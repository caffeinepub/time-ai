import { ShoppingCart } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function ShopRite() {
  const problems = [
    { description: 'Fresh food supply chain delays causing inventory spoilage' },
    { description: 'Inefficient store-level inventory management across multiple locations' },
    { description: 'Customer demand forecasting inaccuracies leading to stockouts' },
    { description: 'Complex vendor coordination for regional product sourcing' },
  ];

  const solutions = [
    { description: 'AI-powered fresh food logistics with real-time temperature monitoring' },
    { description: 'Automated inventory replenishment based on sales patterns and seasonality' },
    { description: 'Predictive analytics for demand forecasting using historical and local data' },
    { description: 'Vendor management platform with automated ordering and delivery scheduling' },
  ];

  return (
    <SolutionTemplate
      title="ShopRite"
      icon={ShoppingCart}
      description="Grocery supply chain optimization and inventory management"
      problems={problems}
      solutions={solutions}
    />
  );
}
