import { theme } from '../../theme';

export interface ITeamCreationStyles {
  header: React.CSSProperties;
  section: React.CSSProperties;
  error: React.CSSProperties;
  success: React.CSSProperties;
}

export const teamCreationStyles: ITeamCreationStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  section: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  error: {
    color: theme.colors.accent.error,
    fontWeight: 'bold',
  },
  success: {
    color: theme.colors.accent.success,
    fontWeight: 'bold',
  },
};
