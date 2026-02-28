import { DollarSign } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function AlchemyACH() {
  return (
    <SolutionTemplate
      title="Alchemy Pay (ACH)"
      icon={DollarSign}
      description="Fiat-crypto payment gateway enabling seamless on/off ramp solutions"
      problems={[
        { description: 'Fiat-to-crypto conversion friction and high fees' },
        { description: 'Regulatory compliance across multiple jurisdictions' },
        { description: 'Payment method diversity and local currency support' },
        { description: 'Merchant integration complexity for crypto payments' },
      ]}
      solutions={[
        { description: 'Unified payment gateway supporting 300+ payment methods globally' },
        { description: 'Automated compliance with KYC/AML and regional regulations' },
        { description: 'Multi-currency support with competitive exchange rates' },
        { description: 'Simple merchant APIs with instant settlement and fiat conversion' },
      ]}
    />
  );
}
