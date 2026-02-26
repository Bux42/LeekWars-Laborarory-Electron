import { ReactNode } from 'react';
import { BasePoolResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface IBasePoolWrapperProps {
  pool: BasePoolResponse;
  children?: ReactNode;
  onStart: () => void | Promise<void>;
}
