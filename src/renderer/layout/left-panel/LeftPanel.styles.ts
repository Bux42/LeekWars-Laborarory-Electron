import { theme } from '../../theme';

export interface ILeftPanelStyles {
  container: React.CSSProperties;
  nav: React.CSSProperties;
  navItem: React.CSSProperties;
  navLink: React.CSSProperties;
  subNavLink: React.CSSProperties;
}

export const leftPanelStyles: ILeftPanelStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    backgroundColor: theme.colors.background.secondary,
    color: theme.colors.text.primary,
    padding: 20,
    overflowY: 'auto',
    borderRight: `1px solid ${theme.colors.border.primary}`,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  navItem: {
    listStyle: 'none',
  },
  navLink: {
    display: 'block',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'transparent',
    color: theme.colors.text.primary,
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
  },
  subNavLink: {
    display: 'block',
    padding: theme.spacing.sm,
    paddingLeft: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'transparent',
    color: theme.colors.text.secondary,
    fontSize: '0.9rem',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    cursor: 'pointer',
  },
};
