import { theme } from '../../theme';

export interface IHomeStyles {
  content: React.CSSProperties;
  title: React.CSSProperties;
}

export const homeStyles: IHomeStyles = {
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.fonts.primary,
  },
  title: {
    margin: 0,
    color: theme.colors.text.primary,
  },
};
