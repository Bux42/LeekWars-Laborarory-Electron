import { IPoolRunLeek } from '../../../leek/PoolRunLeek.types';
import { IPoolRunBase } from '../PoolRunBase.types';

export interface IPoolRunDuel extends IPoolRunBase {
  leeks: IPoolRunLeek[];
}
