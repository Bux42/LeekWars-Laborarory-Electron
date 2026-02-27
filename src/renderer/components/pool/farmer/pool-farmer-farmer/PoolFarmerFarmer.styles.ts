import { theme } from '../../../../theme';

export interface IPoolFarmerFarmerStyles {
  container: React.CSSProperties;
  title: React.CSSProperties;
  subtitle: React.CSSProperties;
  leekImagesContainer: React.CSSProperties;
  eloContainer: React.CSSProperties;
  eloIcon: React.CSSProperties;
  eloValue: React.CSSProperties;
  eloAndNameContainer: React.CSSProperties;
}

export const poolFarmerFarmerStyles: IPoolFarmerFarmerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
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
