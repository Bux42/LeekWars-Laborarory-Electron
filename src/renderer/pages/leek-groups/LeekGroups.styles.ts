import { theme } from '../../theme';

export interface ILeekGroupsStyles {
  header: React.CSSProperties;
  actions: React.CSSProperties;
}

export const leekGroupsStyles: ILeekGroupsStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  actions: {
    display: 'flex',
    gap: theme.spacing.sm,
  },
};
