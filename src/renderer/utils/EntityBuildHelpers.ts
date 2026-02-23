import { IEntityStats } from '../../services/leekwars-laboratory/types/entity/stats/EntityStats.types';
import { EntityBuild } from '../../services/leekwarsToolsAPI.schemas';
import { getBaseStats } from './LeekWars';

export function getTotalStats(entityBuild: EntityBuild): IEntityStats {
  const { level, investedStats, bonusStats } = entityBuild;
  const baseStats = getBaseStats(level);

  return {
    life: investedStats.life + bonusStats.life + baseStats.life,
    strength: investedStats.strength + bonusStats.strength + baseStats.strength,
    wisdom: investedStats.wisdom + bonusStats.wisdom + baseStats.wisdom,
    agility: investedStats.agility + bonusStats.agility + baseStats.agility,
    resistance:
      investedStats.resistance + bonusStats.resistance + baseStats.resistance,
    science: investedStats.science + bonusStats.science + baseStats.science,
    magic: investedStats.magic + bonusStats.magic + baseStats.magic,
    frequency:
      investedStats.frequency + bonusStats.frequency + baseStats.frequency,
    cores: investedStats.cores + bonusStats.cores + baseStats.cores,
    ram: investedStats.ram + bonusStats.ram + baseStats.ram,
    tp: investedStats.tp + bonusStats.tp + baseStats.tp,
    mp: investedStats.mp + bonusStats.mp + baseStats.mp,
  };
}
