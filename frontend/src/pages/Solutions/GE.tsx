import { Factory } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function GE() {
  return (
    <SolutionTemplate
      title="GE (General Electric)"
      icon={Factory}
      description="Industrial conglomerate specializing in aviation, healthcare, power, and renewable energy"
      problems={[
        { description: 'Industrial IoT data management across diverse equipment and facilities' },
        { description: 'Predictive maintenance complexity for critical infrastructure' },
        { description: 'Energy efficiency optimization in power generation and distribution' },
        { description: 'Digital twin implementation for complex industrial systems' },
      ]}
      solutions={[
        { description: 'Unified IoT platform aggregating sensor data with edge computing capabilities' },
        { description: 'AI-driven predictive maintenance reducing unplanned downtime by 30%' },
        { description: 'Energy optimization system using machine learning for demand forecasting' },
        { description: 'Digital twin framework enabling real-time simulation and optimization' },
      ]}
    />
  );
}
