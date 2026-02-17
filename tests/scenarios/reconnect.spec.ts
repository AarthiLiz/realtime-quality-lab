import { test, expect } from '@playwright/test';
import { SocketClient } from '../../utils/socketClient.ts';
import { TestData } from '../../utils/testData.ts';

const API_URL = process.env.API_URL || 'http://localhost:3000';
const WS_URL = process.env.WS_URL || 'ws://localhost:3000';

test.describe('Connection Resilience', () => {
  test.beforeEach(async ({ request }) => {
    await request.post(`${API_URL}/chaos`, {
      data: { latency: 0, dropRate: 0 },
    });
  });

  test('should be able to disconnect and reconnect', async () => {
    const client = new SocketClient(WS_URL);
    await client.connect();

    // 1. Send message before disconnect
    const msg1 = TestData.generateMessage();
    client.send(msg1);
    await expect(client.waitForMessage(msg1)).resolves.toContain(msg1);

    // 2. Simulate Drop
    client.close();

    // 3. Reconnect
    await client.connect();

    // 4. Send message after reconnect
    const msg2 = TestData.generateMessage();
    client.send(msg2);
    await expect(client.waitForMessage(msg2)).resolves.toContain(msg2);

    client.close();
  });
});
