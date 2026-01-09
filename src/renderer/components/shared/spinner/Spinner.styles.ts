import { theme } from '../../../theme';

export const spinnerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  spinner: (size: 'small' | 'medium' | 'large', color?: string) => {
    const sizeMap = {
      small: '16px',
      medium: '32px',
      large: '64px',
    };

    return {
      width: sizeMap[size],
      height: sizeMap[size],
      border: `2px solid ${theme.colors.background.tertiary}`,
      borderTop: `2px solid ${color || theme.colors.accent.primary}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    };
  },
  label: {
    fontSize: '0.9rem',
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
  },
};
