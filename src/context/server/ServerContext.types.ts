import LeekWarsLaboratoryService from '../../services/leekwars-laboratory/LeekWarsLaboratoryService';
import LeekService from '../../services/LeekService/LeekService';
import FileService from '../../services/FileService/FileService';

export interface IServerContextValue {
  isServerRunning: boolean;
  port: number;
  setPort: (port: number) => void;
  checkServerStatus: () => Promise<void>;
  service: typeof LeekWarsLaboratoryService;
  leekService: typeof LeekService;
  fileService: typeof FileService;
}

export interface IServerProviderProps {
  children: React.ReactNode;
}
