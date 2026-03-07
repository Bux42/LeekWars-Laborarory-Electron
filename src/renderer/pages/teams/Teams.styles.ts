import { theme } from '../../theme';

export interface TeamsStyles {
  header: React.CSSProperties;
  teamList: React.CSSProperties;
}

export const teamsStyles: TeamsStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  teamList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
};
