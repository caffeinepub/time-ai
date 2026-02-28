import { Home } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function HomeDepot() {
  const problems = [
    { description: 'Large-scale logistics for construction materials and tools' },
    { description: 'Pro customer service and bulk order fulfillment' },
    { description: 'Online-to-store integration for buy online pickup in store (BOPIS)' },
    { description: 'Seasonal inventory planning for outdoor and garden products' },
  ];

  const solutions = [
    { description: 'Dedicated distribution network for construction-grade materials' },
    { description: 'Pro customer platform with dedicated support and volume pricing' },
    { description: 'Unified commerce system with real-time inventory visibility' },
    { description: 'Predictive seasonal planning with weather data integration' },
  ];

  return (
    <SolutionTemplate
      title="The Home Depot"
      icon={Home}
      description="Building materials logistics and contractor service coordination"
      problems={problems}
      solutions={solutions}
    />
  );
}
