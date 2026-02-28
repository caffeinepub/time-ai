import { Plane } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function LockheedMartin() {
  return (
    <SolutionTemplate
      title="Lockheed Martin"
      icon={Plane}
      description="Global aerospace and defense company delivering advanced technology systems"
      problems={[
        { description: 'Complex project management across multi-year defense contracts' },
        { description: 'Strict compliance requirements for classified and export-controlled data' },
        { description: 'Supply chain security and vendor management for sensitive components' },
        { description: 'Integration challenges across legacy and modern defense systems' },
      ]}
      solutions={[
        { description: 'Enterprise project management platform with milestone tracking and risk assessment' },
        { description: 'Secure data management system with automated compliance checking and audit trails' },
        { description: 'Vendor risk assessment platform with real-time security monitoring' },
        { description: 'Systems integration framework enabling interoperability across platforms' },
      ]}
    />
  );
}
