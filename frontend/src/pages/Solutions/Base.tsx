import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Base() {
  const problems = [
    { description: 'Layer 2 transaction throughput and finality' },
    { description: 'Ethereum mainnet bridge security and liquidity' },
    { description: 'Developer onboarding and tooling ecosystem' },
    { description: 'Gas fee optimization and user experience' },
  ];

  const solutions = [
    { description: 'Optimistic rollup architecture with fraud proof system' },
    { description: 'Multi-signature bridge with insurance fund and monitoring' },
    { description: 'Comprehensive SDK with Ethereum compatibility and migration tools' },
    { description: 'Batch transaction processing with predictable fee structure' },
  ];

  return (
    <SolutionTemplate
      title="Base"
      icon={Network}
      description="Coinbase Layer 2 scaling, developer tools, and ecosystem growth"
      problems={problems}
      solutions={solutions}
    />
  );
}
