import { Rocket } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function NASA() {
  return (
    <SolutionTemplate
      title="NASA"
      icon={Rocket}
      description="Space exploration agency managing complex missions, research, and international collaboration"
      problems={[
        { description: 'Massive data processing requirements from satellites, telescopes, and mission telemetry' },
        { description: 'Mission planning complexity with multiple constraints and dependencies' },
        { description: 'Collaboration challenges across international partners and contractors' },
        { description: 'Legacy system integration with modern cloud infrastructure' },
      ]}
      solutions={[
        { description: 'High-performance data processing pipeline with AI-powered anomaly detection' },
        { description: 'Intelligent mission planning system optimizing resource allocation and scheduling' },
        { description: 'Secure collaboration platform with role-based access and real-time data sharing' },
        { description: 'Hybrid cloud architecture bridging legacy systems with modern infrastructure' },
      ]}
    />
  );
}
