import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function R3Corda() {
  return (
    <SolutionTemplate
      title="R3 Corda"
      icon={Network}
      description="Enterprise blockchain platform designed for financial services and regulated industries"
      problems={[
        { description: 'Privacy requirements for confidential business transactions' },
        { description: 'Interoperability between financial institutions' },
        { description: 'Regulatory compliance and audit requirements' },
        { description: 'Legacy system integration complexity' },
      ]}
      solutions={[
        { description: 'Point-to-point architecture ensuring transaction privacy between parties' },
        { description: 'CorDapp framework enabling standardized business logic across institutions' },
        { description: 'Built-in compliance with regulatory nodes and audit trails' },
        { description: 'Enterprise connectors bridging Corda with existing banking infrastructure' },
      ]}
    />
  );
}
