import { BaseService } from '../BaseService';
import { IGetPoolRunDuelsResponse } from './requests/GetPoolRunDuels.types';

class PoolRunDuelService extends BaseService {
  /**
   * Get all pool run duels from the server
   */
  public async getPoolRunDuels(): Promise<IGetPoolRunDuelsResponse> {
    return this.get<IGetPoolRunDuelsResponse>('/api/pool-runs/duel/get-all');
  }
}

export default new PoolRunDuelService();
