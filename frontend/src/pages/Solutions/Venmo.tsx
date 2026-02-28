import { Send } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Venmo() {
  const problems = [
    { description: 'Social payment feed privacy and security' },
    { description: 'Instant transfer availability and bank integration' },
    { description: 'Fraud prevention in peer-to-peer transactions' },
    { description: 'User engagement and transaction volume growth' },
  ];

  const solutions = [
    { description: 'Granular privacy controls with default-private transactions' },
    { description: 'Instant transfer network with bank account verification' },
    { description: 'Machine learning fraud detection with social graph analysis' },
    { description: 'Gamification features and social engagement tools' },
  ];

  return (
    <SolutionTemplate
      title="Venmo"
      icon={Send}
      description="Social payments platform and transaction processing"
      problems={problems}
      solutions={solutions}
    />
  );
}
