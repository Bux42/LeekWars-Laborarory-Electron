import { BaseService } from '../BaseService';
import { IGetPoolDuelsResponse } from './requests/GetPoolDuels.types';

class PoolDuelService extends BaseService {
  /**
   * Get all pool duels from the server
   */
  public async getPoolDuels(): Promise<IGetPoolDuelsResponse> {
    return this.get<IGetPoolDuelsResponse>('/api/pools/duel/get-all');
  }
}

export default new PoolDuelService();
