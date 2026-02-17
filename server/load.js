/* globals __ENV */
import ws from 'k6/ws';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 10 }, // Ramp up to 10 users
    { duration: '10s', target: 10 }, // Stay at 10 users
    { duration: '5s', target: 0 }, // Ramp down
  ],
};

export default function () {
  const url = __ENV.WS_URL || 'ws://localhost:3000';

  const res = ws.connect(url, {}, function (socket) {
    socket.on('open', () => {
      // Simulate sending a message
      socket.send('Hello from k6 load test');
    });

    socket.on('message', (data) => {
      // Verify we receive the broadcast back
      check(data, { 'received message': (d) => d && d.length > 0 });
    });

    // Close connection after a short session
    socket.setTimeout(function () {
      socket.close();
    }, 1000);
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
  sleep(1);
}
