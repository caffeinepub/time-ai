import { CreditCard } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Mastercard() {
  return (
    <SolutionTemplate
      title="Mastercard"
      icon={CreditCard}
      description="Payment technology company connecting consumers, businesses, and governments globally"
      problems={[
        { description: 'Payment network resilience and uptime requirements (99.999%)' },
        { description: 'Fraud prevention across diverse payment channels' },
        { description: 'Open banking and API ecosystem development' },
        { description: 'Cryptocurrency and CBDC integration strategy' },
      ]}
      solutions={[
        { description: 'Multi-region active-active architecture with automatic failover' },
        { description: 'Decision Intelligence platform with AI-driven fraud and risk management' },
        { description: 'Open Banking APIs with PSD2 compliance and developer portal' },
        { description: 'Crypto Secure program and CBDC testing with central banks' },
      ]}
    />
  );
}
