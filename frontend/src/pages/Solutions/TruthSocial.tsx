import { MessageSquare } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function TruthSocial() {
  const problems = [
    { description: 'Platform infrastructure scaling and reliability' },
    { description: 'Content moderation policy implementation' },
    { description: 'User onboarding and verification processes' },
    { description: 'Mobile app distribution and updates' },
  ];

  const solutions = [
    { description: 'Cloud infrastructure with auto-scaling and load balancing' },
    { description: 'Transparent moderation system with clear community guidelines' },
    { description: 'Streamlined registration with optional identity verification' },
    { description: 'Cross-platform app deployment with continuous delivery' },
  ];

  return (
    <SolutionTemplate
      title="Truth Social"
      icon={MessageSquare}
      description="Social media platform infrastructure and content management"
      problems={problems}
      solutions={solutions}
    />
  );
}
