import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function NEAR() {
  return (
    <SolutionTemplate
      title="NEAR Protocol"
      icon={Network}
      description="Sharded proof-of-stake blockchain designed for usability and scalability"
      problems={[
        { description: 'Blockchain scalability limitations with single-shard architectures' },
        { description: 'Poor user experience with complex wallet management' },
        { description: 'Developer onboarding challenges with unfamiliar languages' },
        { description: 'Cross-chain interoperability and asset bridging' },
      ]}
      solutions={[
        { description: 'Nightshade sharding enabling linear scalability with network growth' },
        { description: 'Human-readable account names and progressive security model' },
        { description: 'Rust and AssemblyScript smart contracts with familiar tooling' },
        { description: 'Rainbow Bridge enabling trustless Ethereum interoperability' },
      ]}
    />
  );
}
