import { PoolRunsInfoResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { MobType } from '../../../constants/mobs/Mobs.constants';
import { PoolType } from '../../../constants/pools/Pools.constants';

export interface ILastPoolRunsButtonsProps {
  poolRunsInfo: PoolRunsInfoResponse;
  poolType: PoolType;
  bossType?: MobType;
  poolId: string;
  showViewPoolButton?: boolean;
}
