import { theme } from '../../theme';

export const aiDetailStyles = {
  container: {
    padding: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.md,
    height: '100%',
    width: '100%',
    overflowY: 'auto' as const,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    margin: 0,
  },
  backButton: {
    cursor: 'pointer',
    color: theme.colors.accent.primary,
    fontSize: '0.9rem',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.accent.error,
    fontSize: '1.1rem',
    textAlign: 'center' as const,
    marginTop: theme.spacing.xl,
  },
};
