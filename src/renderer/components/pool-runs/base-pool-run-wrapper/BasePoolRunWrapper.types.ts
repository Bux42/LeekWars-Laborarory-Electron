import { IPoolRunBase } from '../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';

export interface IBasePoolRunWrapperProps {
  run: IPoolRunBase;
  children?: React.ReactNode;
  onStop?: () => void;
}
