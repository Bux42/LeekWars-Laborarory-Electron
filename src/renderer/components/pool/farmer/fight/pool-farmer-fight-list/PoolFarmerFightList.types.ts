import { PoolFarmerResponse } from '../../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolFarmerFightListProps {
  farmers: PoolFarmerResponse[];
  poolFarmerId: string;
}
