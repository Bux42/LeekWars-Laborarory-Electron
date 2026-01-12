import { theme } from '../../../theme';

export const mergedCodeStyles = {
  container: {
    backgroundColor: theme.colors.background.tertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.secondary}`,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  hashContainer: {
    marginBottom: theme.spacing.sm,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  label: {
    color: theme.colors.text.tertiary,
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
  },
  hash: {
    color: theme.colors.accent.primary,
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    cursor: 'pointer',
    textDecoration: 'underline' as const,
  },
  codeContainer: {
    maxHeight: '400px',
    overflowY: 'auto' as const,
    backgroundColor: '#1e1e1e',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: '1px solid #333',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    color: '#d4d4d4',
    whiteSpace: 'pre-wrap' as const,
    margin: 0,
  },
};
