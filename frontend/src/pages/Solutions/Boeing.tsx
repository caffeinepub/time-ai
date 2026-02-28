import { Plane } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Boeing() {
  return (
    <SolutionTemplate
      title="Boeing"
      icon={Plane}
      description="Leading aerospace manufacturer producing commercial airplanes and defense systems"
      problems={[
        { description: 'Quality control challenges across global manufacturing facilities' },
        { description: 'Supply chain disruptions affecting production schedules' },
        { description: 'Complex certification processes for new aircraft models' },
        { description: 'After-market service coordination for global fleet' },
      ]}
      solutions={[
        { description: 'AI-powered quality inspection system with computer vision and defect prediction' },
        { description: 'Supply chain resilience platform with alternative sourcing and inventory optimization' },
        { description: 'Digital certification workflow with automated documentation and compliance tracking' },
        { description: 'Predictive maintenance platform for fleet management and parts optimization' },
      ]}
    />
  );
}
