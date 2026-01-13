import { theme } from '../../../theme';

export const leekscriptAIPickerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.sm,
    width: '100%',
  },
  select: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.tertiary,
    border: `1px solid ${theme.colors.border.secondary}`,
    color: theme.colors.text.primary,
    fontSize: '1rem',
    cursor: 'pointer',
    outline: 'none',
    width: '100%',
  },
  option: {
    backgroundColor: theme.colors.background.tertiary,
    color: theme.colors.text.primary,
  },
  error: {
    color: theme.colors.accent.error,
    fontSize: '0.85rem',
  },
};
