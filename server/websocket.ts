import { createRequire } from 'module';
import { Server } from 'http';
import { chaosState } from './chaos.ts';
import type { WebSocket, WebSocketServer as WebSocketServerType } from 'ws';

const require = createRequire(import.meta.url);
const WebSocketPkg = require('ws');
const WebSocketServer = WebSocketPkg.Server;

let wss: WebSocketServerType | undefined;

/**
 * Creates and attaches a WebSocket server to an existing HTTP server.
 * @param server The HTTP server instance to attach to.
 */
export function createWebSocketServer(server: Server) {
  const wsServer = new WebSocketServer({ server });
  wss = wsServer;

  wsServer.on('connection', (ws: WebSocket) => {
    console.log('[WebSocket] Client connected.');

    ws.on('message', (message: Buffer) => {
      // 1. Chaos: Packet Drop
      if (Math.random() < chaosState.dropRate) {
        console.log(`[Chaos] Dropped message: ${message.toString()}`);
        return;
      }

      // 2. Chaos: Latency
      setTimeout(() => {
        const msg = message.toString();
        console.log(`[WebSocket] Broadcasting from message handler: ${msg}`);
        // Directly iterate over clients within the message handler's scope
        // to avoid potential closure/reference issues across async boundaries.
        wss?.clients.forEach((client) => {
          if (client.readyState === WebSocketPkg.OPEN) {
            client.send(msg);
          }
        });
      }, chaosState.latency);
    });

    ws.on('close', () => {
      console.log('[WebSocket] Client disconnected.');
    });
  });

  console.log('WebSocket server is set up and listening.');
}

export function broadcast(message: string) {
  console.log(`[WebSocket] Broadcasting from external function: ${message}`);
  // Use optional chaining to safely access clients if wss is initialized.
  wss?.clients.forEach((client) => {
    if (client.readyState === WebSocketPkg.OPEN) {
      client.send(message);
    }
  });
}
