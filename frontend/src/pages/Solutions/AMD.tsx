import { Cpu } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function AMD() {
  return (
    <SolutionTemplate
      title="AMD"
      icon={Cpu}
      description="High-performance computing company with leadership in CPUs and GPUs for data centers and gaming"
      problems={[
        { description: 'Rapid growth requiring scalable infrastructure and operations' },
        { description: 'Supply allocation between data center, gaming, and embedded markets' },
        { description: 'Software ecosystem development for ROCm and AI frameworks' },
        { description: 'Competitive response to NVIDIA in AI accelerator market' },
      ]}
      solutions={[
        { description: 'Scalable operations platform with automated capacity planning and fulfillment' },
        { description: 'AI-driven demand forecasting with dynamic allocation across market segments' },
        { description: 'Open-source ROCm platform with framework integration and developer tools' },
        { description: 'MI300 series AI accelerators with unified memory and chiplet architecture' },
      ]}
    />
  );
}
