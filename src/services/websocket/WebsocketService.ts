import { ServerEvent } from './Websocket.constants';

class WebSocketService {
  private socket?: WebSocket;
  private listeners: ((event: ServerEvent) => void)[] = [];

  connect() {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    this.socket = new WebSocket('ws://localhost:7000/ws');

    this.socket.onmessage = (event) => {
      const data: ServerEvent = JSON.parse(event.data);
      this.listeners.forEach((l) => l(data));
    };

    this.socket.onclose = () => {
      this.socket = undefined;
    };
  }

  subscribe(listener: (event: ServerEvent) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const wsService = new WebSocketService();
