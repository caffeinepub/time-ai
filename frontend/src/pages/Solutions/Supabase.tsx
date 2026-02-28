import { Database } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Supabase() {
  return (
    <SolutionTemplate
      title="Supabase"
      icon={Database}
      description="Open-source Firebase alternative with Postgres scaling challenges"
      problems={[
        { description: 'Postgres connection pooling limits can be reached under high concurrent load' },
        { description: 'Real-time subscriptions require efficient WebSocket management at scale' },
        { description: 'Row-level security policies can impact query performance' },
        { description: 'Storage bucket management for large media files needs optimization' },
      ]}
      solutions={[
        { description: 'Deploy PgBouncer connection pooling with transaction mode for optimal throughput' },
        { description: 'Implement Realtime server with horizontal scaling for WebSocket connections' },
        { description: 'Optimize RLS policies with indexed columns and query plan analysis' },
        { description: 'Use CDN integration with automatic image optimization for storage buckets' },
      ]}
    />
  );
}
