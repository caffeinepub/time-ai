import { Users } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function MajorUnions() {
  return (
    <SolutionTemplate
      title="Major Unions"
      icon={Users}
      description="Labor organizations representing workers across industries for collective bargaining and benefits"
      problems={[
        { description: 'Member management and communication at scale' },
        { description: 'Benefits administration and eligibility tracking' },
        { description: 'Dues collection and financial transparency' },
        { description: 'Voting and governance participation challenges' },
      ]}
      solutions={[
        { description: 'Unified member portal with mobile app for communication and updates' },
        { description: 'Automated benefits platform with real-time eligibility verification' },
        { description: 'Blockchain-based dues tracking with transparent financial reporting' },
        { description: 'Secure digital voting system with verifiable results and audit trails' },
      ]}
    />
  );
}
