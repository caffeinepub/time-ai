import { Globe } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function UN() {
  return (
    <SolutionTemplate
      title="UN (United Nations)"
      icon={Globe}
      description="International organization coordinating humanitarian efforts, peacekeeping, and sustainable development globally"
      problems={[
        { description: 'Fragmented communication systems across agencies and field operations' },
        { description: 'Humanitarian logistics challenges in crisis response and resource allocation' },
        { description: 'Data management complexity across 193 member states and multiple languages' },
        { description: 'Slow decision-making processes due to bureaucratic layers and manual workflows' },
      ]}
      solutions={[
        { description: 'Unified communication platform with real-time translation and secure messaging' },
        { description: 'AI-driven logistics optimization for humanitarian aid distribution and supply chain management' },
        { description: 'Centralized data platform with multilingual support and automated reporting' },
        { description: 'Workflow automation system streamlining approvals and document processing' },
      ]}
    />
  );
}
