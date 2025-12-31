import {
  ICheckServerStatusParams,
  IServerStatusResponse,
} from './LeekWarsLaboratoryService.types';

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
}

export default new LeekWarsLaboratoryService();
