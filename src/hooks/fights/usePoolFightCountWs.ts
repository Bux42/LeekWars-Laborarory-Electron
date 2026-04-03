import { RunningPoolFightCountEvent } from '../../services/websocket/events/pool-run/fight/RunningPoolFightCountEvent';
import { useWs } from '../../services/websocket/useWs';

export function usePoolFightCountWs(
  poolType: string,
  bossType: string | undefined,
  runId: string,
  handler: (count: number, total: number) => void,
) {
  useWs<RunningPoolFightCountEvent>(
    `/${bossType ? bossType : poolType}-pool-run/${runId}/fight-count`,
    (payload) => {
      handler(payload.count, payload.total);
    },
  );
}
