import { test, expect } from '@playwright/test';
import { SocketClient } from '../../utils/socketClient.ts';

const API_URL = process.env.API_URL || 'http://localhost:3000';
const WS_URL = process.env.WS_URL || 'ws://localhost:3000';

test.describe('Realtime WebSocket', () => {
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

  test('should receive own sent message via broadcast', async () => {
    const message = 'Hello World';
    client.send(message);

    const response = await client.waitForMessage(message);
    expect(response).toBe(message);
  });
});
