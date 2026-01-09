import { IPoolRunDuel } from '../../leekwars-laboratory/types/pool/run/categories/PoolRunDuel.types';

export interface IGetPoolRunDuelsByPoolIdResponse {
  poolRunDuels: IPoolRunDuel[];
  success: boolean;
}
