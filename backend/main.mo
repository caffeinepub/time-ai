import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Set "mo:core/Set";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Blob "mo:core/Blob";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import VarArray "mo:core/VarArray";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Hardcoded developer principal for admin access
  let ADMIN_PRINCIPAL_1 = "q5ida-vdwpr-bqbk4-ksxkw-77nif-xmn2v-wevql-eh4j2-urrl2-cd27f-6qe";

  let ADMIN_PRINCIPALS = [
    ADMIN_PRINCIPAL_1, // Developer principal
  ];

  let adminSet = Set.empty<Text>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type User = {
    principal : Principal;
    role : Text;
    createdAt : Time.Time;
  };

  let userMap = Map.empty<Principal, User>();

  // Creates a user record for the caller if missing.
  // Returns "created", "already_exists", or an error message string.
  // No authorization check needed — any caller (including guests) may create their own record.
  public shared ({ caller }) func ensureCallerUserExists() : async Text {
    switch (userMap.get(caller)) {
      case (?_) { "already_exists" };
      case (null) {
        let newUser : User = {
          principal = caller;
          role = "Admin";
          createdAt = Time.now();
        };
        userMap.add(caller, newUser);
        "created";
      };
    };
  };

  var userSubscriptions = Map.empty<Principal, Text>();

  public query ({ caller }) func getSubscription(user : Principal) : async Text {
    // Users can only view their own subscription, admins can view any
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own subscription");
    };
    switch (userSubscriptions.get(user)) {
      case (?tier) { tier };
      case (null) { "Free" };
    };
  };

  public shared ({ caller }) func setSubscription(user : Principal, tier : Text) : async () {
    // Only admins can set subscription tiers
    assertAdmin(caller);
    userSubscriptions.add(user, tier);
  };

  // AUTHENTICATION & ROLE MANAGEMENT
  public type Role = { #admin; #user };

  private var previousAdminFoundCount = 0;

  let roleMap = Map.empty<Principal, Role>();

  private func findAdminsCount() : Nat {
    let adminIter = roleMap.values().filter(func(role) { role == #admin });
    adminIter.size();
  };

  // Returns the caller's role as Text. No auth check needed — caller reads their own role.
  public query ({ caller }) func getMyRole() : async Text {
    if (ADMIN_PRINCIPALS.find<Text>(func(p) { p == caller.toText() }) != null) {
      return "Admin";
    };
    switch (roleMap.get(caller)) {
      case (?role) {
        switch (role) {
          case (#admin) { return "Admin" };
          case (#user) { return "User" };
        };
      };
      case (null) { return "User" };
    };
  };

  public shared ({ caller }) func initializeAdmin() : async Text {
    if (ADMIN_PRINCIPALS.find<Text>(func(p) { p == caller.toText() }) == null) {
      return "Not authorized";
    };

    // Ensure role is set in the map if not present
    if (not roleMap.containsKey(caller)) {
      roleMap.add(caller, #admin);
    };

    // Create a user record if not already present
    switch (userMap.get(caller)) {
      case (null) {
        let newUser : User = {
          principal = caller;
          role = "Admin";
          createdAt = Time.now();
        };
        userMap.add(caller, newUser);
      };
      case (?_) {}; // User already exists, do nothing
    };

    "Admin initialized";
  };

  // Returns whether the caller's principal exists in userMap.
  // No auth check needed — caller checks their own existence.
  public query ({ caller }) func getMyUserExists() : async Bool {
    userMap.containsKey(caller);
  };

  // Returns total number of entries in userMap.
  // No auth check needed — public count, guests may view.
  public query func getUserCount() : async Nat {
    userMap.size();
  };

  // ADMIN ONLY: Get all users and roles
  public query ({ caller }) func getAllUsers() : async [(Principal, Role)] {
    assertAdmin(caller);
    if (roleMap.isEmpty()) {
      Runtime.trap("No users found - Only caller can view / modify at this point");
    };

    roleMap.toArray();
  };

  public query ({ caller }) func debugCaller() : async Text {
    caller.toText();
  };

  public type DebugRoleResult = {
    callerText : Text;
    isAdmin : Bool;
    roleMapValue : ?Role;
  };

  public query ({ caller }) func debugRole() : async DebugRoleResult {
    {
      callerText = caller.toText();
      isAdmin = adminSet.contains(caller.toText());
      roleMapValue = roleMap.get(caller);
    };
  };

  public shared ({ caller }) func forceAdmin() : async Text {
    let authorizedPrincipal : Principal = Principal.fromText("q5ida-vdwpr-bqbk4-ksxkw-77nif-xmn2v-wevql-eh4j2-urr12-cd27f-6qe");
    if (caller == authorizedPrincipal) {
      roleMap.add(caller, #admin);
      return "Admin assigned";
    };
    "Not authorized";
  };

  // -----------------------------------------------------------
  // USER PROFILES (Time/Trav Passport System)
  // -----------------------------------------------------------

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // -----------------------------------------------------------
  // AGENT REGISTRY
  // -----------------------------------------------------------

  public type RegistryEntry = {
    content : Text;
    additions : Text;
  };

  let registry = Map.empty<Principal, List.List<RegistryEntry>>();

  func getUserEntriesInternal(caller : Principal) : List.List<RegistryEntry> {
    switch (registry.get(caller)) {
      case (null) { List.empty<RegistryEntry>() };
      case (?entries) { entries };
    };
  };

  public shared ({ caller }) func addRegistryEntry(content : Text, additions : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add registry entries");
    };

    let newEntry : RegistryEntry = {
      content;
      additions;
    };

    let existingEntries = getUserEntriesInternal(caller);
    existingEntries.add(newEntry);
    registry.add(caller, existingEntries);
  };

  public query ({ caller }) func getRegistryEntries() : async [RegistryEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view registry entries");
    };
    getUserEntriesInternal(caller).toArray();
  };

  // -----------------------------------------------------------
  // LEGACY AGENT DESIGN STATE
  // -----------------------------------------------------------

  public type SharedAgentDesignState = {
    name : Text;
    roleDescription : Text;
  };

  public type AgentDesignState = {
    name : Text;
    roleDescription : Text;
  };

  let agentDesigns = Map.empty<Principal, List.List<AgentDesignState>>();

  func getAgentDesignsInternal(caller : Principal) : List.List<AgentDesignState> {
    switch (agentDesigns.get(caller)) {
      case (null) { List.empty<AgentDesignState>() };
      case (?designs) { designs };
    };
  };

  public shared ({ caller }) func createAgentDesign(agentDesign : SharedAgentDesignState) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create agent designs");
    };

    let newAgentDesign : AgentDesignState = {
      name = agentDesign.name;
      roleDescription = agentDesign.roleDescription;
    };

    let existingAgentDesigns = getAgentDesignsInternal(caller);
    existingAgentDesigns.add(newAgentDesign);
    agentDesigns.add(caller, existingAgentDesigns);
  };

  public query ({ caller }) func getAgentDesigns() : async [AgentDesignState] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view agent designs");
    };
    getAgentDesignsInternal(caller).toArray();
  };

  public shared ({ caller }) func updateAgentDesign(id : Nat, agentUpdate : SharedAgentDesignState) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update agent designs");
    };

    let currentDesigns = getAgentDesignsInternal(caller);
    if (id >= currentDesigns.size()) {
      Runtime.trap(
        "Cannot update, id is out of range. id: " # id.toText() # " (size: " # currentDesigns.size().toText() # ")"
      );
    };

    let updatedAgentDesign : AgentDesignState = {
      name = agentUpdate.name;
      roleDescription = agentUpdate.roleDescription;
    };

    let mutableAgentDesigns : [var AgentDesignState] = currentDesigns.toVarArray<AgentDesignState>();
    mutableAgentDesigns[id] := updatedAgentDesign;

    agentDesigns.add(caller, List.fromVarArray<AgentDesignState>(mutableAgentDesigns));
  };

  public shared ({ caller }) func deleteAgentDesign(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete agent designs");
    };

    let currentDesigns = getAgentDesignsInternal(caller);
    if (id >= currentDesigns.size()) {
      Runtime.trap(
        "Cannot delete, id is out of range. id: " # id.toText() # " (size: " # currentDesigns.size().toText() # ")"
      );
    };

    // Use slice to remove index id from array
    let mutableAgentDesigns = currentDesigns.toVarArray();
    let newDesigns = mutableAgentDesigns.sliceToArray(0, id).concat(
      mutableAgentDesigns.sliceToArray(id + 1, mutableAgentDesigns.size()),
    );
    agentDesigns.add(caller, List.fromArray<AgentDesignState>(newDesigns));
  };

  // -----------------------------------------------------------
  // AGENT METRICS STRUCTURES AND METHODS
  // -----------------------------------------------------------

  public type TaskData = {
    id : Nat;
    completed : Bool;
    timestamp : Int;
  };

  public type MetricsSummary = {
    agentId : Principal;
    startTime : Int;
    endTime : Int;
    totalTasks : Nat;
    completedTasks : Nat;
    pendingTasks : Nat;
    complianceScore : Float;
  };

  let agentTasks = Map.empty<Principal, List.List<TaskData>>();
  let agentOwners = Map.empty<Principal, Principal>();

  public shared ({ caller }) func logTaskCompletion(agentId : Principal, taskId : Nat, completed : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can log task completions");
    };

    // Verify ownership: caller must be the agent owner or an admin
    switch (agentOwners.get(agentId)) {
      case (null) {
        // First time logging for this agent - set caller as owner
        agentOwners.add(agentId, caller);
      };
      case (?owner) {
        if (owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only log tasks for your own agents");
        };
      };
    };

    let newTask : TaskData = {
      id = taskId;
      completed;
      timestamp = Time.now();
    };

    let existingTasks = switch (agentTasks.get(agentId)) {
      case (null) { List.empty<TaskData>() };
      case (?tasks) { tasks };
    };
    existingTasks.add(newTask);
    agentTasks.add(agentId, existingTasks);
  };

  public query ({ caller }) func getAgentMetricsSummary(agentId : Principal, startTime : Int, endTime : Int) : async MetricsSummary {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view agent metrics");
    };

    // Verify ownership: caller must be the agent owner or an admin
    switch (agentOwners.get(agentId)) {
      case (null) {
        Runtime.trap("Agent not found or no metrics available");
      };
      case (?owner) {
        if (owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view metrics for your own agents");
        };
      };
    };

    let tasks = switch (agentTasks.get(agentId)) {
      case (null) { List.empty<TaskData>() };
      case (?taskList) {
        let filteredTasks = taskList.filter(
          func(task) { task.timestamp >= startTime and task.timestamp <= endTime }
        );
        filteredTasks;
      };
    };

    let totalTasks = tasks.size();
    if (totalTasks == 0) {
      return {
        agentId;
        startTime;
        endTime;
        totalTasks = 0;
        completedTasks = 0;
        pendingTasks = 0;
        complianceScore = 0.0;
      };
    };

    let completedTasks = tasks.filter(func(task) { task.completed }).size();
    let pendingTasks = totalTasks - completedTasks : Nat;
    let complianceScore = completedTasks.toFloat() / totalTasks.toFloat();

    {
      agentId;
      startTime;
      endTime;
      totalTasks;
      completedTasks;
      pendingTasks;
      complianceScore;
    };
  };

  public type TimeSeriesEntry = {
    timestamp : Int;
    completedTasks : Nat;
    complianceScore : Float;
  };

  public query ({ caller }) func getAgentTimeSeries(agentId : Principal, startTime : Int, endTime : Int, interval : Int) : async [TimeSeriesEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view agent time series");
    };

    // Verify ownership: caller must be the agent owner or an admin
    switch (agentOwners.get(agentId)) {
      case (null) {
        Runtime.trap("Agent not found or no metrics available");
      };
      case (?owner) {
        if (owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only users can view time series for your own agents");
        };
      };
    };

    let tasks = switch (agentTasks.get(agentId)) {
      case (null) { List.empty<TaskData>() };
      case (?taskList) {
        let filteredTasks = taskList.filter(
          func(task) { task.timestamp >= startTime and task.timestamp <= endTime }
        );
        filteredTasks;
      };
    };

    let numberOfIntervals = Int.max(1, (endTime - startTime) / interval).toNat();
    let intervals = List.empty<TimeSeriesEntry>();

    var currentIntervalStart = startTime;
    var currentIntervalEnd = startTime + interval;

    while (currentIntervalStart < endTime) {
      let intervalTasks = tasks.filter(
        func(task) { task.timestamp >= currentIntervalStart and task.timestamp < currentIntervalEnd }
      );

      let totalTasks = intervalTasks.size();
      let completedTasks = intervalTasks.filter(
        func(task) { task.completed }
      ).size();

      let complianceScore = if (totalTasks == 0) { 0.0 } else {
        completedTasks.toFloat() / totalTasks.toFloat();
      };

      let entry = {
        timestamp = currentIntervalStart;
        completedTasks;
        complianceScore;
      };
      intervals.add(entry);

      currentIntervalStart += interval;
      currentIntervalEnd += interval;
    };

    intervals.toArray();
  };

  // -----------------------------------------------------------
  // TOKEN-RELATED TYPES (For Analytics/Compliance API)
  // -----------------------------------------------------------

  let daysInNanos : Int = 24 * 60 * 60 * 1_000_000_000;

  public type TokenDistribution = {
    timeTokens : Nat;
    travTokens : Nat;
    miningTokens : Nat;
    timeAiTokens : Nat;
    travAiTokens : Nat;
  };

  public type TokenBurnAnalysis = {
    date : Int;
    tokensBurned : Nat;
    revenueRetainedUSDT : Nat;
    tokensMinted : Nat;
    tokensCirculating : Nat;
  };

  public type TokenPrice = {
    market : Int;
    priceUSDT : Nat;
    timestamp : Int;
  };

  // Token Compliance Log (TronLink Style)
  public type TokenOperation = {
    #mint : {
      amount : Nat;
      to : Principal;
      timestamp : Int;
    };
    #transfer : {
      amount : Nat;
      from : Principal;
      to : Principal;
      timestamp : Int;
    };
    #conversion : {
      amount : Nat;
      fromToken : Nat;
      toToken : Nat;
      from : Principal;
      to : Principal;
      timestamp : Int;
    };
    #trade : {
      amount : Nat;
      fromToken : Nat;
      toToken : Nat;
      from : Principal;
      to : Principal;
      timestamp : Int;
    };
    #burn : { amount : Nat; timestamp : Int };
  };

  // -----------------------------------------------------------
  // ANALYTICS API (PUBLIC - guests can view)
  // -----------------------------------------------------------

  // Functionality and Data Stores Abstracted
  let timeTokenDistributions = Map.empty<Int, TokenDistribution>();
  let travTokenDistributions = Map.empty<Int, TokenDistribution>();
  let miningTokenDistributions = Map.empty<Int, TokenDistribution>();
  let timeAiTokenDistributions = Map.empty<Int, TokenDistribution>();
  let travAiTokenDistributions = Map.empty<Int, TokenDistribution>();
  let tokenBurnAnalysis = Map.empty<Int, TokenBurnAnalysis>();
  let tokenPrices = Map.empty<Int, TokenPrice>();
  let transactionHistory = Map.empty<Int, TokenOperation>();

  public query func listTokenDistributions(forceHistoricalAnalysis : Bool) : async {
    timeTokenDistributions : ?TokenDistribution;
    travTokenDistributions : ?TokenDistribution;
    miningTokenDistributions : ?TokenDistribution;
    timeAiTokenDistributions : ?TokenDistribution;
    travAiTokenDistributions : ?TokenDistribution;
  } {
    let now = Time.now();
    let oneYearAgo = now - (daysInNanos * 365);

    if (forceHistoricalAnalysis) {
      return {
        timeTokenDistributions = timeTokenDistributions.get(oneYearAgo);
        travTokenDistributions = travTokenDistributions.get(oneYearAgo);
        miningTokenDistributions = miningTokenDistributions.get(oneYearAgo);
        timeAiTokenDistributions = timeAiTokenDistributions.get(oneYearAgo);
        travAiTokenDistributions = travAiTokenDistributions.get(oneYearAgo);
      };
    };

    {
      timeTokenDistributions = timeTokenDistributions.get(now);
      travTokenDistributions = travTokenDistributions.get(now);
      miningTokenDistributions = miningTokenDistributions.get(now);
      timeAiTokenDistributions = timeAiTokenDistributions.get(now);
      travAiTokenDistributions = travAiTokenDistributions.get(now);
    };
  };

  public query func getTokenBurnAnalysisSingleSeries(forceHistoricalAnalysis : Bool) : async {
    tokensBurned : Nat;
    revenueRetainedUSDT : Nat;
    tokensMinted : Nat;
    tokensCirculating : Nat;
  } {
    let now = Time.now();
    let oneYearAgo = now - (daysInNanos * 365);

    if (forceHistoricalAnalysis) {
      switch (tokenBurnAnalysis.get(oneYearAgo)) {
        case (null) {
          Runtime.trap("No data available for historical analysis");
        };
        case (?data) {
          return {
            tokensBurned = data.tokensBurned;
            revenueRetainedUSDT = data.revenueRetainedUSDT;
            tokensMinted = data.tokensMinted;
            tokensCirculating = data.tokensCirculating;
          };
        };
      };
    };

    switch (tokenBurnAnalysis.get(now)) {
      case (null) {
        Runtime.trap("No data available for current analysis");
      };
      case (?data) {
        return {
          tokensBurned = data.tokensBurned;
          revenueRetainedUSDT = data.revenueRetainedUSDT;
          tokensMinted = data.tokensMinted;
          tokensCirculating = data.tokensCirculating;
        };
      };
    };
  };

  public query func getTokenBurnAnalysisMultiSeries(forceHistoricalAnalysis : Bool) : async [TokenOperation] {
    let now = Time.now();
    let oneYearAgo = now - (daysInNanos * 365);

    if (forceHistoricalAnalysis) {
      let oldTransactionHistory = transactionHistory.filter(
        func(date, _operation) { date <= oneYearAgo }
      );
      return oldTransactionHistory.values().toArray();
    };
    let currentTransactionHistory = transactionHistory.filter(
      func(date, _operation) { date > oneYearAgo }
    );
    currentTransactionHistory.values().toArray();
  };

  public query func getMarketPrice(forceHistoricalAnalysis : Bool) : async {
    market : Int;
    priceUSDT : Nat;
    timestamp : Int;
  } {
    let now = Time.now();
    if (not forceHistoricalAnalysis) {
      switch (tokenPrices.get(now)) {
        case (null) {
          Runtime.trap("No data available for current price");
        };
        case (?data) {
          return {
            market = data.market;
            priceUSDT = data.priceUSDT;
            timestamp = data.timestamp;
          };
        };
      };
    };

    let oneYearAgo = now - (daysInNanos * 365);
    switch (tokenPrices.get(oneYearAgo)) {
      case (null) {
        Runtime.trap("No data available for historical price");
      };
      case (?data) {
        return {
          market = data.market;
          priceUSDT = data.priceUSDT;
          timestamp = data.timestamp;
        };
      };
    };
  };

  public query func getComplianceLog(forceHistoricalAnalysis : Bool) : async [TokenOperation] {
    let now = Time.now();
    let oneYearAgo = now - (daysInNanos * 365);

    if (not forceHistoricalAnalysis) {
      let recentTransactionHistory = transactionHistory.filter(
        func(date, _operation) { date > oneYearAgo }
      );
      return recentTransactionHistory.values().toArray();
    };

    let oldTransactionHistory = transactionHistory.filter(
      func(date, _operation) { date <= oneYearAgo }
    );
    oldTransactionHistory.values().toArray();
  };

  // -----------------------------------------------------------
  // AI NOTARY WORKFLOW
  // -----------------------------------------------------------
  public type NotarizationRecord = {
    id : Nat;
    contentHash : ?Blob;
    contentText : ?Text;
    timestamp : Int;
    owner : Principal;
  };

  let notarizationRecords = Map.empty<Nat, NotarizationRecord>();
  var nextNotarizationId = 0;

  public type NotaryRequest = {
    contentText : Text;
  };

  public shared ({ caller }) func submitNotaryRequest(request : NotaryRequest) : async NotarizationRecord {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit notary request");
    };

    let contentHash = request.contentText.encodeUtf8(); // Convert Text to Blob
    let record : NotarizationRecord = {
      id = nextNotarizationId;
      contentHash = ?contentHash;
      contentText = ?request.contentText;
      owner = caller;
      timestamp = Time.now();
    };
    notarizationRecords.add(nextNotarizationId, record);
    nextNotarizationId += 1;
    record;
  };

  // Public verification - anyone can verify a hash (including guests)
  public query func verifyNotarizationHash(hash : Blob) : async ?NotarizationRecord {
    var foundRecord : ?NotarizationRecord = null;
    notarizationRecords.entries().forEach(
      func((_, record)) {
        switch (record.contentHash) {
          case (?recordHash) {
            if (recordHash.equal(hash)) {
              foundRecord := ?record;
            };
          };
          case (null) {};
        };
      }
    );
    foundRecord;
  };

  // Public verification - anyone can verify text (including guests)
  public query func verifyNotarizationText(text : Text) : async ?NotarizationRecord {
    var foundRecord : ?NotarizationRecord = null;
    notarizationRecords.entries().forEach(
      func((_, record)) {
        switch (record.contentText) {
          case (?recordText) {
            if (recordText == text) {
              foundRecord := ?record;
            };
          };
          case (null) {};
        };
      }
    );
    foundRecord;
  };

  // Only authenticated users can view all records
  public query ({ caller }) func getAllNotarizationRecords() : async [NotarizationRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view all notarization records");
    };
    notarizationRecords.values().toArray();
  };

  // Users can view their own notarization records
  public query ({ caller }) func getMyNotarizationRecords() : async [NotarizationRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their notarization records");
    };
    notarizationRecords.values().toArray().filter(
      func(record) { record.owner == caller }
    );
  };

  // -----------------------------------------------------------
  // Evidence & Compliance Map
  // -----------------------------------------------------------

  public type EvidenceItem = {
    id : Nat;
    description : Text;
    notarizationRecordId : ?Nat; // Reference to NotarizationRecord if available
    timestamp : Int;
    owner : Principal;
  };

  let evidenceItems = Map.empty<Nat, EvidenceItem>();
  var nextEvidenceId = 0;

  public shared ({ caller }) func createEvidenceItem(description : Text, notarizationRecordId : ?Nat) : async EvidenceItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create evidence items");
    };

    // Verify notarization record ownership if provided
    switch (notarizationRecordId) {
      case (?recordId) {
        switch (notarizationRecords.get(recordId)) {
          case (null) {
            Runtime.trap("Referenced notarization record does not exist");
          };
          case (?record) {
            if (record.owner != caller) {
              Runtime.trap("Unauthorized: Cannot reference notarization record owned by another user");
            };
          };
        };
      };
      case (null) {};
    };

    let newEvidence : EvidenceItem = {
      id = nextEvidenceId;
      description;
      notarizationRecordId;
      timestamp = Time.now();
      owner = caller;
    };

    evidenceItems.add(nextEvidenceId, newEvidence);
    nextEvidenceId += 1;
    newEvidence;
  };

  public query ({ caller }) func getEvidenceItems() : async [EvidenceItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their evidence items");
    };
    evidenceItems.values().toArray().filter(
      func(item) { item.owner == caller }
    );
  };

  public query ({ caller }) func getEvidenceItem(id : Nat) : async ?EvidenceItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view evidence items");
    };
    switch (evidenceItems.get(id)) {
      case (?item) { if (caller == item.owner) { ?item } else { null } };
      case (null) { null };
    };
  };

  public type WorkflowRun = {
    id : Nat;
    name : Text;
    description : Text;
    evidenceItemIds : [Nat];
    timestamp : Int;
    owner : Principal;
  };

  let workflowRuns = Map.empty<Nat, WorkflowRun>();
  var nextWorkflowRunId = 0;

  public shared ({ caller }) func createWorkflowRun(name : Text, description : Text, evidenceItemIds : [Nat]) : async WorkflowRun {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create workflow runs");
    };

    // Verify all evidence items belong to the caller
    for (evidenceId in evidenceItemIds.vals()) {
      switch (evidenceItems.get(evidenceId)) {
        case (null) {
          Runtime.trap("Evidence item with id " # evidenceId.toText() # " does not exist");
        };
        case (?item) {
          if (item.owner != caller) {
            Runtime.trap("Unauthorized: Cannot reference evidence item owned by another user");
          };
        };
      };
    };

    let workflowRun : WorkflowRun = {
      id = nextWorkflowRunId;
      name;
      description;
      evidenceItemIds;
      timestamp = Time.now();
      owner = caller;
    };

    workflowRuns.add(nextWorkflowRunId, workflowRun);
    nextWorkflowRunId += 1;
    workflowRun;
  };

  public query ({ caller }) func getWorkflowRuns() : async [WorkflowRun] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their workflow runs");
    };
    workflowRuns.values().toArray().filter(
      func(run) { run.owner == caller }
    );
  };

  public query ({ caller }) func getWorkflowRun(id : Nat) : async ?WorkflowRun {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view workflow runs");
    };
    switch (workflowRuns.get(id)) {
      case (?run) { if (caller == run.owner) { ?run } else { null } };
      case (null) { null };
    };
  };

  public query ({ caller }) func getWorkflowRunEvidence(workflowRunId : Nat) : async [EvidenceItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view workflow run evidence");
    };
    switch (workflowRuns.get(workflowRunId)) {
      case (?workflowRun) {
        if (caller != workflowRun.owner) { Runtime.trap("Unauthorized: You don't own this workflow run") };

        // Filter and return only evidence items that belong to the caller
        // This provides defense in depth even though createWorkflowRun validates ownership
        workflowRun.evidenceItemIds.map(
          func(evidenceId) {
            switch (evidenceItems.get(evidenceId)) {
              case (?item) { if (item.owner == caller) { ?item } else { null } };
              case (null) { null };
            };
          }
        ).filter(
          func(item) { switch (item) { case (?_) { true }; case (null) { false } } }
        ).map(
          func(item) {
            switch (item) {
              case (?evidenceItem) { evidenceItem };
              case (null) { Runtime.trap("Unexpected null evidence item") };
            };
          }
        );
      };
      case (null) { Runtime.trap("No workflow run found with id " # workflowRunId.toText()) };
    };
  };

  // -----------------------------------------------------------
  // DIGITAL MARKETPLACE
  // -----------------------------------------------------------

  public type MarketplaceItem = {
    id : Nat;
    title : Text;
    description : Text;
    price : Nat;
  };

  let marketplaceItems = Map.empty<Nat, MarketplaceItem>();
  var nextItemId = 0;

  public shared ({ caller }) func createMarketplaceItem(item : MarketplaceItem) : async () {
    assertAdmin(caller);

    let newItem = {
      item with id = nextItemId;
    };

    marketplaceItems.add(nextItemId, newItem);
    nextItemId += 1;
  };

  // Public browsing - anyone can view marketplace items (including guests)
  public query func getMarketplaceItems() : async [MarketplaceItem] {
    marketplaceItems.values().toArray();
  };

  // Public browsing - anyone can view item details (including guests)
  public query func getMarketplaceItemById(id : Nat) : async ?MarketplaceItem {
    marketplaceItems.get(id);
  };

  public shared ({ caller }) func updateMarketplaceItem(id : Nat, item : MarketplaceItem) : async () {
    assertAdmin(caller);

    switch (marketplaceItems.get(id)) {
      case (null) {
        Runtime.trap("Cannot update, item with id " # id.toText() # " does not exist");
      };
      case (?_) {
        marketplaceItems.add(id, item);
      };
    };
  };

  public shared ({ caller }) func deleteMarketplaceItem(id : Nat) : async () {
    assertAdmin(caller);

    switch (marketplaceItems.get(id)) {
      case (null) {
        Runtime.trap("Cannot delete, item with id " # id.toText() # " does not exist");
      };
      case (?_) {
        marketplaceItems.remove(id);
      };
    };
  };

  // Marketplace purchase/unlock tracking
  public type MarketplaceUnlock = {
    itemId : Nat;
    user : Principal;
    timestamp : Int;
  };

  let marketplaceUnlocks = Map.empty<Principal, List.List<MarketplaceUnlock>>();

  public shared ({ caller }) func unlockMarketplaceItem(itemId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can unlock marketplace items");
    };

    switch (marketplaceItems.get(itemId)) {
      case (null) {
        Runtime.trap("Cannot unlock, item with id " # itemId.toText() # " does not exist");
      };
      case (?_) {
        let unlock : MarketplaceUnlock = {
          itemId = itemId;
          user = caller;
          timestamp = Time.now();
        };
        let existingUnlocks = switch (marketplaceUnlocks.get(caller)) {
          case (null) { List.empty<MarketplaceUnlock>() };
          case (?unlocks) { unlocks };
        };
        existingUnlocks.add(unlock);
        marketplaceUnlocks.add(caller, existingUnlocks);
      };
    };
  };

  public query ({ caller }) func getMyMarketplaceUnlocks() : async [MarketplaceUnlock] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their unlocks");
    };
    switch (marketplaceUnlocks.get(caller)) {
      case (null) { [] };
      case (?unlocks) { unlocks.toArray() };
    };
  };

  // -----------------------------------------------------------
  // COMMUNITY HUB
  // -----------------------------------------------------------
  public type CommunityTopic = {
    id : Nat;
    title : Text;
    content : Text;
    author : Principal;
    timestamp : Int;
    replyCount : Nat;
  };

  public type CommunityReply = {
    id : Nat;
    topicId : Nat;
    content : Text;
    author : Principal;
    timestamp : Int;
  };

  let communityTopics = Map.empty<Nat, CommunityTopic>();
  var nextTopicId = 0;

  let communityReplies = Map.empty<Nat, List.List<CommunityReply>>();
  var nextReplyId = 0;

  // Public browsing - anyone can view topics (including guests)
  public query func getCommunityTopics() : async [CommunityTopic] {
    communityTopics.values().toArray();
  };

  // Public browsing - anyone can view a topic (including guests)
  public query func getCommunityTopic(id : Nat) : async ?CommunityTopic {
    communityTopics.get(id);
  };

  // Public browsing - anyone can view replies (including guests)
  public query func getCommunityReplies(topicId : Nat) : async [CommunityReply] {
    switch (communityReplies.get(topicId)) {
      case (null) { [] };
      case (?replies) { replies.toArray() };
    };
  };

  // Only authenticated users can create topics
  public shared ({ caller }) func createCommunityTopic(title : Text, content : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create community topics");
    };

    let topic : CommunityTopic = {
      id = nextTopicId;
      title;
      content;
      author = caller;
      timestamp = Time.now();
      replyCount = 0;
    };

    communityTopics.add(nextTopicId, topic);
    nextTopicId += 1;
    topic.id;
  };

  // Only authenticated users can add replies
  public shared ({ caller }) func addCommunityReply(topicId : Nat, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add community replies");
    };

    switch (communityTopics.get(topicId)) {
      case (null) {
        Runtime.trap("Cannot add reply, topic with id " # topicId.toText() # " does not exist");
      };
      case (?topic) {
        let reply : CommunityReply = {
          id = nextReplyId;
          topicId;
          content;
          author = caller;
          timestamp = Time.now();
        };

        let existingReplies = switch (communityReplies.get(topicId)) {
          case (null) { List.empty<CommunityReply>() };
          case (?replies) { replies };
        };
        existingReplies.add(reply);
        communityReplies.add(topicId, existingReplies);

        // Update reply count
        let updatedTopic = {
          topic with replyCount = topic.replyCount + 1;
        };
        communityTopics.add(topicId, updatedTopic);

        nextReplyId += 1;
      };
    };
  };

  // -----------------------------------------------------------
  // REWARDS SYSTEM
  // -----------------------------------------------------------
  public type RewardEvent = {
    id : Nat;
    user : Principal;
    points : Int; // Can be positive (earn) or negative (redeem)
    description : Text;
    timestamp : Int;
  };

  let userRewardPoints = Map.empty<Principal, Int>();
  let rewardEvents = Map.empty<Nat, RewardEvent>();
  var nextRewardEventId = 0;

  // Users can view their own reward points
  public query ({ caller }) func getMyRewardPoints() : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their reward points");
    };
    switch (userRewardPoints.get(caller)) {
      case (null) { 0 };
      case (?points) { points };
    };
  };

  // Users can view their own reward events
  public query ({ caller }) func getMyRewardEvents() : async [RewardEvent] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their reward events");
    };
    rewardEvents.values().toArray().filter(
      func(event) { event.user == caller }
    );
  };

  // Users can earn reward points
  public shared ({ caller }) func earnRewardPoints(points : Nat, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can earn reward points");
    };

    let currentPoints = switch (userRewardPoints.get(caller)) {
      case (null) { 0 };
      case (?pts) { pts };
    };

    let newPoints = currentPoints + points;
    userRewardPoints.add(caller, newPoints);

    let event : RewardEvent = {
      id = nextRewardEventId;
      user = caller;
      points = points;
      description;
      timestamp = Time.now();
    };
    rewardEvents.add(nextRewardEventId, event);
    nextRewardEventId += 1;
  };

  // Users can redeem reward points
  public shared ({ caller }) func redeemRewardPoints(points : Nat, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can redeem reward points");
    };

    let currentPoints = switch (userRewardPoints.get(caller)) {
      case (null) { 0 };
      case (?pts) { pts };
    };

    if (currentPoints < points) {
      Runtime.trap("Insufficient reward points");
    };

    let newPoints = currentPoints - points;
    userRewardPoints.add(caller, newPoints);

    let event : RewardEvent = {
      id = nextRewardEventId;
      user = caller;
      points = -points;
      description;
      timestamp = Time.now();
    };
    rewardEvents.add(nextRewardEventId, event);
    nextRewardEventId += 1;
  };

  // -----------------------------------------------------------
  // TRADE FUNCTIONALITY
  // -----------------------------------------------------------
  public type TradeOrder = {
    id : Nat;
    user : Principal;
    orderType : { #buy; #sell };
    tokenPair : Text;
    amount : Nat;
    price : Nat;
    timestamp : Int;
    status : { #open; #filled; #cancelled };
  };

  public type Trade = {
    id : Nat;
    buyOrderId : Nat;
    sellOrderId : Nat;
    tokenPair : Text;
    amount : Nat;
    price : Nat;
    timestamp : Int;
  };

  let tradeOrders = Map.empty<Nat, TradeOrder>();
  var nextOrderId = 0;

  let trades = Map.empty<Nat, Trade>();
  var nextTradeId = 0;

  // Users can place trade orders
  public shared ({ caller }) func placeTradeOrder(
    orderType : { #buy; #sell },
    tokenPair : Text,
    amount : Nat,
    price : Nat
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place trade orders");
    };

    let order : TradeOrder = {
      id = nextOrderId;
      user = caller;
      orderType;
      tokenPair;
      amount;
      price;
      timestamp = Time.now();
      status = #open;
    };

    tradeOrders.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  // Users can view their own open orders
  public query ({ caller }) func getMyOpenOrders() : async [TradeOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their orders");
    };
    tradeOrders.values().toArray().filter(
      func(order) { order.user == caller and order.status == #open }
    );
  };

  // Users can cancel their own orders
  public shared ({ caller }) func cancelTradeOrder(orderId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can cancel orders");
    };

    switch (tradeOrders.get(orderId)) {
      case (null) {
        Runtime.trap("Order not found");
      };
      case (?order) {
        if (order.user != caller) {
          Runtime.trap("Unauthorized: Can only cancel your own orders");
        };
        if (order.status != #open) {
          Runtime.trap("Can only cancel open orders");
        };
        let updatedOrder = {
          order with status = #cancelled;
        };
        tradeOrders.add(orderId, updatedOrder);
      };
    };
  };

  // Public browsing - anyone can view recent trades (including guests)
  public query func getRecentTrades() : async [Trade] {
    trades.values().toArray();
  };

  // Admin function to execute a trade (match orders)
  public shared ({ caller }) func executeTrade(buyOrderId : Nat, sellOrderId : Nat) : async () {
    assertAdmin(caller);

    let buyOrder = switch (tradeOrders.get(buyOrderId)) {
      case (null) { Runtime.trap("Buy order not found") };
      case (?order) { order };
    };

    let sellOrder = switch (tradeOrders.get(sellOrderId)) {
      case (null) { Runtime.trap("Sell order not found") };
      case (?order) { order };
    };

    if (buyOrder.status != #open or sellOrder.status != #open) {
      Runtime.trap("Both orders must be open");
    };

    let trade : Trade = {
      id = nextTradeId;
      buyOrderId;
      sellOrderId;
      tokenPair = buyOrder.tokenPair;
      amount = buyOrder.amount;
      price = buyOrder.price;
      timestamp = Time.now();
    };

    trades.add(nextTradeId, trade);
    nextTradeId += 1;

    // Mark orders as filled
    tradeOrders.add(buyOrderId, { buyOrder with status = #filled });
    tradeOrders.add(sellOrderId, { sellOrder with status = #filled });
  };

  // -----------------------------------------------------------
  // GOVERNANCE & CONTROL LAYER
  // -----------------------------------------------------------

  public type PolicyRule = {
    name : Text;
    description : Text;
    active : Bool;
    expiry : ?Int;
    scope : Text;
    ruleType : Text;
    criteria : ?Text;
    allowedActions : [Text];
    enforced : Bool;
  };

  let policyRules = Map.empty<Nat, PolicyRule>();
  var nextPolicyId = 0;

  public shared ({ caller }) func createPolicyRule(rule : PolicyRule) : async () {
    assertAdmin(caller);

    let newRule = {
      rule with active = true;
    };

    policyRules.add(nextPolicyId, newRule);
    nextPolicyId += 1;
  };

  public shared ({ caller }) func updatePolicyRule(id : Nat, rule : PolicyRule) : async () {
    assertAdmin(caller);

    switch (policyRules.get(id)) {
      case (null) {
        Runtime.trap("Cannot update, policy rule with id " # id.toText() # " does not exist");
      };
      case (?_) {
        policyRules.add(id, rule);
      };
    };
  };

  public shared ({ caller }) func deletePolicyRule(id : Nat) : async () {
    assertAdmin(caller);

    switch (policyRules.get(id)) {
      case (null) {
        Runtime.trap("Cannot delete, policy rule with id " # id.toText() # " does not exist");
      };
      case (?_) {
        policyRules.remove(id);
      };
    };
  };

  // Users can view policy rules to understand governance
  public query ({ caller }) func getPolicyRules() : async [PolicyRule] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view policy rules");
    };
    policyRules.values().toArray();
  };

  public query ({ caller }) func getPolicyRuleById(id : Nat) : async ?PolicyRule {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view policy rules");
    };
    policyRules.get(id);
  };

  // -----------------------------------------------------------
  // AGENT STATUS UPDATE
  // -----------------------------------------------------------

  public type AgentStatus = {
    #active;
    #suspended;
    #pending;
  };

  public type VerificationStatus = {
    #verified;
    #pending;
    #suspended;
    #unverified;
  };

  public type AgentConfig = {
    name : Text;
    roleDescription : Text;
    capabilities : [Text];
    policyScope : Text;
    expiryTimestamp : Int;
    maxBudget : Nat;
    approvalRequired : Bool;
    maxSessions : ?Nat;
    status : AgentStatus;
    issueDate : Int; // New issueDate field
    verificationStatus : VerificationStatus; // New verificationStatus field
  };

  let agentConfigs = Map.empty<Principal, List.List<AgentConfig>>();

  public shared ({ caller }) func registerAgentConfig(config : AgentConfig) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register agent configs");
    };

    // Validate input data
    validateAgentConfig(config);

    // Default new agents to 'pending' status if not specified
    let newConfig : AgentConfig = switch (config.status) {
      case (#active or #suspended) {
        { config with status = #pending; verificationStatus = #unverified };
      };
      case (#pending) { config };
    };

    let existingConfigs = switch (agentConfigs.get(caller)) {
      case (null) { List.empty<AgentConfig>() };
      case (?configs) { configs };
    };
    existingConfigs.add(newConfig);
    agentConfigs.add(caller, existingConfigs);
  };

  public shared ({ caller }) func updateAgentConfigs(config : AgentConfig) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update agent configs");
    };
    let configs = switch (agentConfigs.get(caller)) {
      case (null) { List.empty<AgentConfig>() };
      case (?configs) { configs };
    };
    configs.add(config);
    agentConfigs.add(caller, configs);
  };

  public shared ({ caller }) func updateAgentStatus(_ : Nat, _ : AgentStatus) : async () {
    assertAdmin(caller);
  };

  public shared ({ caller }) func updateAgentVerificationStatus(agentId : Principal, configId : Nat, verificationStatus : VerificationStatus) : async () {
    assertAdmin(caller);

    switch (agentConfigs.get(agentId)) {
      case (null) {
        Runtime.trap("Agent with id " # agentId.toText() # " does not exist");
      };
      case (?configs) {
        if (configId >= configs.size()) {
          Runtime.trap(
            "Cannot update, configId is out of range. id: " # configId.toText() # " (size: " # configs.size().toText() # ")"
          );
        };

        let updatedConfigsArray = configs.toVarArray();
        let updatedConfig = {
          updatedConfigsArray[configId] with verificationStatus;
        };
        updatedConfigsArray[configId] := updatedConfig;

        agentConfigs.add(agentId, List.fromVarArray(updatedConfigsArray));
      };
    };
  };

  // Users can only view their own agent configs
  public query ({ caller }) func getMyAgentConfigs() : async [AgentConfig] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view agent configs");
    };
    switch (agentConfigs.get(caller)) {
      case (null) { [] };
      case (?configs) { configs.toArray() };
    };
  };

  // Admin can view all agent configs for governance
  public query ({ caller }) func getAllAgentConfigs() : async [AgentConfig] {
    assertAdmin(caller);
    let allConfigs = agentConfigs.map<Principal, List.List<AgentConfig>, [AgentConfig]>(
      func(_principal, configs) { configs.toArray() }
    );
    let allConfigsIter = allConfigs.values();
    let allConfigsArray = allConfigsIter.toArray();
    allConfigsArray.flatten();
  };

  func validateAgentConfig(config : AgentConfig) {
    if (config.name == "") { Runtime.trap("Name cannot be empty") };
    if (config.roleDescription == "") { Runtime.trap("Role description cannot be empty") };
    if (config.policyScope == "") { Runtime.trap("Policy scope cannot be empty") };
    if (config.expiryTimestamp <= 0) { Runtime.trap("Invalid expiry timestamp") };
    if (config.maxBudget <= 0) { Runtime.trap("Max budget must be greater than 0") };
  };

  // -----------------------------------------------------------
  // RECOMMENDED ADDITIONS ROADMAP
  // -----------------------------------------------------------

  public type RoadmapItem = {
    id : Nat;
    category : Text;
    description : Text;
    highPriority : Bool;
    lowPriority : Bool;
    assignedTo : Principal;
  };

  let roadmapItems = Map.empty<Nat, RoadmapItem>();
  var nextRoadmapId : Nat = 0;

  public type UserRoadmap = {
    highPriority : [RoadmapItem];
    mediumPriority : [RoadmapItem];
    lowPriority : [RoadmapItem];
  };

  let userRoadmaps = Map.empty<Principal, UserRoadmap>();

  public shared ({ caller }) func createRoadmapItem(item : RoadmapItem) : async () {
    assertAdmin(caller);

    let newItem = {
      item with id = nextRoadmapId;
    };

    roadmapItems.add(nextRoadmapId, newItem);
    nextRoadmapId += 1;
  };

  public shared ({ caller }) func updateRoadmapItem(id : Nat, item : RoadmapItem) : async () {
    assertAdmin(caller);

    switch (roadmapItems.get(id)) {
      case (null) {
        Runtime.trap("Cannot update, roadmap item with id " # id.toText() # " does not exist");
      };
      case (?_) {
        roadmapItems.add(id, item);
      };
    };
  };

  public shared ({ caller }) func deleteRoadmapItem(id : Nat) : async () {
    assertAdmin(caller);

    switch (roadmapItems.get(id)) {
      case (null) {
        Runtime.trap("Cannot delete, roadmap item with id " # id.toText() # " does not exist");
      };
      case (?_) {
        roadmapItems.remove(id);
      };
    };
  };

  public shared ({ caller }) func assignRoadmapItemToUser(itemId : Nat, user : Principal) : async () {
    assertAdmin(caller);

    switch (roadmapItems.get(itemId)) {
      case (null) {
        Runtime.trap("Cannot assign, roadmap item with id " # itemId.toText() # " does not exist");
      };
      case (?item) {
        if (item.assignedTo != user) {
          let updatedItem = {
            item with assignedTo = user;
          };
          roadmapItems.add(itemId, updatedItem);
        };
      };
    };
  };

  public shared ({ caller }) func createUserRoadmap(high : [RoadmapItem], medium : [RoadmapItem], low : [RoadmapItem]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create roadmaps");
    };

    let roadmap = {
      highPriority = high;
      mediumPriority = medium;
      lowPriority = low;
    };
    userRoadmaps.add(caller, roadmap);
  };

  public query ({ caller }) func getCurrentUserRoadmap() : async UserRoadmap {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their roadmap");
    };
    switch (userRoadmaps.get(caller)) {
      case (null) {
        Runtime.trap("No roadmap found for caller " # caller.toText());
      };
      case (?roadmap) { roadmap };
    };
  };

  // Users can browse available roadmap items
  public query ({ caller }) func getRoadmapItems() : async [RoadmapItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view roadmap items");
    };
    roadmapItems.values().toArray();
  };

  // Users can view roadmap items assigned to them
  public query ({ caller }) func getMyRoadmapItems() : async [RoadmapItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their roadmap items");
    };
    roadmapItems.values().toArray().filter(
      func(item) { item.assignedTo == caller }
    );
  };

  // Admin can view roadmap items for any user
  public query ({ caller }) func getRoadmapItemsForUser(userId : Principal) : async [RoadmapItem] {
    assertAdmin(caller);
    roadmapItems.values().toArray().filter(
      func(item) { item.assignedTo == userId }
    );
  };

  public query ({ caller }) func getRoadmapItem(id : Nat) : async RoadmapItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view roadmap items");
    };
    switch (roadmapItems.get(id)) {
      case (null) { Runtime.trap("No roadmap item found with id " # id.toText()) };
      case (?item) { item };
    };
  };

  // Admin can view any user's roadmap
  public query ({ caller }) func getUserRoadmap(user : Principal) : async UserRoadmap {
    assertAdmin(caller);
    switch (userRoadmaps.get(user)) {
      case (null) {
        Runtime.trap("No roadmap found for user " # user.toText());
      };
      case (?roadmap) { roadmap };
    };
  };

  // -----------------------------------------------------------
  // LABEL SET STATE FREEZE
  // -----------------------------------------------------------

  public type LabelSetState = {
    #notFreezed;
    #freezed;
  };

  var labelSetState : LabelSetState = #notFreezed;

  public shared ({ caller }) func freezeLabelSet() : async () {
    assertAdmin(caller);
    if (labelSetState == #freezed) {
      Runtime.trap("Label set is frozen and cannot be changed");
    };
    labelSetState := #freezed;
  };

  // Public query - anyone can verify the canonical label set state (including guests)
  public query func getLabelSetState() : async LabelSetState {
    labelSetState;
  };

  // -----------------------------------------------------------
  // ENTERPRISE ONBOARDING
  // -----------------------------------------------------------

  public type EnterpriseOnboardingRequest = {
    id : Nat;
    company : Text;
    contract : Text;
    user : Principal;
    onboardingStatus : { #pending; #approved; #rejected };
    notes : Text;
    timestamp : Time.Time;
  };

  let enterpriseOnboardingRequests = Map.empty<Nat, EnterpriseOnboardingRequest>();
  var nextEnterpriseRequestId : Nat = 0;

  public shared ({ caller }) func submitEnterpriseOnboardingRequest(company : Text, contract : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit onboarding requests");
    };

    let request : EnterpriseOnboardingRequest = {
      id = nextEnterpriseRequestId;
      company;
      contract;
      user = caller;
      onboardingStatus = #pending;
      notes = "";
      timestamp = Time.now();
    };

    enterpriseOnboardingRequests.add(nextEnterpriseRequestId, request);
    nextEnterpriseRequestId += 1;
    request.id;
  };

  public query ({ caller }) func getMyEnterpriseOnboardingRequests() : async [EnterpriseOnboardingRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their onboarding requests");
    };
    enterpriseOnboardingRequests.values().toArray().filter(
      func(request) { request.user == caller }
    );
  };

  // -----------------------------------------------------------
  // ADMIN ENTERPRISE ONBOARDING API
  // -----------------------------------------------------------

  public query ({ caller }) func getAllEnterpriseOnboardingRequests() : async [EnterpriseOnboardingRequest] {
    assertAdmin(caller);
    enterpriseOnboardingRequests.values().toArray();
  };

  public query ({ caller }) func getEnterpriseRequest(id : Nat) : async ?EnterpriseOnboardingRequest {
    assertAdmin(caller);
    enterpriseOnboardingRequests.get(id);
  };

  public shared ({ caller }) func updateEnterpriseRequestStatus(
    id : Nat,
    status : { #pending; #approved; #rejected },
    notes : Text,
  ) : async () {
    assertAdmin(caller);

    switch (enterpriseOnboardingRequests.get(id)) {
      case (null) {
        Runtime.trap("Cannot update, enterprise onboarding request with id " # id.toText() # " does not exist");
      };
      case (?request) {
        let updatedRequest = {
          request with
          onboardingStatus = status;
          notes;
        };
        enterpriseOnboardingRequests.add(id, updatedRequest);
      };
    };
  };

  // -----------------------------------------------------------
  // COMPLIANCE NOTARY HELPERS
  // -----------------------------------------------------------
  public query ({ caller }) func whoami() : async Text {
    caller.toText();
  };

  func isAdmin(caller : Principal) : Bool {
    ADMIN_PRINCIPALS.find<Text>(func(p) { p == caller.toText() }) != null
    or AccessControl.isAdmin(accessControlState, caller);
  };

  func assertAdmin(caller : Principal) {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized: Only admins can perform this action") };
  };

  public shared ({ caller }) func registerSelf() : async Text {
    return "registerSelf placeholder";
  };

  // List the current principal (for debug purposes)
  public query ({ caller }) func debugListUsers() : async [Principal] {
    return [caller];
  };
};
