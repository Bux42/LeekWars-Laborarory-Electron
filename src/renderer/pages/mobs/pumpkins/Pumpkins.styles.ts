import { theme } from '../../../theme';

export interface IPumpkinsStyles {
  header: React.CSSProperties;
  pumpkinList: React.CSSProperties;
}

export const pumpkinsStyles: IPumpkinsStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  pumpkinList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
};
