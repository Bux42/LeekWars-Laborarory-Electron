import { useWs } from '../../../services/websocket/useWs';
import { RunningPoolFightCountEvent } from '../../../services/websocket/events/pool-run/fight/RunningPoolFightCountEvent';

export function usePoolFarmerFightCountWs(
  runId: string,
  handler: (count: number) => void,
) {
  useWs<RunningPoolFightCountEvent>(
    runId ? `/farmer-pool-run/${runId}/fight-count` : '',
    (payload) => {
      handler(payload.count);
    },
  );
}
