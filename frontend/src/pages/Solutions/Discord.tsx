import { MessageCircle } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Discord() {
  const problems = [
    { description: 'Real-time messaging infrastructure for millions of concurrent users' },
    { description: 'Voice and video chat quality in large servers' },
    { description: 'Bot ecosystem management and API rate limiting' },
    { description: 'Community moderation tools and safety features' },
  ];

  const solutions = [
    { description: 'WebSocket-based messaging with horizontal scaling and sharding' },
    { description: 'WebRTC voice infrastructure with regional edge servers' },
    { description: 'Bot API with intelligent rate limiting and abuse prevention' },
    { description: 'AutoMod system with customizable rules and AI-assisted moderation' },
  ];

  return (
    <SolutionTemplate
      title="Discord"
      icon={MessageCircle}
      description="Community platform scaling and real-time communication"
      problems={problems}
      solutions={solutions}
    />
  );
}
