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

  // 5초마다 임의의 JSON 데이터 전송
  const intervalId = setInterval(() => {
    const data = {
      type: 'UPDATE_FILTER',
      payload: {
        mode: 1, // 다크모드
        brightness: Math.floor(Math.random() * 100) + 50,
        contrast: Math.floor(Math.random() * 100) + 50,
        grayscale: Math.floor(Math.random() * 100), // 0~99
        sepia: Math.floor(Math.random() * 100),     // 0~99
        useFont: Math.random() > 0.5,               // true/false 랜덤
        fontFamily: "Open Sans",                     // 예시 폰트
        textStroke: Math.floor(Math.random() * 3),   // 0~2
        invertListed: false,
        siteList: []
      }
    };
    console.log('서버가 전송하는 JSON:', data);
    ws.send(JSON.stringify(data));
  }, 5000);

  ws.on('close', () => {
    console.log('❌ 클라이언트 연결 종료');
    clearInterval(intervalId);
  });
});

console.log(`🟢 WebSocket 서버 실행 중 (ws://localhost:${PORT})`);
