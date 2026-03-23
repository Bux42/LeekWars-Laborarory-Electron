import { theme } from '../../theme';

export interface RunningPoolStyles {
  container: React.CSSProperties;
}

export const runningPoolStyles: RunningPoolStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    gap: '10px',
    backgroundColor: theme.colors.background.primary,
    borderRadius: '8px',
    border: `1px solid ${theme.colors.border.primary}`,
    cursor: 'pointer',
  },
};
