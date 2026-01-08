import { IPoolDuel } from '../../leekwars-laboratory/types/pool/categories/PoolDuel.types';

export interface IGetPoolDuelsResponse {
  success: boolean;
  pools: IPoolDuel[];
}
