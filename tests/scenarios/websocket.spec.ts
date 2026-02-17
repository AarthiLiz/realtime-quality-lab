import { test, expect } from "@playwright/test";
import { SocketClient } from "../../utils/socketClient.ts";

test.describe("Realtime WebSocket", () => {
  let client: SocketClient;

  test.beforeEach(async () => {
    client = new SocketClient("ws://localhost:3000");
    await client.connect();
  });

  test.afterEach(() => {
    client.close();
  });

  test("should receive own sent message via broadcast", async () => {
    const message = "Hello World";
    client.send(message);

    const response = await client.waitForMessage(message);
    expect(response).toBe(message);
  });
});