import { Zap } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function VeloProtocol() {
  return (
    <SolutionTemplate
      title="Velo Protocol"
      icon={Zap}
      description="Federated credit exchange network enabling instant settlement and liquidity management"
      problems={[
        { description: 'Cross-border settlement delays and high transaction costs' },
        { description: 'Liquidity fragmentation across multiple currency pairs' },
        { description: 'Credit risk assessment and collateral management complexity' },
        { description: 'Regulatory compliance across multiple jurisdictions' },
      ]}
      solutions={[
        { description: 'Real-time settlement network with atomic swaps and instant finality' },
        { description: 'Unified liquidity pool with automated market making and rebalancing' },
        { description: 'AI-powered credit scoring with dynamic collateral requirements' },
        { description: 'Compliance framework with automated KYC/AML and regulatory reporting' },
      ]}
    />
  );
}
