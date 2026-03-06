import { CSSProperties } from 'react';
import { theme } from '../../../theme';

export interface EntityStatsStyles {
  section: CSSProperties;
  sectionTitle: CSSProperties;
  statsGrid: CSSProperties;
}

export const entityStatsStyles: EntityStatsStyles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: theme.spacing.sm,
  },
};
