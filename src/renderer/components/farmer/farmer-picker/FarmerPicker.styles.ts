import { theme } from '../../../theme';

export interface IFarmerPickerStyles {
  container: React.CSSProperties;
  title: React.CSSProperties;
  farmersGrid: React.CSSProperties;
  farmerCard: React.CSSProperties;
  farmerAvatar: React.CSSProperties;
  farmerName: React.CSSProperties;
  farmerLeekCount: React.CSSProperties;
  emptyText: React.CSSProperties;
}

export const farmerPickerStyles: IFarmerPickerStyles = {
  container: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border.primary}`,
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    marginBottom: theme.spacing.sm,
  },
  farmersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: theme.spacing.sm,
  },
  farmerCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.xs,
    border: `1px solid ${theme.colors.border.primary}`,
    transition: 'transform 0.2s ease, border-color 0.2s ease',
    cursor: 'pointer',
  },
  farmerAvatar: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background.primary,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    fontSize: '24px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
  farmerName: {
    fontSize: '12px',
    fontWeight: 600,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  farmerLeekCount: {
    fontSize: '10px',
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
  },
  emptyText: {
    fontSize: '12px',
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
};
