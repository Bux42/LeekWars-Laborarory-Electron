import { theme } from '../../../theme';

export interface IStatusPorcelainStyles {
  container: React.CSSProperties;
  list: React.CSSProperties;
  item: React.CSSProperties;
  itemPath: React.CSSProperties;
  itemStatus: React.CSSProperties;
  successState: React.CSSProperties;
  successIcon: React.CSSProperties;
  successText: React.CSSProperties;
  errorState: React.CSSProperties;
  errorIcon: React.CSSProperties;
  errorText: React.CSSProperties;
  loadingContainer: React.CSSProperties;
}

export const statusPorcelainStyles: IStatusPorcelainStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    width: '100%',
  },
  list: {
    maxHeight: 200,
    overflowY: 'auto',
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.elevated,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    fontSize: 12,
  },
  itemPath: {
    flex: 1,
    wordBreak: 'break-all',
  },
  itemStatus: {
    color: theme.colors.text.secondary,
    whiteSpace: 'nowrap',
  },
  successState: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  successIcon: {
    color: theme.colors.accent.success,
    fontSize: 16,
  },
  successText: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    fontSize: 12,
  },
  errorState: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  errorIcon: {
    color: theme.colors.accent.error,
    fontSize: 16,
  },
  errorText: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    fontSize: 12,
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
