import { theme } from '../../theme';

export interface IPageOutletStyles {
  container: React.CSSProperties;
}

export const pageOutletStyles: IPageOutletStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: theme.spacing.lg,
    color: theme.colors.text.primary,
  },
};
