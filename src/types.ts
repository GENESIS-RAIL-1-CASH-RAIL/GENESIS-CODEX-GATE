// ══════════════════════════════════════════════════════════════════════════
// GENESIS-CODEX-GATE — Type Definitions
// Zero Trust AI Governance — Triple Independent Gate
// ══════════════════════════════════════════════════════════════════════════

// ── Adversarial Scenario Types ──

export type ScenarioCategory =
  | "SELF_MODIFICATION"
  | "LEGAL_GREY"
  | "SAFETY_FAILURE"
  | "ADVERSARIAL_EXPLOIT"
  | "SOVEREIGNTY_BREACH";

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface AdversarialScenario {
  id: string;
  category: ScenarioCategory;
  description: string;
  severity: Severity;
  probability: number;          // 0-1
  mitigation: string;
  mitigated: boolean;
  residualRisk: number;         // 0-1
}

export interface CodexEvaluation {
  id: string;
  recommendationId: string;
  sparkId: string;
  title: string;
  scenarios: AdversarialScenario[];
  codexScore: number;
  verdict: "PASS" | "MANUAL_REVIEW" | "AUTO_REJECT";
  instantFailReason: string | null;
  evaluatedAt: number;
}

// ── Isolation Types ──

export interface IsolationAudit {
  timestamp: number;
  prometheusContact: false;
  arisContact: false;
  unexpectedConnections: string[];
  isolationIntact: boolean;
}

// ── Prometheus Gate Types ──

export interface StrategicAssessment {
  recommendationId: string;
  decision: "BUILD" | "DEFER" | "REJECT";
  strategicValue: number;       // 0-100
  priorityRank: number;
  doctrineAlignment: number;    // 0-1
  timingScore: number;          // 0-1
  resourceCost: string;
  reasoning: string;
  assessedAt: number;
}

// ── ARIS Gate Types ──

export interface LegalAssessment {
  recommendationId: string;
  verdict: "PASS" | "BURN";
  sop101Compliant: boolean;
  legalScore: number;           // 0-100
  safetyScore: number;          // 0-100
  selfModificationRisk: boolean;
  kinetic: boolean;
  commanderSovereignty: boolean;
  auditTrail: boolean;
  reasoning: string;
  assessedAt: number;
}

// ── Referee Types ──

export interface RefereeSnapshot {
  timestamp: number;
  totalRecommendations: number;
  agreements: number;
  disagreements: number;
  agreementRate: number;
  status: "HEALTHY" | "SUSPICIOUS" | "ANOMALOUS";
  alerts: RefereeAlert[];
}

export interface RefereeAlert {
  id: string;
  type: "RUBBER_STAMPING" | "MALFUNCTION" | "DIVERGENCE";
  agreementRate: number;
  message: string;
  createdAt: number;
}

// ── Commander's Desk Types ──

export type CommanderPriority = "CRITICAL" | "HIGH" | "NORMAL";

export interface CommanderRecommendation {
  id: string;
  sparkId: string;
  title: string;
  codexScore: number;
  strategicDecision: "BUILD";
  legalVerdict: "PASS";
  adversarialScenariosRun: number;
  unmitigatedRisks: number;
  estimatedBuildEffort: string;
  priority: CommanderPriority;
  status: "PENDING" | "APPROVED" | "REJECTED";
  commanderNotes: string | null;
  arrivedAt: number;
  decidedAt: number | null;
}

// ── Incoming Recommendation ──

export interface IncomingRecommendation {
  sparkId: string;
  title: string;
  description: string;
  proposedChanges: string[];
  affectedServices: string[];
  estimatedBuildEffort?: string;
}
