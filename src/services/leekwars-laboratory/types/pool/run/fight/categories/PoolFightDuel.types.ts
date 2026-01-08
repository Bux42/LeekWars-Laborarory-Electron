import { IPoolFightBase } from '../PoolFightBase.types';

export interface IPoolFightDuel extends IPoolFightBase {
  leek1Id: string;
  leek2Id: string;
  winnerLeekId: string;
}
