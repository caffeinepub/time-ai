// Compliance framework control catalogs for Evidence & Compliance Map

export interface ComplianceControl {
  id: string;
  title: string;
  description: string;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  controls: ComplianceControl[];
}

export const complianceFrameworks: ComplianceFramework[] = [
  {
    id: 'eu-ai-act',
    name: 'EU AI Act',
    description: 'European Union Artificial Intelligence Act compliance requirements',
    controls: [
      {
        id: 'eu-ai-act-1',
        title: 'Risk Assessment Documentation',
        description: 'Document and assess AI system risks according to EU AI Act classification',
      },
      {
        id: 'eu-ai-act-2',
        title: 'Data Governance',
        description: 'Establish data quality, relevance, and representativeness standards',
      },
      {
        id: 'eu-ai-act-3',
        title: 'Technical Documentation',
        description: 'Maintain comprehensive technical documentation of AI system design and operation',
      },
      {
        id: 'eu-ai-act-4',
        title: 'Transparency Requirements',
        description: 'Ensure AI system transparency and user awareness of AI interaction',
      },
      {
        id: 'eu-ai-act-5',
        title: 'Human Oversight',
        description: 'Implement human oversight mechanisms for high-risk AI systems',
      },
      {
        id: 'eu-ai-act-6',
        title: 'Accuracy & Robustness',
        description: 'Demonstrate AI system accuracy, robustness, and cybersecurity measures',
      },
      {
        id: 'eu-ai-act-7',
        title: 'Conformity Assessment',
        description: 'Complete conformity assessment procedures before market deployment',
      },
      {
        id: 'eu-ai-act-8',
        title: 'Post-Market Monitoring',
        description: 'Establish post-market monitoring and incident reporting procedures',
      },
    ],
  },
  {
    id: 'iso-42001',
    name: 'ISO 42001',
    description: 'ISO/IEC 42001 AI Management System standard',
    controls: [
      {
        id: 'iso-42001-1',
        title: 'AI Management System Scope',
        description: 'Define and document the scope of the AI management system',
      },
      {
        id: 'iso-42001-2',
        title: 'AI Policy & Objectives',
        description: 'Establish AI policy and measurable objectives aligned with organizational strategy',
      },
      {
        id: 'iso-42001-3',
        title: 'Risk & Opportunity Assessment',
        description: 'Identify and assess risks and opportunities related to AI systems',
      },
      {
        id: 'iso-42001-4',
        title: 'AI Lifecycle Management',
        description: 'Implement controls across the AI system lifecycle (design, development, deployment, operation)',
      },
      {
        id: 'iso-42001-5',
        title: 'Data Management',
        description: 'Establish data quality, security, and privacy controls for AI training and operation',
      },
      {
        id: 'iso-42001-6',
        title: 'AI System Validation',
        description: 'Validate AI system performance, accuracy, and reliability',
      },
      {
        id: 'iso-42001-7',
        title: 'Competence & Awareness',
        description: 'Ensure personnel competence and awareness for AI system roles',
      },
      {
        id: 'iso-42001-8',
        title: 'Monitoring & Measurement',
        description: 'Monitor, measure, analyze, and evaluate AI system performance',
      },
      {
        id: 'iso-42001-9',
        title: 'Continual Improvement',
        description: 'Implement continual improvement processes for the AI management system',
      },
    ],
  },
];

export function getFrameworkById(id: string): ComplianceFramework | undefined {
  return complianceFrameworks.find((f) => f.id === id);
}

export function getControlById(frameworkId: string, controlId: string): ComplianceControl | undefined {
  const framework = getFrameworkById(frameworkId);
  return framework?.controls.find((c) => c.id === controlId);
}
