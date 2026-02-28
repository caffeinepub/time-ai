import { Store } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Costco() {
  const problems = [
    { description: 'Bulk inventory management with limited SKU selection' },
    { description: 'Membership management and renewal optimization' },
    { description: 'Warehouse space utilization and product rotation' },
    { description: 'Supplier direct relationships and quality control' },
  ];

  const solutions = [
    { description: 'High-velocity inventory system optimized for bulk sales patterns' },
    { description: 'Automated membership analytics with targeted renewal campaigns' },
    { description: 'Dynamic warehouse layout optimization based on sales velocity' },
    { description: 'Supplier quality management platform with direct sourcing coordination' },
  ];

  return (
    <SolutionTemplate
      title="Costco"
      icon={Store}
      description="Warehouse club operations and bulk inventory management"
      problems={problems}
      solutions={solutions}
    />
  );
}
