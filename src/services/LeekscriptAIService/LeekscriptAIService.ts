import { BaseService } from '../BaseService';
import { IGetByMergedCodeHashResponse } from './requests/GetByMergedCodeHash.types';
import { IGetAllLeekscriptAisResponse } from './requests/GetAllLeekscriptAis.types';

class LeekscriptAIService extends BaseService {
  /**
   * Get all LeekScript AIs from the server
   */
  public async getAllLeekscriptAis(): Promise<IGetAllLeekscriptAisResponse> {
    return this.get<IGetAllLeekscriptAisResponse>(
      '/api/leekscript-ais/get-all',
    );
  }

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
