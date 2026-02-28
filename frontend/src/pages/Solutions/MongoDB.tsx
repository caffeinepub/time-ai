import { Database } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function MongoDB() {
  return (
    <SolutionTemplate
      title="MongoDB"
      icon={Database}
      description="Document database with sharding and performance optimization needs"
      problems={[
        { description: 'Sharding strategy selection impacts query performance and data distribution' },
        { description: 'Index management across large collections requires careful planning' },
        { description: 'Aggregation pipeline performance degrades with complex multi-stage operations' },
        { description: 'Atlas cluster sizing and auto-scaling configuration for cost optimization' },
      ]}
      solutions={[
        { description: 'Implement hashed sharding for even data distribution or ranged sharding for query locality' },
        { description: 'Deploy compound indexes with ESR (Equality, Sort, Range) rule for optimal query performance' },
        { description: 'Use $merge and $out stages for materialized views to optimize complex aggregations' },
        { description: 'Configure Atlas auto-scaling with custom metrics and scheduled scaling policies' },
      ]}
    />
  );
}
