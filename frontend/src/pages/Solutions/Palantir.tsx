import { Shield } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Palantir() {
  return (
    <SolutionTemplate
      title="Palantir"
      icon={Shield}
      description="Enterprise data integration with complex security requirements"
      problems={[
        { description: 'Multi-source data integration across disparate government and enterprise systems' },
        { description: 'Fine-grained access control requirements for classified and sensitive data' },
        { description: 'Real-time analytics on massive datasets with strict latency requirements' },
        { description: 'Compliance with multiple regulatory frameworks across different jurisdictions' },
      ]}
      solutions={[
        { description: 'Deploy Foundry platform with role-based access control and data lineage tracking' },
        { description: 'Implement ontology-driven data modeling for unified semantic layer across sources' },
        { description: 'Use distributed query engine with intelligent caching for sub-second analytics' },
        { description: 'Establish automated compliance monitoring with audit trails and policy enforcement' },
      ]}
    />
  );
}
