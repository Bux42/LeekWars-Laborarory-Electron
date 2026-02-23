import { theme } from '../../../theme';

export interface ICheckGitStyles {
  container: React.CSSProperties;
  iconSuccess: React.CSSProperties;
  iconError: React.CSSProperties;
  successText: React.CSSProperties;
  errorText: React.CSSProperties;
}

export const checkGitStyles: ICheckGitStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  iconSuccess: {
    color: theme.colors.accent.success,
    fontSize: 16,
  },
  iconError: {
    color: theme.colors.accent.error,
    fontSize: 16,
  },
  successText: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    fontSize: 12,
  },
  errorText: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    fontSize: 12,
  },
};
