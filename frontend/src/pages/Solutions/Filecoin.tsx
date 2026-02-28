import { Database } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Filecoin() {
  return (
    <SolutionTemplate
      title="Filecoin (FIL)"
      icon={Database}
      description="Decentralized storage network turning cloud storage into an algorithmic market"
      problems={[
        { description: 'Centralized storage risks including censorship and single points of failure' },
        { description: 'Storage provider reliability and data availability guarantees' },
        { description: 'Retrieval performance optimization for decentralized networks' },
        { description: 'Storage pricing and market efficiency' },
      ]}
      solutions={[
        { description: 'Proof-of-replication and proof-of-spacetime ensuring data integrity' },
        { description: 'Storage deals with cryptographic proofs and penalty mechanisms' },
        { description: 'Retrieval market with incentivized fast data delivery' },
        { description: 'Algorithmic pricing based on supply, demand, and storage duration' },
      ]}
    />
  );
}
