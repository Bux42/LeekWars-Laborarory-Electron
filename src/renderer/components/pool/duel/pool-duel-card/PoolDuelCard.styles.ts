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
  details: {
    fontSize: '0.85rem',
    color: theme.colors.text.secondary,
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
  runsSummary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    backgroundColor: 'rgba(0, 122, 204, 0.1)',
    borderRadius: '4px',
    marginBottom: '16px',
    border: `1px solid ${theme.colors.border.primary}`,
  },
  runsInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  runsActions: {
    display: 'flex',
    gap: '8px',
  },
};
