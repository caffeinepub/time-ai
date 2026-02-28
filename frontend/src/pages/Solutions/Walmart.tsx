import { Store } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Walmart() {
  const problems = [
    { description: 'Massive scale supply chain coordination across thousands of stores' },
    { description: 'Omnichannel fulfillment complexity with grocery and general merchandise' },
    { description: 'Last-mile delivery optimization for online orders' },
    { description: 'Vendor management and pricing negotiations at scale' },
  ];

  const solutions = [
    { description: 'AI-powered supply chain with predictive replenishment and routing' },
    { description: 'Unified inventory platform enabling ship-from-store and curbside pickup' },
    { description: 'Delivery network optimization with dynamic routing and scheduling' },
    { description: 'Automated vendor scorecard system with performance-based contracts' },
  ];

  return (
    <SolutionTemplate
      title="Walmart"
      icon={Store}
      description="Retail supply chain at scale and omnichannel fulfillment"
      problems={problems}
      solutions={solutions}
    />
  );
}
