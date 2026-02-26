import { theme } from '../../theme';

export interface IFarmersStyles {
  header: React.CSSProperties;
}

export const farmersStyles: IFarmersStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
};
