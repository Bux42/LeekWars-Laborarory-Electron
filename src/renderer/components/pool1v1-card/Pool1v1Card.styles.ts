import { theme } from '../../theme';

export interface IPool1v1CardStyles {
  card: React.CSSProperties;
  header: React.CSSProperties;
  titleRow: React.CSSProperties;
  title: React.CSSProperties;
  statusBadge: React.CSSProperties;
  statusBadgeEnabled: React.CSSProperties;
  statusBadgeDisabled: React.CSSProperties;
  stats: React.CSSProperties;
  fightLimitSection: React.CSSProperties;
  fightLimitRow: React.CSSProperties;
  fightLimitLabel: React.CSSProperties;
  leeksSection: React.CSSProperties;
  leeksSectionTitle: React.CSSProperties;
  leeksGrid: React.CSSProperties;
  leekCardWrapper: React.CSSProperties;
  leekCard: React.CSSProperties;
  removeButton: React.CSSProperties;
  leekAvatar: React.CSSProperties;
  leekName: React.CSSProperties;
  leekElo: React.CSSProperties;
}

export const pool1v1CardStyles: IPool1v1CardStyles = {
  card: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    border: `1px solid ${theme.colors.border.primary}`,
  },
  header: {
    marginBottom: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    paddingBottom: theme.spacing.md,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    margin: 0,
  },
  statusBadge: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: theme.fonts.primary,
  },
  statusBadgeEnabled: {
    backgroundColor: theme.colors.accent.success,
    color: theme.colors.background.primary,
  },
  statusBadgeDisabled: {
    backgroundColor: theme.colors.border.primary,
    color: theme.colors.text.secondary,
  },
  stats: {
    fontSize: '14px',
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
  },
  fightLimitSection: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border.primary}`,
  },
  fightLimitRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  fightLimitLabel: {
    fontSize: '14px',
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
  },
  leeksSection: {
    marginTop: theme.spacing.md,
  },
  leeksSectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    marginBottom: theme.spacing.sm,
  },
  leeksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: theme.spacing.md,
  },
  leekCardWrapper: {
    position: 'relative',
  },
  leekCard: {
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.sm,
    border: `1px solid ${theme.colors.border.primary}`,
    transition: 'transform 0.2s ease, border-color 0.2s ease',
    cursor: 'pointer',
  },
  removeButton: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: theme.colors.accent.error,
    border: `2px solid ${theme.colors.background.secondary}`,
    color: theme.colors.text.primary,
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    transition: 'transform 0.2s ease',
  },
  leekAvatar: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    borderRadius: theme.borderRadius.sm,
  },
  leekName: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  leekElo: {
    fontSize: '12px',
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
  },
};
