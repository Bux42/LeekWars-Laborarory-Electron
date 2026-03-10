import { theme } from '../../../theme';

export interface TeamListStyles {
  container: React.CSSProperties;
  emptyText: React.CSSProperties;
  teamCard: React.CSSProperties;
  titleAndButtonContainer: React.CSSProperties;
  teamContainer: React.CSSProperties;
}

export const teamListStyles: TeamListStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  teamCard: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '12px',
    backgroundColor: '#f9f9f9',
  },
  titleAndButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: '8px',
    padding: '16px',
  },
};
