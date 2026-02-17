
# Test Strategy

## Philosophy
Reliability is a feature. We test not just the "happy path" but also system behavior under stress, chaos, and concurrency.

## Test Levels & Patterns

### 1. Functional Testing
- **Goal:** Verify core features
- **Examples:**
  - [health-check.spec.ts](../tests/scenarios/health-check.spec.ts): `/health` returns 200
  - [websocket.spec.ts](../tests/scenarios/websocket.spec.ts): WebSocket echo/broadcast

### 2. Resilience Testing (Chaos)
- **Goal:** Validate stability under network faults
- **Patterns:**
  - Inject latency (e.g., 500ms+) via `POST /chaos` ([chaos.ts](../server/chaos.ts))
  - Inject packet loss (dropRate=1.0)
  - Test reconnection logic ([reconnect.spec.ts](../tests/scenarios/reconnect.spec.ts))

### 3. Load Testing
- **Goal:** Validate concurrency and throughput
- **Pattern:**
  - [load.spec.ts](../tests/scenarios/load.spec.ts): 50+ concurrent WebSocket clients, broadcast verification
  - [load.js](../load.js): k6 load test script

### 4. Hybrid Integration
- **Goal:** Verify cross-protocol side effects
- **Pattern:**
  - [hybrid-flow.spec.ts](../tests/scenarios/hybrid-flow.spec.ts): REST triggers WebSocket notification

## Tools & Reporting
- **Test Runner:** Playwright (async, robust reporting)
- **Load:** k6 (see [load.js](../load.js))
- **CI/CD:** GitHub Actions ([ci.yml](../ci.yml)), Allure/Playwright reports
- **Visual Regression:** Playwright screenshots

---
**See also:**
- [Architecture](architecture.md) for system/component overview
- [README.md](../README.md) for quickstart and structure
