import { Landmark } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Comex() {
  return (
    <SolutionTemplate
      title="Comex"
      icon={Landmark}
      description="Commodity exchange division of CME Group for metals futures and options trading"
      problems={[
        { description: 'Settlement complexity for physical commodity delivery' },
        { description: 'Market data latency and price discovery efficiency' },
        { description: 'Risk management for leveraged commodity positions' },
        { description: 'Warehouse receipt verification and fraud prevention' },
      ]}
      solutions={[
        { description: 'Automated settlement system with blockchain-based delivery tracking' },
        { description: 'Low-latency market data infrastructure with microsecond timestamps' },
        { description: 'Real-time risk analytics with position monitoring and margin optimization' },
        { description: 'Digital warehouse receipts with cryptographic verification and audit trails' },
      ]}
    />
  );
}
