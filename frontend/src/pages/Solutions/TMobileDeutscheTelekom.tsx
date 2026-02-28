import { Phone } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function TMobileDeutscheTelekom() {
  const problems = [
    { description: '5G network deployment and spectrum optimization' },
    { description: 'Legacy infrastructure modernization and migration' },
    { description: 'International roaming agreements and billing' },
    { description: 'Customer service and network troubleshooting at scale' },
  ];

  const solutions = [
    { description: 'AI-powered network planning with coverage optimization' },
    { description: 'Phased migration strategy with hybrid network management' },
    { description: 'Automated roaming partner integration with real-time billing' },
    { description: 'Self-service diagnostic tools with AI-assisted support' },
  ];

  return (
    <SolutionTemplate
      title="T-Mobile / Deutsche Telekom"
      icon={Phone}
      description="Telecom network optimization and 5G infrastructure"
      problems={problems}
      solutions={solutions}
    />
  );
}
