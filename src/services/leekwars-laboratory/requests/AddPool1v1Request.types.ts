import {
  IPoolOneVersusOneRequest,
  IPoolOneVersusOneResponse,
} from '../pools/PoolOneVersusOne.types';

export interface IAddPool1v1Request {
  pool: Omit<IPoolOneVersusOneRequest, 'id' | 'total_fights'>;
}

export interface IAddPool1v1Response {
  pool: IPoolOneVersusOneResponse;
}
