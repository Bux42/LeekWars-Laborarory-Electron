export interface IServerContextValue {
  isServerRunning: boolean;
  port: number;
  setPort: (port: number) => void;
  checkServerStatus: () => Promise<void>;
}
