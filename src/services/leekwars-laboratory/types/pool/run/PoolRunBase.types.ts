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

export const poolRunBaseToBasePoolRunResponse = (
  poolRunBase: IPoolRunBase,
): BasePoolResponse => {
  return {
    ...poolRunBase.basePool,
  };
};
