import { theme } from '../../theme';

export interface ITurretsStyles {
  header: React.CSSProperties;
  actions: React.CSSProperties;
}

export const turretsStyles: ITurretsStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  actions: {
    display: 'flex',
    gap: theme.spacing.sm,
  },
};
