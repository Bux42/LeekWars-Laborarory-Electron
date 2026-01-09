import { theme } from '../../../theme';

export interface ILeekPickerStyles {
  container: React.CSSProperties;
  title: React.CSSProperties;
  leeksGrid: React.CSSProperties;
  leekCard: React.CSSProperties;
  leekAvatar: React.CSSProperties;
  leekName: React.CSSProperties;
  leekElo: React.CSSProperties;
  emptyText: React.CSSProperties;
}

export const leekPickerStyles: ILeekPickerStyles = {
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
  leeksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: theme.spacing.sm,
  },
  leekCard: {
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
  leekAvatar: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    borderRadius: theme.borderRadius.sm,
  },
  leekName: {
    fontSize: '12px',
    fontWeight: 600,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  leekElo: {
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
