import { theme } from '../../theme';

export interface IFarmersStyles {
  container: React.CSSProperties;
  header: React.CSSProperties;
}

export const farmersStyles: IFarmersStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: theme.spacing.lg,
    color: theme.colors.text.primary,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
};
