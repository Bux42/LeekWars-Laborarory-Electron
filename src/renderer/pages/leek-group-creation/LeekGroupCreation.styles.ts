import { theme } from '../../theme';

export interface ILeekGroupCreationStyles {
  header: React.CSSProperties;
  section: React.CSSProperties;
}

export const leekGroupCreationStyles: ILeekGroupCreationStyles = {
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
};
