import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {
  IServerContextValue,
  IServerProviderProps,
} from './ServerContext.types';
import LeekWarsLaboratoryService from '../../services/leekwars-laboratory/LeekWarsLaboratoryService';
import LeekService from '../../services/LeekService/LeekService';
import FileService from '../../services/FileService/FileService';
import { BaseService } from '../../services/BaseService';

const STORAGE_KEY = 'leekwars-laboratory-port';
const DEFAULT_PORT = 8080;

// Get initial port from localStorage or use default
const getInitialPort = (): number => {
  if (typeof window !== 'undefined') {
    const savedPort = localStorage.getItem(STORAGE_KEY);
    if (savedPort) {
      const parsedPort = parseInt(savedPort, 10);
      if (!Number.isNaN(parsedPort) && parsedPort > 0 && parsedPort <= 65535) {
        return parsedPort;
      }
    }
  }
  return DEFAULT_PORT;
};

export const ServerContext = createContext<IServerContextValue | undefined>(
  undefined,
);

export function ServerProvider({ children }: IServerProviderProps) {
  const [isServerRunning, setIsServerRunning] = useState(false);
  const [port, setPortState] = useState(getInitialPort);

  // Update service port when port changes
  const setPort = useCallback((newPort: number) => {
    setPortState(newPort);
    BaseService.setPort(newPort);
    LeekWarsLaboratoryService.setPort(newPort); // Still needed for the old service
  }, []);

  // Initialize service with the port
  useState(() => {
    BaseService.setPort(port);
    LeekWarsLaboratoryService.setPort(port);
  });

  const checkServerStatus = useCallback(async () => {
    const response = await LeekWarsLaboratoryService.checkServerStatus();
    setIsServerRunning(response.isRunning);
  }, []);

  const value: IServerContextValue = useMemo(
    () => ({
      isServerRunning,
      port,
      setPort,
      checkServerStatus,
      service: LeekWarsLaboratoryService,
      leekService: LeekService,
      fileService: FileService,
    }),
    [isServerRunning, port, setPort, checkServerStatus],
  );

  return (
    <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
  );
}

export function useServerContext() {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServerContext must be used within a ServerProvider');
  }
  return context;
}
