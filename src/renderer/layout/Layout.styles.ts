import { theme } from '../theme';

export interface ILayoutStyles {
  container: React.CSSProperties;
  mainContent: React.CSSProperties;
}

export const layoutStyles: ILayoutStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: theme.colors.background.primary,
    fontFamily: theme.fonts.primary,
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
};
