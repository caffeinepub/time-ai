import { Coins } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function PacaSwap() {
  return (
    <SolutionTemplate
      title="PacaSwap"
      icon={Coins}
      description="Decentralized exchange optimized for Constellation Network ecosystem"
      problems={[
        { description: 'DEX liquidity fragmentation and impermanent loss' },
        { description: 'Trading efficiency and slippage on low-volume pairs' },
        { description: 'User experience complexity for DeFi newcomers' },
        { description: 'Cross-chain asset bridging and interoperability' },
      ]}
      solutions={[
        { description: 'Concentrated liquidity pools reducing impermanent loss and capital efficiency' },
        { description: 'Intelligent routing algorithm optimizing trades across multiple pools' },
        { description: 'Simplified UX with one-click swaps and portfolio tracking' },
        { description: 'Native integration with Constellation DAG for fast, low-cost transactions' },
      ]}
    />
  );
}
