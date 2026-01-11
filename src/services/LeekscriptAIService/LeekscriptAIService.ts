import { BaseService } from '../BaseService';
import { IGetByMergedCodeHashResponse } from './requests/GetByMergedCodeHash.types';

class LeekscriptAIService extends BaseService {
  /**
   * Get a LeekScript AI snapshot by its merged code hash
   */
  public async getByMergedCodeHash(
    mergedCodeHash: string,
  ): Promise<IGetByMergedCodeHashResponse> {
    return this.get<IGetByMergedCodeHashResponse>(
      `/api/leekscript-ais/get-by-merged-code-hash?mergedCodeHash=${mergedCodeHash}`,
    );
  }
}

export default new LeekscriptAIService();
