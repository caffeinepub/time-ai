import { Wallet } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function StargazerWallet() {
  return (
    <SolutionTemplate
      title="Stargazer Wallet"
      icon={Wallet}
      description="Multi-chain wallet supporting Constellation Network and Ethereum ecosystems"
      problems={[
        { description: 'Multi-chain wallet complexity and key management' },
        { description: 'Asset visibility across different blockchain networks' },
        { description: 'DApp connectivity and transaction signing UX' },
        { description: 'Security risks with browser extension wallets' },
      ]}
      solutions={[
        { description: 'Unified interface managing DAG and EVM assets with single seed phrase' },
        { description: 'Portfolio dashboard aggregating balances across all supported chains' },
        { description: 'Seamless DApp integration with WalletConnect and native connectors' },
        { description: 'Hardware wallet support and biometric authentication for enhanced security' },
      ]}
    />
  );
}
