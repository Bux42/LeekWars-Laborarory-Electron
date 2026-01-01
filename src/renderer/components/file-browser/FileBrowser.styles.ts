import { theme } from '../../theme';

export interface IFileBrowserStyles {
  container: React.CSSProperties;
  header: React.CSSProperties;
  homeButton: React.CSSProperties;
  loading: React.CSSProperties;
  error: React.CSSProperties;
  fileList: React.CSSProperties;
  fileItem: React.CSSProperties;
  fileItemSelected: React.CSSProperties;
  fileIcon: React.CSSProperties;
  fileName: React.CSSProperties;
}

export const fileBrowserStyles: IFileBrowserStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    minHeight: '300px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing.sm,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
  },
  homeButton: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.sm,
    color: theme.colors.text.primary,
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    color: theme.colors.text.secondary,
    padding: theme.spacing.lg,
    textAlign: 'center',
  },
  error: {
    color: theme.colors.accent.error,
    padding: theme.spacing.md,
  },
  fileList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    overflowY: 'auto',
    maxHeight: '400px',
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.sm,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  fileItemSelected: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    border: `2px solid ${theme.colors.accent.primary}`,
    borderRadius: theme.borderRadius.sm,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  fileIcon: {
    fontSize: '1.2rem',
  },
  fileName: {
    color: theme.colors.text.primary,
    flex: 1,
    fontFamily: theme.fonts.primary,
  },
};
