import { Cloud } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Cloudflare() {
  return (
    <SolutionTemplate
      title="Cloudflare"
      icon={Cloud}
      description="Edge computing and security platform protecting and accelerating internet applications"
      problems={[
        { description: 'DDoS attack mitigation at internet scale' },
        { description: 'Edge computing performance and cold start latency' },
        { description: 'Global network optimization and routing efficiency' },
        { description: 'Zero Trust security implementation complexity' },
      ]}
      solutions={[
        { description: 'Anycast network with automatic DDoS mitigation and traffic scrubbing' },
        { description: 'Workers platform with V8 isolates for instant edge function execution' },
        { description: 'Argo Smart Routing with real-time network intelligence and optimization' },
        { description: 'Zero Trust platform with identity-based access and device posture checks' },
      ]}
    />
  );
}
