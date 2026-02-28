import { Coins } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Binance() {
  return (
    <SolutionTemplate
      title="Binance (BNB)"
      icon={Coins}
      description="World's largest cryptocurrency exchange by trading volume with extensive ecosystem"
      problems={[
        { description: 'Massive trading volume requiring extreme scalability' },
        { description: 'Global regulatory compliance across diverse jurisdictions' },
        { description: 'Liquidity management across 600+ trading pairs' },
        { description: 'Ecosystem coordination between exchange, chain, and DeFi products' },
      ]}
      solutions={[
        { description: 'Distributed architecture handling 100,000+ transactions per second' },
        { description: 'Regional compliance teams with localized KYC/AML procedures' },
        { description: 'Automated market making and liquidity aggregation across venues' },
        { description: 'Unified BNB token economy incentivizing ecosystem participation' },
      ]}
    />
  );
}
