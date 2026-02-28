import { Link } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Chainlink() {
  return (
    <SolutionTemplate
      title="Chainlink"
      icon={Link}
      description="Decentralized oracle network connecting smart contracts with real-world data"
      problems={[
        { description: 'Oracle centralization risks and single points of failure' },
        { description: 'Data quality and manipulation resistance for price feeds' },
        { description: 'Cross-chain data delivery and interoperability' },
        { description: 'Automation reliability for smart contract execution' },
      ]}
      solutions={[
        { description: 'Decentralized oracle network with cryptographic guarantees and reputation system' },
        { description: 'Aggregated data feeds from multiple sources with outlier detection' },
        { description: 'Cross-Chain Interoperability Protocol (CCIP) for secure cross-chain messaging' },
        { description: 'Chainlink Automation for reliable off-chain computation and execution' },
      ]}
    />
  );
}
