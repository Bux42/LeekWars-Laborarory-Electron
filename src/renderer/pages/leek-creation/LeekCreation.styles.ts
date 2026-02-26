import { theme } from '../../theme';

export interface ILeekCreationStyles {
  section: React.CSSProperties;
  fileInput: React.CSSProperties;
  error: React.CSSProperties;
  buildInfo: React.CSSProperties;
  avatarNameRow: React.CSSProperties;
  nameInputContainer: React.CSSProperties;
  successMessage: React.CSSProperties;
}

export const leekCreationStyles: ILeekCreationStyles = {
  section: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
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
  successMessage: {
    marginTop: theme.spacing.sm,
    color: theme.colors.accent.success,
  },
};
