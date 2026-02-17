# Realtime Quality Lab 🧪

[![CI](https://github.com/AarthiLiz/realtime-quality-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/AarthiLiz/realtime-quality-lab/actions/workflows/ci.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A robust test automation framework designed to validate **Realtime WebSocket Architectures**. This project demonstrates advanced QA strategies including chaos engineering, load testing, and hybrid protocol verification.

---

### ✨ Live Quality Dashboard

A live dashboard showcasing CI status and the latest test reports is published to GitHub Pages.

**➡️ View the Live Dashboard**

---

## 🚀 Features

This project demonstrates a comprehensive, modern approach to quality engineering:

- **Hybrid Testing**: End-to-end tests that validate interactions between REST APIs and WebSockets.
- **Chaos Engineering**: A custom "Chaos Engine" to programmatically inject latency and packet loss, testing system resilience.
- **Visual Regression Testing**: Automated screenshot comparisons with Playwright to catch unintended UI changes.
- **Load Testing**: Dedicated load test scripts using **k6** to validate system performance under concurrency.
- **Containerized Environment**: The entire stack (server, tests, tools) is containerized with **Docker** for perfect reproducibility.
- **CI/CD Pipeline**: A sophisticated **GitHub Actions** workflow that runs all tests and publishes a live quality dashboard.
- **Advanced Reporting**: Rich, detailed test reports generated with **Allure**, including screenshots and traces on failure.
- **Code Quality**: Enforced code style and quality using **ESLint** and **Prettier**.

## 🛠️ How to Run

### Prerequisites

- Docker Desktop must be installed and running.

### 1. Run the Full Test Suite (Recommended)

This single command builds the server image, starts the server, and runs all Playwright tests in an isolated environment.

```bash
docker-compose up --build --abort-on-container-exit
```

### 2. Start the Mock Server

**Option A: Run locally**
```bash
npm run server
```

_Server runs on `http://localhost:3000`_

### 3. Run Tests

```bash
npm test
```

## 🧪 Test Scenarios

| Scenario                | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| **Health Check**        | Verifies REST API availability.                         |
| **Realtime Chat**       | Validates WebSocket message broadcasting.               |
| **Chaos & Reliability** | Injects latency/packet drops to test system resilience. |
| **Hybrid Flow**         | Triggers WebSocket events via REST API calls.           |
| **Load Test**           | Simulates 50 concurrent clients to verify throughput.   |
| **Resilience**          | Verifies client reconnection logic.                     |

> See Test Strategy for details on our QA philosophy.

## 📂 Project Structure

- `server/`: Mock backend with Chaos logic.
- `tests/scenarios/`: Playwright test specs.
- `utils/`: Shared helpers (SocketClient, TestData).

---

_Created as a portfolio demonstration of Senior QA Engineering skills._
