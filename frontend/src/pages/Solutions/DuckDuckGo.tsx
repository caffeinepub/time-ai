import { Globe } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function DuckDuckGo() {
  const problems = [
    { description: 'Privacy-preserving search without user tracking' },
    { description: 'Search quality without personalization data' },
    { description: 'Browser extension and app distribution' },
    { description: 'Revenue generation without behavioral advertising' },
  ];

  const solutions = [
    { description: 'Anonymous search architecture with no user profiling or data retention' },
    { description: 'Instant answers and quality ranking using aggregate signals' },
    { description: 'Cross-platform privacy tools with tracker blocking' },
    { description: 'Contextual advertising model based on search terms only' },
  ];

  return (
    <SolutionTemplate
      title="DuckDuckGo"
      icon={Globe}
      description="Privacy-focused search, data protection, and user anonymity"
      problems={problems}
      solutions={solutions}
    />
  );
}
