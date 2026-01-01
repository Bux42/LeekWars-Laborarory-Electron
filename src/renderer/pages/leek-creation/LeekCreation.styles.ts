import { theme } from '../../theme';

export interface ILeekCreationStyles {
  container: React.CSSProperties;
  section: React.CSSProperties;
  fileInput: React.CSSProperties;
  error: React.CSSProperties;
  buildInfo: React.CSSProperties;
  avatarNameRow: React.CSSProperties;
  nameInputContainer: React.CSSProperties;
}

export const leekCreationStyles: ILeekCreationStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: theme.spacing.lg,
    color: theme.colors.text.primary,
  },
  section: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
  },
  fileInput: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.sm,
    color: theme.colors.text.primary,
    cursor: 'pointer',
  },
  error: {
    marginTop: theme.spacing.sm,
    color: theme.colors.accent.error,
  },
  buildInfo: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.sm,
    color: theme.colors.accent.success,
  },
  avatarNameRow: {
    display: 'flex',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
    padding: theme.spacing.sm,
  },
  nameInputContainer: {
    flex: 1,
  },
};
