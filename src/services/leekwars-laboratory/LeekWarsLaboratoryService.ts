import {
  ICheckServerStatusParams,
  IServerStatusResponse,
} from './LeekWarsLaboratoryService.types';
import { IGetLeeksRequest } from './requests/GetLeeksRequest.types';
import {
  IFileListRequest,
  IFileListResponse,
} from './requests/FileListRequest.types';
import {
  IAddLeekRequest,
  IAddLeekResponse,
} from './requests/AddLeekRequest.types';

class LeekWarsLaboratoryService {
  private port: number = 8080; // Default port

  /**
   * Set the port for the service
   */
  setPort(port: number): void {
    this.port = port;
  }

  /**
   * Get the current port
   */
  getPort(): number {
    return this.port;
  }

  /**
   * Check if the server is running on localhost at the specified port
   */
  async checkServerStatus({
    timeout = 5000,
  }: ICheckServerStatusParams = {}): Promise<IServerStatusResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`http://localhost:${this.port}`, {
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
  async getLeeks(): Promise<IGetLeeksRequest> {
    const response = await fetch(
      `http://localhost:${this.port}/api/get-leeks`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch leeks: ${response.statusText}`);
    }

    const data: IGetLeeksRequest = await response.json();
    return data;
  }

  /**
   * Get list of files in a directory
   */
  async getFileList(params: IFileListRequest = {}): Promise<IFileListResponse> {
    const { directory_path = '.' } = params;

    const response = await fetch(
      `http://localhost:${this.port}/api/file/list`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ directory_path }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch file list: ${response.statusText}`);
    }

    const data: IFileListResponse = await response.json();
    return data;
  }

  /**
   * Reset file directory to root
   */
  async resetFileDirectory(): Promise<IFileListResponse> {
    const response = await fetch(
      `http://localhost:${this.port}/api/file/reset`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to reset file directory: ${response.statusText}`);
    }

    const data: IFileListResponse = await response.json();
    return data;
  }

  /**
   * Add a new leek
   */
  async addLeek(params: IAddLeekRequest): Promise<IAddLeekResponse> {
    const response = await fetch(`http://localhost:${this.port}/api/add-leek`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(params.leek),
    });

    if (!response.ok) {
      throw new Error(`Failed to add leek: ${response.statusText}`);
    }

    const data: IAddLeekResponse = await response.json();
    return data;
  }
}

export default new LeekWarsLaboratoryService();
