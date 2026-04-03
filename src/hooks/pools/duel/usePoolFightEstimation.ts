import { useMemo } from 'react';

export interface IFightEstimation {
  totalScenarios: number;
  totalFights: number;
}

export const usePoolFightEstimation = (
  teamCount: number,
  fightLimit: number = 1,
): IFightEstimation => {
  return useMemo(() => {
    if (teamCount == 1) {
      return {
        totalScenarios: 1,
        totalFights: fightLimit,
      };
    }
    const totalScenarios = teamCount * (teamCount - 1);
    const totalFights = totalScenarios * fightLimit;

    return {
      totalScenarios,
      totalFights,
    };
  }, [teamCount, fightLimit]);
};
