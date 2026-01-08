import { IPoolDuel } from '../../leekwars-laboratory/types/pool/categories/PoolDuel.types';

export interface IUpdatePoolDuelRequest {
  pool: IPoolDuel;
}

export interface IUpdatePoolDuelResponse {
  message: string;
  success: boolean;
}
