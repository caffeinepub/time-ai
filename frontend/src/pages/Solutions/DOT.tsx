import { Truck } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function DOT() {
  return (
    <SolutionTemplate
      title="DOT (Department of Transportation)"
      icon={Truck}
      description="Federal agency overseeing transportation infrastructure, safety, and regulatory compliance"
      problems={[
        { description: 'Fragmented data collection across state and local transportation agencies' },
        { description: 'Manual compliance tracking for commercial vehicle operators' },
        { description: 'Infrastructure maintenance planning with limited predictive capabilities' },
        { description: 'Slow incident response coordination across jurisdictions' },
      ]}
      solutions={[
        { description: 'Unified data platform aggregating transportation metrics from federal, state, and local sources' },
        { description: 'Automated compliance monitoring system with real-time violation detection' },
        { description: 'Predictive maintenance platform using AI to forecast infrastructure needs' },
        { description: 'Real-time incident coordination system with automated resource allocation' },
      ]}
    />
  );
}
