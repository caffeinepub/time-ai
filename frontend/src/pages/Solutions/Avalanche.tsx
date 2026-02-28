import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Avalanche() {
  return (
    <SolutionTemplate
      title="Avalanche"
      icon={Network}
      description="Subnet architecture with institutional blockchain deployment needs"
      problems={[
        { description: 'Custom subnet deployment requires complex validator coordination and configuration' },
        { description: 'Cross-subnet communication introduces latency and security considerations' },
        { description: 'Institutional clients need permissioned subnets with regulatory compliance' },
        { description: 'Gas fee optimization across multiple subnets with different economic models' },
      ]}
      solutions={[
        { description: 'Implement automated subnet deployment with pre-configured validator sets and governance' },
        { description: 'Deploy Avalanche Warp Messaging for secure cross-subnet communication' },
        { description: 'Use permissioned subnets with KYC/AML integration for institutional use cases' },
        { description: 'Optimize gas fees with subnet-specific tokenomics and fee structures' },
      ]}
    />
  );
}
