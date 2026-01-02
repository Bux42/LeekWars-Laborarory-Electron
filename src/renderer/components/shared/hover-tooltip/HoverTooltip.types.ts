import { ReactNode } from 'react';

export interface IHoverTooltipProps {
  children: ReactNode;
  tooltip: ReactNode;
  delay?: number;
}
