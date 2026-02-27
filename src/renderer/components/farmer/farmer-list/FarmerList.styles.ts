import { theme } from '../../../theme';

export interface IFarmerListStyles {
  container: React.CSSProperties;
  emptyText: React.CSSProperties;
}

export const farmerListStyles: IFarmerListStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    width: '100%',
  },
  emptyText: {
    margin: 0,
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
    fontStyle: 'italic',
  },
};
