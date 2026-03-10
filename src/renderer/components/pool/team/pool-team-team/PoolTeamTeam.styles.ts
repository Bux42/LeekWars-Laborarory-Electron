import { theme } from '../../../../theme';

export interface IPoolTeamTeamStyles {
  container: React.CSSProperties;
  title: React.CSSProperties;
  subtitle: React.CSSProperties;
  leekImagesContainer: React.CSSProperties;
  eloContainer: React.CSSProperties;
  eloIcon: React.CSSProperties;
  eloValue: React.CSSProperties;
  eloAndNameContainer: React.CSSProperties;
}

export const poolTeamTeamStyles: IPoolTeamTeamStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    padding: '16px',
    gap: '10px',
    backgroundColor: theme.colors.background.elevated,
  },
  title: {
    marginBottom: '5px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
  },
  leekImagesContainer: {
    display: 'flex',
    gap: '5px',
    marginTop: '10px',
  },
  eloContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginLeft: 'auto',
    backgroundColor: theme.colors.background.secondary,
    padding: '4px 8px',
    borderRadius: '4px',
  },
  eloIcon: {
    width: '16px',
    height: '16px',
  },
  eloValue: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  eloAndNameContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
};
