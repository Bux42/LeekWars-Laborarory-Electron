import { PoolRunsInfoResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { PoolType } from '../../../constants/pools/Pools.constants';

export interface ILastPoolRunsButtonsProps {
  poolRunsInfo: PoolRunsInfoResponse;
  poolType: PoolType;
  poolId: string;
  showViewPoolButton?: boolean;
}
