import { theme } from '../../../theme';

export interface ILeekListStyles {
  container: React.CSSProperties;
  headerRow: React.CSSProperties;
  headerCell: React.CSSProperties;
  sortableHeaderCell: React.CSSProperties;
  listItem: React.CSSProperties;
  itemRow: React.CSSProperties;
  leekImageCell: React.CSSProperties;
  valueText: React.CSSProperties;
  emptyAiText: React.CSSProperties;
  sortIndicator: React.CSSProperties;
  actionsCell: React.CSSProperties;
  hashLink: React.CSSProperties;
}

export const leekListStyles: ILeekListStyles = {
  container: {
    width: '100%',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.primary}`,
  },
  headerRow: {
    width: '100%',
  },
  headerCell: {
    color: theme.colors.text.primary,
    fontWeight: 600,
    fontFamily: theme.fonts.primary,
    fontSize: '0.9rem',
  },
  sortableHeaderCell: {
    width: '100%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    fontWeight: 600,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.elevated,
    fontFamily: theme.fonts.primary,
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: theme.borderRadius.sm,
    userSelect: 'none',
    transition: 'background-color 0.2s ease',
  },
  listItem: {
    backgroundColor: theme.colors.background.secondary,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    transition: 'background-color 0.2s ease',
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
  },
  itemRow: {
    width: '100%',
  },
  leekImageCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    fontSize: '0.9rem',
  },
  emptyAiText: {
    color: theme.colors.text.tertiary,
    fontFamily: theme.fonts.primary,
  },
  sortIndicator: {
    marginLeft: theme.spacing.xs,
    fontSize: 12,
  },
  actionsCell: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  hashLink: {
    border: 'none',
    backgroundColor: 'transparent',
    color: theme.colors.accent.primary,
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '0.9rem',
    fontFamily: theme.fonts.primary,
    padding: 0,
  },
};
