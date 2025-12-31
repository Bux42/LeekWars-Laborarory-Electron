import {
  ICheckServerStatusParams,
  IServerStatusResponse,
  IGetLeeksParams,
} from './LeekWarsLaboratoryService.types';
import { IGetLeeksRequest } from './requests/GetLeeksRequest.types';

class LeekWarsLaboratoryService {
  /**
   * Check if the server is running on localhost at the specified port
   */
  async checkServerStatus({
    port,
    timeout = 5000,
  }: ICheckServerStatusParams): Promise<IServerStatusResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`http://localhost:${port}`, {
        signal: controller.signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      clearTimeout(timeoutId);

      return {
        isRunning: response.ok || response.status < 500,
      };
    } catch (error) {
      return {
        isRunning: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get all leeks from the server
   */
  async getLeeks({ port }: IGetLeeksParams): Promise<IGetLeeksRequest> {
    const response = await fetch(`http://localhost:${port}/api/get-leeks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch leeks: ${response.statusText}`);
    }

    const data: IGetLeeksRequest = await response.json();
    return data;
  }
}

export default new LeekWarsLaboratoryService();
