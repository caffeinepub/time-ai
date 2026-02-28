import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Cardano() {
  return (
    <SolutionTemplate
      title="Cardano"
      icon={Network}
      description="Research-driven blockchain with formal verification requirements"
      problems={[
        { description: 'Formal verification of smart contracts requires specialized expertise and tooling' },
        { description: 'Extended UTXO model introduces complexity for developers familiar with account-based systems' },
        { description: 'Plutus smart contract language has a steep learning curve' },
        { description: 'On-chain governance through Project Catalyst requires community coordination at scale' },
      ]}
      solutions={[
        { description: 'Provide comprehensive Plutus development tooling with formal verification frameworks' },
        { description: 'Deploy developer education programs focused on EUTXO model and functional programming' },
        { description: 'Implement automated testing suites for Plutus contracts with property-based testing' },
        { description: 'Use decentralized voting infrastructure with transparent proposal evaluation' },
      ]}
    />
  );
}
