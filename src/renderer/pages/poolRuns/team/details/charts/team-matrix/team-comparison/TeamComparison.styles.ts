import { theme } from '../../../../../../../theme';

export interface TeamComparisonStyles {
  container: React.CSSProperties;
  teamDetailContainer: React.CSSProperties;
  valueContainer: React.CSSProperties;
  vsText: React.CSSProperties;
  vsAndValueContainer: React.CSSProperties;
}

export const teamComparisonStyles: TeamComparisonStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  teamDetailContainer: {
    width: 500,
  },
  valueContainer: {
    fontWeight: 'bold',
    borderRadius: 100,
    padding: '4px 12px',
    backgroundColor: theme.colors.background.primary,
    display: 'flex',
  },
  vsText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  vsAndValueContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
};
