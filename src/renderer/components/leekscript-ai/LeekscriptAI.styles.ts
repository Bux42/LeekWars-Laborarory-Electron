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
};
