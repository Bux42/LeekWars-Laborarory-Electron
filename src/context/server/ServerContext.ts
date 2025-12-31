import { createContext, useContext } from 'react';
import { IServerContextValue } from './ServerContext.types';

export const ServerContext = createContext<IServerContextValue | undefined>(
  undefined,
);

export function useServerContext() {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServerContext must be used within a ServerProvider');
  }
  return context;
}
