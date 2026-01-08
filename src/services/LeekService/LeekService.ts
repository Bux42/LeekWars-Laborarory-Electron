import { BaseService } from '../BaseService';
import { IGetLeeksResponse } from './requests/GetLeeks.types';
import { IAddLeekRequest, IAddLeekResponse } from './requests/AddLeek.types';
import {
  IDeleteLeekRequest,
  IDeleteLeekResponse,
} from './requests/DeleteLeek.types';

class LeekService extends BaseService {
  /**
   * Get all leeks from the server
   */
  public async getLeeks(): Promise<IGetLeeksResponse> {
    return this.get<IGetLeeksResponse>('/api/leeks/get-all');
  }

  /**
   * Add a new leek
   */
  public async addLeek(params: IAddLeekRequest): Promise<IAddLeekResponse> {
    return this.post<IAddLeekResponse>('/api/leeks/add', params.leek);
  }

  /**
   * Delete a leek
   */
  public async deleteLeek(
    params: IDeleteLeekRequest,
  ): Promise<IDeleteLeekResponse> {
    return this.deleteWithBody<IDeleteLeekResponse>(
      '/api/leeks/delete',
      params,
    );
  }
}

export default new LeekService();
