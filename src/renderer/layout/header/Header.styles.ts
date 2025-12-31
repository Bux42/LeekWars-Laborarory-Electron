import { theme } from '../../theme';

export interface IHeaderStyles {
  container: React.CSSProperties;
}

export const headerStyles: IHeaderStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: theme.colors.background.secondary,
    color: theme.colors.text.primary,
    height: 60,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
  },
};
