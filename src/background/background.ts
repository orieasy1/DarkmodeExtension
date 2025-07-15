module DarkReader.Background {

    // Initialize extension
    export var extension: DarkReader.Extension;
    export var onExtensionLoaded = new xp.Event<Extension>();

    // WebSocket 변수
    let socket: any = null;

    // WebSocket 연결 함수
    function connectWebSocket() {
        socket = new WebSocket('ws://localhost:3001');

        socket.onopen = () => {
            console.log('[bg] WebSocket 연결됨');
            if (socket && socket.readyState === 1) {
                socket.send('[bg] 확장에서 서버 연결됨');
            }
        };

        socket.onmessage = (event) => {
            console.log('[bg] 서버 응답:', event.data);
            chrome.runtime.sendMessage({ from: 'server', data: event.data });
        };

        socket.onclose = () => {
            console.warn('[bg] 연결 끊김 → 재연결 예정');
            setTimeout(connectWebSocket, 3000);
        };

        socket.onerror = (err) => {
            console.error('[bg] WebSocket 오류:', err);
            if (socket) socket.close();
        };
    }

    // popup에서 보내는 메시지 수신 → 서버로 전달
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg.from === 'popup' && socket && socket.readyState === 1) {
            console.log('[bg] popup → 서버:', msg.data);
            socket.send(msg.data);
        }
    });

    loadConfigs(() => {
        extension = new DarkReader.Extension(new DarkReader.FilterCssGenerator());
        onExtensionLoaded.invoke(extension);

        //websocket 연결
        connectWebSocket();
    });

    if (DEBUG) {
        // Reload extension on connection
        const listen = () => {
            const req = new XMLHttpRequest();
            req.open('GET', 'http://localhost:8890/', true);
            req.onload = () => {
                if (req.status >= 200 && req.status < 300) {
                    chrome.runtime.reload();
                } else {
                    setTimeout(listen, 2000);
                }
            };
            req.onerror = () => setTimeout(listen, 2000);
            req.send();
        };
        setTimeout(listen, 2000);
    }
}
