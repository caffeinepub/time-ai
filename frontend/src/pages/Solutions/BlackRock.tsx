import { Landmark } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function BlackRock() {
  return (
    <SolutionTemplate
      title="BlackRock"
      icon={Landmark}
      description="World's largest asset manager exploring blockchain for tokenization and institutional DeFi"
      problems={[
        { description: 'Asset tokenization at institutional scale with regulatory compliance' },
        { description: 'Portfolio management efficiency across traditional and digital assets' },
        { description: 'Institutional DeFi access with risk management and custody' },
        { description: 'ESG tracking and reporting for sustainable investments' },
      ]}
      solutions={[
        { description: 'Aladdin platform integration with blockchain for tokenized asset management' },
        { description: 'Unified portfolio view combining traditional securities and digital assets' },
        { description: 'Institutional DeFi gateway with qualified custody and risk controls' },
        { description: 'Blockchain-based ESG data verification and impact measurement' },
      ]}
    />
  );
}
