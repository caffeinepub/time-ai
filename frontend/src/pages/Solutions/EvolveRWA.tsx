import { TrendingUp } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function EvolveRWA() {
  return (
    <SolutionTemplate
      title="Evolve RWA"
      icon={TrendingUp}
      description="Real-world asset tokenization platform enabling fractional ownership and liquidity"
      problems={[
        { description: 'Asset tokenization complexity and legal framework requirements' },
        { description: 'Investor accreditation and compliance verification' },
        { description: 'Secondary market liquidity for tokenized assets' },
        { description: 'Asset valuation and price discovery mechanisms' },
      ]}
      solutions={[
        { description: 'End-to-end tokenization platform with legal structuring and smart contracts' },
        { description: 'Automated KYC/AML with accreditation verification and investor onboarding' },
        { description: 'Compliant secondary marketplace with order matching and settlement' },
        { description: 'Oracle-based valuation with third-party appraisals and market data integration' },
      ]}
    />
  );
}
