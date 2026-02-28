import { Coins } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Kraken() {
  return (
    <SolutionTemplate
      title="Kraken"
      icon={Coins}
      description="Cryptocurrency exchange known for security, liquidity, and advanced trading features"
      problems={[
        { description: 'Trading engine performance under extreme market volatility' },
        { description: 'Security threats including hacking attempts and social engineering' },
        { description: 'Liquidity depth for large institutional orders' },
        { description: 'Margin trading risk management and liquidation optimization' },
      ]}
      solutions={[
        { description: 'Low-latency trading engine with microsecond order matching' },
        { description: 'Multi-layered security with cold storage, 2FA, and global settings lock' },
        { description: 'Deep liquidity pools with market making and OTC desk' },
        { description: 'Advanced risk engine with real-time margin monitoring and partial liquidations' },
      ]}
    />
  );
}
