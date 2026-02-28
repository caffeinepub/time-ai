import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Helium() {
  return (
    <SolutionTemplate
      title="Helium (HNT)"
      icon={Network}
      description="Decentralized wireless network for IoT devices with crypto-economic incentives"
      problems={[
        { description: 'IoT connectivity gaps in rural and underserved areas' },
        { description: 'High infrastructure costs for traditional cellular networks' },
        { description: 'Hotspot placement optimization and coverage planning' },
        { description: 'Network quality and proof-of-coverage verification' },
      ]}
      solutions={[
        { description: 'Decentralized hotspot network with crypto incentives for coverage providers' },
        { description: 'Low-cost LoRaWAN connectivity with pay-per-use pricing model' },
        { description: 'AI-powered coverage optimization and hotspot placement recommendations' },
        { description: 'Proof-of-coverage algorithm ensuring network quality and preventing gaming' },
      ]}
    />
  );
}
