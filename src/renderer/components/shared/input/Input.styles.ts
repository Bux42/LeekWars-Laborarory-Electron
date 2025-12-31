import { theme } from '../../../theme';

export interface IInputStyles {
  input: React.CSSProperties;
  disabled: React.CSSProperties;
}

export const inputStyles: IInputStyles = {
  input: {
    padding: '8px 12px',
    fontSize: 14,
    fontFamily: theme.fonts.primary,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.primary}`,
    backgroundColor: theme.colors.background.secondary,
    color: theme.colors.text.primary,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};
