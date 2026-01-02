import { IPoolOneVersusOneResponse } from '../pools/PoolOneVersusOne.types';

export interface IDisableFightLimitRequest {
  id: string;
}

export interface IDisableFightLimitResponse {
  pool: IPoolOneVersusOneResponse;
}

export interface IEnableFightLimitRequest {
  id: string;
  limit: number;
}

export interface IEnableFightLimitResponse {
  pool: IPoolOneVersusOneResponse;
}
