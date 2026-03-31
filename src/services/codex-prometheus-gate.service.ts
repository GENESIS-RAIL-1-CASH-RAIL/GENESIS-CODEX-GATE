// ══════════════════════════════════════════════════════════════════════════
// Prometheus Strategic Decision Gate
// INDEPENDENT — does NOT see ARIS results, does NOT communicate with ARIS
// BUILD / DEFER / REJECT based on strategic value + doctrine alignment
// ══════════════════════════════════════════════════════════════════════════

import { StrategicAssessment, CodexEvaluation } from "../types.js";

// ── 16 Core Doctrines for alignment scoring ──
const CORE_DOCTRINES = [
  "RECON_FIRST",
  "OPERATOR_LIFECYCLE",
  "CLIP_CEILING",
  "ZERO_COPY_GATE",
  "CHAIN_OF_COMMAND",
  "THREE_STRIKE_DISCIPLINE",
  "PERPETUAL_WARGAME",
  "GHOST_COMMS",
  "SAS_ARB",
  "BATTLE_STATIONS",
  "BLACKOUT_PROTOCOL",
  "SOVEREIGN_LEDGER",
  "HUMAN_IN_THE_LOOP",
  "SF_GRADE_INGESTORS",
  "ATOMIC_REVERT",
  "RED_LINE_NO_KINETIC",
];

export class CodexPrometheusGateService {
  private assessments: Map<string, StrategicAssessment> = new Map();
  private assessmentOrder: string[] = [];

  assess(evaluation: CodexEvaluation): StrategicAssessment {
    const strategicValue = this.computeStrategicValue(evaluation);
    const doctrineAlignment = this.computeDoctrineAlignment(evaluation);
    const timingScore = this.computeTimingScore(evaluation);
    const resourceCost = this.estimateResourceCost(evaluation);

    // ── Decision Logic ──
    let decision: StrategicAssessment["decision"];
    if (
      strategicValue >= 70 &&
      doctrineAlignment >= 0.6 &&
      timingScore >= 0.5
    ) {
      decision = "BUILD";
    } else if (strategicValue >= 50 || doctrineAlignment >= 0.8) {
      decision = "DEFER";
    } else {
      decision = "REJECT";
    }

    this.assessmentOrder.push(evaluation.recommendationId);
    const priorityRank = this.assessmentOrder.length;

    const reasoning = this.generateReasoning(
      decision,
      strategicValue,
      doctrineAlignment,
      timingScore,
      evaluation
    );

    const assessment: StrategicAssessment = {
      recommendationId: evaluation.recommendationId,
      decision,
      strategicValue,
      priorityRank,
      doctrineAlignment,
      timingScore,
      resourceCost,
      reasoning,
      assessedAt: Date.now(),
    };

    this.assessments.set(evaluation.recommendationId, assessment);
    return assessment;
  }

  private computeStrategicValue(evaluation: CodexEvaluation): number {
    // Strategic value derived from CODEX score + scenario distribution
    const baseValue = evaluation.codexScore * 0.6;

    // Bonus for clean safety scenarios
    const safetyClean = evaluation.scenarios
      .filter((s) => s.category === "SAFETY_FAILURE" && s.mitigated)
      .length;
    const safetyBonus = (safetyClean / 20) * 20;

    // Penalty for adversarial exposure
    const adversarialUnmitigated = evaluation.scenarios
      .filter((s) => s.category === "ADVERSARIAL_EXPLOIT" && !s.mitigated)
      .length;
    const adversarialPenalty = adversarialUnmitigated * 2;

    return Math.round(
      Math.min(100, Math.max(0, baseValue + safetyBonus - adversarialPenalty))
    );
  }

  private computeDoctrineAlignment(evaluation: CodexEvaluation): number {
    // How well does this recommendation align with existing doctrines?
    // Based on whether sovereignty and self-modification scenarios are clean
    const sovereigntyClean = evaluation.scenarios
      .filter((s) => s.category === "SOVEREIGNTY_BREACH" && s.mitigated)
      .length;
    const selfModClean = evaluation.scenarios
      .filter((s) => s.category === "SELF_MODIFICATION" && s.mitigated)
      .length;

    const alignment =
      (sovereigntyClean / 20) * 0.5 + (selfModClean / 20) * 0.5;

    return Math.round(alignment * 100) / 100;
  }

  private computeTimingScore(evaluation: CodexEvaluation): number {
    // Timing based on overall risk profile
    const totalResidualRisk = evaluation.scenarios.reduce(
      (sum, s) => sum + s.residualRisk,
      0
    );
    const avgResidualRisk = totalResidualRisk / evaluation.scenarios.length;

    // Lower residual risk = better timing (safer to build now)
    return Math.round((1 - avgResidualRisk) * 100) / 100;
  }

  private estimateResourceCost(evaluation: CodexEvaluation): string {
    const unmitigated = evaluation.scenarios.filter((s) => !s.mitigated).length;
    if (unmitigated === 0) return "LOW (all scenarios mitigated)";
    if (unmitigated <= 5) return "MEDIUM (minor mitigations needed)";
    if (unmitigated <= 15) return "HIGH (significant mitigation work required)";
    return "VERY HIGH (extensive rework needed before build)";
  }

  private generateReasoning(
    decision: string,
    strategicValue: number,
    doctrineAlignment: number,
    timingScore: number,
    evaluation: CodexEvaluation
  ): string {
    const parts: string[] = [];

    parts.push(`Strategic value: ${strategicValue}/100.`);
    parts.push(`Doctrine alignment: ${(doctrineAlignment * 100).toFixed(0)}%.`);
    parts.push(`Timing score: ${(timingScore * 100).toFixed(0)}%.`);

    if (decision === "BUILD") {
      parts.push(
        "Recommendation meets all BUILD thresholds. Recommended for Commander review."
      );
    } else if (decision === "DEFER") {
      parts.push(
        "Recommendation shows promise but does not meet all BUILD thresholds. Queued for future evaluation."
      );
    } else {
      parts.push(
        "Recommendation does not meet minimum strategic thresholds. Rejected."
      );
    }

    if (evaluation.instantFailReason) {
      parts.push(`NOTE: CODEX instant fail — ${evaluation.instantFailReason}`);
    }

    return parts.join(" ");
  }

  getAssessment(recommendationId: string): StrategicAssessment | undefined {
    return this.assessments.get(recommendationId);
  }

  getAllAssessments(): StrategicAssessment[] {
    return Array.from(this.assessments.values()).sort(
      (a, b) => b.assessedAt - a.assessedAt
    );
  }
}
