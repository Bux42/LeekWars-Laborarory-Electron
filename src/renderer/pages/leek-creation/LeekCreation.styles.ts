import { theme } from '../../theme';

export interface ILeekCreationStyles {
  container: React.CSSProperties;
}

export const leekCreationStyles: ILeekCreationStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: theme.spacing.lg,
    color: theme.colors.text.primary,
  },
};
