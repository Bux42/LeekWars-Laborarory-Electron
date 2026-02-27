import { theme } from '../../../../theme';

export const basePoolWrapperStyles = {
  container: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    border: `1px solid ${theme.colors.border.primary}`,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    marginBottom: theme.spacing.lg,
    transition: 'transform 0.2s ease-in-out, border-color 0.2s ease-in-out',
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
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
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
