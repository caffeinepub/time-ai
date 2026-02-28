import { Cloud } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Salesforce() {
  return (
    <SolutionTemplate
      title="Salesforce"
      icon={Cloud}
      description="Leading CRM platform with AI-powered customer relationship management"
      problems={[
        { description: 'Data quality and deduplication across customer records' },
        { description: 'AI integration and Einstein analytics adoption' },
        { description: 'Multi-cloud platform complexity (Sales, Service, Marketing, Commerce)' },
        { description: 'Customization and AppExchange ecosystem management' },
      ]}
      solutions={[
        { description: 'AI-powered data cleansing with duplicate detection and record merging' },
        { description: 'Einstein AI platform with predictive analytics and natural language processing' },
        { description: 'Unified Customer 360 platform with cross-cloud data integration' },
        { description: 'AppExchange marketplace with security review and compatibility testing' },
      ]}
    />
  );
}
