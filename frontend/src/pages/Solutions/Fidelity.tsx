import { TrendingUp } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Fidelity() {
  const problems = [
    { description: 'Multi-asset portfolio management and rebalancing' },
    { description: 'Retirement planning tools and tax optimization' },
    { description: 'Trading platform performance during market volatility' },
    { description: 'Customer service and financial advisor coordination' },
  ];

  const solutions = [
    { description: 'Automated portfolio management with tax-loss harvesting' },
    { description: 'Retirement planning engine with Monte Carlo simulations' },
    { description: 'High-performance trading infrastructure with failover systems' },
    { description: 'Unified CRM platform connecting digital and advisor channels' },
  ];

  return (
    <SolutionTemplate
      title="Fidelity"
      icon={TrendingUp}
      description="Investment platform, portfolio management, and trading infrastructure"
      problems={problems}
      solutions={solutions}
    />
  );
}
