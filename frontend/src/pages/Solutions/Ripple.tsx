import { Coins } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Ripple() {
  return (
    <SolutionTemplate
      title="Ripple (XRP)"
      icon={Coins}
      description="Global payments network enabling instant, low-cost international money transfers"
      problems={[
        { description: 'High costs and slow settlement times for cross-border payments' },
        { description: 'Liquidity management challenges for financial institutions' },
        { description: 'Regulatory uncertainty and compliance complexity' },
        { description: 'Integration with existing banking infrastructure' },
      ]}
      solutions={[
        { description: 'RippleNet enabling 3-5 second settlement with minimal fees' },
        { description: 'On-Demand Liquidity (ODL) using XRP for instant cross-border liquidity' },
        { description: 'Compliance framework with built-in AML/KYC and regulatory reporting' },
        { description: 'Banking APIs and connectors for seamless legacy system integration' },
      ]}
    />
  );
}
