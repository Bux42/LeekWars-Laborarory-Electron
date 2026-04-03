import { BasePoolRunResponse } from '../../../../leekwarsToolsAPI.schemas';

export interface RunningPoolFinishedEvent {
  run: BasePoolRunResponse;
  runRoute: string;
  poolId: string;
}
