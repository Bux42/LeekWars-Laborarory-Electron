export interface ICheckServerStatusParams {
  timeout?: number;
}

export interface IServerStatusResponse {
  isRunning: boolean;
  error?: string;
}
