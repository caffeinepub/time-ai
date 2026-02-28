import { Network } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function GBBC() {
  const problems = [
    { description: 'Global blockchain standards and best practices coordination' },
    { description: 'Industry collaboration across competing organizations' },
    { description: 'Regulatory engagement and policy advocacy' },
    { description: 'Education and thought leadership in blockchain technology' },
  ];

  const solutions = [
    { description: 'Working groups developing interoperability standards' },
    { description: 'Neutral forum for industry collaboration and knowledge sharing' },
    { description: 'Government relations program with regulatory guidance' },
    { description: 'Educational initiatives and certification programs' },
  ];

  return (
    <SolutionTemplate
      title="GBBC"
      icon={Network}
      description="Global Blockchain Business Council coordination and standards"
      problems={problems}
      solutions={solutions}
    />
  );
}
