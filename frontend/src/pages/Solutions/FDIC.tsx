import { Landmark } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function FDIC() {
  const problems = [
    { description: 'Bank supervision and examination data management at scale' },
    { description: 'Deposit insurance fund calculation and risk assessment' },
    { description: 'Failed bank resolution and asset disposition coordination' },
    { description: 'Regulatory reporting compliance monitoring across institutions' },
  ];

  const solutions = [
    { description: 'Centralized examination platform with AI-assisted risk analysis' },
    { description: 'Automated insurance premium calculation with real-time risk modeling' },
    { description: 'Resolution planning system with asset valuation and bidding platform' },
    { description: 'Regulatory data warehouse with automated compliance validation' },
  ];

  return (
    <SolutionTemplate
      title="FDIC"
      icon={Landmark}
      description="Deposit insurance, bank supervision, and regulatory compliance"
      problems={problems}
      solutions={solutions}
    />
  );
}
