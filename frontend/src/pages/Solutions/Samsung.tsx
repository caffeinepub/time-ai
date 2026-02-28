import { Smartphone } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Samsung() {
  return (
    <SolutionTemplate
      title="Samsung"
      icon={Smartphone}
      description="Diversified technology conglomerate spanning consumer electronics, semiconductors, and displays"
      problems={[
        { description: 'Product portfolio complexity across mobile, appliances, and semiconductors' },
        { description: 'Supply chain coordination between divisions and external partners' },
        { description: 'Manufacturing efficiency across global facilities' },
        { description: 'Innovation pipeline management and R&D coordination' },
      ]}
      solutions={[
        { description: 'Unified product lifecycle management across all business units' },
        { description: 'Integrated supply chain platform with cross-division visibility and optimization' },
        { description: 'Smart factory automation with IoT, robotics, and AI quality control' },
        { description: 'Centralized R&D platform with IP management and collaboration tools' },
      ]}
    />
  );
}
