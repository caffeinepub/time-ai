import { Landmark } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function OpenEden() {
  return (
    <SolutionTemplate
      title="OpenEden"
      icon={Landmark}
      description="Tokenized T-Bill platform providing institutional-grade yield on-chain"
      problems={[
        { description: 'Limited on-chain access to risk-free government securities' },
        { description: 'Yield generation complexity for institutional crypto holders' },
        { description: 'Regulatory compliance for tokenized securities' },
        { description: 'Liquidity and redemption mechanisms for tokenized T-Bills' },
      ]}
      solutions={[
        { description: 'Tokenized U.S. Treasury Bills with 1:1 backing and daily NAV updates' },
        { description: 'Institutional-grade custody with qualified custodians and insurance' },
        { description: 'Regulatory framework with SEC compliance and investor accreditation' },
        { description: 'On-chain liquidity with instant minting and T+1 redemption' },
      ]}
    />
  );
}
