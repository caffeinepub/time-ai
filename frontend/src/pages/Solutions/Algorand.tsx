import { Shield } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Algorand() {
  return (
    <SolutionTemplate
      title="Algorand (ALGO)"
      icon={Shield}
      description="Pure proof-of-stake blockchain delivering speed, security, and decentralization"
      problems={[
        { description: 'Blockchain trilemma: balancing scalability, security, and decentralization' },
        { description: 'Smart contract development complexity and security risks' },
        { description: 'Asset tokenization and DeFi infrastructure limitations' },
        { description: 'Carbon footprint concerns with energy-intensive consensus' },
      ]}
      solutions={[
        { description: 'Pure proof-of-stake consensus achieving 1,000 TPS with instant finality' },
        { description: 'TEAL smart contract language with formal verification capabilities' },
        { description: 'Algorand Standard Assets (ASA) enabling native tokenization and atomic swaps' },
        { description: 'Carbon-negative network with minimal energy consumption' },
      ]}
    />
  );
}
