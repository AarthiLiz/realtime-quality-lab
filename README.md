
# Realtime Quality Lab 🧪

[![CI](https://github.com/AarthiLiz/realtime-quality-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/AarthiLiz/realtime-quality-lab/actions/workflows/ci.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**A robust, containerized test automation framework for validating Realtime WebSocket Architectures.**

---

## 📊 Live Dashboard & Docs

- [Live CI Status & Reports](https://github.com/AarthiLiz/realtime-quality-lab/actions/workflows/ci.yml)
- [System Architecture](docs/architecture.md)
- [Test Strategy](docs/test-strategy.md)
- [Interview Guide](INTERVIEW_GUIDE.md)

---

## 🚀 Features

- **Hybrid E2E Testing:** REST + WebSocket flows
- **Chaos Engineering:** Latency & packet loss injection
- **Visual Regression:** Playwright screenshot diffing
- **Load Testing:** k6 scripts for concurrency
- **Containerized:** Docker for reproducibility
- **CI/CD:** GitHub Actions, Allure reporting
- **Strict Code Quality:** ESLint, Prettier

## ⚡ Quickstart

1. **Full suite (isolated, recommended):**
	```bash
	docker-compose up --build --abort-on-container-exit
	```
2. **Start server locally:**
	```bash
	npm run server
	# http://localhost:3000
	```
3. **Run tests:**
	```bash
	npm test
	```
4. **View reports:**
	- Allure: open `allure-results/` with Allure CLI
	- Playwright: open `playwright-report/index.html`

## 🧪 Test Scenarios

| Scenario                | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| **Health Check**        | Verifies REST API availability.                         |
| **Realtime Chat**       | Validates WebSocket message broadcasting.               |
| **Chaos & Reliability** | Injects latency/packet drops to test system resilience. |
| **Hybrid Flow**         | Triggers WebSocket events via REST API calls.           |
| **Load Test**           | Simulates 50 concurrent clients to verify throughput.   |
| **Resilience**          | Verifies client reconnection logic.                     |

> See [Test Strategy](docs/test-strategy.md) for QA philosophy and patterns.

## 📂 Project Structure

- `server/`: Node.js backend, chaos logic, WebSocket/REST endpoints
- `tests/scenarios/`: Playwright E2E, chaos, load, hybrid tests
- `utils/`: Shared helpers (SocketClient, TestData)

---

_Portfolio project by Aarthi Elizabeth._
