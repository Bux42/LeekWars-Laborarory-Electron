import { useEffect } from 'react';
import { wsService } from './WebsocketService';
import { ServerEventMap, ServerEventType } from './Websocket.constants';

export function useWs<T extends ServerEventType>(
  type: T,
  handler: (payload: ServerEventMap[T]) => void,
) {
  useEffect(() => {
    wsService.connect();

    const unsubscribe = wsService.subscribe((event) => {
      if (event.type === type) {
        handler(event.payload as ServerEventMap[T]);
      }
    });

    return unsubscribe;
  }, [type, handler]);
}
