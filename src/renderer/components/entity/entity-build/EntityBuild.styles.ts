import { theme } from '../../../theme';

export interface IEntityBuildStyles {
  container: React.CSSProperties;
  header: React.CSSProperties;
  itemsSection: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  itemsGrid: React.CSSProperties;
  itemImage: React.CSSProperties;
  emptyState: React.CSSProperties;
}

export const entityBuildStyles: IEntityBuildStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
  },

  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  itemsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
  itemsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  itemImage: {
    width: 48,
    height: 48,
    objectFit: 'contain',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border.primary}`,
  },
  emptyState: {
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
};
