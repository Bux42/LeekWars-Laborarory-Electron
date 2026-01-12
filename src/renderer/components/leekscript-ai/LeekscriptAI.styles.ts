import { theme } from '../../theme';

export const leekscriptAIStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.text.primary,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    borderBottom: `2px solid ${theme.colors.accent.primary}`,
    paddingBottom: '4px',
    display: 'inline-block',
  },
  metadataContainer: {
    backgroundColor: theme.colors.background.tertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.secondary}`,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  metadataItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  label: {
    color: theme.colors.text.tertiary,
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: theme.colors.text.secondary,
    fontSize: '0.9rem',
  },
};
