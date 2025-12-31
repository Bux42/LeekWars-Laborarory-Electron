import { theme } from '../../theme';

export interface IPoolsStyles {
  container: React.CSSProperties;
}

export const poolsStyles: IPoolsStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: theme.spacing.lg,
    color: theme.colors.text.primary,
  },
};
