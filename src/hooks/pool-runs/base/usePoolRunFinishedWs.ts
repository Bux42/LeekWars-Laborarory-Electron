import { useWs } from '../../../services/websocket/useWs';
import { RunningPoolFinishedEvent } from '../../../services/websocket/events/pool-run/base/RunningPoolFinishedEvent';

export function usePoolRunFinishedWs(
  handler: (run: RunningPoolFinishedEvent) => void,
) {
  useWs<RunningPoolFinishedEvent>('/base-pool-run/finished', (payload) => {
    handler(payload);
  });
}
