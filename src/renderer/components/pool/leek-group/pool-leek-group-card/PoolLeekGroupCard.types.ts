import { PoolLeekGroupResponse } from '../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolLeekGroupCardProps {
  group: PoolLeekGroupResponse;
  processedFights: number;
}
