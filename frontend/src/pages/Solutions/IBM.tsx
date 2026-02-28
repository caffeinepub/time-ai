import { Server } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function IBM() {
  return (
    <SolutionTemplate
      title="IBM"
      icon={Server}
      description="Enterprise technology leader providing cloud, AI, and mainframe computing solutions"
      problems={[
        { description: 'Mainframe modernization while maintaining legacy system reliability' },
        { description: 'Hybrid cloud complexity across on-premise and multi-cloud environments' },
        { description: 'AI model deployment and governance at enterprise scale' },
        { description: 'Quantum computing integration with classical infrastructure' },
      ]}
      solutions={[
        { description: 'Mainframe modernization platform with containerization and API enablement' },
        { description: 'Unified hybrid cloud management with automated workload placement' },
        { description: 'Enterprise AI governance framework with model monitoring and explainability' },
        { description: 'Quantum-classical hybrid computing platform for optimization problems' },
      ]}
    />
  );
}
