import { Coins } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Coinbase() {
  return (
    <SolutionTemplate
      title="Coinbase"
      icon={Coins}
      description="Leading cryptocurrency exchange and custody platform for retail and institutions"
      problems={[
        { description: 'Exchange infrastructure scalability during high-volume trading' },
        { description: 'Institutional custody requirements and security standards' },
        { description: 'Regulatory compliance across 100+ countries' },
        { description: 'User onboarding friction and education gaps' },
      ]}
      solutions={[
        { description: 'High-performance matching engine handling millions of transactions per second' },
        { description: 'Coinbase Custody with SOC 2 compliance and insurance coverage' },
        { description: 'Automated compliance monitoring with transaction screening and reporting' },
        { description: 'Educational platform and simplified UX reducing crypto adoption barriers' },
      ]}
    />
  );
}
