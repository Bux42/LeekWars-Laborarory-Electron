import { ReactNode } from 'react';
import { BasePoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';

export interface IBasePoolWrapperProps {
  pool: BasePoolResponse;
  totalCombinations: number;
  children?: ReactNode;
  onStart: () => void | Promise<void>;
}
