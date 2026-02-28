import { CreditCard } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Visa() {
  return (
    <SolutionTemplate
      title="Visa"
      icon={CreditCard}
      description="Global payments network processing billions of transactions with real-time fraud detection"
      problems={[
        { description: 'Transaction processing at massive scale (65,000 TPS capability)' },
        { description: 'Real-time fraud detection with minimal false positives' },
        { description: 'Cross-border payment complexity and currency conversion' },
        { description: 'Emerging payment methods and crypto integration' },
      ]}
      solutions={[
        { description: 'Distributed processing infrastructure with global redundancy and sub-second authorization' },
        { description: 'AI-powered fraud detection with behavioral analysis and risk scoring' },
        { description: 'Multi-currency platform with competitive FX rates and instant settlement' },
        { description: 'Crypto-linked cards and stablecoin settlement pilots for digital assets' },
      ]}
    />
  );
}
