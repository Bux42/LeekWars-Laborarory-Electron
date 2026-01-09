import { theme } from '../../../../theme';

export const poolDuelCardStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: '1rem',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text.secondary,
  },
  statsContainer: {
    fontSize: '0.85rem',
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.sm,
  },
  loadingText: {
    color: theme.colors.text.tertiary,
    fontStyle: 'italic' as const,
  },
  errorText: {
    color: theme.colors.accent.error,
  },
  emptyText: {
    color: theme.colors.text.tertiary,
    fontStyle: 'italic' as const,
  },
};
