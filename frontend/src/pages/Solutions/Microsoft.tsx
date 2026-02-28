import { Building2 } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Microsoft() {
  return (
    <SolutionTemplate
      title="Microsoft Solutions"
      icon={Building2}
      description="Fixed problems, resolutions, and solutions for Microsoft Azure and enterprise operations"
      problems={[
        { description: 'Azure cost overruns and resource waste' },
        { description: 'Complex multi-region deployment configurations' },
        { description: 'Active Directory synchronization issues' },
        { description: 'Enterprise application migration challenges' },
      ]}
      solutions={[
        { description: 'Automated cost optimization and resource rightsizing' },
        { description: 'Infrastructure-as-code templates for consistent deployments' },
        { description: 'Hybrid identity management and seamless AD sync' },
        { description: 'Phased migration strategies with zero-downtime cutover' },
      ]}
    />
  );
}
