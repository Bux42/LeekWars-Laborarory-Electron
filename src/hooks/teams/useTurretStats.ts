import { useMemo } from 'react';
import { EntityStats } from '../../services/leekwarsToolsAPI.schemas';

export interface ITurretStats {
  minStats: EntityStats;
  maxStats: EntityStats;
}

/*
const team_ratio = 1 + (this.team.level / 100)
			const max_life = 1000 + Math.round((4000 - 500) * team_ratio)
			const characteristics_base_1000 = 100 + Math.round(950 * team_ratio)
			const characteristics_base_2000 = 200 + Math.round(1900 * team_ratio)
			const characteristics_base_500 = 50 + Math.round(475 * team_ratio)
			return {
				life: 1000 + ` ${this.$t('to')} ` + max_life,
				strength: 200 + ` ${this.$t('to')} ` + characteristics_base_2000,
				agility: 50 + ` ${this.$t('to')} ` + characteristics_base_500,
				resistance: 50 + ` ${this.$t('to')} ` + characteristics_base_500,
				science: 50 + ` ${this.$t('to')} ` + characteristics_base_500,
				wisdom: 100 + ` ${this.$t('to')} ` + characteristics_base_1000,
				magic: 100 + ` ${this.$t('to')} ` + characteristics_base_1000,
				frequency: 111,
				ram: 20,
				cores: 20,
				tp: Math.floor(12 * team_ratio),
				mp: 0
			}
        */

export const useTurretStats = (level: number): ITurretStats => {
  const maxStats = useMemo(() => {
    const teamRatio = 1 + level / 100;
    const maxLife = 1000 + Math.round((4000 - 500) * teamRatio);
    const characteristicsBase1000 = 100 + Math.round(950 * teamRatio);
    const characteristicsBase2000 = 200 + Math.round(1900 * teamRatio);
    const characteristicsBase500 = 50 + Math.round(475 * teamRatio);

    return {
      life: maxLife,
      strength: characteristicsBase2000,
      agility: characteristicsBase500,
      resistance: characteristicsBase500,
      science: characteristicsBase500,
      wisdom: characteristicsBase1000,
      magic: characteristicsBase1000,
      frequency: 111,
      ram: 20,
      cores: 20,
      tp: Math.floor(12 * teamRatio),
      mp: 0,
    };
  }, [level]);

  const minStats = useMemo(() => {
    return {
      life: 1000,
      strength: 200,
      agility: 50,
      resistance: 50,
      science: 50,
      wisdom: 100,
      magic: 100,
      frequency: 111,
      ram: 20,
      cores: 20,
      tp: 12,
      mp: 0,
    };
  }, []);

  return { minStats, maxStats };
};
