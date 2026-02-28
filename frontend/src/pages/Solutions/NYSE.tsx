import { TrendingUp } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function NYSE() {
  const problems = [
    { description: 'High-frequency trading infrastructure and latency optimization' },
    { description: 'Market data distribution and real-time pricing' },
    { description: 'Regulatory compliance and trade surveillance' },
    { description: 'IPO process management and listing services' },
  ];

  const solutions = [
    { description: 'Co-location services with sub-microsecond latency' },
    { description: 'Consolidated market data feed with nanosecond timestamps' },
    { description: 'AI-powered surveillance system detecting market manipulation' },
    { description: 'Digital IPO platform with streamlined listing process' },
  ];

  return (
    <SolutionTemplate
      title="NYSE"
      icon={TrendingUp}
      description="Stock exchange operations, trading infrastructure, and market data"
      problems={problems}
      solutions={solutions}
    />
  );
}
