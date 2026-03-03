import { theme } from '../../../../theme';

export interface IPoolRunDuelLeekListStyles {
  container: React.CSSProperties;
  avatarCell: React.CSSProperties;
  name: React.CSSProperties;
  value: React.CSSProperties;
}

export const poolRunDuelLeekListStyles: IPoolRunDuelLeekListStyles = {
  container: {
    width: '100%',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.primary}`,
    overflow: 'hidden',
  },
  avatarCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
  },
  value: {
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
  },
};
