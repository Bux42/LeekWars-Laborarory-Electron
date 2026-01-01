import { theme } from '../../../theme';

export interface IDropdownStyles {
  container: React.CSSProperties;
  button: React.CSSProperties;
  menu: React.CSSProperties;
  menuItem: React.CSSProperties;
  menuItemDanger: React.CSSProperties;
}

export const dropdownStyles: IDropdownStyles = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  button: {
    background: 'transparent',
    border: 'none',
    color: theme.colors.text.primary,
    cursor: 'pointer',
    padding: theme.spacing.sm,
    fontSize: '18px',
    lineHeight: 1,
    fontFamily: theme.fonts.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.sm,
    minWidth: '150px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    overflow: 'hidden',
    marginTop: theme.spacing.xs,
  },
  menuItem: {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    cursor: 'pointer',
    fontSize: '14px',
    color: theme.colors.text.primary,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    fontFamily: theme.fonts.primary,
  },
  menuItemDanger: {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    cursor: 'pointer',
    fontSize: '14px',
    color: theme.colors.text.primary,
    borderBottom: 'none',
    fontFamily: theme.fonts.primary,
  },
};
