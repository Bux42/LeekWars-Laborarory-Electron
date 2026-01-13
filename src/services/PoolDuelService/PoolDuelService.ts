import { BaseService } from '../BaseService';
import { IGetPoolDuelsResponse } from './requests/GetPoolDuels.types';
import {
  IUpdatePoolDuelRequest,
  IUpdatePoolDuelResponse,
} from './requests/UpdatePoolDuel.types';
import {
  IRemoveLeekFromPoolRequest,
  IRemoveLeekFromPoolResponse,
} from './requests/RemoveLeekFromPool.types';
import {
  IStartPoolDuelRequest,
  IStartPoolDuelResponse,
} from './requests/StartPoolDuel.types';
import {
  IAddLeekToPoolRequest,
  IAddLeekToPoolResponse,
} from './requests/AddLeekToPool.types';
import {
  IStopPoolDuelRequest,
  IStopPoolDuelResponse,
} from './requests/StopPoolDuel.types';
import {
  IAddPoolDuelRequest,
  IAddPoolDuelResponse,
} from './requests/AddPoolDuel.types';

class PoolDuelService extends BaseService {
  /**
   * Get all pool duels from the server
   */
  public async getPoolDuels(): Promise<IGetPoolDuelsResponse> {
    return this.get<IGetPoolDuelsResponse>('/api/pools/duel/get-all');
  }

  /**
   * Update a pool duel
   */
  public async updatePoolDuel(
    params: IUpdatePoolDuelRequest,
  ): Promise<IUpdatePoolDuelResponse> {
    return this.put<IUpdatePoolDuelResponse>(
      '/api/pools/duel/update',
      params.pool,
    );
  }

  /**
   * Remove a leek from a pool duel
   */
  public async removeLeekFromPool(
    params: IRemoveLeekFromPoolRequest,
  ): Promise<IRemoveLeekFromPoolResponse> {
    return this.deleteWithBody<IRemoveLeekFromPoolResponse>(
      '/api/pools/duel/remove-leek',
      params,
    );
  }

  /**
   * Add a leek to a pool duel
   */
  public async addLeekToPool(
    params: IAddLeekToPoolRequest,
  ): Promise<IAddLeekToPoolResponse> {
    return this.post<IAddLeekToPoolResponse>(
      '/api/pools/duel/add-leek',
      params,
    );
  }

  /**
   * Start a pool duel run
   */
  public async startPoolDuel(
    params: IStartPoolDuelRequest,
  ): Promise<IStartPoolDuelResponse> {
    return this.post<IStartPoolDuelResponse>('/api/pools/duel/start', params);
  }

  /**
   * Stop a pool duel run
   */
  public async stopPool(
    params: IStopPoolDuelRequest,
  ): Promise<IStopPoolDuelResponse> {
    return this.post<IStopPoolDuelResponse>(
      '/api/pools/duel/stop-pool',
      params,
    );
  }

  /**
   * Add a new pool duel
   */
  public async addPoolDuel(
    params: IAddPoolDuelRequest,
  ): Promise<IAddPoolDuelResponse> {
    return this.post<IAddPoolDuelResponse>('/api/pools/duel/add', params);
  }
}

export default new PoolDuelService();
