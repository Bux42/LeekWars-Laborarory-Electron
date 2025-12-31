import { theme } from '../../theme';

export interface IEntityBuildStyles {
  container: React.CSSProperties;
  header: React.CSSProperties;
  section: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  statsGrid: React.CSSProperties;
  statRow: React.CSSProperties;
  statLabelContainer: React.CSSProperties;
  statIcon: React.CSSProperties;
  statLabel: React.CSSProperties;
  statValue: React.CSSProperties;
  itemsSection: React.CSSProperties;
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
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: theme.spacing.sm,
  },
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
