import { CSSProperties } from 'react';
import { theme } from '../../../theme';

export interface PumpkinCreationStyles {
  container: CSSProperties;
  availableBossList: CSSProperties;
  radioButton: CSSProperties;
  uploadContainer: CSSProperties;
  errorText: CSSProperties;
}

export const pumpkinCreationStyles: PumpkinCreationStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  availableBossList: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
  },
  radioButton: {
    height: 64,
    alignContent: 'center',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignContent: 'center',
    alignItems: 'flex-start',
  },
  errorText: {
    color: theme.colors.accent.error,
  },
};
