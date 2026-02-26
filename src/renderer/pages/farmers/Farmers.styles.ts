import { theme } from '../../theme';

export interface IFarmersStyles {
  header: React.CSSProperties;
  farmerList: React.CSSProperties;
}

export const farmersStyles: IFarmersStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  farmerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
};
