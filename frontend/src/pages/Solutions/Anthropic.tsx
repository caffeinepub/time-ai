import { Zap } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Anthropic() {
  return (
    <SolutionTemplate
      title="Anthropic"
      icon={Zap}
      description="AI safety research with constitutional AI and scaling challenges"
      problems={[
        { description: 'Constitutional AI alignment requires complex multi-stage training pipelines' },
        { description: 'Model scaling introduces emergent behaviors that are difficult to predict' },
        { description: 'Safety evaluation frameworks need continuous updates as capabilities expand' },
        { description: 'Balancing helpfulness with harmlessness creates optimization trade-offs' },
      ]}
      solutions={[
        { description: 'Implement automated constitutional AI training with reinforcement learning from human feedback (RLHF)' },
        { description: 'Deploy comprehensive safety benchmarking across multiple evaluation dimensions' },
        { description: 'Use interpretability tools to monitor and explain model decision-making processes' },
        { description: 'Establish red-teaming protocols to identify and mitigate potential misuse vectors' },
      ]}
    />
  );
}
