import { PoolRunsInfoResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
import { MobType } from '../../../../constants/mobs/Mobs.constants';
import { PoolType } from '../../../../constants/pools/Pools.constants';

export interface IBasePoolListBasePool {
  name: string;
  deterministic?: boolean;
  startSeed?: number;
}

export interface IBasePoolListItem {
  id: string;
  basePool: IBasePoolListBasePool;
  poolRunsInfo: PoolRunsInfoResponse;
}

export interface IBasePoolListProps<TPool extends IBasePoolListItem> {
  pools: TPool[];
  poolType: PoolType;
  bossType?: MobType;
  getLabel: (pool: TPool) => string;
  emptyMessage: string;
}
