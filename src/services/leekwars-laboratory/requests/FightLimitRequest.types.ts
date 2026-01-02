import { IPoolOneVersusOneResponse } from '../pools/PoolOneVersusOne.types';

export interface IDisableFightLimitRequest {
  pool_id: string;
}

export interface IDisableFightLimitResponse {
  pool: IPoolOneVersusOneResponse;
}

export interface IEnableFightLimitRequest {
  pool_id: string;
  number: number;
}

export interface IEnableFightLimitResponse {
  pool: IPoolOneVersusOneResponse;
}
