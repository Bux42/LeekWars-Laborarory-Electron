import { BasePoolResponse } from '../../../../leekwarsToolsAPI.schemas';
import { IBasePool } from '../BasePool.types';

export interface IPoolRunBase {
  running: boolean;
  interrupted: boolean;
  startDate: number;
  endDate: number;
  basePool: BasePoolResponse;
  id: string;
}
