import { theme } from '../../theme';

export interface IBodyStyles {
  container: React.CSSProperties;
}

export const bodyStyles: IBodyStyles = {
  container: {
    display: 'flex',
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background.primary,
    overflowY: 'auto',
  },
};
