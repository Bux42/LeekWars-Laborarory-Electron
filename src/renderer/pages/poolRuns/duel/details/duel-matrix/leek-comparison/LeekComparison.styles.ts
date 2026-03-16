import { theme } from '../../../../../../theme';

export interface LeekComparisonStyles {
  container: React.CSSProperties;
  leekDetailContainer: React.CSSProperties;
  valueContainer: React.CSSProperties;
  vsText: React.CSSProperties;
  vsAndValueContainer: React.CSSProperties;
}

export const leekComparisonStyles: LeekComparisonStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  leekDetailContainer: {
    width: 300,
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
