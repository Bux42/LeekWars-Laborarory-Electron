import { IPoolRunBase } from '../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';

export interface IPoolRunListProps {
  runs: IPoolRunBase[];
  onViewRun: (run: IPoolRunBase) => void;
}
