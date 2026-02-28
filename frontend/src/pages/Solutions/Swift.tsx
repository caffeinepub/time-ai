import { Send } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Swift() {
  const problems = [
    { description: 'International payment messaging across 11,000+ institutions' },
    { description: 'Settlement delays and correspondent banking inefficiencies' },
    { description: 'Sanctions screening and compliance monitoring' },
    { description: 'Cybersecurity and fraud prevention in cross-border payments' },
  ];

  const solutions = [
    { description: 'ISO 20022 messaging standard with rich payment data' },
    { description: 'SWIFT gpi with real-time tracking and same-day settlement' },
    { description: 'Automated sanctions screening with AI-powered risk assessment' },
    { description: 'Customer Security Programme with mandatory security controls' },
  ];

  return (
    <SolutionTemplate
      title="SWIFT"
      icon={Send}
      description="International payment messaging and settlement infrastructure"
      problems={problems}
      solutions={solutions}
    />
  );
}
