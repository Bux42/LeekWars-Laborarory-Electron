import { theme } from '../../../../theme';

export const poolDuelListStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.sm,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.primary}`,
    transition: 'background-color 0.2s, border-color 0.2s',
  },
  info: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  name: {
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    color: theme.colors.text.primary,
  },
  details: {
    fontSize: '0.85rem',
    color: theme.colors.text.secondary,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  emptyText: {
    color: theme.colors.text.tertiary,
    fontStyle: 'italic',
    textAlign: 'center' as const,
    padding: theme.spacing.md,
  },
};
