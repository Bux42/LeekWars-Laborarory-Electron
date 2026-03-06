export interface IWebSocketMessage {
  route: string;
  payload: unknown;
}

class WebSocketService {
  private sockets: Record<string, WebSocket> = {};
  private listeners: Record<string, ((payload: unknown) => void)[]> = {};

  connect(route: string = '') {
    if (!route) {
      return;
    }

    const existingSocket = this.sockets[route];

    if (
      existingSocket &&
      (existingSocket.readyState === WebSocket.OPEN ||
        existingSocket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const socket = new WebSocket(`ws://localhost:7000/ws${route}`);
    this.sockets[route] = socket;

    socket.onmessage = (event) => {
      const rawData: unknown = JSON.parse(event.data);

      const data: IWebSocketMessage =
        rawData &&
        typeof rawData === 'object' &&
        'route' in rawData &&
        'payload' in rawData
          ? (rawData as IWebSocketMessage)
          : {
              route,
              payload: rawData,
            };

      this.listeners[data.route]?.forEach((listener) => listener(data.payload));
    };

    socket.onclose = () => {
      if (this.sockets[route] === socket) {
        delete this.sockets[route];
      }
    };
  }

  private disconnect(route: string) {
    const socket = this.sockets[route];

    if (!socket) {
      return;
    }

    socket.close();
    delete this.sockets[route];
  }

  subscribe(route: string, listener: (payload: unknown) => void) {
    if (!route) {
      return () => {};
    }

    const routeListeners = this.listeners[route] || [];
    this.listeners[route] = [...routeListeners, listener];

    return () => {
      this.listeners[route] = (this.listeners[route] || []).filter(
        (registeredListener) => registeredListener !== listener,
      );

      if (this.listeners[route]?.length === 0) {
        delete this.listeners[route];
        this.disconnect(route);
      }
    };
  }
}

export const wsService = new WebSocketService();
