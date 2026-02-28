import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function QuantNetwork() {
  return (
    <SolutionTemplate
      title="Quant Network (QNT)"
      icon={Network}
      description="Enterprise blockchain operating system enabling multi-chain interoperability via Overledger"
      problems={[
        { description: 'Blockchain interoperability challenges across different protocols' },
        { description: 'Enterprise integration complexity with legacy systems' },
        { description: 'Multi-chain application development and deployment' },
        { description: 'Regulatory compliance for cross-chain transactions' },
      ]}
      solutions={[
        { description: 'Overledger platform providing universal blockchain connectivity and abstraction' },
        { description: 'Enterprise connectors bridging blockchain with traditional IT infrastructure' },
        { description: 'Multi-chain DApp framework with unified development experience' },
        { description: 'Compliance layer enabling regulatory oversight across blockchain networks' },
      ]}
    />
  );
}
