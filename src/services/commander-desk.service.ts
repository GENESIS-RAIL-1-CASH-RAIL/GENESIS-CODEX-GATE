// ══════════════════════════════════════════════════════════════════════════
// Commander's Desk — Final Human Authority Queue
// ONLY recommendations that pass ALL THREE gates land here.
// Commander is the ONLY entity that can approve a build.
// Full audit trail on every decision.
// ══════════════════════════════════════════════════════════════════════════

import { v4 as uuid } from "uuid";
import {
  CommanderRecommendation,
  CommanderPriority,
  CodexEvaluation,
  StrategicAssessment,
  LegalAssessment,
} from "../types.js";

export class CommanderDeskService {
  private recommendations: Map<string, CommanderRecommendation> = new Map();

  /**
   * Submit a recommendation that has passed all three gates.
   * Only BUILD + PASS recommendations reach the desk.
   */
  submit(
    evaluation: CodexEvaluation,
    strategic: StrategicAssessment,
    legal: LegalAssessment
  ): CommanderRecommendation | null {
    // HARD GATE: Only BUILD + PASS reaches Commander
    if (strategic.decision !== "BUILD") {
      console.warn(
        `[COMMANDER-DESK] Rejected: ${evaluation.recommendationId} — strategic decision was ${strategic.decision}, not BUILD`
      );
      return null;
    }
    if (legal.verdict !== "PASS") {
      console.warn(
        `[COMMANDER-DESK] Rejected: ${evaluation.recommendationId} — legal verdict was ${legal.verdict}, not PASS`
      );
      return null;
    }
    if (evaluation.verdict !== "PASS") {
      console.warn(
        `[COMMANDER-DESK] Rejected: ${evaluation.recommendationId} — CODEX verdict was ${evaluation.verdict}, not PASS`
      );
      return null;
    }

    const unmitigatedRisks = evaluation.scenarios.filter((s) => !s.mitigated).length;
    const priority = this.determinePriority(evaluation, strategic);

    const rec: CommanderRecommendation = {
      id: uuid(),
      sparkId: evaluation.sparkId,
      title: evaluation.title,
      codexScore: evaluation.codexScore,
      strategicDecision: "BUILD",
      legalVerdict: "PASS",
      adversarialScenariosRun: evaluation.scenarios.length,
      unmitigatedRisks,
      estimatedBuildEffort: strategic.resourceCost,
      priority,
      status: "PENDING",
      commanderNotes: null,
      arrivedAt: Date.now(),
      decidedAt: null,
    };

    this.recommendations.set(rec.id, rec);
    console.log(
      `[COMMANDER-DESK] New recommendation queued: ${rec.title} (priority: ${priority}, codexScore: ${evaluation.codexScore})`
    );
    return rec;
  }

  private determinePriority(
    evaluation: CodexEvaluation,
    strategic: StrategicAssessment
  ): CommanderPriority {
    if (strategic.strategicValue >= 90 && evaluation.codexScore >= 90) {
      return "CRITICAL";
    }
    if (strategic.strategicValue >= 70 || evaluation.codexScore >= 85) {
      return "HIGH";
    }
    return "NORMAL";
  }

  approve(id: string, notes: string | null = null): CommanderRecommendation | null {
    const rec = this.recommendations.get(id);
    if (!rec) return null;
    if (rec.status !== "PENDING") return null;

    rec.status = "APPROVED";
    rec.commanderNotes = notes;
    rec.decidedAt = Date.now();

    console.log(`[COMMANDER-DESK] APPROVED: ${rec.title} — build authorised`);
    return rec;
  }

  reject(id: string, notes: string | null = null): CommanderRecommendation | null {
    const rec = this.recommendations.get(id);
    if (!rec) return null;
    if (rec.status !== "PENDING") return null;

    rec.status = "REJECTED";
    rec.commanderNotes = notes;
    rec.decidedAt = Date.now();

    console.log(`[COMMANDER-DESK] REJECTED: ${rec.title} — archived`);
    return rec;
  }

  getPending(): CommanderRecommendation[] {
    return Array.from(this.recommendations.values())
      .filter((r) => r.status === "PENDING")
      .sort((a, b) => {
        const priorityOrder = { CRITICAL: 0, HIGH: 1, NORMAL: 2 };
        const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (pDiff !== 0) return pDiff;
        return a.arrivedAt - b.arrivedAt;
      });
  }

  getHistory(): CommanderRecommendation[] {
    return Array.from(this.recommendations.values())
      .filter((r) => r.status !== "PENDING")
      .sort((a, b) => (b.decidedAt || 0) - (a.decidedAt || 0));
  }

  getById(id: string): CommanderRecommendation | undefined {
    return this.recommendations.get(id);
  }

  /**
   * Stale recommendation cleanup — recommendations pending > 7 days
   * get flagged (not auto-rejected — only Commander decides).
   */
  getStale(maxAgeMs: number = 7 * 24 * 60 * 60 * 1000): CommanderRecommendation[] {
    const cutoff = Date.now() - maxAgeMs;
    return this.getPending().filter((r) => r.arrivedAt < cutoff);
  }
}
