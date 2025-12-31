import { theme } from '../../theme';

export interface IHomeStyles {
  container: React.CSSProperties;
}

export const homeStyles: IHomeStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: theme.colors.text.primary,
  },
};
