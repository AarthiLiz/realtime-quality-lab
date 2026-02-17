/* eslint-disable no-console */
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWebSocketServer, broadcast } from './websocket.ts';
import { chaosState } from './chaos.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const messages: string[] = [];
let chaosTimer: NodeJS.Timeout | null = null;
const CHAOS_RESET_TIMEOUT_MS = 5000;

app.post('/message', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing text' });
  }

  messages.push(text);
  broadcast(`System Notification: ${text}`);

  res.json({
    delivered: true,
    totalMessages: messages.length,
  });
});

app.get('/messages', (_, res) => {
  res.json(messages);
});

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/chaos', (req, res) => {
  const { latency, dropRate } = req.body;
  if (typeof latency === 'number') chaosState.latency = latency;
  if (typeof dropRate === 'number') chaosState.dropRate = dropRate;
  console.log(`[Chaos] Updated: Latency=${chaosState.latency}ms, DropRate=${chaosState.dropRate}`);

  // Safety: Auto-reset chaos state after 5 seconds to prevent test pollution
  if (chaosTimer) clearTimeout(chaosTimer);
  chaosTimer = setTimeout(() => {
    chaosState.latency = 0;
    chaosState.dropRate = 0;
    console.log('[Chaos] Safety: Auto-reset to normal state');
  }, CHAOS_RESET_TIMEOUT_MS);

  res.json(chaosState);
});

const server = createServer(app);
const PORT = 3000;

// Attach the WebSocket server to the HTTP server
createWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`Realtime mock server running on http://localhost:${PORT}`);
});
