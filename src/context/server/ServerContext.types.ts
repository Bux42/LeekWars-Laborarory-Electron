import LeekWarsLaboratoryService from '../../services/leekwars-laboratory/LeekWarsLaboratoryService';

export interface IServerContextValue {
  isServerRunning: boolean;
  port: number;
  setPort: (port: number) => void;
  checkServerStatus: () => Promise<void>;
  service: typeof LeekWarsLaboratoryService;
}

export interface IServerProviderProps {
  children: React.ReactNode;
}
