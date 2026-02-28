import { Shield } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function StoryProtocol() {
  return (
    <SolutionTemplate
      title="Story Protocol (IP)"
      icon={Shield}
      description="Programmable IP infrastructure enabling creators to license, remix, and monetize intellectual property"
      problems={[
        { description: 'IP licensing complexity and manual contract negotiation' },
        { description: 'Royalty tracking and distribution inefficiencies' },
        { description: 'Derivative work attribution and permission management' },
        { description: 'Cross-platform IP rights enforcement' },
      ]}
      solutions={[
        { description: 'Programmable IP licenses with automated terms and smart contract execution' },
        { description: 'On-chain royalty distribution with transparent revenue sharing' },
        { description: 'IP graph tracking provenance and derivative relationships' },
        { description: 'Universal IP registry with cross-platform rights management' },
      ]}
    />
  );
}
