import { theme } from '../../theme';

export interface ILeeksStyles {
  container: React.CSSProperties;
}

export const leeksStyles: ILeeksStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: theme.spacing.lg,
    color: theme.colors.text.primary,
  },
};
