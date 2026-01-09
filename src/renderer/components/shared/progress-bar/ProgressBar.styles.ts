import { theme } from '../../../theme';

export const progressBarStyles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.xs,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: theme.colors.text.secondary,
  },
  barContainer: (height: number | string) => ({
    width: '100%',
    height: height,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  }),
  fill: (percentage: number, color?: string) => ({
    width: `${Math.min(100, Math.max(0, percentage))}%`,
    height: '100%',
    backgroundColor: color || theme.colors.accent.primary,
    transition: 'width 0.3s ease-in-out',
  }),
};
