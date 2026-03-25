import { CSSProperties } from 'react';
import { theme } from '../../../../theme';

export interface PumpkinPoolCreationStyles {
  bossList: CSSProperties;
  bossItem: CSSProperties;
  content: CSSProperties;
  title: CSSProperties;
  form: CSSProperties;
  validationMessage: CSSProperties;
}

export const pumpkinPoolCreationStyles: PumpkinPoolCreationStyles = {
  bossList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  bossItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    border: `1px solid ${theme.colors.border.primary}`,
    padding: '16px',
    borderRadius: '4px',
  },
  content: {
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xl,
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: theme.spacing.xl,
    color: theme.colors.text.primary,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.xl,
    width: '100%',
  },
  validationMessage: {
    color: theme.colors.accent.error,
    fontWeight: 500,
  },
};
