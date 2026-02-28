import { VerificationStatus } from '@/backend';

export interface AgentRegistryEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  capabilities: string[];
  credentials: string[];
  policyScope: string;
  issueDate: string;
  verificationStatus: VerificationStatus;
}

export const agentRegistryEntries: AgentRegistryEntry[] = [
  {
    id: 'agent-001',
    title: 'Compliance Sentinel',
    description: 'Enterprise-grade compliance monitoring and policy enforcement agent with real-time regulatory tracking.',
    category: 'Compliance & Governance',
    capabilities: [
      'Real-time Compliance Monitoring',
      'Policy Enforcement',
      'Regulatory Change Detection',
      'Audit Trail Generation',
      'Risk Assessment',
      'Automated Reporting',
    ],
    credentials: [
      'ISO 27001 Certified Operations',
      'SOC 2 Type II Compliance',
      'GDPR Data Protection Framework',
      'NIST Cybersecurity Framework Alignment',
    ],
    policyScope: 'Enterprise-Wide',
    issueDate: '2024-03-01',
    verificationStatus: VerificationStatus.verified,
  },
  {
    id: 'agent-002',
    title: 'Workflow Orchestrator',
    description: 'Advanced workflow automation and orchestration agent for complex enterprise processes.',
    category: 'Workflow Automation',
    capabilities: [
      'Multi-Step Workflow Orchestration',
      'Conditional Logic Processing',
      'Integration Management',
      'Error Handling & Recovery',
      'Performance Optimization',
      'Resource Allocation',
    ],
    credentials: [
      'Enterprise Architecture Certification',
      'Process Automation Specialist',
      'Integration Platform Expertise',
      'DevOps Best Practices',
    ],
    policyScope: 'Department-Level',
    issueDate: '2024-03-15',
    verificationStatus: VerificationStatus.verified,
  },
  {
    id: 'agent-003',
    title: 'Data Analytics Engine',
    description: 'Intelligent data analysis and insights generation agent with predictive capabilities.',
    category: 'Analytics & Intelligence',
    capabilities: [
      'Advanced Data Analysis',
      'Predictive Modeling',
      'Pattern Recognition',
      'Anomaly Detection',
      'Visualization Generation',
      'Trend Forecasting',
    ],
    credentials: [
      'Data Science Professional Certification',
      'Machine Learning Expertise',
      'Statistical Analysis Proficiency',
      'Business Intelligence Specialization',
    ],
    policyScope: 'Project-Specific',
    issueDate: '2024-03-29',
    verificationStatus: VerificationStatus.pending,
  },
  {
    id: 'agent-004',
    title: 'Security Guardian',
    description: 'Proactive security monitoring and threat detection agent with incident response capabilities.',
    category: 'Security & Protection',
    capabilities: [
      'Threat Detection & Analysis',
      'Vulnerability Scanning',
      'Incident Response',
      'Security Policy Enforcement',
      'Access Control Management',
      'Forensic Analysis',
    ],
    credentials: [
      'CISSP Certified Security Professional',
      'Ethical Hacking Certification',
      'Security Operations Center Experience',
      'Incident Response Training',
    ],
    policyScope: 'Enterprise-Wide',
    issueDate: '2024-04-12',
    verificationStatus: VerificationStatus.verified,
  },
  {
    id: 'agent-005',
    title: 'Customer Experience Optimizer',
    description: 'Customer journey analysis and experience optimization agent with personalization capabilities.',
    category: 'Customer Experience',
    capabilities: [
      'Journey Mapping & Analysis',
      'Sentiment Analysis',
      'Personalization Engine',
      'Feedback Processing',
      'Engagement Optimization',
      'Churn Prediction',
    ],
    credentials: [
      'Customer Experience Management Certification',
      'UX Research Methodology',
      'Behavioral Analytics Expertise',
      'CRM Platform Integration',
    ],
    policyScope: 'Department-Level',
    issueDate: '2024-04-26',
    verificationStatus: VerificationStatus.unverified,
  },
  {
    id: 'agent-006',
    title: 'Resource Allocation Manager',
    description: 'Intelligent resource planning and allocation agent for optimal utilization across projects.',
    category: 'Resource Management',
    capabilities: [
      'Resource Planning & Scheduling',
      'Capacity Analysis',
      'Utilization Optimization',
      'Conflict Resolution',
      'Budget Management',
      'Performance Tracking',
    ],
    credentials: [
      'Project Management Professional (PMP)',
      'Resource Management Certification',
      'Agile Methodology Expertise',
      'Financial Planning Knowledge',
    ],
    policyScope: 'Project-Specific',
    issueDate: '2024-05-10',
    verificationStatus: VerificationStatus.pending,
  },
];
