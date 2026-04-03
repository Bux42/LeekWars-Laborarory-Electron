import { useWs } from '../../../services/websocket/useWs';
import { RunningPoolStartedEvent } from '../../../services/websocket/events/pool-run/base/RunningPoolStartedEvent';

export function usePoolRunStartedWs(
  handler: (run: RunningPoolStartedEvent) => void,
) {
  useWs<RunningPoolStartedEvent>('/base-pool-run/started', (payload) => {
    handler(payload);
  });
}
