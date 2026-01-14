import { BaseService } from '../BaseService';
import { IGetPoolFightDuelCountByPoolRunIdResponse } from './requests/GetPoolFightDuelCountByPoolRunId.types';
import { IGetEloProgressionByPoolRunIdResponse } from './requests/GetEloProgressionByPoolRunId.types';

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

  /**
   * Get the ELO progression for a specific pool run
   */
  public async getEloProgressionByPoolRunId(
    poolRunId: string,
  ): Promise<IGetEloProgressionByPoolRunIdResponse> {
    return this.get<IGetEloProgressionByPoolRunIdResponse>(
      `/api/pool-fights/duel/get-elo-progression-by-pool-run-id?poolRunId=${poolRunId}`,
    );
  }
}

export default new PoolFightDuelService();
