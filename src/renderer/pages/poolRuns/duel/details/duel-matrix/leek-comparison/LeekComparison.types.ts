import { PoolLeekResponse } from '../../../../../../../services/leekwarsToolsAPI.schemas';

export interface ILeekComparisonProps {
  leek1: PoolLeekResponse;
  leek2: PoolLeekResponse;
  value: number;
}
