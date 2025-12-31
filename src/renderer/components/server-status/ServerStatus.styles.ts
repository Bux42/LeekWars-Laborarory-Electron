import { theme } from '../../theme';

export interface IServerStatusStyles {
  container: React.CSSProperties;
  status: React.CSSProperties;
  statusIndicator: React.CSSProperties;
}

export const serverStatusStyles: IServerStatusStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.elevated,
  },
  status: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.colors.text.primary,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: theme.colors.text.tertiary,
  },
};
