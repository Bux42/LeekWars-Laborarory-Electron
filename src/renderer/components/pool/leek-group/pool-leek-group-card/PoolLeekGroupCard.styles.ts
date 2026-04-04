import { CSSProperties } from 'react';
import { theme } from '../../../../theme';

export interface PoolLeekGroupCardStyles {
  container: CSSProperties;
  headerContainer: CSSProperties;
  ratiosContainer: CSSProperties;
  ratioItem: CSSProperties;
  winrate: CSSProperties;
  leeksContainer: CSSProperties;
}

export const poolLeekGroupCardStyles: PoolLeekGroupCardStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.background.primary,
    padding: 12,
    borderRadius: 4,
    border: `1px solid ${theme.colors.border.primary}`,
    gap: 8,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratiosContainer: {
    display: 'flex',
    gap: 12,
  },
  ratioItem: {
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.primary}`,
    padding: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  winrate: {
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.primary}`,
    fontWeight: 'bold',
    padding: 2,
    width: 'auto',
    borderRadius: 4,
  },
  leeksContainer: {
    display: 'flex',
  },
};
