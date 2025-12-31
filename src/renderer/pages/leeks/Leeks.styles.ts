import { theme } from '../../theme';

export interface ILeeksStyles {
  container: React.CSSProperties;
  table: React.CSSProperties;
  thead: React.CSSProperties;
  th: React.CSSProperties;
  thSortable: React.CSSProperties;
  tbody: React.CSSProperties;
  tr: React.CSSProperties;
  td: React.CSSProperties;
  leekImage: React.CSSProperties;
  talentIcon: React.CSSProperties;
  sortIndicator: React.CSSProperties;
}

export const leeksStyles: ILeeksStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: theme.spacing.lg,
    color: theme.colors.text.primary,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  thead: {
    backgroundColor: theme.colors.background.elevated,
  },
  th: {
    padding: theme.spacing.md,
    textAlign: 'left',
    fontWeight: 600,
    borderBottom: `2px solid ${theme.colors.border.primary}`,
    color: theme.colors.text.primary,
  },
  thSortable: {
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.2s ease',
  },
  tbody: {
    backgroundColor: theme.colors.background.secondary,
  },
  tr: {
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    transition: 'background-color 0.2s ease',
  },
  td: {
    padding: theme.spacing.md,
    color: theme.colors.text.primary,
  },
  leekImage: {
    width: 40,
    height: 40,
    objectFit: 'contain',
    borderRadius: theme.borderRadius.sm,
  },
  talentIcon: {
    width: 20,
    height: 20,
    marginRight: theme.spacing.xs,
    verticalAlign: 'middle',
  },
  sortIndicator: {
    marginLeft: theme.spacing.xs,
    fontSize: 12,
  },
};
