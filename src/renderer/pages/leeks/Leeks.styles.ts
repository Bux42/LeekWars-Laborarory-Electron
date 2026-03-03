import { theme } from '../../theme';

export interface ILeeksStyles {
  header: React.CSSProperties;
  actions: React.CSSProperties;
}

export const leeksStyles: ILeeksStyles = {
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
