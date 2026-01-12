import {
  IGetByMergedCodeHashRequest,
  IGetByMergedCodeHashResponse,
} from './requests/GetByMergedCodeHash.types';
import {
  IGetAllLeekscriptAisRequest,
  IGetAllLeekscriptAisResponse,
} from './requests/GetAllLeekscriptAis.types';
import {
  IAnalyzeAIFileRequest,
  IAnalyzeAIFileResponse,
} from './requests/AnalyzeAIFile.types';
import { BaseService } from '../BaseService';

class LeekscriptAIService extends BaseService {
  /**
   * Get all LeekScript AIs from the server
   */
  public async getAllLeekscriptAis(
    params?: IGetAllLeekscriptAisRequest,
  ): Promise<IGetAllLeekscriptAisResponse> {
    const query =
      params?.removeCode !== undefined
        ? `?removeCode=${params.removeCode}`
        : '';
    return this.get<IGetAllLeekscriptAisResponse>(
      `/api/leekscript-ais/get-all${query}`,
    );
  }

  /**
   * Get a LeekScript AI snapshot by its merged code hash
   */
  public async getByMergedCodeHash(
    params: IGetByMergedCodeHashRequest,
  ): Promise<IGetByMergedCodeHashResponse> {
    const query =
      params.removeCode !== undefined ? `&removeCode=${params.removeCode}` : '';
    return this.get<IGetByMergedCodeHashResponse>(
      `/api/leekscript-ais/get-by-merged-code-hash?mergedCodeHash=${params.mergedCodeHash}${query}`,
    );
  }

  /**
   * Analyze a LeekScript AI file
   */
  public async analyzeFile(
    params: IAnalyzeAIFileRequest,
  ): Promise<IAnalyzeAIFileResponse> {
    return this.post<IAnalyzeAIFileResponse>(
      '/api/leekscript-ais/analyze-file',
      params,
    );
  }
}

export default new LeekscriptAIService();
