import { theme } from '../../theme';

export interface ILeftPanelStyles {
  container: React.CSSProperties;
}

export const leftPanelStyles: ILeftPanelStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    backgroundColor: theme.colors.background.secondary,
    color: theme.colors.text.primary,
    padding: 20,
    overflowY: 'auto',
    borderRight: `1px solid ${theme.colors.border.primary}`,
  },
};
