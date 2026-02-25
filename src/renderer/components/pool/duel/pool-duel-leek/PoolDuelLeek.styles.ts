import { theme } from '../../../../theme';

export interface PoolDuelLeekStyles {
  container: React.CSSProperties;
  header: React.CSSProperties;
  name: React.CSSProperties;
  image: React.CSSProperties;
  details: React.CSSProperties;
  eloContainer: React.CSSProperties;
  eloIcon: React.CSSProperties;
  eloValue: React.CSSProperties;
}

export const poolDuelLeekStyles: PoolDuelLeekStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: '8px',
    borderRadius: '4px',
    gap: '8px',
  },
  header: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  name: {
    fontSize: '14px',
    marginBottom: '4px',
    color: theme.colors.text.primary,
  },
  image: {
    width: '20px',
    height: 'auto',
    marginBottom: '8px',
  },
  details: {
    fontSize: '12px',
    color: '#666',
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
};
