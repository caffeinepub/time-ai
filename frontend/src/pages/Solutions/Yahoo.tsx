import { Globe } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Yahoo() {
  return (
    <SolutionTemplate
      title="Yahoo"
      icon={Globe}
      description="Digital media company providing news, email, and content services globally"
      problems={[
        { description: 'Content delivery optimization across global CDN infrastructure' },
        { description: 'Ad targeting efficiency and revenue optimization' },
        { description: 'Email spam filtering and security threats' },
        { description: 'Platform modernization and technical debt' },
      ]}
      solutions={[
        { description: 'AI-powered CDN with predictive caching and edge optimization' },
        { description: 'Machine learning ad targeting with privacy-preserving techniques' },
        { description: 'Advanced spam detection using NLP and behavioral analysis' },
        { description: 'Microservices architecture migration with containerization and cloud-native tools' },
      ]}
    />
  );
}
