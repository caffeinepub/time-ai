import { TrendingUp } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Robinhood() {
  const problems = [
    { description: 'Commission-free trading business model sustainability' },
    { description: 'Order routing and payment for order flow optimization' },
    { description: 'Crypto trading integration and custody' },
    { description: 'User education and risk disclosure for novice investors' },
  ];

  const solutions = [
    { description: 'Revenue diversification with premium subscriptions and lending' },
    { description: 'Smart order routing with best execution monitoring' },
    { description: 'Integrated crypto wallet with institutional-grade custody' },
    { description: 'In-app education platform with risk assessment tools' },
  ];

  return (
    <SolutionTemplate
      title="Robinhood"
      icon={TrendingUp}
      description="Commission-free trading and retail investment platform"
      problems={problems}
      solutions={solutions}
    />
  );
}
