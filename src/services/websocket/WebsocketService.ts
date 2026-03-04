export interface IWebSocketMessage {
  route: string;
  payload: unknown;
}

class WebSocketService {
  private socket?: WebSocket;
  private route?: string;
  private listeners: Record<string, ((payload: unknown) => void)[]> = {};

  connect(route: string = '') {
    if (
      this.socket &&
      this.route === route &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }

    this.route = route;

    this.socket = new WebSocket(`ws://localhost:7000/ws${route}`);

    this.socket.onmessage = (event) => {
      const rawData: unknown = JSON.parse(event.data);

      const data: IWebSocketMessage =
        rawData &&
        typeof rawData === 'object' &&
        'route' in rawData &&
        'payload' in rawData
          ? (rawData as IWebSocketMessage)
          : {
              route: this.route || '',
              payload: rawData,
            };

      this.listeners[data.route]?.forEach((listener) => listener(data.payload));
    };

    this.socket.onclose = () => {
      this.socket = undefined;
      this.route = undefined;
    };
  }

  subscribe(route: string, listener: (payload: unknown) => void) {
    const routeListeners = this.listeners[route] || [];
    this.listeners[route] = [...routeListeners, listener];

    return () => {
      this.listeners[route] = (this.listeners[route] || []).filter(
        (registeredListener) => registeredListener !== listener,
      );

      if (this.listeners[route]?.length === 0) {
        delete this.listeners[route];
      }
    };
  }
}

export const wsService = new WebSocketService();
