import { PoolLeekResponse } from '../../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolDuelFightListProps {
  poolDuelId: string;
  leeks: PoolLeekResponse[];
}
