import { CSSProperties } from 'react';
import { theme } from '../../../../theme';

export interface PoolDuelDetailStyles {
  title: CSSProperties;
}

export const poolDuelDetailStyles: PoolDuelDetailStyles = {
  title: {
    fontSize: '1rem',
    color: theme.colors.text.secondary,
  },
};
