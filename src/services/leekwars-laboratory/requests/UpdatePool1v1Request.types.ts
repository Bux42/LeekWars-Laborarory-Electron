import {
  IPoolOneVersusOneRequest,
  IPoolOneVersusOneResponse,
} from '../pools/PoolOneVersusOne.types';

export interface IUpdatePool1v1Request {
  pool: IPoolOneVersusOneRequest;
}

export interface IUpdatePool1v1Response {
  pool: IPoolOneVersusOneResponse;
}
