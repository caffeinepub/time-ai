import { TrendingUp } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Bloomberg() {
  return (
    <SolutionTemplate
      title="Bloomberg"
      icon={TrendingUp}
      description="Financial data and analytics platform providing real-time market information globally"
      problems={[
        { description: 'Data aggregation from thousands of sources with varying formats' },
        { description: 'Terminal performance optimization for real-time data delivery' },
        { description: 'Analytics accuracy and calculation consistency' },
        { description: 'News distribution speed and relevance filtering' },
      ]}
      solutions={[
        { description: 'Unified data ingestion pipeline with automated normalization and validation' },
        { description: 'Optimized terminal architecture with edge caching and predictive loading' },
        { description: 'Standardized calculation engine with audit trails and version control' },
        { description: 'AI-powered news curation with sentiment analysis and personalization' },
      ]}
    />
  );
}
