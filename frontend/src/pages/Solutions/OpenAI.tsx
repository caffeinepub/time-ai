import { Zap } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function OpenAI() {
  return (
    <SolutionTemplate
      title="OpenAI"
      icon={Zap}
      description="AI research company developing advanced language models and AI systems"
      problems={[
        { description: 'Model inference costs and latency at scale' },
        { description: 'API rate limiting and capacity management' },
        { description: 'Content safety and misuse prevention' },
        { description: 'Model alignment and reducing harmful outputs' },
      ]}
      solutions={[
        { description: 'Optimized inference infrastructure with model quantization and caching' },
        { description: 'Dynamic capacity allocation with intelligent request routing' },
        { description: 'Multi-layered safety systems with real-time content filtering' },
        { description: 'RLHF and constitutional AI for improved alignment and safety' },
      ]}
    />
  );
}
