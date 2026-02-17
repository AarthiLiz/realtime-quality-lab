# Copilot Instructions for AI Agents

## Project Overview
- **Purpose:** Test automation for Realtime WebSocket Architectures, focusing on hybrid REST/WebSocket flows, chaos engineering, load, and visual regression testing.
- **Stack:** Node.js, Playwright, k6, Docker, Allure, GitHub Actions CI/CD.

## Architecture & Key Components
- **server/**: Node.js backend with WebSocket and REST endpoints. Includes:
  - `app.ts`: Main server logic
  - `chaos.ts`: Chaos injection (latency, packet loss)
  - `websocket.ts`: WebSocket handling
- **tests/scenarios/**: Playwright E2E and reliability test specs (REST, WebSocket, hybrid flows, chaos, load)
- **utils/**: Shared helpers (e.g., `socketClient.ts` for WebSocket clients, `testData.ts` for test fixtures)
- **load.js**: k6 load test entrypoint
- **playwright.config.ts**: Playwright setup (projects, retries, reporters)
- **allure-results/**, **playwright-report/**: Test and report outputs

## Developer Workflows
- **Full test suite (isolated, recommended):**
  ```bash
  docker-compose up --build --abort-on-container-exit
  ```
- **Start server locally:**
  ```bash
  npm run server
  # Server at http://localhost:3000
  ```
- **Run tests:**
  ```bash
  npm test
  ```
- **View reports:**
  - Allure: open `allure-results/` with Allure CLI
  - Playwright: open `playwright-report/index.html`

## Project Conventions
- **Test structure:**
  - Use Playwright for E2E, reliability, and visual tests
  - Use k6 for load tests (see `load.js`)
  - Place new test specs in `tests/scenarios/`
- **Chaos engineering:**
  - Use `chaos.ts` to inject faults; see test examples for usage
- **Reporting:**
  - Attach screenshots/traces on failure (see Playwright config)
- **Code style:**
  - Enforced by ESLint/Prettier (see `package.json` scripts)
- **CI/CD:**
  - See `ci.yml` for pipeline details; all tests run in containers

## Integration & Communication
- **REST/WebSocket hybrid flows:**
  - Tests often require both REST and WebSocket calls; see hybrid specs for patterns
- **Shared data:**
  - Use `utils/testData.ts` for common fixtures
  - Use `utils/socketClient.ts` for reusable WebSocket logic

## Examples
- See `tests/scenarios/hybrid-flow.spec.ts` for hybrid E2E patterns
- See `server/chaos.ts` for chaos injection API
- See `playwright.config.ts` for test runner customization

---
For more, see [README.md](../README.md) and `server/`, `tests/scenarios/`, `utils/` directories.
