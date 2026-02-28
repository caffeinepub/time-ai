import { Coins } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Stellar() {
  return (
    <SolutionTemplate
      title="Stellar (XLM)"
      icon={Coins}
      description="Open network for storing and moving money, focused on financial inclusion and micropayments"
      problems={[
        { description: 'Financial exclusion in underbanked regions with limited infrastructure' },
        { description: 'High remittance costs affecting low-income populations' },
        { description: 'Asset tokenization and issuance complexity' },
        { description: 'Decentralized exchange liquidity and price discovery' },
      ]}
      solutions={[
        { description: 'Low-cost payment network with 5-second settlement and minimal fees' },
        { description: 'Anchor network enabling fiat on/off ramps in emerging markets' },
        { description: 'Built-in asset issuance and tokenization with compliance controls' },
        { description: 'Decentralized exchange (DEX) with automated market making and pathfinding' },
      ]}
    />
  );
}
