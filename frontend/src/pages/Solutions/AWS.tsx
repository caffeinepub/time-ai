import { Server } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function AWS() {
  return (
    <SolutionTemplate
      title="AWS Solutions"
      icon={Server}
      description="Fixed problems, resolutions, and solutions for Amazon Web Services operations"
      problems={[
        { description: 'EC2 instance sprawl and underutilization' },
        { description: 'S3 storage costs and data lifecycle management' },
        { description: 'Lambda cold start latency and timeout issues' },
        { description: 'VPC networking complexity and security group sprawl' },
      ]}
      solutions={[
        { description: 'Automated instance rightsizing and reserved capacity planning' },
        { description: 'Intelligent tiering and lifecycle policies for S3' },
        { description: 'Provisioned concurrency and function optimization' },
        { description: 'Network architecture simplification and security automation' },
      ]}
    />
  );
}
