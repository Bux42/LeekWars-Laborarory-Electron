import { theme } from '../../../theme';

export interface TeamCardStyles {
  container: React.CSSProperties;
  header: React.CSSProperties;
  name: React.CSSProperties;
}

export const teamCardStyles: TeamCardStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    borderRadius: '8px',
    backgroundColor: theme.colors.background.tertiary,
    padding: '16px',
    marginBottom: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
