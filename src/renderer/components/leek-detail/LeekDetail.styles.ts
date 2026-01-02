import { theme } from '../../theme';

export interface ILeekDetailStyles {
  container: React.CSSProperties;
  header: React.CSSProperties;
  leekImage: React.CSSProperties;
  name: React.CSSProperties;
  level: React.CSSProperties;
  elo: React.CSSProperties;
  section: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  equipmentGrid: React.CSSProperties;
  equipmentItem: React.CSSProperties;
  statsGrid: React.CSSProperties;
  statRow: React.CSSProperties;
  statLabel: React.CSSProperties;
  statValue: React.CSSProperties;
}

export const leekDetailStyles: ILeekDetailStyles = {
  container: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.primary,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
  },
  leekImage: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
  },
  name: {
    fontSize: '18px',
    fontWeight: 600,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  level: {
    fontSize: '14px',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  elo: {
    fontSize: '14px',
    color: theme.colors.accent.primary,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
  },
  equipmentGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  equipmentItem: {
    width: '32px',
    height: '32px',
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing.sm,
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.sm,
  },
  statLabel: {
    fontSize: '12px',
    color: theme.colors.text.secondary,
  },
  statValue: {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.colors.text.primary,
  },
};
