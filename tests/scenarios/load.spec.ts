import { test, expect } from "@playwright/test";
import { SocketClient } from "../../utils/socketClient.ts";
import { TestData } from "../../utils/testData.ts";

const WS_URL = "ws://localhost:3000";
const API_URL = "http://localhost:3000";
const CLIENT_COUNT = 50;

test.describe("Performance & Load", () => {
  test.beforeEach(async ({ request }) => {
    await request.post(`${API_URL}/chaos`, {
      data: { latency: 0, dropRate: 0 },
    });
  });

  test(`should handle ${CLIENT_COUNT} concurrent connections`, async () => {
    const clients: SocketClient[] = [];

    // 1. Connect all clients concurrently
    const connectPromises = Array.from({ length: CLIENT_COUNT }).map(async () => {
      const client = new SocketClient(WS_URL);
      clients.push(client);
      await client.connect();
    });

    await Promise.all(connectPromises);
    expect(clients.length).toBe(CLIENT_COUNT);

    // 2. Broadcast a message from the first client
    const sender = clients[0];
    const message = TestData.generateMessage();
    sender.send(message);

    // 3. Verify all OTHER clients received it
    // We check a subset (or all) to ensure the broadcast loop is working under load
    const receivers = clients.slice(1);
    const receivePromises = receivers.map((c) => c.waitForMessage(message));

    await Promise.all(receivePromises);

    // Cleanup
    clients.forEach((c) => c.close());
  });
});