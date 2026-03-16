import { PoolFarmerResponse } from '../../../../../../../../services/leekwarsToolsAPI.schemas';

export interface IFarmerComparisonProps {
  farmer1: PoolFarmerResponse;
  farmer2: PoolFarmerResponse;
  value: number;
}
