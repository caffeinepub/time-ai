import { CreditCard } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function PayPal() {
  const problems = [
    { description: 'Global payment processing with multi-currency support' },
    { description: 'Fraud detection and chargeback management at scale' },
    { description: 'Merchant integration and API reliability' },
    { description: 'Regulatory compliance across international markets' },
  ];

  const solutions = [
    { description: 'Multi-currency payment platform with real-time exchange rates' },
    { description: 'AI-powered fraud prevention with transaction risk scoring' },
    { description: 'Developer-friendly API with comprehensive SDKs and documentation' },
    { description: 'Automated compliance engine with jurisdiction-specific rules' },
  ];

  return (
    <SolutionTemplate
      title="PayPal"
      icon={CreditCard}
      description="Digital payments, fraud prevention, and global transactions"
      problems={problems}
      solutions={solutions}
    />
  );
}
