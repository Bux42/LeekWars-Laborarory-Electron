import { IPoolDuel } from '../../leekwars-laboratory/types/pool/categories/PoolDuel.types';

export interface IAddPoolDuelRequest {
  enabled: boolean;
  resetElo: boolean;
  deterministic: boolean;
  startSeed: number;
  fightLimitEnabled: boolean;
  fightLimit: number;
  name: string;
  leekIds: string[];
}

export interface IAddPoolDuelResponse {
  pool: IPoolDuel;
  success: boolean;
}
