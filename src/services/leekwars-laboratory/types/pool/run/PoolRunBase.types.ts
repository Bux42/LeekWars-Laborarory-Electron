import { IBasePool } from '../BasePool.types';

export interface IPoolRunBase {
  running: boolean;
  interrupted: boolean;
  startTime: number;
  endTime: number;
  pool: IBasePool;
  id: string;
}
