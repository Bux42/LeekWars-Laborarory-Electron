import { IPoolRunBase } from '../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';

export interface IBasePoolRunWrapperProps {
  run: IPoolRunBase;
  combinationsCount: number;
  processedFights: number;
  children?: React.ReactNode;
  onStop?: () => void;
}
