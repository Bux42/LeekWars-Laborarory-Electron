import { theme } from '../../../theme';

export interface WeaponListStyles {
  itemsGrid: React.CSSProperties;
}

export const weaponListStyles: WeaponListStyles = {
  itemsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
};
