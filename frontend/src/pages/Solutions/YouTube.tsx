import { Video } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function YouTube() {
  const problems = [
    { description: 'Video transcoding and storage at exabyte scale' },
    { description: 'Content recommendation and watch time optimization' },
    { description: 'Creator monetization and ad revenue sharing' },
    { description: 'Copyright detection and content ID management' },
  ];

  const solutions = [
    { description: 'Distributed transcoding pipeline with adaptive bitrate encoding' },
    { description: 'Deep learning recommendation system with user engagement signals' },
    { description: 'Automated ad placement with creator revenue optimization' },
    { description: 'Content ID system with fingerprinting and automated claim resolution' },
  ];

  return (
    <SolutionTemplate
      title="YouTube"
      icon={Video}
      description="Video streaming, content delivery, and creator monetization"
      problems={problems}
      solutions={solutions}
    />
  );
}
