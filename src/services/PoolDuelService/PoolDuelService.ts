import { BaseService } from '../BaseService';
import { IGetPoolDuelsResponse } from './requests/GetPoolDuels.types';
import {
  IUpdatePoolDuelRequest,
  IUpdatePoolDuelResponse,
} from './requests/UpdatePoolDuel.types';

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
}

export default new PoolDuelService();
