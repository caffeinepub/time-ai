import { CreditCard } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Stripe() {
  return (
    <SolutionTemplate
      title="Stripe"
      icon={CreditCard}
      description="Developer-first payment infrastructure powering online businesses globally"
      problems={[
        { description: 'Global expansion complexity with local payment methods' },
        { description: 'Developer experience and API simplicity at scale' },
        { description: 'Regulatory compliance across 45+ countries' },
        { description: 'Revenue optimization and payment success rates' },
      ]}
      solutions={[
        { description: 'Unified API supporting 135+ currencies and local payment methods' },
        { description: 'Developer-friendly SDKs with comprehensive documentation and testing tools' },
        { description: 'Automated compliance with PCI DSS, SCA, and regional regulations' },
        { description: 'Machine learning-powered payment optimization and retry logic' },
      ]}
    />
  );
}
