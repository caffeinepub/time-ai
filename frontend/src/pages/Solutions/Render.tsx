import { Cpu } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Render() {
  return (
    <SolutionTemplate
      title="Render Network"
      icon={Cpu}
      description="Decentralized GPU rendering network for 3D graphics, AI, and visual effects"
      problems={[
        { description: 'High costs of centralized cloud rendering services' },
        { description: 'GPU resource allocation and job scheduling efficiency' },
        { description: 'Rendering quality verification and dispute resolution' },
        { description: 'Payment settlement and pricing for distributed compute' },
      ]}
      solutions={[
        { description: 'Peer-to-peer GPU marketplace with competitive pricing and instant access' },
        { description: 'Intelligent job distribution matching workloads to optimal GPU resources' },
        { description: 'Automated quality verification with hash-based proof-of-render' },
        { description: 'RNDR token economy with dynamic pricing based on supply and demand' },
      ]}
    />
  );
}
