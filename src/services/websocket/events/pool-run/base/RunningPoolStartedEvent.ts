import { MobType } from '../../../../../renderer/constants/mobs/Mobs.constants';
import { PoolType } from '../../../../../renderer/constants/pools/Pools.constants';
import { BasePoolRunResponse } from '../../../../leekwarsToolsAPI.schemas';

export interface RunningPoolStartedEvent {
  run: BasePoolRunResponse;
  type: PoolType;
  bossType: MobType;
  runRoute: string;
  poolId: string;
}
