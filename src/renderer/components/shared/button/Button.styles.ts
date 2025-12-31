import { theme } from '../../../theme';

export interface IButtonStyles {
  base: React.CSSProperties;
  primary: React.CSSProperties;
  secondary: React.CSSProperties;
  danger: React.CSSProperties;
  disabled: React.CSSProperties;
}

export const buttonStyles: IButtonStyles = {
  base: {
    padding: '8px 16px',
    fontSize: 14,
    fontFamily: theme.fonts.primary,
    fontWeight: 500,
    borderRadius: theme.borderRadius.md,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  primary: {
    backgroundColor: theme.colors.accent.primary,
    color: theme.colors.text.primary,
  },
  secondary: {
    backgroundColor: theme.colors.background.elevated,
    color: theme.colors.text.primary,
    border: `1px solid ${theme.colors.border.primary}`,
  },
  danger: {
    backgroundColor: theme.colors.accent.error,
    color: '#fff',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};
