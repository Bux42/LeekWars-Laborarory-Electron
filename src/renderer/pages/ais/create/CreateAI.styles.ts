import { theme } from '../../../theme';

export const createAiStyles = {
  container: {
    padding: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.xl,
    height: '100%',
    width: '100%',
    overflowY: 'auto' as const,
    color: theme.colors.text.primary,
  },
  header: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.xs,
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  subtitle: {
    margin: 0,
    color: theme.colors.text.tertiary,
    fontSize: '1rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border.secondary}`,
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: theme.colors.accent.primary,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.md,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  selectedFile: {
    marginTop: theme.spacing.sm,
    color: theme.colors.accent.success,
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    backgroundColor: theme.colors.background.tertiary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border.secondary}`,
  },
  actions: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  error: {
    color: theme.colors.accent.error,
    fontSize: '0.9rem',
    marginTop: theme.spacing.xs,
  },
  errorText: {
    color: theme.colors.accent.error,
    fontSize: '0.85rem',
    margin: 0,
  },
  link: {
    color: theme.colors.accent.primary,
    cursor: 'pointer',
    textDecoration: 'underline' as const,
    marginLeft: theme.spacing.xs,
    fontSize: '0.85rem',
  },
};
