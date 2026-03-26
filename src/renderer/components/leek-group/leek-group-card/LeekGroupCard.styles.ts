import { CSSProperties } from 'react';
import { theme } from '../../../theme';

export interface LeekGroupCardStyles {
  container: CSSProperties;
}

export const leekGroupCardStyles: LeekGroupCardStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: 8,
    backgroundColor: theme.colors.background.primary,
    gap: 8,
  },
};
