import { CSSProperties } from 'react';
import { theme } from '../../../../../theme';

export type FightColor = 'win' | 'lose' | 'draw';

export interface IPoolPumpkinFightListItemStyles {
  row: CSSProperties;
  column: CSSProperties;
  leekContent: CSSProperties;
  teamName: (color: FightColor) => CSSProperties;
  teamContainer: (color: FightColor) => CSSProperties;
  resultContainer: CSSProperties;
  dateText: CSSProperties;
  actionContainer: CSSProperties;
  eyeIcon: CSSProperties;
}

export const poolPumpkinFightListItemStyles: IPoolPumpkinFightListItemStyles = {
  row: {
    width: '100%',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    alignItems: 'center',
  },
  leekContent: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  teamName: (color: FightColor) => ({
    color:
      color === 'win'
        ? theme.colors.accent.success
        : color === 'lose'
          ? theme.colors.accent.error
          : theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
  }),
  teamContainer: (color: FightColor) => ({
    display: 'flex',
    alignItems: 'center',
    color:
      color === 'win'
        ? theme.colors.accent.success
        : color === 'lose'
          ? theme.colors.accent.error
          : theme.colors.text.secondary,
  }),
  resultContainer: {
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
  },
  dateText: {
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    color: theme.colors.accent.primary,
    cursor: 'pointer',
    fontSize: 16,
  },
};
