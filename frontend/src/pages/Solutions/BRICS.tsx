import { Globe } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function BRICS() {
  const problems = [
    { description: 'Cross-border payment coordination among member nations' },
    { description: 'Currency exchange and settlement mechanisms' },
    { description: 'Economic data sharing and policy coordination' },
    { description: 'Development bank project financing and oversight' },
  ];

  const solutions = [
    { description: 'BRICS payment system with local currency settlement' },
    { description: 'Multilateral currency swap arrangements and reserve pooling' },
    { description: 'Shared economic intelligence platform with secure data exchange' },
    { description: 'New Development Bank digital platform for project management' },
  ];

  return (
    <SolutionTemplate
      title="BRICS"
      icon={Globe}
      description="International economic cooperation and payment system development"
      problems={problems}
      solutions={solutions}
    />
  );
}
