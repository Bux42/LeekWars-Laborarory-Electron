import { theme } from '../../theme';

export interface IPoolsStyles {
  container: React.CSSProperties;
  section: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  loadingText: React.CSSProperties;
  errorText: React.CSSProperties;
  emptyText: React.CSSProperties;
}

export const poolsStyles: IPoolsStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: theme.spacing.lg,
    color: theme.colors.text.primary,
  },
  section: {
    marginBottom: theme.spacing.xl,
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
