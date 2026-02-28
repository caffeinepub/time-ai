import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Hedera() {
  return (
    <SolutionTemplate
      title="Hedera (HBAR)"
      icon={Network}
      description="Enterprise-grade public network using hashgraph consensus for fast, fair, and secure applications"
      problems={[
        { description: 'Blockchain scalability limitations for enterprise throughput requirements' },
        { description: 'Transaction ordering fairness and timestamp consensus' },
        { description: 'Energy efficiency concerns with proof-of-work systems' },
        { description: 'Governance centralization risks in permissioned networks' },
      ]}
      solutions={[
        { description: 'Hashgraph consensus achieving 10,000+ TPS with finality in seconds' },
        { description: 'Fair ordering with consensus timestamps preventing front-running' },
        { description: 'Energy-efficient proof-of-stake with minimal environmental impact' },
        { description: 'Decentralized governance council with term limits and diverse representation' },
      ]}
    />
  );
}
