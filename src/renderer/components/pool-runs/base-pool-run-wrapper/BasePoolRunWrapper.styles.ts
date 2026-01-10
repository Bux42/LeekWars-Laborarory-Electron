import { theme } from '../../../theme';

export const basePoolRunWrapperStyles = {
  container: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    border: `1px solid ${theme.colors.border.primary}`,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    marginBottom: theme.spacing.lg,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.border.secondary}`,
    paddingBottom: theme.spacing.sm,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    margin: 0,
  },
  statusBadge: (isActive: boolean, isInterrupted: boolean) => ({
    padding: '4px 8px',
    borderRadius: theme.borderRadius.sm,
    fontSize: '0.75rem',
    fontWeight: 'bold' as const,
    textTransform: 'uppercase' as const,
    backgroundColor: isInterrupted
      ? theme.colors.accent.error
      : isActive
        ? theme.colors.accent.success
        : theme.colors.background.tertiary,
    color: theme.colors.text.primary,
  }),
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  label: {
    fontSize: '0.75rem',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase' as const,
  },
  value: {
    fontSize: '0.9rem',
    color: theme.colors.text.secondary,
  },
  childrenContainer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colors.border.secondary}`,
  },
};
