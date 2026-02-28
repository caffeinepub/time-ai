export interface WorkflowPack {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
}

export const workflowPacks: WorkflowPack[] = [
  {
    id: 'compliance-audit-trail',
    name: 'Compliance Audit Trail',
    description: 'Automated compliance tracking and audit trail generation for regulatory requirements. Captures all workflow actions with immutable timestamps and evidence linking.',
    category: 'Compliance',
    price: '$299/month',
  },
  {
    id: 'risk-assessment-workflow',
    name: 'Risk Assessment Workflow',
    description: 'Comprehensive risk evaluation framework with automated scoring, mitigation tracking, and escalation protocols for enterprise risk management.',
    category: 'Compliance',
    price: '$349/month',
  },
  {
    id: 'operational-efficiency-tracker',
    name: 'Operational Efficiency Tracker',
    description: 'Real-time monitoring and optimization of operational workflows with KPI tracking, bottleneck identification, and performance analytics.',
    category: 'Operations',
    price: '$199/month',
  },
  {
    id: 'supply-chain-orchestration',
    name: 'Supply Chain Orchestration',
    description: 'End-to-end supply chain workflow automation including inventory management, vendor coordination, and logistics optimization.',
    category: 'Operations',
    price: '$449/month',
  },
  {
    id: 'business-intelligence-pipeline',
    name: 'Business Intelligence Pipeline',
    description: 'Automated data aggregation, transformation, and reporting workflows for executive dashboards and strategic decision-making.',
    category: 'Analytics',
    price: '$399/month',
  },
  {
    id: 'predictive-analytics-engine',
    name: 'Predictive Analytics Engine',
    description: 'Machine learning-powered forecasting workflows for demand prediction, trend analysis, and proactive business planning.',
    category: 'Analytics',
    price: '$499/month',
  },
  {
    id: 'security-incident-response',
    name: 'Security Incident Response',
    description: 'Automated security event detection, triage, and response workflows with threat intelligence integration and escalation procedures.',
    category: 'Security',
    price: '$549/month',
  },
  {
    id: 'access-control-management',
    name: 'Access Control Management',
    description: 'Identity and access management workflows including user provisioning, permission reviews, and compliance attestation.',
    category: 'Security',
    price: '$249/month',
  },
  {
    id: 'document-approval-workflow',
    name: 'Document Approval Workflow',
    description: 'Multi-stage document review and approval process with version control, stakeholder notifications, and audit logging.',
    category: 'Workflow Automation',
    price: '$149/month',
  },
  {
    id: 'contract-lifecycle-management',
    name: 'Contract Lifecycle Management',
    description: 'Complete contract management from creation through execution, renewal tracking, and obligation monitoring.',
    category: 'Workflow Automation',
    price: '$399/month',
  },
  {
    id: 'financial-reporting-suite',
    name: 'Financial Reporting Suite',
    description: 'Automated financial close processes, regulatory reporting generation, and variance analysis workflows for finance teams.',
    category: 'Reporting',
    price: '$349/month',
  },
  {
    id: 'executive-dashboard-builder',
    name: 'Executive Dashboard Builder',
    description: 'Customizable executive reporting workflows with real-time data visualization, KPI tracking, and automated distribution.',
    category: 'Reporting',
    price: '$299/month',
  },
];
