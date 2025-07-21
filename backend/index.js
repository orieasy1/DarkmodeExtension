// index.js
const WebSocket = require('ws');

// WebSocket 전용 포트
const PORT = 3001;

// 서버 생성
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('✅ 클라이언트 WebSocket 연결됨');

  ws.on('message', (message) => {
    console.log('📨 클라이언트 메시지:', message.toString());

    // 응답 전송
    ws.send(`서버 응답: ${message}`);
  });

  ws.on('close', () => {
    console.log('❌ 클라이언트 연결 종료');
  });
});

console.log(`🟢 WebSocket 서버 실행 중 (ws://localhost:${PORT})`);
