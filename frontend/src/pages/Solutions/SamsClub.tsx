import { Store } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function SamsClub() {
  const problems = [
    { description: 'Membership-based business model requiring retention strategies' },
    { description: 'Bulk product sourcing and quality assurance' },
    { description: 'Business member services and commercial product lines' },
    { description: 'Scan-and-go technology adoption and theft prevention' },
  ];

  const solutions = [
    { description: 'Member analytics platform with personalized offers and retention programs' },
    { description: 'Supplier partnership program with quality audits and direct sourcing' },
    { description: 'Dedicated B2B platform with commercial pricing and delivery options' },
    { description: 'AI-powered loss prevention integrated with mobile checkout systems' },
  ];

  return (
    <SolutionTemplate
      title="Sam's Club"
      icon={Store}
      description="Membership warehouse optimization and business services"
      problems={problems}
      solutions={solutions}
    />
  );
}
