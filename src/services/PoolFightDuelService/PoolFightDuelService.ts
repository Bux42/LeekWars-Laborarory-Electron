import { BaseService } from '../BaseService';
import { IGetPoolFightDuelCountByPoolRunIdResponse } from './requests/GetPoolFightDuelCountByPoolRunId.types';

class PoolFightDuelService extends BaseService {
  /**
   * Get the count of duels for a specific pool run
   */
  public async getCountByPoolRunId(
    poolRunId: string,
  ): Promise<IGetPoolFightDuelCountByPoolRunIdResponse> {
    return this.get<IGetPoolFightDuelCountByPoolRunIdResponse>(
      `/api/pool-fights/duel/count-by-pool-run-id?poolRunId=${poolRunId}`,
    );
  }
}

export default new PoolFightDuelService();
