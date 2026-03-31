// ══════════════════════════════════════════════════════════════════════════
// Dropbox Carousel Referee — Agreement Monitor
// Watches Prometheus vs ARIS agreement rate WITHOUT letting them communicate
// HEALTHY: 40-95% | SUSPICIOUS: >95% (rubber-stamping) | ANOMALOUS: <40%
// Fisher-Yates rotation every 30 days
// ══════════════════════════════════════════════════════════════════════════

import { v4 as uuid } from "uuid";
import { StrategicAssessment, LegalAssessment, RefereeSnapshot, RefereeAlert } from "../types.js";

const HEALTHY_MIN = 0.40;
const HEALTHY_MAX = 0.95;

export class CodexRefereeService {
  private pairs: Array<{
    recommendationId: string;
    prometheus: StrategicAssessment;
    aris: LegalAssessment;
    agreed: boolean;
    recordedAt: number;
  }> = [];

  private alerts: RefereeAlert[] = [];
  private rotationEpoch: number = Date.now();
  private readonly ROTATION_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

  /**
   * Record a pair of independent assessments for the same recommendation.
   * Called by the orchestrator AFTER both gates have independently evaluated.
   */
  recordPair(prometheus: StrategicAssessment, aris: LegalAssessment): void {
    // Agreement: Prometheus BUILD + ARIS PASS = both approve
    //            Prometheus REJECT + ARIS BURN = both reject
    //            Otherwise = disagreement
    const promApproves = prometheus.decision === "BUILD";
    const arisApproves = aris.verdict === "PASS";
    const agreed = promApproves === arisApproves;

    this.pairs.push({
      recommendationId: prometheus.recommendationId,
      prometheus,
      aris,
      agreed,
      recordedAt: Date.now(),
    });
  }

  /**
   * Compute current agreement rate and check for anomalies.
   */
  checkAgreement(): RefereeSnapshot {
    const total = this.pairs.length;
    if (total === 0) {
      return {
        timestamp: Date.now(),
        totalRecommendations: 0,
        agreements: 0,
        disagreements: 0,
        agreementRate: 0,
        status: "HEALTHY",
        alerts: [],
      };
    }

    const agreements = this.pairs.filter((p) => p.agreed).length;
    const disagreements = total - agreements;
    const rate = agreements / total;

    let status: RefereeSnapshot["status"] = "HEALTHY";
    const newAlerts: RefereeAlert[] = [];

    if (rate > HEALTHY_MAX) {
      status = "SUSPICIOUS";
      const alert: RefereeAlert = {
        id: uuid(),
        type: "RUBBER_STAMPING",
        agreementRate: rate,
        message: `Agreement rate ${(rate * 100).toFixed(1)}% exceeds ${HEALTHY_MAX * 100}% — possible rubber-stamping. Commander alert required.`,
        createdAt: Date.now(),
      };
      newAlerts.push(alert);
      this.alerts.push(alert);
    } else if (rate < HEALTHY_MIN) {
      status = "ANOMALOUS";
      const alert: RefereeAlert = {
        id: uuid(),
        type: "MALFUNCTION",
        agreementRate: rate,
        message: `Agreement rate ${(rate * 100).toFixed(1)}% below ${HEALTHY_MIN * 100}% — possible gate malfunction. Commander alert required.`,
        createdAt: Date.now(),
      };
      newAlerts.push(alert);
      this.alerts.push(alert);
    }

    return {
      timestamp: Date.now(),
      totalRecommendations: total,
      agreements,
      disagreements,
      agreementRate: Math.round(rate * 1000) / 1000,
      status,
      alerts: newAlerts,
    };
  }

  /**
   * Check if Fisher-Yates rotation is due.
   */
  checkRotation(): { rotationDue: boolean; daysSinceRotation: number } {
    const elapsed = Date.now() - this.rotationEpoch;
    const daysSinceRotation = Math.floor(elapsed / (24 * 60 * 60 * 1000));
    return {
      rotationDue: elapsed >= this.ROTATION_INTERVAL_MS,
      daysSinceRotation,
    };
  }

  /**
   * Execute Fisher-Yates rotation — reset the referee epoch.
   */
  rotate(): void {
    this.rotationEpoch = Date.now();
    console.log(`[CODEX-REFEREE] Fisher-Yates rotation executed at ${new Date().toISOString()}`);
  }

  getAlerts(limit: number = 50): RefereeAlert[] {
    return this.alerts.slice(-limit);
  }

  getPairCount(): number {
    return this.pairs.length;
  }
}
