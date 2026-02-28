import { Building2 } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function SAP() {
  return (
    <SolutionTemplate
      title="SAP"
      icon={Building2}
      description="Enterprise resource planning leader transitioning to cloud with S/4HANA"
      problems={[
        { description: 'Legacy ERP migration complexity and business disruption' },
        { description: 'Cloud transition for on-premise customer base' },
        { description: 'Integration with modern SaaS and cloud-native applications' },
        { description: 'Real-time analytics and in-memory computing at scale' },
      ]}
      solutions={[
        { description: 'Automated migration tools with business process testing and validation' },
        { description: 'RISE with SAP offering managed cloud migration and operations' },
        { description: 'Integration Suite with pre-built connectors and API management' },
        { description: 'HANA in-memory database with real-time analytics and machine learning' },
      ]}
    />
  );
}
