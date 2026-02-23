import { theme } from '../../../theme';

const gitInfosStyles = {
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
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(120px, auto) 1fr',
    gap: theme.spacing.xs,
  },
  label: {
    color: theme.colors.text.tertiary,
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: theme.colors.text.secondary,
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    wordBreak: 'break-all' as const,
  },
  link: {
    color: theme.colors.accent.primary,
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    wordBreak: 'break-all' as const,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  badge: (hasChanges: boolean) => ({
    display: 'inline-block',
    padding: '2px 6px',
    borderRadius: theme.borderRadius.sm,
    fontSize: '0.7rem',
    fontWeight: 'bold' as const,
    backgroundColor: hasChanges
      ? theme.colors.accent.warning
      : theme.colors.accent.success,
    color: theme.colors.text.inverse,
    marginLeft: theme.spacing.xs,
  }),
  diffContainer: {
    marginTop: theme.spacing.md,
    height: '250px',
    minHeight: '100px',
    resize: 'vertical' as const,
    overflow: 'auto' as const,
    backgroundColor: '#1e1e1e',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: '1px solid #333',
  },
  diffCode: {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    color: '#d4d4d4',
    whiteSpace: 'pre-wrap' as const,
    margin: 0,
  },
};

export default gitInfosStyles;
