import { useEffect } from 'react';
import { wsService } from './WebsocketService';

export function useWs<TPayload = unknown>(
  route: string = '',
  handler: (payload: TPayload) => void,
) {
  useEffect(() => {
    wsService.connect(route);

    const unsubscribe = wsService.subscribe(route, (payload) => {
      handler(payload as TPayload);
    });

    return unsubscribe;
  }, [handler, route]);
}
