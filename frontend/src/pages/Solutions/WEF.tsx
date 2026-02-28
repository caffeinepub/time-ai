import { Users } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function WEF() {
  return (
    <SolutionTemplate
      title="WEF (World Economic Forum)"
      icon={Users}
      description="Global collaboration platform for public-private cooperation addressing economic and social challenges"
      problems={[
        { description: 'Coordination complexity across diverse stakeholder groups and international organizations' },
        { description: 'Data silos preventing unified insights across global economic indicators' },
        { description: 'Manual processes for event management and participant engagement at scale' },
        { description: 'Limited real-time collaboration tools for distributed policy working groups' },
      ]}
      solutions={[
        { description: 'AI-powered stakeholder coordination platform with automated scheduling and engagement tracking' },
        { description: 'Unified data aggregation system integrating economic, social, and environmental metrics' },
        { description: 'Intelligent event management with personalized agendas and networking recommendations' },
        { description: 'Real-time collaboration workspace with multilingual support and document version control' },
      ]}
    />
  );
}
