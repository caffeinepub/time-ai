import { Cpu } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Intel() {
  return (
    <SolutionTemplate
      title="Intel"
      icon={Cpu}
      description="Semiconductor leader transitioning to advanced process nodes and expanding into AI and foundry services"
      problems={[
        { description: 'Process node transition challenges and yield ramp-up' },
        { description: 'Competitive positioning against TSMC and Samsung foundries' },
        { description: 'Product portfolio diversification into AI, networking, and automotive' },
        { description: 'Legacy architecture modernization and software ecosystem' },
      ]}
      solutions={[
        { description: 'Advanced process development with EUV lithography and gate-all-around transistors' },
        { description: 'Foundry services platform with customer design enablement and IP libraries' },
        { description: 'AI accelerator roadmap with integrated CPU-GPU-accelerator architectures' },
        { description: 'Open software ecosystem with oneAPI and cross-architecture compatibility' },
      ]}
    />
  );
}
