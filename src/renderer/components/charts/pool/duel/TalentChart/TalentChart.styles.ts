import { theme } from '../../../../../theme';

export const talentChartStyles = {
  container: {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.primary}`,
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: theme.spacing.sm,
  },
  chartContainer: {
    width: '100%',
    minHeight: '300px',
  },
};
