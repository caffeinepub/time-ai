import { Building2 } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function ServiceNow() {
  return (
    <SolutionTemplate
      title="ServiceNow"
      icon={Building2}
      description="Enterprise workflow automation platform for IT service management and beyond"
      problems={[
        { description: 'Workflow complexity across IT, HR, customer service, and operations' },
        { description: 'AI-driven automation and intelligent routing' },
        { description: 'Integration with diverse enterprise systems and data sources' },
        { description: 'Platform scalability for large enterprise deployments' },
      ]}
      solutions={[
        { description: 'Unified workflow engine with low-code development and process automation' },
        { description: 'Now Intelligence with predictive analytics and virtual agents' },
        { description: 'IntegrationHub with pre-built connectors and API orchestration' },
        { description: 'Multi-instance architecture with global load balancing and data residency' },
      ]}
    />
  );
}
