import { Bitcoin } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function WLFI() {
  const problems = [
    { description: 'DeFi platform infrastructure and smart contract security' },
    { description: 'Regulatory compliance for financial services' },
    { description: 'User onboarding and education for crypto newcomers' },
    { description: 'Liquidity aggregation and yield optimization' },
  ];

  const solutions = [
    { description: 'Audited smart contracts with insurance coverage' },
    { description: 'Compliant-by-design architecture with KYC integration' },
    { description: 'Educational platform with guided onboarding flows' },
    { description: 'Yield aggregator with automated strategy optimization' },
  ];

  return (
    <SolutionTemplate
      title="WLFI"
      icon={Bitcoin}
      description="World Liberty Financial infrastructure and DeFi integration"
      problems={problems}
      solutions={solutions}
    />
  );
}
