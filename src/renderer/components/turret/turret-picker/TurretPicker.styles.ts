import { theme } from '../../../theme';

export interface TurretPickerStyles {
  container: React.CSSProperties;
  emptyText: React.CSSProperties;
  title: React.CSSProperties;
  turretsGrid: React.CSSProperties;
  turretCard: (selected: boolean) => React.CSSProperties;
  turretName: (selected: boolean) => React.CSSProperties;
  turretAvatar: React.CSSProperties;
}

export const turretPickerStyles: TurretPickerStyles = {
  container: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border.primary}`,
  },
  emptyText: {
    fontSize: '12px',
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    marginBottom: theme.spacing.sm,
  },
  turretsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: theme.spacing.sm,
  },
  turretCard: (selected: boolean) => ({
    backgroundColor: selected
      ? theme.colors.background.primary
      : theme.colors.background.secondary,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.xs,
    border: `1px solid ${selected ? '#4caf50' : theme.colors.border.primary}`,
    transition: 'transform 0.2s ease, border-color 0.2s ease',
    cursor: 'pointer',
  }),
  turretName: (selected: boolean) => ({
    fontSize: '12px',
    fontWeight: 600,
    color: selected ? theme.colors.text.primary : theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
    textAlign: 'center',
    wordBreak: 'break-word',
  }),
  turretAvatar: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    borderRadius: theme.borderRadius.sm,
  },
};
