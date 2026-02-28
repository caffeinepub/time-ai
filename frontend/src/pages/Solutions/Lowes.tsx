import { Home } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Lowes() {
  const problems = [
    { description: 'Complex supply chain for seasonal and bulky building materials' },
    { description: 'Contractor service coordination and project material planning' },
    { description: 'Store layout optimization for diverse product categories' },
    { description: 'Inventory accuracy challenges with high SKU count' },
  ];

  const solutions = [
    { description: 'Seasonal demand forecasting with automated supplier coordination' },
    { description: 'Contractor portal with project planning and material reservation' },
    { description: 'AI-driven store layout optimization based on customer flow patterns' },
    { description: 'RFID and barcode integration for real-time inventory tracking' },
  ];

  return (
    <SolutionTemplate
      title="Lowe's"
      icon={Home}
      description="Home improvement supply chain and store operations optimization"
      problems={problems}
      solutions={solutions}
    />
  );
}
