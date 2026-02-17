import WebSocket from 'ws';

/**
 * Custom error for when an expected message is not received within the timeout.
 */
export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

const DEFAULT_WAIT_TIMEOUT_MS = 2000;
const POLLING_INTERVAL_MS = 50;

export class SocketClient {
  private ws: WebSocket | null = null;
  private messages: string[] = [];

  constructor(private url: string) {}

  async connect(): Promise<void> {
    // Reset message history for the new connection session.
    this.messages = [];

    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      this.ws.on('open', () => {
        resolve();
      });

      this.ws.on('message', (data) => {
        this.messages.push(data.toString());
      });

      this.ws.on('error', (err) => {
        reject(err);
      });
    });
  }

  send(payload: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(payload);
    } else {
      throw new Error('WebSocket is not open');
    }
  }

  async waitForMessage(expected: string, timeout = DEFAULT_WAIT_TIMEOUT_MS): Promise<string> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const found = this.messages.find((m) => m.includes(expected));
      if (found) return found;
      await new Promise((r) => setTimeout(r, POLLING_INTERVAL_MS));
    }
    throw new TimeoutError(`Timeout waiting for message containing: "${expected}"`);
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
