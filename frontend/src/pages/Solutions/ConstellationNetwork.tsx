import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function ConstellationNetwork() {
  return (
    <SolutionTemplate
      title="Constellation Network"
      icon={Network}
      description="DAG-based blockchain network enabling scalable data validation and decentralized applications"
      problems={[
        { description: 'Scalability limitations of traditional blockchain architectures' },
        { description: 'Data validation complexity for enterprise use cases' },
        { description: 'Network performance optimization under high transaction loads' },
        { description: 'Developer onboarding and tooling for DAG-based development' },
      ]}
      solutions={[
        { description: 'Hypergraph architecture enabling parallel transaction processing and infinite scalability' },
        { description: 'Flexible data validation framework supporting custom business logic' },
        { description: 'Dynamic node reputation system optimizing network performance and security' },
        { description: 'Comprehensive SDK and developer tools with DAG-specific abstractions' },
      ]}
    />
  );
}
