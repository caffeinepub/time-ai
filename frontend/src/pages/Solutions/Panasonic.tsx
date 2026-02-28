import { Cpu } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Panasonic() {
  return (
    <SolutionTemplate
      title="Panasonic"
      icon={Cpu}
      description="Global electronics manufacturer with diverse product portfolio from consumer to industrial"
      problems={[
        { description: 'Supply chain coordination across consumer electronics and automotive divisions' },
        { description: 'Manufacturing automation and quality control at scale' },
        { description: 'Product lifecycle management for diverse product lines' },
        { description: 'Sustainability tracking and carbon footprint reduction' },
      ]}
      solutions={[
        { description: 'Integrated supply chain platform with demand forecasting and inventory optimization' },
        { description: 'Smart factory automation with AI-powered quality inspection and process optimization' },
        { description: 'Unified PLM system managing product development from concept to end-of-life' },
        { description: 'Sustainability dashboard tracking emissions, waste, and circular economy metrics' },
      ]}
    />
  );
}
