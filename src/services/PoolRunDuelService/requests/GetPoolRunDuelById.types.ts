import { IPoolRunDuel } from '../../leekwars-laboratory/types/pool/run/categories/PoolRunDuel.types';

export interface IGetPoolRunDuelByIdResponse {
  poolRunDuel: IPoolRunDuel;
  success: boolean;
}
