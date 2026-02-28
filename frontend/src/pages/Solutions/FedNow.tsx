import { Banknote } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function FedNow() {
  const problems = [
    { description: 'Real-time payment settlement 24/7/365 availability' },
    { description: 'Bank integration and adoption across diverse institutions' },
    { description: 'Fraud prevention in instant payment environment' },
    { description: 'Interoperability with existing payment systems' },
  ];

  const solutions = [
    { description: 'Instant settlement infrastructure with redundant systems' },
    { description: 'Phased rollout program with technical support and testing' },
    { description: 'Real-time fraud monitoring with transaction limits and controls' },
    { description: 'ISO 20022 messaging with ACH and wire transfer compatibility' },
  ];

  return (
    <SolutionTemplate
      title="FedNow"
      icon={Banknote}
      description="Real-time payment service and instant settlement"
      problems={problems}
      solutions={solutions}
    />
  );
}
