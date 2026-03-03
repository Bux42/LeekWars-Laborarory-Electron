import { useMemo } from 'react';
import { EntityStats } from '../../services/leekwarsToolsAPI.schemas';

export const useTurretStats = (level: number): EntityStats => {
  return useMemo(() => {
    const teamRatio = 1 + level / 100;
    const maxLife = 1000 + Math.round((4000 - 500) * teamRatio);
    const characteristicsBase1000 = 100 + Math.round(950 * teamRatio);
    const characteristicsBase2000 = 200 + Math.round(1900 * teamRatio);
    const characteristicsBase500 = 50 + Math.round(475 * teamRatio);

    return {
      life: 1000 + maxLife,
      strength: 200 + characteristicsBase2000,
      agility: 50 + characteristicsBase500,
      resistance: 50 + characteristicsBase500,
      science: 50 + characteristicsBase500,
      wisdom: 100 + characteristicsBase1000,
      magic: 100 + characteristicsBase1000,
      frequency: 111,
      ram: 20,
      cores: 20,
      tp: Math.floor(12 * teamRatio),
      mp: 0,
    };
  }, [level]);
};
