import { theme } from '../../theme';

export interface RunningPoolStyles {
  container: React.CSSProperties;
  poolName: React.CSSProperties;
  spaceBetweenContainer: React.CSSProperties;
  runDetails: React.CSSProperties;
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
  },
  poolName: {
    margin: 0,
    color: theme.colors.text.primary,
    cursor: 'pointer',
    display: 'flex',
    gap: '5px',
  },
  spaceBetweenContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  },
  runDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    fontSize: '12px',
  },
};
