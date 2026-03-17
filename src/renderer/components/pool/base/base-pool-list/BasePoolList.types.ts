import { PoolRunsInfoResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
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
  getLabel: (pool: TPool) => string;
  emptyMessage: string;
}
