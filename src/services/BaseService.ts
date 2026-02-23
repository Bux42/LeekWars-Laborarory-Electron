/**
 * Base service class for all API services.
 * Handles common functionality like port management and request helpers.
 */
export abstract class BaseService {
  private static port: number = 7000;

  /**
   * Set the port for all services
   */
  public static setPort(port: number): void {
    BaseService.port = port;
  }

  /**
   * Get the current port
   */
  public static getPort(): number {
    return BaseService.port;
  }

  /**
   * Get the base URL with the current port
   */
  protected get baseUrl(): string {
    return `http://localhost:${BaseService.port}`;
  }

  /**
   * Perform a fetch request with common headers and error handling
   */
  protected async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    });

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        if (response.statusText) {
          errorMessage = `${errorMessage} (${response.statusText})`;
        }
      }
      throw new Error(errorMessage);
    }

    // For methods like DELETE or others that might not return content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  }

  /**
   * Perform a fetch request and return the response as raw text
   */
  protected async requestText(
    path: string,
    options: RequestInit = {},
  ): Promise<string> {
    const url = `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;

    const headers = new Headers({
      ...options.headers,
    });

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        if (response.statusText) {
          errorMessage = `${errorMessage} (${response.statusText})`;
        }
      }
      throw new Error(errorMessage);
    }

    return response.text();
  }

  /**
   * Check if the server is running
   */
  public async checkStatus(
    timeout: number = 5000,
  ): Promise<{ isRunning: boolean; error?: string }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(this.baseUrl, {
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
   * Perform a GET request
   */
  protected async get<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  /**
   * Perform a POST request
   */
  protected async post<T>(
    path: string,
    body?: any,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Perform a PUT request
   */
  protected async put<T>(
    path: string,
    body?: any,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Perform a DELETE request
   */
  protected async delete<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }

  /**
   * Perform a DELETE request with a body
   */
  protected async deleteWithBody<T>(
    path: string,
    body?: any,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'DELETE',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}
