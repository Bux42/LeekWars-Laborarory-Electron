import { theme } from '../../theme';

export const aisStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.xl,
  },
  loadingText: {
    color: theme.colors.text.secondary,
    textAlign: 'center' as const,
    padding: theme.spacing.xl,
  },
  errorText: {
    color: theme.colors.accent.error,
    textAlign: 'center' as const,
    padding: theme.spacing.xl,
  },
  emptyText: {
    color: theme.colors.text.tertiary,
    textAlign: 'center' as const,
    padding: theme.spacing.xl,
  },
  aiCard: {
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.secondary}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
};
