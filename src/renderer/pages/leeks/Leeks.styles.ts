import { theme } from '../../theme';

export interface ILeeksStyles {
  header: React.CSSProperties;
}

export const leeksStyles: ILeeksStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
};
