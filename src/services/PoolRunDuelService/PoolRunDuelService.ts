import { BaseService } from '../BaseService';
import { IGetPoolRunDuelsResponse } from './requests/GetPoolRunDuels.types';
import { IGetPoolRunDuelByIdResponse } from './requests/GetPoolRunDuelById.types';
import { IGetPoolRunDuelsByPoolIdResponse } from './requests/GetPoolRunDuelsByPoolId.types';

class PoolRunDuelService extends BaseService {
  /**
   * Get all pool run duels from the server
   */
  public async getPoolRunDuels(): Promise<IGetPoolRunDuelsResponse> {
    return this.get<IGetPoolRunDuelsResponse>('/api/pool-runs/duel/get-all');
  }

  /**
   * Get a pool run duel by ID
   */
  public async getPoolRunDuelById(
    id: string,
  ): Promise<IGetPoolRunDuelByIdResponse> {
    return this.get<IGetPoolRunDuelByIdResponse>(
      `/api/pool-runs/duel/get-by-id?id=${id}`,
    );
  }

  /**
   * Get all pool run duels for a specific pool
   */
  public async getPoolRunDuelsByPoolId(
    poolId: string,
  ): Promise<IGetPoolRunDuelsByPoolIdResponse> {
    return this.get<IGetPoolRunDuelsByPoolIdResponse>(
      `/api/pool-runs/duel/get-by-pool-id?poolId=${poolId}`,
    );
  }
}

export default new PoolRunDuelService();
