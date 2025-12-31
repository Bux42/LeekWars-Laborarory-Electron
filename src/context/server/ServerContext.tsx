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

export const ServerContext = createContext<IServerContextValue | undefined>(
  undefined,
);

export function ServerProvider({ children }: IServerProviderProps) {
  const [isServerRunning, setIsServerRunning] = useState(false);
  const [port, setPort] = useState(3000);

  const checkServerStatus = useCallback(async () => {
    const response = await LeekWarsLaboratoryService.checkServerStatus({
      port,
    });
    setIsServerRunning(response.isRunning);
  }, [port]);

  const value: IServerContextValue = useMemo(
    () => ({
      isServerRunning,
      port,
      setPort,
      checkServerStatus,
      service: LeekWarsLaboratoryService,
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
