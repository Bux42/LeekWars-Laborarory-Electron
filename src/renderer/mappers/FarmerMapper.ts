import {
  PoolFarmerResponse,
  FarmerResponse,
} from '../../services/leekwarsToolsAPI.schemas';
import { PoolLeekResponseToLeekResponse } from './LeekMapper';

export function PoolFarmerResponseToFarmerResponse(
  poolFarmerResponse: PoolFarmerResponse,
): FarmerResponse {
  return {
    ...poolFarmerResponse,
    leeks: poolFarmerResponse.leeks.map((leek) =>
      PoolLeekResponseToLeekResponse(leek),
    ),
    creationDate: 0,
    lastUpdateDate: 0,
  };
}
