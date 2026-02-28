import { Database } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Snowflake() {
  return (
    <SolutionTemplate
      title="Snowflake"
      icon={Database}
      description="Cloud data platform enabling data warehousing, data lakes, and data sharing"
      problems={[
        { description: 'Data warehouse cost optimization and compute efficiency' },
        { description: 'Query performance tuning for complex analytical workloads' },
        { description: 'Data sharing and collaboration across organizations' },
        { description: 'Multi-cloud strategy and data portability' },
      ]}
      solutions={[
        { description: 'Automatic scaling with separate compute and storage for cost optimization' },
        { description: 'Query optimization with materialized views and search optimization' },
        { description: 'Secure data sharing with zero-copy cloning and data marketplace' },
        { description: 'Multi-cloud support across AWS, Azure, and GCP with data replication' },
      ]}
    />
  );
}
