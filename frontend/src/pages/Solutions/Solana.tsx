import { Zap } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Solana() {
  return (
    <SolutionTemplate
      title="Solana Solutions"
      icon={Zap}
      description="Fixed problems, resolutions, and solutions for Solana blockchain operations"
      problems={[
        { description: 'Network congestion and transaction failures during high load' },
        { description: 'Program deployment and upgrade complexity' },
        { description: 'Account rent and storage cost management' },
        { description: 'Cross-program invocation debugging challenges' },
      ]}
      solutions={[
        { description: 'Priority fee optimization and transaction retry strategies' },
        { description: 'Automated deployment pipelines with versioning' },
        { description: 'Rent-exempt account design and storage optimization' },
        { description: 'Enhanced logging and program simulation tools' },
      ]}
    />
  );
}
