import { theme } from '../../theme';

export interface IPoolsStyles {
  section: React.CSSProperties;
  sectionHeader: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  loadingText: React.CSSProperties;
  errorText: React.CSSProperties;
  emptyText: React.CSSProperties;
}

export const poolsStyles: IPoolsStyles = {
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: theme.spacing.md,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
  },
  loadingText: {
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
  errorText: {
    color: theme.colors.accent.error,
  },
  emptyText: {
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
};
