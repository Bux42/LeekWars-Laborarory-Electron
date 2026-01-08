import { BaseService } from '../BaseService';
import { IFileListRequest, IFileListResponse } from './requests/FileList.types';

class FileService extends BaseService {
  /**
   * Get list of files in a directory
   */
  public async getFileList(
    params: IFileListRequest = {},
  ): Promise<IFileListResponse> {
    const { directory_path = '.' } = params;
    return this.post<IFileListResponse>('/api/file/list', { directory_path });
  }

  /**
   * Reset file directory to root
   */
  public async resetFileDirectory(): Promise<IFileListResponse> {
    return this.get<IFileListResponse>('/api/file/reset');
  }
}

export default new FileService();
