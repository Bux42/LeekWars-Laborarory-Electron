import {
  PoolFarmerResponse,
  PoolFightFarmerResponse,
} from '../../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolFarmerFightListItemProps {
  fight: PoolFightFarmerResponse;
  farmer1: PoolFarmerResponse;
  farmer2: PoolFarmerResponse;
}
