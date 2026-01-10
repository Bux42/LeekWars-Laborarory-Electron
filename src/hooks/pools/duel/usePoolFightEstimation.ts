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
    const totalScenarios = leekCount * (leekCount - 1);
    const totalFights = totalScenarios * fightLimit;

    return {
      totalScenarios,
      totalFights,
    };
  }, [leekCount, fightLimit]);
};
