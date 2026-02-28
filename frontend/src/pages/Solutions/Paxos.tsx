import { Shield } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Paxos() {
  return (
    <SolutionTemplate
      title="Paxos"
      icon={Shield}
      description="Regulated blockchain infrastructure company issuing stablecoins and tokenizing assets"
      problems={[
        { description: 'Stablecoin transparency and reserve verification' },
        { description: 'Regulatory compliance for digital asset issuance' },
        { description: 'Settlement efficiency for institutional transactions' },
        { description: 'Asset tokenization complexity and custody requirements' },
      ]}
      solutions={[
        { description: 'Fully-reserved stablecoins with monthly attestations and real-time transparency' },
        { description: 'Trust company charter with comprehensive regulatory oversight' },
        { description: 'Instant settlement network for securities and commodities' },
        { description: 'End-to-end tokenization platform with integrated custody and compliance' },
      ]}
    />
  );
}
