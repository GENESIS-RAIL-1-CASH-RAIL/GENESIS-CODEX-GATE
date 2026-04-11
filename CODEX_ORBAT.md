# GENESIS BATTLEGROUP — ORDER OF BATTLE (ORBAT v1.0)

**Filed:** 2026-04-08 morning
**Classification:** Internal — canonical reference layer
**Audience:** Humans (Commander, future Claude on cold start) AND machines (Prometheus, ARIS, CIA, Labs via Central Library `/service/by-compartment` query)
**Pair:** This file is the human-readable view. `GENESIS-CENTRAL-LIBRARY` is the machine-queryable view of the same truth. Both updated together as part of Goodnight Protocol Step 4.5.

---

## DOCTRINE — Why ORBAT exists

Genesis is a battlegroup. With 290+ services, 45 weapons, 223 decrees, and 45 sparks, no single human or AI can hold the full picture in working memory. Without ORBAT, we lose tools we built because we forgot we designed them. We plan operations without knowing what's committed vs in reserve. We design new weapons that duplicate abundance instead of plugging gaps.

ORBAT solves this by giving every PRODUCER of plans/decisions/decrees/weapons (Prometheus, ARIS, CIA, Labs) a **single canonical view of force composition organised by what each unit DOES for the battlegroup.** Read it once, see everything.

**Three rules:**
1. **One file, one read.** Fragmenting into separate .md per topic causes drift. This is the only canonical reference index. Deeper detail lives in Central Library (machine) and the standing-record files (Inspector Mode, Safe Harbour, Blackout Milestones — referenced from inside ORBAT).
2. **Compartmental view enables gap analysis.** You can scan a compartment and SEE if you're thin on monitoring vs alarms vs kill switches. Scattered files cannot do this.
3. **Living document, updated every Goodnight.** Goodnight Protocol Step 4.5 — Walk all 10 compartments, anything new gets added, anything retired gets removed, gap/abundance refreshed.

---

## SUMMARY DASHBOARD

| Metric | Count | Notes |
|---|---|---|
| Total registered services | 357 | (from Central Library seed) |
| Major battlegroup units (non-ingestor) | ~80 | Below |
| Ingestor fleets (CEX + DEX) | 581+ | Single fleet entries below |
| Weapons (deployed) | 25 | WD-013 to WD-051, minus a few backlog gaps |
| Weapons (backlog) | 26 | WD-001 to WD-048 backlog + WD-046/047/048 future |
| ARIS Decrees | 223 | Decrees 222 + 223 filed 2026-04-07 |
| Sparks fired | 45 | 10 BEDROCK reached |
| Standing Orders | 12 | #11 + #12 filed 2026-04-07 night, #6.5 promotion gate |
| TIER 0 doctrines | 6 | Safety, Data, Build It Once, PeaceWorks, GitHub Source of Truth, Chat Command Workflow |

---

## COMPARTMENT 1 — CORE / COMMAND AUTHORITY

**Role:** The constitutional layer + the command-and-control layer. Anything that issues orders, anything that holds final authority, anything that the rest of the battlegroup is bound by.

| Unit | Port | Role |
|---|---|---|
| **Commander** (Colin Cronin, CFO) | — | Pillar 1, biometric future, sole human authority |
| **The 7 Pillars** | — | Constitutional bedrock — ARIS cannot modify (Decree #17) |
| **GENESIS-ARIS-SUPREME-COURT** | 8798 | Layer 2 legal oversight, 223 decrees, jurisdictional authority |
| **GENESIS-PROMETHEUS** (APEX) | 8885 | OODA loop, 15 doctrines, perpetual wargame, mission orchestration |
| **GENESIS-KILL-SWITCH-V2** | 7100 | Supreme halt authority. RED = all execution stops. (also DEFENCE) |
| **GENESIS-BATTLE-STATIONS** | 8810 | Battle Stations protocol (ALPHA→BRAVO→CHARLIE→DELTA) |
| **GENESIS-CENTURION-INDEX** | 8799 | Indexed canonical authority |
| **GENESIS-COMMAND-WALLET** | — | Wallet execution, holds keys |
| **GENESIS-DECISION-INGRESS-SERVICE** | 8400 | Admission gate (£100 clip ceiling) — Gate 1 of 4 |

**Standing Orders bound to this compartment:** #1 (Goodnight Protocol), #2 (Recovery first port of call), #3 (Expect human failure), #4 (EC2 air gap), #5 (Notepad SOP), #6 (CHECKSUM Promotion Gate machine-locked), #7 (Safety > Alpha), #8 (Data is King), #9 (GitHub source of truth), #10 (Chat command workflow), #11 (Build It Once), #12 (CODEX as canonical reference layer paired with Central Library).

---

## COMPARTMENT 2 — DEFENCE / DISCIPLINE LAYER

**Role:** Watch the battlegroup. Detect failure. Halt execution when integrity is compromised. Protect what we love. The trinity built 2026-04-07 is the spine of this compartment.

| Unit | Port | Role | New |
|---|---|---|---|
| **GENESIS-CHECKSUM** | 8898 | 4-layer behavioural integrity watchdog (L1 process / L2 heartbeat / L3 counter delta / L4 e2e). ARIS Decree 222 promotion gate. WD-049. | ✅ 2026-04-07 |
| **GENESIS-MEASUREMENT-INTEGRITY-LAYER (MIL)** | 8920 | Equal authority to TRIBUNAL. Veto power on DNA promotion + Spark filings + addendum coefficient claims. 5 components: Metric Contract Registry + Shadow Evaluation Engine + Assumptions Ledger + Evidence Standard + TRIBUNAL interaction matrix. **Standing Order #17 candidate (TIER 0).** Diamond K from Spark #046 4-AI loop. | ⏳ Build queued 2026-04-09 |
| **GENESIS-REGULATORY-MONITOR** | TBD | Regulatory enforcement signal scraper (CFTC Commitments of Traders, SEC Wells notices, FCA enforcement actions, ESMA short positions). Plus IP rotation discipline + tax/reporting layer. Diamond L from Spark #046 (Mistral catch — *"first Wells notice could kill the stack overnight"*). **Tier 1 mandatory before any cadence promotion.** | ⏳ Build queued 2026-04-09 |
| **GENESIS-PARTNER-TELEMETRY-FEED** | TBD | Re-shaped Mirror Clones architecture per ChatGPT R4 Deliverable 5. WebSocket primary / REST fallback. Push-only feed, fixed schema, no internal identities. Replaces the Mirror Clones "agents inside venue infrastructure" architecture which was REFUTED by both ChatGPT and Mistral. **Deferred to Phase 3 (Days 61-90) — needs first signed partnership.** | ⏳ Deferred to Phase 3 |
| **GENESIS-CHECKSUM-DEADMAN** | 8899 | External dead-man switch. Battle Stations CHARLIE if CHECKSUM silent 90s. | ✅ 2026-04-07 |
| **GENESIS-OVERWATCH** | 8902 | Hub-and-spoke intel fusion centre. Hierarchical Bayesian fusion over LATTICE-ROUTER DAG. WD-050. | ✅ 2026-04-07 |
| **GENESIS-OVERWATCH-DEADMAN** | 8901 | Dead-man for OVERWATCH | ✅ 2026-04-07 |
| **GENESIS-TRIBUNAL** | 8910 | Three-AI conservative-unanimous voting tribunal. Iron Halo HMAC sandbox. ARIS Decree 223 (10-section). WD-051. | ✅ 2026-04-07 |
| **GENESIS-TRIBUNAL-DEADMAN** | 8911 | Dead-man for TRIBUNAL | ✅ 2026-04-07 |
| **GENESIS-AEGIS-PROBE-DETECTOR** | 8870 | WD-044. Inverted AI safety research. 19 endpoints, 5 loops. |  |
| **GENESIS-SIG-NULLIFIER** | 8852 | WD-017. Statistical RCS monitor. Raider Phantom. |  |
| **GENESIS-GHOSTBAT-WINGMAN** | 8853 | WD-018. Cover trade formation. |  |
| **GENESIS-PHANTOM-PULSE** | 8854 | WD-019. NGJ precision entropy injection. |  |
| **GENESIS-BLACKOUT-PROTOCOL** | 8860 | Catastrophic loss defence. NORAD-style. 28 endpoints, 5 loops. |  |
| **GENESIS-PHANTOM-CUTOUT** | 8891 | False-flag inter-Goliath disruption. Mossad doctrine. |  |
| **GENESIS-SLEEPER-LATTICE** | 8892 | Deep cover dormant operators. Zero emissions. |  |
| **Iron Halo** (HMAC sandbox) | — | Embedded in TRIBUNAL — outbound-only egress, no wallet access |  |
| **MEV Guards** (4 of 11 deployed) | — | Embedded in PHANTOM-FORGE + EXECUTION pipeline. 7 deferred to Super Rail. |  |

**Decrees bound:** ARIS Decree 222 (CHECKSUM Promotion Gate), ARIS Decree 223 (Tribunal Conservative-Unanimous, 10-section).

**TIER 0 Doctrines bound:** Safety > Alpha (Standing Order #7).

---

## COMPARTMENT 3 — OFFENCE / CAPITAL DEPLOYMENT

**Role:** Generate alpha. Move capital. Convert opportunity into clip. Where the rubber meets the road on revenue.

| Unit | Port | Role |
|---|---|---|
| **GENESIS-FLASHLOAN-EXECUTION-ENGINE** (FLEE) | 8403 | Channel B: flashloan execution, multi-chain (Base + Arbitrum LIVE) |
| **GENESIS-CEX-EXECUTOR** | 8410 | Channel A: simultaneous buy/sell, £100 clips |
| **GENESIS-EXECUTION-ENGINE** | 8420 | Core execution + invariants — Gate 2 (Atomic Revert insertion point: `src/router/payload.router.ts`) |
| **GENESIS-EXECUTION-GATEWAY** | — | Pre-wallet validation — Gate 3 |
| **GENESIS-EXECUTION-GATE** | 8897 | Execution gate enforcement |
| **GENESIS-ORDER-ORCHESTRATOR** | 8320 | Final viability — Gate 4 |
| **GENESIS-FLASHLOAN-GATEWAY** | 8319 | Flash loan routing |
| **GENESIS-BEACHHEAD-EXECUTOR** | 8411 | Forward execution |
| **GENESIS-ARBITRAGE-DETECTOR** | 8750 | Cross-exchange spread detection |
| **GENESIS-KLINGON-CLOAKING** | 8842 | Identity morphing, probing, noise. V2.0, 29 endpoints, TCP fingerprint randomisation |
| **GENESIS-HIVE-CORE** | 8894 | Pheromone ACO + BOIDS + tiered campaign state machine. Spark #021. |
| **GENESIS-FLASHLOAN-SWARM** | 8895 | Zero-capital infinite ammo swarm. 420 operators. Spark #021. |
| **GENESIS-CLONE-PIPELINE** | 8880 | 6-stage operator clone manufacturing. 34 triggers, Bayesian ML, +41% by gen 10 |
| **GENESIS-COINTEGRATION-FLASH** | 8860* | WD-038 (port collision noted — see GAP) |
| **GENESIS-ORPHAN-LP-MINER** | 8861 | WD-039 |
| **GENESIS-POST-MEV-COLLECTOR** | 8862 | WD-040 |
| **GENESIS-CRUMB-HARVESTER** | 8863 | WD-041 |
| **GENESIS-TOXICITY-REVERSION-LAYER** | 8864 | WD-042 |
| **GENESIS-TOWER-REVERSION-MINER** | 8865 | WD-043. Tower Research microstructure fingerprint reversion (van Kervel 2017) |
| **GENESIS-TRADE-PARAMETER-OPTIMIZER** | 8848 | WD-014. Multi-objective trade scoring |
| **SAS-ARB Elite patrols** | — | Embedded in PHANTOM-FORGE. 48 patrols × 4 operators. 99.7% survival, 19ms ABORT, 200:1 decoy. |

**Channels:** A (CEX) + B (DeFi flashloan, multi-chain). £100 clip ceiling enforced at 4 gates.

**Tactical doctrines bound:** Battle by battle not war by war (Spark tactic), Recon-First protocol (12hr min shadow before live), Tiered campaign SEAD→CHAOS→B2 STRIKE→HEAVY ARTILLERY.

---

## COMPARTMENT 4 — INTELLIGENCE / DECISION SUPPORT

**Role:** Know more than the adversary. Reason about cause and effect. Wargame the future. Verify before acting. The brain of the battlegroup.

| Unit | Port | Role |
|---|---|---|
| **GENESIS-CIA** | 8797 | Intelligence hub, early warning, sovereign matrix. 35 endpoints, 4 loops. |
| **GENESIS-DARPA** | 8840 | Problem triage, mission lifecycle, work order dispatch. 22 endpoints, 5 loops. |
| **GENESIS-PHANTOM-FORGE** | 8856 | Wargame engine. WD-029. Campaign Simulator (live), Live Wargame loop (registered, dead — Tier 2 backlog). 4-regime PASS/FAIL with survival + PnL. |
| **GENESIS-LATTICE-ROUTER** | 8886 | Ontology-first causal order router. Bayesian DAG, do-calculus, counterfactual. Spark #001 Polish. |
| **GENESIS-OVERWATCH** | 8902 | (Cross-listed in DEFENCE — fusion is also intel work) |
| **GENESIS-TRIBUNAL** | 8910 | (Cross-listed in DEFENCE — 3-AI voting is also intel verification) |
| **GENESIS-ONTOLOGY-WEAVER** | 8849 | Causal graph + mirage overlays (V2) |
| **GENESIS-SELF-ONTOLOGY** | 8851 | WD-014/15. CIA self-observation loop |
| **GENESIS-REGIME-DETECTOR** | 8855 | WD-026. 3-state HMM regime classification |
| **GENESIS-LATENCY-RESONANCE-DECODER** | 8857 | WD-035. Cross-venue latency resonance (3σ + Hasbrouck-Saar FSM) |
| **GENESIS-TOXICITY-ORACLE** | 8858 | WD-036. VPIN flow toxicity predictor (Kelly adjustment) |
| **GENESIS-BEHAVIOURAL-CARTOGRAPHER** | 8859 | WD-037. Multi-dimensional rival fingerprinting (4σ EMA) + Persistent Bot ID (128-dim) |
| **GENESIS-KOMPROMAT-PROFILER** | 8893 | Rival quant psychological profiling |
| **GENESIS-INTEL-MESH** | 8873 | 9 intelligence collectors (59K ring buffer) — GSRL flywheel |
| **GENESIS-RIVAL-DELTA** | 8872 | Adversary reaction delta extractor — GSRL flywheel |
| **GENESIS-STEALTH-INTEL-BRIDGE** | 8882 | Stealth fusion, 10×6 archetype, TD(0) |
| **GENESIS-EXCHANGE-INTELLIGENCE-MATRIX** | 8770 | Exchange-level intel matrix |
| **GENESIS-GHOST-SIMULATOR** | 8847 | WD-013. Adversarial inference engine |
| **GENESIS-MIRROR-FEED** | 8850 | WD-016. Self-referential execution stream |
| **3-AI Cross-Verification Loop** | — | Methodology, not service. Claude + Grok + ChatGPT. Empirically validated 2026-04-07 on Spark #045 (caught Grok £920k → £15.4k inflation). |
| **BEDROCK formula** (Spark #009 McCaffrey) | — | 7-term formula, 8 loops, isolation arch |

**Sparks bound:** Most of the 45 fired sparks land in this compartment.

---

## COMPARTMENT 5 — RECON / DATA INTAKE

**Role:** Eyes and ears of the battlegroup. Continuous data flow from every venue, every chain, every signal source. Where alpha begins.

| Unit | Port | Role |
|---|---|---|
| **CEX Ingestor Fleet (Batch 1)** | 8525-8552 | 28 exchanges, SF-Grade v2.0.0-sf (Binance, Kraken, Gate.io, Bybit, OKX, Bitstamp, Coinbase, MEXC, KuCoin, Bitfinex, HTX, Bitget, Phemex, WhiteBIT, BitMart, Poloniex, XT, Bitrue, LBank, BingX, CoinEx, Gemini, AscendEX, Pionex, Toobit, DigiFinex, Crypto.com, +1) |
| **CEX Ingestor Fleet (Batch 2)** | 8553-8592 | 40 exchanges (Addendum 106) — BitMEX, HitBTC, Bitvavo, Bullish, CoinOne, Bitkub, WazirX, BTC Markets, ... |
| **DEX Ingestor Fleet (Batch 9)** | 9100-9199 | 100 DEX (Addendum 142, 2026-03-30). Multi-chain — Solana, Sui, Aptos, Stacks, NEAR, MultiversX, etc. |
| **DEX Ingestor Fleet (Other batches)** | 8900-9099 | Additional DEX coverage. Total 581+ exchanges, zero gaps. |
| **GENESIS-INGESTION-GATE** | 8700 | Central ingestion routing |
| **GENESIS-INGRESS-REINFORCEMENTS** | — | 2,054 parser files (100 waves + Wave 41-52). Monorepo. |
| **GENESIS-DEX-INGESTOR-UNIVERSAL** | — | 31-chain DEX ingestion |
| **GENESIS-PAIR-NORMALIZATION-SCHEMA-GUARD** | — | Pair standardization |
| **GENESIS-SIX-EXCHANGE-PROCESSOR** | — | Multi-exchange processing |
| **GENESIS-SENTRY** | 8846 | Rival bot classifier. 21 endpoints. |
| **GENESIS-ROLLING-WINDOW** | — | Time-windowed signal aggregator |
| **GENESIS-ADAPTIVE-CALIBRATOR** | 8760 | Continuous calibration |
| **GENESIS-ADAPTIVE-GTC** | 8871 | Kalman filter window resizer — GSRL flywheel |
| **GENESIS-AB-TESTER** | 8875 | Welch's t-test A/B framework — GSRL flywheel |

**Status:** **581 exchanges, 0 gaps.** Recon is the most ABUNDANT compartment in the battlegroup.

---

## COMPARTMENT 6 — LOGISTICS / CAPITAL

**Role:** Move money. Track money. Protect money. Settle money. Convert profit into PeaceWorks. Where capital becomes infrastructure.

| Unit | Port | Role |
|---|---|---|
| **GENESIS-CAPITAL-ROUTER** | 8876 | Follow-the-Sun rotation + pre-positioning. Kelly Capital Optimizer (μ/σ², regime Kelly, minimax). LP Pre-Position Solver (Spark #013). |
| **GENESIS-TREASURY-SENTINEL-V2** | 8879 | 8s polling + anomaly detection + redeployment |
| **GENESIS-WITHDRAWAL-STEALTH** | 8877 | Klingon-augmented withdrawal obfuscation |
| **GENESIS-CAPITAL-EFFICIENCY-MONITOR** | 8878 | Capital utilisation dashboard |
| **GENESIS-LEDGER-LITE** | 8500 | Hash-chained compliance ledger (money moves + taxable events). Primary PoF system. |
| **GENESIS-LEDGER-VAULT** | — | Append-only immutable vault. DRY-RUN mode (write sink not armed). |
| **GENESIS-RAIL-1-CANONICAL-CONTRACTS** | — | Smart contracts |
| **GENESIS-SAGE** | — | Financial accounting integration (running 3 days as of this morning) |
| **ARIS PeaceWorks Gate** | 8799* | Machine-enforced 10% to humanity. Per Addendum 182, RAIL_WIRING_GOVERNANCE.md. (Port collision flagged — see GAP) |
| **Genesis Capital Flywheel** | — | Saylor gold flywheel. Uganda gold ($100k/kg vs $142k market = $42k embedded profit). 6,000kg available at miner price. |
| **Genesis Oil Tokenization** | — | Ugandan oil. Government deal WRAPPED UP. Third collateral tier. 10% yield to Uganda. |
| **GCAU Token** | — | Commodity-backed (ART, NOT stablecoin). Sound money, not stable money. Via Canton Group. |

**TIER 0 Doctrine bound:** PeaceWorks (the WHY) — 10% machine-enforced, constitutionally bound (SOP-101 + 7 Pillars + ARIS gate).

---

## COMPARTMENT 7 — COMMS / C4ISR

**Role:** Communicate without being seen. Coordinate without leaking. Command across the stack. Where signals become orders.

| Unit | Port | Role |
|---|---|---|
| **GENESIS-GHOST-COMMS** | 8884 | C4ISR. Mempool steganography, Shamir (2,3) across ETH/SOL/BTC, Silent Commander pool ratio, fountain codes, Starlink RF burst, ConstellationProvider |
| **GENESIS-WHITEBOARD** | 8710 | Institutional memory + intelligence layer |
| **GENESIS-MOTHERSHIP** | 8695 | WD-045 Ghost Protocol. EW/MILDEC platform. 7 operator classes, 22 endpoints, 4 campaign presets, phantom ping protocol, extraction system, 4 carrier profiles. **RED LINE: zero kinetic/poison delivery.** |
| **GENESIS-RED-AGGRESSOR-FORCE** | 8800 | Dropbox Integrity War Game V6, 34 endpoints. 9 AI inspectors, Fisher-Yates shuffle, 30-day rotation. |
| **GENESIS-GHOST-FLEET** | 8811 | Fleet-level ghost coordination |
| **GENESIS-GLOBAL-TELEMETRY-CLOUD** | 8650 | Central telemetry |
| **GENESIS-SPINE-HEARTBEAT** | — | Health monitoring |
| **GENESIS-FOLLOW-THE-SUN** | 8815 | Session-aligned operations + capital cycles |
| **Notepad SOP** | — | All Commander↔Claude written comms. OVERWRITE mode. `GENESIS-CENTRAL-LIBRARY/notepad.md`. GitHub-backed recovery layer. |

---

## COMPARTMENT 8 — ENGINEERING / CONSTRUCTION

**Role:** Build new weapons. Refine existing ones. Run experiments. Where the next generation of the battlegroup is forged.

| Unit | Port | Role |
|---|---|---|
| **GENESIS-SKUNKWORKS** | 8841 | Research, PEP Protocol, Linesman, Spark Archive (V2.6). 130 endpoints, 13 loops. **Source for the Spark Archive.** |
| **GENESIS-LABS** | 8845 | Weapons Forge, Zero Copy Gate, backlog monitor. 27 endpoints, 4 loops. **Single source of truth for weapons arsenal.** Broadcasts to Skunkworks `/weapon/notify`. |
| **GENESIS-DARPA** | 8840 | (Cross-listed in INTEL — also runs the engineering work order dispatch) |
| **GENESIS-TOOLKIT** | 8820 | Pre-flight, notifications, inspector. 22 endpoints, 6 loops. |
| **GENESIS-ALPHA-TRIGGER** | — | Trigger fleet (running 2 days, healthy) |
| **GENESIS-GROWTH-DIAGNOSTICS** | 8883 | Readiness scoring 0-100, SMART milestones |
| **GENESIS-ACADEMY** | 8730 | Operator training |
| **GENESIS-CROSS-CHAIN-ENGINE** | 8881 | Bellman-Ford path-finding, GHAF flywheel — SPECIFIED, not yet built |

**Engineering doctrines bound:** Spark Methodology (45 sparks fired), Build It Once (Standing Order #11), 3-AI cross-verification on every spark, GitHub source-of-truth (Standing Order #9).

---

## COMPARTMENT 9 — ADMIN / SUPPORT / CANONICAL REFERENCE

**Role:** Hold the truth. Index the truth. Recover from loss of truth. Where the battlegroup remembers itself.

| Unit | Port | Role |
|---|---|---|
| **GENESIS-CENTRAL-LIBRARY** | 8088 | **Machine-queryable canonical state.** Every service, weapon, protocol, operator class, technique, spark. Self-registering, queryable at runtime. **Pair with CODEX (this file).** |
| **GENESIS-CODEX-GATE** | (port TBD — collision with CHECKSUM 8898) | **Human-readable canonical reference.** This ORBAT file lives here. Plus standing records: Inspector Mode, Safe Harbour, Blackout Milestones. Adversarial Security Gate code layer (100-scenario adversarial check before Prometheus/ARIS — needs port reassignment, see GAP). |
| **GENESIS-SOP-AI-ROADMAP-RAIL-1** | (repo) | Governance addenda 1-205, RAIL_WIRING_GOVERNANCE.md (current v4.97), Cadence Ladder, Recovery Protocol |
| **Notepad** (`GENESIS-CENTRAL-LIBRARY/notepad.md`) | — | **Live Commander↔Claude conversation buffer. OVERWRITE mode every interaction. NOT a recovery file — gets wiped.** Current dialogue only. |
| **Command Morning Brief** (early MVP active 2026-04-08) | — | Daily PDB-style brief surfacing overnight successes / failures / agenda carry-forward / SOP PROPOSED queue / planned mission outlook. Standing Order #14 triggers it on any morning greeting. Full artefact deferred to post-go-live. Memory doctrine: `command-morning-brief.md`. |
| **Memory Layer** (`/home/ubuntu/.claude/projects/-home-ubuntu/memory/`) | — | Claude's persistent working memory across conversations. **`last-session.md` snapshot is a recovery file** for Claude context loss / cold start within same sandbox. |
| **Recovery Protocol** | — | 30-min target battle-ready recovery from total loss |
| **Goodnight Protocol** | — | USUAL SUSPECTS sweep + session close. Step 4.5 ORBAT walk (this file) is mandatory. |

**Recovery layer (the files that survive total loss — corrected per Commander 2026-04-08):**
1. **Addendum** (`RAIL_WIRING_GOVERNANCE.md` addenda 1-204+) — historical prose record, all on GitHub
2. **Central Library** (machine-queryable, all on GitHub via seed.service.ts) — current state
3. **Wiring Governance** (`RAIL_WIRING_GOVERNANCE.md` wiring rules layer) — how the stack is connected
4. **Spark Techniques** (Skunkworks spark archive, when needed) — methodology + lens history
5. **Memory `.md` snapshot** (`last-session.md` — sandbox-local but mirrored in spirit by addendum entries)

**Canonical truth layers (must all cross-reference each other) — separate from recovery layer:**
1. **SOP** (`RAIL_WIRING_GOVERNANCE.md` Addenda) — historical prose record (also a recovery file)
2. **Central Library** (machine-queryable, JSON) — current state (also a recovery file)
3. **CODEX** (this ORBAT, human-readable) — current state, compartmentalised view
4. **Memory** (sandbox-local) — Claude's working notes (`last-session.md` is the recovery snapshot)
5. **Notepad** (GitHub-backed) — **live conversation buffer ONLY, NOT recovery** — overwritten every interaction

Per Standing Order #12: SOP, Central Library, and CODEX tell the SAME truth in three encodings. Updates to one require updates to the other two as part of Goodnight Protocol. **Notepad is the live dialogue layer and is explicitly excluded from recovery — Commander can read it on GitHub for current conversation but it cannot be relied on for recovery because it gets overwritten.**

---

## COMPARTMENT 10 — DOCTRINE / RULES OF ENGAGEMENT

**Role:** The constitutional law layer. Decrees, standing orders, doctrines, methodologies. Anything that BINDS the rest of the battlegroup.

### ARIS Decrees (223 total — full list lives in `GENESIS-ARIS-SUPREME-COURT`)

Critical decrees with current operational impact:
- **Decree #17** — ARIS Self-Governance (cannot modify the 7 Pillars)
- **Decree #182** — RAIL_WIRING_GOVERNANCE.md as canonical wiring doctrine
- **Decree #222** — CHECKSUM Promotion Gate (4 conditions: 7d uptime, zero FP, ≥1 TP, ≥1 dead-man test). **ACTIVE — promotion clock running 0.55 days as of 2026-04-08 morning.**
- **Decree #223** — Tribunal Conservative-Unanimous Doctrine. 10-section ChatGPT-amended structure. 9 constitutional clauses (voting, fail-safe, no-wake, Petrov override, amendment, Iron Halo, contamination, budget, precedent). **ACTIVE.**

### Standing Orders (35 total — 32 ACTIVE + 3 PROPOSED from Spark #046 closure)
1. GOODNIGHT PROTOCOL — when Commander says goodnight, execute Usual Suspects + session-close
2. RECOVERY FIRST PORT OF CALL — `https://github.com/GENESIS-RAIL-1-CASH-RAIL/GENESIS-SOP-AI-ROADMAP-RAIL-1`
3. EXPECT HUMAN FAILURE
4. EC2 AIR GAP — AI never touches EC2
5. NOTEPAD SOP — overwrite mode
6. CHECKSUM PROMOTION GATE — machine-locked (Decree 222)
7. **TIER 0:** SAFETY > ALPHA (default at 2am is HOLD)
8. **TIER 0:** DATA IS KING (default on uncertainty = QUARANTINE)
9. GITHUB SOURCE OF TRUTH (filed 2026-04-07 night)
10. CHAT COMMAND WORKFLOW (filed 2026-04-07 night)
11. **TIER 0:** BUILD IT ONCE (filed 2026-04-07 night) — Commander's contractor doctrine
12. CODEX AS CANONICAL REFERENCE LAYER (filed 2026-04-08 morning) — paired with Central Library, same truth, two encodings
13-19. Filed 2026-04-08 (Sparks #046-#049 era): Response line cap, no trailing questions, no SO reminders, Commander premium source, Shopkeeper doctrine, Haiku default sub-agents, B2 batched brief
20-29. Filed 2026-04-09: Git push autonomous, capability filing doctrine, rail cadence ladder, follow the pipe, autonomous mission authority, spot reusable patterns
30-31. **HARD LAW:** Model-T19 18-file wave structure + Money Template GO/NO-GO gate (filed 2026-04-09)
32-33. Filed 2026-04-10: Spark methodology SOP, mandatory SOP read on session start
34. **HARD LAW:** EC2 governance — Claude's job ends at "pushed to GitHub" (filed 2026-04-10)
35. **HARD LAW:** T19 AGENT AUTO-ENFORCEMENT — every code-writing agent auto-checks T19 compliance, repairs gaps before reporting (filed 2026-04-12)

### TIER 0 Doctrines (the constitutional ones)
- **Safety > Alpha, zero compromise** (Standing Order #7)
- **Data is king, keys to the kingdom** (Standing Order #8)
- **Build It Once, build it right** (Standing Order #11)
- **PeaceWorks is the WHY** — 10% machine-enforced, SOP-101 + 7 Pillars + ARIS peaceworks-gate
- **GitHub source of truth** (Standing Order #9)
- **Chat command workflow** (Standing Order #10)

### Methodologies
- **3-AI cross-verification loop** (Claude + Grok + ChatGPT) — empirically validated 2026-04-07 on Spark #045
- **Spark Methodology** (45 sparks fired, lens rotation rule)
- **Battle-by-Battle spark tactic** — flips Grok from briefing mode to operator's-notebook mode
- **Recon-First protocol** (12hr min shadow before live)
- **Operator Lifecycle: ALL operators die Mission 1** (zero cross-contamination)
- **3-Strike Discipline** (templates, not operators)
- **Perpetual Wargame** (hard-coded evolution cycle in Prometheus)

### The 7 Pillars (constitutional bedrock — ARIS cannot modify)
1. Commander identity (Colin Cronin DOB 30/07/1967, CFO)
2-7. (Defined in Pillar layer of ARIS bootstrap)

### The £100 Clip Ceiling — 4-Gate Enforcement
1. Gate 1 (Ingress): `GENESIS-DECISION-INGRESS-SERVICE/src/services/admission.service.ts`
2. Gate 2 (Engine): `GENESIS-EXECUTION-ENGINE/src/router/payload.router.ts` ← Atomic Revert point
3. Gate 3 (Gateway): `GENESIS-EXECUTION-GATEWAY/src/services/admission.service.ts`
4. Gate 4 (Orchestrator): `GENESIS-ORDER-ORCHESTRATOR/src/services/orchestration.service.ts`

### Invariants
- `clipCeiling.ts` — Hard £100 cap
- `economicViabilityFloor.ts` — ADDENDUM-022 (netEdgeBps > 0, netProfitBps > 0)
- `flashloanBoundary.ts` — Dual kill-switch, repayment invariant, latency budget

### Red Lines
- **NO kinetic/poison delivery** (`feedback_no_kinetic.md`)
- **NEVER sell IP / never give away ownership** (`feedback_no_sell_ip.md`)
- **AI never touches EC2** (`feedback_ec2_air_gap.md`)
- **Commander has zero years formal trading experience** — main contractor by trade. Authority comes from passion + first-principles + spark methodology, NOT from sell-side history. (`user_commander_identity.md`)

---

## ⚠️ GAP ANALYSIS — Where the battlegroup is structurally weak

These are the holes Labs should be filling, not the abundance Labs should be duplicating.

### DEFENCE gaps
- **L2 embedded agents missing** in OVERWATCH, TRIBUNAL, and PHANTOM-FORGE. Currently CHECKSUM signatures for these services are L1-only (process poll only). L2 heartbeat coverage requires `agent.tick(loopName)` calls inside loop bodies. **Tier 1 backlog.**
- **7 of 11 MEV guards** deferred to Super Rail (retransmit, crossRailCollusion, inferenceChatter, privateFlow, gasGolfing, crossChainLinked, meta-calibration)
- **Forge `totalWargames` Live Wargame loop** — registered but never invoked in v7.3. Campaign Simulator is the live path but the Live Wargame loop is dead. **Tier 2 backlog.**
- **Forge `totalShadowTrades` capped at 500** — buffer ceiling. Frozen counter. **Tier 2 backlog.**
- **CHECKSUM v0.1.2 partial-window threshold scaling** — known bug from deployment debugging. **Tier 2 backlog.**

### INTELLIGENCE gaps
- **Spark #044 OVERWATCH 3-AI verification** has not run. Single-AI methodology (Grok-only) is the same one that produced the 30× inflation in Spark #045. £158M/year claim is **unverified** until ChatGPT verification runs. **Tier 1 — high priority.**
- **Forge wargame closed-loop validation** deferred to Super Rail
- **Federated Operator Learning Network** (WD-028) — backlog, post-revenue + data
- **Federated Wargame Mesh** (WD-031) — backlog, post-revenue + multi-instance
- **Phantom Forge GPU Backend** (WD-030, Warp+JAX) — backlog, GPU Phase 2 (T4 min)

### LOGISTICS gaps
- **PeaceWorks pipeline** is hardcoded but pre-Cadence — first real revenue not yet flowing through the gate
- **GCAU institutional play** (Canton Group) is pre-W14-16 (revised timeline)
- **Cross-Chain Engine** (8881) — SPECIFIED but not built

### COMMS gaps
- **Codex Gate port collision with CHECKSUM** (both claim 8898). CODEX-GATE is currently NOT in the running container list — either undeployed or displaced. **Must resolve port assignment + redeploy CODEX-GATE on a new port + update package.json description. Tier 2.**
- **Real Redis backend** for state persistence (currently in-memory `Map`) — Super Rail item

### ADMIN gaps
- **CODEX-GATE not deployed** as of 2026-04-08 morning (missing from `docker ps`). The standing-record files (this ORBAT, Inspector Mode, Safe Harbour, Blackout Milestones) live in the repo but the service itself is not running. **Tier 2.**

### DOCTRINE gaps
- **No formal Codex morning pass yet** — Standing Order #12 (filed today) requires that whenever new doctrine lands, ChatGPT independent verification runs as part of Goodnight closure. First pass deferred to this morning's session.

### Tier 3 admin carryovers (low priority)
- GENESIS-ALPHA-TRIGGER archived repo decision
- GENESIS-RAIL-1-CASH-RAIL `.env` review (sensitive — never auto-commit)
- GENESIS-STACK-START misclone cleanup

---

## ✅ ABUNDANCE — Where the battlegroup is strong

These are compartments where we have surplus and should NOT add more. New work here is duplication.

### RECON — overwhelming abundance
- **581+ exchanges, 0 gaps** (CEX Batch 1+2 + DEX Batch 1-9)
- **70 CEX exchanges** (Batch 1: 28 + Batch 2: 40)
- **2,054+ parser files** in INGRESS-REINFORCEMENTS monorepo
- **31-chain DEX coverage** via DEX-INGESTOR-UNIVERSAL
- **9 intelligence collectors** in INTEL-MESH (59K ring buffer)

### DEFENCE — strong post-2026-04-07
- **Discipline trinity operational:** CHECKSUM + OVERWATCH + TRIBUNAL all live on Server A
- **External dead-men x3** (8899, 8901, 8911) — watchdogs for the watchdogs
- **ARIS Decree 222 + 223** machine-enforced
- **Promotion Gate 3 of 4 satisfied** as of 2026-04-08 morning
- **Iron Halo HMAC sandbox** containment around all external AI calls

### DECREES — abundance bordering on ceremonial
- **223 ARIS decrees** filed. Most operational impact is from a small hot-set (#17, #182, #222, #223). Tier 2 cleanup item: audit decree dormancy and retire any that no longer bind anything.

### SPARKS — strong pipeline, validated methodology
- **45 sparks fired**, 10 BEDROCK reached
- **3-AI loop empirically validated** (Spark #045 caught 30× Grok inflation)
- **Spark Archive in Skunkworks** — full lens rotation, prompt templates

---

## ORBAT WALK CHECKLIST (Goodnight Protocol Step 4.5)

Run this every Goodnight:

- [ ] Walk Compartment 1 CORE — anything new? anything retired? anyone promoted?
- [ ] Walk Compartment 2 DEFENCE — new monitors? new alarms? gate state changed?
- [ ] Walk Compartment 3 OFFENCE — new strike weapons? clip cap changed? new channels?
- [ ] Walk Compartment 4 INTELLIGENCE — new sparks fired? BEDROCK reached? methodology evolved?
- [ ] Walk Compartment 5 RECON — new ingestors? exchanges retired? parser fleet grown?
- [ ] Walk Compartment 6 LOGISTICS — capital moves? PeaceWorks separation events? ledger updates?
- [ ] Walk Compartment 7 COMMS — new comms channels? red lines tested? notepad rotated?
- [ ] Walk Compartment 8 ENGINEERING — new builds? new sparks? labs activity?
- [ ] Walk Compartment 9 ADMIN — addendum filed? Central Library updated? recovery doc current?
- [ ] Walk Compartment 10 DOCTRINE — new decree? new standing order? new methodology?
- [ ] Refresh GAP ANALYSIS — anything new identified? anything closed?
- [ ] Refresh ABUNDANCE — anything tipping from "abundant" to "load-bearing"?
- [ ] Cross-reference SOP / Central Library / CODEX — three layers, same truth, all updated?

---

## CHANGELOG

**v1.0 — 2026-04-08 morning** — Initial filing. Built from MEMORY.md + Central Library seed.service.ts (357 services) + stack-map.md + weapons-backlog.md + 2026-04-07 deployment work + this morning's Standing Order #12 (CODEX as canonical reference layer).

Drift correction bundled: yesterday I (Claude) mislabeled "Codex" as a third AI voice ("Codex AI cross-verification") in `feedback_codex_in_protocols.md`, the notepad, SOP Addendum 204, outstanding-actions.md, and goodnight-protocol.md memory. The actual second voice in the 3-AI loop is **ChatGPT**. CODEX is **the canonical reference layer for humans**, paired with Central Library which is the same truth for machines. Build It Once doctrine: drift caught and corrected at the source. Standing Order #12 filed to prevent recurrence.

**Future versions:** Walked every Goodnight Protocol Step 4.5. Anything added/retired gets reflected here. Gap and abundance sections refreshed.

---

**END OF ORBAT v1.0 — Genesis Battlegroup Order of Battle**
