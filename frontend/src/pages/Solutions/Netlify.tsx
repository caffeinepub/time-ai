import { Globe } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Netlify() {
  return (
    <SolutionTemplate
      title="Netlify"
      icon={Globe}
      description="Jamstack platform with build optimization and edge functions"
      problems={[
        { description: 'Build times for large static sites can exceed acceptable limits' },
        { description: 'Edge function deployment requires careful optimization for cold start performance' },
        { description: 'Form handling and serverless functions need robust spam protection' },
        { description: 'Large media assets impact build times and deployment bandwidth' },
      ]}
      solutions={[
        { description: 'Implement incremental builds with intelligent cache invalidation' },
        { description: 'Deploy Edge Functions with Deno runtime for fast cold starts' },
        { description: 'Use built-in form handling with Akismet integration for spam filtering' },
        { description: 'Optimize media delivery with automatic image transformation and CDN caching' },
      ]}
    />
  );
}
