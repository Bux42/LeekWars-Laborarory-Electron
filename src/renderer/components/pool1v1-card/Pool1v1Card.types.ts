import { IPoolOneVersusOneResponse } from '../../../services/leekwars-laboratory/pools/PoolOneVersusOne.types';
import { ILeek } from '../../../services/leekwars-laboratory/types/leek/Leek.types';

export interface IPool1v1CardProps {
  pool: IPoolOneVersusOneResponse;
  availableLeeks: ILeek[];
  onPoolUpdate: () => void;
}
