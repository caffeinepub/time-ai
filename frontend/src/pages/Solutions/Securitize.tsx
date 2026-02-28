import { Shield } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Securitize() {
  return (
    <SolutionTemplate
      title="Securitize"
      icon={Shield}
      description="Digital securities platform enabling compliant issuance and trading of tokenized assets"
      problems={[
        { description: 'Securities tokenization complexity and regulatory requirements' },
        { description: 'Investor accreditation verification and compliance' },
        { description: 'Secondary market liquidity for tokenized securities' },
        { description: 'Cap table management and corporate actions automation' },
      ]}
      solutions={[
        { description: 'End-to-end issuance platform with automated compliance and smart contracts' },
        { description: 'Integrated KYC/AML with accreditation verification and investor onboarding' },
        { description: 'Securitize Markets providing compliant secondary trading venue' },
        { description: 'Digital cap table with automated dividend distribution and voting' },
      ]}
    />
  );
}
