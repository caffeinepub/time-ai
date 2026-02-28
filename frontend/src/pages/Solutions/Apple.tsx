import { Smartphone } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Apple() {
  return (
    <SolutionTemplate
      title="Apple"
      icon={Smartphone}
      description="Technology ecosystem spanning hardware, software, and services with global supply chain"
      problems={[
        { description: 'Supply chain complexity across hundreds of suppliers globally' },
        { description: 'Ecosystem integration across devices, services, and platforms' },
        { description: 'Privacy and security at scale with billions of devices' },
        { description: 'Retail and online sales coordination during product launches' },
      ]}
      solutions={[
        { description: 'AI-powered supply chain optimization with demand forecasting and inventory management' },
        { description: 'Unified ecosystem platform with seamless handoff and data synchronization' },
        { description: 'On-device processing with differential privacy and secure enclave technology' },
        { description: 'Intelligent inventory allocation with real-time demand sensing and fulfillment optimization' },
      ]}
    />
  );
}
