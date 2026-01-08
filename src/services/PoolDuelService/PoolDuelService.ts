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
   * Start a pool duel run
   */
  public async startPoolDuel(
    params: IStartPoolDuelRequest,
  ): Promise<IStartPoolDuelResponse> {
    return this.post<IStartPoolDuelResponse>('/api/pools/duel/start', params);
  }
}

export default new PoolDuelService();
