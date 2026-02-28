import { PieChart } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function CoinGecko() {
  const problems = [
    { description: 'Crypto market data aggregation from hundreds of exchanges' },
    { description: 'Price accuracy and manipulation detection' },
    { description: 'API rate limiting and infrastructure scaling' },
    { description: 'New token listing verification and due diligence' },
  ];

  const solutions = [
    { description: 'Multi-source data aggregation with weighted pricing algorithms' },
    { description: 'Anomaly detection system identifying wash trading and manipulation' },
    { description: 'Scalable API infrastructure with tiered access and caching' },
    { description: 'Automated token verification with smart contract analysis' },
  ];

  return (
    <SolutionTemplate
      title="CoinGecko"
      icon={PieChart}
      description="Crypto market data aggregation and analytics platform"
      problems={problems}
      solutions={solutions}
    />
  );
}
