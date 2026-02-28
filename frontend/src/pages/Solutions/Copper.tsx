import { Banknote } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Copper() {
  const problems = [
    { description: 'Digital banking infrastructure scalability and reliability' },
    { description: 'Regulatory compliance across multiple jurisdictions' },
    { description: 'Real-time transaction processing and fraud detection' },
    { description: 'Customer onboarding and KYC verification processes' },
  ];

  const solutions = [
    { description: 'Cloud-native banking platform with horizontal scaling capabilities' },
    { description: 'Automated compliance monitoring with regulatory reporting' },
    { description: 'AI-powered fraud detection with real-time transaction analysis' },
    { description: 'Digital identity verification with automated KYC workflows' },
  ];

  return (
    <SolutionTemplate
      title="Copper"
      icon={Banknote}
      description="Digital banking infrastructure and financial services optimization"
      problems={problems}
      solutions={solutions}
    />
  );
}
