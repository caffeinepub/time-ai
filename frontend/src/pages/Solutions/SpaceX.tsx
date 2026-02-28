import { Rocket } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function SpaceX() {
  return (
    <SolutionTemplate
      title="SpaceX"
      icon={Rocket}
      description="Private aerospace manufacturer revolutionizing space transportation with reusable rockets"
      problems={[
        { description: 'Launch scheduling optimization with weather, payload, and orbital window constraints' },
        { description: 'Real-time telemetry analysis during launch and landing operations' },
        { description: 'Supply chain coordination for rapid manufacturing and launch cadence' },
        { description: 'Starlink satellite network management at unprecedented scale' },
      ]}
      solutions={[
        { description: 'AI-powered launch scheduling system with predictive weather modeling and constraint optimization' },
        { description: 'Real-time telemetry processing with automated anomaly detection and decision support' },
        { description: 'Integrated supply chain platform with just-in-time manufacturing coordination' },
        { description: 'Automated satellite network management with orbital optimization and collision avoidance' },
      ]}
    />
  );
}
