import { Landmark } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function IMF() {
  const problems = [
    { description: 'Global economic surveillance and data collection' },
    { description: 'Financial assistance program management and monitoring' },
    { description: 'Technical assistance delivery to member countries' },
    { description: 'Special Drawing Rights allocation and management' },
  ];

  const solutions = [
    { description: 'Integrated economic database with real-time country monitoring' },
    { description: 'Digital program management platform with milestone tracking' },
    { description: 'Virtual technical assistance with remote expert deployment' },
    { description: 'Blockchain-based SDR ledger with transparent allocation' },
  ];

  return (
    <SolutionTemplate
      title="IMF"
      icon={Landmark}
      description="International Monetary Fund operations and financial stability"
      problems={problems}
      solutions={solutions}
    />
  );
}
