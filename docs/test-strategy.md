# Test Strategy

## Philosophy

We move beyond simple "happy path" testing to verify how the system behaves under stress and failure. This framework treats **reliability as a feature**.

## Test Levels

### 1. Functional Testing

- **Goal**: Verify basic features work.
- **Scenarios**:
  - Health check endpoint returns 200.
  - WebSocket connects successfully.
  - Messages sent by User A are received by User B.

### 2. Resilience Testing (Chaos)

- **Goal**: Verify system stability when the network is unreliable.
- **Scenarios**:
  - **High Latency**: Inject 500ms+ lag. Verify clients handle it without crashing, though timing assertions may adjust.
  - **Packet Loss**: Inject 100% drop rate. Verify clients handle missing messages gracefully (or tests fail as expected).
  - **Reconnection**: Verify clients can disconnect and rejoin the session seamlessly.

### 3. Load Testing

- **Goal**: Verify concurrency limits.
- **Scenario**: Spin up 50+ concurrent WebSocket clients. Ensure broadcast reaches all of them within an acceptable time window.

### 4. Hybrid Integration

- **Goal**: Verify cross-protocol side effects.
- **Scenario**: Trigger a REST API call and assert a WebSocket notification is received.

## Tools

- **Runner**: Playwright (chosen for its robust async handling and reporting).
- **CI/CD**: GitHub Actions (runs on every push).
- **Reporting**: HTML Reports (artifacts generated on CI).
