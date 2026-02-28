import { BarChart3 } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function TradingView() {
  const problems = [
    { description: 'Real-time market data aggregation from multiple exchanges' },
    { description: 'Charting performance with complex technical indicators' },
    { description: 'Social trading features and idea sharing at scale' },
    { description: 'Multi-asset support across stocks, crypto, forex, and commodities' },
  ];

  const solutions = [
    { description: 'High-performance data pipeline with sub-second latency' },
    { description: 'WebGL-accelerated charting engine with custom indicator support' },
    { description: 'Community platform with moderation and reputation systems' },
    { description: 'Unified data model supporting diverse asset classes and exchanges' },
  ];

  return (
    <SolutionTemplate
      title="TradingView"
      icon={BarChart3}
      description="Charting platform, market data, and trading analytics"
      problems={problems}
      solutions={solutions}
    />
  );
}
