import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { AppLayout } from '../components/AppLayout';
import { Home } from '../pages/Home';
import { Search } from '../pages/Search';
import { BrowserSearch } from '../pages/BrowserSearch';
import { WorldsFirst } from '../pages/WorldsFirst';
import { AgentRegistry } from '../pages/AgentRegistry';
import { AgentPassports } from '../pages/AgentPassports';
import { AINotary } from '../pages/AINotary';
import { RecommendedAdditions } from '../pages/RecommendedAdditions';
import { IntegrationRollout } from '../pages/IntegrationRollout';
import { NextUpgrade } from '../pages/NextUpgrade';
import { AITaxAssistance } from '../pages/AITaxAssistance';
import { Markets } from '../pages/Markets';
import { RewardsIncentives } from '../pages/RewardsIncentives';
import { MarketplaceList } from '../pages/Marketplace/MarketplaceList';
import { MarketplaceDetail } from '../pages/Marketplace/MarketplaceDetail';
import AgentMarketplace from '../pages/Marketplace/AgentMarketplace';
import WorkflowMarketplace from '../pages/Marketplace/WorkflowMarketplace';
import IntegrationMarketplace from '../pages/Marketplace/IntegrationMarketplace';
import Monetization from '../pages/Marketplace/Monetization';
import { WorkflowPackMarketplace } from '../pages/WorkflowPackMarketplace';
import { PartnerIntegration } from '../pages/PartnerIntegration';
import PartnerIntegrationLayer from '../pages/PartnerIntegrationLayer';
import GlobalRailsIntegration from '../pages/GlobalRailsIntegration';
import APIKeys from '../pages/APIKeys';
import APIDocumentation from '../pages/APIDocumentation';
import ConnectionStatus from '../pages/ConnectionStatus';
import Webhooks from '../pages/Webhooks';
import IntegrationMarketplaceOld from '../pages/IntegrationMarketplace';
import { AITalk } from '../pages/Community/AITalk';
import { TopicDetail } from '../pages/Community/TopicDetail';
import { News } from '../pages/Community/News';
import { TradeMarket } from '../pages/Trade/TradeMarket';
import { BuyTokens } from '../pages/Trade/BuyTokens';
import { SellTokens } from '../pages/Trade/SellTokens';
import { Convert } from '../pages/Trade/Convert';
import { History } from '../pages/Trade/History';
import { OpenOrders } from '../pages/Trade/OpenOrders';
import { ExecutionHistory } from '../pages/WorkflowManagement/ExecutionHistory';
import { ScheduledWorkflows } from '../pages/WorkflowManagement/ScheduledWorkflows';
import { WorkflowPacks } from '../pages/WorkflowPacks';
import { WorkflowBuilder } from '../pages/WorkflowBuilder';
import { IndustryKits } from '../pages/IndustryKits';
import { TestingSandbox } from '../pages/TestingSandbox';
import PolicyEngine from '../pages/PolicyEngine';
import VersionControl from '../pages/VersionControl';
import ComplianceReports from '../pages/ComplianceReports';
import PolicyConflicts from '../pages/PolicyConflicts';
import AuditLogs from '../pages/AuditLogs';
import RolePermissions from '../pages/RolePermissions';
import SolutionsOverview from '../pages/Solutions/SolutionsOverview';
import SolutionsFunctionsUseCases from '../pages/Solutions/SolutionsFunctionsUseCases';
import SolutionsWorldsFirst from '../pages/Solutions/SolutionsWorldsFirst';
import SolutionsCommodities from '../pages/Solutions/SolutionsCommodities';
import SolutionsCaseStudies from '../pages/Solutions/SolutionsCaseStudies';
import SolutionsProblemSolver from '../pages/Solutions/SolutionsProblemSolver';
import PlatformAdditions from '../pages/Operations/PlatformAdditions';
import OperationsNextUpgrade from '../pages/Operations/NextUpgrade';
import OperationsAITaxAssistance from '../pages/Operations/AITaxAssistance';
import OperationsEnterpriseOnboarding from '../pages/Operations/EnterpriseOnboarding';
import RWADashboard from '../pages/Operations/RWADashboard';
import SystemStatus from '../pages/Operations/SystemStatus';
import UserManagement from '../pages/Operations/UserManagement';
import { TokenomicsPage } from '../pages/Tokens/TokenomicsPage';
import { WalletPage } from '../pages/Tokens/WalletPage';
import { MarketDataPage } from '../pages/Tokens/MarketDataPage';
import { TransactionsPage } from '../pages/Tokens/TransactionsPage';
import { RewardsStakingPage } from '../pages/Tokens/RewardsStakingPage';
import { AnalyticsPage } from '../pages/Tokens/AnalyticsPage';
import { WhaleTrackingPage } from '../pages/Tokens/WhaleTrackingPage';
import { TokenGovernancePage } from '../pages/Tokens/TokenGovernancePage';
import { SolutionsIndex } from '../pages/Solutions/SolutionsIndex';
import { Commodities } from '../pages/Dashboards/Commodities';
import { RWA } from '../pages/Dashboards/RWA';
import { TimeAIFunctionsUseCases } from '../pages/TimeAI/FunctionsUseCases';
import { TimeAITokenomics } from '../pages/TimeAI/Tokenomics';
import { TravAIFunctionsUseCases } from '../pages/TravAI/FunctionsUseCases';
import { TravAITokenomics } from '../pages/TravAI/Tokenomics';
import { EvidenceComplianceMap } from '../pages/TimeAI/EvidenceComplianceMap';
import { AgentCapabilityProofGenerator } from '../pages/AgentCapabilityProofGenerator';
import { ValueDashboard } from '../pages/ValueDashboard';
import { EnterpriseOnboarding } from '../pages/EnterpriseOnboarding';
import { Roadmap } from '../pages/Roadmap';
import { ControlledFanOutDemo } from '../pages/ControlledFanOutDemo';
import { ControlledFanInDemo } from '../pages/ControlledFanInDemo';
import { CommunityHub } from '../pages/Community/CommunityHub';
import { News as ResourcesNews } from '../pages/Resources/News';
import { Documentation } from '../pages/Resources/Documentation';
import { Training } from '../pages/Resources/Training';
import { Partners as ResourcesPartners } from '../pages/Resources/Partners';
import { Support } from '../pages/Resources/Support';
import { DesignYourAIAgent } from '../pages/TravAI/DesignYourAIAgent';
import { AITalk as TravAITalk } from '../pages/TravAI/AITalk';
import { SimulationSandbox } from '../pages/TravAI/SimulationSandbox';
import { TrainingModules } from '../pages/TravAI/TrainingModules';
import { DriftPrediction } from '../pages/TravAI/DriftPrediction';
import { CognitiveTelemetry } from '../pages/TravAI/CognitiveTelemetry';
import AgentTemplates from '../pages/TimeAI/AgentTemplates';
import AgentHealthMonitor from '../pages/TimeAI/AgentHealthMonitor';
import AgentActivityFeed from '../pages/TimeAI/AgentActivityFeed';
import RiskDashboard from '../pages/TimeAI/RiskDashboard';
import AgentSettings from '../pages/TimeAI/AgentSettings';

// Import solution pages
import { solutionPageMap } from './solutionPageMap';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: Search,
});

const browserSearchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/browser-search',
  component: BrowserSearch,
});

const worldsFirstRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/worlds-first',
  component: WorldsFirst,
});

const agentRegistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agent-registry',
  component: AgentRegistry,
});

const agentPassportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agent-passports',
  component: AgentPassports,
});

const aiNotaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai-notary',
  component: AINotary,
});

const recommendedAdditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recommended-additions',
  component: RecommendedAdditions,
});

const integrationRolloutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/integration-rollout',
  component: IntegrationRollout,
});

const nextUpgradeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/next-upgrade',
  component: NextUpgrade,
});

const aiTaxAssistanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai-tax-assistance',
  component: AITaxAssistance,
});

const marketsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/markets',
  component: Markets,
});

const rewardsIncentivesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rewards-incentives',
  component: RewardsIncentives,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace',
  component: MarketplaceList,
});

const marketplaceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace/$itemId',
  component: MarketplaceDetail,
});

const agentMarketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace/agent',
  component: AgentMarketplace,
});

const workflowMarketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace/workflow',
  component: WorkflowMarketplace,
});

const integrationMarketplaceNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace/integration',
  component: IntegrationMarketplace,
});

const monetizationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace/monetization',
  component: Monetization,
});

const workflowPackMarketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workflow-pack-marketplace',
  component: WorkflowPackMarketplace,
});

const partnerIntegrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner-integration',
  component: PartnerIntegration,
});

const partnerIntegrationLayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner-integration-layer',
  component: PartnerIntegrationLayer,
});

const globalRailsIntegrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/global-rails-integration',
  component: GlobalRailsIntegration,
});

const apiKeysRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/api-keys',
  component: APIKeys,
});

const apiDocumentationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/api-documentation',
  component: APIDocumentation,
});

const connectionStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/connection-status',
  component: ConnectionStatus,
});

const webhooksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/webhooks',
  component: Webhooks,
});

const integrationMarketplaceOldRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/integration-marketplace',
  component: IntegrationMarketplaceOld,
});

const aiTalkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community/ai-talk',
  component: AITalk,
});

const topicDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community/topic/$topicId',
  component: TopicDetail,
});

const communityNewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community/news',
  component: News,
});

const communityHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community',
  component: CommunityHub,
});

const tradeMarketRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trade/market',
  component: TradeMarket,
});

const buyTokensRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trade/buy',
  component: BuyTokens,
});

const sellTokensRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trade/sell',
  component: SellTokens,
});

const convertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trade/convert',
  component: Convert,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trade/history',
  component: History,
});

const openOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trade/open-orders',
  component: OpenOrders,
});

const executionHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workflow-management/execution-history',
  component: ExecutionHistory,
});

const scheduledWorkflowsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workflow-management/scheduled-workflows',
  component: ScheduledWorkflows,
});

const workflowPacksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workflow-packs',
  component: WorkflowPacks,
});

const workflowBuilderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workflow-builder',
  component: WorkflowBuilder,
});

const industryKitsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/industry-kits',
  component: IndustryKits,
});

const testingSandboxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/testing-sandbox',
  component: TestingSandbox,
});

const policyEngineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/policy-engine',
  component: PolicyEngine,
});

const versionControlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/version-control',
  component: VersionControl,
});

const complianceReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/compliance-reports',
  component: ComplianceReports,
});

const policyConflictsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/policy-conflicts',
  component: PolicyConflicts,
});

const auditLogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/audit-logs',
  component: AuditLogs,
});

const rolePermissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/role-permissions',
  component: RolePermissions,
});

const solutionsOverviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/overview',
  component: SolutionsOverview,
});

const solutionsFunctionsUseCasesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/functions-use-cases',
  component: SolutionsFunctionsUseCases,
});

const solutionsWorldsFirstRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/worlds-first',
  component: SolutionsWorldsFirst,
});

const solutionsCommoditiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/commodities',
  component: SolutionsCommodities,
});

const solutionsCaseStudiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/case-studies',
  component: SolutionsCaseStudies,
});

const solutionsProblemSolverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/problem-solver',
  component: SolutionsProblemSolver,
});

const platformAdditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operations/platform-additions',
  component: PlatformAdditions,
});

const operationsNextUpgradeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operations/next-upgrade',
  component: OperationsNextUpgrade,
});

const operationsAITaxAssistanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operations/ai-tax-assistance',
  component: OperationsAITaxAssistance,
});

const operationsEnterpriseOnboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operations/enterprise-onboarding',
  component: OperationsEnterpriseOnboarding,
});

const rwaDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operations/rwa-dashboard',
  component: RWADashboard,
});

const systemStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operations/system-status',
  component: SystemStatus,
});

const userManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operations/user-management',
  component: UserManagement,
});

const resourcesNewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources/news',
  component: ResourcesNews,
});

const resourcesDocumentationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources/documentation',
  component: Documentation,
});

const resourcesTrainingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources/training',
  component: Training,
});

const resourcesPartnersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources/partners',
  component: ResourcesPartners,
});

const resourcesSupportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources/support',
  component: Support,
});

const tokenomicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokens/tokenomics',
  component: TokenomicsPage,
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokens/wallet',
  component: WalletPage,
});

const marketDataRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokens/market-data',
  component: MarketDataPage,
});

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokens/transactions',
  component: TransactionsPage,
});

const rewardsStakingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokens/rewards-staking',
  component: RewardsStakingPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokens/analytics',
  component: AnalyticsPage,
});

const whaleTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokens/whale-tracking',
  component: WhaleTrackingPage,
});

const tokenGovernanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokens/governance',
  component: TokenGovernancePage,
});

const solutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions',
  component: SolutionsIndex,
});

const commoditiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboards/commodities',
  component: Commodities,
});

const rwaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboards/rwa',
  component: RWA,
});

const timeAIFunctionsUseCasesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/time-ai/functions-use-cases',
  component: TimeAIFunctionsUseCases,
});

const timeAITokenomicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/time-ai/tokenomics',
  component: TimeAITokenomics,
});

const travAIFunctionsUseCasesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trav-ai/functions-use-cases',
  component: TravAIFunctionsUseCases,
});

const travAITokenomicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trav-ai/tokenomics',
  component: TravAITokenomics,
});

const evidenceComplianceMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/time-ai/evidence-compliance-map',
  component: EvidenceComplianceMap,
});

const agentCapabilityProofGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agent-capability-proof-generator',
  component: AgentCapabilityProofGenerator,
});

const valueDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/value-dashboard',
  component: ValueDashboard,
});

const enterpriseOnboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/enterprise-onboarding',
  component: EnterpriseOnboarding,
});

const roadmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/roadmap',
  component: Roadmap,
});

const controlledFanOutDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/controlled-fan-out-demo',
  component: ControlledFanOutDemo,
});

const controlledFanInDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/controlled-fan-in-demo',
  component: ControlledFanInDemo,
});

const designYourAIAgentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trav-ai/design-your-ai-agent',
  component: DesignYourAIAgent,
});

const travAITalkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trav-ai/ai-talk',
  component: TravAITalk,
});

const simulationSandboxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trav-ai/simulation-sandbox',
  component: SimulationSandbox,
});

const trainingModulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trav-ai/training-modules',
  component: TrainingModules,
});

const driftPredictionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trav-ai/drift-prediction',
  component: DriftPrediction,
});

const cognitiveTelemetryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trav-ai/cognitive-telemetry',
  component: CognitiveTelemetry,
});

const agentTemplatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timeai/agent-templates',
  component: AgentTemplates,
});

const agentHealthMonitorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timeai/agent-health-monitor',
  component: AgentHealthMonitor,
});

const agentActivityFeedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timeai/agent-activity-feed',
  component: AgentActivityFeed,
});

const riskDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timeai/risk-dashboard',
  component: RiskDashboard,
});

const agentSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timeai/agent-settings',
  component: AgentSettings,
});

// Create solution routes dynamically
const solutionRoutes = Object.entries(solutionPageMap).map(([path, component]) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component,
  })
);

const routeTree = rootRoute.addChildren([
  indexRoute,
  searchRoute,
  browserSearchRoute,
  worldsFirstRoute,
  agentRegistryRoute,
  agentPassportsRoute,
  aiNotaryRoute,
  recommendedAdditionsRoute,
  integrationRolloutRoute,
  nextUpgradeRoute,
  aiTaxAssistanceRoute,
  marketsRoute,
  rewardsIncentivesRoute,
  marketplaceRoute,
  marketplaceDetailRoute,
  agentMarketplaceRoute,
  workflowMarketplaceRoute,
  integrationMarketplaceNewRoute,
  monetizationRoute,
  workflowPackMarketplaceRoute,
  partnerIntegrationRoute,
  partnerIntegrationLayerRoute,
  globalRailsIntegrationRoute,
  apiKeysRoute,
  apiDocumentationRoute,
  connectionStatusRoute,
  webhooksRoute,
  integrationMarketplaceOldRoute,
  aiTalkRoute,
  topicDetailRoute,
  communityNewsRoute,
  communityHubRoute,
  tradeMarketRoute,
  buyTokensRoute,
  sellTokensRoute,
  convertRoute,
  historyRoute,
  openOrdersRoute,
  executionHistoryRoute,
  scheduledWorkflowsRoute,
  workflowPacksRoute,
  workflowBuilderRoute,
  industryKitsRoute,
  testingSandboxRoute,
  policyEngineRoute,
  versionControlRoute,
  complianceReportsRoute,
  policyConflictsRoute,
  auditLogsRoute,
  rolePermissionsRoute,
  solutionsOverviewRoute,
  solutionsFunctionsUseCasesRoute,
  solutionsWorldsFirstRoute,
  solutionsCommoditiesRoute,
  solutionsCaseStudiesRoute,
  solutionsProblemSolverRoute,
  platformAdditionsRoute,
  operationsNextUpgradeRoute,
  operationsAITaxAssistanceRoute,
  operationsEnterpriseOnboardingRoute,
  rwaDashboardRoute,
  systemStatusRoute,
  userManagementRoute,
  resourcesNewsRoute,
  resourcesDocumentationRoute,
  resourcesTrainingRoute,
  resourcesPartnersRoute,
  resourcesSupportRoute,
  tokenomicsRoute,
  walletRoute,
  marketDataRoute,
  transactionsRoute,
  rewardsStakingRoute,
  analyticsRoute,
  whaleTrackingRoute,
  tokenGovernanceRoute,
  solutionsRoute,
  commoditiesRoute,
  rwaRoute,
  timeAIFunctionsUseCasesRoute,
  timeAITokenomicsRoute,
  travAIFunctionsUseCasesRoute,
  travAITokenomicsRoute,
  evidenceComplianceMapRoute,
  agentCapabilityProofGeneratorRoute,
  valueDashboardRoute,
  enterpriseOnboardingRoute,
  roadmapRoute,
  controlledFanOutDemoRoute,
  controlledFanInDemoRoute,
  designYourAIAgentRoute,
  travAITalkRoute,
  simulationSandboxRoute,
  trainingModulesRoute,
  driftPredictionRoute,
  cognitiveTelemetryRoute,
  agentTemplatesRoute,
  agentHealthMonitorRoute,
  agentActivityFeedRoute,
  riskDashboardRoute,
  agentSettingsRoute,
  ...solutionRoutes,
]);

export const router = createRouter({ routeTree });

export type Router = typeof router;
