import { useEffect, useRef } from 'react';
import { wsService } from './WebsocketService';

export function useWs<TPayload = unknown>(
  route: string = '',
  handler: (payload: TPayload) => void,
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!route) {
      return;
    }

    wsService.connect(route);

    const unsubscribe = wsService.subscribe(route, (payload) => {
      handlerRef.current(payload as TPayload);
    });

    return unsubscribe;
  }, [route]);
}
