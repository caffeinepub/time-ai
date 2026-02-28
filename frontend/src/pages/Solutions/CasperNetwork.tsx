import { Shield } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function CasperNetwork() {
  return (
    <SolutionTemplate
      title="Casper Network (CSPR)"
      icon={Shield}
      description="Enterprise-focused blockchain with upgradeable smart contracts and developer-friendly features"
      problems={[
        { description: 'Smart contract immutability preventing bug fixes and upgrades' },
        { description: 'Enterprise adoption barriers due to blockchain complexity' },
        { description: 'Governance challenges in decentralized networks' },
        { description: 'Developer onboarding and tooling limitations' },
      ]}
      solutions={[
        { description: 'Upgradeable smart contracts enabling bug fixes without redeployment' },
        { description: 'Enterprise-grade features including permissions and privacy controls' },
        { description: 'On-chain governance with weighted voting and proposal mechanisms' },
        { description: 'Developer-friendly tooling with Rust and AssemblyScript support' },
      ]}
    />
  );
}
