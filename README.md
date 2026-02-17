# Realtime Quality Lab 🧪

[![Playwright Tests](https://github.com/AarthiLiz/realtime-quality-lab/actions/workflows/playwright.yml/badge.svg)](https://github.com/AarthiLiz/realtime-quality-lab/actions/workflows/playwright.yml)

A robust test automation framework designed to validate **Realtime WebSocket Architectures**. This project demonstrates advanced QA strategies including chaos engineering, load testing, and hybrid protocol verification.

## 🏗 Architecture

- **Server**: Node.js + Express + `ws` (WebSocket)
- **Test Framework**: Playwright (Test Runner & Assertions)
- **Chaos Engine**: Custom middleware to inject latency and packet loss

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Mock Server
```bash
npm run server
```
*Server runs on `http://localhost:3000`*

### 3. Run Tests
```bash
npm test
```

## 🧪 Test Scenarios

| Scenario | Description |
|----------|-------------|
| **Health Check** | Verifies REST API availability. |
| **Realtime Chat** | Validates WebSocket message broadcasting. |
| **Chaos & Reliability** | Injects latency/packet drops to test system resilience. |
| **Hybrid Flow** | Triggers WebSocket events via REST API calls. |
| **Load Test** | Simulates 50 concurrent clients to verify throughput. |
| **Resilience** | Verifies client reconnection logic. |

## 📂 Project Structure

- `server/`: Mock backend with Chaos logic.
- `tests/scenarios/`: Playwright test specs.
- `utils/`: Shared helpers (SocketClient, TestData).

---
*Created as a portfolio demonstration of Senior QA Engineering skills.*