import { Video } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Zoom() {
  const problems = [
    { description: 'Video quality optimization across varying network conditions' },
    { description: 'Large-scale webinar and virtual event hosting' },
    { description: 'Security and privacy in video communications' },
    { description: 'Integration with enterprise collaboration tools' },
  ];

  const solutions = [
    { description: 'Adaptive bitrate streaming with network quality monitoring' },
    { description: 'Scalable webinar infrastructure supporting 10,000+ participants' },
    { description: 'End-to-end encryption with waiting rooms and access controls' },
    { description: 'API platform with integrations for Slack, Teams, and calendar systems' },
  ];

  return (
    <SolutionTemplate
      title="Zoom"
      icon={Video}
      description="Video conferencing infrastructure and quality optimization"
      problems={problems}
      solutions={solutions}
    />
  );
}
