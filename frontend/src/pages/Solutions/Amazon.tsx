import { Box } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Amazon() {
  return (
    <SolutionTemplate
      title="Amazon Logistics Solutions"
      icon={Box}
      description="Fixed problems, resolutions, and solutions for Amazon Logistics operations"
      problems={[
        { description: 'Last-mile delivery inefficiencies and route optimization' },
        { description: 'Fulfillment center capacity constraints during peak seasons' },
        { description: 'Package sorting bottlenecks and misrouting issues' },
        { description: 'Delivery driver coordination and scheduling conflicts' },
      ]}
      solutions={[
        { description: 'AI-powered route optimization for delivery drivers' },
        { description: 'Predictive inventory placement across fulfillment centers' },
        { description: 'Automated package sorting with computer vision' },
        { description: 'Real-time driver coordination and dynamic scheduling' },
      ]}
    />
  );
}
