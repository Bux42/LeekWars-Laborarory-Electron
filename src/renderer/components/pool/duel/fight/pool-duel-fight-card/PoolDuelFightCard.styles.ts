import { CSSProperties } from 'react';

export type FightColor = 'win' | 'lose' | 'draw';

export interface IPoolDuelFightCardStyles {
  fightCard: CSSProperties;
  leekContainer: (color: FightColor) => CSSProperties;
  resultContainer: CSSProperties;
  eyeIcon: CSSProperties;
  spin: CSSProperties;
  leekImage: CSSProperties;
}

export const poolDuelFightCardStyles: IPoolDuelFightCardStyles = {
  fightCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  leekContainer: (color: FightColor) => ({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    color: color === 'win' ? 'green' : color === 'lose' ? 'red' : 'gray',
  }),
  resultContainer: {
    margin: '0 20px',
    fontWeight: 'bold',
  },
  eyeIcon: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  spin: {
    marginLeft: '10px',
  },
  leekImage: {
    width: '40px',
    height: '40px',
  },
};
