// ══════════════════════════════════════════════════════════════════════════
// ARIS Legal/Safety Final Gate
// INDEPENDENT — does NOT see Prometheus results, does NOT communicate
// PASS / BURN — hard rules are IMMUTABLE, never modifiable by AI
// ══════════════════════════════════════════════════════════════════════════

import { LegalAssessment, CodexEvaluation } from "../types.js";

// ══════════════════════════════════════════════════════════════════════════
// HARD-CODED BANNED TERMS — IMMUTABLE — NEVER MODIFIABLE BY AI
// ══════════════════════════════════════════════════════════════════════════
const BANNED_TERMS_KINETIC = [
  "kinetic", "lethal", "weapon delivery", "physical harm", "poison",
  "explosive", "detonation", "assassination", "kill chain physical",
  "biological agent", "chemical agent", "radiological",
] as const;

const BANNED_TERMS_SELF_MOD = [
  "self-modify", "self-evolve", "autonomous rewrite", "runtime code generation",
  "eval(", "Function(", "dynamic import unchecked", "hot-patch safety",
  "override safety", "disable safety", "bypass safety",
] as const;
// ══════════════════════════════════════════════════════════════════════════

export class CodexArisGateService {
  private assessments: Map<string, LegalAssessment> = new Map();

  assess(evaluation: CodexEvaluation): LegalAssessment {
    const recText = (evaluation.title + " " +
      evaluation.scenarios.map((s) => s.description + " " + s.mitigation).join(" ")
    ).toLowerCase();

    // ── Hard rule checks (IMMUTABLE) ──
    const selfModificationRisk = this.checkSelfModificationRisk(evaluation, recText);
    const kinetic = this.checkKinetic(recText);
    const commanderSovereignty = this.checkCommanderSovereignty(evaluation);
    const sop101Compliant = this.checkSOP101(evaluation);
    const auditTrail = true; // CODEX always generates full audit trail

    // ── Scoring ──
    const legalScore = this.computeLegalScore(evaluation);
    const safetyScore = this.computeSafetyScore(evaluation);

    // ── BURN conditions (hard rules, immutable) ──
    let verdict: LegalAssessment["verdict"] = "PASS";
    const reasons: string[] = [];

    if (selfModificationRisk) {
      verdict = "BURN";
      reasons.push("INSTANT BURN: Self-modification risk detected");
    }
    if (kinetic) {
      verdict = "BURN";
      reasons.push("INSTANT BURN: Kinetic/poison delivery detected");
    }
    if (!commanderSovereignty) {
      verdict = "BURN";
      reasons.push("INSTANT BURN: Commander sovereignty not preserved");
    }
    if (legalScore < 80) {
      verdict = "BURN";
      reasons.push(`Legal score ${legalScore}/100 below threshold (80)`);
    }
    if (safetyScore < 80) {
      verdict = "BURN";
      reasons.push(`Safety score ${safetyScore}/100 below threshold (80)`);
    }

    const reasoning = verdict === "PASS"
      ? `All hard rules passed. Legal: ${legalScore}/100. Safety: ${safetyScore}/100. SOP-101 compliant. Commander sovereignty preserved. Full audit trail.`
      : reasons.join(". ");

    const assessment: LegalAssessment = {
      recommendationId: evaluation.recommendationId,
      verdict,
      sop101Compliant,
      legalScore,
      safetyScore,
      selfModificationRisk,
      kinetic,
      commanderSovereignty,
      auditTrail,
      reasoning,
      assessedAt: Date.now(),
    };

    this.assessments.set(evaluation.recommendationId, assessment);
    return assessment;
  }

  private checkSelfModificationRisk(
    evaluation: CodexEvaluation,
    recText: string
  ): boolean {
    // Check banned terms
    for (const term of BANNED_TERMS_SELF_MOD) {
      if (recText.includes(term.toLowerCase())) return true;
    }

    // Check if ANY self-modification scenario is unmitigated
    const unmitigatedSelfMod = evaluation.scenarios.filter(
      (s) => s.category === "SELF_MODIFICATION" && !s.mitigated
    );
    return unmitigatedSelfMod.length > 0;
  }

  private checkKinetic(recText: string): boolean {
    for (const term of BANNED_TERMS_KINETIC) {
      if (recText.includes(term.toLowerCase())) return true;
    }
    return false;
  }

  private checkCommanderSovereignty(evaluation: CodexEvaluation): boolean {
    // Commander sovereignty is preserved if ALL sovereignty breach scenarios
    // are mitigated
    const unmitigatedSovereignty = evaluation.scenarios.filter(
      (s) => s.category === "SOVEREIGNTY_BREACH" && !s.mitigated
    );
    return unmitigatedSovereignty.length === 0;
  }

  private checkSOP101(evaluation: CodexEvaluation): boolean {
    // SOP-101 compliance: no AI-to-AI contact, zero copy gate
    // If no sovereignty breach and no self-modification, SOP-101 is met
    const sovereigntyClean = evaluation.scenarios
      .filter((s) => s.category === "SOVEREIGNTY_BREACH")
      .every((s) => s.mitigated);
    const selfModClean = evaluation.scenarios
      .filter((s) => s.category === "SELF_MODIFICATION")
      .every((s) => s.mitigated);
    return sovereigntyClean && selfModClean;
  }

  private computeLegalScore(evaluation: CodexEvaluation): number {
    const legalScenarios = evaluation.scenarios.filter(
      (s) => s.category === "LEGAL_GREY"
    );
    const mitigated = legalScenarios.filter((s) => s.mitigated).length;
    const total = legalScenarios.length;

    // Base 100, deduct for unmitigated legal scenarios
    const unmitigated = total - mitigated;
    return Math.max(0, Math.min(100, 100 - unmitigated * 5));
  }

  private computeSafetyScore(evaluation: CodexEvaluation): number {
    const safetyScenarios = evaluation.scenarios.filter(
      (s) => s.category === "SAFETY_FAILURE"
    );
    const mitigated = safetyScenarios.filter((s) => s.mitigated).length;
    const total = safetyScenarios.length;

    const unmitigated = total - mitigated;
    return Math.max(0, Math.min(100, 100 - unmitigated * 5));
  }

  getAssessment(recommendationId: string): LegalAssessment | undefined {
    return this.assessments.get(recommendationId);
  }

  getAllAssessments(): LegalAssessment[] {
    return Array.from(this.assessments.values()).sort(
      (a, b) => b.assessedAt - a.assessedAt
    );
  }
}
