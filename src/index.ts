// ══════════════════════════════════════════════════════════════════════════
// GENESIS-CODEX-GATE — Adversarial Security Gate (Zero Trust AI Governance)
// Port 8898 | ~25 Endpoints | 3 Loops
//
// ARCHITECTURE:
//   Spark Generator → Dropbox Protocol → CODEX (this) → Prometheus + ARIS → Commander
//
// CRITICAL ISOLATION:
//   CODEX, Prometheus, and ARIS NEVER communicate with each other.
//   They receive the same intel independently.
//   The Dropbox carousel referees all three.
//
// For EACH recommendation:
//   1. Generate 100 adversarial scenarios (20 per category)
//   2. Score: 100 - Σ(unmitigated × severity_weight)
//   3. Instant fail on unmitigated SELF_MODIFICATION or SOVEREIGNTY_BREACH
//   4. Pass threshold: ≥75 (PASS), 50-74 (MANUAL_REVIEW), <50 (AUTO_REJECT)
//   5. Prometheus strategic assessment (independent)
//   6. ARIS legal assessment (independent)
//   7. Referee monitors agreement rate
//   8. Only BUILD + PASS + PASS reaches Commander's Desk
//
// Chain of Command:
//   L6 COMMANDER (Human — sovereign authority, final word)
//   L5 PROMETHEUS (Strategic brain — BUILD/DEFER/REJECT)
//   L4 ARIS (Constitutional court — PASS/BURN)
//   CODEX sits BEFORE both — adversarial pre-filter
//
// RED LINES (IMMUTABLE):
//   - Self-modification = instant score 0
//   - Sovereignty breach = instant score 0
//   - Kinetic/poison = instant BURN
//   - Commander is ONLY entity that can approve a build
//   - Full audit trail on every decision
// ══════════════════════════════════════════════════════════════════════════

import express from "express";
import { CodexAdversarialService } from "./services/codex-adversarial.service.js";
import { CodexIsolationService } from "./services/codex-isolation.service.js";
import { CodexPrometheusGateService } from "./services/codex-prometheus-gate.service.js";
import { CodexArisGateService } from "./services/codex-aris-gate.service.js";
import { CodexRefereeService } from "./services/codex-referee.service.js";
import { CommanderDeskService } from "./services/commander-desk.service.js";
import { IncomingRecommendation } from "./types.js";

const PORT = 8898;
const SERVICE_NAME = "GENESIS-CODEX-GATE";
const VERSION = "1.0.0";
const CENTRAL_LIBRARY_URL = "http://localhost:8088";

const ISOLATION_AUDIT_INTERVAL_MS = 60_000;
const REFEREE_CHECK_INTERVAL_MS = 300_000;
const STALE_CLEANUP_INTERVAL_MS = 3_600_000;

const app = express();
app.use(express.json());
const bootTime = Date.now();

// ── Service Instantiation ──

const adversarial = new CodexAdversarialService();
const isolation = new CodexIsolationService();
const prometheusGate = new CodexPrometheusGateService();
const arisGate = new CodexArisGateService();
const referee = new CodexRefereeService();
const commanderDesk = new CommanderDeskService();

// ── Isolation Middleware ──
// Every inbound request is checked against banned services

app.use((req, _res, next) => {
  const source = req.headers["x-source-service"] as string | undefined;
  if (!isolation.validateInbound(source)) {
    _res.status(403).json({
      error: "ISOLATION BREACH — inbound from banned service blocked",
      frozen: true,
    });
    return;
  }
  if (isolation.isFrozen()) {
    _res.status(503).json({
      error: "CODEX is FROZEN — isolation breach detected. Commander must unfreeze.",
      frozen: true,
    });
    return;
  }
  next();
});

// ══════════════════════════════════════════════════════════════
// CODEX CORE ENDPOINTS (4)
// ══════════════════════════════════════════════════════════════

/**
 * POST /codex/evaluate
 * Submit a recommendation for 100-scenario adversarial check.
 * Then runs Prometheus + ARIS gates independently.
 * If all pass, queues to Commander's Desk.
 */
app.post("/codex/evaluate", (req, res) => {
  const rec: IncomingRecommendation = req.body;

  if (!rec.sparkId || !rec.title || !rec.description) {
    res.status(400).json({ error: "Missing required fields: sparkId, title, description" });
    return;
  }

  // Step 1: CODEX adversarial evaluation (100 scenarios)
  const evaluation = adversarial.evaluate(rec);

  // Step 2: Prometheus strategic assessment (independent)
  const strategic = prometheusGate.assess(evaluation);

  // Step 3: ARIS legal assessment (independent)
  const legal = arisGate.assess(evaluation);

  // Step 4: Referee records the pair
  referee.recordPair(strategic, legal);

  // Step 5: If all three pass, queue to Commander's Desk
  let commanderRec = null;
  if (
    evaluation.verdict === "PASS" &&
    strategic.decision === "BUILD" &&
    legal.verdict === "PASS"
  ) {
    commanderRec = commanderDesk.submit(evaluation, strategic, legal);
  }

  res.json({
    codex: {
      id: evaluation.id,
      score: evaluation.codexScore,
      verdict: evaluation.verdict,
      instantFailReason: evaluation.instantFailReason,
      scenariosRun: evaluation.scenarios.length,
      unmitigated: evaluation.scenarios.filter((s) => !s.mitigated).length,
    },
    prometheus: {
      decision: strategic.decision,
      strategicValue: strategic.strategicValue,
      doctrineAlignment: strategic.doctrineAlignment,
      timingScore: strategic.timingScore,
    },
    aris: {
      verdict: legal.verdict,
      legalScore: legal.legalScore,
      safetyScore: legal.safetyScore,
      selfModificationRisk: legal.selfModificationRisk,
      kinetic: legal.kinetic,
      commanderSovereignty: legal.commanderSovereignty,
    },
    commanderDesk: commanderRec
      ? { queued: true, id: commanderRec.id, priority: commanderRec.priority }
      : { queued: false, reason: "Did not pass all three gates" },
  });
});

/**
 * GET /codex/:id/scenarios
 * View all 100 scenarios for a specific evaluation.
 */
app.get("/codex/:id/scenarios", (req, res) => {
  const scenarios = adversarial.getScenarios(req.params.id);
  if (!scenarios) {
    res.status(404).json({ error: "Evaluation not found" });
    return;
  }
  res.json({
    evaluationId: req.params.id,
    total: scenarios.length,
    byCategory: {
      SELF_MODIFICATION: scenarios.filter((s) => s.category === "SELF_MODIFICATION"),
      LEGAL_GREY: scenarios.filter((s) => s.category === "LEGAL_GREY"),
      SAFETY_FAILURE: scenarios.filter((s) => s.category === "SAFETY_FAILURE"),
      ADVERSARIAL_EXPLOIT: scenarios.filter((s) => s.category === "ADVERSARIAL_EXPLOIT"),
      SOVEREIGNTY_BREACH: scenarios.filter((s) => s.category === "SOVEREIGNTY_BREACH"),
    },
  });
});

/**
 * GET /codex/:id/score
 * CODEX score and pass/fail for a specific evaluation.
 */
app.get("/codex/:id/score", (req, res) => {
  const evaluation = adversarial.getEvaluation(req.params.id);
  if (!evaluation) {
    res.status(404).json({ error: "Evaluation not found" });
    return;
  }
  res.json({
    id: evaluation.id,
    recommendationId: evaluation.recommendationId,
    title: evaluation.title,
    codexScore: evaluation.codexScore,
    verdict: evaluation.verdict,
    instantFailReason: evaluation.instantFailReason,
    scenariosRun: evaluation.scenarios.length,
    mitigated: evaluation.scenarios.filter((s) => s.mitigated).length,
    unmitigated: evaluation.scenarios.filter((s) => !s.mitigated).length,
  });
});

/**
 * GET /codex/stats
 * Overall pass/fail/reject rates across all evaluations.
 */
app.get("/codex/stats", (_req, res) => {
  res.json(adversarial.getStats());
});

// ══════════════════════════════════════════════════════════════
// ISOLATION ENDPOINTS (2)
// ══════════════════════════════════════════════════════════════

/**
 * GET /codex/isolation
 * Current isolation audit status.
 */
app.get("/codex/isolation", (_req, res) => {
  res.json(isolation.getCurrentStatus());
});

/**
 * GET /codex/isolation/history
 * Audit trail of isolation checks.
 */
app.get("/codex/isolation/history", (req, res) => {
  const limit = parseInt(req.query.limit as string) || 100;
  res.json(isolation.getHistory(limit));
});

// ══════════════════════════════════════════════════════════════
// PROMETHEUS GATE ENDPOINTS (2)
// ══════════════════════════════════════════════════════════════

/**
 * POST /prometheus/assess
 * Standalone strategic assessment (isolated, no ARIS contact).
 * Normally called via /codex/evaluate, but available independently.
 */
app.post("/prometheus/assess", (req, res) => {
  const evaluationId = req.body.evaluationId;
  const evaluation = adversarial.getEvaluation(evaluationId);
  if (!evaluation) {
    res.status(404).json({ error: "Evaluation not found" });
    return;
  }
  const assessment = prometheusGate.assess(evaluation);
  res.json(assessment);
});

/**
 * GET /prometheus/assessments
 * All strategic decisions.
 */
app.get("/prometheus/assessments", (_req, res) => {
  res.json(prometheusGate.getAllAssessments());
});

// ══════════════════════════════════════════════════════════════
// ARIS GATE ENDPOINTS (2)
// ══════════════════════════════════════════════════════════════

/**
 * POST /aris/assess
 * Standalone legal assessment (isolated, no Prometheus contact).
 * Normally called via /codex/evaluate, but available independently.
 */
app.post("/aris/assess", (req, res) => {
  const evaluationId = req.body.evaluationId;
  const evaluation = adversarial.getEvaluation(evaluationId);
  if (!evaluation) {
    res.status(404).json({ error: "Evaluation not found" });
    return;
  }
  const assessment = arisGate.assess(evaluation);
  res.json(assessment);
});

/**
 * GET /aris/assessments
 * All legal decisions.
 */
app.get("/aris/assessments", (_req, res) => {
  res.json(arisGate.getAllAssessments());
});

// ══════════════════════════════════════════════════════════════
// REFEREE ENDPOINTS (2)
// ══════════════════════════════════════════════════════════════

/**
 * GET /referee/agreement
 * Current agreement rate between Prometheus and ARIS gates.
 */
app.get("/referee/agreement", (_req, res) => {
  const snapshot = referee.checkAgreement();
  const rotation = referee.checkRotation();
  res.json({ ...snapshot, rotation });
});

/**
 * GET /referee/alerts
 * Suspicious patterns detected by the referee.
 */
app.get("/referee/alerts", (_req, res) => {
  res.json(referee.getAlerts());
});

// ══════════════════════════════════════════════════════════════
// COMMANDER'S DESK ENDPOINTS (4)
// ══════════════════════════════════════════════════════════════

/**
 * GET /desk/pending
 * Recommendations awaiting Commander decision.
 */
app.get("/desk/pending", (_req, res) => {
  res.json(commanderDesk.getPending());
});

/**
 * POST /desk/:id/approve
 * Commander approves a recommendation — triggers build.
 */
app.post("/desk/:id/approve", (req, res) => {
  const result = commanderDesk.approve(req.params.id, req.body.notes || null);
  if (!result) {
    res.status(404).json({ error: "Recommendation not found or not PENDING" });
    return;
  }
  res.json({ approved: true, recommendation: result });
});

/**
 * POST /desk/:id/reject
 * Commander rejects a recommendation — archived.
 */
app.post("/desk/:id/reject", (req, res) => {
  const result = commanderDesk.reject(req.params.id, req.body.notes || null);
  if (!result) {
    res.status(404).json({ error: "Recommendation not found or not PENDING" });
    return;
  }
  res.json({ rejected: true, recommendation: result });
});

/**
 * GET /desk/history
 * All decisions with full audit trail.
 */
app.get("/desk/history", (_req, res) => {
  res.json(commanderDesk.getHistory());
});

// ══════════════════════════════════════════════════════════════
// HEALTH ENDPOINT (1)
// ══════════════════════════════════════════════════════════════

app.get("/health", (_req, res) => {
  const isolationStatus = isolation.getCurrentStatus();
  const stats = adversarial.getStats();
  const agreementSnapshot = referee.checkAgreement();

  res.json({
    service: SERVICE_NAME,
    version: VERSION,
    port: PORT,
    uptime: Date.now() - bootTime,
    isolation: {
      intact: isolationStatus.isolationIntact,
      frozen: isolation.isFrozen(),
      prometheusContact: isolationStatus.prometheusContact,
      arisContact: isolationStatus.arisContact,
    },
    evaluations: stats,
    referee: {
      agreementRate: agreementSnapshot.agreementRate,
      status: agreementSnapshot.status,
      totalPairs: agreementSnapshot.totalRecommendations,
    },
    commanderDesk: {
      pending: commanderDesk.getPending().length,
    },
    endpoints: 19,
    loops: 3,
    bootTime: new Date(bootTime).toISOString(),
  });
});

// ══════════════════════════════════════════════════════════════
// BOOT + LOOPS
// ══════════════════════════════════════════════════════════════

app.listen(PORT, async () => {
  console.log("");
  console.log("================================================================");
  console.log(`  ${SERVICE_NAME} v${VERSION}`);
  console.log(`  Port: ${PORT}`);
  console.log(`  Endpoints: 19 | Loops: 3`);
  console.log("================================================================");
  console.log("");
  console.log("  ADVERSARIAL SECURITY GATE — Zero Trust AI Governance");
  console.log("");
  console.log("  ISOLATION DECLARATION:");
  console.log("    - CODEX has NO communication with Prometheus (port 8885)");
  console.log("    - CODEX has NO communication with ARIS (port 8830)");
  console.log("    - CODEX ONLY receives from Spark Generator / Dropbox");
  console.log("    - CODEX ONLY sends to Commander's Desk (via Central Library queue)");
  console.log("    - Isolation audit: every 60 seconds");
  console.log("");
  console.log("  SCORING:");
  console.log("    - 100 adversarial scenarios per recommendation");
  console.log("    - Score >= 75: PASS | 50-74: MANUAL_REVIEW | <50: AUTO_REJECT");
  console.log("    - Unmitigated SELF_MODIFICATION: instant score 0");
  console.log("    - Unmitigated SOVEREIGNTY_BREACH: instant score 0");
  console.log("");
  console.log("  TRIPLE GATE (independent, no cross-communication):");
  console.log("    Gate 1: CODEX adversarial (100 scenarios)");
  console.log("    Gate 2: Prometheus strategic (BUILD/DEFER/REJECT)");
  console.log("    Gate 3: ARIS legal/safety (PASS/BURN)");
  console.log("    Referee: Agreement rate monitoring (40-95% healthy)");
  console.log("");
  console.log("  COMMANDER IS THE ONLY ENTITY THAT CAN APPROVE A BUILD");
  console.log("");
  console.log("================================================================");

  // ── Start Loops ──

  // Loop 1: Isolation audit (60s)
  isolation.startPeriodicAudit(ISOLATION_AUDIT_INTERVAL_MS);

  // Loop 2: Referee agreement check (300s)
  setInterval(() => {
    const snapshot = referee.checkAgreement();
    if (snapshot.status !== "HEALTHY" && snapshot.totalRecommendations > 0) {
      console.warn(
        `[CODEX-REFEREE] Status: ${snapshot.status} | Agreement: ${(snapshot.agreementRate * 100).toFixed(1)}%`
      );
    }
    // Check Fisher-Yates rotation
    const rotation = referee.checkRotation();
    if (rotation.rotationDue) {
      referee.rotate();
    }
  }, REFEREE_CHECK_INTERVAL_MS);

  // Loop 3: Stale recommendation cleanup (3600s)
  setInterval(() => {
    const stale = commanderDesk.getStale();
    if (stale.length > 0) {
      console.warn(
        `[COMMANDER-DESK] ${stale.length} stale recommendation(s) pending >7 days. Commander attention required.`
      );
    }
  }, STALE_CLEANUP_INTERVAL_MS);

  // ── Self-register with Central Library ──
  try {
    const fetch = (await import("node-fetch")).default;
    await (fetch as any)(CENTRAL_LIBRARY_URL + "/services/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: SERVICE_NAME,
        port: PORT,
        version: VERSION,
        category: "INFRASTRUCTURE",
        endpoints: 19,
        loops: 3,
        techniques: [
          "ADVERSARIAL_100_SCENARIOS",
          "ZERO_TRUST_AI_ISOLATION",
          "TRIPLE_GATE_GOVERNANCE",
          "COMMANDER_DESK_QUEUE",
          "REFEREE_AGREEMENT_MONITORING",
        ],
        description:
          "Adversarial security gate — 100 scenarios per recommendation, zero-trust AI isolation, triple independent gate (CODEX/Prometheus/ARIS), Commander final authority.",
      }),
    });
    console.log(`[BOOT] Registered with Central Library at ${CENTRAL_LIBRARY_URL}`);
  } catch {
    console.warn("[BOOT] Central Library not available — will retry on next heartbeat");
  }
});
