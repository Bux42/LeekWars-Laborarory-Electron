import { theme } from '../../theme';

export const breadcrumbsStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  navigationButtons: {
    display: 'flex',
    gap: theme.spacing.sm,
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: theme.colors.text.primary,
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '4px 8px',
    borderRadius: theme.borderRadius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.tertiary,
    transition: 'background-color 0.2s',
  },
  navButtonDisabled: {
    color: theme.colors.text.tertiary,
    cursor: 'default',
    backgroundColor: theme.colors.background.secondary,
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    fontSize: '0.9rem',
    color: theme.colors.text.secondary,
  },
  breadcrumbItem: {
    cursor: 'pointer',
    padding: '2px 4px',
    borderRadius: theme.borderRadius.sm,
    transition: 'color 0.2s, background-color 0.2s',
    textDecoration: 'none',
    color: 'inherit',
  },
  breadcrumbItemActive: {
    color: theme.colors.text.primary,
    fontWeight: 'bold' as const,
    cursor: 'default',
  },
  separator: {
    color: theme.colors.text.tertiary,
    userSelect: 'none' as const,
  },
};
