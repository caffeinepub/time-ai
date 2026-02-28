import { routes } from '../router/routes';

export interface SearchEntry {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
}

export interface SearchResult extends SearchEntry {
  score: number;
}

// Generate search entries from routes object
const routeSearchEntries: SearchEntry[] = Object.values(routes)
  .filter((route) => {
    // Filter out deprecated routes and routes with no keywords
    const isDeprecated = 'deprecated' in route && route.deprecated;
    return !isDeprecated && route.keywords && route.keywords.length > 0;
  })
  .map((route) => ({
    path: route.path,
    title: route.label,
    description: route.description || '',
    keywords: route.keywords || [],
    category: route.category || 'general',
  }));

// Additional search entries for content not directly in routes
const additionalSearchEntries: SearchEntry[] = [
  {
    path: '/worlds-first',
    title: "World's First Innovations",
    description: 'Explore 50 groundbreaking innovations in AI governance, dual-agent architecture, and enterprise compliance',
    keywords: [
      'innovations',
      'world first',
      'breakthrough',
      'dual-agent governance',
      'ai notary',
      'agent identity vault',
      'live runtime risk index',
      'continuous authorization',
      'active drift detection',
      'policy card engine',
      'policy version conflict',
      'conformance fsm',
      'graduated containment',
      'coordination transparency',
      'live coordination monitor',
      'interaction logging',
      'intervention hooks',
      'boundary condition',
      'agent capability proof',
      'structured output contract',
      'multi-agent simulation',
      'semantic meaning telemetry',
      'trust score',
      'goal alignment',
      'exception explainer',
      'role-matching',
      'scenario simulator',
      'simulated risk events',
      'agent os dashboard',
      'constraint-first workflow',
      'unified dual-agent control',
      'internal agent control',
      'agent identity type',
      'owasp agent safety',
      'recursive behavior shield',
      'multi-agent fail-safe',
      'agentic fingerprinting',
      'policy-bound execution',
      'work-policy contracts',
      'proof bundle',
      'governance-tier escalation',
      'coordination envelope',
      'cognitive reasoning telemetry',
      'behavior route maps',
      'future drift prediction',
      'autonomous plan auditor',
      'internal agent iam',
      'global ai agent audit',
      'ai compliance stress test',
      'ai tax risk scanner',
      'ai identity liability chain',
      'cross-enterprise agent bridge',
      'global ai financial orchestration',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48',
      '49',
      '50',
    ],
    category: 'Platform',
  },
  {
    path: '/agent-registry',
    title: 'Agent Registry',
    description: 'Browse and manage AI agent catalog with capabilities, policy scopes, and governance controls',
    keywords: [
      'agent registry',
      'ai agents',
      'agent catalog',
      'capabilities',
      'policy scope',
      'governance',
      'agent management',
    ],
    category: 'Platform',
  },
];

export const searchIndex: SearchEntry[] = [...routeSearchEntries, ...additionalSearchEntries];
