import { test, expect } from '@playwright/test';
import { SocketClient } from '../../utils/socketClient.ts';

const API_URL = process.env.API_URL || 'http://localhost:3000';
const WS_URL = process.env.WS_URL || 'ws://localhost:3000';

test.describe('Hybrid Protocol Integration', () => {
  let client: SocketClient;

  test.beforeEach(async ({ request }) => {
    await request.post(`${API_URL}/chaos`, {
      data: { latency: 0, dropRate: 0 },
    });

    client = new SocketClient(WS_URL);
    await client.connect();
  });

  test.afterEach(() => {
    client.close();
  });

  test('should receive WebSocket notification when POST /message is called', async ({
    request,
  }) => {
    const payload = 'Urgent Update';

    // 1. Trigger action via REST API
    await request.post(`${API_URL}/message`, { data: { text: payload } });

    // 2. Verify side-effect via WebSocket
    const notification = await client.waitForMessage(`System Notification: ${payload}`);
    expect(notification).toBeDefined();
  });
});
