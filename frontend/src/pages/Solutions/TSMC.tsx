import { Factory } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function TSMC() {
  return (
    <SolutionTemplate
      title="TSMC"
      icon={Factory}
      description="World's largest semiconductor foundry manufacturing advanced chips for global technology companies"
      problems={[
        { description: 'Yield optimization for cutting-edge process nodes (3nm, 5nm)' },
        { description: 'Capacity planning and allocation across diverse customer needs' },
        { description: 'Equipment maintenance and downtime minimization' },
        { description: 'Quality control at nanometer scale with billions of transistors' },
      ]}
      solutions={[
        { description: 'AI-powered yield prediction with defect pattern recognition and process optimization' },
        { description: 'Dynamic capacity allocation with customer priority and demand forecasting' },
        { description: 'Predictive maintenance using IoT sensors and machine learning' },
        { description: 'Automated optical inspection with computer vision and anomaly detection' },
      ]}
    />
  );
}
