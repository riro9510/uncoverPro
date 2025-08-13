class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.ws = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = () => {
                console.log('WebSocket connected');
                resolve('Connection established');
            };

            this.ws.onerror = (err) => {
                console.error('WebSocket error', err);
                reject(err);
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.handleMessage(data);
                } catch {
                    console.warn('Received message is not JSON:', event.data);
                }
            };

            this.ws.onclose = () => {
                console.log('WebSocket closed');
            };
        });
    }

    sendJSON(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        } else {
            console.warn('WebSocket is not open, could not send message');
        }
    }

    handleMessage(data) {
        switch (data.type) {
            case 'update':
                console.log('Update received:', data.payload);
                break;
            case 'error':
                console.error('Server error:', data.message);
                break;
            default:
                console.log('Unknown message:', data);
        }
    }
}

export {WebSocketClient}