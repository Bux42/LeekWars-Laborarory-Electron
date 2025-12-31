import { theme } from '../../theme';

export interface IRightPanelStyles {
  container: React.CSSProperties;
}

export const rightPanelStyles: IRightPanelStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    backgroundColor: theme.colors.background.secondary,
    color: theme.colors.text.primary,
    padding: 20,
    overflowY: 'auto',
    borderLeft: `1px solid ${theme.colors.border.primary}`,
  },
};
