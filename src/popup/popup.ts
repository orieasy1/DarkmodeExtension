module DarkReader.Popup {

    // Create window
    export var popupWindow: PopupWindow;

    // WebSocket 연결 변수
    let socket: WebSocket | null = null;

    // Edge fix
    if ((<any>window).chrome && !chrome.extension && (<any>window).browser && (<any>window).browser.extension) {
        chrome.extension = (<any>window).browser.extension;
    }

    if ((<any>window).chrome && chrome.extension) {
        // Access extension from the background
        const background = <typeof DarkReader.Background>(<any>chrome.extension.getBackgroundPage()).DarkReader.Background;

        if (background.extension) {
            popupWindow = new PopupWindow(background.extension);

            // ✅ WebSocket 연결
            socket = new WebSocket('ws://localhost:3001');

            socket.addEventListener('open', () => {
                console.log('[popup] WebSocket 연결됨');
                socket?.send('팝업에서 서버에 연결했습니다!');
            });

            socket.addEventListener('message', (event) => {
                console.log('[popup] 서버 응답:', event.data);
            });

            socket.addEventListener('error', (err) => {
                console.error('[popup] WebSocket 오류:', err);
            });

        } else {
            const onExtLoaded = (ext: DarkReader.Extension) => {
                popupWindow = new PopupWindow(ext);
                background.onExtensionLoaded.removeHandler(onExtLoaded);

                // ✅ WebSocket 연결
                socket = new WebSocket('ws://localhost:3001');

                socket.addEventListener('open', () => {
                    console.log('[popup] WebSocket 연결됨');
                    socket?.send('팝업에서 서버에 연결했습니다!');
                });

                socket.addEventListener('message', (event) => {
                    console.log('[popup] 서버 응답:', event.data);
                });

                socket.addEventListener('error', (err) => {
                    console.error('[popup] WebSocket 오류:', err);
                });

            };
            background.onExtensionLoaded.addHandler(onExtLoaded);
        }

        // Remove popup and unbind from model
        window.addEventListener('unload', (e) => {
            popupWindow.scope = null;
            popupWindow.remove();

            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
                console.log('[popup] WebSocket 연결 종료');
            }
        });
    }
    else {
        popupWindow = getMockPopup();
    }

    /**
     * Mock for tests.
     */
    function getMockPopup() {
        return new PopupWindow(<Extension><any>xp.observable({
            enabled: true,
            config: <FilterConfig>{
                mode: 1/*DarkReader.FilterMode.dark*/,
                brightness: 110,
                contrast: 80,
                grayscale: 30,
                sepia: 10,
                useFont: false,
                fontFamily: 'Segoe UI',
                textStroke: 0,
                siteList: [
                    'mail.google.com',
                    'npmjs.com'
                ],
                invertListed: false
            },
            fonts: [
                'Arial',
                'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'Open Sans',
                'Segoe UI',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ],
            getActiveTabInfo: function (callback) { callback({ host: 'server1.mail.veryverylongnameveryverylongnameveryverylongnameveryverylongname.com' }); }
        }));
    }
}
