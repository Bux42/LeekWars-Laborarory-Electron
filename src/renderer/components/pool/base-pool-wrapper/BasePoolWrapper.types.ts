import { ReactNode } from 'react';
import { IBasePool } from '../../../../services/leekwars-laboratory/types/pool/BasePool.types';

export interface IBasePoolWrapperProps {
  pool: IBasePool;
  children?: ReactNode;
  onSetDeterministic: (value: boolean) => void;
  onSetResetElo: (value: boolean) => void;
  onSetEnabled: (value: boolean) => void;
  onSetStartSeed: (value: number) => void;
  onSetFightLimitEnabled: (value: boolean) => void;
  onSetFightLimit: (value: number) => void;
  onStart: () => void;
}
