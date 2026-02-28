import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface AgentConfig {
    issueDate: bigint;
    status: AgentStatus;
    maxSessions?: bigint;
    expiryTimestamp: bigint;
    approvalRequired: boolean;
    capabilities: Array<string>;
    name: string;
    roleDescription: string;
    policyScope: string;
    verificationStatus: VerificationStatus;
    maxBudget: bigint;
}
export type Time = bigint;
export interface MetricsSummary {
    startTime: bigint;
    totalTasks: bigint;
    completedTasks: bigint;
    endTime: bigint;
    agentId: Principal;
    complianceScore: number;
    pendingTasks: bigint;
}
export interface NotarizationRecord {
    id: bigint;
    contentHash?: Uint8Array;
    contentText?: string;
    owner: Principal;
    timestamp: bigint;
}
export interface CommunityTopic {
    id: bigint;
    title: string;
    content: string;
    author: Principal;
    timestamp: bigint;
    replyCount: bigint;
}
export interface EvidenceItem {
    id: bigint;
    owner: Principal;
    notarizationRecordId?: bigint;
    description: string;
    timestamp: bigint;
}
export interface TradeOrder {
    id: bigint;
    status: Variant_cancelled_open_filled;
    user: Principal;
    orderType: Variant_buy_sell;
    timestamp: bigint;
    tokenPair: string;
    price: bigint;
    amount: bigint;
}
export interface AgentDesignState {
    name: string;
    roleDescription: string;
}
export type TokenOperation = {
    __kind__: "trade";
    trade: {
        to: Principal;
        from: Principal;
        timestamp: bigint;
        fromToken: bigint;
        amount: bigint;
        toToken: bigint;
    };
} | {
    __kind__: "burn";
    burn: {
        timestamp: bigint;
        amount: bigint;
    };
} | {
    __kind__: "mint";
    mint: {
        to: Principal;
        timestamp: bigint;
        amount: bigint;
    };
} | {
    __kind__: "transfer";
    transfer: {
        to: Principal;
        from: Principal;
        timestamp: bigint;
        amount: bigint;
    };
} | {
    __kind__: "conversion";
    conversion: {
        to: Principal;
        from: Principal;
        timestamp: bigint;
        fromToken: bigint;
        amount: bigint;
        toToken: bigint;
    };
};
export interface RoadmapItem {
    id: bigint;
    assignedTo: Principal;
    highPriority: boolean;
    description: string;
    lowPriority: boolean;
    category: string;
}
export interface SharedAgentDesignState {
    name: string;
    roleDescription: string;
}
export interface RegistryEntry {
    content: string;
    additions: string;
}
export interface WorkflowRun {
    id: bigint;
    evidenceItemIds: Array<bigint>;
    owner: Principal;
    name: string;
    description: string;
    timestamp: bigint;
}
export interface MarketplaceUnlock {
    itemId: bigint;
    user: Principal;
    timestamp: bigint;
}
export interface RewardEvent {
    id: bigint;
    user: Principal;
    description: string;
    timestamp: bigint;
    points: bigint;
}
export interface UserRoadmap {
    highPriority: Array<RoadmapItem>;
    mediumPriority: Array<RoadmapItem>;
    lowPriority: Array<RoadmapItem>;
}
export interface PolicyRule {
    ruleType: string;
    active: boolean;
    name: string;
    description: string;
    enforced: boolean;
    scope: string;
    criteria?: string;
    expiry?: bigint;
    allowedActions: Array<string>;
}
export interface DebugRoleResult {
    roleMapValue?: Role;
    callerText: string;
    isAdmin: boolean;
}
export interface Trade {
    id: bigint;
    sellOrderId: bigint;
    buyOrderId: bigint;
    timestamp: bigint;
    tokenPair: string;
    price: bigint;
    amount: bigint;
}
export interface TokenDistribution {
    miningTokens: bigint;
    timeAiTokens: bigint;
    timeTokens: bigint;
    travAiTokens: bigint;
    travTokens: bigint;
}
export interface CommunityReply {
    id: bigint;
    content: string;
    author: Principal;
    timestamp: bigint;
    topicId: bigint;
}
export interface TimeSeriesEntry {
    completedTasks: bigint;
    timestamp: bigint;
    complianceScore: number;
}
export interface MarketplaceItem {
    id: bigint;
    title: string;
    description: string;
    price: bigint;
}
export interface NotaryRequest {
    contentText: string;
}
export interface EnterpriseOnboardingRequest {
    id: bigint;
    contract: string;
    user: Principal;
    company: string;
    onboardingStatus: Variant_pending_approved_rejected;
    notes: string;
    timestamp: Time;
}
export enum AgentStatus {
    active = "active",
    pending = "pending",
    suspended = "suspended"
}
export enum LabelSetState {
    notFreezed = "notFreezed",
    freezed = "freezed"
}
export enum Role {
    admin = "admin",
    user = "user"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_buy_sell {
    buy = "buy",
    sell = "sell"
}
export enum Variant_cancelled_open_filled {
    cancelled = "cancelled",
    open = "open",
    filled = "filled"
}
export enum Variant_pending_approved_rejected {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum VerificationStatus {
    verified = "verified",
    pending = "pending",
    unverified = "unverified",
    suspended = "suspended"
}
export interface backendInterface {
    addCommunityReply(topicId: bigint, content: string): Promise<void>;
    addRegistryEntry(content: string, additions: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignRoadmapItemToUser(itemId: bigint, user: Principal): Promise<void>;
    cancelTradeOrder(orderId: bigint): Promise<void>;
    createAgentDesign(agentDesign: SharedAgentDesignState): Promise<void>;
    createCommunityTopic(title: string, content: string): Promise<bigint>;
    createEvidenceItem(description: string, notarizationRecordId: bigint | null): Promise<EvidenceItem>;
    createMarketplaceItem(item: MarketplaceItem): Promise<void>;
    createPolicyRule(rule: PolicyRule): Promise<void>;
    createRoadmapItem(item: RoadmapItem): Promise<void>;
    createUserRoadmap(high: Array<RoadmapItem>, medium: Array<RoadmapItem>, low: Array<RoadmapItem>): Promise<void>;
    createWorkflowRun(name: string, description: string, evidenceItemIds: Array<bigint>): Promise<WorkflowRun>;
    debugCaller(): Promise<string>;
    debugListUsers(): Promise<Array<Principal>>;
    debugRole(): Promise<DebugRoleResult>;
    deleteAgentDesign(id: bigint): Promise<void>;
    deleteMarketplaceItem(id: bigint): Promise<void>;
    deletePolicyRule(id: bigint): Promise<void>;
    deleteRoadmapItem(id: bigint): Promise<void>;
    earnRewardPoints(points: bigint, description: string): Promise<void>;
    ensureCallerUserExists(): Promise<string>;
    executeTrade(buyOrderId: bigint, sellOrderId: bigint): Promise<void>;
    forceAdmin(): Promise<string>;
    freezeLabelSet(): Promise<void>;
    getAgentDesigns(): Promise<Array<AgentDesignState>>;
    getAgentMetricsSummary(agentId: Principal, startTime: bigint, endTime: bigint): Promise<MetricsSummary>;
    getAgentTimeSeries(agentId: Principal, startTime: bigint, endTime: bigint, interval: bigint): Promise<Array<TimeSeriesEntry>>;
    getAllAgentConfigs(): Promise<Array<AgentConfig>>;
    getAllEnterpriseOnboardingRequests(): Promise<Array<EnterpriseOnboardingRequest>>;
    getAllNotarizationRecords(): Promise<Array<NotarizationRecord>>;
    getAllUsers(): Promise<Array<[Principal, Role]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCommunityReplies(topicId: bigint): Promise<Array<CommunityReply>>;
    getCommunityTopic(id: bigint): Promise<CommunityTopic | null>;
    getCommunityTopics(): Promise<Array<CommunityTopic>>;
    getComplianceLog(forceHistoricalAnalysis: boolean): Promise<Array<TokenOperation>>;
    getCurrentUserRoadmap(): Promise<UserRoadmap>;
    getEnterpriseRequest(id: bigint): Promise<EnterpriseOnboardingRequest | null>;
    getEvidenceItem(id: bigint): Promise<EvidenceItem | null>;
    getEvidenceItems(): Promise<Array<EvidenceItem>>;
    getLabelSetState(): Promise<LabelSetState>;
    getMarketPrice(forceHistoricalAnalysis: boolean): Promise<{
        timestamp: bigint;
        market: bigint;
        priceUSDT: bigint;
    }>;
    getMarketplaceItemById(id: bigint): Promise<MarketplaceItem | null>;
    getMarketplaceItems(): Promise<Array<MarketplaceItem>>;
    getMyAgentConfigs(): Promise<Array<AgentConfig>>;
    getMyEnterpriseOnboardingRequests(): Promise<Array<EnterpriseOnboardingRequest>>;
    getMyMarketplaceUnlocks(): Promise<Array<MarketplaceUnlock>>;
    getMyNotarizationRecords(): Promise<Array<NotarizationRecord>>;
    getMyOpenOrders(): Promise<Array<TradeOrder>>;
    getMyRewardEvents(): Promise<Array<RewardEvent>>;
    getMyRewardPoints(): Promise<bigint>;
    getMyRoadmapItems(): Promise<Array<RoadmapItem>>;
    getMyRole(): Promise<string>;
    getMyUserExists(): Promise<boolean>;
    getPolicyRuleById(id: bigint): Promise<PolicyRule | null>;
    getPolicyRules(): Promise<Array<PolicyRule>>;
    getRecentTrades(): Promise<Array<Trade>>;
    getRegistryEntries(): Promise<Array<RegistryEntry>>;
    getRoadmapItem(id: bigint): Promise<RoadmapItem>;
    getRoadmapItems(): Promise<Array<RoadmapItem>>;
    getRoadmapItemsForUser(userId: Principal): Promise<Array<RoadmapItem>>;
    getSubscription(user: Principal): Promise<string>;
    getTokenBurnAnalysisMultiSeries(forceHistoricalAnalysis: boolean): Promise<Array<TokenOperation>>;
    getTokenBurnAnalysisSingleSeries(forceHistoricalAnalysis: boolean): Promise<{
        tokensMinted: bigint;
        tokensCirculating: bigint;
        revenueRetainedUSDT: bigint;
        tokensBurned: bigint;
    }>;
    getUserCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserRoadmap(user: Principal): Promise<UserRoadmap>;
    getWorkflowRun(id: bigint): Promise<WorkflowRun | null>;
    getWorkflowRunEvidence(workflowRunId: bigint): Promise<Array<EvidenceItem>>;
    getWorkflowRuns(): Promise<Array<WorkflowRun>>;
    initializeAdmin(): Promise<string>;
    isCallerAdmin(): Promise<boolean>;
    listTokenDistributions(forceHistoricalAnalysis: boolean): Promise<{
        timeTokenDistributions?: TokenDistribution;
        travAiTokenDistributions?: TokenDistribution;
        travTokenDistributions?: TokenDistribution;
        timeAiTokenDistributions?: TokenDistribution;
        miningTokenDistributions?: TokenDistribution;
    }>;
    logTaskCompletion(agentId: Principal, taskId: bigint, completed: boolean): Promise<void>;
    placeTradeOrder(orderType: Variant_buy_sell, tokenPair: string, amount: bigint, price: bigint): Promise<bigint>;
    redeemRewardPoints(points: bigint, description: string): Promise<void>;
    registerAgentConfig(config: AgentConfig): Promise<void>;
    registerSelf(): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setSubscription(user: Principal, tier: string): Promise<void>;
    submitEnterpriseOnboardingRequest(company: string, contract: string): Promise<bigint>;
    submitNotaryRequest(request: NotaryRequest): Promise<NotarizationRecord>;
    unlockMarketplaceItem(itemId: bigint): Promise<void>;
    updateAgentConfigs(config: AgentConfig): Promise<void>;
    updateAgentDesign(id: bigint, agentUpdate: SharedAgentDesignState): Promise<void>;
    updateAgentStatus(arg0: bigint, arg1: AgentStatus): Promise<void>;
    updateAgentVerificationStatus(agentId: Principal, configId: bigint, verificationStatus: VerificationStatus): Promise<void>;
    updateEnterpriseRequestStatus(id: bigint, status: Variant_pending_approved_rejected, notes: string): Promise<void>;
    updateMarketplaceItem(id: bigint, item: MarketplaceItem): Promise<void>;
    updatePolicyRule(id: bigint, rule: PolicyRule): Promise<void>;
    updateRoadmapItem(id: bigint, item: RoadmapItem): Promise<void>;
    verifyNotarizationHash(hash: Uint8Array): Promise<NotarizationRecord | null>;
    verifyNotarizationText(text: string): Promise<NotarizationRecord | null>;
    whoami(): Promise<string>;
}
