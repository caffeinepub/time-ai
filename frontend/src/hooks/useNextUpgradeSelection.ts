const STORAGE_KEY = 'time-ai-next-upgrade-selection';

export interface UpgradeTheme {
  id: string;
  title: string;
  description: string;
}

export const upgradeThemes: UpgradeTheme[] = [
  {
    id: 'cost-governance',
    title: 'Cost Governance & Budget Controls',
    description: 'Advanced cost tracking, budget enforcement, and financial governance for AI agent operations with real-time spend monitoring and automated alerts.',
  },
  {
    id: 'workflow-generator',
    title: 'Cross-Industry Workflow Generator',
    description: 'AI-powered workflow templates and automation blueprints spanning logistics, finance, healthcare, and enterprise operations with drag-and-drop customization.',
  },
  {
    id: 'risk-index',
    title: 'Agent Action Risk Index',
    description: 'Comprehensive risk scoring and impact analysis for agent actions with predictive modeling, compliance checks, and automated risk mitigation strategies.',
  },
  {
    id: 'operational-intelligence',
    title: 'Operational Intelligence Layer',
    description: 'Real-time operational analytics, performance dashboards, and predictive insights for agent ecosystems with anomaly detection and optimization recommendations.',
  },
];

export function useNextUpgradeSelection() {
  const getSelection = (): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };

  const setSelection = (themeId: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch (error) {
      console.error('Failed to save upgrade selection:', error);
    }
  };

  const clearSelection = (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear upgrade selection:', error);
    }
  };

  return {
    getSelection,
    setSelection,
    clearSelection,
    upgradeThemes,
  };
}
