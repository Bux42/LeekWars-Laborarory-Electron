import { theme } from '../../../theme';

export interface ChipListStyles {
  itemsGrid: React.CSSProperties;
}

export const chipListStyles: ChipListStyles = {
  itemsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
};
