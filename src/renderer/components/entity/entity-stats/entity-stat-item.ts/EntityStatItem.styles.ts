import { theme } from '../../../../theme';

export interface EntityStatItemStyles {
  statRow: React.CSSProperties;
  statLabelContainer: React.CSSProperties;
  statIcon: React.CSSProperties;
  statLabel: React.CSSProperties;
  statValue: React.CSSProperties;
}

export const entityStatItemStyles: EntityStatItemStyles = {
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.sm,
  },
  statLabelContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  statIcon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
  statLabel: {
    color: theme.colors.text.secondary,
  },
  statValue: {
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
};
