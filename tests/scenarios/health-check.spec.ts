import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("API Health Check", () => {
  test("should return 200 OK for the /health endpoint", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/health`);
    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toEqual({ status: "ok" });
  });
});