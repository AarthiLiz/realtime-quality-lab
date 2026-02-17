import { test, expect } from '@playwright/test';
import { SocketClient, TimeoutError } from '../../utils/socketClient.ts';

const API_URL = process.env.API_URL || 'http://localhost:3000';
const WS_URL = process.env.WS_URL || 'ws://localhost:3000';

test.describe('Chat Reliability & Chaos', () => {
  test.describe.configure({ mode: 'serial' });

  let userA: SocketClient;
  let userB: SocketClient;

  test.beforeEach(async ({ request }) => {
    // Reset chaos state before each test
    await request.post(`${API_URL}/chaos`, {
      data: { latency: 0, dropRate: 0 },
    });

    userA = new SocketClient(WS_URL);
    userB = new SocketClient(WS_URL);
    await Promise.all([userA.connect(), userB.connect()]);
  });

  test.afterEach(() => {
    userA.close();
    userB.close();
  });

  test('should broadcast messages between users instantly', async () => {
    const msg = 'Hello from User A';
    userA.send(msg);

    // User B should receive it immediately
    const received = await userB.waitForMessage(msg, 1000);
    expect(received).toContain(msg);
  });

  test('should respect server-side latency', async ({ request }) => {
    // Inject 500ms latency
    await request.post(`${API_URL}/chaos`, { data: { latency: 500 } });

    const msg = 'Delayed Message';
    const start = Date.now();
    userA.send(msg);

    await userB.waitForMessage(msg, 2000);
    const duration = Date.now() - start;

    expect(duration).toBeGreaterThan(500); // Must be at least the latency we set
  });

  test('should drop messages when dropRate is 100%', async ({ request }) => {
    // Inject 100% packet loss
    await request.post(`${API_URL}/chaos`, { data: { dropRate: 1.0 } });

    const msg = 'This message should be dropped';
    userA.send(msg);

    // Assert that userB *never* receives the message.
    // We expect waitForMessage to time out and throw our custom error.
    await expect(userB.waitForMessage(msg, 500)).rejects.toThrow(TimeoutError);
  });
});
