import { Coins } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Gemini() {
  const problems = [
    { description: 'Regulatory compliance for licensed crypto exchange' },
    { description: 'Institutional custody and security requirements' },
    { description: 'Fiat on-ramp and banking relationships' },
    { description: 'Trading engine performance and liquidity management' },
  ];

  const solutions = [
    { description: 'SOC 2 compliant infrastructure with regulatory reporting automation' },
    { description: 'Multi-signature cold storage with insurance coverage' },
    { description: 'Banking partnerships with ACH and wire transfer integration' },
    { description: 'High-frequency trading engine with market making algorithms' },
  ];

  return (
    <SolutionTemplate
      title="Gemini"
      icon={Coins}
      description="Regulated crypto exchange and custody solutions"
      problems={problems}
      solutions={solutions}
    />
  );
}
