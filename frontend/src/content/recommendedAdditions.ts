export interface Addition {
  title: string;
  description: string;
  keywords?: string[];
}

export interface AdditionCategory {
  name: string;
  additions: Addition[];
}

export const recommendedAdditions: AdditionCategory[] = [
  {
    name: 'Financial Services',
    additions: [
      {
        title: 'Automated Compliance Evidence Maps',
        description: 'Generate comprehensive compliance evidence for MiCA, ISO 42001, and AI Act regulations with automated mapping and documentation.',
        keywords: ['compliance', 'regulation', 'evidence', 'MiCA', 'ISO 42001', 'AI Act'],
      },
      {
        title: 'Autonomous Financial Process Auditors',
        description: 'AI-driven auditors that continuously monitor variance, reconciliation, and journal anomaly checks across financial operations.',
        keywords: ['audit', 'finance', 'monitoring', 'anomaly detection', 'reconciliation'],
      },
      {
        title: 'Instant AI-Managed Onboarding',
        description: 'Automated onboarding workflows for businesses and institutional clients with intelligent document verification and compliance checks.',
        keywords: ['onboarding', 'kyc', 'verification', 'automation', 'institutional'],
      },
      {
        title: 'Intelligent Fraud-Threat Matrix',
        description: 'Real-time fraud detection synced with audit logs and agent registry for comprehensive threat monitoring and prevention.',
        keywords: ['fraud', 'security', 'threat detection', 'monitoring', 'prevention'],
      },
    ],
  },
  {
    name: 'Supply Chain & Logistics',
    additions: [
      {
        title: 'Predictive Supply Chain Exception Engine',
        description: 'AI-powered prediction of delays, customs blockages, and document mismatches before they impact operations.',
        keywords: ['supply chain', 'prediction', 'logistics', 'optimization', 'customs'],
      },
      {
        title: 'AI-Driven Micro-Risk Analysis',
        description: 'Per-shipment risk analysis using TIME agent for granular risk assessment and mitigation strategies.',
        keywords: ['risk analysis', 'shipping', 'assessment', 'logistics', 'mitigation'],
      },
      {
        title: 'Automated ISO/TC 307 Validation',
        description: 'Automated validation workflows for ISO/TC 307 and MLETR document compliance and authenticity verification.',
        keywords: ['iso', 'compliance', 'validation', 'standards', 'ISO/TC 307', 'MLETR'],
      },
      {
        title: 'Real-Time Trade Compliance Screening',
        description: 'Continuous sanctions screening and trade compliance monitoring across all shipments and transactions.',
        keywords: ['compliance', 'sanctions', 'trade', 'screening', 'monitoring'],
      },
    ],
  },
  {
    name: 'World Trade & Government',
    additions: [
      {
        title: 'Universal Trade Document Classifier',
        description: 'AI-powered classification and authenticity checks for trade documents with AI Notary integration.',
        keywords: ['trade', 'documents', 'classification', 'verification', 'AI Notary'],
      },
      {
        title: 'Automated Risk Scoring for Trade',
        description: 'Intelligent risk scoring for imports and exports across 200+ jurisdictions with real-time updates.',
        keywords: ['risk scoring', 'trade', 'international', 'compliance', 'imports', 'exports'],
      },
      {
        title: 'Cryptographic Trade Audit Trails',
        description: 'Time-stamped, cryptographically verifiable audit trails for all trade transactions and documentation.',
        keywords: ['audit trail', 'blockchain', 'verification', 'trade', 'cryptographic'],
      },
      {
        title: 'AI-Managed Regulatory Update Tracker',
        description: 'Automated tracking and notification system for regulatory changes including laws, sanctions, and tariffs.',
        keywords: ['regulation', 'tracking', 'compliance', 'updates', 'sanctions', 'tariffs'],
      },
    ],
  },
  {
    name: 'Enterprise Operations',
    additions: [
      {
        title: 'Agent‑Native Infrastructure Layer',
        description: 'Enterprise-grade infrastructure designed for agent-speed workloads, handling massive bursty parallel operations with High-Concurrency Router for intelligent request distribution, Agent Burst Guard for DDoS-like overload prevention, controlled fan-out/fan-in coordination, predictable latency under extreme agent activity, and comprehensive policy/state/audit enforcement during rapid operations. Makes TIME AI the only platform capable of running enterprise-scale autonomous workflows reliably at agent speed rather than human speed.',
        keywords: ['agent-native', 'infrastructure', 'burst', 'fan-out', 'fan-in', 'latency', 'orchestration', 'concurrency', 'audit', 'governance', 'high-performance', 'agent-speed', 'workload', 'agent burst guard', 'high-concurrency router'],
      },
      {
        title: 'High-Concurrency Router',
        description: 'Advanced routing subsystem that intelligently distributes thousands of concurrent agent requests across infrastructure resources. Provides dynamic load balancing, priority-based queuing, circuit breaking, and adaptive routing strategies to maintain system responsiveness when autonomous agents generate massive parallel workloads. Essential component for enterprise-scale agent orchestration.',
        keywords: ['router', 'high-concurrency', 'load balancing', 'routing', 'distribution', 'circuit breaker', 'priority queue', 'agent traffic', 'scalability', 'orchestration', 'parallel processing', 'workload management'],
      },
      {
        title: 'Agent Burst Guard',
        description: 'Intelligent admission control and backpressure system that protects enterprise infrastructure from agent-generated traffic bursts. Prevents DDoS-like overload scenarios when hundreds of autonomous agents simultaneously spawn parallel operations, ensuring system stability through rate limiting, queue management, and graceful degradation under extreme concurrency.',
        keywords: ['burst', 'overload', 'concurrency', 'backpressure', 'admission control', 'rate limiting', 'agent traffic', 'ddos prevention', 'queue management', 'stability', 'high-concurrency', 'traffic shaping'],
      },
      {
        title: 'End-to-End AI Governance Dashboard',
        description: 'Comprehensive dashboard for high-risk AI systems covering policy, evidence, risk management, and incident tracking.',
        keywords: ['governance', 'dashboard', 'risk management', 'compliance', 'AI systems'],
      },
      {
        title: 'Workflow-as-Infrastructure Templates',
        description: 'Pre-built workflow templates for HR, legal, procurement, and operations with customizable automation.',
        keywords: ['workflow', 'automation', 'templates', 'operations', 'HR', 'legal', 'procurement'],
      },
      {
        title: 'AI Workforce Orchestration',
        description: 'Agentic task automation organized by department with intelligent workload distribution and prioritization.',
        keywords: ['automation', 'workforce', 'orchestration', 'ai agents', 'task management'],
      },
      {
        title: 'Internal Control Monitoring',
        description: 'Continuous compliance verification and internal control monitoring with automated reporting and alerts.',
        keywords: ['monitoring', 'compliance', 'controls', 'verification', 'reporting'],
      },
    ],
  },
  {
    name: 'Education & Workforce Development',
    additions: [
      {
        title: 'TRAV-Driven Learning Engines',
        description: 'Adaptive learning systems for schools, businesses, and government with personalized curriculum paths.',
        keywords: ['education', 'learning', 'training', 'development', 'TRAV AI', 'adaptive'],
      },
      {
        title: 'Custom Curriculum Builder',
        description: 'AI-powered curriculum builder tied to skills audits and competency frameworks for targeted learning.',
        keywords: ['curriculum', 'education', 'skills', 'training', 'competency'],
      },
      {
        title: 'AI-Based Testing & Certification',
        description: 'Automated testing, credential verification, and certification issuance with blockchain-backed credentials.',
        keywords: ['testing', 'certification', 'credentials', 'verification', 'blockchain'],
      },
    ],
  },
  {
    name: 'Healthcare & Life Sciences',
    additions: [
      {
        title: 'Clinical Document Workflow',
        description: 'End-to-end intake, validation, and compliance workflow for clinical documents with automated verification.',
        keywords: ['healthcare', 'clinical', 'documents', 'compliance', 'workflow'],
      },
      {
        title: 'TIME-Powered Healthcare Risk Scoring',
        description: 'AI-driven risk scoring for billing, approvals, and audit trails in healthcare operations.',
        keywords: ['healthcare', 'risk scoring', 'billing', 'audit', 'TIME AI'],
      },
      {
        title: 'Medical Record Authentication',
        description: 'AI Notary integration for medical record authenticity verification and chain of custody tracking.',
        keywords: ['medical records', 'authentication', 'verification', 'healthcare', 'AI Notary'],
      },
    ],
  },
  {
    name: 'Manufacturing & Industrial',
    additions: [
      {
        title: 'Predictive Maintenance Orchestration',
        description: 'AI-powered predictive maintenance packs with automated scheduling and resource optimization.',
        keywords: ['maintenance', 'manufacturing', 'prediction', 'optimization', 'scheduling'],
      },
      {
        title: 'Incident Analysis Engine',
        description: 'Connected incident analysis with zero-trust registry for comprehensive safety and quality monitoring.',
        keywords: ['incident', 'analysis', 'safety', 'quality', 'zero-trust'],
      },
      {
        title: 'Real-Time Compliance Checks',
        description: 'Continuous compliance verification for safety standards and ISO requirements in manufacturing.',
        keywords: ['compliance', 'safety', 'iso', 'manufacturing', 'standards'],
      },
    ],
  },
  {
    name: 'Cyber, Identity & Trust',
    additions: [
      {
        title: 'Continuous AI Threat Monitoring',
        description: 'TIME-driven forensic logging and continuous threat monitoring with automated incident response.',
        keywords: ['security', 'threat monitoring', 'forensics', 'TIME AI', 'incident response'],
      },
      {
        title: 'Agent Behavioral Drift Detection',
        description: 'Real-time monitoring to ensure AI agents maintain goal alignment and detect behavioral deviations.',
        keywords: ['ai safety', 'monitoring', 'behavioral analysis', 'alignment', 'drift detection'],
      },
      {
        title: 'Emergency Runtime Freeze',
        description: 'Emergency shutdown capability with rollback snapshots for critical security incidents.',
        keywords: ['security', 'emergency response', 'rollback', 'shutdown', 'incident'],
      },
    ],
  },
  {
    name: 'Crypto, Web3 & Payments',
    additions: [
      {
        title: 'Tokenized Access Governance',
        description: 'Token-based access control for enterprise and government partners with granular permissions.',
        keywords: ['tokenization', 'access control', 'governance', 'permissions', 'enterprise'],
      },
      {
        title: 'AI-Driven Transaction Classification',
        description: 'Automated transaction classification for AML compliance with audit-aligned reporting.',
        keywords: ['aml', 'compliance', 'transactions', 'classification', 'reporting'],
      },
      {
        title: 'Multi-Asset Workflow Payments',
        description: 'Integrated payment workflows for payroll, rewards, and vendor automation across multiple assets.',
        keywords: ['payments', 'workflow', 'automation', 'payroll', 'multi-asset'],
      },
    ],
  },
  {
    name: 'Cross-Sector High ROI',
    additions: [
      {
        title: 'Unified Evidence Layer',
        description: 'Comprehensive evidence layer merging audit logs, policies, agent outputs, and compliance documents into a single source of truth.',
        keywords: ['evidence', 'audit', 'compliance', 'unified', 'source of truth'],
      },
      {
        title: 'AI Contract Manager',
        description: 'Intelligent contract validation, negotiation suggestions, risk tagging, and lifecycle management.',
        keywords: ['contracts', 'validation', 'risk management', 'lifecycle', 'negotiation'],
      },
      {
        title: 'AI Notary Deep Integration',
        description: 'Enhanced AI Notary capabilities including document authenticity, timestamping, verification, and comprehensive audit trails.',
        keywords: ['ai notary', 'verification', 'authentication', 'timestamping', 'audit trails'],
      },
      {
        title: 'Sector-Specific Workflow Packs',
        description: 'Pre-configured workflow packages for manufacturing, trade, healthcare, education, government, and defense sectors.',
        keywords: ['workflows', 'templates', 'industry', 'sector-specific', 'pre-configured'],
      },
    ],
  },
];
