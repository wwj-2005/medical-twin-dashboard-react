import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8081 });
console.log('Mock WS listening at ws://localhost:8081');

let t = 0;
setInterval(() => {
  t += 0.02;

  // ECG-like waveform (toy)
  const ecg =
    1.2 * Math.exp(-Math.pow((t % 1) - 0.3, 2) / 0.0008)   // R
    - 0.15 * Math.exp(-Math.pow((t % 1) - 0.2, 2) / 0.005) // Q
    + 0.2 * Math.exp(-Math.pow((t % 1) - 0.45, 2) / 0.01)  // T
    + 0.02 * (Math.random() - 0.5);

  const abp = 80 + 40 * Math.max(0, Math.sin(t * 3)) + 2 * (Math.random() - 0.5);

  const hr = 70 + 5 * Math.sin(t * 0.6);
  const resp = 16 + 2 * Math.sin(t * 0.2);
  const spo2 = 98 + 0.3 * Math.sin(t * 0.1);
  const temp = 36.8 + 0.05 * Math.sin(t * 0.05);
  const sys = 120 + 5 * Math.sin(t * 0.6);
  const dia = 75 + 3 * Math.sin(t * 0.6);
  const map = dia + (sys - dia) / 3;

  const payload = JSON.stringify({ ts: Date.now(), hr, resp, spo2, temp, sys, dia, map, ecg, abp });
  wss.clients.forEach(c => { try { c.send(payload); } catch {} });
}, 20);