import { useMemo } from 'react';

export interface IFightEstimation {
  totalScenarios: number;
  totalFights: number;
}

export const usePoolFightEstimation = (
  leekCount: number,
  fightLimit: number = 1,
): IFightEstimation => {
  return useMemo(() => {
    if (leekCount == 1) {
      return {
        totalScenarios: 1,
        totalFights: fightLimit,
      };
    }
    const totalScenarios = leekCount * (leekCount - 1);
    const totalFights = totalScenarios * fightLimit;

    return {
      totalScenarios,
      totalFights,
    };
  }, [leekCount, fightLimit]);
};
