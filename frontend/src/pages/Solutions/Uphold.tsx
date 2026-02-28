import { Wallet } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Uphold() {
  return (
    <SolutionTemplate
      title="Uphold"
      icon={Wallet}
      description="Multi-asset digital money platform supporting crypto, fiat, and commodities"
      problems={[
        { description: 'Asset fragmentation across multiple platforms and wallets' },
        { description: 'Liquidity management for diverse asset classes' },
        { description: 'Trading efficiency and price discovery across asset types' },
        { description: 'Regulatory compliance for multi-asset platforms' },
      ]}
      solutions={[
        { description: 'Unified platform supporting 200+ cryptocurrencies, fiat, and commodities' },
        { description: 'Transparent liquidity model with real-time reserve auditing' },
        { description: 'Anything-to-anything trading with instant settlement' },
        { description: 'Comprehensive compliance framework with global licensing' },
      ]}
    />
  );
}
