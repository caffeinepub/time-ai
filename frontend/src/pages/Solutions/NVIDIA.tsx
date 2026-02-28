import { Cpu } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function NVIDIA() {
  return (
    <SolutionTemplate
      title="NVIDIA"
      icon={Cpu}
      description="Leading AI compute infrastructure provider with GPU technology powering machine learning"
      problems={[
        { description: 'GPU allocation efficiency across data centers and cloud providers' },
        { description: 'AI workload optimization and resource utilization' },
        { description: 'Supply chain constraints for high-demand GPU products' },
        { description: 'Software stack complexity across CUDA, cuDNN, and AI frameworks' },
      ]}
      solutions={[
        { description: 'Intelligent GPU scheduling with workload profiling and multi-tenancy optimization' },
        { description: 'AI performance tuning with automated kernel optimization and mixed-precision training' },
        { description: 'Demand forecasting and supply chain visibility platform' },
        { description: 'Unified software platform with containerized AI workflows and version management' },
      ]}
    />
  );
}
