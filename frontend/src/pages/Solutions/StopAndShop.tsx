import { ShoppingCart } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function StopAndShop() {
  const problems = [
    { description: 'Perishable goods waste due to overstocking and expiration' },
    { description: 'Inconsistent customer experience across store locations' },
    { description: 'Manual price management and promotional coordination' },
    { description: 'Inefficient checkout processes during peak hours' },
  ];

  const solutions = [
    { description: 'Smart inventory system with expiration tracking and dynamic pricing' },
    { description: 'Standardized operations platform with real-time performance monitoring' },
    { description: 'Automated pricing engine with promotional campaign management' },
    { description: 'Self-checkout optimization and queue management systems' },
  ];

  return (
    <SolutionTemplate
      title="Stop & Shop"
      icon={ShoppingCart}
      description="Retail operations, fresh food logistics, and customer experience"
      problems={problems}
      solutions={solutions}
    />
  );
}
