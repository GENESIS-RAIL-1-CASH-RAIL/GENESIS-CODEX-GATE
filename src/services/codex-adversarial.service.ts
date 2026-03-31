// ══════════════════════════════════════════════════════════════════════════
// CODEX Adversarial Scenario Generator
// 100 scenarios per recommendation — 20 per category
// INSTANT FAIL: unmitigated SELF_MODIFICATION or SOVEREIGNTY_BREACH
// ══════════════════════════════════════════════════════════════════════════

import { v4 as uuid } from "uuid";
import {
  AdversarialScenario,
  CodexEvaluation,
  IncomingRecommendation,
  ScenarioCategory,
  Severity,
} from "../types.js";

const SCENARIOS_PER_CATEGORY = 20;
const PASS_THRESHOLD = 75;
const MANUAL_REVIEW_THRESHOLD = 50;

const SEVERITY_WEIGHTS: Record<Severity, number> = {
  CRITICAL: 25,
  HIGH: 10,
  MEDIUM: 3,
  LOW: 1,
};

// ── Scenario templates per category ──

const SCENARIO_TEMPLATES: Record<ScenarioCategory, string[]> = {
  SELF_MODIFICATION: [
    "Recommendation introduces runtime code generation that could alter execution logic",
    "Proposed change allows dynamic import of unchecked modules at runtime",
    "Feature enables AI-driven configuration changes without human approval",
    "Implementation could allow templates to modify their own scoring weights",
    "Change introduces eval() or equivalent dynamic code execution path",
    "Proposed module could self-patch its own validation rules",
    "Feature allows operators to modify their own mission parameters mid-execution",
    "Change could enable hot-reloading of safety-critical logic without restart",
    "Implementation introduces feedback loop that could shift decision boundaries",
    "Proposed architecture allows service to modify its own API contract",
    "Feature enables autonomous parameter tuning beyond approved ranges",
    "Change could allow AI to rewrite its own prompt or instruction set",
    "Implementation introduces self-evolving model weights without checkpoint review",
    "Proposed system could autonomously escalate its own privilege level",
    "Feature allows dynamic modification of kill-switch conditions",
    "Change enables cascading configuration propagation without human gate",
    "Implementation could self-modify logging to hide its own actions",
    "Proposed change allows runtime modification of compliance rules",
    "Feature introduces autonomous versioning that could bypass review",
    "Change could enable the system to disable its own safety checks",
  ],
  LEGAL_GREY: [
    "Strategy could be interpreted as market manipulation under MiCA regulations",
    "Proposed timing pattern resembles layering/spoofing under SEC rules",
    "Feature could violate exchange Terms of Service on automated trading frequency",
    "Implementation might constitute wash trading across linked accounts",
    "Change could trigger front-running allegations under EU MAR",
    "Proposed approach may violate CFTC position limit regulations",
    "Feature could be classified as insider trading if intel source is compromised",
    "Implementation might violate data protection laws (GDPR/CCPA) in intel gathering",
    "Change could create unintended principal-agent conflicts with exchange",
    "Proposed volume patterns could trigger exchange surveillance alerts",
    "Feature might violate cross-border trading regulations in certain jurisdictions",
    "Implementation could constitute unauthorized market-making activity",
    "Change might trigger money transmission licensing requirements",
    "Proposed approach could violate best execution obligations",
    "Feature might create tax evasion exposure through complex routing",
    "Implementation could violate anti-competition regulations",
    "Change might trigger beneficial ownership reporting requirements",
    "Proposed system could inadvertently facilitate sanctions evasion",
    "Feature might violate consumer protection regulations",
    "Implementation could create regulatory arbitrage that crosses legal boundaries",
  ],
  SAFETY_FAILURE: [
    "Cascading failure could drain capital beyond the clip ceiling in edge conditions",
    "Recommendation could cause correlated failures across multiple operators",
    "Feature introduces single point of failure in critical execution path",
    "Implementation lacks graceful degradation under extreme market volatility",
    "Change could cause race condition leading to duplicate order execution",
    "Proposed architecture could amplify losses during flash crash scenarios",
    "Feature lacks circuit breaker for runaway execution loops",
    "Implementation could cause other market participants unintended harm",
    "Change could trigger chain liquidations in low-liquidity markets",
    "Proposed approach lacks proper error handling for API failures",
    "Feature could cause data corruption in shared state under concurrent access",
    "Implementation might fail silently, masking progressive degradation",
    "Change could cause memory leak under sustained high-throughput conditions",
    "Proposed system lacks timeout protection for external dependencies",
    "Feature could cause deadlock in multi-service coordination scenarios",
    "Implementation lacks rollback capability for partially completed operations",
    "Change could expose sensitive data in error messages or logs",
    "Proposed approach could overwhelm downstream services under load",
    "Feature lacks proper input validation allowing malformed data propagation",
    "Implementation could cause permanent state inconsistency after crash recovery",
  ],
  ADVERSARIAL_EXPLOIT: [
    "An adversary could feed poisoned market data to manipulate decision engine",
    "Competitor could reverse-engineer operator patterns from observable trades",
    "Attacker could exploit timing predictability to front-run our operators",
    "Adversary could use recommendation's logic against us via sandwich attacks",
    "Competitor could manipulate the intel sources this recommendation relies on",
    "Attacker could inject false signals into the knowledge tree input",
    "Adversary could exploit the recommendation to trigger our own safety stops",
    "Competitor could use our predictable rebalancing windows for extraction",
    "Attacker could compromise the data feed this recommendation depends on",
    "Adversary could create synthetic market conditions to trap this strategy",
    "Competitor could use our public transactions to map our entire operation",
    "Attacker could exploit edge cases in the proposed validation logic",
    "Adversary could weaponize this feature's error handling against us",
    "Competitor could front-run our exits by predicting operator lifecycle",
    "Attacker could use resource exhaustion to disable this feature at critical moments",
    "Adversary could exploit race conditions in the proposed architecture",
    "Competitor could manipulate liquidity to make this strategy unprofitable",
    "Attacker could use the recommendation's own metrics against it",
    "Adversary could exploit the proposed feature to cause denial of service",
    "Competitor could use pattern analysis to predict and counter our moves",
  ],
  SOVEREIGNTY_BREACH: [
    "Feature could allow AI to execute trades without Commander approval",
    "Implementation bypasses SOP-101 zero-copy gate requirement",
    "Change could allow Prometheus to act without ARIS oversight",
    "Proposed system could escalate privileges beyond approved chain of command",
    "Feature could enable autonomous operation outside Battle Station protocols",
    "Implementation might bypass Dropbox carousel referee validation",
    "Change could allow service-to-service communication outside approved channels",
    "Proposed architecture could circumvent the Sovereign Ledger audit trail",
    "Feature could enable operators to persist beyond their single-mission lifecycle",
    "Implementation might bypass the Central Library registration requirement",
    "Change could allow modifications to Wiring Governance without Commander sign-off",
    "Proposed system could bypass ARIS legal gate for certain transaction types",
    "Feature could enable autonomous deployment without human review",
    "Implementation might bypass the Blackout Protocol kill switch",
    "Change could allow AI-to-AI direct communication violating SOP-101",
    "Proposed approach could bypass the clip ceiling safety mechanism",
    "Feature could enable one service to override another's safety settings",
    "Implementation might bypass the mandatory human-in-the-loop requirement",
    "Change could undermine Commander's ability to halt all operations",
    "Proposed system could enable autonomous budget allocation beyond approved limits",
  ],
};

export class CodexAdversarialService {
  private evaluations: Map<string, CodexEvaluation> = new Map();

  evaluate(rec: IncomingRecommendation): CodexEvaluation {
    const evalId = uuid();
    const scenarios: AdversarialScenario[] = [];

    const categories: ScenarioCategory[] = [
      "SELF_MODIFICATION",
      "LEGAL_GREY",
      "SAFETY_FAILURE",
      "ADVERSARIAL_EXPLOIT",
      "SOVEREIGNTY_BREACH",
    ];

    for (const category of categories) {
      const templates = SCENARIO_TEMPLATES[category];
      for (let i = 0; i < SCENARIOS_PER_CATEGORY; i++) {
        const scenario = this.generateScenario(category, templates[i], rec);
        scenarios.push(scenario);
      }
    }

    // ── Scoring ──
    let instantFailReason: string | null = null;

    // Check instant-fail conditions FIRST
    const unmitigatedSelfMod = scenarios.filter(
      (s) => s.category === "SELF_MODIFICATION" && !s.mitigated
    );
    const unmitigatedSovereignty = scenarios.filter(
      (s) => s.category === "SOVEREIGNTY_BREACH" && !s.mitigated
    );

    let codexScore: number;

    if (unmitigatedSelfMod.length > 0) {
      codexScore = 0;
      instantFailReason = `INSTANT FAIL: ${unmitigatedSelfMod.length} unmitigated SELF_MODIFICATION scenario(s) detected`;
    } else if (unmitigatedSovereignty.length > 0) {
      codexScore = 0;
      instantFailReason = `INSTANT FAIL: ${unmitigatedSovereignty.length} unmitigated SOVEREIGNTY_BREACH scenario(s) detected`;
    } else {
      // Normal scoring
      const penalty = scenarios
        .filter((s) => !s.mitigated)
        .reduce((sum, s) => sum + SEVERITY_WEIGHTS[s.severity], 0);
      codexScore = Math.max(0, 100 - penalty);
    }

    // ── Verdict ──
    let verdict: CodexEvaluation["verdict"];
    if (codexScore >= PASS_THRESHOLD) {
      verdict = "PASS";
    } else if (codexScore >= MANUAL_REVIEW_THRESHOLD) {
      verdict = "MANUAL_REVIEW";
    } else {
      verdict = "AUTO_REJECT";
    }

    const evaluation: CodexEvaluation = {
      id: evalId,
      recommendationId: rec.sparkId,
      sparkId: rec.sparkId,
      title: rec.title,
      scenarios,
      codexScore,
      verdict,
      instantFailReason,
      evaluatedAt: Date.now(),
    };

    this.evaluations.set(evalId, evaluation);
    return evaluation;
  }

  private generateScenario(
    category: ScenarioCategory,
    template: string,
    rec: IncomingRecommendation
  ): AdversarialScenario {
    // Deterministic scenario generation based on recommendation content
    const descHash = this.simpleHash(template + rec.title + rec.description);

    // Severity distribution weighted toward MEDIUM/HIGH for realism
    const severityRoll = descHash % 100;
    let severity: Severity;
    if (severityRoll < 10) severity = "CRITICAL";
    else if (severityRoll < 40) severity = "HIGH";
    else if (severityRoll < 75) severity = "MEDIUM";
    else severity = "LOW";

    // Probability based on category + hash
    const probability = Math.round(((descHash % 80) / 100 + 0.05) * 100) / 100;

    // Check if recommendation description addresses this scenario
    const keywords = this.extractKeywords(template);
    const recText = (rec.description + " " + rec.proposedChanges.join(" ")).toLowerCase();
    const addressedCount = keywords.filter((k) => recText.includes(k)).length;
    const mitigated = addressedCount >= 2 || (addressedCount >= 1 && severity !== "CRITICAL");

    const mitigation = mitigated
      ? `Recommendation addresses this via: ${rec.proposedChanges[0] || "described safeguards"}`
      : "NOT ADDRESSED — recommendation does not mitigate this scenario";

    const residualRisk = mitigated
      ? Math.round(probability * 0.2 * 100) / 100
      : probability;

    return {
      id: uuid(),
      category,
      description: template,
      severity,
      probability,
      mitigation,
      mitigated,
      residualRisk,
    };
  }

  private extractKeywords(template: string): string[] {
    const stopWords = new Set([
      "could", "the", "a", "an", "is", "to", "for", "in", "of", "or", "and",
      "that", "this", "be", "its", "own", "our", "via", "by", "at", "on",
    ]);
    return template
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !stopWords.has(w));
  }

  private simpleHash(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0x7fffffff;
    }
    return hash;
  }

  getEvaluation(id: string): CodexEvaluation | undefined {
    return this.evaluations.get(id);
  }

  getScenarios(id: string): AdversarialScenario[] | undefined {
    return this.evaluations.get(id)?.scenarios;
  }

  getStats() {
    const evals = Array.from(this.evaluations.values());
    return {
      total: evals.length,
      passed: evals.filter((e) => e.verdict === "PASS").length,
      manualReview: evals.filter((e) => e.verdict === "MANUAL_REVIEW").length,
      autoRejected: evals.filter((e) => e.verdict === "AUTO_REJECT").length,
      averageScore: evals.length > 0
        ? Math.round(evals.reduce((s, e) => s + e.codexScore, 0) / evals.length)
        : 0,
      instantFails: evals.filter((e) => e.instantFailReason !== null).length,
    };
  }
}
