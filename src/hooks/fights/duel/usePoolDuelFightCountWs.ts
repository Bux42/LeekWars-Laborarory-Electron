import { useWs } from '../../../services/websocket/useWs';
import { RunningPoolFightCountEvent } from '../../../services/websocket/events/pool-run/fight/RunningPoolFightCountEvent';

export function usePoolDuelFightCountWs(
  runId: string,
  handler: (count: number) => void,
) {
  useWs<RunningPoolFightCountEvent>(
    `/duel-pool-run/${runId}/fight-count`,
    (payload) => {
      handler(payload.count);
    },
  );
}
