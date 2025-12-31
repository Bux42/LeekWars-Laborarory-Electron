export interface ICheckServerStatusParams {
  port: number;
  timeout?: number;
}

export interface IServerStatusResponse {
  isRunning: boolean;
  error?: string;
}
